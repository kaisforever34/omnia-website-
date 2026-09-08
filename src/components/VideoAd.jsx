import { useState, useRef, useCallback } from "react";
import { MessageCircle, Volume2, VolumeX, Play } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { ScrollReveal } from "./AnimatedElements";
import { getWhatsAppUrl } from "../utils/whatsapp";

const ENDCARD_SECONDS = 2.5;

/**
 * Customer-story video section.
 * - 15s cut autoplays muted + loops inline (no sound = no surprise).
 * - Tapping the video toggles sound; tapping CTA opens WhatsApp order chat.
 * - Price/COD/WhatsApp end-card is HTML (crisp, bilingual, tappable) shown
 *   over the final seconds of every loop via onTimeUpdate.
 */
export default function VideoAd() {
  const { t, lang, isRTL } = useI18n();
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [showEndcard, setShowEndcard] = useState(false);
  const orderUrl = getWhatsAppUrl({ action: "heroOrder", lang });

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  }, []);

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration || Number.isNaN(v.duration)) return;
    setShowEndcard((prev) => {
      const next = v.duration - v.currentTime <= ENDCARD_SECONDS;
      return next === prev ? prev : next;
    });
  }, []);

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-12 lg:py-16 border-t border-ink/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Copy */}
        <ScrollReveal delay={0} direction="up">
          <div className={isRTL ? "text-right" : "text-left"}>
            <p className="font-body text-[13px] tracking-[0.3em] uppercase text-champagne mb-3">
              {t("videoAdBadge")}
            </p>
            <h2 className="font-display text-[30px] sm:text-[40px] lg:text-[48px] leading-[1.1] text-ink">
              {t("videoAdTitle")}
            </h2>
            <p className="mt-4 font-body text-[15px] sm:text-[16px] leading-[1.7] text-ink-muted max-w-lg">
              {t("videoAdLead")}
            </p>
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-3 px-8 py-4 bg-ink text-cream rounded-xl font-body text-[13px] tracking-[0.08em] uppercase hover:bg-champagne hover:text-ink transition-all min-h-[52px] shadow-sm hover:scale-[1.02] active:scale-[0.99]"
            >
              <MessageCircle size={17} aria-hidden="true" />
              <span className="font-medium">{t("orderWhatsApp")}</span>
            </a>
            <p className="mt-3 font-body text-[12px] text-ink-muted">{t("videoAdNote")}</p>
          </div>
        </ScrollReveal>

        {/* Player */}
        <ScrollReveal delay={120} direction="up">
          <div className="flex justify-center">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px]">
              <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 shadow-[0_30px_60px_rgba(33,29,24,0.25)] bg-ink">
                <video
                  ref={videoRef}
                  src="/videos/omnia-ad-15s.mp4"
                  poster="/videos/omnia-ad-poster.jpg"
                  className="w-full aspect-[9/16] object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onTimeUpdate={onTimeUpdate}
                  onClick={toggleMute}
                  aria-label={t("videoAdBadge")}
                />
                {/* Sound toggle */}
                <button
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute video" : "Mute video"}
                  className="absolute top-3 flex items-center justify-center w-10 h-10 rounded-full bg-ink/60 text-cream backdrop-blur-sm active:scale-95 min-h-[40px] min-w-[40px]"
                  style={isRTL ? { left: "0.75rem" } : { right: "0.75rem" }}
                >
                  {muted ? <VolumeX size={17} aria-hidden="true" /> : <Volume2 size={17} aria-hidden="true" />}
                </button>
                {/* Muted hint (first loop only, until endcard shows) */}
                {!showEndcard && muted && (
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink/60 text-cream font-body text-[11px] backdrop-blur-sm pointer-events-none whitespace-nowrap">
                    <Play size={12} aria-hidden="true" />
                    {lang === "ar" ? "اضغطي للصوت" : "Tap for sound"}
                  </span>
                )}
                {/* End-card overlay: price + COD + WhatsApp CTA */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-ink/90 via-ink/60 to-transparent transition-opacity duration-300 ${
                    showEndcard ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <p className="text-center font-display text-cream text-[22px] leading-tight">
                    99 {lang === "ar" ? "درهم" : "AED"}
                  </p>
                  <p className="mt-1 text-center font-body text-cream/85 text-[12px]">
                    {lang === "ar" ? "الدفع عند الاستلام · جميع أنحاء الإمارات" : "Cash on Delivery · Across the UAE"}
                  </p>
                  <a
                    href={orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={showEndcard ? 0 : -1}
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-body text-[13px] tracking-[0.06em] uppercase font-medium min-h-[48px] active:scale-[0.98]"
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    <span>{t("orderWhatsApp")}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
