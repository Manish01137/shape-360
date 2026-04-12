import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-hero-content > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" }
      );
      gsap.fromTo(".svc-card",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".svc-grid", start: "top 75%" }
        }
      );
      gsap.fromTo(".extra-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".svc-extra-grid", start: "top 75%" }
        }
      );
      gsap.fromTo(".svc-process-step",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".svc-process-grid", start: "top 75%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const coreServices = [
    {
      num: "01", title: "Website Development", subtitle: "Custom Coding",
      desc: "Fast, secure, and scalable websites built from scratch using modern tech stack.",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
      points: ["Custom front-end & back-end development", "Performance-optimized architecture", "SEO-friendly structure", "Mobile-first responsive design"],
    },
    {
      num: "02", title: "Shopify Store Development", subtitle: "E-Commerce",
      desc: "High-converting e-commerce stores with complete setup and premium UI design.",
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
      points: ["Custom Shopify theme development", "Product catalog setup", "Payment & shipping configuration", "Apps integration & automation"],
    },
    {
      num: "03", title: "WordPress Development", subtitle: "CMS Solutions",
      desc: "Business websites with ongoing maintenance, security hardening, and optimization.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
      points: ["Custom WordPress themes", "Plugin development & integration", "Security hardening", "Performance optimization"],
    },
    {
      num: "04", title: "Meta Ads", subtitle: "Facebook & Instagram",
      desc: "Data-driven ad campaigns that actually convert audiences into paying customers.",
      img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
      points: ["Campaign strategy & planning", "Creative design & copywriting", "Audience targeting & retargeting", "A/B testing & optimization"],
    },
    {
      num: "05", title: "Google Ads Management", subtitle: "Search & Display",
      desc: "Search & performance campaigns focused on maximum ROI and qualified leads.",
      img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
      points: ["Keyword research & strategy", "Search & display campaigns", "Conversion tracking setup", "Bid management & optimization"],
    },
    {
      num: "06", title: "Account Management", subtitle: "Ongoing Support",
      desc: "Dedicated support to ensure consistent growth and continuous optimization.",
      img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
      points: ["Dedicated account manager", "Weekly performance reports", "Proactive optimization", "24/7 priority support"],
    },
  ];

  const extraServices = [
    { title: "Website Maintenance", desc: "Regular updates, patches, and performance monitoring to keep your site running perfectly." },
    { title: "Analytics Setup", desc: "Track what really matters with properly configured Google Analytics and data pipelines." },
    { title: "Conversion Optimization", desc: "Turn visitors into paying customers with systematic CRO testing and improvements." },
    { title: "Video Editing", desc: "High-quality video content for ads, social media, and website landing pages." },
    { title: "Graphic Design", desc: "Stunning brand visuals, social media creatives, and marketing collateral that capture attention." },
    { title: "Branding & Creatives", desc: "Complete brand identity from logo design to brand guidelines and visual language." },
  ];

  return (
    <div className="services-page">
      <Helmet>
        <title>Our Services | Shape-360</title>
        <meta name="description" content="Web development, Shopify stores, Meta Ads, Google Ads, and more — complete digital solutions from Shape-360." />
      </Helmet>

      {/* HERO */}
      <section className="svc-hero">
        <div className="svc-hero-bg"></div>
        <div className="container svc-hero-content">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>Our Services</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">
            Everything You Need <br />
            <span>To Grow</span> Online
          </h1>
          <p className="svc-hero-desc">
            From websites to ads to ongoing support — we provide complete digital
            solutions that drive real business results.
          </p>
          <div className="svc-hero-actions">
            <Link to="/contact" className="thm-btn">
              Get Free Consultation <span>&#8594;</span>
            </Link>
            <a href="tel:+918209978891" className="svc-hero-phone">
              Or call: <strong>+91 8209978891</strong>
            </a>
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="svc-core">
        <div className="container">
          <div className="svc-grid">
            {coreServices.map((svc, i) => (
              <div className="svc-card" key={i}>
                <div className="svc-card-img">
                  <img src={svc.img} alt={svc.title} />
                </div>
                <div className="svc-card-body">
                  <div className="svc-card-header">
                    <span className="svc-card-num">{svc.num}</span>
                    <span className="svc-card-sub">{svc.subtitle}</span>
                  </div>
                  <h3>{svc.title}</h3>
                  <p className="svc-card-desc">{svc.desc}</p>
                  <ul>
                    {svc.points.map((point, j) => (
                      <li key={j}>
                        <span className="check">&#10003;</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="svc-card-link">
                    Get Started <span>&#8594;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="svc-process">
        <div className="container">
          <div className="text-center">
            <div className="sec-tagline" style={{ justifyContent: "center" }}>
              <div className="line"></div>
              <p>How It Works</p>
              <div className="line"></div>
            </div>
            <h2 className="sec-title">Simple. Fast. <span>Effective.</span></h2>
            <p className="svc-process-desc">Getting started with Shape-360 is easy. Here's what to expect.</p>
          </div>
          <div className="svc-process-grid">
            {[
              { num: "01", title: "Tell Us Your Goals", desc: "Share your business objectives and we'll craft a tailored strategy just for you." },
              { num: "02", title: "We Build & Execute", desc: "Our expert team gets to work building, designing, and launching your project." },
              { num: "03", title: "You See Results", desc: "Watch your business grow with clear metrics, weekly reports, and continuous optimization." },
            ].map((step, i) => (
              <div className="svc-process-step" key={i}>
                <span className="svc-process-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className="svc-process-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADDITIONAL SERVICES */}
      <section className="svc-extra">
        <div className="container">
          <div className="text-center">
            <div className="sec-tagline" style={{ justifyContent: "center" }}>
              <div className="line"></div>
              <p>More Services</p>
              <div className="line"></div>
            </div>
            <h2 className="sec-title">Additional Digital <span>Services</span></h2>
            <p className="svc-extra-desc">Complement your digital strategy with our extended capabilities</p>
          </div>

          <div className="svc-extra-grid">
            {extraServices.map((item, i) => (
              <Link to="/contact" className="extra-card" key={i}>
                <div className="extra-card-line"></div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <span className="extra-card-cta">Inquire <span>&#8594;</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="svc-cta">
        <div className="container text-center">
          <div className="sec-tagline" style={{ justifyContent: "center" }}>
            <div className="line"></div>
            <p>Let's Talk</p>
            <div className="line"></div>
          </div>
          <h2 className="sec-title">Ready to Get <span>Started</span>?</h2>
          <p className="svc-cta-desc">
            Let's discuss your project and find the perfect solution for your business.
          </p>
          <div className="svc-cta-actions">
            <Link to="/contact" className="thm-btn">
              Get Free Consultation <span>&#8594;</span>
            </Link>
            <a href="mailto:shape360official@gmail.com" className="svc-cta-email">
              shape360official@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
