import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

function MagneticButton({ children, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group inline-flex items-center justify-center w-40 h-40 rounded-full border border-white/20 hover:border-brand-accent bg-transparent hover:bg-brand-accent/10 transition-colors duration-300 cursor-none"
      data-cursor="START"
    >
      <div className="text-center">
        <p className="text-white font-bold text-sm tracking-widest uppercase group-hover:text-brand-accent transition-colors">Start</p>
        <p className="text-white font-bold text-sm tracking-widest uppercase group-hover:text-brand-accent transition-colors">Project</p>
        <div className="w-4 h-[1px] bg-white/40 mx-auto mt-2 group-hover:bg-brand-accent transition-colors" />
      </div>
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden border-t border-white/5">

      {/* ── Kinetic CTA Block ── */}
      <div className="relative z-10 px-6 lg:px-16 pt-24 pb-16 border-b border-white/5">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">

          {/* Massive typography */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-bold mb-6">
                Ready to build something elite?
              </p>
              <h2 className="text-[clamp(3rem,10vw,9rem)] font-heading font-black text-white leading-[0.9] tracking-tighter">
                LET'S<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                  BUILD.
                </span>
              </h2>
            </motion.div>
          </div>

          {/* Magnetic CTA button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <MagneticButton href="#contact">Start Project</MagneticButton>
          </motion.div>
        </div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <a
            href="mailto:hello@cordexwerk.com"
            className="group inline-flex items-center gap-4 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <span className="text-sm md:text-base font-light tracking-wider">hello@cordexwerk.com</span>
            <div className="w-8 h-[1px] bg-gray-600 group-hover:w-16 group-hover:bg-brand-accent transition-all duration-500" />
          </a>
        </motion.div>
      </div>

      {/* ── Footer Bottom ── */}
      <div className="relative z-10 px-6 lg:px-16 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          {/* Brand */}
          <div>
            <p className="font-heading font-black text-xl text-white tracking-tighter">
              CORDEX <span className="font-light text-gray-500 tracking-[0.2em]">WERK</span>
            </p>
            <p className="text-gray-600 text-xs mt-1 tracking-widest uppercase">Digital Architecture</p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-6">
            {['About', 'Services', 'Portfolio', 'Contact'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs text-gray-500 hover:text-white uppercase tracking-widest font-bold transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/cordex_werk?igsh=MW8yaDAweTV3a25lNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:border-pink-500 hover:text-pink-400 transition-colors"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[11px] text-gray-600 tracking-widest uppercase">
            © {new Date().getFullYear()} Cordex Werk. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-700 tracking-widest uppercase">
            Crafted with precision.
          </p>
        </div>
      </div>

    </footer>
  );
}
