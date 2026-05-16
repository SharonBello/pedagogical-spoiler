# ════════════════════════════════════════════════════════════════
# setup-section7-quiz.ps1
# Section 7 (מבחן) — 6-question self-check + result banner.
# Run from project root: PS> .\setup-section7-quiz.ps1
# ════════════════════════════════════════════════════════════════

function W ($p, $c) {
    $full = Join-Path (Get-Location) $p
    $dir  = Split-Path $full -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
    [System.IO.File]::WriteAllText($full, $c, (New-Object System.Text.UTF8Encoding($false)))
    Write-Host "  + $p" -ForegroundColor Green
}

if (-not (Test-Path 'package.json')) {
    Write-Host "ERROR: Run from project root." -ForegroundColor Red
    exit 1
}

Write-Host "Writing Section 7..." -ForegroundColor Cyan
Write-Host ""

W 'src/data/quizData.ts' @'
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
'@

W 'src/sections/07-quiz/index.tsx' @'
// ═══════════════════════════════════════════════════════════════════
// Section 07 — מבחן (Quiz · 15 min)
// Self-check: 6 questions on the 5E-backwards approach.
// State (answers + submitted + score) persists to localStorage.
// ═══════════════════════════════════════════════════════════════════
import React, { useEffect, useState } from 'react';
import SectionShell from '@/components/SectionShell/SectionShell';
import { useProgressCtx } from '@/components/ModuleShell/ModuleProgressContext';
import { QUIZ_QUESTIONS } from '@/data/quizData';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import styles from './index.module.scss';

interface QuizState {
  answers: Record<string, string>;
  submitted: boolean;
  score: number;
}

const STORAGE_KEY = 'binai.m03.quiz.v1';
const EMPTY: QuizState = { answers: {}, submitted: false, score: 0 };

function load(): QuizState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as QuizState;
    return { ...EMPTY, ...parsed };
  } catch { return EMPTY; }
}

const QuizSection: React.FC = () => {
  const [state, setState] = useState<QuizState>(load);
  const { setQuizScore } = useProgressCtx();

  // Persist whole state to localStorage on every change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const allAnswered = Object.keys(state.answers).length === totalQuestions;

  const handleAnswer = (qid: string, optionId: string) => {
    if (state.submitted) return; // locked after submit
    setState(s => ({ ...s, answers: { ...s.answers, [qid]: optionId } }));
  };

  const handleSubmit = () => {
    if (!allAnswered || state.submitted) return;
    const score = QUIZ_QUESTIONS.reduce(
      (acc, q) => acc + (state.answers[q.id] === q.correctId ? 1 : 0),
      0,
    );
    setState(s => ({ ...s, submitted: true, score }));
    setQuizScore(score);
    // smooth scroll to top to see the result banner
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  };

  const handleRetry = () => {
    setState(EMPTY);
    setQuizScore(0);
  };

  return (
    <SectionShell id="quiz">
      {state.submitted && (
        <QuizResult
          score={state.score}
          total={totalQuestions}
          onRetry={handleRetry}
        />
      )}

      {!state.submitted && (
        <header className={styles.intro}>
          <span className={styles.tag}>הערכה עצמית</span>
          <h3 className={styles.title}>{totalQuestions} שאלות. בלי לחץ.</h3>
          <p className={styles.lede}>
            בדקו אם הפנמתם את הגישה. כל שאלה — תשובה אחת נכונה. אחרי השליחה
            תקבלו הסבר על כל תשובה — <strong>גם אלו שטעיתם בהן</strong>.
            תמיד אפשר לנסות שוב.
          </p>
        </header>
      )}

      <ol className={styles.questions}>
        {QUIZ_QUESTIONS.map((q, i) => (
          <li key={q.id} className={styles.questionItem}>
            <QuizQuestion
              question={q}
              questionNum={i + 1}
              total={totalQuestions}
              selectedId={state.answers[q.id] ?? null}
              submitted={state.submitted}
              onSelect={(optId) => handleAnswer(q.id, optId)}
            />
          </li>
        ))}
      </ol>

      {!state.submitted && (
        <div className={styles.submitRow}>
          <button
            type="button"
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={!allAnswered}
            title={!allAnswered ? `נותרו ${totalQuestions - Object.keys(state.answers).length} שאלות בלי תשובה` : undefined}
          >
            בדקו את הציון שלי
          </button>
          {!allAnswered && (
            <span className={styles.submitHint}>
              נותרו <strong>{totalQuestions - Object.keys(state.answers).length}</strong> שאלות בלי תשובה
            </span>
          )}
        </div>
      )}
    </SectionShell>
  );
};

