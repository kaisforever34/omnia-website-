import { useState, useEffect, useCallback } from "react";
import { X, Mail, Check, Loader2 } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";

const STORAGE_KEY = "omnia-email-captured";
const MODAL_STORAGE_KEY = "omnia-modal-dismissed";
const VISITS_KEY = "omnia-visits";
const INTENT_KEY = "omnia-order-intent";

export default function EmailCapture({ variant = "modal", className = "" }) {
  const { t } = useI18n();
  const ec = t("emailCapture");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const isSubmitted = useCallback(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === email.toLowerCase();
    } catch {
      return false;
    }
  }, [email]);

  const markSubmitted = (e) => {
    try {
      localStorage.setItem(STORAGE_KEY, e.toLowerCase());
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError(ec.placeholder);
      return;
    }
    if (isSubmitted()) {
      setStatus("success");
      setError("");
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      await new Promise((r) => setTimeout(r, 800));
      markSubmitted(email);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  // Hooks must run unconditionally on every render — this effect sits above the
  // `variant === "inline"` early return and no-ops for non-modal variants.
  // Ad visitors see the modal only on a repeat visit or after showing order
  // intent (tapping any WhatsApp order link). First-touch buyers are never
  // interrupted.
  const isEligibleVisitor = () => {
    try {
      const visits = parseInt(localStorage.getItem(VISITS_KEY) || "0", 10);
      if (visits >= 2) return true;
      return localStorage.getItem(INTENT_KEY) === "true";
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (variant !== "modal") return;
    // Count visits + record order intent for future eligibility checks.
    try {
      const visits = parseInt(localStorage.getItem(VISITS_KEY) || "0", 10);
      localStorage.setItem(VISITS_KEY, String(visits + 1));
    } catch {}
    const markIntent = (e) => {
      const a = e.target?.closest?.('a[href*="wa.me"]');
      if (a) {
        try { localStorage.setItem(INTENT_KEY, "true"); } catch {}
      }
    };
    document.addEventListener("click", markIntent);
    return () => document.removeEventListener("click", markIntent);
  }, [variant]);

  useEffect(() => {
    if (variant !== "modal") return;
    try {
      const dismissed = localStorage.getItem(MODAL_STORAGE_KEY);
      if (!dismissed && !isSubmitted() && isEligibleVisitor()) {
        const timer = setTimeout(() => setShowModal(true), 30000);
        return () => clearTimeout(timer);
      }
    } catch {}

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !isSubmitted() && isEligibleVisitor()) {
        try {
          const dismissed = localStorage.getItem(MODAL_STORAGE_KEY);
          if (!dismissed) setShowModal(true);
        } catch {}
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [variant, isSubmitted]);

  if (variant === "inline") {
    const alreadySubscribed = isSubmitted();
    return (
      <div className={`bg-white/60 border border-ink/10 rounded-2xl p-6 sm:p-8 ${className}`}>
        <div className="max-w-md mx-auto text-center">
          {alreadySubscribed ? (
            <div className="flex flex-col items-center gap-3 text-ink">
              <div className="w-16 h-16 rounded-full bg-champagne/10 flex items-center justify-center">
                <Check size={28} className="text-champagne" aria-hidden="true" />
              </div>
              <p className="font-display text-[22px]">{ec.alreadySubscribed}</p>
              <p className="font-body text-[14px] text-ink-muted">
                {ec.success}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <p className="font-body text-[14px] text-ink-muted">{ec.sub}</p>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted rtl:left-auto rtl:right-4" aria-hidden="true" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder={ec.placeholder}
                  className={`w-full pl-12 pr-4 py-4 rounded-lg border font-body text-[15px] min-h-[44px] ${
                    error ? "border-red-400" : "border-ink/10 focus:border-champagne"
                  } bg-white/80`}
                  aria-label={ec.placeholder}
                  autoComplete="email"
                  dir="ltr"
                  disabled={status === "submitting" || status === "success"}
                />
              </div>
              {error && <p className="font-body text-[13px] text-red-500 text-left">{error}</p>}
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 bg-ink text-cream font-body text-[13px] tracking-[0.1em] uppercase hover:opacity-92 transition-opacity min-h-[44px] disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    {ec.button}
                  </>
                ) : status === "success" ? (
                  <>
                    <Check size={16} aria-hidden="true" />
                    {ec.success}
                  </>
                ) : (
                  ec.button
                )}
              </button>
              <p className="font-body text-[12px] text-ink-muted">{ec.privacy}</p>
            </form>
          )}
        </div>
      </div>
    );
  }

  if (!showModal || variant !== "modal") return null;

  const closeModal = () => {
    setShowModal(false);
    try {
      localStorage.setItem(MODAL_STORAGE_KEY, "true");
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 animate-fade-in" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="email-modal-title">
      <div
        className="relative w-full max-w-md bg-cream rounded-2xl p-6 sm:p-8 animate-fade-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 border border-ink/10 flex items-center justify-center text-ink hover:bg-cream transition-colors rtl:right-auto rtl:left-4"
          aria-label="Close"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="text-center">
          <h2 id="email-modal-title" className="font-display text-[28px] sm:text-[36px] leading-[1.2] text-ink mb-3">
            {ec.headline}
          </h2>
          <p className="font-body text-[15px] leading-[1.6] text-ink-muted mb-6">
            {ec.sub}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted rtl:left-auto rtl:right-4" aria-hidden="true" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder={ec.placeholder}
                className={`w-full pl-12 pr-4 py-4 rounded-lg border font-body text-[15px] min-h-[44px] ${
                  error ? "border-red-400" : "border-ink/10 focus:border-champagne"
                } bg-white/80`}
                aria-label={ec.placeholder}
                autoComplete="email"
                dir="ltr"
                disabled={status === "submitting" || status === "success"}
              />
            </div>
            {error && <p className="font-body text-[13px] text-red-500 text-left">{error}</p>}
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 bg-ink text-cream font-body text-[13px] tracking-[0.1em] uppercase hover:opacity-92 transition-opacity min-h-[44px] disabled:opacity-50"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  {ec.button}
                </>
              ) : status === "success" ? (
                <>
                  <Check size={16} aria-hidden="true" />
                  {ec.success}
                </>
              ) : (
                ec.button
              )}
            </button>
            <p className="font-body text-[12px] text-ink-muted">{ec.privacy}</p>
          </form>
        </div>
      </div>
    </div>
  );
}