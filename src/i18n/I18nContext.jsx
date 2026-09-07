import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { en, ar } from "./strings";

const I18nContext = createContext(null);

const supported = ["en", "ar"];
const dirByLang = { en: "ltr", ar: "rtl" };
const STORAGE_KEY = "omnia-lang";

function detectInitialLang() {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved && supported.includes(saved)) return saved;
  const nav = (navigator.language || "en").toLowerCase();
  if (nav.startsWith("ar")) return "ar";
  return "en";
}

export function I18nProvider({ children, initialLang }) {
  const [lang, setLangState] = useState(initialLang || detectInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dirByLang[lang];
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!supported.includes(next)) return;
    setLangState(next);
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch {}
  }, []);

  const t = useCallback((key) => {
    const dict = lang === "ar" ? ar : en;
    return key.split(".").reduce((acc, k) => (acc == null ? undefined : acc[k]), dict) ?? key;
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    dir: dirByLang[lang],
    setLang,
    t,
    isRTL: lang === "ar",
    supported,
  }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export function tFor(lang, key) {
  const dict = lang === "ar" ? ar : en;
  return key.split(".").reduce((acc, k) => (acc == null ? undefined : acc[k]), dict) ?? key;
}