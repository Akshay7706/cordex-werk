import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import Starfield from '../components/shared/Starfield';
import AbstractScene from '../components/3d/AbstractScene';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = clientX - innerWidth / 2;
      const y = clientY - innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const spotlightTransform = useMotionTemplate`translate(calc(-50% + ${mouseX}px * 0.05), calc(-50% + ${mouseY}px * 0.05))`;
  const gridTransform = useMotionTemplate`translate(calc(${mouseX}px * -0.01), calc(${mouseY}px * -0.01))`;

  const textVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: (i) => ({
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { delay: i * 0.15, duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }
    })
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-brand-dark bg-grain">
      {/* Background Layers */}
      <Starfield />
      <motion.div style={{ transform: gridTransform }} className="absolute inset-[-10%] w-[120%] h-[120%] bg-grid pointer-events-none z-0 opacity-20"></motion.div>
      <AbstractScene />
      
      {/* Interactive Spotlight Orb */}
      <motion.div 
        style={{ transform: spotlightTransform }} 
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen"
      ></motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div custom={0} initial="hidden" animate="visible" variants={textVariants} className="inline-block px-4 py-1.5 rounded-full border border-brand-accent/20 bg-brand-dark/50 backdrop-blur-md mb-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-brand-accent uppercase">
              System Online: Stable
            </span>
          </div>
        </motion.div>

        <h1 className="max-w-5xl mx-auto">
          <motion.span custom={1} initial="hidden" animate="visible" variants={textVariants} className="block text-4xl md:text-7xl lg:text-9xl font-heading font-black text-white leading-[0.9] tracking-tighter uppercase">
            Digital<br />
            Engineering<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Redefined.</span>
          </motion.span>
        </h1>

        <motion.p custom={2} initial="hidden" animate="visible" variants={textVariants} className="max-w-xl mx-auto mt-8 text-gray-400 text-lg font-light leading-relaxed">
          Crafting high-performance SaaS platforms, AI systems, and immersive web experiences for the era of digital weightlessness.
        </motion.p>

        <motion.div custom={3} initial="hidden" animate="visible" variants={textVariants} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-brand-accent transition-all duration-300"
          >
            Explore Matrix
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Initialize Mission
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[8px] font-bold tracking-[0.4em] text-gray-600 uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-accent/50 to-transparent" />
      </motion.div>
    </section>
  );
}
