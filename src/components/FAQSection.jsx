import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { ScrollReveal } from "./AnimatedElements";
import { getWhatsAppUrl } from "../utils/whatsapp";

function FAQItem({ q, a, open, onToggle, isRTL }) {
  return (
    <div className="border-b border-ink/10">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between py-6 text-left min-h-[44px] cursor-pointer ${
          isRTL ? "text-right" : "text-left"
        }`}
        aria-expanded={open}
      >
        <span className="font-body text-[16px] sm:text-[17px] font-medium text-ink pr-6 rtl:pr-0 rtl:pl-6">
          {q}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border border-ink/10 flex items-center justify-center transition-all duration-300 ${
            open ? "bg-ink text-cream rotate-45" : "bg-white/60 text-ink"
          }`}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <path d="M7 1v12M1 7h12" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-6 max-w-3xl animate-fade-up">
          <p className="font-body text-[14px] sm:text-[15px] leading-[1.75] text-ink-muted">
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const { t, lang, isRTL } = useI18n();
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = t("faq.items") || [];

  const faqWhatsAppUrl = getWhatsAppUrl({ action: "faqAsk", lang });

  return (
    <section id="faq" className="scroll-mt-24 px-6 sm:px-10 lg:px-16 py-20 lg:py-28 border-t border-ink/10 relative">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <ScrollReveal delay={0} direction="up">
            <p className="font-body text-[13px] tracking-[0.3em] uppercase text-champagne mb-4">
              {t("faq.eyebrow")}
            </p>
            <h2 className="font-display font-normal leading-[1.05] tracking-[-0.02em] text-[36px] sm:text-[48px] lg:text-[56px] text-ink">
              {t("faq.h2a")}
              <br />
              {t("faq.h2b")}
            </h2>
            <p className="mt-5 font-body text-[16px] leading-[1.65] text-ink-muted">
              {t("faq.lead")}
            </p>
          </ScrollReveal>
        </div>

        {/* Accordion List */}
        <div className="bg-white/60 border border-ink/10 rounded-2xl p-6 sm:p-10 shadow-sm">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              isRTL={isRTL}
            />
          ))}
        </div>

        {/* WhatsApp Specialist Contact */}
        <div className="text-center space-y-4 pt-4">
          <p className="font-body text-[15px] text-ink-muted">
            {t("faq.more")}
          </p>
          <a
            href={faqWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-white/80 border border-ink/15 rounded-full font-body text-[13px] text-ink hover:border-champagne hover:bg-white hover:text-champagne transition-all duration-300 min-h-[44px]"
          >
            <MessageCircle size={16} className="text-[#25D366]" aria-hidden="true" />
            <span>{t("faq.contactAdvisor")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
