import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
}

export function SectionHeading({ title, subtitle, alignment = "left" }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${alignment === "center" ? "text-center" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-3 mb-4"
      >
        {alignment === "left" && <div className="w-12 h-[2px] bg-primary rounded-full shadow-neon" />}
        <span className="text-primary font-mono text-sm tracking-wider uppercase">{subtitle}</span>
        {alignment === "center" && <div className="w-12 h-[2px] bg-primary rounded-full shadow-neon" />}
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-5xl font-display font-bold text-white"
      >
        {title}
      </motion.h2>
    </div>
  );
}
