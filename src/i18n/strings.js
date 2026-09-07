// All translatable strings for the Omnia Single-Page experience.
// CMS-editable sections (hero/product/results/faq/quiz) are loaded from /content/* via Decap.
// Static globals (brand/nav/whatsapp/problem/why/footer) remain here.

import { contentEn, contentAr } from "./contentLoader.js";

export const en = {
  // Global & Brand
  brand: "Omnia",
  orderWhatsApp: "Order via WhatsApp",
  chatWhatsApp: "Chat with Advisor",
  exploreFormula: "Explore the formula",
  shopTheFormula: "Order Omnia formula",
  whyOmniaWorks: "Why Omnia works",
  readFormula: "Read the formula",

  // Nav (Single-page anchors)
  nav: {
    home: "Home",
    about: "About",
    product: "Formula",
    results: "Results",
    quiz: "Skin Quiz",
    faq: "FAQ",
  },

  // WhatsApp Messages & Configuration
  whatsapp: {
    number: "971569180737",
    cta: "Chat on WhatsApp",
    general: "Hi Omnia, I'd like to know more about the Glutathione formula.",
    heroOrder: "Hi Omnia, I'd like to order Omnia L-Glutathione (500mg, 60 capsules — $79). Please share delivery options for [my city].",
    tierOrder: (count, price, name) =>
      `Hi Omnia, I would like to order the ${count} Bottle(s) Package (${name}) for $${price}. Please assist with my order.`,
    quizResult: (concern, age, routineName) =>
      `Hi Omnia, I completed the skin quiz!\n- Concern: ${concern}\n- Age: ${age}\n- Recommended: ${routineName}\nI would like to order my personalized routine.`,
    faqAsk: "Hi Omnia, I have a question about shipping and taking the formula.",
  },

  // Email capture
  emailCapture: {
    headline: "Get 15% off your first order",
    sub: "Join 14,000+ women who start their day with Omnia. Plus: skin tips, early access, and exclusive offers.",
    placeholder: "Enter your email",
    button: "Unlock my discount",
    privacy: "No spam. Unsubscribe anytime.",
    success: "Thanks! Check your inbox for your code.",
    alreadySubscribed: "You're already on the list!",
  },

  // CMS-driven sections
  hero: contentEn.hero,
  product: contentEn.product,
  results: contentEn.results,
  faq: contentEn.faq,
  quiz: contentEn.quiz,

  // Static problem & why (kept here for simplicity; can be moved to CMS later)
  problem: {
    eyebrow: "The root cause of dull skin",
    h2a: "Beauty that truly",
    h2b: "starts within.",
    lead: "Most skincare treats only the outer 0.1mm of dead skin cells with harsh bleaches and heavy creams that wear off in hours.",
    p1: "Omnia was created from a simple frustration: skincare routines that promise everything while ignoring the cellular root cause of dullness and pigmentation.",
    p2: "When you replenish master antioxidant glutathione and bioactive collagen internally, your body's natural renewal cycles activate. The result is real, rested radiance that doesn't wash off.",
  },
  why: {
    eyebrow: "Why Omnia works",
    title: "Designed for real results, not marketing hype",
    items: [
      {
        title: "Third-Party Certified Purity",
        desc: "Every batch is independently tested for heavy metals, microbial contaminants, and exact active ingredient potency.",
      },
      {
        title: "Non-Bleaching & Safe",
        desc: "Zero steroids, zero hydroquinone, zero harsh irritants. Works through your liver's natural antioxidant pathway.",
      },
      {
        title: "Bioavailable Absorption",
        desc: "Synergistic Vitamin C cofactor prevents glutathione breakdown in digestion, ensuring maximum cellular uptake.",
      },
    ],
  },

  // Footer
  footer: {
    headline: "Trusted by over 14,000 women worldwide",
    sub: "Not an overnight miracle. A calm, daily discipline that shows: skin that looks like it slept well every single day.",
    copyright: "© 2026 Omnia Beautylab. All rights reserved.",
    disclaimer: "These statements have not been evaluated by the FDA or local food authorities. This product is a dietary supplement and is not intended to diagnose, treat, cure, or prevent any disease.",
    items: {
      glutathione: { title: "500mg L-Glutathione", sub: "The body's master antioxidant" },
      collagen: { title: "Collagen I & III", sub: "Restores firmness & bounce" },
      vitamins: { title: "Vitamins C, E, & B3", sub: "Calm, luminous cellular radiance" },
    },
  },
};

