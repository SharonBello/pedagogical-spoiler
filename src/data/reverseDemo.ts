// ═══════════════════════════════════════════════════════════════════
// M03 · Reverse-Engineering Demo Content
// 3 worked examples · evaluate stages use real 4×3 rubrics (max 20 pts).
// Lit elaborate stays inside Caged Bird (the song-contrast dimension).
// ═══════════════════════════════════════════════════════════════════
import type { StageKey, SampleSubject } from '@/types/module.types';

// ── RUBRIC TYPES ──────────────────────────────────────────────────
export interface RubricLevel { label: string; points: string; }
export interface RubricCriterion { name: string; descriptions: string[]; }
export interface Rubric {
  totalPoints: number;
  levels: RubricLevel[];           // column headers (ordered low → high)
  criteria: RubricCriterion[];     // rows; each descriptions[] matches levels by index
}

export interface SampleQuestion { level: 'LOTS' | 'HOTS'; text: string; }

export interface StageOutput {
  summary: string;
  body?: string[];                 // bullet list (used by non-evaluate stages)
  rubric?: Rubric;                 // evaluate only
  questions?: SampleQuestion[];    // evaluate only
}

export interface ReverseStage {
  stageKey: StageKey;
  planOrder: number;
  deliveryOrder: number;
  symbol: string;
  nameHe: string;
  nameEn: string;
  prompt: { role: string; context: string; task: string; format: string; };
  output: StageOutput;
}

export interface ReverseDemoMeta {
  id: SampleSubject;
  label: string;
  emoji: string;
  subject: string;
  level: string;
  grade: string;
  textTitle: string;
  questionStamp: string;
  question: string;
  questionLang: 'en' | 'he';
  questionHe?: string;
  reflectionHook: string;
}

export interface ReverseDemo { meta: ReverseDemoMeta; stages: ReverseStage[]; }

// ── Standard 3-level scale used by all rubrics ───────────────────
const LEVELS: RubricLevel[] = [
  { label: 'חלקי',  points: '1-2 נק׳' },
  { label: 'טוב',   points: '3-4 נק׳' },
  { label: 'מצוין', points: '5 נק׳'   },
];

