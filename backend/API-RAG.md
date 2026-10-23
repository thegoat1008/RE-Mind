# AI RAG API 연결 안내

기준 경로는 `/api/chatbot`입니다. 아래는 새 화면 없이 기존 프런트엔드에서 호출할 수 있는 서버 API 계약입니다. API 키를 요청 본문이나 브라우저 코드에 넣지 않습니다.

로컬 H2(`rag,rag-local`) 및 팀 MySQL(`rag,rag-mysql`) 실행 시 AI 서버 주소는 `http://127.0.0.1:8083`입니다. MySQL 프로필은 `.env.rag`에 지정한 DB 서버를 사용합니다. `dev,rag` 등 기존 DB 프로필에서는 기존 서버 포트를 사용합니다.

## API 목록

| 메서드 | 경로 | 응답 |
| --- | --- | --- |
| GET | `/api/chatbot/config` | Gemini 설정 여부·모델·검증 상태 |
| GET | `/api/chatbot/knowledge/status` | RAG 저장소와 종류별 DB 건수 |
| GET | `/api/chatbot/conversation` | 현재 세션의 user/assistant 메시지 |
| POST | `/api/chatbot/chat` | 답변·확인한 자료 발췌·검색 상태 |
| DELETE | `/api/chatbot/conversation` | 현재 세션의 대화 초기화, HTTP 204 |

캘린더·돌봄 기록 쓰기, 수집 관리자 API, 원본 자료 임의 업로드 API는 없습니다. 공공 API 수집은 서버 운영자가 non-web 명령으로 실행합니다.

## 1. 설정 상태 확인

```http
GET /api/chatbot/config
```

응답 형태 예시입니다. 예시의 값은 실제 실행 검증 결과를 뜻하지 않습니다.

```json
{
  "provider": "gemini",
  "model": "gemini-3.5-flash-lite",
  "configured": true,
  "liveVerified": false,
  "lastVerifiedAt": null,
  "notice": "현재 세션 임시 보관 및 대화 제한 등에 대한 안내"
}
```

`configured`는 키가 비어 있지 않은지, `liveVerified`는 현재 서버에서 유효한 Gemini 응답을 받았는지를 뜻합니다. `lastVerifiedAt`은 마지막 성공 시각의 ISO 문자열입니다. 서버 재시작 후에는 다시 검증합니다. 한 답변의 `provider=retrieval`은 그 요청에서 Gemini를 호출하지 않았다는 뜻이며, 과거 호출로 `liveVerified=true`일 수는 있습니다.

## 2. 자료 보관 상태 확인

```http
GET /api/chatbot/knowledge/status
```

```json
{
  "storage": "shared-datasource",
  "documents": { "POLICY": 0, "HOSPITAL": 0, "EVENT": 0 },
  "retrieval": "BM25+Korean-bigrams",
  "notice": "수집일은 검토일이 아닙니다. 병원·행사는 복지 자격 근거로 사용하지 않습니다."
}
```

0은 빈 DB의 형태 예시입니다. 수집 후 실제 건수를 확인합니다. `shared-datasource`는 기존 backend의 DataSource를 함께 사용한다는 뜻이며, 실제 팀 MySQL/Aiven 접속이 검증되었다는 표시는 아닙니다.

## 3. 질문 전송

```http
POST /api/chatbot/chat
Content-Type: application/json
```

```json
{
  "requestId": "2a24b7e9-aabb-4ee1-b2e1-c786c93e56a1",
  "message": "내 별명은 테스트하늘이야.",
  "inputKind": "TEXT"
}
```

| 필드 | 규칙 |
| --- | --- |
| requestId | UUID 문자열. 브라우저에서 `crypto.randomUUID()`로 생성 |
| message | 공백만 있는 문자열 불가, 최대 2,000자 |
| inputKind | `TEXT` 또는 `VOICE` |

`VOICE`도 `message`에는 **이미 문자로 바뀐 전사문**을 넣습니다. 오디오 파일이나 음성 바이너리를 받는 API가 아닙니다. 전송 전에 사용자가 전사문을 확인·수정할 수 있게 만드는 것이 좋습니다.

응답 형태 예시:

```json
{
  "requestId": "2a24b7e9-aabb-4ee1-b2e1-c786c93e56a1",
  "reply": "테스트하늘이라고 불러드릴게요.",
  "sources": [],
  "rag": { "status": "NOT_REQUESTED", "method": "", "retrievedChunks": 0 },
  "provider": "gemini",
  "model": "gemini-3.5-flash-lite",
  "liveVerified": true,
  "historySize": 2
}
```

`historySize`는 성공 후 그 세션에 저장한 **메시지 수**입니다. 질문 1회와 답변 1회가 합쳐 2개입니다. 요청 횟수와 혼동하지 않습니다. 실제 응답에는 `actions`, `proposals`, 캘린더 저장 결과가 없습니다.

