"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimationLoader from "./helper/animation-loader";
import SmoothScroll from "./helper/smooth-scroll";
import Navbar from "./navbar";
import Footer from "./footer";
import ScrollToTop from "./helper/scroll-to-top";

export default function ClientLayout({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Reduced loading time for snappier performance
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                <AnimationLoader key="loader" />
            ) : (
                <SmoothScroll key="main-content">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: "linear" }}
                    >
                        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
                            <Navbar />
                            {children}
                            <ScrollToTop />
                        </main>
                        <Footer />
                    </motion.div>
                </SmoothScroll>
            )}
        </AnimatePresence>
    );
}
