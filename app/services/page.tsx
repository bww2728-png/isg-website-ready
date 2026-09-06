import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading, ButtonLink } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "الخدمات",
  description: "أربع وحدات واضحة، وكل وحدة تبيع نتيجة مختلفة. نربط كل تدخل بنتيجة قابلة للتفسير.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">EXECUTIVE ADVISORY</span>
          <h1>الخدمات</h1>
          <p className="lead">
            أربع وحدات واضحة، وكل وحدة تبيع نتيجة مختلفة. لا نبيع قائمة خدمات تقليدية. نربط كل
            تدخل بنتيجة قابلة للتفسير، وبما تتطلبه المرحلة التالية من جاهزية أو قرار.
          </p>
        </div>
      </div>

      <Section>
        <SectionHeading eyebrow="الخدمات" title="أربع وحدات واضحة، وكل وحدة تبيع نتيجة مختلفة." />
        <div className="grid-2">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 90}>
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

      <Section muted>
        <Reveal>
          <div className="cta">
            <div>
              <h2>ابدأ بتقييم الوضع الحالي وتحديد الخطوة الأكثر تأثيراً على شركتك.</h2>
              <p>نحدد معاً الخطوة الأولى المناسبة لمرحلة شركتك الحالية.</p>
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