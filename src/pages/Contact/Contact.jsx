import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_nl03ehg",
        "template_odit2uo",
        formRef.current,
        "oKwS_r9WGNcTvsRrC"
      )
      .then(() => {
        alert("✅ Message sent successfully!");
        formRef.current.reset();
      })
      .catch((error) => {
        alert("❌ Failed to send message. Try again.");
        console.error(error);
      });
  };

  return (
    <main className="contact-page">

      {/* HERO */}
      <section className="contact-hero fade-up">
        <span className="contact-tag">CONTACT US</span>
        <h1>
          Let's Start Your <span>Digital Journey</span>
        </h1>
        <p>
          Tell us about your project — we'll guide you for free.
          No commitment, just honest advice and a clear roadmap.
        </p>
      </section>

      {/* CONTENT */}
      <section className="contact-content">

        {/* LEFT FORM */}
        <div className="contact-form-card glass fade-up delay-1">
          <h2>Send Us a Message</h2>
          <p>Fill out the form below and we'll get back shortly.</p>

          <form ref={formRef} onSubmit={sendEmail} className="contact-form">

            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                required
              />
            </div>

            <button type="submit" className="send-btn">
              <span>Send Message</span>
              <svg viewBox="0 0 24 24">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </form>
        </div>

        {/* RIGHT INFO */}
        <div className="contact-info fade-up delay-2">
          <h2>Get in Touch</h2>
          <p>Prefer to reach out directly? Here's how.</p>

          {/* EMAIL */}
          <div className="info-card email">
            <div className="icon-tile">
              <svg viewBox="0 0 24 24">
                <rect x="4" y="6" width="16" height="12" rx="2" />
                <path d="M4 7l8 6 8-6" />
              </svg>
            </div>
            <div>
              <h4>Email Us</h4>
              <a href="mailto:shape360official@gmail.com">
                shape360official@gmail.com
              </a>
              <span>Response within 24 hours</span>
            </div>
          </div>

          {/* CALL */}
          <div className="info-card call">
            <div className="icon-tile">
              <svg viewBox="0 0 24 24">
                <path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011-.24c1.1.36 2.3.56 3.6.56a1 1 0 011 1V20a1 1 0 01-1 1C10.8 21 3 13.2 3 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.3.2 2.5.6 3.6a1 1 0 01-.25 1z"/>
              </svg>
            </div>
            <div>
              <h4>Call Us</h4>
              <a href="tel:+15551234567">+1 (555) 123-4567</a>
              <span>Mon–Fri · 9am to 6pm</span>
            </div>
          </div>

          {/* LOCATION */}
          <div className="info-card location">
            <div className="icon-tile">
              <svg viewBox="0 0 24 24">
                <path d="M12 21s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <div>
              <h4>Visit Us</h4>
              <span>New York, NY</span>
              <span>By appointment only</span>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Contact;