export const ar = {
  // Global & Brand
  brand: "أومنيا",
  orderWhatsApp: "اطلبي عبر واتساب",
  chatWhatsApp: "تحدثي مع أخصائية",
  exploreFormula: "استكشفي التركيبة",
  shopTheFormula: "اطلبي تركيبة أومنيا",
  whyOmniaWorks: "لماذا أومنيا فعّالة",
  readFormula: "اكتشفي التركيبة",

  // Nav
  nav: {
    home: "الرئيسية",
    about: "عن أومنيا",
    product: "التركيبة",
    results: "النتائج",
    quiz: "اختبار البشرة",
    faq: "الأسئلة الشائعة",
  },

  // WhatsApp
  whatsapp: {
    number: "971569180737",
    cta: "التواصل عبر واتساب",
    general: "مرحباً أومنيا، أود معرفة المزيد عن تركيبة مكمل الغلوتاثيون.",
    heroOrder: "مرحباً أومنيا، أود طلب أومنيا إل-غلوتاثيون (٥٠٠ ملغ، ٦٠ كبسولة — ٧٩$). يرجى مشاركة خيارات التوصيل لمدينتي.",
    tierOrder: (count, price, name) =>
      `مرحباً أومنيا، أود طلب باقة (${name}) - ${count} عبوة بسعر ${price}$ دولار. يرجى إتمام الطلب.`,
    quizResult: (concern, age, routineName) =>
      `مرحباً أومنيا، أكملت اختبار البشرة!\n- المشكلة: ${concern}\n- العمر: ${age}\n- الروتين المقترح: ${routineName}\nأود طلب باقتي المخصصة.`,
    faqAsk: "مرحباً أومنيا، لدي استفسار حول الشحن وطريقة استخدام التركيبة.",
  },

  // Email capture
  emailCapture: {
    headline: "احصلي على ١٥٪ خصم على طلبكِ الأول",
    sub: "انضمي إلى ١٤٠٠٠+ امرأة يبدأن يومهن مع أومنيا. بالإضافة إلى: نصائح للبشرة، وصول مبكر، وعروض حصرية.",
    placeholder: "أدخلي بريدكِ الإلكتروني",
    button: "احصلي على خصمي",
    privacy: "لا رسائل مزعجة. إلغاء الاشتراك في أي وقت.",
    success: "شكراً! تفقدي بريدكِ للحصول على الكود.",
    alreadySubscribed: "أنتِ مسجلة مسبقاً!",
  },

  // CMS-driven
  hero: contentAr.hero,
  product: contentAr.product,
  results: contentAr.results,
  faq: contentAr.faq,
  quiz: contentAr.quiz,

  // Static
  problem: {
    eyebrow: "السبب الجذري لبهتان البشرة",
    h2a: "جمال حقيقي",
    h2b: "يبدأ من الداخل.",
    lead: "معظم مستحضرات العناية تعالج فقط ٠.١ ملم من خلايا الجلد الميتة السطحية بمواد تبييض قاسية وكريمات تزول آثارها في ساعات.",
    p1: "وُلدت أومنيا من إحباط بسيط: روتين عناية يعد بكل شيء بينما يتجاهل السبب الخلوي الحقيقي للبهتان والتصبغات غير المتجانسة.",
    p2: "عندما تعيدين تغذية جسمكِ بمضاد الأكسدة الرئيسي الغلوتاثيون والكولاجين الحيوي داخلياً، تتجدد دورات البشرة الطبيعية لتحصلي على إشراقة هادئة وحقيقية لا تزول بالغسيل.",
  },
  why: {
    eyebrow: "لماذا أومنيا فعّالة",
    title: "صُممت لنتائج حقيقية ملموسة، بعيداً عن المبالغات",
    items: [
      {
        title: "نقاء معتمد في مختبرات مستقلة",
        desc: "كل دفعة تُفحص وتُختبر في مختبرات معتمدة للتأكد من خلوها من المعادن الثقيلة ومطابقتها لأعلى معايير النقاوة.",
      },
      {
        title: "آمنة وخالية من المبيضات القاسية",
        desc: "خالية تماماً من الستيرويدات، الهيدروكينون، والمواد الكيميائية الضارة. تعمل بلطف مع طبيعة جسمكِ.",
      },
      {
        title: "امتصاص حيوي متفوق",
        desc: "وجود فيتامين C التآزري يحمي الغلوتاثيون من التحلل في الجهاز الهضمي، مما يضمن أعلى كفاءة امتصاص خلوي.",
      },
    ],
  },
  footer: {
    headline: "يثق بنا أكثر من ١٤٠٠٠ امرأة حول العالم",
    sub: "ليست معجزة لحظية، بل التزام يومي هادئ تظهر نتائجه بوضوح: بشرة تبدو وكأنها نامت نوماً عميقاً كل يوم.",
    copyright: "© ٢٠٢٦ أومنيا بيوتيلاب. جميع الحقوق محفوظة.",
    disclaimer: "لم تخضع هذه البيانات لتقييم هيئات الغذاء والدواء. هذا المنتج مكمل غذائي وليس مخصصاً لتشخيص أو علاج أو الوقاية من أي مرض.",
    items: {
      glutathione: { title: "٥٠٠ ملغ إل-غلوتاثيون", sub: "مضاد الأكسدة الرئيسي للجسم" },
      collagen: { title: "كولاجين النوع الأول والثالث", sub: "يستعيد تماسك ومرونة البشرة" },
      vitamins: { title: "فيتامينات C وE وB3", sub: "إشراقة خلوية هادئة ومسترخية" },
    },
  },
};
