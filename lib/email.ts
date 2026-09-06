import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.CONTACT_TO_EMAIL;
const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "ISG Advisory <onboarding@resend.dev>";

type SendContactEmailInput = {
  name: string;
  email: string;
  stage: string;
  challenge: string;
};

function stageLabel(stage: string): string {
  const labels: Record<string, string> = {
    startup: "مرحلة التأسيس",
    growth: "مرحلة النمو",
    maturity: "مرحلة النضج",
    turnaround: "مرحلة التعافي",
    investment: "جاهزية استثمارية",
  };
  return labels[stage] ?? stage;
}

function buildHtml({ name, email, stage, challenge }: SendContactEmailInput): string {
  return `
    <div style="direction: rtl; font-family: 'IBM Plex Sans Arabic', ui-sans-serif, system-ui, sans-serif; color: #172331; max-width: 600px; margin: 0 auto; padding: 2rem;">
      <div style="background: linear-gradient(135deg, #0a2540, #071827); color: #fff; padding: 2rem; border-radius: 18px 18px 0 0;">
        <h1 style="margin: 0; font-size: 1.5rem;">طلب تواصل جديد</h1>
        <p style="margin: 0.5rem 0 0; color: #c9d6e2;">ISG Advisory — بوابة الحلول المبتكرة</p>
      </div>
      <div style="border: 1px solid #e5eaf0; border-top: none; padding: 2rem; border-radius: 0 0 18px 18px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem;">
          <tr>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0; color: #5d6d7e; font-weight: 600; width: 120px;">الاسم</td>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0; color: #5d6d7e; font-weight: 600;">البريد</td>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0;"><a href="mailto:${email}" style="color: #c9a961;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0; color: #5d6d7e; font-weight: 600;">مرحلة الشركة</td>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0;">${stageLabel(stage)}</td>
          </tr>
        </table>
        ${challenge ? `
        <div style="margin-bottom: 1.5rem;">
          <p style="margin: 0 0 0.5rem; color: #5d6d7e; font-weight: 600;">التحدي</p>
          <div style="padding: 1rem; background: #f6f8fa; border-radius: 12px; border: 1px solid #e5eaf0; line-height: 1.8;">
            ${challenge.replace(/\n/g, "<br>")}
          </div>
        </div>
        ` : ""}
        <p style="margin: 0; font-size: 0.85rem; color: #5d6d7e;">
          تم الإرسال عبر نموذج التواصل في موقع ISG Advisory.
        </p>
      </div>
    </div>
  `;
}

function buildText({ name, email, stage, challenge }: SendContactEmailInput): string {
  return [
    "طلب تواصل جديد — ISG Advisory",
    "",
    `الاسم: ${name}`,
    `البريد: ${email}`,
    `مرحلة الشركة: ${stageLabel(stage)}`,
    "",
    challenge ? `التحدي:\n${challenge}` : "",
    "",
    "تم الإرسال عبر نموذج التواصل في موقع ISG Advisory.",
  ].join("\n");
}

export async function sendContactEmail(data: SendContactEmailInput): Promise<{ sent: boolean; error?: string }> {
  if (!apiKey) {
    console.log("[ISG] RESEND_API_KEY غير مُعد. بيانات النموذج:", data);
    return { sent: false, error: "Email service not configured" };
  }
  if (!toEmail) {
    console.log("[ISG] CONTACT_TO_EMAIL غير مُعد. بيانات النموذج:", data);
    return { sent: false, error: "Contact email not configured" };
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject: `طلب تواصل: ${data.name} — ISG Advisory`,
      text: buildText(data),
      html: buildHtml(data),
    });

    if (error) {
      console.error("[ISG] Resend error:", error);
      return { sent: false, error: error.message };
    }

    return { sent: true };
  } catch (err) {
    console.error("[ISG] Email send failed:", err);
    return { sent: false, error: "Failed to send email" };
  }
}
