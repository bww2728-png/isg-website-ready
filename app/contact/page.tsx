import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Section, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "اطلب اجتماعاً استشارياً أو جلسة تشخيصية — شاركنا مرحلة شركتك وسيتحول الحوار الأول إلى نقطة بداية عملية.",
};

const pathways = [
  {
    title: "اجتماع استشاري",
    text: "اجتماع قصير لمناقشة الوضع العام وتحديد الاتجاه.",
  },
  {
    title: "تقييم الوضع",
    text: "تقييم أولي للخطوة الأعلى أثراً على شركتك.",
  },
  {
    title: "جلسة تشخيصية",
    text: "للشركات التي تمر بضغط أو تعثر للوصول للجذر.",
  },
  {
    title: "جاهزية استثمارية",
    text: "لتأهيل وعرض الفرصة أمام المستثمر.",
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">تواصل</span>
          <h1>ابدأ بحوار أول يتحول إلى خطوة عملية</h1>
          <p className="lead">
            شاركنا المرحلة التي تمر بها الشركة، وسيتحوّل الحوار الأول إلى نقطة بداية عملية: قرار أو
            أولوية أو مسار جاهزية واضح.
          </p>
        </div>
      </div>

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "2.5rem", alignItems: "start" }}>
          <Reveal>
            <div>
              <SectionHeading eyebrow="البداية" title="مسارات للحوار الأول" />
              <div style={{ display: "grid", gap: "0.85rem" }}>
                {pathways.map((path) => (
                  <div className="card" key={path.title} style={{ padding: "1.1rem 1.3rem" }}>
                    <span className="mini-label">{path.title}</span>
                    <p className="mt-2" style={{ marginBottom: 0 }}>{path.text}</p>
                  </div>
                ))}
              </div>
              <p className="note mt-6">كل المسارات تبدأ بالنموذج؛ سنوجهك للخطوة الأنسب لمرحلة شركتك.</p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card" style={{ padding: "1.8rem" }}>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section muted>
        <div className="container">
          <SectionHeading eyebrow="بيانات التواصل" title="تواصل مباشر" />
          <div className="grid-3">
            <div className="card">
              <span className="card-icon">
                <Icon name="mail" size={22} />
              </span>
              <h3>البريد الإلكتروني</h3>
              <p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <div className="card">
              <span className="card-icon">
                <Icon name="pin" size={22} />
              </span>
              <h3>الموقع</h3>
              <p>{site.city}</p>
            </div>
            <div className="card">
              <span className="card-icon">
                <Icon name="trend" size={22} />
              </span>
              <h3>LinkedIn</h3>
              <p>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  ISG Advisory
                </a>
              </p>
            </div>
          </div>
          <p className="note mt-8">
            تُعالج بياناتك بحد أدنى لغرض الرد على طلبك فقط، وفق سياسة الخصوصية.
          </p>
        </div>
      </Section>
    </>
  );
}