"use client";

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";


function AboutSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div id="about" className="my-12 lg:my-32 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md hover:text-[#16f2b3] transition-all duration-300 cursor-pointer tracking-widest font-semibold">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="font-bold text-[#16f2b3] text-lg uppercase tracking-[0.3em]"
              >
                Who I am
              </motion.p>
              <div className="h-1 w-20 bg-gradient-to-r from-[#16f2b3] to-transparent rounded-full" />
            </div>

            <div className="text-gray-300 text-base lg:text-lg leading-relaxed space-y-6">
              {personalData.description.split('\n').map((para, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.7 + (index * 0.2),
                    ease: "easeOut"
                  }}
                  className="relative pl-0 lg:pl-4 border-l-0 lg:border-l-2 border-white/5 hover:border-[#16f2b3]/50 transition-colors duration-500"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center order-1 lg:order-2"
        >
          <div
            className="relative group p-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-violet-600/20 blur-[100px] rounded-full -z-10 group-hover:bg-[#16f2b3]/20 transition-all duration-1000"></div>

            <motion.div
              animate={isHovered ? { rotate: 360, opacity: 0.5, scale: 1.05 } : { rotate: 0, opacity: 0.15, scale: 1 }}
              transition={isHovered ? { duration: 20, repeat: Infinity, ease: "linear" } : { duration: 1 }}
              className="absolute -inset-4 bg-gradient-to-r from-[#16f2b3] via-violet-600 to-[#16f2b3] rounded-3xl blur-3xl"
            />

            <div className="relative bg-[#0d1224] rounded-[2rem] p-2 shadow-2xl overflow-hidden border border-white/5">
              <Image
                src={personalData.profile}
                width={380}
                height={380}
                alt="Srikanth Sridhar"
                className="rounded-[1.8rem] transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2 cursor-pointer object-cover grayscale-[20%] group-hover:grayscale-0 shadow-inner"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1224]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end justify-center pb-8">
                <span className="text-white font-bold tracking-[0.5em] text-xs uppercase">Developer</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
