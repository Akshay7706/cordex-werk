import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Terms = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using the services provided by Kreato Space ('we,' 'our,' or 'us'), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
    },
    {
      title: "2. Services Provided",
      content: "Kreato Space provides web development, UI/UX design, and digital strategy services. The specific scope of work for any project will be outlined in a separate Statement of Work (SOW) or Service Agreement."
    },
    {
      title: "3. User Responsibilities",
      content: "You agree to provide accurate information, protect your account credentials, and use our services only for lawful purposes. You are responsible for all activity that occurs under your account or in connection with your project."
    },
    {
      title: "4. Intellectual Property",
      content: "Unless otherwise specified in a written agreement, all original code, designs, and content created by Kreato Space remain our property until full payment is received. Upon full payment, ownership of final deliverables is transferred to the client, while we retain the right to showcase the work in our portfolio."
    }
  ];

  return (
    <Layout>
      <SEO title="Terms of Service | Kreato Space" />
      <div className="bg-brand-bg pt-40 pb-32">
        <div className="container-large max-w-4xl px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <span className="text-brand-accent uppercase tracking-[0.4em] font-bold text-xs mb-6 block">Legal Governance</span>
            <h1 className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-brand-primary uppercase mb-8">
              Terms of <br /> <span className="italic font-light lowercase text-brand-primary/50">Service</span>
            </h1>
            <p className="text-brand-primary/40 font-sans text-sm uppercase tracking-widest">Last updated: May 2024</p>
          </motion.div>

          <div className="space-y-16">
            {sections.map((section, i) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="flex items-baseline gap-6 mb-6">
                  <span className="text-brand-accent font-serif italic text-2xl opacity-50 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-primary">{section.title}</h2>
                </div>
                <div className="pl-14">
                  <p className="text-lg text-brand-primary/70 font-sans leading-relaxed max-w-2xl">
                    {section.content}
                  </p>
                </div>
              </motion.section>
            ))}
          </div>

          <div className="mt-32 p-12 bg-brand-surface rounded-[2rem] border border-white/5 text-center">
            <h3 className="text-xl font-serif font-bold mb-4">Questions about our terms?</h3>
            <p className="text-brand-primary/60 mb-8 font-sans">We're here to clarify any points regarding our service agreement.</p>
            <a href="mailto:kreatospsce@gmail.com" className="text-brand-accent font-bold uppercase tracking-widest text-xs hover:underline">kreatospsce@gmail.com</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
