import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrambleText from '../components/shared/ScrambleText';
import React, { useRef, useState, useEffect } from 'react';

// Placeholder image paths - assuming the user has these or similar assets
const project1 = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800';
const project2 = 'https://images.unsplash.com/photo-1620825937374-87fc7d6aaf8e?auto=format&fit=crop&q=80&w=800';
const project3 = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800';
const project4 = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800';
const project5 = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800';

const projects = [
  {
    title: 'Aura Fintech',
    category: 'SaaS Platform',
    metrics: '+142% Conversion Rate',
    problem: 'Low onboarding completion rates due to a complex 12-step verification process.',
    result: 'Reduced time-to-onboard by 8m, leading to a massive increase in funded accounts.',
    img: project1,
    path: '/portfolio/fintech-landing',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      'aura_fintech_dashboard_detailed_1775402391780.png'
    ],
    stats: [
      { name: 'Jan', value: 400 }, { name: 'Feb', value: 600 }, { name: 'Mar', value: 800 },
      { name: 'Apr', value: 1200 }, { name: 'May', value: 1500 }, { name: 'Jun', value: 2400 }
    ],
    techLog: [
      'INITIALIZING_CORE_DECOMPRESSION... OK',
      'SCANNING_FINANCIAL_ARCHITECTURE... COMPLETE',
      'ENCRYPTING_MULTI_TENANT_LAYER... SECURE',
      'SYNCING_REAL_TIME_ORCHESTRATOR... ACTIVE'
    ]
  },
  {
    title: 'Nexus AI Studio',
    category: 'AI Startup',
    metrics: '-40% Churn Rate',
    problem: 'Users were dropping off after the first generation due to slow processing speeds.',
    result: 'Improved user retention and increased monthly recurring revenue by 24%.',
    img: project2,
    path: '/portfolio/aether-ai',
    gallery: [
      'https://images.unsplash.com/photo-1620825937374-87fc7d6aaf8e?auto=format&fit=crop&q=80&w=800',
      'nexus_ai_studio_detailed_1775402442656.png'
    ],
    stats: [
      { name: 'Jan', value: 90 }, { name: 'Feb', value: 85 }, { name: 'Mar', value: 70 },
      { name: 'Apr', value: 55 }, { name: 'May', value: 45 }, { name: 'Jun', value: 40 }
    ],
    techLog: [
      'BOOTING_INTELLIGENCE_ENGINE... READY',
      'ORCHESTRATING_NODE_GRAPH... MAPPED',
      'MODEL_QUANTIZATION_V4... APPLIED',
      'LATENCY_COMPENSATION... OPTIMIZED'
    ]
  },
  {
    title: 'Skyward Enterprise',
    category: 'Analytics Dashboard',
    metrics: '100% Mobile Optimized',
    problem: 'Critical data insights were inaccessible to field agents on mobile devices.',
    result: 'Daily active users among executive stakeholders increased from 15% to 85%.',
    img: project3,
    path: '/portfolio/saas-dashboard',
    gallery: [
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
      'skyward_analytics_detailed_v231_1775402488794.png'
    ],
    stats: [
      { name: 'V1', value: 15 }, { name: 'V2', value: 35 }, { name: 'V3', value: 60 },
      { name: 'V4', value: 85 }, { name: 'V5', value: 100 }
    ],
    techLog: [
      'MAP_PROJECTION_V2... RENDERED',
      'DATA_DENSITY_COMPRESSION... SUCCESS',
      'GEO_SPATIAL_ORCHESTRATION... ACTIVE',
      'EXECUTIVE_DASHBOARD_MIRROR... SYNCED'
    ]
  }
];

