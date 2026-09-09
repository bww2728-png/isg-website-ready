import { test } from "node:test";
import assert from "node:assert/strict";
import { buildLeadMessage } from "../lib/whatsapp";

const sample = {
  name: "أحمد محمد",
  email: "owner@example.com",
  stage: "شركة قائمة",
  challenge: "تحدي تجريبي",
  referenceId: 7,
};

test("buildLeadMessage contains every lead field and the reference id", () => {
  const msg = buildLeadMessage(sample);
  assert.ok(msg.includes("الاسم: أحمد محمد"));
  assert.ok(msg.includes("البريد: owner@example.com"));
  assert.ok(msg.includes("مرحلة الشركة: شركة قائمة"));
  assert.ok(msg.includes("الرقم المرجعي: #7"));
  assert.ok(msg.includes("تحدي تجريبي"));
});

test("buildLeadMessage omits reference and challenge when absent", () => {
  const msg = buildLeadMessage({ name: "س", email: "a@b.com", stage: "شركة قائمة" });
  assert.ok(!msg.includes("الرقم المرجعي"));
  assert.equal(msg.split("\n").length, 4);
});
