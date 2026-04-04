import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../sections/Hero';
import WhyChooseMe from '../sections/WhyChooseMe';
import Services from '../sections/Services';
import Portfolio from '../sections/Portfolio';
import Process from '../sections/Process';
import Testimonials from '../sections/Testimonials';
import Codex from '../sections/Codex';
import Pricing from '../sections/Pricing';
import TechStack from '../sections/TechStack';
import CTA from '../sections/CTA';
import WhatsAppButton from '../components/shared/WhatsAppButton';
import SEOHead from '../components/SEOHead';

export default function Landing() {
  return (
    <div className="min-h-screen bg-brand-dark text-white relative">
      <SEOHead title="Home | Elite SaaS Development" description="Cordex Werk — We build high-performance, conversion-optimized SaaS platforms and startup landing pages that scale faster." />
      <Navbar />
      <main>
        <Hero />
        <WhyChooseMe />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Codex />
        <Pricing />
        <TechStack />
        <CTA />
      </main>
      <WhatsAppButton />
    </div>
  );
}
