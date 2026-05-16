// ═══════════════════════════════════════════════════════════════════
// M03 · Lesson Plan Types
// The shape of the final artifact — a filled MOE-style lesson plan.
// ═══════════════════════════════════════════════════════════════════
import type { StageKey, SampleSubject } from './module.types';

/** One AI prompt the teacher will run, scoped to a single 5E stage. */
export interface StagePrompt {
  stage: StageKey;
  planOrder: number;
  /** The 4 parts of the prompt — matches M02's formula. */
  role: string;           // תפקיד
  context: string;        // קשר ורקע
  task: string;           // משימה
  format: string;         // פורמט
}

/** A completed lesson plan — what the teacher walks out with. */
export interface LessonPlan {
  // ── meta ──
  subject: string;          // מקצוע (e.g., "מתמטיקה")
  grade: string;            // כיתה (e.g., "ד'")
  topic: string;            // נושא (e.g., "שברים פשוטים")
  duration: number;         // זמן בדקות
  date?: string;
  teacher?: string;

  // ── MOE-style sections (filled by AI from the 5 stage prompts) ──
  objectives: string[];           // מטרות לימוד  ← from EVALUATE (planOrder 1)
  priorKnowledge: string[];       // ידע קודם     ← derived from EXPLORE
  opening: LessonStep;            // פתיחה (5 דק׳) ← from ENGAGE
  body: LessonStep[];             // גוף השיעור   ← EXPLORE → EXPLAIN → ELABORATE
  summary: LessonStep;            // סיכום        ← from EXPLAIN wrap
  assessment: AssessmentBlock;    // הערכה        ← from EVALUATE
}

export interface LessonStep {
  title: string;
  duration: number;        // minutes
  description: string;
  materials?: string[];
  teacherActions?: string[];
  studentActions?: string[];
}

export interface AssessmentBlock {
  rubric: RubricCriterion[];
  questions: AssessmentQuestion[];
}

export interface RubricCriterion {
  criterion: string;
  levels: { label: string; description: string }[];
}

export interface AssessmentQuestion {
  level: 'LOTS' | 'HOTS';
  question: string;
  expectedAnswer?: string;
}

/** A complete demo sample — the prompts + the resulting plan. */
export interface SampleLessonPack {
  id: SampleSubject;
  label: string;
  meta: {
    subject: string;
    grade: string;
    topic: string;
    duration: number;
    ageHint: string;       // for the teacher UI ("יסודי", "חט״ב", "תיכון בגרות")
  };
  /** The 5 chained prompts — planning order (evaluate first). */
  prompts: StagePrompt[];
  /** The filled lesson plan that results from running all 5 prompts. */
  result: LessonPlan;
}
