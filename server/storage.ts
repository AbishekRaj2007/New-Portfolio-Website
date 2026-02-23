import { db } from "./db";
import { 
  projects, experiences, achievements, messages,
  type Project, type InsertProject,
  type Experience, type InsertExperience,
  type Achievement, type InsertAchievement,
  type Message, type InsertMessage
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getExperiences(): Promise<Experience[]>;
  getAchievements(): Promise<Achievement[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences);
  }

  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();
