import { z } from 'zod';
import { insertMessageSchema, projectSchema, experienceSchema, achievementSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects' as const,
      responses: {
        200: z.array(projectSchema),
      },
    },
  },
  experiences: {
    list: {
      method: 'GET' as const,
      path: '/api/experiences' as const,
      responses: {
        200: z.array(experienceSchema),
      },
    },
  },
  achievements: {
    list: {
      method: 'GET' as const,
      path: '/api/achievements' as const,
      responses: {
        200: z.array(achievementSchema),
      },
    },
  },
  messages: {
    create: {
      method: 'POST' as const,
      path: '/api/messages' as const,
      input: insertMessageSchema,
      responses: {
        201: z.object({ success: z.boolean() }),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type ProjectResponse = z.infer<typeof api.projects.list.responses[200]>[0];
export type ExperienceResponse = z.infer<typeof api.experiences.list.responses[200]>[0];
export type AchievementResponse = z.infer<typeof api.achievements.list.responses[200]>[0];
export type MessageInput = z.infer<typeof api.messages.create.input>;
