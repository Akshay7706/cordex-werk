import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEO
        title="Privacy Policy | Kreato Space"
        description="Kreato Space's Privacy Policy — learn how we collect, use, and protect your personal information in compliance with Indian data protection regulations."
        url="https://kreatospace.com/privacy"
      />
      <div className="section-padding min-h-screen flex items-center justify-center bg-brand-bg pt-32">
        <div className="container-large max-w-3xl text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-brand-primary mb-6"
          >
            Privacy Policy
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-brand-primary/70 leading-relaxed"
          >
            <p>Last updated: [Date] | Effective date: [Date]</p>
            <p>Kreato Space ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or engage our services. This policy complies with the Information Technology Act, 2000 and applicable Indian data protection regulations.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">1. Information we collect</h2>
            <ul className="list-disc pl-6 space-y-2 text-brand-primary/70">
              <li><strong>Contact information:</strong> name, email address, phone number, company name – provided via contact forms or service enquiries.</li>
              <li><strong>Project information:</strong> details about your business, project requirements, and goals shared during our engagement.</li>
              <li><strong>Technical data:</strong> IP address, browser type, pages visited, time spent – collected automatically via Google Analytics.</li>
              <li><strong>Payment information:</strong> processed securely through Razorpay or bank transfer – we do not store card or banking details.</li>
            </ul>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">2. How we use your information</h2>
            <ul className="list-disc pl-6 space-y-2 text-brand-primary/70">
              <li>Respond to enquiries and communicate about potential or active projects.</li>
              <li>Deliver contracted services and manage project workflows.</li>
              <li>Send project‑related updates, invoices, and deliverables.</li>
              <li>Improve our website and services based on usage patterns.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p>We never sell, rent, or trade your personal information to third parties.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">3. Data sharing</h2>
            <p>We may share your data with trusted third‑party service providers that assist in delivering our services (project management tools, communication platforms, cloud storage). All third parties are contractually obligated to protect your data and use it solely for servicing Kreato Space.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">4. Cookies</h2>
            <p>Our site uses cookies to enhance user experience and analyse traffic. You can manage cookie settings via your browser; disabling cookies may affect some site functionality. We use Google Analytics, which sets its own cookies for traffic analysis.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">5. Data retention</h2>
            <p>We retain personal information for as long as necessary to fulfil the purposes described herein or as required by law. Project‑related records are kept for a minimum of three years for legal and accounting reasons.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">6. Your rights</h2>
            <ul className="list-disc pl-6 space-y-2 text-brand-primary/70">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data (subject to legal obligations).</li>
              <li>Withdraw consent for marketing communications at any time.</li>
            </ul>
            <p>To exercise these rights, email us at <a href="mailto:privacy@kreatospace.in" className="text-brand-accent underline">privacy@kreatospace.in</a>.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">7. Data security</h2>
            <p>We implement appropriate technical and organisational measures to protect your data against unauthorised access, alteration, or disclosure. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">8. Third‑party links</h2>
            <p>Our website may contain links to third‑party sites. We are not responsible for their privacy practices; please review their policies independently.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">9. Changes to this policy</h2>
            <p>We may update this Privacy Policy from time to time. Significant changes will be reflected by updating the date at the top of the page.</p>
            <h2 className="text-2xl font-serif font-bold text-brand-primary mt-6">10. Contact</h2>
            <p>For any privacy‑related questions or requests, contact us at <a href="mailto:privacy@kreatospace.in" className="text-brand-accent underline">privacy@kreatospace.in</a>.</p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
