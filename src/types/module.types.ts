// ═══════════════════════════════════════════════════════════════════
// M03 · Module Types
// ═══════════════════════════════════════════════════════════════════

/** The 8 sections of the module — order matters for routing & progress. */
export type SectionId =
  | 'opening'
  | 'theory'
  | 'reverse'
  | 'break'
  | 'practice'
  | 'shared'
  | 'quiz'
  | 'closing';

export interface SectionMeta {
  id: SectionId;
  number: number;          // 1..8
  title: string;           // displayed in nav + section header
  subtitle?: string;
  duration: number;        // minutes (for the 3-hour lecture mode)
  path: string;            // route path (hash-based)
}

/** The 5 stages of 5E (in delivery order). Planning happens in reverse. */
export type StageKey =
  | 'engage'      // הצתה
  | 'explore'    // חקירה
  | 'explain'    // הסבר
  | 'elaborate'  // העמקה
  | 'evaluate';  // הערכה

export interface StageMeta {
  key: StageKey;
  number: number;        // 1..5 in DELIVERY order
  planOrder: number;     // 1..5 in PLANNING order (reverse — evaluate=1)
  nameHe: string;
  nameEn: string;
  symbol: string;        // single character / emoji for the station card
  promptQuestion: string;
  produces: string;
}

/** Progress is per-section. Saved to localStorage. */
export interface SectionProgress {
  id: SectionId;
  visited: boolean;
  completed: boolean;
  artifactCreated?: boolean;
}

/** Teacher's own topic — picked during the break, used in practice. */
export interface CustomTopic {
  subject: string;
  topic: string;
  grade: string;
  ageRange: string;
}

export interface ModuleProgress {
  sections: Record<SectionId, SectionProgress>;
  startedAt: number | null;
  completedAt: number | null;
  quizScore: number | null;
  selectedSample: SampleSubject | null;
  customTopic: CustomTopic | null;
}

/** The three demo subjects teachers can switch between. */
export type SampleSubject = 'math-elementary' | 'history-middle' | 'literature-bagrut';