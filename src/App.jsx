import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import SaasDashboard from './pages/portfolio/SaasDashboard';
import AetherAiStudio from './pages/portfolio/AetherAiStudio';
import FinTechLanding from './pages/portfolio/FinTechLanding';
import NovaStore from './pages/portfolio/NovaStore';
import NovaAdmin from './pages/portfolio/NovaAdmin';
import NovaAccount from './pages/NovaAccount';
import AgencyAdmin from './pages/AgencyAdmin';
import CaseStudy from './pages/CaseStudy';
import GlobalLoader from './components/GlobalLoader';
import PageTransition from './components/PageTransition';
import ChromaticAberration from './components/shared/ChromaticAberration';
import MagneticCursor from './components/shared/MagneticCursor';

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AgencyAdmin /></PageTransition>} />

        <Route path="/portfolio/saas-dashboard" element={<PageTransition><SaasDashboard /></PageTransition>} />
        <Route path="/portfolio/aether-ai" element={<PageTransition><AetherAiStudio /></PageTransition>} />
        <Route path="/portfolio/fintech-landing" element={<PageTransition><FinTechLanding /></PageTransition>} />
        <Route path="/portfolio/nova-store" element={<PageTransition><NovaStore /></PageTransition>} />
        <Route path="/portfolio/nova-store/admin" element={<PageTransition><NovaAdmin /></PageTransition>} />
        <Route path="/portfolio/nova-store/account" element={<PageTransition><NovaAccount /></PageTransition>} />
        <Route path="/case-study/:id" element={<PageTransition><CaseStudy /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <ChromaticAberration />
      <MagneticCursor />
      {!loaderDone && <GlobalLoader onDone={() => setLoaderDone(true)} />}
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
