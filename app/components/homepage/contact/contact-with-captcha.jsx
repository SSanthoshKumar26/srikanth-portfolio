"use client";
import { isValidEmail } from '@/utils/check-email';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { TbMailForward } from "react-icons/tb";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function ContactWithCaptcha() {
  const [input, setInput] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [captcha, setCaptcha] = useState(null);
  const [error, setError] = useState({
    email: false,
    required: false,
  });

  const checkRequired = () => {
    if (input.email && input.message && input.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!captcha) {
      toast.error('Please complete the captcha verification');
      return;
    }

    if (!input.email || !input.message || !input.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    }

    const verificationRes = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/google`, {
      token: captcha
    });

    if (!verificationRes.data.success) {
      toast.error('Captcha verification failed!');
      return;
    }

    setCaptcha(null);
    setError({ ...error, required: false });

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const options = { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY };

    try {
      const res = await emailjs.send(serviceID, templateID, input, options);

      if (res.status === 200) {
        toast.success('Professional inquiry received safely!');
        setInput({
          name: '',
          email: '',
          message: '',
        });
      };
    } catch (error) {
      toast.error(error?.text || error);
    };
  };

  return (
    <div className="relative w-full group">
      <div className="absolute -inset-2 bg-gradient-to-r from-[#16f2b3]/20 to-violet-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
      <div className="relative bg-[#0d1224]/80 backdrop-blur-xl border border-white/10 p-8 lg:p-12 rounded-[2.5rem] shadow-2xl">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-[0.3em] text-[#16f2b3]">Full Name</label>
            <input
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-5 text-white focus:outline-none focus:border-[#16f2b3] focus:bg-white/10 transition-all duration-300"
              type="text"
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              onBlur={checkRequired}
              value={input.name}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className={`text-xs font-bold uppercase tracking-[0.3em] ${error.email ? 'text-red-500' : 'text-[#16f2b3]'}`}>Email Address</label>
            <input
              className={`bg-white/5 border rounded-2xl px-5 py-5 text-white focus:outline-none focus:bg-white/10 transition-all duration-300 ${error.email ? 'border-red-500' : 'border-white/10 focus:border-[#16f2b3]'}`}
              type="email"
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(input.email) });
              }}
              value={input.email}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold uppercase tracking-[0.3em] text-[#16f2b3]">Your Message</label>
            <textarea
              className="bg-white/5 border border-white/10 rounded-2xl px-5 py-5 text-white focus:outline-none focus:border-[#16f2b3] focus:bg-white/10 transition-all duration-300 resize-none"
              rows="4"
              onChange={(e) => setInput({ ...input, message: e.target.value })}
              onBlur={checkRequired}
              value={input.message}
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-center lg:justify-start">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={(code) => setCaptcha(code)}
                theme="dark"
              />
            </div>

            <div className="mt-2">
              {error.required && (
                <p className="text-xs text-red-500 mb-6 font-bold tracking-widest uppercase animate-pulse text-center lg:text-left">
                  Please complete all required fields
                </p>
              )}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(22, 242, 179, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendMail}
                className="w-full group flex items-center justify-center gap-4 rounded-2xl bg-gradient-to-r from-[#16f2b3] to-violet-600 px-8 py-5 text-center text-xs font-black uppercase tracking-[0.4em] text-[#0d1224] shadow-xl transition-all duration-300"
              >
                <span>PING_ME()</span>
                <TbMailForward className="group-hover:translate-x-2 transition-transform" size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWithCaptcha;