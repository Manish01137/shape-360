import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
import "./AIDesignGenerator.css";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const vibes = [
  { id: "modern", label: "Modern & Clean", desc: "Minimalist, lots of whitespace" },
  { id: "bold", label: "Bold & Dynamic", desc: "Strong typography, vibrant colors" },
  { id: "elegant", label: "Elegant & Luxury", desc: "Premium, sophisticated, refined" },
  { id: "playful", label: "Playful & Fun", desc: "Creative, colorful, friendly" },
  { id: "techy", label: "Tech & Futuristic", desc: "Dark mode, neon accents, sleek" },
];

const palettePresets = {
  modern: { primary: "#2563eb", accent: "#06b6d4", bg: "#ffffff", text: "#0f172a", bgAlt: "#f8fafc" },
  bold: { primary: "#dc2626", accent: "#f59e0b", bg: "#0c0c0c", text: "#ffffff", bgAlt: "#1a1a1a" },
  elegant: { primary: "#c9a84c", accent: "#b8942e", bg: "#0f0f0f", text: "#e8e3d8", bgAlt: "#1a1a1a" },
  playful: { primary: "#ec4899", accent: "#8b5cf6", bg: "#fff7ed", text: "#1e1b4b", bgAlt: "#fed7aa" },
  techy: { primary: "#10b981", accent: "#3b82f6", bg: "#0a0e1a", text: "#e2e8f0", bgAlt: "#141b2e" },
};

const industryPresets = [
  {
    id: "jewelry",
    icon: "💎",
    label: "Jewelry & Luxury",
    industry: "Luxury jewelry",
    sampleName: "Aurum Atelier",
    sampleDesc: "We handcraft premium sterling silver and 18k gold jewelry with ethically sourced lab-grown diamonds, shipped globally with white-glove concierge service.",
    vibe: "elegant",
  },
  {
    id: "saas",
    icon: "⚡",
    label: "SaaS / Tech",
    industry: "B2B SaaS",
    sampleName: "Nexaflow",
    sampleDesc: "An AI-powered workflow automation platform that helps growing teams eliminate repetitive tasks, integrate tools, and ship faster — all without writing code.",
    vibe: "techy",
  },
  {
    id: "restaurant",
    icon: "🍽️",
    label: "Restaurant",
    industry: "Fine dining restaurant",
    sampleName: "Saffron & Oak",
    sampleDesc: "A modern Mediterranean fine-dining restaurant in Dubai, known for seasonal tasting menus, natural wines, and intimate chef-led dining experiences.",
    vibe: "elegant",
  },
  {
    id: "fitness",
    icon: "💪",
    label: "Fitness",
    industry: "Premium fitness studio",
    sampleName: "Forged Athletics",
    sampleDesc: "A boutique strength-training studio with certified coaches, data-driven programming, and small-group sessions designed for serious fitness progress.",
    vibe: "bold",
  },
  {
    id: "real-estate",
    icon: "🏢",
    label: "Real Estate",
    industry: "Luxury real estate",
    sampleName: "Meridian Properties",
    sampleDesc: "A boutique luxury real estate firm specializing in waterfront penthouses and private estates for high-net-worth international buyers across Dubai and Monaco.",
    vibe: "elegant",
  },
  {
    id: "fashion",
    icon: "👗",
    label: "Fashion",
    industry: "Fashion / Apparel",
    sampleName: "Noor & Co",
    sampleDesc: "A modern fashion label blending traditional Indian craftsmanship with contemporary silhouettes, producing small-batch seasonal collections for the modern woman.",
    vibe: "playful",
  },
  {
    id: "agency",
    icon: "🎯",
    label: "Agency",
    industry: "Creative agency",
    sampleName: "Northline Studio",
    sampleDesc: "A strategic brand and design studio helping ambitious founders build category-defining identities, websites, and campaigns that compound over time.",
    vibe: "modern",
  },
  {
    id: "ecommerce",
    icon: "🛍️",
    label: "E-Commerce",
    industry: "Consumer e-commerce",
    sampleName: "Beldon Goods",
    sampleDesc: "A direct-to-consumer lifestyle brand selling premium home goods made from reclaimed materials, with transparent sourcing and lifetime guarantees.",
    vibe: "modern",
  },
];

