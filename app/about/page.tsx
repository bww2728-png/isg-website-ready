import type { Metadata } from "next";
import { Section, SectionHeading, ButtonLink } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { site, pillars, journey, team, values } from "@/lib/content";

export const metadata: Metadata = {
  title: "عن ISG",
  description: site.impression,
};

const pillarIcons = ["target", "gear", "layers", "trend"] as const;

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">{site.tagline}</span>
          <h1>عن ISG</h1>
          <p className="lead">{site.positioning}</p>
        </div>
      </div>

      <Section>
        <SectionHeading eyebrow="الرسالة" title="شريك تنفيذي، لا مزود خدمات" />
        <p className="lead">{site.descriptor}</p>
        <Reveal>
          <div className="quote">{site.impression}</div>
        </Reveal>
        <p className="note mt-6">{site.tone}</p>
      </Section>

      <Section muted id="methodology" className="anchor">
        <SectionHeading
          eyebrow="المنهج"
          title="أربع ركائز ومنهج واحد لا ينقطع"
          description={site.coreMessage}
        />
        <div className="grid-4">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 90}>
              <div className="card accent-top">
                <span className="card-icon">
                  <Icon name={pillarIcons[index]} size={22} />
                </span>
                <span className="number">0{index + 1}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <h3 className="mt-8">من التشخيص إلى الصفقة، بمنهج واحد لا ينقطع.</h3>
        <div className="timeline">
          {journey.map((step, index) => (
            <Reveal key={step.title} delay={index * 70}>
              <div className="card accent-top">
                <span className="step-index">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="الفريق" title="فريق المشروع" />
        <div className="grid-4">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 80}>
              <div className="card">
                <span className="card-icon">
                  <Icon name="user" size={22} />
                </span>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="note mt-8">
          الفرق المعتمد لمشروع ISG: مينا صموئيل (الرئيس التنفيذي)، أحمد أشرف (رئيس القطاع المالي)،
          أيمن صموئيل (مدير المشروع)، أحمد سعد (مستشار إدارة المشاريع).
        </p>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="القيم" title="قيم تستمدها من طريقة عملنا" />
        <div className="grid-3">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={(index % 3) * 80}>
              <div className="card">
                <h3>{value.title}</h3>
                <p className="note mt-2">{value.evidence}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="الشريك المنفذ" title="العربي الاستشاري" />
        <p className="lead">{site.partner}</p>
        <p className="note">الشريك التنفيذي المتخصص لإدارة وتنفيذ المشروع ومتابعة تقديم الأعمال.</p>
      </Section>

      <Section>
        <Reveal>
          <div className="cta">
            <div>
              <h2>ابدأ بتقييم الوضع الحالي وتحديد الخطوة الأكثر تأثيراً على شركتك.</h2>
              <p>دعوة مفتوحة لحوار أول يرسم مسار الخطة.</p>
            </div>
            <ButtonLink href="/contact" icon="arrow-left">
              اطلب اجتماعاً استشارياً
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}