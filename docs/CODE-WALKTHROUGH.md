# VS Code에서 온이 코드 따라가기

이 문서는 지금 구현된 코드가 어떻게 움직이는지 설명한다. **기본 실행은 실제 AI가 아닌 `DemoGateway`의 규칙 기반 시연이다.** Gemini 연결 코드는 있지만 실제 API 키를 사용하는 호출은 아직 검증하지 않았다. 지금은 가상 보호자와 가상 상황으로 확인한다.

## 1. VS Code에서 열고 실행하기

저장소 루트의 `RE-Mind.code-workspace`를 VS Code에서 연다. `Terminal → Run Task`에서 아래 작업을 순서대로 실행한다.

1. 처음 한 번 **온이: 프런트 의존성 설치**.
2. **온이: 백엔드 실행**.
3. 다른 터미널에서 **온이: 프런트 실행**.

프런트 터미널의 주소에서 `/#/chat-modes`를 연다. 기본 주소는 `http://localhost:5173/#/chat-modes`다. JDK 17과 Node.js가 필요하며, 자세한 준비와 Gemini 설정은 [AI-MVP.md](AI-MVP.md)를 참고한다.

백엔드는 `oni` 프로필로 실행한다. 이 프로필에서만 AI API를 열고 로컬 H2 DB를 사용한다. DB는 서버를 재시작하면 초기화된다. VS Code의 왼쪽 소스 제어 또는 터미널의 `git branch --show-current`로 현재 브랜치가 `1104-kimjiwoo`인지 확인한다.

## 2. 먼저 이 파일들을 순서대로 읽기

VS Code에서 `Ctrl+P`로 파일명을 입력하면 빠르게 열 수 있다. 함수 이름에 커서를 두고 F12 또는 Ctrl+클릭(macOS는 Cmd+클릭)하면 정의로 이동한다. Java 확장의 프로젝트 가져오기가 끝나야 Java 탐색이 잘 동작한다.

| 읽을 파일 | 먼저 볼 함수·부분 | 담당하는 일 |
| --- | --- | --- |
| `frontend/src/ai/AiWorkspace.jsx` | `send()`, `api()` | 입력을 서버에 보내고 응답을 화면 상태에 넣기 |
| `backend/src/main/java/com/remind/ai/AiController.java` | `chat()`, `owner()` | HTTP 요청을 받고 임시 세션 소유자 확인하기 |
| `backend/src/main/java/com/remind/ai/AiService.java` | `send()` | 대화 조회 → 판단 → 도구 실행 → 답변 → 저장 연결하기 |
| `backend/src/main/java/com/remind/ai/DecisionEngine.java` | `decide()` | 어떤 행동을 허용할지 기준 적용하기 |
| `backend/src/main/java/com/remind/ai/PolicyCatalog.java` | `search()` | 등록된 정책 자료에서 관련 항목 찾기 |
| `backend/src/main/java/com/remind/ai/DemoGateway.java` | `plan()`, `answer()` | 외부 AI 호출 없는 시연 응답 만들기 |
| `backend/src/main/java/com/remind/ai/GeminiGateway.java` | `plan()`, `answer()`, `generate()` | 실제 모델 호출과 반환 형식 검사하기 |

`AiGateway`는 `plan()`과 `answer()`라는 공통 약속이다. `AiConfiguration.aiGateway()`가 설정에 따라 `DemoGateway` 또는 `GeminiGateway`를 선택한다. 따라서 나머지 처리 코드는 유지하면서 응답 제공자를 바꿀 수 있다.

## 3. 전송 버튼을 누르면 React가 하는 일

`AiWorkspace.send()`는 빈 글, 중복 클릭, 설정 상태 등을 검사한 뒤 요청 데이터를 만든다.

```javascript
const payload = requestRef.current || {
  ...(conversation.id ? { conversationId: conversation.id } : {}),
  requestId: crypto.randomUUID(),
  mode: conversation.mode,
  message: message.trim(),
  ...(region.trim() ? { region: region.trim() } : {}),
}
const result = await api('/chat', {
  method: 'POST', body: JSON.stringify(payload),
})
```

- `conversationId`: 어느 대화를 이어갈지 구분한다. 첫 전송에서는 없다.
- `requestId`: 이번 전송을 구분한다. 재시도에서는 같은 번호를 유지해 대화가 중복 저장되는 것을 막는다. 입력을 수정하면 새 번호를 만든다.
- `mode`: `EMPATHY`(공감) 또는 `SOLUTION`(해결책). 기존 대화의 모드는 유지하며 다른 모드는 새 대화로 시작한다.
- `region`: 선택 입력이다. 현재 자료만으로 그 지역의 운영 여부를 확인해주는 기능은 아니다.

