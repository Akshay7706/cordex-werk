import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/kreatospace', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/kreatospace', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/kreatospace', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-brand-bg border-t border-brand-primary/20 pt-24 pb-12 px-6 md:px-12 lg:px-24">
      <div className="container-large">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <Link to="/" className="text-3xl font-serif font-black tracking-tighter text-brand-primary mb-6 block">
              Kreato Space
            </Link>
            <p className="text-brand-primary/60 max-w-sm font-sans leading-relaxed">
              We design and develop high-performance digital experiences for the next generation of industry leaders.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-sans font-bold uppercase tracking-[0.2em] text-brand-accent mb-6">Explore</h4>
            <ul className="flex flex-col gap-4">
              <li><Link to="/services" className="text-brand-primary/60 hover:text-brand-primary transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="text-brand-primary/60 hover:text-brand-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/about" className="text-brand-primary/60 hover:text-brand-primary transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-brand-primary/60 hover:text-brand-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-sans font-bold uppercase tracking-[0.2em] text-brand-accent mb-6">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-brand-primary/10 flex items-center justify-center text-brand-primary/60 hover:bg-brand-primary hover:text-brand-bg hover:border-brand-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-xs text-brand-primary/40 uppercase tracking-[0.2em] mb-2 font-bold">Inquiries</p>
              <a href="mailto:kreatospsce@gmail.com" className="text-brand-primary hover:text-brand-accent transition-colors font-sans font-medium">kreatospsce@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-brand-primary/20 gap-4">
          <p className="text-xs text-brand-primary/40 font-sans uppercase tracking-widest">
            © {currentYear} Kreato Space. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
