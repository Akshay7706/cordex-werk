import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Pencil, Trash2, Eye, EyeOff, Star, RefreshCw, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const emptyPost = { title: '', excerpt: '', content: '', category: '', read_time: '', image_url: '', published: false, featured: false };

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'create' | 'edit'
  const [form, setForm] = useState(emptyPost);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const openCreate = () => { setForm(emptyPost); setModal('create'); };
  const openEdit = (post) => { setForm(post); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(emptyPost); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal === 'create') {
        const { data, error } = await supabase.from('blog_posts').insert([form]).select().single();
        if (error) throw error;
        if (data) setPosts(p => [data, ...p]);
      } else {
        const { data, error } = await supabase.from('blog_posts').update(form).eq('id', form.id).select().single();
        if (error) throw error;
        if (data) setPosts(p => p.map(x => x.id === data.id ? data : x));
      }
      closeModal();
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving post: ' + (error.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const toggleField = async (id, field) => {
    const post = posts.find(p => p.id === id);
    const val = !post[field];
    await supabase.from('blog_posts').update({ [field]: val }).eq('id', id);
    setPosts(ps => ps.map(p => p.id === id ? { ...p, [field]: val } : p));
  };

  const deletePost = async (id) => {
    setSaving(true);
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) {
      console.error('Delete error:', error);
      alert('Delete failed: ' + error.message);
    } else {
      setPosts(ps => ps.filter(p => p.id !== id));
      setDeletingId(null);
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin" className="text-white/40 hover:text-white transition-colors"><ArrowLeft size={20} /></Link>
        <h1 className="text-2xl font-serif font-black text-white">Blog Posts</h1>
        <button onClick={fetchPosts} className="text-white/30 hover:text-white ml-2"><RefreshCw size={16} /></button>
        <button onClick={openCreate} className="ml-auto flex items-center gap-2 bg-[#c8f04d] text-[#080808] px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#d4f76a] transition-colors">
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <p className="text-white/30 p-6 font-sans text-sm">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-white/30 p-6 font-sans text-sm">No blog posts yet. Create your first one!</p>
        ) : (
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-3 text-white/40 text-xs uppercase tracking-widest">Title</th>
                <th className="text-left px-6 py-3 text-white/40 text-xs uppercase tracking-widest hidden sm:table-cell">Category</th>
                <th className="text-center px-4 py-3 text-white/40 text-xs uppercase tracking-widest">Published</th>
                <th className="text-center px-4 py-3 text-white/40 text-xs uppercase tracking-widest">Featured</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/3">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{p.title}</p>
                    <p className="text-white/30 text-xs mt-0.5">{p.read_time}</p>
                  </td>
                  <td className="px-6 py-4 text-white/50 hidden sm:table-cell">{p.category || '—'}</td>
                  <td className="px-4 py-4 text-center">
                    <button onClick={() => toggleField(p.id, 'published')} className={p.published ? 'text-[#c8f04d]' : 'text-white/20'}>
                      {p.published ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button onClick={() => toggleField(p.id, 'featured')} className={p.featured ? 'text-yellow-400' : 'text-white/20'}>
                      <Star size={16} fill={p.featured ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => openEdit(p)} className="text-white/40 hover:text-white"><Pencil size={15} /></button>
                      <button onClick={() => setDeletingId(p.id)} className="text-red-400/40 hover:text-red-400"><Trash2 size={15} /></button>
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
              <h2 className="text-xl font-serif font-bold mb-2">Delete Blog Post?</h2>
              <p className="text-white/40 text-sm mb-8 font-sans">This article will be permanently removed from the site.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingId(null)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">Cancel</button>
                <button onClick={() => deletePost(deletingId)} disabled={saving} className="flex-1 py-3 bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-600 disabled:opacity-50 transition-colors">
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
                  {modal === 'create' ? 'New Blog Post' : 'Edit Post'}
                </h2>
                <button onClick={closeModal} className="text-white/40 hover:text-white"><X size={20} /></button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'title',     label: 'Title',       full: true },
                  { key: 'excerpt',   label: 'Excerpt',     full: true },
                  { key: 'category',  label: 'Category' },
                  { key: 'read_time', label: 'Read Time' },
                  { key: 'image_url', label: 'Image URL',   full: true },
                ].map(({ key, label, full }) => (
                  <div key={key} className={full ? 'sm:col-span-2' : ''}>
                    <label className="text-white/40 text-xs uppercase tracking-widest font-sans mb-1.5 block">{label}</label>
                    <input
                      value={form[key] || ''}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white font-sans text-sm focus:outline-none focus:border-[#c8f04d]/50 transition-colors"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="text-white/40 text-xs uppercase tracking-widest font-sans mb-1.5 block">Content (Markdown)</label>
                  <textarea
                    value={form.content || ''}
                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white font-sans text-sm focus:outline-none focus:border-[#c8f04d]/50 transition-colors resize-y"
                  />
                </div>
              </div>

              <div className="flex gap-6">
                {[{ key: 'published', label: 'Published' }, { key: 'featured', label: 'Featured' }].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer select-none font-sans text-sm text-white/60">
                    <input type="checkbox" checked={!!form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))}
                      className="accent-[#c8f04d] w-4 h-4" />
                    {label}
                  </label>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={closeModal} className="flex-1 py-3 bg-white/5 text-white/60 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={saving || !form.title}
                  className="flex-1 py-3 bg-[#c8f04d] text-[#080808] rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#d4f76a] disabled:opacity-50 transition-colors">
                  {saving ? 'Saving...' : 'Save Post'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
