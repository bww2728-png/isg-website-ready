import type { Metadata } from "next";
import { ButtonLink, Chip, Section, SectionHeading } from "@/components/ui";
import { caseStudyAxes, confidentialityRule, ctas, industries } from "@/lib/content";

export const metadata: Metadata = {
  title: "القطاعات",
  description: confidentialityRule,
};

export default function IndustriesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">القطاعات</span>
          <h1>القطاعات</h1>
          <p>{confidentialityRule}</p>
        </div>
      </div>

      <Section>
        <SectionHeading eyebrow="التخصص" title="ستة قطاعات — لا كل القطاعات" description="نركز في قطاعات محددة لنصل فيها إلى عمق حقيقي في التشخيص والحل." />
        <div className="grid-3">
          {industries.map((industry) => (
            <div className="card" key={industry}>
              <h3>{industry}</h3>
              <Chip>قطاع متخصص</Chip>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="دراسات الحالة" title="قالب نلتزم به دون كشف الهوية" description={confidentialityRule} />
        <div className="grid-4">
          {caseStudyAxes.map((axis) => (
            <div className="card" key={axis}>
              <span className="mini-label">{axis}</span>
              <p className="lead">{axis}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="cta">
          <h2>ناقش وضع شركتك في قطاعك</h2>
          <p>دون كشف أي بيانات، نبدأ بقراءة أولية لموضعك.</p>
          <ButtonLink href="/contact">{ctas.consultation}</ButtonLink>
        </div>
      </Section>
    </>
  );
}