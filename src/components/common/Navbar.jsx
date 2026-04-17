import { NavLink, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAll = () => {
    setOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container navbar-inner">
          <Link to="/" className="logo" onClick={closeAll}>
            <span className="logo-text">Shape<span>-360</span></span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="nav-links-desktop desktop-only">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/case-studies">Portfolio</NavLink>

            <div className="nav-dropdown" ref={dropdownRef}>
              <button
                className="nav-dropdown-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                More
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <div className={`nav-dropdown-menu ${dropdownOpen ? "open" : ""}`}>
                <NavLink to="/pricing" onClick={closeAll}>Pricing</NavLink>
                <NavLink to="/project-calculator" onClick={closeAll}>Project Calculator</NavLink>
                <NavLink to="/website-audit" onClick={closeAll}>Free Website Audit</NavLink>
                <NavLink to="/roi-calculator" onClick={closeAll}>ROI Calculator</NavLink>
                <NavLink to="/ai-design-generator" onClick={closeAll}>AI Design Generator</NavLink>
                <NavLink to="/client-portal" onClick={closeAll}>Client Portal Demo</NavLink>
                <NavLink to="/blog" onClick={closeAll}>Blog</NavLink>
                <NavLink to="/faq" onClick={closeAll}>FAQ</NavLink>
                <NavLink to="/about" onClick={closeAll}>About</NavLink>
              </div>
            </div>

            <NavLink to="/contact">Contact</NavLink>
          </nav>

          <Link to="/contact" className="nav-cta desktop-only">
            Get a Quote
            <span className="cta-arrow">&#8594;</span>
          </Link>

          {/* HAMBURGER */}
          <button
            className={`hamburger ${open ? "active" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <div className="mobile-menu-bg"></div>

        <div className="mobile-menu-content">
          {/* Main Links */}
          <div className="mobile-menu-section">
            <span className="mobile-menu-label">Explore</span>
            <NavLink to="/" end onClick={closeAll} className="mobile-link">
              <span className="mobile-link-num">01</span>
              <span className="mobile-link-text">Home</span>
              <span className="mobile-link-arrow">&#8594;</span>
            </NavLink>
            <NavLink to="/services" onClick={closeAll} className="mobile-link">
              <span className="mobile-link-num">02</span>
              <span className="mobile-link-text">Services</span>
              <span className="mobile-link-arrow">&#8594;</span>
            </NavLink>
            <NavLink to="/case-studies" onClick={closeAll} className="mobile-link">
              <span className="mobile-link-num">03</span>
              <span className="mobile-link-text">Portfolio</span>
              <span className="mobile-link-arrow">&#8594;</span>
            </NavLink>
            <NavLink to="/pricing" onClick={closeAll} className="mobile-link">
              <span className="mobile-link-num">04</span>
              <span className="mobile-link-text">Pricing</span>
              <span className="mobile-link-arrow">&#8594;</span>
            </NavLink>
            <NavLink to="/about" onClick={closeAll} className="mobile-link">
              <span className="mobile-link-num">05</span>
              <span className="mobile-link-text">About</span>
              <span className="mobile-link-arrow">&#8594;</span>
            </NavLink>
            <NavLink to="/contact" onClick={closeAll} className="mobile-link">
              <span className="mobile-link-num">06</span>
              <span className="mobile-link-text">Contact</span>
              <span className="mobile-link-arrow">&#8594;</span>
            </NavLink>
          </div>

          {/* Tools Section */}
          <div className="mobile-menu-section">
            <span className="mobile-menu-label">Free Tools</span>
            <div className="mobile-tools-grid">
              <NavLink to="/website-audit" onClick={closeAll} className="mobile-tool">
                <span className="mobile-tool-icon">📊</span>
                <span>Website Audit</span>
              </NavLink>
              <NavLink to="/project-calculator" onClick={closeAll} className="mobile-tool">
                <span className="mobile-tool-icon">💰</span>
                <span>Price Calculator</span>
              </NavLink>
              <NavLink to="/roi-calculator" onClick={closeAll} className="mobile-tool">
                <span className="mobile-tool-icon">📈</span>
                <span>ROI Calculator</span>
              </NavLink>
              <NavLink to="/ai-design-generator" onClick={closeAll} className="mobile-tool">
                <span className="mobile-tool-icon">✨</span>
                <span>AI Design</span>
              </NavLink>
            </div>
          </div>

          {/* Resources */}
          <div className="mobile-menu-section">
            <span className="mobile-menu-label">Resources</span>
            <div className="mobile-resources">
              <NavLink to="/blog" onClick={closeAll}>Blog</NavLink>
              <NavLink to="/faq" onClick={closeAll}>FAQ</NavLink>
              <NavLink to="/client-portal" onClick={closeAll}>Client Portal</NavLink>
            </div>
          </div>

          {/* Bottom CTA + Contact */}
          <div className="mobile-menu-footer">
            <Link to="/contact" onClick={closeAll} className="mobile-cta-primary">
              Get a Free Quote
              <span>&#8594;</span>
            </Link>

            <div className="mobile-contact">
              <a href="mailto:shape360official@gmail.com">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 7l8 6 8-6"/></svg>
                shape360official@gmail.com
              </a>
              <a href="tel:+918209978891">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.24c1.1.36 2.3.56 3.6.56a1 1 0 011 1V20a1 1 0 01-1 1C10.8 21 3 13.2 3 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.25 1z"/></svg>
                +91 8209978891
              </a>
            </div>

            <div className="mobile-socials">
              <a href="https://www.instagram.com/shape360official" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1AmwEewBMn/" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
