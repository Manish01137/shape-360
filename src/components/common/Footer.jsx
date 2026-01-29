import "./Footer.css";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
} from "lucide-react";

import logo from "../../assets/images/shapee360.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            {/* ✅ LOGO ONLY */}
            <img src={logo} alt="Shape-360 Logo" />
          </div>

          <p>
            360° Digital Solutions That Shape Business Growth.
            We build, market, and scale your digital presence.
          </p>

          {/* Social Icons */}
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/shape360official?igsh=MTd0cWZvcWdxMXBo"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://www.facebook.com/share/1AmwEewBMn/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4>Services</h4>
          <ul>
            <li>Website Development</li>
            <li>Shopify Stores</li>
            <li>WordPress Sites</li>
            <li>Meta Ads</li>
            <li>Google Ads</li>
            <li>Account Management</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>Services</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4>Get In Touch</h4>

          <div className="footer-contact">
            <Mail size={18} />
            <span>Shape360official@gmail.com</span>
          </div>

          <div className="footer-contact">
            <Phone size={18} />
            <span>+91 8209978891</span>
          </div>

          <div className="footer-contact">
            <MapPin size={18} />
            <span>Bangalore, India</span>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <span>© 2026 Shape-360. All rights reserved.</span>

        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
