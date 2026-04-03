import { useEffect } from 'react';

/**
 * SEOHead - Dynamically sets page title and meta tags per route.
 * Usage: <SEOHead title="Page Title" description="..." image="..." />
 */
export default function SEOHead({ title, description, image }) {
  const fullTitle = title ? `${title} | Cordex Werk` : 'Cordex Werk | Digital Engineering Agency';
  const desc = description || 'We craft high-performance SaaS platforms, AI-powered tools, and immersive digital experiences.';
  const img = image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200';

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Update or create meta helper
    const setMeta = (selector, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attr, val] = selector.replace('[', '').replace(']', '').split('=').map(s => s.replace(/"/g, ''));
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:image"]', img);
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', desc);
    setMeta('meta[name="twitter:image"]', img);
  }, [fullTitle, desc, img]);

  return null;
}
