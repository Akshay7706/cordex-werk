import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff, RefreshCw, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const emptyCase = { title: '', client: '', industry: '', location: '', challenge: '', solution: '', results: '', image_url: '', published: true, sort_order: 0 };

export default function CaseStudiesManager() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyCase);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { fetchCases(); }, []);

  const fetchCases = async () => {
    setLoading(true);
    const { data } = await supabase.from('case_studies').select('*').order('sort_order').order('created_at', { ascending: false });
    setCases(data || []);
    setLoading(false);
  };

  const openCreate = () => { setForm(emptyCase); setModal('create'); };
  const openEdit = (c) => { setForm(c); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(emptyCase); };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (modal === 'create') {
        const { data, error } = await supabase.from('case_studies').insert([form]).select().single();
        if (error) throw error;
        if (data) setCases(cs => [data, ...cs]);
      } else {
        const { data, error } = await supabase.from('case_studies').update(form).eq('id', form.id).select().single();
        if (error) throw error;
        if (data) setCases(cs => cs.map(c => c.id === data.id ? data : c));
      }
      closeModal();
    } catch (err) {
      console.error('Error saving case study:', err);
      alert('Failed to save case study: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (id) => {
    const c = cases.find(x => x.id === id);
    await supabase.from('case_studies').update({ published: !c.published }).eq('id', id);
    setCases(cs => cs.map(x => x.id === id ? { ...x, published: !x.published } : x));
  };

  const deleteCase = async (id) => {
    setSaving(true);
    const { error } = await supabase.from('case_studies').delete().eq('id', id);
    if (error) {
      console.error('Delete error:', error);
      alert('Delete failed: ' + error.message);
    } else {
      setCases(cs => cs.filter(c => c.id !== id));
      setDeletingId(null);
    }
    setSaving(false);
  };

  const fields = [
    { key: 'title',    label: 'Title',     full: true },
    { key: 'client',   label: 'Client' },
    { key: 'industry', label: 'Industry' },
    { key: 'location', label: 'Location' },
    { key: 'image_url',label: 'Image URL', full: true },
    { key: 'challenge',label: 'Challenge', full: true, multi: true },
    { key: 'solution', label: 'Solution',  full: true, multi: true },
    { key: 'results',  label: 'Results',   full: true, multi: true },
    { key: 'sort_order',label: 'Sort Order (0 = first)', type: 'number' },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin" className="text-white/40 hover:text-white"><ArrowLeft size={20} /></Link>
        <h1 className="text-2xl font-serif font-black text-white">Case Studies</h1>
        <button onClick={fetchCases} className="text-white/30 hover:text-white ml-2"><RefreshCw size={16} /></button>
        <button onClick={openCreate} className="ml-auto flex items-center gap-2 bg-[#c8f04d] text-[#080808] px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#d4f76a] transition-colors">
          <Plus size={16} /> New Case Study
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <p className="text-white/30 p-6 font-sans text-sm">Loading case studies...</p>
        ) : cases.length === 0 ? (
          <p className="text-white/30 p-6 font-sans text-sm">No case studies yet. Create your first one!</p>
        ) : (
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-3 text-white/40 text-xs uppercase tracking-widest">#</th>
                <th className="text-left px-6 py-3 text-white/40 text-xs uppercase tracking-widest">Title</th>
                <th className="text-left px-6 py-3 text-white/40 text-xs uppercase tracking-widest hidden sm:table-cell">Client</th>
                <th className="text-left px-6 py-3 text-white/40 text-xs uppercase tracking-widest hidden md:table-cell">Industry</th>
                <th className="text-center px-4 py-3 text-white/40 text-xs uppercase tracking-widest">Live</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {cases.map((c, i) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/3">
                  <td className="px-6 py-4 text-white/30 font-mono text-xs">{(c.sort_order ?? i) + 1}</td>
                  <td className="px-6 py-4 text-white font-medium">{c.title}</td>
                  <td className="px-6 py-4 text-white/50 hidden sm:table-cell">{c.client}</td>
                  <td className="px-6 py-4 text-white/50 hidden md:table-cell">{c.industry}</td>
                  <td className="px-4 py-4 text-center">
                    <button onClick={() => togglePublished(c.id)} className={c.published ? 'text-[#c8f04d]' : 'text-white/20'}>
                      {c.published ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => openEdit(c)} className="text-white/40 hover:text-white"><Pencil size={15} /></button>
                      <button onClick={() => setDeletingId(c.id)} className="text-red-400/40 hover:text-red-400"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Deletion Confirmation Modal */}
      <AnimatePresence>
        {deletingId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setDeletingId(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative z-10 bg-[#111] border border-red-500/20 rounded-3xl p-8 w-full max-w-sm text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mx-auto mb-6">
                <Trash2 size={32} />
              </div>
              <h2 className="text-xl font-serif font-bold mb-2">Delete Case Study?</h2>
              <p className="text-white/40 text-sm mb-8 font-sans">This portfolio piece will be permanently removed.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingId(null)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">Cancel</button>
                <button onClick={() => deleteCase(deletingId)} disabled={saving} className="flex-1 py-3 bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-600 disabled:opacity-50 transition-colors">
                  {saving ? 'Deleting...' : 'Delete Now'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-auto space-y-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-white font-serif font-bold text-xl">
                  {modal === 'create' ? 'New Case Study' : 'Edit Case Study'}
                </h2>
                <button onClick={closeModal} className="text-white/40 hover:text-white"><X size={20} /></button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map(({ key, label, full, multi, type }) => (
                  <div key={key} className={full ? 'sm:col-span-2' : ''}>
                    <label className="text-white/40 text-xs uppercase tracking-widest font-sans mb-1.5 block">{label}</label>
                    {multi ? (
                      <textarea
                        value={form[key] || ''}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white font-sans text-sm focus:outline-none focus:border-[#c8f04d]/50 transition-colors resize-y"
                      />
                    ) : (
                      <input
                        type={type || 'text'}
                        value={form[key] || ''}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white font-sans text-sm focus:outline-none focus:border-[#c8f04d]/50 transition-colors"
                      />
                    )}
                  </div>
                ))}
              </div>

              <label className="flex items-center gap-2 cursor-pointer font-sans text-sm text-white/60">
                <input type="checkbox" checked={!!form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                  className="accent-[#c8f04d] w-4 h-4" />
                Published (visible on site)
              </label>

              <div className="flex gap-3 pt-2">
                <button onClick={closeModal} className="flex-1 py-3 bg-white/5 text-white/60 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={saving || !form.title}
                  className="flex-1 py-3 bg-[#c8f04d] text-[#080808] rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#d4f76a] disabled:opacity-50 transition-colors">
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
