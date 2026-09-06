import type { Metadata } from "next";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "بيان الإخلاء الاستثماري",
  description: "حدود خدمة الجاهزية الاستثمارية وعدم ضمان التمويل.",
};

const sections: { title: string; text: string | { items: string[] } }[] = [
  {
    title: "لا ضمان للتمويل",
    text: "تعمل ISG على التأهيل والعرض ودعم المفاوضات؛ قرار الاستثمار النهائي يظل للمستثمر ولا تمثل الخدمة ضماناً للتمويل.",
  },
  {
    title: "نطاق الخدمة",
    text: {
      items: [
        "تقييم الجاهزية",
        "معالجة الفجوات",
        "إعداد النموذج المالي والملف",
        "تدريب الإدارة على العرض",
        "دعم الاستفسارات والفحص والتفاوض",
      ],
    },
  },
  {
    title: "ليست مشورة استثمارية منظمة",
    text: "محتوى الموقع لأغراض تعريفية ولا يمثل عرضاً للأوراق المالية أو مشورة استثمارية خاضعة للترخيص.",
  },
  {
    title: "لا وعد بنتائج",
    text: "لا نَعِد بتحقيق عوائد أو نتائج محددة، وأي أداة تقييم في الموقع تشخيص أولي فقط.",
  },
];

export default function InvestmentDisclaimerPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="eyebrow">الوضوح</span>
          <h1>بيان الإخلاء الاستثماري</h1>
          <p>وضوح حدود الخدمة جزء من المهنية.</p>
        </div>
      </div>

      {sections.map((section) => (
        <Section key={section.title}>
          <h2>{section.title}</h2>
          {typeof section.text === "object" ? (
            <ul>
              {section.text.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{section.text}</p>
          )}
        </Section>
      ))}

      <Section muted>
        <h2>تواصل</h2>
        <p>لأي استفسار، يرجى استخدام نموذج التواصل في صفحة تواصل معنا.</p>
      </Section>
    </>
  );
}