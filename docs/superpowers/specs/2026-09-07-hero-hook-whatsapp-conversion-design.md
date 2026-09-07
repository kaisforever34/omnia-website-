# Hero Hook — WhatsApp Conversion Design

**Date:** 2026-09-07  
**Scope:** Rebuild `src/pages/Home.jsx:36` hero (hook section only) for 3-second cold conversion to WhatsApp. Keep single-page structure, existing serif editorial style, and bilingual EN/AR.

## 1. Goal & Constraints

- Product: Omnia L-Glutathione 500mg + Hydrolyzed Collagen I&III + Vitamins C/E/B3, 60 capsules, $79
- Only conversion is WhatsApp to `+971569180737` (`src/utils/whatsapp.js:1` `971569180737`)
- No online payment; no fake strikethrough price
- Avoid "whitening" framing; use brightness/even tone/radiance
- Audience: Gulf/MENA bilingual (EN LTR / AR RTL)
- Proof already on page: 14,000+ women, 6 testimonials with timelines, before/after image, "4–6 weeks" claim at `src/i18n/strings.js:results.subtitle`
- Hero image must be real `/product/front.png` (900×900 aligned), not mismatched brand label

## 2. Copy — Approved Section 1

### Headlines (timeline-proof primary, per user choice A)
- **EN V1 (default):** `More even skin in 4–6 weeks — from within.`
- **EN V2:** `Dullness and dark spots fade — without bleach.`
- **EN V3:** `Visible brightness in 4–6 weeks. Not overnight.`
- **AR V1:** `بشرة أكثر تجانساً خلال ٤–٦ أسابيع — من الداخل.`
- **AR V2:** `البهتان والتصبغات تتلاشى — دون مواد مبيضة.`
- **AR V3:** `إشراقة تظهر خلال ٤–٦ أسابيع. ليست لحظية.`

### Subheadline (one sentence, mechanism + credibility)
- EN: `500mg L-Glutathione + Hydrolyzed Collagen I & III and Vitamins C, E & B3 support your body’s renewal for even tone and rested radiance.`
- AR: `٥٠٠ ملغ من إل-غلوتاثيون والكولاجين المتحلل من النوعين الأول والثالث وفيتامينات C وE وB3 يدعم تجدد بشرتكِ للحصول على لون موحد وإشراقة هادئة.`

### CTA + Pre-filled WhatsApp (language-aware)
- Button EN: `Ask on WhatsApp — $79` ; AR: `اسألي عبر واتساب — ٧٩$`
- Message EN: `Hi Omnia, I'd like to order Omnia L-Glutathione (500mg, 60 capsules — $79). Please share delivery options for [my city].`
- Message AR: `مرحباً أومنيا، أود طلب أومنيا إل-غلوتاثيون (٥٠٠ ملغ، ٦٠ كبسولة — ٧٩$). يرجى مشاركة خيارات التوصيل لمدينتي.`
- Implemented via `getWhatsAppUrl({action:"heroOrder", lang})` at `src/utils/whatsapp.js:18` with `lang==="ar"` branch; `src/pages/Home.jsx:16` already passes `lang`.

### Trust row (directly under CTA, 11px + icons, not a separate section)
- EN: `14,000+ women · Ships in 24h · Reply within 30 min`
- AR: `أكثر من ١٤٠٠٠ امرأة · شحن خلال ٢٤ ساعة · رد خلال ٣٠ دقيقة`
- Icons: users / truck / clock (lucide-react). Verifiable operational claims; no separate section.

## 3. Layout & Component

- Keep `src/pages/Home.jsx:36` grid: `lg:grid-cols-12` left content `lg:col-span-7`, right visual `lg:col-span-5`. No change to overall page order (#hero → #about → #product → #results → #quiz → #faq).
- Left column order top→bottom: eyebrow pill → H1 (two lines, `font-display` Italiana/Amiri) → lead → CTA row (primary WhatsApp + secondary `Explore the formula` anchor to `#product`) → trust row with `border-t` separator.
- Right column: single `/product/front.png` with `FloatingElement` + ambient glow + ground shadow (already at `Home.jsx:101`). Keep `max-w-[340px] sm:max-w-[420px] lg:max-w-[460px]` for crispness.
- Trust row is `pt-6 border-t border-ink/10 flex flex-wrap gap-4` directly under CTA, not a new section. Prevents extra scroll before first scroll.

## 4. Image & Typography

- **Image:** `/product/front.png` (900×900 transparent). Fixed mismatch (previously different brand label). No separate marketing hero image; consistent everywhere with `src/components/ProductViewer.jsx` in product section.
- **English typography:** Keep `Italiana` display serif at `src/index.css:4` (`--font-display: "Italiana"...`), large editorial scale `48px→96px` at `Home.jsx:48`.
- **Arabic typography:** `Amiri` at `src/index.css:14` (`--font-display: "Amiri"...`) weight 600, line-height 1.3, letter-spacing 0 — equivalent visual weight to Italiana, not geometric sans.

## 5. Integration & Behavior

- **i18n:** New keys `hero.h1a/h1b/lead/primaryCta/secondaryCta/badge/specs` and `whatsapp.heroOrder` as function or string with price; EN/AR mirrored at `src/i18n/strings.js:48`.
- **WhatsApp language switch:** Automatic via `useI18n().lang` at call site; no manual branching in hero. Already proven at `src/components/ProductSection.jsx:14` and `src/components/SkinQuizSection.jsx:1`.
- **Anchor:** Secondary CTA scrolls to `#product` via `scrollToSection("#product")` at `Home.jsx:18` with `scroll-behavior: smooth` at `src/index.css`.
- **Accessibility:** CTA `target="_blank" rel="noopener noreferrer"`, `min-h-[50px]`, focus ring at `index.css:45`.

## 6. Out of Scope

- No pricing table changes, no FAQ/quiz modifications, no new routes. Only `hero` strings, `whatsapp.js` heroOrder message, and `Home.jsx` hero markup.

## 7. Verification

- Build: `npm run build` must pass.
- Playwright: hero H1 contains timeline text, CTA href contains `wa.me/971569180737` and price (`79`/`٧٩`), trust row visible under CTA (within 80px), image `naturalWidth 900`, no overflow, AR/EN both.
