# lazybrain80.github.io

Astro로 만든 개인 블로그. GitHub Pages(`https://lazybrain80.github.io`)에 GitHub Actions로 배포한다.

## 명령어

```bash
npm install          # 의존성 설치
npm run dev          # 로컬 개발 서버 (http://localhost:4321)
npm run build        # 프로덕션 빌드 → dist/
npm run preview      # 빌드 결과 미리보기
npx astro check      # 타입·콘텐츠 스키마 검사
```

dev 서버는 `npx astro dev --background`로 띄우고 `astro dev stop` / `status` / `logs`로 관리한다 (포그라운드 실행은 세션을 막음).

변경 후에는 `npm run build`가 통과하는지 확인한다. 빌드가 깨진 상태로 커밋하지 않는다.

## 구조

Astro 공식 blog 템플릿(`npm create astro@latest -- --template blog`) 구조를 따른다.

- `src/content/blog/` — 블로그 글 (`.md` / `.mdx`)
- `src/content.config.ts` — 콘텐츠 컬렉션 스키마 (frontmatter 정의)
- `src/pages/` — 라우트 (`blog/[...slug].astro`, `rss.xml.js` 등)
- `src/layouts/`, `src/components/` — 레이아웃·컴포넌트
- `public/` — 정적 파일 (favicon, 이미지 등)
- `astro.config.mjs` — `site: 'https://lazybrain80.github.io'` (사용자 페이지이므로 `base` 불필요)
- `.github/workflows/deploy.yml` — `withastro/action`으로 빌드 후 Pages 배포

## 글 작성 규칙

- 파일 위치: `src/content/blog/<slug>.md`, slug는 영문 소문자 kebab-case (예: `astro-blog-setup.md`)
- 이미지가 있는 글은 `src/content/blog/<slug>/index.md` 폴더 형태로 두고 이미지를 같은 폴더에 둔다
- 본문 언어는 한국어가 기본
- frontmatter 필수 필드 (`src/content.config.ts` 스키마와 일치해야 함):

```yaml
---
title: '글 제목'
description: '한두 문장 요약 (목록·OG 태그에 쓰임)'
pubDate: 2026-10-15
# updatedDate: 2026-10-20
# heroImage: './hero.png'
---
```

- 스키마에 필드를 추가하면(예: `tags`, `draft`) 이 문서와 `.claude/hooks/check-frontmatter.mjs`의 필수 필드 목록도 함께 갱신한다
- 본문은 `##`부터 시작한다 (`#`은 레이아웃이 title로 렌더링)
- 코드 블록에는 언어를 명시한다

## Git

- 기본 브랜치 `main`에 푸시하면 배포된다. 푸시는 사용자 확인 후에만 한다
- 커밋 메시지: 글은 `post: <제목>`, 사이트 수정은 `feat:` / `fix:` / `chore:` 등
