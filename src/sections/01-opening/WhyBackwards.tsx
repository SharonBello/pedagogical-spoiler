// ═══════════════════════════════════════════════════════════════════
// WhyBackwards — the pedagogical "why" for reverse planning.
// Three insights, then a nod to Wiggins & McTighe's Understanding by Design.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { TbTarget, TbBulb, TbCompass } from 'react-icons/tb';
import styles from './WhyBackwards.module.scss';

const INSIGHTS = [
  {
    Icon: TbTarget,
    title: 'הסוף הוא העוגן',
    text: 'כשאנחנו מתחילים מההערכה, אנחנו יודעים בדיוק מה התלמיד צריך להוכיח. כל החלטה אחרת זורמת מזה — בלי ניחושים.',
  },
  {
    Icon: TbBulb,
    title: 'AI עובד טוב יותר מהסוף',
    text: 'פרומפט "תכין לי שיעור" יחזיר אוסף רעיונות גנריים. פרומפט "תכין לי מחוון להוכחת X" יחזיר משהו ספציפי, חד ושמיש.',
  },
  {
    Icon: TbCompass,
    title: 'הפתיחה לא קודמת',
    text: 'הפתיחה הטובה ביותר היא זו שמרמזת על הסוף. אם לא יודעים מה הסוף — הפתיחה היא ירייה באפלה.',
  },
] as const;

const WhyBackwards: React.FC = () => (
  <section className={styles.section}>
    <header className={styles.head}>
      <span className={styles.tag}>למה לאחור?</span>
      <h3 className={styles.title}>שלוש סיבות לכלול את הסוף בהתחלה</h3>
    </header>

    <ul className={styles.list}>
      {INSIGHTS.map(({ Icon, title, text }) => (
        <li key={title} className={styles.item}>
          <span className={styles.iconWrap}>
            <Icon aria-hidden />
          </span>
          <div className={styles.body}>
            <h4 className={styles.itemTitle}>{title}</h4>
            <p className={styles.itemText}>{text}</p>
          </div>
        </li>
      ))}
    </ul>

    <p className={styles.cite}>
      <span className={styles.citeMono}>UbD</span>
      <span>Wiggins &amp; McTighe (1998) — Understanding by Design</span>
    </p>
  </section>
);

export default WhyBackwards;