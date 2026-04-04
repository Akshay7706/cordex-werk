import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrambleText from '../components/shared/ScrambleText';
import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';

// Placeholder image paths - assuming the user has these or similar assets
const project1 = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800';
const project2 = 'https://images.unsplash.com/photo-1620825937374-87fc7d6aaf8e?auto=format&fit=crop&q=80&w=800';
const project3 = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800';
const project4 = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=800';
const project5 = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800';

const projects = [
  {
    title: 'SaaS Analytics Dashboard',
    category: 'Web App',
    description: 'A comprehensive admin panel featuring real-time data visualization, user management, and seamless performance.',
    img: project1,
    link: '/portfolio/saas-dashboard'
  },
  {
    title: 'Aether AI Studio',
    category: 'AI Tool Website',
    description: 'A dark-themed platform empowering creators to generate visuals using state-of-the-art machine learning models.',
    img: project2,
    link: '/portfolio/aether-ai'
  },
  {
    title: 'FinTech Startup Landing',
    category: 'Website Structure',
    description: 'Conversion-driven landing page for a modern banking solution with integrated pricing modules.',
    img: project3,
    link: '/portfolio/fintech-landing'
  },
  {
    title: 'NOVA Hype E-Commerce',
    category: 'E-Commerce Platform',
    description: 'High-end monochrome retail experience featuring interactive sliding cart mechanics and seamless checkout mockups.',
    img: project4,
    link: '/portfolio/nova-store'
  },
  {
    title: 'Celestial 3D Engine',
    category: 'Interactive Experience',
    description: 'A cinematic, physics-based 3D environment powered by React Three Fiber and custom GLSL nebula shaders.',
    img: project5,
    link: '#'
  }
];

const ProjectCard = ({ project, isMobile }) => (
  <div className={`group relative flex-shrink-0 overflow-hidden rounded-2xl border border-white/8 hover:border-brand-accent/40 transition-all duration-700 hover:shadow-[0_0_40px_rgba(0,229,255,0.12)] ${
    isMobile ? 'w-full h-[400px] mb-6' : 'w-[80vw] md:w-[38vw] h-[55vh]'
  }`}>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-brand-accent/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
    <img
      src={project.img}
      alt={project.title}
      className={`absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2s] ease-out z-0`}
    />
    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
      <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-brand-accent px-3 py-1 rounded-full w-max mb-3">
        {project.category}
      </span>
      <h3 className="text-2xl md:text-3xl font-heading font-black text-white mb-3 group-hover:text-brand-accent transition-colors duration-500 leading-tight">
        {project.title}
      </h3>
      <p className={`text-gray-400 text-xs md:text-sm mb-5 font-light leading-relaxed max-w-sm transition-all duration-500 ${
        isMobile ? 'opacity-100' : 'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0'
      }`}>
        {project.description}
      </p>
      <Link
        to={project.link}
        className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-brand-accent transition-colors w-max transition-all duration-500 ${
          isMobile ? 'opacity-100' : 'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 delay-100'
        }`}
      >
        Explore Project <ExternalLink className="w-4 h-4" />
      </Link>
    </div>
  </div>
);

export default function Portfolio() {
  const targetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({ target: isMobile ? null : targetRef });

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
          <h2 className="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter leading-none">
            <ScrambleText text="DIGITAL" />{' '}
            <ScrambleText text="ARCHITECTURE." />
          </h2>
        </div>

        {isMobile ? (
          <div className="relative z-10 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 no-scrollbar scroll-smooth">
            {projects.map((project, idx) => (
              <div key={idx} className="w-[85vw] flex-shrink-0 snap-center">
                <ProjectCard project={project} isMobile={true} />
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
                  <ProjectCard key={idx} project={project} isMobile={false} />
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


