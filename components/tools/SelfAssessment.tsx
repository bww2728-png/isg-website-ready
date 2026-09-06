"use client";

import { useMemo, useState } from "react";
import { AXES, QUESTIONS, evaluate, type Answers } from "@/lib/assessment";
import { ButtonLink } from "@/components/ui";
import { ctas } from "@/lib/content";

type View = { kind: "intro" } | { kind: "quiz"; index: number } | { kind: "result" };

export default function SelfAssessment() {
  const [view, setView] = useState<View>({ kind: "intro" });
  const [answers, setAnswers] = useState<Answers>({});

  const result = useMemo(() => evaluate(answers), [answers]);

  function start() {
    setAnswers({});
    setView({ kind: "quiz", index: 0 });
  }

  function select(questionId: string, optionIndex: number) {
    setAnswers((current) => ({ ...current, [questionId]: optionIndex }));
  }

  function next() {
    if (view.kind !== "quiz") return;
    if (view.index === QUESTIONS.length - 1) {
      setView({ kind: "result" });
      return;
    }
    setView({ kind: "quiz", index: view.index + 1 });
  }

  function back() {
    if (view.kind !== "quiz" || view.index === 0) return;
    setView({ kind: "quiz", index: view.index - 1 });
  }

  if (view.kind === "intro") {
    return (
      <div className="card" style={{ padding: "2rem" }}>
        <h2 style={{ fontSize: "1.6rem" }}>تقييم ذاتي سريع</h2>
        <p className="lead">
          أجب على 15 سؤالاً موزعة على 4 محاور، واحصل فوراً على قراءة أولية لموضع شركتك
          وتوصية بالخطوة الأعلى أثراً. يستغرق التقييم نحو 4 دقائق.
        </p>
        <ul className="list-check">
          {AXES.map((axis) => (
            <li key={axis.id}>{axis.title}</li>
          ))}
        </ul>
        <p className="note">
          أداة تشخيص أولية تستند إلى إجاباتك فقط، ولا تمثل ضماناً لنتائج محددة. إجاباتك
          لا تُحفظ ولا تُرسل؛ يعمل التقييم كلياً داخل متصفحك.
        </p>
        <button type="button" className="button button-primary" onClick={start}>
          ابدأ التقييم
        </button>
      </div>
    );
  }

  if (view.kind === "quiz") {
    const question = QUESTIONS[view.index];
    const answeredCount = Object.keys(answers).length;
    const progress = Math.round((answeredCount / QUESTIONS.length) * 100);
    const selected = answers[question.id];

    return (
      <div className="card" style={{ padding: "2rem" }}>
        <div className="tool-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="تقدم التقييم">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p style={{ marginTop: "1rem", marginBottom: 0 }}>
          <span className="pill">{AXES.find((axis) => axis.id === question.axis)?.title}</span>
          <span className="note" style={{ marginInlineStart: ".6rem" }}>
            السؤال {view.index + 1} من {QUESTIONS.length}
          </span>
        </p>
        <h2 className="tool-q" style={{ marginTop: "1.25rem" }}>
          {question.text}
        </h2>
        <div role="radiogroup" aria-label={question.text} style={{ display: "grid", gap: ".75rem", marginTop: "1.25rem" }}>
          {question.options.map((option, index) => (
            <button
              key={option.label}
              type="button"
              role="radio"
              aria-checked={selected === index}
              className="tool-option"
              onClick={() => select(question.id, index)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="actions" style={{ marginTop: "1.5rem" }}>
          {view.index > 0 ? (
            <button type="button" className="button button-outline" onClick={back}>
              السابق
            </button>
          ) : null}
          <button
            type="button"
            className="button button-primary"
            onClick={next}
            disabled={selected === undefined}
            style={selected === undefined ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
          >
            {view.index === QUESTIONS.length - 1 ? "عرض النتيجة" : "التالي"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: "2rem" }}>
      <span className="eyebrow">النتيجة</span>
      <h2 style={{ fontSize: "1.8rem" }}>{result.band.title}</h2>
      <p className="lead">{result.band.summary}</p>

      <div className="tool-progress" role="progressbar" aria-valuenow={result.totalPercent} aria-valuemin={0} aria-valuemax={100} aria-label="النسبة الإجمالية للتقييم">
        <span style={{ width: `${result.totalPercent}%` }} />
      </div>
      <p className="note" style={{ marginTop: ".5rem" }}>
        النسبة الإجمالية: {result.totalPercent}%
      </p>

      <h3 style={{ marginTop: "1.5rem", fontSize: "1.1rem" }}>القراءة حسب المحاور</h3>
      <div style={{ display: "grid", gap: ".9rem", marginTop: ".75rem" }}>
        {result.axisResults.map((axis) => (
          <div key={axis.axisId}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".9rem" }}>
              <span>{axis.title}</span>
              <span className="note">{axis.answered > 0 ? `${axis.percent}%` : "لم يُجب"}</span>
            </div>
            <div className="tool-bar gold" style={{ marginTop: ".35rem" }}>
              <span style={{ width: `${axis.percent}%` }} />
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", fontSize: "1.1rem" }}>التوصيات</h3>
      <div style={{ display: "grid", gap: ".75rem", marginTop: ".75rem" }}>
        {result.band.recommendations.map((recommendation) => (
          <div key={recommendation.title}>
            <span className="mini-label">{recommendation.title}</span>
            <p style={{ margin: "0 0 .75rem" }}>{recommendation.text}</p>
            <ButtonLink href={recommendation.href} variant="outline">
              {recommendation.href === "/contact" ? "اطلب جلسة تشخيصية" : "تعرف أكثر"}
            </ButtonLink>
          </div>
        ))}
      </div>

      <div className="actions" style={{ marginTop: "1.5rem" }}>
        <ButtonLink href="/contact">{ctas.diagnostic}</ButtonLink>
        <button type="button" className="button button-outline" onClick={start}>
          إعادة التقييم
        </button>
      </div>
      <p className="note" style={{ marginTop: "1rem" }}>
        أداة تشخيص أولية ولا تمثل ضماناً لنتائج محددة. قرار الاستثمار النهائي يظل للمستثمر.
      </p>
    </div>
  );
}