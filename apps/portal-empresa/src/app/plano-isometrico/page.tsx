import React from 'react';
import type { Metadata } from 'next';
import IsometricBlueprint from '@/components/IsometricBlueprint';

export const metadata: Metadata = {
  title: 'Plano Isométrico Digital CAD — SafePulse SST // Innovatec',
  description: 'Digital Twin y plano axonométrico en corte 3D de la sede con telemetría en tiempo real, rutas fotoluminiscentes y monitoreo de riesgos GTC 45.',
};

export default function PlanoIsometricoPage() {
  return (
    <div className="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 w-full animate-fade-in">
      <IsometricBlueprint />
    </div>
  );
}
