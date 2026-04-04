import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    title: 'SaaS DEVELOPMENT',
    description: 'High-performance, scalable SaaS platforms built with Next.js and Node. We focus on unit economics and user retention.',
    tag: '01',
    details: {
      technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Supabase'],
      process: ['Architecture Design', 'Database Scaling', 'API Orchestration', 'Security Audits'],
      deliverables: ['Custom SaaS Dashboards', 'Multi-tenant Systems', 'Cloud-native Deployments'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
    }
  },
  {
    title: 'LANDING PAGES',
    description: 'Conversion-optimized landing pages designed to turn cold traffic into high-paying customers for your startup.',
    tag: '02',
    details: {
      technologies: ['Tailwind CSS', 'Framer Motion', 'Three.js', 'SEO Matrix'],
      process: ['Psychology Analysis', 'A/B Test Design', 'Performance Tuning', 'Asset Optimization'],
      deliverables: ['High-converting Funnels', 'Interactive Storytelling Pages', 'Sales-driven UI'],
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800'
    }
  },
  {
    title: 'UI/UX STRATEGY',
    description: 'Elite digital design that balances futuristic aesthetics with intuitive logic to reduce churn and improve UX.',
    tag: '03',
    details: {
      technologies: ['Figma', 'Prototyping', 'User Mapping', 'Brand Systems'],
      process: ['Wireframe Mapping', 'Visual Identity', 'Usability Testing', 'Design System Dev'],
      deliverables: ['Custom Design Systems', 'High-fidelity Prototypes', 'Full Brand Guidelines'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
    }
  }
];

function SidePanel({ service, onClose }) {
  if (!service) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex justify-end transition-all duration-500"
    >
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full md:w-[500px] lg:w-[600px] bg-[#050B14] border-l border-white/10 h-full overflow-y-auto relative shadow-[-20px_0_60px_rgba(0,0,0,0.8)] z-[110]"
      >
        {/* Header Decor */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-accent to-transparent opacity-50 z-[120]" />

        <div className="p-8 md:p-12 relative z-[130]">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest z-[140] bg-black/40 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md"
          >
            Close <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          <span className="text-brand-accent text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4 block">{service.tag}</span>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-none mb-10">{service.title}</h2>
          
          <div className="aspect-video rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
             <img src={service.details.image} alt={service.title} className="w-full h-full object-cover" />
          </div>

          <section className="space-y-12">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-6 border-b border-white/5 pb-3">Strategic Stack</h4>
              <div className="flex flex-wrap gap-2">
                {service.details.technologies.map(t => (
                  <span key={t} className="px-4 py-1.5 bg-white/[0.03] border border-white/10 rounded-full text-[10px] text-white font-medium hover:border-brand-accent/40 transition-colors">{t}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-6 border-b border-white/5 pb-3">The Architecture</h4>
              <ul className="space-y-4">
                {service.details.process.map(p => (
                  <li key={p} className="flex items-center gap-4 text-sm text-gray-400 group">
                    <div className="w-1.5 h-1.5 bg-brand-accent rounded-full group-hover:scale-150 transition-transform" /> {p}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-6 border-b border-white/5 pb-3">Elite Deliverables</h4>
              <div className="grid grid-cols-1 gap-3">
                {service.details.deliverables.map(d => (
                  <div key={d} className="p-5 bg-white/[0.02] border border-white/5 rounded-xl text-sm text-gray-300 hover:border-brand-accent/20 transition-all hover:translate-x-1">
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-20 pt-10 border-t border-white/5">
             <button 
               onClick={() => {
                  onClose();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
               }}
               className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-xl hover:bg-brand-accent transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
             >
               Initialize Partnership
             </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const previewImages = services.map(s => s.details.image);

  return (
    <section id="services" className={`relative z-10 bg-brand-dark overflow-hidden border-y border-white/5 ${isMobile ? 'py-12' : 'py-28'}`}>
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      {/* Side Panel Overlay */}
      <AnimatePresence>
        {activeService && (
          <SidePanel 
            service={activeService} 
            onClose={() => setActiveService(null)} 
          />
        )}
      </AnimatePresence>

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
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-heading font-black text-white tracking-tighter leading-tight md:leading-none">
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
          {/* Left: Typography rows */}
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
                onClick={() => setActiveService(service)}
                className={`group relative border-t border-white/10 ${isMobile ? 'py-6' : 'py-10'} cursor-pointer`}
              >
                {/* Row hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" />

                <div className="flex items-start justify-between gap-6 relative z-10">
                  <span className="text-[10px] text-gray-600 font-bold tracking-widest uppercase mt-2 flex-shrink-0">
                    {service.tag}
                  </span>

                  <h3 className="flex-1 text-2xl sm:text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter text-gray-500/40 group-hover:text-white transition-all duration-500 group-hover:translate-x-2 leading-tight">
                    {service.title}
                  </h3>

                  <p className="hidden md:block w-[38%] flex-shrink-0 text-gray-400 font-light text-sm leading-relaxed text-right opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Immersive preview image */}
          <div className="hidden lg:block w-[40%] sticky top-32 h-[450px]">
            <div className="w-full h-full relative p-6">
              <div className="absolute inset-0 border border-white/10 rounded-2xl bg-white/[0.02]" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredIndex || 'default'}
                  initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full rounded-xl overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-brand-dark/20 z-10" />
                  <img 
                    src={hoveredIndex !== null ? previewImages[hoveredIndex] : previewImages[0]} 
                    alt="Preview" 
                    className="w-full h-full object-cover grayscale opacity-50 contrast-125"
                  />
                  
                  {/* Decorative Scanlines */}
                  <div className="absolute inset-0 bg-scanlines opacity-5 z-20" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
