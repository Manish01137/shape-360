import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MobileCTA.css";

const MobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`mobile-cta-bar ${visible ? "visible" : ""}`}>
      <Link to="/contact" className="mobile-cta-btn">
        Get Free Consultation
        <span>&#8594;</span>
      </Link>
      <a href="tel:+918209978891" className="mobile-cta-phone" aria-label="Call us">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.24c1.1.36 2.3.56 3.6.56a1 1 0 011 1V20a1 1 0 01-1 1C10.8 21 3 13.2 3 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.25 1z"/>
        </svg>
      </a>
    </div>
  );
};

export default MobileCTA;
