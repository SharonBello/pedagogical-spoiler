// ═══════════════════════════════════════════════════════════════════
// Placeholder — temporary stand-in for sections still being built.
// Each phase replaces one of these with real content.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import SectionShell from '@/components/SectionShell/SectionShell';
import type { SectionId } from '@/types/module.types';
import styles from './Placeholder.module.scss';

interface Props {
  id: SectionId;
  phaseNote?: string;
}

const Placeholder: React.FC<Props> = ({ id, phaseNote = 'בבנייה' }) => (
  <SectionShell id={id}>
    <div className={styles.placeholder}>
      <div className={styles.stamp}>{phaseNote}</div>
      <p className={styles.note}>
        החלק הזה ייבנה בשלבים הבאים של הסקופולד.
        השלד של המסך, הניווט, סרגל ההתקדמות וה-localStorage כבר עובדים.
      </p>
    </div>
  </SectionShell>
);

export default Placeholder;
