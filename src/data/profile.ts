// 사이트 전체에서 쓰는 프로필·경력 정보. About 페이지와 홈 화면이 이 파일을 읽는다.
// TODO 표시된 값은 실제 정보로 채워야 한다.

export interface Experience {
	company: string;
	role: string;
	/** 'YYYY-MM' */
	start: string;
	/** 'YYYY-MM', 재직 중이면 생략 */
	end?: string;
	summary: string;
	highlights: string[];
	stack: string[];
}

export interface SkillGroup {
	category: string;
	items: string[];
}

export const profile = {
	name: 'Heo Dong Uk', // TODO: 표기할 이름 확인
	headline: '소프트웨어 엔지니어', // TODO: 한 줄 직무 소개
	intro: '경력과 사이드 프로젝트에서 만든 것, 배운 것을 기록합니다.', // TODO: 2~3문장 자기소개
	links: {
		github: 'https://github.com/lazybrain80',
		email: '', // TODO: 공개할 연락처 이메일 (비워 두면 표시 안 함)
		linkedin: '', // TODO
	},
};

// 최신 경력이 위로 오도록 적는다
export const experience: Experience[] = [
	// {
	// 	company: '회사명',
	// 	role: '백엔드 엔지니어',
	// 	start: '2023-03',
	// 	summary: '담당 서비스와 팀에 대한 한 줄 설명',
	// 	highlights: ['정량적 성과 위주의 주요 업무 1', '주요 업무 2'],
	// 	stack: ['TypeScript', 'PostgreSQL'],
	// },
];

export const skills: SkillGroup[] = [
	// { category: 'Backend', items: ['Node.js', 'Go'] },
];

export const SITE_TITLE = profile.name;
export const SITE_DESCRIPTION = `${profile.headline} ${profile.name}의 경력과 프로젝트 기록`;
