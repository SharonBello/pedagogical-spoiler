// ═══════════════════════════════════════════════════════════════════
// PromptCard — one of the 5 practice prompts.
// Shows: header · hint · filled 4-part prompt · copy button.
// Copies the full prompt as a single chunk for paste into AI tool.
// ═══════════════════════════════════════════════════════════════════
import React, { useState } from 'react';
import { TbCopy, TbCheck } from 'react-icons/tb';
import type { PracticePrompt } from '@/data/practicePrompts';
import { buildCopyText } from '@/data/practicePrompts';
import styles from './PromptCard.module.scss';

interface Props {
  prompt: PracticePrompt;
  filled: { role: string; context: string; task: string; format: string; };
}

const PARTS: Array<[keyof Props['filled'], string]> = [
  ['role',    'תפקיד'],
  ['context', 'קשר'],
  ['task',    'משימה'],
  ['format',  'פורמט'],
];

const PromptCard: React.FC<Props> = ({ prompt, filled }) => {
  const [copied, setCopied] = useState(false);
  const isFirst = prompt.planOrder === 1;
  const isLast  = prompt.planOrder === 5;

  const handleCopy = async () => {
    const text = buildCopyText(filled);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback: select-all in a hidden textarea
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 2200); }
      catch { /* ignore */ }
      document.body.removeChild(ta);
    }
  };

  return (
    <article className={`${styles.card} ${isFirst ? styles.cardFirst : ''} ${isLast ? styles.cardLast : ''}`}>
      {/* HEADER */}
      <header className={styles.head}>
        <span className={styles.planBadge}>תכנון #{prompt.planOrder}</span>
        <span className={styles.symbol} aria-hidden>{prompt.symbol}</span>
        <h4 className={styles.title}>
          {prompt.nameHe}
          <span className={styles.titleEn}>· {prompt.nameEn}</span>
        </h4>
        <span className={styles.deliveryNote}>
          {isLast ? 'בשיעור: שלב 1 (פתיחה)' : `בשיעור: שלב ${prompt.deliveryOrder}`}
        </span>
      </header>

      {/* HINT */}
      <p className={styles.hint}>{prompt.hint}</p>

      {/* PROMPT BODY */}
      <dl className={styles.prompt}>
        {PARTS.map(([key, label]) => (
          <div key={key} className={styles.promptRow}>
            <dt className={styles.promptKey}>{label}</dt>
            <dd className={styles.promptVal}>{filled[key]}</dd>
          </div>
        ))}
      </dl>

      {/* COPY BUTTON */}
      <button
        type="button"
        className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`}
        onClick={handleCopy}
        aria-live="polite"
      >
        {copied ? <TbCheck aria-hidden /> : <TbCopy aria-hidden />}
        <span>{copied ? 'הועתק ללוח' : 'העתקת הפרומפט'}</span>
      </button>
    </article>
  );
};

export default PromptCard;