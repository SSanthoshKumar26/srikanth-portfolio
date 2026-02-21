"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";

function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiff: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <nav className="sticky top-0 z-[100] bg-[#0d1224]/50 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between py-4 container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-shrink-0 items-center"
        >
          <Link
            href="/"
            className="text-xl md:text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] to-violet-500 hover:scale-105 transition-transform"
          >
            SRIKANTH SRIDHAR
          </Link>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
          className="hidden md:flex items-center gap-2"
        >
          {[
            { name: "ABOUT", href: "/#about" },
            { name: "EXPERIENCE", href: "/#experience" },
            { name: "SKILLS", href: "/#skills" },
            { name: "EDUCATION", href: "/#education" },
            { name: "CERTIFICATES", href: "/blog" },
            { name: "PROJECTS", href: "/#projects" },
          ].map((item) => (
            <li key={item.name}>
              <Link
                className="relative group px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-gray-300 hover:text-[#16f2b3] transition-colors"
                href={item.href}
                scroll={false}
              >
                <span>{item.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#16f2b3] scale-x-0 group-hover:scale-x-100 transition-transform origin-right group-hover:origin-left duration-300"></span>
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* High-end Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#16f2b3] via-violet-500 to-[#16f2b3] origin-left z-50"
        style={{ scaleX }}
      />
    </nav>
  );
};

export default Navbar;