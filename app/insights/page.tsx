import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Chip, Section, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { ctas, insightsPlan, insightsArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "الرؤى والمحتوى",
  description: "كل قطعة محتوى تشرح فكرة واحدة، تقدم دليلاً أو مثالاً، وتنتهي بخطوة عملية.",
  alternates: { canonical: "/insights" },
};

const insightsDescription = "كل قطعة محتوى تشرح فكرة واحدة، تقدم دليلاً أو مثالاً، وتنتهي بخطوة عملية.";

export default function InsightsPage() {
  const publishedByTitle = new Map(insightsArticles.map((a) => [a.title, a]));
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

      {insightsArticles.length > 0 ? (
        <Section>
          <SectionHeading
            eyebrow="المقالات المنشورة"
            title="ابدأ من هنا"
            description="المقالات المتاحة الآن للقراءة الكاملة."
          />
          <div className="grid-3">
            {insightsArticles.map((article, index) => (
              <Reveal key={article.slug} delay={(index % 3) * 80}>
                <Link href={`/insights/${article.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="card accent-top">
                    <div className="flex" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                      <span className="card-icon">
                        <Icon name="document" size={22} />
                      </span>
                      <Chip gold>{article.readingTime}</Chip>
                    </div>
                    <h3 style={{ fontSize: "1.1rem" }}>{article.title}</h3>
                    <p className="mt-2" style={{ marginBottom: 0 }}>{article.excerpt}</p>
                    <p className="note mt-2" style={{ marginBottom: 0, color: "var(--gold, #c9a961)", fontWeight: 600 }}>
                      اقرأ المقال
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <Section muted={insightsArticles.length > 0}>
        <SectionHeading
          eyebrow="خطة الانطلاق"
          title="12 قطعة تبني الثقة تدريجياً دون تكرار"
          description="خطة المحتوى لأول 30 يوماً وفق أربعة محاور أسبوعية."
        />
        <p className="note">المقالات تُنشر تدريجياً؛ يُحدَّث هذا الفهرس مع كل نشر.</p>
        {weekly.map((group, groupIndex) => (
          <Reveal key={group.week} delay={groupIndex * 60}>
            <div className="mt-8" style={{ marginBottom: "2.5rem" }}>
              <div className="flex" style={{ alignItems: "center", gap: "0.9rem", marginBottom: "1.25rem" }}>
                <h3 style={{ fontSize: "1.4rem" }}>{group.week}</h3>
                <span aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--line)" }} />
                <Chip>{group.axis}</Chip>
              </div>
              <div className="grid-3">
                {group.items.map((article) => {
                  const published = publishedByTitle.get(article.title);
                  return (
                    <div className="card accent-top" key={article.title}>
                      <div className="flex" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                        <span className="card-icon">
                          <Icon name="document" size={22} />
                        </span>
                        {published ? <Chip gold>متاح</Chip> : <Chip>قيد الإعداد</Chip>}
                      </div>
                      <h4 style={{ fontSize: "1.05rem" }}>{article.title}</h4>
                      {published ? (
                        <Link
                          href={`/insights/${published.slug}`}
                          className="note mt-2"
                          style={{ display: "inline-block", color: "var(--gold, #c9a961)", fontWeight: 600, textDecoration: "none", marginBottom: 0 }}
                        >
                          اقرأ المقال
                        </Link>
                      ) : (
                        <p className="note mt-2" style={{ marginBottom: 0 }}>
                          سيتاح المقال هنا عند النشر.
                        </p>
                      )}
                    </div>
                  );
                })}
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