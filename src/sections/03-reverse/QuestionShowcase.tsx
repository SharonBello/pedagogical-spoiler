// ═══════════════════════════════════════════════════════════════════
// QuestionShowcase — "Exhibit A". The bagrut/test question we start from.
// Accepts the selected demo's meta as a prop.
// Handles both English (LTR) and Hebrew (RTL) question text.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import type { ReverseDemoMeta } from '@/data/reverseDemo';
import styles from './QuestionShowcase.module.scss';

interface Props {
  meta: ReverseDemoMeta;
}

const QuestionShowcase: React.FC<Props> = ({ meta }) => (
  <section className={styles.section}>
    <header className={styles.intro}>
      <span className={styles.tag}>הנדסה הפוכה · דוגמה חיה</span>
      <h3 className={styles.title}>שאלה אחת. שיעור שלם. בהיפוך.</h3>
      <p className={styles.lede}>
        ניקח שאלה אמיתית — אחת. נפעיל עליה את 5 הפרומפטים בסדר תכנון
        (הערכה ← הצתה). בסוף, יהיה לנו שיעור שלם שעובד לאחור משאלת ההערכה.
      </p>
    </header>

    <article className={styles.card}>
      <div className={styles.stamp}>{meta.questionStamp}</div>

      <div className={styles.meta}>
        <span>{meta.subject}</span>
        <span aria-hidden>·</span>
        <span>{meta.level}</span>
        <span aria-hidden>·</span>
        <span>כיתה {meta.grade}</span>
        <span aria-hidden>·</span>
        <span className={styles.metaText}>{meta.textTitle}</span>
      </div>

      <blockquote
        className={styles.question}
        dir={meta.questionLang === 'en' ? 'ltr' : 'rtl'}
      >
        {meta.question}
      </blockquote>

      {meta.questionHe && (
        <p className={styles.questionHe}>{meta.questionHe}</p>
      )}
    </article>

    <p className={styles.bridge}>
      <span className={styles.bridgeBadge}>השלב הבא</span>
      בדיוק כמו שלמדנו בתיאוריה — נתחיל מ<strong>הערכה</strong> (תכנון #1).
      נשאל את ה-AI איך נדע שתלמיד הצליח לענות על השאלה הזאת.
    </p>
  </section>
);

export default QuestionShowcase;