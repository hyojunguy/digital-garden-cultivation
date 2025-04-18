
# 🌱 디지털 가든 프로젝트 - 프론트엔드

React 기반의 디지털 식물 재배 교육 웹 애플리케이션입니다. 학생들이 디지털 리터러시와 환경 인식을 함께 키울 수 있도록, 게임화된 학습 단계를 제공합니다.

## ✨ 주요 기능

- **사용자 인증**: JWT 기반 로그인/회원가입, 학교/학급 정보 연동
- **단계별 성장 시스템**: 6단계의 상호작용 학습 (씨앗 → 새싹 → 성장 → 꽃 → 열매 → 수확)
- **콘텐츠 제출**: 이미지 업로드, 퀴즈, 글 작성, 영상 제출 등 다양한 활동 지원
- **점수 시스템**: 시각적으로 확인 가능한 진행도 및 점수 표시
- **반응형 UI**: Tailwind CSS 기반 반응형 웹 디자인

## 🚀 시작하기

### 필수 조건
- Node.js v18 이상
- Yarn 또는 npm
- 백엔드 서버 실행 중 (자세한 내용은 [backend README](../backend/README.md) 참고)

### 설치
```bash
cd /Users/hanhyojung/work/me/digital-garden-cultivation/frontend
yarn install
```

### 개발 서버 실행
```bash
yarn dev
```

브라우저에서 http://localhost:5173 접속

### 프로덕션 빌드
```bash
yarn build
yarn preview
```

## 🧩 프로젝트 구조
```plaintext
src/
├── api/               # API 클라이언트 및 인터셉터
├── assets/            # 정적 자산
├── components/        # 재사용 가능한 UI 컴포넌트
├── context/           # 전역 상태 관리 (Auth 등)
├── hooks/             # 커스텀 훅
├── pages/             # 라우트 기반 페이지
│   ├── stages/        # 단계별 구성 요소
├── types/             # TypeScript 타입 정의
├── utils/             # 유틸리티 함수
└── App.tsx            # 메인 진입점
```

## 🔗 API 연동

FastAPI 기반 백엔드와 통신합니다. 환경 변수를 설정해주세요:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_AUTH_ENDPOINT=/api/v1/auth
```

## 🛠️ 기술 스택

- 프레임워크: React 18 + TypeScript
- 스타일링: Tailwind CSS
- 라우팅: React Router DOM
- 상태 관리: React Context API
- HTTP 통신: Axios
- 빌드 도구: Vite

## 📊 테스트

테스트 실행:

```bash
yarn test
```

## 🌐 배포

Vercel을 통한 배포:

```bash
vercel --prod
```

## 📚 문서

- 백엔드 API 문서
- 디자인 시스템 가이드
- 컴포넌트 사용 가이드

## 🤝 기여하기

Pull Request를 환영합니다! 기여 가이드를 따라주세요.

## 📜 라이선스

MIT 라이선스

