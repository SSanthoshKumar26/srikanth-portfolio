"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoCodeSlash, IoPlayOutline, IoLayersOutline } from 'react-icons/io5';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineLightningBolt, HiOutlineServer } from "react-icons/hi";
import { useEffect } from 'react';

const ProjectModal = ({ project, isOpen, onClose }) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
                    {/* Elite Deep Solid Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#02050f]/95 backdrop-blur-sm"
                    />

                    {/* Advanced Tech Command Center Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-6xl bg-[#0a0d1a] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_100px_-20px_rgba(22,242,179,0.2)] flex flex-col md:flex-row h-full max-h-[85vh] md:max-h-[90vh]"
                    >
                        {/* Unique Vertical Intelligence Column (Desktop Only) */}
                        <div className="hidden lg:flex w-20 bg-[#0d1224] border-r border-white/5 flex-col items-center py-10 justify-between shrink-0">
                            <div className="flex flex-col items-center gap-6">
                                <div className="w-10 h-10 bg-[#16f2b3]/5 border border-[#16f2b3]/20 rounded-full flex items-center justify-center">
                                    <HiOutlineLightningBolt className="text-[#16f2b3]" size={20} />
                                </div>
                                <div className="w-[1px] h-32 bg-gradient-to-b from-[#16f2b3] via-violet-500/20 to-transparent" />
                            </div>
                            <p className="[writing-mode:vertical-lr] rotate-180 text-[9px] font-black tracking-[0.8em] text-[#16f2b3]/30 uppercase antialiased">
                                CORE INTELLIGENCE
                            </p>
                        </div>

                        {/* Content Hub Area */}
                        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto no-scrollbar">
                            {/* Specialized Header */}
                            <div className="p-6 md:p-10 lg:p-14 border-b border-white/5 bg-[#0d1224]/50 relative overflow-hidden shrink-0">
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#16f2b3] shadow-[0_0_8px_#16f2b3]" />
                                        <p className="font-mono text-[8px] font-black text-[#16f2b3] tracking-[0.4em] uppercase">SYSTEM_ACCESS::GRANTED</p>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase italic leading-none filter drop-shadow-2xl">
                                        {project.name}
                                    </h2>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 group p-3 border border-white/10 rounded-full bg-white/5 hover:border-[#16f2b3] hover:text-[#16f2b3] transition-all"
                                >
                                    <IoClose size={24} />
                                </button>
                            </div>

                            {/* Data Visualization Grid */}
                            <div className="flex-1 p-6 md:p-10 lg:p-14 grid grid-cols-1 xl:grid-cols-12 gap-10">
                                {/* Left Column: Description & Tools */}
                                <div className="xl:col-span-7 space-y-12">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 opacity-50">
                                            <IoCodeSlash className="text-[#16f2b3]" size={18} />
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Full Brief</h3>
                                        </div>
                                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-medium tracking-tight">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 opacity-50">
                                            <IoLayersOutline className="text-violet-500" size={18} />
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Tech Stack</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2 md:gap-3">
                                            {project.tools?.map((tool, i) => (
                                                <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 bg-[#1b223c]/50 border border-white/5 rounded-lg hover:border-[#16f2b3]/20 transition-all">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#16f2b3]/20" />
                                                    <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">{tool}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Status & Links */}
                                <div className="xl:col-span-5 flex flex-col gap-8">
                                    <div className="p-8 bg-black/40 border border-white/5 rounded-2xl space-y-8">
                                        <div className="space-y-8">
                                            {/* Status Bar */}
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-[9px] font-black text-gray-500 uppercase tracking-widest">
                                                    <span>Core Stability</span>
                                                    <span className="text-[#16f2b3]">Verified</span>
                                                </div>
                                                <div className="flex gap-1 h-2">
                                                    {[...Array(12)].map((_, i) => (
                                                        <div key={i} className={`flex-1 ${i < 10 ? 'bg-[#16f2b3]' : 'bg-white/5'} rounded-full`} />
                                                    ))}
                                                </div>
                                            </div>

                                            {project.role && (
                                                <div className="space-y-3">
                                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Responsibility</p>
                                                    <div className="flex items-center gap-4 p-4 bg-[#16f2b3]/5 border border-[#16f2b3]/10 rounded-xl">
                                                        <HiOutlineServer className="text-[#16f2b3]" size={18} />
                                                        <p className="text-xs font-black text-[#16f2b3] uppercase tracking-widest">{project.role}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
                                            {project.code && (
                                                <a
                                                    href={project.code}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center justify-center gap-4 w-full py-4 bg-white text-[#0a0d1a] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#16f2b3] transition-all rounded-md"
                                                >
                                                    <FaGithub size={16} />
                                                    Repository
                                                </a>
                                            )}
                                            {project.demo && (
                                                <a
                                                    href={project.demo || project.repoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center justify-center gap-4 w-full py-4 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all rounded-md"
                                                >
                                                    <IoPlayOutline size={18} />
                                                    Live Uplink
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
