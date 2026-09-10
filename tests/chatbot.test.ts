import { test } from "node:test";
import assert from "node:assert/strict";
import { respond, normalizeArabic, initialChatState, type ChatClientState } from "../lib/assistant/engine";
import { knowledgeBase, mainChips, welcomeParagraphs } from "../lib/assistant/knowledge";

function fresh(): ChatClientState {
  return JSON.parse(JSON.stringify(initialChatState)) as ChatClientState;
}

// ---------- التطبيع العربي ----------

test("normalizeArabic unifies hamza, taa marbuta, alef maqsura and strips diacritics", () => {
  assert.equal(normalizeArabic("متى تحتاجونَ إلى مُحاسِب؟"), "متي تحتاجون الي محاسب");
  assert.equal(normalizeArabic("ما هي خدماتكم؟"), "ما هي خدماتكم");
  assert.equal(normalizeArabic("أهلاً"), "اهلا");
});

// ---------- سلامة قاعدة المعرفة ----------

test("knowledge base: unique ids, non-empty paragraphs, valid links", () => {
  const ids = new Set<string>();
  for (const entry of knowledgeBase) {
    assert.ok(!ids.has(entry.id), `duplicate id ${entry.id}`);
    ids.add(entry.id);
    assert.ok(entry.paragraphs.length > 0 && entry.paragraphs.every((p) => p.trim().length > 0));
    assert.ok(entry.strong.length > 0, `entry ${entry.id} needs strong keywords`);
    for (const link of entry.links ?? []) assert.ok(link.href.startsWith("/"));
  }
});

// ---------- سلوك المحرك ----------

test("welcome: empty message returns welcome text and main chips", () => {
  const r = respond("", fresh());
  assert.deepEqual(r.paragraphs, welcomeParagraphs);
  assert.ok(r.chips?.length && r.chips.length === mainChips.length);
});

test("greeting variants return welcome", () => {
  for (const msg of ["مرحبا", "السلام عليكم", "هلا", "صباح الخير"]) {
    const r = respond(msg, fresh());
    assert.deepEqual(r.paragraphs, welcomeParagraphs, `failed for: ${msg}`);
  }
});

test("services question matches services entry from multiple phrasings", () => {
  for (const msg of ["ما هي خدماتكم؟", "وش تقدمون؟", "اي الخدمات متوفرة؟"]) {
    const r = respond(msg, fresh());
    assert.ok(r.paragraphs.some((p) => p.includes("أربع خدمات")), `failed for: ${msg}`);
  }
});

test("CFO question matches CFO service with normalized spelling", () => {
  const r1 = respond("ما هو الـ CFO الخارجي؟", fresh());
  assert.ok(r1.paragraphs.some((p) => p.includes("CFO")));
  const r2 = respond("محتاج مدير مالي جزئي", fresh());
  assert.ok(r2.paragraphs.some((p) => p.includes("CFO")));
});

test("restructuring question matches its service", () => {
  const r = respond("شركتي فيها خسائر وأبغى اعادة هيكلة", fresh());
  assert.ok(r.paragraphs.some((p) => p.includes("إعادة هيكلة") || p.includes("اعادة هيكله")));
});

test("pricing question returns honest pricing entry (no invented numbers)", () => {
  const r = respond("كم تكلفة خدماتكم؟", fresh());
  assert.ok(r.paragraphs.some((p) => p.includes("جلسة تشخيص")));
  assert.ok(!r.paragraphs.some((p) => /\d{3,}/.test(p)), "pricing must not invent numbers");
});

test("contact info question returns real email and whatsapp", () => {
  const r = respond("كيف أتواصل معكم على الواتساب؟", fresh());
  const all = r.paragraphs.join(" ");
  assert.ok(all.includes("Info@isgkw.com"));
  assert.ok(all.includes("wa.me/966502817792"));
});

test("assessment question matches tool entry", () => {
  const r = respond("اخبرني عن أداة التقييم الذاتي", fresh());
  assert.ok(r.paragraphs.some((p) => p.includes("15 سؤالاً")));
});

test("out-of-scope question falls back safely without inventing answers", () => {
  const r = respond("ما رأيكم في سعر الذهب الأسبوع القادم؟", fresh());
  assert.ok(r.paragraphs.some((p) => p.includes("خارج")));
});

test("determinism: identical inputs give identical outputs", () => {
  const a = respond("ما هي خدماتكم؟", fresh());
  const b = respond("ما هي خدماتكم؟", fresh());
  assert.deepEqual(a, b);
});

test("more: asks for details after a topic was matched", () => {
  const first = respond("أخبرني عن خدمة التدريب", fresh());
  assert.ok(first.state.lastTopic);
  const more = respond("المزيد من التفاصيل", first.state);
  assert.ok(more.paragraphs.length > 0);
});

// ---------- آلة حالة التقاط العميل ----------

function startLead() {
  const s1 = respond("أريد التواصل معكم", fresh());
  assert.equal(s1.state.lead.step, "name");
  return s1.state;
}

test("lead flow: happy path reaches submit with correct data", () => {
  const state1 = startLead();
  const s2 = respond("أحمد محمد", state1);
  assert.equal(s2.state.lead.step, "email");

  const s3 = respond("owner@company.com", s2.state);
  assert.equal(s3.state.lead.step, "stage");

  const s4 = respond("شركة قائمة", s3.state);
  assert.equal(s4.state.lead.step, "consent");

  const s5 = respond("اوافق وارسل الطلب", s4.state);
  assert.ok(s5.submit);
  assert.equal(s5.submit?.name, "أحمد محمد");
  assert.equal(s5.submit?.email, "owner@company.com");
  assert.equal(s5.submit?.stage, "شركة قائمة");
  assert.equal(s5.state.lead.step, "idle");
});

test("lead flow: invalid email is rejected without advancing", () => {
  const state1 = startLead();
  const s2 = respond("سارة", state1);
  const s3 = respond("بريد-غير-صحيح", s2.state);
  assert.equal(s3.state.lead.step, "email");
  assert.ok(!s3.submit);
});

test("lead flow: invalid stage is rejected with stage options", () => {
  const state1 = startLead();
  const s2 = respond("خالد", state1);
  const s3 = respond("khaled@example.com", s2.state);
  const s4 = respond("مرحلة غير موجودة", s3.state);
  assert.equal(s4.state.lead.step, "stage");
  assert.ok(s4.chips?.some((c) => c.label === "شركة قائمة"));
});

test("lead flow: cancel at any step resets to idle", () => {
  const state1 = startLead();
  const s2 = respond("إلغاء", state1);
  assert.equal(s2.state.lead.step, "idle");

  const stateA = startLead();
  const sB = respond("فهد", stateA);
  const sC = respond("الغاء", sB.state);
  assert.equal(sC.state.lead.step, "idle");
});

test("lead flow: consent requires explicit approval", () => {
  const state1 = startLead();
  const s2 = respond("نورة", state1);
  const s3 = respond("noura@example.com", s2.state);
  const s4 = respond("شركة ناشئة تبحث عن استثمار", s3.state);
  const s5 = respond("شيء آخر", s4.state);
  assert.equal(s5.state.lead.step, "consent");
  assert.ok(!s5.submit);
});
