import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <Layout>
      <SEO 
        title="404 - Page Not Found | Kreato Space" 
        description="The page you are looking for doesn't exist or has been moved."
      />
      <div className="min-h-[80vh] flex items-center justify-center pt-32 pb-20 px-6">
        <div className="container-large max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-accent font-mono text-xl mb-4 block tracking-widest uppercase">Error 404</span>
            <h1 className="text-6xl md:text-9xl font-serif font-black tracking-tighter text-brand-primary mb-8 leading-none">
              LOST IN <br /> <span className="italic font-light opacity-50">SPACE?</span>
            </h1>
            <p className="text-xl text-brand-primary/60 font-sans max-w-xl mx-auto mb-12 leading-relaxed">
              The project you're looking for doesn't exist or has moved to a new galaxy. Let's get you back to familiar territory.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/" className="btn-primary flex items-center gap-3">
                <Home size={18} /> Back to Home
              </Link>
              <Link to="/portfolio" className="text-brand-primary font-bold uppercase tracking-widest text-sm flex items-center gap-2 group">
                View Portfolio <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
