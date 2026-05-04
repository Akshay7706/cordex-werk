import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { Search, BookOpen, MessageCircle, FileText, Zap, Shield, RotateCcw } from 'lucide-react';

const HelpCenter = () => {
  const categories = [
    { title: 'Getting Started', desc: 'New here? Learn the basics of working with Kreato Space.', icon: Zap },
    { title: 'Project Management', desc: 'How we manage timelines, feedback, and delivery.', icon: BookOpen },
    { title: 'Technical FAQ', desc: 'Hosting, domain setup, and technology stack questions.', icon: FileText },
    { title: 'Privacy & Security', desc: 'How we protect your data and project files.', icon: Shield },
    { title: 'Billing & Invoices', desc: 'Payment schedules, refund policies, and methods.', icon: RotateCcw },
    { title: 'Support', desc: 'Need immediate help? Here is how to reach us.', icon: MessageCircle },
  ];

  return (
    <Layout>
      <SEO title="Help Center | Kreato Space" description="Find answers to common questions about our web development process, billing, and support." />
      <div className="bg-brand-bg pt-40 pb-32">
        <div className="container-large px-6">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <span className="text-brand-accent uppercase tracking-[0.4em] font-bold text-xs mb-6 block">Support Hub</span>
            <h1 className="text-6xl md:text-9xl font-serif font-black tracking-tighter text-brand-primary uppercase mb-12">
              Help <br /> <span className="italic font-light lowercase text-brand-primary/50">Center</span>
            </h1>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-primary/20" size={20} />
              <input 
                type="text" 
                placeholder="Search for answers..."
                className="w-full bg-brand-surface border border-white/10 rounded-full py-6 pl-16 pr-8 text-brand-primary font-sans focus:outline-none focus:border-brand-accent/50 transition-colors shadow-2xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-brand-surface border border-white/5 rounded-[2.5rem] hover:border-brand-accent/30 transition-all group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-bg border border-white/10 flex items-center justify-center mb-8 group-hover:bg-brand-accent group-hover:border-brand-accent transition-all duration-500">
                  <cat.icon size={24} className="text-brand-primary group-hover:text-brand-bg transition-colors" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-primary mb-4">{cat.title}</h3>
                <p className="text-brand-primary/60 font-sans leading-relaxed">
                  {cat.desc}
                </p>
                <div className="mt-8 flex items-center gap-2 text-brand-accent font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Browse Category
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-40 p-12 md:p-20 bg-brand-surface rounded-[4rem] border border-white/5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 blur-[100px] rounded-full" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Can't find what you're looking for?</h2>
              <p className="text-xl text-brand-primary/60 mb-12 max-w-2xl mx-auto">
                Our support team is available 24/7 to help you with any specific questions or technical issues.
              </p>
              <button className="btn-primary">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpCenter;
