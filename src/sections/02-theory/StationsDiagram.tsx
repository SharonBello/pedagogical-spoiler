// ═══════════════════════════════════════════════════════════════════
// StationsDiagram — the visual centerpiece of M03.
// 5 stations laid out LTR in delivery order (engage left → evaluate right).
// Above: red planning arrow pointing LEFT (matches Hebrew reading direction).
// Below: blue delivery arrow pointing RIGHT (against natural reading).
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { STAGES_IN_DELIVERY_ORDER } from '@/data/sections';
import styles from './StationsDiagram.module.scss';

const StationsDiagram: React.FC = () => (
  <section className={styles.diagram}>
    <header className={styles.head}>
      <h3 className={styles.title}>המסלול — ושני כיוונים</h3>
      <p className={styles.sub}>
        אותן חמש תחנות. שני כיוונים שונים. <strong>תכנון</strong> זורם מימין לשמאל — כיוון
        הקריאה הטבעי בעברית. <strong>השיעור</strong> זורם משמאל לימין — נגד הזרם.
      </p>
    </header>

    {/* The diagram is forced LTR so engage sits LEFT and evaluate RIGHT.
        In Hebrew RTL reading, the eye then naturally moves RIGHT→LEFT
        across the stations — which IS the planning order. */}
    <div className={styles.frame}>

      {/* PLANNING ARROW — points left, matches Hebrew reading direction */}
      <div className={styles.planArrow}>
        <span className={styles.planLine} />
        <span className={styles.planLabel}>← כיוון התכנון</span>
      </div>

      {/* 5 STATION CARDS */}
      <ol className={styles.stations}>
        {STAGES_IN_DELIVERY_ORDER.map(s => (
          <li
            key={s.key}
            className={`${styles.station} ${s.planOrder === 1 ? styles.first : ''}`}
          >
            <span className={styles.sym} aria-hidden>{s.symbol}</span>
            <span className={styles.deliveryNum}>שלב {s.number}</span>
            <span className={styles.he}>{s.nameHe}</span>
            <span className={styles.en}>{s.nameEn}</span>
            <span className={styles.planBadge}>תכנון #{s.planOrder}</span>
          </li>
        ))}
      </ol>

      {/* DELIVERY ARROW — points right, against natural reading */}
      <div className={styles.deliveryArrow}>
        <span className={styles.deliveryLabel}>כיוון השיעור →</span>
        <span className={styles.deliveryLine} />
      </div>
    </div>

    <p className={styles.annot}>
      <span className={styles.annotIcon}>✎</span>
      התחנה עם המסגרת האדומה — <strong>הערכה</strong> — היא <strong>הראשונה בתכנון</strong>.
      שם מתחיל הפרומפט הראשון של ה-AI.
    </p>
  </section>
);

export default StationsDiagram;