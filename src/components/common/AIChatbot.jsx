import { useState, useRef, useEffect } from "react";
import "./AIChatbot.css";

const BOT_NAME = "Shape AI";

const knowledgeBase = [
  { keywords: ["hi", "hello", "hey", "hii"], response: "Hello! Welcome to Shape-360. I'm your AI assistant. How can I help you today? You can ask about our services, pricing, process, or anything else!" },
  { keywords: ["service", "services", "what do you do", "offer", "provide"], response: "We offer a full suite of digital services:\n\n• Website Development (Custom, Shopify, WordPress)\n• Meta Ads (Facebook & Instagram)\n• Google Ads Management\n• SEO Optimization\n• Branding & Graphic Design\n• Video Editing\n• Account Management\n\nWhich service interests you most?" },
  { keywords: ["price", "pricing", "cost", "how much", "budget", "rate", "charges", "fee"], response: "Our pricing is transparent and competitive:\n\n🌐 Web Development:\n• Starter — $499\n• Professional — $999\n• Enterprise — $2,499\n\n📈 Ad Management:\n• Meta Ads — $349/mo\n• Google Ads — $449/mo\n• Full Marketing — $899/mo\n\nAll packages are customizable. Want a personalized quote?" },
  { keywords: ["shopify", "ecommerce", "e-commerce", "store", "online store"], response: "We build high-converting Shopify stores with:\n\n• Custom theme development\n• Product catalog setup\n• Payment & shipping configuration\n• Apps integration & automation\n• Mobile-optimized design\n\nOur Shopify stores have achieved up to 40% conversion boosts! Want to get started?" },
  { keywords: ["wordpress", "cms", "blog"], response: "Our WordPress solutions include:\n\n• Custom theme development\n• Plugin integration\n• Security hardening\n• Performance optimization\n• SEO-friendly structure\n\nPerfect for business websites, blogs, and content-driven sites." },
  { keywords: ["meta ads", "facebook ads", "instagram ads", "facebook", "instagram", "social media"], response: "Our Meta Ads service delivers results:\n\n• Campaign strategy & planning\n• Creative design & copywriting\n• Audience targeting & retargeting\n• A/B testing & optimization\n• Weekly performance reports\n\nWe've achieved up to 3x ROAS for our clients!" },
  { keywords: ["google ads", "search ads", "ppc", "sem"], response: "Our Google Ads management includes:\n\n• Keyword research & strategy\n• Search & display campaigns\n• Performance Max campaigns\n• Conversion tracking setup\n• Bid management & optimization\n\nOne client generated 200+ leads/month at just $12 CPA!" },
  { keywords: ["seo", "search engine", "ranking", "organic"], response: "We offer comprehensive SEO services:\n\n• Technical SEO audit\n• On-page optimization\n• Schema markup implementation\n• Content strategy\n• Link building\n\nWe've helped clients reach Google's page 1 in as little as 90 days!" },
  { keywords: ["process", "how do you work", "workflow", "steps"], response: "Our proven 4-step process:\n\n1️⃣ Discover — Deep dive into your goals & competition\n2️⃣ Build — Meticulous development & design\n3️⃣ Launch — Comprehensive testing & optimization\n4️⃣ Scale — Continuous growth & improvement\n\nWe keep you informed at every step with weekly reports." },
  { keywords: ["time", "timeline", "how long", "duration", "deadline"], response: "Typical project timelines:\n\n• Standard Website — 2-4 weeks\n• Shopify Store — 2-3 weeks\n• WordPress Site — 1-3 weeks\n• Ad Campaign Setup — 1 week\n• Branding Package — 2-3 weeks\n\nTimelines vary based on complexity. We'll provide a detailed schedule during consultation." },
  { keywords: ["contact", "reach", "call", "email", "phone", "talk"], response: "You can reach us through:\n\n📧 Email: shape360official@gmail.com\n📞 Phone: +91 8209978891\n📍 Location: Bangalore, India\n\nOr fill out our contact form and we'll respond within 2 hours!\n\nWant me to take you to the contact page?" },
  { keywords: ["portfolio", "work", "projects", "case study", "case studies", "examples"], response: "We've delivered 70+ successful projects including:\n\n• UrbanKart — 40% conversion boost (Shopify)\n• FinEdge — Custom financial dashboard\n• StyleNest — 3x ROAS on Meta Ads\n• BloomWell — Page 1 Google in 90 days\n• TechPulse — 200+ leads/month at $12 CPA\n\nCheck our Case Studies page for detailed results!" },
  { keywords: ["team", "who", "people", "about"], response: "Shape-360 was founded in 2024 in Bangalore. We're a team of passionate developers, designers, and marketers dedicated to helping businesses grow digitally.\n\nWith 70+ projects delivered and a 98% client satisfaction rate, we're committed to being your long-term growth partner." },
  { keywords: ["refund", "guarantee", "satisfaction"], response: "We offer a satisfaction guarantee! If you're not happy with initial concepts, we'll revise until you are. We believe in building trust through quality work and transparent communication.\n\nNo long-term contracts required for web development projects." },
  { keywords: ["thank", "thanks", "bye", "goodbye"], response: "You're welcome! If you have more questions later, I'm always here. Have a great day! 🙌\n\nFeel free to reach us at shape360official@gmail.com or call +91 8209978891." },
];

