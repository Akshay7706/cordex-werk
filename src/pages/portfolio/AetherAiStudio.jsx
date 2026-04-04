import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, SlidersHorizontal, Sparkles, Image as ImageIcon, 
  Wand2, Download, Zap, Settings2, Hexagon, X
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';

const mockImages = [
  'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
];

export default function AetherAiStudio() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState(mockImages);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    try {
      // Pollinations API requires no authentication and generates AI images directly via URL
      const seed = Math.floor(Math.random() * 1000000);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=600&height=800&nologo=true&seed=${seed}`;
      
      // Preload image so we don't show a broken image while it's generating/downloading
      const img = new Image();
      img.src = imageUrl;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Insert new successfully generated image at the top of the grid
      setImages(prev => [imageUrl, ...prev]);
    } catch (error) {
      alert("AI Image Synthesis failed. Please try a different prompt.");
    } finally {
      setIsGenerating(false);
      setPrompt('');
    }
  };

  return (
    <div className="flex h-screen bg-[#0A0118] text-white font-sans overflow-hidden selection:bg-fuchsia-500 selection:text-white">
      <SEOHead title="Aether AI Studio" description="Generate stunning AI artwork with Aether AI Studio. Describe your vision and watch it come to life." />
      
      {/* Sidebar Parameters */}
      <aside className="w-80 bg-[#0F0223] border-r border-[#3B0764] flex flex-col hidden lg:flex relative z-20">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-[#3B0764] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-fuchsia-900/40 border border-fuchsia-500/50 flex items-center justify-center">
              <Hexagon className="w-5 h-5 text-fuchsia-400" />
            </div>
            <span className="font-heading font-bold tracking-widest text-sm text-fuchsia-100">AETHER.AI</span>
          </div>
          <Link to="/" className="text-purple-400 hover:text-fuchsia-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        {/* Settings Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-purple-200">Model Configuration</span>
              <Settings2 className="w-4 h-4 text-purple-500" />
            </div>
            <select className="w-full bg-[#180536] border border-[#3B0764] rounded-lg p-3 text-sm text-purple-100 focus:outline-none focus:border-fuchsia-500 transition-colors">
              <option>Aether Vision v4.5 (Ultra)</option>
              <option>Aether Core v4.0</option>
              <option>Anime Synthesis Module</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-purple-200">Image Dimensions</span>
              <span className="text-xs text-purple-500">16:9</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button className="py-2 rounded-md bg-[#180536] border border-[#3B0764] text-xs font-medium text-purple-300 hover:border-fuchsia-500 transition-colors">1:1</button>
              <button className="py-2 rounded-md bg-fuchsia-900/30 border border-fuchsia-500 text-xs font-medium text-fuchsia-200">16:9</button>
              <button className="py-2 rounded-md bg-[#180536] border border-[#3B0764] text-xs font-medium text-purple-300 hover:border-fuchsia-500 transition-colors">9:16</button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-purple-200">Guidance Scale (CFG)</span>
              <span className="text-xs text-purple-500">7.5</span>
            </div>
            <input type="range" min="1" max="20" defaultValue="7.5" className="w-full accent-fuchsia-500 border-none outline-none bg-[#3B0764] h-1.5 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-purple-200">Quality Steps</span>
              <span className="text-xs text-purple-500">40</span>
            </div>
            <input type="range" min="10" max="100" defaultValue="40" className="w-full accent-fuchsia-500 border-none outline-none bg-[#3B0764] h-1.5 rounded-lg appearance-none cursor-pointer" />
          </div>

        </div>

      </aside>

      {/* Main Studio Area */}
      <main className="flex-1 flex flex-col relative h-full">
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-900/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Top bar for mobile */}
        <div className="lg:hidden p-4 border-b border-[#3B0764] flex justify-between items-center bg-[#0A0118]/80 backdrop-blur-md z-20">
          <div className="flex items-center gap-2">
            <Hexagon className="w-5 h-5 text-fuchsia-400" />
            <span className="font-heading font-bold text-sm">AETHER.AI</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowMobileSidebar(true)} className="text-purple-400 hover:text-fuchsia-400 transition-colors">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            <Link to="/" className="text-purple-400"><ArrowLeft className="w-5 h-5" /></Link>
          </div>
        </div>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {showMobileSidebar && (
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-0 z-50 flex"
            >
              <div className="w-80 bg-[#0F0223] border-r border-[#3B0764] flex flex-col h-full overflow-y-auto">
                <div className="p-6 border-b border-[#3B0764] flex items-center justify-between">
                  <span className="font-bold text-sm text-fuchsia-100">Parameters</span>
                  <button onClick={() => setShowMobileSidebar(false)}><X className="w-5 h-5 text-purple-400" /></button>
                </div>
                <div className="p-6 space-y-6 text-sm">
                  <div className="space-y-2">
                    <span className="text-purple-200 font-medium">Model</span>
                    <select className="w-full bg-[#180536] border border-[#3B0764] rounded-lg p-3 text-purple-100 focus:outline-none focus:border-fuchsia-500">
                      <option>Aether Vision v4.5</option>
                      <option>Aether Core v4.0</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <span className="text-purple-200 font-medium">Guidance (CFG): 7.5</span>
                    <input type="range" min="1" max="20" defaultValue="7.5" className="w-full accent-fuchsia-500" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-purple-200 font-medium">Quality Steps: 40</span>
                    <input type="range" min="10" max="100" defaultValue="40" className="w-full accent-fuchsia-500" />
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-black/50" onClick={() => setShowMobileSidebar(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Canvas Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar pb-40">
          
          <div className="columns-1 sm:columns-2 xl:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group relative rounded-xl overflow-hidden bg-[#180536] border border-[#3B0764] hover:border-fuchsia-500/50 transition-all shadow-xl"
                >
                  <img src={img} alt="Generated Art" className="w-full h-auto object-cover" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0118] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="flex justify-between items-end">
                      <div className="text-xs text-purple-300 bg-[#0A0118]/80 px-2 py-1 rounded backdrop-blur-md">V4.5 / 7.5 CFG</div>
                      <button className="w-8 h-8 rounded-full bg-fuchsia-600 flex items-center justify-center text-white hover:bg-fuchsia-500 hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>

        {/* Prompt Dock */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A0118] via-[#0A0118]/90 to-transparent z-30 flex justify-center">
          <div className="w-full max-w-4xl relative">
            
            {isGenerating && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="absolute -top-12 left-0 right-0 flex justify-center"
              >
                <div className="bg-fuchsia-900/30 border border-fuchsia-500/30 backdrop-blur-md text-fuchsia-300 text-xs px-4 py-2 rounded-full flex items-center gap-2">
                  <Zap className="w-3 h-3 animate-pulse" />
                  Synthesizing Image... establishing neural link
                </div>
              </motion.div>
            )}

            <div className={`flex items-end gap-3 p-2 bg-[#180536]/80 backdrop-blur-xl border ${isGenerating ? 'border-fuchsia-500/50 shadow-[0_0_30px_rgba(217,70,239,0.2)]' : 'border-[#3B0764]'} rounded-2xl transition-all duration-500`}>
              <div className="p-3 text-purple-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision (e.g. A cyberpunk city in the year 3042, neon purple, highly detailed...)"
                className="flex-1 bg-transparent border-none outline-none text-purple-100 placeholder-purple-500/50 resize-none py-3 min-h-[50px] max-h-[150px] text-sm custom-scrollbar"
                disabled={isGenerating}
              />
              <button 
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
                className={`p-4 rounded-xl font-medium flex items-center justify-center transition-all ${
                  !prompt || isGenerating 
                    ? 'bg-[#2A0D45] text-purple-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(217,70,239,0.4)]'
                }`}
              >
                <Wand2 className="w-5 h-5" />
              </button>
            </div>
            
          </div>
        </div>

      </main>

    </div>
  );
}
