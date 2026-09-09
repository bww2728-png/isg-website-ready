import { test } from "node:test";
import assert from "node:assert/strict";
import { sslForHost } from "../lib/db";

test("sslForHost: internal railway host disables TLS", () => {
  assert.equal(sslForHost("isg-postgres.railway.internal"), false);
});

test("sslForHost: external host uses relaxed TLS", () => {
  assert.deepEqual(sslForHost("containers-us-west-1.railway.app"), { rejectUnauthorized: false });
  assert.deepEqual(sslForHost("db.example.com"), { rejectUnauthorized: false });
});

test("sslForHost: null host uses relaxed TLS", () => {
  assert.deepEqual(sslForHost(null), { rejectUnauthorized: false });
});
