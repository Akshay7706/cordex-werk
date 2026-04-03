import { useEffect, useRef, useState } from 'react';

export default function ChromaticAberration() {
  const [aberration, setAberration] = useState(0);
  const lastScrollY = useRef(0);
  const rafRef = useRef(null);
  const decayRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const velocity = Math.abs(currentY - lastScrollY.current);
      lastScrollY.current = currentY;

      // Scale aberration based on velocity (max clamp at 6px)
      const newAberration = Math.min(velocity * 0.15, 6);
      setAberration(newAberration);

      // Clear any existing decay timer
      if (decayRef.current) clearTimeout(decayRef.current);

      // After scrolling stops, decay back to zero smoothly
      decayRef.current = setTimeout(() => {
        const decay = () => {
          setAberration(prev => {
            if (prev <= 0.05) return 0;
            rafRef.current = requestAnimationFrame(decay);
            return prev * 0.8;
          });
        };
        rafRef.current = requestAnimationFrame(decay);
      }, 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (decayRef.current) clearTimeout(decayRef.current);
    };
  }, []);

  // Apply chromatic aberration via CSS filter + pseudo-element trick using text-shadow approach
  // We inject a <style> tag dynamically to avoid expensive real-time React renders
  const filterStyle = aberration > 0.05
    ? `drop-shadow(${aberration}px 0 0 rgba(255,0,0,0.5)) drop-shadow(-${aberration}px 0 0 rgba(0,255,255,0.5))`
    : 'none';

  return (
    <style>{`
      #root > * {
        filter: ${filterStyle};
        transition: filter 0.05s linear;
      }
    `}</style>
  );
}
