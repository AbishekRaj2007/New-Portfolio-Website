import { motion } from "framer-motion";
import { Trophy, ExternalLink } from "lucide-react";
import type { Achievement } from "@/hooks/use-portfolio";

interface AchievementCardProps {
    achievement: Achievement;
    index: number;
}

export function AchievementCard({ achievement, index }: AchievementCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative glass-panel p-6 rounded-2xl border-white/5 hover:border-primary/30 transition-all duration-300 overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors" />

            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                    <Trophy size={24} />
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-primary/70">{achievement.year}</span>
                        {achievement.link && (
                            <a
                                href={achievement.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/40 hover:text-primary transition-colors"
                            >
                                <ExternalLink size={14} />
                            </a>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {achievement.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {achievement.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
