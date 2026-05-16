// ═══════════════════════════════════════════════════════════════════
// StationDetails — 5 expanded cards, one per stage.
// Ordered by PLAN ORDER (evaluate first, engage last) to reinforce
// the reverse-planning concept.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { STAGES_IN_PLAN_ORDER } from '@/data/sections';
import styles from './StationDetails.module.scss';

const StationDetails: React.FC = () => (
  <section className={styles.section}>
    <header className={styles.head}>
      <span className={styles.tag}>חמש תחנות. חמישה פרומפטים.</span>
      <h3 className={styles.title}>מה שואלים את ה-AI בכל שלב</h3>
      <p className={styles.sub}>
        בסדר תכנון — מההערכה אל ההצתה. כל כרטיס הוא פרומפט אחד.
      </p>
    </header>

    <ol className={styles.grid}>
      {STAGES_IN_PLAN_ORDER.map(s => (
        <li key={s.key} className={styles.card}>
          <header className={styles.cardHead}>
            <span className={styles.planNum}>תכנון #{s.planOrder}</span>
            <span className={styles.sym} aria-hidden>{s.symbol}</span>
            <h4 className={styles.cardTitle}>
              {s.nameHe}
              <span className={styles.cardEn}>· {s.nameEn}</span>
            </h4>
            <span className={styles.deliveryNum}>שלב {s.number} בשיעור</span>
          </header>

          <div className={styles.block}>
            <span className={styles.blockLabel}>השאלה שתשאלו את ה-AI</span>
            <p className={styles.q}>{s.promptQuestion}</p>
          </div>

          <div className={styles.block}>
            <span className={styles.blockLabel}>מה ה-AI מחזיר</span>
            <p className={styles.p}>{s.produces}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default StationDetails;