/* eslint-disable no-unused-vars */
import "./Home.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Code,
  ShoppingBag,
  Globe,
  Target,
  Search,
  Headphones,
} from "lucide-react";

/* ================= COUNTER ================= */
const Counter = ({ value, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const duration = 1200;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="stat">
      <h3>{count}+</h3>
      <span>{label}</span>
    </div>
  );
};

/* ================= HOME ================= */
const Home = () => {
  const services = [
    {
      icon: <Code size={28} />,
      title: "Website Development",
      desc: "High-performance custom websites built for speed, security and scalability.",
    },
    {
      icon: <ShoppingBag size={28} />,
      title: "Shopify Stores",
      desc: "Conversion-focused Shopify stores with premium UI and full setup.",
    },
    {
      icon: <Globe size={28} />,
      title: "WordPress Development",
      desc: "Business websites & blogs with maintenance, security and optimization.",
    },
    {
      icon: <Target size={28} />,
      title: "Meta Ads",
      desc: "Facebook & Instagram ads with precise targeting that convert.",
    },
    {
      icon: <Search size={28} />,
      title: "Google Ads",
      desc: "Search & performance campaigns designed to maximize ROI.",
    },
    {
      icon: <Headphones size={28} />,
      title: "Account Management",
      desc: "Dedicated support with continuous monitoring and optimization.",
    },
  ];

  return (
    <main className="home">
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="container hero-content">
          <motion.span
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ✨ Premium Digital Agency
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            360° Digital Solutions <br />
            <span className="gradient-text">That Shape Your Growth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Websites, Ads, Design & Ongoing Digital Growth — all crafted
            to elevate your business and drive measurable results.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <button className="primary-btn">Get Free Consultation →</button>
            <button className="secondary-btn">
              <span className="play-icon">▶</span>
              See Our Work
            </button>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Counter value="150" label="Projects Delivered" />
            <Counter value="98" label="Client Satisfaction" />
            <Counter value="5" label="Years Experience" />
            <Counter value="50" label="Active Clients" />
          </motion.div>
        </div>

        <div className="scroll-indicator">
          <span></span>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="services">
        <div className="container">
          <motion.span
            className="section-badge"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            WHAT WE DO
          </motion.span>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Complete <span>Digital Solutions</span>
          </motion.h2>

          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            From building your online presence to scaling your business —
            we handle every aspect of your digital growth.
          </motion.p>

          <div className="services-grid">
            {services.map((item, i) => (
              <motion.div
                key={i}
                className="service-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="service-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     {/* ================= WHY CHOOSE US (PREMIUM) ================= */}
<section className="why-us">
  <div className="container why-wrapper">

    {/* LEFT SIDE */}
    <motion.div
      className="why-left"
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <span className="section-badge">WHY CHOOSE US</span>

      <h2 className="why-title">
        We're Different. <br />
        <span className="gradient-text">Here's Why.</span>
      </h2>

      <p className="why-desc">
        We don’t just build websites or run ads. We engineer digital
        experiences that are designed to convert, scale, and grow
        businesses long-term.
      </p>

      <div className="why-points">
        {[
          "Data-driven strategies",
          "Dedicated project manager",
          "Weekly progress reports",
          "No long-term contracts",
        ].map((text, i) => (
          <motion.div
            key={i}
            className="why-point"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <span className="check-icon">✓</span>
            {text}
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* RIGHT SIDE */}
    <div className="why-right">
      {[
        {
          title: "Custom-Built Solutions",
          desc: "No templates. Every solution is crafted from scratch to match your brand and goals.",
          icon: (
            <svg viewBox="0 0 24 24">
              <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
            </svg>
          ),
        },
        {
          title: "Conversion-Focused Design",
          desc: "Every pixel is optimized to turn visitors into customers and maximize ROI.",
          icon: (
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3" />
              <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
            </svg>
          ),
        },
        {
          title: "Transparent Communication",
          desc: "Clear updates, honest feedback, and complete visibility at every stage.",
          icon: (
            <svg viewBox="0 0 24 24">
              <path d="M21 15a4 4 0 01-4 4H7l-4 3V5a4 4 0 014-4h10a4 4 0 014 4z" />
            </svg>
          ),
        },
        {
          title: "Long-Term Partnership",
          desc: "We don’t stop at launch — we grow, optimize, and scale with you.",
          icon: (
            <svg viewBox="0 0 24 24">
              <path d="M3 17l6-6 4 4 7-7" />
              <path d="M14 4h7v7" />
            </svg>
          ),
        },
      ].map((card, i) => (
        <motion.div
          key={i}
          className="why-card-premium"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.6 }}
          whileHover={{ y: -14 }}
        >
          <div className="why-icon-premium">{card.icon}</div>
          <h3>{card.title}</h3>
          <p>{card.desc}</p>
        </motion.div>
      ))}
    </div>

  </div>
</section>

     {/* ================= OUR PROCESS ================= */}
<section className="process">
  <div className="container">

    <motion.span
      className="section-badge center"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      OUR PROCESS
    </motion.span>

    <motion.h2
      className="process-title"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      How We Deliver Results
    </motion.h2>

    <motion.p
      className="process-subtitle"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      A proven methodology that transforms your ideas into digital success stories.
    </motion.p>

    <div className="process-grid">
      {[
        {
          step: "01",
          title: "Discover",
          desc: "We dive deep into your business, goals, and competition to craft the perfect strategy.",
          icon: (
            <svg viewBox="0 0 24 24">
              <path d="M9 18h6M10 22h4" />
              <path d="M12 2a7 7 0 00-4 12c.6.5 1 1.3 1 2h6c0-.7.4-1.5 1-2a7 7 0 00-4-12z" />
            </svg>
          ),
        },
        {
          step: "02",
          title: "Build",
          desc: "Our team brings your vision to life with meticulous attention to detail and quality.",
          icon: (
            <svg viewBox="0 0 24 24">
              <path d="M14 7l3 3-8 8H6v-3z" />
              <path d="M17 4l3 3" />
            </svg>
          ),
        },
        {
          step: "03",
          title: "Launch",
          desc: "We deploy your project with comprehensive testing and optimization for peak performance.",
          icon: (
            <svg viewBox="0 0 24 24">
              <path d="M5 19l14-7-7-7-2 9z" />
              <path d="M5 19l7-7" />
            </svg>
          ),
        },
        {
          step: "04",
          title: "Scale",
          desc: "Continuous improvement and growth strategies to maximize your digital success.",
          icon: (
            <svg viewBox="0 0 24 24">
              <path d="M3 3v18h18" />
              <path d="M7 14l4-4 4 3 4-6" />
            </svg>
          ),
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="process-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.6 }}
          whileHover={{ y: -12 }}
        >
          <div className="process-step">{item.step}</div>

          <div className="process-icon">{item.icon}</div>

          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </motion.div>
      ))}
    </div>

  </div>
</section>


{/* ================= TESTIMONIALS ================= */}
<section className="testimonials">
  <div className="container">

    <h2 className="testimonials-title">
      What Our Clients Say
    </h2>

    <p className="testimonials-subtitle">
      Don’t just take our word for it — hear from businesses we’ve helped grow.
    </p>

    <div className="testimonial-slider">

      <div className="testimonial-track">

        {/* Review 1 */}
        <div className="testimonial-card">
          <div className="quote-icon">❝</div>
          <div className="stars">★★★★★</div>
          <p className="testimonial-text">
            “Shape-360 has been a game-changer for our business. Their Google Ads
            strategy consistently delivers quality leads and strong ROI.”
          </p>
          <div className="client-info">
            <strong>Rohit Sharma</strong>
            <span>Founder, UrbanKart</span>
          </div>
        </div>

        {/* Review 2 */}
        <div className="testimonial-card">
          <div className="quote-icon">❝</div>
          <div className="stars">★★★★★</div>
          <p className="testimonial-text">
            “Their conversion-focused design approach significantly improved our
            website performance. Results were visible within weeks.”
          </p>
          <div className="client-info">
            <strong>Neha Gupta</strong>
            <span>Marketing Head, StyleNest</span>
          </div>
        </div>

        {/* Review 3 */}
        <div className="testimonial-card">
          <div className="quote-icon">❝</div>
          <div className="stars">★★★★★</div>
          <p className="testimonial-text">
            “Weekly reports, clear communication, and strong execution made
            Shape-360 a reliable long-term partner for us.”
          </p>
          <div className="client-info">
            <strong>Aman Verma</strong>
            <span>Co-Founder, FinEdge Solutions</span>
          </div>
        </div>

        {/* Review 4 */}
        <div className="testimonial-card">
          <div className="quote-icon">❝</div>
          <div className="stars">★★★★★</div>
          <p className="testimonial-text">
            “We wanted a digital partner, not just an agency. Shape-360 delivered
            beyond expectations and continues to support our growth.”
          </p>
          <div className="client-info">
            <strong>Pooja Mehta</strong>
            <span>Owner, BloomWell Wellness</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</section>


    {/* ================= CTA SECTION ================= */}
<section className="cta-section">
  <div className="cta-overlay"></div>

  <div className="container cta-content">

    <span className="cta-badge">
      ✨ Ready to Transform Your Business?
    </span>

    <h2 className="cta-title">
      Let's Build Something <br />
      <span>Extraordinary Together</span>
    </h2>

    <p className="cta-subtitle">
      Tell us about your project. We'll provide a free consultation and
      strategy tailored to your goals.
    </p>

    <button className="cta-btn">
      Start Your Project <span>→</span>
    </button>

  </div>
</section>



    </main>
  );
};

export default Home;
