import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const PartnerLogo = ({ name }) => {
  const logos = {
    Nvidia: (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-6 md:h-8"><path d="M11.996 24a12.046 12.046 0 0 1-5.263-1.202l.145-.265c1.493-.038 2.827-.552 4.026-1.543a4.516 4.516 0 0 0 1.636-2.915c.022-.167.016-.333 0-.5a4.576 4.576 0 0 0-1.31-2.9 4.38 4.38 0 0 0-3.056-1.42 4.49 4.49 0 0 0-3.328 1.155 4.58 4.58 0 0 0-1.488 3.5c0 .125.006.248.017.37a4.34 4.34 0 0 0 1.258 2.8c.84.814 1.832 1.353 2.94 1.605l.145.265A12.06 12.06 0 0 1 0 12.004c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12zM6.57 18.232a3.172 3.172 0 0 1 1.03-2.42c.578-.564 1.303-.847 2.176-.847.872 0 1.597.283 2.175.847a3.173 3.173 0 0 1 1.03 2.42 3.173 3.173 0 0 1-1.03 2.42c-.578.564-1.303.847-2.175.847-.873 0-1.598-.283-2.176-.847a3.172 3.172 0 0 1-1.03-2.42zm.843 0c0 .61.218 1.127.654 1.55a2.11 2.11 0 0 0 1.552.636c.594 0 1.111-.212 1.551-.636.44-.423.66-.94.66-1.55a2.112 2.112 0 0 0-.66-1.55c-.44-.424-.957-.636-1.551-.636-.595 0-1.112.212-1.552.636a2.111 2.111 0 0 0-.654 1.55z"/></svg>
    ),
    OpenAI: (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-6 md:h-8"><path d="M22.28 7.59a7.485 7.485 0 0 0-.4-4.22c-1.13-2.61-3.69-3.7-6.09-3.37L15.34.09l-.45 2.58A7.447 7.447 0 0 0 9.8 1.17c-2.45-.63-5.28.32-6.62 3.23l-1.35 2.92-1.4 3.01c-.08.18-.08.38 0 .56l1.35 2.92c1.13 2.61 3.69 3.7 6.09 3.37l.45-.06.45-2.58a7.447 7.447 0 0 0 5.09 1.5c2.45.63 5.28-.32 6.62-3.23l1.35-2.92 1.4-3.01a.63.63 0 0 0 0-.56zM15.42 21.05c-1.63 2.61-4.8 3.51-7.46 2.39L5.3 22.06c-1.06-.51-2.01-1.22-2.82-2.12l-.08-.1c-.48-.59-.83-1.25-1.06-1.95L.89 16.5c-1.13-2.61-.43-5.59 1.76-7.42l1.62-.21c.06-.01.1-.03.14-.07L7.43 1.94l.08-.09c.81-.9 1.76-1.61 2.82-2.12l.09-.04c1.06-.51 2.21-.77 3.37-.77s2.31.26 3.37.77l.09.04c1.06.51 2.01 1.22 2.82 2.12l.08.09 3.02 6.87c2.19 1.83 2.89 4.81 1.76 7.42l-.46 1.39c-1.13 2.61-4.3 3.51-6.96 2.39l-2.66-1.38z"/></svg>
    ),
    Vercel: (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-6 md:h-8"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>
    ),
    Supabase: (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-6 md:h-8"><path d="M21.362 9.354H12V.396L2.638 14.646H12v8.958l9.362-14.25z"/></svg>
    ),
    Stripe: (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-6 md:h-8"><path d="M13.962 8.196c0-2.436-1.146-3.805-3.323-3.805-3.13 0-3.666 1.802-3.666 3.125 0 2.923 2.915 3.385 4.86 3.96 2.247.669 3.022 1.156 3.022 2.87 0 2.203-1.077 3.555-3.415 3.555-2.82 0-3.83-1.428-3.83-3.238l-.014-.541H4.42v.541c0 3.076 2.115 4.673 5.485 4.673 3.266 0 5.486-1.523 5.486-4.636 0-3.416-3.242-4.045-5.321-4.708-1.583-.502-2.56-.787-2.56-2.14 0-1.776.994-2.868 2.656-2.868 1.954 0 2.71 1.05 2.71 2.333l.006.413h3.09v-.539Z"/></svg>
    ),
    DigitalOcean: (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-6 md:h-8"><path d="M12.046 3.504a7.994 7.994 0 0 0-7.989 7.989 7.994 7.994 0 0 0 7.989 7.989 7.994 7.994 0 0 0 7.989-7.989c0-.284-.015-.566-.044-.844h1.769c.221.758.337 1.554.337 2.378 0 5.011-4.062 9.073-9.073 9.073-5.011 0-9.073-4.062-9.073-9.073 0-5.011 4.062-9.073 9.073-9.073.824 0 1.62.116 2.378.337v1.769c-.278-.029-.56-.044-.844-.044zm5.029 1.488a1.002 1.002 0 0 0-1.001 1.001c0 .553.448 1.001 1.001 1.001s1.001-.448 1.001-1.001a1.002 1.002 0 0 0-1.001-1.001zm3.921 5.448H22.5c0-.986-.168-1.93-.473-2.809l-1.45.694c.264.679.423 1.408.423 2.115z"/></svg>
    ),
  };
  return logos[name] || null;
};

