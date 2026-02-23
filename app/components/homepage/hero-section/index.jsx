"use client";

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaInstagram, FaGraduationCap } from "react-icons/fa6";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";

function HeroSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12 min-h-[90vh] overflow-hidden">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10 opacity-30 pointer-events-none"
      />

      <div className="container mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-12 gap-y-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10"
        >
          <motion.h1 variants={item} className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.2rem] lg:leading-[3rem] tracking-tight">
            Hello, I’m{' '}
            <motion.span
              animate={{ color: ["#16f2b3", "#ec4899", "#16f2b3"] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-[#16f2b3]"
            >
              Srikanth Sridhar
            </motion.span>
            {' — a '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] to-violet-500">
              Full Stack Developer
            </span>
            {' crafting scalable and modern web experiences.'}
          </motion.h1>

          <motion.div variants={item} className="my-12 flex items-center gap-5">
            {[
              { href: personalData.github, icon: <BsGithub size={30} /> },
              { href: personalData.linkedIn, icon: <BsLinkedin size={30} /> },
              { href: personalData.facebook, icon: <FaInstagram size={30} /> },
              { href: personalData.skillrack, icon: <FaGraduationCap size={30} /> },
              { href: personalData.leetcode, icon: <SiLeetcode size={30} /> }
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target='_blank'
                className="transition-all text-[#16f2b3] hover:text-pink-500 hover:scale-125 duration-300"
              >
                {social.icon}
              </Link>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-4 lg:gap-6">
            <Link href="#contact" className="group relative bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300">
              <div className="px-6 md:px-10 py-3.5 md:py-4 bg-[#0d1224] rounded-full border-none text-center text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white no-underline transition-all duration-200 flex items-center gap-2 group-hover:bg-transparent">
                <span>PING_ME()</span>
                <RiContactsFill size={18} />
              </div>
            </Link>

            <Link
              className="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 md:px-10 py-3.5 md:py-4 text-center text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white no-underline shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all duration-300 active:scale-95"
              role="button"
              target="_blank"
              href={personalData.resume}
            >
              <span>Get Resume</span>
              <MdDownload size={20} className="group-hover:translate-y-1 transition-transform" />
            </Link>
          </motion.div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="order-1 lg:order-2 from-[#0d1224] border-[#1b2c68a0] relative rounded-xl border bg-gradient-to-r to-[#0a0d37] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div className="flex flex-row">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#16f2b3] to-violet-600"></div>
          </div>
          <div className="px-4 lg:px-8 py-5 flex justify-between items-center bg-[#0d1224]/50 backdrop-blur-sm">
            <div className="flex flex-row space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-orange-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
            </div>
            <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase opacity-50">developer-portfolio.js</div>
          </div>
          <div className="overflow-hidden border-t border-[#1b2c68a0] px-4 lg:px-8 py-6 lg:py-10">
            <code className="font-mono text-xs md:text-sm lg:text-base leading-relaxed">
              <div className="blink">
                <span className="mr-2 text-pink-500">const</span>
                <span className="mr-2 text-white">coder</span>
                <span className="mr-2 text-pink-500">=</span>
                <span className="text-gray-400">{'{'}</span>
              </div>
              <div className="ml-4 lg:ml-8">
                <span className="mr-2 text-white font-semibold">name:</span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-amber-300">Srikanth Sridhar</span>
                <span className="text-gray-400">{`',`}</span>
              </div>
              <div className="ml-4 lg:ml-8">
                <span className="mr-2 text-white font-semibold">skills:</span>
                <span className="text-gray-400">{`[`}</span>
                {['React', 'NodeJS', 'Express', 'MySQL', 'NextJS', 'MongoDB', 'Python', 'Machine Learning'].map((skill, i) => (
                  <span key={i}>
                    <span className="text-gray-400">{`'`}</span>
                    <span className="text-amber-300">{skill}</span>
                    <span className="text-gray-400">{`'${i < 7 ? ', ' : ''}`}</span>
                  </span>
                ))}
                <span className="text-gray-400">{`],`}</span>
              </div>
              <div className="ml-4 lg:ml-8">
                <span className="mr-2 text-white font-semibold">leader:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div className="ml-4 lg:ml-8">
                <span className="mr-2 text-white font-semibold">quickLearner:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div className="ml-4 lg:ml-8">
                <span className="mr-2 text-white font-semibold">problemSolver:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div className="ml-4 lg:ml-8">
                <span className="mr-2 text-[#16f2b3]">hireable:</span>
                <span className="text-orange-400">function</span>
                <span className="text-gray-400">{'() {'}</span>
              </div>
              <div className="ml-8 lg:ml-16">
                <span className="mr-2 text-orange-400 font-bold underline">return</span>
                <span className="text-gray-400">{`(`}</span>
              </div>
              <div className="ml-12 lg:ml-24">
                <span className="text-cyan-400">this.</span>
                <span className="mr-2 text-white">hardWorker</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div className="ml-12 lg:ml-24">
                <span className="text-cyan-400">this.</span>
                <span className="mr-2 text-white">problemSolver</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div className="ml-12 lg:ml-24">
                <span className="text-cyan-400">this.</span>
                <span className="mr-2 text-white">skills.length</span>
                <span className="mr-2 text-amber-300">&gt;=</span>
                <span className="text-orange-400">5</span>
              </div>
              <div className="ml-8 lg:ml-16"><span className="text-gray-400">{`);`}</span></div>
              <div className="ml-4 lg:ml-8 text-gray-400">{`};`}</div>
              <span className="text-gray-400">{`};`}</span>
            </code>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;