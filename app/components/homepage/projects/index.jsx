"use client";

import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

/* ─── constants ─── */
const mod = (n, m) => ((n % m) + m) % m;
const CARD_WIDTH = 480;
const CARD_HEIGHT = 580;
const SPREAD = 380;   // px between card centers
const DEPTH = 350;   // z push for side cards

/* ─── injected global CSS ─── */
const GLOBAL_CSS = `
@keyframes holo-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes float-orb {
  0%,100% { transform: translateY(0px) translateX(0px); }
  33%     { transform: translateY(-32px) translateX(22px); }
  66%     { transform: translateY(18px) translateX(-18px); }
}
@keyframes spin-ring {
  from { transform: translate(-50%,-50%) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg); }
}
@keyframes ticker-anim {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.holo-overlay {
  background: linear-gradient(
    135deg,
    rgba(22,242,179,0.18) 0%,
    rgba(139,92,246,0.16) 25%,
    rgba(59,130,246,0.14) 50%,
    rgba(236,72,153,0.14) 75%,
    rgba(22,242,179,0.18) 100%
  );
  background-size: 400% 400%;
  animation: holo-shift 4s ease infinite;
}
.ticker-track {
  display: flex;
  white-space: nowrap;
  animation: ticker-anim 20s linear infinite;
}
`;

/* ══════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════ */
export default function Projects() {
  return (
    <div id='projects' className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* top gradient rule */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* ── heading — untouched ── */}
      <div className="flex justify-center my-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <span className="w-24 h-[2px] bg-gradient-to-r from-transparent to-[#1a1443]" />
          <span className="bg-[#1a1443] w-fit text-white p-3 px-6 text-xl rounded-lg hover:text-[#16f2b3] transition-all duration-300 cursor-pointer uppercase tracking-widest font-bold border border-[#25213b]">
            Featured Projects
          </span>
          <span className="w-24 h-[2px] bg-gradient-to-l from-transparent to-[#1a1443]" />
        </motion.div>
      </div>

      <CoverflowCarousel />
    </div>
  );
}

