---
name: review-post
description: 발행 전 블로그 글이나 프로젝트 페이지를 점검한다(frontmatter, 맞춤법·문장, 링크·이미지, 빌드). "글 검토", "발행 전 체크", "퇴고" 요청 시 사용.
argument-hint: [파일 경로 또는 slug — 생략 시 변경된 콘텐츠]
---

# 발행 전 콘텐츠 점검

대상: $ARGUMENTS (비어 있으면 `git status`/`git diff`에서 변경된 `src/content/blog/`, `src/content/projects/` 파일과 `src/data/profile.ts`)

읽는 사람은 채용 담당자·면접관이다. 그 관점에서 어색하거나 과장된 표현, 근거 없는 성과 표현도 짚는다.

다음을 점검하고 결과를 항목별로 보고한다. 문체·내용 수정은 제안만 하고, 사용자가 동의하면 반영한다. 명백한 오타와 frontmatter 오류는 바로 고쳐도 된다.

1. **frontmatter** — CLAUDE.md의 필수 필드, 날짜 형식, description이 한두 문장 요약인지, `draft: true`가 남아 있는지, work 프로젝트의 `company`가 `profile.ts` experience와 일치하는지, 글의 `project` slug가 실제로 있는지
2. **내용 공백** — `<!-- TODO` 표시가 남아 있는지, 프로젝트라면 문제·해결·결과가 모두 드러나는지
3. **공개 적합성** — 회사 내부 정보나 비공개 수치가 들어 있지 않은지 (의심되면 사용자에게 확인)
4. **구조** — 본문이 `##`부터 시작하는지, 소제목 흐름이 자연스러운지, 코드 블록에 언어가 지정됐는지
5. **문장** — 맞춤법·띄어쓰기, 지나치게 긴 문장, 같은 표현 반복
6. **링크·이미지** — 상대 경로 이미지가 실제로 존재하는지, 내부 링크(`/blog/...`)가 존재하는 글을 가리키는지, 이미지에 alt 텍스트가 있는지
7. **빌드** — `npx astro check`와 `npm run build` 통과 여부
