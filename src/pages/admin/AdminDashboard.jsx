import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Mail, FileText, Layers, LogOut,
  Users, Eye, TrendingUp, ChevronRight, Menu, X, Settings, Zap, MessageSquare
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import SEO from '../../components/SEO';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Mail,            label: 'Contacts',  path: '/admin/contacts' },
  { icon: FileText,        label: 'Blog Posts',path: '/admin/blog' },
  { icon: Layers,          label: 'Case Studies', path: '/admin/case-studies' },
  { icon: Zap,             label: 'Services',  path: '/admin/services' },
  { icon: MessageSquare,   label: 'Testimonials',path: '/admin/testimonials' },
  { icon: Settings,        label: 'Settings',  path: '/admin/settings' },
];

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-5">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-white/40 text-xs uppercase tracking-widest font-sans mb-1">{label}</p>
        <p className="text-white text-3xl font-serif font-black">{value ?? '—'}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ contacts: 0, posts: 0, cases: 0 });
  const [analytics, setAnalytics] = useState({ weeklyLeads: 0, topBlogs: [], topCountries: [] });
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchAnalytics();
  }, []);

  const fetchStats = async () => {
    try {
      const [{ count: contacts }, { count: posts }, { count: cases }, { data: recent }] =
        await Promise.all([
          supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
          supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
          supabase.from('case_studies').select('*', { count: 'exact', head: true }),
          supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(5),
        ]);
      setStats({ contacts: contacts || 0, posts: posts || 0, cases: cases || 0 });
      setRecentContacts(recent || []);
    } catch (err) {
      console.error(err);
    } finally {
      // Don't set loading false until analytics are done
    }
  };

  const fetchAnalytics = async () => {
    try {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      
      const [weeklyLeads, topBlogs, countryData] = await Promise.all([
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).gt('created_at', sevenDaysAgo),
        supabase.from('blog_posts').select('title, views').order('views', { ascending: false }).limit(3),
        supabase.from('analytics_events').select('country')
      ]);

      // Process Countries
      const countries = countryData.data?.reduce((acc, curr) => {
        acc[curr.country] = (acc[curr.country] || 0) + 1;
        return acc;
      }, {}) || {};
      
      const topCountries = Object.entries(countries)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([name, count]) => ({ name, count }));

      setAnalytics({
        weeklyLeads: weeklyLeads.count || 0,
        topBlogs: topBlogs.data || [],
        topCountries: topCountries
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-[#0d0d0d] border-r border-white/10 w-64 shrink-0">
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="text-xl font-serif font-black tracking-tighter text-white">
          Kreato Space
        </Link>
        <p className="text-[#c8f04d] text-xs uppercase tracking-[0.2em] mt-1 font-sans">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm transition-all ${
                active
                  ? 'bg-[#c8f04d]/10 text-[#c8f04d] font-semibold'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              {label}
              {active && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/10 text-sm font-sans transition-all"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <SEO title="Admin Dashboard | Kreato Space" description="Kreato Space admin panel." />
      <div className="flex h-screen bg-[#080808] text-white overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
            <div className="relative z-10 flex">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0 overflow-auto">
          {/* Topbar */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden text-white/50 hover:text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={22} />
              </button>
              <h1 className="text-lg font-serif font-bold text-white">Dashboard</h1>
            </div>
            <span className="text-xs text-white/30 font-sans uppercase tracking-widest">
              {new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' })}
            </span>
          </header>

          <main className="flex-1 p-6 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={Mail}   label="Total Leads" value={stats.contacts} color="bg-blue-500/10 text-blue-400" />
              <StatCard icon={FileText} label="Blog Posts" value={stats.posts} color="bg-[#c8f04d]/10 text-[#c8f04d]" />
              <StatCard icon={Layers} label="Case Studies" value={stats.cases} color="bg-purple-500/10 text-purple-400" />
            </div>

            {/* Pulse Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#c8f04d]/10 to-transparent border border-[#c8f04d]/20 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <TrendingUp size={120} className="text-[#c8f04d]" />
                </div>
                <div className="relative z-10">
                  <span className="text-[#c8f04d] uppercase tracking-[0.3em] font-bold text-[10px] mb-2 block">Weekly Momentum</span>
                  <h2 className="text-4xl font-serif font-black mb-1">+{analytics.weeklyLeads}</h2>
                  <p className="text-white/40 text-xs font-sans">New leads in the last 7 days</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-serif font-bold text-lg">Top Performing</h3>
                  <div className="flex gap-2">
                    <div className="px-2 py-1 bg-white/5 rounded text-[10px] uppercase font-bold text-white/30">Blogs</div>
                    <div className="px-2 py-1 bg-white/5 rounded text-[10px] uppercase font-bold text-white/30">Countries</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {analytics.topBlogs.map((blog, i) => (
                      <div key={i} className="space-y-1">
                        <p className="text-white/80 text-sm font-medium line-clamp-1">{blog.title}</p>
                        <p className="text-[#c8f04d] text-[10px] font-bold uppercase tracking-widest">{blog.views} Views</p>
                      </div>
                    ))}
                    {analytics.topBlogs.length === 0 && <p className="text-white/20 text-xs italic font-sans">No data yet</p>}
                  </div>
                  <div className="space-y-4 border-l border-white/5 pl-8">
                    {analytics.topCountries.map((c, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <p className="text-white/80 text-sm font-medium">{c.name}</p>
                        <p className="text-white/30 text-[10px] font-bold">{c.count}</p>
                      </div>
                    ))}
                    {analytics.topCountries.length === 0 && <p className="text-white/20 text-xs italic font-sans">No data yet</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent contacts */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-serif font-bold text-xl">Recent Leads</h2>
                <Link to="/admin/contacts" className="text-[#c8f04d] text-xs uppercase tracking-widest font-sans hover:underline">
                  View all →
                </Link>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                {loading ? (
                  <p className="text-white/30 text-sm p-6 font-sans">Loading...</p>
                ) : recentContacts.length === 0 ? (
                  <p className="text-white/30 text-sm p-6 font-sans">No submissions yet. Share your contact page!</p>
                ) : (
                  <table className="w-full text-sm font-sans">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left px-6 py-3 text-white/40 uppercase tracking-widest text-xs">Name</th>
                        <th className="text-left px-6 py-3 text-white/40 uppercase tracking-widest text-xs">Email</th>
                        <th className="text-left px-6 py-3 text-white/40 uppercase tracking-widest text-xs hidden sm:table-cell">Type</th>
                        <th className="text-left px-6 py-3 text-white/40 uppercase tracking-widest text-xs">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentContacts.map((c) => (
                        <tr key={c.id} className="border-b border-white/5 hover:bg-white/3">
                          <td className="px-6 py-3 text-white font-medium">{c.name}</td>
                          <td className="px-6 py-3 text-white/60">{c.email}</td>
                          <td className="px-6 py-3 text-white/60 hidden sm:table-cell">{c.project_type || '—'}</td>
                          <td className="px-6 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                              c.status === 'new'     ? 'bg-[#c8f04d]/10 text-[#c8f04d]' :
                              c.status === 'replied' ? 'bg-green-500/10 text-green-400' :
                              'bg-white/10 text-white/50'
                            }`}>
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
