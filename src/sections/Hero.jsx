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
        <div className="flex flex-col md:flex-row justify-between items-end w-full pb-10 md:pb-8">
          
          <motion.div custom={1} initial="hidden" animate="visible" variants={textVariants} className="mb-10 md:mb-0 text-left">
             <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-black text-white leading-none tracking-tighter opacity-90 drop-shadow-2xl">
               <ScrambleText text="CORDEX" />
             </h1>
             <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold mt-4">
               <ScrambleText text="DIGITAL ARCHITECTURE" />
             </p>
          </motion.div>

          <motion.div custom={2} initial="hidden" animate="visible" variants={textVariants} className="pointer-events-auto flex items-center gap-6">
            <a href="#portfolio" className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-white transition-colors">
              Explore Projects
            </a>
            <div className="w-10 md:w-12 h-[1px] bg-white/20"></div>
            <a href="#contact" className="group flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/20 hover:border-brand-accent bg-transparent hover:bg-brand-accent/10 transition-all duration-300">
               <svg className="w-4 h-4 text-white group-hover:text-brand-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
