import React from 'react';
import type { Metadata } from 'next';
import PolicySection from '@/components/PolicySection';

export const metadata: Metadata = {
  title: 'Política SG-SST y Reglas de Oro — Portal Corporativo',
  description: 'Compromiso gerencial con la Seguridad y Salud en el Trabajo, directrices de oro operativas y buzón de radicación oficial.',
};

export default function PoliticaPage() {
  return (
    <div className="w-full animate-fade-in">
      <PolicySection />
    </div>
  );
}
