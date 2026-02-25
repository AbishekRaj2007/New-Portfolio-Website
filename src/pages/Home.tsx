import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github as GithubIcon, Linkedin, Twitter } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { AchievementCard } from "@/components/AchievementCard";
import { ContactForm } from "@/components/ContactForm";
import { CursorGlow } from "@/components/CursorGlow";
import { ImageGallery } from "@/components/ImageGallery";
import { useProjects, useExperiences, useAchievements } from "@/hooks/use-portfolio";
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiNodedotjs, SiPython, SiPostgresql, SiTailwindcss,
  SiGraphql, SiDocker, SiFramer, SiMongodb, SiExpress,
  SiGit, SiGithub
} from "react-icons/si";

const SKILLS = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Express", icon: SiExpress, color: "#FFFFFF" },
  { name: "Framer", icon: SiFramer, color: "#0055FF" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
];

// Fallback data in case API is empty/loading for preview purposes
const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: "Nexus AI Platform",
    description: "An enterprise-grade AI analytics dashboard providing real-time insights with natural language querying capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    techStack: ["React", "TypeScript", "Python", "TensorFlow"],
    githubUrl: "#",
    liveDemoUrl: "#",
    featured: true
  },
  {
    id: 2,
    title: "Vanguard FinTech App",
    description: "A secure, high-performance decentralized finance application for cross-border transactions and crypto portfolio management.",
    imageUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&h=600&fit=crop",
    techStack: ["Next.js", "Solidity", "Tailwind", "PostgreSQL"],
    githubUrl: "#",
    liveDemoUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "Lumina E-Commerce",
    description: "A headless e-commerce storefront with AR product preview, sub-second page loads, and highly optimized conversion funnels.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    techStack: ["Vue.js", "Stripe", "GraphQL", "Framer Motion"],
    githubUrl: "#",
    liveDemoUrl: null,
    featured: false
  }
];

const FALLBACK_EXPERIENCES = [
  {
    id: 1,
    company: "TechNova Solutions",
    role: "Senior Frontend Engineer",
    period: "2021 - Present",
    description: "Leading the frontend architecture for high-traffic SaaS products. Mentoring junior developers and establishing internal UI component libraries used across 5+ teams."
  },
  {
    id: 2,
    company: "Quantum Startup",
    role: "Fullstack Developer",
    period: "2019 - 2021",
    description: "Built scalable MVPs from scratch to series A. Implemented real-time collaborative features using WebSockets and optimized database queries."
  }
];

export default function Home() {
  const { data: projectsData, isLoading: isLoadingProjects } = useProjects();
  const { data: expData, isLoading: isLoadingExp } = useExperiences();
  const { data: achievementsData, isLoading: isLoadingAchievements } = useAchievements();

  // Use API data if available and not empty, otherwise fallback for visual presentation
  const projects = projectsData?.length ? projectsData : FALLBACK_PROJECTS;
  const experiences = expData?.length ? expData : FALLBACK_EXPERIENCES;
  const achievements = achievementsData || [];

  return (
    <main className="bg-background min-h-screen text-foreground">
      {/* Hide on touch devices to avoid lagging/weird behavior */}
      <div className="hidden lg:block">
        <CursorGlow />
      </div>

      <Navbar />
      <Hero />
      <ImageGallery />

      {/* About & Skills Section */}
      <section id="about" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="About Me" subtitle="Who I Am" alignment="center" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-lg text-muted-foreground space-y-6"
            >
              <p>
                I am a software engineering student with a strong foundation in <span className="text-white font-medium">data structures, algorithms, artificial intelligence and full-stack development</span>. With hands-on experience solving 500+ coding problems and building production-ready applications, I focus on writing efficient, scalable, and maintainable code.
              </p>
              <p>
                My interests lie in <span className="text-neon font-medium">backend systems, AI-driven applications, and performance-focused web development</span>. I approach problem-solving with structured thinking and a strong emphasis on clean architecture and long-term scalability.
              </p>
              <p>
                I am continuously improving my technical depth through real-world projects, hackathons, and competitive programming, with the goal of contributing meaningfully to high-impact engineering teams.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {SKILLS.map((skill, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    show: { opacity: 1, scale: 1 }
                  }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    y: {
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3
                    }
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 20px -5px ${skill.color}40`,
                    transition: { duration: 0.2 }
                  }}
                  className="relative group glass-panel p-4 rounded-xl flex flex-col items-center justify-center gap-3 border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden cursor-default"
                >
                  {/* Glowing background gradient on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)` }}
                  />

                  <skill.icon
                    size={32}
                    style={{ color: skill.color }}
                    className="filter drop-shadow-sm group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300"
                  />
                  <span className="text-xs font-mono font-medium text-white/70 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative z-10 bg-secondary/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Featured Work" subtitle="Portfolio" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {isLoadingProjects ? (
              // Skeletons
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-[400px] rounded-2xl glass-panel animate-pulse overflow-hidden">
                  <div className="h-64 bg-white/5" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-white/10 rounded w-2/3" />
                    <div className="h-4 bg-white/5 rounded w-full" />
                    <div className="h-4 bg-white/5 rounded w-4/5" />
                  </div>
                </div>
              ))
            ) : (
              projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading title="Experience" subtitle="Career Path" alignment="center" />

          <div className="mt-16">
            {isLoadingExp ? (
              <div className="space-y-8 text-center animate-pulse text-white/50">Loading timeline...</div>
            ) : (
              <ExperienceTimeline experiences={experiences} />
            )}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-24 relative z-10 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Achievements and Hackathons" subtitle="Milestones" alignment="left" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {isLoadingAchievements ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-40 rounded-2xl glass-panel animate-pulse" />
              ))
            ) : achievements.length > 0 ? (
              achievements.map((achievement, i) => (
                <AchievementCard key={achievement.id} achievement={achievement} index={i} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 glass-panel rounded-2xl border-white/5">
                <p className="text-muted-foreground">No achievements found in storage.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative z-10 overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <SectionHeading title="Let's Build Something Great" subtitle="Contact" />
              <p className="text-muted-foreground text-lg mb-10">
                I'm currently available for freelance projects and open to exciting full-time opportunities. Let's discuss how I can help your team achieve its goals.
              </p>

              <div className="space-y-6">
                <a href="mailto:hello@example.com" className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
                  <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:border-primary/40">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <span className="font-medium text-lg">hello@example.com</span>
                </a>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <span className="font-medium text-lg">San Francisco, CA</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-12">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center text-white hover:text-background transition-all duration-300">
                  <GithubIcon size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center text-white hover:text-background transition-all duration-300">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center text-white hover:text-background transition-all duration-300">
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-background text-center relative z-10">
        <p className="text-muted-foreground text-sm font-mono">
          &copy; {new Date().getFullYear()} Designed & Built with <span className="text-primary">Neon</span>
        </p>
      </footer>
    </main>
  );
}
