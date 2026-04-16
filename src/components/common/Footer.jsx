import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/images/shapee360.png";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Marquee */}
      <div className="footer-marquee">
        <div className="footer-marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <a key={i} href="mailto:shape360official@gmail.com" className="footer-marquee-item">
              shape360official@gmail.com
              <span className="footer-marquee-dot">&#10038;</span>
            </a>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="Shape-360" />
            </Link>
            <p>
              360° Digital Solutions That Shape Business Growth.
              We build, market, and scale your digital presence.
            </p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/shape360official" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1AmwEewBMn/" target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Website Development</Link></li>
              <li><Link to="/services">Shopify Stores</Link></li>
              <li><Link to="/services">WordPress Sites</Link></li>
              <li><Link to="/services">Meta Ads</Link></li>
              <li><Link to="/services">Google Ads</Link></li>
              <li><Link to="/services">Account Management</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/case-studies">Portfolio</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Free Tools */}
          <div className="footer-col">
            <h4>Free Tools</h4>
            <ul>
              <li><Link to="/project-calculator">Project Calculator</Link></li>
              <li><Link to="/website-audit">Website Audit</Link></li>
              <li><Link to="/roi-calculator">ROI Calculator</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Get In Touch</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 7l8 6 8-6"/></svg>
                <a href="mailto:shape360official@gmail.com">Shape360official@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.24c1.1.36 2.3.56 3.6.56a1 1 0 011 1V20a1 1 0 01-1 1C10.8 21 3 13.2 3 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.25 1z"/></svg>
                <a href="tel:+918209978891">+91 8209978891</a>
              </div>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Border */}
        <div className="footer-border"></div>

        {/* Social + Copyright Row */}
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Shape-360. All rights reserved.</span>
          <div className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
          <a href="#" className="back-to-top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            Back to Top &#8593;
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
