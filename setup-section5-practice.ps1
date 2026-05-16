# ════════════════════════════════════════════════════════════════
# setup-section5-practice.ps1
# Wires Section 4 (Break — fix only) + Section 5 (Practice — full build).
# Run from project root: PS> .\setup-section5-practice.ps1
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

Write-Host "Writing Section 5 + Break fix..." -ForegroundColor Cyan
Write-Host ""

W 'src/sections/04-break/BreakReflection.tsx' @'
// ═══════════════════════════════════════════════════════════════════
// BreakReflection — 3 short reflection prompts for the teacher to
// chew on during the 15-minute break. Conversational tone.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import styles from './BreakReflection.module.scss';

const PROMPTS = [
  {
    n: 1,
    title: 'איפה אתם בנושא?',
    text:
      'מה כבר מוכן? איזה חלק של המערך אתם הכי תקועים בו? איזה חלק תוכלו לבקש מה-AI לעזור לכם איתו?',
  },
  {
    n: 2,
    title: 'מה ההוכחה?',
    text:
      'אם תלמיד יידע את החומר באמת — איך נדע? איזו שאלת בגרות / מבחן / משימה הכי תוכיח זאת?',
  },
  {
    n: 3,
    title: 'מה הפתיח של ההתחלה?',
    text:
      'תחשבו על הסוף — מה התלמיד צריך לדעת בסיום השיעור. עכשיו דמיינו את ההתחלה: איזה רמז קטן אל הסוף יעורר את הסקרנות שלהם ב-2 הדקות הראשונות?',
  },
] as const;