// ═════════════════════════════════════════════════════════════════
// 1 · LITERATURE BAGRUT — "Caged Bird"
// ═════════════════════════════════════════════════════════════════
const litBagrut: ReverseDemo = {
  meta: {
    id: 'literature-bagrut',
    label: 'ספרות אנגלית · בגרות',
    emoji: '📚',
    subject: 'English Literature',
    level: '5 יח״ל',
    grade: 'יא׳',
    textTitle: '"Caged Bird" — Maya Angelou',
    questionStamp: 'בגרות · 5 יח״ל · שאלת HOTS',
    questionLang: 'en',
    question:
      'Discuss the use of contrast between the free bird and the caged bird in Maya Angelou\'s "Caged Bird" and what it reveals about the speaker\'s perspective on freedom and oppression.',
    questionHe:
      'דונו בשימוש בניגוד בין הציפור החופשייה לציפור הכלואה בשיר "Caged Bird" מאת מאיה אנג\'לו — ומה הוא חושף לגבי תפיסת המשוררת לחופש ולדיכוי.',
    reflectionHook: 'שתי תמונות של ציפורים',
  },
  stages: [
    {
      stageKey: 'evaluate', planOrder: 1, deliveryOrder: 5,
      symbol: '🎯', nameHe: 'הערכה', nameEn: 'Evaluate',
      prompt: {
        role: 'מומחה להוראת ספרות אנגלית, בגרות 5 יח״ל, עם ניסיון בהכנת מחוונים על־פי שאלות HOTS של משרד החינוך.',
        context: 'כיתה יא׳, השיר "Caged Bird" של מאיה אנג\'לו, רמת תלמידים: 5 יח״ל.',
        task: 'צור מחוון לבדיקת רמת הידע וההבנה שנרכשו על־ידי התלמיד בנושא הניגוד בין שתי הציפורים וסמליות החופש/דיכוי.',
        format: 'מחוון של 4 קריטריונים × 3 רמות, ניקוד 1-5 לכל קריטריון (סה״כ 20 נק׳) + 2 שאלות לדוגמה (LOTS + HOTS).',
      },
      output: {
        summary: 'מחוון 4×3 · 20 נק׳ · 2 שאלות לדוגמה',
        rubric: {
          totalPoints: 20,
          levels: LEVELS,
          criteria: [
            {
              name: 'זיהוי דימויי הניגוד',
              descriptions: [
                'מזהה דימוי אחד מכל ציפור',
                'מזהה 2-3 דימויים מכל צד',
                'מזהה את כל דימויי הניגוד עם הפניה לשורות בטקסט',
              ],
            },
            {
              name: 'ניתוח שפת השיר',
              descriptions: [
                'מציין מילים בודדות בלי הקשר',
                'מזהה אמצעי ספרותי אחד (חזרה / מטאפורה)',
                'מזהה מספר אמצעים עם דוגמאות וניתוח השפעתם',
              ],
            },
            {
              name: 'הסקת משמעות מהניגוד',
              descriptions: [
                'מציין שיש "ניגוד" בלי הסבר',
                'מסביר את המסר הכללי שעולה מהניגוד',
                'מסביר איך הניגוד עצמו יוצר את המסר על חופש/דיכוי',
              ],
            },
            {
              name: 'ביסוס בציטוטים מהטקסט',
              descriptions: [
                '0-1 ציטוטים, לעיתים לא מדויקים',
                '2 ציטוטים מדויקים ורלוונטיים',
                '3+ ציטוטים מדויקים עם הסבר על רלוונטיותם',
              ],
            },
          ],
        },
        questions: [
          { level: 'LOTS', text: 'Identify two images of freedom in stanza 1.' },
          { level: 'HOTS', text: 'How does the repetition of the chained bird across stanzas shape the poem\'s meaning?' },
        ],
      },
    },
    {
      // FIXED: was a Dickinson comparison. Now stays inside Caged Bird —
      // applies the same contrast-analysis skill to a NEW dimension of the
      // SAME poem (the contrast in how the two birds SING).
      stageKey: 'elaborate', planOrder: 2, deliveryOrder: 4,
      symbol: '🚀', nameHe: 'העמקה', nameEn: 'Elaborate',
      prompt: {
        role: '(זהה — מומחה ספרות אנגלית 5 יח״ל)',
        context: '(זהה — כיתה יא׳, "Caged Bird", 5 יח״ל)',
        task: 'בהינתן המחוון, צור משימת העמקה שתאתגר את התלמיד ליישם את אותה גישת ניתוח-ניגוד — על מימד נוסף של אותו השיר. הישארו בתוך Caged Bird.',
        format: 'משימה בכתב, 150-200 מילים, על המימד הקולי (sound/song) של הניגוד + 2 שאלות מנחות.',
      },
      output: {
        summary: 'ניתוח הניגוד ב"שירה" — שתי הציפורים שרות, אך לא את אותו דבר',
        body: [
          '• שתי הציפורים שרות — אבל המשמעות של השירה שונה לחלוטין',
          '• משימת התלמיד: לסמן את כל מופעי "sing" / "song" בשיר ולסווג כל אחד — שירת חופש או שירת געגוע?',
          '• ליצור טבלת השוואה: מה כל ציפור שרה עליו, באיזו רוח, ולמה',
          '↳ שאלה 1: "What is the free bird singing about? Cite the text."',
          '↳ שאלה 2: "Why does the caged bird sing \'with a fearful trill\'? What does the contrast in their songs add to the poem\'s message?"',
        ],
      },
    },
    {
      stageKey: 'explain', planOrder: 3, deliveryOrder: 3,
      symbol: '💡', nameHe: 'הסבר', nameEn: 'Explain',
      prompt: {
        role: '(זהה)',
        context: '(זהה)',
        task: 'מהו "גרעין הידע" שהמורה חייב להעביר באופן מפורש כדי שהתלמידים יבצעו את משימת ההעמקה?',
        format: 'הסבר קצר (עד 150 מילים) + עזר חזותי אחד.',
      },
      output: {
        summary: 'מיני-הרצאה על "Symbolic Contrast" + ויזואל השוואתי',
        body: [
          '• הגדרה: ניגוד סמלי = שני דימויים שמייצגים מצבים מנוגדים ויחד יוצרים משמעות עמוקה',
          '• דוגמה: כנפיים פרושות vs. כנפיים קצוצות; שיר חופש vs. שיר געגוע',
          '• ויזואל: טבלת 2 עמודות "Free Bird | Caged Bird" × 5 שורות (שפה · תנועה · קול · רגש · סוף)',
        ],
      },
    },
    {
      stageKey: 'explore', planOrder: 4, deliveryOrder: 2,
      symbol: '🔍', nameHe: 'חקירה', nameEn: 'Explore',
      prompt: {
        role: '(זהה)',
        context: '(זהה)',
        task: 'תכנן פעילות בזוגות שתביא את התלמידים לגלות בעצמם את הניגוד הסמלי לפני שמסבירים להם.',
        format: 'הוראות + רשימת חומרים + זמן. הפעילות לא מזכירה "Symbolic Contrast" עד הסוף.',
      },
      output: {
        summary: 'פעילות "Two Birds, Two Worlds" — 15 דקות בזוגות',
        body: [
          '• חומרים: בית 1 + בית 3 בנפרד · עט סימון 2 צבעים',
          '• זוג מקבל בית 1 (free bird) — מסמן בצהוב מילים חיוביות',
          '• זוג שכן מקבל בית 3 (caged bird) — מסמן באדום מילים שליליות',
          '• הזוגות מתאחדים, משווים, ומגלים בעצמם את הדפוס',
        ],
      },
    },
    {
      stageKey: 'engage', planOrder: 5, deliveryOrder: 1,
      symbol: '🎬', nameHe: 'הצתה', nameEn: 'Engage',
      prompt: {
        role: '(זהה)',
        context: '(זהה)',
        task: 'בהינתן הפעילות + ההסבר + ההעמקה + המחוון שכבר תכננו — צור פתיח של 2 דקות לתחילת השיעור שמרמז על הניגוד אך לא חושף אותו.',
        format: 'שאלת פתיחה + אובייקט חזותי (תמונה / סרטון 30 שניות / חפץ). מקסימום 2 דקות.',
      },
      output: {
        summary: 'הצגה של 2 תמונות + שאלה אחת',
        body: [
          '• תמונה 1: ציפור בעוף חופשי בשמיים פתוחים',
          '• תמונה 2: ציפור בכלוב מאחורי חלון עם נוף',
          '• שאלה: "Which bird is happier — and what proof do you have from the image alone?"',
          '↳ הפתיח מציץ אל הסוף: התלמידים פותחים בדיוק את הניגוד שיגלו בעצמם בפעילות',
        ],
      },
    },
  ],
};

