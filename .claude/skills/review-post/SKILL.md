---
name: review-post
description: 발행 전 블로그 글을 점검한다(frontmatter, 맞춤법·문장, 링크·이미지, 빌드). "글 검토", "발행 전 체크", "퇴고" 요청 시 사용.
argument-hint: [글 파일 경로 또는 slug — 생략 시 변경된 글]
---

# 발행 전 글 점검

대상: $ARGUMENTS (비어 있으면 `git status`/`git diff`에서 변경된 `src/content/blog/` 글)

다음을 점검하고 결과를 항목별로 보고한다. 문체·내용 수정은 제안만 하고, 사용자가 동의하면 반영한다. 명백한 오타와 frontmatter 오류는 바로 고쳐도 된다.

1. **frontmatter** — 필수 필드(title, description, pubDate), 날짜 형식, description이 한두 문장 요약인지
2. **구조** — 본문이 `##`부터 시작하는지, 소제목 흐름이 자연스러운지, 코드 블록에 언어가 지정됐는지
3. **문장** — 맞춤법·띄어쓰기, 지나치게 긴 문장, 같은 표현 반복
4. **링크·이미지** — 상대 경로 이미지가 실제로 존재하는지, 내부 링크(`/blog/...`)가 존재하는 글을 가리키는지, 이미지에 alt 텍스트가 있는지
5. **빌드** — `npx astro check`와 `npm run build` 통과 여부
