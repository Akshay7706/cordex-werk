import { motion } from 'framer-motion';

const steps = [
  {
    tag: '01',
    title: 'Understand the Mission',
    description: 'We deep-dive into your unit economics and user flows. We don\'t just build; we strategize for your specific business goals.'
  },
  {
    tag: '02',
    title: 'Design for Conversion',
    description: 'We craft high-fidelity digital interfaces with a focus on psychological triggers and optimal SaaS user experience.'
  },
  {
    tag: '03',
    title: 'Develop with Performance',
    description: 'Bespoke React/Next.js engineering. We build lightning-fast, secure, and infinitely scalable SaaS-grade systems.'
  },
  {
    tag: '04',
    title: 'Launch & Optimize',
    description: 'We deploy to elite infrastructure and monitor performance metrics to iterate and maximize your conversion rates.'
  }
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-brand-dark overflow-hidden border-b border-white/5 relative">
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Operation Alpha</span>
             <h2 className="text-3xl md:text-5xl lg:text-7xl font-heading font-black text-white tracking-tighter leading-tight md:leading-none">
               The Precision<br />Execution.
             </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg font-light leading-relaxed max-w-sm"
          >
            A high-performance implementation lifecycle designed to minimize churn and maximize growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative group p-10 bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-brand-accent/30 transition-all duration-500 h-full"
            >
              {/* Glowing Line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className="text-4xl lg:text-5xl font-heading font-black text-white/5 group-hover:text-brand-accent/20 transition-colors mb-4">{step.tag}</div>
              <h4 className="text-xl md:text-2xl font-heading font-bold text-white mb-4 group-hover:text-brand-accent transition-colors">{step.title}</h4>
              <p className="text-gray-400 font-light leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
