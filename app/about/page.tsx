import type { Metadata } from "next";
import { SectionHeading, ButtonLink } from "@/components/ui";
import { site, pillars, journey, team, values } from "@/lib/content";

export const metadata: Metadata = {
  title: "عن ISG",
  description: site.impression,
};

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">{site.tagline}</span>
          <h1>عن ISG</h1>
          <p>{site.positioning}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="الرسالة" title="شريك تنفيذي، لا مزود خدمات" />
          <p className="lead">{site.descriptor}</p>
          <div className="quote">{site.impression}</div>
          <p className="note">{site.tone}</p>
        </div>
      </section>

      <section className="section section-muted anchor" id="methodology">
        <div className="container">
          <SectionHeading
            eyebrow="المنهج"
            title="أربع ركائز ومنهج واحد لا ينقطع"
            description={site.coreMessage}
          />
          <div className="grid-4">
            {pillars.map((pillar, index) => (
              <div key={index} className="card">
                <span className="number">0{index + 1}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </div>
            ))}
          </div>
          <h3>من التشخيص إلى الصفقة، بمنهج واحد لا ينقطع.</h3>
          <div className="timeline">
            {journey.map((step, index) => (
              <div key={index} className="card">
                <span className="number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="الفريق" title="فريق المشروع" />
          <div className="grid-4">
            {team.map((member, index) => (
              <div key={index} className="card">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
          <p className="note">الفرق المعتمد لمشروع ISG: مينا صموئيل (الرئيس التنفيذي)، أحمد أشرف (رئيس القطاع المالي)، أيمن صموئيل (مدير المشروع)، أحمد سعد (مستشار إدارة المشاريع).</p>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading eyebrow="القيم" title="قيم تستمدها من طريقة عملنا" />
          <div className="grid-3">
            {values.map((value, index) => (
              <div key={index} className="card">
                <h3>{value.title}</h3>
                <p className="note">{value.evidence}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="الشريك المنفذ" title="العربي الاستشاري" />
          <p className="lead">{site.partner}</p>
          <p className="note">الشريك التنفيذي المتخصص لإدارة وتنفيذ المشروع ومتابعة تقديم الأعمال.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta">
            <h2>ابدأ بتقييم الوضع الحالي وتحديد الخطوة الأكثر تأثيراً على شركتك.</h2>
            <ButtonLink href="/contact">اطلب اجتماعاً استشارياً</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}