import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import "./Trust.css";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: "70+", label: "Projects Shipped", desc: "Across 6 countries since 2024" },
  { num: "98%", label: "Client Satisfaction", desc: "Based on real engagements" },
  { num: "20+", label: "Active Clients", desc: "From solo founders to enterprises" },
  { num: "6", label: "Countries Served", desc: "India, UAE, AU, US, UK, SG" },
];

const guarantees = [
  {
    title: "Delivered on Time",
    desc: "We commit to a delivery date in writing. If we miss it without prior agreement, you get 25% off your invoice.",
    icon: "clock",
  },
  {
    title: "100% Code Ownership",
    desc: "You own everything we build — code, designs, content. Full access, full control. No vendor lock-in.",
    icon: "key",
  },
  {
    title: "30-Day Free Polish",
    desc: "Free fixes and minor tweaks for 30 days after launch. No revision counts, no fine print.",
    icon: "wrench",
  },
  {
    title: "NDAs Available",
    desc: "We sign mutual NDAs for sensitive projects, especially enterprise and financial services engagements.",
    icon: "shield",
  },
];

const compliance = [
  { name: "GDPR Compliant", desc: "EU data protection standards" },
  { name: "SSL / TLS", desc: "Every site we ship is secured" },
  { name: "WCAG 2.1 AA", desc: "Accessibility-first development" },
  { name: "Stripe Verified", desc: "PCI-compliant payment integrations" },
  { name: "Razorpay Partner", desc: "Indian payment gateway certified" },
];

const transparency = [
  {
    q: "Who actually does the work?",
    a: "A small senior team. No outsourcing to junior contractors. Every line of code, every design pixel — done by Shape-360 specialists.",
  },
  {
    q: "What happens if I'm unhappy mid-project?",
    a: "Stop the project at any milestone. Pay only for work delivered up to that point. Take all assets, code, and designs with you. No fees, no friction.",
  },
  {
    q: "Where does my data live?",
    a: "Your data stays in your accounts — your hosting, your CMS, your analytics. We don't lock anything to our infrastructure. You can switch providers anytime.",
  },
  {
    q: "Do you sign client work as your portfolio?",
    a: "Only with explicit permission. We never share screenshots, results, or details without sign-off. Several of our enterprise clients prefer to remain unlisted.",
  },
];

const testimonialClients = [
  {
    company: "Zevolution",
    person: "Dheeraj",
    role: "Co-Founder",
    location: "India",
    quote: "Shape-360 captured the essence of our premium brand perfectly. The site feels like our materials — crafted, refined, and unmistakable.",
    link: "https://zevolution.in",
  },
  {
    company: "MershilTech",
    person: "Mershil Team",
    role: "Founders",
    location: "Sydney, Australia",
    quote: "Working with Shape-360 from Australia was seamless. They delivered an enterprise-grade platform that handles 500+ clients across 70+ countries.",
    link: "https://mershiltech.com",
    flag: "🇦🇺",
  },
  {
    company: "Veloura Jewels",
    person: "Veloura Team",
    role: "Founders",
    location: "India",
    quote: "Shape-360 built a stunning e-commerce store that reflects our brand's elegance. Online sales jumped 55% within the first quarter.",
    link: "https://velourajewels.in",
  },
  {
    company: "Staylia DXB",
    person: "Staylia Team",
    role: "Founders",
    location: "Dubai, UAE",
    quote: "The website speaks directly to property investors. The professionalism helped us onboard premium properties in Dubai Marina and Palm Jumeirah.",
    link: "https://stayliadxb.com",
    flag: "🇦🇪",
  },
];

const SVG = {
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  key: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>,
  wrench: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>,
};

