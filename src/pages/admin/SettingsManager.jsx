import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Image as ImageIcon, RefreshCw, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function SettingsManager() {
  const [heroImage, setHeroImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'hero_image')
      .maybeSingle();
    
    if (data) {
      setHeroImage(data.value);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    
    const { error } = await supabase
      .from('site_settings')
      .upsert({ id: 'hero_image', value: heroImage, updated_at: new Date().toISOString() });

    if (error) {
      alert('Error saving settings: ' + error.message);
    } else {
      setMessage('Settings updated successfully!');
      setTimeout(() => setMessage(null), 3000);
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin" className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-serif font-black text-white tracking-tight">Site Settings</h1>
        <button onClick={fetchSettings} className="text-white/20 hover:text-white ml-2 transition-colors">
          <RefreshCw size={16} />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-white/30 font-sans text-sm">
          <RefreshCw size={16} className="animate-spin" />
          Loading settings...
        </div>
      ) : (
        <div className="max-w-4xl space-y-8">
          {/* Hero Section Settings */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <ImageIcon className="text-[#c8f04d]" size={20} />
              <h2 className="text-xl font-serif font-bold">Hero Section</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-widest font-sans mb-3">
                  Hero Image URL (Unsplash recommended)
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-[#c8f04d]/50 transition-colors"
                  />
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#c8f04d] text-[#080808] px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#d4f76a] disabled:opacity-50 transition-all flex items-center gap-2"
                  >
                    {saving ? 'Saving...' : <><Save size={18} /> Save</>}
                  </button>
                </div>
              </div>

              {/* Preview Area */}
              <div className="space-y-3">
                <p className="text-xs text-white/20 uppercase tracking-widest font-sans">Live Preview</p>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black">
                  {heroImage ? (
                    <img 
                      src={heroImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover opacity-60"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/10 font-sans text-sm italic">
                      No image URL provided
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="text-center">
                        <p className="text-[#c8f04d] text-4xl font-black uppercase tracking-tighter leading-none opacity-40">WE BUILD</p>
                        <p className="text-white text-4xl font-serif italic font-light opacity-30">websites</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Success Message */}
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-10 right-10 bg-[#c8f04d] text-[#080808] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 font-bold uppercase tracking-widest text-sm"
            >
              <CheckCircle2 size={20} />
              {message}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