const partners = [
  { name: 'Nvidia' },
  { name: 'OpenAI' },
  { name: 'Vercel' },
  { name: 'Supabase' },
  { name: 'Stripe' },
  { name: 'DigitalOcean' },
];

const testimonials = [
  {
    name: "Marcus Thorne",
    role: "CEO, Nexa Systems",
    content: "Cordex Werk transformed our legacy architecture into a high-performance engine. Their 3D precision and speed are unmatched in the current market.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Elena Vance",
    role: "Founder, Aether AI",
    content: "The immersive UI they built for our studio is a literal piece of art. It's not just code; it's a digital experience that converts users at a 40% higher rate.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Kenji Sato",
    role: "Head of Tech, Void Capital",
    content: "Working with Cordex is like engineering for the future. Their full-stack integration with Supabase and complex Framer animations is flawless.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  }
];


export default function SocialProof() {
  const marqueeLogos = [...partners, ...partners, ...partners];

  return (
    <section className="py-24 relative z-10 bg-brand-dark overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      
      {/* Logos Marquee */}
      <div className="mb-24 px-6 lg:px-16 container mx-auto">
         <div className="text-center mb-12">
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-gray-500 mb-2">Powering the Future</h3>
         </div>
         <div className="relative w-full overflow-hidden mask-edges py-6 md:py-10">
            <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
              {marqueeLogos.map((brand, idx) => (
                <div key={idx} className="f-center mx-8 md:mx-12 opacity-40 hover:opacity-100 transition-all duration-300 text-white">
                  <PartnerLogo name={brand.name} />
                </div>
              ))}
            </div>
         </div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/3 text-left">
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white leading-none tracking-tighter mb-6">
              THE<br />MATRIX<br />TRUSTS.
            </h2>
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
              ))}
            </div>
            <p className="text-gray-400 font-light leading-relaxed">
              We've pushed the boundaries of digital engineering for industry leaders and visionary startups alike.
            </p>
          </div>

          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl relative group hover:border-brand-accent/30 transition-all duration-500 ${i === 0 ? 'md:col-span-1' : (i === 1 ? 'md:col-span-1' : 'md:col-span-2')}`}
              >
                <Quote className="absolute top-6 right-6 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 text-white/5 group-hover:text-brand-accent/10 transition-colors pointer-events-none" />
                
                <p className="text-gray-300 font-light leading-relaxed mb-8 md:mb-10 text-base md:text-lg relative z-10">"{t.content}"</p>
                
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full ring-2 ring-white/10 group-hover:ring-brand-accent/30 transition-all" />
                  <div>
                    <h4 className="font-bold text-white text-sm tracking-tight">{t.name}</h4>
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-widest leading-none">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
