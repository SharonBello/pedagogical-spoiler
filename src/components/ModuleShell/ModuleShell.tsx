// ═══════════════════════════════════════════════════════════════════
// ModuleShell — the outer chrome of M03.
// Sticks ProgressBar + NavBar at the top; renders the active section
// below via <Outlet />.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '@/components/NavBar/NavBar';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { useModuleProgress } from '@/hooks/useModuleProgress';
import { ModuleProgressContext } from './ModuleProgressContext';
import styles from './ModuleShell.module.scss';

const ModuleShell: React.FC = () => {
  const ctx = useModuleProgress();

  return (
    <ModuleProgressContext.Provider value={ctx}>
      <div className={styles.shell}>
        <ProgressBar percent={ctx.percent} />
        <NavBar progress={ctx.progress} />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </ModuleProgressContext.Provider>
  );
};

export default ModuleShell;
