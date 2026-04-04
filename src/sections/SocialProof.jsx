import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const PartnerLogo = ({ name }) => {
  const logos = {
    Nvidia: (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-6 md:h-8"><path d="M21.921 5.394l-.288-.236c-.476-.328-.901-.587-1.282-.76-.37-.179-.766-.305-1.18-.38l-.66-.115L17.85 5.3l-.6.103c-.415.074-.81.201-1.18.38-.37.172-.806.432-1.282.76l-.288.236-.288-.236c-.476-.328-.912-.588-1.282-.76-.37-.179-.766-.305-1.18-.38l-.6-.104.66-1.397.66.115c.414.075.81.201 1.18.38.38.172.806.432 1.282.76l.288.236.288-.236c-.414-.28-.79-.526-1.129-.737-.34-.204-.705-.363-1.096-.477L11.53 3l.66-1.397.66.115c.414.075.81.201 1.18.38.38.172.806.432 1.282.76l.288.236.288-.236a11.96 11.96 0 011.096-.477l1.129-.737L17.85 2c-.403.037-.798.113-1.181.228a11.96 11.96 0 00-1.096.477c-.34.21-.714.457-1.129.737l-.288.236-.288-.236c-.415-.28-.79-.526-1.129-.737-.34-.204-.705-.363-1.096-.477a11.97 11.97 0 00-1.18-.23L12.004 0c-6.627 0-12 5.373-12 12s5.373 12 12 12c1.93 0 3.738-.456 5.34-1.26l-.41-1.332C13.568 22.09 12.804 22.4 12 22.4c-5.744 0-10.4-4.656-10.4-10.4S6.256 1.6 12 1.6c.804 0 1.568.31 2.934.992l-.41 1.332C12.918 3.125 12.472 3 12.004 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.468 0 .914-.125 1.716-.388l-.41-1.332C12.637 19.39 12.327 19.4 12.004 19.4c-4.086 0-7.4-3.314-7.4-7.4 0-4.086 3.314-7.4 7.4-7.4.323 0 .633.01 1.285.03l-.41-1.332c-.28-.02-.572-.03-.875-.03-2.983 0-5.4 2.417-5.4 5.4 0 2.983 2.417 5.4 5.4 5.4.303 0 .595-.54.875-.03l.41 1.332c-.8.263-1.248.388-1.716.388-1.878 0-3.4-1.522-3.4-3.4 0-1.878 1.522-3.4 3.4-3.4.502 0 .948.125 1.516.388l.41 1.332C14.07 15.39 12 14.12 12 12c0-3.424 2.87-6.2 6.4-6.2.784 0 1.516.142 2.186.4z"/></svg>
    ),
    OpenAI: (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="h-6 md:h-8"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5153-4.9108 6.0462 6.0462 0 0 0-4.7477-2.818 5.9847 5.9847 0 0 0-4.6923 1.3562 6.0462 6.0462 0 0 0-2.8458-1.354 5.9847 5.9847 0 0 0-4.6923 1.3562 6.0462 6.0462 0 0 0-2.8458 4.6906 5.9847 5.9847 0 0 0 1.3582 4.6906 6.0462 6.0462 0 0 0-1.3582 4.6906 5.9847 5.9847 0 0 0 4.6923 4.6906 6.0462 6.0462 0 0 0 2.8458-1.3562 5.9847 5.9847 0 0 0 4.6923 1.3562 6.0462 6.0462 0 0 0 4.7477-2.818 5.9847 5.9847 0 0 0 .5153-4.9108 6.0462 6.0462 0 0 0 2.8458-4.6906 5.9847 5.9847 0 0 0-1.3582-4.6906zM18.2582 15.3082a.623.623 0 1 1-1.246 0 .623.623 0 0 1 1.246 0zM12 21a.63.63 0 1 1 0-1.26A.63.63 0 0 1 12 21zm-6.2582-5.6918a.623.623 0 1 1 0-1.246.623.623 0 0 1 0 1.246zM12 9.6264l1.8845 1.088a2.3857 2.3857 0 0 0 1.1927.3195 2.3783 2.3783 0 0 0 2.3783-2.3783 2.3857 2.3857 0 0 0-.3195-1.1927L15.2515 5.5784a3.7431 3.7431 0 0 0-3.2515-1.7451 3.7431 3.7431 0 0 0-3.2515 1.7451L6.864 7.4629a2.3857 2.3857 0 0 0-.3195 1.1927 2.3783 2.3783 0 0 0 2.3783 2.3783 2.3857 2.3857 0 0 0 1.1927-.3195L12 9.6264zm0 4.7472l-1.8845-1.088a2.3857 2.3857 0 0 0-1.1927-.3195 2.3783 2.3783 0 0 0-2.3783 2.3783 2.3857 2.3857 0 0 0 .3195 1.1927l1.8845 1.8845a3.7431 3.7431 0 0 0 3.2515 1.7451 3.7431 3.7431 0 0 0 3.2515-1.7451l1.8845-1.8845a2.3857 2.3857 0 0 0 .3195-1.1927 2.3783 2.3783 0 0 0-2.3783-2.3783 2.3857 2.3857 0 0 0-1.1927.3195L12 14.3736z"/></svg>
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
