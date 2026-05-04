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
    
    console.log(`[InquiryForm] Processing submission for ${data.plan || 'General'}:`, formData);
    
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('[InquiryForm] SUCCESS: Lead captured.');
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
            className="relative w-full max-w-lg bg-brand-dark border border-white/10 rounded-[2.5rem] shadow-2xl p-6 md:p-12 overflow-hidden mx-4 pointer-events-auto z-50"
          >
            <div className="absolute top-4 right-4 md:top-8 md:right-8 z-[60]">
              <button 
                onClick={closeInquiry}
                className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
              >
                <X className="w-6 h-6 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-tight">
                {data.plan ? `Selected Plan: ${data.plan}` : 'Start Your Mission'}
              </h3>
              <p className="text-gray-500 text-[10px] font-mono mt-1 uppercase tracking-widest">KREATO_STRATEGY_PROTOCOL_V5.0</p>
            </div>
            <div className="p-8">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-widest">Signal Received</h4>
                  <p className="text-gray-400">Our engineering team is analyzing your request. Initialization in T-minus 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Identity</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-secondary outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Comms Link</label>
                      <input 
                        required
                        type="email" 
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-secondary outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Briefing</label>
                    <textarea 
                      required
                      placeholder="Project details, goals, or requirements..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-secondary outline-none transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] rounded-xl hover:bg-brand-accent transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 group"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        Initialize Mission
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Footer Grain */}
            <div className="absolute inset-0 bg-grain pointer-events-none opacity-5"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
