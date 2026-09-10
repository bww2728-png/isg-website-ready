/**
 * قاعدة معرفة الشات بوت — فهرس مبني حصراً من محتوى الموقع (lib/content.ts).
 * كل إجابة تُعرض على الزائر مأخوذة حرفياً من هذه القاعدة؛ المحرك لا يولّد نصاً جديداً.
 */
import {
  site,
  services,
  pillars,
  journey,
  audiences,
  industries,
  industryDescriptions,
  confidentialityRule,
  caseStudies,
  insightsArticles,
  team,
  values,
  ctas,
} from "@/lib/content";

export type ChatLink = { label: string; href: string };
export type ChatChip = { label: string; message: string };

export type KnowledgeEntry = {
  id: string;
  title: string;
  /** كلمات قوية: مطابقة أي منها تمنح 3 نقاط. تُخزن بعد التطبيع العربي. */
  strong: string[];
  /** كلمات ضعيفة: كل مطابقة فريدة تمنح نقطة واحدة. */
  weak: string[];
  paragraphs: string[];
  links?: ChatLink[];
  chips?: ChatChip[];
  /** فقرات إضافية تُعرض عند طلب "المزيد" عن الموضوع نفسه. */
  details?: string[];
};

const serviceLink = (slug: string) => ({ label: "صفحة الخدمة", href: `/services/${slug}` });

