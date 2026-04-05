import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';

export default function InquiryModal() {
  const { isOpen, closeInquiry, data } = useInquiry();
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset form if opening for a new purpose
      setStatus('idle');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API Call - Ready for real backend integration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStatus('success');
    
    // Auto-close after success
    setTimeout(() => {
      closeInquiry();
      setFormData({ name: '', email: '', message: '' });
      setStatus('idle');
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeInquiry}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-brand-dark border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden mx-4 pointer-events-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative z-20 p-6 md:p-12">
              <div className="absolute top-4 right-4 md:top-8 md:right-8">
                <button 
                  onClick={closeInquiry}
                  className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all pointer-events-auto"
                >
                  <X className="w-6 h-6 md:w-5 md:h-5" />
                </button>
              </div>

              {/* Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-heading font-black text-white uppercase tracking-tight italic">
                  {data.plan ? `Target: ${data.plan}` : 'Initialize Mission'}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                   <div className="w-4 h-[1px] bg-brand-accent" />
                   <p className="text-gray-500 text-[8px] font-mono uppercase tracking-[0.3em]">STRATEGY_PROTOCOL_V8.0</p>
                </div>
              </div>

              {/* Interaction Content */}
              <div>
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                      <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-widest italic">Signal Received</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Initialization in T-minus 24h</p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">Operator Identity</label>
                        <input 
                          type="text" 
                          placeholder="Name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-xs text-white focus:border-brand-accent outline-none transition-all placeholder:text-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">Protocol Link</label>
                        <input 
                          type="email" 
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-xs text-white focus:border-brand-accent outline-none transition-all placeholder:text-gray-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">Mission Briefing</label>
                      <textarea 
                        placeholder="Project details, goals, or requirements..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-xs text-white focus:border-brand-accent outline-none transition-all resize-none placeholder:text-gray-700"
                      />
                    </div>

                    <button 
                      onClick={handleSubmit} // MANUAL HANDLER FOR ABSOLUTE RELIABILITY
                      disabled={status === 'loading'}
                      className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.5em] text-[10px] rounded-2xl hover:bg-brand-accent transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3 group pointer-events-auto"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          ENGAGE INITIALIZATION
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Grain */}
            <div className="absolute inset-0 bg-grain pointer-events-none opacity-10 z-0"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
