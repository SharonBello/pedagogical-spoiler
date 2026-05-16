// ═══════════════════════════════════════════════════════════════════
// BreakHero — friendly heading + optional 15-min countdown.
// Timer starts on click; updates every second; chimes (visually) at 00:00.
// ═══════════════════════════════════════════════════════════════════
import React, { useEffect, useRef, useState } from 'react';
import { TbPlayerPlay, TbPlayerPause, TbRefresh, TbCoffee } from 'react-icons/tb';
import styles from './BreakHero.module.scss';

const TOTAL_SECONDS = 15 * 60;

function fmt(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const BreakHero: React.FC = () => {
  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(() => {
      setRemaining(r => {
        if (r <= 1) {
          setRunning(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [running]);

  const done = remaining === 0;
  const fillPct = ((TOTAL_SECONDS - remaining) / TOTAL_SECONDS) * 100;

  const reset = () => { setRunning(false); setRemaining(TOTAL_SECONDS); };

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <div className={styles.iconWrap} aria-hidden>
          <TbCoffee />
        </div>
        <div>
          <span className={styles.eyebrow}>החצי-זמן</span>
          <h2 className={styles.title}>15 דקות הפסקה</h2>
          <p className={styles.lede}>
            תזיזו את הרגליים, תשתו משהו חם, ותחזרו עם <strong>נושא משלכם</strong>{' '}
            לתרגל עליו בחלק הבא.
          </p>
        </div>
      </div>

      {/* Timer card */}
      <aside className={styles.timer} aria-label="טיימר הפסקה">
        <div className={styles.timeRow}>
          <span className={styles.time}>{fmt(remaining)}</span>
          {done && <span className={styles.doneTag}>חזרה!</span>}
        </div>
        <div className={styles.bar}>
          <div className={styles.barFill} style={{ width: `${fillPct}%` }} />
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setRunning(r => !r)}
            disabled={done}
            aria-label={running ? 'השהה טיימר' : 'הפעל טיימר'}
          >
            {running ? <TbPlayerPause aria-hidden /> : <TbPlayerPlay aria-hidden />}
            <span>{running ? 'השהה' : done ? 'נגמר' : 'הפעל'}</span>
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnGhost}`}
            onClick={reset}
            aria-label="אפס טיימר"
          >
            <TbRefresh aria-hidden />
            <span>אפס</span>
          </button>
        </div>
      </aside>
    </section>
  );
};

export default BreakHero;