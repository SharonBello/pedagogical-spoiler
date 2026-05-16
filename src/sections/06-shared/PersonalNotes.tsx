// ═══════════════════════════════════════════════════════════════════
// PersonalNotes — 3 short textareas for the teacher's takeaways.
// Saved to localStorage. Private — never sent anywhere.
// ═══════════════════════════════════════════════════════════════════
import React, { useEffect, useState } from 'react';
import { TbLock, TbCheck } from 'react-icons/tb';
import styles from './PersonalNotes.module.scss';

interface ShareNotes {
  surprised: string;
  changing: string;
  openQuestion: string;
}

const EMPTY: ShareNotes = { surprised: '', changing: '', openQuestion: '' };
const STORAGE_KEY = 'binai.m03.shareNotes.v1';

function load(): ShareNotes {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as ShareNotes;
    return { ...EMPTY, ...parsed };
  } catch { return EMPTY; }
}

const FIELDS: Array<{ key: keyof ShareNotes; label: string; placeholder: string }> = [
  {
    key: 'surprised',
    label: 'מה הפתיע אותי במערך של חבריי?',
    placeholder: 'משהו שלא חשבתי עליו · רעיון שאשאיל למחר · גישה שונה לאותו תוכן…',
  },
  {
    key: 'changing',
    label: 'מה אני משנה אחרי השיתוף — בעצמי?',
    placeholder: 'שלב במערך שלי שעובד טוב יותר אחרת · פרומפט שאעדן · הסבר שאקצר…',
  },
  {
    key: 'openQuestion',
    label: 'שאלה אחת שעלתה ולא הייתה לי תשובה',
    placeholder: 'מה לחקור · במה להתייעץ · מה לבחון בפעם הבאה…',
  },
];

const PersonalNotes: React.FC = () => {
  const [notes, setNotes] = useState<ShareNotes>(load);
  const [saved, setSaved] = useState(false);

  // Save on every change (debounced via setTimeout on the small flash).
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); } catch {}
    const hasAny = Object.values(notes).some(v => v.trim());
    if (hasAny) {
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 1400);
      return () => clearTimeout(t);
    }
  }, [notes]);

  const update = (key: keyof ShareNotes) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setNotes(n => ({ ...n, [key]: e.target.value }));

  return (
    <section className={styles.section}>
      <header className={styles.head}>
        <span className={styles.tag}>הרשימות שלכם</span>
        <h3 className={styles.title}>שלוש שאלות אישיות</h3>
        <p className={styles.privacy}>
          <TbLock aria-hidden />
          <span>פרטיות לחלוטין — נשמר רק בדפדפן שלכם, לא נשלח לשום שרת.</span>
        </p>
      </header>

      <div className={styles.fields}>
        {FIELDS.map(f => (
          <label key={f.key} className={styles.field}>
            <span className={styles.fieldLabel}>{f.label}</span>
            <textarea
              className={styles.textarea}
              value={notes[f.key]}
              onChange={update(f.key)}
              placeholder={f.placeholder}
              rows={3}
            />
          </label>
        ))}
      </div>

      <span
        className={`${styles.savedFlag} ${saved ? styles.savedFlagOn : ''}`}
        aria-live="polite"
      >
        <TbCheck aria-hidden />
        <span>נשמר</span>
      </span>
    </section>
  );
};

export default PersonalNotes;