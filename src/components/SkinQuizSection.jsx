import { useState, useCallback } from "react";
import { ArrowRight, Check, Sparkles, Sun, Target, Droplet, Heart, Clock, MessageCircle, RotateCcw } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";
import { getWhatsAppUrl } from "../utils/whatsapp";

const ICONS = {
  sun: Sun,
  sparkles: Sparkles,
  target: Target,
  droplet: Droplet,
  heart: Heart,
};

const STEPS = ["intro", "concern", "age", "routine", "timeline", "results"];

export default function SkinQuizSection() {
  const { t, lang, isRTL } = useI18n();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentStep = STEPS[stepIndex];
  const quiz = t("quiz");
  const questions = quiz.questions || [];

  const handleAnswer = useCallback(
    (questionId, value, optionLabel) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: { value, label: optionLabel },
      }));
      setStepIndex((i) => i + 1);
    },
    []
  );

  const restartQuiz = () => {
    setStepIndex(0);
    setAnswers({});
  };

  const currentQuestion = questions.find((q) => STEPS[stepIndex] === q.id);

  // Generate dynamic WhatsApp URL from user's diagnostic answers
  const concernLabel = answers.concern?.label || (lang === "ar" ? "توحيد لون البشرة" : "Skin radiance");
  const ageLabel = answers.age?.label || "26-35";
  const routineTitle = quiz.results?.title || "Core Radiance Protocol";
  
  const whatsappUrl = getWhatsAppUrl({
    action: "quizResult",
    lang,
    data: {
      concernLabel,
      ageLabel,
      routineTitle,
    },
  });

  return (
    <section id="quiz" className="scroll-mt-24 px-6 sm:px-10 lg:px-16 py-20 lg:py-28 relative">
      <div className="max-w-4xl mx-auto">
        {/* Step 0: Intro */}
        {currentStep === "intro" && (
          <div className="text-center max-w-2xl mx-auto animate-fade-up">
            <p className="font-body text-[13px] tracking-[0.3em] uppercase text-champagne mb-4">
              {quiz.eyebrow}
            </p>
            <h2 className="font-display font-normal leading-[1.05] tracking-[-0.02em] text-[38px] sm:text-[52px] lg:text-[60px] text-ink">
              {quiz.h2a}
              <br />
              {quiz.h2b}
            </h2>
            <p className="mt-6 font-body text-[16px] sm:text-[17px] leading-[1.65] text-ink-muted">
              {quiz.lead}
            </p>
            <button
              onClick={() => setStepIndex(1)}
              className="mt-10 group inline-flex items-center gap-3 px-8 py-4 bg-ink text-cream font-body text-[13px] tracking-[0.1em] uppercase hover:bg-champagne hover:text-ink transition-all duration-300 rounded-xl min-h-[48px] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>{quiz.startCta}</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </button>
          </div>
        )}

        {/* Questions Flow */}
        {currentQuestion && (
          <div className="max-w-xl mx-auto animate-fade-up">
            {/* Progress bar */}
            <div className="mb-8 text-center">
              <p className="font-body text-[12px] tracking-[0.25em] uppercase text-champagne mb-3">
                {quiz.progress
                  .replace("{current}", String(stepIndex))
                  .replace("{total}", String(questions.length))}
              </p>
              <div className="w-full bg-ink/10 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-champagne h-full rounded-full transition-all duration-500"
                  style={{ width: `${(stepIndex / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="font-display text-[26px] sm:text-[32px] leading-[1.2] text-ink text-center mb-8">
              {currentQuestion.text}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" role="radiogroup" aria-label={currentQuestion.text}>
              {currentQuestion.options.map((opt) => {
                const isSelected = answers[currentQuestion.id]?.value === opt.value;
                const IconComponent = opt.icon ? ICONS[opt.icon] : null;

                return (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(currentQuestion.id, opt.value, opt.label)}
                    role="radio"
                    aria-checked={isSelected}
                    className={`relative p-5 rounded-xl border transition-all duration-200 min-h-[56px] text-left cursor-pointer flex items-center gap-4 ${
                      isSelected
                        ? "border-champagne bg-champagne/15 text-ink shadow-sm"
                        : "border-ink/10 bg-white/60 text-ink-muted hover:border-champagne/50 hover:bg-white/90"
                    } ${isRTL ? "text-right flex-row-reverse" : "text-left"}`}
                  >
                    {IconComponent && (
                      <IconComponent
                        size={20}
                        className={`shrink-0 ${isSelected ? "text-champagne" : "text-ink-muted/70"}`}
                        aria-hidden="true"
                      />
                    )}
                    <span className="font-body text-[14px] leading-snug font-medium flex-1">
                      {opt.label}
                    </span>
                    {isSelected && (
                      <Check size={18} className="text-champagne shrink-0" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Results Screen */}
        {currentStep === "results" && (
          <div className="max-w-2xl mx-auto space-y-8 animate-fade-up">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/10 text-champagne font-body text-[12px] tracking-[0.2em] uppercase mb-4">
                <Sparkles size={14} aria-hidden="true" />
                {quiz.results?.eyebrow}
              </span>
              <h2 className="font-display font-normal leading-[1.05] text-[34px] sm:text-[44px] text-ink">
                {quiz.results?.title}
              </h2>
              <p className="mt-3 font-body text-[15px] leading-[1.6] text-ink-muted">
                {quiz.results?.subtitle}
              </p>
            </div>

            {/* Protocol Card */}
            <div className="bg-white/80 border border-ink/10 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-ink/10">
                <div>
                  <p className="font-body text-[12px] tracking-[0.2em] uppercase text-champagne">
                    {lang === "ar" ? "الباقة الموصى بها" : "Recommended Package"}
                  </p>
                  <p className="font-display text-[22px] text-ink mt-1">
                    {quiz.results?.recommendedPackage}
                  </p>
                </div>
                <div className="px-4 py-2 bg-cream rounded-lg border border-ink/10">
                  <span className="font-display text-[18px] text-ink font-medium">
                    {quiz.results?.recommendedPrice}
                  </span>
                </div>
              </div>

              {/* Step by step routine */}
              <div className="space-y-3">
                <p className="font-body text-[13px] tracking-[0.1em] uppercase text-ink font-medium">
                  {lang === "ar" ? "الجدول اليومي المقترح:" : "Your Daily Schedule:"}
                </p>
                <ul className="space-y-2.5">
                  {quiz.results?.routineSummary?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-champagne/20 text-champagne flex items-center justify-center text-[11px] font-medium shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="font-body text-[14px] leading-relaxed text-ink-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-4 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-xl font-body text-[14px] tracking-[0.06em] uppercase hover:bg-[#1ebd59] transition-all duration-300 min-h-[50px] shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  <span className="font-medium">{quiz.results?.whatsappCta}</span>
                </a>
                <p className="font-body text-[12px] text-ink-muted text-center">
                  {quiz.results?.disclaimer}
                </p>
              </div>
            </div>

            {/* Retake Diagnostic */}
            <div className="text-center pt-2">
              <button
                onClick={restartQuiz}
                className="inline-flex items-center gap-2 font-body text-[13px] text-ink-muted hover:text-ink transition-colors cursor-pointer"
              >
                <RotateCcw size={13} aria-hidden="true" />
                <span>{quiz.restart}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