`api()`는 `/api/ai/chat`으로 `fetch()`한다. Vite의 프록시가 요청을 Java 서버로 전달한다. `credentials: 'same-origin'`으로 브라우저 세션 쿠키도 보낸다. 브라우저 `sessionStorage`에는 복원을 위한 대화 ID만 보관하며 대화 본문은 넣지 않는다.

## 4. Java가 판단하고 실행하는 과정

`AiController.chat()`은 `@Valid`로 입력 형식을 검사하고, 로컬 요청인지 확인한 뒤 세션당 요청 한도를 적용한다. `owner()`는 세션에 임시 소유자 ID를 만든다. 브라우저의 `REMIND_ONI_SESSION` 쿠키가 이 세션을 이어준다. **이것은 팀의 로그인 인증과는 별개인 로컬 시연용 구분 방식이다.**

다음으로 호출되는 `AiService.send()`가 실제 흐름의 중심이다.

```text
대화 소유권과 requestId 검사
  → 최근 5개 문답을 history로 준비
  → 서버의 위험 표현 사전 확인
  → ai.plan(): 의도·검색어 제안
  → DecisionEngine.decide(): 서버가 최종 행동 결정
  → POLICY면 PolicyCatalog.search(), SCHEDULE이면 ScheduleParser.parse()
  → ai.answer(): 판단 결과와 자료로 답변 작성
  → 출처 ID 검사 → 대화와 응답 저장 → 응답 반환
```

규칙상 명백한 위험 표현이 있으면 외부 모델을 호출하지 않는 `safety-rules` 경로를 사용한다. 이 기준은 제한된 표현을 검사하는 장치이며 우울증 판별기나 임상 평가가 아니다.

모델이 일정 처리를 제안하더라도 명시적 요청이나 허용된 후속 날짜·시간 답변이 아니면 먼저 확인한다. `DecisionEngine`의 규칙은 표현을 놓칠 수 있으므로 사례와 테스트를 함께 보완해야 한다.

Gemini 모드에서는 일반적으로 `plan()`과 `answer()` 두 번을 호출한다. 답변에 사용한 출처 ID가 서버에서 전달한 자료에 포함되는지 검사한다. 다만 ID 검사만으로 답변의 모든 문장이 정확하다고 보장되지는 않으므로 실제 응답 품질 확인도 필요하다. 연결 실패는 오류로 전달하며 데모 답변으로 바꾸지 않는다.

## 5. 가상의 정책 질문 한 번 따라가기

가상 보호자가 해결책 모드에서 **“방문요양 지원제도를 어디서 알아볼 수 있을까요?”**라고 입력하고 지역에 “서울”을 적었다고 하자.

1. React가 `mode: "SOLUTION"`, 새 `requestId`, 질문과 지역을 전송한다.
2. 기본 제공자인 `DemoGateway.plan()`은 `GENERAL`과 원문 검색어를 제안한다. 이 단계는 실제 AI 판단이 아니다.
3. `DecisionEngine.decide()`는 “방문요양”이라는 정책 주제와 질문 표현을 확인해 최종 `intent`를 `POLICY`로 정한다.
4. `PolicyCatalog.search()`는 `backend/src/main/resources/ai/policies.json`의 키워드를 검색한다. 이 질문에서는 `long-term-home-care` 자료를 찾는다. 실시간 웹 검색이나 서울의 기관 검색은 수행하지 않는다.
5. `DemoGateway.answer()`가 시연 문장을 만들고 찾은 정책 ID를 반환한다.
6. 서버가 답변과 출처를 저장하고, React가 `reply`를 말풍선에, `sources`를 `SourceCards`에 표시한다.

응답에서 확인할 핵심 값은 다음과 같다. 실제 응답에는 대화 ID, 요청 ID, 판단 이유와 정책의 다른 필드도 포함된다.

```json
{
  "decision": { "intent": "POLICY" },
  "sources": [{ "id": "long-term-home-care", "title": "노인장기요양보험 방문요양" }],
  "scheduleProposal": null,
  "provider": "demo",
  "demo": true
}
```

정책 출처와 확인일은 JSON 자료에서 온다. 현재 등록 자료는 6개이며 최대 3개를 선택한다. `region`으로 지역별 운영 여부나 개인의 지원 자격을 판정하지 않는다. 자료에 없는 지원금·금액 질문을 받으면 관련 없는 자료로 채우지 않는다.

