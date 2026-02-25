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
        techStack: ["React", "TypeScript", "Tailwind", "Solidity", "Ether.js", "Hardhat"],
        liveDemoUrl: "#",
        githubUrl: "https://github.com/AbishekRaj2007/CertiChain",
        featured: true,
      },
      {
        id: 2,
        title: "RepoScribe",
        description: "RepoScribe is an intelligent README generator that automatically creates clear, professional documentation for GitHub repositories.",
        imageUrl: "/project2.png",
        techStack: ["React", "TypeScript", "Tailwind", "Groq", "Python"],
        liveDemoUrl: "#",
        githubUrl: "https://github.com/AbishekRaj2007/RepoScribe-AI",
        featured: true,
      },
      {
        id: 3,
        title: "ResQ-Desk",
        description: "ResQ-Desk: transforming 911 calls into instant tactical actions using Generative AI. Listen. Analyze. Dispatch.",
        imageUrl: "/project3.png",
        techStack: ["React", "TypeScript", "Tailwind", "AWS Bedrock", "AWS IAM", "AWS S3"],
        liveDemoUrl: "#",
        githubUrl: "https://github.com/AbishekRaj2007/ResQ-Desk",
        featured: true,
      },
      {
        id: 4,
        title: "Fake News Detector",
        description: "A Machine Learning-based application to detect whether a news article is real or fake using natural language processing (NLP).",
        imageUrl: "/project4.png",
        techStack: ["Scikit-Learn", "Pandas", "Numpy", "Python", "Streamlit"],
        liveDemoUrl: "#",
        githubUrl: "https://github.com/AbishekRaj2007/Fake-News-Detector",
        featured: true,
      },
      {
        id: 5,
        title: "Post-Dost",
        description: "AI social post idea generator for Indian small businesses.Culturally-aware AI-like flows for captions & placeholder images with lightweight JWT auth.",
        imageUrl: "/project5.jpeg",
        techStack: ["Next.js", "TypeScript", "Tailwind", "Gemini AI", "JWT", "Stability AI"],
        liveDemoUrl: "#",
        githubUrl: "https://github.com/AbishekRaj2007/post-dost",
        featured: true,
      }
    ];
    this.experiences = [
      {
        id: 1,
        company: "Chennai Institute of Technology",
        role: "B.E Computer Science and Engineering",
        period: "2024-2028",
        description: "Strengthened problem-solving skills by solving 500+ data structures and algorithms problems, improving coding efficiency and optimization strategies."
      },
      {
        id: 2,
        company: "Google for Developers",
        role: "AIML Virtual Internship",
        period: "May 2025 - June 2025",
        description: "Implemented supervised learning models using real-world datasets, improving understanding of data preprocessing, feature engineering, and performance optimization."
      },
      {
        id: 3,
        company: "BSAP inc.",
        role: "AI Engineer Intern",
        period: "January 2026 - March 2026",
        description: "Assisted in training and fine-tuning supervised learning models, applying validation techniques to optimize accuracy and reduce overfitting."
      }
    ];
    this.achievements = [
      {
        id: 1,
        title: "VisionX Hackathon",
        description: "Secured 2nd runner up at the VisionX Hackathon for developing an innovative solution that addresses real-world challenges through technology.",
        year: "2025",
        link: ""
      },
      {
        id: 2,
        title: "Leetcode",
        description: "Solved 500+ problems and 1800+ rating on LeetCode",
        year: "2026",
        link: ""
      },
      {
        id: 3,
        title: "AWS ImpactX Challenge",
        description: "Finalists in the Hackathon organized by IIT Bombay",
        year: "2025",
        link: ""
      },
      {
        id: 4,
        title: "BuidL CTC",
        description: "Presented a Blockchain based solution for gig workers",
        year: "2025",
        link: ""
      },
      {
        id: 5,
        title: "NextGen Hackathon",
        description: "Finalists in the Hackathon organized by startup TN, Logitech and Hackcultue",
        year: "2026",
        link: ""
      },
    ];
    this.messages = [];
    this.nextIds = { projects: 6, experiences: 4, achievements: 6, messages: 1 };
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