const ProjectCard = ({ project, isMobile, onNavigate }) => (
  <div className={`group relative flex-shrink-0 overflow-hidden rounded-3xl border border-white/10 hover:border-brand-accent/40 transition-all duration-700 hover:shadow-[0_0_40px_rgba(0,229,255,0.12)] ${
    isMobile ? 'w-full h-[500px] mb-6' : 'w-[85vw] md:w-[45vw] lg:w-[35vw] h-[65vh]'
  }`}>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-brand-accent/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
    <img
      src={project.img}
      alt={project.title}
      className={`absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0 transition-all duration-[2s] ease-out z-0`}
    />
    <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black bg-brand-accent px-3 py-1 rounded-full w-max shadow-[0_0_15px_rgba(37,211,102,0.4)]">
          {project.category}
        </span>
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-accent bg-white/5 border border-brand-accent/30 backdrop-blur-md px-3 py-1 rounded-full w-max animate-pulse">
          {project.metrics}
        </span>
      </div>
      
      <h3 className="text-3xl md:text-5xl font-heading font-black text-white mb-4 group-hover:text-brand-accent transition-colors duration-500 leading-tight tracking-tighter">
        {project.title}
      </h3>

      <div className={`space-y-6 mb-8 transition-all duration-500 delay-100 ${
        isMobile ? 'opacity-100' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
      }`}>
        <div className="flex gap-4">
          <div className="w-1 h-8 bg-red-500/40 shrink-0 mt-1 rounded-full"></div>
          <div>
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">The Problem</span>
            <p className="text-gray-400 text-xs leading-relaxed">{project.problem}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1 h-8 bg-brand-accent/40 shrink-0 mt-1 rounded-full"></div>
          <div>
            <span className="text-[9px] font-black text-brand-accent uppercase tracking-widest block mb-1">Expert Outcome</span>
            <p className="text-gray-200 text-xs font-bold leading-relaxed">{project.result}</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => onNavigate(project.path, project.title)}
        className={`inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:text-brand-accent transition-colors w-max transition-all duration-500 ${
          isMobile ? 'opacity-100' : 'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 delay-200'
        }`}
      >
        View Technical Breakdown <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default function Portfolio() {
  const targetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { openProject } = useInquiry();
  const { scrollYProgress } = useScroll({ target: isMobile ? null : targetRef });

  const handleNavigate = (path, title) => {
    // Find the project object based on path or title
    const project = projects.find(p => p.title === title);
    if (project) {
      openProject(project);
    }
  };
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%']);

  return (
    <section id="portfolio" ref={targetRef} className={`relative z-10 bg-brand-dark ${isMobile ? 'py-20' : 'h-[400vh]'}`}>
      <div className={isMobile ? 'px-6' : 'sticky top-0 h-screen overflow-hidden flex flex-col'}>
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-secondary/10 rounded-full blur-[150px] pointer-events-none" />

        <div className={`relative z-10 flex-shrink-0 ${isMobile ? 'mb-12' : 'px-6 lg:px-16 pt-16 pb-8'}`}>
          <span className="text-brand-accent text-xs font-bold tracking-[0.25em] uppercase mb-3 block">
            Selected Works
          </span>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="md:hidden flex items-center gap-2 text-brand-accent text-[8px] font-bold uppercase tracking-[0.3em] mb-8"
          >
            <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-4 h-[1px] bg-brand-accent"
            />
            Swipe to Explore
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter leading-none">
            <ScrambleText text="CASE" />{' '}
            <ScrambleText text="ANALYSIS." />
          </h2>
        </div>

        {isMobile ? (
          <div className="relative z-10 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 no-scrollbar scroll-smooth">
            {projects.map((project, idx) => (
              <div key={idx} className="w-[85vw] flex-shrink-0 snap-center">
                <ProjectCard project={project} isMobile={true} onNavigate={handleNavigate} />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="relative z-10 flex-1 flex items-center overflow-hidden">
              <motion.div
                style={{ x }}
                className="flex gap-6 pl-6 lg:pl-16 pr-6"
              >
                {projects.map((project, idx) => (
                  <ProjectCard key={idx} project={project} isMobile={false} onNavigate={handleNavigate} />
                ))}
              </motion.div>
            </div>
            <div className="relative z-10 px-6 lg:px-16 pb-6 flex items-center gap-3 flex-shrink-0">
              <div className="w-6 h-[1px] bg-white/30" />
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.25em] font-bold">Scroll to explore</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}


