import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Preloader from "./components/common/Preloader";
import CustomCursor from "./components/common/CustomCursor";
import SmoothScroll from "./components/common/SmoothScroll";
import AIChatbot from "./components/common/AIChatbot";
import PageTransition from "./components/common/PageTransition";

/* Lazy load pages for code-splitting */
const Home = lazy(() => import("./pages/Home/Home"));
const Services = lazy(() => import("./pages/Services/Services"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const CaseStudies = lazy(() => import("./pages/CaseStudies/CaseStudies"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const Team = lazy(() => import("./pages/Team/Team"));
const FAQ = lazy(() => import("./pages/FAQ/FAQ"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

/* Scroll to top on route change */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/* Animated Routes wrapper */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
          <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <SmoothScroll>
          <ScrollToTop />
          <CustomCursor />
          <Preloader loading={loading} />
          <Navbar />
          <main className="app-main">
            <AnimatedRoutes />
          </main>
          <Footer />
          <AIChatbot />
        </SmoothScroll>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
