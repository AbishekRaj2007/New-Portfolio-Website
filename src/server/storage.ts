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
        title: "Certi-Chain",
        description: "CertiChain is a blockchain-powered platform for issuing and verifying digital certificates with enhanced security and transparency.",
        imageUrl: "/project1.png",
        techStack: ["React", "TypeScript", "Tailwind", "Solidity","Ether.js","Hardhat"],
        liveDemoUrl: "#",
        githubUrl: "https://github.com/AbishekRaj2007/CertiChain",
        featured: true,
      },
      {
        id: 2,
        title: "RepoScribe",
        description: "RepoScribe is an intelligent README generator that automatically creates clear, professional documentation for GitHub repositories.",
        imageUrl: "/project2.png",
        techStack: ["React", "TypeScript", "Tailwind", "Groq","Python"],
        liveDemoUrl: "#",
        githubUrl: "https://github.com/AbishekRaj2007/RepoScribe-AI",
        featured: true,
      },
      {
        id: 3,
        title: "ResQ-Desk",
        description: "ResQ-Desk: transforming 911 calls into instant tactical actions using Generative AI. Listen. Analyze. Dispatch.",
        imageUrl: "/project3.png",
        techStack: ["React", "TypeScript", "Tailwind", "AWS Bedrock","AWS IAM","AWS S3"],
        liveDemoUrl: "#",
        githubUrl: "https://github.com/AbishekRaj2007/ResQ-Desk",
        featured: true,
      },
      {
        id: 4,
        title: "Fake News Detector",
        description: "A Machine Learning-based application to detect whether a news article is real or fake using natural language processing (NLP).",
        imageUrl: "/project4.png",
        techStack: ["Scikit-Learn", "Pandas", "Numpy","Python","Streamlit"],
        liveDemoUrl: "#",
        githubUrl: "https://github.com/AbishekRaj2007/Fake-News-Detector",
        featured: true,
      },
      {
        id: 5,
        title: "Post-Dost",
        description: "AI social post idea generator for Indian small businesses.Culturally-aware AI-like flows for captions & placeholder images with lightweight JWT auth.",
        imageUrl: "/project5.jpeg",
        techStack: ["Next.js", "TypeScript", "Tailwind", "Gemini AI","JWT","Stability AI"],
        liveDemoUrl: "#",
        githubUrl: "https://github.com/AbishekRaj2007/post-dost",
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
