// ═══════════════════════════════════════════════════════════════════
// BreakReflection — 3 short reflection prompts for the teacher to
// chew on during the 15-minute break. Conversational tone.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import styles from './BreakReflection.module.scss';

const PROMPTS = [
  {
    n: 1,
    title: 'איפה אתם בנושא?',
    text:
      'מה כבר מוכן? איזה חלק של המערך אתם הכי תקועים בו? איזה חלק תוכלו לבקש מה-AI לעזור לכם איתו?',
  },
  {
    n: 2,
    title: 'מה ההוכחה?',
    text:
      'אם תלמיד יידע את החומר באמת — איך נדע? איזו שאלת בגרות / מבחן / משימה הכי תוכיח זאת?',
  },
  {
    n: 3,
    title: 'מה הפתיח של ההתחלה?',
    text:
      'תחשבו על הסוף — מה התלמיד צריך לדעת בסיום השיעור. עכשיו דמיינו את ההתחלה: איזה רמז קטן אל הסוף יעורר את הסקרנות שלהם ב-2 הדקות הראשונות?',
  },
] as const;

const BreakReflection: React.FC = () => (
  <section className={styles.section}>
    <header className={styles.head}>
      <span className={styles.tag}>זמן לחשוב</span>
      <h3 className={styles.title}>3 שאלות להפסקה</h3>
      <p className={styles.sub}>
        לא צריך לכתוב — רק לחשוב. נחזור אליהן בתרגול.
      </p>
    </header>

    <ol className={styles.list}>
      {PROMPTS.map(p => (
        <li key={p.n} className={styles.card}>
          <span className={styles.num}>{p.n}</span>
          <div>
            <h4 className={styles.cardTitle}>{p.title}</h4>
            <p className={styles.cardText}>{p.text}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

export default BreakReflection;