export default QuizSection;
'@

W 'src/sections/07-quiz/index.module.scss' @'
// ── INTRO ──────────────────────────────────────────────────────
.intro { @include flex-col; gap: $space-2; }

.tag {
  font-family: $font-mono;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: $amber-dark;
  text-transform: uppercase;
}

.title {
  font-size: $text-xl;
  color: $blueprint-dark;
  @include respond-to(md) { font-size: $text-2xl; }
}

.lede {
  font-size: $text-md;
  line-height: $leading-loose;
  color: $ink-soft;
  max-width: 640px;

  strong { color: $marker; font-weight: $weight-bold; }
}

// ── QUESTION LIST ──────────────────────────────────────────────
.questions {
  list-style: none;
  margin: 0;
  padding: 0;
  @include flex-col;
  gap: $space-3;
}

.questionItem { display: block; }

// ── SUBMIT ROW ─────────────────────────────────────────────────
.submitRow {
  @include flex-col;
  gap: $space-2;
  align-items: flex-start;
  margin-top: $space-3;

  @include respond-to(md) {
    flex-direction: row;
    align-items: center;
    gap: $space-4;
  }
}

.submitBtn {
  @include focus-ring;
  padding: $space-3 $space-6;
  background: $marker;
  color: $white;
  border: 1.5px solid $marker;
  border-radius: $radius-md;
  font-family: $font-body;
  font-size: $text-md;
  font-weight: $weight-bold;
  cursor: pointer;
  transition: all $dur-fast $ease-out;

  &:hover:not(:disabled) {
    background: $marker-dark;
    border-color: $marker-dark;
    transform: translateY(-1px);
    box-shadow: $shadow-lift;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.submitHint {
  font-family: $font-mono;
  font-size: $text-sm;
  color: $marker;

  strong { font-weight: $weight-bold; }
}
'@

W 'src/sections/07-quiz/QuizQuestion.tsx' @'
// ═══════════════════════════════════════════════════════════════════
// QuizQuestion — one question card.
// Pre-submit: clickable options, selectable single answer.
// Post-submit: locked, shows ✓ / ✗ + the correct answer + explanation.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { TbCheck, TbX } from 'react-icons/tb';
import type { QuizQuestion as QuizQuestionType } from '@/data/quizData';
import styles from './QuizQuestion.module.scss';

interface Props {
  question: QuizQuestionType;
  questionNum: number;
  total: number;
  selectedId: string | null;
  submitted: boolean;
  onSelect: (optionId: string) => void;
}

const QuizQuestion: React.FC<Props> = ({
  question, questionNum, total, selectedId, submitted, onSelect,
}) => {
  const isCorrect = submitted && selectedId === question.correctId;
  const isWrong   = submitted && selectedId !== null && selectedId !== question.correctId;

  return (
    <article
      className={[
        styles.card,
        submitted && isCorrect && styles.cardCorrect,
        submitted && isWrong   && styles.cardWrong,
      ].filter(Boolean).join(' ')}
    >
      {/* HEADER */}
      <header className={styles.head}>
        <span className={styles.qNum}>שאלה {questionNum}/{total}</span>
        {submitted && (
          <span
            className={`${styles.verdict} ${isCorrect ? styles.verdictRight : styles.verdictWrong}`}
          >
            {isCorrect ? <TbCheck aria-hidden /> : <TbX aria-hidden />}
            <span>{isCorrect ? 'נכון' : 'לא נכון'}</span>
          </span>
        )}
      </header>

      <h4 className={styles.question}>{question.question}</h4>

      {/* OPTIONS */}
      <ul className={styles.options}>
        {question.options.map(opt => {
          const isSelected   = selectedId === opt.id;
          const isCorrectOpt = submitted && opt.id === question.correctId;
          const isWrongPick  = submitted && isSelected && opt.id !== question.correctId;

          return (
            <li key={opt.id}>
              <label
                className={[
                  styles.option,
                  isSelected && !submitted && styles.optionSelected,
                  isCorrectOpt && styles.optionCorrect,
                  isWrongPick && styles.optionWrong,
                  submitted && styles.optionLocked,
                ].filter(Boolean).join(' ')}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={opt.id}
                  checked={isSelected}
                  onChange={() => onSelect(opt.id)}
                  disabled={submitted}
                  className={styles.radio}
                />
                <span className={styles.optionDot} aria-hidden />
                <span className={styles.optionText}>{opt.text}</span>
                {isCorrectOpt && <TbCheck className={styles.optionIcon} aria-hidden />}
                {isWrongPick  && <TbX     className={styles.optionIcon} aria-hidden />}
              </label>
            </li>
          );
        })}
      </ul>

      {/* EXPLANATION (post-submit) */}
      {submitted && (
        <div className={styles.explanation}>
          <span className={styles.explanationLabel}>למה</span>
          <p>{question.explanation}</p>
        </div>
      )}
    </article>
  );
};

export default QuizQuestion;
'@

W 'src/sections/07-quiz/QuizQuestion.module.scss' @'
.card {
  @include paper-surface;
  padding: $space-4 $space-5;
  border-top: 3px solid $blueprint;
  @include flex-col;
  gap: $space-3;
  transition: border-color $dur-fast $ease-out;
}

.cardCorrect { border-top-color: $success; }
.cardWrong   { border-top-color: $marker; }

// ── HEADER ─────────────────────────────────────────────────────
.head {
  @include flex-between;
  gap: $space-2;
  flex-wrap: wrap;
}

.qNum {
  font-family: $font-mono;
  font-size: 11px;
  font-weight: $weight-medium;
  letter-spacing: 0.08em;
  color: $amber-dark;
  text-transform: uppercase;
}

.verdict {
  @include flex-start;
  gap: $space-1;
  font-family: $font-mono;
  font-size: 12px;
  font-weight: $weight-bold;
  padding: 3px $space-2;
  border-radius: $radius-sm;
  letter-spacing: 0.04em;

  svg { font-size: 14px; }
}

.verdictRight {
  background: rgba($success, 0.15);
  color: $success;
}

.verdictWrong {
  background: rgba($marker, 0.15);
  color: $marker;
}

// ── QUESTION TEXT ──────────────────────────────────────────────
.question {
  font-family: $font-display;
  font-weight: $weight-bold;
  color: $blueprint-dark;
  font-size: $text-md;
  line-height: $leading-body;

  @include respond-to(md) { font-size: $text-lg; }
}

// ── OPTIONS ────────────────────────────────────────────────────
.options {
  list-style: none;
  margin: 0;
  padding: 0;
  @include flex-col;
  gap: $space-2;
}

.option {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: $space-3;
  padding: $space-3 $space-4;
  background: $paper;
  border: 1.5px solid $paper-line;
  border-radius: $radius-md;
  cursor: pointer;
  transition: all $dur-fast $ease-out;
  position: relative;

  &:hover { border-color: $blueprint; background: $white; }

  // accessibility — focus ring on the visual label
  &:focus-within {
    outline: 2px solid $amber;
    outline-offset: 2px;
  }
}

// Hide the native radio (we render our own dot)
.radio {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}

.optionDot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid $blueprint-light;
  background: $white;
  flex-shrink: 0;
  transition: all $dur-fast $ease-out;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: $blueprint;
    opacity: 0;
    transform: scale(0.4);
    transition: opacity $dur-fast $ease-out, transform $dur-fast $ease-out;
  }
}

