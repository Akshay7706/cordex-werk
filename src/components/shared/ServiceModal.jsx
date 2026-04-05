import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';

export default function ServiceModal({ service, onClose }) {
  const { openInquiry } = useInquiry();
  if (!service) return null;

  return (
    <AnimatePresence>
      {service && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl pointer-events-auto"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[95vh] bg-brand-dark/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col pointer-events-auto mx-4 z-10"
          >
            <div className="relative z-20 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 md:px-8 py-6 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                     <span className="font-mono text-sm font-bold">{service.tag}</span>
                  </div>
                  <div>
                    <h3 className="text-[10px] md:text-sm font-bold text-white uppercase tracking-widest">{service.title}</h3>
                    <p className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest leading-none mt-1">Capabilities Analysis</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                >
                  <X className="w-6 h-6 md:w-5 md:h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-8 md:px-16 py-12 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Visual Preview */}
                  <div>
                    <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group mb-8">
                       <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                       <img src={service.details.image} alt={service.title} className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700" />
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                          <div className="w-4 h-[1px] bg-brand-accent" /> Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.details.technologies.map(t => (
                            <span key={t} className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-full text-[9px] text-brand-accent font-bold uppercase tracking-wider">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Information */}
                  <div className="flex flex-col justify-between">
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                          <div className="w-4 h-[1px] bg-brand-accent" /> The Process
                        </h4>
                        <ul className="space-y-3">
                          {service.details.process.map(p => (
                            <li key={p} className="flex items-center gap-3 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 bg-brand-accent rounded-full shadow-[0_0_5px_rgba(0,229,255,0.5)]" /> {p}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                          <div className="w-4 h-[1px] bg-brand-accent" /> Key Deliverables
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {service.details.deliverables.map(d => (
                            <div key={d} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:border-brand-accent/20 transition-colors">
                              {d}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-12">
                       <button 
                         onClick={() => {
                            console.log(`[ServiceModal] Initializing mission: ${service.title}`);
                            onClose();
                            setTimeout(() => openInquiry(service.title), 400);
                         }}
                         className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl hover:bg-brand-accent transition-all duration-500 shadow-[0_10px_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 group"
                       >
                         Initialize Mission <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Grain */}
            <div className="absolute inset-0 bg-grain pointer-events-none opacity-5 z-0"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
