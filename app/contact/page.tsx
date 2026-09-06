import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "اطلب اجتماعاً استشارياً أو جلسة تشخيصية — شاركنا مرحلة شركتك وسيتحول الحوار الأول إلى نقطة بداية عملية.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">تواصل</span>
          <h1>ابدأ بحوار أول يتحول إلى خطوة عملية</h1>
          <p>
            شاركنا المرحلة التي تمر بها الشركة، وسيتحوّل الحوار الأول إلى نقطة بداية عملية: قرار أو
            أولوية أو مسار جاهزية واضح.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="card">
            <h2>مسارات للحوار الأول</h2>
            <ul className="list-check">
              <li>اطلب اجتماعاً استشارياً — اجتماع قصير لمناقشة الوضع.</li>
              <li>ابدأ بتقييم الوضع — تقييم أولي للخطوة الأعلى أثراً.</li>
              <li>اطلب جلسة تشخيصية — للشركات التي تمر بضغط أو تعثر.</li>
              <li>جهّز شركتك للاستثمار — لتأهيل وعرض الفرصة أمام المستثمر.</li>
            </ul>
            <p className="note">كل المسارات تبدأ بالنموذج؛ سنوجهك للخطوة الأنسب لمرحلة شركتك.</p>
          </div>

          <div className="card">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <h2>بيانات التواصل</h2>
          <p>
            البريد الإلكتروني: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>{site.city}</p>
          <p>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn — ISG Advisory
            </a>
          </p>
          <p className="note">
            تُعالج بياناتك بحد أدنى لغرض الرد على طلبك فقط، وفق سياسة الخصوصية.
          </p>
        </div>
      </section>
    </>
  );
}