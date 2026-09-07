import { useState } from "react";
import { ChevronDown, Shield } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { ScrollReveal } from "./AnimatedElements";

export default function TermsSection() {
  const { t } = useI18n();
  const terms = t("terms") || { sections: [] };
  const [openIndex, setOpenIndex] = useState(null);

  if (!terms || !terms.sections) return null;

  return (
    <section id="terms" className="scroll-mt-24 px-6 sm:px-10 lg:px-16 py-12 lg:py-14 border-t border-ink/10 bg-cream/60">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-ink/10 mb-3">
            <Shield size={14} className="text-champagne" aria-hidden="true" />
            <span className="font-body text-[12px] tracking-[0.2em] uppercase text-ink">
              {terms.eyebrow}
            </span>
          </div>
          <h2 className="font-display font-normal leading-[1.05] tracking-[-0.02em] text-[28px] sm:text-[36px] lg:text-[44px] text-ink">
            {terms.title}
          </h2>
          <p className="mt-2 font-body text-[13px] text-ink-muted">{terms.updated}</p>
          <p className="mt-3 font-body text-[14px] leading-[1.7] text-ink-muted">
            {terms.intro}
          </p>
        </div>

        <div className="bg-white/70 border border-ink/10 rounded-2xl overflow-hidden shadow-sm divide-y divide-ink/10">
          {terms.sections.map((sec, i) => (
            <div key={i} className="group">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-3 sm:px-6 sm:py-3.5 text-left cursor-pointer hover:bg-cream/40 transition-colors"
                aria-expanded={openIndex === i}
              >
                <h3 className="font-display text-[15px] sm:text-[16px] text-ink font-medium leading-snug">
                  {sec.heading}
                </h3>
                <span
                  className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    openIndex === i ? "bg-ink text-cream rotate-180 border-ink" : "bg-white border-ink/10 text-ink"
                  }`}
                >
                  <ChevronDown size={14} aria-hidden="true" />
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 sm:px-6 pb-4 animate-fade-up">
                  <p className="font-body text-[14px] leading-[1.75] text-ink-muted whitespace-pre-wrap">
                    {sec.body}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 font-body text-[12px] text-ink-muted/70 text-center leading-relaxed">
          {terms.sections[terms.sections.length - 1]?.body.includes("971567710573")
            ? ""
            : "WhatsApp: +971567710573"}
        </p>
      </div>
    </section>
  );
}
