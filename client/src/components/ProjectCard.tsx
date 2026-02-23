import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/hooks/use-portfolio";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl glass-panel overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-neon"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-300 group-hover:opacity-0" />
        <img
          src={project.imageUrl || `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80`}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Tech Stack Badges floating over image */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[10px] font-mono font-semibold bg-black/60 backdrop-blur-md text-primary border border-primary/20 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-20 bg-card/90">
        <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
          {project.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg glass-panel hover:text-primary hover:border-primary/50 transition-all duration-300"
              aria-label="View Source"
            >
              <Github size={20} />
            </a>
          )}
        </div>
      </div>
      
      {/* Subtle glowing border effect on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 pointer-events-none transition-colors duration-500" />
    </motion.div>
  );
}
