import { createContext, useContext, useEffect, useState } from "react";
import { translations, defaultLang } from "./translations";

const LanguageContext = createContext({
  lang: defaultLang,
  setLang: () => {},
  t: () => "",
});

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return defaultLang;
    return localStorage.getItem("shape360_lang") || defaultLang;
  });

  useEffect(() => {
    localStorage.setItem("shape360_lang", lang);
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", translations[lang]?.dir || "ltr");
  }, [lang]);

  /* Simple key-path lookup: t("nav.home") → translations[lang].nav.home */
  const t = (path) => {
    const parts = path.split(".");
    let value = translations[lang];
    for (const part of parts) {
      value = value?.[part];
      if (value === undefined) {
        let fallback = translations[defaultLang];
        for (const p of parts) fallback = fallback?.[p];
        return fallback ?? path;
      }
    }
    return value;
  };

  const value = { lang, setLang, t, dir: translations[lang]?.dir || "ltr" };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
