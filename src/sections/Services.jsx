import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    title: 'WEB EXPERIENCE',
    description: 'High-performance, beautifully engineered websites built for speed and premium user experiences.',
    tag: '01'
  },
  {
    title: 'SaaS PLATFORMS',
    description: 'Scalable SaaS applications and mobile experiences with modern tech stacks and flawless logic.',
    tag: '02'
  },
  {
    title: 'SYSTEM ARCHITECTURE',
    description: 'Robust server architecture, AI-driven solutions, and enterprise-grade backend infrastructure.',
    tag: '03'
  }
];

const previewImages = [
  // WEB EXPERIENCE — sleek UI/UX design workspace
  'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800',
  // SaaS PLATFORMS — modern analytics dashboard
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  // SYSTEM ARCHITECTURE — server infrastructure / cloud
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="services" className="py-28 relative z-10 bg-brand-dark overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">

        {/* ── Section Header ── */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-accent text-xs font-bold tracking-[0.25em] uppercase mb-3 block">
              Capabilities
            </span>
            <h2 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter leading-none">
              Digital<br />Ecosystems.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-base font-light leading-relaxed max-w-xs"
          >
            We don't just write code; we design structural solutions. From front-end aesthetics to back-end power.
          </motion.p>
        </div>

        {/* ── Two-column content ── */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left: Typography rows — takes full width on mobile, 60% on desktop */}
          <div className="flex flex-col w-full lg:w-[60%]">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative border-t border-white/10 py-8 cursor-pointer"
              >
                {/* Row hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" />

                <div className="flex items-start justify-between gap-6 relative z-10">
                  {/* Number tag */}
                  <span className="text-[10px] text-gray-600 font-bold tracking-widest uppercase mt-2 flex-shrink-0">
                    {service.tag}
                  </span>

                  {/* Title */}
                  <h3 className="flex-1 text-2xl md:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tighter text-gray-500/40 group-hover:text-white transition-all duration-500 group-hover:translate-x-2 leading-tight">
                    {service.title}
                  </h3>

                  {/* Description — always visible on mobile, reveal on hover for desktop */}
                  <p className="hidden md:block w-[38%] flex-shrink-0 text-gray-400 font-light text-sm leading-relaxed text-right opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    {service.description}
                  </p>
                </div>

                {/* Mobile description always visible */}
                <p className="md:hidden text-gray-500 font-light text-sm leading-relaxed mt-3 pl-8">
                  {service.description}
                </p>
              </motion.div>
            ))}
            <div className="border-t border-white/10 w-full" />
          </div>

          {/* Right: Preview Image Panel — sticky on desktop */}
          <div className="hidden lg:block lg:w-[40%] sticky top-24">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/8">
              <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredIndex ?? -1}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0"
                  >
                    <img
                      src={previewImages[hoveredIndex ?? 0]}
                      alt="service preview"
                      className="w-full h-full object-cover brightness-75 contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className="text-[10px] text-brand-accent uppercase tracking-widest font-bold">
                        {services[hoveredIndex ?? 0].tag} — {services[hoveredIndex ?? 0].title}
                      </span>
                    </div>
                  </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
