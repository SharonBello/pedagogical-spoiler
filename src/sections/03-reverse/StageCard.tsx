// ═══════════════════════════════════════════════════════════════════
// StageCard — one of the 5 reverse-engineering steps.
// Renders: header · filled prompt (4 parts) · output.
// Output has three modes — rubric+questions (evaluate), or body bullets (others).
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import type { ReverseStage } from '@/data/reverseDemo';
import styles from './StageCard.module.scss';

interface Props {
  stage: ReverseStage;
}

const PROMPT_PARTS: Array<[keyof ReverseStage['prompt'], string]> = [
  ['role',    'תפקיד'],
  ['context', 'קשר'],
  ['task',    'משימה'],
  ['format',  'פורמט'],
];

const StageCard: React.FC<Props> = ({ stage }) => {
  const isFirst = stage.planOrder === 1;
  const isLast  = stage.planOrder === 5;
  const { rubric, questions, body } = stage.output;

  return (
    <article className={`${styles.card} ${isFirst ? styles.cardFirst : ''} ${isLast ? styles.cardLast : ''}`}>
      {/* HEADER */}
      <header className={styles.head}>
        <span className={styles.planBadge}>תכנון #{stage.planOrder}</span>
        <span className={styles.symbol} aria-hidden>{stage.symbol}</span>
        <h4 className={styles.title}>
          {stage.nameHe}
          <span className={styles.titleEn}>· {stage.nameEn}</span>
        </h4>
        <span className={styles.deliveryNote}>
          {isLast ? 'בשיעור: שלב 1 (פתיחה)' : `בשיעור: שלב ${stage.deliveryOrder}`}
        </span>
      </header>

      {/* PROMPT */}
      <section className={styles.block}>
        <header className={styles.blockHead}>
          <span className={styles.blockLabel}>הפרומפט</span>
          <span className={styles.blockMeta}>4 חלקים · גבעת חלפון</span>
        </header>
        <dl className={styles.prompt}>
          {PROMPT_PARTS.map(([key, label]) => (
            <div key={key} className={styles.promptRow}>
              <dt className={styles.promptKey}>{label}</dt>
              <dd className={styles.promptVal}>{stage.prompt[key]}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* OUTPUT */}
      <section className={styles.block}>
        <header className={styles.blockHead}>
          <span className={`${styles.blockLabel} ${styles.blockLabelOut}`}>הפלט מה-AI</span>
          <span className={styles.blockMeta}>{stage.output.summary}</span>
        </header>

        {/* Rubric table (evaluate stage only) */}
        {rubric && (
          <figure className={styles.rubricWrap}>
            <table className={styles.rubric}>
              <thead>
                <tr>
                  <th scope="col" className={styles.rubricCorner}>קריטריון</th>
                  {rubric.levels.map(l => (
                    <th key={l.label} scope="col" className={styles.rubricLevel}>
                      <span className={styles.rubricLevelLabel}>{l.label}</span>
                      <span className={styles.rubricLevelPts}>{l.points}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rubric.criteria.map(c => (
                  <tr key={c.name}>
                    <th scope="row" className={styles.rubricCriterion}>{c.name}</th>
                    {c.descriptions.map((d, i) => (
                      <td key={i} className={styles.rubricCell}>{d}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={rubric.levels.length + 1} className={styles.rubricTotal}>
                    סה״כ: {rubric.totalPoints} נקודות
                  </td>
                </tr>
              </tfoot>
            </table>
          </figure>
        )}

        {/* Sample questions (evaluate stage only) */}
        {questions && questions.length > 0 && (
          <div className={styles.questions}>
            <span className={styles.questionsLabel}>שאלות לדוגמה</span>
            <ul className={styles.questionList}>
              {questions.map((q, i) => (
                <li key={i} className={styles.questionItem}>
                  <span className={`${styles.qBadge} ${styles[`qBadge-${q.level}`]}`}>{q.level}</span>
                  <span className={styles.qText}>{q.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Body bullets (non-evaluate stages) */}
        {body && body.length > 0 && (
          <ul className={styles.output}>
            {body.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
};

export default StageCard;