import { validateLead } from "@/lib/form";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const result = validateLead(body);

  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  // نقطة الربط المستقبلية مع الإيميل وقاعدة البيانات والـ CRM موثقة في docs/INTEGRATIONS.md
  return Response.json({ ok: true, message: "تم استلام طلبك بنجاح." }, { status: 200 });
}