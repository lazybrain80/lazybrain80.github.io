---
name: new-post
description: 블로그 새 글 초안을 src/content/blog에 만든다. "새 글", "포스트 작성", "블로그 글 써줘" 등 새 게시물을 시작할 때 사용.
argument-hint: <주제 또는 제목>
---

# 새 블로그 글 만들기

요청 주제: $ARGUMENTS

1. 주제가 비어 있으면 무엇에 대한 글인지 사용자에게 물어본다.
2. 제목을 정하고, 영문 소문자 kebab-case slug를 만든다. `src/content/blog/`에 같은 slug가 있으면 다른 slug를 쓴다.
3. 이미지가 필요할 것 같으면 `src/content/blog/<slug>/index.md`, 아니면 `src/content/blog/<slug>.md`로 만든다.
4. frontmatter는 CLAUDE.md의 "글 작성 규칙"과 `src/content.config.ts` 스키마를 따른다. `pubDate`는 오늘 날짜(YYYY-MM-DD).
5. 본문은 `##` 소제목으로 뼈대를 잡는다. 사용자가 내용을 주지 않았다면 각 섹션에 쓸 내용을 짧은 메모로만 남기고, 사실을 지어내지 않는다.
6. `npm run build`로 빌드가 통과하는지 확인하고, 만든 파일 경로와 dev 서버에서 볼 URL(`/blog/<slug>/`)을 알려준다.

커밋·푸시는 사용자가 요청할 때만 한다.
