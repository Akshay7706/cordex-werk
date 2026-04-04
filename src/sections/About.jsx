import { motion } from 'framer-motion';
import { Target, Zap, ShieldCheck } from 'lucide-react';
import AnimatedCard from '../components/shared/AnimatedCard';

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10 bg-brand-dark border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Precision meets <br />
              <span className="text-brand-secondary">Performance.</span>
            </h2>
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              At Cordex Werk, we treat code like an art form and web architecture like a science. 
              We are a team of elite developers and designers dedicated to building digital products 
              that don't just look stunning but perform flawlessly under pressure.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Inspired by German engineering and the boundless aesthetic of the cosmos, 
              we craft solutions tailored for ambitious startups, SaaS platforms, and enterprise leaders.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-primary border border-white/10 flex items-center justify-center text-brand-accent">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="font-semibold">Lightning Fast</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-primary border border-white/10 flex items-center justify-center text-brand-accent">
                  <Target className="w-5 h-5" />
                </div>
                <span className="font-semibold">Pixel Perfect</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-primary border border-white/10 flex items-center justify-center text-brand-accent">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-semibold">Highly Secure</span>
              </div>
            </div>
          </motion.div>

          {/* Abstract visual graphic for precision/code */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] w-full"
          >
             <AnimatedCard className="w-full h-full flex flex-col justify-center bg-brand-primary/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-20">
                  <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-brand-secondary">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="2" x2="12" y2="22"></line>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <circle cx="12" cy="12" r="4"></circle>
                  </svg>
                </div>
                
                <div className="mt-auto space-y-4 font-mono text-sm text-brand-secondary/70">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">01</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-brand-secondary/30 to-transparent"></div>
                    <span>const setup = new Environment();</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">02</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-brand-secondary/40 to-transparent"></div>
                    <span>await setup.initializeCore();</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">03</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-brand-secondary/50 to-transparent"></div>
                    <span className="text-brand-accent animate-pulse-slow">System.deploy({'{ status: 200 }'});</span>
                  </div>
                </div>
             </AnimatedCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
