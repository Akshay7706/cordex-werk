import { motion } from 'framer-motion';
import { Rocket, Shield, Maximize, BrainCircuit } from 'lucide-react';
import AnimatedCard from '../components/shared/AnimatedCard';

const features = [
  {
    title: 'Fast Performance',
    description: 'Bespoke logic and optimized assets resulting in unparalleled loading speeds.',
    icon: Rocket
  },
  {
    title: 'Secure Systems',
    description: 'Enterprise-grade security woven into the fabric of the architecture.',
    icon: Shield
  },
  {
    title: 'Scalable Architecture',
    description: 'Built to handle thousands of concurrent users seamlessly.',
    icon: Maximize
  },
  {
    title: 'Smart Integrations',
    description: 'Seamless AI and third-party API connectivity.',
    icon: BrainCircuit
  }
];

export default function Features() {
  return (
    <section id="features" className="py-12 md:py-32 relative z-10 bg-brand-dark overflow-hidden border-t border-white/5">
      
      {/* Background glow & Grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-brand-accent text-sm font-bold tracking-widest uppercase mb-4 block">Core Strengths</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Engineered for Scale.</h2>
            <p className="text-gray-400 text-lg font-light">Performance, security, and smart integration built into the foundation.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
            >
              <AnimatedCard className="h-full flex flex-col items-center text-center p-6 md:p-8 bg-glass-gradient border border-white/5 rounded-3xl group hover:border-brand-secondary/50 transition-all duration-300 relative overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[30px] rounded-full pointer-events-none"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-brand-primary/80 flex items-center justify-center text-brand-secondary mb-6 border border-white/10 group-hover:text-brand-accent group-hover:scale-110 transition-all duration-300 shadow-inner">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-brand-accent transition-colors">{feature.title}</h4>
                <p className="text-sm text-gray-400 font-light leading-relaxed">{feature.description}</p>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
