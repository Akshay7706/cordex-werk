import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { VerticalCutReveal } from '../components/ui/vertical-cut-reveal';
import { Users, Target, Zap, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
  };

  const values = [
    { title: 'Clarity over complexity', desc: 'We design clear interfaces. If something is confusing to build, it will be confusing to use.', icon: Zap },
    { title: 'Honesty first', desc: 'We tell clients what they need to hear, not what they want to hear. Transparency is our baseline.', icon: Heart },
    { title: 'Speed without shortcuts', desc: 'We move fast because we have a proven process, not because we cut corners.', icon: Zap },
    { title: 'Long-term thinking', desc: 'We build for scale. Every application is designed to grow with your business.', icon: Target },
  ];

  return (
    <Layout>
      <SEO 
        title="About Us | Kreato Space" 
        description="Learn about the mission, values, and the team behind Kreato Space—a premium web development agency."
        url="https://kreatospace.com/about"
      />
      
      <div className="bg-brand-bg text-brand-primary">
        {/* HERO */}
        <section className="pt-40 pb-20 md:pb-32 px-6">
          <div className="container-large">
            <span className="text-brand-accent uppercase tracking-[0.4em] font-bold text-sm mb-8 block">Our Story</span>
            <h1 className="text-[12vw] md:text-[10vw] font-sans font-black leading-[0.85] tracking-tighter uppercase mb-12">
              <VerticalCutReveal
                splitBy="characters"
                staggerDuration={0.02}
                staggerFrom="first"
                transition={{ type: "spring", stiffness: 200, damping: 40 }}
              >
                KREATO SPACE
              </VerticalCutReveal>
            </h1>
            <p className="text-2xl md:text-4xl text-brand-primary/60 font-serif leading-tight max-w-3xl">
              We started with a simple belief: every business deserves a web presence that generates <span className="italic text-brand-primary font-light">real results.</span>
            </p>
          </div>
        </section>

        {/* SPLIT STORY */}
        <section className="py-20 md:py-40 bg-brand-surface rounded-[3rem] md:rounded-[6rem] mx-4 md:mx-12 overflow-hidden">
          <div className="container-large px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
              <div className="sticky top-40">
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Built by builders.</h2>
                <div className="w-20 h-1 bg-brand-accent mb-8" />
                <p className="text-xl text-brand-primary/70 leading-relaxed max-w-lg">
                  Founded by Akshay Anil, Kreato Space grew from a passion project in a college dorm in Kerala into a global web development agency.
                </p>
              </div>
              <div className="space-y-12 text-lg text-brand-primary/60 font-sans leading-relaxed pt-10 lg:pt-0">
                <p>
                  Kreato Space was founded in Alappuzha, Kerala, out of frustration with the "standard" web development experience. We saw too many great products fail because their websites were slow, confusing, or forgettable.
                </p>
                <p>
                  Today, we are a lean, remote-friendly team delivering websites, SaaS platforms, and e-commerce experiences to clients across India and internationally. We are young, ambitious, and we build things that last.
                </p>
                <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-brand-primary/10 group">
                  <img 
                    src="https://images.unsplash.com/photo-1522071823991-b9671f903f60?auto=format&fit=crop&q=80&w=1000" 
                    alt="Creative Team"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES BENTO */}
        <section className="section-padding py-32">
          <div className="container-large">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-20 text-center uppercase tracking-tighter">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-brand-surface border border-brand-primary/10 rounded-3xl hover:border-brand-accent/50 transition-colors group"
                >
                  <v.icon className="text-brand-accent mb-6 group-hover:scale-110 transition-transform duration-500" size={32} />
                  <h3 className="text-xl font-serif font-bold mb-4">{v.title}</h3>
                  <p className="text-sm text-brand-primary/60 leading-relaxed font-sans">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM SIMPLIFIED */}
        <section className="section-padding py-32 bg-brand-surface rounded-[3rem] md:rounded-[6rem] mx-4 md:mx-12 mb-20">
          <div className="container-large">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 uppercase tracking-tighter">The Team</h2>
              <p className="text-xl text-brand-primary/70 mb-12">
                We are a lean team of developers and designers who care deeply about quality. No outsourcing, no compromises.
              </p>
              <div className="grid md:grid-cols-2 gap-12 text-left">
                <div className="space-y-4">
                  <h4 className="text-2xl font-serif font-bold text-brand-accent">Akshay Anil</h4>
                  <p className="text-brand-primary/60 font-sans">Founder & Lead Developer. Passionate about building fast, conversion-focused web experiences.</p>
                </div>
                <div className="space-y-4 opacity-50">
                  <h4 className="text-2xl font-serif font-bold text-brand-primary">[Creative Team]</h4>
                  <p className="text-brand-primary/60 font-sans">A network of specialist copywriters, motion designers, and SEO strategists.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding py-40 text-center">
          <div className="container-large">
            <h2 className="text-6xl md:text-[8vw] font-sans font-black uppercase tracking-tighter leading-[0.85] mb-12">
              Let's build <br /> <span className="font-serif italic font-light lowercase text-brand-primary/50">the future</span>
            </h2>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-3">
              Start a Project <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
