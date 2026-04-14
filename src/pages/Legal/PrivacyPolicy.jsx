import { Helmet } from "react-helmet-async";
import "./Legal.css";

const PrivacyPolicy = () => (
  <div className="legal-page">
    <Helmet>
      <title>Privacy Policy | Shape-360</title>
    </Helmet>
    <section className="legal-hero">
      <div className="container">
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: March 1, 2025</p>
      </div>
    </section>
    <section className="legal-content">
      <div className="container">
        <article className="legal-article">
          <h2>1. Introduction</h2>
          <p>Shape-360 ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website shape-360.com or engage with our services.</p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, and company name when you fill out contact forms or request consultations.</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on site, browser type, device information, and IP address through analytics tools.</li>
            <li><strong>Cookies:</strong> Small data files stored on your device to improve your browsing experience and analyze site traffic.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To respond to your inquiries and provide requested services</li>
            <li>To send project updates and relevant communications</li>
            <li>To improve our website and services</li>
            <li>To analyze website traffic and user behavior</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2>4. Data Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share data with trusted service providers (such as email delivery services and analytics tools) solely to operate our business. These providers are contractually obligated to protect your data.</p>

          <h2>5. Data Security</h2>
          <p>We implement industry-standard security measures including SSL encryption, secure servers, and access controls to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

          <h2>6. Cookies</h2>
          <p>Our website uses cookies to enhance your experience. You can control cookie preferences through your browser settings. Disabling cookies may affect some website functionality.</p>

          <h2>7. Third-Party Links</h2>
          <p>Our website may contain links to third-party sites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.</p>

          <h2>8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Request correction or deletion of your data</li>
            <li>Opt out of marketing communications</li>
            <li>Request data portability</li>
          </ul>

          <h2>9. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, contact us at:</p>
          <p><strong>Email:</strong> shape360official@gmail.com<br /><strong>Phone:</strong> +91 8209978891<br /><strong>Location:</strong> Bangalore, India</p>
        </article>
      </div>
    </section>
  </div>
);

export default PrivacyPolicy;
