import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // 1. Get Country Data (Fast & Free API)
        const geoResponse = await fetch('https://ipapi.co/json/').catch(() => null);
        const geoData = geoResponse ? await geoResponse.json() : null;
        const country = geoData?.country_name || 'Unknown';

        // 2. Log the event to Supabase
        await supabase.from('analytics_events').insert([{
          page_path: location.pathname,
          country: country,
          referrer: document.referrer || 'Direct'
        }]);

        // 3. If it's a blog post, increment the view count
        if (location.pathname.startsWith('/blog/')) {
          const blogId = location.pathname.split('/').pop();
          if (blogId && blogId.length > 20) { // Simple UUID check
            await supabase.rpc('increment_blog_views', { post_id: blogId });
          }
        }
      } catch (err) {
        // Silent fail for analytics
        console.warn('Analytics tracking failed:', err);
      }
    };

    trackVisit();
  }, [location.pathname]);

  return null;
}
