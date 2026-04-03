import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ShieldCheck, Zap, Globe2, BarChart3, 
  CheckCircle2, Building2, Wallet 
} from 'lucide-react';

// Reusable 3D Card Component
function CreditCard3D() {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 w-full max-w-sm mx-auto h-[240px] relative z-20"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full h-full rounded-2xl p-6 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 border border-gray-600 shadow-[0_20px_50px_rgba(16,185,129,0.3)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[40px] transform translate-x-10 -translate-y-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start">
            <span className="font-heading font-bold tracking-widest text-lg text-emerald-400 flex items-center gap-2">
              <Wallet className="w-5 h-5"/> AURA
            </span>
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#E5E7EB" fillOpacity="0.8"/>
              <circle cx="28" cy="12" r="12" fill="#9CA3AF" fillOpacity="0.8"/>
            </svg>
          </div>
          
          <div>
            <div className="font-mono text-xl tracking-[0.2em] mb-2 text-gray-200">
              4929 1048 5732 9012
            </div>
            <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest">
              <span>Cardholder Name</span>
              <span>Valid Thru</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-200 uppercase tracking-widest">
              <span>ALEXANDER WRIGHT</span>
              <span>12/28</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function FinTechLanding() {
  return (
    <div className="bg-gray-950 min-h-screen text-gray-100 font-sans overflow-hidden selection:bg-emerald-500 selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-gray-950/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Cordex Portfolio
          </Link>
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-emerald-500" />
            <span className="font-heading font-bold text-xl tracking-tight">AURA</span>
          </div>
          <button className="px-5 py-2 rounded-full bg-emerald-500 text-gray-950 font-semibold text-sm hover:bg-emerald-400 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">
            Open Account
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Aura Corporate API v2.0 Live
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6 leading-tight text-white">
              Banking Built for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-50 to-gray-400">Scale & Speed.</span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-10 max-w-xl">
              Borderless multi-currency accounts, intelligent corporate cards, and API-first Treasury logic. Designed for the builders of tomorrow.
            </p>
            
            <div className="flex items-center gap-4">
              <button className="px-8 py-4 rounded-xl bg-gray-100 text-gray-900 font-semibold hover:bg-white transition-all shadow-xl shadow-gray-100/10">
                Get Started
              </button>
              <button className="px-8 py-4 rounded-xl bg-gray-900 border border-gray-800 text-white font-semibold hover:bg-gray-800 transition-all flex items-center gap-2">
                Read Docs
              </button>
            </div>
          </motion.div>

          {/* 3D Card Interactive wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <CreditCard3D />
          </motion.div>

        </div>
      </section>

      {/* Features Value Prop */}
      <section className="py-24 bg-gray-900/50 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">Financial velocity unlocked.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Skip the legacy banking hurdles. We provide programmatic access to global financial rails.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Global Coverage', desc: 'Hold and switch between 40+ currencies instantly without hidden spread margins.', icon: Globe2 },
              { title: 'Sub-second API', desc: 'Execute thousands of transactions per second with our robust idempotency keys.', icon: Zap },
              { title: 'Bank-grade Security', desc: 'Funds are safeguarded with Tier-1 banking partners worldwide.', icon: ShieldCheck },
            ].map((feat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-emerald-400 mb-6">
                  <feat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Modules */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Transparent Pricing</h2>
            <p className="text-gray-400">Scale without the guesswork.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            
            {/* Standard */}
            <div className="p-8 rounded-3xl bg-gray-900/50 border border-gray-800">
              <h3 className="text-xl font-semibold mb-2">Startup</h3>
              <p className="text-gray-400 text-sm mb-6">For bootstrapping teams.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500 text-sm">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['1 Corporate Card', 'Local accounts in USD, EUR', 'Standard API access', 'Email support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors border border-gray-700">
                Start Free
              </button>
            </div>

            {/* Pro - Highlighted */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-gray-800 to-gray-900 border border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.15)] relative transform md:-translate-y-4">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-4">
                <span className="bg-emerald-500 text-gray-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">Most Popular</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Scale</h3>
              <p className="text-gray-400 text-sm mb-6">For scaling tech companies.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold text-white">$49</span>
                <span className="text-gray-500 text-sm">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Unlimited physical cards', '40+ currency balances', 'Advanced API routing', '0.1% FX spread markup', '24/7 Priority Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-emerald-500 text-gray-950 font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/25">
                Go Scale
              </button>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-3xl bg-gray-900/50 border border-gray-800">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Building2 className="w-5 h-5"/> Custom</h3>
              <p className="text-gray-400 text-sm mb-6">For large volume operations.</p>
              <div className="flex items-baseline gap-1 mb-8 text-2xl font-bold">
                Volume Based
              </div>
              <ul className="space-y-4 mb-8">
                {['Custom contract pricing', 'Dedicated account manager', 'White-label issuing', 'Custom SAML SSO'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors border border-gray-700">
                Contact Sales
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
