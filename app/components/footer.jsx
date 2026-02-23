"use client";

import Link from 'next/link';
import { CgGitFork } from "react-icons/cg";
import { IoStar } from "react-icons/io5";
import { motion } from "framer-motion";

function Footer() {
  return (
    <div className="relative border-t bg-[#0d1224] border-[#353951] text-white overflow-hidden">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 lg:py-12">
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[2px] w-1/2 bg-gradient-to-r from-transparent via-[#16f2b3] to-transparent"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-medium tracking-wide text-gray-400"
          >
            © {new Date().getFullYear()} Designed & Built by <Link target="_blank" href="https://www.linkedin.com/in/srikanth-sridhar-a43574242/" className="text-[#16f2b3] font-bold hover:underline underline-offset-4 transition-all">Srikanth Sridhar</Link>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-8"
          >
            <Link
              target="_blank"
              href="https://github.com/sricodings"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#16f2b3] transition-all duration-300 group"
            >
              <IoStar className="group-hover:scale-125 transition-transform" />
              <span>Star Project</span>
            </Link>
            <Link
              target="_blank"
              href="https://github.com/sricodings"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#16f2b3] transition-all duration-300 group"
            >
              <CgGitFork className="group-hover:rotate-12 transition-transform" />
              <span>Fork Repository</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div >
  );
};

export default Footer;