import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout as LayoutIcon, Zap, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';

const Services = () => {
  const services = [
    {
      id: 'web-dev',
      title: 'Website Development',
      icon: <Code size={48} />,
      desc: 'We architect and build complex web applications that are as powerful as they are beautiful. Using the latest technologies like React and Next.js, we ensure your site is fast, secure, and ready to scale.',
      benefits: ['Custom CMS Integration', 'Third-party API Connectivity', 'Headless Architectures', 'Enterprise-grade Security']
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      icon: <LayoutIcon size={48} />,
      desc: 'Design is not just how it looks, but how it works. Our design philosophy centers on the user journey, creating intuitive flows that minimize friction and maximize engagement.',
      benefits: ['High-fidelity Prototyping', 'User Research & Testing', 'Design Systems', 'Micro-interactions']
    },
    {
      id: 'landing-pages',
      title: 'Landing Pages',
      icon: <Target size={48} />,
      desc: 'Conversion is the primary metric for every landing page we build. We combine psychology, copywriting, and design to guide visitors toward action.',
      benefits: ['A/B Testing Ready', 'Conversion Rate Optimization', 'Copywriting Support', 'Analytics Tracking']
    },
    {
      id: 'performance',
      title: 'Performance Optimization',
      icon: <Zap size={48} />,
      desc: 'Speed is a feature. We audit and optimize existing sites to meet the highest performance standards, improving SEO and user retention.',
      benefits: ['Core Web Vitals Audit', 'Code Splitting', 'Image Optimization', 'Caching Strategies']
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Our Services | Kreato Space" 
        description="From high-performance web development to conversion-focused UI/UX design, explore how we help brands grow."
        url="https://kreatospace.com/services"
      />
      {/* HERO */}
      <section className="section-padding pt-40 bg-brand-bg">
        <div className="container-large">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-brand-accent uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Capabilities</span>
            <h1 className="text-[10vw] md:text-[12vw] font-sans font-black leading-[0.85] tracking-tighter uppercase mb-12">
              Services built <br /> <span className="italic font-serif font-light normal-case text-brand-primary/50">for growth</span>
            </h1>
            <p className="text-2xl md:text-3xl text-brand-primary/80 font-serif leading-relaxed max-w-2xl">
              We provide a full spectrum of digital services to help startups transition from idea to industry leader.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="pb-32">
        <div className="container-large px-6 md:px-12">
          <div className="flex flex-col gap-32">
            {services.map((service, i) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                  <div className="text-brand-accent mb-8">{service.icon}</div>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 tracking-tight">{service.title}</h2>
                  <p className="text-xl text-brand-primary/70 font-sans leading-relaxed mb-10">
                    {service.desc}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {service.benefits.map(benefit => (
                      <div key={benefit} className="flex items-center gap-3 text-brand-primary/50 text-sm font-sans">
                        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className="btn-primary inline-flex">
                    Inquire about this service
                  </Link>
                </div>
                <div className={`aspect-square overflow-hidden border border-brand-primary/10 bg-brand-primary/5 rounded-[3rem] group ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <img 
                    src={
                      service.id === 'web-dev' ? 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000' :
                      service.id === 'ui-ux' ? 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=1000' :
                      service.id === 'landing-pages' ? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000' :
                      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
                    }
                    alt={service.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-surface text-brand-bg">
        <div className="container-large text-center">
          <h2 className="text-[8vw] font-sans font-black tracking-tighter uppercase leading-[0.85] mb-12">Ready to transform <br /> <span className="font-serif italic font-light normal-case opacity-80">your digital presence?</span></h2>
          <Link to="/contact" className="btn-primary inline-flex">
            Get a free consultation
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
