import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import { Reveal, RevealStagger, RevealItem } from '../components/shared/Reveal';
import { ArrowLeft, ExternalLink, Cpu, Layout, Target } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { useEffect } from 'react';

export default function CaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-heading font-black mb-6">Mission Data Missing</h1>
        <Link to="/" className="text-brand-accent hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Return to Base
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white bg-grain">
      <Navbar />
      
      {/* ── Hero Reveal ── */}
      <section className="relative h-[70vh] flex items-end justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img src={project.img} alt={project.title} className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 lg:px-16 pb-20 relative z-10">
          <Reveal>
            <span className="text-brand-accent text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              {project.category}
            </span>
          </Reveal>
          <Reveal delay={0.4}>
            <h1 className="text-5xl md:text-8xl font-heading font-black tracking-tighter leading-none uppercase">
              {project.title}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ── Technical Overview ── */}
      <section className="py-24 container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-white/5">
        <div className="lg:col-span-2 space-y-16">
          <RevealStagger delay={0.2}>
            <RevealItem>
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-6 h-6 text-brand-accent" />
                <h2 className="text-xl font-bold tracking-widest uppercase">The Challenge</h2>
              </div>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl">
                {project.challenge}
              </p>
            </RevealItem>
            
            <RevealItem>
              <div className="flex items-center gap-4 mt-16 mb-6">
                <Layout className="w-6 h-6 text-brand-accent" />
                <h2 className="text-xl font-bold tracking-widest uppercase">The Architecture</h2>
              </div>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl">
                {project.solution}
              </p>
            </RevealItem>
          </RevealStagger>
        </div>

        <aside className="space-y-12">
          <Reveal>
            <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6 border-b border-white/5 pb-2">The Arsenal</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-brand-accent uppercase tracking-tighter">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6 border-b border-white/5 pb-2">Mission Success</h3>
            <div className="space-y-6">
              {project.results.map(res => (
                <div key={res.label}>
                   <p className="text-3xl font-heading font-black text-white">{res.value}</p>
                   <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{res.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.5}>
             <a 
               href={project.link} 
               className="group flex items-center justify-between w-full p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-brand-accent transition-all duration-300"
             >
                <span className="text-xs font-bold uppercase tracking-widest group-hover:text-brand-accent">Initialize Interface</span>
                <ExternalLink className="w-4 h-4 group-hover:text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </a>
          </Reveal>
        </aside>
      </section>

      {/* ── Fullscreen Showcase ── */}
      <section className="pb-32 px-6 lg:px-16 container mx-auto">
         <Reveal delay={0.2} width="100%">
            <div className="aspect-[21/9] rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative group">
               <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" />
               <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors" />
            </div>
         </Reveal>
      </section>

      {/* ── Footer Nav ── */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-16 flex justify-between items-center">
            <Link to="/" className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
              <span className="text-xs font-bold uppercase tracking-widest">Back to Mission Control</span>
            </Link>
            
            <div className="text-[10px] text-gray-700 font-bold tracking-widest uppercase">
              CORDEX WERK &copy; 2026 // CASE STUDY {id.toUpperCase()}
            </div>
        </div>
      </section>
    </div>
  );
}
