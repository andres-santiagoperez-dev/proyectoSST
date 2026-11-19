'use client';

import React, { useState, useRef } from 'react';
import { TipoEjercicioPausa } from '@/types';
import { ShieldAlert, Zap, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';

interface BodyErgonomicMapProps {
  ejercicioSeleccionadoId: TipoEjercicioPausa;
  onSeleccionarEjercicio: (id: TipoEjercicioPausa) => void;
}

interface PuntoInteractivo {
  id: TipoEjercicioPausa;
  x: number;
  y: number;
  lado: 'izq' | 'der' | 'centro';
  etiquetaLado?: string;
}

interface DetalleZonaSST {
  id: TipoEjercicioPausa;
  nombre: string;
  zona: string;
  riesgoSST: string;
  tiempo: string;
  morfologia: string;
}

const DETALLES_ZONAS: Record<TipoEjercicioPausa, DetalleZonaSST> = {
  VISUAL_20_20: {
    id: 'VISUAL_20_20',
    nombre: 'Fatiga Visual 20-20-20',
    zona: 'Ojos / Región Ocular',
    riesgoSST: 'Astenopía, fatiga acomodativa y resequedad corneal (VDT)',
    tiempo: '45 seg',
    morfologia: 'Músculos ciliares y película lagrimal',
  },
  CUELLO_TRAPECIO: {
    id: 'CUELLO_TRAPECIO',
    nombre: 'Liberación Cervical',
    zona: 'Columna Cervical y Nuca',
    riesgoSST: 'Espasmo miofascial cervical y sobrecarga postural',
    tiempo: '60 seg',
    morfologia: 'Esternocleidomastoideo y trapecio superior',
  },
  HOMBROS_ROTACION: {
    id: 'HOMBROS_ROTACION',
    nombre: 'Hombros y Manguito Rotador',
    zona: 'Cintura Escapular Bilateral',
    riesgoSST: 'Tendinitis del supraespinoso e inflamación subacromial',
    tiempo: '60 seg',
    morfologia: 'Manguito rotador, deltoides y romboides',
  },
  TUNEL_CARPIANO: {
    id: 'TUNEL_CARPIANO',
    nombre: 'Túnel Carpiano y Muñecas',
    zona: 'Antebrazos, Muñecas y Dedos',
    riesgoSST: 'Neuropatía mediana y tenosinovitis por digitación intensiva',
    tiempo: '60 seg',
    morfologia: 'Retináculo flexor y nervio mediano',
  },
  LUMBAR_POSTURAL: {
    id: 'LUMBAR_POSTURAL',
    nombre: 'Arco Lumbar y Raquis',
    zona: 'Columna Lumbar L4-S1 y Pelvis',
    riesgoSST: 'Lumbalgia postural por sedestación estática prolongada',
    tiempo: '75 seg',
    morfologia: 'Erectores espinales y cuadrado lumbar',
  },
  PIERNAS_CIRCULACION: {
    id: 'PIERNAS_CIRCULACION',
    nombre: 'Retorno Venoso de Piernas',
    zona: 'Gemelos, Sóleo y Tobillos',
    riesgoSST: 'Estasis venosa periférica, pesadez y edema en piernas',
    tiempo: '60 seg',
    morfologia: 'Bomba muscular gemelar y vena safena',
  },
};

// Puntos anatómicos interactivos (con soporte bilateral anatómico)
const PUNTOS_ANATOMICOS: PuntoInteractivo[] = [
  { id: 'VISUAL_20_20', x: 100, y: 36, lado: 'centro' },
  { id: 'CUELLO_TRAPECIO', x: 100, y: 60, lado: 'centro' },
  { id: 'HOMBROS_ROTACION', x: 64, y: 82, lado: 'izq', etiquetaLado: 'Hombro Izquierdo' },
  { id: 'HOMBROS_ROTACION', x: 136, y: 82, lado: 'der', etiquetaLado: 'Hombro Derecho' },
  { id: 'TUNEL_CARPIANO', x: 44, y: 152, lado: 'izq', etiquetaLado: 'Muñeca Izquierda' },
  { id: 'TUNEL_CARPIANO', x: 156, y: 152, lado: 'der', etiquetaLado: 'Muñeca Derecha' },
  { id: 'LUMBAR_POSTURAL', x: 100, y: 135, lado: 'centro' },
  { id: 'PIERNAS_CIRCULACION', x: 85, y: 236, lado: 'izq', etiquetaLado: 'Pantorrilla Izquierda' },
  { id: 'PIERNAS_CIRCULACION', x: 115, y: 236, lado: 'der', etiquetaLado: 'Pantorrilla Derecha' },
];

export default function BodyErgonomicMap({
  ejercicioSeleccionadoId,
  onSeleccionarEjercicio,
}: BodyErgonomicMapProps) {
  const [sonidoActivo, setSonidoActivo] = useState<boolean>(true);
  const [puntoHoverId, setPuntoHoverId] = useState<TipoEjercicioPausa | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Reproducir un sutil feedback sonoro mecánico ("tick" táctil de 40ms) reutilizando AudioContext
  const sonarTick = () => {
    if (!sonidoActivo || typeof window === 'undefined') return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtxClass();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(840, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.045, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio no disponible o bloqueado por política del navegador
    }
  };

  const detalleActual = DETALLES_ZONAS[ejercicioSeleccionadoId] || DETALLES_ZONAS.HOMBROS_ROTACION;
  const detalleHover = puntoHoverId ? DETALLES_ZONAS[puntoHoverId] : null;

  const seleccionarZona = (id: TipoEjercicioPausa) => {
    sonarTick();
    onSeleccionarEjercicio(id);
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#64748B]/20 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Cabecera del Mapa con Indicador de Estado y Mute */}
        <div className="flex items-center justify-between pb-3 border-b border-[#64748B]/15">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <span className="text-xs font-mono font-bold text-[#0E1B2F] uppercase tracking-wider">
              MAPA BIOMECÁNICO INTERACTIVO
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSonidoActivo(!sonidoActivo)}
              className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-100 transition-colors"
              title={sonidoActivo ? 'Desactivar tick acústico táctil' : 'Activar tick acústico táctil'}
              aria-label={sonidoActivo ? 'Desactivar sonido táctil' : 'Activar sonido táctil'}
            >
              {sonidoActivo ? <Volume2 className="w-3.5 h-3.5 text-[#10B981]" /> : <VolumeX className="w-3.5 h-3.5 text-[#64748B]" />}
            </button>
            <span className="text-[10px] font-mono text-[#0B7A87] font-semibold bg-[#14B8A6]/10 border border-[#14B8A6]/30 px-2 py-0.5 rounded-full">
              6 Nodos Bilaterales
            </span>
          </div>
        </div>

        <p className="text-xs text-[#64748B] mt-2 font-medium leading-relaxed">
          Haz clic o toca en la silueta el grupo muscular con mayor sobrecarga para calibrar la rutina de descompresión:
        </p>

        {/* Silueta Humana Vectorial con Nodos de Tensión Interactivos */}
        <div className="relative w-full max-w-[220px] mx-auto my-3 flex items-center justify-center">
          <svg 
            viewBox="0 0 200 310" 
            className="w-full h-auto select-none drop-shadow-sm overflow-visible" 
            role="img" 
            aria-label="Mapa anatómico interactivo con puntos de sobrecarga ergonómica"
          >
            {/* Silueta Biomecánica Estilizada en Grises Neutros */}
            <g fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Cabeza */}
              <circle cx="100" cy="36" r="16" />
              {/* Cuello y Trapecio */}
              <path d="M 94 52 L 106 52 L 112 65 L 88 65 Z" />
              {/* Torso / Raquis */}
              <path d="M 86 66 L 114 66 L 118 110 L 112 145 L 88 145 L 82 110 Z" />
              {/* Brazo Izquierdo */}
              <path d="M 84 68 L 64 82 L 54 115 L 44 152" fill="none" strokeWidth="10" strokeLinecap="round" />
              {/* Brazo Derecho */}
              <path d="M 116 68 L 136 82 L 146 115 L 156 152" fill="none" strokeWidth="10" strokeLinecap="round" />
              {/* Pelvis y Pierna Izquierda */}
              <path d="M 92 145 L 88 200 L 85 240 L 82 295" fill="none" strokeWidth="12" strokeLinecap="round" />
              {/* Pelvis y Pierna Derecha */}
              <path d="M 108 145 L 112 200 L 115 240 L 118 295" fill="none" strokeWidth="12" strokeLinecap="round" />
            </g>

            {/* Líneas guía sutiles conectando la cadena postural */}
            <line x1="64" y1="82" x2="136" y2="82" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
            <line x1="100" y1="60" x2="100" y2="135" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
            <line x1="85" y1="236" x2="115" y2="236" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />

            {/* Renderizado de los Nodos Anatómicos */}
            {PUNTOS_ANATOMICOS.map((punto, idx) => {
              const esActivo = punto.id === ejercicioSeleccionadoId;
              const esHover = punto.id === puntoHoverId;
              const detallePunto = DETALLES_ZONAS[punto.id];

              return (
                <g
                  key={`${punto.id}-${punto.lado}-${idx}`}
                  onClick={() => seleccionarZona(punto.id)}
                  onMouseEnter={() => setPuntoHoverId(punto.id)}
                  onMouseLeave={() => setPuntoHoverId(null)}
                  className="cursor-pointer group focus:outline-none"
                  tabIndex={0}
                  role="button"
                  aria-pressed={esActivo}
                  aria-label={`Seleccionar punto anatómico de ${detallePunto.nombre}${punto.etiquetaLado ? ` (${punto.etiquetaLado})` : ''}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      seleccionarZona(punto.id);
                    }
                  }}
                >
                  <title>{`${detallePunto.nombre}: ${detallePunto.zona}`}</title>

                  {/* Halo pulsante si está seleccionado */}
                  {esActivo && (
                    <circle
                      cx={punto.x}
                      cy={punto.y}
                      r="16"
                      fill="#10B981"
                      opacity="0.3"
                      className="animate-ping"
                      pointerEvents="none"
                    />
                  )}

                  {/* Área táctil invisible de gran diámetro (40px) para máxima responsividad y precisión en pantallas táctiles */}
                  <circle
                    cx={punto.x}
                    cy={punto.y}
                    r="20"
                    fill="#FFFFFF"
                    fillOpacity="0.001"
                    style={{ pointerEvents: 'all' }}
                  />

                  {/* Anillo exterior con microinteracción hover */}
                  <circle
                    cx={punto.x}
                    cy={punto.y}
                    r={esActivo ? '11' : esHover ? '9.5' : '8'}
                    fill={esActivo ? '#10B981' : esHover ? '#2DD4BF' : '#FFFFFF'}
                    stroke={esActivo ? '#047857' : esHover ? '#14B8A6' : '#0B7A87'}
                    strokeWidth={esActivo ? '2.5' : '1.5'}
                    className="transition-all duration-200 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-[#1A56DB]"
                  />

                  {/* Centro del nodo */}
                  <circle
                    cx={punto.x}
                    cy={punto.y}
                    r="3.5"
                    fill={esActivo ? '#FFFFFF' : '#0B7A87'}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Acceso Rápido Alternativo por Botones de Zona (Accesibilidad Teclado y Campo) */}
        <div className="grid grid-cols-3 gap-1.5 pt-2 pb-1 border-t border-[#64748B]/10">
          {(Object.keys(DETALLES_ZONAS) as TipoEjercicioPausa[]).map((id) => {
            const esActivo = id === ejercicioSeleccionadoId;
            const item = DETALLES_ZONAS[id];
            const etiqueta = 
              id === 'VISUAL_20_20' ? 'Ojos' :
              id === 'CUELLO_TRAPECIO' ? 'Cuello' :
              id === 'HOMBROS_ROTACION' ? 'Hombros' :
              id === 'TUNEL_CARPIANO' ? 'Muñecas' :
              id === 'LUMBAR_POSTURAL' ? 'Lumbar' : 'Piernas';

            return (
              <button
                key={id}
                onClick={() => seleccionarZona(id)}
                className={`py-1 px-1.5 rounded-lg text-[10px] font-mono text-center font-medium transition-all active:scale-95 ${
                  esActivo
                    ? 'bg-[#10B981] text-white font-bold shadow-xs'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-200 border border-[#64748B]/20'
                }`}
                title={item.nombre}
              >
                {etiqueta}
              </button>
            );
          })}
        </div>
      </div>

      {/* Ficha Resumen del Foco Anatómico Seleccionado */}
      <div className="bg-[#F8FAFC] rounded-2xl p-3.5 border border-[#64748B]/20 text-xs shadow-xs space-y-1.5 mt-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#0E1B2F] font-outfit text-sm flex items-center space-x-1.5">
            <span>{detalleActual.nombre}</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-[#047857] bg-[#10B981]/15 px-2 py-0.5 rounded-full border border-[#10B981]/30 num-tabular">
            Foco Activo • {detalleActual.tiempo}
          </span>
        </div>

        <div className="text-[11px] text-[#64748B] flex flex-wrap items-center justify-between font-mono gap-1">
          <span>{detalleActual.zona}</span>
          <span className="text-[10px] text-[#0B7A87] font-semibold">{detalleActual.morfologia}</span>
        </div>

        <div className="pt-1.5 border-t border-[#64748B]/10 text-[10px] text-[#0B7A87] font-medium flex items-start space-x-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-[#0B7A87] shrink-0 mt-0.5" />
          <span className="leading-snug">Prevención SG-SST: {detalleActual.riesgoSST}</span>
        </div>
      </div>
    </div>
  );
}
