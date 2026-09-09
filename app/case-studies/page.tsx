import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, Chip, Section, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { caseStudies, caseStudyAxes, confidentialityRule, ctas, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "الأعمال",
  description: confidentialityRule,
  alternates: { canonical: "/case-studies" },
};

const axisLabels = caseStudyAxes;

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "الرئيسية", path: "/" },
          { name: "الأعمال", path: "/case-studies" },
        ])}
      />

      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">الأعمال</span>
          <h1>كيف نعمل — كما نراه على الأرض</h1>
          <p className="lead">{confidentialityRule}</p>
        </div>
      </div>

      <Section>
        <SectionHeading
          eyebrow="دراسات الحالة"
          title="حالات مجهولة الهوية بمنهج موحد"
          description="كل حالة تُعرض على المحاور الأربعة نفسها: السياق، التحدي، تدخل ISG، والأثر — كما نراجع عملنا دائماً."
        />
        <div className="grid-3">
          {caseStudies.map((cs, index) => (
            <Reveal key={cs.slug} delay={(index % 3) * 80}>
              <div className="card accent-top">
                <div className="flex" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                  <span className="card-icon">
                    <Icon name="layers" size={22} />
                  </span>
                  <Chip>{cs.sector}</Chip>
                </div>
                <h3 style={{ fontSize: "1.1rem" }}>{cs.headline}</h3>
                <p className="note mt-2" style={{ marginBottom: 0 }}>{cs.profile}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {caseStudies.map((cs, index) => {
        const service = services.find((s) => s.slug === cs.serviceSlug);
        return (
          <Section key={cs.slug} muted={index % 2 === 1}>
            <Reveal>
              <SectionHeading
                eyebrow={`${cs.sector} — ${cs.profile}`}
                title={cs.headline}
              />
            </Reveal>
            <div className="grid-4">
              <Reveal delay={0}>
                <div className="card">
                  <span className="mini-label">{axisLabels[0]}</span>
                  <p className="mt-2" style={{ marginBottom: 0, color: "var(--muted)" }}>{cs.context}</p>
                </div>
              </Reveal>
              <Reveal delay={70}>
                <div className="card">
                  <span className="mini-label">{axisLabels[1]}</span>
                  <p className="mt-2" style={{ marginBottom: 0, color: "var(--muted)" }}>{cs.challenge}</p>
                </div>
              </Reveal>
              <Reveal delay={140}>
                <div className="card">
                  <span className="mini-label">{axisLabels[2]}</span>
                  <ul style={{ margin: "0.75rem 0 0", paddingRight: "1.1rem", color: "var(--muted)" }}>
                    {cs.intervention.map((item, i) => (
                      <li key={i} style={{ marginBottom: "0.5rem" }}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={210}>
                <div className="card">
                  <span className="mini-label">{axisLabels[3]}</span>
                  <ul style={{ margin: "0.75rem 0 0", paddingRight: "1.1rem", color: "var(--muted)" }}>
                    {cs.impact.map((item, i) => (
                      <li key={i} style={{ marginBottom: "0.5rem" }}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
            <Reveal>
              <p className="note mt-4">
                {cs.note}
                {service ? (
                  <>
                    {" — الخدمة المرتبطة: "}
                    <Link href={`/services/${service.slug}`} style={{ color: "var(--gold, #c9a961)", fontWeight: 600 }}>
                      {service.title}
                    </Link>
                  </>
                ) : null}
              </p>
            </Reveal>
          </Section>
        );
      })}

      <Section>
        <Reveal>
          <div className="cta">
            <div>
              <h2>ناقش وضع شركتك في قطاعك.</h2>
              <p>دون كشف أي بيانات، نبدأ بقراءة أولية لموضعك ثم نحدد الخطوة الأكثر تأثيراً.</p>
            </div>
            <ButtonLink href="/contact" icon="arrow-left">
              {ctas.consultation}
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
