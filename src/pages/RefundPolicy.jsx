import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const RefundPolicy = () => {
  return (
    <Layout>
      <SEO
        title="Refund Policy | Kreato Space"
        description="Kreato Space Refund Policy — understand our payment milestones, cancellation terms, and refund process for web development projects."
        url="https://kreatospace.com/refund"
      />
      <div className="section-padding min-h-screen bg-brand-bg pt-32">
        <div className="container-large max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-brand-primary mb-8 text-center"
          >
            Refund Policy
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-brand-primary/70 leading-relaxed space-y-6"
          >
            <p>At Kreato Space, we are committed to delivering high-quality work that meets the agreed scope and standards. This Refund Policy outlines our approach to payments, cancellations, and refunds.</p>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Advance payments</strong> – All projects require a 40% advance payment before work begins. This advance is non‑refundable once work has commenced. The advance payment covers the time and resources allocated to your project during the initial discovery and planning phase.</li>
              <li><strong>Milestone payments</strong> – Payments made at each project milestone (design approval, development completion) are non‑refundable for work that has been completed and delivered to the client at that stage. Milestone payments become due upon delivery of the corresponding deliverables and approval by the client.</li>
              <li><strong>Project cancellation by client</strong>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>The advance payment (40%) is non‑refundable</li>
                  <li>Any milestone payments made for work completed and delivered are non‑refundable</li>
                  <li>If cancellation occurs mid‑milestone, we will invoice for the proportion of work completed at our standard hourly rate (₹[Rate]/hour for Indian projects)</li>
                  <li>Any unused portion of payments for work not yet started will be refunded within 14 business days</li>
                </ul>
              </li>
              <li><strong>Project cancellation by Kreato Space</strong>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Refund any payments made for work not yet completed or delivered</li>
                  <li>Provide all completed work files to the client</li>
                  <li>Give a minimum of 7 days written notice</li>
                </ul>
              </li>
              <li><strong>Disputes about deliverables</strong> – If you are dissatisfied with a deliverable, please raise your concerns in writing within 5 business days of delivery. We will work with you to address the issue through our revision process as defined in your project agreement. Dissatisfaction with a deliverable does not entitle a client to a refund where the work has been delivered in accordance with the agreed scope.</li>
              <li><strong>International payments</strong> – For international clients, refunds (where applicable) will be processed via the original payment method. Bank transfer charges and currency conversion fees are non‑refundable. Refund processing may take 7–14 business days depending on your bank.</li>
              <li><strong>Maintenance retainers</strong> – Monthly retainer payments are non‑refundable for the current month once services have commenced. Retainer agreements can be cancelled with 30 days written notice. No refund is issued for the notice period month if services continue to be delivered.</li>
              <li><strong>Contact</strong> – To raise a refund request or discuss a payment concern, email us at: <a href="mailto:billing@kreatospace.in" className="text-brand-accent underline">billing@kreatospace.in</a>. We aim to respond to all billing queries within 2 business days.</li>
            </ol>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
