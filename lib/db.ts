import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

declare global {
  var __ISG_LEADS_POOL__: Pool | undefined;
}

function normalizeConnectionString(raw: string): string {
  try {
    const url = new URL(raw);
    url.searchParams.delete("sslmode");
    return url.toString();
  } catch {
    return raw;
  }
}

/**
 * إعدادات TLS حسب وجهة الاتصال:
 * - داخل الشبكة الخاصة لـ Railway (.railway.internal): الاتصال معزول، ولا TLS.
 * - خارجها: TLS مع تجاوز فحص الشهادة الموقعة ذاتياً (شهادات Railway).
 */
export function sslForHost(host: string | null): false | { rejectUnauthorized: false } {
  if (host && host.endsWith(".railway.internal")) return false;
  return { rejectUnauthorized: false };
}

function createPool(): Pool | undefined {
  if (!connectionString) return undefined;
  let hostname: string | null = null;
  try {
    hostname = new URL(connectionString).hostname;
  } catch {
    hostname = null;
  }
  return new Pool({
    connectionString: normalizeConnectionString(connectionString),
    max: 5,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30_000,
    ssl: sslForHost(hostname),
  });
}

/**
 * عميل PostgreSQL مشترك آمن سرفر-سايد.
 * يُنشأ مرة واحدة ويعاد استخدامه. لا يُكشف أبداً للواجهة.
 * إذا لم تُضبط DATABASE_URL يعود undefined دون إحداث أي خطأ.
 */
export function getPool(): Pool | undefined {
  if (!connectionString) return undefined;
  if (!global.__ISG_LEADS_POOL__) {
    global.__ISG_LEADS_POOL__ = createPool();
  }
  return global.__ISG_LEADS_POOL__;
}

export function isDbConfigured(): boolean {
  return Boolean(connectionString);
}