// ═════════════════════════════════════════════════════════════════
// 2 · MIDDLE-SCHOOL HISTORY — ה׳ באייר תש״ח
// ═════════════════════════════════════════════════════════════════
const historyMiddle: ReverseDemo = {
  meta: {
    id: 'history-middle',
    label: 'היסטוריה · חט״ב',
    emoji: '🏛️',
    subject: 'היסטוריה',
    level: 'חט״ב',
    grade: 'ח׳',
    textTitle: 'ה׳ באייר תש״ח · הכרזת המדינה',
    questionStamp: 'מבחן · חט״ב · שאלת HOTS',
    questionLang: 'he',
    question:
      'הסבירו את הדילמות שעמדו בפני בן-גוריון בערב הכרזת המדינה (14 במאי 1948) והעריכו את ההחלטות שקיבל.',
    reflectionHook: 'השעון על 16:00 של 14 במאי 1948',
  },
  stages: [
    {
      stageKey: 'evaluate', planOrder: 1, deliveryOrder: 5,
      symbol: '🎯', nameHe: 'הערכה', nameEn: 'Evaluate',
      prompt: {
        role: 'מומחה להוראת היסטוריה לחטיבת ביניים, עם ניסיון בהכנת מבחנים על־פי תכנית הלימודים של משרד החינוך.',
        context: 'כיתה ח׳, נושא הקמת המדינה (ה׳ באייר תש״ח), רמת תלמידי חט״ב.',
        task: 'צור מחוון לבדיקת רמת הידע וההבנה שנרכשו על־ידי התלמיד בנושא הדילמות של בן-גוריון בערב הכרזת המדינה.',
        format: 'מחוון של 4 קריטריונים × 3 רמות, ניקוד 1-5 לכל קריטריון (סה״כ 20 נק׳) + 2 שאלות לדוגמה (LOTS + HOTS).',
      },
      output: {
        summary: 'מחוון 4×3 · 20 נק׳ · 2 שאלות לדוגמה',
        rubric: {
          totalPoints: 20,
          levels: LEVELS,
          criteria: [
            {
              name: 'זיהוי הדילמות',
              descriptions: [
                'מזהה דילמה אחת באופן חלקי',
                'מזהה 2 דילמות מרכזיות (צבא / גבולות / מיעוטים)',
                'מזהה את כל 3 הדילמות עם הפניה למקורות היסטוריים',
              ],
            },
            {
              name: 'הבנת ההקשר ההיסטורי',
              descriptions: [
                'תאריך כללי בלבד',
                'מציב את האירוע בתוך 1947-1948',
                'מקשר לאירועים מקבילים (החלטת או״ם, מנדט, מלחמה)',
              ],
            },
            {
              name: 'ניתוח השיקולים והאילוצים',
              descriptions: [
                'מציין שיקול אחד בלבד',
                'מציין 2-3 שיקולים בלי לבחון אותם',
                'מנתח שיקולים מנוגדים ושוקל יתרונות וחסרונות',
              ],
            },
            {
              name: 'הערכת ההחלטות בראייה היסטורית',
              descriptions: [
                'הערכה כללית — "טוב/רע"',
                'הערכה מנומקת בעיקרה',
                'הערכה ביקורתית עם דוגמאות והשוואה לחלופות',
              ],
            },
          ],
        },
        questions: [
          { level: 'LOTS', text: 'מי הכריז על הקמת המדינה ובאיזה תאריך?' },
          { level: 'HOTS', text: 'אילו שלוש דילמות מרכזיות עמדו בפני בן-גוריון ב-14 במאי 1948? נתחו אחת מהן והעריכו את ההחלטה שהתקבלה.' },
        ],
      },
    },
    {
      stageKey: 'elaborate', planOrder: 2, deliveryOrder: 4,
      symbol: '🚀', nameHe: 'העמקה', nameEn: 'Elaborate',
      prompt: {
        role: '(זהה — מומחה היסטוריה לחט״ב)',
        context: '(זהה — כיתה ח׳, הכרזת המדינה)',
        task: 'בהינתן המחוון, צור משימת העמקה שתאתגר את התלמיד ליישם את אותה ניתוח דילמות — על שיקול אחר באותו אירוע. הישארו ביום ה־14 במאי.',
        format: 'משימה בכתב, 200 מילים, על דילמה ספציפית אחת (לדוגמה: כן/לא להכריז עכשיו) + 2 שאלות מנחות.',
      },
      output: {
        summary: 'ניתוח מעמיק של הדילמה "להכריז או לדחות"',
        body: [
          '• ב-14 במאי בבוקר — חברי הממשלה הזמנית חלוקים: חלקם דורשים להכריז, חלקם דורשים לדחות',
          '• משימה: לזהות 3 שיקולים בעד הכרזה מיידית ו-3 שיקולים בעד דחייה',
          '• להעריך — איזו עמדה הייתם נוקטים אילו הייתם בחדר?',
          '↳ שאלה 1: "מה היה הסיכון המרכזי בדחייה?"',
          '↳ שאלה 2: "מה היה הסיכון המרכזי בהכרזה מיידית? שקלו ביניהם."',
        ],
      },
    },
    {
      stageKey: 'explain', planOrder: 3, deliveryOrder: 3,
      symbol: '💡', nameHe: 'הסבר', nameEn: 'Explain',
      prompt: {
        role: '(זהה)',
        context: '(זהה)',
        task: 'מהו "גרעין הידע" שהמורה חייב להעביר באופן מפורש כדי שהתלמידים יבצעו את משימת ההעמקה?',
        format: 'הסבר קצר (עד 150 מילים) + עזר חזותי אחד.',
      },
      output: {
        summary: 'מיני-הרצאה על "דילמת מנהיגות" + עץ החלטות',
        body: [
          '• הגדרה: דילמת מנהיגות = מצב שבו כל בחירה כרוכה בסיכון משמעותי, ואין פתרון "נכון" מובהק',
          '• דוגמה: בן-גוריון 14 במאי — להכריז? לדחות? להתפשר?',
          '• ויזואל: עץ החלטות עם 3 צמתים (צבא · גבולות · מיעוטים), בכל צומת 2 חלופות והשלכותיהן',
        ],
      },
    },
    {
      stageKey: 'explore', planOrder: 4, deliveryOrder: 2,
      symbol: '🔍', nameHe: 'חקירה', nameEn: 'Explore',
      prompt: {
        role: '(זהה)',
        context: '(זהה)',
        task: 'תכנן פעילות בקבוצות שתביא את התלמידים לגלות בעצמם את מורכבות ההחלטה לפני שמסבירים להם.',
        format: 'הוראות + חומרים + זמן. הפעילות לא מזכירה "דילמת מנהיגות" עד הסוף.',
      },
      output: {
        summary: 'פעילות "שולחן בן-גוריון" — 20 דקות בקבוצות 4',
        body: [
          '• חומרים: 4 כרטיסיות עם דעות סותרות של חברי הממשלה הזמנית (תומך · מסתייג · דוחה · מתעקש)',
          '• כל קבוצה מקבלת את 4 הכרטיסיות ועליה להגיע להחלטה אחת מוסכמת',
          '• כל חבר קבוצה מייצג עמדה אחת ומציג את שיקוליה',
          '• בסיכום — מגלים שהם בדיוק פתרו דילמה היסטורית אמיתית',
        ],
      },
    },
    {
      stageKey: 'engage', planOrder: 5, deliveryOrder: 1,
      symbol: '🎬', nameHe: 'הצתה', nameEn: 'Engage',
      prompt: {
        role: '(זהה)',
        context: '(זהה)',
        task: 'בהינתן הפעילות + ההסבר + ההעמקה + המחוון — צור פתיח של 2 דקות לתחילת השיעור שמרמז על הדילמה אך לא חושף אותה.',
        format: 'שאלת פתיחה + אובייקט חזותי. מקסימום 2 דקות.',
      },
      output: {
        summary: 'שעון על 16:00 + שאלה אישית',
        body: [
          '• אובייקט: צילום שעון מצביע על 16:00, 14 במאי 1948 (סיום המנדט הבריטי)',
          '• שאלה: "אם הייתם בן-גוריון ברגע הזה — והייתם צריכים להחליט תוך 8 שעות — מה הייתם עושים?"',
          '↳ הפתיח מציץ אל הסוף: התלמידים פותחים בדיוק את הדילמה שיגלו לעומק בפעילות',
        ],
      },
    },
  ],
};

