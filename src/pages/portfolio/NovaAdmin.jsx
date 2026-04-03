import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Lock, LayoutDashboard, Package, ShoppingCart, 
  Settings, LogOut, Plus, Trash2, Search
} from 'lucide-react';

export default function NovaAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState('Products');
  const [products, setProducts] = useState([]);
  
  // New Product Form State
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCat, setNewCat] = useState('');
  const [newImg, setNewImg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.success && data.user.role === 'admin') {
        setIsAuthenticated(true);
      } else {
        setError(data.message || 'Unauthorized access.');
      }
    } catch (err) {
      setError('Connection to backend failed. Ensure server is running.');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          price: parseFloat(newPrice),
          category: newCat,
          image: newImg || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'
        })
      });
      if (res.ok) {
        setNewName(''); setNewPrice(''); setNewCat(''); setNewImg('');
        fetchProducts();
      }
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col justify-center items-center font-sans p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] max-w-md w-full border border-gray-100"
        >
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Admin Portal</h2>
          <p className="text-gray-500 text-center mb-8 text-sm">Sign in to manage Nova Store</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email</label>
              <input 
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-black transition-colors"
                placeholder="admin@cordex.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-black transition-colors"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-black text-white font-medium py-3 rounded-lg hover:bg-gray-800 transition-colors mt-4">
              Authenticate
            </button>
          </form>
          <div className="mt-6 text-center">
             <Link to="/portfolio/nova-store" className="text-sm text-gray-400 hover:text-black transition-colors">Return to Storefront</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F5F5F7] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="font-bold text-lg tracking-tight">NOVA<span className="text-gray-400">ADMIN</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'Products', icon: Package },
            { name: 'Orders', icon: ShoppingCart },
            { name: 'Settings', icon: Settings },
          ].map((item) => (
             <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  activeTab === item.name 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
             >
                <item.icon className="w-4 h-4" />
                {item.name}
             </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
          <h1 className="text-xl font-bold">{activeTab}</h1>
          <div className="flex items-center gap-4 text-sm font-medium">
             <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">A</span>
             Admin
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {activeTab === 'Products' ? (
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <h3 className="font-bold text-lg mb-4">Add New Product</h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Product Name</label>
                    <input required value={newName} onChange={e=>setNewName(e.target.value)} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" placeholder="Essential Tee" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Price ($)</label>
                    <input required value={newPrice} onChange={e=>setNewPrice(e.target.value)} type="number" step="0.01" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black" placeholder="45.00" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
                    <select required value={newCat} onChange={e=>setNewCat(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black">
                      <option value="" disabled>Select...</option>
                      <option value="Apparel">Apparel</option>
                      <option value="Footwear">Footwear</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                  <div>
                    <button type="submit" className="w-full bg-black text-white font-medium py-2 rounded-lg text-sm hover:bg-gray-800 flex justify-center items-center gap-2">
                       <Plus className="w-4 h-4" /> Add Product
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                   <h3 className="font-semibold">Inventory</h3>
                   <div className="relative">
                     <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                     <input type="text" placeholder="Search products..." className="pl-9 pr-4 py-1.5 text-sm rounded-md border border-gray-200 focus:outline-none focus:border-black w-64" />
                   </div>
                </div>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 bg-white">
                      <th className="py-3 px-6 font-medium">Product</th>
                      <th className="py-3 px-6 font-medium">Category</th>
                      <th className="py-3 px-6 font-medium">Price</th>
                      <th className="py-3 px-6 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-6 font-medium flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-md object-cover border border-gray-200" />
                          {p.name}
                        </td>
                        <td className="py-3 px-6 text-gray-500">{p.category}</td>
                        <td className="py-3 px-6 font-medium">${p.price.toFixed(2)}</td>
                        <td className="py-3 px-6 text-right">
                          <button className="text-gray-400 hover:text-red-500 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr><td colSpan="4" className="py-8 text-center text-gray-500">No products found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
               {activeTab} module is under construction.
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
