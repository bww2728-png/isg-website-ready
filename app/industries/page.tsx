import type { Metadata } from "next";
import { Section, SectionHeading, ButtonLink, Chip } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { caseStudyAxes, confidentialityRule, ctas, industries } from "@/lib/content";

export const metadata: Metadata = {
  title: "القطاعات",
  description: confidentialityRule,
};

const industryIcons = ["shield", "chart", "gear", "target", "layers", "handshake"] as const;

export default function IndustriesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">القطاعات</span>
          <h1>القطاعات</h1>
          <p className="lead">{confidentialityRule}</p>
        </div>
      </div>

      <Section>
        <SectionHeading
          eyebrow="التخصص"
          title="ستة قطاعات — لا كل القطاعات"
          description="نركز في قطاعات محددة لنصل فيها إلى عمق حقيقي في التشخيص والحل."
        />
        <div className="grid-3">
          {industries.map((industry, index) => (
            <Reveal key={industry} delay={(index % 3) * 80}>
              <div className="card accent-top">
                <span className="card-icon">
                  <Icon name={industryIcons[index]} size={22} />
                </span>
                <h3>{industry}</h3>
                <Chip className="mt-4">قطاع متخصص</Chip>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading
          eyebrow="دراسات الحالة"
          title="قالب نلتزم به دون كشف الهوية"
          description={confidentialityRule}
        />
        <div className="grid-4">
          {caseStudyAxes.map((axis, index) => (
            <Reveal key={axis} delay={index * 80}>
              <div className="card">
                <span className="mini-label">{axis}</span>
                <p className="lead mt-2" style={{ fontWeight: 600, color: "var(--navy-800)" }}>
                  {axis}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="cta">
            <div>
              <h2>ناقش وضع شركتك في قطاعك</h2>
              <p>دون كشف أي بيانات، نبدأ بقراءة أولية لموضعك.</p>
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