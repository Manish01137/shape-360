/* eslint-disable no-unused-vars */
import "./Services.css";
import { motion } from "framer-motion";
import {
  Code,
  ShoppingBag,
  Globe,
  Target,
  Search,
  Headphones,
  Wrench,
  BarChart3,
  Video,
  Palette,
  Layers,
} from "lucide-react";

/* ================= ANIMATION VARIANTS ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const Services = () => {
  return (
    <main className="services-page">

      {/* ================= HERO ================= */}
      <section className="services-hero">
        <motion.div
          className="container"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.span className="section-badge" variants={fadeUp}>
            OUR SERVICES
          </motion.span>

          <motion.h1 variants={fadeUp}>
            Everything You Need <br />
            <span>To Grow Online</span>
          </motion.h1>

          <motion.p variants={fadeUp}>
            From websites to ads to ongoing support — we provide complete digital
            solutions that drive real business results.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= CORE SERVICES ================= */}
      <section className="services-main">
        <motion.div
          className="container services-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <ServiceCard
            icon={<Code />}
            title="Website Development (Custom Coding)"
            desc="Fast, secure, and scalable websites built from scratch."
            points={[
              "Custom front-end & back-end development",
              "Performance-optimized architecture",
              "SEO-friendly structure",
              "Mobile-first responsive design",
            ]}
          />

          <ServiceCard
            icon={<ShoppingBag />}
            title="Shopify Store Development"
            desc="High-converting e-commerce stores with complete setup."
            points={[
              "Custom Shopify theme development",
              "Product catalog setup",
              "Payment & shipping configuration",
              "Apps integration & automation",
            ]}
          />

          <ServiceCard
            icon={<Globe />}
            title="WordPress Development & Management"
            desc="Business websites with ongoing maintenance and security."
            points={[
              "Custom WordPress themes",
              "Plugin development & integration",
              "Security hardening",
              "Performance optimization",
            ]}
          />

          <ServiceCard
            icon={<Target />}
            title="Meta Ads (Facebook & Instagram)"
            desc="Ads that actually convert audiences into customers."
            points={[
              "Campaign strategy & planning",
              "Creative design & copywriting",
              "Audience targeting & retargeting",
              "A/B testing & optimization",
            ]}
          />

          <ServiceCard
            icon={<Search />}
            title="Google Ads Management"
            desc="Search & performance campaigns focused on ROI."
            points={[
              "Keyword research & strategy",
              "Search & display campaigns",
              "Conversion tracking setup",
              "Bid management & optimization",
            ]}
          />

          <ServiceCard
            icon={<Headphones />}
            title="Account Management & Ongoing Support"
            desc="Dedicated support to ensure consistent growth."
            points={[
              "Dedicated account manager",
              "Weekly performance reports",
              "Proactive optimization",
              "24/7 priority support",
            ]}
          />
        </motion.div>
      </section>

      {/* ================= ADDITIONAL SERVICES ================= */}
      <section className="services-extra">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Additional Digital Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Complement your digital strategy with our extended services
          </motion.p>

          <motion.div
            className="extra-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <ExtraCard icon={<Wrench />} title="Website Maintenance" desc="Regular updates and fixes." />
            <ExtraCard icon={<BarChart3 />} title="Analytics Setup" desc="Track what really matters." />
            <ExtraCard icon={<Target />} title="Conversion Optimization" desc="Turn visitors into customers." />
            <ExtraCard icon={<Video />} title="Video Editing" desc="High-quality video content." />
            <ExtraCard icon={<Palette />} title="Graphic Design" desc="Stunning brand visuals." />
            <ExtraCard icon={<Layers />} title="Branding & Creatives" desc="Complete brand identity." />
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="services-cta">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Get Started?</h2>
          <p>
            Let's discuss your project and find the perfect solution for your business.
          </p>
          <button className="cta-btn">Get Free Consultation →</button>
        </motion.div>
      </section>

    </main>
  );
};

/* ================= COMPONENTS ================= */

const ServiceCard = ({ icon, title, desc, points }) => (
  <motion.div
    className="service-card"
    variants={fadeUp}
    whileHover={{ y: -12 }}
    transition={{ type: "spring", stiffness: 160 }}
  >
    <div className="icon">{icon}</div>
    <h3>{title}</h3>
    <p>{desc}</p>
    <ul>
      {points.map((item, i) => (
        <li key={i}>✓ {item}</li>
      ))}
    </ul>
    <span className="learn-more">Learn More →</span>
  </motion.div>
);

const ExtraCard = ({ icon, title, desc }) => (
  <motion.div
    className="extra-card"
    variants={fadeUp}
    whileHover={{ y: -8, scale: 1.02 }}
  >
    <div className="icon">{icon}</div>
    <h4>{title}</h4>
    <p>{desc}</p>
  </motion.div>
);

export default Services;
