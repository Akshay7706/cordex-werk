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
      <motion.div style={{ transform: gridTransform }} className="absolute inset-[-10%] w-[120%] h-[120%] bg-grid pointer-events-none z-0 opacity-40"></motion.div>
      <AbstractScene />
      
      {/* Interactive Spotlight Orb - Smaller and less blur on mobile */}
      <motion.div 
        style={{ transform: spotlightTransform }} 
        className={`absolute top-1/2 left-1/2 rounded-full bg-brand-secondary/20 pointer-events-none z-0 mix-blend-screen ${
          isMobile ? 'w-[400px] h-[400px] blur-[80px]' : 'w-[800px] h-[800px] blur-[150px]'
        }`}
      ></motion.div>

      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-12">
        {/* Top Header Layer */}
        <div className="flex justify-between items-start w-full mt-24 md:mt-12">
           <motion.div custom={0} initial="hidden" animate="visible" variants={textVariants} className="inline-block px-4 py-1.5 rounded-full border border-brand-accent/20 bg-brand-dark/50 backdrop-blur-md pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-brand-accent uppercase">
                System Active
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Layer */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full pb-10 md:pb-8 gap-8 px-4">
          
          <motion.div custom={1} initial="hidden" animate="visible" variants={textVariants} className="flex-1 text-center md:text-left max-w-2xl">
             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.1] tracking-tighter mb-6">
               Build Websites That Don't Just <span className="text-brand-accent">Look Good</span> — They Convert.
             </h1>
             <p className="text-gray-400 text-sm md:text-lg font-light leading-relaxed mb-8 max-w-xl">
               Helping startups and SaaS businesses design high-performance digital experiences that increase conversions and scale faster.
             </p>
             <div className="flex flex-wrap gap-4 justify-center md:justify-start">
               <a href="#contact" className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-brand-accent hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                 Get Your Website
               </a>
               <a href="#contact" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-brand-accent/10 hover:border-brand-accent/50 backdrop-blur-md transition-all duration-300">
                 Book a Free Call
               </a>
             </div>
          </motion.div>

          <motion.div custom={2} initial="hidden" animate="visible" variants={textVariants} className="hidden lg:flex pointer-events-none items-center gap-12 relative">
            <div className="absolute -inset-20 bg-brand-secondary/10 blur-[100px] rounded-full"></div>
            <div className="flex flex-col items-end gap-2 text-right">
              <span className="text-brand-accent text-[10px] font-bold tracking-[0.3em] uppercase">Specialization</span>
              <span className="text-white text-3xl font-heading font-black tracking-tighter leading-none">SaaS &<br />Startups</span>
            </div>
            <div className="w-16 h-[1px] bg-white/20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
