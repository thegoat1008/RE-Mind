# RE:MIND 커뮤니티 구현 복사본

GitHub `thegoat1008/RE-Mind`의 `main` 커밋 `852f896db0f43f085c5f20b49b63a009a6407a96`을 2026-10-24에 복제해 작업했습니다. 로컬 브랜치는 `1212-LEE`입니다. GitHub의 `1212-LEE` 브랜치와 PR #5에서 작업합니다. 최신 `main`의 디자인·일정·가족 화면 변경을 통합했습니다.

## 보관 위치와 원래 버전으로 돌아가기

상위 `RE_MIND` 폴더에 다음 파일과 폴더가 있습니다.

- `RE-Mind-original-20261024/`: 수정하지 않은 원본. Git 기록과 원격 주소를 포함합니다.
- `RE-Mind-original-20261024.zip`: 위 원본 전체를 보관한 ZIP.
- `RE-Mind-community/`: 커뮤니티 구현용 복사본. 모든 변경은 이 폴더에만 있습니다.

이전 버전을 사용하려면 구현용 서버를 종료하고 원본 폴더를 IDE에서 열어 실행하세요. 파일 덮어쓰기나 `git reset`이 필요하지 않습니다. 원본 ZIP을 새 폴더에 풀어서 사용해도 됩니다. 백업은 GitHub에 올라온 파일 기준이며, 다른 PC·폴더의 미커밋 파일이나 Git에서 제외된 `.env`·개인 인증서는 포함하지 않습니다.

## 현재 화면 상태 (2026-10-24)

추가했던 별도 커뮤니티 디자인(`CommunityApp.jsx`, `community.css`)은 삭제했습니다. 기존 `frontend/src/screens/`의 화면 배치·색상·아이콘을 사용해 실제 서버 기능을 연결했습니다. 게시글·댓글은 예시 문구 대신 DB에서 불러옵니다. 목록은 최신 main의 전체·인기·추천 탭을 사용합니다. 인기는 하트 수순, 추천은 댓글 수·하트 수순이며 개인화 추천은 아닙니다. 검색 아이콘을 누르면 검색·모드 분류·정렬·내 글 필터가 열립니다. 본인 글의 수정·삭제는 상세 화면에 표시됩니다.

`frontend/src/community/useCommunity.js`는 API 호출과 임시 저장을 관리하고, `Bindings.jsx`는 기존 스타일을 사용하는 로딩·오류·필터·본인 글 관리 기능을 제공합니다. `bindings.css`는 동적 본문의 줄바꿈과 높이를 보정합니다. 원래 디자인의 고정 예시 텍스트 치수 때문에 실제 글이 잘리지 않도록 조정했습니다.

실제 MySQL 서버에 연결한 브라우저에서 글 작성·수정·삭제, 댓글 작성·삭제, 하트 추가·취소, 공감 모드 댓글 작성·조회, 검색·내 글 필터·분류·정렬, 새로고침 후 임시 저장 복원과 데이터 보존을 확인했습니다. 검증용 글은 정리했습니다. 백엔드 통합 테스트 5개(실패 0개), 프런트엔드 빌드도 통과했습니다. 음성 입력은 브라우저 SpeechRecognition 지원 및 마이크 권한이 필요하며, 실제 마이크 인식은 이번 검증에 포함하지 않았습니다.

## 현재 연결된 기능

- 게시글 생성·조회·수정·삭제 및 DB 저장.
- 제목·내용 검색, 해결책·공감 모드 필터, 내 글 필터, 최신순·공감 많은 순, 페이지 이동.
- 해결책·공감 글의 댓글 작성·조회·삭제, 댓글 더 보기.
- 최신 main 디자인과 사용자 확인에 따라 공감 글도 댓글을 허용합니다. 공감 댓글 안내 문구를 유지합니다.
- 하트 추가·취소, 사용자별 중복 방지. 조회수는 같은 브라우저의 작성자 식별 정보당 글별 1회.
- 익명 닉네임, 본인 글·댓글만 변경할 수 있는 서버 권한 검사.
- 새 글 임시 저장, 로딩·빈 목록·연결 실패·없는 글 처리, 삭제 확인창.
- 기존 '말로 쓰기' 및 댓글 마이크 버튼에 브라우저 음성 입력 연결(지원 브라우저에서 사용).
- 기존 하단 메뉴와 커뮤니티 화면 경로를 유지한 연결.

`App.jsx`는 모든 경로에서 기존 디자인의 화면을 표시합니다. 커뮤니티 화면 4개에 데이터 바인딩을 추가했으며 나머지 화면은 최신 main의 디자인과 로컬 일정·가족 화면 동작을 유지합니다. 회원 로그인·AI 상담·일정·정책·병원 기능은 이번 커뮤니티 연결 범위에 포함하지 않았습니다. 커뮤니티 작성자는 임시 익명 토큰으로 구분하며 실제 회원 인증은 아직 연결되지 않았습니다.

