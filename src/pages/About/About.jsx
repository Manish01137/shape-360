import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const StatCounter = ({ value, suffix = "+", label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const end = parseInt(value);
        const inc = end / (1500 / 16);
        const timer = setInterval(() => {
          start += inc;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [value]);

  return (
    <div className="about-stat" ref={ref}>
      <h3>{count}<span>{suffix}</span></h3>
      <p>{label}</p>
    </div>
  );
};

const About = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-hero-text > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" }
      );
      gsap.fromTo(".about-stat",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".about-stats-grid", start: "top 80%" }
        }
      );
      gsap.fromTo(".value-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".values-grid", start: "top 75%" }
        }
      );
      gsap.fromTo(".story-img-col",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".story-section", start: "top 70%" }
        }
      );
      gsap.fromTo(".story-text-col > *",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".story-section", start: "top 70%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const values = [
    { title: "Results-Driven", desc: "Every decision is backed by data and focused on real measurable outcomes that grow your business." },
    { title: "Quality First", desc: "We never compromise on quality. Every project gets our complete focus, attention, and expertise." },
    { title: "True Partnership", desc: "We work as an extension of your team, not just another vendor. Your success is our success." },
    { title: "Passion", desc: "We genuinely love what we do — and it shows in every piece of work we deliver to our clients." },
  ];

  return (
    <div className="about-page">
      <Helmet>
        <title>About Us | Shape-360</title>
        <meta name="description" content="Learn about Shape-360 — a premium digital agency in Bangalore helping ambitious brands grow through strategy, performance, and creativity." />
      </Helmet>

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-bg"></div>
        <div className="container">
          <div className="about-hero-grid">
            <div className="about-hero-text">
              <div className="sec-tagline">
                <div className="line"></div>
                <p>About Shape-360</p>
              </div>
              <h1 className="sec-title">
                We Shape Digital <br />
                <span>Success</span> Stories
              </h1>
              <p className="about-hero-desc">
                Shape-360 is a premium digital agency helping ambitious brands
                grow through strategy, performance, and creativity.
              </p>
              <p className="about-hero-desc">
                Our mission is simple — to become a trusted growth partner
                for businesses worldwide.
              </p>
              <div className="about-hero-actions">
                <Link to="/contact" className="thm-btn">
                  Work With Us <span>&#8594;</span>
                </Link>
                <Link to="/services" className="about-hero-link">
                  Our Services <span>&#8594;</span>
                </Link>
              </div>
            </div>

            <div className="about-hero-img-col">
              <div className="about-hero-img-wrap">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" alt="Shape-360 team collaboration" />
              </div>
              <div className="about-stats-grid">
                <StatCounter value="70" label="Projects Completed" />
                <StatCounter value="20" label="Happy Clients" />
                <StatCounter value="2" label="Years Experience" />
                <StatCounter value="98" suffix="%" label="Client Retention" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-img-col">
              <div className="story-img-wrap">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" alt="Shape-360 workspace" />
                <div className="story-img-accent"></div>
              </div>
            </div>
            <div className="story-text-col">
              <div className="sec-tagline">
                <p>Our Story</p>
                <div className="line"></div>
              </div>
              <h2 className="sec-title">From Vision <br />to <span>Reality</span></h2>
              <p className="story-desc">
                Shape-360 was born from a simple belief — that every business deserves
                access to premium digital solutions. We started as a small team of passionate
                developers and marketers, and have grown into a full-service digital agency
                trusted by brands across India.
              </p>
              <p className="story-desc">
                Today, we combine cutting-edge technology with creative strategy to deliver
                results that matter. From custom websites to performance marketing campaigns,
                we handle the complete digital lifecycle so you can focus on what you do best.
              </p>
              <div className="story-highlights">
                <div className="story-highlight">
                  <h4>2024</h4>
                  <p>Founded in Bangalore</p>
                </div>
                <div className="story-highlight">
                  <h4>70+</h4>
                  <p>Projects delivered</p>
                </div>
                <div className="story-highlight">
                  <h4>6+</h4>
                  <p>Services offered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-mission">
        <div className="container text-center">
          <div className="mission-inner">
            <div className="sec-tagline" style={{ justifyContent: "center" }}>
              <div className="line"></div>
              <p>Our Mission</p>
              <div className="line"></div>
            </div>
            <h2 className="mission-quote">
              "To empower businesses with digital solutions that drive
              growth, build trust, and deliver <span>measurable impact</span>."
            </h2>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="container">
          <div className="text-center">
            <div className="sec-tagline" style={{ justifyContent: "center" }}>
              <div className="line"></div>
              <p>Our Values</p>
              <div className="line"></div>
            </div>
            <h2 className="sec-title">What We <span>Stand For</span></h2>
            <p className="values-desc">
              These principles guide everything we do and define how we work.
            </p>
          </div>

          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card" key={i}>
                <span className="value-num">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <div className="value-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta-bg"></div>
        <div className="container text-center" style={{ position: "relative", zIndex: 1 }}>
          <div className="sec-tagline" style={{ justifyContent: "center" }}>
            <div className="line"></div>
            <p>Let's Connect</p>
            <div className="line"></div>
          </div>
          <h2 className="sec-title">Let's Work <span>Together</span></h2>
          <p className="about-cta-desc">
            Ready to elevate your digital presence?
            Let's talk strategy, growth, and results.
          </p>
          <div className="about-cta-actions">
            <Link to="/contact" className="thm-btn">
              Get In Touch <span>&#8594;</span>
            </Link>
            <a href="tel:+918209978891" className="about-cta-phone">
              Call us: <strong>+91 8209978891</strong>
            </a>
          </div>
          <p className="about-cta-note">Free consultation &bull; No obligation &bull; Fast response</p>
        </div>
      </section>
    </div>
  );
};

export default About;
