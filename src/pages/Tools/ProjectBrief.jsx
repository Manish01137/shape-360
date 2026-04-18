import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
import jsPDF from "jspdf";
import "./ProjectBrief.css";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const industryPresets = [
  "E-Commerce",
  "SaaS / Tech",
  "Jewelry & Luxury",
  "Real Estate",
  "Food & Restaurant",
  "Education",
  "Healthcare",
  "Fashion & Apparel",
  "Agency / Services",
  "Other",
];

const goalPresets = [
  "Increase sales & conversions",
  "Build brand awareness",
  "Generate more leads",
  "Launch a new product",
  "Expand internationally",
  "Replace outdated website",
];

const ProjectBrief = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    description: "",
    goals: [],
    budget: "5000-15000",
    timeline: "1-2 months",
    audience: "",
  });
  const [generating, setGenerating] = useState(false);
  const [brief, setBrief] = useState(null);
  const briefRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tool-hero-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const toggleGoal = (g) => {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(g)
        ? prev.goals.filter((x) => x !== g)
        : [...prev.goals, g],
    }));
  };

  const canProceed1 = form.name && form.email && form.company;
  const canProceed2 = form.industry && form.description.length > 20;
  const canProceed3 = form.goals.length > 0 && form.audience;

  const generateBrief = async () => {
    setGenerating(true);
    setStep(5);

    if (!GEMINI_API_KEY) {
      setTimeout(() => {
        setBrief(mockBrief());
        setGenerating(false);
      }, 2800);
      return;
    }

    try {
      const prompt = `You are a senior strategist at Shape-360 digital agency. Create a detailed, professional project brief based on the following client information. Return ONLY valid JSON with no markdown.

Client: ${form.name}
Company: ${form.company}
Industry: ${form.industry}
Description: ${form.description}
Goals: ${form.goals.join(", ")}
Target Audience: ${form.audience}
Budget: $${form.budget}
Timeline: ${form.timeline}

Return JSON in this exact structure:
{
  "executiveSummary": "A confident 3-sentence summary of the project vision and why it matters",
  "objectives": ["Objective 1 (10-15 words, specific & measurable)", "Objective 2", "Objective 3", "Objective 4"],
  "targetAudience": "A 2-3 sentence detailed persona of the target audience",
  "recommendedScope": {
    "pages": ["Page name 1", "Page name 2", "Page name 3", "Page name 4", "Page name 5", "Page name 6"],
    "features": ["Feature 1 (5-8 words)", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6"],
    "integrations": ["Integration 1", "Integration 2", "Integration 3"]
  },
  "techStack": ["Tech 1", "Tech 2", "Tech 3", "Tech 4"],
  "phases": [
    {"name": "Discovery & Strategy", "duration": "Week 1", "deliverables": "Brand audit, competitor analysis, sitemap, content strategy"},
    {"name": "Design & Prototyping", "duration": "Week 2-3", "deliverables": "Wireframes, high-fidelity mockups, interactive prototype"},
    {"name": "Development", "duration": "Week 4-6", "deliverables": "Frontend build, backend integration, CMS setup, testing"},
    {"name": "Launch & Optimization", "duration": "Week 7", "deliverables": "QA, deployment, analytics setup, post-launch support"}
  ],
  "kpis": ["KPI 1 with target number (e.g. '3x conversion rate within 90 days')", "KPI 2", "KPI 3", "KPI 4"],
  "budgetBreakdown": [
    {"item": "Strategy & Design", "percent": "25%"},
    {"item": "Development", "percent": "45%"},
    {"item": "Content & Copywriting", "percent": "15%"},
    {"item": "Testing & Launch", "percent": "10%"},
    {"item": "Post-launch Support", "percent": "5%"}
  ],
  "risks": ["Risk 1 with mitigation (15 words)", "Risk 2", "Risk 3"],
  "nextSteps": ["Step 1 (action-oriented)", "Step 2", "Step 3"]
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.85, maxOutputTokens: 2500 },
          }),
        }
      );

      const data = await response.json();
      let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      text = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);
      setBrief(parsed);
    } catch (error) {
      console.error(error);
      setBrief(mockBrief());
    }
    setGenerating(false);
  };

  const mockBrief = () => ({
    executiveSummary: `${form.company} is positioned to dominate the ${form.industry.toLowerCase()} space through a premium digital presence. This brief outlines a strategic roadmap designed to convert ${form.audience.toLowerCase()} into loyal customers. The proposed solution combines conversion-focused design, scalable architecture, and measurable growth metrics.`,
    objectives: [
      "Increase qualified leads by 3x within 90 days of launch",
      "Reduce bounce rate below 40% through optimized UX",
      "Establish brand authority with premium, cohesive visual identity",
      "Build a scalable foundation that supports future growth",
    ],
    targetAudience: `Primary audience: ${form.audience}. Secondary: decision-makers and stakeholders seeking trusted, credible partners. Psychographics: values quality, expects professional experience, researches before committing.`,
    recommendedScope: {
      pages: ["Home", "About", "Services / Products", "Case Studies", "Blog", "Contact"],
      features: [
        "Custom responsive design system",
        "CMS for easy content updates",
        "SEO optimization & schema markup",
        "Analytics & conversion tracking",
        "Lead capture forms with CRM sync",
        "Premium animations & micro-interactions",
      ],
      integrations: ["Google Analytics 4", "Email marketing (Mailchimp/Klaviyo)", "CRM (HubSpot/Salesforce)"],
    },
    techStack: ["React + Vite", "Tailwind / Custom CSS", "Node.js Backend", "Headless CMS"],
    phases: [
      { name: "Discovery & Strategy", duration: "Week 1", deliverables: "Brand audit, competitor analysis, sitemap, content strategy" },
      { name: "Design & Prototyping", duration: "Week 2-3", deliverables: "Wireframes, high-fidelity mockups, interactive prototype" },
      { name: "Development", duration: "Week 4-6", deliverables: "Frontend build, backend integration, CMS setup, testing" },
      { name: "Launch & Optimization", duration: "Week 7", deliverables: "QA, deployment, analytics setup, post-launch support" },
    ],
    kpis: [
      "3x increase in qualified leads within 90 days",
      "Page load speed under 2 seconds",
      "40%+ mobile conversion rate",
      "SEO ranking top 3 for 10 target keywords",
    ],
    budgetBreakdown: [
      { item: "Strategy & Design", percent: "25%" },
      { item: "Development", percent: "45%" },
      { item: "Content & Copywriting", percent: "15%" },
      { item: "Testing & Launch", percent: "10%" },
      { item: "Post-launch Support", percent: "5%" },
    ],
    risks: [
      "Scope creep — mitigated with clear milestones and change-request process",
      "Content delays — mitigated by parallel content and design workstreams",
      "Integration complexity — mitigated by upfront technical discovery phase",
    ],
    nextSteps: [
      "Schedule a 30-minute discovery call",
      "Sign statement of work and deposit invoice",
      "Kick-off meeting within 3 business days",
    ],
  });

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 48;
    const maxWidth = pageWidth - margin * 2;
    let y = margin;

    const gold = [201, 168, 76];
    const dark = [20, 20, 20];
    const muted = [110, 110, 110];

    const ensureSpace = (needed) => {
      if (y + needed > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };

    const addHeading = (text, size = 18) => {
      ensureSpace(size + 16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...dark);
      doc.setFontSize(size);
      doc.text(text, margin, y);
      y += size * 0.9;
      doc.setDrawColor(...gold);
      doc.setLineWidth(1.2);
      doc.line(margin, y, margin + 40, y);
      y += 18;
    };

    const addPara = (text, size = 10.5, color = dark) => {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...color);
      doc.setFontSize(size);
      const lines = doc.splitTextToSize(text, maxWidth);
      ensureSpace(lines.length * (size + 3));
      doc.text(lines, margin, y);
      y += lines.length * (size + 3) + 6;
    };

    const addBullets = (items) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      items.forEach((item) => {
        const text = `•  ${item}`;
        const lines = doc.splitTextToSize(text, maxWidth - 14);
        ensureSpace(lines.length * 14 + 4);
        doc.setTextColor(...dark);
        doc.text(lines, margin + 6, y);
        y += lines.length * 13 + 4;
      });
      y += 6;
    };

    doc.setFillColor(15, 15, 15);
    doc.rect(0, 0, pageWidth, 90, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(...gold);
    doc.text("Shape-360", margin, 50);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(220, 220, 220);
    doc.text("Premium Digital Agency  |  Project Brief", margin, 68);
    doc.setTextColor(...gold);
    doc.setFontSize(9);
    doc.text(new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), pageWidth - margin, 50, { align: "right" });
    y = 130;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(...dark);
    doc.text("Project Brief", margin, y);
    y += 32;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(...muted);
    doc.text(`Prepared for ${form.company}`, margin, y);
    y += 30;

    doc.setDrawColor(...gold);
    doc.setLineWidth(2);
    doc.line(margin, y, margin + 60, y);
    y += 30;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...muted);
    doc.text("CLIENT", margin, y);
    doc.text("INDUSTRY", margin + 180, y);
    doc.text("BUDGET", margin + 340, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...dark);
    doc.text(form.name, margin, y);
    doc.text(form.industry, margin + 180, y);
    doc.text(`$${form.budget}`, margin + 340, y);
    y += 36;

    addHeading("Executive Summary");
    addPara(brief.executiveSummary);

    addHeading("Project Objectives");
    addBullets(brief.objectives);

    addHeading("Target Audience");
    addPara(brief.targetAudience);

    addHeading("Recommended Scope");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...dark);
    ensureSpace(20);
    doc.text("Pages & Sections", margin, y);
    y += 16;
    addBullets(brief.recommendedScope.pages);
    doc.setFont("helvetica", "bold");
    ensureSpace(20);
    doc.text("Core Features", margin, y);
    y += 16;
    addBullets(brief.recommendedScope.features);
    doc.setFont("helvetica", "bold");
    ensureSpace(20);
    doc.text("Integrations", margin, y);
    y += 16;
    addBullets(brief.recommendedScope.integrations);

    addHeading("Recommended Tech Stack");
    addBullets(brief.techStack);

    addHeading("Project Phases & Timeline");
    brief.phases.forEach((phase) => {
      ensureSpace(48);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11.5);
      doc.setTextColor(...dark);
      doc.text(`${phase.name}  —  ${phase.duration}`, margin, y);
      y += 14;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...muted);
      const lines = doc.splitTextToSize(phase.deliverables, maxWidth);
      doc.text(lines, margin, y);
      y += lines.length * 12 + 14;
    });

    addHeading("Success Metrics (KPIs)");
    addBullets(brief.kpis);

    addHeading("Budget Breakdown");
    brief.budgetBreakdown.forEach((b) => {
      ensureSpace(18);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(...dark);
      doc.text(b.item, margin, y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...gold);
      doc.text(b.percent, pageWidth - margin, y, { align: "right" });
      y += 18;
    });
    y += 10;

    addHeading("Risks & Mitigation");
    addBullets(brief.risks);

    addHeading("Next Steps");
    addBullets(brief.nextSteps);

    ensureSpace(100);
    y += 20;
    doc.setFillColor(...gold);
    doc.rect(margin, y, maxWidth, 70, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(15, 15, 15);
    doc.text("Ready to start?", margin + 20, y + 28);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("company@stayliadxb.com  |  +91 8209978891  |  shape-360.com", margin + 20, y + 50);

    doc.save(`Shape-360-Brief-${form.company.replace(/\s+/g, "-")}.pdf`);
  };

  return (
    <div className="tool-page">
      <Helmet>
        <title>AI Project Brief Generator | Shape-360</title>
        <meta name="description" content="Get a professional, AI-generated project brief for your business in 60 seconds. Downloadable PDF included." />
      </Helmet>

      <section className="tool-hero">
        <div className="tool-hero-bg"></div>
        <div className="container tool-hero-content">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>AI Project Brief</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">Your Full Project Brief — <span>In 60 Seconds</span></h1>
          <p className="tool-hero-desc">
            Tell us about your business. Our AI generates a complete, professional project
            brief — scope, timeline, KPIs, budget breakdown, and next steps. Download as PDF.
          </p>
        </div>
      </section>

      <section className="tool-content">
        <div className="container">
          {step < 5 && (
            <div className="brief-wizard">
              <div className="brief-progress">
                <div className="brief-progress-bar" style={{ width: `${(step / 4) * 100}%` }}></div>
                <div className="brief-steps">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className={`brief-step-dot ${step >= s ? "active" : ""}`}>
                      {step > s ? "✓" : s}
                    </div>
                  ))}
                </div>
              </div>

              {step === 1 && (
                <div className="brief-card">
                  <h2>Let's start with you</h2>
                  <p className="brief-sub">We'll personalize your brief with these details.</p>

                  <div className="brief-field">
                    <label>Your Name *</label>
                    <input type="text" placeholder="Ahmed Al Mansoori" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="brief-field">
                    <label>Email Address *</label>
                    <input type="email" placeholder="ahmed@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="brief-field">
                    <label>Company Name *</label>
                    <input type="text" placeholder="Veloura Jewels" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>

                  <div className="brief-actions">
                    <button className="thm-btn" disabled={!canProceed1} onClick={() => setStep(2)}>
                      Continue <span>&#8594;</span>
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="brief-card">
                  <h2>What do you do?</h2>
                  <p className="brief-sub">The more specific, the better the brief.</p>

                  <div className="brief-field">
                    <label>Industry *</label>
                    <div className="brief-chips">
                      {industryPresets.map((ind) => (
                        <button
                          key={ind}
                          type="button"
                          className={`brief-chip ${form.industry === ind ? "active" : ""}`}
                          onClick={() => setForm({ ...form, industry: ind })}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="brief-field">
                    <label>Describe your business *</label>
                    <textarea
                      rows="4"
                      placeholder="We handcraft premium sterling silver jewelry with ethically sourced lab-grown gemstones, selling globally via our e-commerce store and partner boutiques..."
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                    <span className="brief-hint">{form.description.length}/20 chars minimum</span>
                  </div>

                  <div className="brief-actions">
                    <button className="brief-btn-secondary" onClick={() => setStep(1)}>
                      <span>&#8592;</span> Back
                    </button>
                    <button className="thm-btn" disabled={!canProceed2} onClick={() => setStep(3)}>
                      Continue <span>&#8594;</span>
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="brief-card">
                  <h2>What are you trying to achieve?</h2>
                  <p className="brief-sub">Select all that apply — we'll prioritize in the brief.</p>

                  <div className="brief-field">
                    <label>Project Goals * (multi-select)</label>
                    <div className="brief-chips">
                      {goalPresets.map((g) => (
                        <button
                          key={g}
                          type="button"
                          className={`brief-chip ${form.goals.includes(g) ? "active" : ""}`}
                          onClick={() => toggleGoal(g)}
                        >
                          {form.goals.includes(g) ? "✓ " : ""}{g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="brief-field">
                    <label>Who's your target audience? *</label>
                    <textarea
                      rows="2"
                      placeholder="Women aged 25-45, fashion-conscious, disposable income $80k+, value ethical sourcing..."
                      value={form.audience}
                      onChange={(e) => setForm({ ...form, audience: e.target.value })}
                    />
                  </div>

                  <div className="brief-actions">
                    <button className="brief-btn-secondary" onClick={() => setStep(2)}>
                      <span>&#8592;</span> Back
                    </button>
                    <button className="thm-btn" disabled={!canProceed3} onClick={() => setStep(4)}>
                      Continue <span>&#8594;</span>
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="brief-card">
                  <h2>Final details</h2>
                  <p className="brief-sub">This shapes your budget breakdown and timeline.</p>

                  <div className="brief-field">
                    <label>Budget Range (USD)</label>
                    <div className="brief-chips">
                      {["1000-5000", "5000-15000", "15000-35000", "35000-75000", "75000+"].map((b) => (
                        <button
                          key={b}
                          type="button"
                          className={`brief-chip ${form.budget === b ? "active" : ""}`}
                          onClick={() => setForm({ ...form, budget: b })}
                        >
                          ${b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="brief-field">
                    <label>Ideal Timeline</label>
                    <div className="brief-chips">
                      {["2-4 weeks", "1-2 months", "2-4 months", "4+ months", "Flexible"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`brief-chip ${form.timeline === t ? "active" : ""}`}
                          onClick={() => setForm({ ...form, timeline: t })}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="brief-actions">
                    <button className="brief-btn-secondary" onClick={() => setStep(3)}>
                      <span>&#8592;</span> Back
                    </button>
                    <button className="thm-btn" onClick={generateBrief}>
                      Generate My Brief <span>&#8594;</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 5 && generating && (
            <div className="brief-loading">
              <div className="brief-loading-orb"></div>
              <h2>Crafting your project brief...</h2>
              <p>Analyzing industry benchmarks, scoping your project, and building your roadmap.</p>
              <ul className="brief-loading-steps">
                <li className="active">Analyzing your business model</li>
                <li className="active">Researching industry benchmarks</li>
                <li className="active">Building recommended scope</li>
                <li className="active">Calculating timeline & budget</li>
                <li>Finalizing your brief</li>
              </ul>
            </div>
          )}

          {step === 5 && brief && !generating && (
            <div className="brief-output" ref={briefRef}>
              <div className="brief-output-header">
                <div>
                  <span className="brief-output-label">Project Brief</span>
                  <h1>Prepared for {form.company}</h1>
                  <p className="brief-output-meta">
                    {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    {" • "}Confidential
                  </p>
                </div>
                <button className="thm-btn brief-download" onClick={downloadPDF}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download PDF
                </button>
              </div>

              <div className="brief-section">
                <h3>Executive Summary</h3>
                <p>{brief.executiveSummary}</p>
              </div>

              <div className="brief-section">
                <h3>Project Objectives</h3>
                <ul className="brief-list">
                  {brief.objectives.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              </div>

              <div className="brief-section">
                <h3>Target Audience</h3>
                <p>{brief.targetAudience}</p>
              </div>

              <div className="brief-section">
                <h3>Recommended Scope</h3>
                <div className="brief-scope-grid">
                  <div>
                    <h4>Pages & Sections</h4>
                    <ul className="brief-list">
                      {brief.recommendedScope.pages.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4>Core Features</h4>
                    <ul className="brief-list">
                      {brief.recommendedScope.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4>Integrations</h4>
                    <ul className="brief-list">
                      {brief.recommendedScope.integrations.map((x, i) => <li key={i}>{x}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="brief-section">
                <h3>Recommended Tech Stack</h3>
                <div className="brief-tech-chips">
                  {brief.techStack.map((t, i) => <span key={i}>{t}</span>)}
                </div>
              </div>

              <div className="brief-section">
                <h3>Project Phases</h3>
                <div className="brief-phases">
                  {brief.phases.map((p, i) => (
                    <div key={i} className="brief-phase">
                      <div className="brief-phase-num">0{i + 1}</div>
                      <div className="brief-phase-body">
                        <div className="brief-phase-header">
                          <h4>{p.name}</h4>
                          <span>{p.duration}</span>
                        </div>
                        <p>{p.deliverables}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="brief-section">
                <h3>Success Metrics</h3>
                <ul className="brief-list">
                  {brief.kpis.map((k, i) => <li key={i}>{k}</li>)}
                </ul>
              </div>

              <div className="brief-section">
                <h3>Budget Breakdown</h3>
                <div className="brief-budget">
                  {brief.budgetBreakdown.map((b, i) => (
                    <div key={i} className="brief-budget-row">
                      <div className="brief-budget-label">
                        <span>{b.item}</span>
                        <strong>{b.percent}</strong>
                      </div>
                      <div className="brief-budget-bar">
                        <div className="brief-budget-fill" style={{ width: b.percent }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="brief-section">
                <h3>Risks & Mitigation</h3>
                <ul className="brief-list">
                  {brief.risks.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>

              <div className="brief-section">
                <h3>Next Steps</h3>
                <ol className="brief-list numbered">
                  {brief.nextSteps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              </div>

              <div className="brief-cta-final">
                <h2>Ready to make this real?</h2>
                <p>Your brief is downloadable. Let's turn it into a launched project.</p>
                <div className="brief-cta-actions">
                  <button className="thm-btn" onClick={downloadPDF}>
                    Download PDF <span>&#8594;</span>
                  </button>
                  <Link to="/contact" className="brief-btn-secondary">
                    Book Discovery Call <span>&#8594;</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectBrief;
