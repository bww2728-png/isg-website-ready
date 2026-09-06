import { validateLead } from "@/lib/form";

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

  // نقطة الربط المستقبلية مع الإيميل وقاعدة البيانات والـ CRM موثقة في docs/INTEGRATIONS.md
  return Response.json(
    { ok: true, message: "تم استلام طلبك بنجاح." },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}
