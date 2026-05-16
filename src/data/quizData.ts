// ═══════════════════════════════════════════════════════════════════
// M03 · Quiz Questions
// 6 questions covering the key concepts of "הספויילר הפדגוגי":
// planning order · STAY/CHANGE pattern · same-conversation rule ·
// "why backwards" · stage recognition · hook timing.
// ═══════════════════════════════════════════════════════════════════

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  /** 'single' = pick one of 3-4 options; 'truefalse' = נכון / לא נכון. */
  type: 'single' | 'truefalse';
  question: string;
  options: QuizOption[];
  correctId: string;
  /** Shown after submission — why this answer is correct. */
  explanation: string;
}

const TF: QuizOption[] = [
  { id: 'true',  text: 'נכון' },
  { id: 'false', text: 'לא נכון' },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ── 1 · Planning order (the full sequence) ──
  {
    id: 'q1-plan-order',
    type: 'single',
    question: 'בגישת "הספויילר הפדגוגי" — סדר התכנון של 5 השלבים הוא:',
    options: [
      { id: 'a', text: 'הצתה ← חקירה ← הסבר ← העמקה ← הערכה' },
      { id: 'b', text: 'הערכה ← העמקה ← הסבר ← חקירה ← הצתה' },
      { id: 'c', text: 'הסבר ← הצתה ← חקירה ← העמקה ← הערכה' },
      { id: 'd', text: 'חקירה ← הסבר ← הצתה ← הערכה ← העמקה' },
    ],
    correctId: 'b',
    explanation:
      'מתכננים לאחור: מתחילים מהערכה (מה התלמיד צריך להוכיח שהוא מבין) וגומרים בהצתה (איזה פתיח של 2 דקות יקשור הכל). אפשרות א\' היא סדר ההעברה בשיעור — לא סדר התכנון.',
  },

  // ── 2 · STAY vs. CHANGE in the prompt formula ──
  {
    id: 'q2-stay-change',
    type: 'single',
    question: 'בנוסחת הפרומפט בת 4 החלקים — אילו שניים נשארים זהים בכל 5 הפרומפטים?',
    options: [
      { id: 'a', text: 'משימה + פורמט' },
      { id: 'b', text: 'תפקיד + קשר' },
      { id: 'c', text: 'תפקיד + משימה' },
      { id: 'd', text: 'קשר + פורמט' },
    ],
    correctId: 'b',
    explanation:
      'תפקיד וקשר נכתבים פעם אחת בתחילת הסשן ומשוכפלים אוטומטית. רק המשימה והפורמט מתחלפים לפי שלב 5E.',
  },

  // ── 3 · Same conversation (true/false) ──
  {
    id: 'q3-same-conv',
    type: 'truefalse',
    question: 'בתרגול מומלץ לפתוח שיחה חדשה ב-AI לכל אחד מ-5 הפרומפטים.',
    options: TF,
    correctId: 'false',
    explanation:
      'להפך — מומלץ לפעול באותה שיחה. ה-AI שומר את ההקשר מהפרומפט הקודם, כך שתפקיד וקשר לא חוזרים על עצמם, וכל פרומפט חדש מתבסס על הקודם.',
  },

  // ── 4 · Pedagogical "why" ──
  {
    id: 'q4-why-backwards',
    type: 'single',
    question: 'מהי הסיבה הפדגוגית המרכזית לתכנון בכיוון הפוך?',
    options: [
      { id: 'a', text: 'הסוף הוא העוגן — כל החלטה אחרת זורמת מהראיה שהתלמיד צריך לייצר.' },
      { id: 'b', text: 'ככה ה-AI מחזיר תשובות איכותיות יותר טכנית.' },
      { id: 'c', text: 'זה הסדר שמשרד החינוך דורש במערך השיעור.' },
      { id: 'd', text: 'זה חוסך זמן למורה.' },
    ],
    correctId: 'a',
    explanation:
      'תכנון לאחור (Backwards Design של Wiggins & McTighe) נשען על העיקרון שכל החלטה — פעילות, הסבר, פתיח — מקבלת משמעות רק מתוך מה שהתלמיד צריך להוכיח בסוף.',
  },

  // ── 5 · Stage recognition ──
  {
    id: 'q5-stage-id',
    type: 'single',
    question: 'מורה כותב פרומפט: "תכנן פעילות בזוגות שבה התלמידים יגלו בעצמם את הרעיון, לפני שמסבירים להם אותו". באיזה שלב 5E מדובר?',
    options: [
      { id: 'a', text: 'הצתה (Engage)' },
      { id: 'b', text: 'חקירה (Explore)' },
      { id: 'c', text: 'הסבר (Explain)' },
      { id: 'd', text: 'הערכה (Evaluate)' },
    ],
    correctId: 'b',
    explanation:
      '"גילוי עצמי לפני הסבר" הוא המהות של שלב החקירה. שימו לב — בתכנון, חקירה היא שלב #4 (לפני האחרון); בשיעור היא שלב #2.',
  },

  // ── 6 · Hook timing (true/false) ──
  {
    id: 'q6-hook-timing',
    type: 'truefalse',
    question: 'הפתיח (Engage) הוא השלב היחיד שמתוכנן בלי לדעת מה יקרה בסוף.',
    options: TF,
    correctId: 'false',
    explanation:
      'דווקא הפוך. הפתיח מתוכנן אחרון — כשכבר ידועים המחוון, ההעמקה, ההסבר והפעילות. רק אז אפשר לבנות פתיח שמרמז על הסוף.',
  },
];