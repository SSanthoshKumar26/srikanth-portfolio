"use client";

import Image from "next/image";
import { educations } from "@/utils/data/educations";
import { BsPersonWorkspace } from "react-icons/bs";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import lottieFile from '/public/lottie/study.json';
import { motion } from "framer-motion";

function Education() {
  return (
    <div id="education" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10 opacity-30"
      />
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <span className="w-24 h-[2px] bg-gradient-to-r from-transparent to-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-3 px-6 text-lg rounded-lg hover:text-[#16f2b3] transition-all duration-300 cursor-pointer uppercase tracking-widest font-bold border border-[#25213b]">
            Education
          </span>
          <span className="w-24 h-[2px] bg-gradient-to-l from-transparent to-[#1a1443]"></span>
        </motion.div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-start"
          >
            <div className="w-full h-full max-w-sm">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            {educations.map((education, index) => (
              <motion.div
                key={education.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <GlowCard identifier={`education-${education.id}`}>
                  <div className="p-4 relative group">
                    <Image
                      src="/blur-23.svg"
                      alt="Hero"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-40 group-hover:opacity-80 transition-opacity"
                    />
                    <div className="flex justify-center mb-4">
                      <p className="text-xs text-[#16f2b3] font-mono tracking-tighter bg-[#16f2b3]/10 px-3 py-1 rounded-full">
                        {education.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-6 px-3">
                      <div className="text-violet-500 bg-violet-500/10 p-4 rounded-xl group-hover:bg-[#16f2b3] group-hover:text-gray-900 transition-all duration-500 shadow-lg">
                        <BsPersonWorkspace size={32} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg sm:text-xl font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                          {education.title}
                        </p>
                        <p className="text-xs sm:text-base text-gray-400 font-medium">{education.institution}</p>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;