/* ══════════════════════════════════════════════
   COVERFLOW CAROUSEL
══════════════════════════════════════════════ */
function CoverflowCarousel() {
  const projects = projectsData.slice(0, 6);
  const count = projects.length;
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Dynamic dimensions for responsiveness
  const [dims, setDims] = useState({
    w: 480,
    h: 580,
    s: 380,
    d: 350
  });

  const dragStart = useRef(0);
  const dragDelta = useRef(0);
  const autoTimer = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) { // Mobile
        setDims({
          w: Math.min(width * 0.88, 320),
          h: 460,
          s: width * 0.55,
          d: 180
        });
      } else if (width < 1024) { // Tablet
        setDims({
          w: 400,
          h: 500,
          s: 320,
          d: 280
        });
      } else { // Desktop
        setDims({
          w: 480,
          h: 580,
          s: 380,
          d: 350
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* auto-advance */
  const startAuto = useCallback(() => {
    clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => setActive(p => mod(p + 1, count)), 6000);
  }, [count]);

  useEffect(() => { startAuto(); return () => clearInterval(autoTimer.current); }, [startAuto]);

  const go = useCallback((dir) => {
    setActive(p => mod(p + dir, count));
    startAuto();
  }, [count, startAuto]);

  /* keyboard */
  useEffect(() => {
    const fn = e => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [go]);

  /* drag/touch handlers */
  const pDown = (cx) => { setIsDragging(true); dragStart.current = cx; dragDelta.current = 0; };
  const pMove = (cx) => { if (isDragging) dragDelta.current = cx - dragStart.current; };
  const pUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = window.innerWidth < 640 ? 40 : 55;
    if (dragDelta.current < -threshold) go(1);
    else if (dragDelta.current > threshold) go(-1);
    dragDelta.current = 0;
  };

  /* per-card 3-D params */
  const cardStyle = (i) => {
    const raw = i - active;
    const offset = mod(raw + Math.floor(count / 2), count) - Math.floor(count / 2);
    const abs = Math.abs(offset);
    const sign = Math.sign(offset) || 1;
    const isActive = offset === 0;

    return {
      isActive,
      offset,
      translateX: offset * dims.s,
      translateZ: isActive ? 0 : -dims.d - abs * 80,
      rotateY: isActive ? 0 : sign * (42 + abs * 8),
      scale: isActive ? 1.05 : 1 - abs * 0.15,
      opacity: abs > 2 ? 0 : isActive ? 1 : 1 - abs * 0.35,
      zIndex: isActive ? 50 : 40 - abs * 10,
      brightness: isActive ? 1 : 0.4 - abs * 0.1,
    };
  };

  const springCfg = { type: 'spring', stiffness: 120, damping: 24, mass: 1.2 };

  return (
    <div className="relative flex flex-col items-center pb-16 select-none overflow-hidden sm:overflow-visible">

      {/* ── ambient orbs ── */}
      <AmbientOrbs />

      {/* ── 3D stage ── */}
      <div
        className="relative w-full overflow-visible"
        style={{
          height: dims.h + 100,
          perspective: '1500px',
          perspectiveOrigin: '50% 45%',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y'
        }}
        onMouseDown={e => pDown(e.clientX)}
        onMouseMove={e => pMove(e.clientX)}
        onMouseUp={pUp}
        onMouseLeave={pUp}
        onTouchStart={e => pDown(e.touches[0].clientX)}
        onTouchMove={e => pMove(e.touches[0].clientX)}
        onTouchEnd={pUp}
      >
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          {projects.map((project, i) => {
            const s = cardStyle(i);
            return (
              <motion.div
                key={i}
                animate={{
                  x: s.translateX,
                  z: s.translateZ,
                  rotateY: s.rotateY,
                  scale: s.scale,
                  opacity: s.opacity,
                }}
                transition={springCfg}
                onClick={() => { if (!s.isActive) { setActive(i); startAuto(); } }}
                style={{
                  position: 'absolute',
                  width: dims.w,
                  height: dims.h,
                  zIndex: s.zIndex,
                  transformStyle: 'preserve-3d',
                  filter: `brightness(${s.brightness})`,
                  cursor: s.isActive ? 'default' : 'pointer',
                  willChange: 'transform, opacity',
                  pointerEvents: abs(s.offset) > 2 ? 'none' : 'auto'
                }}
              >
                {/* animated glow border — active */}
                {s.isActive && <HoloBorder />}

                {/* holographic overlay — active */}
                {s.isActive && (
                  <div className="holo-overlay absolute inset-0 rounded-2xl pointer-events-none z-20 mix-blend-screen" />
                )}

                {/* top shimmer line */}
                {s.isActive && (
                  <div className="absolute inset-x-0 top-0 h-[1.5px] z-30 rounded-t-2xl"
                    style={{ background: 'linear-gradient(90deg,transparent,#16f2b3,#8b5cf6,#16f2b3,transparent)' }} />
                )}

                {/* card body */}
                <div
                  className={`w-full h-full rounded-2xl overflow-hidden backdrop-blur-2xl transition-shadow duration-500 ${s.isActive
                    ? 'border border-white/20 shadow-[0_0_80px_-10px_rgba(22,242,179,0.35),0_50px_100px_-20px_rgba(0,0,0,0.95)]'
                    : 'border border-white/5  shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)]'
                    } bg-[#0d1224]/95`}
                >
                  <ProjectCard project={project} />
                </div>

                {/* floor reflection */}
                {s.isActive && <FloorReflection />}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── active project label ── */}
      <motion.div
        key={`label-${active}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mt-4 text-center px-6"
      >
        <p className="text-[#16f2b3] text-sm sm:text-lg font-bold tracking-[0.25em] uppercase">
          {projects[active].name}
        </p>
        {projects[active].role && (
          <p className="text-white/25 text-[10px] sm:text-xs tracking-widest mt-1 font-mono">{projects[active].role}</p>
        )}
      </motion.div>

      {/* ── nav row ── */}
      <div className="flex items-center gap-3 sm:gap-5 mt-7">
        <NavBtn onClick={() => go(-1)} dir="left" />
        <DotRail count={count} active={active} onDot={i => { setActive(i); startAuto(); }} />
        <NavBtn onClick={() => go(1)} dir="right" />
      </div>

      {/* ── index counter ── */}
      <div className="mt-3 font-mono text-[10px] sm:text-sm tracking-widest flex items-center gap-2">
        <span className="text-[#16f2b3] font-bold">{String(active + 1).padStart(2, '0')}</span>
        <span className="text-white/10">／</span>
        <span className="text-white/20">{String(count).padStart(2, '0')}</span>
      </div>

      {/* ── scrolling tech ticker ── */}
      <div className="w-full mt-10 overflow-hidden border-t border-b border-white/5 py-2">
        <div className="ticker-track gap-0">
          {[...projects, ...projects].flatMap((p, gi) =>
            (p.tools || []).map((t, ti) => (
              <span key={`${gi}-${ti}`} className="px-6 text-white/12 text-[10px] font-mono tracking-[0.35em] uppercase">
                {t}
                <span className="ml-6 text-white/8">·</span>
              </span>
            ))
          )}
        </div>
      </div>

      <p className="mt-5 text-white/12 text-[9px] sm:text-[11px] tracking-[0.3em] font-mono uppercase">
        {window.innerWidth < 640 ? 'swipe · click' : 'drag · click · ← →'}
      </p>
    </div>
  );
}

const abs = (n) => Math.abs(n);

/* ── Ambient floating orbs + spinning rings ── */
function AmbientOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div style={{ animation: 'float-orb 20s ease-in-out infinite' }}
        className="absolute top-[8%] left-[8%] w-80 h-80 bg-violet-600/5 rounded-full blur-3xl opacity-50" />
      <div style={{ animation: 'float-orb 25s ease-in-out infinite', animationDelay: '-4s' }}
        className="absolute bottom-[8%] right-[5%] w-96 h-96 bg-[#16f2b3]/3 rounded-full blur-3xl opacity-50" />
      <div style={{ animation: 'float-orb 30s ease-in-out infinite', animationDelay: '-8s' }}
        className="absolute top-[45%] left-[55%] w-64 h-64 bg-blue-500/4 rounded-full blur-3xl opacity-50" />
      {/* rings */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full border border-violet-500/2"
        style={{ animation: 'spin-ring 120s linear infinite', transformOrigin: 'center' }} />
      <div className="absolute top-1/2 left-1/2 w-[560px] h-[560px] rounded-full border border-[#16f2b3]/2"
        style={{ animation: 'spin-ring 90s linear infinite reverse', transformOrigin: 'center' }} />
    </div>
  );
}

/* ── Holographic animated border ── */
function HoloBorder() {
  return (
    <div
      className="absolute -inset-[1.5px] rounded-2xl pointer-events-none z-10"
      style={{
        background: 'linear-gradient(135deg,#16f2b3,#8b5cf6,#3b82f6,#ec4899,#16f2b3)',
        backgroundSize: '300% 300%',
        animation: 'holo-shift 3s ease infinite',
        borderRadius: '1rem',
        padding: '1.5px',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      }}
    />
  );
}

/* ── Floor reflection pseudo element ── */
function FloorReflection() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: '100%',
        left: 0,
        width: '100%',
        height: 60,
        background: 'linear-gradient(to bottom, rgba(22,242,179,0.06), transparent)',
        transform: 'scaleY(-1)',
        filter: 'blur(3px)',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)',
        borderRadius: '0 0 1rem 1rem',
      }}
    />
  );
}

/* ── Dot rail ── */
function DotRail({ count, active, onDot }) {
  return (
    <div className="flex items-center gap-[10px]">
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} onClick={() => onDot(i)} className="flex items-center justify-center">
          <motion.span
            animate={{
              width: i === active ? 28 : 8,
              backgroundColor: i === active ? '#16f2b3' : 'rgba(255,255,255,0.18)',
              boxShadow: i === active ? '0 0 14px 4px rgba(22,242,179,0.55)' : 'none',
            }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            style={{ height: 8, borderRadius: 9999, display: 'block' }}
          />
        </button>
      ))}
    </div>
  );
}

/* ── Arrow nav button ── */
function NavBtn({ onClick, dir }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.14 }}
      whileTap={{ scale: 0.90 }}
      className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-[#0d1224]/80 backdrop-blur-md text-white/40 hover:text-[#16f2b3] hover:border-[#16f2b3]/40 hover:shadow-[0_0_24px_rgba(22,242,179,0.2)] transition-all duration-300"
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        {dir === 'left'
          ? <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          : <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
    </motion.button>
  );
}