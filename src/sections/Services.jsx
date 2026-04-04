import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    title: 'WEB EXPERIENCE',
    description: 'High-performance, beautifully engineered websites built for speed and premium user experiences.',
    tag: '01',
    details: {
      technologies: ['React', 'Next.js', 'Framer Motion', 'Tailwind', 'Three.js'],
      process: ['Conceptual Design', '3D Prototyping', 'Component Development', 'Performance Tuning'],
      deliverables: ['Custom 3D Landing Pages', 'Interactive Portfolios', 'High-speed Headless Frontends'],
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800'
    }
  },
  {
    title: 'SaaS PLATFORMS',
    description: 'Scalable SaaS applications and mobile experiences with modern tech stacks and flawless logic.',
    tag: '02',
    details: {
      technologies: ['Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Redux', 'Zustand'],
      process: ['System Architecture', 'Database Design', 'API Orchestration', 'User Flow Mapping'],
      deliverables: ['Custom Dashboards', 'Auth & CRM Portals', 'Cloud-native Enterprise Apps'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
    }
  },
  {
    title: 'SYSTEM ARCHITECTURE',
    description: 'Robust server architecture, AI-driven solutions, and enterprise-grade backend infrastructure.',
    tag: '03',
    details: {
      technologies: ['Python', 'PyTorch', 'AWS', 'Docker', 'OpenAI API', 'Vectors/Pinecone'],
      process: ['Model Selection', 'Fine-tuning', 'Vector Search Logic', 'Infrastructure as Code'],
      deliverables: ['Custom AI Agents', 'LLM Integration', 'Scalable Cloud Infrastructure'],
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
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-end cursor-pointer"
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-brand-dark border-l border-white/10 h-full overflow-y-auto p-12 relative cursor-default"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <span className="text-brand-accent text-xs font-bold tracking-[0.2em] uppercase mb-4 block">{service.tag}</span>
        <h2 className="text-4xl md:text-5xl font-heading font-black text-white leading-none mb-8">{service.title}</h2>
        
        <div className="aspect-video rounded-xl overflow-hidden mb-10 border border-white/5">
           <img src={service.details.image} alt={service.title} className="w-full h-full object-cover" />
        </div>

        <section className="space-y-10">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 border-b border-white/5 pb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {service.details.technologies.map(t => (
                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-brand-accent font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 border-b border-white/5 pb-2">The Process</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.details.process.map(p => (
                <li key={p} className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1 h-1 bg-brand-accent rounded-full" /> {p}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 border-b border-white/5 pb-2">Key Deliverables</h4>
            <div className="space-y-3">
              {service.details.deliverables.map(d => (
                <div key={d} className="p-4 bg-white/[0.02] border border-white/5 rounded-lg text-sm text-gray-400 hover:border-brand-accent/20 transition-colors">
                  {d}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-16 pt-8 border-t border-white/5">
           <button 
             onClick={() => {
                onClose();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
             }}
             className="w-full py-4 bg-brand-primary text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-brand-secondary transition-all"
           >
             Start Your Journey
           </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeService, setActiveService] = useState(null);

  const previewImages = services.map(s => s.details.image);

  return (
    <section id="services" className="py-28 relative z-10 bg-brand-dark overflow-hidden border-y border-white/5">
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
                className="group relative border-t border-white/10 py-10 cursor-pointer"
              >
                {/* Row hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" />

                <div className="flex items-start justify-between gap-6 relative z-10">
                  <span className="text-[10px] text-gray-600 font-bold tracking-widest uppercase mt-2 flex-shrink-0">
                    {service.tag}
                  </span>

                  <h3 className="flex-1 text-2xl md:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tighter text-gray-500/40 group-hover:text-white transition-all duration-500 group-hover:translate-x-2 leading-tight">
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