const getResponse = (input) => {
  const lower = input.toLowerCase().trim();

  for (const item of knowledgeBase) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.response;
    }
  }

  return "That's a great question! I'd love to help you with that. For detailed information, I'd recommend speaking with our team directly.\n\n📧 shape360official@gmail.com\n📞 +91 8209978891\n\nOr you can visit our Contact page to send a message. Is there anything else I can help with?";
};

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi there! 👋 I'm Shape AI, your intelligent assistant. How can I help you today?\n\nYou can ask me about:\n• Our services\n• Pricing & packages\n• Our process\n• Portfolio & case studies",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { from: "user", text: trimmed, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const botReply = { from: "bot", text: getResponse(trimmed), time: new Date() };
      setMessages((prev) => [...prev, botReply]);
      setTyping(false);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const quickQuestions = [
    "What services do you offer?",
    "Show me pricing",
    "How does your process work?",
    "Show me your portfolio",
  ];

  return (
    <div className="ai-chatbot">
      {/* Chat Window */}
      {open && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="rgba(201,168,76,0.15)"/>
                  <path d="M12 6a2.5 2.5 0 00-2.5 2.5h1.5a1 1 0 112 0h1.5A2.5 2.5 0 0012 6z" fill="var(--color-accent)"/>
                  <circle cx="9" cy="13" r="1.2" fill="var(--color-accent)"/>
                  <circle cx="15" cy="13" r="1.2" fill="var(--color-accent)"/>
                  <path d="M8.5 16.5c0 0 1.5 2 3.5 2s3.5-2 3.5-2" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                  <path d="M7 8.5C5.5 7 5.5 4.5 7 3" stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                  <path d="M17 8.5C18.5 7 18.5 4.5 17 3" stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                </svg>
              </div>
              <div>
                <strong>{BOT_NAME}</strong>
                <span className="chatbot-status">
                  <span className="chatbot-status-dot"></span>
                  Online
                </span>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <a
                href="https://wa.me/918209978891?text=Hi%20Shape-360%2C%20I%27m%20interested%20in%20your%20services."
                target="_blank"
                rel="noreferrer"
                className="chatbot-whatsapp-btn"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M2.004 22l1.352-4.968A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 01-5.03-1.355L2.004 22zM8.391 7.308a.961.961 0 00-.371.1 1.293 1.293 0 00-.294.228c-.12.113-.188.211-.261.306A2.729 2.729 0 006.9 9.62c.002.49.13.967.33 1.413.409.902 1.082 1.857 1.971 2.742.214.213.423.427.648.626a9.448 9.448 0 003.84 2.046l.569.087c.185.01.37-.004.556-.013a1.99 1.99 0 00.833-.231 4.83 4.83 0 00.383-.22s.043-.028.125-.09c.135-.1.218-.171.33-.288.083-.086.155-.187.21-.302.078-.163.156-.474.188-.733.024-.198.017-.306.014-.373-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.401-.621a.498.498 0 00-.177-.041.482.482 0 00-.378.127v-.002c-.005 0-.072.057-.795.933a.35.35 0 01-.368.13 1.416 1.416 0 01-.191-.066l-.1-.049a6.842 6.842 0 01-1.7-1.098 7.07 7.07 0 01-.51-.51c-.346-.358-.636-.732-.871-1.073l-.057-.089a.96.96 0 01-.1-.183c-.026-.106.032-.2.032-.2s.193-.218.295-.34c.096-.116.182-.238.255-.365a.54.54 0 00.068-.438 38.108 38.108 0 00-.61-1.44c-.065-.155-.197-.256-.346-.3a1.375 1.375 0 00-.217-.033c-.108-.007-.221-.011-.338-.014z"/>
                </svg>
              </a>
              <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close chat">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.from}`}>
                {msg.from === "bot" && (
                  <div className="chatbot-msg-avatar">
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                      <circle cx="12" cy="12" r="10" fill="rgba(201,168,76,0.15)"/>
                      <circle cx="9" cy="12" r="1" fill="var(--color-accent)"/>
                      <circle cx="15" cy="12" r="1" fill="var(--color-accent)"/>
                      <path d="M9 15c0 0 1.5 1.5 3 1.5s3-1.5 3-1.5" stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round" fill="none"/>
                    </svg>
                  </div>
                )}
                <div className="chatbot-msg-bubble">
                  <p>{msg.text}</p>
                  <span className="chatbot-msg-time">{formatTime(msg.time)}</span>
                </div>
              </div>
            ))}

            {typing && (
              <div className="chatbot-msg bot">
                <div className="chatbot-msg-avatar">
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <circle cx="12" cy="12" r="10" fill="rgba(201,168,76,0.15)"/>
                    <circle cx="9" cy="12" r="1" fill="var(--color-accent)"/>
                    <circle cx="15" cy="12" r="1" fill="var(--color-accent)"/>
                    <path d="M9 15c0 0 1.5 1.5 3 1.5s3-1.5 3-1.5" stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round" fill="none"/>
                  </svg>
                </div>
                <div className="chatbot-msg-bubble typing-bubble">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="chatbot-quick">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  className="chatbot-quick-btn"
                  onClick={() => {
                    setInput(q);
                    setTimeout(() => {
                      const userMsg = { from: "user", text: q, time: new Date() };
                      setMessages((prev) => [...prev, userMsg]);
                      setInput("");
                      setTyping(true);
                      setTimeout(() => {
                        const botReply = { from: "bot", text: getResponse(q), time: new Date() };
                        setMessages((prev) => [...prev, botReply]);
                        setTyping(false);
                      }, 800 + Math.random() * 1200);
                    }, 100);
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="chatbot-send"
              onClick={handleSend}
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>

          {/* Powered By */}
          <div className="chatbot-powered">
            Powered by <strong>Shape AI</strong>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        className={`chatbot-fab ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="AI Chat Assistant"
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <div className="chatbot-fab-icon">
            <div className="chatbot-robot">
              <div className="robot-antenna">
                <div className="robot-antenna-ball"></div>
                <div className="robot-antenna-stick"></div>
              </div>
              <div className="robot-head">
                <div className="robot-eye robot-eye-left"></div>
                <div className="robot-eye robot-eye-right"></div>
                <div className="robot-mouth"></div>
              </div>
            </div>
            <span className="chatbot-fab-pulse"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default AIChatbot;
