import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Share2, Twitter, Linkedin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

export default function BlogPost() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        setArticle(data);
      }
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="pt-40 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
          <div className="text-brand-primary/30 animate-pulse font-sans">Loading article...</div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="pt-40 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-4xl font-serif text-brand-primary mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-brand-accent hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <Layout>
      <SEO 
        title={`${article.title} | Kreato Space Blog`} 
        description={article.excerpt}
        url={`https://kreatospace.com/blog/${article.id}`}
        image={article.image_url}
      />
      <div className="bg-brand-bg min-h-screen pb-24">
        {/* Article Header */}
        <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-brand-bg/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent z-10" />
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={article.image_url} 
            alt={article.title} 
            className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-60"
          />
          
          <div className="absolute bottom-0 left-0 w-full z-20 p-6 md:p-12 lg:px-24 pb-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-4xl"
            >
              <Link to="/blog" className="inline-flex items-center gap-2 text-brand-primary/60 hover:text-brand-accent uppercase tracking-widest text-xs font-bold mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Editorials
              </Link>
              
              <div className="flex items-center gap-4 mb-6 text-sm font-sans">
                <span className="text-brand-accent font-bold uppercase tracking-widest">{article.category}</span>
                <span className="text-brand-primary/30">•</span>
                <span className="text-brand-primary/60 flex items-center gap-2"><Clock className="w-4 h-4" /> {article.read_time}</span>
                <span className="text-brand-primary/30">•</span>
                <span className="text-brand-primary/60">{new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-primary leading-[1.1] mb-6">
                {article.title}
              </h1>
              
              <div className="flex items-center gap-4 text-brand-primary/80">
                <div className="w-10 h-10 rounded-full bg-brand-surface overflow-hidden border border-brand-primary/20">
                  <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=100" alt="Alex Kreato" className="w-full h-full object-cover grayscale" />
                </div>
                <div>
                  <p className="text-sm font-bold">Alex Kreato</p>
                  <p className="text-xs text-brand-primary/50 uppercase tracking-widest">Kreato Space</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Article Body */}
        <div className="container-large relative z-30 -mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
            
            {/* Main Content */}
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="prose prose-invert prose-lg md:prose-xl max-w-none font-sans 
                         prose-headings:font-serif prose-headings:font-bold prose-headings:text-brand-primary 
                         prose-p:text-brand-primary/70 prose-p:leading-relaxed 
                         prose-a:text-brand-accent hover:prose-a:text-brand-primary 
                         prose-strong:text-brand-primary prose-strong:font-bold
                         prose-ul:text-brand-primary/70 prose-li:marker:text-brand-accent
                         prose-blockquote:border-l-brand-accent prose-blockquote:bg-brand-surface prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:text-brand-primary/90 prose-blockquote:italic prose-blockquote:font-serif
                         [&_.lead]:text-2xl [&_.lead]:text-brand-primary [&_.lead]:font-medium [&_.lead]:mb-12"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Sticky Sidebar */}
            <aside className="hidden lg:block relative">
              <div className="sticky top-32 space-y-8">
                <div className="bg-brand-surface p-6 rounded-2xl border border-brand-primary/10">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-brand-primary mb-4">Share Article</h4>
                  <div className="flex flex-col gap-3">
                    <button className="flex items-center gap-3 text-brand-primary/60 hover:text-brand-primary transition-colors p-2 hover:bg-brand-bg rounded-lg">
                      <Twitter className="w-5 h-5" /> Twitter
                    </button>
                    <button className="flex items-center gap-3 text-brand-primary/60 hover:text-brand-primary transition-colors p-2 hover:bg-brand-bg rounded-lg">
                      <Linkedin className="w-5 h-5" /> LinkedIn
                    </button>
                    <button className="flex items-center gap-3 text-brand-primary/60 hover:text-brand-primary transition-colors p-2 hover:bg-brand-bg rounded-lg">
                      <Share2 className="w-5 h-5" /> Copy Link
                    </button>
                  </div>
                </div>

                <div className="bg-brand-accent/10 p-6 rounded-2xl border border-brand-accent/20">
                  <h4 className="text-lg font-serif font-bold text-brand-primary mb-2">Ready to build?</h4>
                  <p className="text-sm text-brand-primary/70 mb-6">Let's discuss how we can transform your digital presence.</p>
                  <Link to="/contact" className="block w-full py-3 bg-brand-accent text-center text-white font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-brand-hover transition-colors">
                    Start a Project
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </Layout>
  );
}
