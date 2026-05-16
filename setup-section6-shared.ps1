# ════════════════════════════════════════════════════════════════
# setup-section6-shared.ps1
# Section 6 (שיתוף) — sharing protocol + private notes.
# Run from project root: PS> .\setup-section6-shared.ps1
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

Write-Host "Writing Section 6..." -ForegroundColor Cyan
Write-Host ""

W 'src/sections/06-shared/index.tsx' @'
// ═══════════════════════════════════════════════════════════════════
// Section 06 — שיתוף (Shared · 20 min)
// In-class sharing protocol + private reflection notes.
// Pedagogical "second pair of eyes" on the teacher's lesson plan.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import SectionShell from '@/components/SectionShell/SectionShell';
import ShareProtocol from './ShareProtocol';
import PersonalNotes from './PersonalNotes';

const SharedSection: React.FC = () => (
  <SectionShell id="shared">
    <ShareProtocol />
    <PersonalNotes />
  </SectionShell>
);

export default SharedSection;
'@

W 'src/sections/06-shared/ShareProtocol.tsx' @'
// ═══════════════════════════════════════════════════════════════════
// ShareProtocol — the in-class structure for the 20-min share.
// Three steps: pair up · share · feedback.
// Two columns: "כשאתם משתפים" vs. "כשאתם מקשיבים".
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { TbUsers, TbMessageCircle, TbEar } from 'react-icons/tb';
import styles from './ShareProtocol.module.scss';

const STEPS = [
  {
    Icon: TbUsers,
    label: 'דונו בשלשות',
    time: '1 דק׳',
  },
  {
    Icon: TbMessageCircle,
    label: 'כל אחד משתף את המערך',
    time: '5 דק׳ × 3',
  },
  {
    Icon: TbEar,
    label: 'פידבק קצר מכל מאזין',
    time: '2 דק׳ × 3',
  },
];

const SHARE_PROMPTS = [
  'הצגת הנושא והרמה — מה לימדתם בפועל?',
  'הפתיח (Engage) — 2 דקות לתאר מה התלמידים יראו ראשון',
  'הקפיצה לסוף — איך המחוון הכתיב את כל השאר',
  'רגע מפתיע מה-AI — מתי הוא לקח אתכם למקום לא צפוי?',
  'מה אתם הכי גאים בו במערך',
];

const LISTEN_PROMPTS = [
  { icon: '🌱', label: 'דבר שעבד היטב', text: '"שמתי לב ש..."' },
  { icon: '🔧', label: 'שאלה לחשיבה',    text: '"שקלת אם..."' },
  { icon: '💡', label: 'קישור לכיתה שלי', text: '"במקצוע שלי זה היה..."' },
];

