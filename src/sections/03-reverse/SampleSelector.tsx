// ═══════════════════════════════════════════════════════════════════
// SampleSelector — 3 tabs for switching between worked examples.
// Controlled component: parent owns the selected state.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { REVERSE_DEMOS } from '@/data/reverseDemo';
import type { SampleSubject } from '@/types/module.types';
import styles from './SampleSelector.module.scss';

interface Props {
  selected: SampleSubject;
  onSelect: (id: SampleSubject) => void;
}

const SampleSelector: React.FC<Props> = ({ selected, onSelect }) => (
  <nav className={styles.selector} aria-label="בחירת דוגמה">
    <span className={styles.label}>בחרו דוגמה</span>
    <div className={styles.tabs} role="tablist">
      {REVERSE_DEMOS.map(d => {
        const active = d.meta.id === selected;
        return (
          <button
            key={d.meta.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={`${styles.tab} ${active ? styles.tabActive : ''}`}
            onClick={() => onSelect(d.meta.id)}
          >
            <span className={styles.emoji} aria-hidden>{d.meta.emoji}</span>
            <span className={styles.tabLabel}>{d.meta.label}</span>
          </button>
        );
      })}
    </div>
  </nav>
);

export default SampleSelector;