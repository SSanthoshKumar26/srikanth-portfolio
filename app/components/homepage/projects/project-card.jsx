import * as React from 'react';
import { FaTools, FaUser, FaRocket, FaGithub, FaInfoCircle, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function ProjectCard({ project, isStatic = false }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  function handleMouseMove(event) {
    if (isStatic) return;
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
        rotateX: isStatic ? 0 : rotateX,
        rotateY: isStatic ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={isStatic ? {} : { scale: 1.02 }}
      className="relative w-full h-full rounded-2xl group/card transition-all duration-300 hover:shadow-[0_0_50px_-12px_rgba(22,242,179,0.3)]"
    >
      {/* MULTI COLOR LIGHTNING BORDER */}
      <div className="borderGlow absolute -inset-[2px] rounded-2xl pointer-events-none" />
      <div className="borderGlowInner absolute -inset-[1px] rounded-2xl pointer-events-none" />

      {/* Interactive Spotlight Glow */}
      {!isStatic && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([xm, ym]) => `radial-gradient(400px circle at ${xm}px ${ym}px, rgba(22, 242, 179, 0.25), rgba(124, 58, 237, 0.1), transparent 80%)`
            ),
          }}
        />
      )}

      {/* CARD */}
      <div
        style={{ transform: isStatic ? "none" : "translateZ(50px)" }}
        className="relative z-10 w-full h-full flex flex-col overflow-hidden bg-[#0d1224] rounded-2xl border border-white/10"
      >
        {/* HEADER */}
        <div className="bg-[#1b223c] px-4 md:px-8 py-3 md:py-5 flex items-center justify-between border-b border-[#1e293b]">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
          </div>

          <div className="flex flex-col items-center flex-1 mx-4">
            <div className="flex items-center gap-2 text-[#16f2b3]">
              <FaRocket className="text-xs md:text-sm" />
              <h3 className="text-white text-[10px] md:text-sm lg:text-base font-bold uppercase tracking-widest leading-tight text-center">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Mobile-only Info Indicator */}
            {!isStatic && (
              <div
                className="md:hidden flex items-center justify-center w-7 h-7 rounded-full bg-[#16f2b3]/10 text-[#16f2b3] border border-[#16f2b3]/20 shadow-[0_0_10px_rgba(22,242,179,0.1)] transition-all active:scale-90"
              >
                <FaInfoCircle className="text-xs" />
              </div>
            )}

            {(project.code || project.repoUrl) && (
              <a
                href={project.code || project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={(project.code || project.repoUrl).includes("github.com") ? "View Code" : "Live Demo"}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full bg-white/5 text-white hover:bg-cyan-300 hover:text-black transition-all transform hover:scale-110 active:scale-95 border border-white/5"
              >
                {(project.code || project.repoUrl).includes("github.com") ? (
                  <FaGithub className="text-sm md:text-lg" />
                ) : (
                  <FaExternalLinkAlt className="text-[10px] md:text-xs" />
                )}
              </a>
            )}
          </div>
        </div>

        {/* CONTENT (Code Editor Style) - Scrollbar Hidden */}
        <div className="flex-1 p-4 md:p-8 font-mono text-[10px] md:text-xs lg:text-sm overflow-y-auto no-scrollbar bg-[#0d1224] leading-relaxed">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-pink-500">const</span>
              <span className="text-white">project</span>
              <span className="text-pink-500">=</span>
              <span className="text-gray-400">{'{'}</span>
            </div>

            <div className="ml-4 md:ml-8">
              <span className="text-white">name:</span>
              <span className="text-gray-400"> '</span>
              <span className="text-amber-300">{project.name}</span>
              <span className="text-gray-400">',</span>
            </div>

            <div className="ml-4 md:ml-8 flex flex-wrap items-baseline">
              <FaTools className="text-purple-500 mr-2 shrink-0 text-[10px]" />
              <span className="text-white mr-2">tools:</span>
              <span className="text-gray-400">[</span>
              {(project.tools || []).map((tool, i) => (
                <React.Fragment key={i}>
                  <span className="text-gray-400">'</span>
                  <span className="text-amber-300">{tool}</span>
                  <span className="text-gray-400">'</span>
                  {i < project.tools.length - 1 && <span className="text-gray-400">, </span>}
                </React.Fragment>
              ))}
              <span className="text-gray-400">],</span>
            </div>

            <div className="ml-4 md:ml-8">
              <span className="text-white">description:</span>
              <span className="text-gray-400"> '</span>
              <span className={`text-cyan-400 antialiased ${isStatic ? '' : 'line-clamp-3'}`}>
                {project.description}
              </span>
              <span className="text-gray-400">',</span>
            </div>

            <div>
              <span className="text-gray-400">{'};'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        .borderGlow,
        .borderGlowInner {
          opacity: ${isStatic ? '1' : '0.4'};
          transition: opacity 0.4s ease, filter 0.4s ease;
          animation: spin 6s linear infinite;
          animation-play-state: running;
        }

        .group\\/card:hover .borderGlow,
        .group\\/card:hover .borderGlowInner {
          opacity: 1;
          filter: brightness(1.8) blur(12px);
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
          filter: blur(14px) brightness(2);
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

        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
          overflow: hidden !important;
          display: block !important;
        }
      `}</style>
    </motion.div>
  );
}

export default ProjectCard;