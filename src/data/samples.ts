// ═══════════════════════════════════════════════════════════════════
// M03 · Sample Lesson Packs
// THREE demo subjects teachers can switch between.
// Phase 1: skeleton only (meta + placeholders).
// Phase 5: full pedagogical content for prompts + filled lesson plans.
// ═══════════════════════════════════════════════════════════════════
import type { SampleLessonPack } from '@/types/lesson.types';

/** ── 1 · Elementary Math · שברים פשוטים ──────────────────────── */
const mathElementary: SampleLessonPack = {
  id: 'math-elementary',
  label: 'מתמטיקה · יסודי · שברים',
  meta: {
    subject: 'מתמטיקה',
    grade: 'ד׳',
    topic: 'שברים פשוטים — חצי, רבע, שלישית',
    duration: 45,
    ageHint: 'יסודי · גילאי 9-10',
  },
  prompts: [],   // filled in Phase 5
  result: {} as SampleLessonPack['result'], // filled in Phase 5
};

/** ── 2 · Middle-School History · קום מדינה ───────────────────── */
const historyMiddle: SampleLessonPack = {
  id: 'history-middle',
  label: 'היסטוריה · חט״ב · ה׳ באייר',
  meta: {
    subject: 'היסטוריה',
    grade: 'ח׳',
    topic: 'ה׳ באייר תש״ח — הכרזת המדינה',
    duration: 45,
    ageHint: 'חט״ב · גילאי 13-14',
  },
  prompts: [],
  result: {} as SampleLessonPack['result'],
};

/** ── 3 · Bagrut English Literature · Caged Bird ──────────────── */
const literatureBagrut: SampleLessonPack = {
  id: 'literature-bagrut',
  label: 'ספרות אנגלית · בגרות · Caged Bird',
  meta: {
    subject: 'English Literature (5pt)',
    grade: 'יא׳',
    topic: '"Caged Bird" by Maya Angelou — symbolism & contrast',
    duration: 90,
    ageHint: 'תיכון · בגרות 5 יח״ל',
  },
  prompts: [],
  result: {} as SampleLessonPack['result'],
};

/** All 3 samples, in display order. */
export const SAMPLES: SampleLessonPack[] = [
  mathElementary,
  historyMiddle,
  literatureBagrut,
];

export const SAMPLE_BY_ID = SAMPLES.reduce(
  (acc, s) => { acc[s.id] = s; return acc; },
  {} as Record<SampleLessonPack['id'], SampleLessonPack>,
);
