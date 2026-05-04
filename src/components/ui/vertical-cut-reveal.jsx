"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function VerticalCutReveal({
  children,
  className,
  containerClassName,
  splitBy = 'words',
  staggerDuration = 0.1,
  staggerFrom = 'first',
  reverse = false,
  transition = { type: 'spring', stiffness: 200, damping: 20 },
  ...props
}) {
  if (typeof children !== 'string') return <div className={cn(containerClassName, className)}>{children}</div>;

  const elements = splitBy === 'characters' ? children.split('') : children.split(' ');

  return (
    <div className={cn('flex flex-wrap', containerClassName)} {...props}>
      {elements.map((el, i) => {
        let delay = i * staggerDuration;
        if (staggerFrom === 'last') {
          delay = (elements.length - 1 - i) * staggerDuration;
        } else if (staggerFrom === 'center') {
          const center = Math.floor(elements.length / 2);
          delay = Math.abs(center - i) * staggerDuration;
        }

        const yOffset = reverse ? -40 : 40;

        return (
          <div key={i} className="overflow-hidden inline-block pr-1">
            <motion.div
              initial={{ y: yOffset, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                ...transition,
                delay: transition.delay !== undefined ? transition.delay + delay : delay
              }}
              className={cn('inline-block', className)}
            >
              {el === ' ' ? '\u00A0' : el}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
