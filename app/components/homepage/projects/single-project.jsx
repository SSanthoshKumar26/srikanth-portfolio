// single-project.tsx
"use client";

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCode, FaPlay } from 'react-icons/fa';
import placeholder from '/public/png/placeholder.png';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function SingleProject({ project }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = event.clientX - rect.left;
    const mouseYRelative = event.clientY - rect.top;

    const xPct = mouseXRelative / width - 0.5;
    const yPct = mouseYRelative / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    mouseX.set(mouseXRelative);
    mouseY.set(mouseYRelative);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      className="group/card relative w-full h-fit flex flex-col items-center justify-center overflow-hidden px-3 md:px-8 py-[1.4rem] rounded-lg bg-[linear-gradient(110deg,#281e57_0%,#1a1033_100%)] shadow-[0_0_50px_-12px_rgba(22,242,179,0.2)] border border-[#1a1443] transition-all duration-500"
    >
      {/* ===== MULTI GRADIENT LIGHTNING BORDER ===== */}
      <div className="borderGlow absolute -inset-[2px] rounded-lg pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 group-hover/card:brightness-150" />
      <div className="borderGlowInner absolute -inset-[1px] rounded-lg pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 group-hover/card:brightness-125" />

      {/* Interactive Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([xm, ym]) => `radial-gradient(400px circle at ${xm}px ${ym}px, rgba(22, 242, 179, 0.25), rgba(124, 58, 237, 0.1), transparent 80%)`
          ),
        }}
      />

      {/* Background SVG */}
      <div className="absolute left-0 top-0 flex justify-center opacity-40 pointer-events-none">
        <svg width="1170" height="403" viewBox="0 0 1170 403" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M1170 57.3509H0V56.5132H1170V57.3509Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M410.388 402.472L410.388 0.933594L411.226 0.933594L411.226 402.472L410.388 402.472Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M841.791 402.472L841.791 0.933594L842.628 0.933594L842.628 402.472L841.791 402.472Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M1014.35 402.472L1014.35 0.933594L1015.19 0.933594L1015.19 402.472L1014.35 402.472Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M928.071 402.472L928.071 0.933594L928.909 0.933594L928.909 402.472L928.071 402.472Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M1100.63 402.472L1100.63 0.933594L1101.47 0.933594L1101.47 402.472L1100.63 402.472Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M1170 143.631H0V142.793H1170V143.631Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M324.108 402.472L324.108 0.933594L324.946 0.933594L324.946 402.472L324.108 402.472Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M755.51 402.472L755.51 0.933594L756.348 0.933594L756.348 402.472L755.51 402.472Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M1170 229.911H0V229.074H1170V229.911Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M237.827 402.472L237.827 0.933594L238.665 0.933594L238.665 402.472L237.827 402.472Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M669.23 402.472L669.23 0.933594L670.067 0.933594L670.067 402.472L669.23 402.472Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M1170 316.192H0V315.354H1170V316.192Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M151.547 402.472L151.547 0.933594L152.385 0.933594L152.385 402.472L151.547 402.472Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M582.949 402.472L582.949 0.933594L583.787 0.933594L583.787 402.472L582.949 402.472Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M1170 402.472H0V401.635H1170V402.472Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M65.2666 402.472L65.2666 0.933594L66.1042 0.933594L66.1042 402.472L65.2666 402.472Z" fill="white" fillOpacity="0.3"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M496.669 402.472L496.669 0.933594L497.507 0.933594L497.507 402.472L496.669 402.472Z" fill="white" fillOpacity="0.3"></path>
          <rect x="152.382" y="57.3506" width="85.4536" height="85.4429" fill="white" fillOpacity="0.15"></rect>
          <rect x="238.665" y="143.631" width="85.575" height="84.9928" fill="white" fillOpacity="0.10"></rect>
          <rect x="842.615" y="57.3506" width="85.4597" height="85.4453" fill="white" fillOpacity="0.15"></rect>
        </svg>
      </div>

      {/* ===== CONTENT ===== */}
      <div
        style={{ transform: "translateZ(60px)" }}
        className="relative z-20 flex flex-col items-center justify-between w-full h-full"
      >
        <h2 className="text-[#EFF3F4] font-semibold text-[1.525rem] text-center capitalize drop-shadow-lg">
          {project.name}
        </h2>

        {/* IMAGE */}
        <div className="p-6">
          <Image
            src={project.image?.src || placeholder}
            alt={project.name}
            width={1080}
            height={720}
            className="w-80 h-64 rounded-lg shadow-xl ring-1 ring-white/10 transition-all duration-700 delay-300 group-hover/card:opacity-0 group-hover/card:scale-105"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center justify-between w-full mt-4">
          <Link
            href={project.demo}
            target="_blank"
            className="group/btn flex justify-center items-center w-12 h-12 rounded-full border border-white/20 text-[#EFF3F4] bg-white/5 backdrop-blur-md
            transition-all duration-300 hover:bg-[#16f2b3] hover:text-black hover:scale-110 shadow-lg"
          >
            <FaPlay className="transition-transform group-hover/btn:rotate-12" />
          </Link>

          <Link
            href={project.code}
            target="_blank"
            className="group/btn flex justify-center items-center w-12 h-12 rounded-full border border-white/20 text-[#EFF3F4] bg-white/5 backdrop-blur-md
            transition-all duration-300 hover:bg-[#16f2b3] hover:text-black hover:scale-110 shadow-lg
            group-hover/card:translate-x-[-140px]"
          >
            <FaCode className="transition-transform group-hover/btn:-rotate-12" />
          </Link>
        </div>
      </div>

      {/* DESCRIPTION REVEAL (Modern Glass Slide) */}
      <div className="absolute inset-x-0 bottom-0 top-0 z-30 pointer-events-none overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl translate-y-full group-hover/card:translate-y-0 transition-transform duration-700 ease-in-out p-8 flex flex-col justify-center items-center text-center opacity-0 group-hover/card:opacity-100">
          <p className="text-[#EFF3F4] text-sm md:text-base leading-relaxed font-medium pointer-events-auto">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 pointer-events-auto">
            {project.tags?.map((tag, id) => (
              <span key={id} className="text-[10px] md:text-xs font-mono font-bold tracking-wider text-[#16f2b3] bg-[#16f2b3]/10 px-3 py-1 rounded-full border border-[#16f2b3]/20">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ANIMATION SYSTEM ===== */}
      <style jsx>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        .borderGlow,
        .borderGlowInner {
          animation: spin 5s linear infinite;
          animation-play-state: paused;
        }

        .group\\/card:hover .borderGlow,
        .group\\/card:hover .borderGlowInner {
          animation-play-state: running;
        }

        .borderGlow {
          background: conic-gradient(
            from var(--angle),
            transparent 0%,
            transparent 5%,
            #16f2b3 10%,
            #00e5ff 15%,
            #7c3aed 20%,
            #ff4ecd 25%,
            #16f2b3 30%,
            transparent 35%,
            transparent 100%
          );
          filter: blur(15px) brightness(1.5);
        }

        .borderGlowInner {
          background: conic-gradient(
            from var(--angle),
            transparent 0%,
            transparent 8%,
            #16f2b3 12%,
            #00e5ff 15%,
            #7c3aed 18%,
            #ff4ecd 22%,
            #16f2b3 25%,
            white 27%,
            transparent 32%,
            transparent 100%
          );
        }

        @keyframes spin {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
      `}</style>
    </motion.div>
  );
}

export default SingleProject;