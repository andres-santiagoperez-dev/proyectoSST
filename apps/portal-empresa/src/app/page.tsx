import React from 'react';
import type { Metadata } from 'next';
import SummarySection from '@/components/SummarySection';

export const metadata: Metadata = {
  title: 'Resumen e Indicadores SG-SST — Portal Corporativo',
  description: 'Telemetría en vivo, indicadores de accidentalidad, cumplimiento normativo y datos institucionales del SG-SST.',
};

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full animate-fade-in">
      <SummarySection />
    </div>
  );
}
