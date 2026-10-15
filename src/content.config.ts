import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 기술 글·회고 등 일반 포스트
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).default([]),
			// 관련 프로젝트가 있으면 projects 컬렉션의 id(파일명)를 적는다
			project: reference('projects').optional(),
			draft: z.boolean().default(false),
		}),
});

// 경력 중 수행한 프로젝트(work)와 사이드 프로젝트(side)
const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			kind: z.enum(['work', 'side']),
			// work 프로젝트면 소속 회사, side면 생략
			company: z.string().optional(),
			role: z.string(),
			startDate: z.coerce.date(),
			// 진행 중이면 생략
			endDate: z.coerce.date().optional(),
			stack: z.array(z.string()).default([]),
			links: z
				.object({
					repo: z.url().optional(),
					demo: z.url().optional(),
				})
				.default({}),
			heroImage: image().optional(),
			featured: z.boolean().default(false),
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog, projects };
