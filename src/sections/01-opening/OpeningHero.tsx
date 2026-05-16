// ═══════════════════════════════════════════════════════════════════
// OpeningHero — the spoiler-stamp hero card.
// The opening visual of the entire module. Sets the metaphor:
// "Good TV writing starts with the finale. So does good lesson planning."
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import styles from './OpeningHero.module.scss';

const TAKEAWAYS = [
  { label: 'מה תקבלו', text: 'מערך MOE מלא ב-PDF' },
  { label: 'איך', text: '5 פרומפטים בסדר הפוך' },
  { label: 'על מי', text: '3 דוגמאות: יסודי · חט״ב · בגרות' },
] as const;

const OpeningHero: React.FC = () => (
  <section className={styles.hero}>
    <div className={styles.stamp}>SPOILER</div>

    <span className={styles.eyebrow}>M03 · המהפך</span>
    <h2 className={styles.title}>
      קודם הסוף.<br />אחר כך הסיפור.
    </h2>
    <p className={styles.lede}>
      סדרת טלוויזיה טובה נכתבת מהפרק האחרון אחורה. שיעור טוב — אותו דבר.
      במודול הזה נלמד לתכנן שיעור{' '}
      <strong>בכיוון הפוך</strong> — מההערכה אל ההצתה — עם AI שעוזר בכל שלב.
    </p>

    <ul className={styles.takeaways}>
      {TAKEAWAYS.map(t => (
        <li key={t.label} className={styles.pill}>
          <b>{t.label}</b>
          <span>{t.text}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default OpeningHero;