.optionText {
  font-size: $text-sm;
  line-height: $leading-body;
  color: $ink;
}

.optionIcon {
  font-size: 20px;
  flex-shrink: 0;
}

// ── STATES ─────────────────────────────────────────────────────
.optionSelected {
  border-color: $blueprint;
  background: $blueprint-pale;

  .optionDot {
    border-color: $blueprint;
    &::after { opacity: 1; transform: scale(1); }
  }
}

.optionLocked {
  cursor: default;
  &:hover { border-color: $paper-line; background: $paper; }
}

.optionCorrect {
  border-color: $success !important;
  background: rgba($success, 0.08) !important;

  .optionDot {
    border-color: $success;
    background: $success;
    &::after {
      opacity: 1;
      transform: scale(1);
      background: $white;
    }
  }

  .optionText { color: $blueprint-dark; font-weight: $weight-bold; }
  .optionIcon { color: $success; }
}

.optionWrong {
  border-color: $marker !important;
  background: rgba($marker, 0.08) !important;

  .optionDot {
    border-color: $marker;
    background: $marker;
    &::after {
      opacity: 1;
      transform: scale(1);
      background: $white;
    }
  }

  .optionIcon { color: $marker; }
}

// ── EXPLANATION ────────────────────────────────────────────────
.explanation {
  @include flex-col;
  gap: $space-1;
  padding: $space-3 $space-4;
  background: $amber-pale;
  border-right: 3px solid $amber;
  border-radius: $radius-sm;
  margin-top: $space-1;

  p {
    margin: 0;
    font-size: $text-sm;
    line-height: $leading-loose;
    color: $ink;
  }
}