정책·기관·행사 정보에서 근거가 확인되면 `sources`에는 다음 필드가 들어갑니다.

| 필드 | 의미 |
| --- | --- |
| id | 검색 청크 ID |
| title | 자료 제목 |
| text | DB 청크에 정확히 존재하는 확인된 발췌문 |
| sourceUrl | 자격 증명이 없는 공식 출처 URL |
| reviewedAt | API 자동 수집 자료에서는 빈 문자열. 사람 검토일을 만들지 않음 |
| fetchedAt | 해당 자료를 수집한 시각 |
| sourceUpdatedAt | 원 API가 제공한 갱신일/기준 연도 등. 없으면 빈 문자열 |
| sourceKind | POLICY / HOSPITAL / EVENT |

`reply`와 `sources[].text`는 HTML로 실행하지 말고 텍스트로 표시합니다. 출처 링크와 수집일은 답변 가까이에 함께 표시해야 근거를 확인할 수 있습니다.

### RAG 상태

| status | 의미 | 모델 호출 |
| --- | --- | --- |
| NOT_REQUESTED | 일반 대화·공감 등 자료 검색을 요청하지 않은 경우 | Gemini |
| SUPPORTED | 검색한 청크에서 인용문을 정확히 대조함 | Gemini |
| NO_MATCH | 현재 자료에서 검색 근거를 찾지 못함 | 호출하지 않음, provider=retrieval |
| UNGROUNDED | 검색 결과는 있으나 모델이 고른 인용문을 검증하지 못함 | 호출했지만 사실 답변은 보류 |

`SUPPORTED`는 발췌와 저장 자료의 일치를 뜻합니다. 개인별 수급 자격이나 지원 금액을 확정하는 표시로 사용하지 않습니다. 병원·행사 정보도 각각 그 종류의 자료로 표시합니다.

### 안전한 재시도 규칙

전송할 때 UUID와 본문 전체를 한 묶음으로 보관합니다. 네트워크 연결이 끊겨 결과를 못 받았을 때는 **동일한 requestId·message·inputKind**로 다시 보냅니다. 성공했던 동일 요청이면 저장된 응답을 돌려주고 대화를 중복 추가하지 않습니다.

사용자가 문장을 수정하거나 새 질문을 보내면 새 UUID를 만듭니다. 같은 ID에 다른 본문을 넣으면 HTTP 409 `REQUEST_ID_REUSED`입니다. 실패한 API 호출은 대화에 추가하지 않으므로 같은 묶음으로 다시 시도할 수 있습니다.

## 4. 대화 읽기와 초기화

```http
GET /api/chatbot/conversation
```

```json
{
  "messages": [
    { "role": "user", "text": "내 별명은 테스트하늘이야." },
    { "role": "assistant", "text": "테스트하늘이라고 불러드릴게요." }
  ]
}
```

현재 조회는 역할·텍스트만 반환합니다. 이전 답변의 출처 카드까지 서버에서 복원하는 응답은 아닙니다. 최대 40회 대화 후에는 새 대화를 시작해야 합니다. 모델에는 최근 8회만 전달하므로 오래된 대화 전체를 계속 기억한다고 표시하지 않습니다.

```http
DELETE /api/chatbot/conversation
```

성공 응답은 204이며 JSON 본문이 없습니다. 이때 프런트엔드의 대화 목록과 재시도 대기 요청도 비웁니다. 서버의 공공자료 DB·커뮤니티 데이터·API 키는 삭제하지 않습니다. 분당 요청 제한은 유지됩니다.

## 5. 프런트엔드 연결 예시

아래는 연결 방법을 설명하는 예시이며 기존 프런트엔드 파일을 수정한 코드는 아닙니다.

```js
// 로컬 H2 테스트. 기존 서버 프록시를 쓰면 BASE = ""로 조정합니다.
const BASE = "http://127.0.0.1:8083";

async function api(path, options = {}) {
  const response = await fetch(BASE + path, {
    ...options,
    credentials: "include", // 동일 브라우저 세션 쿠키를 주고받기
  });
  if (response.status === 204) return null;
  const data = await response.json();
  if (!response.ok) throw data;
  return data;
}

let pendingRequest = null;
async function sendNewMessage(message, inputKind = "TEXT") {
  pendingRequest = { requestId: crypto.randomUUID(), message, inputKind };
  return retryPendingMessage();
}
async function retryPendingMessage() {
  if (!pendingRequest) return null;
  const result = await api("/api/chatbot/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pendingRequest),
  });
  pendingRequest = null;
  return result;
}
```

전송 중에는 전송 버튼을 잠가 요청이 겹치지 않게 합니다. 오류 후 재시도 버튼은 `retryPendingMessage()`를 호출하고, 문장을 편집했다면 `sendNewMessage()`로 새 ID를 만듭니다. 화면을 처음 열면 `GET /conversation`으로 현재 세션 대화를 읽습니다.

