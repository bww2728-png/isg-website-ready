import type { Metadata } from "next";
import { ButtonLink, Chip, Section, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
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
          <p className="lead">{insightsDescription}</p>
        </div>
      </div>

      <Section>
        <SectionHeading
          eyebrow="خطة الانطلاق"
          title="12 قطعة تبني الثقة تدريجياً دون تكرار"
          description="خطة المحتوى لأول 30 يوماً وفق أربعة محاور أسبوعية."
        />
        <p className="note">المقالات في مرحلة الإعداد والنشر التدريجي؛ يُحدَّث هذا الفهرس مع كل نشر.</p>
        {weekly.map((group, groupIndex) => (
          <Reveal key={group.week} delay={groupIndex * 60}>
            <div className="mt-8" style={{ marginBottom: "2.5rem" }}>
              <div className="flex" style={{ alignItems: "center", gap: "0.9rem", marginBottom: "1.25rem" }}>
                <h3 style={{ fontSize: "1.4rem" }}>{group.week}</h3>
                <span aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--line)" }} />
                <Chip>{group.axis}</Chip>
              </div>
              <div className="grid-3">
                {group.items.map((article) => (
                  <div className="card accent-top" key={article.title}>
                    <div className="flex" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                      <span className="card-icon">
                        <Icon name="document" size={22} />
                      </span>
                      <Chip>قيد الإعداد</Chip>
                    </div>
                    <h4 style={{ fontSize: "1.05rem" }}>{article.title}</h4>
                    <p className="note mt-2" style={{ marginBottom: 0 }}>
                      سيتاح المقال هنا عند النشر.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </Section>

      <Section muted>
        <Reveal>
          <div className="quote">{insightsDescription}</div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <div className="cta">
            <div>
              <h2>قبل أن تنشر مقالتك الأولى، انطلق من تشخيص واقعك.</h2>
              <p>ابدأ بقراءة دقيقة لموضع شركتك ثم ابنِ المحتوى من الواقع.</p>
            </div>
            <ButtonLink href="/contact" icon="arrow-left">
              {ctas.diagnostic}
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}