import { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Send, CheckCircle, MapPin, Mail, Globe } from 'lucide-react';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

function MagneticButton({ children, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group inline-flex items-center justify-center w-36 h-36 rounded-full border border-white/20 hover:border-brand-accent bg-transparent hover:bg-brand-accent/10 transition-colors duration-300 cursor-none"
      data-cursor="START"
      onClick={() => document.getElementById('name')?.focus()}
    >
      <div className="text-center">
        <p className="text-white font-bold text-xs tracking-widest uppercase group-hover:text-brand-accent transition-colors">Start</p>
        <p className="text-white font-bold text-xs tracking-widest uppercase group-hover:text-brand-accent transition-colors">Project</p>
        <div className="w-4 h-[1px] bg-white/40 mx-auto mt-2 group-hover:bg-brand-accent transition-colors" />
      </div>
    </motion.button>
  );
}

export default function CTA() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    // Use relative path for production (since they run on the same server) or localhost for dev dev server
    const endpoint = window.location.hostname === 'localhost' 
      ? 'http://localhost:3000/api/contact'
      : '/api/contact';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
        alert("Server failed to process transmission.");
      }
    } catch (error) {
      setStatus('error');
      console.error(error);
      alert("Failed to reach server. Ensure database is running.");
    }
  };

  return (
    <section id="contact" className="py-32 relative z-10 bg-brand-dark overflow-hidden border-t border-white/5">
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none z-0"></div>
      <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-secondary/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="mb-8">
               <span className="text-gray-500 text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
                Ready to build something elite?
              </span>
              <h2 className="text-5xl md:text-[5rem] lg:text-[6rem] font-heading font-black mb-6 text-white leading-none tracking-tighter">
                LET'S<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>
                  BUILD.
                </span>
              </h2>
            </div>
            
            <div className="mb-12">
              <MagneticButton />
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-gray-400">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                   <Mail className="w-4 h-4 text-brand-secondary" />
                 </div>
                 <div>
                   <p className="text-[10px] tracking-widest uppercase font-bold text-gray-500 mb-1">Direct Link</p>
                   <p className="text-white font-medium">hello@cordexwerk.com</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                   <Globe className="w-4 h-4 text-brand-secondary" />
                 </div>
                 <div>
                   <p className="text-[10px] tracking-widest uppercase font-bold text-gray-500 mb-1">Operations</p>
                   <p className="text-white font-medium">Worldwide Digital Architecture</p>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form Component */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-xl mx-auto lg:mx-0"
          >
            <div className="relative">
              {/* Form container blur backdrop */}
              <div className="absolute inset-0 bg-brand-secondary/5 blur-3xl rounded-[2rem] pointer-events-none"></div>
              
              <form onSubmit={handleSubmit} className="relative z-10 glass-panel p-8 md:p-12 overflow-hidden shadow-2xl">
                
                <h3 className="font-heading font-bold text-2xl text-white mb-8 tracking-tight">Transmission Form</h3>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                      className="absolute inset-0 bg-[#070b13]/95 backdrop-blur-md z-30 flex flex-col items-center justify-center text-center p-8 border border-brand-accent/30 rounded-[inherit]"
                    >
                      <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
                      >
                         <CheckCircle className="w-16 h-16 text-brand-accent mb-6" />
                      </motion.div>
                      <h3 className="text-2xl font-bold font-heading mb-3 text-white tracking-tight">Transmission Secured</h3>
                      <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        Your parameters have been logged. The team will analyze your requirements and initiate contact shortly.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-6">
                  {/* Floating Label Input - Name */}
                  <div className="relative group">
                    <input 
                      required type="text" id="name" name="name" placeholder=" "
                      className="peer block w-full bg-white/[0.03] border border-white/10 rounded-lg px-5 pb-3 pt-6 text-white text-sm focus:outline-none focus:border-brand-accent focus:bg-white/[0.05] transition-all" 
                    />
                    <label htmlFor="name" className="absolute text-[11px] font-bold tracking-widest uppercase text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-brand-accent">
                      Full Name
                    </label>
                  </div>

                  {/* Floating Label Input - Email */}
                  <div className="relative group">
                    <input 
                      required type="email" id="email" name="email" placeholder=" "
                      className="peer block w-full bg-white/[0.03] border border-white/10 rounded-lg px-5 pb-3 pt-6 text-white text-sm focus:outline-none focus:border-brand-accent focus:bg-white/[0.05] transition-all" 
                    />
                    <label htmlFor="email" className="absolute text-[11px] font-bold tracking-widest uppercase text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-brand-accent">
                      Email Address
                    </label>
                  </div>

                  {/* Floating Label Textarea - Message */}
                  <div className="relative group">
                    <textarea 
                      required id="message" name="message" rows="5" placeholder=" "
                      className="peer block w-full bg-white/[0.03] border border-white/10 rounded-lg px-5 pt-6 pb-3 text-white text-sm focus:outline-none focus:border-brand-accent focus:bg-white/[0.05] transition-all resize-none"
                    ></textarea>
                     <label htmlFor="message" className="absolute text-[11px] font-bold tracking-widest uppercase text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-brand-accent">
                      Project Details
                    </label>
                  </div>
                  
                  {/* Submit Button */}
                  <button 
                    disabled={status === 'sending'}
                    type="submit" 
                    className="w-full mt-4 py-4 rounded-lg font-bold uppercase tracking-widest text-xs bg-brand-primary border border-brand-secondary/40 text-white hover:bg-brand-secondary hover:border-brand-accent hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                    data-cursor="SUBMIT"
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center gap-3 animate-pulse">
                        <div className="w-4 h-4 rounded-full border-2 border-brand-accent border-t-transparent animate-spin" />
                        Transmitting
                      </span>
                    ) : (
                      <>
                        Initialize Contact <Send className="w-4 h-4 text-brand-secondary group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 px-6 lg:px-16 pt-24 pb-10 border-t border-white/5 mt-32 w-full mx-auto max-w-[1400px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-accent">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M22 7L12 12L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
            <div>
              <p className="font-heading font-black text-xl text-white tracking-tighter">
                CORDEX <span className="font-light text-gray-500 tracking-[0.2em]">WERK</span>
              </p>
              <p className="text-gray-600 text-xs mt-1 tracking-widest uppercase">Digital Architecture</p>
            </div>
          </div>
          {/* Nav links */}
          <div className="flex flex-wrap gap-6">
            {['About', 'Services', 'Portfolio'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs text-gray-500 hover:text-white uppercase tracking-widest font-bold transition-colors"
                data-cursor={link}
              >
                {link}
              </a>
            ))}
          </div>
          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/cordex_werk?igsh=MW8yaDAweTV3a25lNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:border-pink-500 hover:text-pink-400 transition-colors"
              data-cursor="SOCIAL"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[11px] text-gray-600 tracking-widest uppercase">
            © {new Date().getFullYear()} Cordex Werk. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-700 tracking-widest uppercase">
            Crafted with precision.
          </p>
        </div>
      </div>
    </section>
  );
}
