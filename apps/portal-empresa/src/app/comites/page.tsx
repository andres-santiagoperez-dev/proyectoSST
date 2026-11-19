import React from 'react';
import type { Metadata } from 'next';
import StructureSection from '@/components/StructureSection';

export const metadata: Metadata = {
  title: 'Comités Legales y Central de Emergencias 24/7 — Portal Corporativo',
  description: 'Conformación del COPASST, Comité de Convivencia Laboral, Brigada de Emergencias y directorio telefónico inmediato.',
};

export default function ComitesPage() {
  return (
    <div className="w-full animate-fade-in">
      <StructureSection />
    </div>
  );
}
