import { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import "./Contact.css";

const Contact = () => {
  const formRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-hero-inner > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" }
      );

      gsap.fromTo(".contact-form-card",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.3 }
      );

      gsap.fromTo(".contact-info-side",
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.5 }
      );
    });
    return () => ctx.revert();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_nl03ehg", "template_odit2uo", formRef.current, "oKwS_r9WGNcTvsRrC")
      .then(() => {
        alert("Message sent successfully!");
        formRef.current.reset();
      })
      .catch((error) => {
        alert("Failed to send message. Try again.");
        console.error(error);
      });
  };

  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-bg"></div>
        <div className="container contact-hero-inner">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>Contact Us</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">
            Let's Start Your <br />
            <span>Digital</span> Journey
          </h1>
          <p className="contact-hero-desc">
            Tell us about your project — we'll guide you for free.
            No commitment, just honest advice and a clear roadmap.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="contact-content">
        <div className="container contact-grid">

          {/* FORM */}
          <div className="contact-form-card">
            <h2>Send Us a Message</h2>
            <p className="form-subtitle">Fill out the form below and we'll get back shortly.</p>

            <form ref={formRef} onSubmit={sendEmail} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input type="text" name="name" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" placeholder="your@email.com" required />
                </div>
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input type="text" name="phone" placeholder="+91 00000 00000" />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea name="message" placeholder="Tell us about your project..." rows="5" required />
              </div>

              <button type="submit" className="thm-btn send-btn">
                Send Message
                <span>&#8594;</span>
              </button>
            </form>
          </div>

          {/* INFO SIDE */}
          <div className="contact-info-side">
            <h2>Get in Touch</h2>
            <p className="info-subtitle">Prefer to reach out directly? Here's how.</p>

            <div className="info-card">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 7l8 6 8-6"/></svg>
              </div>
              <div>
                <h4>Email Us</h4>
                <a href="mailto:shape360official@gmail.com">shape360official@gmail.com</a>
                <span>Response within 2 hours</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.24c1.1.36 2.3.56 3.6.56a1 1 0 011 1V20a1 1 0 01-1 1C10.8 21 3 13.2 3 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.25 1z"/></svg>
              </div>
              <div>
                <h4>Call Us</h4>
                <a href="tel:+918209978891">+91 8209978891</a>
                <span>Available 24/7</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none"/></svg>
              </div>
              <div>
                <h4>Visit Us</h4>
                <span>Bangalore, India</span>
              </div>
            </div>

            <div className="info-divider"></div>

            <div className="info-social">
              <p>Follow Us</p>
              <div className="info-social-links">
                <a href="https://www.instagram.com/shape360official" target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://www.facebook.com/share/1AmwEewBMn/" target="_blank" rel="noreferrer">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
