import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { getWhatsAppUrl } from "../utils/whatsapp";
import { STICKY_BAR_EVENT } from "./StickyOrderBar";

export default function WhatsAppChat() {
  const { t, lang, isRTL } = useI18n();
  const href = getWhatsAppUrl({ action: "general", lang });
  // Lift above the sticky mobile order bar whenever it is visible.
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onBar = (e) => setLifted(!!e.detail);
    window.addEventListener(STICKY_BAR_EVENT, onBar);
    return () => window.removeEventListener(STICKY_BAR_EVENT, onBar);
  }, []);

  return (
    <aside
      aria-label="WhatsApp Concierge"
      className={`fixed z-50 transition-all duration-300 ${
        lifted ? "bottom-[92px]" : "bottom-5"
      } ${isRTL ? "left-5" : "right-5"} lg:bottom-5`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
        aria-label={t("whatsapp.cta")}
      >
        {/* Subtle pulsating beacon */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 motion-safe:animate-ping pointer-events-none"
          aria-hidden="true"
        />

        <MessageCircle size={28} className="relative z-10" fill="currentColor" strokeWidth={1} aria-hidden="true" />

        {/* Hover Tooltip */}
        <span
          className={`absolute bottom-full mb-2 hidden md:group-hover:flex items-center whitespace-nowrap bg-ink text-cream text-[12px] font-body px-3 py-1.5 rounded-lg shadow-md pointer-events-none transition-opacity duration-200 ${
            isRTL ? "left-0" : "right-0"
          }`}
        >
          {t("whatsapp.cta")}
        </span>
      </a>
    </aside>
  );
}
