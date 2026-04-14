import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
import "./BlogPost.css";

const blogData = {
  "veloura-jewels-ecommerce-store": {
    title: "How We Built a Premium Jewelry E-Commerce Store for Veloura Jewels",
    category: "E-Commerce",
    date: "March 28, 2025",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1200&q=80",
    client: "Veloura Jewels",
    clientLink: "https://velourajewels.in",
    content: [
      { type: "paragraph", text: "When Veloura Jewels approached us, they had a stunning collection of BIS hallmarked 925 sterling silver jewelry, lab-grown gemstones, and 18K gold-plated pieces — but no digital storefront to match their brand's elegance. They needed more than just a website; they needed a premium online shopping experience that would make customers feel the luxury through their screens." },
      { type: "heading", text: "The Challenge" },
      { type: "paragraph", text: "The jewelry market is fiercely competitive online. Veloura needed to stand out with a store that communicated quality, craftsmanship, and trust — while making it effortless for customers to browse through rings, earrings, necklaces, and bracelets. They also needed gift set functionality and personalized gifting services integrated seamlessly." },
      { type: "heading", text: "Our Approach" },
      { type: "list", items: [
        "Designed a warm, elegant UI with neutral tones that let the jewelry photography take center stage",
        "Built collection-based navigation so customers could shop by category or occasion",
        "Implemented secure payment integration with multiple gateway support",
        "Created gift set pages with personalized gifting options and premium packaging highlights",
        "Optimized every product page for mobile — since 70%+ of jewelry shoppers browse on phones",
        "Added trust signals: BIS hallmark badges, exchange policy details, and customer testimonials"
      ]},
      { type: "heading", text: "The Results" },
      { type: "paragraph", text: "Within the first quarter of launch, Veloura Jewels saw a 55% increase in online sales. Their average session duration nearly doubled, and the repeat buyer rate climbed to 40%. The gift set feature alone contributed to 18% of total revenue during the festive season." },
      { type: "quote", text: "Shape-360 built a store that truly reflects our brand's elegance. Our customers love the shopping experience.", author: "Veloura Team" },
      { type: "heading", text: "Key Takeaway" },
      { type: "paragraph", text: "For luxury e-commerce, the website IS the brand. Every pixel, every interaction, every page load contributes to perceived value. Investing in premium UI/UX design isn't a cost — it's a multiplier for your average order value and customer lifetime value." },
    ],
  },
  "kedar-shakti-shopify-store": {
    title: "Scaling a Spiritual Brand Online: The Kedar Shakti Shopify Story",
    category: "Shopify",
    date: "March 18, 2025",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    client: "Kedar Shakti",
    clientLink: "https://kedarshakti.com",
    content: [
      { type: "paragraph", text: "Kedar Shakti is a spiritual wellness brand based in New Delhi, offering premium incense, healing crystals, puja samagri, and candles. Their products are rooted in Hindu traditions, crafted with natural ingredients, and designed for daily spiritual practice. They came to us needing a Shopify store that honored their cultural authenticity while scaling their business online." },
      { type: "heading", text: "The Challenge" },
      { type: "paragraph", text: "Selling spiritual products online requires a delicate balance — the store must feel sacred and authentic, not commercial. Additionally, Kedar Shakti wanted to serve both individual customers and corporate clients through bulk ordering for temples and events. The product range spanning fragrances, crystals, candles, and accessories needed intuitive categorization." },
      { type: "heading", text: "Our Solution" },
      { type: "list", items: [
        "Built a custom Shopify theme with earth tones and spiritual imagery reflecting Hindu traditions",
        "Created five main product categories with sub-categorization for easy browsing",
        "Implemented combo pack functionality for 'Daily Puja Essentials' bundles",
        "Added a corporate bulk ordering system for temples and events",
        "Integrated UPI, cards, and net banking payment options for the Indian market",
        "Highlighted free shipping threshold (₹600+) to increase average order value",
        "Added Sanskrit mantras and cultural elements in the footer for brand authenticity"
      ]},
      { type: "heading", text: "The Impact" },
      { type: "paragraph", text: "Online orders tripled within two months. The combo pack feature drove 30% higher average order values, and the corporate bulk ordering channel opened an entirely new revenue stream — contributing to 200+ corporate orders in the first six months." },
      { type: "quote", text: "Shape-360 understood our spiritual brand deeply. The store drives real sales — our corporate bulk orders have been a game changer.", author: "Kedar Shakti Team" },
      { type: "heading", text: "Lesson Learned" },
      { type: "paragraph", text: "Niche e-commerce brands succeed when the store design speaks the customer's language. For Kedar Shakti, that meant honoring tradition while making buying effortless. Cultural authenticity isn't a design constraint — it's a competitive advantage." },
    ],
  },
  "staylia-dxb-dubai-rental-platform": {
    title: "Why Dubai Rental Investors Need a Professional Web Presence",
    category: "Web Development",
    date: "March 8, 2025",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80",
    client: "Staylia DXB",
    clientLink: "https://stayliadxb.com",
    content: [
      { type: "paragraph", text: "Dubai's short-term rental market is booming — but most rental management companies look identical online. Staylia DXB came to us with a clear differentiator: they're investors themselves, with 8-figure real estate equity and nearly 100 years of family investment experience. They needed a website that would make high-net-worth property investors trust them immediately." },
      { type: "heading", text: "The Challenge" },
      { type: "paragraph", text: "Staylia DXB manages holiday homes across Airbnb, Booking.com, VRBO, and Expedia. Their target audience isn't casual tourists — it's property investors seeking maximum rental income from their Dubai Marina, Palm Jumeirah, Downtown, and Business Bay apartments. The website needed to speak investor language: ROI, occupancy rates, transparency, data." },
      { type: "heading", text: "What We Built" },
      { type: "list", items: [
        "A data-driven homepage showcasing 85%+ occupancy rates and 4.9-star guest ratings upfront",
        "Interactive 6-step management process breakdown with visual storytelling",
        "Investor dashboard previews showing real-time performance tracking capabilities",
        "Property showcase sections with multi-platform distribution highlights",
        "Trust-building content: investor-to-investor messaging, transparent reporting promises",
        "Lead capture optimized for high-net-worth individuals with qualification questions",
        "Dynamic pricing section explaining their daily rate optimization strategy"
      ]},
      { type: "heading", text: "Results" },
      { type: "paragraph", text: "Within 90 days, newly onboarded properties through the website saw 20-35% rental income increases. The professional web presence helped Staylia DXB position themselves as the premium choice in Dubai's competitive rental management space." },
      { type: "quote", text: "Shape-360 built a website that speaks directly to investors. The quality and professionalism have helped us onboard premium properties.", author: "Staylia DXB Team" },
      { type: "heading", text: "The Bottom Line" },
      { type: "paragraph", text: "In high-ticket B2B markets like property management, your website is your first meeting with the client. It needs to exude the same professionalism you bring to managing their investment. A generic template won't cut it — custom, data-driven design converts." },
    ],
  },
  "kvs-academy-education-platform": {
    title: "Building an EdTech Website That Converts: Lessons from KVS Academy",
    category: "Education",
    date: "February 26, 2025",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
    client: "KVS Academy",
    clientLink: "https://www.kvsacademy.org",
    content: [
      { type: "paragraph", text: "Education is one of the most competitive markets online. Parents and students research multiple coaching institutes before making a decision, and often the website is the deciding factor. KVS Academy came to us needing a professional digital presence that could convert website visitors into enrolled students." },
      { type: "heading", text: "The Problem" },
      { type: "paragraph", text: "KVS Academy had great faculty and impressive results, but their online presence didn't reflect it. Students were finding them through word-of-mouth, but losing them at the website stage. The site needed to be informative, fast, mobile-friendly, and — most importantly — trust-building." },
      { type: "heading", text: "Our Strategy" },
      { type: "list", items: [
        "Designed a clean, structured layout with clear course listings and fee information",
        "Created dedicated faculty profile pages to build trust and credibility",
        "Built a results showcase section highlighting student achievements and testimonials",
        "Implemented mobile-first responsive design — 70% of their traffic was mobile",
        "Optimized page load time to under 2 seconds for all pages",
        "Added SEO-optimized course pages targeting local search keywords",
        "Integrated a quick inquiry form on every major page for instant lead capture"
      ]},
      { type: "heading", text: "The Outcome" },
      { type: "paragraph", text: "Student inquiries tripled after the website launch. The bounce rate dropped by 45%, and the average session duration increased by 2.5x — meaning visitors were actually reading content and exploring courses instead of leaving immediately." },
      { type: "quote", text: "Shape-360 understood our vision and delivered a website that truly represents our academy's quality and values.", author: "KVS Academy Management" },
      { type: "heading", text: "What EdTech Can Learn" },
      { type: "paragraph", text: "In education, trust is everything. Your website needs to answer three questions instantly: What do you teach? What results have you achieved? How do I get started? If visitors can't find these answers within 10 seconds, they're gone." },
    ],
  },
  "zeqon-saas-website": {
    title: "How to Design a SaaS Website That Generates 5x More Leads",
    category: "SaaS",
    date: "February 14, 2025",
    readTime: "9 min read",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    client: "Zeqon",
    clientLink: "https://zeqon.co",
    content: [
      { type: "paragraph", text: "SaaS websites live or die by their conversion rate. Zeqon had a solid product but their website wasn't communicating it effectively. Visitors were landing on the site, reading vague descriptions, and leaving without taking any action. They needed a complete website overhaul focused on one thing: generating qualified leads." },
      { type: "heading", text: "The Challenge" },
      { type: "paragraph", text: "Most SaaS websites fall into the same trap: feature-dumping. They list every feature without explaining why it matters. Zeqon's previous site had this exact problem — technically accurate but emotionally flat. We needed to transform features into stories, and stories into conversions." },
      { type: "heading", text: "The Redesign Strategy" },
      { type: "list", items: [
        "Led with outcomes, not features — 'Save 10 hours/week' instead of 'Task automation module'",
        "Built a sleek, dark-themed design with GSAP scroll animations for premium feel",
        "Created interactive demo sections where visitors could see the product in action",
        "Designed a pricing table with clear tier differentiation and annual/monthly toggle",
        "Added social proof: customer logos, testimonial carousel, and case study snippets",
        "Implemented CRM-integrated lead capture with smart form fields",
        "Set up analytics tracking on every CTA to measure conversion funnel performance"
      ]},
      { type: "heading", text: "The Numbers" },
      { type: "paragraph", text: "Lead generation increased by 5x within the first two months. The bounce rate dropped by 68%, average session time jumped to 4.2 minutes (from 1.1 minutes), and organic traffic grew by 180% thanks to improved SEO structure." },
      { type: "quote", text: "The website perfectly communicates what Zeqon does. We've seen a massive jump in qualified leads since launch.", author: "Zeqon Team" },
      { type: "heading", text: "SaaS Website Playbook" },
      { type: "paragraph", text: "The formula is simple: Lead with value. Show, don't tell. Make the next step obvious. Every section of your SaaS website should answer one question: 'Why should I care?' If a section doesn't move the visitor closer to signing up, it shouldn't exist." },
    ],
  },
  "jaldiride-connect-transport-platform": {
    title: "Building Smart Transport Platforms: Inside the JaldiRide Connect Project",
    category: "Web App",
    date: "February 3, 2025",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
    client: "JaldiRide Connect",
    clientLink: "https://www.jaldirideconnect.com",
    content: [
      { type: "paragraph", text: "Local transportation in India's tier-2 and tier-3 cities is fragmented. Auto-rickshaws, local cabs, and mini-buses operate independently with no unified booking system. JaldiRide Connect set out to change that — and they needed a web platform that could serve as both a rider booking interface and a driver onboarding tool." },
      { type: "heading", text: "The Challenge" },
      { type: "paragraph", text: "Building for local transport in India means designing for diverse users: tech-savvy riders, first-time smartphone users, and drivers who may not be comfortable with complex interfaces. The platform needed to be dead simple, blazing fast on slow connections, and available across three vehicle types: autos, cars, and buses." },
      { type: "heading", text: "How We Built It" },
      { type: "list", items: [
        "Designed a minimal, intuitive UI with large tap targets for mobile users",
        "Built vehicle category showcases with clear pricing and availability indicators",
        "Created separate driver onboarding flows with simple multi-step forms",
        "Implemented responsive design that works smoothly on budget Android devices",
        "Integrated Maps API for route visualization and distance estimation",
        "Optimized for slow 3G/4G connections common in smaller cities",
        "Built a city expansion framework — easy to add new cities without redesign"
      ]},
      { type: "heading", text: "The Impact" },
      { type: "paragraph", text: "The platform hit 10,000+ monthly visits within three months of launch. Driver signups doubled compared to their previous onboarding process, and the multi-vehicle category approach helped them target 50+ cities across India." },
      { type: "quote", text: "Shape-360 brought our transport vision to life. The platform is fast, clean, and exactly what our users needed.", author: "JaldiRide Team" },
      { type: "heading", text: "Building for Bharat" },
      { type: "paragraph", text: "When designing for India's next billion users, simplicity wins. Every extra click, every heavy image, every confusing label is a potential drop-off. The best tech platforms for emerging markets aren't the most feature-rich — they're the most frictionless." },
    ],
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogData[slug];

  useEffect(() => {
    if (post) {
      const ctx = gsap.context(() => {
        gsap.fromTo(".bp-hero-content > *",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" }
        );
      });
      return () => ctx.revert();
    }
  }, [post]);

  if (!post) {
    return (
      <div className="bp-not-found">
        <div className="container text-center">
          <h1>Article Not Found</h1>
          <p>The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="thm-btn">Back to Blog <span>&#8594;</span></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <Helmet>
        <title>{post.title} | Shape-360 Blog</title>
        <meta name="description" content={post.content[0]?.text?.substring(0, 160)} />
      </Helmet>

      {/* Hero */}
      <section className="bp-hero">
        <div className="bp-hero-img">
          <img src={post.img} alt={post.title} loading="eager" />
          <div className="bp-hero-overlay"></div>
        </div>
        <div className="container bp-hero-content">
          <Link to="/blog" className="bp-back">&#8592; Back to Blog</Link>
          <div className="bp-meta">
            <span className="bp-category">{post.category}</span>
            <span className="bp-dot">&bull;</span>
            <span>{post.date}</span>
            <span className="bp-dot">&bull;</span>
            <span>{post.readTime}</span>
          </div>
          <h1>{post.title}</h1>
          {post.clientLink && (
            <a href={post.clientLink} target="_blank" rel="noreferrer" className="bp-client-link">
              View Live: {post.client} <span>&#8594;</span>
            </a>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="bp-content">
        <div className="container">
          <article className="bp-article">
            {post.content.map((block, i) => {
              if (block.type === "paragraph") {
                return <p key={i}>{block.text}</p>;
              }
              if (block.type === "heading") {
                return <h2 key={i}>{block.text}</h2>;
              }
              if (block.type === "list") {
                return (
                  <ul key={i}>
                    {block.items.map((item, j) => (
                      <li key={j}><span className="bp-check">&#10003;</span>{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote key={i}>
                    <p>"{block.text}"</p>
                    <cite>— {block.author}</cite>
                  </blockquote>
                );
              }
              return null;
            })}
          </article>

          {/* CTA */}
          <div className="bp-cta">
            <h3>Want Similar Results for Your Business?</h3>
            <p>Let's discuss your project and create something extraordinary together.</p>
            <div className="bp-cta-actions">
              <Link to="/contact" className="thm-btn">
                Start Your Project <span>&#8594;</span>
              </Link>
              <Link to="/case-studies" className="bp-cta-link">
                View All Case Studies <span>&#8594;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
