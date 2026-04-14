import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ExitIntent.css";

const ExitIntent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("shape360_exit_dismissed");
    if (dismissed) return;

    const handleMouseLeave = (e) => {
      if (e.clientY <= 5 && !show) {
        setShow(true);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 10000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [show]);

  const close = () => {
    setShow(false);
    sessionStorage.setItem("shape360_exit_dismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="exit-overlay" onClick={close}>
      <div className="exit-modal" onClick={(e) => e.stopPropagation()}>
        <button className="exit-close" onClick={close} aria-label="Close">&#10005;</button>
        <div className="exit-content">
          <span className="exit-badge">Wait — before you go!</span>
          <h2>Get a <span>Free</span> Strategy Session</h2>
          <p>
            Let us analyze your digital presence and create a tailored growth
            plan — completely free, no strings attached.
          </p>
          <div className="exit-actions">
            <Link to="/contact" className="thm-btn" onClick={close}>
              Book Free Consultation <span>&#8594;</span>
            </Link>
            <button className="exit-dismiss" onClick={close}>No thanks, I'll pass</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitIntent;
