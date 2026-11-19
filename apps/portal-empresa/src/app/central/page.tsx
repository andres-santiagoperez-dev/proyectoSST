import React from 'react';
import type { Metadata } from 'next';
import StructureSection from '@/components/StructureSection';

export const metadata: Metadata = {
  title: 'Central de Emergencias 24/7 y Comités — Portal Corporativo',
  description: 'Directorio de emergencias 24/7, COPASST, Comité de Convivencia Laboral y Brigada de Emergencias.',
};

export default function CentralPage() {
  return (
    <div className="w-full animate-fade-in">
      <StructureSection />
    </div>
  );
}
