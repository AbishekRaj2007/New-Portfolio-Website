import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import CountUp from "react-countup";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel mb-6 border-primary/20"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-xs font-mono text-primary uppercase tracking-wider">Available for work</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6"
          >
            <span className="text-white block">IMAGINATION</span>
            <span className="text-muted-foreground block">DRIVES</span>
            <span className="text-neon block">INNOVATION</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed"
          >
            I build scalable, high-performance web applications and AI-driven solutions that transform complex problems into elegant experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group px-8 py-4 rounded-full font-semibold bg-primary text-primary-foreground flex items-center gap-2 hover:shadow-neon-strong transition-all duration-300"
            >
              View Projects
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full font-semibold text-white glass-panel hover:bg-white/10 transition-all duration-300"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 pt-8 border-t border-white/10"
          >
            <div>
              <div className="text-3xl font-display font-bold text-white mb-1">
                <CountUp end={4} duration={3} />+
              </div>
              <div className="text-sm text-muted-foreground">Years Exp.</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-white mb-1">
                <CountUp end={30} duration={3} />+
              </div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-white mb-1">
                <CountUp end={100} suffix="%" duration={3} />
              </div>
              <div className="text-sm text-muted-foreground">Commitment</div>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Abstract Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:flex justify-center relative"
        >
          <div className="relative w-[500px] h-[600px] glass-panel rounded-3xl border-primary/20 overflow-hidden group">
            {/* Terminal mock */}
            <div className="absolute top-0 w-full h-12 bg-black/40 border-b border-white/10 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="ml-4 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Terminal size={12} /> root@innovation:~
              </div>
            </div>
            <div className="mt-16 p-6 font-mono text-sm leading-relaxed">
              <p className="text-primary mb-2">$ init_project --stack="react node ai"</p>
              <p className="text-muted-foreground mb-4">{">"} Loading dependencies...</p>
              
              <div className="space-y-2">
                {[
                  "[OK] System architecture designed",
                  "[OK] Database schema initialized",
                  "[OK] Frontend framework compiled",
                  "[OK] AI models integrated",
                  "[OK] Deploying to production...",
                ].map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
                    className="text-white/80"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2 }}
                className="w-3 h-5 bg-primary mt-4"
              />
            </div>
            
            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
