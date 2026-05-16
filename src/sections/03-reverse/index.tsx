// ═══════════════════════════════════════════════════════════════════
// Section 03 — הנדסה הפוכה (Reverse Engineering)
// Three worked examples (lit / history / math) — tab to switch.
// ═══════════════════════════════════════════════════════════════════
import React, { useState } from 'react';
import SectionShell from '@/components/SectionShell/SectionShell';
import { REVERSE_DEMOS, REVERSE_DEMO_BY_ID } from '@/data/reverseDemo';
import type { SampleSubject } from '@/types/module.types';
import SampleSelector from './SampleSelector';
import QuestionShowcase from './QuestionShowcase';
import ReverseStepper from './ReverseStepper';
import Reflection from './Reflection';

const ReverseSection: React.FC = () => {
  const [selected, setSelected] = useState<SampleSubject>(REVERSE_DEMOS[0].meta.id);
  const demo = REVERSE_DEMO_BY_ID[selected];

  return (
    <SectionShell id="reverse">
      <SampleSelector selected={selected} onSelect={setSelected} />
      <QuestionShowcase meta={demo.meta} />
      <ReverseStepper stages={demo.stages} />
      <Reflection meta={demo.meta} />
    </SectionShell>
  );
};

export default ReverseSection;