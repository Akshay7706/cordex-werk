import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Privacy = () => {
  const sections = [
    {
      title: "Data Collection",
      content: "We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, and any other information you choose to provide."
    },
    {
      title: "Use of Information",
      content: "We use the information we collect to provide, maintain, and improve our services, communicate with you, and personalize your experience. We do not sell your personal data to third parties."
    },
    {
      title: "Information Security",
      content: "We take reasonable measures to protect your personal information from loss, theft, misuse, and unauthorized access. This includes using encryption (HTTPS) and secure database protocols (RLS)."
    },
    {
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal information at any time. You can also object to certain processing of your data by contacting us directly."
    }
  ];

  return (
    <Layout>
      <SEO title="Privacy Policy | Kreato Space" />
      <div className="bg-brand-bg pt-40 pb-32">
        <div className="container-large max-w-4xl px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <span className="text-brand-accent uppercase tracking-[0.4em] font-bold text-xs mb-6 block">Data Protection</span>
            <h1 className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-brand-primary uppercase mb-8">
              Privacy <br /> <span className="italic font-light lowercase text-brand-primary/50">Policy</span>
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
                  <span className="text-brand-accent font-serif italic text-2xl opacity-50 group-hover:opacity-100 transition-opacity">P{i+1}</span>
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
            <h3 className="text-xl font-serif font-bold mb-4">Privacy Concerns?</h3>
            <p className="text-brand-primary/60 mb-8 font-sans">Our Data Protection Officer is ready to assist you with any privacy-related questions.</p>
            <a href="mailto:kreatospsce@gmail.com" className="text-brand-accent font-bold uppercase tracking-widest text-xs hover:underline">kreatospsce@gmail.com</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
