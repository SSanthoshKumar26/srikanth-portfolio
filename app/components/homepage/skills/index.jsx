"use client";

import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

function Skills() {
  return (
    <div id="skills" className="relative z-50 w-full border-t my-12 lg:my-24 border-[#25213b] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10 pointer-events-none text-center">
        <div className="w-[300px] h-[300px] bg-[#16f2b3] rounded-full blur-[120px] absolute -top-24 left-1/2 -translate-x-1/2"></div>
      </div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-full">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-8 lg:my-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <span className="w-12 md:w-24 h-[2px] bg-gradient-to-r from-transparent to-[#1a1443]"></span>
          <h2 className="bg-[#1a1443] w-fit text-white p-3 px-6 text-sm md:text-xl rounded-lg hover:text-[#16f2b3] transition-all duration-300 cursor-pointer uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold border border-[#25213b] shadow-2xl">
            Skills & Tech Stack
          </h2>
          <span className="w-12 md:w-24 h-[2px] bg-gradient-to-l from-transparent to-[#1a1443]"></span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full mt-4 mb-20"
      >
        <Marquee
          gradient={false}
          speed={80}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="left"
        >
          {skillsData.map((skill, id) => (
            <div className="w-40 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-3 sm:m-6 rounded-2xl group relative hover:scale-[1.08] cursor-pointer"
              key={id}>

              {/* HIGH-END ATTRACTIVE LIGHTNING HOVER */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 overflow-hidden">
                {/* Primary Bolt */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350%] h-[350%] bg-[conic-gradient(from_0deg,transparent_0deg,#16f2b3_10deg,#00ffd5_20deg,rgba(124,58,237,0.8)_30deg,#16f2b3_40deg,transparent_50deg,transparent_360deg)] animate-spin-lightning-fast" />
                {/* Secondary Arc */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-[conic-gradient(from_180deg,transparent_0deg,#ff00ff_10deg,#a855f7_20deg,transparent_30deg,transparent_360deg)] animate-spin-lightning-slow opacity-60" />
                {/* Inner Glow Pulse */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#16f2b3]/20 via-transparent to-violet-600/20 animate-pulse" />
              </div>

              {/* Inner mask */}
              <div className="absolute inset-[1.5px] rounded-[14.5px] bg-[#0d1224] z-[5]" />

              <div className="h-full w-full relative z-10 rounded-2xl border border-[#1f223c] bg-[#11152c]/80 backdrop-blur-md p-6 group-hover:border-transparent transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#16f2b3]/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex flex-col items-center justify-center gap-4 relative z-10">
                  <div className="h-12 w-12 flex items-center justify-center p-2 bg-[#0d1224] rounded-xl shadow-2xl transition-all duration-700 group-hover:rotate-[360deg] group-hover:bg-[#1a1443]">
                    <Image
                      src={skillsImage(skill)?.src}
                      alt={skill}
                      width={48}
                      height={48}
                      className="h-full w-auto transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="text-gray-400 group-hover:text-[#16f2b3] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-colors">
                    {skill}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </motion.div>
      <style jsx global>{`
        @keyframes spin-lightning {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-lightning-fast {
          animation: spin-lightning 1.2s linear infinite;
        }
        .animate-spin-lightning-slow {
          animation: spin-lightning 4s linear infinite reverse;
        }
      `}</style>
    </div>
  );
};

export default Skills;