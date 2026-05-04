import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticCursor() {
  const cursorDot = useRef({ x: 0, y: 0 });
  const cursorRing = useRef({ x: 0, y: 0 });
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const [label, setLabel] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const onMove = (e) => {
      cursorDot.current = { x: e.clientX, y: e.clientY };
      setIsHidden(false);
    };

    const onEnter = (e) => {
      const el = e.target.closest('a, button, [data-cursor]');
      if (el) {
        setIsHovering(true);
        setLabel(el.dataset.cursor || '');
      }
    };

    const onLeave = (e) => {
      const el = e.target.closest('a, button, [data-cursor]');
      if (el) {
        setIsHovering(false);
        setLabel('');
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    // Smooth ring lerp animation loop
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      cursorRing.current.x = lerp(cursorRing.current.x, cursorDot.current.x, 0.12);
      cursorRing.current.y = lerp(cursorRing.current.y, cursorDot.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${cursorDot.current.x}px, ${cursorDot.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${cursorRing.current.x}px, ${cursorRing.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Outer ring — lags behind */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ willChange: 'transform' }}
      >
        <motion.div
          animate={{
            width: isHovering ? (label ? 80 : 48) : 32,
            height: isHovering ? (label ? 80 : 48) : 32,
            opacity: isHovering ? 0.5 : 0.25,
            borderColor: isHovering ? 'rgba(0,229,255,0.8)' : 'rgba(255,255,255,0.5)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="rounded-full border flex items-center justify-center"
          style={{ marginLeft: '-16px', marginTop: '-16px' }}
        >
          {label && (
            <span className="text-[8px] text-brand-accent font-bold uppercase tracking-widest text-center leading-tight px-1">
              {label}
            </span>
          )}
        </motion.div>
      </div>

      {/* Inner dot — snaps instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ willChange: 'transform' }}
      >
        <motion.div
          animate={{
            width: isHovering ? 6 : 6,
            height: isHovering ? 6 : 6,
            backgroundColor: isHovering ? '#00E5FF' : '#ffffff',
            opacity: isHovering ? 1 : 0.9,
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full shadow-[0_0_8px_rgba(0,229,255,0.8)]"
          style={{ marginLeft: '-3px', marginTop: '-3px' }}
        />
      </div>
    </>
  );
}
