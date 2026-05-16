// ═══════════════════════════════════════════════════════════════════
// ModuleProgressContext — share progress state with all sections.
// Sections call useContext(ModuleProgressContext) to mark visit/complete.
// ═══════════════════════════════════════════════════════════════════
import { createContext, useContext } from 'react';
import type { useModuleProgress } from '@/hooks/useModuleProgress';

type Ctx = ReturnType<typeof useModuleProgress>;

export const ModuleProgressContext = createContext<Ctx | null>(null);

export function useProgressCtx(): Ctx {
  const ctx = useContext(ModuleProgressContext);
  if (!ctx) throw new Error('useProgressCtx must be used inside <ModuleShell />');
  return ctx;
}
