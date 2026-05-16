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