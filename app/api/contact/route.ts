import { validateLead } from "@/lib/form";
import { sendContactEmail } from "@/lib/email";
import { sendWhatsAppLead } from "@/lib/whatsapp";
import { saveLead } from "@/lib/leads";

type Bucket = { count: number; resetAt: number };

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 16_384;

const buckets = new Map<string, Bucket>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf;
  return request.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const key = clientKey(request);

  if (rateLimited(key)) {
    const headers = { "Cache-Control": "no-store" };
    return Response.json(
      { ok: false, message: "عدد الطلبات كبير جداً، يرجى المحاولة بعد دقيقة." },
      { status: 429, headers },
    );
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    const headers = { "Cache-Control": "no-store" };
    return Response.json(
      { ok: false, message: "البيانات المرسلة كبيرة جداً." },
      { status: 413, headers },
    );
  }

  const body = await request.json().catch(() => null);

  const result = validateLead(body);

  if (!result.ok) {
    return Response.json(
      { ok: false, errors: result.errors },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const saved = await saveLead({
    name: result.data.name,
    email: result.data.email,
    stage: result.data.stage,
    challenge: result.data.challenge,
    source: "contact-form",
  });

  const emailResult = await sendContactEmail({
    name: result.data.name,
    email: result.data.email,
    stage: result.data.stage,
    challenge: result.data.challenge,
    referenceId: saved,
  });

  if (!emailResult.sent) {
    console.error("[ISG] Email not sent:", emailResult.transport, emailResult.error);
  }

  const whatsappResult = await sendWhatsAppLead({
    name: result.data.name,
    email: result.data.email,
    stage: result.data.stage,
    challenge: result.data.challenge,
    referenceId: saved,
  });

  if (!whatsappResult.sent && !whatsappResult.skipped) {
    console.error("[ISG] WhatsApp not sent:", whatsappResult.error);
  }

  return Response.json(
    { ok: true, message: "تم استلام طلبك بنجاح.", referenceId: saved },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}