const ShareProtocol: React.FC = () => (
  <section className={styles.section}>
    {/* INTRO */}
    <header className={styles.intro}>
      <span className={styles.tag}>שיתוף וחזרה</span>
      <h3 className={styles.title}>חמש דקות לכל אחד. עיניים נוספות על המערך.</h3>
      <p className={styles.lede}>
        עכשיו תקבלו את הדבר הכי שווה בהשתלמות הזאת:{' '}
        <strong>זווית חיצונית</strong> על מה שבניתם — וזה גם הדבר הכי שווה
        שתתנו לעמית. הקשיבו טוב, תנו פידבק קצר, וקחו רעיון אחד הביתה.
      </p>
    </header>

    {/* TIMELINE — 3 steps */}
    <ol className={styles.steps}>
      {STEPS.map((s, i) => (
        <li key={s.label} className={styles.step}>
          <span className={styles.stepNum}>{i + 1}</span>
          <span className={styles.stepIcon} aria-hidden><s.Icon /></span>
          <span className={styles.stepLabel}>{s.label}</span>
          <span className={styles.stepTime}>{s.time}</span>
        </li>
      ))}
    </ol>

    {/* TWO-COLUMN: SHARE vs. LISTEN */}
    <div className={styles.cols}>
      {/* Sharer column */}
      <article className={styles.col}>
        <header className={styles.colHead}>
          <span className={styles.colTag}>כשאתם משתפים</span>
          <h4 className={styles.colTitle}>5 דקות · המערך שלכם</h4>
        </header>
        <ol className={styles.shareList}>
          {SHARE_PROMPTS.map((p, i) => (
            <li key={i}>
              <span className={styles.shareBullet}>{i + 1}</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </article>

      {/* Listener column */}
      <article className={`${styles.col} ${styles.colListen}`}>
        <header className={styles.colHead}>
          <span className={styles.colTag}>כשאתם מקשיבים</span>
          <h4 className={styles.colTitle}>2 דקות · פידבק לכל משתף</h4>
        </header>
        <ul className={styles.listenList}>
          {LISTEN_PROMPTS.map((p, i) => (
            <li key={i}>
              <span className={styles.listenIcon} aria-hidden>{p.icon}</span>
              <div className={styles.listenBody}>
                <span className={styles.listenLabel}>{p.label}</span>
                <span className={styles.listenText}>{p.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </div>
  </section>
);

export default ShareProtocol;
'@

W 'src/sections/06-shared/ShareProtocol.module.scss' @'
.section { @include flex-col; gap: $space-5; }

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

// ── TIMELINE — 3 steps ─────────────────────────────────────────
.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-2;

  @include respond-to(md) { grid-template-columns: repeat(3, 1fr); }
}

.step {
  @include paper-surface;
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  gap: $space-3;
  padding: $space-3 $space-4;
  border-top: 3px solid $blueprint;

  @include respond-to(md) {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    row-gap: $space-1;
  }
}

.stepNum {
  font-family: $font-mono;
  font-size: $text-md;
  font-weight: $weight-bold;
  background: $blueprint;
  color: $white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  @include flex-center;
  flex-shrink: 0;

  @include respond-to(md) { grid-row: 1 / 3; }
}

.stepIcon {
  font-size: 22px;
  color: $blueprint-dark;
  line-height: 1;

  @include respond-to(md) { display: none; }
}

.stepLabel {
  font-family: $font-display;
  font-weight: $weight-bold;
  color: $blueprint-dark;
  font-size: $text-sm;
  line-height: 1.3;

  @include respond-to(md) { font-size: $text-base; }
}

.stepTime {
  font-family: $font-mono;
  font-size: 11px;
  color: $amber-dark;
  font-weight: $weight-medium;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

// ── TWO-COLUMN — share vs. listen ──────────────────────────────
.cols {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-3;

  @include respond-to(md) { grid-template-columns: 1fr 1fr; }
}

.col {
  @include paper-surface;
  padding: $space-4 $space-5;
  border-top: 3px solid $blueprint;
}

.colListen {
  border-top-color: $amber;
}

.colHead {
  @include flex-col;
  gap: 4px;
  padding-bottom: $space-3;
  margin-bottom: $space-3;
  border-bottom: $border-dash;
}

.colTag {
  font-family: $font-mono;
  font-size: 10px;
  letter-spacing: 0.14em;
  color: $amber-dark;
  text-transform: uppercase;
}

.colListen .colTag { color: $amber-dark; }

.colTitle {
  font-family: $font-display;
  font-weight: $weight-bold;
  color: $blueprint-dark;
  font-size: $text-md;
}

// SHARE list (numbered)
.shareList {
  list-style: none;
  margin: 0;
  padding: 0;
  @include flex-col;
  gap: $space-2;

  li {
    @include flex-start;
    gap: $space-3;
    font-size: $text-sm;
    line-height: $leading-loose;
    color: $ink;
  }
}

.shareBullet {
  font-family: $font-mono;
  font-size: 11px;
  font-weight: $weight-bold;
  background: $blueprint-pale;
  color: $blueprint-dark;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  @include flex-center;
  flex-shrink: 0;
}

// LISTEN list (icons + labels)
.listenList {
  list-style: none;
  margin: 0;
  padding: 0;
  @include flex-col;
  gap: $space-3;

  li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: $space-3;
    align-items: start;
  }
}

.listenIcon {
  font-size: 22px;
  line-height: 1;
  margin-top: 2px;
}

.listenBody { @include flex-col; gap: 2px; }

.listenLabel {
  font-family: $font-display;
  font-weight: $weight-bold;
  color: $blueprint-dark;
  font-size: $text-sm;
}

.listenText {
  font-family: $font-mono;
  font-size: $text-sm;
  color: $amber-dark;
  font-style: italic;
}
'@

W 'src/sections/06-shared/PersonalNotes.tsx' @'
// ═══════════════════════════════════════════════════════════════════
// PersonalNotes — 3 short textareas for the teacher's takeaways.
// Saved to localStorage. Private — never sent anywhere.
// ═══════════════════════════════════════════════════════════════════
import React, { useEffect, useState } from 'react';
import { TbLock, TbCheck } from 'react-icons/tb';
import styles from './PersonalNotes.module.scss';

interface ShareNotes {
  surprised: string;
  changing: string;
  openQuestion: string;
}

const EMPTY: ShareNotes = { surprised: '', changing: '', openQuestion: '' };
const STORAGE_KEY = 'binai.m03.shareNotes.v1';

function load(): ShareNotes {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as ShareNotes;
    return { ...EMPTY, ...parsed };
  } catch { return EMPTY; }
}

const FIELDS: Array<{ key: keyof ShareNotes; label: string; placeholder: string }> = [
  {
    key: 'surprised',
    label: 'מה הפתיע אותי במערך של חבריי?',
    placeholder: 'משהו שלא חשבתי עליו · רעיון שאשאיל למחר · גישה שונה לאותו תוכן…',
  },
  {
    key: 'changing',
    label: 'מה אני משנה אחרי השיתוף — בעצמי?',
    placeholder: 'שלב במערך שלי שעובד טוב יותר אחרת · פרומפט שאעדן · הסבר שאקצר…',
  },
  {
    key: 'openQuestion',
    label: 'שאלה אחת שעלתה ולא הייתה לי תשובה',
    placeholder: 'מה לחקור · במה להתייעץ · מה לבחון בפעם הבאה…',
  },
];

const PersonalNotes: React.FC = () => {
  const [notes, setNotes] = useState<ShareNotes>(load);
  const [saved, setSaved] = useState(false);

  // Save on every change (debounced via setTimeout on the small flash).
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); } catch {}
    const hasAny = Object.values(notes).some(v => v.trim());
    if (hasAny) {
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 1400);
      return () => clearTimeout(t);
    }
  }, [notes]);

  const update = (key: keyof ShareNotes) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setNotes(n => ({ ...n, [key]: e.target.value }));

  return (
    <section className={styles.section}>
      <header className={styles.head}>
        <span className={styles.tag}>הרשימות שלכם</span>
        <h3 className={styles.title}>שלוש שאלות אישיות</h3>
        <p className={styles.privacy}>
          <TbLock aria-hidden />
          <span>פרטיות לחלוטין — נשמר רק בדפדפן שלכם, לא נשלח לשום שרת.</span>
        </p>
      </header>

      <div className={styles.fields}>
        {FIELDS.map(f => (
          <label key={f.key} className={styles.field}>
            <span className={styles.fieldLabel}>{f.label}</span>
            <textarea
              className={styles.textarea}
              value={notes[f.key]}
              onChange={update(f.key)}
              placeholder={f.placeholder}
              rows={3}
            />
          </label>
        ))}
      </div>

      <span
        className={`${styles.savedFlag} ${saved ? styles.savedFlagOn : ''}`}
        aria-live="polite"
      >
        <TbCheck aria-hidden />
        <span>נשמר</span>
      </span>
    </section>
  );
};

