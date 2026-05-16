// ═══════════════════════════════════════════════════════════════════
// M03 · Section Map
// 8 sections, 3 hours total (180 min) — matches M02's pattern.
// ═══════════════════════════════════════════════════════════════════
import type { SectionMeta, StageMeta } from '@/types/module.types';

export const SECTIONS: SectionMeta[] = [
  {
    id: 'opening',
    number: 1,
    title: 'פתיחה',
    subtitle: 'הספויילר הפדגוגי — למה לתכנן לאחור?',
    duration: 15,
    path: '/opening',
  },
  {
    id: 'theory',
    number: 2,
    title: 'התיאוריה',
    subtitle: '5E לאחור — חמש תחנות, כיוון הפוך',
    duration: 30,
    path: '/theory',
  },
  {
    id: 'reverse',
    number: 3,
    title: 'הנדסה הפוכה',
    subtitle: 'משאלת בגרות אל שיעור שלם',
    duration: 25,
    path: '/reverse',
  },
  {
    id: 'break',
    number: 4,
    title: 'הפסקה',
    subtitle: '15 דקות — תבחרו נושא אמיתי',
    duration: 15,
    path: '/break',
  },
  {
    id: 'practice',
    number: 5,
    title: 'תרגול',
    subtitle: 'בונים מערך שיעור שלם בחמש פרומפטים',
    duration: 50,
    path: '/practice',
  },
  {
    id: 'shared',
    number: 6,
    title: 'שיתוף',
    subtitle: 'מציגים מערכים, נותנים משוב',
    duration: 20,
    path: '/shared',
  },
  {
    id: 'quiz',
    number: 7,
    title: 'מבחן',
    subtitle: 'הערכה — האם הפנמת את הגישה?',
    duration: 15,
    path: '/quiz',
  },
  {
    id: 'closing',
    number: 8,
    title: 'סיכום',
    subtitle: 'ה-PDF שלך + מה ניקח לכיתה',
    duration: 10,
    path: '/closing',
  },
];

/** Quick lookup by id. */
export const SECTION_BY_ID = SECTIONS.reduce(
  (acc, s) => { acc[s.id] = s; return acc; },
  {} as Record<SectionMeta['id'], SectionMeta>,
);

// ─── The 5E stages ──────────────────────────────────────────────────
// Note: `number` is the delivery order (Engage→Evaluate, 1→5).
// `planOrder` is the planning order (Evaluate→Engage, 1→5).
// This inversion IS the module's pedagogical content.
export const STAGES: StageMeta[] = [
  {
    key: 'engage',
    number: 1,
    planOrder: 5,
    nameHe: 'הצתה',
    nameEn: 'Engage',
    symbol: '🎬',
    promptQuestion: 'איזה פתיח של 2 דקות יקשור הכל יחד?',
    produces: 'פתיחה — שאלה, תמונה או סיפור קצר',
  },
  {
    key: 'explore',
    number: 2,
    planOrder: 4,
    nameHe: 'חקירה',
    nameEn: 'Explore',
    symbol: '🔍',
    promptQuestion: 'איזו פעילות תעזור לתלמידים לגלות את הרעיון בעצמם?',
    produces: 'פעילות בזוגות / קבוצות + רשימת חומרים',
  },
  {
    key: 'explain',
    number: 3,
    planOrder: 3,
    nameHe: 'הסבר',
    nameEn: 'Explain',
    symbol: '💡',
    promptQuestion: 'מהו "גרעין הידע" שצריך לעבור מהמורה לתלמיד?',
    produces: 'הסבר קצר + עזר חזותי אחד',
  },
  {
    key: 'elaborate',
    number: 4,
    planOrder: 2,
    nameHe: 'העמקה',
    nameEn: 'Elaborate',
    symbol: '🚀',
    promptQuestion: 'איזה תרגיל יישומי יוכיח שהתלמיד באמת הפנים?',
    produces: 'משימת העברה / יישום אחת',
  },
  {
    key: 'evaluate',
    number: 5,
    planOrder: 1,
    nameHe: 'הערכה',
    nameEn: 'Evaluate',
    symbol: '🎯',
    promptQuestion: 'איך נדע שהם הגיעו? מה הראיה?',
    produces: 'מחוון + 2 שאלות (LOTS + HOTS)',
  },
];

export const STAGE_BY_KEY = STAGES.reduce(
  (acc, s) => { acc[s.key] = s; return acc; },
  {} as Record<StageMeta['key'], StageMeta>,
);

/** Stages in planning order (evaluate → engage). */
export const STAGES_IN_PLAN_ORDER = [...STAGES].sort(
  (a, b) => a.planOrder - b.planOrder,
);

/** Stages in delivery order (engage → evaluate). */
export const STAGES_IN_DELIVERY_ORDER = [...STAGES].sort(
  (a, b) => a.number - b.number,
);

// ─── Total module duration ─────────────────────────────────────────
export const TOTAL_DURATION = SECTIONS.reduce((sum, s) => sum + s.duration, 0); // 180