import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
import jsPDF from "jspdf";
import "./Tools.css";

const projectTypes = [
  { id: "landing", label: "Landing Page", base: 299 },
  { id: "business", label: "Business Website", base: 499 },
  { id: "ecommerce", label: "E-Commerce Store", base: 999 },
  { id: "shopify", label: "Shopify Store", base: 899 },
  { id: "wordpress", label: "WordPress Website", base: 499 },
  { id: "webapp", label: "Custom Web App", base: 1499 },
];

const features = [
  { id: "pages5", label: "Up to 5 Pages", price: 0 },
  { id: "pages10", label: "Up to 10 Pages", price: 200 },
  { id: "pagesUnlimited", label: "Unlimited Pages", price: 500 },
  { id: "cms", label: "CMS / Admin Panel", price: 300 },
  { id: "seo", label: "SEO Optimization", price: 200 },
  { id: "analytics", label: "Analytics & Tracking", price: 150 },
  { id: "payment", label: "Payment Gateway", price: 250 },
  { id: "chat", label: "Live Chat / Chatbot", price: 200 },
  { id: "blog", label: "Blog Section", price: 150 },
  { id: "multilang", label: "Multi-Language", price: 350 },
  { id: "api", label: "API Integrations", price: 400 },
  { id: "animation", label: "Premium Animations", price: 300 },
];

const addons = [
  { id: "maintenance", label: "Monthly Maintenance", price: 99, period: "/mo" },
  { id: "metaads", label: "Meta Ads Management", price: 349, period: "/mo" },
  { id: "googleads", label: "Google Ads Management", price: 449, period: "/mo" },
  { id: "branding", label: "Branding & Logo Design", price: 399, period: "" },
  { id: "copywriting", label: "Website Copywriting", price: 249, period: "" },
];

const timelines = [
  { id: "standard", label: "Standard (3-4 weeks)", multiplier: 1 },
  { id: "fast", label: "Fast Track (2 weeks)", multiplier: 1.3 },
  { id: "rush", label: "Rush (1 week)", multiplier: 1.6 },
];

