"use client";

import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import BlogCard from './blog-card';
import { motion } from 'framer-motion';

// Define static blog data
const staticBlogs = [
  {
    id: 1,
    title: 'Google Cloud',
    cover_image: '/image/GC.png',
    url: 'https://drive.google.com/file/d/148YOsN4Q7kDKmeshA73jaOeKdcMVCL2m/view',
    summary: 'Google cloud career readlines cloud digital Leader track',
  },
  {
    id: 2,
    title: 'Cisco',
    cover_image: '/image/CI.png',
    url: 'https://drive.google.com/file/d/16-BCC-kzFjPi2MyoG_Z1xWIy0C_EP7oR/view',
    summary: 'Cisco Training Course on Networking Essentials',
  },
  {
    id: 3,
    title: 'Infosys Springboard',
    cover_image: '/image/IS.png',
    url: 'https://drive.google.com/file/d/16BdDVNpi6uOG0gF5xlg3sgf12WrbgxXH/view',
    summary: 'Certificates that are gained as an acknowledgement for my skills',
  },
  {
    id: 4,
    title: 'Guvi',
    cover_image: '/image/Gu.png',
    url: 'https://drive.google.com/file/d/1LIWJphQj2yCiIMi2t69C54OfBy3Q-gUQ/view',
    summary: 'Certificates that are gained as an acknowledgement for my skills',
  },
  {
    id: 5,
    title: 'Meta',
    cover_image: '/image/Meta.png',
    url: 'https://drive.google.com/file/d/1l5MbNKr09IVFb6GgoPYmRmu30O2pfJ7F/view',
    summary: 'Certificates that are gained as an acknowledgement for my skills',
  },
  {
    id: 6,
    title: 'LinkedIn',
    cover_image: '/image/Lin.png',
    url: 'https://drive.google.com/file/d/1nQQ2rPlHUM3cAb40dmOR2aT29CfrhV-B/view',
    summary: 'Certificates that are gained as an acknowledgement for my skills',
  },
];

function Blog() {
  return (
    <div id='blogs' className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10 pointer-events-none">
        <div className="w-[300px] h-[300px] bg-violet-600 rounded-full blur-[120px] absolute top-24 right-1/4"></div>
      </div>

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
          <span className="bg-[#1a1443] w-fit text-white p-3 px-6 text-xl rounded-lg hover:text-[#16f2b3] transition-all duration-300 cursor-pointer uppercase tracking-widest font-bold border border-[#25213b]">
            Certificates & Achievements
          </span>
          <span className="w-24 h-[2px] bg-gradient-to-l from-transparent to-[#1a1443]"></span>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {staticBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-center mt-12 lg:mt-20"
      >
        <Link
          href="/blog"
          prefetch={true}
          scroll={true}
          className="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#16f2b3] to-violet-600 px-8 py-4 text-center text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#0d1224] no-underline shadow-[0_10px_30px_rgba(22,242,179,0.3)] hover:shadow-[0_15px_40px_rgba(22,242,179,0.5)] transition-all duration-300 relative z-50 pointer-events-auto"
        >
          <span>Show All Certificates</span>
          <FaArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}

export default Blog;
