/**
 * محرك الشات بوت الحتمي — بلا توليد نصوص ولا نماذج خارجية.
 * كل رد يُركَّب من قاعدة المعرفة (knowledge.ts) أو من ردود ثابتة؛
 * المسار الوحيد الذي يُخرج بيانات جديدة هو آلة حالة التقاط العميل،
 * ومدخلاتها من الزائر نفسه وتُتحقق عبر validateLead في نقطة /api/contact.
 */
import {
  knowledgeBase,
  fallbackParagraphs,
  mainChips,
  welcomeParagraphs,
  type ChatChip,
  type KnowledgeEntry,
} from "./knowledge";
import { audienceStages } from "@/lib/content";

export type LeadStep = "idle" | "name" | "email" | "stage" | "consent";

export type ChatClientState = {
  lastTopic?: string;
  lead: {
    step: LeadStep;
    name?: string;
    email?: string;
    stage?: string;
  };
};

export const initialChatState: ChatClientState = { lead: { step: "idle" } };

export type ChatServerResult = {
  paragraphs: string[];
  links?: { label: string; href: string }[];
  chips?: ChatChip[];
  state: ChatClientState;
  /** عند وجودها يستدعي العميل POST /api/contact بهذه البيانات فوراً. */
  submit?: { name: string; email: string; stage: string; challenge: string };
};

