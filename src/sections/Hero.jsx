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
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Content */}
          <motion.div 
            custom={1} initial="hidden" animate="visible" variants={textVariants}
          >
            <motion.div className="inline-block px-4 py-1.5 rounded-full border border-brand-accent/20 bg-brand-dark/50 backdrop-blur-md mb-8">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-brand-accent uppercase">
                  Growth Systems Active
                </span>
              </div>
            </motion.div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black text-white leading-[1] tracking-tighter mb-10">
              CORDEX <span className="text-gray-500 font-light">WERK</span><span className="text-brand-accent">.</span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed mb-12 max-w-3xl mx-auto uppercase tracking-[0.2em] opacity-80">
              High-Performance Engineering <span className="mx-4 text-white/20">|</span> SaaS & Startup Strategy
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#contact" className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-brand-accent hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                Launch Your Project
              </a>
              <a href="#contact" className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-brand-accent/10 hover:border-brand-accent/50 backdrop-blur-md transition-all duration-500">
                Book Strategy Call
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
