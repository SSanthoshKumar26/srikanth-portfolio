"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = [
    { name: "ABOUT", href: "/#about" },
    { name: "EXPERIENCE", href: "/#experience" },
    { name: "SKILLS", href: "/#skills" },
    { name: "EDUCATION", href: "/#education" },
    { name: "CERTIFICATES", href: "/blog" },
    { name: "PROJECTS", href: "/#projects" },
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-[#0d1224]/70 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between py-4 container mx-auto px-6 lg:px-12">
        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#16f2b3] p-2 hover:bg-white/5 rounded-lg transition-colors focus:outline-none z-50"
        >
          {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>

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

        {/* DESKTOP NAV */}
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-2"
        >
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                className="relative group px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-gray-300 hover:text-[#16f2b3] transition-colors"
                href={item.href}
                scroll={item.href.startsWith("/#") ? false : true}
              >
                <span>{item.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#16f2b3] scale-x-0 group-hover:scale-x-100 transition-transform origin-right group-hover:origin-left duration-300"></span>
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d1224]/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <ul className="flex flex-col p-6 gap-4">
              {navItems.map((item, idx) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    scroll={item.href.startsWith("/#") ? false : true}
                    className="block text-sm font-bold tracking-[0.3em] text-gray-300 hover:text-[#16f2b3] transition-colors py-2"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* High-end Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#16f2b3] via-violet-500 to-[#16f2b3] origin-left z-50"
        style={{ scaleX }}
      />
    </nav>
  );
};

export default Navbar;