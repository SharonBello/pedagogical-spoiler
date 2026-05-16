// ═══════════════════════════════════════════════════════════════════
// ClosingHero — celebratory header for Section 8.
// Shows what the teacher built: their topic, their quiz score,
// and the module-complete count (8/8).
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { TbConfetti } from 'react-icons/tb';
import { useProgressCtx } from '@/components/ModuleShell/ModuleProgressContext';
import { QUIZ_QUESTIONS } from '@/data/quizData';
import styles from './ClosingHero.module.scss';

const ClosingHero: React.FC = () => {
  const { progress } = useProgressCtx();
  const topic = progress.customTopic;
  const quizScore = progress.quizScore;
  const quizTotal = QUIZ_QUESTIONS.length;

  return (
    <section className={styles.hero}>
      <div className={styles.icon} aria-hidden><TbConfetti /></div>

      <div className={styles.body}>
        <span className={styles.eyebrow}>סיימתם · חלק 8 מתוך 8</span>
        <h2 className={styles.title}>יצאתם עם מערך שיעור</h2>
        <p className={styles.lede}>
          בנינו מערך שלם <strong>לאחור</strong> — מהמחוון אל הפתיח. עכשיו זה
          שלכם: הדביקו את התוצרים מ-AI לתבנית למטה, ייצאו ל-PDF, וקחו לכיתה.
        </p>

        {/* Stats grid */}
        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt>חלקים הושלמו</dt>
            <dd>8 <span>/ 8</span></dd>
          </div>
          {quizScore !== null && quizScore !== undefined && (
            <div className={styles.stat}>
              <dt>ציון במבחן</dt>
              <dd>{quizScore} <span>/ {quizTotal}</span></dd>
            </div>
          )}
          {topic?.topic && (
            <div className={`${styles.stat} ${styles.statWide}`}>
              <dt>הנושא שבחרתם</dt>
              <dd className={styles.statText}>{topic.topic}</dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
};

export default ClosingHero;