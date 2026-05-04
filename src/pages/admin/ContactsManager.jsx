import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trash2, Eye, CheckCircle, RefreshCw, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function ContactsManager() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    setContacts(data || []);
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await supabase.from('contact_submissions').update({ status }).eq('id', id);
    setContacts(cs => cs.map(c => c.id === id ? { ...c, status } : c));
    if (selected?.id === id) setSelected(s => ({ ...s, status }));
  };

  const deleteContact = async (id) => {
    if (!confirm('Delete this submission?')) return;
    await supabase.from('contact_submissions').delete().eq('id', id);
    setContacts(cs => cs.filter(c => c.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = filter === 'all' ? contacts : contacts.filter(c => c.status === filter);

  const statusBadge = (s) => ({
    new:     'bg-[#c8f04d]/10 text-[#c8f04d]',
    read:    'bg-white/10 text-white/50',
    replied: 'bg-green-500/10 text-green-400',
  }[s] || '');

  return (
    <div className="flex h-screen bg-[#080808] text-white">
      {/* Sidebar (reuse link) */}
      <div className="flex flex-col w-full max-w-6xl mx-auto p-6 space-y-6 overflow-auto">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-serif font-black text-white">Contact Submissions</h1>
          <button onClick={fetchContacts} className="ml-auto text-white/30 hover:text-white">
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'new', 'read', 'replied'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-sans font-bold transition-all ${
                filter === f ? 'bg-[#c8f04d] text-[#080808]' : 'bg-white/10 text-white/50 hover:bg-white/20'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-white/30 text-sm font-sans self-center">{filtered.length} results</span>
        </div>

        <div className="flex gap-6 flex-1 min-h-0">
          {/* List */}
          <div className="flex-1 space-y-2 overflow-auto">
            {loading ? (
              <p className="text-white/30 font-sans text-sm">Loading submissions...</p>
            ) : filtered.length === 0 ? (
              <p className="text-white/30 font-sans text-sm">No submissions found.</p>
            ) : (
              filtered.map(c => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelected(c)}
                  className={`bg-white/5 border rounded-xl p-4 cursor-pointer hover:bg-white/8 transition-all ${
                    selected?.id === c.id ? 'border-[#c8f04d]/40' : 'border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-white font-semibold font-sans truncate">{c.name}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${statusBadge(c.status)}`}>
                          {c.status}
                        </span>
                      </div>
                      <p className="text-white/40 text-sm font-sans truncate">{c.email}</p>
                      <p className="text-white/30 text-xs font-sans mt-1">
                        {c.project_type} · {c.budget} · {new Date(c.created_at).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={e => { e.stopPropagation(); updateStatus(c.id, 'replied'); }}
                        title="Mark replied" className="text-green-400/50 hover:text-green-400 transition-colors">
                        <CheckCircle size={16} />
                      </button>
                      <button onClick={e => { e.stopPropagation(); deleteContact(c.id); }}
                        title="Delete" className="text-red-400/50 hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Detail panel */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                className="w-80 shrink-0 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 overflow-auto"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-white font-serif font-bold text-lg">Detail</h2>
                  <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white">
                    ✕
                  </button>
                </div>
                <div className="space-y-3 text-sm font-sans">
                  <div><p className="text-white/40 text-xs uppercase tracking-widest mb-1">Name</p><p className="text-white">{selected.name}</p></div>
                  <div><p className="text-white/40 text-xs uppercase tracking-widest mb-1">Email</p>
                    <a href={`mailto:${selected.email}`} className="text-[#c8f04d] hover:underline">{selected.email}</a>
                  </div>
                  <div><p className="text-white/40 text-xs uppercase tracking-widest mb-1">Project Type</p><p className="text-white">{selected.project_type || '—'}</p></div>
                  <div><p className="text-white/40 text-xs uppercase tracking-widest mb-1">Budget</p><p className="text-white">{selected.budget || '—'}</p></div>
                  <div><p className="text-white/40 text-xs uppercase tracking-widest mb-1">Message</p><p className="text-white/70 leading-relaxed">{selected.message}</p></div>
                  <div><p className="text-white/40 text-xs uppercase tracking-widest mb-1">Received</p><p className="text-white">{new Date(selected.created_at).toLocaleString('en-IN')}</p></div>
                </div>
                <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                  <a href={`mailto:${selected.email}`}
                    className="flex items-center justify-center gap-2 bg-[#c8f04d] text-[#080808] py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#d4f76a] transition-colors">
                    <Mail size={14} /> Reply via Email
                  </a>
                  <button onClick={() => updateStatus(selected.id, 'read')}
                    className="flex items-center justify-center gap-2 bg-white/5 text-white/60 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                    <Eye size={14} /> Mark as Read
                  </button>
                  <button onClick={() => deleteContact(selected.id)}
                    className="flex items-center justify-center gap-2 bg-red-500/10 text-red-400 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-colors">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
