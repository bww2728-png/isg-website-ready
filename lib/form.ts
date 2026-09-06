/**
 * التحقق من بيانات نموذج التواصل — منطق مشترك بين الواجهة والخادم.
 * حدود البيانات حد أدنى وفق نظام حماية البيانات الشخصية السعودي: 4-5 حقول فقط.
 */
import { audienceStages } from "./content";

export type LeadInput = {
  name: string;
  email: string;
  stage: string;
  challenge: string;
  consent: boolean;
  company: string;
};

export type LeadErrors = Partial<Record<"name" | "email" | "stage" | "consent" | "challenge", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RE = /(https?:\/\/|www\.)/i;
const MAX_NAME = 100;
const MAX_CHALLENGE = 500;

export function validateLead(
  raw: unknown,
): { ok: true; data: LeadInput } | { ok: false; errors: LeadErrors } {
  const errors: LeadErrors = {};
  const input = (raw ?? {}) as Partial<LeadInput> & Record<string, unknown>;

  const name = typeof input.name === "string" ? input.name.trim().slice(0, MAX_NAME) : "";
  const email = typeof input.email === "string" ? input.email.trim().slice(0, 254) : "";
  const stage = typeof input.stage === "string" ? input.stage : "";
  const challenge =
    typeof input.challenge === "string" ? input.challenge.trim().slice(0, MAX_CHALLENGE) : "";
  const consent = input.consent === true;
  const company = typeof input.company === "string" ? input.company.trim() : "";

  if (company !== "") {
    // حقل خفي للروبوتات: يجب أن يبقى فارغاً.
    return { ok: false, errors: { name: "يرجى المحاولة مرة أخرى." } };
  }
  if (URL_RE.test(name) || URL_RE.test(challenge)) {
    // رفض النصوص التي تحتوي روابط لمنع البريد المزعج.
    return { ok: false, errors: { name: "يرجى المحاولة مرة أخرى." } };
  }
  if (name.length < 3) {
    errors.name = "يرجى كتابة الاسم الكامل.";
  }
  if (!EMAIL_RE.test(email)) {
    errors.email = "يرجى كتابة بريد إلكتروني صحيح.";
  }
  if (!(audienceStages as readonly string[]).includes(stage)) {
    errors.stage = "يرجى اختيار مرحلة الشركة.";
  }
  if (!consent) {
    errors.consent = "يلزم الموافقة على معالجة البيانات قبل الإرسال.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }
  return { ok: true, data: { name, email, stage, challenge, consent: true, company } };
}