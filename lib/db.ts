import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

declare global {
  var __ISG_LEADS_POOL__: Pool | undefined;
}

function createPool(): Pool | undefined {
  if (!connectionString) return undefined;
  return new Pool({ connectionString, max: 5, connectionTimeoutMillis: 5000, idleTimeoutMillis: 30_000 });
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
