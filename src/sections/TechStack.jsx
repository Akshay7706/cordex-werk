import { motion } from 'framer-motion';

const stack = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Framer', icon: 'https://cdn.simpleicons.org/framer/black/white' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonaws/FF9900' }
];

export default function TechStack() {
  // Duplicate stack to ensure smooth infinite scrolling
  const marqueeStack = [...stack, ...stack, ...stack];

  return (
    <section className="py-24 relative z-10 bg-brand-dark border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center mb-16">
        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-3">The Arsenal</h2>
        <h3 className="text-3xl md:text-5xl font-heading font-black text-white">Engineered with Precision.</h3>
      </div>

      <div className="relative w-full flex items-center h-24 overflow-hidden mask-edges">
        {/* Left/Right Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
          {marqueeStack.map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 mx-8 group grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 cursor-pointer"
            >
              <div className="w-16 h-16 bg-brand-primary/50 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center p-3 group-hover:border-brand-accent/50 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] group-hover:scale-110 transition-all duration-300">
                {tech.name === 'Next.js' || tech.name === 'AWS' ? (
                  <div className="bg-white/90 rounded-md p-1 w-full h-full flex items-center justify-center"><img src={tech.icon} alt={tech.name} className="max-w-full max-h-full object-contain" /></div>
                ) : (
                  <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain filter drop-shadow-lg" />
                )}
              </div>
              <span className="text-lg font-bold font-heading text-gray-500 group-hover:text-white transition-colors">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
