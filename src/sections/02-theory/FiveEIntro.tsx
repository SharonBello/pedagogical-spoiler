// ═══════════════════════════════════════════════════════════════════
// FiveEIntro — 30 seconds on what 5E is, then the flip.
// Mostly text. The visual centerpiece comes next in <StationsDiagram />.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { STAGES_IN_DELIVERY_ORDER } from '@/data/sections';
import styles from './FiveEIntro.module.scss';

const FiveEIntro: React.FC = () => (
  <section className={styles.intro}>
    <span className={styles.tag}>30 שניות על 5E</span>
    <h3 className={styles.title}>חמישה שלבים. כל שיעור.</h3>
    <p className={styles.lede}>
      מודל 5E הוא תקן בינלאומי לתכנון שיעורי חקר. בעברית: חמש "תחנות" שכל שיעור עובר בהן ברצף.
      בשלבי החקר זה נשמע מובן מאליו — אבל ה-AI לא יודע באיזה שלב הוא נמצא, אלא אם נגיד לו.
    </p>

    <ul className={styles.row}>
      {STAGES_IN_DELIVERY_ORDER.map(s => (
        <li key={s.key} className={styles.chip}>
          <span className={styles.chipNum}>{s.number}</span>
          <span className={styles.chipHe}>{s.nameHe}</span>
          <span className={styles.chipEn}>{s.nameEn}</span>
        </li>
      ))}
    </ul>

    <div className={styles.flip}>
      <span className={styles.flipBadge}>אבל יש מהפך</span>
      <p>
        בקלאסיקה, מורים מתכננים את <strong>הצתה ראשונה</strong> ואת ההערכה אחרונה — אם בכלל.
        אנחנו <strong>נהפוך את הסדר</strong>: מהערכה (תכנון #1) ועד הצתה (תכנון #5).
      </p>
    </div>
  </section>
);

export default FiveEIntro;