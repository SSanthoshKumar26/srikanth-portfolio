"use client";

import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

function Skills() {
  return (
    <div id="skills" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10 pointer-events-none">
        <div className="w-[300px] h-[300px] bg-[#16f2b3] rounded-full blur-[120px] absolute -top-24 left-1/4"></div>
      </div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <span className="w-24 h-[2px] bg-gradient-to-r from-transparent to-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-3 px-6 text-lg rounded-lg hover:text-[#16f2b3] transition-all duration-300 cursor-pointer uppercase tracking-widest font-bold border border-[#25213b]">
            Skills & Tech Stack
          </span>
          <span className="w-24 h-[2px] bg-gradient-to-l from-transparent to-[#1a1443]"></span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full my-12"
      >
        <Marquee
          gradient={false}
          speed={100}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="left"
        >
          {skillsData.map((skill, id) => (
            <div className="w-40 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-3 sm:m-6 rounded-2xl group relative hover:scale-105 cursor-pointer"
              key={id}>
              <div className="h-full w-full rounded-2xl border border-[#1f223c] bg-[#11152c]/50 backdrop-blur-md p-6 group-hover:border-[#16f2b3] transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#16f2b3]/5 to-violet-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex flex-col items-center justify-center gap-4 relative z-10">
                  <div className="h-12 w-12 flex items-center justify-center p-2 bg-[#0d1224] rounded-xl shadow-inner transition-transform duration-500 group-hover:rotate-[360deg]">
                    <Image
                      src={skillsImage(skill)?.src}
                      alt={skill}
                      width={48}
                      height={48}
                      className="h-full w-auto"
                    />
                  </div>
                  <p className="text-gray-300 group-hover:text-white text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                    {skill}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
};

export default Skills;