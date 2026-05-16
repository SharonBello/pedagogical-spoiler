// ═══════════════════════════════════════════════════════════════════
// TopicPicker — teacher commits to a topic they'll use in Practice.
// Saves to localStorage via useModuleProgress so the topic survives reloads.
// ═══════════════════════════════════════════════════════════════════
import React, { useState, useEffect } from 'react';
import { TbCheck, TbEdit } from 'react-icons/tb';
import { useProgressCtx } from '@/components/ModuleShell/ModuleProgressContext';
import type { CustomTopic } from '@/types/module.types';
import styles from './TopicPicker.module.scss';

const EMPTY: CustomTopic = { subject: '', topic: '', grade: '', ageRange: '' };

const TopicPicker: React.FC = () => {
  const { progress, setCustomTopic } = useProgressCtx();
  const saved = progress.customTopic;

  const [form, setForm] = useState<CustomTopic>(saved ?? EMPTY);
  const [editing, setEditing] = useState(!saved);

  useEffect(() => {
    if (saved && !editing) setForm(saved);
  }, [saved, editing]);

  const valid = form.subject.trim() && form.topic.trim() && form.grade.trim();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setCustomTopic(form);
    setEditing(false);
  };

  const update = (k: keyof CustomTopic) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  // ── Saved view (after submit) ──
  if (saved && !editing) {
    return (
      <section className={styles.section}>
        <header className={styles.head}>
          <span className={styles.tag}>הנושא שלכם נשמר</span>
          <h3 className={styles.title}>
            <TbCheck className={styles.check} aria-hidden />
            מוכנים לתרגול
          </h3>
        </header>

        <dl className={styles.saved}>
          <div><dt>מקצוע</dt><dd>{saved.subject}</dd></div>
          <div><dt>נושא</dt><dd>{saved.topic}</dd></div>
          <div><dt>כיתה</dt><dd>{saved.grade}</dd></div>
          {saved.ageRange && <div><dt>גיל</dt><dd>{saved.ageRange}</dd></div>}
        </dl>

        <button
          type="button"
          className={styles.editBtn}
          onClick={() => setEditing(true)}
        >
          <TbEdit aria-hidden />
          <span>שינוי</span>
        </button>
      </section>
    );
  }

  // ── Edit form ──
  return (
    <section className={styles.section}>
      <header className={styles.head}>
        <span className={styles.tag}>שלב חובה לפני התרגול</span>
        <h3 className={styles.title}>בחרו נושא משלכם</h3>
        <p className={styles.sub}>
          חישבו על נושא שאתם מלמדים השבוע. בחלק התרגול נריץ את 5 הפרומפטים{' '}
          <strong>על הנושא שלכם</strong> — כדי שתצאו מההשתלמות עם מערך שיעור אמיתי.
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSave}>
        <label className={styles.field}>
          <span className={styles.label}>מקצוע <span className={styles.req}>*</span></span>
          <input
            type="text"
            value={form.subject}
            onChange={update('subject')}
            placeholder="לדוגמה: היסטוריה / מתמטיקה / אנגלית"
            className={styles.input}
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>נושא ספציפי <span className={styles.req}>*</span></span>
          <input
            type="text"
            value={form.topic}
            onChange={update('topic')}
            placeholder="לדוגמה: מלחמת העולם השנייה / משוואות / Hamlet"
            className={styles.input}
            required
          />
        </label>

        <div className={styles.row}>
          <label className={`${styles.field} ${styles.fieldHalf}`}>
            <span className={styles.label}>כיתה <span className={styles.req}>*</span></span>
            <input
              type="text"
              value={form.grade}
              onChange={update('grade')}
              placeholder="ז׳ / ט׳ / יא׳"
              className={styles.input}
              required
            />
          </label>

          <label className={`${styles.field} ${styles.fieldHalf}`}>
            <span className={styles.label}>טווח גילים</span>
            <input
              type="text"
              value={form.ageRange}
              onChange={update('ageRange')}
              placeholder="13-14"
              className={styles.input}
            />
          </label>
        </div>

        <button type="submit" className={styles.saveBtn} disabled={!valid}>
          שמירה והמשך לתרגול
        </button>
      </form>
    </section>
  );
};

export default TopicPicker;