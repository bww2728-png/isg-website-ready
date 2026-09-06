/**
 * منطق أداة التقييم الذاتي — منطق حتمي كامل (بدون أي ذكاء اصطناعي).
 * كل سؤال مصنف ضمن محور، وكل خيار يحمل نقاطاً (0/1/2)،
 * وتُحسب النتيجة لكل محور ثم نسبة إجمالية تُحدد النطاق والتوصيات.
 */

export const AXES = [
  { id: "financial", title: "الأداء المالي" },
  { id: "operations", title: "العمليات والتشغيل" },
  { id: "team", title: "الفريق والقدرات" },
  { id: "readiness", title: "الجاهزية للنمو والاستثمار" },
] as const;

export type AxisId = (typeof AXES)[number]["id"];

export type Option = { label: string; points: 0 | 1 | 2 };

export type Question = {
  id: string;
  axis: AxisId;
  text: string;
  options: [Option, Option, Option];
};

export const QUESTIONS: Question[] = [
  // محور الأداء المالي
  {
    id: "f1",
    axis: "financial",
    text: "هل تعرف هامش الربح الصافي لكل منتج أو نشاط رئيسي في شركتك؟",
    options: [
      { label: "لا نملك قياساً على مستوى النشاط", points: 0 },
      { label: "نراه على مستوى الشركة ككل فقط", points: 1 },
      { label: "نقيس كل نشاط وفروع منذ إغلاق الشهر", points: 2 },
    ],
  },
  {
    id: "f2",
    axis: "financial",
    text: "كيف تصل بيانات الأداء المالي إلى الإدارة؟",
    options: [
      { label: "تصل متأخرة أو غير منتظمة", points: 0 },
      { label: "تصل شهرياً لكن لا تُناقش بقرار", points: 1 },
      { label: "تُراجع شهرياً ويُتخذ قرار بناءً عليها", points: 2 },
    ],
  },
  {
    id: "f3",
    axis: "financial",
    text: "متى تعرف احتياجك النقدي القادم؟",
    options: [
      { label: "عند حدوث الضغط", points: 0 },
      { label: "نتوقع لفترة قصيرة عند الحاجة", points: 1 },
      { label: "لدينا توقع دوري للتدفقات يُراجع", points: 2 },
    ],
  },
  {
    id: "f4",
    axis: "financial",
    text: "عند انحراف عن الخطة، كيف يُتخذ القرار؟",
    options: [
      { label: "حسب الانطباع", points: 0 },
      { label: "نناقشه دون توثيق مسؤولية", points: 1 },
      { label: "بتحليل للانحراف ومسؤولية محددة", points: 2 },
    ],
  },
  // محور العمليات والتشغيل
  {
    id: "o1",
    axis: "operations",
    text: "هل الأدوار والمسؤوليات في الشركة محددة وواضحة؟",
    options: [
      { label: "متداخلة بين الأشخاص", points: 0 },
      { label: "واضحة جزئياً", points: 1 },
      { label: "محددة ومكتوبة", points: 2 },
    ],
  },
  {
    id: "o2",
    axis: "operations",
    text: "كيف تُرتّب الأولويات عند تراكم المهام؟",
    options: [
      { label: "حسب الضغط الزمني", points: 0 },
      { label: "حسب صاحب المصلحة الأقوى", points: 1 },
      { label: "حسب الأثر المالي بأولوية معلنة", points: 2 },
    ],
  },
  {
    id: "o3",
    axis: "operations",
    text: "هل توجد مؤشرات أداء تُراجع بانتظام؟",
    options: [
      { label: "لا توجد مؤشرات", points: 0 },
      { label: "مؤشرات جزئية دون متابعة", points: 1 },
      { label: "مؤشرات مربوطة بمسؤوليات وقرار", points: 2 },
    ],
  },
  {
    id: "o4",
    axis: "operations",
    text: "كيف يُحدَّد سعر المنتج أو الخدمة؟",
    options: [
      { label: "حسب المنافسة غالباً", points: 0 },
      { label: "حسب التكلفة فقط", points: 1 },
      { label: "بتحليل الهامش والقيمة معاً", points: 2 },
    ],
  },
  // محور الفريق والقدرات
  {
    id: "t1",
    axis: "team",
    text: "هل يستطيع الفريق المالي قراءة التقرير وتحليله؟",
    options: [
      { label: "القراءة محصورة خارج الشركة", points: 0 },
      { label: "قراءة جزئية داخل الفريق", points: 1 },
      { label: "قراءة وتحليل واقتراح قرار", points: 2 },
    ],
  },
  {
    id: "t2",
    axis: "team",
    text: "عند انتهاء مشروع سابق، ما الذي بقي داخل الفريق؟",
    options: [
      { label: "انتهى كل شيء مع المستشار", points: 0 },
      { label: "بقيت بعض الأدوات", points: 1 },
      { label: "الأدوات جزء من الممارسة اليومية", points: 2 },
    ],
  },
  {
    id: "t3",
    axis: "team",
    text: "كيف تُبنى الموازنة التقديرية؟",
    options: [
      { label: "لا توجد موازنة تقديرية", points: 0 },
      { label: "من أرقام السنة السابقة", points: 1 },
      { label: "من الخطط التشغيلية وتُراجع دورياً", points: 2 },
    ],
  },
  {
    id: "t4",
    axis: "team",
    text: "هل ترفع الفرق القرارات للإدارة في وقتها؟",
    options: [
      { label: "يُكتشف الأمر لاحقاً", points: 0 },
      { label: "أحياناً حسب المبادرة الشخصية", points: 1 },
      { label: "بإيقاع متابعة واضح", points: 2 },
    ],
  },
  // محور الجاهزية للنمو والاستثمار
  {
    id: "r1",
    axis: "readiness",
    text: "هل تملك نموذجاً مالياً محدثاً لشركتك؟",
    options: [
      { label: "لا يوجد نموذج", points: 0 },
      { label: "نموذج جزئي أو قديم", points: 1 },
      { label: "نموذج كامل محدث", points: 2 },
    ],
  },
  {
    id: "r2",
    axis: "readiness",
    text: "إلى أي مدى ملفك الاستثماري جاهز للعرض؟",
    options: [
      { label: "لم نبدأ الإعداد", points: 0 },
      { label: "مسودة أولية", points: 1 },
      { label: "ملف كامل بعرض وتوقعات", points: 2 },
    ],
  },
  {
    id: "r3",
    axis: "readiness",
    text: "عند طلب الفحص النافي للجهالة، هل مستنداتك جاهزة؟",
    options: [
      { label: "ليست جاهزة", points: 0 },
      { label: "جاهزة جزئياً", points: 1 },
      { label: "مرتبة وجاهزة", points: 2 },
    ],
  },
];

