import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { translations } from "../../i18n/translations";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const current = translations[lang];
  const langs = Object.keys(translations);

  return (
    <div className="lang-switch" ref={ref}>
      <button
        className="lang-trigger"
        onClick={() => setOpen(!open)}
        aria-label="Change language"
        aria-expanded={open}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <span className="lang-current">{current.flag} {lang.toUpperCase()}</span>
        <svg className={`lang-chev ${open ? "up" : ""}`} width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div className={`lang-menu ${open ? "open" : ""}`}>
        {langs.map((code) => (
          <button
            key={code}
            className={`lang-option ${lang === code ? "active" : ""}`}
            onClick={() => {
              setLang(code);
              setOpen(false);
            }}
          >
            <span className="lang-flag">{translations[code].flag}</span>
            <span className="lang-name">{translations[code].name}</span>
            <span className="lang-code">{code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
