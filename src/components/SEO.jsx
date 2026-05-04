import { useEffect } from 'react';

/**
 * SEO component — sets page title, meta description, Open Graph,
 * and Twitter card tags directly on the document head.
 * No external dependencies required.
 */
const SEO = ({
  title = 'Kreato Space — Premium Web Development Agency',
  description = 'Kreato Space is a full-service web development agency building fast, conversion-focused websites and web applications for startups and brands worldwide.',
  image = 'https://kreatospace.com/og-image.png',
  url = 'https://kreatospace.com',
  type = 'website',
}) => {
  useEffect(() => {
    // Title
    document.title = title;

    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrValue] = selector.match(/\[(.+?)="(.+?)"\]/).slice(1);
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // Standard
    setMeta('meta[name="description"]', 'content', description);

    // Open Graph
    setMeta('meta[property="og:type"]', 'content', type);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[property="og:site_name"]', 'content', 'Kreato Space');

    // Twitter
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', image);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, image, url, type]);

  return null;
};

export default SEO;
