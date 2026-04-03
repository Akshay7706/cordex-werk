import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, X, Plus, Minus, Search, 
  User, CreditCard, ChevronRight, CheckCircle
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';

export default function NovaStore() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('nova_user');
    if (stored) setCurrentUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          total: cartTotal, 
          items_count: totalItems,
          user_id: currentUser?.id || null
        })
      });
      if (res.ok) {
        setCheckoutSuccess(true);
        setCartItems([]);
        setTimeout(() => {
          setCheckoutSuccess(false);
          setIsCartOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Checkout failed", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-black selection:text-white pb-24">
      <SEOHead title="Nova Store" description="Shop the Nova collection — premium tech and lifestyle products." />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="font-heading font-black tracking-tighter text-xl sm:text-2xl uppercase">NOVA.</span>
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium ml-4">
              <a href="#shop" className="hover:text-gray-500 transition-colors">Shop</a>
              <a href="#" className="hover:text-gray-500 transition-colors">Collections</a>
              <Link to="/" className="hover:text-gray-500 transition-colors">Exit</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-gray-500 transition-colors hidden sm:block" />
            <Link 
              to="/portfolio/nova-store/account"
              className="relative hover:text-gray-500 transition-colors"
              title={currentUser ? `Account: ${currentUser.email}` : 'Account'}
            >
              <User className="w-5 h-5" />
              {currentUser && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
              )}
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer hover:text-gray-500 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section id="shop" className="pt-16 sm:pt-20">
        <div className="h-[50vh] sm:h-[60vh] bg-gray-100 relative overflow-hidden flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1600" 
            alt="Hero Product" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          
          <div className="relative z-10 text-center px-6 mix-blend-difference text-white">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
              className="font-heading font-black text-5xl md:text-8xl tracking-tighter uppercase mb-4"
            >
              The Next <br/> Generation
            </motion.h1>
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            >
              <button className="bg-white text-black font-semibold uppercase tracking-widest text-sm px-8 py-4 hover:bg-gray-200 transition-colors">
                Discover Collection
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex justify-between items-end mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight">New Arrivals</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-10 sm:gap-y-16">
          {products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] bg-gray-100 mb-4 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Hover Add to Cart Button */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    className="w-full bg-black text-white font-medium py-4 uppercase text-sm tracking-widest hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                </div>
                <span className="font-medium">${product.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sliding Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                <h2 className="text-xl font-heading font-black uppercase tracking-tight">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-gray-300" />
                    <p>Your minimalist cart is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="border-b border-black text-black pb-1 uppercase text-sm tracking-widest font-medium"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover filter grayscale" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                              <p className="text-gray-500 text-xs mt-1">{item.category}</p>
                            </div>
                            <span className="font-medium">${item.price}</span>
                          </div>
                          
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center border border-gray-200">
                              <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-gray-100 disabled:opacity-30" disabled={item.quantity <= 1}>
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-gray-100">
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-xs text-gray-400 hover:text-red-500 underline">Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Checkout Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                  <div className="flex justify-between mb-2 text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>${cartTotal}</span>
                  </div>
                  <div className="flex justify-between mb-6 text-sm text-gray-500">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between mb-6 text-lg font-bold">
                    <span>Total</span>
                    <span>${cartTotal}</span>
                  </div>
                  
                  {checkoutSuccess ? (
                    <div className="w-full bg-green-500 text-white font-medium py-4 uppercase tracking-widest flex items-center justify-center gap-2">
                       <CheckCircle className="w-5 h-5" /> Order Placed
                    </div>
                  ) : (
                    <button 
                      onClick={handleCheckout} 
                      disabled={isCheckingOut}
                      className="w-full bg-black text-white font-medium py-4 uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      {isCheckingOut ? 'Processing...' : 'Checkout'} <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                  
                  <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                    <CreditCard className="w-3 h-3" /> Secure Encrypted Payment
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
