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
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={closeAll}>
          <span className="logo-text">Shape<span>-360</span></span>
        </Link>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={closeAll}>Home</NavLink>
          <NavLink to="/services" onClick={closeAll}>Services</NavLink>
          <NavLink to="/case-studies" onClick={closeAll}>Portfolio</NavLink>

          {/* Desktop dropdown */}
          <div className="nav-dropdown desktop-only" ref={dropdownRef}>
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
              <NavLink to="/blog" onClick={closeAll}>Blog</NavLink>
              <NavLink to="/faq" onClick={closeAll}>FAQ</NavLink>
              <NavLink to="/about" onClick={closeAll}>About</NavLink>
            </div>
          </div>

          {/* Mobile — show all links */}
          <NavLink to="/pricing" className="mobile-only" onClick={closeAll}>Pricing</NavLink>
          <NavLink to="/about" className="mobile-only" onClick={closeAll}>About</NavLink>
          <NavLink to="/blog" className="mobile-only" onClick={closeAll}>Blog</NavLink>
          <NavLink to="/faq" className="mobile-only" onClick={closeAll}>FAQ</NavLink>

          <NavLink to="/contact" onClick={closeAll}>Contact</NavLink>

          {/* Mobile CTA */}
          <Link to="/contact" className="mobile-nav-cta mobile-only" onClick={closeAll}>
            Get a Quote <span>&#8594;</span>
          </Link>
        </nav>

        <Link to="/contact" className="nav-cta desktop-only" onClick={closeAll}>
          Get a Quote
          <span className="cta-arrow">&#8594;</span>
        </Link>

        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
