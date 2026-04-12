import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
import "./FAQ.css";

const faqs = [
  {
    category: "General",
    questions: [
      { q: "What services does Shape-360 offer?", a: "We offer a full range of digital services including custom website development, Shopify store development, WordPress sites, Meta Ads (Facebook & Instagram), Google Ads management, SEO optimization, branding, graphic design, video editing, and ongoing account management." },
      { q: "How long does a typical project take?", a: "Timelines vary based on complexity. A standard website takes 2-4 weeks, a Shopify store takes 2-3 weeks, and ad campaign setup takes about 1 week. We'll provide a detailed timeline during our initial consultation." },
      { q: "Do you work with businesses outside India?", a: "Absolutely! While we're based in Bangalore, India, we work with clients globally. Our team is experienced in remote collaboration and we use modern tools to ensure seamless communication across time zones." },
      { q: "What makes Shape-360 different from other agencies?", a: "We focus on results, not just deliverables. Every solution is custom-built (no templates), we provide transparent weekly reports, dedicated account managers, and we operate as a true growth partner — not just a vendor." },
    ],
  },
  {
    category: "Pricing & Payments",
    questions: [
      { q: "How much do your services cost?", a: "Our pricing varies based on project scope and requirements. We offer competitive rates starting from affordable packages for startups to comprehensive enterprise solutions. Contact us for a free, no-obligation quote tailored to your needs." },
      { q: "Do you require upfront payment?", a: "We typically work with a 50% upfront payment to begin the project, with the remaining 50% due upon completion. For larger projects, we offer milestone-based payment schedules. We accept bank transfers and UPI." },
      { q: "Are there any long-term contracts?", a: "No long-term contracts required for website development projects. For ongoing services like ad management and account management, we work on month-to-month agreements with a 30-day notice period." },
      { q: "Do you offer refunds?", a: "We offer a satisfaction guarantee. If you're not happy with the initial concepts, we'll revise until you are. Refund policies are outlined in our project agreement and vary by service type." },
    ],
  },
  {
    category: "Web Development",
    questions: [
      { q: "Which technologies do you use?", a: "We use modern, industry-standard technologies including React, Next.js, Node.js for custom development, Shopify Liquid for e-commerce, and WordPress for CMS solutions. All our websites are built with performance, security, and SEO best practices in mind." },
      { q: "Will my website be mobile-friendly?", a: "Absolutely. Every website we build is fully responsive and mobile-first, ensuring a perfect experience across all devices — smartphones, tablets, and desktops." },
      { q: "Do you provide website maintenance?", a: "Yes! We offer ongoing maintenance packages that include regular updates, security patches, performance monitoring, backup management, and content updates. This ensures your website remains secure and up-to-date." },
      { q: "Can you redesign my existing website?", a: "Yes, we specialize in website redesigns. We'll analyze your current site, identify improvement areas, and create a modern, high-performing version while preserving your SEO rankings and existing content." },
    ],
  },
  {
    category: "Digital Marketing",
    questions: [
      { q: "How soon can I expect results from ad campaigns?", a: "Initial results from Meta Ads and Google Ads typically appear within the first 1-2 weeks. However, campaigns are optimized over 30-60 days for best performance. We provide weekly performance reports so you can track progress from day one." },
      { q: "What's the minimum ad budget you recommend?", a: "We recommend a minimum monthly ad spend of ₹15,000-20,000 for Meta Ads and ₹20,000-30,000 for Google Ads to see meaningful results. However, budgets are customized based on your goals, industry, and competition." },
      { q: "Do you guarantee specific results?", a: "While we can't guarantee specific numbers (no ethical agency can), we guarantee our best effort, proven strategies, and complete transparency. Our track record shows consistent ROI improvements across all client campaigns." },
      { q: "Will I have access to my ad accounts?", a: "Yes, always. We believe in full transparency. You'll have complete access to your ad accounts, analytics dashboards, and all data. We manage everything through your business accounts — you own everything." },
    ],
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <div className="faq-icon">
          <span className="faq-icon-line faq-icon-h"></span>
          <span className="faq-icon-line faq-icon-v"></span>
        </div>
      </button>
      <div className="faq-answer">
        <div className="faq-answer-inner">
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-hero-content > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="faq-page">
      <Helmet>
        <title>FAQ | Shape-360</title>
        <meta name="description" content="Frequently asked questions about Shape-360's services, pricing, process, and more." />
      </Helmet>

      {/* HERO */}
      <section className="faq-hero">
        <div className="faq-hero-bg"></div>
        <div className="container faq-hero-content">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>FAQ</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">
            Got <span>Questions</span>? <br />
            We've Got Answers.
          </h1>
          <p className="faq-hero-desc">
            Everything you need to know about working with Shape-360.
            Can't find your answer? Reach out to us directly.
          </p>
        </div>
      </section>

      {/* FAQ SECTIONS */}
      <section className="faq-content">
        <div className="container">
          <div className="faq-layout">
            {faqs.map((section, i) => (
              <div className="faq-section" key={i}>
                <div className="faq-section-header">
                  <span className="faq-section-num">0{i + 1}</span>
                  <h2>{section.category}</h2>
                </div>
                <div className="faq-list">
                  {section.questions.map((item, j) => (
                    <FAQItem key={j} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="faq-cta">
        <div className="container text-center">
          <div className="faq-cta-inner">
            <h2 className="sec-title">Still Have <span>Questions</span>?</h2>
            <p className="faq-cta-desc">
              Don't hesitate to reach out. We're happy to answer any
              questions and discuss your project in detail.
            </p>
            <div className="faq-cta-actions">
              <Link to="/contact" className="thm-btn">
                Contact Us <span>&#8594;</span>
              </Link>
              <a href="tel:+918209978891" className="faq-cta-phone">
                Or call: <strong>+91 8209978891</strong>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
