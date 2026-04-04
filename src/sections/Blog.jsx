import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Terminal } from 'lucide-react';
import { Reveal, RevealStagger, RevealItem } from '../components/shared/Reveal';

const posts = [
  {
    title: 'The Future of 3D Web Engineering',
    category: 'Architecture',
    date: 'APR 04, 2026',
    excerpt: 'Exploring the intersection of R3F and custom GLSL shaders for next-gen immersive agency experiences.',
  },
  {
    title: 'Scaling SaaS Beyond 10k Users',
    category: 'Systems',
    date: 'MAR 28, 2026',
    excerpt: 'How we leverage Supabase and edge-caching to deliver sub-100ms response times globally.',
  },
  {
    title: 'AI Interactivity in Modern UX',
    category: 'User Experience',
    date: 'MAR 15, 2026',
    excerpt: 'Why generative UI is the next frontier for conversion-driven landing pages and digital products.',
  }
];

export default function Blog() {
  return (
    <section id="blog" className="py-28 relative z-10 bg-brand-dark border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-16">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <Reveal>
            <span className="text-brand-accent text-xs font-bold tracking-[0.25em] uppercase mb-3 block">
              Insights
            </span>
            <h2 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter leading-none">
              Knowledge<br />Matrix.
            </h2>
          </Reveal>
          
          <Reveal delay={0.4}>
             <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:border-brand-accent hover:text-white transition-all duration-300">
                View All Intel
             </button>
          </Reveal>
        </div>

        <RevealStagger delay={0.2} staggerDelay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <RevealItem key={idx}>
                <div 
                  className="group p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-brand-accent/30 transition-all duration-500 relative overflow-hidden h-full flex flex-col"
                >
                   {/* Decorative corner icon */}
                   <Terminal className="absolute top-8 right-8 w-12 h-12 text-white/[0.02] group-hover:text-brand-accent/5 transition-colors pointer-events-none" />
                   
                   <div className="mb-6 flex items-center justify-between">
                     <span className="px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-[10px] font-bold text-brand-accent uppercase tracking-tighter">
                       {post.category}
                     </span>
                     <div className="flex items-center gap-2 text-gray-600 text-[10px] font-bold">
                       <Calendar className="w-3 h-3" />
                       {post.date}
                     </div>
                   </div>

                   <h3 className="text-2xl font-heading font-black text-white mb-4 group-hover:text-brand-accent transition-colors leading-tight">
                     {post.title}
                   </h3>
                   
                   <p className="text-gray-500 text-sm font-light leading-relaxed mb-10 flex-grow">
                     {post.excerpt}
                   </p>

                   <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between group-hover:border-brand-accent/10 transition-colors">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Read Protocol</span>
                      <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
                   </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </RevealStagger>
      </div>
    </section>
  );
}
