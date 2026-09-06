import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  services,
  pillars,
  journey,
  industries,
  team,
  insightsPlan,
} from "../lib/content";

const ROOT = fileURLToPath(new URL("../", import.meta.url));

test("services: length 4, each with non-empty promise, 4 outputs, 4 problems, and unique slug", () => {
  assert.equal(services.length, 4);
  const slugs = new Set<string>();
  for (const service of services) {
    assert.ok(service.promise.trim().length > 0, `promise empty for ${service.slug}`);
    assert.ok(service.outputs.length === 4, `outputs count for ${service.slug}`);
    assert.ok(service.problems.length === 4, `problems count for ${service.slug}`);
    slugs.add(service.slug);
  }
  assert.equal(slugs.size, services.length, "slugs must be unique");
});

test("content collections have expected lengths", () => {
  assert.equal(pillars.length, 4);
  assert.equal(journey.length, 6);
  assert.equal(industries.length, 6);
  assert.equal(team.length, 4);
  assert.equal(insightsPlan.length, 12);
});

function readFilesRecursively(dir: string, acc: { path: string; content: string }[] = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const child = join(dir, entry.name);
    if (entry.isDirectory()) {
      readFilesRecursively(child, acc);
    } else {
      acc.push({ path: child, content: readFileSync(child, "utf8") });
    }
  }
  return acc;
}

test("content.ts contains no forbidden marketing phrases", () => {
  const file = join(ROOT, "lib", "content.ts");
  const content = readFileSync(file, "utf8");
  for (const phrase of ["حلول متكاملة", "نفخر", "خبراء متميزون"]) {
    assert.equal(content.includes(phrase), false, `found banned phrase: ${phrase}`);
  }
});

test("no AI references anywhere in app/, components/, and lib/", () => {
  const dirs = ["app", "components", "lib"];
  const files: { path: string; content: string }[] = [];
  for (const d of dirs) {
    readFilesRecursively(join(ROOT, d), files);
  }
  assert.ok(files.length > 0, "expected at least one source file to scan");
  const banned = ["الذكاء الاصطناعي", "AI Chatbot", "chatbot"];
  for (const file of files) {
    for (const phrase of banned) {
      assert.equal(
        file.content.includes(phrase),
        false,
        `found banned term "${phrase}" in ${file.path}`,
      );
    }
  }
});