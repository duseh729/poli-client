# POLI 클라이언트

온라인 사기·피해 상황을 빠르게 정리하고 AI 상담을 통해 진정서를 완성하는 서비스의 프런트엔드입니다. 초기 사건 정보 입력 → 증거 업로드 → AI 채팅 → 진정서 확인·다운로드까지 한 흐름으로 제공합니다.

## 주요 기능

- **회원 인증**: 회원가입/로그인 후에만 상담·채팅·진정서 페이지 접근(ProtectedRoute + Zustand 저장).
- **사건 정보 수집 플로우**: 장소, 일시, 상세 상황을 입력하고 증거 이미지를 업로드해 최초 상담을 준비.
- **AI 채팅**: SSE 기반 스트리밍으로 답변 타이핑 효과, 추천 질문, 모바일/데스크톱 대응, 채팅방 생성·삭제 및 목록 관리.
- **진정서 생성/편집**: AI가 채운 진정서 초안을 불러와 인적 사항, 범죄 유형, 사건 경위, 증거를 수정하고 서버에 저장.
- **문서 다운로드**: html2canvas + jsPDF로 진정서를 PDF로 내보내기, 첨부 이미지 함께 관리.
- **모니터링 & 모킹**: Sentry로 오류 수집, 옵션에 따라 MSW로 API 목킹.

## 기술 스택

- **프레임워크**: React 18, TypeScript, Vite
- **스타일**: Emotion, MUI(X Date Pickers), framer-motion
- **데이터**: React Query, axios, zustand (persist로 세션 유지)
- **폼/검증**: React Hook Form, Yup
- **렌더링**: React Markdown + remark-gfm + rehype-highlight
- **기타**: html2canvas, jsPDF, msw, Sentry, React Router v6

## 프로젝트 구조

```
src/
  api/               # axios 인스턴스, chat/petition/user API 훅
  assets/            # 아이콘/폰트/이미지
  components/
    Chat/            # 상담 플로우, 채팅 UI, 이미지 업로드
    InitChat/        # 최초 대화 스트리밍 화면
    Home/, Layout/, Petition/ ...
  constants/         # 라우트, 색상, 쿼리키, 미디어 쿼리
  hooks/             # 공통 훅 (창 크기, 로딩 등)
  pages/             # Home, Login, SignUp, Main(정보 수집), InitChat, Chat, Petition
  routes/            # 라우터/보호 라우트
  stores/            # Zustand 상태 (user, chatRooms, petition 등)
  utils/             # 라우트 헬퍼 등
```

## 환경 변수

`.env` (또는 `.env.local`)에 다음 값을 설정합니다.

| 키                    | 설명                                                  |
| --------------------- | ----------------------------------------------------- |
| `VITE_API_BASE_URL` | 백엔드 API 기본 URL (예:`https://api.example.com/`) |
| `VITE_SENTRY_DSN`   | Sentry DSN (선택)                                     |
| `VITE_USE_MOCK_API` | `true` 시 MSW 기반 목 API 사용 (개발용)             |

## 실행 방법

사전 요구: Node 18+ 권장, pnpm 사용.

```bash
pnpm install        # 의존성 설치
pnpm dev            # 로컬 개발 서버 (Vite)
pnpm build          # 프로덕션 빌드
pnpm preview        # 빌드 결과 미리보기
pnpm lint           # ESLint 검사
```

## 주요 사용자 흐름

1) **홈 → 로그인/회원가입** 후 상담 시작
2) **사건 정보 입력**(장소/일시/상황) → **증거 업로드** → 초기 요청을 담아 `/init-chat`으로 전송
3) **AI 채팅**에서 후속 질문 및 답변을 이어가며 추천 질문 활용
4) AI가 생성한 **진정서 초안**을 `/petition/:id`에서 수정·저장·PDF 다운로드
5) 사이드바에서 **채팅방 목록 관리** 및 삭제 가능

## 기타

- 개발 모드에서 `VITE_USE_MOCK_API=true`면 MSW 워커가 실행됩니다.
- 개발자 도구로 React Query Devtools는 `MODE=development`에서 자동 활성화됩니다.
