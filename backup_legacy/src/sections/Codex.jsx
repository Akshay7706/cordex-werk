import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useInquiry } from '../context/InquiryContext';

const insights = [
  {
    date: 'May 2026',
    title: "Why your startup doesn't need a mobile app (yet)",
    excerpt: 'The case for Progressive Web Apps (PWAs) and high-performance web experiences as the primary growth vehicle for early-stage startups.',
    category: 'Product Strategy',
    readTime: '6 min read'
  },
  {
    date: 'May 2026',
    title: 'The ROI of High-End UI in SaaS',
    excerpt: 'How premium design systems directly translate into user trust, higher conversion rates, and reduced customer churn.',
    category: 'Design',
    readTime: '5 min read'
  },
  {
    date: 'April 2026',
    title: 'Technical SEO for Indian Startups: A 2026 Guide',
    excerpt: 'Beyond keywords: Optimizing for Core Web Vitals and local search intent in a rapidly evolving digital market.',
    category: 'Growth',
    readTime: '8 min read'
  },
  {
    date: 'April 2026',
    title: "The 'Anti-Template' Philosophy: Why custom code wins",
    excerpt: 'Why generic builders are killing your brand identity and how custom-engineered solutions provide a lasting competitive advantage.',
    category: 'Engineering',
    readTime: '7 min read'
  },
  {
    date: 'March 2026',
    title: 'Scaling from MVP to Enterprise: The Infrastructure Roadmap',
    excerpt: 'Building a foundation that scales: From simple deployments to complex multi-tenant architectures without technical debt.',
    category: 'Engineering',
    readTime: '10 min read'
  },
  {
    date: 'March 2026',
    title: 'Micro-interactions: The secret to user retention',
    excerpt: 'The psychological impact of subtle animations and feedback loops in maintaining user engagement in complex dashboards.',
    category: 'UX Design',
    readTime: '4 min read'
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
                <button 
                  onClick={() => openCodex(insight)}
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
