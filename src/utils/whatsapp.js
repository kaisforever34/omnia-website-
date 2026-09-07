export const WHATSAPP_NUMBER = "971569180737";

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
        ? "مرحباً أومنيا، أود طلب أومنيا إل-غلوتاثيون (٥٠٠ ملغ، ٦٠ كبسولة — ٧٩$). يرجى مشاركة خيارات التوصيل لمدينتي."
        : "Hi Omnia, I'd like to order Omnia L-Glutathione (500mg, 60 capsules — $79). Please share delivery options for [my city].";
    return buildWhatsAppUrl(text);
  }

  if (action === "tierOrder") {
    const count = data.count || 1;
    const price = data.price || 79;
    const name = data.name || (lang === "ar" ? "باقة أومنيا" : "Omnia Package");
    const text =
      lang === "ar"
        ? `مرحباً أومنيا، أود طلب باقة (${name}) - ${count} عبوة بسعر ${price}$ دولار. يرجى إتمام طلبي.`
        : `Hi Omnia, I would like to order the ${count} Bottle(s) Package (${name}) for $${price}. Please assist with my order.`;
    return buildWhatsAppUrl(text);
  }

  if (action === "quizResult") {
    const concern = data.concernLabel || (lang === "ar" ? "توحيد لون البشرة" : "Skin radiance");
    const age = data.ageLabel || "26-35";
    const routine = data.routineTitle || (lang === "ar" ? "بروتوكول الإشراق الخلوي" : "Core Radiance Protocol");
    const text =
      lang === "ar"
        ? `مرحباً أومنيا، أكملت تشخيص اختبار البشرة!\n- المشكلة: ${concern}\n- الفئة العمرية: ${age}\n- البروتوكول المقترح: ${routine}\nأود طلب باقتي المخصصة عبر الواتساب.`
        : `Hi Omnia, I completed the skin diagnostic!\n- Concern: ${concern}\n- Age: ${age}\n- Recommended: ${routine}\nI'd like to order my personalized regimen.`;
    return buildWhatsAppUrl(text);
  }

  if (action === "faqAsk") {
    const text =
      lang === "ar"
        ? "مرحباً أومنيا، لدي استفسار حول تركيبة المكمل وطريقة الشحن."
        : "Hi Omnia, I have a question about the formula and delivery options.";
    return buildWhatsAppUrl(text);
  }

  // Default general inquiry
  const generalText =
    lang === "ar"
      ? "مرحباً أومنيا! أود معرفة المزيد عن مكمل أومنيا غلوتاثيون."
      : "Hi! I'd like to know more about Omnia Glutathione.";
  return buildWhatsAppUrl(generalText);
}
