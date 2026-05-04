import { useEffect, useRef, useState } from 'react';

// Portfolio images to use as trail images
const TRAIL_IMAGES = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1620825937374-87fc7d6aaf8e?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=300',
];

const MAX_TRAIL = 12;

export default function ImageTrail() {
  const [items, setItems] = useState([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const imageIndex = useRef(0);
  const throttleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Compute distance moved
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      mousePos.current = { x, y };

      // Only spawn a new image if mouse moved fast enough (like 60px threshold)
      if (dist > 60) {
        lastPos.current = { x, y };

        if (throttleRef.current) return;
        throttleRef.current = setTimeout(() => { throttleRef.current = null; }, 100);

        const imgSrc = TRAIL_IMAGES[imageIndex.current % TRAIL_IMAGES.length];
        imageIndex.current++;

        const newItem = {
          id: Date.now() + Math.random(),
          x,
          y,
          src: imgSrc,
        };

        setItems(prev => {
          const updated = [...prev, newItem];
          // Keep max items
          return updated.slice(-MAX_TRAIL);
        });

        // Auto-remove after animation finishes
        setTimeout(() => {
          setItems(prev => prev.filter(item => item.id !== newItem.id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[50] pointer-events-none overflow-hidden">
      {items.map((item, idx) => (
        <div
          key={item.id}
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
            transform: 'translate(-50%, -50%)',
            width: '120px',
            height: '80px',
            animation: 'imageTrailFade 1s ease-out forwards',
            zIndex: 50 + idx,
          }}
          className="rounded-lg overflow-hidden border border-white/10"
        >
          <img
            src={item.src}
            alt=""
            className="w-full h-full object-cover"
            draggable="false"
          />
        </div>
      ))}

      <style>{`
        @keyframes imageTrailFade {
          0% { opacity: 0.85; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          60% { opacity: 0.6; transform: translate(-50%, calc(-50% + 20px)) scale(0.95) rotate(2deg); }
          100% { opacity: 0; transform: translate(-50%, calc(-50% + 50px)) scale(0.85) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}
