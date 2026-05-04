import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <Layout>
      <SEO 
        title="Insights | Kreato Space Blog" 
        description="Thought leadership, web development trends, and digital strategy insights from the Kreato Space team."
        url="https://kreatospace.com/blog"
      />
      <div className="bg-brand-bg pt-32 pb-20 min-h-screen">
        <div className="container-large px-6">
          <header className="mb-24">
            <span className="text-brand-accent uppercase tracking-[0.4em] font-bold text-sm mb-6 block">Journal</span>
            <h1 className="text-6xl md:text-9xl font-sans font-black tracking-tighter text-brand-primary uppercase leading-none">
              Latest <br /> <span className="font-serif italic font-light lowercase text-brand-primary/50">Insights</span>
            </h1>
          </header>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-12">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[16/10] bg-white/5 rounded-3xl mb-6" />
                  <div className="h-8 bg-white/5 rounded-lg w-3/4 mb-4" />
                  <div className="h-4 bg-white/5 rounded-lg w-1/2" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-brand-primary/40 font-serif italic text-2xl">Coming soon...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-x-12 md:gap-y-20">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] mb-8 bg-brand-surface border border-white/5">
                      {post.image_url ? (
                        <img 
                          src={post.image_url} 
                          alt={post.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-10">
                          <InsightsIcon size={64} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-brand-bg/20 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-xs font-sans font-bold uppercase tracking-widest text-brand-primary/40">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="w-1 h-1 bg-brand-accent rounded-full" />
                        <span className="flex items-center gap-1.5"><User size={12} /> {post.author || 'Kreato Team'}</span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-primary leading-tight group-hover:text-brand-accent transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-brand-primary/60 font-sans leading-relaxed line-clamp-3">
                        {post.excerpt || post.content.substring(0, 150) + '...'}
                      </p>
                      
                      <div className="pt-4 flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                        Read Article <ArrowRight size={14} className="text-brand-accent" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const InsightsIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export default Blog;
