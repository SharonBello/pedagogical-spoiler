# ════════════════════════════════════════════════════════════════
# setup-gate-fix.ps1
# Gates Section 4's next button until the topic form is complete.
# Adds a warning hint + tooltip on the disabled button.
# Run from project root: PS> .\setup-gate-fix.ps1
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

Write-Host "Wiring Section 4 gate..." -ForegroundColor Cyan
Write-Host ""

W 'src/sections/04-break/index.tsx' @'
// ═══════════════════════════════════════════════════════════════════
// Section 04 — הפסקה (Break · 15 min)
// Friendly pause: timer · topic picker · reflection prompts.
// The "next" button is gated until the topic form is complete —
// otherwise the user would land in Section 5's empty state.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { TbAlertTriangle } from 'react-icons/tb';
import SectionShell from '@/components/SectionShell/SectionShell';
import { useProgressCtx } from '@/components/ModuleShell/ModuleProgressContext';
import BreakHero from './BreakHero';
import TopicPicker from './TopicPicker';
import BreakReflection from './BreakReflection';
import styles from './index.module.scss';

const BreakSection: React.FC = () => {
  const { progress } = useProgressCtx();
  const t = progress.customTopic;
  const canAdvance =
    !!t && !!t.subject.trim() && !!t.topic.trim() && !!t.grade.trim();

  return (
    <SectionShell id="break" canAdvance={canAdvance}>
      <BreakHero />
      <TopicPicker />
      <BreakReflection />

      {!canAdvance && (
        <aside className={styles.gate} role="status">
          <span className={styles.gateIcon} aria-hidden><TbAlertTriangle /></span>
          <span className={styles.gateText}>
            <strong>טופס הנושא טרם הושלם.</strong>{' '}
            כדי לעבור לחלק התרגול — חזרו לטופס למעלה (מקצוע · נושא · כיתה) ולחצו "שמירה והמשך לתרגול".
          </span>
        </aside>
      )}
    </SectionShell>
  );
};

export default BreakSection;
'@

W 'src/sections/04-break/index.module.scss' @'
// Gate hint shown when the topic form isn't complete — sits just
// above the SectionShell's prev/next nav.
.gate {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: $space-3;
  padding: $space-3 $space-4;
  background: lighten($marker, 45%);
  border: 1.5px solid $marker;
  border-radius: $radius-md;
  color: $marker-dark;
  margin-top: $space-3;
}

.gateIcon {
  @include flex-center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: $marker;
  color: $white;
  font-size: 18px;
  flex-shrink: 0;
}

.gateText {
  font-size: $text-sm;
  line-height: $leading-loose;

  strong {
    color: $marker-dark;
    font-weight: $weight-bold;
  }
}
'@

W 'src/components/SectionShell/SectionShell.tsx' @'
// ═══════════════════════════════════════════════════════════════════
// SectionShell — wraps each of the 8 sections with:
//   · A section header (number, title, subtitle, duration tag)
//   · The section content
//   · A footer with prev/next navigation
// Every section renders inside this wrapper.
// ═══════════════════════════════════════════════════════════════════
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TbArrowLeft, TbArrowRight, TbClock } from 'react-icons/tb';
import { useProgressCtx } from '@/components/ModuleShell/ModuleProgressContext';
import { SECTIONS, SECTION_BY_ID } from '@/data/sections';
import type { SectionId } from '@/types/module.types';
import styles from './SectionShell.module.scss';

interface Props {
  id: SectionId;
  children: React.ReactNode;
  /** Show the "next" button only after the user has engaged with the section. */
  canAdvance?: boolean;
}

const SectionShell: React.FC<Props> = ({ id, children, canAdvance = true }) => {
  const meta = SECTION_BY_ID[id];
  const { visit, complete } = useProgressCtx();
  const navigate = useNavigate();

  // Mark as visited the moment the section mounts.
  useEffect(() => { visit(id); }, [id, visit]);

  const idx = SECTIONS.findIndex(s => s.id === id);
  const prev = idx > 0 ? SECTIONS[idx - 1] : null;
  const next = idx < SECTIONS.length - 1 ? SECTIONS[idx + 1] : null;

  const handleNext = () => {
    complete(id);
    if (next) navigate(next.path);
  };

  return (
    <article className={styles.section}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.num}>חלק {meta.number}/8</span>
          <span className={styles.duration}>
            <TbClock aria-hidden /> {meta.duration} דק׳
          </span>
        </div>
        <h1 className={styles.title}>{meta.title}</h1>
        {meta.subtitle && <p className={styles.subtitle}>{meta.subtitle}</p>}
      </header>

      {/* CONTENT */}
      <div className={styles.content}>{children}</div>

      {/* FOOTER NAV */}
      <footer className={styles.footer}>
        {prev ? (
          <Link to={prev.path} className={styles.prev}>
            <TbArrowRight aria-hidden />
            <span>
              <span className={styles.navLabel}>חזרה</span>
              <span className={styles.navTitle}>{prev.number}. {prev.title}</span>
            </span>
          </Link>
        ) : <span />}

        {next && (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canAdvance}
            className={styles.next}
            title={!canAdvance ? 'יש להשלים את הפעולה הנדרשת בחלק הזה לפני המעבר הלאה' : undefined}
          >
            <span>
              <span className={styles.navLabel}>הבא</span>
              <span className={styles.navTitle}>{next.number}. {next.title}</span>
            </span>
            <TbArrowLeft aria-hidden />
          </button>
        )}
      </footer>
    </article>
  );
};

export default SectionShell;
'@

Write-Host ""
Write-Host "Done. Vite HMR will reload." -ForegroundColor Cyan
