import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Pencil, Trash2, CheckCircle2, X, Quote, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const emptyTestimonial = { name: '', role: '', company: '', content: '', avatar_url: '', is_featured: true };

export default function TestimonialsManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyTestimonial);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  const openCreate = () => { setForm(emptyTestimonial); setModal('create'); };
  const openEdit = (t) => { setForm(t); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(emptyTestimonial); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal === 'create') {
        const { data, error } = await supabase.from('testimonials').insert([form]).select().single();
        if (error) throw error;
        if (data) setItems(prev => [data, ...prev]);
      } else {
        const { data, error } = await supabase.from('testimonials').update(form).eq('id', form.id).select().single();
        if (error) throw error;
        if (data) setItems(prev => prev.map(x => x.id === data.id ? data : x));
      }
      closeModal();
    } catch (err) {
      alert('Error saving testimonial: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteTestimonial = async (id) => {
    setSaving(true);
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) {
      alert('Delete failed: ' + error.message);
    } else {
      setItems(prev => prev.filter(x => x.id !== id));
      setDeletingId(null);
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white p-6 space-y-6 font-sans">
      <div className="flex items-center gap-4">
        <Link to="/admin" className="text-white/40 hover:text-white"><ArrowLeft size={20} /></Link>
        <h1 className="text-2xl font-serif font-black text-white">Testimonials</h1>
        <button onClick={openCreate} className="ml-auto flex items-center gap-2 bg-[#c8f04d] text-[#080808] px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#d4f76a] transition-colors">
          <Plus size={16} /> New Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-white/30 text-sm">Loading reviews...</p>
        ) : items.map((t) => (
          <div key={t.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col group relative overflow-hidden">
            <Quote size={48} className="absolute -top-2 -right-2 text-white/5 rotate-12" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 border border-white/10 shrink-0">
                {t.avatar_url ? (
                  <img src={t.avatar_url} alt={t.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20"><User size={20} /></div>
                )}
              </div>
              <div>
                <h3 className="text-white font-bold text-sm leading-tight">{t.name}</h3>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">{t.role} @ {t.company}</p>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6 font-serif italic italic">"{t.content}"</p>

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
               <span className={`text-[10px] uppercase tracking-widest font-bold ${t.is_featured ? 'text-[#c8f04d]' : 'text-white/20'}`}>
                 {t.is_featured ? 'Featured' : 'Draft'}
               </span>
               <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(t)} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white"><Pencil size={14} /></button>
                <button onClick={() => setDeletingId(t.id)} className="p-2 hover:bg-white/10 rounded-lg text-red-400/40 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {deletingId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setDeletingId(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative z-10 bg-[#111] border border-red-500/20 rounded-3xl p-8 w-full max-w-sm text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mx-auto mb-6">
                <Trash2 size={32} />
              </div>
              <h2 className="text-xl font-serif font-bold mb-2">Delete Testimonial?</h2>
              <p className="text-white/40 text-sm mb-8 font-sans">This client review will be permanently removed.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingId(null)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">Cancel</button>
                <button onClick={() => deleteTestimonial(deletingId)} disabled={saving} className="flex-1 py-3 bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-600 disabled:opacity-50 transition-colors">
                  {saving ? 'Deleting...' : 'Delete Now'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative z-10 bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-lg space-y-6 overflow-auto max-h-[90vh]">
              <h2 className="text-xl font-serif font-bold">{modal === 'create' ? 'New Testimonial' : 'Edit Testimonial'}</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1.5 block">Name</label>
                    <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#c8f04d]/50 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1.5 block">Role</label>
                    <input type="text" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#c8f04d]/50 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1.5 block">Company</label>
                  <input type="text" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#c8f04d]/50 outline-none" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1.5 block">Review Content</label>
                  <textarea rows={4} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#c8f04d]/50 outline-none resize-none font-serif italic" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1.5 block">Avatar URL</label>
                  <input type="text" value={form.avatar_url} onChange={e => setForm(f => ({ ...f, avatar_url: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#c8f04d]/50 outline-none" placeholder="Unsplash URL recommended" />
                </div>
                <label className="flex items-center gap-3 cursor-pointer select-none py-2">
                  <input type="checkbox" checked={form.is_featured} onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} className="w-4 h-4 accent-[#c8f04d]" />
                  <span className="text-sm text-white/60">Featured (Visible in slider)</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={closeModal} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors text-white/50">Cancel</button>
                <button onClick={handleSave} disabled={saving || !form.name} className="flex-1 py-3 bg-[#c8f04d] text-[#080808] rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#d4f76a] disabled:opacity-50 transition-colors">
                  {saving ? 'Saving...' : 'Save Review'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
