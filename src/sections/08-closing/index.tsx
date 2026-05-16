// ═══════════════════════════════════════════════════════════════════
// Section 08 — סיכום (Closing · 10 min)
// Celebratory hero · fillable lesson-plan canvas with PDF export ·
// final commitment card with "module complete" button.
// ═══════════════════════════════════════════════════════════════════
import React, { useEffect, useState } from 'react';
import { TbCheck, TbAward } from 'react-icons/tb';
import SectionShell from '@/components/SectionShell/SectionShell';
import { useProgressCtx } from '@/components/ModuleShell/ModuleProgressContext';
import ClosingHero from './ClosingHero';
import LessonPlanCanvas from './LessonPlanCanvas';
import styles from './index.module.scss';

const COMMIT_KEY = 'binai.m03.commit.v1';

const loadCommit = (): string => {
  try { return localStorage.getItem(COMMIT_KEY) ?? ''; } catch { return ''; }
};

const ClosingSection: React.FC = () => {
  const { progress, complete } = useProgressCtx();
  const [commitment, setCommitment] = useState(loadCommit);
  const isComplete = progress.sections.closing?.completed === true;

  useEffect(() => {
    try { localStorage.setItem(COMMIT_KEY, commitment); } catch {}
  }, [commitment]);

  const handleFinish = () => complete('closing');

  return (
    <SectionShell id="closing">
      <ClosingHero />

      <LessonPlanCanvas />

      {/* TAKEAWAY CARD */}
      <section className={styles.takeaway}>
        <header className={styles.takeawayHead}>
          <span className={styles.tag}>המחויבות שלי</span>
          <h3 className={styles.takeawayTitle}>מה אני באמת לוקח לכיתה</h3>
          <p className={styles.takeawayLede}>
            דבר אחד שאתם מתחייבים לעצמכם — לא לחבריכם, לא למפקח —
            <strong> לעצמכם</strong>. שורה אחת.
          </p>
        </header>

        <textarea
          className={styles.commitInput}
          value={commitment}
          onChange={e => setCommitment(e.target.value)}
          placeholder="הפעם הבאה שאני מתכנן שיעור, אני אתחיל מ..."
          rows={2}
        />

        {/* Finish button */}
        <div className={styles.finishRow}>
          {isComplete ? (
            <span className={styles.finishDone}>
              <TbAward aria-hidden />
              <span>השתלמות הושלמה · כל הכבוד!</span>
            </span>
          ) : (
            <button type="button" className={styles.finishBtn} onClick={handleFinish}>
              <TbCheck aria-hidden />
              <span>סיימתי את ההשתלמות</span>
            </button>
          )}
        </div>
      </section>
    </SectionShell>
  );
};

export default ClosingSection;