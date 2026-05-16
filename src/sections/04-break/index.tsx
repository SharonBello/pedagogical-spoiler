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