// ═══════════════════════════════════════════════════════════════════
// QuizQuestion — one question card.
// Pre-submit: clickable options, selectable single answer.
// Post-submit: locked, shows ✓ / ✗ + the correct answer + explanation.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { TbCheck, TbX } from 'react-icons/tb';
import type { QuizQuestion as QuizQuestionType } from '@/data/quizData';
import styles from './QuizQuestion.module.scss';

interface Props {
  question: QuizQuestionType;
  questionNum: number;
  total: number;
  selectedId: string | null;
  submitted: boolean;
  onSelect: (optionId: string) => void;
}

const QuizQuestion: React.FC<Props> = ({
  question, questionNum, total, selectedId, submitted, onSelect,
}) => {
  const isCorrect = submitted && selectedId === question.correctId;
  const isWrong   = submitted && selectedId !== null && selectedId !== question.correctId;

  return (
    <article
      className={[
        styles.card,
        submitted && isCorrect && styles.cardCorrect,
        submitted && isWrong   && styles.cardWrong,
      ].filter(Boolean).join(' ')}
    >
      {/* HEADER */}
      <header className={styles.head}>
        <span className={styles.qNum}>שאלה {questionNum}/{total}</span>
        {submitted && (
          <span
            className={`${styles.verdict} ${isCorrect ? styles.verdictRight : styles.verdictWrong}`}
          >
            {isCorrect ? <TbCheck aria-hidden /> : <TbX aria-hidden />}
            <span>{isCorrect ? 'נכון' : 'לא נכון'}</span>
          </span>
        )}
      </header>

      <h4 className={styles.question}>{question.question}</h4>

      {/* OPTIONS */}
      <ul className={styles.options}>
        {question.options.map(opt => {
          const isSelected   = selectedId === opt.id;
          const isCorrectOpt = submitted && opt.id === question.correctId;
          const isWrongPick  = submitted && isSelected && opt.id !== question.correctId;

          return (
            <li key={opt.id}>
              <label
                className={[
                  styles.option,
                  isSelected && !submitted && styles.optionSelected,
                  isCorrectOpt && styles.optionCorrect,
                  isWrongPick && styles.optionWrong,
                  submitted && styles.optionLocked,
                ].filter(Boolean).join(' ')}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={opt.id}
                  checked={isSelected}
                  onChange={() => onSelect(opt.id)}
                  disabled={submitted}
                  className={styles.radio}
                />
                <span className={styles.optionDot} aria-hidden />
                <span className={styles.optionText}>{opt.text}</span>
                {isCorrectOpt && <TbCheck className={styles.optionIcon} aria-hidden />}
                {isWrongPick  && <TbX     className={styles.optionIcon} aria-hidden />}
              </label>
            </li>
          );
        })}
      </ul>

      {/* EXPLANATION (post-submit) */}
      {submitted && (
        <div className={styles.explanation}>
          <span className={styles.explanationLabel}>למה</span>
          <p>{question.explanation}</p>
        </div>
      )}
    </article>
  );
};

export default QuizQuestion;