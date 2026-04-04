import { motion } from 'framer-motion';
import { Target, Zap, ShieldCheck } from 'lucide-react';
import { Reveal, RevealStagger, RevealItem } from '../components/shared/Reveal';

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10 bg-brand-dark border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-heading font-black mb-6 uppercase tracking-tighter leading-none">
                Precision meets <br />
                <span className="text-brand-accent">Performance.</span>
              </h2>
            </Reveal>
            
            <Reveal delay={0.4}>
              <p className="text-gray-400 mb-6 text-lg font-light leading-relaxed">
                At Cordex Werk, we treat code like an art form and web architecture like a science. 
                We are a team of elite developers and designers dedicated to building digital products 
                that don't just look stunning but perform flawlessly under pressure.
              </p>
            </Reveal>

            <Reveal delay={0.6}>
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
                Inspired by German engineering and the boundless aesthetic of the cosmos, 
                we craft solutions tailored for ambitious startups, SaaS platforms, and enterprise leaders.
              </p>
            </Reveal>
            
            <RevealStagger delay={0.8} staggerDelay={0.1}>
              <div className="grid grid-cols-2 gap-6">
                <RevealItem>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-xs uppercase tracking-widest text-gray-300">Lightning Fast</span>
                  </div>
                </RevealItem>
                <RevealItem>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent">
                      <Target className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-xs uppercase tracking-widest text-gray-300">Pixel Perfect</span>
                  </div>
                </RevealItem>
                <RevealItem>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-xs uppercase tracking-widest text-gray-300">Highly Secure</span>
                  </div>
                </RevealItem>
              </div>
            </RevealStagger>
          </div>

          <Reveal delay={0.5} width="100%">
            <div className="relative h-[500px] w-full group">
               <div className="absolute inset-0 bg-brand-accent/5 rounded-3xl blur-[100px] group-hover:bg-brand-accent/10 transition-colors" />
               <div className="absolute inset-0 glass-panel flex items-center justify-center overflow-hidden">
                  <div className="text-[200px] font-black text-white/[0.02] select-none rotate-12">
                    CODE
                  </div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-64 h-64 border border-brand-accent/20 rounded-full flex items-center justify-center"
                  >
                    <div className="w-48 h-48 border border-brand-accent/40 rounded-full border-dashed" />
                  </motion.div>
                  <div className="absolute inset-0 bg-grid opacity-10" />
               </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
