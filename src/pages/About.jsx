import { useI18n } from "../i18n/I18nContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  const { t } = useI18n();
  const valueKeys = ["values.0", "values.1", "values.2"];

  return (
    <div className="min-h-screen flex flex-col relative bg-cream text-ink overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(120%_90%_at_15%_0%,#FBF9F2_0%,#F4EFE6_55%,#ECE4D2_100%)]" />

      <Navbar />

      <main className="relative z-10 flex-1">
        {/* Brand story */}
        <section className="px-6 sm:px-10 lg:px-16 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-3xl">
            <h1 className="animate-fade-up font-display font-normal leading-[1.05] tracking-[-0.02em] text-[48px] sm:text-[64px] lg:text-[80px] text-ink">
              {t("about.h1a")}
              <br />
              {t("about.h1b")}
            </h1>

            <p className="animate-fade-up anim-delay-100 mt-10 font-body text-[18px] leading-[1.5] text-ink max-w-xl">
              {t("about.tagline")}
            </p>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-up anim-delay-200">
              <p className="font-body text-[16px] leading-[1.7] text-ink-muted">
                {t("about.p1")}
              </p>
              <p className="font-body text-[16px] leading-[1.7] text-ink-muted">
                {t("about.p2")}
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 sm:px-10 lg:px-16 pb-20 lg:pb-28">
          <div className="max-w-5xl">
            <p className="animate-fade-up font-body text-[13px] tracking-[0.3em] uppercase text-champagne mb-12">
              {t("about.whyEyebrow")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-fade-up anim-delay-100">
              {valueKeys.map((k) => (
                <div key={k}>
                  <p className="font-display text-[22px] leading-[1.2] text-ink mb-4">
                    {t(`about.${k}.title`)}
                  </p>
                  <p className="font-body text-[14px] leading-[1.7] text-ink-muted">
                    {t(`about.${k}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lifestyle image */}
        <section className="px-6 sm:px-10 lg:px-16 pb-20">
          <div className="animate-fade-up">
            <img
              src="/images/gallery/infographic-whitening.jpg"
              alt="Deep hydration and skin renewal — Omnia Glutathione"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}