const Trust = () => {
  const [count, setCount] = useState({ projects: 0, clients: 0, countries: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".trust-hero-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" }
      );
      gsap.fromTo(".trust-section",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".trust-content", start: "top 80%" },
        }
      );

      const counter = { projects: 0, clients: 0, countries: 0 };
      gsap.to(counter, {
        projects: 70, clients: 20, countries: 6,
        duration: 2, ease: "power2.out",
        onUpdate: () => setCount({
          projects: Math.floor(counter.projects),
          clients: Math.floor(counter.clients),
          countries: Math.floor(counter.countries),
        }),
        scrollTrigger: { trigger: ".trust-live", start: "top 75%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="trust-page">
      <Helmet>
        <title>Trust & Credibility | Shape-360 — How We Earn It</title>
        <meta name="description" content="Why founders trust Shape-360. Real client results, written guarantees, security compliance, and radical transparency about how we work." />
      </Helmet>

      {/* HERO */}
      <section className="trust-hero">
        <div className="trust-hero-bg"></div>
        <div className="container trust-hero-content">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>Trust & Credibility</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">
            Trust isn't <span>given.</span><br />It's <span className="italic">earned.</span>
          </h1>
          <p className="trust-hero-desc">
            Every claim on this page is verifiable. Every guarantee is in writing.
            Every client is real. This is how Shape-360 earns trust — and keeps it.
          </p>
        </div>
      </section>

      <div className="trust-content container">
        {/* LIVE STATS */}
        <section className="trust-section trust-live">
          <div className="trust-live-grid">
            <div className="trust-live-stat">
              <span className="trust-live-pulse"></span>
              <strong>{count.projects}+</strong>
              <span>Projects shipped</span>
            </div>
            <div className="trust-live-stat">
              <span className="trust-live-pulse"></span>
              <strong>{count.clients}+</strong>
              <span>Active clients</span>
            </div>
            <div className="trust-live-stat">
              <span className="trust-live-pulse"></span>
              <strong>{count.countries}</strong>
              <span>Countries served</span>
            </div>
            <div className="trust-live-stat">
              <span className="trust-live-pulse"></span>
              <strong>98%</strong>
              <span>Client satisfaction</span>
            </div>
          </div>
        </section>

        {/* GUARANTEES */}
        <section className="trust-section">
          <div className="trust-section-head">
            <span className="trust-tag">Our Promises</span>
            <h2>Four guarantees. <span className="italic">In writing.</span></h2>
            <p>Every Shape-360 engagement comes with these — without negotiation, without exceptions.</p>
          </div>
          <div className="trust-guarantees">
            {guarantees.map((g, i) => (
              <div className="trust-guarantee" key={i}>
                <div className="trust-guarantee-icon">{SVG[g.icon]}</div>
                <div>
                  <h3>{g.title}</h3>
                  <p>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COMPLIANCE */}
        <section className="trust-section">
          <div className="trust-section-head">
            <span className="trust-tag">Security & Compliance</span>
            <h2>Your data. <span className="italic">Your control.</span></h2>
          </div>
          <div className="trust-compliance">
            {compliance.map((c, i) => (
              <div className="trust-compliance-card" key={i}>
                <strong>{c.name}</strong>
                <span>{c.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CLIENT VOICES */}
        <section className="trust-section">
          <div className="trust-section-head">
            <span className="trust-tag">Verifiable Reviews</span>
            <h2>Real founders. <span className="italic">Real results.</span></h2>
            <p>Click any quote to verify the project on the live client website.</p>
          </div>
          <div className="trust-testimonials">
            {testimonialClients.map((t, i) => (
              <a href={t.link} target="_blank" rel="noreferrer" className="trust-testimonial" key={i}>
                <p className="trust-testimonial-quote">"{t.quote}"</p>
                <div className="trust-testimonial-meta">
                  <div>
                    <strong>{t.person}</strong>
                    <span>{t.role}, {t.company} {t.flag || ""}</span>
                  </div>
                  <span className="trust-testimonial-location">{t.location} →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* TRANSPARENCY Q&A */}
        <section className="trust-section">
          <div className="trust-section-head">
            <span className="trust-tag">Radical Transparency</span>
            <h2>Hard questions. <span className="italic">Honest answers.</span></h2>
          </div>
          <div className="trust-transparency">
            {transparency.map((t, i) => (
              <div className="trust-transparency-item" key={i}>
                <h4>{t.q}</h4>
                <p>{t.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="trust-section">
          <div className="trust-cta-card">
            <h2>Ready to <span className="italic">verify it yourself?</span></h2>
            <p>Book a 15-min call. We'll walk through any project, any guarantee, any concern. No sales pressure.</p>
            <div className="trust-cta-actions">
              <Link to="/contact" className="thm-btn">Talk to Founder <span>&#8594;</span></Link>
              <Link to="/case-studies" className="trust-cta-secondary">See live work</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Trust;