/** تطبيع عربي: توحيد الهمزات والتاء المربوطة والألف المقصورة، إزالة التشكيل والترقيم. */
export function normalizeArabic(input: string): string {
  return input
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOPWORDS = new Set(
  [
    "من","في","على","عن","مع","هذا","هذه","ذلك","التي","الذي","هل","ما","ماذا","كم","كيف",
    "لماذا","متي","اين","الي","هو","هي","انا","انتم","انت","لديكم","عندكم","يوجد","اللي",
    "يعني","بس","فقط","ايضا","كان","كانت","يكون","يوم","دقه","جدا","بشكل","علي",
  ].map((w) => normalizeArabic(w)),
);

function tokensOf(normalized: string): string[] {
  return normalized
    .split(" ")
    .map((t) => (t.startsWith("ال") && t.length > 3 ? t.slice(2) : t))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function scoreEntry(entry: KnowledgeEntry, normalized: string, tokens: string[]): number {
  let score = 0;
  for (const key of entry.strong) {
    if (normalized.includes(key)) score += 3;
  }
  const tokenSet = new Set(tokens);
  for (const key of entry.weak) {
    if (key.includes(" ")) {
      if (normalized.includes(key)) score += 1;
    } else if (tokenSet.has(key)) {
      score += 1;
    }
  }
  return score;
}

const GREETING = /^(ال)?(سلام|مرحبا|مرحبتين|اهلا|هلا|هاي|هلو)(?=\s|$)|^صباح الخير|^مساء الخير/;
const THANKS = /(شكرا|اشكركم|تسلم|ممتاز|رائع)(?=\s|$)/;
const CANCEL = /^(الغاء|إلغاء|ايقاف|توقف)$/;
const MORE = /(^|\s)(المزيد|اكمل|تفاصيل اكثر|اشرح اكثر|وسع|تكلم اكثر)(?=\s|$)/;
const LEAD_INTENT =
  /(اريد التواصل|سجل بياناتي|سجل بيانات|اجتماع استشاري|اطلب اجتماع|جلسه تشخيص|اريد جلسه|اتحدث مع احد|اتحدث مع شخص|محادثه مع|اريد موعد|ابغى موعد)/;
const PRICING = /(اسعار|تكلفه|رسوم|كم تاخذون|بكم|سعر (ال)?(خدمه|استشاره|جلسه|استشارات))/;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const cancelChip: ChatChip = { label: "إلغاء", message: "إلغاء" };

function welcomeResult(state: ChatClientState): ChatServerResult {
  return { paragraphs: welcomeParagraphs, chips: mainChips, state };
}

function fallbackResult(state: ChatClientState): ChatServerResult {
  return { paragraphs: fallbackParagraphs, chips: mainChips, state };
}

function bestEntry(normalized: string, tokens: string[]): { entry: KnowledgeEntry; score: number } | null {
  let best: { entry: KnowledgeEntry; score: number } | null = null;
  for (const entry of knowledgeBase) {
    const score = scoreEntry(entry, normalized, tokens);
    if (!best || score > best.score) best = { entry, score };
  }
  if (best && best.score >= 3) return best;
  return null;
}

function normalizeStage(input: string): string | null {
  const n = normalizeArabic(input);
  for (const stage of audienceStages) {
    if (n === normalizeArabic(stage)) return stage;
  }
  const inputTokens = new Set(tokensOf(n));
  for (const stage of audienceStages) {
    const stageTokens = tokensOf(normalizeArabic(stage));
    if (stageTokens.length > 0 && stageTokens.every((t) => inputTokens.has(t))) {
      return stage;
    }
  }
  return null;
}

/**
 * يعالج رسالة الزائر وفق الحالة الحالية ويعيد الرد والحالة الجديدة.
 * دالة حتمية بحتة: نفس المدخلات تعطي نفس المخرجات دائماً.
 */
export function respond(message: string, clientState: ChatClientState | null): ChatServerResult {
  const state: ChatClientState = clientState
    ? { lastTopic: clientState.lastTopic, lead: { ...clientState.lead } }
    : { ...initialChatState, lead: { ...initialChatState.lead } };

  const raw = typeof message === "string" ? message.slice(0, 1000) : "";
  const normalized = normalizeArabic(raw);
  const tokens = tokensOf(normalized);

  // آلة حالة التقاط العميل أولاً — أولوية مطلقة ما دامت نشطة
  if (state.lead.step === "name") {
    if (CANCEL.test(normalized)) {
      state.lead = { step: "idle" };
      return { paragraphs: ["تم إلغاء طلب التواصل."], chips: mainChips, state };
    }
    if (normalized.length < 2 || tokens.length === 0) {
      return {
        paragraphs: ["يرجى كتابة اسمك الكريم (حرفان على الأقل)."],
        chips: [cancelChip],
        state,
      };
    }
    state.lead.name = raw.trim().slice(0, 80);
    state.lead.step = "email";
    return {
      paragraphs: [`تشرفنا يا ${state.lead.name}. ما بريدك الإلكتروني حتى نرد عليك؟`],
      chips: [cancelChip],
      state,
    };
  }

  if (state.lead.step === "email") {
    if (CANCEL.test(normalized)) {
      state.lead = { step: "idle" };
      return { paragraphs: ["تم إلغاء طلب التواصل."], chips: mainChips, state };
    }
    if (!EMAIL_RE.test(raw.trim())) {
      return {
        paragraphs: ["هذا البريد لا يبدو صحيحاً. يرجى كتابته بصيغة name@example.com"],
        chips: [cancelChip],
        state,
      };
    }
    state.lead.email = raw.trim().slice(0, 120);
    state.lead.step = "stage";
    return {
      paragraphs: ["شكراً. ما مرحلة شركتك حالياً؟"],
      chips: [
        ...audienceStages.map((s) => ({ label: s, message: s })),
        cancelChip,
      ],
      state,
    };
  }

  if (state.lead.step === "stage") {
    if (CANCEL.test(normalized)) {
      state.lead = { step: "idle" };
      return { paragraphs: ["تم إلغاء طلب التواصل."], chips: mainChips, state };
    }
    const stage = normalizeStage(raw);
    if (!stage) {
      return {
        paragraphs: ["يرجى اختيار إحدى المراحل الأربع:"],
        chips: [...audienceStages.map((s) => ({ label: s, message: s })), cancelChip],
        state,
      };
    }
    state.lead.stage = stage;
    state.lead.step = "consent";
    return {
      paragraphs: [
        `مراجعة أخيرة: الاسم «${state.lead.name}»، البريد «${state.lead.email}»، المرحلة «${stage}».`,
        "بالموافقة يُرسل طلبك إلى فريق ISG للتواصل معك، وتسري عليك سياسة الخصوصية.",
      ],
      links: [{ label: "سياسة الخصوصية", href: "/privacy-policy" }],
      chips: [
        { label: "أوافق وأرسل الطلب", message: "اوافق وارسل الطلب" },
        cancelChip,
      ],
      state,
    };
  }

  if (state.lead.step === "consent") {
    if (CANCEL.test(normalized)) {
      state.lead = { step: "idle" };
      return { paragraphs: ["تم إلغاء طلب التواصل."], chips: mainChips, state };
    }
    if (/(اوافق|موافقه|ارسل|نعم|اجل)/.test(normalized)) {
      const topic = state.lastTopic ? ` — موضوع المحادثة الأخير: ${state.lastTopic}` : "";
      const submit = {
        name: state.lead.name as string,
        email: state.lead.email as string,
        stage: state.lead.stage as string,
        challenge: `طلب تواصل عبر الشات البوت${topic}`,
      };
      state.lead = { step: "idle" };
      return {
        paragraphs: [
          `شكراً ${submit.name}. جارٍ إرسال طلبك الآن...`,
        ],
        state,
        submit,
      };
    }
    return {
      paragraphs: ["لإتمام الطلب يرجى الضغط على «أوافق وأرسل الطلب»، أو الإلغاء."],
      chips: [
        { label: "أوافق وأرسل الطلب", message: "اوافق وارسل الطلب" },
        cancelChip,
      ],
      state,
    };
  }

  // لا رسالة (الافتتاح)
  if (!normalized) return welcomeResult(state);

  // إلغاء خارج آلة الحالة = لا شيء
  if (CANCEL.test(normalized)) return welcomeResult(state);

  // تحية
  if (GREETING.test(normalized) && tokens.length <= 3) {
    return welcomeResult(state);
  }

  // شكر
  if (THANKS.test(normalized)) {
    return {
      paragraphs: ["على الرحب والسعة. هل من شيء آخر أساعدك فيه؟"],
      chips: mainChips,
      state,
    };
  }

  // نية بدء التواصل
  if (LEAD_INTENT.test(normalized)) {
    state.lead.step = "name";
    return {
      paragraphs: [
        "يسعدنا ذلك. سأسجل بياناتك الآن بخطوات سريعة، ثم يصل طلبك مباشرة إلى فريق ISG.",
        "نبدأ: ما اسمك الكريم؟",
      ],
      chips: [cancelChip],
      state,
    };
  }

  // التسعير
  if (PRICING.test(normalized)) {
    const entry = knowledgeBase.find((e) => e.id === "pricing") as KnowledgeEntry;
    state.lastTopic = entry.title;
    return { paragraphs: entry.paragraphs, links: entry.links, chips: entry.chips, state };
  }

  // المزيد عن الموضوع الحالي
  if (MORE.test(normalized) && state.lastTopic) {
    const entry = knowledgeBase.find((e) => e.title === state.lastTopic);
    if (entry?.details?.length) {
      return { paragraphs: entry.details, links: entry.links, chips: entry.chips, state };
    }
  }

  // مطابقة قاعدة المعرفة
  const match = bestEntry(normalized, tokens);
  if (match) {
    state.lastTopic = match.entry.title;
    return {
      paragraphs: match.entry.paragraphs,
      links: match.entry.links,
      chips: match.entry.chips,
      state,
    };
  }

  return fallbackResult(state);
}
