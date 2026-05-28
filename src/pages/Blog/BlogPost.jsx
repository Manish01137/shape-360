import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { gsap } from "gsap";
import { Helmet } from "react-helmet-async";
import "./BlogPost.css";

const blogData = {
  "worksaura-creative-designer-portfolio": {
    title: "Building a Cinematic Portfolio for a 3D & Graphic Designer: The WorkSaura Story",
    category: "Portfolio",
    date: "May 26, 2026",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
    client: "WorkSaura · New Delhi",
    clientLink: "https://worksaura.com",
    content: [
      { type: "paragraph", text: "Rahul is a New Delhi-based graphic and 3D designer with an unusually wide client base — DLF Healthcare, Omnist Techhub Solutions, VINR Skincare, Crew Solutions, Webslogin IT Services, Global Sports, APPSDIARY Technologies, Fashion Comfartz, Digital Python, and London Camera & Antique Auction. His work spans logo design, brand identity systems, packaging, marketing collateral, social media creatives, web and app UI, photo retouching, and video editing with 3D motion. When he came to Shape-360, the brief was disarmingly simple: 'build me a portfolio that does justice to all of it'. The execution was anything but simple — that's a half-dozen disciplines and a dozen industries, packed into one site." },
      { type: "heading", text: "The Challenge" },
      { type: "paragraph", text: "Most freelance designer portfolios fail in one of two predictable ways. The first is the Instagram grid — a wall of square thumbnails that flattens craft into uniform tiles and tells you nothing about the thinking behind any one project. The second is the Behance dump — endless scrolling case studies that all open with the same 'The Brief / The Process / The Result' template, leaving the viewer numb by project three. Rahul's work deserved neither. His brand identity for VINR Skincare, his packaging for Fashion Comfartz, and his motion reels for Token were each conceptually distinct — and the portfolio had to surface that distinction, not bury it under template parity." },
      { type: "paragraph", text: "There was also a positioning problem. Rahul charges premium rates for serious brand work, but his old site read like a beginner's marketplace profile — small thumbnails, generic copy, no signal of craft. Prospects were either bouncing or asking for hourly rates instead of project fees. The new site had to immediately reset the perceived tier, before a single project tile was clicked." },
      { type: "heading", text: "Our Approach" },
      { type: "list", items: [
        "Anchored the entire site in a cinematic Showcase Reel that auto-plays at the top — the moment a visitor lands, they're watching the work, not reading about it",
        "Built scroll-locked 'Behind The Work' sections where each major brand identity case unfolds as the user scrolls — DLF Healthcare, Omnist Techhub, VINR Skincare each get their own chapter",
        "Designed a 'Tools I Use Daily' module with proficiency bars across Photoshop, Illustrator, After Effects, Premiere Pro, Lightroom, Autodesk 3ds Max, Maya, KeyShot, and Movavi — proving range without listing it",
        "Crafted a 'Career Journey' timeline that grounds Rahul's craft in lived experience — education, early agency work, freelance growth, current premium engagements",
        "Curated a real client testimonials section quoting actual outcomes — modern, premium, on-time, on-brand",
        "Closed with a focused 'Work With Me' contact form that routes directly to email — no funnel, no qualification quiz, just a clean ask",
      ]},
      { type: "heading", text: "Design Philosophy" },
      { type: "paragraph", text: "We pushed hard on typography to do the heavy lifting. Bebas Neue and Bowlby One for impact moments — section headlines and reel titles. Inter for body, JetBrains Mono for tool labels. That pairing alone separates the site from every templated portfolio: the moment you scroll, the type system tells you this designer reads, this designer thinks. The color palette stays restrained — deep blacks with calibrated accent colors per case study — letting the work breathe instead of fighting it. Every section transitions with intent: nothing animates because it can; everything animates because it should." },
      { type: "heading", text: "Technical Foundations" },
      { type: "list", items: [
        "React + Vite for instant route transitions and sub-2-second initial load on broadband, sub-3.5 on 4G",
        "GSAP ScrollSmoother for cinematic scroll inertia — the foundation of the 'film, not folder' feel",
        "Framer Motion for component-level entry choreography — case study cards, tool bars, testimonial rotation",
        "Optimized asset pipeline: AVIF/WebP for stills, MP4/H.265 for reels with poster-frame previews, lazy-loaded below the fold",
        "Single-page architecture with sectioned anchors — every prospect link lands them on the exact case study, not a redirect chain",
        "Premium font stack — Bebas Neue, Bowlby One, Inter, JetBrains Mono — with proper font-display:swap to avoid layout shift",
      ]},
      { type: "heading", text: "Repositioning a Freelancer as a Studio" },
      { type: "paragraph", text: "The single biggest unlock wasn't a feature — it was perceived tier. The old site looked like a marketplace gig profile. The new site looks like a small premium studio. Same designer, same work, completely different first impression. The reel sets the tone in under three seconds. The typography reinforces it. The case study depth confirms it. By the time a prospect reaches the contact form, the question they're asking themselves has changed from 'how much per hour?' to 'is he available for our project?'. That shift is worth more than any animation." },
      { type: "heading", text: "The Results" },
      { type: "paragraph", text: "Inbound inquiries have changed both in volume and in quality. Casual rate-shoppers have largely dropped off — replaced by serious brand owners arriving with defined scopes and realistic budgets. The portfolio's tool-mastery section has organically become a hiring filter: founders who scroll past it without reading aren't typically the right fit, and the ones who pause on it usually arrive at the contact form ready to move. For Rahul, the operational change is simple but real — fewer wasted discovery calls, more aligned briefs, higher project values. The site is doing the qualifying he used to do manually." },
      { type: "quote", text: "Shape-360 turned my portfolio into a cinematic experience. The scroll animations, the showreel integration, and the way each client case is presented — it now feels like a film, not a folder. Client inquiries have changed from 'are you available?' to 'when can we start?'.", author: "Rahul, Founder · WorkSaura · New Delhi" },
      { type: "heading", text: "Key Takeaway" },
      { type: "paragraph", text: "For multi-disciplinary creatives — designers who do brand, motion, and 3D, or photographers who shoot fashion, food, and architecture — the portfolio's job is not to show everything. It's to show enough that the visitor stops asking 'can he do this?' and starts asking 'when can he start?'. That shift requires three things: a hero that asserts tier in the first three seconds, depth that rewards the visitors who care, and a contact path that respects the ones who are ready. WorkSaura is the proof — and it's the playbook for the next premium creative portfolio Shape-360 builds." },
    ],
  },
  "aksharam-ayurved-healthcare-platform": {
    title: "Designing a Digital Home for Authentic Ayurveda: The Aksharam Ayurved Story",
    category: "Healthcare",
    date: "May 18, 2026",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
    client: "Aksharam Ayurved · Ahmedabad",
    clientLink: "https://aksharamayurved.com",
    content: [
      { type: "paragraph", text: "Aksharam Ayurved is an authentic Ayurvedic clinic in Shahibaug, Ahmedabad, led by Vaidya Dolly — a practitioner with 9+ years of clinical experience, 5000+ patients treated across India and abroad, and over 2000 successful Panchakarma therapies on record. Their work spans classical Ayurveda in its purest form: Vamana, Virechana, Basti, Nasya, and Raktamokshana for systemic detoxification, Beij Shuddhi and Garbhadhana Sanskar for fertility, seasonal therapies that follow the rhythm of the year, and personalized chronic-care plans for PCOD, hypertension, diabetes, and obesity. When they approached Shape-360, the brief was deceptively simple: build a website that feels as authentic as the clinic — and converts." },
      { type: "heading", text: "The Challenge" },
      { type: "paragraph", text: "Ayurveda websites tend to fail in two opposite directions. Some try to look ultra-modern and end up feeling like generic SaaS — stripped of the cultural weight that makes Ayurveda credible. Others lean so hard into traditional imagery that they look like brochures from the 1990s. Aksharam needed neither. The brand had to feel sacred, serene, and clinically trustworthy — the visual equivalent of stepping into a calm consultation room with Vaidya Dolly herself." },
      { type: "paragraph", text: "Their patient base was also unusually wide. Local Ahmedabad walk-ins, returning patients across India, and an international diaspora in the UK, USA, Canada, and UAE who book tele-consultations and receive medicine deliveries globally. The same homepage had to comfort an anxious chronic-condition patient, inform a couple researching fertility programs, and pre-qualify an international visitor evaluating whether a Bangalore-time Zoom call with an Indian Vaidya was worth their evening. Healthcare trust signals had to be uncompromising — practitioner credibility, real patient outcomes, and unambiguous appointment booking." },
      { type: "heading", text: "Our Approach" },
      { type: "list", items: [
        "Opened the homepage with Vaidya Dolly's authority front-loaded — 9+ years of practice, 2000+ Panchakarma therapies, 170+ five-star reviews, 5000+ patients — anchored against the tagline 'Healing Body, Mind & Soul Through Authentic Ayurveda'",
        "Built dedicated specialty sections for Panchakarma Programs, Beij Shuddhi & Garbhadhana Sanskar (fertility), and Preventive Healthcare — each with the depth a researching patient actually needs",
        "Designed a Seasonal Therapies section that surfaces Sharadiya Virechan, Vasantik Vaman, Kati Basti, Shirodhara, and monsoon-specific treatments — so the site stays alive across the calendar",
        "Curated a patient testimonials carousel using real outcomes from Gujarat, Maharashtra, and the USA — natural pregnancy after two years of trying, 25-pound weight loss with normalized cholesterol, controlled PCOD and hypertension",
        "Surfaced a 'Global Reach' module for international patients — tele-consultations across time zones, climate-adapted treatment plans, worldwide medicine delivery",
        "Integrated WhatsApp deep-linking into the booking flow so patients can confirm appointments in one tap from any device",
      ]},
      { type: "heading", text: "Design Philosophy" },
      { type: "paragraph", text: "We anchored the visual language on warmth — earthy tones drawn from turmeric, sandalwood, and copper, balanced against generous whitespace and clean typography. Photography mixes the clinic's own interior shots with serene therapy imagery: the moment a Shirodhara stream meets the forehead, the texture of hand-mixed herbs, a steam-room view that signals authentic Panchakarma rather than a spa. Every visual decision was filtered through one question — 'would this make a patient trust the medicine?' If the answer was no, it was cut." },
      { type: "paragraph", text: "Restraint was the hardest part. Ayurveda is rich in symbolism, and the temptation to layer mandalas, Sanskrit accents, and ornamental flourishes is real. We resisted. The site whispers tradition rather than shouting it. The result feels closer to a contemporary boutique health clinic than a tourist Ayurveda spa — which is exactly the positioning Aksharam earned through 9+ years of clinical work." },
      { type: "heading", text: "Technical Foundations" },
      { type: "list", items: [
        "Lightweight, performance-first build optimized for mobile patients across slow 3G networks in tier-2 Indian cities and international rural areas",
        "WhatsApp Business deep-link integration on every primary CTA — bypasses the email anxiety most healthcare patients feel",
        "Structured FAQ section answering the four most common pre-booking questions — pulled directly from the clinic's actual inbox",
        "SEO architecture targeting both intent keywords ('panchakarma Ahmedabad', 'ayurvedic fertility treatment') and condition-led keywords ('PCOD ayurvedic treatment', 'natural detoxification')",
        "Image optimization pipeline so the gallery loads quickly without sacrificing the warmth of clinic photography",
        "Tele-consultation funnel that captures time zone, country, and condition upfront — so Vaidya Dolly's team can prepare before the call",
      ]},
      { type: "heading", text: "Building Trust in a Sensitive Vertical" },
      { type: "paragraph", text: "Healthcare conversion is fundamentally different from e-commerce or SaaS. A patient researching a Panchakarma program is often anxious, often skeptical, and almost always comparing across three or four practitioners. Generic agency tactics — urgency banners, exit-intent popups, trial offers — would have actively damaged trust here. We did the opposite. The site reads slowly. Sections breathe. The testimonials section names the patient, the city, and the actual outcome — Hardik Mehta in Gujarat, Payal Tank in Maharashtra, Dipak Jaiswal in the USA — because specificity is the strongest trust signal in healthcare. Stock-photo smiles and anonymous five-star quotes would have undone the credibility Vaidya Dolly spent a decade building." },
      { type: "heading", text: "The Results" },
      { type: "paragraph", text: "Aksharam Ayurved now operates a digital storefront that mirrors the clinic itself — warm, authentic, and clinically grounded. Seasonal therapy enrollments have grown materially since launch, with patients increasingly self-selecting into Sharadiya Virechan and Vasantik Vaman programs after reading the on-site explainers. International tele-consultation requests now route in through a structured form rather than scattered DMs, giving the clinic operational clarity it didn't have before. WhatsApp-led bookings have become the dominant conversion path — proof that the simplest tap-to-talk path, when integrated thoughtfully, outperforms every clever form a designer can invent." },
      { type: "quote", text: "Shape-360 understood the soul of Ayurveda — not just the business. Our website now feels as authentic as our clinic. International patients book consultations with confidence, and our seasonal therapy enrollments have grown significantly since launch.", author: "Vaidya Dolly, Founder · Aksharam Ayurved · Ahmedabad" },
      { type: "heading", text: "Key Takeaway" },
      { type: "paragraph", text: "For traditional healthcare brands — Ayurveda, homeopathy, naturopathy, integrative clinics — the website is no longer a brochure. It's where credibility is decided. The instinct is to either over-modernize and lose the soul, or over-traditionalize and lose the conversion. The winning move is restraint. Honor the heritage. Foreground the practitioner. Let real patient outcomes do the selling. And make the booking path so frictionless that a patient on a slow phone in a small town can finish what they started. Authentic doesn't have to mean slow or unsophisticated — and modern doesn't have to mean cold. Aksharam Ayurved is the proof." },
    ],
  },
  "mershiltech-ai-agency-platform": {
    title: "Engineering an Enterprise Platform for an AI-Powered Australian Agency",
    category: "International",
    date: "April 12, 2026",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80",
    client: "MershilTech · Australia 🇦🇺",
    clientLink: "https://mershiltech.com",
    content: [
      { type: "paragraph", text: "MershilTech was our first major international engagement — and one of our proudest. They are an Australian-headquartered global delivery powerhouse serving 500+ clients across 70+ countries with AI, web, mobile, AR/VR, cybersecurity, and cloud engineering. When they came to us, they needed a digital presence that matched the scale: enterprise CTOs need to feel safe specifying them for million-dollar engagements, and lean startups need to feel they'll get founder-level attention. Speaking to both audiences from one site is one of the hardest design problems in B2B software — and we had to solve it across a 4.5-hour timezone gap from Bangalore to Sydney." },
      { type: "heading", text: "The Challenge" },
      { type: "paragraph", text: "MershilTech offers more than 30 services — AI agents, AI/ML development, mobile apps (iOS, Android, Flutter, React Native), web platforms, cloud (AWS, Azure), AR/VR, cybersecurity (SOC, AppSec, pen-testing), DevOps, and a flexible hiring model. Cramming all of that into one homepage would either drown the visitor or signal a generic 'we do everything' agency. We needed sophistication and depth without overwhelm." },
      { type: "paragraph", text: "Their target customer also splits across two extremes: enterprise leaders evaluating multi-year partnerships in Australia, the US, and Europe — and growth-stage founders who can't find senior engineers locally and need a 2-week sprint partner. Both groups were arriving on the same homepage. Both had to convert. And we had to deliver all of this remotely — async-first — across continents." },
      { type: "heading", text: "Our Approach" },
      { type: "list", items: [
        "Built a multi-page architecture with dedicated service detail pages and sub-service drill-downs — so every visitor finds depth without homepage clutter",
        "Designed a dark-mode-first aesthetic with glassmorphic cards and subtle motion — signals enterprise-grade craft to technical buyers",
        "Created a 'Flexible Hiring Models' page that addresses the contractor problem head-on — turning a pain point into a positioning advantage",
        "Engineered an AI-powered chatbot baked into the experience — meta-proof that they actually ship AI",
        "Wrote conversion-tuned copy that speaks to both enterprise CTOs (security, scale, SLAs) and founders (2-week sprints, 48-hour ramp-up)",
        "Optimized every page for SEO with structured data, performance-first asset loading, and rolldown-runtime bundling for fast page transitions",
      ]},
      { type: "heading", text: "Design Philosophy" },
      { type: "paragraph", text: "Most agency websites scream. We made MershilTech's whisper. Restrained typography (Inter, 700 max). A dark navy palette (#050d1a) that feels like a control room. Service cards that breathe. Real claims like '500+ clients in 70+ countries' and '2-week sprint deliveries' anchored against generic boasts. Every section answers a question a buyer is actually asking — not a question marketers wish they were." },
      { type: "heading", text: "Technical Foundations" },
      { type: "list", items: [
        "React + Vite + Rolldown for sub-second page transitions across 30+ service pages",
        "Code-split route chunks so the homepage loads in under 1.5 seconds globally",
        "Embedded AI chatbot powered by an LLM agent for 24/7 lead qualification",
        "SEO architecture with per-service meta tags, structured data, and OG previews",
        "Multi-region hosting strategy targeting AU, US, EU, and APAC clients",
      ]},
      { type: "heading", text: "Working Across Continents" },
      { type: "paragraph", text: "Delivering for an Australian client from India sounds simple until you do it. Sydney is 4.5 hours ahead of Bangalore — which means real-time meetings either kill our morning or their evening. Most agencies fail at this. We didn't. We ran the project async-first: daily Loom video updates instead of standups, written specs over verbal briefings, Figma + Linear + WhatsApp as the single source of truth. The Mershil team woke up to fresh progress every day. We woke up to clear feedback. Zero call-fatigue, zero ambiguity. The entire platform shipped without a single uncomfortable timezone meeting." },
      { type: "heading", text: "The Results" },
      { type: "paragraph", text: "MershilTech now operates a digital storefront that holds its own against Toptal, Andela, and Globant — at a fraction of the marketing budget. The site's depth signals that the engineering team can handle anything from AI agent prototypes to multi-year SOC engagements. Enterprise inbound has shifted from 'can you do this?' to 'when can you start?' — the highest signal a B2B website can produce. For Shape-360, the project unlocked something equally valuable: proof that we can deliver enterprise-grade work for international clients, on-spec and on-time, from Bangalore to Sydney." },
      { type: "quote", text: "Working with Shape-360 from Australia was seamless. They delivered an enterprise-grade platform that handles 500+ clients across 70+ countries. The performance, design, and AI-ready architecture exceeded everything we'd seen — from any agency, anywhere.", author: "Mershil Team, MershilTech · Sydney 🇦🇺" },
      { type: "heading", text: "Key Takeaway" },
      { type: "paragraph", text: "Two lessons from this engagement. First: when your service portfolio is wide, the worst thing you can do is flatten it onto a single landing page. Depth — done well — is the strongest trust signal in B2B software. Second: international, async-first delivery is not a liability; it's a feature. Clients increasingly want partners who write things down, ship without micromanagement, and respect timezones. That's how we built a platform for an Australian agency from India — and it's how we'll build for the next 50 international clients." },
    ],
  },
  "zevolution-architectural-surfaces-platform": {
    title: "Building an Editorial-Grade Platform for India's Premium Architectural Materials Brand",
    category: "Architecture",
    date: "April 22, 2026",
    readTime: "9 min read",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    client: "Zevolution",
    clientLink: "https://zevolution.in",
    content: [
      { type: "paragraph", text: "Zevolution is not one brand — it's five. Crest Stone, FCC Architectural Boards, Formiq engineered flooring, Dolomitic, and a portfolio of monolithic facade systems, all united under a single vision: to give India's architects and interior designers materials that exceed expectations and define market distinction. With 94+ premium products across five collections, the challenge wasn't telling one story. It was telling five — coherently, and with editorial weight." },
      { type: "heading", text: "The Challenge" },
      { type: "paragraph", text: "Architectural materials aren't sold like consumer products. The audience is highly specialized — architects, interior designers, façade consultants, and project specifiers — who need technical specs, finish samples, CAD blocks, and acoustic certifications more than marketing copy. At the same time, Zevolution's brand is unapologetically premium. The site had to feel less like a hardware catalog and more like Pentagram-grade brand publishing." },
      { type: "paragraph", text: "We were also tasked with three audiences in one platform: architects looking for spec sheets, end-clients evaluating finishes for their luxury homes, and developers commissioning hospitality and high-rise projects. Each needs different content depth — without dumbing down for any of them." },
      { type: "heading", text: "Our Approach" },
      { type: "list", items: [
        "Crafted a five-collection navigation system that surfaces each brand's identity while preserving Zevolution's parent voice",
        "Built granular finish explorers — every product shows available finishes, dimensions, weight class, and acoustic / fire-rating certifications",
        "Designed an Architects Hub with downloadable spec sheets, CAD block libraries, and BIM-ready resources",
        "Created cinematic project showcases across hospitality, healthcare, fitness, and high-rise commercial — proving the materials in real installations",
        "Implemented a refined editorial design system with restrained typography, generous whitespace, and museum-grade product imagery",
        "Added a 'Back to Brands' breadcrumb pattern so architects browsing one collection can fluidly hop to another without losing context",
      ]},
      { type: "heading", text: "Design Philosophy" },
      { type: "paragraph", text: "Premium materials brands fail online for one reason: they look like every other materials supplier. Stock photos, generic product grids, vague claims. Zevolution wanted the opposite — a site that feels like the materials themselves: hand-finished, weighty, intentional. We treated every page as an editorial spread. Hero sections give breathing room. Product names sit next to short, evocative descriptions. Finishes are presented like a curated capsule collection, not a parts catalog." },
      { type: "heading", text: "Technical Foundations" },
      { type: "list", items: [
        "React + Vite for instant page transitions and a snappy architect-grade browsing experience",
        "Custom animation choreography on hero and collection reveals — subtle, never showy",
        "Optimized image pipelines with adaptive sizing across mobile, tablet, and 4K monitors",
        "Resource library with searchable spec PDFs, CAD blocks, and architectural documentation",
        "1.9s average load time despite high-resolution material photography",
      ]},
      { type: "heading", text: "The Results" },
      { type: "paragraph", text: "Five distinct brands now share one elevated digital home. Architect sign-ups for the resource library climbed 60% in the launch quarter. Finish-sample requests routed through the site doubled. More importantly, the platform now does what every premium B2B site should — it pre-qualifies the buyer before the first call. By the time an architect emails Zevolution's specification team, they already know the collection, the finish, and the project category." },
      { type: "quote", text: "Shape-360 captured the essence of our premium brand perfectly. The site feels like our materials — crafted, refined, and unmistakable. Architects love browsing our collections now.", author: "Dheeraj, Co-Founder Zevolution" },
      { type: "heading", text: "Key Takeaway" },
      { type: "paragraph", text: "For premium B2B materials brands, the website is not a brochure — it's the showroom. Architects don't visit physical showrooms anymore; they specify from their browser. If your digital storefront doesn't communicate the same craft and weight as your products, you're losing specification battles before you even get the call. Investing in editorial-grade design isn't a vanity expense for premium materials — it's the price of entry." },
    ],
  },
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.img],
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": "Shape-360",
      "url": "https://shape-360.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Shape-360",
      "logo": {
        "@type": "ImageObject",
        "url": "https://shape-360.com/logo.png"
      }
    },
    "description": post.content[0]?.text?.substring(0, 160),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://shape-360.com/blog/${slug}`
    },
    "articleSection": post.category,
    "about": post.client,
  };

  return (
    <div className="blog-post-page">
      <Helmet>
        <title>{post.title} | Shape-360 Blog</title>
        <meta name="description" content={post.content[0]?.text?.substring(0, 160)} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content[0]?.text?.substring(0, 160)} />
        <meta property="og:image" content={post.img} />
        <meta property="og:url" content={`https://shape-360.com/blog/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://shape-360.com/blog/${slug}`} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
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
