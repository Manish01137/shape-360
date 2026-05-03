import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import "./Automate.css";

gsap.registerPlugin(ScrollTrigger);

const Icon = ({ children }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const icons = {
  target: (<Icon><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Icon>),
  mail: (<Icon><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></Icon>),
  send: (<Icon><path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4 20-7Z" /></Icon>),
  refresh: (<Icon><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></Icon>),
  chart: (<Icon><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M7 16V9" /><path d="M11 16V5" /><path d="M15 16v-7" /><path d="M19 16v-3" /></Icon>),
  sparkles: (<Icon><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" /></Icon>),
  bot: (<Icon><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></Icon>),
  zap: (<Icon><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></Icon>),
  clock: (<Icon><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Icon>),
  shield: (<Icon><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></Icon>),
  globe: (<Icon><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></Icon>),
  check: (<Icon><polyline points="20 6 9 17 4 12" /></Icon>),
  x: (<Icon><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Icon>),
};

const features = [
  {
    icon: icons.target,
    title: "AI Lead Scraper",
    desc: "Type your ideal customer in plain English. Get 1,000s of verified leads with email + LinkedIn in 30 seconds.",
    tag: "Replaces Apollo + Hunter",
  },
  {
    icon: icons.send,
    title: "Personalized Cold Emails",
    desc: "AI writes a unique email for every lead — references their business, role, location. Sends at scale.",
    tag: "Replaces Mailchimp + Lemlist",
  },
  {
    icon: icons.globe,
    title: "Multi-Platform Scheduler",
    desc: "Write once. Auto-publish to LinkedIn, Instagram, Twitter, Facebook, WhatsApp Status.",
    tag: "Replaces Buffer + Hootsuite",
  },
  {
    icon: icons.refresh,
    title: "Smart Follow-Ups",
    desc: "Auto follow-up with non-responders. Different tone, fresh angle. Never lose a lead to silence again.",
    tag: "Replaces Reply.io",
  },
  {
    icon: icons.chart,
    title: "Real-Time Analytics",
    desc: "Live dashboard. Who opened. Who replied. Who's hot. Who's cold. All your campaigns in one view.",
    tag: "Replaces Mixpanel basics",
  },
  {
    icon: icons.sparkles,
    title: "AI Copywriter",
    desc: "Generate posts, captions, email subject lines, and ad copy — all in your brand voice.",
    tag: "Replaces Copy.ai + Jasper",
  },
];

const steps = [
  {
    num: "01",
    title: "Define Your Audience",
    desc: "Tell the AI who you want to reach. \"Dubai jewelry brand owners\" or \"SaaS founders in Bangalore.\" That's it.",
  },
  {
    num: "02",
    title: "AI Builds Your Pipeline",
    desc: "Scrapes leads, writes personalized emails, schedules social posts, sets up follow-ups. All in 60 seconds.",
  },
  {
    num: "03",
    title: "Watch Replies Roll In",
    desc: "While you sleep, the AI works. Wake up to qualified leads, replies, and growth. Zero manual work.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    desc: "For solo founders & freelancers testing the waters.",
    features: [
      "1,000 leads / month",
      "500 personalized emails",
      "50 scheduled posts",
      "3 social platforms",
      "Email support",
    ],
    cta: "Join Waitlist",
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    desc: "For agencies and growth teams shipping daily.",
    popular: true,
    features: [
      "5,000 leads / month",
      "2,500 personalized emails",
      "Unlimited scheduled posts",
      "All platforms (LinkedIn, IG, X, FB, WA)",
      "Smart follow-up automation",
      "Priority support + onboarding call",
    ],
    cta: "Join Waitlist",
  },
  {
    name: "Lifetime",
    price: "$99",
    period: "one-time",
    desc: "First 50 founders only. Then gone forever.",
    badge: "🔥 Limited",
    features: [
      "Everything in Pro",
      "Unlimited usage forever",
      "All future features included",
      "Direct WhatsApp founder access",
      "Lifetime price lock — no renewals",
    ],
    cta: "Claim Lifetime Spot",
  },
];

const faqs = [
  {
    q: "When does it launch?",
    a: "Mid-to-late May 2026. Waitlist members get access 48 hours before public launch + lifetime price lock if they convert in week 1.",
  },
  {
    q: "Do I need to be technical to use it?",
    a: "Nope. If you can type a sentence, you can use it. Designed for solo founders, freelancers, and agency owners — not developers.",
  },
  {
    q: "What if it doesn't work for my niche?",
    a: "30-day money-back guarantee. No questions, no friction. Email us, get a refund.",
  },
  {
    q: "Will my emails land in spam?",
    a: "We use warm-up infrastructure, custom sending domains, and AI-personalization to keep deliverability above 95%. Better than most $200/mo cold-email tools.",
  },
  {
    q: "Can I bring my own data?",
    a: "Yes. Upload CSVs, sync your CRM (HubSpot, Pipedrive, Notion), or use our scraper. Your choice.",
  },
  {
    q: "Why is the lifetime offer so cheap?",
    a: "Founder discount for early believers who help shape the product. After 50 spots, it's subscription-only at the listed monthly prices.",
  },
];

const Automate = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(143);
  const [openFAQ, setOpenFAQ] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".aut-hero-content > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );

      gsap.fromTo(".aut-step",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: "power2.out",
          scrollTrigger: { trigger: ".aut-steps-grid", start: "top 80%" },
        }
      );

      gsap.fromTo(".aut-feature",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".aut-features-grid", start: "top 80%" },
        }
      );

      gsap.fromTo(".aut-price",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".aut-pricing-grid", start: "top 80%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitlistCount((c) => c + Math.floor(Math.random() * 2));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setWaitlistCount((c) => c + 1);
    try {
      const existing = JSON.parse(localStorage.getItem("shape360_automate_waitlist") || "[]");
      existing.push({ name, email, timestamp: Date.now() });
      localStorage.setItem("shape360_automate_waitlist", JSON.stringify(existing));
    } catch {
      /* ignore */
    }
  };

  const scrollToWaitlist = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="aut-page">
      <Helmet>
        <title>AutoFlow by Shape-360 | AI Automation for Lead Gen, Email & Social</title>
        <meta name="description" content="Your 24/7 AI growth team. Lead scraping, personalized cold emails, multi-platform social scheduling, smart follow-ups. Replaces 5 tools. Saves 4 hours daily." />
      </Helmet>

      {/* HERO */}
      <section className="aut-hero">
        <div className="aut-hero-bg"></div>
        <div className="aut-hero-orb-1"></div>
        <div className="aut-hero-orb-2"></div>

        <div className="container aut-hero-content">
          <div className="aut-hero-badge">
            <span className="aut-pulse-dot"></span>
            <span>Launching mid-May 2026</span>
            <span className="aut-badge-divider">·</span>
            <strong>{waitlistCount} founders waitlisted</strong>
          </div>

          <h1 className="aut-hero-title">
            Your 24/7 AI<br />
            <span className="aut-grad">Growth Team</span>
          </h1>

          <p className="aut-hero-sub">
            Lead scraping. Personalized cold emails. Social scheduling. Smart follow-ups.
            <br />
            <strong>One platform. Built by Shape-360. Replaces 5 tools.</strong>
          </p>

          <div className="aut-hero-stats">
            <div><strong>4 hrs</strong><span>Saved daily</span></div>
            <div><strong>5</strong><span>Tools replaced</span></div>
            <div><strong>30 sec</strong><span>To launch a campaign</span></div>
            <div><strong>$200+</strong><span>Saved monthly</span></div>
          </div>

          <div className="aut-hero-actions">
            <button className="thm-btn aut-cta-primary" onClick={scrollToWaitlist}>
              Get Early Access <span>&#8594;</span>
            </button>
            <a href="#how" className="aut-cta-secondary">
              See how it works
            </a>
          </div>

          <div className="aut-hero-trust">
            <span className="aut-trust-dots">
              <span></span><span></span><span></span><span></span><span></span>
            </span>
            <span>First 50 founders get <strong>lifetime access for $99</strong></span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="container aut-hero-visual">
          <div className="aut-hero-mockup">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80&auto=format&fit=crop"
              alt="Tech team using AutoFlow to automate growth"
              loading="eager"
            />
            <div className="aut-hero-mockup-glow"></div>
            <div className="aut-hero-floater aut-floater-1">
              <div className="aut-floater-dot"></div>
              <span>Live · 247 leads scraped</span>
            </div>
            <div className="aut-hero-floater aut-floater-2">
              <div className="aut-floater-icon">{icons.send}</div>
              <span>Sending 152 personalized emails…</span>
            </div>
            <div className="aut-hero-floater aut-floater-3">
              <div className="aut-floater-icon">{icons.check}</div>
              <span>Posted to 4 platforms</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="aut-problem">
        <div className="container">
          <div className="aut-problem-grid">
            <div className="aut-problem-text">
              <span className="aut-section-tag">The Problem</span>
              <h2>You're losing <span className="aut-grad">4 hours a day</span><br />to tasks AI can do in 30 seconds.</h2>
              <p>Every founder, freelancer, and agency owner knows the drill. The same boring tasks. Every. Single. Day.</p>

              <div className="aut-problem-image">
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&q=80&auto=format&fit=crop"
                  alt="Founder buried in repetitive work"
                  loading="lazy"
                />
                <div className="aut-problem-image-overlay">
                  <strong>4 hrs</strong>
                  <span>wasted daily by every founder</span>
                </div>
              </div>
            </div>

            <ul className="aut-pains">
              <li><span className="aut-x-icon">{icons.x}</span> Scraping leads manually from LinkedIn for 2 hours</li>
              <li><span className="aut-x-icon">{icons.x}</span> Writing the same cold email 50 times</li>
              <li><span className="aut-x-icon">{icons.x}</span> Scheduling Instagram & LinkedIn posts one by one</li>
              <li><span className="aut-x-icon">{icons.x}</span> Following up with prospects who ghosted</li>
              <li><span className="aut-x-icon">{icons.x}</span> Tracking who opened, clicked, replied — across 5 tools</li>
              <li><span className="aut-x-icon">{icons.x}</span> Paying $200+/mo for tools that barely talk to each other</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="aut-how" id="how">
        <div className="container">
          <div className="aut-section-header">
            <span className="aut-section-tag">How It Works</span>
            <h2>Three steps. <span className="aut-grad">Sixty seconds.</span></h2>
            <p>From idea to launched campaign before your coffee gets cold.</p>
          </div>

          <div className="aut-steps-grid">
            {steps.map((s, i) => (
              <div className="aut-step" key={i}>
                <span className="aut-step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="aut-how-showcase">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=80&auto=format&fit=crop"
              alt="IT team discussing growth dashboards and analytics"
              loading="lazy"
            />
            <div className="aut-how-showcase-overlay">
              <div>
                <span className="aut-howshow-label">Average campaign launch time</span>
                <strong className="aut-howshow-value">⏱ 47 seconds</strong>
              </div>
              <div>
                <span className="aut-howshow-label">Active automations running now</span>
                <strong className="aut-howshow-value">🔥 1,284</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="aut-features">
        <div className="container">
          <div className="aut-section-header">
            <span className="aut-section-tag">What's Inside</span>
            <h2>Six tools. <span className="aut-grad">One subscription.</span></h2>
            <p>Everything you need to find, message, and convert leads — built into one AI-powered platform.</p>
          </div>

          <div className="aut-features-grid">
            {features.map((f, i) => (
              <div className="aut-feature" key={i}>
                <div className="aut-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="aut-feature-tag">{f.tag}</span>
              </div>
            ))}
          </div>

          <div className="aut-features-cta">
            <p>All features. <strong>One subscription.</strong> No setup fees.</p>
            <button className="aut-cta-secondary" onClick={scrollToWaitlist}>
              Reserve your spot {icons.zap}
            </button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="aut-pricing">
        <div className="container">
          <div className="aut-section-header">
            <span className="aut-section-tag">Pricing</span>
            <h2>Built for <span className="aut-grad">solo founders.</span><br />Priced for them too.</h2>
            <p>No "contact sales." No annual lock-ins. Cancel anytime.</p>
          </div>

          <div className="aut-pricing-grid">
            {pricing.map((p, i) => (
              <div className={`aut-price ${p.popular ? "popular" : ""} ${p.badge ? "limited" : ""}`} key={i}>
                {p.popular && <div className="aut-price-ribbon">Most Popular</div>}
                {p.badge && <div className="aut-price-badge">{p.badge}</div>}

                <h3>{p.name}</h3>
                <div className="aut-price-cost">
                  <strong>{p.price}</strong>
                  <span>{p.period}</span>
                </div>
                <p className="aut-price-desc">{p.desc}</p>

                <ul className="aut-price-features">
                  {p.features.map((f, j) => (
                    <li key={j}><span>✓</span> {f}</li>
                  ))}
                </ul>

                <button className="aut-price-cta" onClick={scrollToWaitlist}>
                  {p.cta} <span>&#8594;</span>
                </button>
              </div>
            ))}
          </div>

          <p className="aut-pricing-note">
            🇮🇳 Indian customers: Razorpay (UPI/cards/INR) · 🌍 International: Stripe (USD/AED/GBP/EUR) · All prices in USD
          </p>
        </div>
      </section>

      {/* WAITLIST */}
      <section className="aut-waitlist" ref={formRef}>
        <div className="container">
          <div className="aut-waitlist-card">
            <div className="aut-waitlist-glow"></div>

            <div className="aut-waitlist-grid">
              {/* LEFT — Visual */}
              <div className="aut-waitlist-visual">
                <img
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&q=80&auto=format&fit=crop"
                  alt="Founders building with AI"
                  loading="lazy"
                />
                <div className="aut-waitlist-visual-overlay">
                  <div className="aut-waitlist-counter">
                    <span className="aut-counter-pulse"></span>
                    <strong>{waitlistCount}</strong>
                    <span>founders already on the list</span>
                  </div>

                  <div className="aut-waitlist-perks">
                    <div className="aut-perk-row">
                      <span className="aut-perk-check">{icons.check}</span>
                      <span>48-hour early access</span>
                    </div>
                    <div className="aut-perk-row">
                      <span className="aut-perk-check">{icons.check}</span>
                      <span>Lifetime price lock</span>
                    </div>
                    <div className="aut-perk-row">
                      <span className="aut-perk-check">{icons.check}</span>
                      <span>Founder Q&A invite</span>
                    </div>
                    <div className="aut-perk-row">
                      <span className="aut-perk-check">{icons.check}</span>
                      <span>Zero spam, ever</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT — Form */}
              <div className="aut-waitlist-form-wrap">
                {!submitted ? (
                  <>
                    <span className="aut-section-tag">Get Early Access</span>
                    <h2>Lock in your <span className="aut-grad">lifetime spot.</span></h2>
                    <p className="aut-waitlist-sub">
                      Pay zero now. Get the link 48 hours before public launch. First 50 founders get $99 lifetime — then it's gone.
                    </p>

                    <form onSubmit={handleSubmit} className="aut-waitlist-form">
                      <div className="aut-form-field">
                        <label>Your Name</label>
                        <input
                          type="text"
                          placeholder="Ahmed Al Mansoori"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="aut-form-field">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="thm-btn aut-form-submit">
                        Lock My Spot <span>&#8594;</span>
                      </button>
                      <p className="aut-form-microcopy">
                        🔒 We never share your email. Unsubscribe anytime.
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="aut-waitlist-success">
                    <div className="aut-success-icon">{icons.check}</div>
                    <h2>You're in.</h2>
                    <p>You're <strong>#{waitlistCount}</strong> on the waitlist. We'll DM you the launch link 48 hours before everyone else.</p>
                    <a
                      href="https://wa.me/?text=Just%20joined%20the%20Shape-360%20AutoFlow%20waitlist%20%E2%80%94%20AI%20automation%20for%20agencies%20and%20founders.%20Join%20me%3A%20https%3A%2F%2Fshape-360.com%2Fautomate"
                      target="_blank"
                      rel="noreferrer"
                      className="aut-success-share-btn"
                    >
                      Share with a friend {icons.send}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="aut-faq">
        <div className="container">
          <div className="aut-section-header">
            <span className="aut-section-tag">FAQ</span>
            <h2>Honest <span className="aut-grad">answers.</span></h2>
          </div>

          <div className="aut-faq-list">
            {faqs.map((f, i) => (
              <div className={`aut-faq-item ${openFAQ === i ? "open" : ""}`} key={i}>
                <button className="aut-faq-q" onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)}>
                  <span>{f.q}</span>
                  <span className="aut-faq-icon">{openFAQ === i ? "−" : "+"}</span>
                </button>
                <div className="aut-faq-a">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="aut-final">
        <div className="container">
          <div className="aut-final-card">
            <h2>Stop doing what AI can do.<br /><span className="aut-grad">Start doing what only you can.</span></h2>
            <p>Free up 4 hours a day. Replace 5 tools. Reach more leads. Grow faster.</p>
            <div className="aut-final-actions">
              <button className="thm-btn aut-cta-primary" onClick={scrollToWaitlist}>
                Join the Waitlist <span>&#8594;</span>
              </button>
              <Link to="/contact" className="aut-cta-secondary">Talk to founder</Link>
            </div>
            <p className="aut-final-note">
              First 50 founders → <strong>$99 lifetime access</strong>. After that, it's $19-49/mo. No catch.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Automate;
