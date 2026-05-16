// ═══════════════════════════════════════════════════════════════════
// NavBar — section navigation. Each section is a dot/number.
// Dot states: locked / current / visited / completed.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { NavLink } from 'react-router-dom';
import { SECTIONS } from '@/data/sections';
import type { ModuleProgress } from '@/types/module.types';
import styles from './NavBar.module.scss';

interface Props {
  progress: ModuleProgress;
}

const NavBar: React.FC<Props> = ({ progress }) => (
  <nav className={styles.nav} aria-label="ניווט יחידה">
    <div className={styles.inner}>
      {/* Brand mark */}
      <div className={styles.brand}>
        <span className={styles.brandMono}>M03 ·</span>
        <span className={styles.brandTitle}>הספויילר הפדגוגי</span>
      </div>

      {/* Section dots */}
      <ol className={styles.dots}>
        {SECTIONS.map(s => {
          const sp = progress.sections[s.id];
          const state = sp.completed ? 'done' : sp.visited ? 'visited' : 'locked';
          return (
            <li key={s.id} className={styles.dotItem}>
              <NavLink
                to={s.path}
                className={({ isActive }) =>
                  [
                    styles.dot,
                    styles[`dot-${state}`],
                    isActive && styles['dot-active'],
                  ].filter(Boolean).join(' ')
                }
                title={`${s.number}. ${s.title}`}
                aria-label={`${s.number}. ${s.title}`}
              >
                <span className={styles.dotNum}>{s.number}</span>
              </NavLink>
            </li>
          );
        })}
      </ol>
    </div>
  </nav>
);

export default NavBar;
