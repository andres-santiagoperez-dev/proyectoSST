'use client';

import React from 'react';
import { TipoEjercicioPausa, EjercicioPausaInfo } from '@/types';
import { Sparkles, Activity, ShieldAlert } from 'lucide-react';

interface BodyErgonomicMapProps {
  ejercicioSeleccionadoId: TipoEjercicioPausa;
  onSeleccionarEjercicio: (id: TipoEjercicioPausa) => void;
}

interface NodoCorporal {
  id: TipoEjercicioPausa;
  nombre: string;
  x: number;
  y: number;
  zona: string;
  riesgoSST: string;
}

const NODOS_CUERPO: NodoCorporal[] = [
  {
    id: 'VISUAL_20_20',
    nombre: 'Fatiga Visual 20-20-20',
    x: 100,
    y: 36,
    zona: 'Ojos / Región Ocular',
    riesgoSST: 'Astenopía por pantallas VDT',
  },
  {
    id: 'CUELLO_TRAPECIO',
    nombre: 'Liberación Cervical',
    x: 100,
    y: 58,
    zona: 'Cuello y Trapecios',
    riesgoSST: 'Espasmo miofascial cervical',
  },
  {
    id: 'HOMBROS_ROTACION',
    nombre: 'Hombros y Deltoides',
    x: 64,
    y: 80,
    zona: 'Hombros / Manguito Rotador',
    riesgoSST: 'Tendinitis del supraespinoso',
  },
  {
    id: 'TUNEL_CARPIANO',
    nombre: 'Túnel Carpiano',
    x: 44,
    y: 150,
    zona: 'Muñecas y Dedos',
    riesgoSST: 'Neuropatía mediana por digitación',
  },
  {
    id: 'LUMBAR_POSTURAL',
    nombre: 'Arco Lumbar y Pelvis',
    x: 100,
    y: 135,
    zona: 'Columna Lumbar L4-S1',
    riesgoSST: 'Lumbalgia postural por sedestación',
  },
  {
    id: 'PIERNAS_CIRCULACION',
    nombre: 'Retorno Venoso',
    x: 85,
    y: 235,
    zona: 'Gemelos y Tobillos',
    riesgoSST: 'Estasis venosa periférica',
  },
];

export default function BodyErgonomicMap({
  ejercicioSeleccionadoId,
  onSeleccionarEjercicio,
}: BodyErgonomicMapProps) {
  // Reproducir un sutil feedback sonoro al interactuar con el mapa
  const sonarTick = () => {
    if (typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Ignorar si audio está bloqueado
    }
  };

  const nodoActual = NODOS_CUERPO.find((n) => n.id === ejercicioSeleccionadoId) || NODOS_CUERPO[0];

  return (
    <div className="bg-[#F8FAFC] border border-[#64748B]/20 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#64748B]/15">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
            <span className="text-xs font-mono font-bold text-[#0E1B2F] uppercase tracking-wider">
              MAPA ANATÓMICO ERGONÓMICO
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#0B7A87] font-semibold bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
            Táctil // 6 Puntos Críticos
          </span>
        </div>

        <p className="text-xs text-[#64748B] mt-2 font-sans font-medium">
          Selecciona sobre la silueta biomecánica la zona muscular con mayor tensión para sincronizar la pausa activa:
        </p>

        {/* Silueta Humana Vectorial con Puntos de Tensión Interactivos */}
        <div className="relative w-full max-w-[220px] mx-auto my-3 flex items-center justify-center">
          <svg viewBox="0 0 200 310" className="w-full h-auto select-none drop-shadow-sm" role="img" aria-label="Mapa anatómico de puntos ergonómicos">
            {/* Silueta estilizada de cuerpo humano */}
            <g fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Cabeza */}
              <circle cx="100" cy="36" r="16" />
              {/* Cuello y Trapecio */}
              <path d="M 94 52 L 106 52 L 112 65 L 88 65 Z" />
              {/* Torso */}
              <path d="M 86 66 L 114 66 L 118 110 L 112 145 L 88 145 L 82 110 Z" />
              {/* Brazo Izquierdo (hombro, codo, mano) */}
              <path d="M 84 68 L 64 82 L 54 115 L 44 150" fill="none" strokeWidth="10" strokeLinecap="round" />
              {/* Brazo Derecho */}
              <path d="M 116 68 L 136 82 L 146 115 L 156 150" fill="none" strokeWidth="10" strokeLinecap="round" />
              {/* Pelvis y Pierna Izquierda */}
              <path d="M 92 145 L 88 200 L 85 240 L 82 295" fill="none" strokeWidth="12" strokeLinecap="round" />
              {/* Pelvis y Pierna Derecha */}
              <path d="M 108 145 L 112 200 L 115 240 L 118 295" fill="none" strokeWidth="12" strokeLinecap="round" />
            </g>

            {/* Renderizado de Nodos Interactivos */}
            {NODOS_CUERPO.map((nodo) => {
              const esActivo = nodo.id === ejercicioSeleccionadoId;
              return (
                <g
                  key={nodo.id}
                  onClick={() => {
                    sonarTick();
                    onSeleccionarEjercicio(nodo.id);
                  }}
                  className="cursor-pointer group"
                  tabIndex={0}
                  role="button"
                  aria-label={`Seleccionar punto de ${nodo.nombre}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      sonarTick();
                      onSeleccionarEjercicio(nodo.id);
                    }
                  }}
                >
                  {/* Halo pulsante si está seleccionado */}
                  {esActivo && (
                    <circle
                      cx={nodo.x}
                      cy={nodo.y}
                      r="16"
                      fill="#10B981"
                      opacity="0.25"
                      className="animate-ping"
                    />
                  )}
                  {/* Anillo exterior */}
                  <circle
                    cx={nodo.x}
                    cy={nodo.y}
                    r={esActivo ? '11' : '8'}
                    fill={esActivo ? '#10B981' : '#FFFFFF'}
                    stroke={esActivo ? '#047857' : '#0B7A87'}
                    strokeWidth={esActivo ? '2.5' : '1.5'}
                    className="transition-all duration-200 group-hover:scale-125"
                  />
                  {/* Punto central */}
                  <circle
                    cx={nodo.x}
                    cy={nodo.y}
                    r="3.5"
                    fill={esActivo ? '#FFFFFF' : '#0B7A87'}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Ficha rápida del punto anatómico enfocado */}
      <div className="bg-white rounded-2xl p-3.5 border border-[#64748B]/20 text-xs shadow-xs space-y-1.5 mt-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#0E1B2F] font-outfit text-sm">
            {nodoActual.nombre}
          </span>
          <span className="text-[10px] font-mono font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Foco Activo
          </span>
        </div>
        <div className="text-[11px] text-[#64748B] flex items-center justify-between font-mono">
          <span>{nodoActual.zona}</span>
        </div>
        <div className="pt-1.5 border-t border-[#64748B]/10 text-[10px] text-[#0B7A87] font-medium flex items-center space-x-1">
          <ShieldAlert className="w-3 h-3 text-[#0B7A87] shrink-0" />
          <span className="truncate">Prevención: {nodoActual.riesgoSST}</span>
        </div>
      </div>
    </div>
  );
}
