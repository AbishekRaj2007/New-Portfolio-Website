import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export function CursorGlow() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lag for the outer ring
  const springConfig = { damping: 30, stiffness: 250, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

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
    <>
      {/* 1. The Large Background Radial Glow (Follows with heavy lag) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-40 mix-blend-screen"
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            x: useSpring(mouseX, { damping: 50, stiffness: 100 }),
            y: useSpring(mouseY, { damping: 50, stiffness: 100 }),
            translateX: "-50%",
            translateY: "-50%",
            background: "radial-gradient(circle, hsla(111, 100%, 54%, 0.1) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* 2. The Custom Interactive Cursor */}
      <div className="hidden lg:block">
        {/* Outer Ring */}
        <motion.div
          className="pointer-events-none fixed top-0 left-0 w-10 h-10 border border-primary/50 rounded-full z-[9999]"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
            scale: isHovered ? 2 : isMouseDown ? 0.8 : 1,
            backgroundColor: isHovered ? "hsla(111, 100%, 54%, 0.1)" : "transparent",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
        />

        {/* Inner Dot */}
        <motion.div
          className="pointer-events-none fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full z-[9999]"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 4, opacity: 0.3 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute inset-0 bg-primary rounded-full"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
