import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import CustomerStories from './pages/CustomerStories';
import Partnerships from './pages/Partnerships';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import HelpCenter from './pages/HelpCenter';
import CaseStudies from './pages/CaseStudies';
import NotFound from './pages/NotFound';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ContactsManager from './pages/admin/ContactsManager';
import BlogManager from './pages/admin/BlogManager';
import CaseStudiesManager from './pages/admin/CaseStudiesManager';
import SettingsManager from './pages/admin/SettingsManager';
import ServicesManager from './pages/admin/ServicesManager';
import TestimonialsManager from './pages/admin/TestimonialsManager';
import AdminRoute from './components/admin/AdminRoute';

import ScrollToTop from './components/layout/ScrollToTop';
import AnalyticsTracker from './components/layout/AnalyticsTracker';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnalyticsTracker />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/customer-stories" element={<CustomerStories />} />
        <Route path="/partnerships" element={<Partnerships />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="*" element={<NotFound />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/contacts" element={<AdminRoute><ContactsManager /></AdminRoute>} />
        <Route path="/admin/blog" element={<AdminRoute><BlogManager /></AdminRoute>} />
        <Route path="/admin/case-studies" element={<AdminRoute><CaseStudiesManager /></AdminRoute>} />
        <Route path="/admin/settings" element={<AdminRoute><SettingsManager /></AdminRoute>} />
        <Route path="/admin/services" element={<AdminRoute><ServicesManager /></AdminRoute>} />
        <Route path="/admin/testimonials" element={<AdminRoute><TestimonialsManager /></AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
