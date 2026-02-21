"use client";

import BlogCard from "../components/homepage/blog/blog-card";
import { motion } from "framer-motion";

const staticBlogs = [
  {
    id: 1,
    title: 'Google Cloud',
    cover_image: '/image/GC.png',
    url: 'https://drive.google.com/file/d/148YOsN4Q7kDKmeshA73jaOeKdcMVCL2m/view?usp=sharing',
    summary: 'Google cloud career readlines cloud digital Leader track',
  }, {
    id: 2,
    title: 'Cisco',
    cover_image: '/image/CI.png',
    url: 'https://drive.google.com/file/d/16-BCC-kzFjPi2MyoG_Z1xWIy0C_EP7oR/view?usp=sharing',
    summary: 'Cisco Training Course on Networking Essentials',
  },
  {
    id: 3,
    title: 'Infosys Springboard',
    cover_image: '/image/IS.png',
    url: 'https://drive.google.com/file/d/16BdDVNpi6uOG0gF5xlg3sgf12WrbgxXH/view?usp=sharing',
    summary: 'Certificates that are gained as an acknowledgement for my skills',
  },
  {
    id: 4,
    title: 'Guvi',
    cover_image: '/image/Gu.png',
    url: 'https://drive.google.com/file/d/1LIWJphQj2yCiIMi2t69C54OfBy3Q-gUQ/view?usp=sharing',
    summary: 'Certificates that are gained as an acknowledgement for my skills',
  },
  {
    id: 5,
    title: 'Meta',
    cover_image: '/image/Meta.png',
    url: 'https://drive.google.com/file/d/1l5MbNKr09IVFb6GgoPYmRmu30O2pfJ7F/view?usp=sharing',
    summary: 'Participated in the two Phase workshops conducted by Metaverse and done Hands-on-training sessions',
  },
  {
    id: 6,
    title: 'LinkedIn',
    cover_image: '/image/Lin.png',
    url: 'https://drive.google.com/file/d/1nQQ2rPlHUM3cAb40dmOR2aT29CfrhV-B/view?usp=sharing',
    summary: 'Certificates that are gained as an acknowledgement for my skills',
  },
  {
    id: 7,
    title: 'Great Learning',
    cover_image: '/image/GL.png',
    url: 'https://drive.google.com/file/d/1dC5hN6GrQimKhP7HmL32-H-Die2MuJ2E/view?usp=sharing',
    summary: 'Certificates that are gained as an acknowledgement for my skills',
  },
  {
    id: 8,
    title: 'Ambassador',
    cover_image: '/image/IIST.png',
    url: 'https://drive.google.com/file/d/1WdtseTKSBbrchmeUbpYqpYB6OvyFU5zt/view?usp=sharing',
    summary: 'I had actively worked as an IIST ambassador for one month ',
  },
  {
    id: 9,
    title: 'Coding in SkillRack',
    cover_image: '/image/SR.png',
    url: 'https://drive.google.com/file/d/1jO1mPdyP4F-jH6xnNMMEGqz1m7rUQLxS/view?usp=sharing',
    summary: 'Certificates that are gained as an acknowledgement for my skills in Coding',
  },
  {
    id: 10,
    title: 'Workshop',
    cover_image: '/image/Bevy.png',
    url: 'https://drive.google.com/file/d/1-k75s38esTj39antullacdACr9vzg0KQ/view?usp=sharing',
    summary: 'Participated in IOT workshop conducted by Bevywise',
  },
  {
    id: 11,
    title: 'Forage',
    cover_image: '/image/forage.jpeg',
    url: 'https://drive.google.com/file/d/1oCm-KY3TqzbzhyEktK7oeBfB8NBmjON3/view?usp=sharing',
    summary: 'Certificates that are gained as an acknowledgement for my skills from MNC Companies',
  },
  {
    id: 12,
    title: 'Amphisoft',
    cover_image: '/image/java.png',
    url: 'https://drive.google.com/file/d/1jUWsWd_hcVx5MRImWG89DHYk9Jj0oL8k/view?usp=sharing',
    summary: 'Had a one week value added course on Java and hands-on-training sessions',
  }
];

function Page() {
  return (
    <div className="py-12 lg:py-24 container mx-auto px-6 lg:px-12">
      <div className="flex flex-col items-center mb-16 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4"
        >
          <span className="w-12 lg:w-24 h-[1px] bg-gradient-to-r from-transparent to-violet-500"></span>
          <h1 className="bg-[#1a1443] w-fit text-white p-4 px-8 text-lg lg:text-2xl rounded-2xl font-black uppercase tracking-[0.3em] border border-white/10 shadow-2xl">
            My <span className="text-[#16f2b3]">Certifications</span>
          </h1>
          <span className="w-12 lg:w-24 h-[1px] bg-gradient-to-l from-transparent to-violet-500"></span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-center tracking-widest text-xs lg:text-sm uppercase font-bold"
        >
          An acknowledgment of my skills and professional growth
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {staticBlogs.map((blog, i) => (
          <motion.div
            key={blog.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Page;
