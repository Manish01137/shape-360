import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
import "./ClientPortal.css";

const milestones = [
  { id: 1, title: "Discovery & Strategy", date: "Week 1", status: "completed", percent: 100 },
  { id: 2, title: "Design Concepts", date: "Week 2", status: "completed", percent: 100 },
  { id: 3, title: "Design Finalization", date: "Week 2-3", status: "completed", percent: 100 },
  { id: 4, title: "Development", date: "Week 3-4", status: "active", percent: 65 },
  { id: 5, title: "Testing & QA", date: "Week 5", status: "pending", percent: 0 },
  { id: 6, title: "Launch & Handover", date: "Week 6", status: "pending", percent: 0 },
];

const messages = [
  { from: "Shape-360 Team", time: "9:42 AM", text: "Good morning! We've just pushed the latest design updates to staging. Take a look and let us know your thoughts.", type: "team" },
  { from: "You", time: "10:15 AM", text: "Wow, the hero section looks incredible! Can we adjust the CTA button color?", type: "client" },
  { from: "Shape-360 Team", time: "10:22 AM", text: "Absolutely — we'll have 3 variations ready by EOD. Also, here's your updated conversion funnel from last week 📊", type: "team" },
  { from: "You", time: "10:30 AM", text: "Perfect. The weekly reports have been really helpful btw 🙌", type: "client" },
];

const files = [
  { name: "Design_System_v2.fig", type: "figma", size: "12.4 MB", date: "2 hours ago" },
  { name: "Brand_Guidelines.pdf", type: "pdf", size: "3.8 MB", date: "Yesterday" },
  { name: "Homepage_Mockup_Final.png", type: "image", size: "2.1 MB", date: "Yesterday" },
  { name: "Content_Draft.docx", type: "doc", size: "456 KB", date: "3 days ago" },
  { name: "Analytics_Report_Wk3.xlsx", type: "excel", size: "890 KB", date: "3 days ago" },
];

