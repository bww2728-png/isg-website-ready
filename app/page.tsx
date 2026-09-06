import Link from "next/link";
import {
  site,
  supportElements,
  industries,
  confidentialityRule,
  caseStudyAxes,
  pillars,
  audiences,
  services,
  journey,
  statements,
  deliverables,
  values,
  ctas,
} from "@/lib/content";
import { Section, SectionHeading, ButtonLink, Chip } from "@/components/ui";

export default function Home() {
  return (
    <>
      {/* 1 — الوعد */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">
                {site.tagline} — {site.activity}
              </span>
              <h1>
                {site.heroTitle[0]} <span>{site.heroTitle[1]}</span>
              </h1>
              <p className="lead">{site.descriptor}</p>
              <div className="actions">
                <ButtonLink href="/contact">{ctas.consultation}</ButtonLink>
                <ButtonLink href="/#approach" variant="secondary">
                  {ctas.methodology}
                </ButtonLink>
              </div>
            </div>
            <aside className="hero-card">
              <h3 style={{ color: "#fff" }}>من التشخيص إلى التنفيذ</h3>
              <ul className="hero-card-list">
                {supportElements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 2 — شريط الثقة: القطاعات */}
      <Section>
        <SectionHeading
          eyebrow="التخصص"
          title="قطاعات نخدمها بعمق — لا كل القطاعات"
          description="نركز في ستة قطاعات محددة لنصل فيها إلى عمق حقيقي في التشخيص والحل."
        />
        <p style={{ display: "flex", flexWrap: "wrap", gap: ".6rem" }}>
          {industries.map((industry) => (
            <Chip key={industry} gold>
              {industry}
            </Chip>
          ))}
        </p>
      </Section>

      {/* 3 — المنهج: أربع ركائز */}
      <Section id="approach" muted>
        <SectionHeading
          eyebrow="المنهج"
          title="أربع ركائز، من التشخيص إلى الاستثمار"
          description={site.coreMessage}
        />
        <div className="grid-4">
          {pillars.map((pillar, index) => (
            <div className="card" key={pillar.title}>
              <span className="number">0{index + 1}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4 — من نخدم؟ */}
      <Section>
        <SectionHeading
          eyebrow="الجمهور"
          title="القرار المطلوب أهم من حجم الشركة"
          description="نبدأ من موضع الشركة الحالي وما يحتاجه قرار المالك أو الإدارة الآن، ثم نصمم مساراً عملياً يناسب المرحلة."
        />
        <div className="grid-4">
          {audiences.map((audience) => (
            <div className="card" key={audience.title}>
              <span className="mini-label">الاحتياج</span>
              <p style={{ marginBottom: "1rem" }}>{audience.need}</p>
              <span className="mini-label">الخدمة الموجهة</span>
              <p style={{ marginBottom: 0 }}>{audience.service}</p>
              <h3 style={{ marginTop: "1rem", marginBottom: 0 }}>{audience.title}</h3>
            </div>
          ))}
        </div>
      </Section>

      {/* 5 — الخدمات */}
      <Section muted>
        <SectionHeading
          eyebrow="الخدمات"
          title="أربع وحدات واضحة، وكل وحدة تبيع نتيجة مختلفة"
          description="لا نبيع قائمة خدمات تقليدية. نربط كل تدخل بنتيجة قابلة للتفسير، وبما تتطلبه المرحلة التالية من جاهزية أو قرار."
        />
        <div className="grid-2">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="card">
              <span className="number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.promise}</p>
              <p style={{ color: "#8a6d2f", fontWeight: 600, marginTop: "1rem", marginBottom: 0 }}>
                استكشف الوحدة
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* 6 — الرحلة */}
      <Section>
        <SectionHeading
          eyebrow="الرحلة"
          title="من التشخيص إلى الصفقة، بمنهج واحد لا ينقطع"
          description="التدريب ليس نشاطاً جانبياً، والملف الاستثماري ليس نقطة البداية؛ كلاهما يأتي بعد بناء أساس الشركة."
        />
        <div className="timeline">
          {journey.map((stage, index) => (
            <div className="card" key={stage.title}>
              <span className="number">0{index + 1}</span>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7 — لغة تنفيذية تعكس الثقة */}
      <Section muted>
        <SectionHeading eyebrow="النبرة" title="لغة تنفيذية تعكس الثقة، لا الاستعراض" />
        <div className="grid-4">
          {statements.map((statement) => (
            <div className="card" key={statement.title}>
              <h3>{statement.title}</h3>
              <p>{statement.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 8 — ما يتغير */}
      <Section>
        <SectionHeading
          eyebrow="القيمة"
          title="لا تكتفي تقاريرنا بوصف ما حدث؛ بل توضح القرار المطلوب بعده"
        />
        <div className="grid-3">
          {deliverables.map((item) => (
            <div className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 9 — الثقة والسرية */}
      <Section muted>
        <SectionHeading
          eyebrow="لماذا تثق بنا"
          title="الثقة والسرية جزء من المنتج"
          description={confidentialityRule}
        />
        <p style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginBottom: "1.5rem" }}>
          {values.map((value) => (
            <Chip key={value.title}>{value.title}</Chip>
          ))}
        </p>
        <p className="lead">
          دراسات الحالة لدينا تُنشر بقالب ثابت — دون كشف هوية العميل:
        </p>
        <p style={{ display: "flex", flexWrap: "wrap", gap: ".6rem" }}>
          {caseStudyAxes.map((axis) => (
            <Chip key={axis} gold>
              {axis}
            </Chip>
          ))}
        </p>
      </Section>

      {/* 10 — الدعوة النهائية */}
      <Section>
        <div className="cta">
          <div>
            <h2>{ctas.evaluate}</h2>
            <p style={{ color: "#d9e2eb", marginBottom: 0 }}>
              ابدأ بحوار أول يتحول إلى نقطة بداية عملية: قرار أو أولوية أو مسار جاهزية واضح.
            </p>
          </div>
          <div className="actions" style={{ marginTop: 0 }}>
            <ButtonLink href="/contact">{ctas.consultation}</ButtonLink>
            <ButtonLink href="/services/investment-readiness" variant="secondary">
              {ctas.invest}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}