"use client";

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { FaBriefcase, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import AnimationLottie from "../../helper/animation-lottie";
import experienceLottie from '/public/lottie/code.json';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function ExperienceCard({ exp, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 400, damping: 40 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 400, damping: 40 });

  function onMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "circOut" }}
      className="group relative cursor-pointer w-full mb-8 md:mb-14"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* LAYER 1: FIXED BASE */}
      <div className="absolute inset-0 border border-white/5 bg-[#1a1443]/20 rounded-2xl transition-all duration-500" />

      {/* LAYER 2: MIDDLE OFFSET LAYER (Pop-out Right) */}
      <div className="absolute inset-0 border border-indigo-500/20 bg-indigo-500/5 rounded-2xl transition-all duration-500 ease-out 
        group-hover:translate-x-2 group-hover:-translate-y-2 md:group-hover:translate-x-4 md:group-hover:-translate-y-4 group-hover:opacity-100 opacity-0"
      />

      {/* LAYER 3: ACTUAL CARD */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 w-full rounded-2xl bg-[#0d1224] border border-white/10 group-hover:border-indigo-400 group-hover:translate-x-4 group-hover:-translate-y-4 md:group-hover:translate-x-8 md:group-hover:-translate-y-8 transition-all duration-500 ease-out shadow-2xl"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_0%,#6366f1_0%,transparent_50%)]" />

        <div className="relative z-20 p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-6">
          <div
            style={{ transform: "translateZ(30px)" }}
            className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-20 md:h-20 bg-[#161b33] text-indigo-400 rounded-2xl border border-white/5 transition-all duration-500 group-hover:bg-indigo-600 group-hover:text-white"
          >
            <FaBriefcase className="text-xl md:text-3xl" />
          </div>

          <div className="flex-1 space-y-2 md:space-y-4">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="flex items-center gap-1.5 text-indigo-300 text-[9px] md:text-xs font-mono font-bold tracking-widest bg-indigo-500/10 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-indigo-500/20">
                <FaCalendarAlt />
                {exp.duration}
              </span>
            </div>

            <h3 className="text-lg md:text-2xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors duration-300 leading-tight">
              {exp.title}
            </h3>

            <div className="flex items-center gap-2 text-gray-400 font-medium text-xs md:text-base">
              <FaBuilding className="text-[10px] md:text-sm text-indigo-500/50" />
              <p>{exp.company}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b] bg-[#0d1224] overflow-hidden">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10 opacity-20 pointer-events-none"
      />

      <div className="flex justify-center my-8 lg:py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center"
        >
          <span className="w-12 md:w-24 h-[2px] bg-gradient-to-r from-transparent to-[#4f46e5]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-3 px-6 text-sm md:text-xl rounded-lg uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold border border-[#25213b] shadow-2xl">
            Experience
          </span>
          <span className="w-12 md:w-24 h-[2px] bg-gradient-to-l from-transparent to-[#4f46e5]"></span>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center items-center order-2 lg:order-1"
          >
            <div className="w-full max-w-md hidden md:block drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">
              <AnimationLottie animationPath={experienceLottie} />
            </div>
          </motion.div>

          <div className="flex flex-col order-1 lg:order-2">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;