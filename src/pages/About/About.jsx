import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const StatCounter = ({ value, suffix = "+", label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const end = parseInt(value);
        const inc = end / (1500 / 16);
        const timer = setInterval(() => {
          start += inc;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [value]);

  return (
    <div className="about-stat" ref={ref}>
      <h3>{count}<span>{suffix}</span></h3>
      <p>{label}</p>
    </div>
  );
};

const About = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-hero-text > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" }
      );
      gsap.fromTo(".about-stat",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".about-stats-grid", start: "top 80%" }
        }
      );
      gsap.fromTo(".value-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".values-grid", start: "top 75%" }
        }
      );
      gsap.fromTo(".story-img-col",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".story-section", start: "top 70%" }
        }
      );
      gsap.fromTo(".story-text-col > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".story-section", start: "top 70%" }
        }
      );
      gsap.fromTo(".approach-item",
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".approach-list", start: "top 75%" }
        }
      );
      gsap.fromTo(".client-logo-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: ".client-logos-grid", start: "top 85%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const values = [
    { title: "Ship Fast, Fix Fast", desc: "We don't spend months in strategy decks. We move quickly, launch early, and iterate based on real data — not assumptions." },
    { title: "No Fluff, Just Work", desc: "We skip the jargon and buzzwords. You'll get honest timelines, clear updates, and work that actually moves your business forward." },
    { title: "Your Business = Our Business", desc: "We don't clock out at 6. If your launch is at midnight, we're there. Your deadlines are our deadlines — that's the deal." },
    { title: "Built to Last", desc: "We don't hand over fragile code and disappear. Everything we build is clean, documented, and made to run without us if needed." },
  ];

  const approach = [
    { num: "01", title: "We listen first.", desc: "Before touching a single pixel, we sit down and understand your business, your customers, and what's actually not working. No cookie-cutter audits." },
    { num: "02", title: "We build with intent.", desc: "Every page, every button, every word has a purpose. We don't add features because they look cool — we add them because they convert." },
    { num: "03", title: "We obsess over details.", desc: "The spacing between elements. The speed of a page load. The color of a CTA button. These small things compound into big results." },
    { num: "04", title: "We stay after launch.", desc: "Launching is the starting line, not the finish. We monitor, optimize, and grow alongside you — month after month." },
  ];

  const clients = [
    { name: "KVS Academy", link: "https://www.kvsacademy.org" },
    { name: "Veloura Jewels", link: "https://velourajewels.in" },
    { name: "Kedar Shakti", link: "https://kedarshakti.com" },
    { name: "Zeqon", link: "https://zeqon.co" },
    { name: "Staylia DXB", link: "https://stayliadxb.com" },
    { name: "JaldiRide Connect", link: "https://www.jaldirideconnect.com" },
  ];

  return (
    <div className="about-page">
      <Helmet>
        <title>About Us | Shape-360</title>
        <meta name="description" content="We're Shape-360 — a small, sharp digital agency in Bangalore that builds websites and runs ads for businesses that want real growth, not vanity metrics." />
      </Helmet>

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-bg"></div>
        <div className="container">
          <div className="about-hero-grid">
            <div className="about-hero-text">
              <div className="sec-tagline">
                <div className="line"></div>
                <p>About Shape-360</p>
              </div>
              <h1 className="sec-title">
                We don't do <span>average.</span> <br />
                Neither should you.
              </h1>
              <p className="about-hero-desc">
                Shape-360 is a digital agency that skips the fluff. We build
                websites that load fast, look sharp, and actually bring in
                customers. We run ads that generate real ROI — not just clicks.
              </p>
              <p className="about-hero-desc">
                Based in Bangalore. Working with brands across India, Dubai, and beyond.
              </p>
              <div className="about-hero-actions">
                <Link to="/contact" className="thm-btn">
                  Work With Us <span>&#8594;</span>
                </Link>
                <Link to="/case-studies" className="about-hero-link">
                  See Our Work <span>&#8594;</span>
                </Link>
              </div>
            </div>

            <div className="about-hero-img-col">
              <div className="about-hero-img-wrap">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" alt="Shape-360 team at work" />
              </div>
              <div className="about-stats-grid">
                <StatCounter value="70" label="Projects Shipped" />
                <StatCounter value="20" label="Brands Served" />
                <StatCounter value="2" label="Years Running" />
                <StatCounter value="98" suffix="%" label="Clients Who Stay" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS WE'VE WORKED WITH */}
      <section className="about-clients">
        <div className="container">
          <div className="about-clients-header">
            <p>Brands that trusted us with their digital growth</p>
          </div>
          <div className="client-logos-grid">
            {clients.map((c, i) => (
              <a href={c.link} target="_blank" rel="noreferrer" className="client-logo-item" key={i}>
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-img-col">
              <div className="story-img-wrap">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" alt="Working late on client projects" />
                <div className="story-img-accent"></div>
              </div>
            </div>
            <div className="story-text-col">
              <div className="sec-tagline">
                <p>The Backstory</p>
                <div className="line"></div>
              </div>
              <h2 className="sec-title">Started small. <br /><span>Stayed hungry.</span></h2>
              <p className="story-desc">
                Shape-360 didn't start in a boardroom. It started with late nights,
                a laptop, and a frustration — watching businesses get ripped off by
                agencies that charge premium prices for template websites and
                copy-paste ad campaigns.
              </p>
              <p className="story-desc">
                We knew we could do better. So we did. We started picking up projects,
                delivering results that clients didn't expect from a small team, and
                word spread. From a jewelry brand in India to a rental management
                company in Dubai — each project pushed us to get sharper.
              </p>
              <p className="story-desc">
                Two years in, 70+ projects shipped, and we still operate the same
                way: small team, high standards, zero shortcuts.
              </p>
              <div className="story-highlights">
                <div className="story-highlight">
                  <h4>2024</h4>
                  <p>Started in Bangalore</p>
                </div>
                <div className="story-highlight">
                  <h4>6</h4>
                  <p>Countries served</p>
                </div>
                <div className="story-highlight">
                  <h4>0</h4>
                  <p>Templates used</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE THINK */}
      <section className="approach-section">
        <div className="container">
          <div className="approach-header">
            <div className="sec-tagline">
              <div className="line"></div>
              <p>How We Think</p>
              <div className="line"></div>
            </div>
            <h2 className="sec-title">Our approach is <span>simple.</span></h2>
            <p className="approach-subtitle">
              No 50-page strategy documents. No meetings that should've been emails.
              Here's how we actually work.
            </p>
          </div>
          <div className="approach-list">
            {approach.map((item, i) => (
              <div className="approach-item" key={i}>
                <span className="approach-num">{item.num}</span>
                <div className="approach-text">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-mission">
        <div className="container text-center">
          <div className="mission-inner">
            <div className="sec-tagline" style={{ justifyContent: "center" }}>
              <div className="line"></div>
              <p>What Drives Us</p>
              <div className="line"></div>
            </div>
            <h2 className="mission-quote">
              "Most agencies sell you a service. We'd rather
              build you a <span>growth engine</span> — something
              that keeps working long after we're done."
            </h2>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="container">
          <div className="text-center">
            <div className="sec-tagline" style={{ justifyContent: "center" }}>
              <div className="line"></div>
              <p>How We Roll</p>
              <div className="line"></div>
            </div>
            <h2 className="sec-title">No BS. <span>Just principles.</span></h2>
            <p className="values-desc">
              These aren't motivational posters on a wall. This is how we
              actually run projects, every single day.
            </p>
          </div>

          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card" key={i}>
                <span className="value-num">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <div className="value-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta-bg"></div>
        <div className="container text-center" style={{ position: "relative", zIndex: 1 }}>
          <div className="sec-tagline" style={{ justifyContent: "center" }}>
            <div className="line"></div>
            <p>Enough Talking</p>
            <div className="line"></div>
          </div>
          <h2 className="sec-title">Let's build something <span>real.</span></h2>
          <p className="about-cta-desc">
            Tell us what you're working on. If we're the right fit,
            we'll tell you exactly how we'd approach it — for free.
            If not, we'll point you in the right direction. No pitch, no pressure.
          </p>
          <div className="about-cta-actions">
            <Link to="/contact" className="thm-btn">
              Start a Conversation <span>&#8594;</span>
            </Link>
            <a href="tel:+918209978891" className="about-cta-phone">
              Or just call: <strong>+91 8209978891</strong>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
