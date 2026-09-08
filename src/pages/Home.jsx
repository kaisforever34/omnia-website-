import { ArrowRight, ArrowUpRight, MessageCircle, Sparkles, Shield, Clock } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProblemSection from "../components/ProblemSection";
import ProductSection from "../components/ProductSection";
import Gallery from "../components/Gallery";
import VideoAd from "../components/VideoAd";
import ReviewsCarousel from "../components/ReviewsCarousel";
import SkinQuizSection from "../components/SkinQuizSection";
import FAQSection from "../components/FAQSection";
import TermsSection from "../components/TermsSection";
import StickyOrderBar from "../components/StickyOrderBar";
import { ScrollReveal, StaggeredReveal, FloatingElement } from "../components/AnimatedElements";
import { getWhatsAppUrl } from "../utils/whatsapp";

export default function Home() {
  const { t, lang, isRTL } = useI18n();
  const heroWhatsAppUrl = getWhatsAppUrl({ action: "heroOrder", lang });

  const scrollToSection = (hash) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", hash);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-cream text-ink overflow-x-hidden">
      {/* Background Radial Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(120%_90%_at_15%_0%,#FBF9F2_0%,#F4EFE6_55%,#ECE4D2_100%)]" />

      {/* Global In-Page Anchor Navbar */}
      <Navbar />

      <main className="relative z-10 flex-1">
        {/* ───────────── 1. HERO SECTION (#hero) ───────────── */}
        <section id="hero" className="px-6 sm:px-10 lg:px-16 pt-8 pb-16 lg:pt-14 lg:pb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-8">
              <ScrollReveal delay={0} direction="up" duration={700}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-ink/10 shadow-xs mb-2">
                  <Sparkles size={14} className="text-champagne" aria-hidden="true" />
                  <span className="font-body text-[12px] tracking-[0.1em] text-ink font-medium uppercase">
                    {t("hero.eyebrow")}
                  </span>
                </div>

                <h1 className="font-display font-normal leading-[1.02] tracking-[-0.02em] text-[40px] sm:text-[68px] md:text-[80px] lg:text-[88px] xl:text-[96px] text-ink">
                  {t("hero.h1a")}
                  <br />
                  <span className="italic font-normal">{t("hero.h1b")}</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={120} direction="up" duration={700}>
                <p className="max-w-xl font-body text-[16px] sm:text-[18px] leading-[1.65] text-ink-muted">
                  {t("hero.lead")}
                </p>
              </ScrollReveal>

              {/* CTAs */}
              <StaggeredReveal delay={180} direction="up" duration={600} itemClassName="min-w-0" className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={heroWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-ink text-cream rounded-xl font-body text-[13px] tracking-[0.08em] uppercase hover:bg-champagne hover:text-ink transition-all duration-300 min-h-[50px] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  <span className="font-medium">{t("hero.primaryCta")}</span>
                </a>

                {/* Mobile: quiet text link so the WhatsApp CTA owns the eye.
                    sm+: full secondary button as before. */}
                <button
                  onClick={() => scrollToSection("#product")}
                  className="sm:hidden inline-flex items-center gap-1.5 px-2 py-3 font-body text-[13px] tracking-[0.08em] uppercase text-ink-muted underline decoration-champagne decoration-2 underline-offset-8 min-h-[44px] cursor-pointer"
                >
                  <span>{t("hero.secondaryCta")}</span>
                  <ArrowRight size={14} className="rtl:rotate-180" aria-hidden="true" />
                </button>
                <button
                  onClick={() => scrollToSection("#product")}
                  className="hidden sm:inline-flex group items-center justify-center gap-2.5 px-7 py-4 border border-ink/20 text-ink bg-white/40 rounded-xl font-body text-[13px] tracking-[0.08em] uppercase hover:bg-white hover:border-champagne transition-all min-h-[50px] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>{t("hero.secondaryCta")}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </button>
              </StaggeredReveal>

              {/* Immediate trust row + spec pills */}
              <ScrollReveal delay={240} direction="up" duration={700}>
                <div className="pt-6 border-t border-ink/10 flex flex-wrap gap-4 sm:gap-6 text-ink-muted font-body text-[13px]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                    <span>{t("hero.trust.a")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                    <span>{t("hero.trust.b")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                    <span>{t("hero.trust.c")}</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 sm:gap-6 text-ink-muted/70 font-body text-[12px]">
                  <span>{t("hero.specs.capsules")} · {t("hero.specs.dosage")} · {t("hero.specs.results")}</span>
                </div>
              </ScrollReveal>

              {/* Hook strip — 3 visual proofs right under the fold */}
              <ScrollReveal delay={300} direction="up" duration={700}>
                {/* Hook strip — one proof on mobile (diet), three on sm+ */}
                <div className="pt-4 sm:pt-6 flex gap-3">
                  <img src="/images/gallery/curated-beforeafter-eyes.jpg" alt="Before/after eyes" className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-ink/10 shadow-sm" loading="lazy" />
                  <img src="/images/gallery/curated-hook-collage.jpg" alt="Real transformations collage" className="hidden sm:block w-24 h-24 rounded-xl object-cover border border-ink/10 shadow-sm" loading="lazy" />
                  <img src="/images/gallery/curated-hand-capsules.jpg" alt="Capsules in hand" className="hidden sm:block w-24 h-24 rounded-xl object-cover border border-ink/10 shadow-sm" loading="lazy" />
                </div>
                <p className="hidden sm:block mt-2 font-body text-[11px] tracking-[0.15em] uppercase text-ink/40">Real results — tap to see more ↓</p>
              </ScrollReveal>
            </div>

            {/* Right Product Visual Column */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <FloatingElement intensity={8} rotation={0.2}>
                <div className="relative max-w-[260px] sm:max-w-[420px] lg:max-w-[460px]">
                  {/* Subtle golden ambient glow */}
                  <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(185,146,68,0.22)_0%,transparent_75%)] blur-2xl" />
                  
                  <img
                    src="/product/front.png"
                    alt="OmniaGlow Glutathione Supplement Bottle"
                    className="w-full h-auto object-contain drop-shadow-[0_45px_70px_rgba(33,29,24,0.25)]"
                    loading="eager"
                  />
                  
                  {/* Soft Ground Shadow */}
                  <div className="mx-auto mt-2 h-4 w-3/4 rounded-[50%] bg-ink/20 blur-md" />
                </div>
              </FloatingElement>
            </div>
          </div>
        </section>

        {/* ───────────── 2. PROBLEM & MISSION SECTION (#about) ───────────── */}
        <ProblemSection />

        {/* ───────────── 3. PRODUCT & 3D VIEWER CENTERPIECE (#product) ───────────── */}
        <ProductSection />

        {/* ───────────── 4. SOCIAL PROOF & TESTIMONIALS (#results) ───────────── */}
        <Gallery />
        {/* ───────────── 4b. CUSTOMER STORY VIDEO ───────────── */}
        <VideoAd />
        <ReviewsCarousel />

        {/* ───────────── 5. IN-PAGE SKIN DIAGNOSTIC QUIZ (#quiz) ───────────── */}
        <SkinQuizSection />

        {/* ───────────── 6. FAQ ACCORDION (#faq) ───────────── */}
        <FAQSection />

        {/* ───────────── 7. TERMS & CONDITIONS (#terms) ───────────── */}
        <TermsSection />
      </main>

      {/* ───────────── 8. FOOTER ───────────── */}
      <Footer />
      {/* Slim mobile buy bar (fixed) + spacer so it never covers content */}
      <StickyOrderBar />
    </div>
  );
}
