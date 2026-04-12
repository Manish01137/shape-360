import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import "./Team.css";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Manish Beniwal",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Visionary leader with a passion for digital innovation. Founded Shape-360 to help businesses unlock their full digital potential.",
    social: { instagram: "#", linkedin: "#" },
  },
  {
    name: "Priya Sharma",
    role: "Lead Developer",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "Full-stack developer specializing in React, Node.js, and Shopify. Builds lightning-fast, scalable web solutions.",
    social: { instagram: "#", linkedin: "#" },
  },
  {
    name: "Arjun Mehta",
    role: "Performance Marketing Lead",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Data-driven marketer with expertise in Meta Ads, Google Ads, and conversion optimization. Delivers measurable ROI.",
    social: { instagram: "#", linkedin: "#" },
  },
  {
    name: "Sneha Patel",
    role: "Creative Director",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Award-winning designer who transforms brand visions into stunning visual experiences that captivate audiences.",
    social: { instagram: "#", linkedin: "#" },
  },
  {
    name: "Raj Kumar",
    role: "SEO Specialist",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    bio: "SEO strategist who has helped dozens of businesses achieve first-page Google rankings through data-driven strategies.",
    social: { instagram: "#", linkedin: "#" },
  },
  {
    name: "Ananya Reddy",
    role: "Account Manager",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    bio: "Dedicated to client success with transparent communication, weekly reports, and proactive project management.",
    social: { instagram: "#", linkedin: "#" },
  },
];

const openPositions = [
  { title: "Senior React Developer", type: "Full-time", location: "Bangalore / Remote" },
  { title: "Digital Marketing Executive", type: "Full-time", location: "Bangalore" },
  { title: "UI/UX Designer", type: "Full-time", location: "Bangalore / Remote" },
  { title: "Content Writer", type: "Part-time", location: "Remote" },
];

const Team = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-hero-content > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" }
      );
      gsap.fromTo(
        ".team-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".team-grid", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".career-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".careers-grid", start: "top 80%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="team-page">
      <Helmet>
        <title>Our Team | Shape-360</title>
        <meta name="description" content="Meet the talented team behind Shape-360 — passionate developers, marketers, and designers driving digital growth." />
      </Helmet>

      {/* HERO */}
      <section className="team-hero">
        <div className="team-hero-bg"></div>
        <div className="container team-hero-content">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>Our Team</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">
            The People Behind <br />
            <span>Shape-360</span>
          </h1>
          <p className="team-hero-desc">
            A passionate team of developers, designers, and marketers
            dedicated to delivering exceptional digital results.
          </p>
        </div>
      </section>

      {/* TEAM GRID */}
      <section className="team-section">
        <div className="container">
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <div className="team-card" key={i}>
                <div className="team-card-img">
                  <img src={member.img} alt={member.name} />
                  <div className="team-card-social">
                    <a href={member.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                    <a href={member.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                  </div>
                </div>
                <div className="team-card-body">
                  <h3>{member.name}</h3>
                  <span className="team-card-role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section className="careers-section">
        <div className="container">
          <div className="text-center">
            <div className="sec-tagline" style={{ justifyContent: "center" }}>
              <div className="line"></div>
              <p>Join Us</p>
              <div className="line"></div>
            </div>
            <h2 className="sec-title">Open <span>Positions</span></h2>
            <p className="careers-desc">
              We're always looking for talented people who share our passion
              for digital excellence.
            </p>
          </div>
          <div className="careers-grid">
            {openPositions.map((pos, i) => (
              <Link to="/contact" className="career-card" key={i}>
                <div className="career-card-info">
                  <h3>{pos.title}</h3>
                  <div className="career-tags">
                    <span className="career-tag">{pos.type}</span>
                    <span className="career-tag">{pos.location}</span>
                  </div>
                </div>
                <span className="career-apply">
                  Apply <span>&#8594;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="team-cta">
        <div className="container text-center">
          <div className="sec-tagline" style={{ justifyContent: "center" }}>
            <div className="line"></div>
            <p>Work With Us</p>
            <div className="line"></div>
          </div>
          <h2 className="sec-title">Let's Create Something <span>Great</span></h2>
          <p className="team-cta-desc">
            Ready to work with a team that's passionate about your success?
          </p>
          <Link to="/contact" className="thm-btn">
            Get In Touch <span>&#8594;</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Team;
