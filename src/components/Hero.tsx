import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import CountUp from "react-countup";
import { useEffect, useState, useMemo } from "react";

function BackgroundParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/30 blur-[1px]"
          animate={{
            y: ["110vh", "-10vh"],
            opacity: [0, 0.7, 0],
            x: [`${p.x}%`, `${p.x + (Math.random() - 0.5) * 15}%`],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: -p.delay, // Use negative delay to start them in middle of animation
            ease: "linear",
          }}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050808]">
      {/* 1. Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* 2. Floating Particles */}
      <BackgroundParticles />

      {/* 3. Background glowing orbs - Now Animated */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 80, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[130px] mix-blend-screen pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -60, 0],
          y: [0, 70, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-blue-500/15 rounded-full blur-[160px] mix-blend-screen pointer-events-none"
      />

      {/* 4. Center Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

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
                <CountUp end={2} duration={3} />+
              </div>
              <div className="text-sm text-muted-foreground">Years Exp.</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-white mb-1">
                <CountUp end={25} duration={3} />+
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
          animate={{
            opacity: 1,
            scale: 1,
            rotateX: mousePos.y,
            rotateY: -mousePos.x,
          }}
          transition={{ duration: 0.8, delay: 0.4, rotateX: { duration: 0.1 }, rotateY: { duration: 0.1 } }}
          className="hidden lg:flex justify-center relative perspective-1000"
          style={{ transformStyle: "preserve-3d" }}
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
              <p className="text-primary mb-2">$ hire --developer="ar" --skills="ml,fullstack,cloud"</p>
              <p className="text-muted-foreground mb-4">{">"} validating skills...</p>

              <div className="space-y-2">
                {[
                  "[OK] 500+ DSA problems solved",
                  "[OK] Production-ready applications built",
                  "[OK] AI systems engineered",
                  "[OK] REST APIs architected",
                  "[OK] Database schemas optimized",
                  "[OK] Cloud deployments configured",
                  "[OK] Git & CI/CD workflows automated",
                  "[OK] Security best practices enforced",
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
