/**
 * إرسال بريد طلب التواصل — قناة واحدة تُختار حسب متغيرات البيئة:
 * - Brevo (BREVO_API_KEY): القناة النشطة حالياً؛ تسمح بالإرسال إلى أي عنوان بعد توثيق عنوان المُرسل في لوحة Brevo.
 * - Resend (RESEND_API_KEY): جاهزة للتشغيل بعد توثيق نطاق isgkw.com في Resend (حينها تُضبط CONTACT_FROM_EMAIL على عنوان ضمن النطاق).
 * بلا أي قناة مُعدة: تُسجّل بيانات الطلب في سجل الخادم ولا يفشل تدفق الاستجابة.
 */
import { Resend } from "resend";

export type ContactEmailInput = {
  name: string;
  email: string;
  stage: string;
  challenge: string;
  referenceId?: number | null;
};

export type EmailTransport = "brevo" | "resend" | "none";

export type ContactEmailResult = {
  sent: boolean;
  error?: string;
  transport: EmailTransport;
};

const FROM_NAME = "ISG Advisory — بوابة الحلول المبتكرة";
const RESEND_DEFAULT_FROM = "ISG Advisory <onboarding@resend.dev>";

export function selectTransport(): EmailTransport {
  if (process.env.BREVO_API_KEY) return "brevo";
  if (process.env.RESEND_API_KEY) return "resend";
  return "none";
}

/** وقت الاستلام بتوقيت الرياض (ميلادي) لعرضه داخل الرسالة. */
export function formatRiyadhNow(): string {
  return new Intl.DateTimeFormat("ar", {
    timeZone: "Asia/Riyadh",
    calendar: "gregory",
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());
}

function buildSubject(data: ContactEmailInput): string {
  return `طلب تواصل: ${data.name} — ISG Advisory`;
}

export function buildText(data: ContactEmailInput): string {
  const lines = [
    "طلب تواصل جديد — ISG Advisory",
    "",
    `الاسم: ${data.name}`,
    `البريد: ${data.email}`,
    `مرحلة الشركة: ${data.stage}`,
    `وقت الاستلام: ${formatRiyadhNow()}`,
  ];
  if (data.referenceId != null) {
    lines.push(`الرقم المرجعي: ${data.referenceId}`);
  }
  lines.push(
    "",
    data.challenge ? `التحدي:\n${data.challenge}` : "التحدي: —",
    "",
    "تم الإرسال عبر نموذج التواصل في موقع ISG Advisory.",
  );
  return lines.join("\n");
}

export function buildHtml(data: ContactEmailInput): string {
  const referenceRow =
    data.referenceId != null
      ? `<tr>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0; color: #5d6d7e; font-weight: 600;">الرقم المرجعي</td>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0;">#${data.referenceId}</td>
          </tr>`
      : "";
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
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0; color: #5d6d7e; font-weight: 600;">البريد</td>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0;"><a href="mailto:${data.email}" style="color: #c9a961;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0; color: #5d6d7e; font-weight: 600;">مرحلة الشركة</td>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0;">${data.stage}</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0; color: #5d6d7e; font-weight: 600;">وقت الاستلام</td>
            <td style="padding: 0.75rem 0; border-bottom: 1px solid #e5eaf0;">${formatRiyadhNow()}</td>
          </tr>
          ${referenceRow}
        </table>
        ${data.challenge ? `
        <div style="margin-bottom: 1.5rem;">
          <p style="margin: 0 0 0.5rem; color: #5d6d7e; font-weight: 600;">التحدي</p>
          <div style="padding: 1rem; background: #f6f8fa; border-radius: 12px; border: 1px solid #e5eaf0; line-height: 1.8;">
            ${data.challenge.replace(/\n/g, "<br>")}
          </div>
        </div>
        ` : `
        <div style="margin-bottom: 1.5rem;">
          <p style="margin: 0 0 0.5rem; color: #5d6d7e; font-weight: 600;">التحدي</p>
          <div style="padding: 1rem; background: #f6f8fa; border-radius: 12px; border: 1px solid #e5eaf0; line-height: 1.8; color: #5d6d7e;">لم يُذكر.</div>
        </div>
        `}
        <p style="margin: 0; font-size: 0.85rem; color: #5d6d7e;">
          للرد مباشرة على صاحب الطلب: اضغط "رد" في بريدك وسيذهب الرد إلى بريده.
        </p>
      </div>
    </div>
  `;
}

async function sendViaBrevo(data: ContactEmailInput): Promise<ContactEmailResult> {
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!fromEmail) {
    console.error("[ISG] CONTACT_FROM_EMAIL غير مُعد (مطلوب لقناة Brevo). بيانات النموذج:", data);
    return { sent: false, error: "Sender email not configured", transport: "brevo" };
  }
  if (!toEmail) {
    console.error("[ISG] CONTACT_TO_EMAIL غير مُعد. بيانات النموذج:", data);
    return { sent: false, error: "Contact email not configured", transport: "brevo" };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey as string,
        "content-type": "application/json",
        accept: "application/json",
      },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        sender: { name: FROM_NAME, email: fromEmail },
        to: [{ email: toEmail }],
        replyTo: { email: data.email },
        subject: buildSubject(data),
        htmlContent: buildHtml(data),
        textContent: buildText(data),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[ISG] Brevo error:", response.status, detail);
      return { sent: false, error: `Brevo request failed (${response.status})`, transport: "brevo" };
    }

    return { sent: true, transport: "brevo" };
  } catch (err) {
    console.error("[ISG] Brevo send failed:", err);
    return { sent: false, error: "Failed to send email", transport: "brevo" };
  }
}

async function sendViaResend(data: ContactEmailInput): Promise<ContactEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!toEmail) {
    console.error("[ISG] CONTACT_TO_EMAIL غير مُعد. بيانات النموذج:", data);
    return { sent: false, error: "Contact email not configured", transport: "resend" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? RESEND_DEFAULT_FROM,
      to: toEmail,
      replyTo: data.email,
      subject: buildSubject(data),
      text: buildText(data),
      html: buildHtml(data),
    });

    if (error) {
      console.error("[ISG] Resend error:", error);
      return { sent: false, error: error.message, transport: "resend" };
    }

    return { sent: true, transport: "resend" };
  } catch (err) {
    console.error("[ISG] Resend send failed:", err);
    return { sent: false, error: "Failed to send email", transport: "resend" };
  }
}

/**
 * يرسل بريد الطلب عبر القناة المُعدة. لا يرمي أخطاء؛ يعيد النتيجة
 * ليقرر معالج الاستدعاء ما يفعله دون كسر تدفق الاستجابة.
 */
export async function sendContactEmail(data: ContactEmailInput): Promise<ContactEmailResult> {
  const transport = selectTransport();

  if (transport === "none") {
    console.log("[ISG] لا توجد قناة بريد مُعدة (BREVO_API_KEY / RESEND_API_KEY). بيانات النموذج:", data);
    return { sent: false, error: "Email service not configured", transport };
  }

  return transport === "brevo" ? sendViaBrevo(data) : sendViaResend(data);
}