export default PersonalNotes;
'@

W 'src/sections/06-shared/PersonalNotes.module.scss' @'
.section {
  @include paper-surface;
  padding: $space-5;
  border-right: 4px solid $amber;
  position: relative;
  @include flex-col;
  gap: $space-4;
  margin-top: $space-3;
}

.head { @include flex-col; gap: $space-1; }

.tag {
  font-family: $font-mono;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: $amber-dark;
  text-transform: uppercase;
}

.title {
  font-family: $font-display;
  font-weight: $weight-bold;
  font-size: $text-xl;
  color: $blueprint-dark;
}

.privacy {
  @include flex-start;
  gap: $space-2;
  margin-top: $space-1;
  font-family: $font-mono;
  font-size: 11px;
  color: $ink-mute;

  svg { font-size: 14px; color: $blueprint; }
}

// ── FIELDS ─────────────────────────────────────────────────────
.fields {
  @include flex-col;
  gap: $space-4;
}

.field {
  @include flex-col;
  gap: $space-2;
}

.fieldLabel {
  font-family: $font-display;
  font-weight: $weight-bold;
  font-size: $text-md;
  color: $blueprint-dark;
}

.textarea {
  width: 100%;
  font-family: $font-body;
  font-size: $text-base;
  line-height: $leading-body;
  color: $ink;
  background: $paper;
  border: 1.5px solid $paper-line;
  border-radius: $radius-md;
  padding: $space-3 $space-4;
  resize: vertical;
  min-height: 72px;
  transition: border-color $dur-fast $ease-out, box-shadow $dur-fast $ease-out;

  &::placeholder {
    color: $ink-mute;
    font-style: italic;
  }

  &:focus {
    outline: none;
    border-color: $amber;
    box-shadow: 0 0 0 3px rgba($amber, 0.15);
    background: $white;
  }
}

// ── SAVED FLAG ─────────────────────────────────────────────────
.savedFlag {
  @include flex-start;
  gap: $space-1;
  align-self: flex-start;
  font-family: $font-mono;
  font-size: 11px;
  color: $success;
  background: rgba($success, 0.1);
  padding: 3px $space-2;
  border-radius: $radius-sm;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity $dur-fast $ease-out, transform $dur-fast $ease-out;
  pointer-events: none;

  svg { font-size: 14px; }
}

.savedFlagOn {
  opacity: 1;
  transform: translateY(0);
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
