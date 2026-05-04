import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Pencil, Trash2, Save, X, Layers, List } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const emptyService = { title: '', description: '', features: [], icon_name: 'Layers', sort_order: 0 };

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyService);
  const [featureInput, setFeatureInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data } = await supabase.from('services').select('*').order('sort_order');
    setServices(data || []);
    setLoading(false);
  };

  const openCreate = () => { setForm(emptyService); setModal('create'); };
  const openEdit = (s) => { setForm(s); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(emptyService); setFeatureInput(''); };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setForm(f => ({ ...f, features: [...(f.features || []), featureInput.trim()] }));
    setFeatureInput('');
  };

  const removeFeature = (idx) => {
    setForm(f => ({ ...f, features: f.features.filter((_, i) => i !== idx) }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal === 'create') {
        const { data, error } = await supabase.from('services').insert([form]).select().single();
        if (error) throw error;
        if (data) setServices(s => [...s, data].sort((a, b) => a.sort_order - b.sort_order));
      } else {
        const { data, error } = await supabase.from('services').update(form).eq('id', form.id).select().single();
        if (error) throw error;
        if (data) setServices(s => s.map(x => x.id === data.id ? data : x).sort((a, b) => a.sort_order - b.sort_order));
      }
      closeModal();
    } catch (err) {
      alert('Error saving service: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteService = async (id) => {
    setSaving(true);
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      alert('Delete failed: ' + error.message);
    } else {
      setServices(s => s.filter(x => x.id !== id));
      setDeletingId(null);
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white p-6 space-y-6 font-sans">
      <div className="flex items-center gap-4">
        <Link to="/admin" className="text-white/40 hover:text-white"><ArrowLeft size={20} /></Link>
        <h1 className="text-2xl font-serif font-black text-white">Services Manager</h1>
        <button onClick={openCreate} className="ml-auto flex items-center gap-2 bg-[#c8f04d] text-[#080808] px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#d4f76a] transition-colors">
          <Plus size={16} /> New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-white/30 text-sm">Loading services...</p>
        ) : services.map((s) => (
          <div key={s.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#c8f04d]/10 flex items-center justify-center text-[#c8f04d]">
                <Layers size={20} />
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(s)} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white"><Pencil size={14} /></button>
                <button onClick={() => setDeletingId(s.id)} className="p-2 hover:bg-white/10 rounded-lg text-red-400/40 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">{s.title}</h3>
            <p className="text-white/50 text-sm mb-4 line-clamp-2">{s.description}</p>
            <div className="mt-auto pt-4 border-t border-white/5">
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2 font-bold">Key Features</p>
              <div className="flex flex-wrap gap-2">
                {s.features?.map((f, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 bg-white/5 rounded-md text-white/40 border border-white/5">{f}</span>
                ))}
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
              <h2 className="text-xl font-serif font-bold mb-2">Delete Service?</h2>
              <p className="text-white/40 text-sm mb-8 font-sans">This action is permanent and cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingId(null)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">Cancel</button>
                <button onClick={() => deleteService(deletingId)} disabled={saving} className="flex-1 py-3 bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-600 disabled:opacity-50 transition-colors">
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
              <h2 className="text-xl font-serif font-bold">{modal === 'create' ? 'New Service' : 'Edit Service'}</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1.5 block">Title</label>
                  <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#c8f04d]/50 outline-none" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1.5 block">Description</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#c8f04d]/50 outline-none resize-none" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1.5 block">Features</label>
                  <div className="flex gap-2 mb-3">
                    <input type="text" value={featureInput} onChange={e => setFeatureInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:border-[#c8f04d]/50 outline-none" placeholder="e.g. Next.js Support" />
                    <button onClick={addFeature} className="bg-white/10 px-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.features?.map((f, i) => (
                      <span key={i} className="flex items-center gap-2 text-xs px-3 py-1.5 bg-[#c8f04d]/10 text-[#c8f04d] rounded-lg border border-[#c8f04d]/20">
                        {f} <button onClick={() => removeFeature(i)}><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold mb-1.5 block">Sort Order</label>
                  <input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: parseInt(e.target.value) }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#c8f04d]/50 outline-none" />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={closeModal} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors text-white/50">Cancel</button>
                <button onClick={handleSave} disabled={saving || !form.title} className="flex-1 py-3 bg-[#c8f04d] text-[#080808] rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#d4f76a] disabled:opacity-50 transition-colors">
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
