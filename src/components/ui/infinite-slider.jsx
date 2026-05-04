import React from 'react';
import { motion } from 'framer-motion';

export function InfiniteSlider({ 
  children, 
  duration = 20, 
  gap = 48,
  className = "" 
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex shrink-0"
        animate={{
          x: [0, -100 + "%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ gap: `${gap}px` }}
      >
        {/* Render children twice for seamless looping */}
        <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
