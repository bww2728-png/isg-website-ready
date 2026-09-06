import type { Metadata } from "next";
import { ButtonLink, Chip, Section, SectionHeading } from "@/components/ui";
import { ctas, insightsPlan } from "@/lib/content";

export const metadata: Metadata = {
  title: "الرؤى والمحتوى",
  description: "كل قطعة محتوى تشرح فكرة واحدة، تقدم دليلاً أو مثالاً، وتنتهي بخطوة عملية.",
};

const insightsDescription = "كل قطعة محتوى تشرح فكرة واحدة، تقدم دليلاً أو مثالاً، وتنتهي بخطوة عملية.";

export default function InsightsPage() {
  const weekly = insightsPlan.reduce<
    { week: string; axis: string; items: { title: string }[] }[]
  >((groups, article) => {
    const existing = groups.find((group) => group.week === article.week);
    if (existing) {
      existing.items.push({ title: article.title });
    } else {
      groups.push({ week: article.week, axis: article.axis, items: [{ title: article.title }] });
    }
    return groups;
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">المحتوى</span>
          <h1>الرؤى والمحتوى</h1>
          <p>{insightsDescription}</p>
        </div>
      </div>

      <Section>
        <SectionHeading eyebrow="خطة الانطلاق" title="12 قطعة تبني الثقة تدريجياً دون تكرار" description="خطة المحتوى لأول 30 يوماً وفق أربعة محاور أسبوعية." />
        <p className="note">المقالات في مرحلة الإعداد والنشر التدريجي؛ يُحدَّث هذا الفهرس مع كل نشر.</p>
        {weekly.map((group) => (
          <div key={group.week} className="mt-8">
            <h3>{group.week}</h3>
            <Chip>{group.axis}</Chip>
            <div className="grid-3">
              {group.items.map((article) => (
                <div className="card" key={article.title}>
                  <h4>{article.title}</h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section muted>
        <div className="quote">{insightsDescription}</div>
      </Section>

      <Section>
        <div className="cta">
          <h2>قبل أن تنشر مقالتك الأولى، انطلق من تشخيص واقعك.</h2>
          <ButtonLink href="/contact">{ctas.diagnostic}</ButtonLink>
        </div>
      </Section>
    </>
  );
}