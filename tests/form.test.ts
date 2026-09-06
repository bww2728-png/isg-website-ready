import { test } from "node:test";
import assert from "node:assert/strict";
import { validateLead } from "../lib/form";

const validInput = {
  name: "  أحمد محمد  ",
  email: "  owner@example.com  ",
  stage: "شركة قائمة",
  challenge: "تحدٍ قصير",
  consent: true,
  company: "",
};

test("valid input returns ok:true with trimmed name and trims challenge", () => {
  const result = validateLead(validInput);
  assert.ok(result.ok);
  if (result.ok) {
    assert.equal(result.data.name, "أحمد محمد");
    assert.equal(result.data.email, "owner@example.com");
  } else {
    assert.fail("expected ok:true");
  }
});

test("challenge longer than 500 characters is truncated to 500", () => {
  const longChallenge = "ت".repeat(800);
  const result = validateLead({ ...validInput, challenge: longChallenge });
  assert.ok(result.ok);
  if (result.ok) {
    assert.equal(result.data.challenge.length, 500);
  } else {
    assert.fail("expected ok:true");
  }
});

test("short name yields a name error", () => {
  const result = validateLead({ ...validInput, name: "أ" });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.errors.name);
  }
});

test("invalid email yields an email error", () => {
  const result = validateLead({ ...validInput, email: "not-an-email" });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.errors.email);
  }
});

test("stage not in the list yields a stage error", () => {
  const result = validateLead({ ...validInput, stage: "مرحلة غير معروفة" });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.errors.stage);
  }
});

test("consent false yields a consent error", () => {
  const result = validateLead({ ...validInput, consent: false });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.errors.consent);
  }
});

test("filled company honeypot returns ok:false", () => {
  const result = validateLead({ ...validInput, company: "robot" });
  assert.equal(result.ok, false);
});