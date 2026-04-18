import { useState, useEffect } from "react";

/**
 * Geo personalization: detects user country via free IP API (ipapi.co)
 * Returns { country, countryCode, city, currency, currencySymbol, region, loading }
 *
 * Currency mapping for relevant markets: INR, AED, USD, GBP, EUR
 * Caches result in localStorage for 24h to avoid repeated API calls.
 */

const CURRENCY_MAP = {
  IN: { code: "INR", symbol: "₹", rate: 83 },
  AE: { code: "AED", symbol: "AED ", rate: 3.67 },
  GB: { code: "GBP", symbol: "£", rate: 0.79 },
  US: { code: "USD", symbol: "$", rate: 1 },
  CA: { code: "CAD", symbol: "C$", rate: 1.35 },
  AU: { code: "AUD", symbol: "A$", rate: 1.51 },
  SA: { code: "SAR", symbol: "SAR ", rate: 3.75 },
  SG: { code: "SGD", symbol: "S$", rate: 1.34 },
};

const REGION_MAP = {
  IN: "India",
  AE: "UAE",
  GB: "UK",
  US: "US",
  SA: "Saudi Arabia",
  SG: "Singapore",
};

const CACHE_KEY = "shape360_geo";
const CACHE_TTL = 24 * 60 * 60 * 1000;

export const useGeoPersonalization = () => {
  const [geo, setGeo] = useState({
    country: "Global",
    countryCode: null,
    city: null,
    currency: "USD",
    currencySymbol: "$",
    rate: 1,
    region: "Global",
    loading: true,
  });

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          setGeo({ ...parsed.data, loading: false });
          return;
        }
      } catch {
        /* ignore */
      }
    }

    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => {
        const code = d.country_code || "US";
        const currency = CURRENCY_MAP[code] || CURRENCY_MAP.US;
        const data = {
          country: d.country_name || "Global",
          countryCode: code,
          city: d.city || null,
          currency: currency.code,
          currencySymbol: currency.symbol,
          rate: currency.rate,
          region: REGION_MAP[code] || d.country_name || "Global",
          loading: false,
        };
        setGeo(data);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
      })
      .catch(() => {
        setGeo((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  const formatPrice = (usdAmount) => {
    const converted = Math.round(usdAmount * geo.rate);
    if (geo.currency === "INR") {
      return `${geo.currencySymbol}${converted.toLocaleString("en-IN")}`;
    }
    return `${geo.currencySymbol}${converted.toLocaleString()}`;
  };

  return { ...geo, formatPrice };
};
