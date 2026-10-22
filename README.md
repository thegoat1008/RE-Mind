# RE-mind

Spring Boot + React(JavaScript) + Aiven MySQL 웹앱입니다.

## 필요한 프로그램

- JDK 17 (백엔드 컴파일에 사용하는 버전)
- Node.js 20.19 이상 또는 22.12 이상
- Aiven MySQL 서비스

## Aiven 연결 준비

1. Aiven Console에서 MySQL 서비스를 만들고 실행 상태가 될 때까지 기다립니다.
2. Overview의 Connection information에서 Host, Port, User, Password, Database name을 확인합니다. 포트는 Aiven에 표시된 값을 사용합니다.
3. CA 인증서 `ca.pem`을 내려받아 `backend/certs/ca.pem`에 저장합니다.
4. `backend` 폴더에서 아래 명령으로 Java용 인증서 저장소를 만듭니다. 새 저장소 암호는 직접 정합니다.

   ```bash
   keytool -importcert -alias aiven-ca -file certs/ca.pem -keystore certs/aiven-truststore.p12 -storetype PKCS12
   ```

   표시되는 인증서가 Aiven에서 내려받은 인증서인지 확인한 뒤 신뢰 여부에 `yes`를 입력합니다.

5. 저장소 루트의 `.env.example`을 복사해 같은 위치에 `.env`를 만들고 Aiven 접속 정보와 위에서 정한 저장소 암호를 입력합니다. 값에 따옴표를 붙이지 않습니다. `DB_TRUSTSTORE_URL`에는 인증서 저장소의 절대 경로를 `file:/...` 형태로 입력합니다.

`.env`와 `backend/certs` 안의 인증서 파일은 Git에 올라가지 않습니다. 프런트엔드에는 DB 비밀번호를 넣지 않습니다.

## 실행하기

백엔드:

```bash
cd backend
./gradlew bootRun
```

Windows에서는 `gradlew.bat bootRun`을 사용합니다.

IntelliJ에서는 `backend/build.gradle`을 Gradle 프로젝트로 열고 JDK 17을 프로젝트 SDK와 Gradle JVM으로 선택합니다. `RemindApplication`의 실행 설정에서 Working directory를 `backend` 폴더로 지정한 다음 실행합니다. 이 위치를 기준으로 저장소 루트의 `.env`를 읽습니다.

다른 터미널에서 프런트엔드:

```bash
cd frontend
npm install
npm run dev
```

http://localhost:5173 에서 화면을 열고 API 연결 확인 버튼을 누릅니다. 개발 중 `/api` 요청은 Vite가 http://localhost:8080 으로 전달합니다.

## 추후 배포 설정

배포 서비스의 환경 변수에 `.env.example`의 `DB_*` 값을 등록합니다. 인증서 저장소도 배포 서버에 파일로 제공하고 `DB_TRUSTSTORE_URL`을 서버 안의 경로로 지정합니다. 로컬 컴퓨터 경로를 그대로 사용하면 안 됩니다.

추가 환경 변수:

- `SPRING_PROFILES_ACTIVE=prod`: 개발용 자동 테이블 변경을 끄고 기존 테이블 구조를 검사합니다. 배포 전 테이블을 준비해야 합니다.
- `SERVER_PORT`: 배포 서비스가 요구하는 백엔드 포트입니다. 기본값은 8080입니다.

TLS 연결은 `VERIFY_IDENTITY`로 CA 인증서와 DB 호스트 이름을 확인합니다. Aiven의 CA 인증서가 바뀌면 인증서 저장소도 갱신합니다.

현재 Vite 프록시는 개발용입니다. 실제 배포 시에는 프런트엔드의 `/api` 요청을 백엔드로 전달하는 배포 서버 설정이 필요합니다.

## 폴더 구성

```text
RE-mind/
├── backend/        Spring Boot API
│   └── certs/      Aiven 인증서와 인증서 저장소 (Git 제외)
├── frontend/       React + Vite 화면
├── .env.example    DB 환경 변수 양식
└── README.md
```

## 협업 규칙

### 브랜치

