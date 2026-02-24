import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github as GithubIcon, Linkedin, Twitter } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ContactForm } from "@/components/ContactForm";
import { CursorGlow } from "@/components/CursorGlow";
import { useProjects, useExperiences } from "@/hooks/use-portfolio";

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

  // Use API data if available and not empty, otherwise fallback for visual presentation
  const projects = projectsData?.length ? projectsData : FALLBACK_PROJECTS;
  const experiences = expData?.length ? expData : FALLBACK_EXPERIENCES;

  return (
    <main className="bg-background min-h-screen text-foreground">
      {/* Hide on touch devices to avoid lagging/weird behavior */}
      <div className="hidden lg:block">
        <CursorGlow />
      </div>
      
      <Navbar />
      <Hero />

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
                I'm a dedicated software engineer with a passion for building <span className="text-white font-medium">high-performance digital experiences</span>. Blending robust engineering with sharp aesthetic sensibilities, I strive to create products that are both functionally powerful and visually stunning.
              </p>
              <p>
                My approach is rooted in <span className="text-neon font-medium">first-principles thinking</span>. Whether I'm designing complex system architectures, crafting pixel-perfect user interfaces, or integrating the latest LLM APIs, I focus on scalability, maintainability, and exceptional user experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {[
                "JavaScript/TS", "React/Next.js", "Node.js", 
                "Python", "PostgreSQL", "Tailwind CSS",
                "Framer Motion", "GraphQL", "Docker"
              ].map((skill, i) => (
                <div 
                  key={i} 
                  className="glass-panel py-3 px-4 rounded-xl text-center text-sm font-mono font-medium text-white/90 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                >
                  {skill}
                </div>
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
