import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X, Mail, ArrowRight } from 'lucide-react';

export const SubscribeModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
        // Reset state after closing
        setTimeout(() => {
          setEmail('');
          setStatus('idle');
        }, 300);
      }, 2000);
    }, 1000);
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-brand-bg border border-brand-primary/20 shadow-2xl p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-brand-primary/50 hover:text-brand-primary transition-colors"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>

            <div className="text-center mb-8">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-primary/5 border border-brand-primary/10 mb-4">
                <Mail className="size-6 text-brand-primary" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-brand-primary mb-2">
                Stay Updated
              </h2>
              <p className="text-sm text-brand-primary/70">
                Subscribe to get real-time updates, news, and exclusive insights directly to your inbox.
              </p>
            </div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6"
              >
                <div className="text-green-500 font-bold text-lg mb-2">You're on the list!</div>
                <p className="text-sm text-brand-primary/70">We've sent a confirmation email.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-brand-surface border border-brand-primary/20 rounded-lg px-4 py-3 text-brand-primary placeholder:text-brand-primary/40 focus:outline-none focus:border-brand-primary/50 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn-primary flex items-center justify-center py-3 rounded-lg group disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="size-4 border-2 border-brand-bg border-t-transparent rounded-full"
                      />
                      Subscribing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Subscribe Now
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