const ProjectCalculator = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState(["pages5"]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [timeline, setTimeline] = useState("standard");
  const [step, setStep] = useState(1);
  const [proposalOpen, setProposalOpen] = useState(false);
  const [clientInfo, setClientInfo] = useState({ name: "", email: "", company: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tool-hero-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const toggleFeature = (id) => {
    const pageIds = ["pages5", "pages10", "pagesUnlimited"];
    if (pageIds.includes(id)) {
      setSelectedFeatures((prev) => [...prev.filter((f) => !pageIds.includes(f)), id]);
      return;
    }
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    if (!selectedType) return { oneTime: 0, monthly: 0, timeline: "—", breakdown: [] };

    const type = projectTypes.find((t) => t.id === selectedType);
    const breakdown = [{ label: type.label, price: type.base }];
    let oneTime = type.base;

    selectedFeatures.forEach((fId) => {
      const feat = features.find((f) => f.id === fId);
      if (feat && feat.price > 0) {
        breakdown.push({ label: feat.label, price: feat.price });
        oneTime += feat.price;
      } else if (feat) {
        breakdown.push({ label: feat.label, price: 0 });
      }
    });

    const tl = timelines.find((t) => t.id === timeline);
    const baseOneTime = oneTime;
    oneTime = Math.round(oneTime * tl.multiplier);
    if (tl.multiplier > 1) {
      breakdown.push({ label: `${tl.label} premium`, price: oneTime - baseOneTime });
    }

    let monthly = 0;
    let oneTimeAddons = 0;
    selectedAddons.forEach((aId) => {
      const addon = addons.find((a) => a.id === aId);
      if (addon) {
        if (addon.period === "/mo") {
          monthly += addon.price;
          breakdown.push({ label: `${addon.label} (monthly)`, price: addon.price, recurring: true });
        } else {
          oneTimeAddons += addon.price;
          breakdown.push({ label: addon.label, price: addon.price });
        }
      }
    });

    oneTime += oneTimeAddons;

    const tlLabel = tl.label.match(/\((.+)\)/)?.[1] || tl.label;

    return { oneTime, monthly, timeline: tlLabel, breakdown };
  };

  const estimate = calculateTotal();

  const downloadProposal = (e) => {
    e?.preventDefault?.();
    if (!clientInfo.name || !clientInfo.email) return;

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 48;
    const maxWidth = pageWidth - margin * 2;
    let y = margin;

    const gold = [201, 168, 76];
    const dark = [20, 20, 20];
    const muted = [110, 110, 110];

    const proposalNum = `SH-${Date.now().toString().slice(-6)}`;
    const validUntil = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    /* Header bar */
    doc.setFillColor(15, 15, 15);
    doc.rect(0, 0, pageWidth, 110, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(...gold);
    doc.text("Shape-360", margin, 56);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(220, 220, 220);
    doc.text("Premium Digital Agency", margin, 76);
    doc.text("company@stayliadxb.com  |  shape-360.com", margin, 92);

    doc.setTextColor(...gold);
    doc.setFontSize(9);
    doc.text(`PROPOSAL #${proposalNum}`, pageWidth - margin, 56, { align: "right" });
    doc.setTextColor(220, 220, 220);
    doc.text(new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), pageWidth - margin, 76, { align: "right" });
    doc.text(`Valid until ${validUntil}`, pageWidth - margin, 92, { align: "right" });

    y = 150;

    /* Title */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(32);
    doc.setTextColor(...dark);
    doc.text("Project Proposal", margin, y);
    y += 18;
    doc.setDrawColor(...gold);
    doc.setLineWidth(2);
    doc.line(margin, y, margin + 60, y);
    y += 28;

    /* Client block */
    doc.setFillColor(248, 248, 248);
    doc.rect(margin, y, maxWidth, 80, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...muted);
    doc.text("PREPARED FOR", margin + 16, y + 22);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.setTextColor(...dark);
    doc.text(clientInfo.name, margin + 16, y + 42);
    doc.setFontSize(11);
    doc.setTextColor(...muted);
    doc.text(clientInfo.company || "", margin + 16, y + 60);
    doc.text(clientInfo.email, pageWidth - margin - 16, y + 42, { align: "right" });
    y += 110;

    /* Summary */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(...dark);
    doc.text("Project Summary", margin, y);
    y += 22;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...muted);
    const summary = `This proposal outlines the scope, deliverables, timeline, and investment for your ${projectTypes.find((t) => t.id === selectedType)?.label.toLowerCase()}. All pricing is in USD and valid for 14 days from the date above.`;
    const summaryLines = doc.splitTextToSize(summary, maxWidth);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 14 + 20;

    /* Scope table */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(...dark);
    doc.text("Scope & Investment", margin, y);
    y += 20;

    doc.setFillColor(20, 20, 20);
    doc.rect(margin, y, maxWidth, 34, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...gold);
    doc.text("ITEM", margin + 16, y + 22);
    doc.text("AMOUNT", pageWidth - margin - 16, y + 22, { align: "right" });
    y += 34;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    estimate.breakdown.forEach((item, i) => {
      if (y > pageHeight - margin - 80) {
        doc.addPage();
        y = margin;
      }
      if (i % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(margin, y, maxWidth, 28, "F");
      }
      doc.setTextColor(...dark);
      doc.text(item.label, margin + 16, y + 18);
      doc.setTextColor(...dark);
      const priceText = item.price === 0 ? "Included" : `$${item.price.toLocaleString()}${item.recurring ? " /mo" : ""}`;
      doc.text(priceText, pageWidth - margin - 16, y + 18, { align: "right" });
      y += 28;
    });

    /* Totals */
    y += 16;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 22;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...dark);
    doc.text("One-Time Total", margin, y);
    doc.text(`$${estimate.oneTime.toLocaleString()}`, pageWidth - margin, y, { align: "right" });
    y += 22;
    if (estimate.monthly > 0) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(...muted);
      doc.text("Recurring Monthly", margin, y);
      doc.text(`$${estimate.monthly}/mo`, pageWidth - margin, y, { align: "right" });
      y += 20;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...gold);
    doc.text("Total Investment", margin, y + 6);
    doc.text(`$${estimate.oneTime.toLocaleString()} USD`, pageWidth - margin, y + 6, { align: "right" });
    y += 36;

    /* Timeline */
    if (y > pageHeight - margin - 180) {
      doc.addPage();
      y = margin;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(...dark);
    doc.text("Timeline", margin, y);
    y += 22;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...muted);
    doc.text(`Estimated delivery: ${estimate.timeline}`, margin, y);
    y += 28;

    const phases = [
      { name: "Discovery & Strategy", desc: "Brand audit, sitemap, content strategy" },
      { name: "Design", desc: "Wireframes and high-fidelity mockups" },
      { name: "Development", desc: "Build, integrations, testing" },
      { name: "Launch", desc: "QA, deployment, handover" },
    ];

    phases.forEach((p, i) => {
      if (y > pageHeight - margin - 40) {
        doc.addPage();
        y = margin;
      }
      doc.setFillColor(...gold);
      doc.circle(margin + 8, y + 6, 4, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...dark);
      doc.text(`${i + 1}. ${p.name}`, margin + 24, y + 10);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...muted);
      doc.text(p.desc, margin + 24, y + 24);
      y += 36;
    });

    /* Terms */
    if (y > pageHeight - margin - 180) {
      doc.addPage();
      y = margin;
    }
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(...dark);
    doc.text("Payment Terms", margin, y);
    y += 22;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(...muted);
    const terms = [
      "• 40% deposit to initiate the project",
      "• 30% at design approval",
      "• 30% on final delivery and launch",
      "• All pricing in USD. Stripe, wire transfer, and crypto accepted.",
      "• This proposal is valid for 14 days from the date above.",
    ];
    terms.forEach((t) => {
      doc.text(t, margin, y);
      y += 16;
    });
    y += 20;

    /* CTA block */
    if (y > pageHeight - margin - 100) {
      doc.addPage();
      y = margin;
    }
    doc.setFillColor(...gold);
    doc.rect(margin, y, maxWidth, 80, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(15, 15, 15);
    doc.text("Ready to get started?", margin + 20, y + 32);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.text("Reply to this proposal or book a call: shape-360.com/contact", margin + 20, y + 56);

    /* Footer on last page */
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...muted);
    doc.text(`Proposal ${proposalNum} • Shape-360 Digital Agency • Confidential`, pageWidth / 2, pageHeight - 24, { align: "center" });

    doc.save(`Shape-360-Proposal-${clientInfo.name.replace(/\s+/g, "-")}.pdf`);
    setProposalOpen(false);
  };

  return (
    <div className="tool-page">
      <Helmet>
        <title>Project Calculator | Shape-360</title>
        <meta name="description" content="Get an instant project estimate for your website, e-commerce store, or web app. Downloadable proposal — no calls needed." />
      </Helmet>

      <section className="tool-hero">
        <div className="tool-hero-bg"></div>
        <div className="container tool-hero-content">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>Project Calculator</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">Get an Instant <span>Estimate</span></h1>
          <p className="tool-hero-desc">
            Configure your project, see real-time pricing, and download a full PDF proposal in one click.
          </p>
        </div>
      </section>

      <section className="tool-content">
        <div className="container">
          <div className="calc-layout">
            <div className="calc-config">
              <div className="calc-step">
                <div className="calc-step-header">
                  <span className="calc-step-num">01</span>
                  <h3>What are you building?</h3>
                </div>
                <div className="calc-options-grid">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      className={`calc-option ${selectedType === type.id ? "active" : ""}`}
                      onClick={() => { setSelectedType(type.id); setStep(2); }}
                    >
                      <span className="calc-option-label">{type.label}</span>
                      <span className="calc-option-price">from ${type.base}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedType && (
                <div className="calc-step">
                  <div className="calc-step-header">
                    <span className="calc-step-num">02</span>
                    <h3>Select features</h3>
                  </div>
                  <div className="calc-options-grid cols-3">
                    {features.map((feat) => (
                      <button
                        key={feat.id}
                        className={`calc-option sm ${selectedFeatures.includes(feat.id) ? "active" : ""}`}
                        onClick={() => toggleFeature(feat.id)}
                      >
                        <span className="calc-option-check">{selectedFeatures.includes(feat.id) ? "✓" : ""}</span>
                        <span className="calc-option-label">{feat.label}</span>
                        <span className="calc-option-price">{feat.price === 0 ? "Included" : `+$${feat.price}`}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedType && (
                <div className="calc-step">
                  <div className="calc-step-header">
                    <span className="calc-step-num">03</span>
                    <h3>How fast do you need it?</h3>
                  </div>
                  <div className="calc-options-grid cols-3">
                    {timelines.map((tl) => (
                      <button
                        key={tl.id}
                        className={`calc-option sm ${timeline === tl.id ? "active" : ""}`}
                        onClick={() => setTimeline(tl.id)}
                      >
                        <span className="calc-option-label">{tl.label}</span>
                        <span className="calc-option-price">{tl.multiplier === 1 ? "Standard" : `${Math.round((tl.multiplier - 1) * 100)}% premium`}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedType && (
                <div className="calc-step">
                  <div className="calc-step-header">
                    <span className="calc-step-num">04</span>
                    <h3>Want add-ons?</h3>
                  </div>
                  <div className="calc-options-grid cols-2">
                    {addons.map((addon) => (
                      <button
                        key={addon.id}
                        className={`calc-option sm ${selectedAddons.includes(addon.id) ? "active" : ""}`}
                        onClick={() => toggleAddon(addon.id)}
                      >
                        <span className="calc-option-check">{selectedAddons.includes(addon.id) ? "✓" : ""}</span>
                        <span className="calc-option-label">{addon.label}</span>
                        <span className="calc-option-price">${addon.price}{addon.period}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="calc-estimate">
              <div className="calc-estimate-card">
                <h3>Your Estimate</h3>
                <div className="calc-estimate-divider"></div>

                <div className="calc-estimate-row main">
                  <span>One-Time Cost</span>
                  <strong>${estimate.oneTime.toLocaleString()}</strong>
                </div>

                {estimate.monthly > 0 && (
                  <div className="calc-estimate-row">
                    <span>Monthly Cost</span>
                    <strong>${estimate.monthly}/mo</strong>
                  </div>
                )}

                <div className="calc-estimate-row">
                  <span>Estimated Timeline</span>
                  <strong>{estimate.timeline}</strong>
                </div>

                <div className="calc-estimate-divider"></div>

                <p className="calc-estimate-note">
                  This is an estimate. Final pricing may vary based on specific requirements.
                </p>

                <button
                  className="thm-btn calc-cta"
                  onClick={() => selectedType && setProposalOpen(true)}
                  disabled={!selectedType}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 8 }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Proposal PDF
                </button>

                <Link to="/contact" className="calc-cta-secondary">
                  Get Exact Quote <span>&#8594;</span>
                </Link>

                <a href="tel:+918209978891" className="calc-phone">
                  Or call: <strong>+91 8209978891</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROPOSAL MODAL */}
      {proposalOpen && (
        <div className="proposal-modal-overlay" onClick={() => setProposalOpen(false)}>
          <div className="proposal-modal" onClick={(e) => e.stopPropagation()}>
            <button className="proposal-modal-close" onClick={() => setProposalOpen(false)} aria-label="Close">&#10005;</button>

            <div className="proposal-modal-head">
              <div className="proposal-modal-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3>One click away from your PDF proposal</h3>
              <p>We'll generate a branded, shareable proposal with your exact scope and pricing.</p>
            </div>

            <form onSubmit={downloadProposal} className="proposal-modal-form">
              <div className="proposal-modal-field">
                <label>Your Name *</label>
                <input
                  type="text"
                  placeholder="Ahmed Al Mansoori"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  required
                />
              </div>
              <div className="proposal-modal-field">
                <label>Email *</label>
                <input
                  type="email"
                  placeholder="ahmed@company.com"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  required
                />
              </div>
              <div className="proposal-modal-field">
                <label>Company</label>
                <input
                  type="text"
                  placeholder="Your Company"
                  value={clientInfo.company}
                  onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                />
              </div>

              <button type="submit" className="thm-btn proposal-modal-submit">
                Generate & Download PDF <span>&#8594;</span>
              </button>

              <p className="proposal-modal-hint">
                Estimated total: <strong>${estimate.oneTime.toLocaleString()}</strong>{estimate.monthly > 0 ? ` + $${estimate.monthly}/mo` : ""} • Timeline: <strong>{estimate.timeline}</strong>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCalculator;
