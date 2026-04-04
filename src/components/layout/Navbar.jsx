import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Features', href: '#features' },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);

      // Hide on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 100) {
        setVisible(false);
        setMobileOpen(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    // IntersectionObserver for active section highlighting
    const sectionIds = navLinks.map(l => l.href.replace('#', ''));
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach(obs => obs?.disconnect());
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : '-120%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/70 backdrop-blur-xl border-b border-white/[0.06] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-16 flex justify-between items-center">

          {/* Logo */}
          <a href="#" className="group flex items-center gap-3">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-accent group-hover:drop-shadow-[0_0_12px_rgba(0,229,255,0.6)] transition-all duration-500">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M22 7L12 12L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
            <span className="font-heading font-black text-base tracking-tight text-white">
              CORDEX <span className="font-light text-gray-500 tracking-[0.15em] text-sm">WERK</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-500 hover:text-gray-200'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-brand-accent shadow-[0_0_6px_rgba(0,229,255,0.8)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <a
              href="#contact"
              className="px-5 py-2 rounded text-xs font-bold uppercase tracking-widest border border-white/15 text-gray-300 hover:border-brand-accent hover:text-brand-accent hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-all duration-300"
            >
              Start Project →
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileOpen(prev => !prev)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/[0.06]"
            >
              <div className="flex flex-col px-6 py-6 gap-5">
                {navLinks.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 text-center text-xs font-bold uppercase tracking-widest px-5 py-3 border border-brand-accent/40 text-brand-accent rounded hover:bg-brand-accent/10 transition-colors"
                >
                  Start Project
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </AnimatePresence>
  );
}
