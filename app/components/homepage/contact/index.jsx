"use client";

import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaStackOverflow } from 'react-icons/fa';
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { motion } from "framer-motion";
import ContactWithCaptcha from './contact-with-captcha';
import ContactWithoutCaptcha from './contact-without-captcha';

function ContactSection() {
  return (
    <div id="contact" className="my-24 lg:my-48 relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-[#16f2b3]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        {/* Left Strategy Column - 5/12 width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col gap-12"
        >
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#16f2b3] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">Availability: Open for Projects</span>
            </div>

            <h2 className="text-4xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter">
              Let's build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] to-violet-500 italic py-2 pr-8 inline-block">the future</span> <br />
              together.
            </h2>

            <p className="text-lg text-gray-400 leading-relaxed max-w-md">
              Whether you're starting a new venture or need help with an existing complex system, I'm here to provide premium engineering solutions.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.4em] mb-4">Direct Communication</p>
            {[
              { icon: <MdAlternateEmail size={20} />, label: "Email", value: personalData.email, href: `mailto:${personalData.email}` },
              { icon: <IoMdCall size={20} />, label: "Phone", value: personalData.phone, href: `tel:${personalData.phone.replace(/\s/g, '')}` },
              { icon: <CiLocationOn size={20} />, label: "Base", value: personalData.address, href: "#" }
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="group flex items-center gap-5 p-4 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#1a1443] border border-white/10 flex items-center justify-center rounded-xl text-[#16f2b3] group-hover:bg-[#16f2b3] group-hover:text-[#0d1224] transition-all duration-500">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black">{item.label}</span>
                  <span className="text-base text-white/90 font-medium tracking-tight">{item.value}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-10 flex items-center gap-4">
            <span className="h-px w-12 bg-white/10" />
            <div className="flex items-center gap-4">
              {[
                { icon: <IoLogoGithub size={22} />, href: personalData.github },
                { icon: <BiLogoLinkedin size={22} />, href: personalData.linkedIn },
                { icon: <FaXTwitter size={22} />, href: personalData.twitter },
                { icon: <FaStackOverflow size={22} />, href: personalData.stackOverflow },
                { icon: <FaInstagram size={22} />, href: personalData.facebook }
              ].map((social, idx) => (
                <Link
                  key={idx}
                  target="_blank"
                  href={social.href}
                  className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#16f2b3] hover:border-[#16f2b3] hover:bg-[#16f2b3]/5 transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Interaction Column - 7/12 width */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-7 w-full lg:sticky lg:top-32"
        >
          {
            (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY) ? <ContactWithCaptcha />
              : <ContactWithoutCaptcha />
          }
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;