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
  insightsArticles,
  caseStudies,
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

test("insights articles: published set matches week-1 plan titles, unique slugs, complete fields", () => {
  assert.equal(insightsArticles.length, 3);
  const slugs = new Set<string>();
  for (const article of insightsArticles) {
    assert.ok(!slugs.has(article.slug), `duplicate slug ${article.slug}`);
    slugs.add(article.slug);
    assert.ok(article.title.trim().length > 0);
    assert.ok(article.excerpt.trim().length > 0);
    assert.ok(article.sections.length >= 3, `sections for ${article.slug}`);
    for (const section of article.sections) {
      assert.ok(section.heading.trim().length > 0);
      assert.ok(section.paragraphs.length > 0);
      for (const p of section.paragraphs) assert.ok(p.trim().length > 0);
    }
    assert.ok(article.closing.trim().length > 0);
  }
  const planWeek1 = insightsPlan.filter((p) => p.week === "الأسبوع الأول").map((p) => p.title).sort();
  const publishedTitles = insightsArticles.map((a) => a.title).sort();
  assert.deepEqual(publishedTitles, planWeek1);
});

test("case studies: unique slugs, four axes content, valid service link, honesty note", () => {
  assert.equal(caseStudies.length, 3);
  const serviceSlugs = new Set(services.map((s) => s.slug));
  const slugs = new Set<string>();
  for (const cs of caseStudies) {
    assert.ok(!slugs.has(cs.slug), `duplicate slug ${cs.slug}`);
    slugs.add(cs.slug);
    assert.ok(cs.headline.trim().length > 0);
    assert.ok(cs.context.trim().length > 0);
    assert.ok(cs.challenge.trim().length > 0);
    assert.ok(cs.intervention.length > 0);
    assert.ok(cs.impact.length > 0);
    assert.ok(serviceSlugs.has(cs.serviceSlug), `unknown serviceSlug ${cs.serviceSlug}`);
    assert.ok(cs.note.includes("مجهولة"), `honesty note for ${cs.slug}`);
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