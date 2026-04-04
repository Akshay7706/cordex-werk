import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: 'Starting at $2,499',
    description: 'Perfect for startups needing a high-performance landing page to validate their MVP.',
    features: [
      'High-converting Landing Page',
      'Custom React Engineering',
      'Mobile-First Optimization',
      'Basic SEO & Meta Setup',
      'Deployment to Vercel/AWS',
      '7-Day Delivery'
    ]
  },
  {
    name: 'Growth',
    price: 'Starting at $4,999',
    description: 'A comprehensive digital ecosystem designed to scale your SaaS and improve churn.',
    popular: true,
    features: [
      'Multi-page SaaS Platform',
      'Full UI/UX Custom Systems',
      'Advanced Framer Motion Ops',
      'CMS Integration (Sanity/Contentful)',
      'A/B Testing Readiness',
      'Speed-optimized Logic'
    ]
  },
  {
    name: 'Premium',
    price: 'Starting at $8,999',
    description: 'Enterprise-grade architecture for businesses demanding market-dominating elite tools.',
    features: [
      'Custom Dashboard Engineering',
      'Full Auth & Stripe Systems',
      'Complex API Orchestration',
      'Data Visualization Layers',
      'Ongoing Optimization Support',
      'Priority Post-Launch Support'
    ]
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-brand-dark overflow-hidden border-b border-white/5 relative">
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
          >
            Invest in Growth
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tighter"
          >
            Tiered for <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Scale.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-light mt-6"
          >
            Transparent pricing for high-performance engineering. Select the mission that fits your current growth stage.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`relative p-8 md:p-12 rounded-[2.5rem] ${
                tier.popular 
                ? 'bg-brand-accent/5 border-brand-accent/30 shadow-[0_0_40px_rgba(0,229,255,0.1)]' 
                : 'bg-white/[0.02] border-white/5'
              } border transition-all duration-500 hover:border-brand-accent/30 h-full flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-accent text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                  Elite Choice
                </div>
              )}
              
              <div className="mb-10">
                <h4 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">{tier.name}</h4>
                <div className="text-2xl font-black text-brand-accent tracking-tighter mb-4">{tier.price}</div>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {tier.features.map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-400 font-light">
                    <Check className="w-4 h-4 text-brand-accent shrink-0" /> {f}
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
                tier.popular 
                ? 'bg-brand-accent text-black hover:bg-white hover:text-black shadow-[0_0_20px_rgba(0,229,255,0.3)]' 
                : 'bg-white/5 text-white hover:bg-brand-accent hover:text-black border border-white/10'
              }`}>
                Initialize Mission
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
