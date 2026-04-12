import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import "./CaseStudies.css";

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    id: "urbankart",
    title: "UrbanKart E-Commerce",
    category: "Shopify Development",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    desc: "Complete Shopify store with custom theme, payment integration and 40% conversion boost.",
    challenge: "UrbanKart needed a high-converting e-commerce platform that could handle their growing product catalog while maintaining lightning-fast load times.",
    solution: "We built a custom Shopify theme from scratch with optimized product pages, streamlined checkout flow, and integrated analytics tracking for conversion optimization.",
    results: [
      { metric: "40%", label: "Conversion Increase" },
      { metric: "2.1s", label: "Load Time" },
      { metric: "3x", label: "Revenue Growth" },
      { metric: "60%", label: "Bounce Rate Drop" },
    ],
    tech: ["Shopify", "Liquid", "JavaScript", "Custom Theme"],
    testimonial: {
      text: "Shape-360 transformed our online store. The results were visible within the first week of launch.",
      name: "Rohit Sharma",
      role: "Founder, UrbanKart",
    },
  },
  {
    id: "finedge",
    title: "FinEdge Solutions",
    category: "Web Development",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    desc: "Custom financial dashboard with real-time data visualization and secure user portal.",
    challenge: "FinEdge needed a secure, real-time financial dashboard that could process and display complex data sets for their enterprise clients.",
    solution: "We developed a custom web application with real-time data visualization, role-based access control, and encrypted data transmission.",
    results: [
      { metric: "99.9%", label: "Uptime" },
      { metric: "500ms", label: "Data Refresh" },
      { metric: "200+", label: "Active Users" },
      { metric: "50%", label: "Time Saved" },
    ],
    tech: ["React", "Node.js", "WebSocket", "PostgreSQL"],
    testimonial: {
      text: "The dashboard exceeded our expectations. Our clients love the real-time insights.",
      name: "Aman Verma",
      role: "Co-Founder, FinEdge",
    },
  },
  {
    id: "stylenest",
    title: "StyleNest Fashion",
    category: "Meta Ads Campaign",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    desc: "Instagram & Facebook ad campaign that drove 3x ROAS in the first month.",
    challenge: "StyleNest had a beautiful product line but struggled to reach their target audience cost-effectively through social media advertising.",
    solution: "We crafted a multi-layered Meta Ads strategy with custom audiences, lookalike targeting, and dynamic product ads with A/B tested creatives.",
    results: [
      { metric: "3x", label: "ROAS" },
      { metric: "65%", label: "Lower CPA" },
      { metric: "2M+", label: "Impressions" },
      { metric: "12K", label: "New Customers" },
    ],
    tech: ["Meta Ads", "Creative Design", "A/B Testing", "Analytics"],
    testimonial: {
      text: "Their conversion-focused approach significantly improved our ad performance. Results were visible within weeks.",
      name: "Neha Gupta",
      role: "Marketing Head, StyleNest",
    },
  },
  {
    id: "bloomwell",
    title: "BloomWell Wellness",
    category: "WordPress + SEO",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    desc: "Complete WordPress website with SEO optimization, ranking page 1 in 90 days.",
    challenge: "BloomWell needed a professional website that would rank on Google's first page for competitive wellness keywords in their region.",
    solution: "We built a fast, SEO-optimized WordPress site with schema markup, optimized content strategy, and technical SEO foundations.",
    results: [
      { metric: "#1", label: "Google Ranking" },
      { metric: "90", label: "Days to Page 1" },
      { metric: "400%", label: "Organic Traffic" },
      { metric: "25%", label: "More Bookings" },
    ],
    tech: ["WordPress", "SEO", "Schema Markup", "Content Strategy"],
    testimonial: {
      text: "We wanted a digital partner, not just an agency. Shape-360 delivered beyond expectations.",
      name: "Pooja Mehta",
      role: "Owner, BloomWell Wellness",
    },
  },
  {
    id: "techpulse",
    title: "TechPulse SaaS",
    category: "Google Ads",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    desc: "Performance max campaign generating 200+ qualified leads per month at $12 CPA.",
    challenge: "TechPulse needed to scale their lead generation while maintaining quality and keeping customer acquisition costs manageable.",
    solution: "We implemented a comprehensive Google Ads strategy combining Search, Display, and Performance Max campaigns with advanced conversion tracking.",
    results: [
      { metric: "200+", label: "Leads/Month" },
      { metric: "$12", label: "CPA" },
      { metric: "5x", label: "Lead Quality" },
      { metric: "150%", label: "ROI Increase" },
    ],
    tech: ["Google Ads", "Analytics", "Tag Manager", "Conversion Tracking"],
    testimonial: {
      text: "The lead quality and volume exceeded our targets. Shape-360 truly understands performance marketing.",
      name: "Vikram Patel",
      role: "CEO, TechPulse",
    },
  },
  {
    id: "greenleaf",
    title: "GreenLeaf Organics",
    category: "Branding + Website",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    desc: "Full brand identity and e-commerce website with 25% increase in online orders.",
    challenge: "GreenLeaf needed a complete brand overhaul and an online presence that would communicate their commitment to organic, sustainable products.",
    solution: "We created a cohesive brand identity from logo to packaging, then built a stunning e-commerce website that tells their sustainability story.",
    results: [
      { metric: "25%", label: "Order Increase" },
      { metric: "4.8/5", label: "User Rating" },
      { metric: "35%", label: "Repeat Customers" },
      { metric: "2x", label: "Brand Awareness" },
    ],
    tech: ["Brand Identity", "Shopify", "UI/UX Design", "Photography"],
    testimonial: {
      text: "Shape-360 captured our brand essence perfectly. The website truly represents who we are.",
      name: "Ananya Krishnan",
      role: "Founder, GreenLeaf Organics",
    },
  },
];

