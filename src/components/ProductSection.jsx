import { useState } from "react";
import { MessageCircle, Check, Sparkles, Shield, Droplets, Leaf } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import ProductViewer from "./ProductViewer";
import { ScrollReveal, StaggeredReveal } from "./AnimatedElements";
import { getWhatsAppUrl } from "../utils/whatsapp";

export default function ProductSection() {
  const { t, lang, isRTL } = useI18n();
  const tiers = t("product.tiers") || [];
  const [selectedTierId, setSelectedTierId] = useState("1-bottle");

  const selectedTier = tiers.find((t) => t.id === selectedTierId) || tiers[0] || {};
  const ingredients = t("product.ingredients") || [];
  const howTo = t("product.howTo") || [];
  const whyItems = t("why.items") || [];

  const tierWhatsAppUrl = getWhatsAppUrl({
    action: "tierOrder",
    lang,
    data: {
      count: selectedTier.count || 1,
      price: selectedTier.price || 99,
      name: selectedTier.name || "OmniaGlow Glutathione",
    },
  });

  return (
    <section id="product" className="scroll-mt-24 px-6 sm:px-10 lg:px-16 py-12 lg:py-16 border-t border-ink/10 relative">
      <div className="max-w-7xl mx-auto space-y-12 lg:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <ScrollReveal delay={0} direction="up">
            <p className="font-body text-[13px] tracking-[0.3em] uppercase text-champagne-deep mb-4">
              {t("product.eyebrow")}
            </p>
            <h2 className="font-display font-normal leading-[1.05] tracking-[-0.02em] text-[36px] sm:text-[48px] lg:text-[60px] text-ink">
              {t("product.h2a")}
              <br />
              {t("product.h2b")}
            </h2>
            <p className="mt-6 font-body text-[16px] sm:text-[17px] leading-[1.65] text-ink-muted">
              {t("product.lead")}
            </p>
          </ScrollReveal>
        </div>

        {/* 3D Product Viewer + Order Package Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive 3D Viewer */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-[480px]">
              <ProductViewer />
            </div>
            <p className="mt-4 font-body text-[12px] tracking-[0.1em] text-ink/40 uppercase text-center">
              {t("product.viewerHint")}
            </p>
          </div>

          {/* Right Column: Package Selector & Concierge Checkout */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="font-body text-[13px] tracking-[0.25em] uppercase text-champagne-deep mb-2">
                {t("product.packagesTitle")}
              </p>
              <p className="font-body text-[14px] text-ink-muted">
                {t("product.packagesSub")}
              </p>
            </div>

            {/* Package Option Cards */}
            <div className="space-y-3.5" role="radiogroup" aria-label={t("product.packagesTitle")}>
              {tiers.map((tier) => {
                const isSelected = tier.id === selectedTierId;
                // Each card carries its own order link with this tier baked in,
                // so the WhatsApp message can never mismatch the package.
                const cardOrderUrl = getWhatsAppUrl({
                  action: "tierOrder",
                  lang,
                  data: {
                    count: tier.count || 1,
                    price: tier.price || 99,
                    name: tier.name || "OmniaGlow Glutathione",
                  },
                });
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedTierId(tier.id);
                      }
                    }}
                    role="radio"
                    tabIndex={0}
                    aria-checked={isSelected}
                    className={`w-full relative p-5 rounded-2xl border transition-all duration-200 text-left flex items-center justify-between gap-4 cursor-pointer min-h-[72px] ${
                      isSelected
                        ? "border-champagne bg-white shadow-md ring-1 ring-champagne/30"
                        : "border-ink/10 bg-white/50 hover:bg-white/80 hover:border-champagne/40"
                    } ${isRTL ? "text-right flex-row-reverse" : "text-left"}`}
                  >
                    {/* Most Popular */}
                    {tier.popular && (
                      <span className="absolute -top-3 left-6 bg-ink text-cream text-[11px] font-medium tracking-[0.05em] uppercase px-3 py-0.5 rounded-full shadow-sm rtl:left-auto rtl:right-6">
                        ★ {t("product.popularLabel")}
                      </span>
                    )}
                    {/* Badge */}
                    {tier.badge && (
                      <span className="absolute -top-3 right-6 bg-champagne text-ink text-[11px] font-medium tracking-[0.05em] uppercase px-3 py-0.5 rounded-full shadow-sm rtl:right-auto rtl:left-6">
                        {tier.badge}
                      </span>
                    )}

                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected ? "border-champagne bg-champagne text-ink" : "border-ink/20"
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} aria-hidden="true" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-display text-[18px] sm:text-[20px] text-ink font-normal leading-tight">
                            {tier.name}
                          </p>
                        </div>
                        <p className="font-body text-[13px] text-ink-muted mt-0.5">
                          {tier.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className={isRTL ? "text-left" : "text-right"}>
                      <div className="flex items-baseline gap-1.5 justify-end">
                        <span className="font-display text-[22px] sm:text-[26px] text-ink font-medium">
                          {tier.price} {lang === "ar" ? "درهم" : "AED"}
                        </span>
                        {tier.originalPrice && (
                          <span className="font-body text-[13px] text-ink-muted line-through">
                            {tier.originalPrice} {lang === "ar" ? "درهم" : "AED"}
                          </span>
                        )}
                      </div>
                      <p className="font-body text-[11px] text-champagne-deep font-medium">
                        {tier.pricePerBottle} {lang === "ar" ? "درهم" : "AED"} / {lang === "ar" ? "عبوة" : "bottle"}
                      </p>
                      <a
                        href={cardOrderUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 mt-1 font-body text-[12px] font-medium text-ink underline decoration-champagne decoration-2 underline-offset-4 hover:text-champagne transition-colors min-h-[32px]"
                      >
                        {t("orderThisPackage")}
                        <span aria-hidden="true">{isRTL ? "←" : "→"}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic WhatsApp Action */}
            <div className="pt-3 space-y-3">
              <a
                href={tierWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 bg-ink text-cream rounded-xl font-body text-[13px] sm:text-[14px] tracking-[0.08em] uppercase hover:bg-champagne hover:text-ink transition-all duration-300 min-h-[52px] shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span className="font-medium">{t("product.orderTierCta")}</span>
              </a>
              <p className="font-body text-[12px] text-ink-muted text-center leading-relaxed">
                {t("product.orderGuarantee")}
              </p>
              <p className="font-body text-[12px] text-ink-muted/90 text-center leading-relaxed">
                {t("product.orderSteps")}
              </p>
            </div>
          </div>
        </div>

        {/* Real Ingredients Breakdown */}
        <div className="pt-12 border-t border-ink/10">
          <div className="max-w-3xl mb-8">
            <p className="font-body text-[13px] tracking-[0.3em] uppercase text-champagne-deep mb-3">
              {lang === "ar" ? "التركيبة النقية" : "Clean Formulation"}
            </p>
            <h3 className="font-display text-[30px] sm:text-[40px] leading-[1.1] text-ink">
              {t("product.ingredientsTitle")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredients.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 bg-white/60 border border-ink/10 rounded-2xl hover:bg-white transition-colors space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="w-2 h-2 rounded-full bg-champagne" />
                  <span className="font-body text-[12px] font-semibold text-champagne-deep tracking-wider uppercase bg-champagne/10 px-2.5 py-0.5 rounded">
                    {item.amount}
                  </span>
                </div>
                <h4 className="font-display text-[18px] sm:text-[20px] text-ink font-medium leading-snug">
                  {item.name}
                </h4>
                <p className="font-body text-[14px] leading-[1.65] text-ink-muted">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Numbered How to Use Sequence */}
        <div className="pt-12 border-t border-ink/10">
          <div className="max-w-3xl mb-8">
            <p className="font-body text-[13px] tracking-[0.3em] uppercase text-champagne-deep mb-3">
              {lang === "ar" ? "إرشادات الاستخدام" : "Daily Protocol"}
            </p>
            <h3 className="font-display text-[30px] sm:text-[40px] leading-[1.1] text-ink">
              {t("product.howToTitle")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howTo.map((item, idx) => (
              <div key={idx} className="relative p-6 sm:p-8 bg-white/40 border border-ink/10 rounded-2xl space-y-4">
                <span className="font-display text-[32px] text-champagne/70 leading-none block">
                  {item.step}
                </span>
                <h4 className="font-display text-[20px] text-ink font-medium">
                  {item.title}
                </h4>
                <p className="font-body text-[14px] leading-[1.7] text-ink-muted">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why OmniaGlow (3 Trust Pillars) */}
        <div className="p-6 sm:p-10 lg:p-12 bg-white/70 border border-ink/10 rounded-3xl space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-body text-[13px] tracking-[0.3em] uppercase text-champagne-deep mb-3">
              {t("why.eyebrow")}
            </p>
            <h3 className="font-display text-[28px] sm:text-[38px] leading-[1.15] text-ink">
              {t("why.title")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyItems.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-champagne/10 flex items-center justify-center text-champagne mb-4">
                  {idx === 0 ? <Shield size={20} /> : idx === 1 ? <Leaf size={20} /> : <Droplets size={20} />}
                </div>
                <h4 className="font-display text-[20px] text-ink font-medium">
                  {item.title}
                </h4>
                <p className="font-body text-[14px] leading-[1.7] text-ink-muted">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
