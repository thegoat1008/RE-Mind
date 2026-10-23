# RE-Mind AI 전용 서버: Gemini 대화와 공공자료 RAG

이 모듈은 기존 Spring Boot backend에 AI API를 추가합니다. 기존 DataSource를 받아 별도 `ai_rag_documents` 테이블을 사용합니다. 프런트엔드는 [API 계약](API-RAG.md)에 맞춰 연결합니다.

현재 팀 구성은 **AI 전용 AIStudy DB와 커뮤니티 DB를 분리**합니다. AI는 `rag,rag-mysql` 프로필과 8083 포트의 별도 서버 프로세스로 실행합니다. 커뮤니티 서버는 팀의 기존 DB 설정을 유지합니다. 프로세스마다 DataSource 하나를 쓰며, 커뮤니티 자료를 AI DB에 복사하지 않습니다.

## 이번 구현이 하는 일

사용자가 글로 질문하면 Gemini가 앞선 대화를 참고해 답합니다. 정책·법률·병원 위치·행사 정보처럼 근거가 필요한 질문은 먼저 등록된 공공자료를 검색합니다. 자료가 없거나 인용을 대조하지 못하면 답을 확정하지 않습니다.

처리 순서는 다음과 같습니다.

```text
수집 명령을 수동 실행
  → 공공 API에서 목록과 상세 자료 가져오기
  → 기존 DataSource의 ai_rag_documents에 원자적으로 저장
  → Java BM25 + 한국어 두 글자 단위 검색 색인 구성

사용자 질문
  → 필요한 자료 종류 선택
  → 질문과 관련된 청크 최대 4개 검색
  → 최근 대화 + 검색한 구간을 Gemini에 전달
  → Gemini가 선택한 발췌문을 Java가 원문 청크와 대조
  → 확인된 발췌·출처·수집일을 응답
```

**RAG는 모델을 새로 학습시키는 작업이 아닙니다.** 질문할 때 필요한 자료를 찾아 함께 주는 방식입니다. 현재 구현은 임베딩 API나 벡터 DB를 사용하지 않으며 fine-tuning도 하지 않습니다. 단어 기반 BM25와 한국어 bigram 검색을 사용합니다. 일반 공감 대화는 Gemini 지시문과 대화 이력을 활용합니다. 별도의 상담 전문 모델이나 상담 자료 학습을 완료한 상태는 아닙니다.

정책 정보 응답에서는 Gemini의 자유로운 정책 설명을 그대로 내보내지 않습니다. 검증된 자료 발췌를 출처 카드로 반환합니다. 정확히 인용했다는 사실은 추적 가능성을 뜻하며, 사용자의 자격·지원금·법률 판단을 확정하거나 질문과의 관련성을 완벽하게 보장하지는 않습니다.

## 어떤 자료를 수집하는가

| 종류 | 제공처와 수집 내용 | 사용 범위 |
| --- | --- | --- |
| POLICY | 복지로 공공 API의 복지서비스 목록 + 개별 상세 내용 | 지원 대상·선정 기준·지원 내용·신청 방법 등 상세 자료에 있는 내용 |
| HOSPITAL | 건강보험심사평가원 병원 기본정보 API | 병원명·위치 등 기관 정보. 치매 전문성이나 지원 자격을 보증하지 않음 |
| EVENT | 중앙치매센터 행사 관련 공공데이터 | 행사·프로그램·모집 정보. 복지 급여 자격의 근거로 사용하지 않음 |

복지서비스는 제목·짧은 요약만으로 자격 안내를 만들지 않도록 상세 호출을 함께 사용합니다. 상세 수집에 실패하면 그 수집 배치를 저장하지 않고 기존 DB 자료를 유지합니다.

복지 상세에 법령 이름이나 근거 법령 항목이 포함될 수는 있지만 **법령 조문 전체를 수집하는 모듈은 없습니다.** 법률 상담을 위한 판례·조문 전문 자료가 준비된 상태로 설명하면 안 됩니다.

수집은 페이지·상세 개수 제한 안에서만 이뤄집니다. 행사를 한 번 수집했다고 제공처 전체 자료를 가져온 것은 아닙니다. 과거 행사·원문 갱신 지연도 있을 수 있으므로 `fetchedAt`과 `sourceUpdatedAt`을 구분해 봅니다. 수집일은 사람이 검토한 날짜가 아닙니다.

