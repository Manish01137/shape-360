import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger);

/* ================= ANIMATED COUNTER ================= */
const Counter = ({ value, label, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const end = parseInt(value);
          const duration = 1500;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [value]);

  return (
    <div className="counter-single" ref={ref}>
      <div className="counter-border"></div>
      <div className="counter-content">
        <h2>{count}<span className="counter-suffix">{suffix}</span></h2>
        <p>{label}</p>
      </div>
    </div>
  );
};

/* ================= HOME ================= */
const Home = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-big-text-left",
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 0.06, duration: 1.5, ease: "power2.out",
          scrollTrigger: { trigger: ".about-section", start: "top 80%" }
        }
      );
      gsap.fromTo(".about-big-text-right",
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 0.06, duration: 1.5, ease: "power2.out",
          scrollTrigger: { trigger: ".about-section", start: "top 80%" }
        }
      );
      gsap.fromTo(".service-item",
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".services-section", start: "top 70%" }
        }
      );
      gsap.fromTo(".process-card",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".process-section", start: "top 70%" }
        }
      );
      gsap.fromTo(".project-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".projects-section", start: "top 70%" }
        }
      );
      gsap.fromTo(".why-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".why-section", start: "top 70%" }
        }
      );
      gsap.fromTo(".testimonial-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: ".testimonials-section", start: "top 70%" }
        }
      );
      gsap.fromTo(".cta-inner > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".cta-section", start: "top 75%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const heroSlides = [
    {
      tagline: "Digital Growth Partner",
      title: <>360° Solutions <br /><span className="italic">That Drive</span> Growth</>,
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      bgImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=85",
    },
    {
      tagline: "Premium Web Development",
      title: <>We Build <br /><span className="italic">Digital</span> Experiences</>,
      img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
      bgImg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=85",
    },
    {
      tagline: "Performance Marketing",
      title: <>Ads That <br /><span className="italic">Actually</span> Convert</>,
      img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
      bgImg: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1920&q=85",
    },
  ];

  const services = [
    { num: "01", title: "Website Development", desc: "High-performance custom websites built for speed, security and scalability." },
    { num: "02", title: "Shopify Stores", desc: "Conversion-focused Shopify stores with premium UI and full setup." },
    { num: "03", title: "WordPress Development", desc: "Business websites & blogs with maintenance, security and optimization." },
    { num: "04", title: "Meta Ads", desc: "Facebook & Instagram ads with precise targeting that convert." },
    { num: "05", title: "Google Ads", desc: "Search & performance campaigns designed to maximize ROI." },
    { num: "06", title: "Account Management", desc: "Dedicated support with continuous monitoring and optimization." },
  ];

  const process = [
    { step: "01", title: "Discover", desc: "Deep dive into your business, goals, and competition to craft the perfect strategy.", icon: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80" },
    { step: "02", title: "Build", desc: "Meticulous attention to detail as we bring your vision to life.", icon: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80" },
    { step: "03", title: "Launch", desc: "Comprehensive testing and optimization for peak performance.", icon: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80" },
    { step: "04", title: "Scale", desc: "Continuous improvement and growth strategies to maximize success.", icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
  ];

  const projects = [
    { title: "UrbanKart E-Commerce", category: "Shopify Development", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80", desc: "Complete Shopify store with custom theme, payment integration and 40% conversion boost." },
    { title: "FinEdge Solutions", category: "Web Development", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", desc: "Custom financial dashboard with real-time data visualization and secure user portal." },
    { title: "StyleNest Fashion", category: "Meta Ads Campaign", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80", desc: "Instagram & Facebook ad campaign that drove 3x ROAS in the first month." },
    { title: "BloomWell Wellness", category: "WordPress + SEO", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80", desc: "Complete WordPress website with SEO optimization, ranking page 1 in 90 days." },
    { title: "TechPulse SaaS", category: "Google Ads", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80", desc: "Performance max campaign generating 200+ qualified leads per month at $12 CPA." },
    { title: "GreenLeaf Organics", category: "Branding + Website", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80", desc: "Full brand identity and e-commerce website with 25% increase in online orders." },
  ];

  const whyUs = [
    { title: "Custom-Built Solutions", desc: "No templates. Every solution is crafted from scratch to match your brand and goals.", icon: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80" },
    { title: "Conversion-Focused Design", desc: "Every pixel is optimized to turn visitors into paying customers and maximize ROI.", icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
    { title: "Transparent Communication", desc: "Clear updates, honest feedback, and complete visibility at every stage of the project.", icon: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80" },
    { title: "Long-Term Partnership", desc: "We don't stop at launch — we grow, optimize, and scale with you for the long run.", icon: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80" },
  ];

  const testimonials = [
    { text: "Shape-360 has been a game-changer for our business. Their Google Ads strategy consistently delivers quality leads and strong ROI.", name: "Rohit Sharma", role: "Founder, UrbanKart", stars: 5 },
    { text: "Their conversion-focused design approach significantly improved our website performance. Results were visible within weeks.", name: "Neha Gupta", role: "Marketing Head, StyleNest", stars: 5 },
    { text: "Weekly reports, clear communication, and strong execution made Shape-360 a reliable long-term partner for us.", name: "Aman Verma", role: "Co-Founder, FinEdge Solutions", stars: 5 },
    { text: "We wanted a digital partner, not just an agency. Shape-360 delivered beyond expectations and continues to support our growth.", name: "Pooja Mehta", role: "Owner, BloomWell Wellness", stars: 5 },
  ];

  const brands = ["UrbanKart", "StyleNest", "FinEdge", "BloomWell", "TechPulse", "GreenLeaf", "UrbanKart", "StyleNest", "FinEdge", "BloomWell", "TechPulse", "GreenLeaf"];

  return (
    <div className="home">

      {/* ================= HERO SLIDER ================= */}
      <section className="hero-section">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          speed={1400}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="hero-swiper"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="hero-slide">
                <div className="hero-slide-bg" style={{ backgroundImage: `url(${slide.bgImg})` }}></div>
                <div className="hero-bg-overlay"></div>
                <div className="container hero-content">
                  <div className="hero-text">
                    <div className="hero-social-row">
                      <a href="https://www.instagram.com/shape360official" target="_blank" rel="noreferrer">Ig.</a>
                      <a href="https://www.facebook.com/share/1AmwEewBMn/" target="_blank" rel="noreferrer">Fb.</a>
                    </div>
                    <div className="sec-tagline">
                      <div className="line"></div>
                      <p>{slide.tagline}</p>
                    </div>
                    <h1 className="hero-title">{slide.title}</h1>
                    <div className="hero-actions">
                      <Link to="/contact" className="thm-btn">
                        Get Started <span>&#8594;</span>
                      </Link>
                      <Link to="/services" className="hero-link">
                        Our Services <span>&#8594;</span>
                      </Link>
                    </div>
                  </div>
                  <div className="hero-img-wrap">
                    <img src={slide.img} alt="Shape-360 digital services" className="hero-img" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hero-scroll-indicator">
          <span className="scroll-line"></span>
          <span className="scroll-text">Scroll</span>
        </div>
      </section>

      {/* ================= BRAND MARQUEE ================= */}
      <div className="brand-marquee">
        <div className="brand-marquee-track">
          {brands.map((name, i) => (
            <span key={i} className="brand-item">{name}</span>
          ))}
        </div>
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <section className="about-section">
        <div className="about-big-text-left"><h2>About</h2></div>
        <div className="about-big-text-right"><h2>Creative</h2></div>
        <div className="container">
          <div className="about-grid">
            <div className="about-img-col">
              <div className="about-img-wrap">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" alt="Shape-360 team at work" />
                <div className="about-img-badge">
                  <h3>2+</h3>
                  <p>Years of Excellence</p>
                </div>
              </div>
            </div>
            <div className="about-text-col">
              <div className="sec-tagline">
                <p>About Us</p>
                <div className="line"></div>
              </div>
              <h2 className="sec-title">
                We create premium digital <br />
                solutions & bold strategies for <br />
                your business <span>growth</span>
              </h2>
              <p className="about-desc">
                Shape-360 is a premium digital agency helping ambitious brands grow through
                strategy, performance, and creativity. We don't just build websites or run ads —
                we engineer digital experiences that convert visitors into loyal customers.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <span className="about-feature-num">70+</span>
                  <p>Projects Delivered</p>
                </div>
                <div className="about-feature">
                  <span className="about-feature-num">98%</span>
                  <p>Client Satisfaction</p>
                </div>
              </div>
              <Link to="/about" className="thm-btn">
                Explore More <span>&#8594;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section className="services-section">
        <div className="container">
          <div className="services-top">
            <div className="services-left">
              <div className="sec-tagline">
                <p>What We Do</p>
                <div className="line"></div>
              </div>
              <h2 className="sec-title">
                Agency Services <br />We <span>Provide</span>
              </h2>
              <p className="services-desc">
                From building your online presence to scaling your business —
                we handle every aspect of your digital growth with precision.
              </p>
            </div>
            <Link to="/services" className="thm-btn services-view-all">
              View All Services <span>&#8594;</span>
            </Link>
          </div>

          <div className="services-list">
            {services.map((item, i) => (
              <Link to="/services" className="service-item" key={i}>
                <div className="service-item-inner">
                  <div className="service-item-left">
                    <span className="service-num">{item.num}</span>
                    <h3 className="service-title">{item.title}</h3>
                  </div>
                  <div className="service-item-right">
                    <p>{item.desc}</p>
                    <span className="service-arrow">&#8594;</span>
                  </div>
                </div>
                <div className="service-item-overlay">
                  <span className="service-num">{item.num}</span>
                  <h3>{item.title}</h3>
                  <span className="service-overlay-link">View Details &#8594;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS / PORTFOLIO ================= */}
      <section className="projects-section">
        <div className="container">
          <div className="projects-top">
            <div>
              <div className="sec-tagline">
                <p>Our Portfolio</p>
                <div className="line"></div>
              </div>
              <h2 className="sec-title">Latest <span>Showcase</span></h2>
            </div>
            <Link to="/contact" className="thm-btn">
              Start Your Project <span>&#8594;</span>
            </Link>
          </div>

          <div className="projects-grid">
            {projects.map((project, i) => (
              <Link to="/contact" className="project-card" key={i}>
                <div className="project-img">
                  <img src={project.img} alt={project.title} />
                  <div className="project-overlay">
                    <span className="project-view">View Project &#8594;</span>
                  </div>
                </div>
                <div className="project-info">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COUNTER SECTION ================= */}
      <section className="counter-section">
        <div className="counter-big-text"><h2>Counters</h2></div>
        <div className="container">
          <div className="counter-grid">
            <Counter value="70" label="Projects Delivered" suffix="+" />
            <Counter value="20" label="Happy Clients" suffix="+" />
            <Counter value="2" label="Years Experience" suffix="+" />
            <Counter value="98" label="Client Satisfaction" suffix="%" />
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="why-section">
        <div className="container">
          <div className="why-top">
            <div className="why-left">
              <div className="sec-tagline">
                <p>Why Choose Us</p>
                <div className="line"></div>
              </div>
              <h2 className="sec-title">
                We're Different. <br />Here's <span>Why.</span>
              </h2>
              <p className="why-desc">
                We don't just build websites or run ads. We engineer digital
                experiences designed to convert, scale, and grow businesses long-term.
              </p>
              <div className="why-checks">
                {["Data-driven strategies", "Dedicated project manager", "Weekly progress reports", "No long-term contracts"].map((text, i) => (
                  <div key={i} className="why-check">
                    <span className="why-check-icon">&#10003;</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="thm-btn" style={{ marginTop: 40 }}>
                Learn More <span>&#8594;</span>
              </Link>
            </div>
            <div className="why-grid">
              {whyUs.map((item, i) => (
                <div className="why-card" key={i}>
                  <div className="why-card-img">
                    <img src={item.icon} alt={item.title} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESS SECTION ================= */}
      <section className="process-section">
        <div className="container">
          <div className="text-center">
            <div className="sec-tagline" style={{ justifyContent: "center" }}>
              <div className="line"></div>
              <p>Our Process</p>
              <div className="line"></div>
            </div>
            <h2 className="sec-title">How We Deliver <span>Results</span></h2>
            <p className="process-subtitle">
              A proven methodology that transforms your ideas into digital success stories.
            </p>
          </div>
          <div className="process-grid">
            {process.map((item, i) => (
              <div className="process-card" key={i}>
                <span className="process-step">{item.step}</span>
                <div className="process-card-img">
                  <img src={item.icon} alt={item.title} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-top">
            <div>
              <div className="sec-tagline">
                <p>Testimonials</p>
                <div className="line"></div>
              </div>
              <h2 className="sec-title">Our Expert <span>Clients</span></h2>
            </div>
            <Link to="/contact" className="thm-btn">
              Share Feedback <span>&#8594;</span>
            </Link>
          </div>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{ 768: { slidesPerView: 2 } }}
            loop
            className="testimonials-swiper"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="testimonial-card">
                  <div className="testimonial-quote">&#10077;</div>
                  <div className="testimonial-stars">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <span key={j}>&#9733;</span>
                    ))}
                  </div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= CTA MARQUEE ================= */}
      <div className="marquee-wrap cta-marquee">
        <div className="marquee-track">
          <span className="filled">Let's Work Together</span>
          <span>&#10038;</span>
          <span className="filled">Start Your Project</span>
          <span>&#10038;</span>
          <span className="filled">Let's Work Together</span>
          <span>&#10038;</span>
          <span className="filled">Start Your Project</span>
          <span>&#10038;</span>
        </div>
      </div>

      {/* ================= CTA SECTION ================= */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-inner text-center">
            <div className="sec-tagline" style={{ justifyContent: "center" }}>
              <div className="line"></div>
              <p>Ready to Grow?</p>
              <div className="line"></div>
            </div>
            <h2 className="sec-title">
              Let's Build Something <br />
              <span>Extraordinary</span> Together
            </h2>
            <p className="cta-text">
              Tell us about your project. We'll provide a free consultation and
              strategy tailored to your goals.
            </p>
            <div className="cta-actions">
              <Link to="/contact" className="thm-btn">
                Start Your Project <span>&#8594;</span>
              </Link>
              <a href="tel:+918209978891" className="cta-phone">
                Or call us: <strong>+91 8209978891</strong>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
