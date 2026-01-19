import "./Footer.css";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/logo.png" alt="Shape-360 Logo" />
            <h3>Shape-360</h3>
          </div>

          <p>
            360° Digital Solutions That Shape Business Growth.
            We build, market, and scale your digital presence.
          </p>

          {/* Social Icons */}
          <div className="footer-socials">
            <a
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
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
            <span>hello@shape-360.com</span>
          </div>

          <div className="footer-contact">
            <Phone size={18} />
            <span>+1 (555) 123-4567</span>
          </div>

          <div className="footer-contact">
            <MapPin size={18} />
            <span>New York, NY</span>
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
