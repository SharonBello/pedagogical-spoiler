// ═══════════════════════════════════════════════════════════════════
// Section 07 — מבחן (Quiz · 15 min)
// Self-check: 6 questions on the 5E-backwards approach.
// State (answers + submitted + score) persists to localStorage.
// ═══════════════════════════════════════════════════════════════════
import React, { useEffect, useState } from 'react';
import SectionShell from '@/components/SectionShell/SectionShell';
import { useProgressCtx } from '@/components/ModuleShell/ModuleProgressContext';
import { QUIZ_QUESTIONS } from '@/data/quizData';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import styles from './index.module.scss';

interface QuizState {
  answers: Record<string, string>;
  submitted: boolean;
  score: number;
}

const STORAGE_KEY = 'binai.m03.quiz.v1';
const EMPTY: QuizState = { answers: {}, submitted: false, score: 0 };

function load(): QuizState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as QuizState;
    return { ...EMPTY, ...parsed };
  } catch { return EMPTY; }
}

const QuizSection: React.FC = () => {
  const [state, setState] = useState<QuizState>(load);
  const { setQuizScore } = useProgressCtx();

  // Persist whole state to localStorage on every change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const allAnswered = Object.keys(state.answers).length === totalQuestions;

  const handleAnswer = (qid: string, optionId: string) => {
    if (state.submitted) return; // locked after submit
    setState(s => ({ ...s, answers: { ...s.answers, [qid]: optionId } }));
  };

  const handleSubmit = () => {
    if (!allAnswered || state.submitted) return;
    const score = QUIZ_QUESTIONS.reduce(
      (acc, q) => acc + (state.answers[q.id] === q.correctId ? 1 : 0),
      0,
    );
    setState(s => ({ ...s, submitted: true, score }));
    setQuizScore(score);
    // smooth scroll to top to see the result banner
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  };

  const handleRetry = () => {
    setState(EMPTY);
    setQuizScore(0);
  };

  return (
    <SectionShell id="quiz">
      {state.submitted && (
        <QuizResult
          score={state.score}
          total={totalQuestions}
          onRetry={handleRetry}
        />
      )}

      {!state.submitted && (
        <header className={styles.intro}>
          <span className={styles.tag}>הערכה עצמית</span>
          <h3 className={styles.title}>{totalQuestions} שאלות. בלי לחץ.</h3>
          <p className={styles.lede}>
            בדקו אם הפנמתם את הגישה. כל שאלה — תשובה אחת נכונה. אחרי השליחה
            תקבלו הסבר על כל תשובה — <strong>גם אלו שטעיתם בהן</strong>.
            תמיד אפשר לנסות שוב.
          </p>
        </header>
      )}

      <ol className={styles.questions}>
        {QUIZ_QUESTIONS.map((q, i) => (
          <li key={q.id} className={styles.questionItem}>
            <QuizQuestion
              question={q}
              questionNum={i + 1}
              total={totalQuestions}
              selectedId={state.answers[q.id] ?? null}
              submitted={state.submitted}
              onSelect={(optId) => handleAnswer(q.id, optId)}
            />
          </li>
        ))}
      </ol>

      {!state.submitted && (
        <div className={styles.submitRow}>
          <button
            type="button"
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={!allAnswered}
            title={!allAnswered ? `נותרו ${totalQuestions - Object.keys(state.answers).length} שאלות בלי תשובה` : undefined}
          >
            בדקו את הציון שלי
          </button>
          {!allAnswered && (
            <span className={styles.submitHint}>
              נותרו <strong>{totalQuestions - Object.keys(state.answers).length}</strong> שאלות בלי תשובה
            </span>
          )}
        </div>
      )}
    </SectionShell>
  );
};

export default QuizSection;