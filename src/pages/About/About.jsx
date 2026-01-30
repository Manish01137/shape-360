/* eslint-disable no-unused-vars */
import "./About.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap,
  Users,
  Award,
  ShieldCheck,
  TrendingUp,
  Target,
  Heart,
} from "lucide-react";

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const About = () => {
  return (
    <main className="about-page">

      {/* ================= HERO ================= */}
      <section className="about-hero">
        <motion.div
          className="container about-hero-grid"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <span className="section-badge">ABOUT SHAPE-360</span>

            <h1>
              We Shape Digital <br />
              <span>Success Stories</span>
            </h1>

            <p>
              Shape-360 is a premium digital agency helping ambitious brands
              grow through strategy, performance, and creativity.
            </p>

            <p>
              Our mission is simple — to become a trusted growth partner
              for businesses worldwide.
            </p>
          </motion.div>

          {/* STATS */}
          <motion.div className="about-stats" variants={stagger}>
            <StatCard icon={<Zap />} value="70+" label="Projects Completed" />
            <StatCard icon={<Users />} value="20+" label="Happy Clients" />
            <StatCard icon={<Award />} value="2+" label="Years Experience" />
            <StatCard icon={<ShieldCheck />} value="98%" label="Client Retention" />
          </motion.div>
        </motion.div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="about-mission">
        <motion.div
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="mission-icon">
            <TrendingUp />
          </div>

          <h2>Our Mission</h2>

          <p>
            “To empower businesses with digital solutions that drive
            growth, build trust, and deliver measurable impact.”
          </p>
        </motion.div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="about-values">
        <motion.div
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp}>What We Stand For</motion.h2>

          <motion.p variants={fadeUp}>
            These principles guide everything we do and define how we work.
          </motion.p>

          <div className="values-grid">
            <ValueCard
              icon={<Target />}
              title="Results-Driven"
              desc="Every decision is backed by data and focused on real outcomes."
            />
            <ValueCard
              icon={<Award />}
              title="Quality First"
              desc="We never compromise on quality. Every project gets full focus."
            />
            <ValueCard
              icon={<Users />}
              title="True Partnership"
              desc="We work as an extension of your team, not just a vendor."
            />
            <ValueCard
              icon={<Heart />}
              title="Passion"
              desc="We genuinely love what we do — and it shows in our work."
            />
          </div>
        </motion.div>
      </section>

      {/* ================= CTA ================= */}
      <section className="about-cta">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Let’s Work Together</h2>

          <p>
            Ready to elevate your digital presence?
            Let’s talk strategy, growth, and results.
          </p>

          <Link to="/contact" className="cta-btn">
            Get In Touch →
          </Link>

          <small className="cta-note">
            Free consultation • No obligation • Fast response
          </small>
        </motion.div>
      </section>

    </main>
  );
};

/* ================= COMPONENTS ================= */
const StatCard = ({ icon, value, label }) => (
  <motion.div className="stat-card" variants={fadeUp} whileHover={{ y: -8 }}>
    <div className="icon">{icon}</div>
    <h3>{value}</h3>
    <p>{label}</p>
  </motion.div>
);

const ValueCard = ({ icon, title, desc }) => (
  <motion.div className="value-card" variants={fadeUp} whileHover={{ y: -10 }}>
    <div className="icon">{icon}</div>
    <h4>{title}</h4>
    <p>{desc}</p>
  </motion.div>
);

export default About;
