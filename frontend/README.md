# RE:MIND 프런트엔드

React와 JavaScript, 일반 CSS로 구현한 Figma 화면입니다.

## 실행

```bash
npm install
npm run dev
```

## 디자인 기준

- 기준: 사용자가 확인한 기존 32개 화면 스냅샷. 이후 피그마 변경은 반영하지 않습니다.
- 원본: [RE:MIND Figma](https://www.figma.com/design/OwEszKWYKk2Fjzz6J2fF3F/?node-id=0-1)
- 앱 화면은 **402 × 874 CSS px**로 고정합니다.
- 화면을 늘리거나 줄이는 `transform: scale()`과 화면 크기에 따른 레이아웃 변경을 사용하지 않습니다.
- 컴퓨터 화면의 남는 공간은 검은색입니다. 창이 앱보다 작으면 브라우저에서 스크롤합니다.
- 화면 내부에서 내용이 긴 목록은 원본의 스크롤 영역에서 스크롤합니다.
- Noto Sans KR 폰트와 Figma 원본 SVG는 `public/assets`에 저장되어 있습니다.
- `design.css`는 레이아웃과 색상·간격·패딩·라운드 값을, `designPrecision.css`는 원본 텍스트 영역과 컴포넌트 인스턴스 크기를 보존합니다.

## 화면 확인

기본 주소는 시작 화면입니다. 주소 뒤에 아래 경로를 붙이면 각 화면을 바로 확인할 수 있습니다.

| 화면 | 경로 |
| --- | --- |
| 시작 | `/#/welcome` |
| 로그인 / 회원가입 / 인증 | `/#/login`, `/#/signup`, `/#/verify` |
| 가입 완료 / 비밀번호 찾기 | `/#/signup-complete`, `/#/forgot-password` |
| 돌봄 대상 / 가족 코드 등록 | `/#/care-registration`, `/#/family-setup` |
| 홈 / 첫 홈 / 알림 | `/#/home`, `/#/home-empty`, `/#/notifications` |
| 캘린더 / 가족 캘린더 / 일정 추가 | `/#/calendar`, `/#/family-calendar`, `/#/add-event` |
| 일정 상세 / 삭제 확인 / 음성 추가 | `/#/event-detail`, `/#/delete-event`, `/#/event-voice` |
| AI 대화 모드 / 대화 / 이전 대화 | `/#/chat-modes`, `/#/chat`, `/#/chat-history` |
| 음성 입력 / 위기 안내 | `/#/chat-voice`, `/#/chat-crisis` |
| 커뮤니티 / 글쓰기 모드 / 글쓰기 | `/#/community`, `/#/write-mode`, `/#/write-post` |
| 글 상세 / 공감 글 상세 | `/#/post`, `/#/empathy-post` |
| 내 설정 / 가족 코드 관리 | `/#/settings`, `/#/family-codes` |
| 병원 / 정책 / 긴급 안내 | `/#/hospitals`, `/#/policies`, `/#/emergency` |

전체 32개 화면의 Figma 노드 ID는 `src/screenManifest.json`에서 확인할 수 있습니다.

## 현재 동작 범위

홈·캘린더·대화·커뮤니티·내 설정의 5개 탭을 유지합니다. 화면 이동, 텍스트/여러 줄 입력, 비밀번호 표시 전환, 선택 버튼과 토글을 구현했습니다. 가족 코드 복사/공유는 예시 코드 DA-4821을 사용합니다. 알림의 모두 읽음, 좋아요 색상·개수 변경, 일정의 예정/완료 전환이 동작합니다. 처음 표시되는 이름·가족 코드·일정·글은 Figma의 예시 데이터입니다. 로그인 버튼은 화면 확인을 위해 홈으로 이동하며 실제 인증을 수행하지 않습니다.

회원가입·인증 메일·Google 로그인·Aiven DB 저장·AI 응답·음성 인식·가족 연결/승인·지도 검색은 백엔드 및 외부 서비스 연동이 필요합니다. 일정 추가·수정·삭제와 날짜별 완료 상태, 커뮤니티 좋아요는 현재 브라우저의 로컬 저장소에 기록됩니다. 다른 기기나 가족 계정에 공유되지 않습니다. 글의 입력 초안은 현재 탭의 세션 저장소에 기록됩니다.

## 파일 구성

- `src/screens/`: 원본 디자인에 대응하는 32개 React 화면
- `src/App.jsx`: 화면 경로와 이동 흐름
- `src/designRuntime.jsx`: 공통 입력 및 버튼 동작
- `src/style.css`: 고정 화면과 공통 스타일
- `public/assets/figma-v2/`: 원본 SVG
- `public/assets/fonts/`: Noto Sans KR와 폰트 라이선스

## 빌드

```bash
npm run build
```

배포할 때는 `dist/`를 사용합니다. 정적 파일과 폰트의 경로는 도메인 루트(`/`) 배포를 기준으로 합니다.