## 지금 바로 확인하기

로컬 전용 모드는 원본과 다른 포트를 사용합니다.

- 프런트엔드: <http://127.0.0.1:5180/#/community>
- 백엔드: `127.0.0.1:8081`
- DB: `backend/data/community.mv.db` (로컬 H2 파일, 서버를 다시 켜도 보관)

이 모드는 Aiven에 연결하지 않고 실제 Aiven DB를 변경하지 않습니다. 브라우저 테스트용으로 `[예시]`가 붙은 글 2개를 남겼습니다. 자동으로 생성되는 가짜 이용자 게시글은 없습니다.

### 실행 도우미 (Windows PowerShell)

JDK 17과 Node.js가 설치된 환경에서 이 폴더의 터미널을 열고 실행합니다.

```powershell
.\start-community.ps1
```

첫 실행에는 프런트엔드 의존성 설치와 Gradle 다운로드가 필요할 수 있습니다. 도우미는 백엔드를 빌드하고 두 서버를 숨김 창으로 실행합니다. 실행 로그는 `verification/`에 기록합니다. 이미 5180 또는 8081 포트가 사용 중이면 기존 서버를 먼저 종료해야 합니다. 실행 정책 때문에 스크립트가 차단되면 아래 수동 실행 방법을 사용하세요.

도우미가 시작한 서버를 종료하려면 다음을 실행합니다.

```powershell
.\stop-community.ps1
```

### 수동 실행

첫 번째 터미널, `backend` 폴더:

```powershell
.\gradlew.bat --gradle-user-home ..\.gradle-user bootRun --args="--spring.profiles.active=community-local"
```

두 번째 터미널, `frontend` 폴더:

```powershell
npm ci
npm run dev:community
```

`node_modules`가 이미 준비되어 있고 npm 명령이 없는 이 작업 환경에서는 다음으로도 실행할 수 있습니다.

```powershell
node node_modules/vite/bin/vite.js --mode community --host 127.0.0.1 --port 5180 --strictPort
```

수동 실행한 서버는 각 터미널에서 Ctrl+C로 종료합니다.

## 작성자 식별과 후속 회원 연동

기존 저장소에는 실제 로그인 인증 API가 아직 없습니다. 이 복사본에서는 서버가 256비트 무작위 토큰과 익명 닉네임을 발급합니다. 브라우저는 토큰을 사이트 저장소에 보관하고, DB에는 토큰의 SHA-256 해시만 저장합니다. 서버는 사용자 ID·닉네임을 요청 본문에서 신뢰하지 않고 토큰으로 작성자를 결정합니다.

따라서 로그인 화면의 예시 계정과 커뮤니티 작성자는 아직 연결되지 않았습니다. 다른 브라우저에서는 다른 작성자가 되며, 브라우저 사이트 데이터를 지우면 이전 글의 작성 권한을 복구할 수 없습니다. 같은 브라우저의 다른 탭은 같은 작성자입니다. 이는 로컬 검증용 식별 방식이며 보호자 자격 인증 기능은 없습니다.

실제 회원 기능이 준비되면 `CommunityService.member()`를 인증된 회원으로 연결하고 임시 작성자와 회원의 데이터 이전 방식을 정해야 합니다. 운영 전에는 신고·차단·관리자 처리, 요청 제한, 접근 정책, 개인정보 보관·삭제 정책도 추가해야 합니다. 이 복사본의 커뮤니티 API는 `prod` 프로필에서 기본 비활성화되어 있습니다.

## Aiven에 연결하려는 경우

### PC에 설치된 MySQL 사용

PowerShell에서 `.ps1` 실행이 차단되는 환경에서는 다음 방법을 사용합니다. 프로젝트 루트의 첫 번째 터미널에서 `.\run-backend-mysql.cmd`를 실행하고, 두 번째 새 터미널에서 `.\run-frontend.cmd`를 실행하세요. 두 명령은 Java·Node의 기본 실행 명령을 사용합니다. 각 터미널에서 Ctrl+C로 종료합니다. 기존 미리보기 서버가 이미 포트를 사용 중이면 먼저 그 서버를 종료해야 합니다.

로컬 MySQL용 `community-mysql` 프로필을 추가했습니다. `.env.community`에서 `COMMUNITY_DB_USERNAME`과 `COMMUNITY_DB_PASSWORD`를 실제 로컬 접속 정보로 채우고, 필요한 경우 포트도 바꾸세요. 파일은 Git에서 제외됩니다. 기본 DB 이름은 원본과 분리한 `remind_community_dev`입니다.

설정 후 기존 미리보기 서버를 종료하고 다음으로 실행합니다.

