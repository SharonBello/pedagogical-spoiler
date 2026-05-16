// ═══════════════════════════════════════════════════════════════════
// ReverseStepper — vertical chain of all 5 stages in PLAN order.
// Accepts the selected demo's stages as a prop.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import type { ReverseStage } from '@/data/reverseDemo';
import StageCard from './StageCard';
import styles from './ReverseStepper.module.scss';

interface Props {
  stages: ReverseStage[];
}

const ReverseStepper: React.FC<Props> = ({ stages }) => (
  <section className={styles.stepper} aria-label="5 שלבי תכנון בסדר הפוך">
    {stages.map((stage, i) => (
      <div key={stage.stageKey} className={styles.row}>
        <StageCard stage={stage} />
        {i < stages.length - 1 && (
          <div className={styles.connector} aria-hidden>
            <span className={styles.connectorLine} />
            <span className={styles.connectorTip} />
          </div>
        )}
      </div>
    ))}
  </section>
);

export default ReverseStepper;