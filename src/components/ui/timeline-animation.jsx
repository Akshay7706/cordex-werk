"use client";
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../lib/utils';

export function TimelineContent({
  children,
  className,
  animationNum = 0,
  timelineRef,
  customVariants,
  as = 'div',
  ...props
}) {
  const isInView = useInView(timelineRef, { once: true, margin: "-100px 0px" });
  
  const defaultVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariants || defaultVariants}
      {...props}
    >
      {children}
    </Component>
  );
}
