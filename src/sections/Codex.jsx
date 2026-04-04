import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';

const insights = [
  {
    date: 'April 2026',
    title: 'The Psychology of High-Ticket SaaS Conversions',
    excerpt: 'Why minimalist UI and strategic friction can actually lead to higher quality lead generation for enterprise platforms.',
    category: 'Conversion',
    readTime: '5 min read'
  },
  {
    date: 'March 2026',
    title: 'Next.js 15 & The Future of Zero-Latency Web',
    excerpt: 'Exploration of partial pre-rendering and its impact on first-input delay for data-heavy startup dashboards.',
    category: 'Engineering',
    readTime: '8 min read'
  },
  {
    date: 'February 2026',
    title: 'Unit Economics: Building for Retention First',
    excerpt: 'How design systems can directly impact your churn rate by reducing cognitive load in complex SaaS environments.',
    category: 'Product Strategy',
    readTime: '6 min read'
  }
];

export default function Codex() {
  return (
    <section id="codex" className="py-24 bg-brand-dark overflow-hidden border-b border-white/5 relative">
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             <span className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block flex items-center gap-2">
               <BookOpen className="w-3 h-3" /> The Codex
             </span>
             <h2 className="text-3xl md:text-5xl lg:text-7xl font-heading font-black text-white tracking-tighter leading-tight">
               Editorial <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Insights.</span>
             </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
             <button className="px-8 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-300">
               View All Intelligence
             </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {insights.map((insight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:border-brand-accent/30 transition-all duration-500 flex flex-col relative"
            >
              {/* Top Accent */}
              <div className="absolute top-0 right-10 w-[1px] h-12 bg-gradient-to-b from-brand-accent/40 to-transparent group-hover:h-20 transition-all duration-500" />
              
              <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{insight.date}</span>
                <span className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-[9px] font-bold uppercase tracking-tighter rounded-full">{insight.category}</span>
              </div>

              <h4 className="text-xl md:text-2xl font-heading font-bold text-white mb-6 group-hover:text-brand-accent transition-colors leading-tight">
                {insight.title}
              </h4>
              
              <p className="text-gray-400 font-light leading-relaxed text-sm mb-10 flex-1">
                {insight.excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{insight.readTime}</span>
                <button className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-brand-accent transition-colors">
                  Read Analysis <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden mt-12 text-center">
           <button className="w-full py-4 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl">
             View All Intelligence
           </button>
        </div>
      </div>
    </section>
  );
}
