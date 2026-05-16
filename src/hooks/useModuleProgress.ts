// ═══════════════════════════════════════════════════════════════════
// useModuleProgress
// Saves the teacher's progress through M03 to localStorage.
// When BinAI portal eventually wires up Firebase, replace this hook
// without touching the rest of the module.
// ═══════════════════════════════════════════════════════════════════
import { useCallback, useEffect, useState } from 'react';
import { SECTIONS } from '@/data/sections';
import type {
  ModuleProgress,
  SectionId,
  SampleSubject,
  CustomTopic,
} from '@/types/module.types';

const STORAGE_KEY = 'binai.m03.progress.v1';

function emptyProgress(): ModuleProgress {
  const sections = SECTIONS.reduce((acc, s) => {
    acc[s.id] = { id: s.id, visited: false, completed: false };
    return acc;
  }, {} as ModuleProgress['sections']);
  return {
    sections,
    startedAt: null,
    completedAt: null,
    quizScore: null,
    selectedSample: null,
    customTopic: null,
  };
}

function load(): ModuleProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const parsed = JSON.parse(raw) as ModuleProgress;
    // Merge in case section list changed across versions
    const base = emptyProgress();
    return { ...base, ...parsed, sections: { ...base.sections, ...parsed.sections } };
  } catch {
    return emptyProgress();
  }
}

function save(progress: ModuleProgress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
  catch { /* quota / private mode — ignore */ }
}

export function useModuleProgress() {
  const [progress, setProgress] = useState<ModuleProgress>(load);

  useEffect(() => { save(progress); }, [progress]);

  const visit = useCallback((id: SectionId) => {
    setProgress(p => ({
      ...p,
      startedAt: p.startedAt ?? Date.now(),
      sections: { ...p.sections, [id]: { ...p.sections[id], visited: true } },
    }));
  }, []);

  const complete = useCallback((id: SectionId) => {
    setProgress(p => ({
      ...p,
      sections: {
        ...p.sections,
        [id]: { ...p.sections[id], visited: true, completed: true },
      },
    }));
  }, []);

  const setSample = useCallback((sample: SampleSubject) => {
    setProgress(p => ({ ...p, selectedSample: sample }));
  }, []);

  const setCustomTopic = useCallback((topic: CustomTopic) => {
    setProgress(p => ({ ...p, customTopic: topic }));
  }, []);

  const setQuizScore = useCallback((score: number) => {
    setProgress(p => ({ ...p, quizScore: score }));
  }, []);

  const reset = useCallback(() => setProgress(emptyProgress()), []);

  // Derived
  const completedCount = Object.values(progress.sections).filter(s => s.completed).length;
  const totalCount = SECTIONS.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  return {
    progress,
    visit,
    complete,
    setSample,
    setCustomTopic,
    setQuizScore,
    reset,
    completedCount,
    totalCount,
    percent,
  };
}