- `main`은 실행 가능한 코드를 유지하는 기본 브랜치입니다.
- 작업을 시작할 때 최신 `main`에서 작업 브랜치를 만듭니다.
- 브랜치 이름은 `작업유형/짧은-영문-설명`으로 작성합니다. 예: `feat/login`, `fix/login-error`, `docs/readme`.
- `main`에 직접 커밋하거나 푸시하지 않고 PR을 통해 반영합니다.

### 커밋 메시지

`타입(범위): 변경 내용` 형식을 사용합니다. 범위는 필요할 때만 작성하고 변경 내용은 한국어로 구체적으로 적습니다.

| 타입 | 사용하는 경우 |
| --- | --- |
| `feat` | 새로운 기능 추가 |
| `fix` | 오류 수정 |
| `docs` | README 등 문서 수정 |
| `style` | 들여쓰기 등 동작에 영향을 주지 않는 코드 형식 수정 |
| `refactor` | 동작을 유지하면서 코드 구조 개선 |
| `test` | 테스트 추가 또는 수정 |
| `chore` | 개발 환경, 의존성, 빌드 설정 변경 |
| `ci` | 자동 빌드 및 배포 설정 변경 |

범위는 `frontend`, `backend`, `db` 등을 사용합니다. 화면 디자인이나 동작 변경은 `style` 대신 변경 목적에 따라 `feat` 또는 `fix`를 사용합니다.

```text
feat(frontend): 로그인 화면 추가
feat(backend): 회원가입 API 추가
fix(backend): 중복 이메일 가입 오류 수정
chore(db): Aiven MySQL 연결 설정 추가
docs: 프로젝트 실행 방법 수정
```

- 한 커밋에는 하나의 목적에 해당하는 변경을 담습니다.
- `수정`, `작업 중`, `최종`처럼 내용이 드러나지 않는 메시지는 피합니다.
- 비밀번호, `.env`, 개인 인증서, 빌드 결과물은 커밋하지 않습니다.

### PR 작성

- 하나의 PR은 하나의 기능이나 수정 목적을 기준으로 작성합니다.
- 제목은 커밋 메시지와 같은 형식을 사용합니다. 예: `feat(backend): 회원가입 API 추가`.
- 대상 브랜치가 `main`인지 확인합니다.
- 진행 중인 작업은 Draft PR로 올리고 리뷰 준비가 되면 Ready for review로 전환합니다.
- 본문에는 변경 이유, 주요 변경 사항, 확인 결과를 적습니다. 확인하지 못한 항목은 그대로 적습니다.
- 화면을 변경했다면 스크린샷을 첨부하고 관련 이슈가 있으면 `Closes #이슈번호`로 연결합니다.

아래 양식을 PR 본문에 복사해서 사용합니다.

```markdown
## 변경 이유
- 이 작업이 필요한 이유

## 주요 변경 사항
- 추가하거나 수정한 내용

## 확인 결과
- 실행 환경과 확인한 동작
- 확인하지 못한 항목이 있다면 이유

## 화면
- 화면 변경이 있을 때 스크린샷 첨부

## 관련 이슈
- 관련 이슈가 있을 때 Closes #이슈번호
```

### 리뷰 및 병합

- 팀원이 함께 작업하는 경우 작성자 외 1명 이상의 승인을 받은 뒤 병합합니다. 혼자 작업하는 기간에는 본인이 변경 내용을 다시 확인한 뒤 병합합니다.
- 리뷰에서 수정이 필요한 의견은 반영하거나 협의한 뒤 해결합니다.
- 충돌이 없고 PR에서 정한 확인 항목이 완료됐는지 확인합니다. 자동 검사를 추가한 뒤에는 해당 검사도 통과해야 합니다.
- 기본 병합 방식은 **Squash and merge**로 하고 최종 커밋 메시지는 PR 제목과 같은 형식으로 작성합니다.
- 병합이 끝난 작업 브랜치는 삭제합니다.

연결 참고: [Aiven MySQL 연결 정보](https://aiven.io/docs/products/mysql/howto/connect-with-dbeaver), [Aiven TLS 인증서](https://aiven.io/docs/platform/concepts/tls-ssl-certificates)
