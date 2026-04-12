import { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
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
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
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
      <Helmet>
        <title>Contact Us | Shape-360</title>
        <meta name="description" content="Get in touch with Shape-360. Free consultation for web development, digital marketing, and design services." />
      </Helmet>

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

              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" name="phone" placeholder="+91 00000 00000" />
                </div>
                <div className="form-group">
                  <label>Service Interested In</label>
                  <select name="service" defaultValue="">
                    <option value="" disabled>Select a service</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Shopify Store">Shopify Store</option>
                    <option value="WordPress Development">WordPress Development</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="Branding & Design">Branding & Design</option>
                    <option value="Account Management">Account Management</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Budget Range</label>
                <select name="budget" defaultValue="">
                  <option value="" disabled>Select your budget</option>
                  <option value="Under ₹15,000">Under ₹15,000</option>
                  <option value="₹15,000 - ₹35,000">₹15,000 - ₹35,000</option>
                  <option value="₹35,000 - ₹75,000">₹35,000 - ₹75,000</option>
                  <option value="₹75,000 - ₹1,50,000">₹75,000 - ₹1,50,000</option>
                  <option value="₹1,50,000+">₹1,50,000+</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea name="message" placeholder="Tell us about your project, goals, and timeline..." rows="5" required />
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

            {/* GOOGLE MAP */}
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497699.9973874144!2d77.35074!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="200"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shape-360 Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
