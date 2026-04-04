import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const partners = [
  { name: 'Nvidia', logo: 'https://cdn.simpleicons.org/nvidia/white' },
  { name: 'OpenAI', logo: 'https://cdn.simpleicons.org/openai/white' },
  { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/white' },
  { name: 'Supabase', logo: 'https://cdn.simpleicons.org/supabase/white' },
  { name: 'Stripe', logo: 'https://cdn.simpleicons.org/stripe/white' },
  { name: 'DigitalOcean', logo: 'https://cdn.simpleicons.org/digitalocean/white' },
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
                <div key={idx} className="f-center mx-8 md:mx-12 opacity-40 hover:opacity-100 transition-all duration-300">
                  <img src={brand.logo} alt={brand.name} className="h-4 md:h-6 object-contain" />
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
