import { getPool, isDbConfigured } from "@/lib/db";

export type LeadRecord = {
  name: string;
  email: string;
  stage: string;
  challenge: string;
  source: string;
};

const CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  stage TEXT NOT NULL,
  challenge TEXT,
  source TEXT NOT NULL DEFAULT 'contact-form'
);
`;

const INSERT_LEAD = `
INSERT INTO leads (name, email, stage, challenge, source)
VALUES ($1, $2, $3, $4, $5)
RETURNING id;
`;

/**
 * يضمن وجود جدول الطلبات ويُنشئه عند الحاجة (عملية آمنة متكررة).
 * لا يرمي أخطاء؛ يعيد false عند غياب إعدادات القاعدة أو فشل الاتصال.
 */
async function ensureTable(): Promise<boolean> {
  const pool = getPool();
  if (!pool) return false;
  try {
    await pool.query(CREATE_TABLE);
    return true;
  } catch (err) {
    console.error("[ISG] DB ensureTable failed:", err);
    return false;
  }
}

/**
 * يحفظ طلب التواصل في جدول leads بأمان. يعيد المفتاح عند النجاح
 * أو null عند غياب الإعدادات/فشل غير متوقع — دون كسر تدفق الاستجابة.
 */
export async function saveLead(data: LeadRecord): Promise<number | null> {
  if (!isDbConfigured()) {
    console.log("[ISG] DATABASE_URL غير مُعد. الطلب لن يُحفظ في القاعدة.");
    return null;
  }
  const pool = getPool();
  if (!pool) return null;

  try {
    await ensureTable();
    const result = await pool.query(INSERT_LEAD, [
      data.name,
      data.email,
      data.stage,
      data.challenge || null,
      data.source,
    ]);
    return result.rows[0]?.id ?? null;
  } catch (err) {
    console.error("[ISG] DB saveLead failed:", err);
    return null;
  }
}
