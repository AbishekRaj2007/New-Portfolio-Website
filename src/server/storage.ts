import {
  projectSchema, type Project, type InsertProject,
  experienceSchema, type Experience, type InsertExperience,
  achievementSchema, type Achievement, type InsertAchievement,
  messageSchema, type Message, type InsertMessage
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getExperiences(): Promise<Experience[]>;
  getAchievements(): Promise<Achievement[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private projects: Project[];
  private experiences: Experience[];
  private achievements: Achievement[];
  private messages: Message[];
  private nextIds: { [key: string]: number };

  constructor() {
    this.projects = [
      {
        id: 1,
        title: "AI Chat Assistant",
        description: "A responsive chat interface integrating real-time LLM responses with a dark mode glassmorphism UI.",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
        techStack: ["React", "TypeScript", "Tailwind", "OpenAI"],
        liveDemoUrl: "#",
        githubUrl: "#",
        featured: true,
      },
      {
        id: 2,
        title: "E-Commerce Dashboard",
        description: "An analytics dashboard tracking sales and real-time user behavior with sleek charts.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        techStack: ["Next.js", "Drizzle ORM", "PostgreSQL", "Recharts"],
        liveDemoUrl: "#",
        githubUrl: "#",
        featured: true,
      }
    ];
    this.experiences = [
      {
        id: 1,
        company: "Tech Innovations Inc.",
        role: "Frontend Engineer Intern",
        period: "Summer 2023",
        description: "Built scalable user interfaces using React, reduced load times by 30%, and optimized Webpack builds."
      }
    ];
    this.achievements = [];
    this.messages = [];
    this.nextIds = { projects: 3, experiences: 2, achievements: 1, messages: 1 };
  }

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getExperiences(): Promise<Experience[]> {
    return this.experiences;
  }

  async getAchievements(): Promise<Achievement[]> {
    return this.achievements;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.nextIds.messages++;
    const message: Message = { ...insertMessage, id, createdAt: new Date() };
    this.messages.push(message);
    return message;
  }
}

export const storage = new MemStorage();
