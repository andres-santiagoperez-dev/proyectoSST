import React from 'react';
import type { Metadata } from 'next';
import IsometricBlueprint from '@/components/IsometricBlueprint';

export const metadata: Metadata = {
  title: 'Plano Isométrico Cartográfico — Portal Corporativo SST',
  description: 'Visor axonométrico SVG interactivo de la sede, rutas de evacuación PE-01, estaciones de pausas y equipos contra incendio.',
};

export default function PlanoIsometricoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full animate-fade-in">
      <IsometricBlueprint />
    </div>
  );
}