const cfo = services[0];
const restructuring = services[1];
const training = services[2];
const investment = services[3];

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "about",
    title: "عن ISG",
    strong: ["من انتم", "عن الشركه", "من هي", "عن isg", "تعريف بالشركه", "شركتكم"],
    weak: ["شريك", "تنفيذي", "هويه", "نبذه", "تتعاملون", "بوابه"],
    paragraphs: [
      site.descriptor,
      site.positioning,
      site.impression,
    ],
    links: [
      { label: "عن ISG", href: "/about" },
      { label: "الرئيسية", href: "/" },
    ],
    chips: [
      { label: "ما خدماتكم؟", message: "ما هي خدماتكم؟" },
      { label: "من الفريق؟", message: "من هم فريق العمل؟" },
    ],
    details: [
      site.coreMessage,
      `قيم العمل لدينا: ${values.map((v) => v.title).join("، ")}.`,
    ],
  },
  {
    id: "services-overview",
    title: "الخدمات",
    strong: ["خدماتكم", "ماذا تقدمون", "الخدمات", "تقدمون", "تخدمون", "خدماتكم؟"],
    weak: ["خدمه", "خدمات", "عروضكم", "اعمالكم"],
    paragraphs: [
      "نقدم أربع خدمات مترابطة تغطي رحلة الشركة كاملة:",
      ...services.map((s) => `${s.number} — ${s.title}: ${s.promise}`),
    ],
    links: [{ label: "كل الخدمات", href: "/services" }],
    chips: services.map((s) => ({ label: s.title, message: `أخبرني عن ${s.title}` })),
    details: [
      "منهج العمل: " + pillars.map((p) => `${p.title} — ${p.text}`).join(" | "),
    ],
  },
  {
    id: "service-cfo",
    title: cfo.title,
    strong: ["cfo", "المدير المالي", "مدير مالي", "cfo خارجي", "خدمه ماليه"],
    weak: ["مالي", "تقارير", "سيوله", "ربحيه", "موازنه", "تدفقات", "مؤشرات ماليه", "مجلس اداره"],
    paragraphs: [
      `${cfo.title} — ${cfo.promise}`,
      cfo.marketing,
      cfo.broader,
      `المخرجات: ${cfo.outputs.join("، ")}.`,
    ],
    links: [serviceLink(cfo.slug), { label: "مقال: متى تحتاج الشركة إلى CFO خارجي؟", href: "/insights/external-cfo" }],
    chips: [
      { label: "اطلب جلسة تشخيصية", message: "أريد جلسة تشخيصية" },
      { label: "ما باقي الخدمات؟", message: "ما هي خدماتكم؟" },
    ],
    details: cfo.problems.map((p) => `${p.problem}: ${p.offer} — النتيجة: ${p.change}.`),
  },
  {
    id: "service-restructuring",
    title: restructuring.title,
    strong: ["اعاده هيكله", "اعادة هيكلة", "هيكله", "خسائر", "تعافي", "تطوير اعمال"],
    weak: ["هوامش", "تكاليف", "تسعير", "تسريب", "كفاءه", "نموذج تشغيلي", "مصروفات"],
    paragraphs: [
      `${restructuring.title} — ${restructuring.promise}`,
      restructuring.marketing,
      `المخرجات: ${restructuring.outputs.join("، ")}.`,
    ],
    links: [serviceLink(restructuring.slug)],
    chips: [
      { label: "اطلب جلسة تشخيصية", message: "أريد جلسة تشخيصية" },
      { label: "حالات مشابهة", message: "هل لديكم أعمال أو دراسات حالة؟" },
    ],
    details: [
      ...restructuring.blocks
        .filter((b) => b.kind === "phases")
        .flatMap((b) => [b.intro, ...b.items.map((i) => `${i.title}: ${i.text}`)]),
      ...restructuring.problems.map((p) => `${p.problem}: ${p.offer} — النتيجة: ${p.change}.`),
    ],
  },
  {
    id: "service-training",
    title: training.title,
    strong: ["تدريب", "تأهيل", "تاهيل", "ورش", "نقل قدره", "برامج تدريبيه"],
    weak: ["فرق", "قدرات", "محاسبه", "موازنات", "قراءه التقارير", "تدريب الموظفين"],
    paragraphs: [
      `${training.title} — ${training.promise}`,
      training.marketing,
      training.broader,
      `المخرجات: ${training.outputs.join("، ")}.`,
    ],
    links: [serviceLink(training.slug)],
    chips: [
      { label: "اطلب جلسة تشخيصية", message: "أريد جلسة تشخيصية" },
      { label: "الفئات المستهدفة؟", message: "من الفئات المستهدفة في التدريب؟" },
    ],
    details: [
      ...training.blocks
        .filter((b) => b.kind === "audiences")
        .flatMap((b) => b.items.map((i) => `${i.title}: ${i.text}`)),
      ...training.problems.map((p) => `${p.problem}: ${p.offer} — النتيجة: ${p.change}.`),
    ],
  },
  {
    id: "service-investment",
    title: investment.title,
    strong: ["استثمار", "مستثمر", "تمويل", "ملف استثماري", "جاهزيه استثماريه", "صفقه", "استثماريه"],
    weak: ["نموذج مالي", "تقييم", "تفاوض", "عروض", "فرصه", "مستثمرين"],
    paragraphs: [
      `${investment.title} — ${investment.promise}`,
      investment.marketing,
      investment.broader,
      `المخرجات: ${investment.outputs.join("، ")}.`,
    ],
    links: [serviceLink(investment.slug), { label: "إخلاء المسؤولية الاستثمارية", href: "/investment-disclaimer" }],
    chips: [
      { label: "مراحل الخدمة؟", message: "ما هي مراحل خدمة الجاهزية الاستثمارية؟" },
      { label: "اطلب جلسة تشخيصية", message: "أريد جلسة تشخيصية" },
    ],
    details: [
      ...investment.blocks
        .filter((b) => b.kind === "stages")
        .flatMap((b) => [b.note, ...b.items.map((i) => `${i.title}: ${i.text}`)]),
      ...investment.problems.map((p) => `${p.problem}: ${p.offer} — النتيجة: ${p.change}.`),
    ],
  },
  {
    id: "pricing",
    title: "التكلفة والأسعار",
    strong: ["اسعار", "تكلفه", "كم تاخذون", "رسوم", "تكاليف الخدمه", "سعر الخدمه", "سعر الاستشاره", "سعر الجلسه", "كم تكلفه", "كم التكلفه", "بكم الخدمه"],
    weak: ["مجانا", "مجاني", "دفع"],
    paragraphs: [
      "لا تُعلن الأسعار على الموقع؛ لأن نطاق العمل يختلف من شركة إلى أخرى حسب حجم التحدي والمحاور المطلوبة.",
      `الطريقة المتبعة: جلسة تشخيص أولى تحدد موضع الشركة والخطوة الأكثر تأثيراً، ثم يُصمم نطاق العمل عليها. ${ctas.evaluate}`,
    ],
    links: [{ label: "صفحة التواصل", href: "/contact" }],
    chips: [
      { label: "سجّل بياناتي للتواصل", message: "أريد التواصل معكم" },
      { label: "أداة التقييم", message: "أخبرني عن أداة التقييم الذاتي" },
    ],
  },
  {
    id: "contact",
    title: "التواصل",
    strong: ["كيف اتواصل", "تواصل معكم", "واتساب", "واتس", "ايميل", "ايميلكم", "بريدكم", "البريد الالكتروني", "رقم الهاتف", "بيانات التواصل", "اريد التواصل"],
    weak: ["اتصال", "تواصل", "بريد", "هاتف", "مواعيد"],
    paragraphs: [
      `البريد الإلكتروني: ${site.contactEmail}`,
      `واتساب: wa.me/${site.whatsappNumber}`,
      `ويمكنك إرسال طلبك مباشرة من هنا: سجّل اسمك وبريدك ومرحلة شركتك عبر الشات، أو من صفحة التواصل في الموقع.`,
    ],
    links: [{ label: "صفحة التواصل", href: "/contact" }],
    chips: [
      { label: "سجّل بياناتي الآن", message: "أريد التواصل معكم" },
      { label: "اطلب جلسة تشخيصية", message: "أريد جلسة تشخيصية" },
    ],
  },
  {
    id: "assessment",
    title: "أداة التقييم الذاتي",
    strong: ["تقييم ذاتي", "اداه التقييم", "التقييم الذاتي", "تشخيص ذاتي", "اختبر شركتي", "التقييم"],
    weak: ["تقييم", "تشخيص", "اداه", "اختبار"],
    paragraphs: [
      "أداة التقييم الذاتي: 15 سؤالاً تغطي أربعة محاور — المحور المالي، والعمليات، والفريق، والجاهزية للاستثمار.",
      "النتيجة فورية وتحدد الشريحة التي تمثلها شركتك مع توصيات محددة لكل محور، وتنتهي بخطوة عملية تربطك بالخدمة المناسبة.",
      "الأداة مجانية، ولا تحفظ أي بيانات تُدخلها.",
    ],
    links: [{ label: "ابدأ التقييم الآن", href: "/tools/self-assessment" }],
    chips: [{ label: "اطلب جلسة تشخيصية", message: "أريد جلسة تشخيصية" }],
  },
  {
    id: "industries",
    title: "القطاعات",
    strong: ["قطاعات", "قطاع", "مجالات", "صناعات", "تخدمون من"],
    weak: ["صحه", "تجزئه", "اغذيه", "تقنيه", "تصنيع", "عائليه", "مستشفيات", "مطاعم"],
    paragraphs: [
      "نعمل في ستة قطاعات محددة — لا كل القطاعات:",
      ...industries.map((name, i) => `${name}: ${industryDescriptions[i]}`),
    ],
    links: [{ label: "صفحة القطاعات", href: "/industries" }],
    chips: [{ label: "ما خدماتكم؟", message: "ما هي خدماتكم؟" }],
  },
  {
    id: "audiences",
    title: "من نخدم",
    strong: ["شركتي", "مرحلتي", "من تخدمون", "شركه قائمه", "شركه متعثره", "شركه ناميه", "ابحث عن استثمار"],
    weak: ["قائمه", "متعثره", "نمو", "استثمار", "مرحله"],
    paragraphs: [
      "نعمل مع الملاك والإدارات في أربع مراحل، ولكل مرحلة تركيز مختلف:",
      ...audiences.map((a) => `${a.title}: ${a.need} — ${a.service}`),
    ],
    links: [{ label: "حدد مرحلة شركتك بالتقييم", href: "/tools/self-assessment" }],
  },
  {
    id: "team",
    title: "الفريق",
    strong: ["الفريق", "فريق العمل", "من هم", "المستشارين", "قيادات"],
    weak: ["مينا", "احمد", "ايمن", "رئيس تنفيذي"],
    paragraphs: [
      "فريق ISG:",
      ...team.map((t) => `${t.name} — ${t.role}`),
    ],
    links: [{ label: "عن ISG", href: "/about" }],
  },
  {
    id: "cases",
    title: "الأعمال ودراسات الحالة",
    strong: ["دراسات حاله", "دراسه حاله", "اعمالكم", "الاعمال", "مراجع", "حالات سابقه", "اعمال سابقه"],
    weak: ["حالات", "خبره", "تجربه", "نتائج"],
    paragraphs: [
      confidentialityRule,
      "لذلك نعرض حالات مجهولة الهوية تشرح المنهجية على أربعة محاور ثابتة — السياق، التحدي، تدخل ISG، والأثر:",
      ...caseStudies.map((cs) => `${cs.sector} — ${cs.headline}`),
    ],
    links: [{ label: "صفحة الأعمال", href: "/case-studies" }],
    chips: [{ label: "ما خدماتكم؟", message: "ما هي خدماتكم؟" }],
  },
  {
    id: "articles",
    title: "الرؤى والمقالات",
    strong: ["مقالات", "الرؤى", "محتوى", "اقرا", "مقال"],
    weak: ["رؤى", "نصائح"],
    paragraphs: [
      "الرؤى قسم محتوى تشرح فيه كل قطعة فكرة واحدة وتنتهي بخطوة عملية. المقالات المتاحة الآن:",
      ...insightsArticles.map((a) => `${a.title} (${a.readingTime})`),
    ],
    links: [
      ...insightsArticles.map((a) => ({ label: a.title, href: `/insights/${a.slug}` })),
      { label: "كل الرؤى", href: "/insights" },
    ],
  },
  {
    id: "confidentiality",
    title: "السرية والخصوصية",
    strong: ["سريه", "خصوصيه", "بياناتي", "حمايه البيانات", "متابته"],
    weak: ["سرية", "خصوصية", "بيانات", "عملاء"],
    paragraphs: [
      confidentialityRule,
      "بيانات نموذج التواصل تُستخدم للرد على طلبك فقط، ولا تُشارك مع أي طرف ثالث. التفاصيل في سياسة الخصوصية.",
    ],
    links: [{ label: "سياسة الخصوصية", href: "/privacy-policy" }],
  },
  {
    id: "method",
    title: "المنهج وطريقة العمل",
    strong: ["منهج", "كيف تعملون", "طريقة عملكم", "المراحل", "رحلة العمل", "خطوات"],
    weak: ["منهجيه", "خطه", "عمل"],
    paragraphs: [
      "المنهج في ست محطات متصلة:",
      ...journey.map((j) => `${j.title}: ${j.text}`),
    ],
    links: [{ label: "الخدمات", href: "/services" }],
    chips: [{ label: "ما خدماتكم؟", message: "ما هي خدماتكم؟" }],
  },
];

