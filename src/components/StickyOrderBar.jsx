import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { getWhatsAppUrl } from "../utils/whatsapp";

export const STICKY_BAR_EVENT = "omniaglow:sticky-bar";

/**
 * Slim mobile-only buy bar pinned to the viewport bottom.
 * Appears once the hero scrolls out of view; hides again at the very top.
 * Broadcasts visibility so the floating WhatsApp bubble can lift above it.
 */
export default function StickyOrderBar() {
  const { t, lang, isRTL } = useI18n();
  const [visible, setVisible] = useState(false);
  const href = getWhatsAppUrl({ action: "heroOrder", lang });

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible((prev) => {
          const next = window.scrollY > window.innerHeight * 0.6;
          if (next !== prev) {
            window.dispatchEvent(new CustomEvent(STICKY_BAR_EVENT, { detail: next }));
          }
          return next;
        });
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* In-flow spacer reserves room so the fixed bar never covers the footer */}
      {visible && <div className="h-[76px] lg:hidden" aria-hidden="true" />}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 lg:hidden transition-transform duration-300 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!visible}
      >
        <div
          className="flex items-center justify-between gap-3 px-5 bg-ink text-cream shadow-[0_-8px_30px_rgba(33,29,24,0.25)]"
          style={{ paddingBottom: "calc(0.85rem + env(safe-area-inset-bottom))", paddingTop: "0.85rem" }}
        >
          <div className={`min-w-0 ${isRTL ? "text-right" : "text-left"}`}>
            <p className="font-display text-[18px] leading-none">
              99 {lang === "ar" ? "درهم" : "AED"}
            </p>
            <p className="font-body text-[11px] text-cream/70 mt-1 truncate">
              {lang === "ar" ? "الدفع عند الاستلام" : "Cash on Delivery"}
            </p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
            className="inline-flex shrink-0 items-center gap-2 px-6 py-3 rounded-xl bg-cream text-ink font-body text-[13px] tracking-[0.06em] uppercase font-medium min-h-[48px] hover:bg-white active:scale-[0.98]"
          >
            <MessageCircle size={16} aria-hidden="true" />
            <span>{t("orderWhatsApp")}</span>
          </a>
        </div>
      </div>
    </>
  );
}
