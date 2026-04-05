import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, BookOpen, ArrowRight, Share2, MessageSquare } from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';

export default function CodexModal() {
  const { isCodexOpen, closeCodex, currentArticle, openInquiry } = useInquiry();

  if (!currentArticle) return null;

  return (
    <AnimatePresence>
      {isCodexOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCodex}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl h-[90vh] bg-brand-dark/95 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col mx-4"
          >
            {/* Close Button - Optimized for Mobile */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 z-[10002]">
              <button 
                onClick={closeCodex}
                className="w-12 h-12 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
              >
                <X className="w-6 h-6 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Header / Top Bar */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Intelligence Analysis</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-none mt-1">{currentArticle.category}</p>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 md:px-16 py-12 custom-scrollbar">
              <div className="max-w-3xl mx-auto">
                {/* Meta Metadata */}
                <div className="flex flex-wrap items-center gap-6 mb-10 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-brand-accent" /> {currentArticle.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-brand-accent" /> {currentArticle.readTime}
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="w-1 h-1 rounded-full bg-gray-700" />
                     Author: Cordex Engineering
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-tight tracking-tighter mb-10">
                  {currentArticle.title}
                </h2>

                {/* Main Content (Simulated for this MVP) */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-8">
                    {currentArticle.excerpt}
                  </p>
                  
                  <div className="h-[1px] w-full bg-gradient-to-r from-brand-accent/40 via-transparent to-transparent mb-8" />
                  
                  <p className="text-gray-400 leading-relaxed mb-6 italic border-l-2 border-brand-accent/30 pl-6">
                    "In the modern digital landscape, the distance between a user's intent and their final decision is measured in milliseconds. Our strategy focuses on bridging this gap through high-performance engineering."
                  </p>

                  <p className="text-gray-400 leading-relaxed mb-8">
                    The core challenge for many SaaS platforms isn't just functionality—it's the psychological impact of latency and visual friction. When a system feels slow, user trust erodes before they even evaluate the product's value. 
                  </p>

                  <h4 className="text-xl font-bold text-white mb-4">Key Takeaways:</h4>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Strategic friction used as a quality lead filter.',
                      'The direct correlation between LCP (Largest Contentful Paint) and churn rate.',
                      'Cinematic UI as a trust-building mechanism for high-ticket sales.',
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-4 text-gray-400">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="p-8 md:p-12 rounded-[2rem] bg-brand-accent/5 border border-brand-accent/20 my-16 text-center">
                    <h4 className="text-2xl font-black text-white mb-4 italic tracking-tight">Ready to implement these insights?</h4>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm">
                      We help startups transform these high-level editorial strategies into scalable React/Next.js infrastructure.
                    </p>
                    <button 
                      onClick={() => {
                        console.log(`[CodexViewer] Bridging to Inquiry: ${currentArticle.title}`);
                        closeCodex();
                        setTimeout(() => openInquiry(`Consultation: ${currentArticle.title}`), 400);
                      }}
                      className="px-10 py-4 bg-brand-accent text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(0,229,255,0.2)]"
                    >
                      Start Architecture Strategy
                    </button>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-between items-center pt-10 border-t border-white/5 text-[10px] font-bold uppercase tracking-widest">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                      <Share2 className="w-3 h-3" /> Share
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                      <MessageSquare className="w-3 h-3" /> Discuss
                    </button>
                  </div>
                  <button onClick={closeCodex} className="text-brand-accent flex items-center gap-2 group">
                    Exit Viewer <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
