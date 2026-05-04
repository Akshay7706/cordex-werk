import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Calendar, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Toast from '../components/ui/Toast';
import SEO from '../components/SEO';

export default function Contact() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
    confirm_email: '' // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: '' });
  const [loadTime, setLoadTime] = useState(0);

  useEffect(() => {
    setLoadTime(Date.now());
    if (location.state?.plan) {
      setFormData(prev => ({
        ...prev,
        projectType: 'Web Development',
        message: `I'm interested in the ${location.state.plan} plan. Let's discuss!`
      }));
    }
  }, [location.state]);

  const showToast = useCallback((type, title, message) => {
    setToast({ show: true, type, title, message });
  }, []);

  const closeToast = useCallback(() => {
    setToast(t => ({ ...t, show: false }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Honeypot check
    if (formData.confirm_email !== '') {
      console.warn('Bot detected via honeypot');
      return; 
    }

    // 2. Speed check (bots fill forms too fast)
    const submitTime = Date.now();
    if (submitTime - loadTime < 3000) {
      console.warn('Bot detected via timing');
      showToast('error', '❌ Slow down', 'Please take a moment to review your message before sending.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: sbError } = await supabase.from('contact_submissions').insert([{
        name: formData.name,
        email: formData.email,
        project_type: formData.projectType,
        budget: formData.budget,
        message: formData.message,
        status: 'new',
      }]);
      
      if (sbError) throw sbError;
      
      setFormData({ name: '', email: '', projectType: '', budget: '', message: '', confirm_email: '' });
      showToast('success', '✅ Message Sent!', 'We\'ve received your request and will be in touch within 24 hours.');
    } catch (err) {
      console.error('Supabase error:', err);
      showToast('error', '❌ Submission Failed', 'Something went wrong. Please email us at kreatospsce@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <SEO 
        title="Contact Us | Kreato Space" 
        description="Let's discuss your next digital project. We're ready to build something exceptional together."
        url="https://kreatospace.com/contact"
      />
      <Toast
        show={toast.show}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={closeToast}
      />
      <Layout>
        <div className="pt-32 pb-20 min-h-screen">
        <div className="container-large">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-16">
            
            {/* Left Column: Info */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="flex flex-col justify-center h-full pb-10 lg:pb-0 lg:ml-8 xl:ml-16"
            >
              <div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-primary mb-6">
                  Let's talk <span className="text-brand-accent italic font-light">business.</span>
                </h1>
                <p className="text-xl text-brand-primary/60 font-sans leading-relaxed mb-12 max-w-md">
                  Whether you have a fully scoped project or just a raw idea, we want to hear about it.
                </p>

                <div className="space-y-8">
                  <a href="mailto:kreatospsce@gmail.com" className="flex items-center gap-4 group w-fit">
                    <div className="w-12 h-12 rounded-full border border-brand-primary/20 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-brand-bg transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-brand-primary/50 uppercase tracking-widest font-bold mb-1">Email Us</p>
                      <p className="text-lg text-brand-primary font-medium group-hover:text-brand-accent transition-colors">kreatospsce@gmail.com</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full border border-brand-primary/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-brand-primary/50 uppercase tracking-widest font-bold mb-1">Our Studio</p>
                      <p className="text-lg text-brand-primary font-medium">Digital Nomads · Remote First</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-brand-surface border border-brand-primary/10 p-8 md:p-12 rounded-3xl shadow-2xl relative"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-primary/40 font-bold mb-3">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-brand-bg border border-brand-primary/10 rounded-xl px-4 py-4 text-brand-primary placeholder:text-brand-primary/20 focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-primary/40 font-bold mb-3">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-brand-bg border border-brand-primary/10 rounded-xl px-4 py-4 text-brand-primary placeholder:text-brand-primary/20 focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                </div>

                {/* Honeypot field (hidden from humans) */}
                <div className="hidden" aria-hidden="true">
                  <input 
                    type="text" 
                    name="confirm_email" 
                    value={formData.confirm_email} 
                    onChange={handleChange} 
                    tabIndex="-1" 
                    autoComplete="off" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-primary/40 font-bold mb-3">Project Type</label>
                    <select 
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-brand-bg border border-brand-primary/10 rounded-xl px-4 py-4 text-brand-primary focus:outline-none focus:border-brand-accent transition-colors appearance-none"
                    >
                      <option value="" disabled>Select project type</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Branding">Branding</option>
                      <option value="App Design">App Design</option>
                      <option value="Strategy">Strategy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-primary/40 font-bold mb-3">Budget Range</label>
                    <select 
                      name="budget"
                      required
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-brand-bg border border-brand-primary/10 rounded-xl px-4 py-4 text-brand-primary focus:outline-none focus:border-brand-accent transition-colors appearance-none"
                    >
                      <option value="" disabled>Select budget range</option>
                      <option value="$5k - $10k">$5k - $10k</option>
                      <option value="$10k - $25k">$10k - $25k</option>
                      <option value="$25k - $50k">$25k - $50k</option>
                      <option value="$50k+">$50k+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-primary/40 font-bold mb-3">Your Message</label>
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows="5"
                    className="w-full bg-brand-bg border border-brand-primary/10 rounded-xl px-4 py-4 text-brand-primary placeholder:text-brand-primary/20 focus:outline-none focus:border-brand-accent transition-colors resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-3 group disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Request...' : (
                    <>
                      Send Message
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
        </div>
      </Layout>
    </>
  );
}