음성도 별도 채팅 경로가 아니다. `startVoice()`가 인식한 글을 입력창에 넣으면 사용자가 확인하고 같은 `send()`로 전송한다. 실제 마이크 인식은 아직 검증하지 않았다. 일정은 `ScheduleCard`에 초안만 표시하며 `scheduleProposal.saved`는 항상 `false`다. 현재 일정 저장 API와 병원 예약 기능은 없다.

## 6. VS Code에서 실제로 멈춰 보며 확인하기

일반 백엔드가 실행 중이면 해당 터미널에서 Ctrl+C로 종료한 뒤, **Run and Debug → 온이 API 디버그 (oni) → F5**를 선택한다. 프런트는 계속 실행해둔다. Java 파일의 줄 번호 왼쪽을 클릭하면 중단점이 생긴다.

| 중단점을 둘 곳 | 멈췄을 때 볼 값 |
| --- | --- |
| `AiController.chat()`의 `return service.send(...)` 줄 | `body.message()`, `body.mode()`, `body.requestId()` |
| `AiService.send()`의 `DecisionEngine.Decision decision = ...` 다음 실행 줄 | `plan.intent()`, 최종 `decision.intent()`, `decision.reason()` |
| `AiService.send()`의 `AiGateway.Context context = ...` 줄 | `found` 정책 목록, `proposal` 초안, 전달할 대화 문맥 |
| `AiService.send()`의 `return response` 줄 | `response.provider()`, `response.sources()`, `response.scheduleProposal()` |

화면에서 위 정책 질문을 보내고 F10으로 한 줄씩 실행하거나 F11로 호출한 함수 안에 들어간다. F5는 다음 중단점까지 계속 실행한다. 오래 멈추면 화면의 60초 대기 제한이 끝날 수 있으므로 학습 중 발생한 시간 초과와 기능 오류를 구분한다.

브라우저 개발자 도구의 **Network → chat → Payload / Response**에서도 같은 데이터를 확인할 수 있다. VS Code에서 프런트 `send()`의 `payload`를 읽고, Network에서 전송값을 보고, Java 중단점에서 받은 값을 비교하면 연결 구조가 보인다. 프런트 중단점은 Java 디버거와 별개이므로 필요하면 브라우저 개발자 도구의 Sources에서 건다.

말투를 바꾸려면 데모는 `DemoGateway.answer()`, 실제 Gemini는 `GeminiGateway.answer()`의 지시문을 읽는다. 판단을 바꾸려면 `DecisionEngine`과 해당 테스트를, 자료를 바꾸려면 `policies.json`을 함께 검토한다.

## 7. 브랜치에서 함께 보강하고 main에 합치는 순서

아래는 진행 순서다. 이 문서 자체는 원격 푸시나 PR 생성이 끝났다는 상태 보고가 아니다.

1. **브랜치:** `1104-kimjiwoo`에서 작업하고 변경 파일을 확인한다. `main`은 팀의 공유 기준으로 둔다.
2. **로컬 확인:** 화면에서 원하는 동작을 확인하고, VS Code 작업 **온이: 백엔드 테스트**, **온이: 프런트 빌드**를 실행한다. API 키가 든 `.env`는 커밋하지 않는다.
3. **커밋:** 서로 관련된 변경을 한 단위로 저장한다. 커밋은 내 컴퓨터에 작업 이력을 남기는 것이다.
4. **푸시:** 해당 브랜치의 커밋을 GitHub로 보낸다. 푸시만으로 `main`이 바뀌지는 않는다.
5. **Draft PR:** `1104-kimjiwoo → main` 비교를 열어 변경 파일과 남은 과제를 함께 검토한다. 아직 보강할 때는 초안 PR로 둔다.
6. **함께 보강:** 공감 말투, 정책 정확성, 오류 처리 등을 검토해 수정하고 같은 브랜치에 커밋·푸시한다. PR에 새 변경이 반영된다.
7. **최종 확인 후 머지:** 실제 Gemini 연결과 필요한 수동 확인, 변경에 맞는 테스트, 최신 `main`과의 충돌 해결을 마친다. 합칠 범위를 확인한 뒤 PR을 `main`에 머지한다. 로컬에서도 최신 `main`을 받아 팀의 기준을 맞춘다.

현재 MVP는 로컬 시연 범위다. `oni` 프로필에서만 API가 열리므로 브랜치를 `main`에 합친다고 운영 서비스에서 AI가 바로 활성화되는 것은 아니다. 실제 사용을 위해서는 Gemini 연결 확인과 함께 팀 로그인, 영구 DB, 캘린더 저장 연결을 별도 작업으로 진행해야 한다.
