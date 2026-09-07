import { useI18n } from "../i18n/I18nContext";
import EmailCapture from "./EmailCapture";

export default function Footer() {
  const { t } = useI18n();
  const items = ["glutathione", "collagen", "vitamins"];

  return (
    <footer className="relative z-10 px-6 sm:px-10 lg:px-16 pt-16 pb-12 border-t border-ink/10 bg-cream/60">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid: Headline + Email Capture + Ingredients */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="font-display text-[26px] sm:text-[30px] text-ink block">
              {t("brand")}
            </span>
            <p className="font-display text-[20px] sm:text-[22px] leading-[1.2] text-ink font-normal">
              {t("footer.headline")}
            </p>
            <p className="font-body text-[14px] leading-relaxed text-ink-muted">
              {t("footer.sub")}
            </p>
          </div>

          <div className="lg:col-span-4 w-full">
            <EmailCapture variant="inline" />
          </div>

          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
            {items.map((key) => (
              <div key={key} className="space-y-1">
                <p className="font-body text-[14px] font-medium text-ink">
                  {t(`footer.items.${key}.title`)}
                </p>
                <p className="font-body text-[13px] leading-snug text-ink-muted">
                  {t(`footer.items.${key}.sub`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Disclaimer, Terms & Copyright */}
        <div className="pt-8 border-t border-ink/10 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[12px] font-body">
            <a href="#terms" className="text-ink underline underline-offset-4 decoration-champagne/50 hover:text-champagne transition-colors">
              {t("footer.termsLink") || "Terms & Conditions"}
            </a>
            <span className="text-ink/20">·</span>
            <span className="text-ink-muted">WhatsApp: +971567710573</span>
            <span className="text-ink/20">·</span>
            <a href="mailto:hello@omnia-beautylab.com" className="text-ink-muted hover:text-ink transition-colors">
              hello@omnia-beautylab.com
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left rtl:md:text-right">
            <p className="font-body text-[12px] text-ink-muted max-w-2xl leading-relaxed">
              {t("footer.disclaimer")}
            </p>
            <p className="font-body text-[12px] text-ink-muted/80 whitespace-nowrap">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
