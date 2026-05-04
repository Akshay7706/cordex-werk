import React from 'react';
import { motion } from 'framer-motion';

export const MenuToggleIcon = ({ open, className, duration = 300, ...props }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} {...props}>
      <motion.span
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
        transition={{ duration: duration / 1000 }}
        className="absolute h-0.5 w-full bg-current rounded-full"
      />
      <motion.span
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: duration / 1000 }}
        className="absolute h-0.5 w-full bg-current rounded-full"
      />
      <motion.span
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
        transition={{ duration: duration / 1000 }}
        className="absolute h-0.5 w-full bg-current rounded-full"
      />
    </div>
  );
};
