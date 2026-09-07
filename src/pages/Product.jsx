import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ScrollReveal, ParallaxImage, StaggeredReveal, FloatingElement } from "../components/AnimatedElements";

const BASE_PRICE = 79;
const SUB_DISCOUNT = 0.15;
const SUB_PRICE = Math.round(BASE_PRICE * (1 - SUB_DISCOUNT));

export default function Product() {
  const { t, lang } = useI18n();
  const base = `/${lang}`;
  const [activeTab, setActiveTab] = useState("ingredients");
  const [purchaseType, setPurchaseType] = useState("onetime");
  const [frequency, setFrequency] = useState("30");

  const currentPrice = purchaseType === "subscribe" ? SUB_PRICE : BASE_PRICE;
  const savings = BASE_PRICE - currentPrice;

  const chips = ["mg", "count", "col"];
  const ingredients = [
    "ingredients.0", "ingredients.1", "ingredients.2", "ingredients.3", "ingredients.4",
  ];
  const howTo = ["howTo.0", "howTo.1", "howTo.2"];

  return (
    <div className="min-h-screen flex flex-col relative bg-cream text-ink overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(120%_90%_at_15%_0%,#FBF9F2_0%,#F4EFE6_55%,#ECE4D2_100%)]" />

      <Navbar />

      <main className="relative z-10 flex-1">
        {/* Product hero */}
        <section className="px-6 sm:px-10 lg:px-16 pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal delay={0} direction="left">
              <div className="flex justify-center">
                <FloatingElement intensity={8} rotation={0.3}>
                  <ParallaxImage
                    src="/images/gallery/product-bottle.jpg"
                    alt="Omnia Glutathione bottle on desk"
                    className="w-full max-w-[360px] lg:max-w-none lg:max-w-[480px] h-auto object-contain drop-shadow-[0_50px_70px_rgba(33,29,24,0.18)]"
                    speed={0.15}
                    loading="eager"
                  />
                </FloatingElement>
              </div>
            </ScrollReveal>

            <StaggeredReveal delay={100} direction="up" itemClassName="min-w-0">
              <p className="font-body text-[13px] tracking-[0.3em] uppercase text-champagne mb-6">
                {t("product.eyebrow")}
              </p>

              <h1 className="font-display text-[42px] sm:text-[56px] lg:text-[64px] leading-[1.05] tracking-[-0.01em] text-ink">
                {t("product.h1a")}
                <br />
                {t("product.h1b")}
              </h1>

              <p className="mt-8 font-body text-[16px] leading-[1.65] text-ink-muted max-w-md">
                {t("product.lead")}
              </p>

              {/* Spec chips */}
              <div className="mt-8 flex flex-wrap gap-3">
                {chips.map((key) => {
                  const [label, sub] = t(`product.chips.${key}`);
                  return (
                    <span
                      key={key}
                      className="flex flex-col px-4 py-3 bg-white/60 border border-ink/10 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                    >
                      <span className="font-body text-[13px] font-medium text-ink">
                        {label}
                      </span>
                      <span className="mt-1 font-body text-[11px] text-ink-muted">
                        {sub}
                      </span>
                    </span>
                  );
                })}
              </div>

              {/* Purchase options */}
              <div className="mt-10 space-y-6">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-display text-[36px] text-ink">
                    ${currentPrice}
                    {purchaseType === "subscribe" && (
                      <span className="font-body text-[14px] text-champagne ml-2">
                        (-{savings}%)
                      </span>
                    )}
                  </span>
                  {purchaseType === "subscribe" && (
                    <span className="font-body text-[15px] text-ink-muted line-through">
                      ${BASE_PRICE}
                    </span>
                  )}
                  {purchaseType === "onetime" && (
                    <span className="font-body text-[14px] text-ink-muted">
                      {t("product.priceContext")}
                    </span>
                  )}
                </div>

                <div className="border border-ink/10 rounded-lg p-4 space-y-4 bg-white/50">
                  <div className="flex gap-4 flex-wrap">
                    <button
                      onClick={() => setPurchaseType("onetime")}
                      className={`flex-1 min-w-[140px] py-3 px-4 rounded-lg font-body text-[13px] tracking-[0.04em] uppercase transition-colors min-h-[44px] hover:scale-[1.02] active:scale-[0.98] transition-transform ${
                        purchaseType === "onetime"
                          ? "bg-ink text-cream"
                          : "bg-white border border-ink/10 text-ink hover:bg-cream/50"
                      }`}
                    >
                      {t("product.purchase.oneTime")}
                    </button>
                    <button
                      onClick={() => setPurchaseType("subscribe")}
                      className={`flex-1 min-w-[140px] py-3 px-4 rounded-lg font-body text-[13px] tracking-[0.04em] uppercase transition-colors min-h-[44px] hover:scale-[1.02] active:scale-[0.98] transition-transform ${
                        purchaseType === "subscribe"
                          ? "bg-ink text-cream"
                          : "bg-white border border-ink/10 text-ink hover:bg-cream/50"
                      }`}
                    >
                      {t("product.purchase.subscribe")}
                    </button>
                  </div>

                  {purchaseType === "subscribe" && (
                    <div className="pt-2 border-t border-ink/10 space-y-3 animate-fade-up">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-body text-[13px] text-ink-muted">
                          {t("product.purchase.frequency")}
                        </span>
                        <div className="flex gap-2" role="radiogroup" aria-label={t("product.purchase.frequency")}>
                          {["30", "60", "90"].map((f) => (
                            <button
                              key={f}
                              onClick={() => setFrequency(f)}
                              role="radio"
                              aria-checked={frequency === f}
                              className={`px-4 py-2 rounded-lg font-body text-[13px] transition-colors min-h-[40px] hover:scale-[1.02] active:scale-[0.98] transition-transform ${
                                frequency === f
                                  ? "bg-champagne text-ink font-medium"
                                  : "bg-white border border-ink/10 text-ink-muted hover:border-champagne/50"
                              }`}
                            >
                              {t(`product.purchase.frequencies.${f}`)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <p className="font-body text-[12px] text-champagne flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M6 1v10M1 6h10" />
                        </svg>
                        {t("product.purchase.save")} · {t("product.purchase.cancel")}
                      </p>
                    </div>
                  )}
                </div>

                <StaggeredReveal delay={80} direction="up" itemClassName="min-w-0">
                  <a
                    href="#order"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-ink text-cream font-body text-[13px] tracking-[0.1em] uppercase hover:opacity-92 transition-opacity min-h-[44px] w-full sm:w-auto justify-center hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    {t("shopNow")}
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                  <p className="font-body text-[14px] text-ink-muted hover:scale-[1.02] active:scale-[0.98] transition-transform">
                    {t("product.shipping")}
                  </p>
                </StaggeredReveal>
              </div>
            </StaggeredReveal>
          </div>
        </section>

        {/* Ingredients / How to use tabs */}
        <section className="px-6 sm:px-10 lg:px-16 pb-20">
          <div className="flex gap-8 border-b border-ink/10 mb-10">
            {["ingredients", "howTo"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-body text-[14px] tracking-[0.04em] uppercase pb-4 transition-colors min-h-[44px] flex items-center gap-2 ${
                  activeTab === tab
                    ? "text-ink border-b-2 border-champagne -mb-[1px]"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {t(`product.tabs.${tab}`)}
                {activeTab === tab && (
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                )}
              </button>
            ))}
          </div>

          <ScrollReveal delay={0} direction="up">
            {activeTab === "ingredients" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                {ingredients.map((k) => (
                  <div key={k} className="flex gap-4 hover:scale-[1.01] transition-transform">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne/60 mt-2.5 shrink-0" />
                    <div>
                      <p className="font-body text-[15px] font-medium text-ink">
                        {t(`product.${k}.name`)}
                      </p>
                      <p className="mt-1 font-body text-[14px] leading-[1.6] text-ink-muted">
                        {t(`product.${k}.desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-lg">
                <ol className="space-y-6">
                  {howTo.map((k, i) => (
                    <li key={k} className="flex gap-5 items-start hover:scale-[1.01] transition-transform">
                      <span className="font-display text-[22px] text-champagne leading-none shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-body text-[15px] leading-[1.65] text-ink-muted pt-2">
                        {t(`product.${k}`)}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </ScrollReveal>
        </section>

        {/* Label image / Trust section */}
        <section className="px-6 sm:px-10 lg:px-16 pb-20">
          <ScrollReveal delay={0} direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="font-display text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.02em] text-ink">
                  {t("product.trust.h2a")}
                  <br />
                  {t("product.trust.h2b")}
                </h2>
                <p className="mt-6 font-body text-[15px] leading-[1.65] text-ink-muted max-w-md">
                  {t("product.trust.body")}
                </p>
              </div>
              <div className="flex justify-center">
                <ParallaxImage
                  src="/images/gallery/infographic-formula.jpg"
                  alt="Glutathione capsules enriched with vitamins and collagen"
                  className="w-full max-w-[380px] h-auto object-contain drop-shadow-[0_30px_50px_rgba(33,29,24,0.15)]"
                  speed={0.1}
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}