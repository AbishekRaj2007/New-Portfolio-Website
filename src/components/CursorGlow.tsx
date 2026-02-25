import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence, useMotionTemplate } from "framer-motion";

export function CursorGlow() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 1. Setup the "Trail" of Springs at Top Level
  const s1x = useSpring(mouseX, { stiffness: 400, damping: 25, mass: 0.5 });
  const s1y = useSpring(mouseY, { stiffness: 400, damping: 25, mass: 0.5 });

  const s2x = useSpring(mouseX, { stiffness: 350, damping: 30, mass: 0.6 });
  const s2y = useSpring(mouseY, { stiffness: 350, damping: 30, mass: 0.6 });

  const s3x = useSpring(mouseX, { stiffness: 300, damping: 35, mass: 0.7 });
  const s3y = useSpring(mouseY, { stiffness: 300, damping: 35, mass: 0.7 });

  const s4x = useSpring(mouseX, { stiffness: 250, damping: 40, mass: 0.8 });
  const s4y = useSpring(mouseY, { stiffness: 250, damping: 40, mass: 0.8 });

  // 2. Build the SVG Path String using useMotionTemplate (More robust for combining MV)
  const pathD = useMotionTemplate`M ${s1x} ${s1y} Q ${s2x} ${s2y}, ${s3x} ${s3y} T ${s4x} ${s4y}`;

  // Atmospheric glow with very heavy lag
  const atmosX = useSpring(mouseX, { damping: 100, stiffness: 40 });
  const atmosY = useSpring(mouseY, { damping: 100, stiffness: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer');

      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  return (
    <div style={{ opacity: isVisible ? 1 : 0 }} className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden transition-opacity duration-500">
      {/* 1. Large Fluid Atmosphere */}
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full blur-[160px] mix-blend-screen"
        style={{
          x: atmosX,
          y: atmosY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, hsla(111, 100%, 54%, 0.08) 0%, transparent 75%)",
        }}
      />

      {/* 2. The Liquid Echo Path (SVG) */}
      <svg className="absolute inset-0 w-full h-full">
        {!isHovered && (
          <motion.path
            d={pathD}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
        )}
      </svg>

      {/* 3. The Core Interactive Elements */}
      <div className="hidden lg:block fixed inset-0">

        {/* Core Dot (Leading Point) */}
        <motion.div
          className="absolute bg-primary rounded-full shadow-[0_0_20px_hsla(111,100%,54%,0.6)]"
          style={{
            x: s1x,
            y: s1y,
            width: 10,
            height: 10,
            translateX: "-50%",
            translateY: "-50%",
            scale: isMouseDown ? 0.7 : isHovered ? 1.5 : 1,
          }}
          transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
        />

        {/* Trail Dots (Lagging Points) */}
        {!isHovered && [
          { x: s2x, y: s2y, size: 6, opacity: 0.6 },
          { x: s3x, y: s3y, size: 4, opacity: 0.3 },
          { x: s4x, y: s4y, size: 2, opacity: 0.1 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary rounded-full"
            style={{
              x: dot.x,
              y: dot.y,
              width: dot.size,
              height: dot.size,
              translateX: "-50%",
              translateY: "-50%",
              opacity: dot.opacity,
            }}
          />
        ))}

        {/* Interactive HUD (Hover State) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 45 }}
              style={{
                x: mouseX,
                y: mouseY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className="absolute flex items-center justify-center"
            >
              {/* Spinning Hex Frame */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-2 border-primary/40 rounded-[30%] rotate-45"
              />

              {/* Radar Pulse */}
              <motion.div
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute w-12 h-12 border-2 border-primary rounded-full"
              />

              {/* Aiming Corner Segments */}
              {[45, 135, 225, 315].map(deg => (
                <div
                  key={deg}
                  className="absolute w-3 h-3 border-t-2 border-l-2 border-primary"
                  style={{
                    transform: `rotate(${deg}deg) translateY(-28px) rotate(45deg)`
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
