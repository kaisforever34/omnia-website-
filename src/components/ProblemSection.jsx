import { useI18n } from "../i18n/I18nContext";
import { ScrollReveal } from "./AnimatedElements";

export default function ProblemSection() {
  const { t } = useI18n();

  return (
    <section id="about" className="scroll-mt-24 px-6 sm:px-10 lg:px-16 py-12 lg:py-16 border-t border-ink/10 relative">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal delay={0} direction="up">
          <p className="font-body text-[13px] tracking-[0.3em] uppercase text-champagne mb-4">
            {t("problem.eyebrow")}
          </p>
          <h2 className="font-display font-normal leading-[1.05] tracking-[-0.02em] text-[36px] sm:text-[48px] lg:text-[56px] text-ink max-w-2xl">
            {t("problem.h2a")}
            <br />
            {t("problem.h2b")}
          </h2>
          <p className="mt-6 font-body text-[17px] sm:text-[19px] leading-[1.55] text-ink font-medium max-w-3xl">
            {t("problem.lead")}
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
          <ScrollReveal delay={100} direction="up">
            <div className="p-6 sm:p-8 bg-white/50 border border-ink/10 rounded-2xl h-full">
              <span className="font-display text-[20px] text-champagne mb-3 block">01</span>
              <p className="font-body text-[15px] leading-[1.7] text-ink-muted">
                {t("problem.p1")}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} direction="up">
            <div className="p-6 sm:p-8 bg-white/50 border border-ink/10 rounded-2xl h-full">
              <span className="font-display text-[20px] text-champagne mb-3 block">02</span>
              <p className="font-body text-[15px] leading-[1.7] text-ink-muted">
                {t("problem.p2")}
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={300} direction="up">
          <figure className="mt-10 relative overflow-hidden rounded-2xl border border-ink/10">
            <img src="/images/gallery/curated-natural-glow.jpg" alt="Natural glow — hook" className="w-full h-auto object-cover max-h-[420px]" loading="lazy" />
          </figure>
        </ScrollReveal>
      </div>
    </section>
  );
}
