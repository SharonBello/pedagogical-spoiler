// ═══════════════════════════════════════════════════════════════════
// Section 06 — שיתוף (Shared · 20 min)
// In-class sharing protocol + private reflection notes.
// Pedagogical "second pair of eyes" on the teacher's lesson plan.
// ═══════════════════════════════════════════════════════════════════
import React from 'react';
import SectionShell from '@/components/SectionShell/SectionShell';
import ShareProtocol from './ShareProtocol';
import PersonalNotes from './PersonalNotes';

const SharedSection: React.FC = () => (
  <SectionShell id="shared">
    <ShareProtocol />
    <PersonalNotes />
  </SectionShell>
);

export default SharedSection;