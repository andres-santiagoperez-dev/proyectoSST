import React from 'react';
import type { Metadata } from 'next';
import SummarySection from '@/components/SummarySection';
import Link from 'next/link';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resumen e Indicadores SG-SST — Portal Corporativo',
  description: 'Telemetría en vivo, indicadores de accidentalidad, cumplimiento normativo y datos institucionales del SG-SST.',
};

export default function ResumenPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-8 animate-fade-in">
      {/* Banner de acceso a la experiencia interactiva inmersiva */}
      <div 
        data-theme="dark" 
        className="bg-gradient-to-r from-[#0E1B2F] to-[#111C38] text-white rounded-2xl p-4 sm:p-5 border border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#14B8A6]/20 text-[#2DD4BF] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold font-outfit text-white">
              Nueva Experiencia Inmersiva de Seguridad (Unseen Style)
            </h2>
            <p className="text-xs text-slate-300 font-sans">
              Recorrido interactivo con scrollytelling por zonas, riesgos GTC 45 y simulación de evacuación.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-[#1A56DB] hover:bg-blue-600 active:scale-95 text-white font-mono text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <span>Iniciar Recorrido</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/plano"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-semibold transition-all flex items-center space-x-1"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Ver Plano</span>
          </Link>
        </div>
      </div>

      <SummarySection />
    </div>
  );
}
