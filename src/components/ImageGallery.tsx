import { motion } from "framer-motion";

const IMAGES = [
    "/img1.jpeg",
    "/img2.jpeg",
    "/img3.jpeg",
    "/img4.jpeg",
    "/img5.jpeg",
];

export function ImageGallery() {
    // We double the images to create a seamless infinite loop
    const duplicatedImages = [...IMAGES, ...IMAGES];

    return (
        <section className="py-24 bg-black/40 overflow-hidden relative border-y border-white/5">

            <div className="flex relative">
                <motion.div
                    className="flex gap-6 pr-6"
                    animate={{
                        x: [0, -1600], // Adjust based on total width of one set of images
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedImages.map((src, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 w-[400px] h-[250px] rounded-none overflow-hidden glass-panel group"
                        >
                            <img
                                src={src}
                                alt={`Development project ${index}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-mono text-sm">Project View_{index % IMAGES.length + 1}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Decorative gradients for edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        </section>
    );
}
