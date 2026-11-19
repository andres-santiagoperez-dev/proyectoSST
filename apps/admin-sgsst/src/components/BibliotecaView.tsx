'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, Activity, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import { EJERCICIOS_PAUSAS } from '@/lib/data-mock';
import MannequinAnimation from './MannequinAnimation';

export default function BibliotecaView() {
  const [ejercicioSeleccionadoIdx, setEjercicioSeleccionadoIdx] = useState(0);
  const ejercicio = EJERCICIOS_PAUSAS[ejercicioSeleccionadoIdx];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
      <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="text-xl font-black font-outfit text-brand-navy">
            Biblioteca de Ejercicios y Biomecánica Ocupacional
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Catálogo oficial de pausas activas programadas en los puestos de trabajo.
          </p>
        </div>
        <span className="text-xs font-mono font-bold bg-teal-50 text-accent-turquoise border border-teal-200 px-3 py-1 rounded-xl">
          {EJERCICIOS_PAUSAS.length} Rutinas Certificadas
        </span>
      </div>

      {/* Grid de Rutinas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {EJERCICIOS_PAUSAS.map((ej, idx) => (
          <button
            key={ej.id}
            onClick={() => setEjercicioSeleccionadoIdx(idx)}
            className={`p-3 rounded-2xl border text-left transition-all ${
              ejercicioSeleccionadoIdx === idx
                ? 'bg-brand-navy text-white border-brand-navy shadow-md scale-[1.02]'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <span className={`text-[10px] font-mono block ${ejercicioSeleccionadoIdx === idx ? 'text-accent-turquoise' : 'text-slate-400'}`}>
              {ej.duracionSegundos}s
            </span>
            <span className="text-xs font-bold font-outfit line-clamp-2 leading-tight mt-1">
              {ej.titulo}
            </span>
          </button>
        ))}
      </div>

      {/* Detalle con Muñeco Animado */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-slate-500 font-bold">
            <span>Demostración Biomecánica:</span>
            <span className="text-brand-blue">{ejercicio.zonaCuerpo}</span>
          </div>
          <MannequinAnimation ejercicioId={ejercicio.id} tamano="amplio" />
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent-turquoise bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
              Protocolo ARL / SG-SST
            </span>
            <h4 className="text-2xl font-black font-outfit text-brand-navy mt-1">
              {ejercicio.titulo}
            </h4>
            <p className="text-xs text-slate-500 font-mono">
              Zona anatómica: {ejercicio.zonaCuerpo}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-700 block">
              Instrucciones de postura:
            </span>
            {ejercicio.instrucciones.map((inst, i) => (
              <div key={i} className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start space-x-2">
                <span className="w-4 h-4 rounded-full bg-brand-navy text-white text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{inst}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start space-x-2">
            <HeartHandshake className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong>Beneficio ergonómico: </strong>
              <span>{ejercicio.beneficioErgonomico}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