const BreakReflection: React.FC = () => (
  <section className={styles.section}>
    <header className={styles.head}>
      <span className={styles.tag}>זמן לחשוב</span>
      <h3 className={styles.title}>3 שאלות להפסקה</h3>
      <p className={styles.sub}>
        לא צריך לכתוב — רק לחשוב. נחזור אליהן בתרגול.
      </p>
    </header>

    <ol className={styles.list}>
      {PROMPTS.map(p => (
        <li key={p.n} className={styles.card}>
          <span className={styles.num}>{p.n}</span>
          <div>
            <h4 className={styles.cardTitle}>{p.title}</h4>
            <p className={styles.cardText}>{p.text}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default BreakReflection;
'@

W 'src/data/practicePrompts.ts' @'
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
'@

W 'src/sections/05-practice/index.tsx' @'
// ═══════════════════════════════════════════════════════════════════
// Section 05 — תרגול (Practice · 50 min)
// Teachers run the 5 prompts on THEIR topic (set in Section 4).
// If no topic yet → empty-state card with link back to Break.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { Link } from 'react-router-dom';
import { TbArrowRight, TbBulb } from 'react-icons/tb';
import SectionShell from '@/components/SectionShell/SectionShell';
import { useProgressCtx } from '@/components/ModuleShell/ModuleProgressContext';
import { PRACTICE_PROMPTS, fillTemplate } from '@/data/practicePrompts';
import TopicDisplay from './TopicDisplay';
import PromptCard from './PromptCard';
import styles from './index.module.scss';

const PracticeSection: React.FC = () => {
  const { progress } = useProgressCtx();
  const topic = progress.customTopic;

  // ── EMPTY STATE: no topic yet → send them back to Break ──
  if (!topic || !topic.subject || !topic.grade || !topic.topic) {
    return (
      <SectionShell id="practice" canAdvance={false}>
        <section className={styles.empty}>
          <div className={styles.emptyIcon} aria-hidden><TbBulb /></div>
          <h3 className={styles.emptyTitle}>קודם — בחרו נושא משלכם</h3>
          <p className={styles.emptyText}>
            בחלק התרגול תריצו את 5 הפרומפטים על נושא שאתם מלמדים בפועל —
            כדי שתצאו עם <strong>מערך אמיתי</strong> לכיתה. חזרו להפסקה ומלאו את הטופס.
          </p>
          <Link to="/break" className={styles.emptyBtn}>
            <span>חזרה לחלק 4 · הפסקה</span>
            <TbArrowRight aria-hidden />
          </Link>
        </section>
      </SectionShell>
    );
  }

  // ── Normal state: show topic + 5 prompts ──
  return (
    <SectionShell id="practice">
      <TopicDisplay topic={topic} />

      <section className={styles.intro}>
        <span className={styles.introTag}>איך עובדים</span>
        <ol className={styles.introList}>
          <li>פתחו שיחה חדשה בכלי AI שלכם (ChatGPT / Claude / Gemini).</li>
          <li>העתיקו את הפרומפטים <strong>בסדר תכנון</strong> — מהמחוון אל הפתיח.</li>
          <li>השתמשו <strong>באותה שיחה</strong> — ה-AI זוכר את ההקשר בין הפרומפטים.</li>
          <li>שמרו את התוצרים — בחלק הבא נציג ונשתף.</li>
        </ol>
      </section>

      <ol className={styles.prompts}>
        {PRACTICE_PROMPTS.map(p => (
          <li key={p.stageKey} className={styles.promptItem}>
            <PromptCard
              prompt={p}
              filled={fillTemplate(p.template, topic)}
            />
          </li>
        ))}
      </ol>
    </SectionShell>
  );
};

export default PracticeSection;
'@

W 'src/sections/05-practice/index.module.scss' @'
// ── EMPTY STATE (no topic picked yet) ──────────────────────────
.empty {
  @include paper-surface;
  @include flex-col;
  align-items: center;
  gap: $space-4;
  padding: $space-8 $space-5;
  text-align: center;
  border-right: 4px solid $amber;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    @include blueprint-grid(20px);
    opacity: 0.4;
    pointer-events: none;
  }

  > * { position: relative; z-index: 1; }
}

.emptyIcon {
  @include flex-center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: $amber-pale;
  color: $amber-dark;
  font-size: 32px;
}

.emptyTitle {
  font-family: $font-display;
  font-size: $text-xl;
  font-weight: $weight-bold;
  color: $blueprint-dark;
}

.emptyText {
  font-size: $text-md;
  line-height: $leading-loose;
  color: $ink-soft;
  max-width: 520px;

  strong { color: $marker; font-weight: $weight-bold; }
}

.emptyBtn {
  @include flex-start;
  gap: $space-2;
  padding: $space-3 $space-5;
  background: $blueprint;
  color: $white;
  border-radius: $radius-md;
  font-weight: $weight-bold;
  font-size: $text-md;
  text-decoration: none;
  border: 1.5px solid $blueprint;
  transition: all $dur-fast $ease-out;

  &:hover {
    background: $blueprint-dark;
    border-color: $blueprint-dark;
    transform: translateY(-1px);
    box-shadow: $shadow-lift;
  }
}

// ── INTRO BLOCK ────────────────────────────────────────────────
.intro {
  @include paper-surface;
  padding: $space-4 $space-5;
  border-top: 3px solid $blueprint;
  @include flex-col;
  gap: $space-2;
}

.introTag {
  font-family: $font-mono;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: $amber-dark;
  text-transform: uppercase;
}

.introList {
  margin: 0;
  padding-inline-start: $space-5;
  @include flex-col;
  gap: $space-1;

  li {
    font-size: $text-sm;
    line-height: $leading-loose;
    color: $ink;

    strong { color: $marker; font-weight: $weight-bold; }
  }
}

// ── PROMPT LIST ────────────────────────────────────────────────
.prompts {
  list-style: none;
  margin: 0;
  padding: 0;
  @include flex-col;
  gap: $space-4;
}

.promptItem { display: block; }
'@

W 'src/sections/05-practice/TopicDisplay.tsx' @'
// ═══════════════════════════════════════════════════════════════════
// TopicDisplay — banner at the top of Section 5 showing the
// teacher's selected topic (subject · grade · topic).
// Includes a "change topic" link back to Section 4.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { Link } from 'react-router-dom';
import { TbEdit } from 'react-icons/tb';
import type { CustomTopic } from '@/types/module.types';
import styles from './TopicDisplay.module.scss';

interface Props {
  topic: CustomTopic;
}

const TopicDisplay: React.FC<Props> = ({ topic }) => (
  <section className={styles.banner}>
    <div className={styles.tagRow}>
      <span className={styles.tag}>הנושא שלכם</span>
      <Link to="/break" className={styles.edit} aria-label="שינוי הנושא">
        <TbEdit aria-hidden />
        <span>שינוי</span>
      </Link>
    </div>

    <dl className={styles.fields}>
      <div className={styles.field}>
        <dt>מקצוע</dt>
        <dd>{topic.subject}</dd>
      </div>
      <div className={styles.field}>
        <dt>נושא</dt>
        <dd>{topic.topic}</dd>
      </div>
      <div className={styles.field}>
        <dt>כיתה</dt>
        <dd>{topic.grade}</dd>
      </div>
      {topic.ageRange && (
        <div className={styles.field}>
          <dt>גיל</dt>
          <dd>{topic.ageRange}</dd>
        </div>
      )}
    </dl>
  </section>
);

export default TopicDisplay;
'@

W 'src/sections/05-practice/TopicDisplay.module.scss' @'
.banner {
  background: $blueprint-dark;
  color: $white;
  border-radius: $radius-lg;
  padding: $space-4 $space-5;
  position: relative;
  overflow: hidden;
  @include flex-col;
  gap: $space-3;

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
}

.tagRow { @include flex-between; }

.tag {
  font-family: $font-mono;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: $amber;
  text-transform: uppercase;
}

.edit {
  @include flex-start;
  gap: $space-1;
  font-size: $text-xs;
  font-family: $font-mono;
  color: $amber-light;
  text-decoration: none;
  padding: 4px $space-2;
  border-radius: $radius-sm;
  border: 1px solid rgba(232, 163, 58, 0.3);
  transition: all $dur-fast $ease-out;

  &:hover {
    background: rgba(232, 163, 58, 0.15);
    border-color: $amber;
    color: $amber;
  }
}

.fields {
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-3 $space-5;

  @include respond-to(md) { grid-template-columns: repeat(4, 1fr); }
}

.field {
  @include flex-col;
  gap: 2px;

  dt {
    font-family: $font-mono;
    font-size: 10px;
    color: $amber-light;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  dd {
    margin: 0;
    font-family: $font-display;
    font-size: $text-lg;
    font-weight: $weight-bold;
    color: $white;
    line-height: 1.2;
    word-break: break-word;
  }
}
'@

W 'src/sections/05-practice/PromptCard.tsx' @'
// ═══════════════════════════════════════════════════════════════════
// PromptCard — one of the 5 practice prompts.
// Shows: header · hint · filled 4-part prompt · copy button.
// Copies the full prompt as a single chunk for paste into AI tool.
// ═══════════════════════════════════════════════════════════════════
import React, { useState } from 'react';
import { TbCopy, TbCheck } from 'react-icons/tb';
import type { PracticePrompt } from '@/data/practicePrompts';
import { buildCopyText } from '@/data/practicePrompts';
import styles from './PromptCard.module.scss';

interface Props {
  prompt: PracticePrompt;
  filled: { role: string; context: string; task: string; format: string; };
}

const PARTS: Array<[keyof Props['filled'], string]> = [
  ['role',    'תפקיד'],
  ['context', 'קשר'],
  ['task',    'משימה'],
  ['format',  'פורמט'],
];

const PromptCard: React.FC<Props> = ({ prompt, filled }) => {
  const [copied, setCopied] = useState(false);
  const isFirst = prompt.planOrder === 1;
  const isLast  = prompt.planOrder === 5;

  const handleCopy = async () => {
    const text = buildCopyText(filled);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback: select-all in a hidden textarea
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 2200); }
      catch { /* ignore */ }
      document.body.removeChild(ta);
    }
  };

  return (
    <article className={`${styles.card} ${isFirst ? styles.cardFirst : ''} ${isLast ? styles.cardLast : ''}`}>
      {/* HEADER */}
      <header className={styles.head}>
        <span className={styles.planBadge}>תכנון #{prompt.planOrder}</span>
        <span className={styles.symbol} aria-hidden>{prompt.symbol}</span>
        <h4 className={styles.title}>
          {prompt.nameHe}
          <span className={styles.titleEn}>· {prompt.nameEn}</span>
        </h4>
        <span className={styles.deliveryNote}>
          {isLast ? 'בשיעור: שלב 1 (פתיחה)' : `בשיעור: שלב ${prompt.deliveryOrder}`}
        </span>
      </header>

      {/* HINT */}
      <p className={styles.hint}>{prompt.hint}</p>

      {/* PROMPT BODY */}
      <dl className={styles.prompt}>
        {PARTS.map(([key, label]) => (
          <div key={key} className={styles.promptRow}>
            <dt className={styles.promptKey}>{label}</dt>
            <dd className={styles.promptVal}>{filled[key]}</dd>
          </div>
        ))}
      </dl>

      {/* COPY BUTTON */}
      <button
        type="button"
        className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`}
        onClick={handleCopy}
        aria-live="polite"
      >
        {copied ? <TbCheck aria-hidden /> : <TbCopy aria-hidden />}
        <span>{copied ? 'הועתק ללוח' : 'העתקת הפרומפט'}</span>
      </button>
    </article>
  );
};

export default PromptCard;
'@

W 'src/sections/05-practice/PromptCard.module.scss' @'
.card {
  @include paper-surface;
  padding: $space-4 $space-5;
  border-top: 4px solid $blueprint;
  @include flex-col;
  gap: $space-3;
}

.cardFirst {
  border-top: 4px solid $marker;
  box-shadow: $shadow-lift;
}

.cardLast { border-top: 4px solid $amber; }

// ── HEADER ─────────────────────────────────────────────────────
.head {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  gap: $space-3;
  padding-bottom: $space-3;
  border-bottom: $border-dash;
}

.planBadge {
  font-family: $font-mono;
  font-size: 11px;
  font-weight: $weight-medium;
  letter-spacing: 0.06em;
  background: $blueprint-pale;
  color: $blueprint-dark;
  padding: 3px $space-2;
  border-radius: $radius-sm;
}

.cardFirst .planBadge { background: $marker; color: $white; }
.cardLast .planBadge  { background: $amber; color: $amber-dark; }

.symbol { font-size: 24px; line-height: 1; }

.title {
  font-family: $font-display;
  font-weight: $weight-bold;
  font-size: $text-md;
  color: $blueprint-dark;
}

.titleEn {
  font-family: $font-mono;
  font-size: $text-sm;
  font-weight: $weight-normal;
  color: $ink-mute;
  margin-inline-start: $space-1;
}

.deliveryNote {
  font-family: $font-mono;
  font-size: 11px;
  color: $ink-mute;
  font-weight: $weight-medium;
  white-space: nowrap;
}

// ── HINT ───────────────────────────────────────────────────────
.hint {
  margin: 0;
  font-size: $text-sm;
  color: $ink-soft;
  line-height: $leading-loose;
  padding: $space-2 $space-3;
  background: $amber-pale;
  border-right: 3px solid $amber;
  border-radius: $radius-sm;
}

// ── PROMPT BODY ────────────────────────────────────────────────
.prompt {
  margin: 0;
  background: $paper-warm;
  border-right: 3px solid $blueprint-light;
  border-radius: $radius-sm;
  padding: $space-3 $space-4;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: $space-2 $space-3;
}

.promptRow { display: contents; }

.promptKey {
  font-family: $font-mono;
  font-size: 11px;
  font-weight: $weight-medium;
  color: $blueprint-dark;
  letter-spacing: 0.04em;
  align-self: start;
  padding-top: 2px;
}

.promptVal {
  margin: 0;
  font-size: $text-sm;
  line-height: $leading-body;
  color: $ink;
}

// ── COPY BUTTON ────────────────────────────────────────────────
.copyBtn {
  @include flex-center;
  @include focus-ring;
  gap: $space-2;
  align-self: flex-start;
  padding: $space-2 $space-4;
  background: $blueprint;
  color: $white;
  border: 1.5px solid $blueprint;
  border-radius: $radius-md;
  font-family: $font-body;
  font-size: $text-sm;
  font-weight: $weight-bold;
  cursor: pointer;
  transition: all $dur-fast $ease-out;

  svg { font-size: 18px; }

  &:hover {
    background: $blueprint-dark;
    border-color: $blueprint-dark;
    transform: translateY(-1px);
    box-shadow: $shadow-paper;
  }
}

.copyBtnDone {
  background: $success;
  border-color: $success;

  &:hover { background: $success; border-color: $success; }
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
      { path: 'shared',   element: <Placeholder id="shared"   /> },
      { path: 'quiz',     element: <Placeholder id="quiz"     /> },
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
