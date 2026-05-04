import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { StaggerTestimonials } from '../components/ui/stagger-testimonials';
import { LogoCloud } from '../components/sections/LogoCloud';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

const Landing = () => {
  const [featuredProject, setFeaturedProject] = useState(null);
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200');
  const [services, setServices] = useState([
    { title: 'Website Development', description: 'Custom engineered web applications built for speed.', features: ['React & Next.js', 'Performance First'] },
    { title: 'Mobile-First Design', description: 'User-centric interfaces that feel native on every device.', features: ['Responsive UI', 'Interaction Design'] },
    { title: 'Performance Optimization', description: 'Converting seconds into revenue with lightning speed.', features: ['SEO Strategy', 'Speed Audits'] }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Featured Project
        const { data: project } = await supabase
          .from('case_studies')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (project) setFeaturedProject(project);

        // Fetch Hero Image Setting
        const { data: setting } = await supabase
          .from('site_settings')
          .select('value')
          .eq('id', 'hero_image')
          .maybeSingle();
        
        if (setting?.value) setHeroImage(setting.value);

        // Fetch Services
        const { data: servicesData } = await supabase
          .from('services')
          .select('*')
          .order('sort_order');
        
        if (servicesData && servicesData.length > 0) setServices(servicesData);
      } catch (err) {
        console.error('Error fetching landing data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <SEO 
        title="Kreato Space | Premium Web Development Agency" 
        description="High-performance, conversion-optimized digital experiences engineered for the next generation of industry leaders."
        url="https://kreatospace.com"
      />
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="container-large px-6 md:px-12 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-12 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-[15vw] md:text-[8rem] lg:text-[10rem] font-sans font-black leading-[0.85] text-brand-primary mb-8 md:mb-12 tracking-tighter uppercase">
              We build <br />
              <span className="font-serif italic font-light text-brand-accent normal-case tracking-normal">websites</span>
            </h1>
            <p className="text-xl md:text-3xl text-brand-primary/80 font-serif leading-relaxed max-w-2xl mb-8 md:mb-12">
              High-performance, conversion-optimized digital experiences engineered for the next generation of industry leaders.
            </p>
            <div className="flex lg:hidden flex-wrap justify-center gap-6">
              <Link to="/contact" className="btn-primary">Start a project</Link>
              <Link to="/portfolio" className="btn-secondary">See our work</Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <img 
                src={heroImage} 
                alt="Kreato Space Digital Agency" 
                width="800"
                height="600"
                className="w-full h-auto object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-accent/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px]" />
            <div className="hidden lg:flex flex-wrap justify-start gap-6 mt-12">
              <Link to="/contact" className="btn-primary">Start a project</Link>
              <Link to="/portfolio" className="btn-secondary">See our work</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <LogoCloud />

      {/* 3. SERVICES PREVIEW */}
      <section className="section-padding">
        <div className="container-large">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
            <div className="max-w-3xl">
              <span className="text-brand-accent uppercase tracking-[0.2em] font-bold text-sm mb-6 block">Our Expertise</span>
              <h2 className="text-5xl md:text-8xl font-serif font-medium tracking-tighter leading-[0.9]">
                Comprehensive digital <br /> solutions <span className="font-sans font-black uppercase text-brand-accent italic">for growth</span>
              </h2>
            </div>
            <Link to="/services" className="text-brand-primary/80 hover:text-brand-accent flex items-center gap-2 group transition-colors uppercase font-bold tracking-widest text-sm">
              Explore all services
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group w-full h-[360px] flex flex-col items-center mt-10 md:mt-0"
              >
                <div className="absolute top-[20px] w-[95%] h-[180px] bg-brand-bg border border-brand-primary/10 rounded-[35px] z-0 transition-all duration-500 ease-in-out group-hover:h-[320px] group-hover:rounded-b-[25px] shadow-lg">
                  <div className="absolute w-full px-8 opacity-0 top-[150px] group-hover:top-[210px] group-hover:opacity-100 transition-all duration-500 ease-in-out flex flex-col items-center pointer-events-none group-hover:pointer-events-auto">
                    <ul className="flex flex-col gap-4 w-full">
                      {service.features?.map(f => (
                        <li key={f} className="flex items-center gap-3 text-sm text-brand-primary/70 font-sans">
                          <div className="w-1.5 h-1.5 shrink-0 bg-brand-accent rounded-full shadow-[0_0_8px_rgba(230,0,0,0.8)]" /> 
                          <span className="text-left leading-tight">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="relative w-full h-[200px] bg-brand-surface border border-brand-primary/20 rounded-[25px] z-10 transition-all duration-400 ease-in-out flex flex-col items-center justify-center p-6 text-center shadow-2xl group-hover:-translate-y-2 group-hover:border-brand-accent group-hover:bg-brand-primary/5 cursor-pointer">
                  <h3 className="text-xl md:text-2xl font-serif font-bold mb-3 text-brand-primary group-hover:text-brand-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-brand-primary/60 font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECT */}
      <section className="pb-32 px-6 overflow-hidden">
        <div className="container-large">
          <div className="relative bg-brand-surface rounded-[3rem] md:rounded-[5rem] border border-white/5 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="grid lg:grid-cols-2 gap-0 items-stretch min-h-[600px]">
              {/* Text Side */}
              <div className="p-10 md:p-20 flex flex-col justify-center relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-8 h-px bg-brand-accent" />
                  <span className="text-brand-accent uppercase tracking-[0.4em] font-bold text-xs">Featured Project</span>
                </div>
                
                <h2 className="text-5xl md:text-8xl font-sans font-black tracking-tighter uppercase leading-[0.85] mb-8">
                  {featuredProject?.title ? featuredProject.title.split(' ')[0] : 'The Aether'} <br />
                  <span className="font-serif italic font-light lowercase text-brand-primary/40">
                    {featuredProject?.title ? featuredProject.title.split(' ').slice(1).join(' ') : 'dashboard'}
                  </span>
                </h2>
                
                <p className="text-xl text-brand-primary/60 font-sans leading-relaxed mb-12 max-w-md">
                  {featuredProject ? (featuredProject.summary || featuredProject.results) : 'A data-intensive visualization platform for high-frequency trading firms.'}
                </p>
                
                <Link to="/case-studies" className="inline-flex items-center gap-4 text-brand-primary font-sans font-bold group/btn">
                  <div className="w-14 h-14 rounded-full border border-brand-primary/20 flex items-center justify-center group-hover/btn:bg-brand-accent group-hover/btn:border-brand-accent group-hover/btn:text-brand-bg transition-all duration-500 shadow-lg">
                    <ArrowUpRight className="w-6 h-6 group-hover/btn:rotate-45 transition-transform duration-500" />
                  </div>
                  <span className="uppercase tracking-widest text-sm">Explore Project</span>
                </Link>
              </div>

              {/* Image Side */}
              <div className="relative min-h-[400px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-white/5">
                <img 
                  src={featuredProject?.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200'} 
                  alt="Featured Project"
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-surface via-transparent to-transparent hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-surface via-transparent to-transparent lg:hidden" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding overflow-hidden">
        <div className="container-large">
          <div className="text-center mb-24">
            <span className="text-brand-accent uppercase tracking-[0.3em] font-bold text-sm mb-4 block">Testimonials</span>
            <h2 className="text-5xl md:text-[6vw] font-sans font-black uppercase tracking-tighter leading-none">Client Success</h2>
          </div>
          <StaggerTestimonials />
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container-large bg-brand-accent p-8 md:p-32 rounded-3xl md:rounded-[3rem] text-center overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-[10vw] font-sans font-black text-brand-primary tracking-tighter uppercase leading-[0.85] mb-8 md:mb-12">
              Let’s build <br />
              <span className="font-serif italic font-light normal-case opacity-80">together</span>
            </h2>
            <Link to="/contact" className="btn-primary bg-brand-primary text-brand-accent hover:bg-brand-surface hover:text-brand-bg inline-flex py-4 md:py-6 px-8 md:px-12 text-lg md:text-xl">
              Start a project
            </Link>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/10" />
        </div>
      </section>
    </Layout>
  );
};

export default Landing;
