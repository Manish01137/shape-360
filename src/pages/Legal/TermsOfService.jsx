import { Helmet } from "react-helmet-async";
import "./Legal.css";

const TermsOfService = () => (
  <div className="legal-page">
    <Helmet>
      <title>Terms of Service | Shape-360</title>
    </Helmet>
    <section className="legal-hero">
      <div className="container">
        <h1>Terms of Service</h1>
        <p className="legal-updated">Last updated: March 1, 2025</p>
      </div>
    </section>
    <section className="legal-content">
      <div className="container">
        <article className="legal-article">
          <h2>1. Agreement to Terms</h2>
          <p>By accessing and using Shape-360's website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

          <h2>2. Services</h2>
          <p>Shape-360 provides digital services including but not limited to web development, e-commerce solutions, digital advertising management, SEO optimization, branding, and graphic design. Specific deliverables, timelines, and pricing are outlined in individual project agreements.</p>

          <h2>3. Project Agreements</h2>
          <p>Each project engagement is governed by a separate project agreement that specifies scope, deliverables, timeline, and pricing. Work begins only after mutual agreement and receipt of the initial payment as specified.</p>

          <h2>4. Payment Terms</h2>
          <ul>
            <li>Web development projects: 50% upfront, 50% upon completion</li>
            <li>Large projects: Milestone-based payment schedule</li>
            <li>Ad management services: Monthly billing, payable in advance</li>
            <li>Ad spend is billed separately and paid directly to the advertising platform</li>
            <li>Accepted payment methods: Bank transfer, UPI</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>Upon full payment, clients receive full ownership of all custom-designed deliverables. Third-party licenses (fonts, stock images, plugins) remain subject to their respective terms. Shape-360 retains the right to showcase completed work in our portfolio.</p>

          <h2>6. Client Responsibilities</h2>
          <ul>
            <li>Providing necessary content, images, and brand assets in a timely manner</li>
            <li>Reviewing and providing feedback within agreed timeframes</li>
            <li>Providing access to required accounts and platforms</li>
            <li>Ensuring all provided content does not violate third-party rights</li>
          </ul>

          <h2>7. Revisions & Satisfaction</h2>
          <p>We offer reasonable revisions as specified in the project agreement. Additional revisions beyond the agreed scope may incur extra charges. We are committed to client satisfaction and will work with you until you're happy with the deliverables.</p>

          <h2>8. Termination</h2>
          <p>Either party may terminate a project with written notice. For web development: payment is due for all completed work. For ad management: 30-day notice period applies. Clients retain access to all their accounts and data.</p>

          <h2>9. Limitation of Liability</h2>
          <p>Shape-360 shall not be liable for indirect, incidental, or consequential damages. Our total liability shall not exceed the amount paid for the specific service in question. We do not guarantee specific results from advertising campaigns.</p>

          <h2>10. Confidentiality</h2>
          <p>Both parties agree to keep project details, business information, and proprietary data confidential. This obligation survives termination of the agreement.</p>

          <h2>11. Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Bangalore, Karnataka.</p>

          <h2>12. Contact</h2>
          <p>For questions about these Terms, contact us at:</p>
          <p><strong>Email:</strong> shape360official@gmail.com<br /><strong>Phone:</strong> +91 8209978891<br /><strong>Location:</strong> Bangalore, India</p>
        </article>
      </div>
    </section>
  </div>
);

export default TermsOfService;
