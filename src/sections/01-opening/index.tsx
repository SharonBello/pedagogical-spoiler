// ═══════════════════════════════════════════════════════════════════
// Section 01 — פתיחה (Opening)
// Composes: OpeningHero + WhyBackwards
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import SectionShell from '@/components/SectionShell/SectionShell';
import OpeningHero from './OpeningHero';
import WhyBackwards from './WhyBackwards';

const OpeningSection: React.FC = () => (
  <SectionShell id="opening">
    <OpeningHero />
    <WhyBackwards />
  </SectionShell>
);

export default OpeningSection;