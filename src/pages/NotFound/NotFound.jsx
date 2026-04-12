import { Link } from "react-router-dom";
import { useEffect } from "react";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
import "./NotFound.css";

const NotFound = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".notfound-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="notfound-page">
      <Helmet>
        <title>404 - Page Not Found | Shape-360</title>
      </Helmet>

      <div className="notfound-bg-text">404</div>

      <div className="container notfound-content">
        <div className="sec-tagline">
          <div className="line"></div>
          <p>Lost in Space</p>
          <div className="line"></div>
        </div>
        <h1 className="notfound-title">
          Page Not <span>Found</span>
        </h1>
        <p className="notfound-desc">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="thm-btn">
            Back to Home <span>&#8594;</span>
          </Link>
          <Link to="/contact" className="notfound-link">
            Contact Support <span>&#8594;</span>
          </Link>
        </div>

        <div className="notfound-links">
          <p>Or try one of these:</p>
          <div className="notfound-quick-links">
            <Link to="/services">Services</Link>
            <Link to="/case-studies">Portfolio</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
