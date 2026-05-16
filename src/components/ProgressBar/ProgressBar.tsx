// ═══════════════════════════════════════════════════════════════════
// ProgressBar — fixed at top, shows % through the module.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import styles from './ProgressBar.module.scss';

interface Props {
  percent: number;     // 0..100
}

const ProgressBar: React.FC<Props> = ({ percent }) => (
  <div className={styles.wrap} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
    <div className={styles.fill} style={{ width: `${percent}%` }} />
  </div>
);

export default ProgressBar;
