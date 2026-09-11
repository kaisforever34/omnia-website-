import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { getWhatsAppUrl } from "../utils/whatsapp";

/* ─────────────────────────── Single-Page Navbar ───────────────────────── */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t, isRTL } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: t("nav.about"), hash: "#about" },
    { label: t("nav.product"), hash: "#product" },
    { label: t("nav.results"), hash: "#results" },
    { label: t("nav.quiz"), hash: "#quiz" },
    { label: t("nav.faq"), hash: "#faq" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (hash) => {
    setOpen(false);
    if (!hash || hash === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", hash);
    }
  };

  const onSwitchLang = (next) => {
    if (next === lang) return;
    setLang(next);
    const hash = window.location.hash || "";
    navigate(`/${next}${hash}`, { replace: true });
  };

  const headerWhatsAppUrl = getWhatsAppUrl({ action: "heroOrder", lang });

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-cream/90 backdrop-blur-md border-b border-ink/10 shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Brand Logo / Top link */}
          <button
            onClick={() => scrollToSection("#")}
            className="font-display text-[28px] sm:text-[32px] tracking-[0.02em] text-ink select-none hover:text-champagne transition-colors focus-visible:outline-none"
            aria-label={t("brand")}
          >
            {t("brand")}
          </button>

          {/* Desktop in-page links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map(({ label, hash }) => (
              <button
                key={hash}
                onClick={() => scrollToSection(hash)}
                className="font-body text-[14px] tracking-[0.03em] py-2 text-ink-muted hover:text-ink transition-colors cursor-pointer"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Action buttons & Language toggle */}
          <div className="flex items-center gap-3 sm:gap-5">
            <LangToggle lang={lang} onSwitch={onSwitchLang} />

            <a
              href={headerWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-cream rounded-full font-body text-[12px] tracking-[0.06em] uppercase hover:bg-champagne hover:text-ink transition-all duration-300 min-h-[40px] hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle size={15} aria-hidden="true" />
              <span>{t("orderWhatsApp")}</span>
            </a>

            {/* Mobile: always-visible compact order pill — buying never hides behind the menu */}
            <a
              href={headerWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-cream rounded-full font-body text-[12px] tracking-[0.04em] uppercase hover:bg-champagne hover:text-ink transition-colors min-h-[40px] active:scale-[0.98]"
              aria-label={t("orderWhatsApp")}
            >
              <MessageCircle size={14} aria-hidden="true" />
              <span>{t("nav.orderShort")}</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center text-ink rounded-lg hover:bg-ink/5 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
            >
              {open ? (
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <path d="M3 3l12 12M15 3L3 15" />
                </svg>
              ) : (
                <svg width="20" height="14" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <path d="M1 1h16M1 6h16M1 11h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div className="fixed inset-0 bg-cream z-50 flex flex-col justify-between px-8 py-10 lg:hidden animate-fade-in overflow-y-auto">
          <div className="flex items-center justify-between border-b border-ink/10 pb-6">
            <span className="font-display text-[28px] text-ink">{t("brand")}</span>
            <button
              className="w-11 h-11 flex items-center justify-center text-ink rounded-full bg-white/60 border border-ink/10"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M3 3l12 12M15 3L3 15" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto py-8">
            {navLinks.map(({ label, hash }) => (
              <button
                key={hash}
                onClick={() => scrollToSection(hash)}
                className={`font-display text-[28px] sm:text-[32px] text-left transition-colors py-1 hover:text-champagne ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-ink/10 flex flex-col gap-4">
            <a
              href={headerWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-ink text-cream rounded-xl font-body text-[14px] tracking-[0.06em] uppercase hover:bg-champagne hover:text-ink transition-colors min-h-[48px]"
              onClick={() => setOpen(false)}
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>{t("orderWhatsApp")}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function LangToggle({ lang, onSwitch }) {
  return (
    <div
      role="group"
      aria-label="Language selection"
      className="inline-flex items-center border border-ink/15 rounded-full overflow-hidden text-[12px] font-body tracking-[0.06em] uppercase bg-white/40"
    >
      <button
        onClick={() => onSwitch("en")}
        aria-pressed={lang === "en"}
        className={`px-3 py-1.5 transition-colors min-h-[34px] cursor-pointer ${
          lang === "en" ? "bg-ink text-cream font-medium" : "text-ink-muted hover:text-ink"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onSwitch("ar")}
        aria-pressed={lang === "ar"}
        className={`px-3 py-1.5 transition-colors min-h-[34px] cursor-pointer ${
          lang === "ar" ? "bg-ink text-cream font-medium" : "text-ink-muted hover:text-ink"
        }`}
      >
        عربي
      </button>
    </div>
  );
}