const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tool-hero-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
      );
    });

    // Animate progress
    let count = 0;
    const target = 65;
    const timer = setInterval(() => {
      count += 2;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      setProgress(count);
    }, 30);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="tool-page">
      <Helmet>
        <title>Client Portal Demo | Shape-360</title>
        <meta name="description" content="See exactly how it feels to work with Shape-360 — project tracking, weekly reports, file sharing, and direct team communication." />
      </Helmet>

      <section className="tool-hero">
        <div className="tool-hero-bg"></div>
        <div className="container tool-hero-content">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>Client Portal Demo</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">Look Inside <span>Our Workflow</span></h1>
          <p className="tool-hero-desc">
            This is exactly what our clients see. Real-time progress tracking, weekly reports,
            direct team communication — all in one place.
          </p>
        </div>
      </section>

      <section className="tool-content">
        <div className="container">
          {/* PORTAL MOCKUP */}
          <div className="portal-wrap">
            {/* Demo Badge */}
            <div className="portal-demo-badge">
              <span className="portal-live-dot"></span>
              DEMO · Interactive Preview
            </div>

            <div className="portal-app">
              {/* Sidebar */}
              <aside className="portal-sidebar">
                <div className="portal-brand">
                  <div className="portal-logo">S</div>
                  <div>
                    <strong>Shape-360</strong>
                    <span>Client Portal</span>
                  </div>
                </div>

                <div className="portal-nav">
                  <button className={`portal-nav-item ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                    Overview
                  </button>
                  <button className={`portal-nav-item ${activeTab === "messages" ? "active" : ""}`} onClick={() => setActiveTab("messages")}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                    Messages
                    <span className="portal-badge">3</span>
                  </button>
                  <button className={`portal-nav-item ${activeTab === "files" ? "active" : ""}`} onClick={() => setActiveTab("files")}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                    Files
                  </button>
                  <button className={`portal-nav-item ${activeTab === "reports" ? "active" : ""}`} onClick={() => setActiveTab("reports")}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                    Reports
                  </button>
                  <button className={`portal-nav-item ${activeTab === "invoices" ? "active" : ""}`} onClick={() => setActiveTab("invoices")}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    Invoices
                  </button>
                </div>

                <div className="portal-user">
                  <div className="portal-avatar">J</div>
                  <div>
                    <strong>John Doe</strong>
                    <span>Client</span>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="portal-main">
                {activeTab === "overview" && (
                  <div className="portal-tab">
                    <div className="portal-tab-header">
                      <h2>Project Overview</h2>
                      <span className="portal-status active">
                        <span className="portal-live-dot"></span>
                        In Progress
                      </span>
                    </div>

                    <div className="portal-cards">
                      <div className="portal-card">
                        <span className="portal-card-label">Project</span>
                        <strong>E-Commerce Redesign</strong>
                        <p>Shape-360 × Your Brand</p>
                      </div>
                      <div className="portal-card">
                        <span className="portal-card-label">Timeline</span>
                        <strong>6 Weeks</strong>
                        <p>Launch: Nov 28, 2025</p>
                      </div>
                      <div className="portal-card">
                        <span className="portal-card-label">Progress</span>
                        <strong>{progress}%</strong>
                        <div className="portal-progress-bar">
                          <div className="portal-progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                      <div className="portal-card">
                        <span className="portal-card-label">Next Milestone</span>
                        <strong>Development</strong>
                        <p>Due in 3 days</p>
                      </div>
                    </div>

                    <h3 className="portal-section-title">Milestones</h3>
                    <div className="portal-milestones">
                      {milestones.map((m) => (
                        <div key={m.id} className={`portal-milestone ${m.status}`}>
                          <div className="portal-milestone-dot">
                            {m.status === "completed" && "✓"}
                            {m.status === "active" && <span className="portal-pulse"></span>}
                          </div>
                          <div className="portal-milestone-info">
                            <strong>{m.title}</strong>
                            <span>{m.date}</span>
                          </div>
                          <div className="portal-milestone-percent">{m.percent}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "messages" && (
                  <div className="portal-tab">
                    <div className="portal-tab-header">
                      <h2>Messages</h2>
                      <span className="portal-status">Active Channel</span>
                    </div>

                    <div className="portal-messages">
                      {messages.map((msg, i) => (
                        <div key={i} className={`portal-msg ${msg.type}`}>
                          <div className="portal-msg-avatar">{msg.from.charAt(0)}</div>
                          <div className="portal-msg-content">
                            <div className="portal-msg-header">
                              <strong>{msg.from}</strong>
                              <span>{msg.time}</span>
                            </div>
                            <p>{msg.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="portal-msg-input">
                      <input type="text" placeholder="Type a message..." disabled />
                      <button className="portal-send" disabled>Send</button>
                    </div>
                  </div>
                )}

                {activeTab === "files" && (
                  <div className="portal-tab">
                    <div className="portal-tab-header">
                      <h2>Files & Assets</h2>
                      <span className="portal-status">5 files · 19.6 MB</span>
                    </div>

                    <div className="portal-files">
                      {files.map((f, i) => (
                        <div key={i} className="portal-file">
                          <div className={`portal-file-icon ${f.type}`}>
                            {f.type === "figma" && "F"}
                            {f.type === "pdf" && "P"}
                            {f.type === "image" && "I"}
                            {f.type === "doc" && "D"}
                            {f.type === "excel" && "X"}
                          </div>
                          <div className="portal-file-info">
                            <strong>{f.name}</strong>
                            <span>{f.size} · {f.date}</span>
                          </div>
                          <button className="portal-file-action">Download</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "reports" && (
                  <div className="portal-tab">
                    <div className="portal-tab-header">
                      <h2>Weekly Reports</h2>
                      <span className="portal-status">Updated weekly</span>
                    </div>

                    <div className="portal-reports">
                      <div className="portal-report">
                        <div className="portal-report-header">
                          <strong>Week 4 Report</strong>
                          <span>Nov 18 - Nov 24</span>
                        </div>
                        <div className="portal-report-stats">
                          <div><strong>12</strong><span>Hours Worked</span></div>
                          <div><strong>8</strong><span>Tasks Completed</span></div>
                          <div><strong>3</strong><span>Reviews Pending</span></div>
                          <div><strong>65%</strong><span>Overall Progress</span></div>
                        </div>
                        <div className="portal-report-summary">
                          <h4>This week's highlights</h4>
                          <ul>
                            <li>✓ Completed homepage development (responsive, animations)</li>
                            <li>✓ Integrated payment gateway testing environment</li>
                            <li>✓ SEO optimization for all product pages</li>
                            <li>→ Starting product detail page development Monday</li>
                          </ul>
                        </div>
                      </div>

                      <div className="portal-report">
                        <div className="portal-report-header">
                          <strong>Week 3 Report</strong>
                          <span>Nov 11 - Nov 17</span>
                        </div>
                        <div className="portal-report-stats">
                          <div><strong>14</strong><span>Hours Worked</span></div>
                          <div><strong>11</strong><span>Tasks Completed</span></div>
                          <div><strong>0</strong><span>Reviews Pending</span></div>
                          <div><strong>48%</strong><span>Overall Progress</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "invoices" && (
                  <div className="portal-tab">
                    <div className="portal-tab-header">
                      <h2>Invoices & Payments</h2>
                      <span className="portal-status">Next: Dec 1</span>
                    </div>

                    <div className="portal-invoices">
                      <div className="portal-invoice paid">
                        <div>
                          <strong>Invoice #INV-2025-001</strong>
                          <span>Project Deposit (50%)</span>
                        </div>
                        <div className="portal-invoice-right">
                          <strong>$999.00</strong>
                          <span className="portal-invoice-status">✓ Paid</span>
                        </div>
                      </div>
                      <div className="portal-invoice pending">
                        <div>
                          <strong>Invoice #INV-2025-002</strong>
                          <span>Project Completion (50%)</span>
                        </div>
                        <div className="portal-invoice-right">
                          <strong>$999.00</strong>
                          <span className="portal-invoice-status pending">Due Dec 1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </main>
            </div>
          </div>

          {/* CTA */}
          <div className="portal-cta">
            <h3>This is what working with Shape-360 feels like.</h3>
            <p>Transparent. Organized. Always in the loop. No more chasing updates over email.</p>
            <Link to="/contact" className="thm-btn">Start Your Project <span>&#8594;</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientPortal;
