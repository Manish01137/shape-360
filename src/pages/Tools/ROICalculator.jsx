import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
import "./Tools.css";

const ROICalculator = () => {
  const [revenue, setRevenue] = useState(5000);
  const [traffic, setTraffic] = useState(1000);
  const [conversion, setConversion] = useState(2);
  const [investment, setInvestment] = useState(999);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tool-hero-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  // Calculate projections
  const currentCustomers = Math.round(traffic * (conversion / 100));
  const avgOrderValue = currentCustomers > 0 ? revenue / currentCustomers : 0;

  // Our improvements (conservative)
  const newConversion = Math.min(conversion * 1.6, 12); // 60% improvement
  const newTraffic = Math.round(traffic * 1.4); // 40% more traffic
  const newCustomers = Math.round(newTraffic * (newConversion / 100));
  const projectedRevenue = Math.round(newCustomers * avgOrderValue);
  const revenueGain = projectedRevenue - revenue;
  const monthlyROI = revenueGain > 0 ? Math.round((revenueGain / investment) * 100) : 0;
  const paybackDays = revenueGain > 0 ? Math.max(1, Math.round((investment / revenueGain) * 30)) : 0;

  const formatNum = (n) => n.toLocaleString();

  return (
    <div className="tool-page">
      <Helmet>
        <title>ROI Calculator | Shape-360</title>
        <meta name="description" content="See how much more revenue a better website could generate. Calculate your ROI with Shape-360." />
      </Helmet>

      <section className="tool-hero">
        <div className="tool-hero-bg"></div>
        <div className="container tool-hero-content">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>ROI Calculator</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">What's a Better Website <span>Worth</span>?</h1>
          <p className="tool-hero-desc">
            Plug in your numbers. See how quickly a redesign pays for itself.
          </p>
        </div>
      </section>

      <section className="tool-content">
        <div className="container">
          <div className="roi-layout">

            {/* LEFT — INPUTS */}
            <div className="roi-inputs">
              <h3>Your Current Numbers</h3>
              <p className="roi-inputs-desc">Enter your current monthly figures — we'll show you the potential.</p>

              <div className="roi-input-group">
                <label>Monthly Revenue ($)</label>
                <input
                  type="range" min="500" max="100000" step="500"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                />
                <div className="roi-input-display">${formatNum(revenue)}<span>/month</span></div>
              </div>

              <div className="roi-input-group">
                <label>Monthly Website Visitors</label>
                <input
                  type="range" min="100" max="50000" step="100"
                  value={traffic}
                  onChange={(e) => setTraffic(Number(e.target.value))}
                />
                <div className="roi-input-display">{formatNum(traffic)}<span>visitors</span></div>
              </div>

              <div className="roi-input-group">
                <label>Current Conversion Rate (%)</label>
                <input
                  type="range" min="0.5" max="10" step="0.5"
                  value={conversion}
                  onChange={(e) => setConversion(Number(e.target.value))}
                />
                <div className="roi-input-display">{conversion}%<span>converting</span></div>
              </div>

              <div className="roi-input-group">
                <label>Your Investment with Shape-360 ($)</label>
                <input
                  type="range" min="499" max="7999" step="100"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                />
                <div className="roi-input-display">${formatNum(investment)}<span>one-time</span></div>
              </div>
            </div>

            {/* RIGHT — RESULTS */}
            <div className="roi-results">
              <h3>Your Projected Growth</h3>

              <div className="roi-comparison">
                <div className="roi-col roi-col-before">
                  <span className="roi-col-label">Current</span>
                  <div className="roi-stat">
                    <span className="roi-stat-value">${formatNum(revenue)}</span>
                    <span className="roi-stat-label">Monthly Revenue</span>
                  </div>
                  <div className="roi-stat">
                    <span className="roi-stat-value">{formatNum(traffic)}</span>
                    <span className="roi-stat-label">Monthly Visitors</span>
                  </div>
                  <div className="roi-stat">
                    <span className="roi-stat-value">{conversion}%</span>
                    <span className="roi-stat-label">Conversion Rate</span>
                  </div>
                  <div className="roi-stat">
                    <span className="roi-stat-value">{formatNum(currentCustomers)}</span>
                    <span className="roi-stat-label">Customers/Month</span>
                  </div>
                </div>

                <div className="roi-arrow">&#8594;</div>

                <div className="roi-col roi-col-after">
                  <span className="roi-col-label">After Shape-360</span>
                  <div className="roi-stat">
                    <span className="roi-stat-value highlight">${formatNum(projectedRevenue)}</span>
                    <span className="roi-stat-label">Monthly Revenue</span>
                  </div>
                  <div className="roi-stat">
                    <span className="roi-stat-value highlight">{formatNum(newTraffic)}</span>
                    <span className="roi-stat-label">Monthly Visitors</span>
                  </div>
                  <div className="roi-stat">
                    <span className="roi-stat-value highlight">{newConversion.toFixed(1)}%</span>
                    <span className="roi-stat-label">Conversion Rate</span>
                  </div>
                  <div className="roi-stat">
                    <span className="roi-stat-value highlight">{formatNum(newCustomers)}</span>
                    <span className="roi-stat-label">Customers/Month</span>
                  </div>
                </div>
              </div>

              {/* Bottom line */}
              <div className="roi-bottom-line">
                <div className="roi-bottom-stat">
                  <span className="roi-bottom-value">${formatNum(revenueGain)}</span>
                  <span className="roi-bottom-label">Extra Revenue/Month</span>
                </div>
                <div className="roi-bottom-stat">
                  <span className="roi-bottom-value">{monthlyROI}%</span>
                  <span className="roi-bottom-label">Monthly ROI</span>
                </div>
                <div className="roi-bottom-stat">
                  <span className="roi-bottom-value">{paybackDays} days</span>
                  <span className="roi-bottom-label">Pays for Itself</span>
                </div>
              </div>

              <div className="roi-disclaimer">
                * Projections based on 60% conversion improvement and 40% traffic increase — conservative estimates from our past projects.
              </div>

              <Link to="/contact" className="thm-btn roi-cta">
                Let's Make This Happen <span>&#8594;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ROICalculator;
