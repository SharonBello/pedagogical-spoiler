// ═══════════════════════════════════════════════════════════════════
// QuizResult — score banner shown after submission.
// Tone of the message varies with the percentage correct.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { TbAward, TbRefresh } from 'react-icons/tb';
import styles from './QuizResult.module.scss';

interface Props {
  score: number;
  total: number;
  onRetry: () => void;
}

function getVerdict(pct: number): { label: string; tone: 'great' | 'good' | 'tryagain' } {
  if (pct >= 100) return { label: 'מצוין · הפנמתם לגמרי',          tone: 'great'    };
  if (pct >= 80)  return { label: 'יפה מאוד · אתם בפנים',           tone: 'great'    };
  if (pct >= 60)  return { label: 'בסדר גמור · יש כמה דקויות לחדד', tone: 'good'     };
  return                 { label: 'שווה לעבור שוב על התיאוריה',     tone: 'tryagain' };
}

const QuizResult: React.FC<Props> = ({ score, total, onRetry }) => {
  const pct = Math.round((score / total) * 100);
  const { label, tone } = getVerdict(pct);

  return (
    <section className={`${styles.banner} ${styles[`banner-${tone}`]}`}>
      <div className={styles.icon} aria-hidden><TbAward /></div>

      <div className={styles.body}>
        <span className={styles.tag}>הציון שלכם</span>
        <h3 className={styles.scoreLine}>
          <span className={styles.score}>{score}<span className={styles.scoreSlash}>/{total}</span></span>
          <span className={styles.scorePct}>· {pct}%</span>
        </h3>
        <p className={styles.verdict}>{label}</p>
        <p className={styles.note}>
          גללו למטה כדי לראות איזו תשובה הייתה נכונה לכל שאלה, ולמה.
        </p>
      </div>

      <button type="button" className={styles.retryBtn} onClick={onRetry}>
        <TbRefresh aria-hidden />
        <span>ניסיון נוסף</span>
      </button>
    </section>
  );
};

export default QuizResult;