export type Answers = Record<string, number>;

export type AxisResult = {
  axisId: AxisId;
  title: string;
  percent: number;
  answered: number;
};

export type Recommendation = { title: string; text: string; href: string };

export type Band = {
  id: string;
  title: string;
  summary: string;
  recommendations: Recommendation[];
};

export type AssessmentResult = {
  totalPercent: number;
  axisResults: AxisResult[];
  band: Band;
};

const BANDS: Band[] = [
  {
    id: "stabilize",
    title: "أساسيات تحتاج تثبيتاً",
    summary:
      "تشير نتائجك إلى أن الأولوية الآن هي تثبيت الأساس: وضوح الرقم، ترتيب الأولويات، ومسار تصحيح واضح. ابدأ بجلسة تشخيصية قصيرة قبل أي خطوة أخرى.",
    recommendations: [
      {
        title: "ابدأ بتشخيص شامل",
        text: "نحدد أين يحدث الخلل في الأداء والنموذج قبل أي بناء.",
        href: "/services/restructuring",
      },
      {
        title: "اطلب جلسة تشخيصية",
        text: "حوار أول يتحول إلى قرار أو أولوية أو مسار جاهزية واضح.",
        href: "/contact",
      },
    ],
  },
  {
    id: "prioritize",
    title: "وضوح جزئي يحتاج تحديد أولويات",
    summary:
      "لديك أساس جزئي، والفجوة الأكبر في ترتيب الأولويات وربط الأرقام بالقرار. نبدأ بتقوية الرؤية المالية ثم تحديد الخطوة الأعلى أثراً.",
    recommendations: [
      {
        title: "رؤية مالية ترتبط بالقرار",
        text: "تقارير وأدوات تصل الأرقام بقرار المالك، لا بتقرير منفصل.",
        href: "/services/cfo",
      },
      {
        title: "اطلب جلسة تشخيصية",
        text: "نحدد معك الفجوة الأعلى أثراً ونضع لها مساراً عملياً.",
        href: "/contact",
      },
    ],
  },
  {
    id: "strengthen",
    title: "أساس قوي يحتاج بناء قدرات",
    summary:
      "أداء الشركة ووضوحها في مستوى جيد، والفجوة الأهم هي استمرار القدرة داخل الفريق بعد انتهاء أي تدخل. ننقل الأدوات إلى فريقك لتبقى.",
    recommendations: [
      {
        title: "بناء قدرة داخلية",
        text: "تدريب مرتبط بواقع الشركة ينقل الأدوات إلى الفريق ويستمر.",
        href: "/services/training",
      },
      {
        title: "ناقش خطوتك التالية",
        text: "نراجع معك الفجوة الأعلى أثراً ونصمم مساراً يناسب مرحلة شركتك.",
        href: "/contact",
      },
    ],
  },
  {
    id: "polish",
    title: "جاهزية متقدمة تحتاج صقل العرض",
    summary:
      "شركتك تملك أساساً متقدماً، والمرحلة التالية هي صقل طريقة تقديمها أمام المستثمر: النموذج، الملف، والتدريب على العرض والدفاع عن الافتراضات.",
    recommendations: [
      {
        title: "صقل جاهزيتك الاستثمارية",
        text: "تقييم فجوات، نموذج مالي، ملف استثماري، وتدريب على العرض.",
        href: "/services/investment-readiness",
      },
      {
        title: "جهّز شركتك للاستثمار",
        text: "قرار الاستثمار النهائي يظل للمستثمر، ونتولى التأهيل والعرض والدعم.",
        href: "/contact",
      },
    ],
  },
];

