import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Refund = () => {
  const sections = [
    {
      title: "Service Cancellation",
      content: "Clients may request to cancel a project at any time. However, any work already completed and hours already logged up to the point of cancellation will be billed and are non-refundable."
    },
    {
      title: "Deposit Policy",
      content: "A standard non-refundable deposit (typically 50% of the project total) is required to secure your project in our production schedule. This ensures we can dedicate the necessary team and resources to your vision."
    },
    {
      title: "Digital Products",
      content: "Due to the nature of digital products and custom source code, once final project files or administrative access have been transferred to the client, we cannot offer refunds."
    },
    {
      title: "Dispute Resolution",
      content: "We are committed to client satisfaction. If you are unhappy with the quality of work, we will work with you to resolve the issues through revisions as outlined in your specific project agreement."
    }
  ];

  return (
    <Layout>
      <SEO title="Refund Policy | Kreato Space" />
      <div className="bg-brand-bg pt-40 pb-32">
        <div className="container-large max-w-4xl px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <span className="text-brand-accent uppercase tracking-[0.4em] font-bold text-xs mb-6 block">Financial Governance</span>
            <h1 className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-brand-primary uppercase mb-8">
              Refund <br /> <span className="italic font-light lowercase text-brand-primary/50">Policy</span>
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
                  <span className="text-brand-accent font-serif italic text-2xl opacity-50 group-hover:opacity-100 transition-opacity">R{i+1}</span>
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
            <h3 className="text-xl font-serif font-bold mb-4">Refund Inquiries?</h3>
            <p className="text-brand-primary/60 mb-8 font-sans">For questions regarding billing or refund requests, please contact our finance team.</p>
            <a href="mailto:kreatospsce@gmail.com" className="text-brand-accent font-bold uppercase tracking-widest text-xs hover:underline">kreatospsce@gmail.com</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Refund;
