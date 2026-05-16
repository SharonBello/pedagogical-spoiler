// ═══════════════════════════════════════════════════════════════════
// ShareProtocol — the in-class structure for the 20-min share.
// Three steps: pair up · share · feedback.
// Two columns: "כשאתם משתפים" vs. "כשאתם מקשיבים".
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { TbUsers, TbMessageCircle, TbEar } from 'react-icons/tb';
import styles from './ShareProtocol.module.scss';

const STEPS = [
  {
    Icon: TbUsers,
    label: 'דונו בשלשות',
    time: '1 דק׳',
  },
  {
    Icon: TbMessageCircle,
    label: 'כל אחד משתף את המערך',
    time: '5 דק׳ × 3',
  },
  {
    Icon: TbEar,
    label: 'פידבק קצר מכל מאזין',
    time: '2 דק׳ × 3',
  },
];

const SHARE_PROMPTS = [
  'הצגת הנושא והרמה — מה לימדתם בפועל?',
  'הפתיח (Engage) — 2 דקות לתאר מה התלמידים יראו ראשון',
  'הקפיצה לסוף — איך המחוון הכתיב את כל השאר',
  'רגע מפתיע מה-AI — מתי הוא לקח אתכם למקום לא צפוי?',
  'מה אתם הכי גאים בו במערך',
];

const LISTEN_PROMPTS = [
  { icon: '🌱', label: 'דבר שעבד היטב', text: '"שמתי לב ש..."' },
  { icon: '🔧', label: 'שאלה לחשיבה',    text: '"שקלת אם..."' },
  { icon: '💡', label: 'קישור לכיתה שלי', text: '"במקצוע שלי זה היה..."' },
];

const ShareProtocol: React.FC = () => (
  <section className={styles.section}>
    {/* INTRO */}
    <header className={styles.intro}>
      <span className={styles.tag}>שיתוף וחזרה</span>
      <h3 className={styles.title}>חמש דקות לכל אחד. עיניים נוספות על המערך.</h3>
      <p className={styles.lede}>
        עכשיו תקבלו את הדבר הכי שווה בהשתלמות הזאת:{' '}
        <strong>זווית חיצונית</strong> על מה שבניתם — וזה גם הדבר הכי שווה
        שתתנו לעמית. הקשיבו טוב, תנו פידבק קצר, וקחו רעיון אחד הביתה.
      </p>
    </header>

    {/* TIMELINE — 3 steps */}
    <ol className={styles.steps}>
      {STEPS.map((s, i) => (
        <li key={s.label} className={styles.step}>
          <span className={styles.stepNum}>{i + 1}</span>
          <span className={styles.stepIcon} aria-hidden><s.Icon /></span>
          <span className={styles.stepLabel}>{s.label}</span>
          <span className={styles.stepTime}>{s.time}</span>
        </li>
      ))}
    </ol>

    {/* TWO-COLUMN: SHARE vs. LISTEN */}
    <div className={styles.cols}>
      {/* Sharer column */}
      <article className={styles.col}>
        <header className={styles.colHead}>
          <span className={styles.colTag}>כשאתם משתפים</span>
          <h4 className={styles.colTitle}>5 דקות · המערך שלכם</h4>
        </header>
        <ol className={styles.shareList}>
          {SHARE_PROMPTS.map((p, i) => (
            <li key={i}>
              <span className={styles.shareBullet}>{i + 1}</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      </article>

      {/* Listener column */}
      <article className={`${styles.col} ${styles.colListen}`}>
        <header className={styles.colHead}>
          <span className={styles.colTag}>כשאתם מקשיבים</span>
          <h4 className={styles.colTitle}>2 דקות · פידבק לכל משתף</h4>
        </header>
        <ul className={styles.listenList}>
          {LISTEN_PROMPTS.map((p, i) => (
            <li key={i}>
              <span className={styles.listenIcon} aria-hidden>{p.icon}</span>
              <div className={styles.listenBody}>
                <span className={styles.listenLabel}>{p.label}</span>
                <span className={styles.listenText}>{p.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </div>
  </section>
);

export default ShareProtocol;