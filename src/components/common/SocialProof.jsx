import { useState, useEffect } from "react";
import "./SocialProof.css";

const notifications = [
  { city: "Dubai", project: "Staylia DXB", time: "2 min ago" },
  { city: "New Delhi", project: "Kedar Shakti", time: "5 min ago" },
  { city: "Mumbai", project: "Veloura Jewels", time: "8 min ago" },
  { city: "Bangalore", project: "KVS Academy", time: "12 min ago" },
  { city: "San Francisco", project: "Zeqon", time: "15 min ago" },
  { city: "Pune", project: "JaldiRide Connect", time: "18 min ago" },
  { city: "Prayagraj", project: "FolkLane", time: "22 min ago" },
  { city: "Gujarat", project: "Krishi Global", time: "25 min ago" },
];

const SocialProof = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("shape360_social_dismissed");
    if (dismissed) return;

    const showFirst = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    }, 15000);

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % notifications.length);
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    }, 35000);

    return () => {
      clearTimeout(showFirst);
      clearInterval(interval);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("shape360_social_dismissed", "true");
  };

  const n = notifications[current];

  return (
    <div className={`social-proof ${visible ? "visible" : ""}`}>
      <div className="sp-icon">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
      <div className="sp-text">
        <p>Someone from <strong>{n.city}</strong> viewed <strong>{n.project}</strong></p>
        <span>{n.time}</span>
      </div>
      <button className="sp-close" onClick={dismiss} aria-label="Dismiss">&#10005;</button>
    </div>
  );
};

export default SocialProof;
