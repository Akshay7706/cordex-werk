import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrambleText from '../components/shared/ScrambleText';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import { Reveal } from '../components/shared/Reveal';

export default function Portfolio() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // 5 cards × 440px wide + gaps, shift the track from 0 to -(total - 100vw)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%']);

  return (
    <section id="portfolio" ref={targetRef} className="relative z-10 bg-brand-dark h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* Background decorations */}
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-secondary/10 rounded-full blur-[150px] pointer-events-none" />

        {/* ── Section Header ── */}
        <div className="relative z-10 px-6 lg:px-16 pt-16 pb-8 flex-shrink-0">
          <Reveal>
            <span className="text-brand-accent text-xs font-bold tracking-[0.25em] uppercase mb-3 block">
              Selected Works
            </span>
          </Reveal>
          <Reveal delay={0.4}>
            <h2 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter leading-none">
              <ScrambleText text="DIGITAL" />{' '}
              <ScrambleText text="ARCHITECTURE." />
            </h2>
          </Reveal>
        </div>

        {/* ── Horizontal Scroll Track ── */}
        <div className="relative z-10 flex-1 flex items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex gap-6 pl-6 lg:pl-16 pr-6"
          >
            {projectsData.map((project, idx) => (
              <div
                key={idx}
                className="group relative flex-shrink-0 w-[80vw] md:w-[38vw] h-[55vh] overflow-hidden rounded-2xl border border-white/8 hover:border-brand-accent/40 transition-all duration-700 hover:shadow-[0_0_40px_rgba(0,229,255,0.12)]"
              >
                {/* Image */}
                <img
                  src={project.img}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2s] ease-out z-0 grayscale-[40%] group-hover:grayscale-0"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Card content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-brand-accent px-3 py-1 rounded-full w-max mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-heading font-black text-white mb-2 uppercase tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-light mb-6 line-clamp-2 max-w-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex gap-4">
                    <Link
                      to={`/case-study/${project.id}`}
                      className="inline-flex items-center gap-2 text-white font-bold text-[10px] tracking-widest uppercase py-3 px-6 bg-white/10 rounded-full hover:bg-brand-accent hover:text-black transition-all duration-300"
                    >
                      View Mission <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
