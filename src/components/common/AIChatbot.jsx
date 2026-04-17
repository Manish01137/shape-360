import { useState, useRef, useEffect, useCallback } from "react";
import "./AIChatbot.css";

const BOT_NAME = "Shape AI";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are "Shape AI", the intelligent AI assistant for Shape-360, a premium digital agency based in Bangalore, India. You are embedded on their website as a live chat widget.

YOUR PERSONALITY:
- Friendly, professional, and confident
- Speak concisely — this is a chat widget, not an essay. Keep responses under 150 words.
- Use line breaks for readability. Use bullet points (•) for lists.
- Be helpful and proactive — suggest next steps, offer to connect them with the team
- You can use emojis sparingly for warmth

COMPANY INFORMATION:
- Name: Shape-360
- Founded: 2024, Bangalore, India
- Mission: "To empower businesses with digital solutions that drive growth, build trust, and deliver measurable impact."
- Team: 6+ members including developers, designers, marketers
- Stats: 70+ projects delivered, 20+ happy clients, 2+ years experience, 98% client satisfaction
- Contact: Email: shape360official@gmail.com | Phone: +91 8209978891 | Location: Bangalore, India
- Social: Instagram @shape360official, Facebook

SERVICES OFFERED:
1. Website Development (Custom React/Next.js, fast & scalable) — from $499
2. Shopify Store Development (custom themes, payment setup, 40% conversion boost) — from $499
3. WordPress Development (CMS, blogs, security, SEO-friendly) — from $499
4. Meta Ads - Facebook & Instagram (campaign strategy, targeting, A/B testing) — from $349/mo
5. Google Ads Management (Search, Display, Performance Max) — from $449/mo
6. Account Management (dedicated manager, weekly reports, 24/7 support)
7. Additional: Website Maintenance, Analytics Setup, Conversion Optimization, Video Editing, Graphic Design, Branding & Creatives

PRICING - WEB DEVELOPMENT:
• Starter — $499 (5-page responsive site, basic SEO, contact form, 1 month support)
• Professional — $999 (10-page custom site, advanced UI/UX, full SEO, CMS, analytics, 3 months support)
• Enterprise — $2,499 (unlimited pages, custom web app, e-commerce, API integrations, 6 months support, priority support)

PRICING - ADVERTISING:
• Meta Ads Starter — $349/month
• Google Ads Starter — $449/month
• Full Digital Marketing — $899/month (Meta + Google, unlimited creatives, dedicated account manager)

All prices in USD. Ad spend billed separately. Custom packages available.

PROCESS:
1. Discover — Deep dive into business goals & competition
2. Build — Design & develop with meticulous attention
3. Launch — Testing & optimization for peak performance
4. Scale — Continuous improvement & growth strategies

CASE STUDIES / PORTFOLIO (REAL PROJECTS):
• KVS Academy (kvsacademy.org) — Educational platform, 3x student inquiries, 1.8s load time, mobile-first
• Veloura Jewels (velourajewels.in) — Premium jewelry e-commerce, 55% sales increase, BIS hallmarked 925 silver & moissanite jewelry store
• Kedar Shakti (kedarshakti.com) — Spiritual e-commerce Shopify store for incense, crystals & puja essentials, 3x online orders, corporate bulk ordering
• Zeqon (zeqon.co) — Modern SaaS website with animations, 5x lead generation, 180% traffic growth
• Staylia DXB (stayliadxb.com) — Dubai short-term rental management platform, 85%+ occupancy rates, investor dashboards, multi-platform booking
• JaldiRide Connect (jaldirideconnect.com) — Smart local transport platform for autos/cars/buses, 10K+ monthly visits, 50+ cities targeted

LANDING PAGE PROJECTS:
• MindMint Media (mindmintmedia.in) — Digital marketing agency landing page with service showcases and lead capture
• SkillOwl (skillowl.in) — EdTech platform landing page with course highlights and signup flow
• FolkLane (folklane.in) — Full-service creative agency page with tiered pricing and portfolio, based in Prayagraj
• Pawan Hardu (pawanhardu.org) — Cinematic video editor portfolio with 70M+ views, 300+ projects, showreel and testimonials
• Krishi Global Industries (krishiglobalindustries.com) — Agricultural export company landing page, farm-direct spices & rice, FSSAI certified, Gujarat-based

TIMELINES:
• Standard Website: 2-4 weeks
• Shopify Store: 2-3 weeks
• WordPress: 1-3 weeks
• Ad Campaign Setup: 1 week
• Branding: 2-3 weeks

POLICIES:
• Payment: 50% upfront, 50% on completion. Milestone-based for large projects.
• No long-term contracts for web dev. Month-to-month for ad management.
• Satisfaction guarantee — revisions until happy.
• Clients own all accounts and data.

