import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import "./Roadmap.css";

gsap.registerPlugin(ScrollTrigger);

const shipped = [
  { date: "April 2026", title: "AutoFlow Beta Architecture", desc: "Designed and prototyped the AI automation platform — lead scraper, email engine, multi-platform scheduler." },
  { date: "May 2026", title: "Aksharam Ayurved Launch", desc: "Shipped Aksharam Ayurved — authentic Ayurvedic clinic platform for Vaidya Dolly, with tele-consultations across UK, USA, Canada and UAE." },
  { date: "April 2026", title: "International Client #1", desc: "Shipped MershilTech (Australia 🇦🇺) — Shape-360's first major international engagement, fully async-delivered." },
  { date: "March 2026", title: "AI Project Brief Generator", desc: "Visitors can now generate a 10-section professional project brief in 60 seconds, exportable as branded PDF." },
  { date: "March 2026", title: "Instant Proposal PDF", desc: "Project Calculator now generates a branded, downloadable proposal PDF with unique number and 14-day validity." },
  { date: "March 2026", title: "AI Design Generator", desc: "8 industry presets, vibe selection, AI-generated mockup with copy and color palette in 30 seconds." },
  { date: "February 2026", title: "5 Free Conversion Tools", desc: "Project Calculator, Website Audit, ROI Calculator, AI Design Generator, Client Portal Demo." },
  { date: "January 2026", title: "Premium Site Relaunch", desc: "Full Shape-360 v2 — custom cursor, smooth scroll, page transitions, premium typography (Fraunces + Inter)." },
];

const inProgress = [
  { eta: "Mid-May 2026", title: "AutoFlow Public Launch", desc: "AI automation platform goes live. Lead scraping, cold emails, multi-platform social posting — all in one tool." },
  { eta: "Late May 2026", title: "Real Video Testimonials", desc: "Recording 30-second video testimonials with founders of Zevolution, Veloura, Kedar Shakti, MershilTech, Staylia, and Aksharam Ayurved." },
  { eta: "June 2026", title: "Multi-Language Support", desc: "Adding Arabic (RTL) and Hindi to expand reach across MENA and India tier-2 markets." },
  { eta: "June 2026", title: "Public Newsletter", desc: "Weekly behind-the-scenes founder newsletter — case studies, lessons learned, agency-building insights." },
];

const next = [
  { quarter: "Q3 2026", title: "Mobile App Development Service", desc: "Adding native iOS and Android development to the service portfolio. React Native + Flutter expertise." },
  { quarter: "Q3 2026", title: "Affiliate Program", desc: "15% recurring commission for partners who refer clients. Designed for freelancers, consultants, and adjacent agencies." },
  { quarter: "Q3 2026", title: "Free Agency Masterclass", desc: "60-min live workshop on shipping high-converting websites. Recurring monthly. Free for waitlist." },
  { quarter: "Q4 2026", title: "Annual Year-in-Review", desc: "Public recap of every project shipped in 2026 — wins, losses, lessons. Full transparency." },
  { quarter: "Q4 2026", title: "AR/VR Portfolio Pieces", desc: "Adding immersive case studies and interactive 3D portfolio reveals." },
  { quarter: "2027", title: "Shape-360 Labs", desc: "Open experimentation space — new tools, beta features, and community-built integrations." },
];

const Roadmap = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".rd-hero-content > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" }
      );
      gsap.fromTo(".rd-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: ".rd-content", start: "top 80%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="rd-page">
      <Helmet>
        <title>Public Roadmap | Shape-360 — What We're Building Next</title>
        <meta name="description" content="Shape-360's public roadmap. See what we just shipped, what's in progress, and what's coming next. Radical transparency for clients, partners, and the curious." />
      </Helmet>

      {/* HERO */}
      <section className="rd-hero">
        <div className="rd-hero-bg"></div>
        <div className="container rd-hero-content">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>Public Roadmap</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">
            What we just shipped.<br />
            <span className="italic">What's coming next.</span>
          </h1>
          <p className="rd-hero-desc">
            Most agencies operate in stealth. We don't. This page is updated monthly
            with everything Shape-360 is shipping, building, and exploring.
          </p>
        </div>
      </section>

      <div className="rd-content container">
        {/* SHIPPED */}
        <section className="rd-section">
          <div className="rd-section-head">
            <div className="rd-section-title">
              <span className="rd-status rd-status-shipped">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Shipped
              </span>
              <h2>Recently <span className="italic">delivered</span></h2>
            </div>
            <span className="rd-count">{shipped.length} updates · last 90 days</span>
          </div>

          <div className="rd-list">
            {shipped.map((item, i) => (
              <div className="rd-item rd-item-shipped" key={i}>
                <div className="rd-item-marker"></div>
                <div className="rd-item-body">
                  <div className="rd-item-meta">
                    <span className="rd-item-date">{item.date}</span>
                    <span className="rd-item-tag">Shipped</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* IN PROGRESS */}
        <section className="rd-section">
          <div className="rd-section-head">
            <div className="rd-section-title">
              <span className="rd-status rd-status-progress">
                <span className="rd-status-pulse"></span>
                In Progress
              </span>
              <h2>Building <span className="italic">right now</span></h2>
            </div>
            <span className="rd-count">{inProgress.length} active builds</span>
          </div>

          <div className="rd-list">
            {inProgress.map((item, i) => (
              <div className="rd-item rd-item-progress" key={i}>
                <div className="rd-item-marker"></div>
                <div className="rd-item-body">
                  <div className="rd-item-meta">
                    <span className="rd-item-date">{item.eta}</span>
                    <span className="rd-item-tag rd-item-tag-progress">In progress</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEXT */}
        <section className="rd-section">
          <div className="rd-section-head">
            <div className="rd-section-title">
              <span className="rd-status rd-status-next">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
                Coming Next
              </span>
              <h2>What's <span className="italic">on deck</span></h2>
            </div>
            <span className="rd-count">{next.length} planned</span>
          </div>

          <div className="rd-list">
            {next.map((item, i) => (
              <div className="rd-item rd-item-next" key={i}>
                <div className="rd-item-marker"></div>
                <div className="rd-item-body">
                  <div className="rd-item-meta">
                    <span className="rd-item-date">{item.quarter}</span>
                    <span className="rd-item-tag rd-item-tag-next">Planned</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rd-cta">
          <h2>Want to <span className="italic">influence</span> what we build?</h2>
          <p>Tell us what you'd ship if you ran Shape-360. We read every reply.</p>
          <div className="rd-cta-actions">
            <Link to="/contact" className="thm-btn">Send Feedback <span>&#8594;</span></Link>
            <Link to="/automate" className="rd-cta-secondary">Join AutoFlow Waitlist</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Roadmap;
