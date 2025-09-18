# 🌐 Snap-Search (Front-end)
> 해외 축구 리그와 팀 정보를 한 번에 탐색할 수 있도록 설계한 데이터 리서치 플랫폼의 프론트엔드 저장소입니다.

[라이브 서비스 바로가기](https://www.toomuchoffside.site/) · [Front-end 저장소](https://github.com/sungjaeahn-kopo/snap-search-fe) · [Back-end 저장소](https://github.com/sungjaeahn-kopo/snap-search)

![Snap-Search Mockup](https://github.com/user-attachments/assets/4047420b-12e1-4152-ab0e-fe0a68249947)

## 📚 목차
- [프로젝트 개요](#-프로젝트-개요)
- [문제 정의 및 목표](#-문제-정의-및-목표)
- [아키텍처](#-아키텍처)
- [프론트엔드 구현 하이라이트](#-프론트엔드-구현-하이라이트)
- [주요 기능 상세](#-주요-기능-상세)
- [성능 및 UX 개선 포인트](#-성능-및-ux-개선-포인트)
- [DevOps · 배포 파이프라인](#-devops--배포-파이프라인)
- [프로젝트 구조](#-프로젝트-구조)
- [로컬 실행 방법](#-로컬-실행-방법)
- [향후 로드맵](#-향후-로드맵)
- [회고 및 인사이트](#-회고-및-인사이트)

## 🚀 프로젝트 개요
Snap-Search는 api-football API와 자체 정제한 CSV 데이터셋을 기반으로 시즌·국가·리그·팀을 계층적으로 탐색하며 경기 일정과 상세 정보를 확인할 수 있는 서비스입니다. 프론트엔드는 Next.js App Router를 활용해 **데이터 탐색 경험을 최적화**하고, 백엔드는 Spring Boot 기반 `snap-search` 레포지토리에서 배치/집계 로직을 담당합니다.

- **서비스 범위**: 해외 축구 리그, 팀, 경기 일정/결과, 감독·선수 프로필 시각화
- **프론트엔드 담당 영역**: App Router 설계, React Query 기반 데이터 캐싱, MobX 전역 상태, MUI/Styled-Components UI 컴포넌트, 이미지/색상 처리, 배포 자동화 스크립트
- **백엔드 협업 포인트**: REST API 규격 협의 (`/api/mapping`, `/api/matches`, `/api/players`, `/api/coachInfo` 등) 및 배치 스케줄 주기 조율

## 🎯 문제 정의 및 목표
1. **분산된 해외 축구 데이터를 한 화면에서 탐색**할 수 있도록 사용자가 시즌 → 국가 → 리그 → 팀을 자연스럽게 좁혀갈 수 있는 흐름을 설계합니다.
2. 팀 상세 페이지에서 **선수·감독·경기 정보를 연결**해 팬들이 한 곳에서 최신 데이터를 확인할 수 있도록 합니다.
3. 데이터 호출이 많은 도메인 특성상 **API 요청 수를 최소화**하면서도 빠르게 반응하는 UI를 구축합니다.
4. 경기 이벤트의 맥락을 이해하기 쉽도록 **타임라인 기반 시각화**를 제공합니다.

## 🏗 아키텍처
```mermaid
graph LR
  A[사용자] --> B[Next.js App Router]
  B -->|React Query| C[Axios API Client]
  C -->|REST 호출| D[snap-search 백엔드 (Spring Boot)]
  D --> E[(MySQL)]
  D --> F[배치 파이프라인 (api-football · CSV)]
  D -.-> G[(ElasticSearch 구축 검토 중)]
```

- **Front-end**: Next.js 14(App Router) + React 18, React Query로 서버 상태 관리, MobX로 헤더/스크롤 상태 공유
- **Back-end**: Spring Boot 5 (배치·스케줄링), MySQL, API-Football 연동, 향후 ElasticSearch 기반 검색 고도화 검토
- **Infra**: Azure VM, Azure Image Storage, GitHub Actions + Docker로 배포 자동화

## ✨ 프론트엔드 구현 하이라이트
### App Router & 전역 레이아웃
- `src/app/layout.tsx`에서 글로벌 폰트와 스타일을 적용하고, `ClientLayout`을 통해 헤더와 스크롤 가능한 컨텐츠 영역을 구성했습니다.
- `ClientLayout`은 스크롤 위치를 관찰해 MobX `teamStore`와 연동, 팀 페이지에서 헤더에 팀 로고가 노출되도록 합니다.
- `providers.tsx`에서 React Query `QueryClient`를 정의해 전역으로 `retry`/`refetch` 정책을 통일했습니다.

### 데이터 패칭 & 캐싱 전략
- 메인 페이지(`src/app/page.tsx`)는 시즌·국가·리그·팀별 `useQuery` 키를 분리해 의존성에 따라 조건부 호출을 수행하고, 10분(`staleTime`) 캐싱을 적용합니다.
- 팀 상세 페이지는 `useQueryClient`로 목록 페이지에서 가져온 팀 데이터를 재사용하고, 부족한 경우에만 서버 요청을 수행해 API 호출을 절감합니다.
- 경기 상세 페이지는 이벤트(`matchEvents`)와 일정(`matchList`)을 병행 호출해 동일한 데이터를 재활용합니다.

### 상태 관리와 UI 동기화
- MobX `teamStore`는 팀 로고와 스크롤 상태를 보관하여 헤더에서 동적으로 팀 로고를 노출합니다.
- `Header` 컴포넌트는 `mobx-react-lite`로 스토어 변경을 구독하고, 클릭 시 홈으로 이동하는 내비게이션을 제공합니다.

### 사용자 경험을 위한 시각적 요소
- `colorExtractor.ts`에서 `node-vibrant`로 추출한 대표 색상을 `TeamInfo` 카드와 선수 카드(`PlayerCard`)에 적용하고, `getContrastColor`로 대비 색상을 계산해 가독성을 유지합니다.
- `LazyImageComponent`는 `IntersectionObserver` 기반 지연 로딩과 `transformImageUrl` 유틸을 통해 Azure Image Storage의 리사이즈된 리소스를 불러와 초기 로딩을 최적화합니다.
- `MatchOverview`와 `EventCard`는 `framer-motion` 애니메이션과 SVG 아이콘(`goal-icon.svg`, `card.svg`, `change.svg`, `var.svg`)을 조합해 경기 흐름을 직관적으로 전달합니다.

## 🧩 주요 기능 상세
### 1. 시즌 → 국가 → 리그 → 팀 계층 탐색
- `SeasonSelector`, `CountryCard`, `LeagueCard`, `TeamCard` 컴포넌트를 조합해 사용자가 단계별로 선택을 좁혀가며 데이터를 탐색할 수 있습니다.
- `SelectionBreadcrumb`는 현재 선택 상태와 초기화 기능을 제공해 빠른 컨텍스트 전환을 지원합니다.

### 2. 팀 상세 대시보드
- `TeamInfo`에서 팀 로고 기반 그래디언트를 적용하고, `UpcomingMatchCard`로 다음 경기를 카드 형태로 제공합니다.
- MUI `Tabs`를 이용해 `MatchDetail`(전체 일정), `PlayerSection`(포지션별 선수 목록), `CoachCard`(감독 정보)로 세분화했습니다.
- `PlayerSection`은 `PlayerPosition` 상수를 활용해 포지션별로 필터링하고, `UniformIcon`을 활용해 등번호를 시각화합니다.

### 3. 경기 일정 및 카드 하이라이트
- `MatchCard`는 경기 종료 여부에 따라 승·패·무 색상을 다르게 적용하고, `convertUtcToKst`로 경기 시간을 한국 표준시에 맞춰 표시합니다.
- 진행 중인 경기를 클릭하면 `ModalComponent`를 통해 상세 정보 준비 중임을 안내합니다.

### 4. 경기 상세 타임라인
- `matchService.getMatchDetail`로 받아온 이벤트를 `eventUtils`로 시간 순서 및 추가시간 기준으로 그룹화합니다.
- MUI `Timeline`을 활용해 전반/후반을 구분하고, `EventCard`로 골/카드/교체/VAR 이벤트를 개별 카드로 렌더링합니다.
- 경기 개요(`MatchOverview`)에서는 주요 이벤트가 발생할 때마다 스코어 변화를 계산해 시점별로 보여줍니다.

### 5. 감독 커리어 모달 & 데이터 정제
- `CoachCard` 클릭 시 `ModalComponent`를 띄워 `CareerList`를 렌더링하고, `cleanUpCareers` 로직으로 복수의 현 소속팀 데이터도 자연스럽게 표시합니다.
- `CareerCard`는 현재 소속을 강조하는 보더/배경 색상을 적용해 경력 흐름을 한눈에 파악할 수 있습니다.

### 6. 이미지 최적화와 폰트 일관성
- Next.js `next.config.js`에서 외부 도메인(`media.api-sports.io`) 허용 및 SVG 로더 설정을 적용하고, `styles/fonts.css`로 SUIT 폰트를 전역에 매핑했습니다.
- `globals.css`에 커스텀 로딩 스피너와 스크롤바 스타일을 정의해 브랜드 일관성을 유지합니다.

## ⚡️ 성능 및 UX 개선 포인트
- **조건부 데이터 호출**: 선택된 시즌·국가·리그 정보가 없으면 API 요청을 생략합니다 (`enabled` 옵션 활용).
- **캐싱 전략**: 경기/팀 데이터는 10분 캐싱(`staleTime`)으로 API 트래픽을 줄이고, `QueryClient`에 `retry:1`, `refetchOnWindowFocus:false` 설정을 부여했습니다.
- **Lazy Loading**: IntersectionObserver 기반 이미지 지연 로딩과 Azure 리사이즈 URL(`transformImageUrl`)로 초기 페인트 시간을 단축했습니다.
- **애니메이션과 피드백**: `framer-motion`을 통한 요소 등장 애니메이션, `ModalComponent`를 통한 상태 안내로 사용자 피드백을 강화했습니다.
- **반응형 대응**: `useMediaQuery`로 작은 화면에서 팀명을 숨기는 등 카드 레이아웃의 가독성을 확보했습니다.

## 🛠 DevOps · 배포 파이프라인
- **빌드 & 실행**: `npm run build` → `npm start`로 Next.js 프로덕션 서버 실행 (`package.json`).
- **도커 멀티 스테이지**: `Dockerfile`에서 빌더/런타임 이미지를 분리해 경량화하고, 프로덕션 환경에 필요한 산출물만 포함합니다.
- **정적 Export 설정**: `next.config.js`에서 `output: "export"`, `reactStrictMode`, `svgr` 로더 등 프로덕션 최적화를 구성했습니다.
- **배포 자동화**: GitHub Actions + Docker 파이프라인을 통해 Azure VM에 배포, `buildAndTar`/`sendAzure` 스크립트로 수동 배포도 지원합니다.

## 🗂 프로젝트 구조
```
snap-search-fe/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # 시즌/국가/리그/팀 탐색 메인 화면
│   │   └── team/[teamId]/              # 팀 상세, 경기 일정, 경기 이벤트 페이지
│   ├── api/                            # Axios 기반 서비스 레이어
│   ├── components/                     # 카드/공통 컴포넌트 및 UI 레이아웃
│   ├── stores/                         # MobX 스토어 (teamStore)
│   ├── utils/                          # 날짜, 이벤트, 이미지, 색상 유틸
│   ├── constants/                      # 포지션/이벤트 타입 상수
│   └── styles/                         # 글로벌 폰트 및 스타일
├── public/                             # 정적 리소스 (폰트, 로딩 GIF 등)
├── next.config.js                      # Next.js 빌드 및 이미지 설정
├── Dockerfile                          # 멀티 스테이지 도커 빌드
└── package.json                        # 스크립트 및 의존성 정의
```

## 💻 로컬 실행 방법
```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 (.env.local 등)
# NEXT_PUBLIC_API_URL=https://api.toomuchoffside.site (기본값 사용 시 생략 가능)

# 3. 개발 서버 실행
npm run dev

# 4. 프로덕션 빌드 및 실행
npm run build
npm start
```

- 백엔드(Spring Boot)는 별도 레포지토리에서 실행해야 API 응답을 정상적으로 받을 수 있습니다.
- `npm run buildAndTar` + `npm run sendAzure` 스크립트로 서버에 번들을 전송할 수 있습니다.

## 🔭 향후 로드맵
- ElasticSearch를 활용한 고급 검색/필터 기능 고도화 (서버 증설 방안 검토 중)
- 경기 상세 페이지의 `라인업`, `경기 기록` 탭 데이터 연동
- 선수 상세 페이지(`/player/[id]`) 라우트 구현 및 이벤트 카드 딥링크 연결
- 다국어 지원 및 접근성(Accessibility) 개선

## 📝 회고 및 인사이트
- **도메인 데이터 모델링**: 국가/리그/팀/경기/이벤트 도메인을 명확히 분리해 React Query 키와 타입 정의를 일관성 있게 유지했습니다.
- **캐싱 관점의 설계**: 리스트→상세 이동 시 캐시 재사용과 조건부 호출을 적용해 API 호출 수를 줄이고, 사용자 체감 속도를 높였습니다.
- **시각화 경험**: 경기 이벤트를 타임라인과 애니메이션으로 표현해 복잡한 스포츠 데이터를 직관적으로 전달할 수 있었습니다.
- **배포 자동화 학습**: Docker 멀티 스테이지와 GitHub Actions를 결합하면서 클라우드 환경(Azure)에 맞는 배포 파이프라인을 구축했습니다.

---

> Snap-Search는 축구 데이터를 더 직관적이고 탐색하기 쉽게 만드는 것을 목표로 지속적으로 진화하고 있습니다. 개선 아이디어나 협업 제안은 언제든지 환영합니다!
