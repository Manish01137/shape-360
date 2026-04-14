import { useState, useEffect } from "react";
import "./CookieConsent.css";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("shape360_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("shape360_cookie_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("shape360_cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <p>
          We use cookies to enhance your experience and analyze site traffic.
          By continuing, you agree to our use of cookies.
        </p>
        <div className="cookie-actions">
          <button className="cookie-accept" onClick={accept}>Accept All</button>
          <button className="cookie-decline" onClick={decline}>Decline</button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