```powershell
.\stop-community.ps1
.\start-community.ps1 -Database MySQL
```

수동 실행은 `backend` 폴더에서 아래 명령을 사용합니다. 프런트엔드는 동일하게 5180 포트를 사용합니다.

```powershell
.\gradlew.bat --gradle-user-home ..\.gradle-user bootRun --args="--spring.profiles.active=community-mysql"
```

접속 계정에 권한이 있으면 별도 개발 DB와 커뮤니티 테이블을 생성합니다. DB 생성 권한이 없으면 관리자가 먼저 `CREATE DATABASE remind_community_dev CHARACTER SET utf8mb4;`를 실행하고 해당 DB 권한을 접속 계정에 부여해야 합니다. H2에서 만든 예시 글은 MySQL로 자동 이전하지 않습니다. 현재 PC의 MySQL에서 접속·테이블 생성과 실제 화면의 글·댓글·하트 저장을 확인했습니다.

### Aiven 사용

기존의 기본 `dev` 프로필과 `npm run dev`는 원래 Aiven 설정과 8080 프록시를 사용합니다. JDBC 설정은 `application-aiven.properties`로 옮겼고 `dev`·`prod`에서 불러옵니다. TLS 호스트·인증서 검증 설정은 유지했습니다.

이번 검증에서는 실제 Aiven 접속 정보와 인증서를 사용하지 않았습니다. Aiven 실행은 별도의 테스트 DB에서 확인해야 합니다. `dev`의 JPA `update` 설정은 테이블을 생성할 수 있으므로 원래 운영 DB를 연결하지 마세요. 운영 배포 전에는 스키마 마이그레이션과 실제 회원 인증을 준비해야 합니다.

## API

쓰기·내 글 조회에는 `Authorization: Bearer <token>` 헤더가 필요합니다. 일반 목록·상세 조회는 토큰 없이도 가능합니다.

| 메서드 | 경로 (`/api/community` 기준) | 기능 |
| --- | --- | --- |
| POST / GET | `/session` | 익명 작성자 생성 / 확인 |
| GET | `/posts?q=&mode=ALL&sort=LATEST&mine=false&page=0&size=10` | 목록 |
| POST | `/posts` | `{mode: SOLUTION 또는 EMPATHY, title, content}` |
| GET / PUT / DELETE | `/posts/{id}` | 조회 / 제목·내용 수정 / 삭제 |
| PUT / DELETE | `/posts/{id}/like` | 하트 추가 / 취소 (반복 요청해도 중복 없음) |
| PUT | `/posts/{id}/view` | 사용자별 조회 기록 |
| GET / POST | `/posts/{id}/comments` | 댓글 페이지 / `{content}`로 댓글 작성 |
| DELETE | `/posts/{id}/comments/{commentId}` | 본인 댓글 삭제 |

제목은 120자, 본문은 5,000자, 댓글은 1,000자 이내입니다. 수정 시 글 모드는 변경하지 않습니다. 페이지는 0부터, 페이지 크기는 최대 30입니다. 인기는 `sort=POPULAR`, 추천은 댓글 수와 하트 수를 우선하는 `sort=RECOMMENDED`이며, 필터는 `mode=SOLUTION` 또는 `EMPATHY`입니다.

## 검증

백엔드 `CommunityIntegrationTest`는 별도의 H2 메모리 DB와 실제 HTTP 서버로 다음 5개 시나리오를 확인합니다.

1. 게시글·댓글 CRUD, 다른 작성자의 변경 거절, 게시글 삭제 시 연관 데이터 삭제.
2. 공감 글 댓글 작성·조회·삭제와 댓글 작성자 이외의 삭제 거절.
3. 동시에 요청한 하트 8개와 반복 조회가 중복 집계되지 않는지 확인.
4. 검색·모드·내 글 필터·페이지·인기·추천 정렬과 검색 특수문자 처리.
5. 빈 입력·과도한 길이·잘못된 요청·없는 글·유효하지 않은 토큰 처리.

```powershell
cd backend
.\gradlew.bat --gradle-user-home ..\.gradle-user test bootJar --no-daemon
```

프런트엔드 빌드:

```powershell
cd frontend
node node_modules/vite/bin/vite.js build
```

브라우저에서는 새 글 임시 저장 복원, 생성, 수정, 댓글 생성·삭제, 하트, 공감 글의 댓글 작성·조회, 글 삭제와 목록 복귀를 직접 확인했습니다. 화면 캡처는 `verification/`에 있습니다.

실행 도우미로 서버를 재시작한 뒤 글 2개와 기존 하트가 보존되는 것도 확인했습니다. 기존 홈에서 하단 커뮤니티 메뉴로 들어오는 흐름과 검색·필터·정렬도 브라우저에서 확인했습니다. 원본 폴더의 Git 추적 파일에는 변경이 없습니다.
