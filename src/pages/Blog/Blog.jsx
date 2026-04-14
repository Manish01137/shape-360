import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import "./Blog.css";

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: 1,
    slug: "veloura-jewels-ecommerce-store",
    title: "How We Built a Premium Jewelry E-Commerce Store for Veloura Jewels",
    excerpt: "From elegant product photography layouts to secure payment gateways — here's how we created a luxury online shopping experience for a sterling silver jewelry brand that drove 55% more sales.",
    category: "E-Commerce",
    date: "March 28, 2025",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    slug: "kedar-shakti-shopify-store",
    title: "Scaling a Spiritual Brand Online: The Kedar Shakti Shopify Story",
    excerpt: "How we helped a spiritual wellness brand launch on Shopify with product bundling, corporate bulk ordering, and a culturally authentic design that tripled their online orders.",
    category: "Shopify",
    date: "March 18, 2025",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    featured: true,
  },
  {
    id: 3,
    slug: "staylia-dxb-dubai-rental-platform",
    title: "Why Dubai Rental Investors Need a Professional Web Presence",
    excerpt: "Lessons from building Staylia DXB's investor-focused platform — how the right website can attract high-net-worth property investors and boost occupancy rates to 85%+.",
    category: "Web Development",
    date: "March 8, 2025",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
  },
  {
    id: 4,
    slug: "kvs-academy-education-platform",
    title: "Building an EdTech Website That Converts: Lessons from KVS Academy",
    excerpt: "How we designed an education platform that tripled student inquiries — with mobile-first design, fast load times, and SEO-optimized course pages for a coaching academy.",
    category: "Education",
    date: "February 26, 2025",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  },
  {
    id: 5,
    slug: "zeqon-saas-website",
    title: "How to Design a SaaS Website That Generates 5x More Leads",
    excerpt: "Our approach to building Zeqon's conversion-focused SaaS website — from animated feature sections and interactive demos to CRM-integrated lead capture that drove 180% traffic growth.",
    category: "SaaS",
    date: "February 14, 2025",
    readTime: "9 min read",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: 6,
    slug: "jaldiride-connect-transport-platform",
    title: "Building Smart Transport Platforms: Inside the JaldiRide Connect Project",
    excerpt: "How we developed a multi-modal transport web app connecting riders with autos, cars, and buses — designed for tier-2 cities with mobile-first UX and driver onboarding flows.",
    category: "Web App",
    date: "February 3, 2025",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
  },
];

const Blog = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-hero-content > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out" }
      );
      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: ".blog-grid", start: "top 80%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const featured = blogPosts.filter((p) => p.featured);
  const regular = blogPosts.filter((p) => !p.featured);

  return (
    <div className="blog-page">
      <Helmet>
        <title>Blog & Insights | Shape-360</title>
        <meta name="description" content="Digital marketing tips, web development insights, and business growth strategies from the Shape-360 team." />
      </Helmet>

      {/* HERO */}
      <section className="blog-hero">
        <div className="blog-hero-bg"></div>
        <div className="container blog-hero-content">
          <div className="sec-tagline">
            <div className="line"></div>
            <p>Blog & Insights</p>
            <div className="line"></div>
          </div>
          <h1 className="sec-title">
            Ideas, Tips & <br /><span>Insights</span>
          </h1>
          <p className="blog-hero-desc">
            Expert perspectives on digital marketing, web development,
            and business growth strategies.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="blog-featured">
        <div className="container">
          <div className="blog-featured-grid">
            {featured.map((post) => (
              <Link to={`/blog/${post.slug}`} className="blog-featured-card" key={post.id}>
                <div className="blog-featured-img">
                  <img src={post.img} alt={post.title} />
                  <div className="blog-featured-overlay">
                    <span className="blog-badge">Featured</span>
                  </div>
                </div>
                <div className="blog-featured-body">
                  <div className="blog-meta">
                    <span className="blog-category">{post.category}</span>
                    <span className="blog-date">{post.date}</span>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <span className="blog-read-more">
                    Read Article <span>&#8594;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ALL POSTS */}
      <section className="blog-all">
        <div className="container">
          <div className="blog-section-header">
            <h2 className="sec-title">Latest <span>Articles</span></h2>
          </div>
          <div className="blog-grid">
            {regular.map((post) => (
              <Link to={`/blog/${post.slug}`} className="blog-card" key={post.id}>
                <div className="blog-card-img">
                  <img src={post.img} alt={post.title} />
                </div>
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span className="blog-category">{post.category}</span>
                    <span className="blog-dot">&bull;</span>
                    <span className="blog-read-time">{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="blog-read-more">
                    Read More <span>&#8594;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="blog-cta">
        <div className="container text-center">
          <div className="blog-cta-inner">
            <div className="sec-tagline" style={{ justifyContent: "center" }}>
              <div className="line"></div>
              <p>Stay Updated</p>
              <div className="line"></div>
            </div>
            <h2 className="sec-title">Get Digital <span>Insights</span></h2>
            <p className="blog-cta-desc">
              Subscribe to receive the latest tips and strategies
              for growing your business online.
            </p>
            <div className="blog-subscribe">
              <input type="email" placeholder="Enter your email address" />
              <button className="thm-btn">Subscribe <span>&#8594;</span></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
