import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGeoPersonalization } from "../../hooks/useGeoPersonalization";
import "./GeoWelcome.css";

const FLAG_EMOJI = {
  IN: "🇮🇳", AE: "🇦🇪", GB: "🇬🇧", US: "🇺🇸", CA: "🇨🇦",
  AU: "🇦🇺", SA: "🇸🇦", SG: "🇸🇬", DE: "🇩🇪", FR: "🇫🇷",
  JP: "🇯🇵", BR: "🇧🇷", MX: "🇲🇽", ZA: "🇿🇦",
};

const REGION_MESSAGES = {
  IN: {
    headline: "Serving clients across India",
    line: "We've shipped 8+ projects for Indian brands — from Delhi to Mumbai to Bangalore.",
    proof: "Veloura, KVS, Kedar Shakti, MindMint & more",
    cta: "See India Case Studies",
  },
  AE: {
    headline: "Working with Dubai's ambitious brands",
    line: "Our team is in Dubai. We speak the market, understand the pace, and deliver on time.",
    proof: "Staylia DXB, Zeqon and growing",
    cta: "See UAE Portfolio",
  },
  SA: {
    headline: "Scaling KSA businesses online",
    line: "Bilingual sites, Mada-ready payments, and local SEO built for the Saudi market.",
    proof: "Arabic + English by default",
    cta: "Start Your Project",
  },
  GB: {
    headline: "UK brands — welcome",
    line: "GDPR-ready, performance-obsessed websites built for the UK market.",
    proof: "Compliant, fast, beautifully designed",
    cta: "Book UK Discovery Call",
  },
  US: {
    headline: "Built for US growth teams",
    line: "Conversion-focused, SEO-ready websites shipped on your timezone.",
    proof: "EST / PST overlap · Stripe-native",
    cta: "See Pricing in USD",
  },
  SG: {
    headline: "Singapore — we're on your timezone",
    line: "Premium digital craft delivered with Asia-Pacific speed and reliability.",
    proof: "24-48h communication turnaround",
    cta: "Explore Services",
  },
};

const DEFAULT_MSG = {
  headline: "International clients, premium delivery",
  line: "We work with brands across 12+ countries — async, on time, always premium.",
  proof: "Dubai · India · US · UK · Singapore",
  cta: "View Case Studies",
};

const GeoWelcome = () => {
  const geo = useGeoPersonalization();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("shape360_geo_dismissed");
    if (isDismissed) {
      setDismissed(true);
      return;
    }
    if (!geo.loading && geo.countryCode) {
      const timer = setTimeout(() => setVisible(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [geo.loading, geo.countryCode]);

  const close = () => {
    setVisible(false);
    localStorage.setItem("shape360_geo_dismissed", "true");
    setTimeout(() => setDismissed(true), 500);
  };

  if (dismissed || !geo.countryCode) return null;

  const msg = REGION_MESSAGES[geo.countryCode] || DEFAULT_MSG;
  const flag = FLAG_EMOJI[geo.countryCode] || "🌍";
  const isRegional = Boolean(REGION_MESSAGES[geo.countryCode]);

  const ctaTarget = isRegional ? "/case-studies" : "/contact";

  return (
    <div className={`geo-welcome ${visible ? "visible" : ""}`}>
      <div className="geo-welcome-inner">
        <div className="geo-welcome-flag">{flag}</div>
        <div className="geo-welcome-body">
          <div className="geo-welcome-meta">
            <span className="geo-dot"></span>
            <span>
              Hi from {geo.city ? `${geo.city}, ` : ""}<strong>{geo.region}</strong>
            </span>
          </div>
          <h4>{msg.headline}</h4>
          <p>{msg.line}</p>
          <span className="geo-welcome-proof">{msg.proof}</span>
        </div>
        <div className="geo-welcome-actions">
          <Link to={ctaTarget} className="geo-welcome-cta" onClick={close}>
            {msg.cta}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <button className="geo-welcome-close" onClick={close} aria-label="Dismiss">
            &#10005;
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeoWelcome;