const CaseStudies = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cs-hero-content > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" }
      );
      gsap.fromTo(
        ".cs-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".cs-grid", start: "top 80%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="case-studies-page">
      <Helmet>
        <title>Case Studies | Shape-360 Portfolio</title>
        <meta name="description" content="Explore Shape-360's portfolio of successful digital projects — from e-commerce stores to ad campaigns with real results." />
      </Helmet>

      {/* HERO */}
      <section className="cs-hero">
        <div className="cs-hero-bg"></div>
        <div className="container cs-hero-content">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>Our Work</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">
            Real Projects. <br />
            Real <span>Results.</span>
          </h1>
          <p className="cs-hero-desc">
            Every project tells a story of growth. Here are some of the brands
            we've helped transform with our digital solutions.
          </p>
        </div>
      </section>

      {/* CASE STUDIES GRID */}
      <section className="cs-list">
        <div className="container">
          <div className="cs-grid">
            {caseStudies.map((cs, i) => (
              <div className="cs-card" key={cs.id}>
                <div className="cs-card-img">
                  <img src={cs.img} alt={cs.title} />
                  <div className="cs-card-overlay">
                    <div className="cs-card-results">
                      {cs.results.slice(0, 2).map((r, j) => (
                        <div key={j} className="cs-mini-result">
                          <strong>{r.metric}</strong>
                          <span>{r.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="cs-card-body">
                  <span className="cs-card-category">{cs.category}</span>
                  <h3>{cs.title}</h3>
                  <p className="cs-card-desc">{cs.desc}</p>

                  <div className="cs-card-detail">
                    <div className="cs-detail-section">
                      <h4>The Challenge</h4>
                      <p>{cs.challenge}</p>
                    </div>
                    <div className="cs-detail-section">
                      <h4>Our Solution</h4>
                      <p>{cs.solution}</p>
                    </div>

                    <div className="cs-results-grid">
                      {cs.results.map((r, j) => (
                        <div className="cs-result-item" key={j}>
                          <strong>{r.metric}</strong>
                          <span>{r.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="cs-tech-tags">
                      {cs.tech.map((t, j) => (
                        <span key={j} className="cs-tech-tag">{t}</span>
                      ))}
                    </div>

                    {cs.testimonial && (
                      <div className="cs-testimonial">
                        <p>"{cs.testimonial.text}"</p>
                        <div className="cs-testimonial-author">
                          <strong>{cs.testimonial.name}</strong>
                          <span>{cs.testimonial.role}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link to="/contact" className="cs-card-cta">
                    Start Similar Project <span>&#8594;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cs-cta">
        <div className="container text-center">
          <div className="sec-tagline" style={{ justifyContent: "center" }}>
            <div className="line"></div>
            <p>Your Turn</p>
            <div className="line"></div>
          </div>
          <h2 className="sec-title">
            Ready to Be Our <br />Next <span>Success Story</span>?
          </h2>
          <p className="cs-cta-desc">
            Let's discuss your project and create something extraordinary together.
          </p>
          <Link to="/contact" className="thm-btn">
            Start Your Project <span>&#8594;</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
