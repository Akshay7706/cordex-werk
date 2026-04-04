import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Founder @ Aether AI',
    content: 'Cordex transformed our landing page into a conversion engine. Our trial sign-ups increased by 140% in the first month. The 3D interactions are simply unmatched.',
    rating: 5
  },
  {
    name: 'Marcus Thorne',
    role: 'CTO @ Nexus Fintech',
    content: 'The speed and precision of their engineering are enterprise-grade. We migrated our entire frontend to their architecture and saw an immediate 60% boost in Lighthouse scores.',
    rating: 5
  },
  {
    name: 'Elena Vance',
    role: 'Product Lead @ Skyward SaaS',
    content: 'Working with Cordex is like having an elite technical strike team. They don\'t just write code; they design systems that scale and convert.',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-brand-dark overflow-hidden border-b border-white/5 relative">
       <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
       
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
          >
            Digital Evidence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tighter"
          >
            Founder <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Intelligence.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative p-10 bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:border-brand-accent/30 transition-all duration-500 h-full flex flex-col pt-16"
            >
              <div className="absolute top-6 left-10">
                 <Quote className="w-8 h-8 text-brand-accent/20" />
              </div>

              <div className="flex gap-1 mb-6">
                 {[...Array(test.rating)].map((_, i) => (
                   <Star key={i} className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                 ))}
              </div>

              <p className="text-gray-400 font-light leading-relaxed mb-8 italic flex-1 text-base">
                "{test.content}"
              </p>

              <div className="mt-auto flex flex-col gap-1 border-t border-white/5 pt-6">
                <h4 className="text-white font-heading font-bold text-lg">{test.name}</h4>
                <p className="text-brand-accent text-xs font-medium uppercase tracking-widest">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
