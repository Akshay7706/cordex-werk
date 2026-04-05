import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Shield, Zap, TrendingUp, Cpu, Terminal, Eye } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { useInquiry } from '../../context/InquiryContext';

const TechnicalLog = ({ logs }) => {
  const [displayText, setDisplayText] = useState([]);
  
  useEffect(() => {
    if (!logs) return;
    setDisplayText([]);
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < logs.length) {
        setDisplayText(prev => [...prev, logs[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [logs]);

  return (
    <div className="font-mono text-[9px] text-brand-accent/60 space-y-1">
      {displayText.map((line, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-3"
        >
          <span className="text-gray-700">[{new Date().toLocaleTimeString()}]</span>
          <span>{line}</span>
        </motion.div>
      ))}
      <motion.div 
        animate={{ opacity: [1, 0, 1] }} 
        transition={{ duration: 1, repeat: Infinity }}
        className="w-2 h-3 bg-brand-accent/40 inline-block ml-2"
      />
    </div>
  );
};

export default function ProjectModal() {
  const { isProjectOpen, closeProject, activeProject, openInquiry } = useInquiry();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (isProjectOpen) {
      document.body.style.overflow = 'hidden';
      setActiveImage(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isProjectOpen]);

  if (!activeProject) return null;

  return (
    <AnimatePresence>
      {isProjectOpen && (
        <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4 md:p-10 pointer-events-none">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
            className="absolute inset-0 bg-black/95 backdrop-blur-3xl pointer-events-auto"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-[1400px] h-[90vh] bg-brand-dark/95 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col pointer-events-auto mx-4 z-10"
          >
            <div className="relative z-20 flex flex-col h-full">
              {/* Header Navigation */}
              <div className="px-8 py-6 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={closeProject}
                    className="flex items-center gap-3 text-[10px] font-bold text-gray-500 hover:text-brand-accent transition-colors uppercase tracking-[0.2em]"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" /> Exit_Analysis
                  </button>
                  <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
                  <div className="hidden md:flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">Intelligence_Briefing</h3>
                      <p className="text-[8px] text-gray-500 uppercase tracking-widest leading-none mt-1">Status: Operational</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="hidden lg:flex items-center gap-6 mr-8">
                      {['Security_Hardened', 'Edge_Optimized', 'Multi_Tenant'].map(tag => (
                        <span key={tag} className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">{tag}</span>
                      ))}
                   </div>
                   <button 
                    onClick={closeProject}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
                {/* Hero Feature with Tactical Overlays */}
                <div className="relative h-[50vh] md:h-[60vh] w-full bg-black/40 border-b border-white/5 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeImage}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                      src={activeProject.gallery ? activeProject.gallery[activeImage] : activeProject.img} 
                      alt={activeProject.title} 
                      className="w-full h-full object-cover opacity-60 grayscale contrast-125" 
                    />
                  </AnimatePresence>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none" />
                  
                  {/* Tactical Side Data */}
                  <div className="absolute top-12 left-12 hidden xl:block space-y-8">
                     <TechnicalLog logs={activeProject.techLog} />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                     <div className="max-w-4xl">
                        <motion.span 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="px-4 py-1.5 bg-brand-accent/10 border border-brand-accent/30 rounded-full text-[10px] text-brand-accent font-bold uppercase tracking-widest mb-6 inline-block"
                        >
                           System_Class: {activeProject.category}
                        </motion.span>
                        <h2 className="text-5xl md:text-8xl lg:text-9xl font-heading font-black text-white italic leading-none uppercase tracking-tighter mb-4">
                           {activeProject.title}
                        </h2>
                        <div className="flex items-center gap-8">
                           <div className="flex items-center gap-4 text-brand-accent">
                              <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />
                              <span className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter">{activeProject.metrics}</span>
                           </div>
                           <div className="h-8 w-[1px] bg-white/20" />
                           <div className="hidden sm:flex items-center gap-3">
                              <div className="flex gap-1">
                                 {[1,2,3,4,5].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= 4 ? 'bg-brand-accent' : 'bg-white/10'}`} />)}
                              </div>
                              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Performance_Tier_S</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Gallery Toggle (Small UI) */}
                  {activeProject.gallery && (
                    <div className="absolute bottom-12 right-12 flex gap-3">
                       {activeProject.gallery.map((_, i) => (
                         <button 
                           key={i}
                           onClick={() => setActiveImage(i)}
                           className={`w-12 h-[2px] transition-all duration-500 ${activeImage === i ? 'bg-brand-accent' : 'bg-white/20'}`}
                         />
                       ))}
                    </div>
                  )}
                </div>

                {/* Main Intelligence Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 p-8 md:p-16">
                   
                   {/* Left: Deep Analysis */}
                   <div className="space-y-20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                         <div className="space-y-6">
                            <h4 className="text-[12px] font-bold text-white uppercase tracking-[0.4em] flex items-center gap-4">
                               <div className="w-12 h-[1px] bg-brand-accent" /> THE_CHALLENGE
                            </h4>
                            <p className="text-xl md:text-2xl font-light text-gray-400 leading-relaxed font-heading">
                               {activeProject.problem}
                            </p>
                         </div>
                         <div className="space-y-6">
                            <h4 className="text-[12px] font-bold text-white uppercase tracking-[0.4em] flex items-center gap-4">
                               <div className="w-12 h-[1px] bg-brand-secondary" /> THE_RESOLUTION
                            </h4>
                            <p className="text-xl md:text-2xl font-black text-white italic leading-tight uppercase tracking-tight">
                               {activeProject.result}
                            </p>
                         </div>
                      </div>

                      {/* Data Visualization Block */}
                      <div className="space-y-8">
                         <div className="flex items-center justify-between">
                            <h4 className="text-[12px] font-bold text-white uppercase tracking-[0.4em] flex items-center gap-4">
                               <div className="w-12 h-[1px] bg-brand-accent" /> PERFORMANCE_DELTA
                            </h4>
                            <div className="flex gap-4">
                               <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-brand-accent" />
                                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Post_Dev</span>
                               </div>
                            </div>
                         </div>
                         
                         <div className="h-[300px] w-full bg-white/[0.01] border border-white/5 rounded-[2rem] p-8">
                            <ResponsiveContainer width="100%" height="100%">
                               <AreaChart data={activeProject.stats}>
                                  <defs>
                                     <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                                     </linearGradient>
                                  </defs>
                                  <Tooltip 
                                    contentStyle={{ backgroundColor: '#03060A', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#00E5FF', fontSize: '10px', textTransform: 'uppercase' }}
                                  />
                                  <Area type="monotone" dataKey="value" stroke="#00E5FF" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                               </AreaChart>
                            </ResponsiveContainer>
                         </div>
                      </div>

                      {/* Tactical Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                         {[
                           { label: 'Security_Level', value: 'MIL-SPEC', icon: Shield, color: 'text-brand-accent' },
                           { label: 'Latency_Reduction', value: 'HIGH_VELOCITY', icon: Zap, color: 'text-brand-secondary' },
                           { label: 'System_Load', value: 'OPTIMAL', icon: Cpu, color: 'text-white' }
                         ].map((item, i) => (
                           <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group">
                              <item.icon className={`w-8 h-8 ${item.color} mb-6 group-hover:scale-110 transition-transform`} />
                              <h5 className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">{item.label}</h5>
                              <p className="text-sm font-black text-white italic uppercase tracking-tighter">{item.value}</p>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Right: Technical Metadata & CTA */}
                   <div className="space-y-12">
                      <div className="p-10 rounded-[3rem] bg-brand-accent/5 border border-brand-accent/20 relative overflow-hidden">
                         <div className="absolute inset-0 bg-grain opacity-[0.03]" />
                         <div className="relative z-10">
                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-12">DEK_TECHNICAL_SPECS_V4</h4>
                            
                            <div className="space-y-8">
                               {[
                                 { label: 'Global Architecture', value: 'Distributed_Edge' },
                                 { label: 'Reactive Engine', value: 'Framer_Motion_v12' },
                                 { label: 'Data Protocol', value: 'gRPC_Mirror' },
                                 { label: 'Intelligence', value: 'Neural_Layer_8' }
                               ].map((stat, i) => (
                                 <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4 group cursor-help">
                                    <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-400 transition-colors">{stat.label}</span>
                                    <span className="text-xs font-black text-brand-accent uppercase italic transition-all group-hover:tracking-widest">{stat.value}</span>
                                 </div>
                               ))}
                            </div>

                            <div className="mt-20">
                               <button 
                                 onClick={() => {
                                   closeProject();
                                   setTimeout(() => openInquiry(`Mission: ${activeProject.title}`), 400);
                                 }}
                                 className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.5em] text-[10px] rounded-2xl hover:bg-brand-accent transition-all duration-500 shadow-[0_10px_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 group"
                               >
                                 Initialize_Similar_Mission <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                               </button>
                            </div>
                         </div>
                      </div>

                      {/* Additional Technical Context */}
                      <div className="px-10 py-8 bg-black/40 rounded-[2rem] border border-white/5">
                         <div className="flex items-center gap-4 mb-6">
                            <Eye className="w-5 h-5 text-gray-600" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Observability_Active</span>
                         </div>
                         <p className="text-[8px] text-gray-600 uppercase tracking-[0.4em] font-mono leading-relaxed">
                            Full telemetry and technical audit logs are available upon verification. Cordex Werk secures all architectural nodes via zero-trust protocols.
                         </p>
                      </div>
                   </div>

                </div>
              </div>
            </div>

            {/* Global Grain Overlay */}
            <div className="absolute inset-0 bg-grain pointer-events-none opacity-[0.02] z-0"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
