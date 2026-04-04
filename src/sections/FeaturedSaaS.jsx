import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Zap, ArrowUpRight } from 'lucide-react';

const results = [
  { label: 'Conversion Lift', value: '+142%', color: 'text-brand-accent' },
  { label: 'Churn Reduction', value: '-40%', color: 'text-brand-secondary' },
  { label: 'Load Velocity', value: '0.8s', color: 'text-white' }
];

export default function FeaturedSaaS() {
  return (
    <section className="py-24 bg-brand-dark/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Interactive Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 relative"
          >
            <div className="absolute -inset-10 bg-brand-accent/5 blur-[120px] rounded-full animate-pulse"></div>
            
            <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
              {/* UI Header */}
              <div className="h-12 bg-white/5 border-b border-white/5 flex items-center justify-between px-6">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-24 h-2 bg-white/10 rounded-full"></div>
                   <div className="w-8 h-8 rounded-full bg-brand-accent/20"></div>
                </div>
              </div>

              {/* UI Content: Animated Graph */}
              <div className="p-8">
                <div className="flex justify-between items-end mb-12">
                   <div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Monthly Revenue</span>
                      <h3 className="text-3xl font-heading font-black text-white">$142,850.00</h3>
                   </div>
                   <div className="flex items-center gap-2 text-brand-accent text-sm font-bold">
                      <TrendingUp className="w-4 h-4" /> +12.4%
                   </div>
                </div>

                <div className="h-48 flex items-end gap-2 px-2">
                   {[40, 70, 45, 90, 65, 80, 55, 100, 75, 85, 60, 95].map((h, i) => (
                     <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.8 }}
                        className={`flex-1 rounded-t-sm transition-all duration-500 ${i === 7 ? 'bg-brand-accent' : 'bg-white/10 group-hover:bg-white/20'}`}
                     />
                   ))}
                </div>
              </div>

              {/* Floating Status Card */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-24 -right-6 p-5 glass-panel rounded-2xl border border-brand-secondary/30 shadow-2xl backdrop-blur-3xl"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-secondary/20 flex items-center justify-center">
                       <Zap className="w-5 h-5 text-brand-secondary" />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Engine Status</p>
                       <p className="text-sm font-bold text-white">High-Performance</p>
                    </div>
                 </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Copy & Results */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.4em] mb-6 block drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
                Featured Case Study
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-white leading-tight mb-8">
                Aura AI: Scaling <br /> 
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Intelligent</span> Growth.
              </h2>
              
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">
                We re-engineered the entire core experience for Aura AI, focusing on reducing "Time-to-Value" for new enterprise users. The result was a radical boost in activation rates and a deep-cut in churn.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                 {results.map((r, i) => (
                   <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-brand-accent/30 transition-all duration-500">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">{r.label}</p>
                      <p className={`text-2xl font-heading font-black ${r.color}`}>{r.value}</p>
                   </div>
                 ))}
              </div>

              <ul className="space-y-4 mb-12">
                {['Custom Real-time Analytics Engine', 'Multi-tenant Enterprise Architecture', 'Advanced Framer Motion Orchestration'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-accent" /> {feat}
                  </li>
                ))}
              </ul>

              <button className="flex items-center gap-3 text-white text-xs font-bold uppercase tracking-[0.3em] group">
                Full Technical Breakdown <ArrowUpRight className="w-4 h-4 text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
