import Link from "next/link";
import type { Metadata } from "next";
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
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

const pillarIcons = ["target", "gear", "layers", "trend"] as const;
const audienceIcons = ["user", "trend", "shield", "handshake"] as const;

export const metadata: Metadata = {
  title: "استشارات مالية وتجارية — تشخيص، تحسين ربحية، جاهزية استثمارية",
  description: site.coreMessage,
  alternates: { canonical: "/" },
  openGraph: {
    title: "ISG — بوابة الحلول المبتكرة",
    description: site.coreMessage,
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      {/* 1 — الوعد */}
      <section className="hero" id="top">
        <span className="hero-ring" aria-hidden="true" />
        <div className="container">
          <div className="hero-grid">
            <Reveal>
              <span className="eyebrow">
                {site.tagline} — {site.activity}
              </span>
              <h1>
                {site.heroTitle[0]} <span>{site.heroTitle[1]}</span>
              </h1>
              <p className="lead">{site.descriptor}</p>
              <div className="actions">
                <ButtonLink href="/contact" icon="arrow-left">
                  {ctas.consultation}
                </ButtonLink>
                <ButtonLink href="/#approach" variant="secondary">
                  {ctas.methodology}
                </ButtonLink>
              </div>
              <span className="hero-cue">
                <span className="line" aria-hidden="true" />
                اكتشف منهجنا
              </span>
            </Reveal>
            <Reveal delay={180}>
              <aside className="hero-card">
                <h3>
                  <Icon name="compass" size={20} />
                  من التشخيص إلى التنفيذ
                </h3>
                <ul className="hero-card-list">
                  {supportElements.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          </div>

          <Reveal delay={240}>
            <div className="stat-strip">
              <div className="stat">
                <strong>04</strong>
                <span>وحدات خدمية واضحة، كلٌّ يبيع نتيجة مختلفة</span>
              </div>
              <div className="stat">
                <strong>06</strong>
                <span>قطاعات متخصصة نخدمها بعمق — لا كل القطاعات</span>
              </div>
              <div className="stat">
                <strong>01</strong>
                <span>منهج واحد لا ينقطع من التشخيص إلى الصفقة</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 — شريط الثقة: القطاعات */}
      <Section>
        <SectionHeading
          eyebrow="التخصص"
          title="قطاعات نخدمها بعمق — لا كل القطاعات"
          description="نركز في ستة قطاعات محددة لنصل فيها إلى عمق حقيقي في التشخيص والحل."
        />
        <Reveal>
          <div className="flex wrap gap-sm">
            {industries.map((industry) => (
              <Chip key={industry} gold>
                {industry}
              </Chip>
            ))}
          </div>
        </Reveal>
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
      </Section>

      {/* 4 — من نخدم؟ */}
      <Section>
        <SectionHeading
          eyebrow="الجمهور"
          title="القرار المطلوب أهم من حجم الشركة"
          description="نبدأ من موضع الشركة الحالي وما يحتاجه قرار المالك أو الإدارة الآن، ثم نصمم مساراً عملياً يناسب المرحلة."
        />
        <div className="grid-4">
          {audiences.map((audience, index) => (
            <Reveal key={audience.title} delay={index * 90}>
              <div className="card">
                <span className="card-icon">
                  <Icon name={audienceIcons[index]} size={22} />
                </span>
                <h3>{audience.title}</h3>
                <span className="mini-label">الاحتياج</span>
                <p style={{ marginBottom: "1rem" }}>{audience.need}</p>
                <span className="mini-label">الخدمة الموجهة</span>
                <p style={{ marginBottom: 0 }}>{audience.service}</p>
              </div>
            </Reveal>
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
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 80}>
              <Link href={`/services/${service.slug}`} className="card accent-top">
                <span className="number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.promise}</p>
                <p className="flex gap-sm text-gold mt-4" style={{ fontWeight: 600, fontSize: ".92rem" }}>
                  استكشف الوحدة
                  <Icon name="arrow-left" size={17} className="ico-arrow" />
                </p>
              </Link>
            </Reveal>
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
            <Reveal key={stage.title} delay={index * 70}>
              <div className="card accent-top">
                <span className="step-index">0{index + 1}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7 — لغة تنفيذية تعكس الثقة */}
      <Section muted>
        <SectionHeading eyebrow="النبرة" title="لغة تنفيذية تعكس الثقة، لا الاستعراض" />
        <div className="grid-4">
          {statements.map((statement, index) => (
            <Reveal key={statement.title} delay={index * 90}>
              <div className="card">
                <span className="card-icon">
                  <Icon name={index % 2 === 0 ? "document" : "chart"} size={22} />
                </span>
                <h3>{statement.title}</h3>
                <p>{statement.text}</p>
              </div>
            </Reveal>
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
          {deliverables.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <div className="card accent-top">
                <span className="number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
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
        <Reveal>
          <div className="flex wrap gap-sm" style={{ marginBottom: "1.75rem" }}>
            {values.map((value) => (
              <Chip key={value.title}>{value.title}</Chip>
            ))}
          </div>
          <p className="lead">دراسات الحالة لدينا تُنشر بقالب ثابت — دون كشف هوية العميل:</p>
          <div className="flex wrap gap-sm">
            {caseStudyAxes.map((axis) => (
              <Chip key={axis} gold>
                {axis}
              </Chip>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* 10 — الدعوة النهائية */}
      <Section>
        <Reveal>
          <div className="cta">
            <div>
              <h2>{ctas.evaluate}</h2>
              <p>ابدأ بحوار أول يتحول إلى نقطة بداية عملية: قرار أو أولوية أو مسار جاهزية واضح.</p>
            </div>
            <div className="actions" style={{ marginTop: 0 }}>
              <ButtonLink href="/contact" icon="arrow-left">
                {ctas.consultation}
              </ButtonLink>
              <ButtonLink href="/services/investment-readiness" variant="secondary">
                {ctas.invest}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}