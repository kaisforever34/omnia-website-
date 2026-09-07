# Hero Hook WhatsApp Conversion — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild hero hook at `src/pages/Home.jsx:36` to convert cold visitors in 3 seconds with timeline-led headline, credible subheadline, WhatsApp-primary CTA with price, inline trust row, and real bottle image.

**Architecture:** Two-file change: i18n strings + WhatsApp helper provide language-aware copy and URLs; Home hero consumes them. No new routes, components, or deps. Keep Vite+React+Tailwind, framer-motion already present for ProductViewer in product section.

**Tech Stack:** Vite 8.2 + React 19 + Tailwind 4.3 + framer-motion 13.2 + react-router 7.18

## Global Constraints

- WhatsApp number `971569180737` exact at `src/utils/whatsapp.js:1` and `src/i18n/strings.js:26`
- No "whitening" framing; use brightness/even tone
- CTA must open `https://wa.me/971569180737?text=...` with product+price
- Language-aware: AR message when lang==="ar", EN otherwise
- Image must be `/product/front.png` (900×900), not mismatched label
- Typography: Italiana EN / Amiri AR at `src/index.css:4,14`
- No fake strikethrough price

---

### Task 1: Update i18n hero copy + WhatsApp heroOrder message

**Files:**
- Modify: `src/i18n/strings.js:48-62` (hero object EN+AR)
- Modify: `src/utils/whatsapp.js:18-25` (heroOrder branch)

**Interfaces:**
- Consumes: existing `hero` keys and `whatsapp.heroOrder` string
- Produces: new keys `hero.h1a/h1b/lead/primaryCta/secondaryCta/badge/trust` and updated `heroOrder` function text with price

- [ ] **Step 1: Edit `src/i18n/strings.js` hero block EN**
```js
hero: {
  eyebrow: "Visible results in 4–6 weeks",
  h1a: "More even skin",
  h1b: "in 4–6 weeks — from within.",
  lead: "500mg L-Glutathione + Hydrolyzed Collagen I & III and Vitamins C, E & B3 support your body’s renewal for even tone and rested radiance. 60 capsules · $79.",
  primaryCta: "Ask on WhatsApp — $79",
  secondaryCta: "Explore the formula",
  trust: { a:"14,000+ women", b:"Ships in 24h", c:"Reply within 30 min" },
  specs: { capsules:"60 Capsules", dosage:"500mg Glutathione", results:"Visible in 4–6 weeks" }
}
```

- [ ] **Step 2: Mirror AR hero block**
```js
hero: {
  eyebrow: "نتائج ظاهرة خلال ٤–٦ أسابيع",
  h1a: "بشرة أكثر تجانساً",
  h1b: "خلال ٤–٦ أسابيع — من الداخل.",
  lead: "٥٠٠ ملغ من إل-غلوتاثيون والكولاجين المتحلل من النوعين الأول والثالث وفيتامينات C وE وB3 يدعم تجدد بشرتكِ للحصول على لون موحد وإشراقة هادئة. ٦٠ كبسولة · ٧٩$.",
  primaryCta: "اسألي عبر واتساب — ٧٩$",
  secondaryCta: "استكشفي التركيبة",
  trust:{a:"أكثر من ١٤٠٠٠ امرأة",b:"شحن خلال ٢٤ ساعة",c:"رد خلال ٣٠ دقيقة"}
}
```

- [ ] **Step 3: Update `src/utils/whatsapp.js` heroOrder to include price**
```js
if (action === "heroOrder") {
  const text = lang==="ar"
    ? "مرحباً أومنيا، أود طلب أومنيا إل-غلوتاثيون (٥٠٠ ملغ، ٦٠ كبسولة — ٧٩$). يرجى مشاركة خيارات التوصيل لمدينتي."
    : "Hi Omnia, I'd like to order Omnia L-Glutathione (500mg, 60 capsules — $79). Please share delivery options for [my city].";
  return buildWhatsAppUrl(text);
}
```

- [ ] **Step 4: Run build**
Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add src/i18n/strings.js src/utils/whatsapp.js
git commit -m "feat(hero): timeline hook copy + WhatsApp price-aware message"
```

### Task 2: Rebuild hero markup with trust row and real bottle

**Files:**
- Modify: `src/pages/Home.jsx:36-120` (hero section)

**Interfaces:**
- Consumes: `t("hero.*")`, `t("hero.trust.*")`, `heroWhatsAppUrl` from Task 1, `/product/front.png`
- Produces: rendered hero with trust row under CTA

- [ ] **Step 1: Replace hero left column CTA+trust**
```jsx
<a href={heroWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="... bg-ink text-cream ...">
  <MessageCircle size={17} /> {t("hero.primaryCta")}
</a>
<button onClick={()=>scrollToSection("#product")}>{t("hero.secondaryCta")}</button>
<div className="pt-6 border-t border-ink/10 flex flex-wrap gap-4 text-[13px] text-ink-muted">
  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-champagne"/>{t("hero.trust.a")}</span>
  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-champagne"/>{t("hero.trust.b")}</span>
  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-champagne"/>{t("hero.trust.c")}</span>
</div>
```

- [ ] **Step 2: Keep right visual as `/product/front.png` (already correct) with FloatingElement, no change to image src**

- [ ] **Step 3: Run build + Playwright checks**
Run: `npm run build` ; then `node -e` check: H1 contains "4–6 weeks", CTA href contains "wa.me/971569180737" and "79", trust row visible, image naturalWidth 900
Expected: PASS

- [ ] **Step 4: Commit**
```bash
git add src/pages/Home.jsx
git commit -m "feat(hero): hook layout with timeline headline + trust row under CTA"
```

## Self-Review

- Spec coverage: all hero copy variants, trust row, image, typography, WhatsApp language branch covered in Task 1+2.
- No placeholders.
- Types consistent: `t("hero.trust.a")` matches strings shape.

