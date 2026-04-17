import { useSearchParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
import "./DynamicLanding.css";

const industryData = {
  jewelry: {
    hero: "Websites That Make Jewelry",
    heroAccent: "Shine Online",
    tagline: "Premium e-commerce stores for jewelry brands. BIS hallmarked trust, luxury UI, sales that convert.",
    img: "https://images.unsplash.com/photo-1515562141589-67f0d967b39b?w=800&q=80",
    problem: "Your handcrafted pieces deserve more than a template store",
    problemDesc: "Template Shopify stores kill luxury brand perception. Customers scroll past. Conversion rates crash. We fix that — with bespoke e-commerce designs built specifically for jewelry brands.",
    results: [
      { metric: "55%", label: "Sales Increase" },
      { metric: "4.9/5", label: "Customer Rating" },
      { metric: "40%", label: "Repeat Buyers" },
    ],
    caseStudy: {
      name: "Veloura Jewels",
      link: "https://velourajewels.in",
      desc: "Premium sterling silver e-commerce store with 55% sales increase in Q1.",
    },
    services: [
      "Custom Shopify store development",
      "Luxury product photography layouts",
      "Gift packaging & personalization features",
      "Secure payment + trust badges",
      "Instagram shopping integration",
    ],
    cta: "Build Your Jewelry Store",
  },
  ecommerce: {
    hero: "E-Commerce Stores Built",
    heroAccent: "to Sell",
    tagline: "High-converting online stores with custom design, fast checkouts, and conversion optimization baked in.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    problem: "Average stores lose customers at checkout",
    problemDesc: "73% of online shoppers abandon carts because of bad UX, slow load times, or complicated checkouts. We build stores that don't just look good — they close sales.",
    results: [
      { metric: "40%", label: "Avg Conversion Lift" },
      { metric: "2.1s", label: "Page Load Time" },
      { metric: "3x", label: "Revenue Growth" },
    ],
    caseStudy: {
      name: "Kedar Shakti",
      link: "https://kedarshakti.com",
      desc: "Shopify e-commerce brand with 3x order volume through optimized UX.",
    },
    services: [
      "Custom Shopify / WooCommerce builds",
      "Conversion rate optimization (CRO)",
      "Payment gateway integration",
      "Inventory & order management setup",
      "Abandoned cart recovery automation",
    ],
    cta: "Launch Your Store",
  },
  saas: {
    hero: "SaaS Websites That",
    heroAccent: "Convert Visitors",
    tagline: "Modern, conversion-focused SaaS websites with clear value props, pricing clarity, and lead capture done right.",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    problem: "Most SaaS sites are feature dumps",
    problemDesc: "Visitors don't buy features — they buy outcomes. We build SaaS websites that lead with results, demo your product in action, and turn casual browsers into qualified signups.",
    results: [
      { metric: "5x", label: "Lead Generation" },
      { metric: "68%", label: "Lower Bounce Rate" },
      { metric: "180%", label: "Traffic Growth" },
    ],
    caseStudy: {
      name: "Zeqon",
      link: "https://zeqon.co",
      desc: "SaaS website overhaul generating 5x more qualified leads post-launch.",
    },
    services: [
      "Landing page design + A/B testing",
      "Pricing page optimization",
      "Demo booking integrations",
      "Interactive product showcases",
      "CRM-integrated lead capture",
    ],
    cta: "Grow Your SaaS",
  },
  education: {
    hero: "EdTech Websites That",
    heroAccent: "Enroll Students",
    tagline: "Educational platforms that build trust with parents, convert students, and rank on Google for local searches.",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    problem: "Parents research before they enroll",
    problemDesc: "Your website is the deciding factor. If it's slow, outdated, or hard to navigate, they go to the competitor. We build EdTech platforms that convert researchers into applicants.",
    results: [
      { metric: "3x", label: "Student Inquiries" },
      { metric: "1.8s", label: "Load Time" },
      { metric: "45%", label: "Bounce Rate Drop" },
    ],
    caseStudy: {
      name: "KVS Academy",
      link: "https://www.kvsacademy.org",
      desc: "Education platform with 3x student inquiries and mobile-first design.",
    },
    services: [
      "Course catalog with filters",
      "Student inquiry forms + CRM",
      "Faculty & results showcase",
      "Local SEO for your city",
      "Parent-friendly mobile UX",
    ],
    cta: "Grow Your Academy",
  },
  realestate: {
    hero: "Real Estate Platforms",
    heroAccent: "That Sell",
    tagline: "Property listing websites, rental platforms, and investor portals designed to close high-ticket deals.",
    img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    problem: "Your properties deserve a premium presentation",
    problemDesc: "Generic listing sites hide your best properties behind poor design. We build premium real estate platforms that make investors stop scrolling and start inquiring.",
    results: [
      { metric: "85%+", label: "Occupancy Rate" },
      { metric: "35%", label: "Revenue Increase" },
      { metric: "4.9", label: "Guest Rating" },
    ],
    caseStudy: {
      name: "Staylia DXB",
      link: "https://stayliadxb.com",
      desc: "Dubai rental management platform achieving 85%+ occupancy.",
    },
    services: [
      "Property listing management",
      "Investor dashboards",
      "Multi-platform booking sync",
      "Virtual tour integration",
      "Lead capture optimized for HNIs",
    ],
    cta: "Build Your Platform",
  },
  default: {
    hero: "Digital Solutions That",
    heroAccent: "Actually Grow Your Business",
    tagline: "Custom websites, e-commerce stores, and performance marketing — built for businesses that want real results.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    problem: "Most agencies sell you a website. We build a growth engine.",
    problemDesc: "A website is just the start. We combine sharp design, fast development, and performance marketing to create digital assets that drive revenue — not just look pretty.",
    results: [
      { metric: "70+", label: "Projects Shipped" },
      { metric: "98%", label: "Client Retention" },
      { metric: "6", label: "Countries Served" },
    ],
    caseStudy: {
      name: "Our Portfolio",
      link: "/case-studies",
      desc: "Over 70+ successful projects across India, Dubai, and beyond.",
    },
    services: [
      "Custom website development",
      "E-commerce & Shopify stores",
      "Meta & Google Ads management",
      "SEO & content strategy",
      "Branding & design",
    ],
    cta: "Start Your Project",
  },
};

const sourceMessages = {
  google: "Found us on Google? Let's show you why.",
  linkedin: "Welcome from LinkedIn! Let's talk.",
  instagram: "Saw our work on Instagram? Here's what we can do for you.",
  referral: "Referred by a friend? Great choice.",
  cold: "Thanks for checking us out.",
};

const DynamicLanding = () => {
  const [searchParams] = useSearchParams();
  const industry = searchParams.get("industry") || "default";
  const source = searchParams.get("source");
  const name = searchParams.get("name");
  const data = industryData[industry] || industryData.default;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".dl-hero > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: "power2.out" }
      );
      gsap.fromTo(".dl-result",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)", delay: 0.4 }
      );
    });
    return () => ctx.revert();
  }, [industry]);

  return (
    <div className="dl-page">
      <Helmet>
        <title>{data.hero} {data.heroAccent} | Shape-360</title>
        <meta name="description" content={data.tagline} />
      </Helmet>

      {/* HERO */}
      <section className="dl-hero-section">
        <div className="dl-hero-bg"></div>
        <div className="container">
          {name && (
            <div className="dl-personalized">
              <span className="dl-live-dot"></span>
              Hey {name}! {source && sourceMessages[source] ? sourceMessages[source] : "Welcome."}
            </div>
          )}

          <div className="dl-hero">
            <div className="dl-hero-text">
              <div className="sec-tagline">
                <div className="line"></div>
                <p>Specialized for {industry === "default" ? "your business" : industry}</p>
              </div>
              <h1 className="dl-hero-title">
                {data.hero} <br /><span>{data.heroAccent}</span>
              </h1>
              <p className="dl-hero-tagline">{data.tagline}</p>
              <div className="dl-hero-cta">
                <Link to="/contact" className="thm-btn">{data.cta} <span>&#8594;</span></Link>
                <a href="tel:+918209978891" className="dl-phone">
                  Or call: <strong>+91 8209978891</strong>
                </a>
              </div>
            </div>
            <div className="dl-hero-img">
              <img src={data.img} alt={data.hero} loading="eager" />
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS STRIP */}
      <section className="dl-results-section">
        <div className="container">
          <div className="dl-results-grid">
            {data.results.map((r, i) => (
              <div key={i} className="dl-result">
                <strong>{r.metric}</strong>
                <span>{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="dl-problem-section">
        <div className="container">
          <div className="dl-problem-inner">
            <div className="sec-tagline">
              <div className="line"></div>
              <p>The Problem</p>
            </div>
            <h2 className="dl-problem-title">{data.problem}</h2>
            <p className="dl-problem-desc">{data.problemDesc}</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="dl-services-section">
        <div className="container">
          <div className="dl-services-wrap">
            <div className="dl-services-head">
              <div className="sec-tagline">
                <div className="line"></div>
                <p>What You Get</p>
              </div>
              <h2 className="sec-title">Built for <span>{industry === "default" ? "Growth" : industry}</span></h2>
            </div>
            <ul className="dl-services-list">
              {data.services.map((s, i) => (
                <li key={i}>
                  <span className="dl-check">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="dl-case-section">
        <div className="container">
          <div className="dl-case-card">
            <div className="sec-tagline">
              <div className="line"></div>
              <p>Proof It Works</p>
              <div className="line"></div>
            </div>
            <h2 className="sec-title">Real project. <span>Real results.</span></h2>
            <h3 className="dl-case-name">{data.caseStudy.name}</h3>
            <p className="dl-case-desc">{data.caseStudy.desc}</p>
            <a href={data.caseStudy.link} target="_blank" rel="noreferrer" className="dl-case-link">
              View Live Site <span>&#8594;</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dl-cta-section">
        <div className="container text-center">
          <h2 className="sec-title">Ready to be our <span>next case study?</span></h2>
          <p className="dl-cta-desc">
            Free consultation. No pressure. We'll tell you exactly how we'd approach your project.
          </p>
          <Link to="/contact" className="thm-btn">{data.cta} <span>&#8594;</span></Link>
        </div>
      </section>
    </div>
  );
};

export default DynamicLanding;
