import { respond, initialChatState, type ChatClientState } from "@/lib/assistant/engine";

type Bucket = { count: number; resetAt: number };

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;
const MAX_BODY_BYTES = 8_192;

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

function parseState(raw: unknown): ChatClientState {
  if (!raw || typeof raw !== "object") return initialChatState;
  const s = raw as Partial<ChatClientState>;
  const lead = s.lead && typeof s.lead === "object" ? s.lead : { step: "idle" as const };
  const allowedSteps = ["idle", "name", "email", "stage", "consent"] as const;
  const step = allowedSteps.includes(lead.step as never) ? lead.step : "idle";
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : undefined);
  return {
    lastTopic: str(s.lastTopic, 120),
    lead: {
      step: step as ChatClientState["lead"]["step"],
      name: str(lead.name, 80),
      email: str(lead.email, 120),
      stage: str(lead.stage, 80),
    },
  };
}

export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };

  if (rateLimited(clientKey(request))) {
    return Response.json(
      { ok: false, message: "عدد الرسائل كبير جداً، يرجى المحاولة بعد دقيقة." },
      { status: 429, headers },
    );
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return Response.json({ ok: false, message: "الرسالة كبيرة جداً." }, { status: 413, headers });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ ok: false, message: "طلب غير صالح." }, { status: 400, headers });
  }

  const message = typeof body.message === "string" ? body.message : "";
  const state = parseState(body.state);

  const result = respond(message, state);

  return Response.json({ ok: true, ...result }, { headers });
}
