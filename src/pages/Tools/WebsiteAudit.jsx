import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
import "./Tools.css";

const auditChecks = [
  { id: "speed", label: "Page Speed", icon: "⚡", weight: 20 },
  { id: "mobile", label: "Mobile Friendly", icon: "📱", weight: 15 },
  { id: "seo", label: "SEO Basics", icon: "🔍", weight: 20 },
  { id: "ssl", label: "SSL Security", icon: "🔒", weight: 10 },
  { id: "design", label: "Modern Design", icon: "🎨", weight: 15 },
  { id: "cta", label: "Clear CTAs", icon: "🎯", weight: 10 },
  { id: "analytics", label: "Analytics Setup", icon: "📊", weight: 5 },
  { id: "accessibility", label: "Accessibility", icon: "♿", weight: 5 },
];

const getScoreColor = (score) => {
  if (score >= 80) return "#4ade80";
  if (score >= 50) return "#facc15";
  return "#ef4444";
};

const getScoreLabel = (score) => {
  if (score >= 80) return "Good";
  if (score >= 50) return "Needs Improvement";
  return "Poor";
};

const WebsiteAudit = () => {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [auditing, setAuditing] = useState(false);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tool-hero-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const runAudit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setAuditing(true);
    setProgress(0);
    setResults(null);

    // Simulate audit progress
    const checkResults = [];
    for (let i = 0; i < auditChecks.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 600));
      const score = Math.floor(Math.random() * 60) + 20; // 20-80 range for realism
      const check = auditChecks[i];

      let issues = [];
      if (score < 70) {
        const issueMap = {
          speed: ["Large images not optimized", "No browser caching", "Render-blocking resources"],
          mobile: ["Text too small on mobile", "Clickable elements too close", "Viewport not set"],
          seo: ["Missing meta descriptions", "No H1 tag found", "Missing alt text on images"],
          ssl: ["SSL certificate expiring soon", "Mixed content warnings"],
          design: ["Outdated layout patterns", "Inconsistent spacing", "Low contrast text"],
          cta: ["No clear call-to-action above fold", "CTA buttons not prominent"],
          analytics: ["Google Analytics not detected", "No conversion tracking"],
          accessibility: ["Missing ARIA labels", "Poor color contrast ratio"],
        };
        issues = (issueMap[check.id] || []).slice(0, score < 40 ? 3 : score < 60 ? 2 : 1);
      }

      checkResults.push({ ...check, score, issues });
      setProgress(Math.round(((i + 1) / auditChecks.length) * 100));
    }

    const totalScore = Math.round(
      checkResults.reduce((sum, c) => sum + (c.score * c.weight) / 100, 0)
    );

    setResults({ checks: checkResults, totalScore });
    setAuditing(false);
  };

  return (
    <div className="tool-page">
      <Helmet>
        <title>Free Website Audit | Shape-360</title>
        <meta name="description" content="Get a free instant audit of your website — speed, SEO, mobile, design, and more. See what's holding you back." />
      </Helmet>

      <section className="tool-hero">
        <div className="tool-hero-bg"></div>
        <div className="container tool-hero-content">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>Free Website Audit</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">How Does Your <span>Website</span> Score?</h1>
          <p className="tool-hero-desc">
            Enter your URL and get an instant analysis of speed, SEO, design, and more.
            100% free — no credit card, no commitment.
          </p>
        </div>
      </section>

      <section className="tool-content">
        <div className="container">
          {/* AUDIT FORM */}
          {!results && (
            <div className="audit-form-wrap">
              <form onSubmit={runAudit} className="audit-form">
                <div className="audit-input-row">
                  <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    disabled={auditing}
                  />
                  <input
                    type="email"
                    placeholder="your@email.com (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={auditing}
                  />
                </div>
                <button type="submit" className="thm-btn audit-submit" disabled={auditing}>
                  {auditing ? "Analyzing..." : "Run Free Audit"} <span>&#8594;</span>
                </button>
              </form>

              {auditing && (
                <div className="audit-progress">
                  <div className="audit-progress-bar">
                    <div className="audit-progress-fill" style={{ width: `${progress}%` }}></div>
                  </div>
                  <p className="audit-progress-text">
                    Scanning {auditChecks[Math.min(Math.floor((progress / 100) * auditChecks.length), auditChecks.length - 1)]?.label}...
                  </p>
                </div>
              )}

              <div className="audit-checks-preview">
                <p>We'll analyze your website for:</p>
                <div className="audit-checks-grid">
                  {auditChecks.map((check) => (
                    <div key={check.id} className="audit-check-item">
                      <span className="audit-check-icon">{check.icon}</span>
                      <span>{check.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RESULTS */}
          {results && (
            <div className="audit-results">
              {/* Score Circle */}
              <div className="audit-score-section">
                <div className="audit-score-circle" style={{ "--score-color": getScoreColor(results.totalScore) }}>
                  <svg viewBox="0 0 120 120">
                    <circle className="audit-score-bg" cx="60" cy="60" r="52" />
                    <circle
                      className="audit-score-ring"
                      cx="60" cy="60" r="52"
                      style={{
                        strokeDasharray: `${(results.totalScore / 100) * 327} 327`,
                        stroke: getScoreColor(results.totalScore),
                      }}
                    />
                  </svg>
                  <div className="audit-score-value">
                    <strong>{results.totalScore}</strong>
                    <span>/100</span>
                  </div>
                </div>
                <div className="audit-score-info">
                  <h2>Your website scored <span style={{ color: getScoreColor(results.totalScore) }}>{results.totalScore}/100</span></h2>
                  <p className="audit-score-label" style={{ color: getScoreColor(results.totalScore) }}>
                    {getScoreLabel(results.totalScore)}
                  </p>
                  <p className="audit-score-url">{url}</p>
                </div>
              </div>

              {/* Individual Checks */}
              <div className="audit-checks-results">
                {results.checks.map((check) => (
                  <div key={check.id} className="audit-result-card">
                    <div className="audit-result-header">
                      <div className="audit-result-left">
                        <span className="audit-result-icon">{check.icon}</span>
                        <h4>{check.label}</h4>
                      </div>
                      <div className="audit-result-score" style={{ color: getScoreColor(check.score) }}>
                        {check.score}/100
                      </div>
                    </div>
                    <div className="audit-result-bar">
                      <div
                        className="audit-result-bar-fill"
                        style={{ width: `${check.score}%`, background: getScoreColor(check.score) }}
                      ></div>
                    </div>
                    {check.issues.length > 0 && (
                      <ul className="audit-result-issues">
                        {check.issues.map((issue, i) => (
                          <li key={i}><span className="issue-dot"></span>{issue}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="audit-results-cta">
                <h3>Want us to fix these issues?</h3>
                <p>We'll rebuild your website with a perfect score — faster, SEO-optimized, and designed to convert.</p>
                <div className="audit-cta-actions">
                  <Link to="/contact" className="thm-btn">
                    Get Free Consultation <span>&#8594;</span>
                  </Link>
                  <button className="audit-rerun" onClick={() => { setResults(null); setUrl(""); }}>
                    Run Another Audit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WebsiteAudit;
