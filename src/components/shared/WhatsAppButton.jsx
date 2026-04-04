import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useRef } from 'react';

export default function WhatsAppButton() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const glowOpacity = useTransform(x, [-50, 50], [0.4, 0.8]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    mouseX.set((clientX - center.x) * 0.3);
    mouseY.set((clientY - center.y) * 0.3);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = () => {
    // Replace with actual number
    window.open('https://wa.me/1234567890?text=Hi, I would like to build a high-converting website for my startup.', '_blank');
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      className="fixed bottom-8 right-8 z-[100] cursor-none pointer-events-auto"
    >
      {/* Outer Glow Ring */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ opacity: glowOpacity }}
        className="absolute -inset-4 bg-[#25D366]/20 blur-xl rounded-full"
      />
      
      <button
        onClick={handleClick}
        className="relative w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300 active:scale-95 group overflow-hidden"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        
        {/* Subtle Shine */}
        <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-gradient-to-br from-white/20 to-transparent rotate-45 group-hover:top-[100%] group-hover:left-[100%] transition-all duration-1000"></div>
        
        {/* Mobile Tooltip */}
        <div className="absolute right-full mr-4 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Fast Support
        </div>
      </button>
    </motion.div>
  );
}
