// ═══════════════════════════════════════════════════════════════════
// Section 02 — התיאוריה (Theory)
// The conceptual core of the module: 5E reversed.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import SectionShell from '@/components/SectionShell/SectionShell';
import FiveEIntro from './FiveEIntro';
import StationsDiagram from './StationsDiagram';
import StationDetails from './StationDetails';
import PromptFormulaRecap from './PromptFormulaRecap';

const TheorySection: React.FC = () => (
  <SectionShell id="theory">
    <FiveEIntro />
    <StationsDiagram />
    <StationDetails />
    <PromptFormulaRecap />
  </SectionShell>
);

export default TheorySection;