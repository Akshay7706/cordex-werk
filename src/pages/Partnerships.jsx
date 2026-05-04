import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Zap, Users, Award, Mail } from 'lucide-react';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';
import { VerticalCutReveal } from '../components/ui/vertical-cut-reveal';

const partnerTypes = [
  {
    icon: Globe,
    title: 'Agency Partners',
    description: 'White-label development for creative studios. We handle the tech — you keep the client relationship.',
    perks: ['White-label delivery', 'Dev-only scope', 'Priority turnaround'],
  },
  {
    icon: Zap,
    title: 'Technology Partners',
    description: 'SaaS platforms looking to co-market or integrate with a specialist web development agency.',
    perks: ['Integration support', 'Co-marketing', 'Referral scheme'],
  },
  {
    icon: Users,
    title: 'Referral Partners',
    description: 'Earn commissions for every successfully closed project you refer to our studio.',
    perks: ['10% referral fee', 'Ongoing commission', 'Simple process'],
  },
  {
    icon: Award,
    title: 'Strategic Alliances',
    description: 'Long-term partnerships with accelerators and incubators to scale their portfolio companies.',
    perks: ['Dedicated AM', 'Volume pricing', 'Co-branded pitches'],
  },
];

const Partnerships = () => {
  return (
    <Layout>
      <SEO title="Partnerships | Kreato Space" />
      
      <div className="bg-brand-bg text-brand-primary">
        {/* HERO */}
        <section className="pt-40 pb-20 md:pb-32 px-6">
          <div className="container-large">
            <span className="text-brand-accent uppercase tracking-[0.4em] font-bold text-sm mb-8 block">Collaborations</span>
            <h1 className="text-[12vw] md:text-[10vw] font-sans font-black leading-[0.85] tracking-tighter uppercase mb-12">
              <VerticalCutReveal
                splitBy="characters"
                staggerDuration={0.02}
                staggerFrom="first"
                transition={{ type: "spring", stiffness: 200, damping: 40 }}
              >
                BETTER TOGETHER
              </VerticalCutReveal>
            </h1>
            <p className="text-2xl md:text-4xl text-brand-primary/60 font-serif leading-tight max-w-3xl">
              We work with agencies, tech companies, and consultants to build <span className="italic text-brand-primary font-light">impactful long-term alliances.</span>
            </p>
          </div>
        </section>

        {/* GRID LAYOUT */}
        <section className="py-20 md:py-40 bg-brand-surface rounded-[3rem] md:rounded-[6rem] mx-4 md:mx-12 overflow-hidden">
          <div className="container-large px-6">
            <div className="grid lg:grid-cols-2 gap-24">
              {partnerTypes.map((type, i) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-brand-bg border border-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-500">
                      <type.icon size={28} className="group-hover:text-brand-bg transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 tracking-tight">{type.title}</h3>
                      <p className="text-xl text-brand-primary/60 mb-8 font-sans leading-relaxed">
                        {type.description}
                      </p>
                      <ul className="flex flex-wrap gap-3">
                        {type.perks.map((perk) => (
                          <li key={perk} className="text-[10px] font-sans uppercase tracking-widest text-brand-primary/40 border border-brand-primary/10 px-3 py-1 rounded-full">
                            {perk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="section-padding py-32 md:py-48">
          <div className="container-large">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-5xl md:text-[6vw] font-serif font-black tracking-tighter leading-none mb-8 uppercase">Why partner <br /> with us?</h2>
                <div className="w-20 h-1 bg-brand-accent" />
              </div>
              <div className="space-y-12">
                {[
                  { n: '01', t: 'Revenue sharing on every project closed.' },
                  { n: '02', t: 'Priority scheduling for partner projects.' },
                  { n: '03', t: 'Dedicated account manager & Slack access.' },
                ].map((b) => (
                  <div key={b.n} className="flex gap-8 group">
                    <span className="text-3xl font-serif italic text-brand-accent/30 group-hover:text-brand-accent transition-colors">{b.n}</span>
                    <p className="text-2xl text-brand-primary/70 font-sans leading-tight">{b.t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding py-32 bg-brand-primary rounded-[3rem] md:rounded-[6rem] mx-4 md:mx-12 mb-20 text-center">
          <div className="container-large">
            <h2 className="text-5xl md:text-[8vw] font-sans font-black uppercase tracking-tighter leading-[0.85] text-brand-bg mb-12">
              Ready to <br /> <span className="font-serif italic font-light lowercase text-brand-bg/50">collaborate?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="mailto:kreatospsce@gmail.com" className="btn-secondary border-brand-bg/30 text-brand-bg hover:bg-brand-bg hover:text-brand-primary">
                Email Partnerships
              </a>
              <Link to="/contact" className="text-brand-bg/60 font-bold uppercase tracking-widest text-xs flex items-center gap-2 group hover:text-brand-bg transition-colors">
                General Inquiry <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Partnerships;
