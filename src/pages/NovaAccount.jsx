import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, LogIn, UserPlus, Package, ShoppingBag, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const TABS = ['Login', 'Register', 'My Orders'];

export default function NovaAccount() {
  const [activeTab, setActiveTab] = useState('Login');
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Restore session if stored
    const stored = localStorage.getItem('nova_user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setActiveTab('My Orders');
    }
  }, []);

  useEffect(() => {
    if (user && activeTab === 'My Orders') fetchOrders();
  }, [user, activeTab]);

  const fetchOrders = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/orders/${user.id}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('nova_user', JSON.stringify(data.user));
        setActiveTab('My Orders');
        setEmail(''); setPassword('');
      } else {
        setError(data.message || 'Invalid credentials.');
      }
    } catch {
      setError('Server connection failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('nova_user', JSON.stringify(data.user));
        setSuccess('Account created! Welcome to Nova.');
        setActiveTab('My Orders');
        setEmail(''); setPassword('');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch {
      setError('Server connection failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem('nova_user');
    setActiveTab('Login');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans">
      <SEOHead title="My Account — Nova Store" description="Login or create your Nova Store customer account to track your orders." />

      {/* Nav */}
      <nav className="bg-white border-b border-black/5 px-6 h-16 flex items-center justify-between">
        <Link to="/portfolio/nova-store" className="flex items-center gap-2 text-sm font-medium hover:text-gray-500 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
        <span className="font-black text-lg tracking-tighter">NOVA.</span>
        {user && (
          <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-black transition-colors">
            Sign Out
          </button>
        )}
      </nav>

      <div className="max-w-lg mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black tracking-tight mb-2">
            {user ? `Welcome back` : 'Your Account'}
          </h1>
          {user && <p className="text-gray-500 text-sm">{user.email}</p>}
        </div>

        {/* Tabs */}
        <div className="flex bg-black/5 rounded-xl p-1 mb-8">
          {(user ? ['My Orders'] : ['Login', 'Register']).map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setError(''); setSuccess(''); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === tab ? 'bg-black text-white shadow' : 'text-gray-500 hover:text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Pane */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {/* Login */}
            {activeTab === 'Login' && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <LogIn className="w-5 h-5 text-white" />
                  </div>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Password</label>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder="••••••••" />
                  </div>
                  {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
                  <button type="submit" disabled={loading}
                    className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50">
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>
                <p className="text-center text-sm text-gray-400 mt-6">
                  No account?{' '}
                  <button onClick={() => setActiveTab('Register')} className="text-black font-medium underline">
                    Create one
                  </button>
                </p>
              </div>
            )}

            {/* Register */}
            {activeTab === 'Register' && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-white" />
                  </div>
                </div>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Password</label>
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder="Choose a secure password" />
                  </div>
                  {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
                  <button type="submit" disabled={loading}
                    className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50">
                    {loading ? 'Creating account...' : 'Create Account'}
                  </button>
                </form>
                <p className="text-center text-sm text-gray-400 mt-6">
                  Already a member?{' '}
                  <button onClick={() => setActiveTab('Login')} className="text-black font-medium underline">
                    Sign in
                  </button>
                </p>
              </div>
            )}

            {/* My Orders */}
            {activeTab === 'My Orders' && (
              <div>
                {success && (
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-6 text-sm border border-green-200">
                    <CheckCircle className="w-4 h-4" /> {success}
                  </div>
                )}
                {loading ? (
                  <div className="text-center py-16 text-gray-400">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-black/5">
                    <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">No orders yet</h3>
                    <p className="text-gray-400 text-sm mb-6">Your order history will appear here after your first purchase.</p>
                    <Link to="/portfolio/nova-store"
                      className="inline-block bg-black text-white font-medium px-6 py-2.5 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="bg-white rounded-xl p-5 shadow-sm border border-black/5 flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Package className="w-4 h-4 text-gray-400" />
                            <span className="font-bold text-sm">Order #{order.id}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              order.status === 'Processed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                            }`}>{order.status}</span>
                          </div>
                          <p className="text-gray-500 text-xs">{order.items_count} item{order.items_count !== 1 ? 's' : ''}</p>
                          <p className="text-gray-400 text-xs mt-1">
                            {new Date(order.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-black text-xl">${parseFloat(order.total).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