브라우저 주소와 API 주소의 호스트는 가능한 한 동일하게 맞춥니다. 예를 들어 화면도 `http://127.0.0.1:5173`, 서버도 `http://127.0.0.1:8083`를 사용합니다. `localhost`와 `127.0.0.1`을 섞으면 쿠키 정책 때문에 같은 세션으로 이어지지 않을 수 있습니다.

화면 Origin은 서버의 `RAG_ALLOWED_ORIGINS`에 scheme·host·port까지 정확히 등록합니다. `*`는 사용하지 않습니다. 기존 Vite의 `/api` 프록시가 8080을 향한다면 로컬 8083 서버로 자동 연결되는 것이 아니므로 실행 대상에 맞게 BASE 또는 프록시를 선택해야 합니다.

## 6. 화면 없이 터미널에서 대화 확인

다음은 macOS 터미널 예시입니다. 위 실행 가이드대로 AI 서버를 먼저 켭니다. 쿠키 파일을 재사용해야 질문이 한 대화로 이어집니다. 실제 이름 대신 가상 별명으로 시험합니다.

첫 질문:

```bash
curl -sS -c /tmp/remind-rag.cookies -b /tmp/remind-rag.cookies \
  -H 'Content-Type: application/json' \
  -d '{"requestId":"2a24b7e9-aabb-4ee1-b2e1-c786c93e56a1","message":"내 별명은 테스트하늘이야.","inputKind":"TEXT"}' \
  http://127.0.0.1:8083/api/chatbot/chat
```

이어 묻기:

```bash
curl -sS -c /tmp/remind-rag.cookies -b /tmp/remind-rag.cookies \
  -H 'Content-Type: application/json' \
  -d '{"requestId":"b723c672-bbbc-4111-a955-fb9999c70da2","message":"내 별명은 뭐라고 했지?","inputKind":"TEXT"}' \
  http://127.0.0.1:8083/api/chatbot/chat
```

수집한 복지 자료로 질문하기:

```bash
curl -sS -c /tmp/remind-rag.cookies -b /tmp/remind-rag.cookies \
  -H 'Content-Type: application/json' \
  -d '{"requestId":"03ab575b-25e4-4415-a672-a1e89d841533","message":"치매 관련 복지 지원의 대상 조건을 알려줘.","inputKind":"TEXT"}' \
  http://127.0.0.1:8083/api/chatbot/chat
```

응답의 `rag.status`, `sources`, `provider`를 봅니다. 자료가 없을 때 NO_MATCH가 나오는 것은 불충분한 자료로 답을 만들지 않았다는 뜻입니다. 날짜·정책명을 더 구체화하거나 수집 범위를 확인할 수 있습니다.

초기화:

```bash
curl -sS -b /tmp/remind-rag.cookies -X DELETE \
  http://127.0.0.1:8083/api/chatbot/conversation
```

예시 UUID를 사용한 문장을 바꿔 다시 보내려면 UUID도 바꿉니다. 위 명령을 그대로 재실행하면 동일 요청 결과를 재사용합니다.

## 7. 오류 응답

```json
{
  "code": "GEMINI_NOT_CONFIGURED",
  "message": "Gemini API 키가 설정되지 않았습니다.",
  "retryable": false
}
```

| HTTP | 대표 code | 처리 |
| --- | --- | --- |
| 400 | INVALID_REQUEST | 입력 길이·UUID·inputKind 확인 |
| 403 | ORIGIN_DENIED | 정확한 화면 Origin 허용 설정 확인 |
| 409 | REQUEST_ID_REUSED | 수정한 문장에는 새 UUID 사용 |
| 409 | CONVERSATION_LIMIT | 필요한 내용을 확인한 뒤 대화 초기화 |
| 429 | RATE_LIMITED / GEMINI_LIMIT / AI_BUSY | 잠시 기다린 뒤 동일 요청 묶음으로 재시도 |
| 502 | GEMINI_INVALID_RESPONSE / INVALID_MODEL_RESPONSE | 응답 형식 오류. 중복 추가 없이 재시도 가능 |
| 503 | GEMINI_NOT_CONFIGURED / GEMINI_CONFIGURATION | 서버의 키·계정 설정 확인 |
| 503 | GEMINI_MODEL_CONFIGURATION / GEMINI_UNAVAILABLE | 모델 설정 또는 연결 상태 확인 |
| 503 | RAG_DB_UNAVAILABLE / RAG_INDEX_LIMIT | DB·스키마·자료량 확인 |

API 키, 원문 외부 응답 전체, JDBC URL을 오류창에 표시하지 않습니다. 지금의 HttpSession 방식은 로그인 인증·가족 권한을 대신하지 않습니다. 정식 서비스로 통합할 때 회원 인증과 세션 정책을 함께 설계해야 합니다.

