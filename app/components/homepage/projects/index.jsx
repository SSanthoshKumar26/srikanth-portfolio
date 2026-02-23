"use client";

import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

const Projects = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="projects"
      className="relative z-50 w-full overflow-hidden no-scrollbar my-12 lg:my-24"
    >
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent mb-16" />

      <div className="container mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] flex justify-center mb-10 md:mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center"
        >
          <span className="w-12 md:w-24 h-[2px] bg-gradient-to-r from-transparent to-violet-500"></span>
          <h2 className="bg-[#1a1443] text-white px-6 py-3 text-base md:text-xl rounded-lg uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold border border-[#25213b] shadow-2xl mx-1">
            Featured Projects
          </h2>
          <span className="w-12 md:w-24 h-[2px] bg-gradient-to-l from-transparent to-violet-500"></span>
        </motion.div>
      </div>

      <div className="w-full no-scrollbar pt-4 pb-20 md:pt-8 md:pb-32 overflow-visible relative">
        <Marquee
          gradient={false}
          speed={35}
          pauseOnHover={true}
          direction="right"
          className="no-scrollbar !overflow-visible"
        >
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="mx-8 md:mx-12 w-[280px] sm:w-[350px] md:w-[480px] h-[380px] sm:h-[450px] md:h-[520px] flex-shrink-0 relative"
              style={{ overflow: 'visible' }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Projects;