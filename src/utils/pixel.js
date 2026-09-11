// Meta Pixel helper for WhatsApp-sell tracking.
// PageView is fired from index.html. Everything else goes through here
// so we never call fbq before it exists and never break the app if
// an ad-blocker removes fbq.

export function trackWhatsAppClick(source = "whatsapp_general") {
  try {
    if (typeof window === "undefined" || typeof window.fbq !== "function") return;
    const payload = { content_name: source, content_category: "whatsapp_order" };
    // Contact = someone tapped to chat. Lead = order intent.
    // Sending both lets you optimize ads on either event in Events Manager.
    window.fbq("track", "Contact", payload);
    window.fbq("track", "Lead", payload);
  } catch {
    // never break checkout/chat on tracking errors
  }
}

// Guess which button was tapped from the DOM, so every wa.me link
// (hero, navbar, product tiers, quiz, faq, sticky bar, floating bubble)
// reports a useful content_name without editing each component.
export function inferWhatsAppSource(anchor) {
  try {
    if (!anchor) return "whatsapp_general";
    const section = anchor.closest?.("section[id], header, aside");
    const id = section?.id || "";
    if (id === "hero") return "whatsapp_hero";
    if (id === "product") return "whatsapp_product_tier";
    if (id === "quiz") return "whatsapp_quiz";
    if (id === "faq") return "whatsapp_faq";
    if (anchor.closest?.("aside")) return "whatsapp_bubble";
    if (anchor.closest?.(".fixed.bottom-0")) return "whatsapp_sticky_bar";
    if (section?.tagName === "HEADER") return "whatsapp_navbar";
    return "whatsapp_general";
  } catch {
    return "whatsapp_general";
  }
}
