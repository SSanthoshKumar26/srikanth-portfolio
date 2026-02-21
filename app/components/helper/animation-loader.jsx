"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimationLoader = () => {
    const [textIndex, setTextIndex] = useState(0);
    const loadingTexts = [
        "Initializing Portfolio...",
        "Loading Experience...",
        "Compiling Projects...",
        "Rendering Innovation...",
        "Optimization Complete."
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setTextIndex((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
        }, 300);

        return () => clearInterval(timer);
    }, [loadingTexts.length]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d1224]"
        >
            <div className="relative w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-4 shadow-[0_0_15px_rgba(22,242,179,0.1)]">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="absolute h-full bg-gradient-to-r from-[#16f2b3] to-violet-600 shadow-[0_0_10px_#16f2b3]"
                />
            </div>

            <div className="h-6 flex items-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={textIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#16f2b3] font-mono text-sm tracking-widest uppercase"
                    >
                        {loadingTexts[textIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>

            <div className="mt-12 opacity-20 pointer-events-none">
                <pre className="text-[10px] text-gray-500 font-mono leading-tight">
                    {`> system.init()
> modules.load("experience")
> modules.load("projects")
> graphics.render("innovation")
> status: success`}
                </pre>
            </div>
        </motion.div>
    );
};

export default AnimationLoader;
