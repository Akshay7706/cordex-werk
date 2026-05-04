import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { Quote, Star, ArrowRight } from 'lucide-react';

const CustomerStories = () => {
  const testimonials = [
    {
      quote: "Kreato Space completely changed how people perceive our product. The website now sells for us.",
      author: "Maya Patel",
      role: "Founder, AriaTech",
      metric: "62% lower bounce rate",
      color: "from-red-500/10"
    },
    {
      quote: "Professional, fast, and genuinely talented. We've worked with other agencies before and Kreato Space is a different level.",
      author: "Rahul Mehta",
      role: "CEO, NimbusWear",
      metric: "38% increase in mobile revenue",
      color: "from-blue-500/10"
    },
    {
      quote: "They didn't just build what we asked for — they challenged our assumptions and built something better.",
      author: "Anika Singh",
      role: "Co-founder, GlobalConsult",
      metric: "4x Lead Conversion",
      color: "from-purple-500/10"
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Customer Stories | Kreato Space" 
        description="Real results from real clients. Explore how Kreato Space has helped startups and brands boost conversions."
        url="https://kreatospace.com/customer-stories"
      />
      <div className="bg-brand-bg pt-32 pb-20 overflow-hidden">
        <div className="container-large px-6">
          <header className="max-w-4xl mb-24">
            <span className="text-brand-accent uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Voice of the Client</span>
            <h1 className="text-6xl md:text-9xl font-sans font-black tracking-tighter text-brand-primary uppercase leading-[0.85]">
              Real <br /> <span className="font-serif italic font-light lowercase text-brand-primary/50">Results</span>
            </h1>
          </header>

          {/* FEATURED STORY - SPLIT */}
          <section className="mb-32">
            <div className="grid lg:grid-cols-2 gap-0 rounded-[3rem] overflow-hidden border border-white/10">
              <div className="aspect-square lg:aspect-auto relative bg-brand-surface group overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071823991-b9671f903f60?auto=format&fit=crop&q=80&w=1200" 
                  alt="Team Collaboration"
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 transition-all duration-700"
                />
              </div>
              <div className="p-12 md:p-20 bg-brand-surface flex flex-col justify-center border-l border-white/10">
                <Quote size={48} className="text-brand-accent mb-8" />
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                  "The new site feels like us. Customers comment on it constantly."
                </h2>
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 rounded-full bg-brand-bg border border-white/10" />
                  <div>
                    <p className="font-bold text-brand-primary">Rahul Mehta</p>
                    <p className="text-sm text-brand-primary/50">Founder, NimbusWear</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
                  <div>
                    <p className="text-4xl font-black text-brand-accent">91/100</p>
                    <p className="text-xs uppercase tracking-widest text-brand-primary/40 mt-1">PageSpeed Score</p>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-brand-accent">+38%</p>
                    <p className="text-xs uppercase tracking-widest text-brand-primary/40 mt-1">Mobile Revenue</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TESTIMONIAL GRID */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-10 bg-brand-surface border border-white/10 rounded-3xl relative overflow-hidden group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${t.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-brand-accent text-brand-accent" />)}
                  </div>
                  <p className="text-xl font-serif italic mb-8 leading-relaxed text-brand-primary/90">
                    "{t.quote}"
                  </p>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-brand-primary">{t.author}</p>
                    <p className="text-xs uppercase tracking-widest text-brand-primary/40 font-bold">{t.role}</p>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <p className="text-2xl font-black text-brand-primary">{t.metric}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <section className="mt-40 text-center pb-20">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-12">Join our list of success stories.</h2>
            <button className="btn-primary group flex items-center gap-3 mx-auto">
              Schedule a Consultation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerStories;