공식 자료는 다음 데이터 안내 페이지를 확인할 수 있습니다.

- [복지서비스 공공데이터](https://www.data.go.kr/data/15090532/openapi.do)
- [병원 기본정보 공공데이터](https://www.data.go.kr/data/15001698/openapi.do)
- [행사 공공데이터](https://www.data.go.kr/data/15161440/fileData.do)

## 파일을 넣을 위치

AI 소스는 기존 저장소의 다음 위치에 들어갑니다.

```text
backend/
  src/main/java/com/remind/rag/       AI API·Gemini·RAG·공공 API 수집 코드
  src/main/resources/
    application-rag.properties       공통 AI 설정
    application-rag-local.properties 명시적 로컬 H2 테스트 설정
    application-rag-mysql.properties 팀 MySQL 연결 설정 (Hibernate 자동 DDL 없음)
    rag/schema.sql                   AI 소유 테이블 생성 SQL
  src/test/java/com/remind/rag/       AI 모듈 테스트
  rag.env.example                    빈 키 설정 예제
  README-RAG.md
  API-RAG.md
```

별도 `@SpringBootApplication`이나 DataSource를 추가하지 않습니다. 기존 `RemindApplication`에서 `com.remind.rag` 패키지를 함께 스캔합니다. 캘린더·돌봄 기록 저장, 이벤트 DB 자동 등록, 가족 공유, 커뮤니티 글을 RAG로 수집하는 동작은 없습니다. `inputKind=VOICE`는 이미 전사된 텍스트의 입력 구분일 뿐이며 음성 인식 서버는 포함하지 않습니다.

프로젝트는 Java 17·Spring Boot 4.1.1·Spring Data JPA·MySQL/H2를 사용합니다. `backend/build.gradle`에는 다음 세 의존성이 반영되어 있습니다. 버전을 따로 적지 않고 Spring Boot 의존성 관리를 사용합니다. 다른 프로젝트에 이 모듈을 이식할 때도 세 항목이 있는지 확인합니다.

```groovy
implementation 'org.springframework.boot:spring-boot-starter-validation'
testImplementation 'org.springframework.boot:spring-boot-starter-webmvc-test'
testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
```

## 처음 실행하기: 팀 DB 없이 로컬 H2로 확인

아래 명령은 **VS Code에서 기존 RE-Mind 폴더를 열고, Terminal → New Terminal**로 새 터미널을 만든 뒤 실행합니다. 터미널의 현재 위치가 저장소 루트라고 가정합니다. macOS 명령이며 Windows에서는 `./gradlew` 대신 `gradlew.bat`를 사용합니다.

### 1. backend 폴더로 이동하고 Java 확인

```bash
cd backend
java -version
```

JDK 17을 사용합니다. Gradle 프로젝트의 toolchain도 17입니다. `java`를 찾지 못하면 JDK를 설치하거나 VS Code 터미널의 Java 경로부터 설정합니다.

### 2. 로컬 설정 파일 만들기

`backend/rag.env.example`을 복사해 **같은 backend 폴더에 `.env.rag`**를 만듭니다. `.env.rag`가 이미 있으면 복사로 덮어쓰지 말고 기존 파일을 엽니다. 예제 파일에는 실제 키가 없습니다.

복사한 `.env.rag`에서 다음 값을 로컬 편집기로 입력합니다.

- `GEMINI_API_KEY`: 실제 대화용 Gemini 키
- `PUBLIC_DATA_SERVICE_KEY`: 공공 API 수집용 키
- `GEMINI_MODEL`: 기본값은 현재 소스의 `gemini-3.5-flash-lite`

공공데이터 키 하나가 있어도 각 서비스의 활용 승인·사용 가능 상태가 다를 수 있습니다. 키는 Java 서버에만 넣습니다. 프런트엔드 코드, 브라우저 입력창, 채팅, GitHub에 붙이지 않습니다. `.env.rag`는 Git 추적 제외 대상이며 예제 파일만 공유합니다.

현재 구조는 backend 폴더에서 실행할 때 `./.env.rag`를 읽습니다. 다른 폴더에서 실행하면 상대 경로가 달라지므로 아래 명령은 계속 **backend 폴더**에서 실행합니다.

### 3. 테스트하고 실행 JAR 만들기

```bash
./gradlew test bootJar --no-daemon
```

정상 종료하면 다음 실행 파일이 생성됩니다.

```text
backend/build/libs/remind-backend-0.0.1-SNAPSHOT.jar
```

다음 단계는 이 JAR를 사용합니다. `-plain.jar`가 함께 보이더라도 위 이름의 실행 JAR를 선택합니다. 코드 수정 후에는 이 빌드 명령을 다시 실행해야 JAR에 변경 내용이 반영됩니다.

### 4. 공공자료를 먼저 수집

**로컬 H2 파일을 사용하는 서버가 켜져 있으면 해당 터미널에서 Control+C로 종료합니다.** 동일한 H2 파일을 서버와 별도 수집 프로세스가 동시에 열지 않도록 합니다. 아래 세 명령은 한 번에 하나씩 실행하고, 앞 명령이 끝나 터미널 입력 표시가 돌아온 뒤 다음 명령을 실행합니다.

복지서비스 목록에서 `치매`로 검색하고, 정해진 한도 안에서 개별 상세를 가져옵니다.

```bash
java -jar build/libs/remind-backend-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=rag,rag-local,rag-import \
  --spring.main.web-application-type=none \
  --rag.import.source=welfare \
  --rag.import.query=치매 \
  --rag.import.max-pages=1 \
  --rag.import.max-details=10
```

병원은 **병원명 검색어**로 조회합니다. 아래 이름은 사용자가 바꿀 수 있습니다. 이름에 치매가 없다고 치매 진료가 불가능한 것은 아니며, 조회 결과 자체가 치매 전문병원 판정을 뜻하지 않습니다.

```bash
java -jar build/libs/remind-backend-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=rag,rag-local,rag-import \
  --spring.main.web-application-type=none \
  --rag.import.source=hospital \
  --rag.import.query=서울대학교병원 \
  --rag.import.max-pages=1
```

행사·프로그램 자료는 페이지 한도 안에서 수집합니다.

```bash
java -jar build/libs/remind-backend-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=rag,rag-local,rag-import \
  --spring.main.web-application-type=none \
  --rag.import.source=events \
  --rag.import.max-pages=1
```

성공하면 `RAG_IMPORT source=... fetched=... stored=... status=IMPORTED` 형식의 로그가 나옵니다. 실제 건수는 실행 결과로 확인합니다. `stored`는 그 배치의 저장 대상 건수이며 **기존 자료 대비 새로 추가된 행 수**는 아닙니다. 같은 외부 ID는 갱신하고, 이번에 조회되지 않은 기존 자료를 자동 삭제하지 않습니다.

실패 로그가 나오면 API 키·서비스 승인·호출 제한·검색 조건을 확인합니다. 실패한 수집 때문에 기존 정상 자료를 지우지 않습니다. 현재 구현에는 자동 수집 스케줄러나 웹 수집 관리자 API가 없습니다.

### 5. AI 서버 실행

```bash
java -jar build/libs/remind-backend-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=rag,rag-local
```

서버 시작 로그가 나오면 다음 주소를 열거나 curl로 확인합니다.

- `http://127.0.0.1:8083/api/chatbot/config`: 키 설정 여부와 실제 Gemini 호출 검증 상태
- `http://127.0.0.1:8083/api/chatbot/knowledge/status`: DB 자료 종류별 보관 건수

이 버전에는 새 채팅 화면이 없습니다. 주소를 열면 JSON이 보이는 것이 정상입니다. 대화 요청 예시와 기존 화면에 연결할 fetch 예시는 [API-RAG.md](API-RAG.md)에 있습니다.

`configured=true`는 키 문자열이 설정되었다는 뜻입니다. 실제 호출 성공과는 다릅니다. Gemini 요청을 보내 유효한 응답을 받은 뒤 `liveVerified=true`가 됩니다. 자료 검색 결과가 없어 `provider=retrieval`로 답한 경우에는 Gemini 호출을 하지 않습니다.

종료는 서버를 실행한 터미널에서 **Control+C**입니다. 로컬 정책 자료는 `backend/data/rag.mv.db`에 보관됩니다. 대화는 DB가 아니라 현재 서버의 브라우저 HTTP 세션에 임시 보관됩니다.

## 기존 팀 DB에 연결할 때

### 팀원 컴퓨터의 MySQL

`rag,rag-mysql` 프로필은 기존 DataSource를 MySQL에 연결합니다. 이 프로필은 Hibernate 자동 테이블 생성·수정을 끄고, AI 서버만 `127.0.0.1:8083`에 열어 둡니다. DB 자체는 `.env.rag`의 서버 주소를 사용합니다.

같은 저장소/JAR를 메인에 합친 뒤에도 AI와 커뮤니티는 서로 다른 프로필로 별도 실행할 수 있습니다. 한 프로세스의 `dev,rag` 조합은 그 dev DB를 함께 사용하므로, 분리된 AIStudy를 자동 선택한다고 생각하면 안 됩니다. AIStudy 실행에는 명시적으로 `rag,rag-mysql`을 선택합니다. `knowledge/status`의 `shared-datasource`는 해당 AI 프로세스 안의 DataSource를 쓴다는 표시이며 커뮤니티 DB와 같다는 뜻은 아닙니다.

Git 추적 제외 파일 `backend/.env.rag`에 `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`를 설정합니다. 팀원 컴퓨터의 DB를 쓰려면 `DB_HOST`에 네 Mac에서 도달할 수 있는 팀원 IP나 도메인을 넣습니다. `127.0.0.1`은 명령을 실행하는 컴퓨터 자신을 가리킵니다.

```bash
java -jar build/libs/remind-backend-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=rag,rag-mysql
```

VS Code에서는 저장소를 열고 `Terminal → New Terminal`에서 위 명령을 실행합니다. 개인 작업 폴더에 별도 실행 Task를 등록했다면 프로필이 `rag,rag-mysql`인지 확인합니다. 실행 Task는 서버의 API 키나 DB 비밀번호를 포함하지 않도록 합니다.

AI 전용 테이블은 DB 담당자가 `rag/schema.sql`로 한 번 만들거나, 최초 수집 명령에만 `--rag.schema.initialize=true`를 줍니다. 기존 DB 자체를 새로 만들거나 커뮤니티 테이블을 변경하지 않습니다.

```bash
java -jar build/libs/remind-backend-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=rag,rag-mysql,rag-import \
  --spring.main.web-application-type=none \
  --rag.schema.initialize=true \
  --rag.import.source=welfare
```

포트 접속 성공과 DB 로그인 성공은 구분합니다. 오류 1130은 서버가 클라이언트 호스트의 접속을 허용하지 않았다는 의미입니다. 이 경우 DB 담당자가 사용자의 접속 IP/계정을 허용한 뒤 다시 확인합니다. 비밀번호 검증·테이블 조회·저장이 성공한 것으로 표시하면 안 됩니다. [MySQL 공식 접속 문제 안내](https://dev.mysql.com/doc/refman/8.0/en/problems-connecting.html)

이 프로필의 `sslMode=PREFERRED`는 서버가 지원하면 TLS를 사용하며, 지원하지 않으면 평문 연결로 이어질 수 있습니다. CA 검증을 완료했다는 뜻은 아닙니다. Aiven의 인증서 검증 설정은 아래 `dev/prod` 프로필을 사용합니다. [Connector/J 공식 연결 보안 설정](https://dev.mysql.com/doc/connector-j/en/connector-j-connp-props-security.html)

### Aiven 또는 기존 팀 프로필

팀 DB 접속 자격 증명과 인증서가 이 AI 코드에 들어 있지 않습니다. **현재 팀 Aiven DB에 연결·저장되는지는 검증하지 않았습니다.** 공공 API 수집과 로컬 H2 검증이 성공해도 실제 Aiven 접속 검증을 대신하지 않습니다.

기존 DB 프로필 뒤에 `rag`를 함께 지정합니다.

| 실행 프로필 | 사용하는 DB |
| --- | --- |
| `dev,rag` | 기존 Aiven 개발 설정 |
| `prod,rag` | 기존 Aiven 운영 설정 |
| `community-mysql,rag` | 기존 로컬 MySQL 개발 설정 |
| `rag,rag-mysql` | 로컬 환경 파일에 지정한 팀 MySQL, Hibernate DDL 실행 안 함 |
| `rag,rag-local` | 명시적으로 선택한 별도 AI 테스트 H2 파일 |

`rag`만 켜면 DB 프로필 누락 오류로 중단합니다. `rag` 공통 설정은 기존 DataSource·DDL 모드·서버 포트를 바꾸지 않습니다. `rag-local`은 별도 H2 파일과 8083 포트를 사용하고, `rag-mysql`은 지정한 MySQL과 8083 포트를 사용합니다. 두 DB 프로필을 동시에 켜지 않습니다.

팀 DB에서는 먼저 `src/main/resources/rag/schema.sql`의 **AI 테이블 생성 SQL만** 검토해 한 번 적용합니다. 공통 설정의 `rag.schema.initialize` 기본값은 false입니다. 개발용 DB에서 자동 생성을 명시적으로 허용하려면 최초 실행에만 `--rag.schema.initialize=true`를 줄 수 있습니다. 이후에는 옵션을 제거합니다. `rag-local`은 테스트 편의를 위해 이 옵션을 true로 정해 두었습니다.

기존 프로필의 Hibernate `ddl-auto`를 AI 때문에 전역 변경하지 않습니다. RAG 테이블은 JDBC 저장소이므로 Hibernate 엔티티 생성으로 만들어지지 않습니다. 실제 팀 DB에서는 기존 Aiven TLS·PKCS12 인증서 설정도 그대로 필요합니다.

예를 들어 팀의 개발 DB가 준비되고 SQL도 적용된 후 실행하는 명령은 다음과 같습니다. 접속 값은 기존 팀의 로컬 환경 설정으로 제공합니다.

```bash
java -jar build/libs/remind-backend-0.0.1-SNAPSHOT.jar \
  --spring.profiles.active=dev,rag
```

수집도 같은 DB 프로필을 선택해야 합니다. `dev,rag,rag-import`와 non-web 옵션으로 실행하면 그 개발 DB에 저장합니다. 로컬 H2에서 수집한 자료가 팀 MySQL로 자동 이전되는 구조는 아닙니다.

## 대화와 검색의 현재 한계

- 한 브라우저 세션에서 최대 40회 대화합니다. Gemini에는 최근 8회, 즉 user/assistant 합계 최대 16개 메시지를 전달합니다.
- 새로고침 시 같은 세션 쿠키를 보내면 대화를 다시 읽을 수 있습니다. 서버 재시작·세션 만료·쿠키 변경 이후의 복원은 보장하지 않습니다.
- 대화 초기화는 그 세션의 챗봇 대화만 지웁니다. 정책 DB와 커뮤니티 데이터는 지우지 않습니다. 요청 제한도 초기화하지 않습니다.
- 요청은 세션별 분당 12회 제한입니다. API 실패는 대화 이력에 추가하지 않아 같은 requestId로 다시 시도할 수 있습니다.
- 정책·기관·행사별 최대 1,000건을 보관합니다. 검색 청크는 480자, 겹침은 약 100자이며 질문당 최대 4개·문서당 최대 2개를 반환합니다. 색인은 30초 캐시하고 수집 성공 후 무효화합니다.
- 병원·행사 자료는 복지 자격·급여 금액을 확정하는 근거로 섞지 않습니다. 확인된 발췌가 있어도 개인에게 적용 가능한지는 별도 확인이 필요합니다.
- 현재 사용자 식별은 익명 HttpSession입니다. 정식 로그인, 가족별 접근 권한, 영구 대화 저장은 별도 통합 작업입니다.
- 실제 정확도 향상률이나 이용자 상담 효과를 측정한 결과는 없습니다. 아래 검증 결과는 코드 동작과 일부 실제 호출 확인이며 서비스 정확도 전체를 뜻하지 않습니다.

## 이번 통합 검증에서 확인한 결과

2026-10-24 확인 결과입니다.

- 로컬 작업 트리와 동일한 소스로 구성한 빌드에서 테스트 195개와 실행 JAR 빌드가 통과했습니다.
- GitHub main 기준 커뮤니티 코드와 RAG를 합친 검증에서는 테스트 129개와 실행 JAR 빌드가 통과했습니다.
- 이 검증에서 사용한 main 커밋은 `033b00b95df0d9c88e42a3d61d95aa818a9786b1`입니다.
- 정책 질문 뒤 병원 찾기로 전환하면 병원 자료로 새 검색을 하고, 정책 내 신청 서류·지역 후속 질문은 문맥을 유지하는 서비스 회귀 테스트를 확인했습니다.
- 최종 PR JAR의 실제 MySQL 재기동은 DB 연결 시간 초과가 발생했습니다. 앞서 확인한 MySQL 저장·정책 답변 기록과 구분하며, 최종 JAR는 명시적 로컬 H2 공개자료 복사본으로 기동했습니다. 실제 Gemini 대화에서 정책 질문은 POLICY 출처, 이어진 병원 질문은 HOSPITAL 출처를 반환하고 두 응답 모두 HTTP 200·SUPPORTED인 것을 확인했습니다.
- 실제 공공 API 수집으로 POLICY 8건·HOSPITAL 2건·EVENT 100건이 로컬 H2 DB에 저장됐습니다. 제공처 전체 자료를 수집한 건수가 아닙니다.
- 실제 Gemini에 `가사·간병 방문 지원사업의 지원 대상을 알려줘`를 전송해 SUPPORTED 응답을 확인했습니다. DB 청크와 일치하는 발췌, 복지로 출처 URL, 수집일·원 자료 기준 연도도 확인했습니다.
- 같은 requestId 재시도가 응답을 재사용하고 질문·답변 메시지가 총 2개만 남는 것도 확인했습니다.
- 치매치료관리비가 섞인 다른 복합 질문은 청크 4개가 검색됐지만 UNGROUNDED로 답을 보류했습니다. 원인을 확정하지 않았으므로 이를 단순히 “자료가 없어서”라고 설명할 수는 없습니다. 검색 성공과 근거 있는 답변 성공을 구분해 추가 평가해야 합니다.

검증에 사용한 8083 서버는 종료했습니다. 예전 8082 데모 서버와는 다른 실행 대상입니다. 다시 시험하려면 위 실행 명령으로 8083 서버를 직접 켭니다. 실제 팀 Aiven DB 연결 검증과 음성 인식 검증은 이 결과에 포함하지 않습니다.

추가 팀 MySQL 검증에서는 접속 허용 후 로그인·DB 조회가 성공했습니다. AI 전용 `ai_rag_documents` 테이블을 만들고 복지 정책 8건·병원 2건·행사 100건을 실제 MySQL에 저장했습니다. 테이블은 InnoDB·utf8mb4 구성이며, 커뮤니티 DB는 별도로 유지합니다.

실제 MySQL에 저장된 정책으로 `가사·간병 방문 지원사업의 지원 대상을 알려줘`를 요청해 HTTP 200, Gemini `liveVerified=true`, RAG `SUPPORTED`, 공식 출처와 수집일 반환을 확인했습니다. 동일 요청 재전송은 응답을 재사용했고 대화 이력은 2개로 유지됐습니다.

검증 중 오류 1130과 일시적인 연결 시간 초과가 있었고, 접속 허용·재연결 후 위 결과를 확인했습니다. 외부 API도 한 차례 오류 후 재호출이 성공했습니다. 팀원 DB가 실행 중이고 네트워크 연결이 유지돼야 사용할 수 있습니다. 개발용 수집은 AI 테스트 서버를 종료하고 자료 종류별로 순서대로 실행했으며, 수집 프로세스에는 작은 연결 풀(`--spring.datasource.hikari.maximum-pool-size=2 --spring.datasource.hikari.minimum-idle=1`)을 사용했습니다. 연결 시간 초과의 원인을 특정 설정으로 확정하지는 않았습니다.

## 자주 막히는 부분

| 현상 | 확인할 것 |
| --- | --- |
| `GEMINI_NOT_CONFIGURED` | backend/.env.rag의 키 설정과 실행 위치를 확인하고 서버 재시작 |
| `GEMINI_CONFIGURATION` / `GEMINI_MODEL_CONFIGURATION` | 키 권한과 설정한 모델 이름 확인 |
| `PUBLIC_DATA_AUTH` | 해당 공공 서비스 활용 승인과 키 확인 |
| `RAG_DB_UNAVAILABLE` | DB 프로필·접속 설정·AI 테이블 생성 여부 확인 |
| H2 파일 사용 중 오류 | 같은 파일을 사용하는 서버/수집 명령을 종료한 뒤 하나씩 실행 |
| `NO_MATCH` | DB 수집 건수와 질문 범위를 확인. 자료 없는 답을 만들어 주는 상태가 아님 |
| `UNGROUNDED` | 검색 결과는 있으나 인용 검증 실패. 다른 질문이나 보완 자료가 필요 |
| 새로고침 후 대화가 사라짐 | 동일한 호스트·세션 쿠키인지, fetch에 credentials가 있는지 확인 |
| `ORIGIN_DENIED` | 화면 주소의 정확한 scheme·host·port를 허용 목록에 추가하고 재시작 |

