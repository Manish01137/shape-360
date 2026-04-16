import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
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
    // Handle page count mutual exclusivity
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
    if (!selectedType) return { oneTime: 0, monthly: 0, timeline: "—" };

    const type = projectTypes.find((t) => t.id === selectedType);
    let oneTime = type.base;

    selectedFeatures.forEach((fId) => {
      const feat = features.find((f) => f.id === fId);
      if (feat) oneTime += feat.price;
    });

    const tl = timelines.find((t) => t.id === timeline);
    oneTime = Math.round(oneTime * tl.multiplier);

    let monthly = 0;
    let oneTimeAddons = 0;
    selectedAddons.forEach((aId) => {
      const addon = addons.find((a) => a.id === aId);
      if (addon) {
        if (addon.period === "/mo") monthly += addon.price;
        else oneTimeAddons += addon.price;
      }
    });

    oneTime += oneTimeAddons;

    const tlLabel = tl.label.match(/\((.+)\)/)?.[1] || tl.label;

    return { oneTime, monthly, timeline: tlLabel };
  };

  const estimate = calculateTotal();

  return (
    <div className="tool-page">
      <Helmet>
        <title>Project Calculator | Shape-360</title>
        <meta name="description" content="Get an instant project estimate for your website, e-commerce store, or web app. No calls needed." />
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
            Configure your project and get a real-time price. No calls, no waiting.
          </p>
        </div>
      </section>

      <section className="tool-content">
        <div className="container">
          <div className="calc-layout">
            {/* LEFT — CONFIG */}
            <div className="calc-config">

              {/* Step 1: Project Type */}
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

              {/* Step 2: Features */}
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

              {/* Step 3: Timeline */}
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

              {/* Step 4: Add-ons */}
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

            {/* RIGHT — ESTIMATE */}
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

                <Link to="/contact" className="thm-btn calc-cta">
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
    </div>
  );
};

export default ProjectCalculator;