RULES:
- NEVER make up information. If unsure, say you'll connect them with the team.
- If someone asks something unrelated to Shape-360 or digital services, politely redirect.
- Always try to guide the conversation toward booking a free consultation.
- If they seem ready to buy, suggest visiting the Contact page or calling +91 8209978891.
- Never share competitor information or pricing.
- You cannot book meetings, access calendars, or process payments — direct them to contact the team for that.`;

/* Fallback keyword responses when API is unavailable */
const fallbackResponses = [
  { keywords: ["hi", "hello", "hey", "hii"], response: "Hello! 👋 Welcome to Shape-360. I'm Shape AI, your digital assistant. How can I help you today?\n\nYou can ask about our services, pricing, portfolio, or anything else!" },
  { keywords: ["service", "services", "what do you do", "offer"], response: "We offer a full suite of digital services:\n\n• Website Development (Custom, Shopify, WordPress)\n• Meta Ads (Facebook & Instagram)\n• Google Ads Management\n• SEO Optimization\n• Branding & Graphic Design\n• Video Editing\n• Account Management\n\nWhich service interests you?" },
  { keywords: ["price", "pricing", "cost", "how much", "budget"], response: "Our pricing:\n\n🌐 Web Development:\n• Starter — $499\n• Professional — $999\n• Enterprise — $2,499\n\n📈 Ad Management:\n• Meta Ads — $349/mo\n• Google Ads — $449/mo\n• Full Marketing — $899/mo\n\nAll packages are customizable. Want a personalized quote?" },
  { keywords: ["contact", "reach", "call", "email", "phone"], response: "You can reach us:\n\n📧 shape360official@gmail.com\n📞 +91 8209978891\n📍 Bangalore, India\n\nOr visit our Contact page — we respond within 2 hours!" },
];

const getFallbackResponse = (input) => {
  const lower = input.toLowerCase().trim();
  for (const item of fallbackResponses) {
    if (item.keywords.some((kw) => lower.includes(kw))) return item.response;
  }
  return "Thanks for your message! For the best assistance, please reach out to our team directly:\n\n📧 shape360official@gmail.com\n📞 +91 8209978891\n\nOr visit our Contact page. We'd love to help!";
};

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi there! 👋 I'm Shape AI, powered by advanced AI. I know everything about Shape-360's services, pricing, and portfolio.\n\nHow can I help you today?",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const conversationRef = useRef([]);
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("shape360_voice_enabled");
    return stored === "true";
  });
  const [speechSupported, setSpeechSupported] = useState(false);

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

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    setSpeechSupported(true);
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
      // Auto-send after voice input
      setTimeout(() => {
        const userMsg = { from: "user", text: transcript, time: new Date() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setTyping(true);
        callAI(transcript).then((botText) => {
          const botReply = { from: "bot", text: botText, time: new Date() };
          setMessages((prev) => [...prev, botReply]);
          setTyping(false);
          if (voiceEnabled) speakText(botText);
        });
      }, 200);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, [voiceEnabled]);

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    // Strip emojis and markdown for cleaner TTS
    const cleaned = text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|\*/gu, "").trim();
    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.volume = 0.9;
    // Try to pick a natural voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((v) => /samantha|google us english|microsoft aria|natural/i.test(v.name));
    if (preferred) utterance.voice = preferred;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch {
        setListening(false);
      }
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("shape360_voice_enabled", next.toString());
      if (!next && window.speechSynthesis) window.speechSynthesis.cancel();
      return next;
    });
  };

  const callAI = useCallback(async (userMessage) => {
    if (!GEMINI_API_KEY) {
      return getFallbackResponse(userMessage);
    }

    conversationRef.current.push({
      role: "user",
      parts: [{ text: userMessage }],
    });

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: conversationRef.current,
            generationConfig: {
              temperature: 0.7,
              topP: 0.9,
              topK: 40,
              maxOutputTokens: 400,
            },
            safetySettings: [
              { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
              { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
              { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
              { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const botText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        getFallbackResponse(userMessage);

      conversationRef.current.push({
        role: "model",
        parts: [{ text: botText }],
      });

      return botText;
    } catch (error) {
      console.error("Gemini API error:", error);
      conversationRef.current.pop();
      return getFallbackResponse(userMessage);
    }
  }, []);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || typing) return;

    const userMsg = { from: "user", text: trimmed, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const botText = await callAI(trimmed);
    const botReply = { from: "bot", text: botText, time: new Date() };
    setMessages((prev) => [...prev, botReply]);
    setTyping(false);
    if (voiceEnabled) speakText(botText);
  }, [input, typing, callAI, voiceEnabled]);

  const handleQuickQuestion = useCallback(async (q) => {
    if (typing) return;

    const userMsg = { from: "user", text: q, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    const botText = await callAI(q);
    const botReply = { from: "bot", text: botText, time: new Date() };
    setMessages((prev) => [...prev, botReply]);
    setTyping(false);
    if (voiceEnabled) speakText(botText);
  }, [typing, callAI, voiceEnabled]);

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
                  {GEMINI_API_KEY ? "AI Powered" : "Online"}
                </span>
              </div>
            </div>
            <div className="chatbot-header-actions">
              {speechSupported && (
                <button
                  className={`chatbot-voice-btn ${voiceEnabled ? "active" : ""}`}
                  onClick={toggleVoice}
                  aria-label="Toggle voice responses"
                  title={voiceEnabled ? "Voice responses ON" : "Voice responses OFF"}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    {voiceEnabled ? (
                      <>
                        <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                        <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
                      </>
                    ) : (
                      <>
                        <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                        <line x1="23" y1="9" x2="17" y2="15"/>
                        <line x1="17" y1="9" x2="23" y2="15"/>
                      </>
                    )}
                  </svg>
                </button>
              )}
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
                  onClick={() => handleQuickQuestion(q)}
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
              placeholder={listening ? "Listening..." : "Ask me anything about Shape-360..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={typing || listening}
            />
            {speechSupported && (
              <button
                className={`chatbot-mic ${listening ? "listening" : ""}`}
                onClick={toggleListening}
                disabled={typing}
                aria-label={listening ? "Stop listening" : "Start voice input"}
                title="Voice input"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
                  <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/>
                </svg>
                {listening && <span className="mic-pulse"></span>}
              </button>
            )}
            <button
              className="chatbot-send"
              onClick={handleSend}
              disabled={!input.trim() || typing}
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
