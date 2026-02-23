// projects.tsx
"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';
import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';

const Projects = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize scroll position for seamless loop
  useEffect(() => {
    if (mounted && scrollRef.current) {
      const ele = scrollRef.current;
      // Start in the middle third
      ele.scrollLeft = ele.scrollWidth / 3;
    }
  }, [mounted]);

  // PREVENT BACKGROUND SCROLL WHEN MODAL IS OPEN
  useEffect(() => {
    if (selectedProject) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100vw';
      document.body.style.overflowY = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      if (!selectedProject) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
      }
    };
  }, [selectedProject]);

  // AUTO SLIDE LOGIC - REWRITTEN FOR ULTRA SMOOTH 60FPS+
  useEffect(() => {
    if (isPaused || !mounted || selectedProject) return;

    let rafId;
    let lastTime = 0;

    const scroll = (time) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;

      if (deltaTime > 16) {
        if (scrollRef.current) {
          const ele = scrollRef.current;
          const oneThird = ele.scrollWidth / 3;

          ele.scrollLeft -= 1;

          // Loop seamlessly (Bidirectional support)
          if (ele.scrollLeft <= 0) {
            ele.scrollLeft = oneThird;
          } else if (ele.scrollLeft >= oneThird * 2) {
            ele.scrollLeft = oneThird;
          }
        }
        lastTime = time;
      }

      rafId = requestAnimationFrame(scroll);
    };

    rafId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused, mounted, selectedProject]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const ele = scrollRef.current;
      const oneThird = ele.scrollWidth / 3;

      setIsPaused(true);
      ele.style.scrollBehavior = 'smooth';
      const scrollAmount = window.innerWidth > 768 ? 500 : 300;

      const currentScroll = ele.scrollLeft;
      const targetScroll = currentScroll + (direction === 'next' ? scrollAmount : -scrollAmount);

      // Pre-emptive jump if we are about to hit the physical edges of the tripled content
      if (direction === 'prev' && targetScroll < 100) {
        ele.style.scrollBehavior = 'auto';
        ele.scrollLeft = oneThird + currentScroll;
        ele.style.scrollBehavior = 'smooth';
      } else if (direction === 'next' && targetScroll > (oneThird * 2) - 100) {
        ele.style.scrollBehavior = 'auto';
        ele.scrollLeft = currentScroll - oneThird;
        ele.style.scrollBehavior = 'smooth';
      }

      ele.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount
      });

      setTimeout(() => {
        if (ele) {
          ele.style.scrollBehavior = 'auto';
          const mid = ele.scrollWidth / 3;
          // Softly center if we ended up near edges
          if (ele.scrollLeft < 150 || ele.scrollLeft > (mid * 2) - 150) {
            ele.scrollLeft = mid + (ele.scrollLeft % mid);
          }
        }
        setIsPaused(false);
      }, 700);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <section
        id="projects"
        className="relative z-50 w-screen left-1/2 -translate-x-1/2 overflow-hidden no-scrollbar my-12 lg:my-24"
      >
        {/* Top Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent mb-16" />

        {/* Heading */}
        <div className="w-full flex justify-center mb-12 lg:mb-20 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <span className="w-12 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-violet-500" />
            <h2 className="bg-[#1a1443] text-white px-6 py-3 text-xl rounded-lg uppercase tracking-[0.3em] font-bold border border-[#25213b] shadow-2xl">
              Featured Projects
            </h2>
            <span className="w-12 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-violet-500" />
          </motion.div>
        </div>

        {/* INTERACTIVE CAROUSEL CONTAINER */}
        <div
          className="w-full relative overflow-visible"
        >
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar gap-8 md:gap-12 px-8 md:px-20 lg:px-40 py-12 md:py-24"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              cursor: 'grab',
              scrollBehavior: 'auto'
            }}
            onMouseDown={(e) => {
              const ele = scrollRef.current;
              ele.style.cursor = 'grabbing';
              ele.style.userSelect = 'none';
              ele.style.scrollBehavior = 'auto';
              const startX = e.pageX - ele.offsetLeft;
              const scrollLeft = ele.scrollLeft;

              const onMouseMove = (e) => {
                const x = e.pageX - ele.offsetLeft;
                const walk = (x - startX) * 2;
                ele.scrollLeft = scrollLeft - walk;

                // Seamless real-time loop check during drag
                const oneThird = ele.scrollWidth / 3;
                if (ele.scrollLeft <= 50) {
                  ele.scrollLeft = oneThird + ele.scrollLeft;
                } else if (ele.scrollLeft >= (oneThird * 2) - 50) {
                  ele.scrollLeft = ele.scrollLeft - oneThird;
                }
              };

              const onMouseUp = () => {
                ele.style.cursor = 'grab';
                ele.style.removeProperty('user-select');
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
              };

              document.addEventListener('mousemove', onMouseMove);
              document.addEventListener('mouseup', onMouseUp);
            }}
          >
            {/* Triple the data for truly infinite bidirectional looping in both directions */}
            {[...projectsData, ...projectsData, ...projectsData].map((project, index) => (
              <motion.div
                key={index}
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -10 }}
                className="w-[280px] sm:w-[350px] md:w-[480px] h-[380px] sm:h-[450px] md:h-[520px] flex-shrink-0 cursor-pointer relative"
                style={{ overflow: 'visible' }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Controls - Responsive Sizes */}
        <div className="w-full flex justify-center items-center gap-4 md:gap-6 mt-4 md:mt-8 mb-12">
          <button
            onClick={() => handleScroll('prev')}
            className="p-3 md:p-4 rounded-full bg-[#1a1443] border border-[#25213b] text-[#16f2b3] hover:scale-110 active:scale-90 transition-all shadow-[0_0_20px_rgba(22,242,179,0.2)] group"
          >
            <HiArrowNarrowLeft size={24} className="md:size-7 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => handleScroll('next')}
            className="p-3 md:p-4 rounded-full bg-[#1a1443] border border-[#25213b] text-[#16f2b3] hover:scale-110 active:scale-90 transition-all shadow-[0_0_20px_rgba(22,242,179,0.2)] group"
          >
            <HiArrowNarrowRight size={24} className="md:size-7 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* MODAL / SPOTLIGHT - PERFECTLY CENTERED OUTSIDE TRANSFORMED SECTION */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop with Blur - Non Solid */}
            <motion.div
              className="absolute inset-0 bg-[#0d1224]/60 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Content - Centered Box */}
            <motion.div
              className="relative w-full max-w-5xl h-fit max-h-[90vh] overflow-visible z-[100001]"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Premium Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute -top-16 right-0 md:-top-6 md:-right-16 text-white/70 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-300 border border-white/10 shadow-2xl group z-[100002]"
                title="Close"
              >
                <IoCloseOutline size={32} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="w-full h-fit relative shadow-[0_0_150px_rgba(22,242,179,0.15)] rounded-2xl overflow-visible">
                <ProjectCard project={selectedProject} isStatic />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;