export function evaluate(answers: Answers): AssessmentResult {
  const axisResults: AxisResult[] = AXES.map((axis) => {
    const questions = QUESTIONS.filter((q) => q.axis === axis.id);
    let answered = 0;
    let points = 0;
    for (const question of questions) {
      const index = answers[question.id];
      if (index === 0 || index === 1 || index === 2) {
        answered += 1;
        points += question.options[index].points;
      }
    }
    const percent = answered === 0 ? 0 : Math.round((points / (answered * 2)) * 100);
    return { axisId: axis.id, title: axis.title, percent, answered };
  });

  const totalAnswered = axisResults.reduce((sum, axis) => sum + axis.answered, 0);
  const totalPoints = QUESTIONS.reduce((sum, question) => {
    const index = answers[question.id];
    if (index === 0 || index === 1 || index === 2) {
      return sum + question.options[index].points;
    }
    return sum;
  }, 0);
  const totalPercent =
    totalAnswered === 0 ? 0 : Math.round((totalPoints / (totalAnswered * 2)) * 100);

  const band =
    totalPercent < 35
      ? BANDS[0]
      : totalPercent < 60
        ? BANDS[1]
        : totalPercent < 80
          ? BANDS[2]
          : BANDS[3];

  return { totalPercent, axisResults, band };
}