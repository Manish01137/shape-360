/* eslint-disable no-unused-vars */
import "./Contact.css";
import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_nl03ehg",        // ✅ your service ID
        "contact_form",           // ✅ your template ID
        e.target,
        "REPLACE_WITH_PUBLIC_KEY" // ❗ replace with EmailJS public key
      )
      .then(() => {
        setSuccess(true);
        setLoading(false);
        e.target.reset();
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong. Please try again.");
        setLoading(false);
      });
  };

  return (
    <main className="contact-page">

      {/* ================= HERO ================= */}
      <section className="contact-hero">
        <motion.div
          className="container"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
        >
          <span className="section-badge">CONTACT US</span>
          <h1>
            Let's Start Your <span>Digital Journey</span>
          </h1>
          <p>
            Tell us about your project — we'll guide you for free.
            No commitment, just honest advice and a clear roadmap.
          </p>
        </motion.div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="contact-content">
        <div className="container contact-grid">

          {/* FORM */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3>Send Us a Message</h3>
            <p>Fill out the form and we'll get back shortly.</p>

            <div className="field-row">
              <input name="name" placeholder="Your name *" required />
              <input
                name="email"
                type="email"
                placeholder="Your email *"
                required
              />
            </div>

            <input name="phone" placeholder="Phone (optional)" />
            <textarea
              name="message"
              placeholder="Tell us about your project *"
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : <>Send Message <Send size={18} /></>}
            </button>

            {success && (
              <motion.span
                className="success-msg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ✅ Message sent successfully!
              </motion.span>
            )}
          </motion.form>

          {/* INFO */}
          <motion.div
            className="contact-info"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>Get in Touch</h3>
            <p>Prefer to reach out directly?</p>

            <InfoCard icon={<Mail />} title="Email Us" value="hello@shape-360.com" />
            <InfoCard icon={<Phone />} title="Call Us" value="+1 (555) 123-4567" />
            <InfoCard icon={<MapPin />} title="Visit Us" value="New York, NY" />

            <div className="whatsapp-box">
              <MessageCircle />
              <div>
                <h4>Prefer WhatsApp?</h4>
                <p>Quick replies & easy communication.</p>
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noreferrer"
                >
                  Chat on WhatsApp →
                </a>
              </div>
            </div>

            <div className="response-time">
              <Clock size={18} />
              <span>Average response time: Within 24 hours</span>
            </div>
          </motion.div>

        </div>
      </section>

    </main>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div className="info-card">
    <div className="icon">{icon}</div>
    <div>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  </div>
);

export default Contact;
