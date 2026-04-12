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
    title: "How to Choose the Right Shopify Theme for Your Business",
    excerpt: "Selecting the perfect Shopify theme can make or break your online store. Here's our comprehensive guide to picking the right one based on your business needs.",
    category: "E-Commerce",
    date: "March 15, 2025",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Meta Ads vs Google Ads: Which One is Right for You?",
    excerpt: "Both platforms offer powerful advertising capabilities, but the right choice depends on your goals, audience, and budget. Let's break it down.",
    category: "Digital Marketing",
    date: "March 8, 2025",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    featured: true,
  },
  {
    id: 3,
    title: "10 Website Design Trends That Will Dominate 2025",
    excerpt: "From AI-powered personalization to immersive 3D experiences, here are the design trends shaping the future of web development.",
    category: "Design",
    date: "February 28, 2025",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
  },
  {
    id: 4,
    title: "Why Your Business Needs a Performance-Focused Website",
    excerpt: "A slow website costs you customers. Learn why performance optimization should be your top priority and how to achieve it.",
    category: "Web Development",
    date: "February 20, 2025",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  },
  {
    id: 5,
    title: "The Complete Guide to SEO for Small Businesses",
    excerpt: "SEO doesn't have to be complicated. Here's a practical, step-by-step guide to getting your small business found on Google.",
    category: "SEO",
    date: "February 12, 2025",
    readTime: "10 min read",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: 6,
    title: "Building Trust Through Transparent Communication with Clients",
    excerpt: "How we maintain transparent communication with every client and why it's the foundation of long-term partnerships.",
    category: "Business",
    date: "February 5, 2025",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
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
              <Link to="/contact" className="blog-featured-card" key={post.id}>
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
              <Link to="/contact" className="blog-card" key={post.id}>
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
