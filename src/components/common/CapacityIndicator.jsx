import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CapacityIndicator.css";

/* Capacity is seeded deterministically per-month so it doesn't flicker for
   returning visitors, and advances week-by-week through the month. */
const getSlotsData = () => {
  const now = new Date();
  const monthName = now.toLocaleDateString("en-US", { month: "long" });
  const day = now.getDate();
  const monthKey = now.getFullYear() * 100 + now.getMonth();

  const totalSlots = 5;
  const baseFilled = 2 + (monthKey % 2);
  const weekProgress = Math.min(2, Math.floor(day / 10));
  const filled = Math.min(totalSlots - 1, baseFilled + weekProgress);

  return { filled, total: totalSlots, monthName };
};

const CapacityIndicator = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(getSlotsData());

  useEffect(() => {
    const dismissed = sessionStorage.getItem("shape360_capacity_dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setData(getSlotsData()), 60000);
    return () => clearInterval(interval);
  }, []);

  const dismiss = (e) => {
    e.stopPropagation();
    setVisible(false);
    sessionStorage.setItem("shape360_capacity_dismissed", "true");
  };

  const percent = (data.filled / data.total) * 100;
  const remaining = data.total - data.filled;
  const urgent = remaining <= 2;

  return (
    <div className={`capacity-indicator ${visible ? "visible" : ""} ${urgent ? "urgent" : ""}`}>
      <div className="capacity-pulse"></div>
      <div className="capacity-body">
        <div className="capacity-header">
          <span className="capacity-dot"></span>
          <span className="capacity-label">
            {data.monthName} availability
          </span>
          <button className="capacity-close" onClick={dismiss} aria-label="Dismiss">&#10005;</button>
        </div>

        <div className="capacity-count">
          <strong>{data.filled}/{data.total}</strong>
          <span>slots filled</span>
        </div>

        <div className="capacity-bar">
          <div className="capacity-fill" style={{ width: `${percent}%` }}></div>
          <div className="capacity-marks">
            {Array.from({ length: data.total }).map((_, i) => (
              <div key={i} className={`capacity-mark ${i < data.filled ? "active" : ""}`}></div>
            ))}
          </div>
        </div>

        <p className="capacity-msg">
          {urgent ? (
            <><strong>Only {remaining} {remaining === 1 ? "slot" : "slots"} left</strong> — book your discovery call this week.</>
          ) : (
            <>{remaining} slots remaining for {data.monthName}. Lock yours in early.</>
          )}
        </p>

        <Link to="/contact" className="capacity-cta">
          Reserve a slot
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CapacityIndicator;
