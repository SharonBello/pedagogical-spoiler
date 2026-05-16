// ═══════════════════════════════════════════════════════════════════
// Section 05 — תרגול (Practice · 50 min)
// Teachers run the 5 prompts on THEIR topic (set in Section 4).
// If no topic yet → empty-state card with link back to Break.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { Link } from 'react-router-dom';
import { TbArrowRight, TbBulb } from 'react-icons/tb';
import SectionShell from '@/components/SectionShell/SectionShell';
import { useProgressCtx } from '@/components/ModuleShell/ModuleProgressContext';
import { PRACTICE_PROMPTS, fillTemplate } from '@/data/practicePrompts';
import TopicDisplay from './TopicDisplay';
import PromptCard from './PromptCard';
import styles from './index.module.scss';

const PracticeSection: React.FC = () => {
  const { progress } = useProgressCtx();
  const topic = progress.customTopic;

  // ── EMPTY STATE: no topic yet → send them back to Break ──
  if (!topic || !topic.subject || !topic.grade || !topic.topic) {
    return (
      <SectionShell id="practice" canAdvance={false}>
        <section className={styles.empty}>
          <div className={styles.emptyIcon} aria-hidden><TbBulb /></div>
          <h3 className={styles.emptyTitle}>קודם — בחרו נושא משלכם</h3>
          <p className={styles.emptyText}>
            בחלק התרגול תריצו את 5 הפרומפטים על נושא שאתם מלמדים בפועל —
            כדי שתצאו עם <strong>מערך אמיתי</strong> לכיתה. חזרו להפסקה ומלאו את הטופס.
          </p>
          <Link to="/break" className={styles.emptyBtn}>
            <span>חזרה לחלק 4 · הפסקה</span>
            <TbArrowRight aria-hidden />
          </Link>
        </section>
      </SectionShell>
    );
  }

  // ── Normal state: show topic + 5 prompts ──
  return (
    <SectionShell id="practice">
      <TopicDisplay topic={topic} />

      <section className={styles.intro}>
        <span className={styles.introTag}>איך עובדים</span>
        <ol className={styles.introList}>
          <li>פתחו שיחה חדשה בכלי AI שלכם (ChatGPT / Claude / Gemini).</li>
          <li>העתיקו את הפרומפטים <strong>בסדר תכנון</strong> — מהמחוון אל הפתיח.</li>
          <li>השתמשו <strong>באותה שיחה</strong> — ה-AI זוכר את ההקשר בין הפרומפטים.</li>
          <li>שמרו את התוצרים — בחלק הבא נציג ונשתף.</li>
        </ol>
      </section>

      <ol className={styles.prompts}>
        {PRACTICE_PROMPTS.map(p => (
          <li key={p.stageKey} className={styles.promptItem}>
            <PromptCard
              prompt={p}
              filled={fillTemplate(p.template, topic)}
            />
          </li>
        ))}
      </ol>
    </SectionShell>
  );
};

export default PracticeSection;