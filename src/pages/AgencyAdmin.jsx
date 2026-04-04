import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Lock, Inbox, Trash2, Mail
} from 'lucide-react';

export default function AgencyAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/login', {
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

  const handleDelete = async (id, e) => {
    if(e) e.stopPropagation();
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
         setMessages(prev => prev.filter(m => m.id !== id));
         if (selectedMessage && selectedMessage.id === id) {
             setSelectedMessage(null);
         }
      }
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07070A] flex flex-col justify-center items-center font-sans p-4 text-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-[#111116] p-8 rounded-2xl border border-white/5 max-w-sm w-full"
        >
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
          </div>
          <h2 className="text-xl font-medium text-center mb-2 tracking-tight">Agency Command</h2>
          <p className="text-gray-500 text-center mb-8 text-sm">Log in to view incoming transmissions</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#1A1A24] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                placeholder="Email Address"
              />
            </div>
            <div>
              <input 
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#1A1A24] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                placeholder="Password"
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded">{error}</p>}
            <button type="submit" className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors mt-4">
              Access Terminal
            </button>
          </form>
          <div className="mt-6 text-center">
             <Link to="/" className="text-sm text-gray-500 hover:text-white transition-colors">Return to Surface Website</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#07070A] text-white font-sans">
      
      {/* Sidebar List */}
      <aside className="w-80 bg-[#111116] border-r border-white/5 flex flex-col h-screen">
        <div className="h-16 flex items-center px-6 border-b border-white/5 shrink-0 justify-between">
          <span className="font-medium tracking-tight flex items-center gap-2">
             <Inbox className="w-4 h-4 text-blue-400" /> Transmissions
          </span>
          <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/50">{messages.length} Total</span>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
           {messages.length === 0 ? (
             <div className="p-8 text-center text-gray-600 text-sm">
                No new transmissions found in the matrix.
             </div>
           ) : (
             <div className="divide-y divide-white/5">
                {messages.map(msg => (
                   <button 
                     key={msg.id}
                     onClick={() => setSelectedMessage(msg)}
                     className={`w-full text-left p-4 hover:bg-white/5 transition-colors ${selectedMessage?.id === msg.id ? 'bg-white/10 border-l-2 border-blue-500' : 'border-l-2 border-transparent'}`}
                   >
                     <div className="flex justify-between items-start mb-1">
                       <span className="font-medium text-sm truncate">{msg.name}</span>
                       <span className="text-xs text-gray-500 shrink-0">
                         {new Date(msg.timestamp).toLocaleDateString()}
                       </span>
                     </div>
                     <div className="text-xs text-gray-400 truncate mb-1">{msg.email}</div>
                     <div className="text-xs text-gray-500 truncate">{msg.message}</div>
                   </button>
                ))}
             </div>
           )}
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0A0A0F]">
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
             <Link to="/" className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm">
                <ArrowLeft className="w-4 h-4" /> Go Back
             </Link>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm text-gray-500 hover:text-white transition-colors">
             Sign Out
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
           <AnimatePresence mode="wait">
             {selectedMessage ? (
               <motion.div 
                 key={selectedMessage.id}
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                 className="max-w-2xl mx-auto"
               >
                 <div className="bg-[#111116] border border-white/5 rounded-xl p-8 relative overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/5">
                       <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                             <Mail className="w-5 h-5" />
                          </div>
                          <div>
                             <h2 className="text-lg font-medium">{selectedMessage.name}</h2>
                             <a href={`mailto:${selectedMessage.email}`} className="text-sm text-blue-400 hover:underline">{selectedMessage.email}</a>
                          </div>
                       </div>
                       <div className="flex flex-col items-end gap-2">
                          <span className="text-sm text-gray-500">
                             {new Date(selectedMessage.timestamp).toLocaleString()}
                          </span>
                          <button 
                            onClick={(e) => handleDelete(selectedMessage.id, e)}
                            className="bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 hover:bg-red-500/20 transition-colors"
                          >
                             <Trash2 className="w-3 h-3" /> Purge
                          </button>
                       </div>
                    </div>

                    {/* Body */}
                    <div className="prose prose-invert max-w-none">
                       <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {selectedMessage.message}
                       </p>
                    </div>

                    {/* Action */}
                    <div className="mt-12 pt-6 border-t border-white/5">
                       <a 
                         href={`mailto:${selectedMessage.email}`}
                         className="inline-block bg-white text-black font-medium px-6 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                       >
                          Reply to Transmission
                       </a>
                    </div>
                 </div>
               </motion.div>
             ) : (
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                 className="h-full flex flex-col items-center justify-center text-gray-600"
               >
                  <Inbox className="w-16 h-16 mb-4 opacity-20" />
                  <p>Select a transmission to decrypt its contents.</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </main>

    </div>
  );
}
