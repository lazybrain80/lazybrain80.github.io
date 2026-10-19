# lazybrain80.github.io

경력과 사이드 프로젝트를 정리하는 개인 포트폴리오 블로그. 이력서에 링크로 첨부하는 용도라서, 읽는 사람은 주로 채용 담당자·면접관이다.
Astro로 만들고 GitHub Pages(`https://lazybrain80.github.io`)에 GitHub Actions로 배포한다.

## 명령어

```bash
npm install          # 의존성 설치
npm run dev          # 로컬 개발 서버 (http://localhost:4321)
npm run build        # 프로덕션 빌드 → dist/
npm run preview      # 빌드 결과 미리보기
npx astro check      # 타입·콘텐츠 스키마 검사
```

dev 서버는 `npx astro dev --background`로 띄우고 `astro dev stop` / `status` / `logs`로 관리한다 (포그라운드 실행은 세션을 막음).

변경 후에는 `npx astro check`와 `npm run build`가 통과하는지 확인한다. 빌드가 깨진 상태로 커밋하지 않는다.

## 구조

- `src/data/profile.ts` — 이름, 한 줄 소개, 연락처 링크, **경력(experience)**, **기술(skills)**. 홈·About 페이지가 이 파일을 읽는다
- `src/content/projects/` — 프로젝트 상세 (경력 프로젝트 `kind: work`, 사이드 프로젝트 `kind: side`)
- `src/content/blog/` — 기술 글·회고
- `src/content.config.ts` — 두 컬렉션의 frontmatter 스키마
- `src/lib/content.ts` — 컬렉션 조회(draft 제외·정렬)와 기간 포맷 헬퍼. 페이지에서는 `getCollection` 대신 `getPosts()` / `getProjects()`를 쓴다
- `src/pages/` — `/`(소개+대표 프로젝트+최근 글), `/about/`(경력 타임라인·기술), `/projects/`, `/blog/`, `/rss.xml`
- `src/layouts/BaseLayout.astro` — 모든 페이지의 공통 레이아웃 (`lang="ko"`)
- `src/styles/global.css` — 디자인 토큰(`:root` CSS 변수, 다크 모드 포함). 색상은 토큰으로만 쓴다
- `.github/workflows/deploy.yml` — `withastro/action`으로 빌드 후 Pages 배포
- `wiki/` — 글·프로젝트 작성용 LLM 위키 (로컬 전용, `.gitignore`에 등록되어 커밋되지 않음). 규칙은 `wiki/README.md`. 글이나 프로젝트를 쓰기 전에 `wiki/index.md`를 먼저 보고, 사용자가 새 자료나 사실을 주면 위키에도 반영한다

## 콘텐츠 작성 규칙

공통:
- slug(파일명)는 영문 소문자 kebab-case. 이미지가 있으면 `<slug>/index.md` 폴더 형태로 두고 이미지를 같은 폴더에
- 본문은 한국어, `##`부터 시작 (`#`은 레이아웃이 title로 렌더링), 코드 블록에는 언어 명시
- `draft: true`면 dev 서버에서만 보이고 배포되지 않는다
- 사용자가 주지 않은 경력·성과·수치를 지어내지 않는다. 모르는 부분은 `<!-- TODO: ... -->`(MDX에서는 `{/* TODO: ... */}`)로 남기고 사용자에게 묻는다
- 이미지·영상이 들어가는 글은 `<slug>/index.mdx`로 쓰고 미디어 파일을 같은 폴더에 둔다. MDX에서는 HTML 주석(`<!-- -->`)을 쓸 수 없다

미디어 컴포넌트 (`src/components/`, MDX에서 import해서 쓴다):

```mdx
import Figure from '../../../components/Figure.astro';
import Video from '../../../components/Video.astro';
import MediaSlot from '../../../components/MediaSlot.astro';
import tabletMain from './tablet-main.png';
import demo from './exhibition-demo.mp4';

<Figure src={tabletMain} alt="대체 텍스트" caption="캡션" />      {/* 세로 화면이면 narrow */}
<Video src={demo} caption="캡션" />                              {/* 짧은 무음 반복은 clip, 세로는 portrait */}
<Video youtube="VIDEO_ID" caption="캡션" />                      {/* 긴 영상은 YouTube */}
<MediaSlot kind="video" note="여기 들어갈 장면 설명" />           {/* 파일이 아직 없을 때. dev에서만 보임 */}
```

영상 파일은 저장소에 커밋되므로 짧게 잘라 압축한다(한 파일 10MB 이하 권장). 그보다 길면 YouTube에 올려 `youtube`로 넣는다. 관람객 얼굴이 나오는 사진·영상은 공개해도 되는지 먼저 확인한다

프로젝트 (`src/content/projects/<slug>.md`):

```yaml
---
title: '프로젝트 이름'
description: '무엇을 왜 만들었는지 한 문장'
kind: work            # work(경력) | side(사이드)
company: '회사명'      # work일 때 필수, profile.ts experience의 company와 정확히 같게 (About에서 연결됨)
role: '백엔드 개발 (3인 팀)'
startDate: 2024-03-01
# endDate: 2024-12-31  # 진행 중이면 생략
stack: ['TypeScript', 'PostgreSQL']
# links: { repo: 'https://github.com/...', demo: 'https://...' }
# heroImage: './cover.png'
# featured: true       # 홈 화면에 노출
---
```

본문 권장 구성: `## 배경` → `## 문제` → `## 해결 과정`(기술 선택 이유 포함) → `## 결과`(가능하면 수치) → `## 배운 점`

블로그 글 (`src/content/blog/<slug>.md`):

```yaml
---
title: '글 제목'
description: '한두 문장 요약 (목록·OG 태그에 쓰임)'
pubDate: 2026-10-15
# updatedDate: 2026-10-20
# tags: ['astro', 'retrospective']
# project: some-project-slug   # 관련 프로젝트 slug → 서로 링크됨
# heroImage: './hero.png'
---
```

스키마 필드를 바꾸면 이 문서와 `.claude/hooks/check-frontmatter.mjs`의 `REQUIRED`도 함께 갱신한다.

## Git

- `main`에 푸시하면 배포된다. 푸시는 사용자 확인 후에만 한다
- 커밋 메시지: 글은 `post: <제목>`, 프로젝트는 `project: <이름>`, 사이트 수정은 `feat:` / `fix:` / `chore:` 등
