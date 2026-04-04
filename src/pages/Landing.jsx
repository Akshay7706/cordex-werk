import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import Portfolio from '../sections/Portfolio';
import Features from '../sections/Features';
import TechStack from '../sections/TechStack';
import CTA from '../sections/CTA';
import SEOHead from '../components/SEOHead';

export default function Landing() {
  return (
    <div className="min-h-screen bg-brand-dark text-white relative overflow-x-hidden max-w-[100vw]">
      <SEOHead title="Home" description="Cordex Werk — a next-generation digital engineering agency crafting high-performance SaaS platforms, AI tools, and immersive e-commerce experiences." />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Features />
        <TechStack />
        <CTA />
      </main>
    </div>
  );
}
