import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalLoader({ onDone }) {
  const [phase, setPhase] = useState('show'); 
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Artificial fast loading counter
    let current = 0;
    const interval = setInterval(() => {
      const jump = Math.floor(Math.random() * 20) + 5;
      current += jump;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
      } else {
        setProgress(current);
      }
    }, 100);

    const t1 = setTimeout(() => setPhase('exit'), 1800);
    const t2 = setTimeout(() => {
      setPhase('done');
      onDone?.();
    }, 2800); // Wait for the slide-up animation to finish
    return () => { clearInterval(interval); clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          animate={{ y: phase === 'exit' ? '-100%' : 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none"
          style={{ pointerEvents: phase === 'exit' ? 'none' : 'all' }}
        >
          {/* Subtle static grid */}
          <div className="absolute inset-0 bg-grid opacity-10" />

          <div className="relative z-10 w-full max-w-xs px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-2"
            >
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] text-brand-accent uppercase tracking-[0.3em] font-bold">Booting 3D Engine</span>
                <span className="text-4xl font-heading font-black text-white tabular-nums tracking-tighter">{progress}%</span>
              </div>
              
              <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                  className="absolute top-0 left-0 h-full bg-brand-accent shadow-[0_0_10px_rgba(0,229,255,1)]"
                />
              </div>

              <div className="flex justify-between mt-4 font-mono">
                <span className="text-[10px] text-brand-accent uppercase tracking-widest font-bold">CORDEX WERK</span>
                <span className="text-[8px] text-gray-500 uppercase tracking-widest animate-pulse">Running checks</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
