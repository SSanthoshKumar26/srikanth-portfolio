"use client";
import { isValidEmail } from '@/utils/check-email';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { TbMailForward } from "react-icons/tb";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ContactWithoutCaptcha = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [error, setError] = useState({
    email: false,
    required: false,
  });

  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!input.email || !input.message || !input.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    };

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const options = { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY };

    try {
      const res = await emailjs.send(serviceID, templateID, input, options);
      if (res.status === 200) {
        toast.success('Professional inquiry received safely!');
        setInput({ name: '', email: '', message: '' });
      };
    } catch (error) {
      toast.error(error?.text || error);
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-[#16f2b3]/20 to-violet-500/20 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-50 transition duration-1000"></div>

      <div className="relative bg-[#0d1224]/80 backdrop-blur-2xl border border-white/10 p-6 lg:p-10 rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col gap-8">
          {/* Header Area */}
          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                Let&apos;s <span className="text-[#16f2b3]">Connect</span>
              </h3>
              <div className="w-16 h-1 mt-2 bg-gradient-to-r from-[#16f2b3] to-transparent rounded-full"></div>
            </motion.div>
            <p className="text-gray-400 text-sm font-medium">Have a project in mind? Reach out and let&apos;s build something extraordinary.</p>
          </div>

          {/* Form Fields with Staggered Animation */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-2 group/input"
              >
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#16f2b3]/80 group-focus-within/input:text-[#16f2b3] transition-colors">Full Name</label>
                <div className="relative">
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#16f2b3] focus:bg-white/10 transition-all duration-300 shadow-inner group-hover/input:border-white/20"
                    type="text"
                    onChange={(e) => {
                      setInput({ ...input, name: e.target.value });
                      if (error.required) setError({ ...error, required: false });
                    }}
                    value={input.name}
                    placeholder="Srikanth Sridhar"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-[#16f2b3]/5 opacity-0 focus-within:opacity-100 pointer-events-none transition-opacity"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-2 group/input"
              >
                <label className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${error.email ? 'text-red-500' : 'text-[#16f2b3]/80 group-focus-within/input:text-[#16f2b3]'}`}>Email Address</label>
                <div className="relative">
                  <input
                    className={`w-full bg-white/5 border rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:bg-white/10 transition-all duration-300 shadow-inner group-hover/input:border-white/20 ${error.email ? 'border-red-500' : 'border-white/10 focus:border-[#16f2b3]'}`}
                    type="email"
                    onChange={(e) => {
                      setInput({ ...input, email: e.target.value });
                      if (error.email) setError({ ...error, email: false });
                      if (error.required) setError({ ...error, required: false });
                    }}
                    onBlur={() => {
                      if (input.email.length > 0) {
                        setError({ ...error, email: !isValidEmail(input.email) });
                      }
                    }}
                    value={input.email}
                    placeholder="srikanth@example.com"
                  />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-2 group/input"
            >
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#16f2b3]/80 group-focus-within/input:text-[#16f2b3] transition-colors">Your Message</label>
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#16f2b3] focus:bg-white/10 transition-all duration-300 resize-none min-h-[150px] shadow-inner group-hover/input:border-white/20"
                onChange={(e) => {
                  setInput({ ...input, message: e.target.value });
                  if (error.required) setError({ ...error, required: false });
                }}
                value={input.message}
                placeholder="Tell me about your amazing project..."
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-4">
            {error.required && (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[10px] text-red-400 font-bold tracking-widest uppercase text-center"
              >
                All fields are required to transmit
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSendMail}
              className="w-full group flex items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-[#16f2b3] via-violet-600 to-[#16f2b3] bg-[length:200%_auto] hover:bg-right px-8 py-5 text-center text-[12px] font-black uppercase tracking-[0.4em] text-[#0d1224] shadow-[0_20px_50px_-15px_rgba(22,242,179,0.5)] transition-all duration-700 hover:shadow-cyan-500/20"
            >
              <span>PING_ME()</span>
              <TbMailForward size={20} className="group-hover:translate-x-3 group-hover:-translate-y-1 transition-transform duration-700 ease-out" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactWithoutCaptcha;