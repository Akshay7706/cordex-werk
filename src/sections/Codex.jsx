import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, X, Clock, Calendar } from 'lucide-react';

const insights = [
  {
    date: 'April 2026',
    title: 'The Psychology of High-Ticket SaaS Conversions',
    excerpt: 'Why minimalist UI and strategic friction can actually lead to higher quality lead generation for enterprise platforms.',
    content: "In the world of high-ticket SaaS, more leads don't always mean more revenue. We explore why 'Strategic Friction'—the act of intentional qualifying steps in a user journey—actually increases the lifetime value (LTV) of a customer. Modern startups often optimize for the lowest barrier to entry, but for platforms with a $5k+ ACV, the psychology shifts towards trust, authority, and exclusivity. By implementing high-fidelity visual storytelling and precise data anchoring, we can filter out low-intent traffic while doubling the conversion rate of ideal client profiles.",
    category: 'Conversion',
    readTime: '5 min read'
  },
  {
    date: 'March 2026',
    title: 'Next.js 15 & The Future of Zero-Latency Web',
    excerpt: 'Exploration of partial pre-rendering and its impact on first-input delay for data-heavy startup dashboards.',
    content: "The release of Next.js 15 marks a pivotal shift in how we handle dynamic content scaling. Partial Pre-rendering (PPR) allows us to serve static shells with dynamic holes, effectively eliminating the trade-off between SEO and personalization. For dashboard-heavy SaaS apps, this means users see their personalized data instantly without the traditional 'loading spinner' fatigue. We've measured a 42% improvement in user retention on platforms that implement these zero-latency architectures, proving that speed is the ultimate feature.",
    category: 'Engineering',
    readTime: '8 min read'
  },
  {
    date: 'February 2026',
    title: 'Unit Economics: Building for Retention First',
    excerpt: 'How design systems can directly impact your churn rate by reducing cognitive load in complex SaaS environments.',
    content: "Design systems are often viewed as a tool for developers, but their true impact is on the balance sheet. A cohesive, logic-driven UI reduces the cognitive load on users, directly correlating to a decrease in involuntary churn. When users feel a sense of 'Digital Weightlessness'—where workflows are intuitive and friction-free—they are 3x more likely to expand their seat count. We analyze how modular component architecture and consistent visual feedback loops create the 'Stickiness' that venture capitalists look for in Series A startups.",
    category: 'Product Strategy',
    readTime: '6 min read'
  }
];

function AnalysisModal({ insight, onClose }) {
  if (!insight) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[999] bg-[#050B14]/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 cursor-pointer transition-all duration-500"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#080E17] border border-white/10 rounded-[2.5rem] overflow-hidden relative cursor-default max-h-[85vh] flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)] z-[1000]"
      >
        {/* Top Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-accent via-brand-secondary to-transparent z-[1010]" />

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors z-[1020] group flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest bg-black/40 px-5 py-2.5 rounded-full border border-white/5 backdrop-blur-md hover:border-brand-accent/40"
        >
          Exit <X className="w-4 h-4" />
        </button>

        <div className="p-8 md:p-16 overflow-y-auto custom-scrollbar relative z-[1005]">
          <div className="flex items-center gap-6 mb-8">
            <span className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-[10px] font-black uppercase tracking-tighter rounded-full border border-brand-accent/20">
              {insight.category}
            </span>
            <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              <Clock className="w-3 h-3" /> {insight.readTime}
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              <Calendar className="w-3 h-3" /> {insight.date}
            </div>
          </div>

          <h3 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight mb-10 tracking-tighter">
            {insight.title}
          </h3>

          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-brand-accent font-light leading-relaxed mb-10 opacity-90 italic border-l-2 border-brand-accent pl-6">
              {insight.excerpt}
            </p>
            <div className="text-gray-300 text-lg font-light leading-relaxed space-y-6">
              {insight.content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent to-brand-secondary p-[1px]">
                 <div className="w-full h-full rounded-full bg-brand-dark flex items-center justify-center text-white text-xs font-black">CW</div>
              </div>
              <div>
                <div className="text-white text-xs font-bold uppercase tracking-widest">Cordex Editorial</div>
                <div className="text-gray-500 text-[10px] uppercase tracking-tighter">Engineering Strategy Team</div>
              </div>
            </div>
            
            <button 
              onClick={() => {
                onClose();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-brand-accent transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Discuss This Strategy
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Codex() {
  const [selectedInsight, setSelectedInsight] = useState(null);

  return (
    <section id="codex" className="py-24 bg-brand-dark overflow-hidden border-b border-white/5 relative">
      <AnimatePresence>
        {selectedInsight && (
          <AnalysisModal 
            insight={selectedInsight} 
            onClose={() => setSelectedInsight(null)} 
          />
        )}
      </AnimatePresence>

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
                <button 
                  onClick={() => setSelectedInsight(insight)}
                  className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-brand-accent transition-colors"
                >
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
