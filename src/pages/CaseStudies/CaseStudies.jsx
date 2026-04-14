import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import "./CaseStudies.css";

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    id: "kvsacademy",
    title: "KVS Academy",
    category: "Web Development",
    link: "https://www.kvsacademy.org",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    desc: "Full-featured educational platform with course listings, student resources, and responsive design for a leading coaching academy.",
    challenge: "KVS Academy needed a professional, information-rich website to showcase their courses, faculty, and results — while being easy to navigate for students and parents.",
    solution: "We designed a clean, structured website with intuitive navigation, course detail pages, faculty profiles, result showcases, and a mobile-first responsive layout optimized for fast loading.",
    results: [
      { metric: "3x", label: "Student Inquiries" },
      { metric: "1.8s", label: "Load Time" },
      { metric: "70%", label: "Mobile Traffic" },
      { metric: "45%", label: "Bounce Rate Drop" },
    ],
    tech: ["React", "Responsive Design", "SEO", "Performance Optimization"],
    testimonial: {
      text: "Shape-360 understood our vision and delivered a website that truly represents our academy's quality and values.",
      name: "KVS Academy Team",
      role: "Management, KVS Academy",
    },
  },
  {
    id: "velourajewels",
    title: "Veloura Jewels",
    category: "E-Commerce Website",
    link: "https://velourajewels.in",
    img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80",
    desc: "Premium e-commerce store for handcrafted sterling silver and moissanite jewelry with elegant UI and secure checkout.",
    challenge: "Veloura Jewels needed a high-end e-commerce experience that reflected their premium brand — BIS hallmarked 925 sterling silver, lab-grown gemstones, and 18K gold-plated pieces — while driving conversions.",
    solution: "We built a visually stunning online store with elegant product photography layouts, collection-based navigation, gift set features, secure payment integration, and a mobile-optimized shopping experience.",
    results: [
      { metric: "55%", label: "Sales Increase" },
      { metric: "4.9/5", label: "Customer Rating" },
      { metric: "40%", label: "Repeat Buyers" },
      { metric: "2.2s", label: "Load Time" },
    ],
    tech: ["E-Commerce", "Custom UI/UX", "Payment Gateway", "Mobile-First"],
    testimonial: {
      text: "The store captures our brand's elegance perfectly. Our customers love the shopping experience and we've seen a significant boost in online sales.",
      name: "Veloura Team",
      role: "Founders, Veloura Jewels",
    },
  },
  {
    id: "kedarshakti",
    title: "Kedar Shakti",
    category: "Shopify Store",
    link: "https://kedarshakti.com",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    desc: "Spiritual e-commerce brand with Shopify store for premium incense, crystals, and pooja essentials — serving customers and corporate bulk orders.",
    challenge: "Kedar Shakti needed an e-commerce platform that could showcase their diverse spiritual product range — fragrances, healing crystals, puja samagri, and candles — with a culturally authentic brand experience.",
    solution: "We developed a Shopify store with rich product categorization, combo pack bundles, corporate bulk ordering capability, UPI & card payments, and branding that honors Hindu spiritual traditions with earthy, premium aesthetics.",
    results: [
      { metric: "3x", label: "Online Orders" },
      { metric: "85%", label: "Mobile Conversion" },
      { metric: "₹600+", label: "Avg Order Value" },
      { metric: "200+", label: "Corporate Orders" },
    ],
    tech: ["Shopify", "Custom Theme", "UPI Integration", "Product Bundling"],
    testimonial: {
      text: "Shape-360 understood our spiritual brand deeply. The store not only looks beautiful but drives real sales — our corporate bulk orders have been a game changer.",
      name: "Kedar Shakti Team",
      role: "Founders, Kedar Shakti",
    },
  },
  {
    id: "zeqon",
    title: "Zeqon",
    category: "SaaS Website",
    link: "https://zeqon.co",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    desc: "Modern, high-performance SaaS company website with sleek design, feature showcases, and conversion-optimized lead generation.",
    challenge: "Zeqon needed a modern, professional website that would position them as a credible SaaS player — with clear feature communication, trust signals, and a smooth lead capture funnel.",
    solution: "We crafted a sleek, dark-themed SaaS website with animated feature sections, interactive demos, testimonial carousels, pricing tables, and integrated CRM lead capture with analytics tracking.",
    results: [
      { metric: "5x", label: "Lead Generation" },
      { metric: "68%", label: "Lower Bounce Rate" },
      { metric: "4.2s", label: "Avg Session Time" },
      { metric: "180%", label: "Traffic Growth" },
    ],
    tech: ["React", "GSAP Animations", "CRM Integration", "Analytics"],
    testimonial: {
      text: "The website perfectly communicates what Zeqon does. We've seen a massive jump in qualified leads since launch.",
      name: "Zeqon Team",
      role: "Founders, Zeqon",
    },
  },
  {
    id: "stayliadxb",
    title: "Staylia DXB",
    category: "Web Development",
    link: "https://stayliadxb.com",
    img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    desc: "Dubai-based short-term rental management platform with property listings, investor dashboards, and multi-platform booking integration.",
    challenge: "Staylia DXB needed a professional website to attract Dubai property investors — showcasing their 6-step rental management system, occupancy rates, and investor-grade performance tracking across Airbnb, Booking.com, and VRBO.",
    solution: "We built a data-driven, premium website with dynamic property showcases, investor dashboard previews, a 6-step process breakdown, testimonial sections, and lead capture optimized for high-net-worth property investors.",
    results: [
      { metric: "85%+", label: "Occupancy Rate" },
      { metric: "35%", label: "Revenue Increase" },
      { metric: "4.9", label: "Guest Rating" },
      { metric: "90", label: "Days to Results" },
    ],
    tech: ["Custom Web App", "Dashboard UI", "Multi-Platform API", "Lead Gen"],
    testimonial: {
      text: "Shape-360 built a website that speaks directly to investors. The quality and professionalism have helped us onboard premium properties in Dubai Marina and Palm Jumeirah.",
      name: "Staylia Team",
      role: "Founders, Staylia DXB",
    },
  },
  {
    id: "jaldirideconnect",
    title: "JaldiRide Connect",
    category: "Web App",
    link: "https://www.jaldirideconnect.com",
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    desc: "Smart local transport solutions platform connecting riders with autos, cars, and buses for seamless city commuting.",
    challenge: "JaldiRide Connect needed a clean, fast platform to present their multi-modal transport service — autos, cars, and buses — with a focus on user trust, ease of use, and local market penetration.",
    solution: "We developed a modern web application with vehicle category showcases, route planning UI, driver onboarding flows, and a responsive design optimized for users booking rides on mobile devices in tier-2 and tier-3 cities.",
    results: [
      { metric: "10K+", label: "App Visits/Month" },
      { metric: "3", label: "Vehicle Categories" },
      { metric: "50+", label: "Cities Targeted" },
      { metric: "2x", label: "Driver Signups" },
    ],
    tech: ["React", "Node.js", "Maps API", "Responsive Design"],
    testimonial: {
      text: "Shape-360 brought our transport vision to life. The platform is fast, clean, and exactly what our users needed.",
      name: "JaldiRide Team",
      role: "Founders, JaldiRide Connect",
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

                  <div className="cs-card-actions">
                    {cs.link && (
                      <a href={cs.link} target="_blank" rel="noreferrer" className="cs-card-live">
                        View Live Site <span>&#8594;</span>
                      </a>
                    )}
                    <Link to="/contact" className="cs-card-cta">
                      Start Similar Project <span>&#8594;</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LANDING PAGES */}
      <section className="cs-landing">
        <div className="container">
          <div className="text-center">
            <div className="sec-tagline" style={{ justifyContent: "center" }}>
              <div className="line"></div>
              <p>Landing Pages</p>
              <div className="line"></div>
            </div>
            <h2 className="sec-title">Single-Page <span>Builds</span></h2>
            <p className="cs-landing-desc">
              High-converting landing pages designed to tell a story, capture leads, and drive action — fast.
            </p>
          </div>
          <div className="cs-landing-grid">
            {[
              { title: "MindMint Media", category: "Digital Marketing Agency", link: "https://mindmintmedia.in", img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&q=80", desc: "Bold agency landing page showcasing digital marketing services with strong lead capture and service breakdowns." },
              { title: "SkillOwl", category: "EdTech Platform", link: "https://skillowl.in", img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80", desc: "Clean, modern landing page for an online learning platform with course highlights, testimonials, and signup flow." },
              { title: "FolkLane", category: "Creative Agency", link: "https://www.folklane.in", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80", desc: "Full-service creative agency page with tiered pricing, portfolio showcase, and brand identity — based in Prayagraj." },
              { title: "Pawan Hardu", category: "Video Editor Portfolio", link: "https://pawanhardu.org", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80", desc: "Cinematic portfolio for a video editor with 70M+ views — featuring showreel, services, and client testimonials." },
            ].map((lp, i) => (
              <a href={lp.link} target="_blank" rel="noreferrer" className="cs-landing-card" key={i}>
                <div className="cs-landing-card-img">
                  <img src={lp.img} alt={lp.title} loading="lazy" />
                  <div className="cs-landing-badge">Landing Page</div>
                </div>
                <div className="cs-landing-card-body">
                  <span className="cs-card-category">{lp.category}</span>
                  <h3>{lp.title}</h3>
                  <p>{lp.desc}</p>
                  <span className="cs-card-cta">View Live <span>&#8594;</span></span>
                </div>
              </a>
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
