import { useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-ink/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left min-h-[44px]"
        aria-expanded={open}
        aria-label={open ? q + " - close" : q + " - open"}
      >
        <span className="font-body text-[15px] text-ink pr-6 rtl:pr-0 rtl:pl-6">
          {q}
        </span>
        <span className="shrink-0 w-6 h-6 flex items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}
            aria-hidden="true"
          >
            <path d="M7 1v12M1 7h12" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="font-body text-[14px] leading-[1.7] text-ink-muted pb-6 max-w-2xl animate-fade-up">
          {a}
        </p>
      )}
    </div>
  );
}

export default function FAQ() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState(0);
  const faqKeys = Array.from({ length: 8 }, (_, i) => `faq.items.${i}`);
  const faqs = faqKeys.map((k) => ({ q: t(`${k}.q`), a: t(`${k}.a`) }));

  return (
    <div className="min-h-screen flex flex-col relative bg-cream text-ink overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(120%_90%_at_15%_0%,#FBF9F2_0%,#F4EFE6_55%,#ECE4D2_100%)]" />

      <Navbar />

      <main className="relative z-10 flex-1 px-6 sm:px-10 lg:px-16 pt-16 pb-20 lg:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-10">
            <figure className="animate-fade-up">
              <img
                src="/images/gallery/infographic-tips.jpg"
                alt="Three skincare tips from OmniaGlow Beautylab"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </figure>
          </div>

          <div className="lg:col-span-8 max-w-3xl">
            <h1 className="animate-fade-up font-display font-normal leading-[1.05] tracking-[-0.02em] text-[44px] sm:text-[60px] lg:text-[72px] text-ink">
              {t("faq.h1a")}
              <br />
              {t("faq.h1b")}
            </h1>

            <p className="animate-fade-up anim-delay-100 mt-8 font-body text-[16px] leading-[1.65] text-ink-muted max-w-md">
              {t("faq.lead")}
            </p>

            <div className="mt-14 animate-fade-up anim-delay-200">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>

            <div className="mt-16 animate-fade-up anim-delay-200">
              <p className="font-body text-[15px] text-ink-muted">
                {t("faq.more")}{" "}
                <a
                  href="mailto:hello@omnia.com"
                  className="text-ink underline underline-offset-[6px] decoration-champagne/60 hover:text-champagne transition-colors"
                >
                  hello@omnia.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
