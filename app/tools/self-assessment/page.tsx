import type { Metadata } from "next";
import SelfAssessment from "@/components/tools/SelfAssessment";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "التقييم الذاتي للشركة",
  description:
    "أداة تشخيص أولية من 15 سؤالاً في 4 محاور لتحديد الخطوة الأعلى أثراً على شركتك — منطق كامل داخل المتصفح دون أي ذكاء اصطناعي.",
};

export default function SelfAssessmentPage() {
  return (
    <>
      <section className="page-hero" id="top">
        <div className="container">
          <span className="eyebrow">الأدوات</span>
          <h1>التقييم الذاتي للشركة</h1>
          <p className="lead">
            أجب على 15 سؤالاً في 4 محاور، واحصل فوراً على قراءة أولية لموضع شركتك وتوصية
            بالخطوة الأعلى أثراً.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="tool-shell">
            <Reveal>
              <SelfAssessment />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}