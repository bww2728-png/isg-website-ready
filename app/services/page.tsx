import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading, ButtonLink } from "@/components/ui";
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
          <p>أربع وحدات واضحة، وكل وحدة تبيع نتيجة مختلفة. لا نبيع قائمة خدمات تقليدية. نربط كل تدخل بنتيجة قابلة للتفسير، وبما تتطلبه المرحلة التالية من جاهزية أو قرار.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="الخدمات" title="أربع وحدات واضحة، وكل وحدة تبيع نتيجة مختلفة." />
          <div className="grid-2">
            {services.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="card">
                <span className="number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.promise}</p>
                <p style={{ color: "#8a6d2f", fontWeight: 600 }}>استكشف الوحدة</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
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