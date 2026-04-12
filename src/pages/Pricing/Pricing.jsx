import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import "./Pricing.css";

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: "Starter",
    tagline: "Perfect for small businesses getting started online",
    price: "499",
    period: "starting from",
    features: [
      "5-Page Responsive Website",
      "Mobile-Optimized Design",
      "Basic SEO Setup",
      "Contact Form Integration",
      "Social Media Links",
      "1 Month Free Support",
      "SSL Certificate",
    ],
    popular: false,
  },
  {
    name: "Professional",
    tagline: "Ideal for growing businesses that need more power",
    price: "999",
    period: "starting from",
    features: [
      "10-Page Custom Website",
      "Advanced UI/UX Design",
      "Full SEO Optimization",
      "CMS Integration",
      "Analytics Dashboard Setup",
      "Speed Optimization",
      "3 Months Free Support",
      "Blog Setup",
      "WhatsApp Integration",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    tagline: "For ambitious brands ready to dominate their market",
    price: "2,499",
    period: "starting from",
    features: [
      "Unlimited Pages",
      "Custom Web Application",
      "E-Commerce Integration",
      "Advanced Analytics & Tracking",
      "Payment Gateway Setup",
      "API Integrations",
      "6 Months Free Support",
      "Priority Support Channel",
      "Performance Optimization",
      "Security Hardening",
    ],
    popular: false,
  },
];

const adPackages = [
  {
    name: "Meta Ads Starter",
    price: "349",
    period: "/month",
    features: [
      "Campaign Strategy & Setup",
      "Up to 3 Ad Sets",
      "Creative Design (4 Ads)",
      "Audience Research",
      "Weekly Reports",
      "Monthly Optimization",
    ],
  },
  {
    name: "Google Ads Starter",
    price: "449",
    period: "/month",
    features: [
      "Search Campaign Setup",
      "Keyword Research",
      "Ad Copy Writing",
      "Conversion Tracking",
      "Bi-Weekly Reports",
      "Bid Optimization",
    ],
  },
  {
    name: "Full Digital Marketing",
    price: "899",
    period: "/month",
    features: [
      "Meta + Google Ads",
      "Unlimited Ad Creatives",
      "Advanced Targeting",
      "A/B Testing",
      "Weekly Strategy Calls",
      "Dedicated Account Manager",
      "Detailed Monthly Reports",
    ],
  },
];

const Pricing = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-hero-content > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" }
      );
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".pricing-grid", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".ad-pricing-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".ad-pricing-grid", start: "top 80%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pricing-page">
      <Helmet>
        <title>Pricing & Packages | Shape-360</title>
        <meta name="description" content="Transparent pricing for Shape-360's web development, digital marketing, and design services. Choose the package that fits your goals." />
      </Helmet>

      {/* HERO */}
      <section className="pricing-hero">
        <div className="pricing-hero-bg"></div>
        <div className="container pricing-hero-content">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>Pricing</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">
            Simple, Transparent <br /><span>Pricing</span>
          </h1>
          <p className="pricing-hero-desc">
            No hidden fees, no surprises. Choose the package that fits
            your business goals and budget.
          </p>
        </div>
      </section>

      {/* WEB DEVELOPMENT PACKAGES */}
      <section className="pricing-web">
        <div className="container">
          <div className="text-center">
            <div className="sec-tagline" style={{ justifyContent: "center" }}>
              <div className="line"></div>
              <p>Web Development</p>
              <div className="line"></div>
            </div>
            <h2 className="sec-title">Website <span>Packages</span></h2>
            <p className="pricing-subtitle">
              Custom-built websites designed to convert visitors into customers
            </p>
          </div>

          <div className="pricing-grid">
            {packages.map((pkg, i) => (
              <div className={`pricing-card ${pkg.popular ? "popular" : ""}`} key={i}>
                {pkg.popular && <div className="pricing-badge">Most Popular</div>}
                <div className="pricing-card-header">
                  <h3>{pkg.name}</h3>
                  <p className="pricing-tagline">{pkg.tagline}</p>
                  <div className="pricing-price">
                    <span className="pricing-currency">$</span>
                    <span className="pricing-amount">{pkg.price}</span>
                  </div>
                  <span className="pricing-period">{pkg.period}</span>
                </div>
                <div className="pricing-card-body">
                  <ul>
                    {pkg.features.map((feat, j) => (
                      <li key={j}>
                        <span className="pricing-check">&#10003;</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pricing-card-footer">
                  <Link to="/contact" className={`thm-btn ${pkg.popular ? "" : "pricing-btn-outline"}`}>
                    Get Started <span>&#8594;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AD MANAGEMENT PACKAGES */}
      <section className="pricing-ads">
        <div className="container">
          <div className="text-center">
            <div className="sec-tagline" style={{ justifyContent: "center" }}>
              <div className="line"></div>
              <p>Digital Marketing</p>
              <div className="line"></div>
            </div>
            <h2 className="sec-title">Advertising <span>Packages</span></h2>
            <p className="pricing-subtitle">
              Performance-focused ad management that delivers real ROI
            </p>
          </div>

          <div className="ad-pricing-grid">
            {adPackages.map((pkg, i) => (
              <div className="ad-pricing-card" key={i}>
                <h3>{pkg.name}</h3>
                <div className="ad-pricing-price">
                  <span className="pricing-currency">$</span>
                  <span className="pricing-amount">{pkg.price}</span>
                  <span className="ad-period">{pkg.period}</span>
                </div>
                <ul>
                  {pkg.features.map((feat, j) => (
                    <li key={j}>
                      <span className="pricing-check">&#10003;</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="thm-btn pricing-btn-outline">
                  Get Started <span>&#8594;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTE */}
      <section className="pricing-note">
        <div className="container text-center">
          <p className="pricing-note-text">
            <strong>*</strong> All prices are in USD. Ad spend is billed separately.
            Custom packages available for specific requirements.
            <Link to="/contact"> Contact us</Link> for a personalized quote.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="pricing-cta">
        <div className="container text-center">
          <div className="sec-tagline" style={{ justifyContent: "center" }}>
            <div className="line"></div>
            <p>Not Sure?</p>
            <div className="line"></div>
          </div>
          <h2 className="sec-title">Let's Find the <span>Right Plan</span></h2>
          <p className="pricing-cta-desc">
            Every business is unique. Let's discuss your specific needs
            and create a custom solution just for you.
          </p>
          <div className="pricing-cta-actions">
            <Link to="/contact" className="thm-btn">
              Get Free Consultation <span>&#8594;</span>
            </Link>
            <a href="tel:+918209978891" className="pricing-cta-phone">
              Call: <strong>+91 8209978891</strong>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
