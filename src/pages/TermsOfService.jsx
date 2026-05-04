import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const TermsOfService = () => {
  return (
    <Layout>
      <SEO
        title="Terms of Service | Kreato Space"
        description="Kreato Space Terms of Service — read our service agreement covering project engagement, payment terms, intellectual property, and liability."
        url="https://kreatospace.com/terms"
      />
      <div className="section-padding min-h-screen flex items-center justify-center bg-brand-bg pt-32">
        <div className="container-large max-w-3xl text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-brand-primary mb-6"
          >
            Terms of Service
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-brand-primary/70 leading-relaxed"
          >
            <p>Please read these terms carefully before using our services.</p>
            <p>Last updated: [Date] | Effective date: [Date]</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">1. Services</h2>
            <p>Kreato Space provides web development, UI/UX design, e‑commerce development, and related digital services. The specific scope of services for each engagement is defined in a separate Project Proposal and Client Service Agreement signed by both parties.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">2. Eligibility</h2>
            <p>You must be at least 18 years of age and legally capable of entering into a binding contract to engage our services. By engaging Kreato Space, you represent that you meet these requirements.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">3. Project engagement & payment</h2>
            <p>All projects require a signed service agreement and advance payment before work begins. Payment terms, milestones, and schedules are defined in the individual project agreement. Kreato Space reserves the right to pause or terminate work in the event of non‑payment.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">4. Intellectual property</h2>
            <p>All work product created by Kreato Space remains our intellectual property until full and final payment is received by the client. Upon receipt of full payment, ownership of the final deliverables transfers to the client as agreed in the project contract. Kreato Space retains the right to display completed work in its portfolio unless explicitly restricted in writing.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">5. Confidentiality</h2>
            <p>Both parties agree to keep confidential any sensitive or proprietary information shared during the course of an engagement. This obligation survives the termination of any agreement for a period of two years.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">6. Limitation of liability</h2>
            <p>Kreato Space's liability to any client is limited to the total fees paid for the specific project in question. We are not liable for indirect, consequential, or incidental losses including but not limited to lost revenue, lost data, or lost business opportunities.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">7. Warranty disclaimer</h2>
            <p>We warrant that all services will be performed with reasonable skill and care. We do not warrant specific business outcomes such as search rankings, conversion rates, or revenue. Third‑party services and platforms used in any project are subject to their own terms and availability.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">8. Governing law</h2>
            <p>These Terms are governed by the laws of India. Any disputes shall be resolved through arbitration under the Arbitration and Conciliation Act, 1996, with the seat of arbitration in [Your City], India.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">9. Changes to these terms</h2>
            <p>We may update these Terms from time to time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes constitutes acceptance of the revised Terms.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">10. Contact</h2>
            <p>For any questions regarding these Terms, please contact us at: legal@kreatospace.in</p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
