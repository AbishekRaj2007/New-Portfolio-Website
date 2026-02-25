import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

interface FlyingArrowProps {
    isTriggered: boolean;
    onComplete: () => void;
}

// A 3D-like Paper Plane SVG component
const PaperPlane = ({ color = "currentColor" }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M22 2L11 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 2L15 22L11 13L2 9L22 2Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export function FlyingArrow({ isTriggered, onComplete }: FlyingArrowProps) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (isTriggered && !active) {
            setActive(true);
            // Ensure the animation completes even if isTriggered is reset by parent
            const timer = setTimeout(() => {
                setActive(false);
                onComplete();
            }, 4500);
            return () => clearTimeout(timer);
        }
    }, [isTriggered, active, onComplete]);

    // Generate hyper-dynamic paths with 3D rotations
    const entities = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            delay: i * 0.08,
            size: 20 + Math.random() * 30,
            path: {
                x: [
                    "50vw",
                    `${50 + (Math.random() - 0.5) * 60}vw`,
                    `${50 + (Math.random() - 0.5) * 100}vw`,
                    `${50 + (Math.random() - 0.5) * 150}vw`
                ],
                y: ["90vh", "60vh", "30vh", "-20vh"],
                z: [0, 200, 500, 1000], // Fake 3D depth
                rotateX: [0, 45, 90, 180],
                rotateY: [0, 180, 360, 720],
                rotateZ: [0, Math.random() * 360, Math.random() * 720, Math.random() * 1080],
            }
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden" style={{ perspective: "1500px" }}>
            <AnimatePresence>
                {active && (
                    <>
                        {/* 1. The Core Flux (Background Light) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: [0, 0.3, 0], scale: [0.5, 2, 0.5] }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"
                        />

                        {/* 2. The Vortex Particles (Gathering at start) */}
                        {[...Array(30)].map((_, j) => (
                            <motion.div
                                key={`vortex-${j}`}
                                initial={{
                                    x: `${50 + (Math.random() - 0.5) * 100}vw`,
                                    y: `${Math.random() * 100}vh`,
                                    opacity: 0
                                }}
                                animate={{
                                    x: "50vw",
                                    y: "90vh",
                                    opacity: [0, 1, 0],
                                    scale: [1, 0]
                                }}
                                transition={{
                                    duration: 1,
                                    delay: Math.random() * 0.5,
                                    ease: "circIn"
                                }}
                                className="absolute w-2 h-2 bg-primary rounded-full blur-[2px]"
                            />
                        ))}

                        {/* 3. The 3D Entities (Planes/Arrows) */}
                        {entities.map((entity) => (
                            <motion.div
                                key={entity.id}
                                initial={{
                                    x: entity.path.x[0],
                                    y: entity.path.y[0],
                                    z: 0,
                                    opacity: 0,
                                    scale: 0,
                                    rotateX: 0,
                                    rotateY: 0,
                                    rotateZ: 0
                                }}
                                animate={{
                                    x: entity.path.x,
                                    y: entity.path.y,
                                    z: entity.path.z,
                                    opacity: [0, 1, 1, 0],
                                    scale: [0, 1, 1.5, 3],
                                    rotateX: entity.path.rotateX,
                                    rotateY: entity.path.rotateY,
                                    rotateZ: entity.path.rotateZ,
                                }}
                                transition={{
                                    duration: 3,
                                    delay: entity.delay,
                                    ease: [0.34, 1.56, 0.64, 1], // Bouncy back ease
                                }}
                                style={{ width: entity.size, height: entity.size }}
                                className="absolute flex items-center justify-center pointer-events-none"
                            >
                                <div className="relative w-full h-full">
                                    <PaperPlane color="hsl(var(--primary))" />

                                    {/* Neon Glow */}
                                    <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full -z-10 animate-pulse" />

                                    {/* Energy Ribbon Trail */}
                                    <motion.div
                                        animate={{
                                            height: [0, 200, 0],
                                            opacity: [0, 0.4, 0],
                                        }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent blur-[2px] origin-top"
                                    />
                                </div>
                            </motion.div>
                        ))}

                        {/* 4. Shockwave Burst */}
                        <motion.div
                            initial={{ x: "50vw", y: "90vh", scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 8],
                                opacity: [0, 1, 0],
                            }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-[2px] border-primary/50 rounded-full blur-[4px]"
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
