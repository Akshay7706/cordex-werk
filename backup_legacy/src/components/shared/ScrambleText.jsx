import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?';

export default function ScrambleText({ text, className }) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    let maxIterations = text.length;
    let interval = null;

    // Start completely scrambled
    const scramble = () => {
      return text
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return text[index];
          }
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        })
        .join('');
    };

    interval = setInterval(() => {
      setDisplayText(scramble());
      
      // Decrypt slower towards the end for dramatic effect
      iteration += 1 / 3;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text); // Ensure exactly matches final text state
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
