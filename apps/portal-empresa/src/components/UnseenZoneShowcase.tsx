'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowDownRight, Layers, ShieldCheck, AlertTriangle, Sparkles, Filter } from 'lucide-react';
import { CAPITULOS_TOUR, CapituloTour } from '@/data/normas-sst';

export default function UnseenZoneShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<string>('Todas');

  const filters = [
    { label: 'Todas', count: 5 },
    { label: 'Administrativa', count: 2 },
    { label: 'Crítica / LOTO', count: 1 },
    { label: 'Operativa', count: 1 },
    { label: 'Evacuación PE-01', count: 1 },
  ];

  const filteredItems = CAPITULOS_TOUR.filter((item) => {
    if (selectedFilter === 'Todas') return true;
    if (selectedFilter === 'Administrativa') return item.id === 'recepcion' || item.id === 'oficinas';
    if (selectedFilter === 'Crítica / LOTO') return item.id === 'datacenter';
    if (selectedFilter === 'Operativa') return item.id === 'ensamblaje';
    if (selectedFilter === 'Evacuación PE-01') return item.id === 'almacen-evacuacion';
    return true;
  });

  return (
    <section 
      id="zonas-galeria"
      className="py-16 sm:py-24 bg-white border-t border-[#64748B]/20 relative z-10 transition-colors"
      aria-label="Galería interactiva de zonas y protocolos SST"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Estilo Unseen Projects */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-[#1A56DB] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Twin // Zonas Seleccionadas</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-outfit text-[#0E1B2F] tracking-tight">
            Instalaciones & Protocolos
          </h2>

          <p className="text-sm sm:text-base text-[#64748B] font-sans">
            Explora las áreas críticas de la sede. Haz clic en cualquier tarjeta para abrir su localización exacta en el plano CAD o simular su vector de evacuación.
          </p>
        </div>

        {/* Píldoras de Filtro (Exacto al video de Unseen: All 20, Branding 5...) */}
        <div className="mt-8 flex items-center justify-center flex-wrap gap-2 font-mono">
          {filters.map((f) => {
            const isActive = selectedFilter === f.label;
            return (
              <button
                key={f.label}
                onClick={() => setSelectedFilter(f.label)}
                data-cursor="hover"
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-[#0E1B2F] text-white shadow-md scale-105'
                    : 'bg-slate-50 hover:bg-slate-100 text-[#64748B] border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{f.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-slate-800 text-[#2DD4BF]' : 'bg-slate-200/80 text-slate-600'
                }`}>
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cuadrícula 2 Columnas de Tarjetas Interactivas (Unseen Project Cards) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredItems.map((item, idx) => {
            return (
              <Link
                key={item.id}
                href={item.accionRapida.href || `/plano?focus=${item.id}`}
                data-cursor="card"
                data-theme="dark"
                className="group block relative rounded-3xl overflow-hidden bg-[#0B132B] border border-[#1E293B] hover:border-[#14B8A6]/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#14B8A6]/10 transform hover:-translate-y-1.5 cursor-card"
              >
                {/* Visual Viewport con gradiente y retícula axonométrica */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#080E1E] flex items-center justify-center p-6">
                  
                  {/* Fondo reticulado sutil */}
                  <div 
                    className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, #1E293B 1px, transparent 1px),
                        linear-gradient(to bottom, #1E293B 1px, transparent 1px)
                      `,
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Resplandor temático de zona */}
                  <div 
                    className="absolute w-44 h-44 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{ backgroundColor: item.riesgoGtc45.colorNivel }}
                  />

                  {/* Icono central de zona */}
                  <div className="relative z-10 text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0E1726] border border-[#1E293B] flex items-center justify-center text-white group-hover:scale-110 group-hover:border-[#14B8A6] transition-all shadow-inner">
                      <Layers className="w-8 h-8 text-[#14B8A6]" />
                    </div>
                    <span className="inline-block text-xs font-mono font-bold text-slate-400 group-hover:text-white transition-colors">
                      ZONA CAD // {item.areaTecnica}
                    </span>
                  </div>

                  {/* Insignia superior derecha: Nivel GTC 45 */}
                  <div className="absolute top-4 right-4 z-10">
                    <span 
                      className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border"
                      style={{
                        backgroundColor: `${item.riesgoGtc45.colorNivel}20`,
                        color: item.riesgoGtc45.colorNivel,
                        borderColor: `${item.riesgoGtc45.colorNivel}40`,
                      }}
                    >
                      Peligro {item.riesgoGtc45.clasificacion} // {item.riesgoGtc45.nivel}
                    </span>
                  </div>

                  {/* Insignia superior izquierda: Capítulo */}
                  <div className="absolute top-4 left-4 z-10 font-mono text-xs font-black text-[#2DD4BF] bg-[#0E1726]/80 px-2.5 py-0.5 rounded-lg border border-[#1E293B]">
                    {item.capitulo}
                  </div>
                </div>

                {/* Franja Inferior de Metadatos (Tipografía Editorial Unseen + Flecha ↘) */}
                <div className="p-6 bg-[#0E1726] border-t border-[#1E293B] flex items-center justify-between">
                  <div className="space-y-1 pr-4">
                    <h3 className="text-lg sm:text-xl font-bold font-outfit text-white group-hover:text-[#2DD4BF] transition-colors leading-snug">
                      {item.titulo}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans line-clamp-1">
                      {item.subtitulo}
                    </p>
                  </div>

                  {/* Flecha diagonal ↘ característica del diseño Unseen */}
                  <div className="w-10 h-10 rounded-full bg-[#1E293B] group-hover:bg-[#1A56DB] text-slate-300 group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110">
                    <ArrowDownRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
