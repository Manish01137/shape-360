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
import ScrollProgress from "./components/common/ScrollProgress";
import ScrollToTopBtn from "./components/common/ScrollToTopBtn";
import MobileCTA from "./components/common/MobileCTA";
import CookieConsent from "./components/common/CookieConsent";
import ExitIntent from "./components/common/ExitIntent";
import PageLoader from "./components/common/PageLoader";

/* Lazy load pages for code-splitting */
const Home = lazy(() => import("./pages/Home/Home"));
const Services = lazy(() => import("./pages/Services/Services"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const CaseStudies = lazy(() => import("./pages/CaseStudies/CaseStudies"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const BlogPost = lazy(() => import("./pages/Blog/BlogPost"));
const Team = lazy(() => import("./pages/Team/Team"));
const FAQ = lazy(() => import("./pages/FAQ/FAQ"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
const PrivacyPolicy = lazy(() => import("./pages/Legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/Legal/TermsOfService"));
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
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
          <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
          <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
          <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
          <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
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
          <ScrollProgress />
          <CustomCursor />
          <Preloader loading={loading} />
          <Navbar />
          <main className="app-main">
            <AnimatedRoutes />
          </main>
          <Footer />
          <ScrollToTopBtn />
          <AIChatbot />
          <MobileCTA />
          <CookieConsent />
          <ExitIntent />
        </SmoothScroll>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
