import { test } from "node:test";
import assert from "node:assert/strict";
import { QUESTIONS, evaluate } from "../lib/assessment";

test("number of questions is 15", () => {
  assert.equal(QUESTIONS.length, 15);
});

test("every question has 3 options with points 0/1/2 in order", () => {
  for (const question of QUESTIONS) {
    assert.equal(question.options.length, 3);
    question.options.forEach((option, i) => {
      if (i === 0) assert.equal(option.points, 0);
      else if (i === 1) assert.equal(option.points, 1);
      else assert.equal(option.points, 2);
    });
  }
});

function allAnswers(value: number): Record<string, number> {
  return Object.fromEntries(QUESTIONS.map((q) => [q.id, value]));
}

test("evaluate with all answered 0 gives totalPercent 0 and band stabilize", () => {
  const result = evaluate(allAnswers(0));
  assert.equal(result.totalPercent, 0);
  assert.equal(result.band.id, "stabilize");
});

test("evaluate with all answered 1 gives totalPercent 50 and band prioritize", () => {
  const result = evaluate(allAnswers(1));
  assert.equal(result.totalPercent, 50);
  assert.equal(result.band.id, "prioritize");
});

test("evaluate with all answered 2 gives totalPercent 100 and band polish", () => {
  const result = evaluate(allAnswers(2));
  assert.equal(result.totalPercent, 100);
  assert.equal(result.band.id, "polish");
});

test("evaluate with empty answers gives totalPercent 0 and band stabilize (unanswered excluded)", () => {
  const result = evaluate({});
  assert.equal(result.totalPercent, 0);
  assert.equal(result.band.id, "stabilize");
});

test("evaluate is deterministic: same answers give same result", () => {
  const answers = allAnswers(1);
  const first = evaluate(answers);
  const second = evaluate(answers);
  assert.deepEqual(first, second);
});