// ═══════════════════════════════════════════════════════════════════
// ModuleRouter — hash routing for iframe-safety.
// Built sections use lazy() so each section is its own chunk.
// To wire a later section: lazy-import it and swap <Placeholder />.
// ═══════════════════════════════════════════════════════════════════
import React, { lazy, Suspense } from 'react';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import ModuleShell from '@/components/ModuleShell/ModuleShell';

const OpeningSection  = lazy(() => import('@/sections/01-opening'));
const TheorySection   = lazy(() => import('@/sections/02-theory'));
const ReverseSection  = lazy(() => import('@/sections/03-reverse'));
const BreakSection    = lazy(() => import('@/sections/04-break'));
const PracticeSection = lazy(() => import('@/sections/05-practice'));
const SharedSection   = lazy(() => import('@/sections/06-shared'));
const QuizSection     = lazy(() => import('@/sections/07-quiz'));
const ClosingSection  = lazy(() => import('@/sections/08-closing'));

const withSuspense = (el: React.ReactNode) => (
  <Suspense fallback={null}>{el}</Suspense>
);

const router = createHashRouter([
  {
    path: '/',
    element: <ModuleShell />,
    children: [
      { index: true, element: <Navigate to="/opening" replace /> },
      { path: 'opening',  element: withSuspense(<OpeningSection />) },
      { path: 'theory',   element: withSuspense(<TheorySection  />) },
      { path: 'reverse',  element: withSuspense(<ReverseSection />) },
      { path: 'break',    element: withSuspense(<BreakSection   />) },
      { path: 'practice', element: withSuspense(<PracticeSection />) },
      { path: 'shared',   element: withSuspense(<SharedSection   />) },
      { path: 'quiz',     element: withSuspense(<QuizSection     />) },
      { path: 'closing',  element: withSuspense(<ClosingSection  />) },
      { path: '*',        element: <Navigate to="/opening" replace /> },
    ],
  },
]);

const ModuleRouter: React.FC = () => <RouterProvider router={router} />;
export default ModuleRouter;