const AIDesignGenerator = () => {
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [vibe, setVibe] = useState("elegant");
  const [generating, setGenerating] = useState(false);
  const [design, setDesign] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".tool-hero-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const generateDesign = async (e) => {
    e.preventDefault();
    if (!businessName || !description) return;

    setGenerating(true);

    if (!GEMINI_API_KEY) {
      setTimeout(() => {
        setDesign(mockDesign(businessName, description, industry, vibe));
        setGenerating(false);
      }, 2500);
      return;
    }

    try {
      const prompt = `Create website content for a business. Return ONLY valid JSON with no markdown, no code fences.

Business Name: ${businessName}
Description: ${description}
Industry: ${industry || "general"}
Vibe: ${vibe}

Return JSON in this exact structure:
{
  "headline": "A bold 5-8 word hero headline",
  "subheadline": "A compelling 15-20 word tagline",
  "ctaText": "3 word CTA button text",
  "services": ["Service 1 (2-3 words)", "Service 2", "Service 3"],
  "features": [
    {"title": "Feature Title (2-3 words)", "desc": "15-word description"},
    {"title": "Feature Title", "desc": "15-word description"},
    {"title": "Feature Title", "desc": "15-word description"}
  ],
  "aboutTitle": "About section 3-word title",
  "aboutText": "2-sentence about paragraph, 40 words max",
  "stat1": {"number": "100+", "label": "Happy Clients"},
  "stat2": {"number": "5 Years", "label": "Experience"},
  "stat3": {"number": "24/7", "label": "Support"}
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.9, maxOutputTokens: 1000 },
          }),
        }
      );

      const data = await response.json();
      let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      text = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);
      setDesign({ ...parsed, colors: palettePresets[vibe] });
    } catch (error) {
      console.error(error);
      setDesign(mockDesign(businessName, description, industry, vibe));
    }
    setGenerating(false);
  };

  const mockDesign = (name, desc, ind, v) => ({
    headline: `${name} — Built for Growth`,
    subheadline: `Premium ${ind || "solutions"} crafted with precision and designed to scale your business forward.`,
    ctaText: "Get Started",
    services: ["Strategy", "Design", "Development"],
    features: [
      { title: "Premium Quality", desc: "Every detail crafted to the highest standard with meticulous attention." },
      { title: "Fast Delivery", desc: "Quick turnaround without compromising on quality or precision." },
      { title: "Dedicated Support", desc: "24/7 assistance from our expert team whenever you need it." },
    ],
    aboutTitle: "Our Story",
    aboutText: `${name} was built with one mission — ${desc}. We believe in quality over quantity, results over promises.`,
    stat1: { number: "100+", label: "Happy Clients" },
    stat2: { number: "5 Years", label: "Experience" },
    stat3: { number: "24/7", label: "Support" },
    colors: palettePresets[v],
  });

  return (
    <div className="tool-page">
      <Helmet>
        <title>AI Design Generator | Shape-360</title>
        <meta name="description" content="Generate a complete website design mockup with AI. Just describe your business — we'll show you what your site could look like." />
      </Helmet>

      <section className="tool-hero">
        <div className="tool-hero-bg"></div>
        <div className="container tool-hero-content">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>AI Design Generator</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">See Your Website <span>Before You Build It</span></h1>
          <p className="tool-hero-desc">
            Describe your business — our AI generates a complete design mockup with
            copy, colors, and layout. See what's possible in 30 seconds.
          </p>
        </div>
      </section>

      <section className="tool-content">
        <div className="container">
          <div className="aidg-layout">
            {/* INPUT FORM */}
            <div className="aidg-form">
              <h3>Tell us about your business</h3>

              <div className="aidg-field">
                <label>Quick-start with an industry</label>
                <p className="aidg-preset-hint">One click fills the form with a sample business. Edit it to match yours.</p>
                <div className="aidg-presets">
                  {industryPresets.map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      className="aidg-preset"
                      onClick={() => {
                        setBusinessName(p.sampleName);
                        setIndustry(p.industry);
                        setDescription(p.sampleDesc);
                        setVibe(p.vibe);
                      }}
                    >
                      <span className="aidg-preset-icon">{p.icon}</span>
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="aidg-form-divider"><span>or fill manually</span></div>

              <form onSubmit={generateDesign}>
                <div className="aidg-field">
                  <label>Business Name *</label>
                  <input type="text" placeholder="e.g., Veloura Jewels" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
                </div>

                <div className="aidg-field">
                  <label>Industry</label>
                  <input type="text" placeholder="e.g., Luxury jewelry, SaaS, Fashion" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                </div>

                <div className="aidg-field">
                  <label>Describe what you do *</label>
                  <textarea
                    placeholder="We handcraft premium sterling silver jewelry with lab-grown gemstones..."
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="aidg-field">
                  <label>Pick a design vibe</label>
                  <div className="aidg-vibes">
                    {vibes.map((v) => (
                      <button
                        type="button"
                        key={v.id}
                        className={`aidg-vibe ${vibe === v.id ? "active" : ""}`}
                        onClick={() => setVibe(v.id)}
                      >
                        <strong>{v.label}</strong>
                        <span>{v.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="thm-btn aidg-submit" disabled={generating}>
                  {generating ? "Generating Design..." : "Generate My Design"} <span>&#8594;</span>
                </button>
              </form>

              {generating && (
                <div className="aidg-loading">
                  <div className="aidg-loading-bar"><div></div></div>
                  <p>AI is crafting your design...</p>
                </div>
              )}
            </div>

            {/* PREVIEW */}
            <div className="aidg-preview">
              {!design && !generating && (
                <div className="aidg-preview-empty">
                  <div className="aidg-preview-icon">✨</div>
                  <h4>Your AI-Generated Design</h4>
                  <p>Fill the form and watch the magic happen. We'll create a complete website design — copy, colors, everything.</p>
                </div>
              )}

              {generating && (
                <div className="aidg-preview-empty">
                  <div className="aidg-preview-icon pulse">✨</div>
                  <h4>AI thinking...</h4>
                  <p>Analyzing your business and crafting a unique design.</p>
                </div>
              )}

              {design && !generating && (
                <div className="aidg-preview-content" style={{
                  "--design-bg": design.colors.bg,
                  "--design-text": design.colors.text,
                  "--design-primary": design.colors.primary,
                  "--design-accent": design.colors.accent,
                  "--design-bg-alt": design.colors.bgAlt,
                }}>
                  {/* Browser Frame */}
                  <div className="aidg-browser">
                    <div className="aidg-browser-bar">
                      <span className="aidg-dot red"></span>
                      <span className="aidg-dot yellow"></span>
                      <span className="aidg-dot green"></span>
                      <div className="aidg-url">{businessName.toLowerCase().replace(/\s/g, "")}.com</div>
                    </div>

                    <div className="aidg-site">
                      {/* Nav */}
                      <div className="aidg-nav">
                        <div className="aidg-brand">
                          <div className="aidg-logo-mark">{businessName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}</div>
                          <strong>{businessName}</strong>
                        </div>
                        <div className="aidg-nav-links">
                          {design.services.map((s, i) => <span key={i}>{s}</span>)}
                        </div>
                        <button className="aidg-btn">{design.ctaText}</button>
                      </div>

                      {/* Hero */}
                      <div className="aidg-hero">
                        <h1>{design.headline}</h1>
                        <p>{design.subheadline}</p>
                        <button className="aidg-btn big">{design.ctaText} &#8594;</button>
                      </div>

                      {/* Stats */}
                      <div className="aidg-stats">
                        <div><strong>{design.stat1.number}</strong><span>{design.stat1.label}</span></div>
                        <div><strong>{design.stat2.number}</strong><span>{design.stat2.label}</span></div>
                        <div><strong>{design.stat3.number}</strong><span>{design.stat3.label}</span></div>
                      </div>

                      {/* Features */}
                      <div className="aidg-features">
                        {design.features.map((f, i) => (
                          <div key={i} className="aidg-feature">
                            <div className="aidg-feature-dot"></div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                          </div>
                        ))}
                      </div>

                      {/* About */}
                      <div className="aidg-about">
                        <h2>{design.aboutTitle}</h2>
                        <p>{design.aboutText}</p>
                      </div>

                      {/* Footer */}
                      <div className="aidg-footer">
                        &copy; {businessName} — Designed by AI
                      </div>
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="aidg-palette">
                    <h5>Your Color Palette</h5>
                    <div className="aidg-palette-chips">
                      {Object.entries(design.colors).map(([key, val]) => (
                        <div key={key} className="aidg-chip">
                          <div className="aidg-chip-color" style={{ background: val }}></div>
                          <span>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="aidg-cta">
                    <h3>Love what you see?</h3>
                    <p>Let's turn this AI concept into a real, high-converting website for your business.</p>
                    <div className="aidg-cta-actions">
                      <Link to="/contact" className="thm-btn">Build This For Me <span>&#8594;</span></Link>
                      <button
                        type="button"
                        className="aidg-regenerate"
                        onClick={(e) => generateDesign(e)}
                        disabled={generating}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="23 4 23 10 17 10" />
                          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                        </svg>
                        Regenerate
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIDesignGenerator;