.explanationLabel {
  font-family: $font-mono;
  font-size: 10px;
  font-weight: $weight-bold;
  letter-spacing: 0.12em;
  color: $amber-dark;
  text-transform: uppercase;
}
'@

W 'src/sections/07-quiz/QuizResult.tsx' @'
// ═══════════════════════════════════════════════════════════════════
// QuizResult — score banner shown after submission.
// Tone of the message varies with the percentage correct.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { TbAward, TbRefresh } from 'react-icons/tb';
import styles from './QuizResult.module.scss';

interface Props {
  score: number;
  total: number;
  onRetry: () => void;
}

function getVerdict(pct: number): { label: string; tone: 'great' | 'good' | 'tryagain' } {
  if (pct >= 100) return { label: 'מצוין · הפנמתם לגמרי',          tone: 'great'    };
  if (pct >= 80)  return { label: 'יפה מאוד · אתם בפנים',           tone: 'great'    };
  if (pct >= 60)  return { label: 'בסדר גמור · יש כמה דקויות לחדד', tone: 'good'     };
  return                 { label: 'שווה לעבור שוב על התיאוריה',     tone: 'tryagain' };
}

const QuizResult: React.FC<Props> = ({ score, total, onRetry }) => {
  const pct = Math.round((score / total) * 100);
  const { label, tone } = getVerdict(pct);

  return (
    <section className={`${styles.banner} ${styles[`banner-${tone}`]}`}>
      <div className={styles.icon} aria-hidden><TbAward /></div>

      <div className={styles.body}>
        <span className={styles.tag}>הציון שלכם</span>
        <h3 className={styles.scoreLine}>
          <span className={styles.score}>{score}<span className={styles.scoreSlash}>/{total}</span></span>
          <span className={styles.scorePct}>· {pct}%</span>
        </h3>
        <p className={styles.verdict}>{label}</p>
        <p className={styles.note}>
          גללו למטה כדי לראות איזו תשובה הייתה נכונה לכל שאלה, ולמה.
        </p>
      </div>

      <button type="button" className={styles.retryBtn} onClick={onRetry}>
        <TbRefresh aria-hidden />
        <span>ניסיון נוסף</span>
      </button>
    </section>
  );
};

export default QuizResult;
'@

W 'src/sections/07-quiz/QuizResult.module.scss' @'
.banner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: $space-4;
  padding: $space-5;
  border-radius: $radius-lg;
  position: relative;
  overflow: hidden;
  margin-bottom: $space-4;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
    background-size: 24px 24px;
    pointer-events: none;
  }

  > * { position: relative; z-index: 1; }

  @media (max-width: $bp-md) {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
  }
}

// ── TONE VARIANTS ───────────────────────────────────────────────
.banner-great {
  background: $blueprint-dark;
  color: $white;
}

.banner-good {
  background: $blueprint;
  color: $white;
}

