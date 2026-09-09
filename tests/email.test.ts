import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { selectTransport, buildText, buildHtml, formatRiyadhNow } from "../lib/email";

const sample = {
  name: "أحمد محمد",
  email: "owner@example.com",
  stage: "شركة قائمة",
  challenge: "تحدي تجريبي",
  referenceId: 42,
};

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  delete process.env.BREVO_API_KEY;
  delete process.env.RESEND_API_KEY;
});

afterEach(() => {
  process.env.BREVO_API_KEY = ORIGINAL_ENV.BREVO_API_KEY;
  process.env.RESEND_API_KEY = ORIGINAL_ENV.RESEND_API_KEY;
});

test("transport selection: brevo wins when both keys are set", () => {
  process.env.BREVO_API_KEY = "brevo-test-key";
  process.env.RESEND_API_KEY = "re_test_key";
  assert.equal(selectTransport(), "brevo");
});

test("transport selection: resend when only resend key is set", () => {
  process.env.RESEND_API_KEY = "re_test_key";
  assert.equal(selectTransport(), "resend");
});

test("transport selection: none when no keys are set", () => {
  assert.equal(selectTransport(), "none");
});

test("buildText contains every field needed to reply", () => {
  const text = buildText(sample);
  assert.ok(text.includes("الاسم: أحمد محمد"));
  assert.ok(text.includes("البريد: owner@example.com"));
  assert.ok(text.includes("مرحلة الشركة: شركة قائمة"));
  assert.ok(text.includes("التحدي:\nتحدي تجريبي"));
  assert.ok(text.includes("الرقم المرجعي: 42"));
  assert.ok(text.includes("وقت الاستلام:"));
});

test("buildText omits reference line when referenceId is null", () => {
  const text = buildText({ ...sample, referenceId: null });
  assert.ok(!text.includes("الرقم المرجعي"));
});

test("buildHtml contains fields and reference row, and omits it when null", () => {
  const html = buildHtml(sample);
  assert.ok(html.includes("أحمد محمد"));
  assert.ok(html.includes("owner@example.com"));
  assert.ok(html.includes("شركة قائمة"));
  assert.ok(html.includes("تحدي تجريبي"));
  assert.ok(html.includes("#42"));

  const htmlNoRef = buildHtml({ ...sample, referenceId: null });
  assert.ok(!htmlNoRef.includes("#42"));
});

test("formatRiyadhNow returns a non-empty string", () => {
  assert.ok(formatRiyadhNow().length > 0);
});
