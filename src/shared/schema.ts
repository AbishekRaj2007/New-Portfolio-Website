import { z } from "zod";

export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  techStack: z.array(z.string()),
  githubUrl: z.string().nullable(),
  liveDemoUrl: z.string().nullable(),
  featured: z.boolean().default(false),
});

export const experienceSchema = z.object({
  id: z.number(),
  company: z.string(),
  role: z.string(),
  period: z.string(),
  description: z.string(),
});

export const achievementSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
});

export const messageSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  message: z.string(),
  createdAt: z.date(),
});

export const insertProjectSchema = projectSchema.omit({ id: true });
export const insertExperienceSchema = experienceSchema.omit({ id: true });
export const insertAchievementSchema = achievementSchema.omit({ id: true });
export const insertMessageSchema = messageSchema.omit({ id: true, createdAt: true });

export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Experience = z.infer<typeof experienceSchema>;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;

export type Achievement = z.infer<typeof achievementSchema>;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type Message = z.infer<typeof messageSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
