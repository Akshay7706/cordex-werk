import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate a fast, glitchy terminal loading sequence
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      // Random jumps in progress to seem like complex assets loading
      const jump = Math.floor(Math.random() * 15) + 5;
      currentProgress += jump;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        
        // Brief pause at 100% before triggering exit animation
        setTimeout(() => {
          setIsLoaded(true);
        }, 600);
      } else {
        setProgress(currentProgress);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          // Slide up exit animation
          exit={{ y: '-100%', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-dark overflow-hidden pointer-events-auto"
        >
          {/* Subtle background grain purely for the loader */}
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

          <div className="relative z-10 text-center w-full max-w-sm px-6">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0, transition: { duration: 0.3 } }}
               className="flex flex-col items-center gap-4"
            >
              
              <div className="flex items-end justify-between w-full text-brand-accent font-heading">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Initializing Engine</span>
                <span className="text-4xl md:text-6xl font-black tabular-nums tracking-tighter">{progress}%</span>
              </div>
              
              {/* Progress Bar Container */}
              <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-brand-accent shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.2 }}
                ></motion.div>
              </div>

              <div className="flex justify-between w-full mt-2">
                 <span className="text-[8px] text-gray-500 uppercase tracking-widest">Cordex_System_v2.0</span>
                 <span className="text-[8px] text-gray-500 uppercase tracking-widest">Aesthetic Override</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
