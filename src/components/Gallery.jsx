import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { ScrollReveal, ParallaxImage, StaggeredReveal } from "./AnimatedElements";

export default function Gallery() {
  const { t } = useI18n();

  const scrollToProduct = (e) => {
    e.preventDefault();
    const el = document.querySelector("#product");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "#product");
    }
  };

  return (
    <>
      {/* ─────── Before / After testimonial (#results) ─────── */}
      <section id="results" className="scroll-mt-24 px-6 sm:px-10 lg:px-16 pt-12 pb-10 lg:pb-12 border-t border-ink/10">
        <ScrollReveal delay={0} direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <p className="font-body text-[13px] tracking-[0.3em] uppercase text-champagne mb-3">
                {t("results.eyebrow")}
              </p>
              <h2 className="font-display text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.05] tracking-[-0.01em] text-ink max-w-xl">
                {t("results.title")}
              </h2>
            </div>
            <p className="font-body text-[14px] sm:text-[15px] leading-[1.6] text-ink-muted max-w-sm">
              {t("results.subtitle")}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} direction="up">
          <figure className="relative overflow-hidden bg-cream/40 border border-ink/10 rounded-2xl max-h-[520px] lg:max-h-[600px]">
            <ParallaxImage
              src="/images/gallery/curated-beforeafter-eyes.jpg"
              alt="Before and after — visible reduction in fine lines after consistent Omnia use"
              className="w-full h-full object-cover"
              speed={0.15}
              loading="lazy"
            />
          </figure>
        </ScrollReveal>
      </section>

      {/* ─────── Centered 7-day testimonial ─────── */}
      <section className="px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal delay={0} direction="up">
            <p className="font-body text-[13px] tracking-[0.3em] uppercase text-champagne mb-5">
              {t("results.shift7Title")}
            </p>
            <p className="font-display text-[26px] sm:text-[34px] lg:text-[42px] leading-[1.2] text-ink">
              {t("results.shift7Quote")}
            </p>
            <p className="mt-6 font-body text-[15px] sm:text-[16px] leading-[1.7] text-ink-muted max-w-2xl mx-auto">
              {t("results.shift7Body")}
            </p>
            <button
              onClick={scrollToProduct}
              className="group mt-8 inline-flex items-center gap-3 px-8 py-4 bg-ink text-cream font-body text-[13px] tracking-[0.1em] uppercase hover:bg-champagne hover:text-ink transition-all duration-300 rounded-xl min-h-[44px] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>{t("shopTheFormula")}</span>
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform rtl:rotate-[-90deg]"
              />
            </button>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200} direction="up">
          <figure className="relative mt-12 lg:mt-16 max-w-sm mx-auto">
            <ParallaxImage
              src="/images/gallery/testimonial-7days.jpg"
              alt="Seven days to brighter skin with Omnia"
              className="w-full h-auto object-cover"
              wrapperClassName="rounded-2xl shadow-sm"
              speed={0.1}
              loading="lazy"
            />
          </figure>
        </ScrollReveal>
      </section>

      {/* ─────── Lifestyle duo ─────── */}
      <section className="px-6 sm:px-10 lg:px-16 pb-10 lg:pb-12">
        <StaggeredReveal
          delay={100}
          direction="up"
          itemClassName="relative min-w-0"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
        >
          <figure className="relative overflow-hidden bg-cream/40 border border-ink/10 rounded-2xl h-[360px] sm:h-[400px] lg:h-[460px]">
            <ParallaxImage
              src="/images/gallery/lifestyle-bottle.jpg"
              alt="Woman smiling with the Omnia Glutathione bottle"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              speed={0.08}
              loading="lazy"
            />
          </figure>
          <figure className="relative overflow-hidden bg-cream/40 border border-ink/10 rounded-2xl h-[360px] sm:h-[400px] lg:h-[460px]">
            <ParallaxImage
              src="/images/gallery/curated-hand-capsules.jpg"
              alt="Premium Omnia capsules — 50 capsules of L-Glutathione and Vitamins"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              speed={0.08}
              loading="lazy"
            />
          </figure>
        </StaggeredReveal>

        <ScrollReveal delay={300} direction="up">
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="font-display text-[22px] sm:text-[28px] leading-[1.2] text-ink max-w-lg">
              {t("results.duoQuote")}
            </p>
            <button
              onClick={scrollToProduct}
              className="font-body text-[14px] text-ink-muted underline underline-offset-[6px] decoration-champagne/50 hover:text-ink transition-colors min-h-[40px] inline-flex items-center cursor-pointer"
            >
              {t("whyOmniaWorks")}
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* ─────── Editorial Natural Glow ─────── */}
      <section className="px-6 sm:px-10 lg:px-16 pb-10 lg:pb-12">
        <ScrollReveal delay={0} direction="up">
          <figure className="relative overflow-hidden rounded-2xl bg-cream/40 border border-ink/10">
            <img
              src="/images/gallery/curated-natural-glow.jpg"
              alt="Your Natural Glow — Omnia"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </figure>
        </ScrollReveal>
      </section>
    </>
  );
}
