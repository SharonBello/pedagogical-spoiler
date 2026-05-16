// ═══════════════════════════════════════════════════════════════════
// PromptFormulaRecap — the 4-part skeleton, split STAY vs CHANGE.
// Two parts (תפקיד + קשר) get written once and reused across all 5 prompts.
// Two parts (משימה + פורמט) change per 5E stage.
// One concrete example contrasts הערכה (planning #1) with הצתה (planning #5).
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import styles from './PromptFormulaRecap.module.scss';

const STAY = [
  { num: 1, key: 'תפקיד', desc: 'מומחה למקצוע + לרמת הכיתה (לדוגמה: "מומחה הוראת מתמטיקה ליסודי")' },
  { num: 2, key: 'קשר', desc: 'כיתה · נושא · רמת תלמידים (לדוגמה: "כיתה ד׳, שברים, גילאי 9-10")' },
] as const;

const CHANGE = [
  { num: 3, key: 'משימה', desc: 'הדבר היחיד שהשלב הזה צריך לייצר' },
  { num: 4, key: 'פורמט', desc: 'איך התוצר של השלב צריך להיראות' },
] as const;

const EXAMPLE = [
  {
    sym: '🎯',
    name: 'תכנון #1 · הערכה',
    task: 'צור מחוון לבדיקת רמת הידע וההבנה שנרכשו',
    format: 'טבלה: קריטריון × רמות + 2 שאלות',
  },
  {
    sym: '🎬',
    name: 'תכנון #5 · הצתה',
    task: 'צור פתיח של 2 דקות לתחילת השיעור',
    format: 'שאלה פתוחה + תמונה / סיפור קצר',
  },
] as const;

const PromptFormulaRecap: React.FC = () => (
  <section className={styles.section}>
    <header className={styles.head}>
      <span className={styles.tag}>השלד של הפרומפט</span>
      <h3 className={styles.title}>ארבעה חלקים. שניים קבועים. שניים מתחלפים.</h3>
      <p className={styles.sub}>
        בכל פרומפט שתפעילו תמצאו את אותם 4 חלקים. בפועל: שניים מהם{' '}
        <strong>תגדירו פעם אחת</strong> בתחילת השיעור, והם נשארים זהים בכל 5 הפרומפטים.
        השניים האחרים מתחלפים לפי השלב.
      </p>
    </header>

    {/* ── STAY row ── */}
    <div className={styles.row}>
      <header className={styles.rowHead}>
        <span className={`${styles.badge} ${styles.badgeStay}`}>STAY</span>
        <span className={styles.rowLabel}>
          נכתב <strong>פעם אחת</strong> בתחילת הסשן · משוכפל אוטומטית ל-5 הפרומפטים
        </span>
      </header>
      <ul className={styles.cards}>
        {STAY.map(p => (
          <li key={p.key} className={`${styles.card} ${styles.cardStay}`}>
            <span className={styles.num}>{p.num}</span>
            <span className={styles.key}>{p.key}</span>
            <span className={styles.desc}>{p.desc}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* ── CHANGE row ── */}
    <div className={styles.row}>
      <header className={styles.rowHead}>
        <span className={`${styles.badge} ${styles.badgeChange}`}>× 5</span>
        <span className={styles.rowLabel}>
          מתחלף בכל שלב 5E · אלה ה<strong>הבדלים</strong> בין 5 הפרומפטים
        </span>
      </header>
      <ul className={styles.cards}>
        {CHANGE.map(p => (
          <li key={p.key} className={`${styles.card} ${styles.cardChange}`}>
            <span className={styles.num}>{p.num}</span>
            <span className={styles.key}>{p.key}</span>
            <span className={styles.desc}>{p.desc}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* ── Concrete example: same role+context, different task+format ── */}
    <div className={styles.example}>
      <p className={styles.exampleHead}>
        דוגמה · אותו <strong>תפקיד + קשר</strong>. שונה במשימה ובפורמט.
      </p>
      <div className={styles.exampleGrid}>
        {EXAMPLE.map(e => (
          <article key={e.name} className={styles.exampleCol}>
            <header className={styles.exampleColHead}>
              <span className={styles.exampleSym} aria-hidden>{e.sym}</span>
              <span className={styles.exampleName}>{e.name}</span>
            </header>
            <div className={styles.exampleLine}>
              <span className={styles.exampleLab}>משימה</span>
              <span className={styles.exampleVal}>{e.task}</span>
            </div>
            <div className={styles.exampleLine}>
              <span className={styles.exampleLab}>פורמט</span>
              <span className={styles.exampleVal}>{e.format}</span>
            </div>
          </article>
        ))}
      </div>
    </div>

    <p className={styles.bottom}>(זוהי אותה נוסחה ארבע-חלקית שלמדתם במודול 02.)</p>
  </section>
);

export default PromptFormulaRecap;