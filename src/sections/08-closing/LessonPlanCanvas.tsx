// ═══════════════════════════════════════════════════════════════════
// LessonPlanCanvas — fillable MOE-style lesson plan form.
// Auto-filled meta header (from customTopic), 8 paste-areas for the
// teacher's AI outputs, and a print-to-PDF button.
// The whole root has className `m03-print` — the global @media print
// rule shows only this region.
// ═══════════════════════════════════════════════════════════════════
import React, { useEffect, useState } from 'react';
import { TbPrinter } from 'react-icons/tb';
import { useProgressCtx } from '@/components/ModuleShell/ModuleProgressContext';
import styles from './LessonPlanCanvas.module.scss';

interface LessonPlan {
  objectives: string;
  rubric: string;
  priorKnowledge: string;
  opening: string;
  explore: string;
  explain: string;
  elaborate: string;
  summary: string;
}

const EMPTY: LessonPlan = {
  objectives: '', rubric: '', priorKnowledge: '',
  opening: '', explore: '', explain: '', elaborate: '', summary: '',
};

const STORAGE_KEY = 'binai.m03.lessonPlan.v1';

function load(): LessonPlan {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch { return EMPTY; }
}

const FIELDS: Array<{ key: keyof LessonPlan; label: string; hint: string; required: boolean }> = [
  { key: 'objectives',     label: 'מטרות לימוד',                        hint: 'גוזרים מהמחוון (פרומפט #1).', required: true },
  { key: 'rubric',         label: 'הערכה · מחוון + שאלות',              hint: 'מתוך פרומפט #1 (הערכה).', required: true },
  { key: 'priorKnowledge', label: 'ידע קודם נדרש',                       hint: 'אופציונלי — מה צריך לדעת לפני השיעור.', required: false },
  { key: 'opening',        label: 'פתיחה · הצתה (≈2-5 דק׳)',            hint: 'מתוך פרומפט #5 (הצתה).', required: true },
  { key: 'explore',        label: 'גוף השיעור · חקירה (≈15-20 דק׳)',     hint: 'מתוך פרומפט #4 (חקירה).', required: true },
  { key: 'explain',        label: 'גוף השיעור · הסבר (≈10 דק׳)',         hint: 'מתוך פרומפט #3 (הסבר).', required: true },
  { key: 'elaborate',      label: 'גוף השיעור · העמקה (≈10-15 דק׳)',     hint: 'מתוך פרומפט #2 (העמקה).', required: true },
  { key: 'summary',        label: 'סיכום (≈5 דק׳)',                      hint: 'אופציונלי — איך אתם סוגרים את השיעור.', required: false },
];

const LessonPlanCanvas: React.FC = () => {
  const { progress } = useProgressCtx();
  const topic = progress.customTopic;
  const [plan, setPlan] = useState<LessonPlan>(load);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(plan)); } catch {}
  }, [plan]);

  const update = (key: keyof LessonPlan) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setPlan(p => ({ ...p, [key]: e.target.value }));

  const handlePrint = () => {
    // Slight delay so the print dialog catches the latest state
    setTimeout(() => window.print(), 50);
  };

  return (
    <section className={`${styles.canvas} m03-print`}>
      {/* PRINT INSTRUCTIONS — hidden in PDF */}
      <aside className={styles.tip}>
        <strong>איך זה עובד:</strong> הדביקו את התוצרים מ-AI לכל שדה למטה (הם נשמרים אוטומטית).
        כשתסיימו, לחצו <em>"שמירה כ-PDF"</em> — דפדפן ייפתח חלון הדפסה. בחרו "שמירה כ-PDF" כיעד.
      </aside>

      {/* FORM HEADER (visible in PDF) */}
      <header className={styles.formHeader}>
        <div className={styles.formTitleBlock}>
          <span className={styles.formEyebrow}>BinAI · מודול 03 · הספויילר הפדגוגי</span>
          <h2 className={styles.formTitle}>מערך שיעור</h2>
        </div>
      </header>

      {/* META — auto-filled from customTopic */}
      <dl className={styles.meta}>
        <div className={styles.metaItem}>
          <dt>מקצוע</dt>
          <dd>{topic?.subject || '—'}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt>כיתה</dt>
          <dd>{topic?.grade || '—'}</dd>
        </div>
        <div className={`${styles.metaItem} ${styles.metaWide}`}>
          <dt>נושא</dt>
          <dd>{topic?.topic || '—'}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt>משך</dt>
          <dd>45 דק׳</dd>
        </div>
      </dl>

      {/* FIELDS */}
      <div className={styles.fields}>
        {FIELDS.map(f => (
          <div key={f.key} className={`${styles.field} m03-print-field`}>
            <header className={styles.fieldHead}>
              <span className={styles.fieldLabel}>
                {f.label}
                {f.required && <span className={styles.required} aria-label="חובה">*</span>}
              </span>
              <span className={styles.fieldHint}>{f.hint}</span>
            </header>

            <textarea
              className={styles.textarea}
              value={plan[f.key]}
              onChange={update(f.key)}
              rows={4}
              placeholder="הדביקו כאן את הפלט מ-AI..."
            />

            {/* Print mirror — shows the textarea content as plain text in PDF */}
            <div className={styles.printMirror} aria-hidden>
              {plan[f.key]
                ? plan[f.key]
                : <em>(טרם מולא)</em>}
            </div>
          </div>
        ))}
      </div>

      {/* PRINT BUTTON — hidden in PDF */}
      <div className={styles.actionRow}>
        <button type="button" className={styles.printBtn} onClick={handlePrint}>
          <TbPrinter aria-hidden />
          <span>שמירה כ-PDF / הדפסה</span>
        </button>
      </div>
    </section>
  );
};

export default LessonPlanCanvas;