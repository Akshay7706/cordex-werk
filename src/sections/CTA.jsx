import { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Send, CheckCircle, Mail, Globe } from 'lucide-react';

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
      className="group inline-flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full border border-white/20 hover:border-brand-accent bg-transparent hover:bg-brand-accent/10 transition-colors duration-300"
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
        const text = await response.text();
        let errorMsg = text || "Server Error";
        try {
           const errorData = JSON.parse(text);
           errorMsg = errorData.error || errorMsg;
        } catch(e) {
           // Fallback to text already handled
        }
        setStatus('error');
        alert("Transmission Failed: " + errorMsg);
      }
    } catch (error) {
      setStatus('error');
      console.error(error);
      alert("Failed to reach server. Error: " + error.message);
    }
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    alert("Transmission Received: You are now subscribed to the Matrix insights.");
    e.target.reset();
  };

  return (
    <section id="contact" className="py-16 md:py-32 relative z-10 bg-brand-dark overflow-hidden border-t border-white/5">
      
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none z-0"></div>
      <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full"
          >
            <div className="mb-8">
               <span className="text-brand-accent text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
                Ready to build something elite?
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-[5rem] lg:text-[6rem] font-heading font-black mb-6 text-white leading-none tracking-tighter">
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
                   <Mail className="w-4 h-4 text-brand-accent" />
                 </div>
                 <div>
                   <p className="text-[10px] tracking-widest uppercase font-bold text-gray-500 mb-1">Direct Link</p>
                   <p className="text-white font-medium">hello@cordexwerk.com</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                   <Globe className="w-4 h-4 text-brand-accent" />
                 </div>
                 <div>
                   <p className="text-[10px] tracking-widest uppercase font-bold text-gray-500 mb-1">Operations</p>
                   <p className="text-white font-medium">Worldwide Digital Architecture</p>
                 </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 max-w-xl"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/[0.03] border border-brand-accent/30 rounded-3xl p-12 text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-brand-accent/5 blur-3xl rounded-full" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-brand-accent" />
                    </div>
                    <h3 className="text-3xl font-heading font-black text-white mb-4 uppercase tracking-tighter">Transmission Received</h3>
                    <p className="text-gray-400 font-light mb-8">Data has been securely encrypted and bridged to our operations center. Expect contact within 12 standard hours.</p>
                    <button 
                      onClick={() => setStatus('')}
                      className="text-brand-accent text-xs font-bold tracking-widest uppercase hover:underline"
                    >
                      Send another transmission
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                        <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Subject Name</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-accent transition-colors"
                          placeholder="Commander"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Return Address</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-accent transition-colors"
                          placeholder="commander@matrix.io"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Transmission Data</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-accent transition-colors resize-none"
                        placeholder="Detail your requirements for the mission..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-brand-accent hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      {status === 'sending' ? (
                        <>Encrypting...</>
                      ) : (
                        <>
                          Initialize Transmission
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div className="max-w-md">
                <h4 className="text-white font-bold text-lg mb-2 tracking-tight">Subscribe to the Matrix.</h4>
                <p className="text-gray-500 text-sm mb-6">Receive irregular updates on digital engineering and elite SaaS architecture.</p>
                <form onSubmit={handleNewsletter} className="flex gap-2">
                    <input 
                        type="email" 
                        required 
                        placeholder="you@domain.com"
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-accent"
                    />
                    <button className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-brand-accent transition-colors">
                        Join
                    </button>
                </form>
            </div>
            
            <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-all">
                    <InstagramIcon />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-all">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                </div>
                <div className="text-[10px] text-gray-600 font-bold tracking-[0.3em] uppercase">
                  CORDEX WERK &copy; 2026 // ALL RIGHTS RESERVED
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