.banner-tryagain {
  background: $marker;
  color: $white;
}

// ── ICON ───────────────────────────────────────────────────────
.icon {
  @include flex-center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  font-size: 32px;

  @media (max-width: $bp-md) { grid-row: 1 / 3; width: 48px; height: 48px; font-size: 26px; }
}

// ── BODY ───────────────────────────────────────────────────────
.body { @include flex-col; gap: 4px; }

.tag {
  font-family: $font-mono;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: $amber;
  text-transform: uppercase;
}

.scoreLine {
  @include flex-start;
  gap: $space-2;
  align-items: baseline;
  font-family: $font-display;
  color: $white;
}

.score {
  font-size: 48px;
  font-weight: $weight-black;
  line-height: 1;
  letter-spacing: -0.02em;
}

.scoreSlash {
  font-size: 28px;
  font-weight: $weight-bold;
  color: $blueprint-pale;
}

.scorePct {
  font-family: $font-mono;
  font-size: $text-md;
  font-weight: $weight-medium;
  color: $amber-light;
}

.verdict {
  margin: 0;
  font-size: $text-md;
  font-weight: $weight-bold;
  color: $white;
  font-family: $font-display;
}

.note {
  margin: 0;
  margin-top: $space-1;
  font-size: $text-sm;
  color: $blueprint-pale;
  line-height: $leading-body;
}

// ── RETRY BUTTON ───────────────────────────────────────────────
.retryBtn {
  @include focus-ring;
  @include flex-center;
  gap: $space-2;
  padding: $space-2 $space-4;
  background: rgba(255, 255, 255, 0.12);
  color: $white;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-radius: $radius-md;
  font-family: $font-body;
  font-size: $text-sm;
  font-weight: $weight-bold;
  cursor: pointer;
  transition: all $dur-fast $ease-out;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }

  svg { font-size: 16px; }

  @media (max-width: $bp-md) { grid-column: 2; align-self: end; }
}
'@

W 'src/router/ModuleRouter.tsx' @'
// ═══════════════════════════════════════════════════════════════════
// ModuleRouter — hash routing for iframe-safety.
// Built sections use lazy() so each section is its own chunk.
// To wire a later section: lazy-import it and swap <Placeholder />.
// ═══════════════════════════════════════════════════════════════════
import React, { lazy, Suspense } from 'react';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import ModuleShell from '@/components/ModuleShell/ModuleShell';
import Placeholder from '@/components/Placeholder/Placeholder';

const OpeningSection  = lazy(() => import('@/sections/01-opening'));
const TheorySection   = lazy(() => import('@/sections/02-theory'));
const ReverseSection  = lazy(() => import('@/sections/03-reverse'));
const BreakSection    = lazy(() => import('@/sections/04-break'));
const PracticeSection = lazy(() => import('@/sections/05-practice'));
const SharedSection   = lazy(() => import('@/sections/06-shared'));
const QuizSection     = lazy(() => import('@/sections/07-quiz'));

const withSuspense = (el: React.ReactNode) => (
  <Suspense fallback={null}>{el}</Suspense>
);

const router = createHashRouter([
  {
    path: '/',
    element: <ModuleShell />,
    children: [
      { index: true, element: <Navigate to="/opening" replace /> },
      { path: 'opening',  element: withSuspense(<OpeningSection />) },
      { path: 'theory',   element: withSuspense(<TheorySection  />) },
      { path: 'reverse',  element: withSuspense(<ReverseSection />) },
      { path: 'break',    element: withSuspense(<BreakSection   />) },
      { path: 'practice', element: withSuspense(<PracticeSection />) },
      { path: 'shared',   element: withSuspense(<SharedSection   />) },
      { path: 'quiz',     element: withSuspense(<QuizSection     />) },
      { path: 'closing',  element: <Placeholder id="closing"  /> },
      { path: '*',        element: <Navigate to="/opening" replace /> },
    ],
  },
]);

const ModuleRouter: React.FC = () => <RouterProvider router={router} />;
export default ModuleRouter;
'@

Write-Host ""
Write-Host "Done. Vite HMR will reload." -ForegroundColor Cyan
