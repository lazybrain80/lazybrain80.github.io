// PostToolUse hook: validates frontmatter of blog posts after Claude writes/edits them.
// Exit 2 feeds stderr back to Claude so it can fix the post; anything else is silent.
import { readFileSync } from 'node:fs';

const REQUIRED = ['title', 'description', 'pubDate'];

let input;
try {
  input = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  process.exit(0);
}

const filePath = input?.tool_input?.file_path ?? '';
if (!/[\\/]src[\\/]content[\\/]blog[\\/].+\.mdx?$/.test(filePath)) process.exit(0);

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
  for (const key of REQUIRED) {
    const value = fields.get(key);
    if (value === undefined || value === '' || value === "''" || value === '""') {
      errors.push(`필수 필드 '${key}'가 없거나 비어 있습니다.`);
    }
  }
  const pubDate = fields.get('pubDate')?.replace(/^['"]|['"]$/g, '');
  if (pubDate && Number.isNaN(Date.parse(pubDate))) {
    errors.push(`pubDate '${pubDate}'를 날짜로 해석할 수 없습니다 (예: 2026-10-15).`);
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
