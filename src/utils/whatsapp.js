// TO CHANGE THE WHATSAPP NUMBER LATER: replace the digits below with your real
// UAE number in international format WITHOUT "+" (e.g. "9715XXXXXXXX").
// Every "Order via WhatsApp" button + the floating chat icon use this one constant.
export const WHATSAPP_NUMBER = "971567710573";

/**
 * Builds a direct WhatsApp chat URL with properly encoded pre-filled text.
 * @param {string} text - Message text to pre-fill
 * @param {string} [phone] - Optional phone number override
 * @returns {string} Fully-formed https://wa.me/ URL
 */
export function buildWhatsAppUrl(text, phone = WHATSAPP_NUMBER) {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const encodedText = encodeURIComponent(text.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Generates specific WhatsApp URLs based on action context and current language.
 */
export function getWhatsAppUrl({ action = "general", lang = "en", data = {} }) {
  if (action === "heroOrder") {
    const text =
      lang === "ar"
        ? "مرحباً امنية، أود طلب امنية جلوتاثيوم (٥٠٠ ملغ، ٥٠ كبسولة — ٩٩ درهم). يرجى مشاركة خيارات التوصيل لمدينتي."
        : "Hi OmniaGlow, I'd like to order OmniaGlow L-Glutathione (500mg, 50 capsules — 99 AED). Please share delivery options for [my city].";
    return buildWhatsAppUrl(text);
  }

  if (action === "tierOrder") {
    const count = data.count || 1;
    const price = data.price || 99;
    const name = data.name || (lang === "ar" ? "باقة امنية" : "OmniaGlow Package");
    const text =
      lang === "ar"
        ? `مرحباً امنية، أود طلب باقة (${name}) - ${count} عبوة بسعر ${price} درهم. يرجى إتمام طلبي.`
        : `Hi OmniaGlow, I would like to order the ${count} Bottle(s) Package (${name}) for ${price} AED. Please assist with my order.`;
    return buildWhatsAppUrl(text);
  }

  if (action === "quizResult") {
    const concern = data.concernLabel || (lang === "ar" ? "توحيد لون البشرة" : "Skin radiance");
    const age = data.ageLabel || "26-35";
    const routine = data.routineTitle || (lang === "ar" ? "بروتوكول الإشراق الخلوي" : "Core Radiance Protocol");
    const text =
      lang === "ar"
        ? `مرحباً امنية، أكملت تشخيص اختبار البشرة!\n- المشكلة: ${concern}\n- الفئة العمرية: ${age}\n- البروتوكول المقترح: ${routine}\nأود طلب باقتي المخصصة عبر الواتساب.`
        : `Hi OmniaGlow, I completed the skin diagnostic!\n- Concern: ${concern}\n- Age: ${age}\n- Recommended: ${routine}\nI'd like to order my personalized regimen.`;
    return buildWhatsAppUrl(text);
  }

  if (action === "faqAsk") {
    const text =
      lang === "ar"
        ? "مرحباً امنية، لدي استفسار حول تركيبة المكمل وطريقة الشحن."
        : "Hi OmniaGlow, I have a question about the formula and delivery options.";
    return buildWhatsAppUrl(text);
  }

  // Default general inquiry
  const generalText =
    lang === "ar"
      ? "مرحباً امنية! أود معرفة المزيد عن مكمل امنية جلوتاثيوم."
      : "Hi! I'd like to know more about OmniaGlow Glutathione.";
  return buildWhatsAppUrl(generalText);
}
