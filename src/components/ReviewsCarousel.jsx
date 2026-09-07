import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, MapPin, Clock } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";

export default function ReviewsCarousel() {
  const { t, isRTL } = useI18n();
  const reviews = t("results.reviews") || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsPerView);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 40) {
      if (isRTL) {
        if (diff > 0) goNext(); else goPrev();
      } else {
        if (diff > 0) goPrev(); else goNext();
      }
    }
    setTouchStart(null);
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="px-6 sm:px-10 lg:px-16 pb-12 lg:pb-16" aria-label={t("results.reviewsTitle")}>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto animate-fade-up">
          <p className="font-body text-[13px] tracking-[0.3em] uppercase text-champagne mb-3">
            {t("results.reviewsTitle")}
          </p>
          <h3 className="font-display text-[30px] sm:text-[40px] leading-[1.1] text-ink">
            {t("results.reviewsSubtitle")}
          </h3>
        </div>

        <div className="relative">
          <div
            className="flex gap-6 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-roledescription="carousel"
            aria-label={t("results.reviewsTitle")}
          >
            {visibleReviews.map((review, i) => (
              <article
                key={currentIndex + i}
                className="flex-1 min-w-0 animate-fade-up"
              >
                <div className="bg-white/70 border border-ink/10 rounded-2xl p-6 sm:p-7 h-full flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center gap-1 mb-4" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, star) => (
                        <Star
                          key={star}
                          size={15}
                          fill="currentColor"
                          className="text-[#B99244]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>

                    <p className="font-body text-[14px] sm:text-[15px] leading-[1.7] text-ink mb-6">
                      "{review.text}"
                    </p>
                  </div>

                  <div className="border-t border-ink/10 pt-4 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-champagne/15 flex items-center justify-center flex-shrink-0 text-champagne font-display font-medium text-[15px]">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-body text-[14px] font-medium text-ink">{review.name}</p>
                        <p className="font-body text-[12px] text-ink-muted flex items-center gap-1">
                          <MapPin size={11} aria-hidden="true" /> {review.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-ink-muted/80 text-[12px] font-body pt-1">
                      <Clock size={11} aria-hidden="true" />
                      <span>{review.time}</span>
                      <span>·</span>
                      <span className="text-champagne font-medium">{review.concern}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation Arrows */}
          {reviews.length > itemsPerView && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="w-11 h-11 rounded-full bg-white border border-ink/10 flex items-center justify-center text-ink hover:bg-cream hover:border-champagne transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-sm"
                aria-label="Previous reviews"
              >
                <ChevronLeft size={18} className="rtl:rotate-180" aria-hidden="true" />
              </button>
              <div className="flex gap-1.5" aria-hidden="true">
                {[...Array(maxIndex + 1)].map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentIndex(dotIdx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === dotIdx ? "w-6 bg-champagne" : "w-2 bg-ink/20"
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                disabled={currentIndex >= maxIndex}
                className="w-11 h-11 rounded-full bg-white border border-ink/10 flex items-center justify-center text-ink hover:bg-cream hover:border-champagne transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-sm"
                aria-label="Next reviews"
              >
                <ChevronRight size={18} className="rtl:rotate-180" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Instagram link */}
          <div className="mt-8 text-center animate-fade-up">
            <a
              href="https://www.instagram.com/omnia.beautylab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-[13px] text-ink-muted hover:text-champagne transition-colors min-h-[44px]"
            >
              <span aria-hidden="true">◎</span>
              <span>{t("results.instagramCta")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
