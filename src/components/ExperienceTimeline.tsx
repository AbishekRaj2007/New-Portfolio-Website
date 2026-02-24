import { motion } from "framer-motion";
import type { Experience } from "@/hooks/use-portfolio";
import { Briefcase } from "lucide-react";

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  if (!experiences || experiences.length === 0) {
    return <div className="text-muted-foreground">No experience listed yet.</div>;
  }

  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent">
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
        >
          {/* Icon Marker */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/30 bg-card shadow-neon shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground text-primary">
            <Briefcase size={16} />
          </div>

          {/* Card */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-2xl hover:border-primary/30 transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
              <h3 className="font-display font-bold text-xl text-white">{exp.role}</h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                {exp.period}
              </span>
            </div>
            <h4 className="text-lg text-white/80 mb-4">{exp.company}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {exp.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
