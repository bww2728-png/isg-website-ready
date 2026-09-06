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
        <div className="contact-grid">
          <Reveal>
            <div>
              <SectionHeading eyebrow="البداية" title="مسارات للحوار الأول" />
              <div className="contact-paths">
                {pathways.map((path) => (
                  <div className="card" key={path.title}>
                    <span className="mini-label">{path.title}</span>
                    <p className="mt-2" style={{ marginBottom: 0 }}>{path.text}</p>
                  </div>
                ))}
              </div>
              <p className="note mt-6">كل المسارات تبدأ بالنموذج؛ سنوجهك للخطوة الأنسب لمرحلة شركتك.</p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card contact-card">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="بيانات التواصل" title="تواصل مباشر" />
        <div className="grid-2">
          <div className="card">
            <span className="card-icon">
              <Icon name="trend" size={22} />
            </span>
            <h3>LinkedIn</h3>
            <p>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn — ISG Advisory (يفتح في نافذة جديدة)">
                ISG Advisory
              </a>
            </p>
          </div>
          <div className="card">
            <span className="card-icon">
              <Icon name="phone" size={22} />
            </span>
            <h3>قنوات التواصل</h3>
            <p>{site.phoneNote}</p>
          </div>
        </div>
        <p className="note mt-8">
          تُعالج بياناتك بحد أدنى لغرض الرد على طلبك فقط، وفق سياسة الخصوصية.
        </p>
      </Section>
    </>
  );
}