import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
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
  const horizontalRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* About big text parallax */
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

      /* Text reveal animations */
      document.querySelectorAll(".text-reveal").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" }
          }
        );
      });

      /* Image reveal animations */
      document.querySelectorAll(".img-reveal").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(100% 0 0 0)", scale: 1.2 },
          { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.2, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" }
          }
        );
      });

      /* Service items */
      gsap.fromTo(".service-item",
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".services-section", start: "top 70%" }
        }
      );

      /* Horizontal scroll portfolio */
      if (horizontalRef.current) {
        const scrollContainer = horizontalRef.current;
        const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        gsap.to(scrollContainer, {
          scrollLeft: scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: ".hscroll-section",
            start: "top top",
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });
      }

      /* Landing page cards */
      gsap.fromTo(".landing-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".landing-section", start: "top 70%" }
        }
      );

      /* Process cards */
      gsap.fromTo(".process-card",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".process-section", start: "top 70%" }
        }
      );

      /* Why cards */
      gsap.fromTo(".why-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".why-section", start: "top 70%" }
        }
      );

      /* Testimonials */
      gsap.fromTo(".testimonial-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: ".testimonials-section", start: "top 70%" }
        }
      );

      /* CTA */
      gsap.fromTo(".cta-inner > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: ".cta-section", start: "top 75%" }
        }
      );

      /* Parallax background elements */
      gsap.to(".counter-big-text", {
        y: -80,
        scrollTrigger: {
          trigger: ".counter-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".about-big-text-left", {
        y: -60,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".about-big-text-right", {
        y: 60,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const heroSlides = [
    {
      tagline: "Digital Growth Partner",
      title: <>360° Solutions <br /><span className="italic text-gradient">That Drive</span> Growth</>,
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      bgImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=85",
    },
    {
      tagline: "Premium Web Development",
      title: <>We Build <br /><span className="italic text-gradient">Digital</span> Experiences</>,
      img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
      bgImg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=85",
    },
    {
      tagline: "Performance Marketing",
      title: <>Ads That <br /><span className="italic text-gradient">Actually</span> Convert</>,
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
    { title: "KVS Academy", category: "Web Development", link: "https://www.kvsacademy.org", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80", desc: "Complete educational platform with course listings, student portal, and responsive design for a leading academy." },
    { title: "Veloura Jewels", category: "E-Commerce Website", link: "https://velourajewels.in", img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&q=80", desc: "Premium e-commerce store for handcrafted jewelry with elegant UI, product catalog, and secure payments." },
    { title: "Kedar Shakti", category: "Shopify Store", link: "https://kedarshakti.com", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", desc: "Spiritual e-commerce brand with Shopify store, product categorization, and optimized checkout flow." },
    { title: "Zeqon", category: "SaaS Website", link: "https://zeqon.co", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", desc: "Modern SaaS company website with sleek design, feature showcases, and lead generation funnel." },
    { title: "Staylia DXB", category: "Web Development", link: "https://stayliadxb.com", img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80", desc: "Dubai-based rental management platform with property listings, investor dashboards, and booking system." },
    { title: "JaldiRide Connect", category: "Web App", link: "https://www.jaldirideconnect.com", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80", desc: "Smart local transport platform connecting riders with autos, cars, and buses across cities." },
  ];

  const whyUs = [
    { title: "Custom-Built Solutions", desc: "No templates. Every solution is crafted from scratch to match your brand and goals.", icon: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80" },
    { title: "Conversion-Focused Design", desc: "Every pixel is optimized to turn visitors into paying customers and maximize ROI.", icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
    { title: "Transparent Communication", desc: "Clear updates, honest feedback, and complete visibility at every stage of the project.", icon: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80" },
    { title: "Long-Term Partnership", desc: "We don't stop at launch — we grow, optimize, and scale with you for the long run.", icon: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80" },
  ];

  const testimonials = [
    { text: "Shape-360 built a stunning e-commerce store that truly reflects our brand's elegance. Our online sales jumped 55% within the first quarter.", name: "Veloura Team", role: "Founders, Veloura Jewels", stars: 5 },
    { text: "The Shopify store they built for us handles everything — from individual orders to corporate bulk gifting. Our online orders have tripled.", name: "Kedar Shakti Team", role: "Founders, Kedar Shakti", stars: 5 },
    { text: "Shape-360 delivered a premium website that speaks directly to property investors. The quality and professionalism helped us onboard high-value clients.", name: "Staylia Team", role: "Founders, Staylia DXB", stars: 5 },
    { text: "Our academy website now drives 3x more student inquiries. Shape-360 understood our vision and delivered a fast, mobile-friendly platform.", name: "KVS Academy Team", role: "Management, KVS Academy", stars: 5 },
  ];

  const brands = ["KVS Academy", "Veloura Jewels", "Kedar Shakti", "Zeqon", "Staylia DXB", "JaldiRide", "MindMint Media", "SkillOwl", "FolkLane", "Pawan Hardu", "Krishi Global", "KVS Academy", "Veloura Jewels", "Kedar Shakti", "Zeqon"];

  return (
    <div className="home">
      <Helmet>
        <title>Shape-360 | Premium Digital Agency</title>
        <meta name="description" content="Shape-360 — 360° Digital Solutions That Drive Real Business Growth. Websites, design, advertising, and digital support." />
      </Helmet>

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
              <h2 className="sec-title text-reveal">
                We create premium digital <br />
                solutions & bold strategies for <br />
                your business <span>growth</span>
              </h2>
              <p className="about-desc text-reveal">
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
      <section className="services-section dot-grid">
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

      {/* ================= HORIZONTAL SCROLL PORTFOLIO ================= */}
      <section className="hscroll-section">
        <div className="hscroll-header">
          <div className="container">
            <div className="projects-top">
              <div>
                <div className="sec-tagline">
                  <p>Our Portfolio</p>
                  <div className="line"></div>
                </div>
                <h2 className="sec-title">Latest <span>Showcase</span></h2>
              </div>
              <Link to="/case-studies" className="thm-btn">
                View All Projects <span>&#8594;</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="hscroll-track" ref={horizontalRef}>
          <div className="hscroll-cards">
            {projects.map((project, i) => (
              <a href={project.link} target="_blank" rel="noreferrer" className="hscroll-card tilt-card" key={i}>
                <div className="hscroll-card-img">
                  <img src={project.img} alt={project.title} />
                  <div className="hscroll-card-overlay">
                    <span className="project-view">View Live &#8594;</span>
                  </div>
                </div>
                <div className="hscroll-card-info">
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LANDING PAGES SHOWCASE ================= */}
      <section className="landing-section">
        <div className="container">
          <div className="landing-header">
            <div>
              <div className="sec-tagline">
                <p>Landing Pages</p>
                <div className="line"></div>
              </div>
              <h2 className="sec-title">High-Converting <span>Landing Pages</span></h2>
            </div>
            <p className="landing-subtitle">
              Single-page designs built to capture leads, tell stories, and drive action.
            </p>
          </div>
          <div className="landing-grid">
            {[
              { title: "MindMint Media", category: "Digital Marketing Agency", link: "https://mindmintmedia.in", img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&q=80", desc: "Bold agency landing page with service showcases and lead capture." },
              { title: "SkillOwl", category: "EdTech Platform", link: "https://skillowl.in", img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80", desc: "Clean educational platform landing page with course highlights and CTAs." },
              { title: "FolkLane", category: "Creative Agency", link: "https://www.folklane.in", img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80", desc: "Full-service agency page with pricing tiers, portfolio, and brand identity." },
              { title: "Pawan Hardu", category: "Video Editor Portfolio", link: "https://pawanhardu.org", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80", desc: "Cinematic portfolio for a video editor with 70M+ views and 300+ projects." },
              { title: "Krishi Global Industries", category: "Agri Export Company", link: "https://krishiglobalindustries.com", img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80", desc: "Premium agricultural export landing page showcasing farm-direct spices, rice, and global trade services." },
            ].map((lp, i) => (
              <a href={lp.link} target="_blank" rel="noreferrer" className="landing-card tilt-card glow-border" key={i}>
                <div className="landing-card-img">
                  <img src={lp.img} alt={lp.title} loading="lazy" />
                  <div className="landing-card-overlay">
                    <span className="landing-card-view">View Live &#8594;</span>
                  </div>
                </div>
                <div className="landing-card-info">
                  <span className="landing-card-tag">{lp.category}</span>
                  <h3>{lp.title}</h3>
                  <p>{lp.desc}</p>
                </div>
              </a>
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
      <section className="process-section dot-grid">
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
