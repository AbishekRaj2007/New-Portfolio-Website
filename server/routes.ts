import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.projects.list.path, async (req, res) => {
    const data = await storage.getProjects();
    res.json(data);
  });

  app.get(api.experiences.list.path, async (req, res) => {
    const data = await storage.getExperiences();
    res.json(data);
  });

  app.get(api.achievements.list.path, async (req, res) => {
    const data = await storage.getAchievements();
    res.json(data);
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      await storage.createMessage(input);
      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Run seed function non-blocking
  seedDatabase().catch(console.error);

  return httpServer;
}

async function seedDatabase() {
  const projectsData = await storage.getProjects();
  if (projectsData.length === 0) {
    const { db } = await import('./db');
    const { projects, experiences, achievements } = await import('@shared/schema');
    
    await db.insert(projects).values([
      {
        title: "AI Chat Assistant",
        description: "A responsive chat interface integrating real-time LLM responses with a dark mode glassmorphism UI.",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
        techStack: ["React", "TypeScript", "Tailwind", "OpenAI"],
        liveDemoUrl: "#",
        githubUrl: "#",
        featured: true,
      },
      {
        title: "E-Commerce Dashboard",
        description: "An analytics dashboard tracking sales and real-time user behavior with sleek charts.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        techStack: ["Next.js", "Drizzle ORM", "PostgreSQL", "Recharts"],
        liveDemoUrl: "#",
        githubUrl: "#",
        featured: true,
      },
      {
        title: "Neon Landing Page",
        description: "A high-end dark-themed landing page template with glassmorphism and Framer Motion.",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        techStack: ["React", "Framer Motion", "Tailwind"],
        liveDemoUrl: "#",
        githubUrl: "#",
        featured: false,
      }
    ]);

    await db.insert(experiences).values([
      {
        company: "Tech Innovations Inc.",
        role: "Frontend Engineer Intern",
        period: "Summer 2023",
        description: "Built scalable user interfaces using React, reduced load times by 30%, and optimized Webpack builds."
      },
      {
        company: "Open Source Collective",
        role: "Core Contributor",
        period: "2022 - Present",
        description: "Contributed to popular React libraries, fixing bugs, writing comprehensive documentation, and adding accessibility features."
      }
    ]);

    await db.insert(achievements).values([
      {
        title: "Global Hackathon Winner",
        description: "First place out of 500+ teams for building an AI accessibility tool for the visually impaired.",
        date: "October 2023"
      },
      {
        title: "AWS Certified Developer",
        description: "Achieved associate level certification for cloud deployment and architecture.",
        date: "January 2024"
      }
    ]);
  }
}