// ═════════════════════════════════════════════════════════════════
// 3 · ELEMENTARY MATH — שברים פשוטים
// ═════════════════════════════════════════════════════════════════
const mathElementary: ReverseDemo = {
  meta: {
    id: 'math-elementary',
    label: 'מתמטיקה · יסודי',
    emoji: '📐',
    subject: 'מתמטיקה',
    level: 'יסודי',
    grade: 'ד׳',
    textTitle: 'שברים פשוטים — חצי, שליש, רבע',
    questionStamp: 'בוחן יסודי · שאלת הבנה',
    questionLang: 'he',
    question:
      'איזה חלק מהפיצה גדול יותר — שני שלישים או חצי? הסבירו והדגימו בציור.',
    reflectionHook: 'שתי פיצות מצוירות על הלוח — אחת חצויה, אחת חתוכה לשלישים',
  },
  stages: [
    {
      stageKey: 'evaluate', planOrder: 1, deliveryOrder: 5,
      symbol: '🎯', nameHe: 'הערכה', nameEn: 'Evaluate',
      prompt: {
        role: 'מומחה הוראת מתמטיקה ליסודי, מכיר את תכנית הלימודים של כיתות ג׳-ד׳ עם דגש על שברים פשוטים.',
        context: 'כיתה ד׳, נושא שברים פשוטים (חצי, שליש, רבע), גילאי 9-10.',
        task: 'צור מחוון לבדיקת רמת הידע וההבנה שנרכשו על־ידי התלמיד בהשוואת שברים פשוטים.',
        format: 'מחוון של 4 קריטריונים × 3 רמות, ניקוד 1-5 לכל קריטריון (סה״כ 20 נק׳) + 2 שאלות לדוגמה (LOTS + HOTS).',
      },
      output: {
        summary: 'מחוון 4×3 · 20 נק׳ · 2 שאלות לדוגמה',
        rubric: {
          totalPoints: 20,
          levels: LEVELS,
          criteria: [
            {
              name: 'הכרת המושגים (חצי, שליש, רבע)',
              descriptions: [
                'מזהה 1 מתוך 3 המושגים בשמותיהם',
                'מזהה 2-3 מושגים נכון',
                'מזהה את כולם, וגם יודע איזה מהם גדול ואיזה קטן',
              ],
            },
            {
              name: 'ייצוג חזותי של שבר',
              descriptions: [
                'ציור לא מדויק (חלוקה לא שווה)',
                'ציור מדויק של שבר אחד',
                'ציור מדויק של 2 שברים שונים, בחלוקה שווה',
              ],
            },
            {
              name: 'השוואה בין שברים',
              descriptions: [
                'השוואה אינטואיטיבית בלי הצדקה',
                'השוואה נכונה עם הסבר חזותי',
                'השוואה נכונה עם 2 הצדקות (ציור + הסבר מילולי)',
              ],
            },
            {
              name: 'הצדקה לוגית — "למה?"',
              descriptions: [
                '"כי..." בלי תוכן',
                'הצדקה חלקית — נכונה אך לא שלמה',
                'הצדקה מלאה עם דוגמה / השוואה',
              ],
            },
          ],
        },
        questions: [
          { level: 'LOTS', text: 'מה גדול יותר — חצי או רבע? הסבירו במשפט אחד.' },
          { level: 'HOTS', text: 'הראו בשתי דרכים שונות ששני שלישים גדול מחצי. השתמשו בציור ובהסבר במילים.' },
        ],
      },
    },
    {
      stageKey: 'elaborate', planOrder: 2, deliveryOrder: 4,
      symbol: '🚀', nameHe: 'העמקה', nameEn: 'Elaborate',
      prompt: {
        role: '(זהה — מומחה הוראת מתמטיקה יסודי)',
        context: '(זהה — כיתה ד׳, שברים פשוטים)',
        task: 'בהינתן המחוון, צור בעיה מילולית שתוכיח שתלמיד שולט בהשוואת שברים גם בהקשר חדש שדורש מעבר מציור לחשיבה מופשטת.',
        format: 'בעיה מילולית קצרה + 2 שאלות מנחות + הוראה לצייר.',
      },
      output: {
        summary: 'בעיה על חלוקת שוקולד בין דן למיה',
        body: [
          '• בעיה: "לדן יש חצי שוקולד ולמיה יש שני שלישים מאותו גודל. למי יש יותר?"',
          '↳ שאלה 1: "ציירו את שני השוקולדים על דף משובץ"',
          '↳ שאלה 2: "הסבירו במילים שלכם — איך אתם יודעים?"',
        ],
      },
    },
    {
      stageKey: 'explain', planOrder: 3, deliveryOrder: 3,
      symbol: '💡', nameHe: 'הסבר', nameEn: 'Explain',
      prompt: {
        role: '(זהה)',
        context: '(זהה)',
        task: 'מהו "גרעין הידע" שהמורה חייב להעביר באופן מפורש כדי שהתלמידים יבצעו את משימת ההעמקה?',
        format: 'הסבר קצר (עד 100 מילים) + ויזואל השוואתי.',
      },
      output: {
        summary: 'הסבר על מונה ומכנה + 3 עיגולים מחולקים',
        body: [
          '• הגדרה: שבר = חלק מתוך שלם',
          '• המכנה (תחתון) — לכמה חלקים שווים חילקנו את השלם',
          '• המונה (עליון) — כמה חלקים מתוך החלוקה לקחנו',
          '• ויזואל: 3 עיגולים שווי גודל — אחד חצוי, אחד מחולק לשלישים, אחד לרבעים. בכל אחד מסומן חלק אחד.',
        ],
      },
    },
    {
      stageKey: 'explore', planOrder: 4, deliveryOrder: 2,
      symbol: '🔍', nameHe: 'חקירה', nameEn: 'Explore',
      prompt: {
        role: '(זהה)',
        context: '(זהה)',
        task: 'תכנן פעילות בזוגות שתביא את התלמידים לגלות בעצמם איזה שבר גדול מאחר לפני שמסבירים להם.',
        format: 'הוראות + חומרים + זמן. הפעילות לא מזכירה "מונה"/"מכנה" עד הסוף.',
      },
      output: {
        summary: 'פעילות "שולחן הפיצה" — 15 דקות בזוגות',
        body: [
          '• חומרים: 4 דיסקיות נייר עגולות (פיצות) + מספריים בטוחים + טוש',
          '• כל זוג חותך פיצה אחת לחצאים, אחרת לשלישים, אחרת לרבעים',
          '• הזוגות משווים את החתיכות פיזית ומסדרים מהקטנה לגדולה',
          '• בסיכום מגלים: ככל שהמכנה גדול יותר — החתיכות קטנות יותר',
        ],
      },
    },
    {
      stageKey: 'engage', planOrder: 5, deliveryOrder: 1,
      symbol: '🎬', nameHe: 'הצתה', nameEn: 'Engage',
      prompt: {
        role: '(זהה)',
        context: '(זהה)',
        task: 'בהינתן הפעילות + ההסבר + ההעמקה + המחוון — צור פתיח של 2 דקות לתחילת השיעור שמרמז על מה שעומדים ללמוד.',
        format: 'שאלת פתיחה + אובייקט חזותי. מקסימום 2 דקות.',
      },
      output: {
        summary: 'שתי פיצות מצוירות + בחירה',
        body: [
          '• אובייקט: 2 פיצות מודבקות על הלוח — אחת חצויה, אחת חתוכה לשלישים',
          '• שאלה: "אם מותר לכם לקחת רק חתיכה אחת — מאיזו פיצה תקחו? למה?"',
          '↳ הפתיח מציץ אל הסוף: התלמידים פותחים בדיוק את ההשוואה שיגלו לעומק בפעילות',
        ],
      },
    },
  ],
};

// ═════════════════════════════════════════════════════════════════
export const REVERSE_DEMOS: ReverseDemo[] = [
  litBagrut,
  historyMiddle,
  mathElementary,
];

export const REVERSE_DEMO_BY_ID = REVERSE_DEMOS.reduce(
  (acc, d) => { acc[d.meta.id] = d; return acc; },
  {} as Record<SampleSubject, ReverseDemo>,
);