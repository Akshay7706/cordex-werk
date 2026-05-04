import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';
import { ArrowUpRight, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

// Fallback static data if Supabase is empty
const staticCases = [
  { id: 's1', title: 'FinTech Platform Revamp', client: 'FinCo Ltd.', summary: 'Redesigned core dashboard and integrated real‑time analytics, boosting user engagement by 42%.', image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000' },
  { id: 's2', title: 'E‑Commerce Growth Engine', client: 'ShopSphere', summary: 'Built a custom storefront with headless CMS, resulting in a 35% increase in conversion rate.', image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000' },
  { id: 's3', title: 'SaaS Landing Experience', client: 'Cloudify.io', summary: 'Implemented glassmorphic UI that led to a 28% lift in trial sign‑ups.', image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000' },
  { id: 's4', title: 'Healthcare Portal', client: 'MedLink', summary: 'Streamlined patient onboarding flow and modernized the UI for better accessibility.', image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000' },
];

const CaseStudies = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      const { data } = await supabase
        .from('case_studies')
        .select('*')
        .eq('published', true)
        .order('sort_order')
        .order('created_at', { ascending: false });
      setCases(data && data.length > 0 ? data : staticCases);
      setLoading(false);
    };
    fetchCases();
  }, []);

  return (
    <Layout>
      <SEO 
        title="Case Studies | Kreato Space" 
        description="Explore Kreato Space's portfolio of successful web projects — from fintech dashboards to SaaS landing pages."
        url="https://kreatospace.com/case-studies"
      />
      <div className="pt-32 pb-20 bg-brand-bg min-h-screen">
        <div className="container-large px-6">
          <header className="mb-20">
            <span className="text-brand-accent uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Proof of Concept</span>
            <h1 className="text-6xl md:text-[8vw] font-sans font-black tracking-tighter text-brand-primary uppercase leading-none">
              Case <br /> <span className="font-serif italic font-light lowercase text-brand-primary/50">Studies</span>
            </h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[400px]">
            {cases.map((caseItem, i) => {
              // Create a bento grid pattern based on index
              const isLarge = i === 0 || i === 3;
              const gridClass = isLarge 
                ? 'md:col-span-6 lg:col-span-8' 
                : 'md:col-span-3 lg:col-span-4';

              return (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`${gridClass} relative group overflow-hidden rounded-[2rem] bg-brand-surface border border-brand-primary/10`}
                >
                  <img 
                    src={caseItem.image_url} 
                    alt={caseItem.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center border border-brand-accent/20">
                        <FolderOpen size={14} className="text-brand-accent" />
                      </div>
                      <span className="text-xs font-sans font-bold uppercase tracking-widest text-brand-primary/60">{caseItem.client}</span>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-primary mb-4 group-hover:text-brand-accent transition-colors">
                      {caseItem.title}
                    </h2>
                    
                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                      <p className="text-sm text-brand-primary/60 mb-6 font-sans leading-relaxed max-w-sm">
                        {caseItem.summary || caseItem.results}
                      </p>
                      <button className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-widest">
                        Read Full Story <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CaseStudies;
