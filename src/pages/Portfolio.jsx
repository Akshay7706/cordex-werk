import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data if DB is empty
  const staticProjects = [
    { id: 'p1', title: 'Aether Dashboard', industry: 'FinTech / SaaS', summary: 'High-frequency trading visualization platform.', image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000' },
    { id: 'p2', title: 'Luminara App', industry: 'Mobile / Lifestyle', summary: 'Meditation and wellness platform for creative professionals.', image_url: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=1000' },
    { id: 'p3', title: 'Nexus Architecture', industry: 'Editorial / Web', summary: 'Digital showcase for an international architecture studio.', image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000' },
    { id: 'p4', title: 'TechFlow Identity', industry: 'Branding / UI', summary: 'Complete digital rebrand for a cloud infrastructure startup.', image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000' },
    { id: 'p5', title: 'Orbit Commerce', industry: 'E-commerce', summary: 'Next-generation shopping experience for luxury goods.', image_url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1000' },
    { id: 'p6', title: 'Chronos Magazine', industry: 'Editorial / Blog', summary: 'Interactive magazine focused on future technology trends.', image_url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000' }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .eq('published', true)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });
        
        if (!error && data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(staticProjects);
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setProjects(staticProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <Layout>
      <SEO 
        title="Portfolio | Kreato Space" 
        description="Explore our curated portfolio of premium digital products and brand experiences."
        url="https://kreatospace.com/portfolio"
      />
      <section className="section-padding pt-40">
        <div className="container-large">
          <div className="mb-24 max-w-3xl">
            <span className="text-brand-accent uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Our Work</span>
            <h1 className="text-[12vw] font-sans font-black leading-[0.85] tracking-tighter uppercase mb-12">
              Selected <br /> <span className="font-serif italic font-light normal-case text-brand-primary/50">Excellence</span>
            </h1>
            <p className="text-2xl md:text-3xl text-brand-primary/80 font-serif leading-relaxed">
              Explore our curated portfolio of digital products and brand experiences that have helped our clients win.
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center text-brand-primary/30 font-sans animate-pulse">Loading gallery...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id || project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i % 2 * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link to="/case-studies">
                    <div className="relative aspect-[4/3] rounded-none overflow-hidden bg-brand-primary/5 border border-brand-primary/20 mb-8">
                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                        src={project.image_url} 
                        alt={project.title} 
                        width="800"
                        height="600"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-brand-bg/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-8 right-8 w-12 h-12 rounded-none bg-brand-primary flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <ArrowUpRight size={24} className="text-brand-bg" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-brand-accent mb-2">{project.industry || project.category}</p>
                          <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary leading-none group-hover:italic transition-all duration-300">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                      <p className="mt-4 text-brand-primary/50 font-sans leading-relaxed max-w-md">
                        {project.summary || project.desc}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
