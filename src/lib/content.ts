import { getCollection } from 'astro:content';

// draft 글은 개발 서버에서만 보이고 프로덕션 빌드에서는 빠진다
const isVisible = ({ data }: { data: { draft: boolean } }) => !import.meta.env.PROD || !data.draft;

// 최근 글이 먼저. 같은 날 발행한 연재 글('1편', '2편'…)은 제목 순
export async function getPosts() {
	return (await getCollection('blog', isVisible)).sort(
		(a, b) =>
			b.data.pubDate.valueOf() - a.data.pubDate.valueOf() ||
			a.data.title.localeCompare(b.data.title, 'ko', { numeric: true }),
	);
}

// 프로젝트에 연결된 글을 읽는 순서대로: 먼저 쓴 글이 위, 같은 날이면 제목 순('1편', '2편'…)
export async function getProjectPosts(projectId: string) {
	return (await getPosts())
		.filter((post) => post.data.project?.id === projectId)
		.sort(
			(a, b) =>
				a.data.pubDate.valueOf() - b.data.pubDate.valueOf() ||
				a.data.title.localeCompare(b.data.title, 'ko', { numeric: true }),
		);
}

// 진행 중인 프로젝트가 먼저, 그다음 종료일이 최근인 순
export async function getProjects() {
	const end = (d?: Date) => d?.valueOf() ?? Infinity;
	return (await getCollection('projects', isVisible)).sort(
		(a, b) =>
			end(b.data.endDate) - end(a.data.endDate) ||
			b.data.startDate.valueOf() - a.data.startDate.valueOf(),
	);
}

/** 'YYYY-MM' 또는 Date를 '2024.03' 형식으로 */
export function formatMonth(value: string | Date) {
	const d = typeof value === 'string' ? new Date(`${value}-01`) : value;
	return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function formatPeriod(start: string | Date, end?: string | Date) {
	return `${formatMonth(start)} – ${end ? formatMonth(end) : '현재'}`;
}
