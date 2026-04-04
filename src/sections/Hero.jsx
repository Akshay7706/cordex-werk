import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import Starfield from '../components/shared/Starfield';
import AbstractScene from '../components/3d/AbstractScene';
import ScrambleText from '../components/shared/ScrambleText';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = clientX - innerWidth / 2;
      const y = clientY - innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY]);

  const spotlightTransform = useMotionTemplate`translate(calc(-50% + ${mouseX}px * 0.1), calc(-50% + ${mouseY}px * 0.1))`;
  const gridTransform = useMotionTemplate`translate(calc(${mouseX}px * -0.02), calc(${mouseY}px * -0.02))`;

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
    })
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-brand-dark">
      {/* Background Layers */}
      <Starfield />
      <div className="absolute inset-0 bg-grain z-[1]"></div>
      <div className="absolute inset-0 bg-aurora animate-aurora z-0 opacity-30"></div>
      <motion.div style={{ transform: gridTransform }} className="absolute inset-[-10%] w-[120%] h-[120%] bg-grid pointer-events-none z-0 opacity-20"></motion.div>
      <AbstractScene />
      
      <div className="container mx-auto px-6 lg:px-16 pt-32 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div 
            custom={1} initial="hidden" animate="visible" variants={textVariants}
            className="text-center lg:text-left"
          >
            <motion.div className="inline-block px-4 py-1.5 rounded-full border border-brand-accent/20 bg-brand-dark/50 backdrop-blur-md mb-8">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-brand-accent uppercase">
                  Growth Systems Active
                </span>
              </div>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.1] tracking-tighter mb-8">
              I Help Startups Build <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>High-Converting</span> Websites That <span className="text-brand-accent">Drive Growth.</span>
            </h1>
            
            <p className="text-gray-400 text-base md:text-xl font-light leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Specialized engineering for ambitious SaaS brands. We blend psychological conversion triggers with elite-level React performance.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#contact" className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-brand-accent hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                Launch Your Project
              </a>
              <a href="#contact" className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-brand-accent/10 hover:border-brand-accent/50 backdrop-blur-md transition-all duration-500">
                Book Strategy Call
              </a>
            </div>

            <div className="mt-12 pt-12 border-t border-white/5 flex flex-wrap justify-center lg:justify-start gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
              <div className="flex flex-col gap-1 items-center lg:items-start">
                <span className="text-white text-xl font-bold font-heading tracking-tighter">142%</span>
                <span className="text-[9px] uppercase tracking-widest">Avg. CR Lift</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block"></div>
              <div className="flex flex-col gap-1 items-center lg:items-start">
                <span className="text-white text-xl font-bold font-heading tracking-tighter">&lt; 1.2s</span>
                <span className="text-[9px] uppercase tracking-widest">Load Speed</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="hidden lg:block relative perspective-1000"
          >
            <div className="relative z-10 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent/50 to-brand-secondary/50 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
              
              {/* Mockup Frame */}
              <div className="relative glass-panel rounded-2xl overflow-hidden aspect-[1.4/1] border border-white/10 shadow-2xl">
                {/* Navbar Mockup */}
                <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-1.5 font-sans">
                   <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                   <div className="w-2 h-2 rounded-full bg-yellow-500/40"></div>
                   <div className="w-2 h-2 rounded-full bg-green-500/40"></div>
                </div>
                
                {/* Dashboard Content Mockup */}
                <div className="p-6 grid grid-cols-3 gap-4">
                  <div className="col-span-3 h-24 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                    <div className="w-1/3 h-2 bg-white/10 rounded"></div>
                    <div className="w-2/3 h-6 bg-brand-accent/20 rounded"></div>
                  </div>
                  <div className="h-20 bg-white/5 rounded-xl border border-white/5"></div>
                  <div className="h-20 bg-white/5 rounded-xl border border-white/5"></div>
                  <div className="h-20 bg-white/5 rounded-xl border border-white/5"></div>
                  <div className="col-span-2 h-32 bg-white/5 rounded-xl border border-white/5"></div>
                  <div className="h-32 bg-brand-accent/5 rounded-xl border border-brand-accent/10"></div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 right-10 p-4 glass-panel rounded-xl border border-brand-accent/30 shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center">
                       <div className="w-4 h-4 rounded-full bg-brand-accent"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Conversion Boost</span>
                      <span className="text-xl font-heading font-black text-brand-accent">+242%</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
