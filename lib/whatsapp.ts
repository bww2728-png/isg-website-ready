/**
 * إشعار واتساب بطلب التواصل — قناة مؤقتة عبر CallMeBot (مجانية للاستخدام الشخصي).
 * تعمل فقط عند ضبط WHATSAPP_API_KEY و WHATSAPP_NOTIFY_PHONE؛ وإلا تُتخطى بصمت.
 * تفعيل القناة لمرة واحدة من هاتف صاحب الرقم: إرسال "I allow callmebot to send me messages"
 * إلى +34 684 72 39 62 ثم استخدام مفتاح API الوارد في الرد.
 */

export type WhatsAppLeadInput = {
  name: string;
  email: string;
  stage: string;
  challenge?: string | null;
  referenceId?: number | string | null;
};

export type WhatsAppResult = {
  sent: boolean;
  skipped?: boolean;
  error?: string;
};

export function buildLeadMessage(data: WhatsAppLeadInput): string {
  const lines = [
    "طلب تواصل جديد — ISG Advisory",
    `الاسم: ${data.name}`,
    `البريد: ${data.email}`,
    `مرحلة الشركة: ${data.stage}`,
  ];
  if (data.referenceId != null) lines.push(`الرقم المرجعي: #${data.referenceId}`);
  if (data.challenge) lines.push("", data.challenge);
  return lines.join("\n");
}

export async function sendWhatsAppLead(data: WhatsAppLeadInput): Promise<WhatsAppResult> {
  const apiKey = process.env.WHATSAPP_API_KEY;
  const phone = process.env.WHATSAPP_NOTIFY_PHONE;

  if (!apiKey || !phone) {
    return { sent: false, skipped: true, error: "WhatsApp not configured" };
  }

  try {
    const params = new URLSearchParams({
      phone,
      apikey: apiKey,
      text: buildLeadMessage(data),
    });
    const response = await fetch(`https://api.callmebot.com/whatsapp.php?${params}`, {
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[ISG] WhatsApp error:", response.status, detail.slice(0, 200));
      return { sent: false, error: `WhatsApp request failed (${response.status})` };
    }

    console.log("[ISG] WhatsApp lead notification sent to", phone);
    return { sent: true };
  } catch (err) {
    console.error("[ISG] WhatsApp send failed:", err);
    return { sent: false, error: "Failed to send WhatsApp message" };
  }
}
