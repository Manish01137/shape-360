import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
import "./NotFound.css";

const quickLinks = [
  { to: "/", label: "Home", desc: "Back to the start" },
  { to: "/services", label: "Services", desc: "What we build" },
  { to: "/case-studies", label: "Portfolio", desc: "Live work" },
  { to: "/automate", label: "AutoFlow", desc: "Our AI tool · NEW" },
  { to: "/trust", label: "Trust", desc: "Why founders choose us" },
  { to: "/pricing", label: "Pricing", desc: "Real numbers" },
  { to: "/contact", label: "Contact", desc: "Talk to founder" },
  { to: "/blog", label: "Blog", desc: "Case studies + lessons" },
];

const NotFound = () => {
  const [glitchText, setGlitchText] = useState("404");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nf-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" }
      );
      gsap.fromTo(
        ".nf-quick-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out", delay: 0.4 }
      );
    });

    /* Subtle glitch effect on the 404 */
    const glyphs = ["404", "4O4", "40A", "404", "4Ø4", "404"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % glyphs.length;
      setGlitchText(glyphs[i]);
    }, 800);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="nf-page">
      <Helmet>
        <title>404 — Page Not Found | Shape-360</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="nf-orb-1"></div>
      <div className="nf-orb-2"></div>

      <div className="container nf-inner">
        <div className="nf-content">
          <div className="nf-glitch" data-text={glitchText}>
            {glitchText}
          </div>

          <div className="sec-tagline">
            <div className="line"></div>
            <p>Lost in transit</p>
            <div className="line"></div>
          </div>

          <h1 className="nf-title">
            This page took<br />a <span className="italic">wrong turn.</span>
          </h1>

          <p className="nf-desc">
            The link is broken, the page moved, or something stranger.
            Either way — let's get you back to something that works.
          </p>

          <div className="nf-actions">
            <Link to="/" className="thm-btn">
              Back to Home <span>&#8594;</span>
            </Link>
            <Link to="/contact" className="nf-link-secondary">
              Report this →
            </Link>
          </div>
        </div>

        <div className="nf-quick">
          <span className="nf-quick-label">Or try one of these</span>
          <div className="nf-quick-grid">
            {quickLinks.map((q, i) => (
              <Link key={i} to={q.to} className="nf-quick-card">
                <strong>{q.label}</strong>
                <span>{q.desc}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
