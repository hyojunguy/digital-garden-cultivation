

```markdown
# 📘 Implementation Plan: 디지털 텃밭 가꾸기 웹앱

> 디지털 환경에서 식물 키우기를 은유적으로 표현한 교육용 웹앱. 학생들은 각 단계를 통과하며 디지털 리터러시, 환경 인식, 자율 실천 습관을 자연스럽게 학습합니다.

---

## 🏗️ 기술 스택

| 영역         | 기술 |
|--------------|------|
| 프론트엔드   | React, Vite, Tailwind CSS, React Router DOM |
| 백엔드       | FastAPI (Python 3.11+), Uvicorn |
| 데이터베이스 | MySQL (Amazon RDS) |
| 인증         | JWT 기반 토큰 인증 |
| 파일 저장    | AWS S3 (또는 Firebase Storage 대체 가능) |
| 배포         | Docker, Docker Compose (개발 시), Vercel / Render (운영) |

---

## 📁 프로젝트 구조

```
digital-garden/
├── frontend/             # React SPA
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/          # axios 기반 API 연동
│   │   ├── assets/
│   │   └── ...
├── backend/              # FastAPI 서버
│   ├── app/
│   │   ├── api/          # 엔드포인트
│   │   ├── models/       # SQLAlchemy ORM
│   │   ├── schemas/      # Pydantic
│   │   ├── services/
│   │   ├── core/         # 설정, DB 연결
│   │   └── main.py
├── docker-compose.yml
└── README.md
```

---

## 🌿 핵심 기능별 구현

### 🔐 사용자 인증
- 회원가입, 로그인, JWT 발급
- 학교/반/번호 기반 회원 정보
- 개인정보 동의 체크박스

### 🏡 메인 대시보드
- 사용자 이름, 현재 텃밭 단계
- 단계별 이미지 및 점수 시각화
- 다음 단계 전환 로직 포함

---

## 🌱 단계별 기능

| 단계   | 주요 기능 | 구현 항목 |
|--------|-----------|------------|
| 씨앗   | 식물 사진 업로드 | 이미지 업로드 (S3), 게시판 뷰, 점수 +10 |
| 새싹   | 퀴즈 풀기 | 단답 퀴즈 로직, 점수 누적, 단계 자동 이동 |
| 성장   | 실천 체크리스트 | 체크 UI, 날짜 기록, 점수 누적 |
| 꽃     | 글쓰기 게시판 | 환경 제안/실천 글 업로드, 게시판 분기 |
| 열매   | 재활용 사진 인증 | 사진 업로드, 점수 +10 |
| 수확   | 영상 링크 업로드 | YouTube 링크, 썸네일 노출 |

---

## 🗃️ DB 스키마 예시 (MySQL 기준)

```sql
TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50),
  school VARCHAR(50),
  class_number VARCHAR(10),
  password_hash TEXT
);

TABLE contents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  stage ENUM('seed','sprout','growth','flower','fruit','harvest'),
  type ENUM('text','image','video','quiz'),
  content TEXT,
  media_url TEXT,
  score INT DEFAULT 0
);

TABLE scores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  stage ENUM('seed','sprout','growth','flower','fruit','harvest'),
  score INT DEFAULT 0
);
```

---

## ✅ 개발 마일스톤

| 주차 | 목표 |
|------|------|
| 1주차 | 프로젝트 구조 구성, 회원가입/로그인 API, DB 구축 |
| 2주차 | 메인페이지 UI, 점수 시스템 로직 |
| 3주차 | 씨앗, 새싹, 성장 단계 기능 구현 |
| 4주차 | 꽃, 열매, 수확 단계 기능 구현 |
| 5주차 | 파일 업로드(S3), 유튜브 링크 처리 |
| 6주차 | 테스팅, 배포 환경 세팅, 문서화

---

## 🧪 테스트 & QA

- Jest / React Testing Library (프론트)
- Pytest (백엔드)
- Postman / Swagger (API 테스트)
- ESLint, Prettier 설정 포함

---

## 📦 향후 고도화 기능

- 교사용 관리자 대시보드
- 반별 랭킹 / 경쟁 시스템
- 캐릭터 커스터마이징
- 주간 미션 및 뱃지 시스템

---

## 🧾 참고 자료

- [디지털 텃밭 기획안 PPT](./docs)
- [UI 참고용 영상 자료](./assets/video/)
```
