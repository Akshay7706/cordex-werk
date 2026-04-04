import { motion } from 'framer-motion';
import { Zap, Target, Layers, Rocket } from 'lucide-react';

const reasons = [
  {
    title: 'Fast & Scalable',
    description: 'We build with high-performance architectures (Next.js, Node) ensuring 99+ Lighthouse scores and zero-latency scaling.',
    icon: Zap
  },
  {
    title: 'Conversion-Focused',
    description: 'Every pixel is designed with a purpose: to turn your casual visitors into high-paying customers through strategic UX.',
    icon: Target
  },
  {
    title: 'Modern & Immersive',
    description: 'Utilizing Three.js and Framer Motion to create cinematic digital worlds that captivate and dominate the market.',
    icon: Layers
  },
  {
    title: 'SaaS Specialist',
    description: 'We speak the language of founders. We build MVPs, dashboards, and high-converting marketing engines for startups.',
    icon: Rocket
  }
];

export default function WhyChooseMe() {
  return (
    <section id="why-cordex" className="py-20 bg-brand-dark overflow-hidden border-b border-white/5 relative">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-secondary/5 blur-[120px] pointer-events-none rounded-full"></div>
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
          >
            The Cordex Advantage
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tighter"
          >
            Engineered for <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Conversion.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-brand-accent/30 transition-all duration-500 relative overflow-hidden"
            >
              {/* Card Glow */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-accent/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform duration-500">
                <reason.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">{reason.title}</h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
