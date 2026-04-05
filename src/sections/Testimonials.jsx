import { motion } from 'framer-motion';
import { Quote, Activity, Terminal, ShieldCheck } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Founder @ Aether AI',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    content: 'Cordex transformed our landing page into a conversion engine. Our trial sign-ups increased by 140% in the first month. The 3D interactions are simply unmatched.',
    trust_index: '98.4%',
    signal_type: 'QUANTUM_SYNC'
  },
  {
    name: 'Marcus Thorne',
    role: 'CTO @ Nexus Fintech',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    content: 'The speed and precision of their engineering are enterprise-grade. We migrated our entire frontend to their architecture and saw an immediate 60% boost in conversion velocity.',
    trust_index: '99.1%',
    signal_type: 'VELOCITY_PULSE'
  },
  {
    name: 'Elena Vance',
    role: 'Product Lead @ Skyward SaaS',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    content: 'Working with Cordex is like having an elite technical strike team. They don\'t just write code; they design systems that scale and convert with surgical precision.',
    trust_index: '97.8%',
    signal_type: 'SCALABILITY_LOCK'
  }
];

const SignalWaveform = () => (
  <div className="flex items-center gap-0.5 h-3">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ 
          height: [2, 12, 4, 8, 2],
          opacity: [0.3, 1, 0.3]
        }}
        transition={{ 
          duration: 1 + Math.random(), 
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.1
        }}
        className="w-0.5 bg-brand-accent rounded-full"
      />
    ))}
  </div>
);

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 bg-brand-dark overflow-hidden border-b border-white/5 relative">
       {/* Background Elements */}
       <div className="absolute left-[5%] top-1/4 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
       <div className="absolute right-[5%] bottom-1/4 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none z-0"></div>
       
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-brand-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
            >
              <Activity className="w-3 h-3" />
              The Signal Feedback
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white tracking-tighter leading-none"
            >
              MISSION <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.7)' }}>VERIFICATION.</span>
            </motion.h2>
          </div>
          <div className="hidden lg:block pb-2">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-1">Global Sentiment</span>
                <span className="text-xl font-heading font-black text-white tracking-tight">POSITIVE_SYNC</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-1">Uptime_Relay</span>
                <span className="text-xl font-heading font-black text-brand-accent tracking-tight">99.99%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden hover:border-brand-accent/40 transition-all duration-700 flex flex-col min-h-[420px]"
            >
              {/* Tactical Overlay */}
              <div className="absolute inset-0 bg-scanlines opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />
              
              <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest block leading-none mb-1">Signal Authority</span>
                    <span className="text-[10px] font-black text-white uppercase tracking-wider">{test.signal_type}</span>
                  </div>
                </div>
                <SignalWaveform />
              </div>

              <div className="relative z-10 flex-1">
                <Quote className="w-10 h-10 text-brand-accent/10 absolute -top-4 -left-4" />
                <p className="text-gray-300 font-light leading-relaxed text-sm lg:text-base italic pl-2 border-l border-white/10">
                  "{test.content}"
                </p>
              </div>

              <div className="mt-12 relative z-10 flex items-center justify-between bg-white/[0.03] border border-white/5 p-5 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={test.avatar} 
                      alt={test.name} 
                      className="w-10 h-10 rounded-xl object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-xl border border-brand-accent pointer-events-none"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-heading font-bold text-xs uppercase tracking-tight">{test.name}</h4>
                    <p className="text-gray-500 text-[8px] font-bold uppercase tracking-widest">{test.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[7px] font-bold text-gray-600 uppercase tracking-widest block mb-0.5">Trust_Index</span>
                  <div className="flex items-center gap-1 text-brand-accent text-xs font-black tracking-tighter">
                     <ShieldCheck className="w-3 h-3" />
                     {test.trust_index}
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand-accent/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
