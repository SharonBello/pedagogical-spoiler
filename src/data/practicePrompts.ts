// ═══════════════════════════════════════════════════════════════════
// M03 · Practice Prompt Templates
// One per 5E stage, in PLAN ORDER (evaluate first, engage last).
// Each template uses [subject], [grade], [topic] as placeholders.
// `fillTemplate()` substitutes those with the teacher's customTopic.
// ═══════════════════════════════════════════════════════════════════
import type { StageKey } from '@/types/module.types';

export interface PracticePrompt {
  stageKey: StageKey;
  planOrder: number;
  deliveryOrder: number;
  symbol: string;
  nameHe: string;
  nameEn: string;
  /** Short hint shown above the prompt — what to do with this stage. */
  hint: string;
  /** Use [subject], [grade], [topic] as substitution markers. */
  template: {
    role: string;     // תפקיד
    context: string;  // קשר ורקע
    task: string;     // משימה
    format: string;   // פורמט
  };
}

export const PRACTICE_PROMPTS: PracticePrompt[] = [
  {
    stageKey: 'evaluate', planOrder: 1, deliveryOrder: 5,
    symbol: '🎯', nameHe: 'הערכה', nameEn: 'Evaluate',
    hint: 'תתחילו פה — שאלו את ה-AI איך תדעו שתלמיד באמת הגיע ליעד.',
    template: {
      role: 'מומחה הוראת [subject] ל[grade], עם ניסיון בהכנת מחוונים ושאלות הערכה על־פי תכנית הלימודים של משרד החינוך.',
      context: 'כיתה [grade], נושא [topic].',
      task: 'צור מחוון לבדיקת רמת הידע וההבנה שנרכשו על־ידי התלמיד בנושא [topic].',
      format: 'מחוון של 4 קריטריונים × 3 רמות (חלקי / טוב / מצוין), ניקוד 1-5 לכל קריטריון (סה״כ 20 נק׳) + 2 שאלות לדוגמה (LOTS + HOTS).',
    },
  },
  {
    stageKey: 'elaborate', planOrder: 2, deliveryOrder: 4,
    symbol: '🚀', nameHe: 'העמקה', nameEn: 'Elaborate',
    hint: 'אחרי שיש לכם מחוון — תעמיקו את הניתוח. הישארו באותו נושא.',
    template: {
      role: '(זהה לפרומפט הקודם — אותה שיחה ב-AI)',
      context: '(זהה — כיתה [grade], נושא [topic])',
      task: 'בהינתן המחוון שיצרת בשלב הקודם, צור משימת העמקה שתאתגר את התלמיד ליישם את אותה גישת ניתוח על מימד נוסף של אותו נושא ([topic]). הישארו בתוך הנושא — אל תקפצו לטקסט או דוגמה אחרת.',
      format: 'משימה בכתב, 150-200 מילים + 2 שאלות מנחות לתלמיד.',
    },
  },
  {
    stageKey: 'explain', planOrder: 3, deliveryOrder: 3,
    symbol: '💡', nameHe: 'הסבר', nameEn: 'Explain',
    hint: 'עכשיו תזקקו את גרעין הידע שהמורה חייב להעביר בעצמו.',
    template: {
      role: '(זהה)',
      context: '(זהה)',
      task: 'מהו "גרעין הידע" שהמורה חייב להעביר באופן מפורש כדי שהתלמידים יוכלו לבצע את משימת ההעמקה? נסחו זאת כמיני-הסבר של המורה לכיתה.',
      format: 'הסבר קצר (עד 150 מילים) + עזר חזותי אחד (דיאגרמה / טבלה / השוואה).',
    },
  },
  {
    stageKey: 'explore', planOrder: 4, deliveryOrder: 2,
    symbol: '🔍', nameHe: 'חקירה', nameEn: 'Explore',
    hint: 'תכננו פעילות חקר — שהתלמידים יגלו את גרעין הידע בעצמם.',
    template: {
      role: '(זהה)',
      context: '(זהה)',
      task: 'תכנן פעילות חקר בזוגות או בקבוצות שתביא את התלמידים לגלות בעצמם את גרעין הידע — לפני שמסבירים להם אותו.',
      format: 'הוראות פעילות + רשימת חומרים + זמן. הפעילות לא חושפת את גרעין הידע במפורש עד הסיכום.',
    },
  },
  {
    stageKey: 'engage', planOrder: 5, deliveryOrder: 1,
    symbol: '🎬', nameHe: 'הצתה', nameEn: 'Engage',
    hint: 'סוגרים את המעגל — פתיח של 2 דקות שמרמז על הסוף.',
    template: {
      role: '(זהה)',
      context: '(זהה)',
      task: 'בהינתן כל מה שתכננו (פעילות + הסבר + העמקה + מחוון) — צור פתיח של 2 דקות לתחילת השיעור שמרמז על מה שעומדים ללמוד אך לא חושף את התשובה.',
      format: 'שאלת פתיחה + אובייקט חזותי (תמונה / סרטון 30 שניות / חפץ). מקסימום 2 דקות מצטברות.',
    },
  },
];

// ── Fill the placeholders with the teacher's customTopic ─────────
export function fillTemplate(
  t: PracticePrompt['template'],
  vars: { subject: string; grade: string; topic: string },
) {
  const r = (s: string) =>
    s.replace(/\[subject\]/g, vars.subject || '___')
     .replace(/\[grade\]/g,   vars.grade   || '___')
     .replace(/\[topic\]/g,   vars.topic   || '___');
  return {
    role: r(t.role),
    context: r(t.context),
    task: r(t.task),
    format: r(t.format),
  };
}

// ── Build the copy-paste string for clipboard ────────────────────
export function buildCopyText(
  filled: ReturnType<typeof fillTemplate>,
): string {
  return [
    `תפקיד: ${filled.role}`,
    ``,
    `קשר: ${filled.context}`,
    ``,
    `משימה: ${filled.task}`,
    ``,
    `פורמט: ${filled.format}`,
  ].join('\n');
}