/** الرد الافتتاحي عند فتح الشات. */
export const welcomeParagraphs = [
  `أهلاً بك. أنا مساعد ISG الإلكتروني — أجيب عن أسئلتك حول خدماتنا وقطاعاتنا وطريقة عملنا من محتوى الموقع نفسه.`,
  "كيف أساعدك اليوم؟",
];

export const mainChips: ChatChip[] = [
  { label: "ما خدماتكم؟", message: "ما هي خدماتكم؟" },
  { label: "كم التكلفة؟", message: "كم تكلفة خدماتكم؟" },
  { label: "كيف أتواصل معكم؟", message: "كيف أتواصل معكم؟" },
  { label: "أداة التقييم الذاتي", message: "أخبرني عن أداة التقييم الذاتي" },
];

/** رد الأمان عند السقوط خارج النطاق. */
export const fallbackParagraphs = [
  "هذا السؤال خارج ما يمكنني الإجابة عنه بدقة من محتوى الموقع — ولن أخمّن إجابة.",
  "استطيع مساعدتك في: الخدمات الأربع، القطاعات، التكلفة وطريقة التسعير، أداة التقييم الذاتي، دراسات الحالة، المقالات، الفريق، السرية والخصوصية، أو تسجيل بياناتك للتواصل.",
];
