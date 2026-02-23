// projects.tsx
"use client";

import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { IoCloseOutline } from 'react-icons/io5';

const Projects = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      // Final fallback to ensure body isn't stuck fixed
      if (!selectedProject) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
      }
    };
  }, [selectedProject]);

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
        <div className="w-full flex justify-center mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <span className="w-24 h-[1px] bg-gradient-to-r from-transparent to-violet-500" />

            <h2 className="bg-[#1a1443] text-white px-6 py-3 text-xl rounded-lg uppercase tracking-[0.3em] font-bold border border-[#25213b] shadow-2xl">
              Featured Projects
            </h2>

            <span className="w-24 h-[1px] bg-gradient-to-l from-transparent to-violet-500" />
          </motion.div>
        </div>

        {/* FULL WIDTH MARQUEE - BALANCED PADDING FOR GLOW VISIBILITY */}
        <div className="w-full no-scrollbar pt-20 pb-32 md:pt-28 md:pb-48 overflow-visible relative">
          <Marquee
            gradient={false}
            speed={35}
            pauseOnHover={false}
            direction="right"
            className="no-scrollbar !overflow-visible"
          >
            {projectsData.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="mx-8 md:mx-12 w-[280px] sm:w-[350px] md:w-[480px] h-[380px] sm:h-[450px] md:h-[520px] flex-shrink-0 cursor-pointer relative"
                style={{ overflow: 'visible' }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </Marquee>
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