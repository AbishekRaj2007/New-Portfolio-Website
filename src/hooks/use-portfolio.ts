import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

// We define minimal schemas here to match the expected API contract
// In a real scenario, these would be imported directly from @shared/schema
const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  techStack: z.array(z.string()),
  githubUrl: z.string().nullable(),
  liveDemoUrl: z.string().nullable(),
  featured: z.boolean(),
});

const experienceSchema = z.object({
  id: z.number(),
  company: z.string(),
  role: z.string(),
  period: z.string(),
  description: z.string(),
});

const achievementSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  year: z.string(),
  link: z.string().nullable().optional(),
});

export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Achievement = z.infer<typeof achievementSchema>;

export function useProjects() {
  return useQuery({
    queryKey: ['/api/projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      return z.array(projectSchema).parse(data);
    },
  });
}

export function useExperiences() {
  return useQuery({
    queryKey: ['/api/experiences'],
    queryFn: async () => {
      const res = await fetch('/api/experiences');
      if (!res.ok) throw new Error('Failed to fetch experiences');
      const data = await res.json();
      return z.array(experienceSchema).parse(data);
    },
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: ['/api/achievements'],
    queryFn: async () => {
      const res = await fetch('/api/achievements');
      if (!res.ok) throw new Error('Failed to fetch achievements');
      const data = await res.json();
      return z.array(achievementSchema).parse(data);
    },
  });
}

export function useSubmitMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to send message');
      }
      return res.json();
    },
  });
}
