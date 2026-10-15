// PostToolUse hook: validates frontmatter of blog posts and projects after Claude writes/edits them.
// Exit 2 feeds stderr back to Claude so it can fix the file; anything else is silent.
// Keep REQUIRED in sync with src/content.config.ts.
import { readFileSync } from 'node:fs';

const REQUIRED = {
  blog: ['title', 'description', 'pubDate'],
  projects: ['title', 'description', 'kind', 'role', 'startDate'],
};
const DATE_FIELDS = ['pubDate', 'updatedDate', 'startDate', 'endDate'];

let input;
try {
  input = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  process.exit(0);
}

const filePath = input?.tool_input?.file_path ?? '';
const collection = filePath.match(/[\\/]src[\\/]content[\\/](blog|projects)[\\/].+\.mdx?$/)?.[1];
if (!collection) process.exit(0);

let text;
try {
  text = readFileSync(filePath, 'utf8');
} catch {
  process.exit(0);
}

const errors = [];
const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!match) {
  errors.push('frontmatter(--- ... ---) 블록이 파일 맨 앞에 없습니다.');
} else {
  const fields = new Map();
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (m) fields.set(m[1], m[2].trim());
  }
  const unquote = (v) => v?.replace(/^['"]|['"]$/g, '');
  for (const key of REQUIRED[collection]) {
    if (!unquote(fields.get(key))) {
      errors.push(`필수 필드 '${key}'가 없거나 비어 있습니다.`);
    }
  }
  for (const key of DATE_FIELDS) {
    const value = unquote(fields.get(key));
    if (value && Number.isNaN(Date.parse(value))) {
      errors.push(`${key} '${value}'를 날짜로 해석할 수 없습니다 (예: 2026-10-15).`);
    }
  }
  const kind = unquote(fields.get('kind'));
  if (collection === 'projects' && kind && !['work', 'side'].includes(kind)) {
    errors.push(`kind는 'work' 또는 'side'여야 합니다 (현재 '${kind}').`);
  }
  if (collection === 'projects' && kind === 'work' && !unquote(fields.get('company'))) {
    errors.push("kind가 work인 프로젝트에는 company를 적어야 합니다 (About 경력과 연결됨).");
  }
  const body = text.slice(match[0].length);
  if (/^#\s/m.test(body.replace(/```[\s\S]*?```/g, ''))) {
    errors.push('본문에 h1(# ) 제목이 있습니다. 제목은 frontmatter title로 렌더링되므로 본문은 ##부터 시작하세요.');
  }
}

if (errors.length) {
  console.error(`[check-frontmatter] ${filePath}\n- ${errors.join('\n- ')}`);
  process.exit(2);
}
