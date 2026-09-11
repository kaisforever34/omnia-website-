// Content loader — Decap CMS writes JSON to /content/*, Vite bundles it.
// This file provides a single source of truth for hero/product/testimonials/faq/quiz
// while keeping static globals (brand, nav, whatsapp) in strings.js.

import heroEn from "../../content/hero/en.json";
import heroAr from "../../content/hero/ar.json";
import productEn from "../../content/product/en.json";
import productAr from "../../content/product/ar.json";
import testimonialsEn from "../../content/testimonials/en.json";
import testimonialsAr from "../../content/testimonials/ar.json";
import faqEn from "../../content/faq/en.json";
import faqAr from "../../content/faq/ar.json";
import quizEn from "../../content/quiz/en.json";
import quizAr from "../../content/quiz/ar.json";
import termsEn from "../../content/terms/en.json";
import termsAr from "../../content/terms/ar.json";

export const contentEn = {
  hero: heroEn,
  product: productEn,
  results: {
    eyebrow: testimonialsEn.eyebrow,
    title: testimonialsEn.title,
    subtitle: testimonialsEn.subtitle,
    beforeAfter: testimonialsEn.beforeAfter,
    shift7Title: "The 7-Day Shift",
    shift7Quote: "Skin that looks rested, even, and alive — without a ten-step routine.",
    shift7Body: "One simple morning discipline. The first week restores cellular hydration and glow; the subsequent weeks target stubborn hyperpigmentation and uneven texture.",
    duoQuote: "Deep cellular renewal, collagen replenishment, even radiance.",
    reviewsTitle: testimonialsEn.title,
    reviewsSubtitle: testimonialsEn.subtitle,
    instagramCta: "Follow us on Instagram @omnia.beautylab",
    verifiedLabel: testimonialsEn.verifiedLabel || "Verified buyer",
    realTransformTitle: testimonialsEn.realTransformTitle || "Real transformations, real women",
    reviews: testimonialsEn.reviews,
  },
  faq: faqEn,
  quiz: quizEn,
  terms: termsEn,
};

export const contentAr = {
  hero: heroAr,
  product: productAr,
  results: {
    eyebrow: testimonialsAr.eyebrow,
    title: testimonialsAr.title,
    subtitle: testimonialsAr.subtitle,
    beforeAfter: testimonialsAr.beforeAfter,
    shift7Title: "تغيّر سبعة أيام",
    shift7Quote: "بشرة تبدو مرتاحة، متجانسة، وحيّة — دون روتين من عشر خطوات.",
    shift7Body: "خطوة صباحية واحدة بسيطة. الأسبوع الأول يعيد ترطيب الخلايا وإشراقها، والأسابيع اللاحقة تعمل على توحيد التصبغات وتحسين ملمس البشرة.",
    duoQuote: "تجدد خلوي عميق، امتلاء بالكولاجين، وإشراقة متجانسة.",
    reviewsTitle: testimonialsAr.title,
    reviewsSubtitle: testimonialsAr.subtitle,
    instagramCta: "تابعينا على إنستغرام @omnia.beautylab",
    verifiedLabel: testimonialsAr.verifiedLabel || "مشترية موثقة",
    realTransformTitle: testimonialsAr.realTransformTitle || "تحولات حقيقية لنساء حقيقيات",
    reviews: testimonialsAr.reviews,
  },
  faq: faqAr,
  quiz: quizAr,
  terms: termsAr,
};
