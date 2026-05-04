import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import SEO from '../../components/SEO';

import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <>
      <SEO title="Admin Login | Kreato Space" description="Restricted admin area." />
      <div className="min-h-screen bg-[#080808] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c8f04d]/5 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 w-full max-w-md mx-4"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#c8f04d]/10 border border-[#c8f04d]/20 mb-6">
              <Lock size={28} className="text-[#c8f04d]" />
            </div>
            <h1 className="text-4xl font-serif font-black tracking-tighter text-white mb-2">
              Admin Access
            </h1>
            <p className="text-white/40 font-sans text-sm">
              Sign in to your agency account
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest font-sans mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kreatospsce@gmail.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 font-sans focus:outline-none focus:border-[#c8f04d]/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-white/50 uppercase tracking-widest font-sans mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-white/20 font-sans focus:outline-none focus:border-[#c8f04d]/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-sm font-sans flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full py-3.5 bg-[#c8f04d] text-[#080808] font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-[#d4f76a] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Authenticating...' : <><ArrowRight size={16} /> Login to Dashboard</>}
              </button>
            </form>
          </div>

          <p className="text-center text-white/20 text-xs font-sans mt-6">
            Kreato Space · Restricted Area
          </p>
        </motion.div>
      </div>
    </>
  );
}
