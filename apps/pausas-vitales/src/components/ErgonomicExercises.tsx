'use client';

import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Activity, 
  Hand, 
  UserCheck, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Trophy,
  Shuffle,
  Play,
  RotateCw,
  Footprints,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { EJERCICIOS_PAUSAS } from '@/lib/data-mock';
import { TipoEjercicioPausa, EjercicioPausaInfo } from '@/types';
import MannequinAnimation from './MannequinAnimation';
import ActiveBreakModal from './ActiveBreakModal';

export default function ErgonomicExercises({ onPausaCompletada }: { onPausaCompletada?: () => void }) {
  const [ejercicioActivoIdx, setEjercicioActivoIdx] = useState<number>(0);
  const [ejerciciosCompletados, setEjerciciosCompletados] = useState<string[]>([]);
  const [modalAbierto, setModalAbierto] = useState<boolean>(false);
  const [ejercicioParaModal, setEjercicioParaModal] = useState<EjercicioPausaInfo>(EJERCICIOS_PAUSAS[0]);

  const ejercicioActual = EJERCICIOS_PAUSAS[ejercicioActivoIdx];

  const iconosPorTipo: Record<TipoEjercicioPausa, React.ElementType> = {
    HOMBROS_ROTACION: RotateCw,
    VISUAL_20_20: Eye,
    CUELLO_TRAPECIO: Activity,
    TUNEL_CARPIANO: Hand,
    LUMBAR_POSTURAL: UserCheck,
    PIERNAS_CIRCULACION: Footprints,
  };

  const IconoActual = iconosPorTipo[ejercicioActual.id] || Activity;

  const lanzarPausaAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * EJERCICIOS_PAUSAS.length);
    const seleccionado = EJERCICIOS_PAUSAS[indiceAleatorio];
    setEjercicioActivoIdx(indiceAleatorio);
    setEjercicioParaModal(seleccionado);
    setModalAbierto(true);
  };

  const abrirModalEjercicioActual = () => {
    setEjercicioParaModal(ejercicioActual);
    setModalAbierto(true);
  };

  const marcarEjercicioComoCompletado = (ejercicio: EjercicioPausaInfo) => {
    if (!ejerciciosCompletados.includes(ejercicio.id)) {
      setEjerciciosCompletados((prev) => [...prev, ejercicio.id]);
    }
    if (typeof window !== 'undefined') {
      const hoy = new Date().toISOString().split('T')[0];
      const count = parseInt(localStorage.getItem(`pausas_hoy_${hoy}`) || '0', 10) + 1;
      localStorage.setItem(`pausas_hoy_${hoy}`, count.toString());
    }
    if (onPausaCompletada) {
      onPausaCompletada();
    }
  };

  return (
    <section id="rutina-ejercicios" className="py-6">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-vital-border">
        
        {/* Encabezado */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-vital-terracotta uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BIOMECÁNICA OCUPACIONAL // DEMOSTRACIONES EN VIVO</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-vital-forest font-outfit">
              Catálogo de Pausas Activas Guiadas
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Cada ejercicio cuenta con su avatar biomecánico animado en bucle continuo, tiempo sugerido y advertencias ergonómicas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* BOTÓN LANZAR PAUSA ALEATORIA */}
            <button
              onClick={lanzarPausaAleatoria}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-tealDark hover:from-brand-tealDark hover:to-brand-blue text-white font-mono text-xs font-bold shadow-md shadow-brand-blue/20 transition-all hover:scale-[1.02]"
              title="Selecciona una pausa al azar y abre la guía inmersiva"
            >
              <Shuffle className="w-4 h-4" />
              <span>Lanzar Pausa Aleatoria al Empleado 🎲</span>
            </button>

            {/* Contador de Cumplimiento */}
            <div className="flex items-center space-x-2 bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-200">
              <Trophy className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-900 font-mono">
                {ejerciciosCompletados.length} de {EJERCICIOS_PAUSAS.length} Listas
              </span>
            </div>
          </div>
        </div>

        {/* Pestañas de Selección de los 6 Ejercicios */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 my-6">
          {EJERCICIOS_PAUSAS.map((ej, idx) => {
            const Icon = iconosPorTipo[ej.id] || Activity;
            const esActivo = ejercicioActivoIdx === idx;
            const esCompletado = ejerciciosCompletados.includes(ej.id);

            return (
              <button
                key={ej.id}
                onClick={() => setEjercicioActivoIdx(idx)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between relative overflow-hidden group ${
                  esActivo
                    ? 'bg-vital-forest text-white border-vital-forest shadow-lg shadow-vital-forest/20 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className={`p-2 rounded-xl ${esActivo ? 'bg-white/10 text-vital-terracotta' : 'bg-white text-slate-600 shadow-sm'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {esCompletado && (
                    <CheckCircle2 className={`w-4 h-4 ${esActivo ? 'text-emerald-300' : 'text-emerald-600'}`} />
                  )}
                </div>

                <div>
                  <span className={`text-[10px] font-mono block ${esActivo ? 'text-emerald-300' : 'text-slate-400'}`}>
                    {ej.duracionSegundos} seg
                  </span>
                  <span className={`text-xs font-bold font-outfit line-clamp-2 leading-tight ${esActivo ? 'text-white' : 'text-slate-800'}`}>
                    {ej.titulo}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Vista Detallada del Ejercicio Activo con Muñeco Animado tipo GIF */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Columna Izquierda: DEMOSTRACIÓN TIPO GIF DEL MUÑECO EN BUCLE */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500 font-bold uppercase">
                  Animación Biomecánica en Bucle:
                </span>
                <span className="text-xs font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-bold">
                  {ejercicioActual.zonaCuerpo}
                </span>
              </div>

              {/* Renderizado del avatar animado */}
              <MannequinAnimation
                ejercicioId={ejercicioActual.id}
                duracionSegundos={ejercicioActual.duracionSegundos}
                tamano="amplio"
              />

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                <span>⏱ Duración sugerida: {ejercicioActual.duracionSegundos}s</span>
                <span className="text-emerald-700 font-semibold">Respiración 4-4-4</span>
              </div>
            </div>

            {/* Columna Derecha: Título, Instrucciones y Botón Guiado */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono mb-2 font-bold">
                  <IconoActual className="w-3.5 h-3.5 text-amber-700" />
                  <span>EJERCICIO SELECCIONADO</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-black text-vital-forest font-outfit">
                  {ejercicioActual.titulo}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Zona enfocada: <strong className="text-vital-forest">{ejercicioActual.zonaCuerpo}</strong>
                </p>
              </div>

              {/* Pasos de ejecución */}
              <div className="space-y-2.5">
                <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Instrucciones de postura correcta:
                </h5>
                <div className="space-y-2">
                  {ejercicioActual.instrucciones.map((instruccion, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-start space-x-3 shadow-xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-vital-forest text-white flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{instruccion}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beneficio ergonómico y botón de acción */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start space-x-2.5">
                <HeartHandshake className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Efecto Biomecánico: </strong>
                  <span>{ejercicioActual.beneficioErgonomico}</span>
                </div>
              </div>

              {/* Botón para iniciar la sesión guiada con cronómetro */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={abrirModalEjercicioActual}
                  className="flex-1 py-3 px-5 rounded-2xl bg-vital-forest hover:bg-slate-900 text-white font-mono text-xs sm:text-sm font-bold shadow-lg shadow-vital-forest/20 transition-all flex items-center justify-center space-x-2 group"
                >
                  <Play className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>INICIAR ESTA PAUSA GUIADA CON CRONÓMETRO</span>
                </button>

                <button
                  onClick={() => marcarEjercicioComoCompletado(ejercicioActual)}
                  className="py-3 px-4 rounded-2xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-mono text-xs font-semibold transition-colors flex items-center space-x-1.5"
                  title="Marcar como realizado directamente"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Marcar hecho</span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Modal Inmersivo con Cuenta Regresiva y Animación */}
      <ActiveBreakModal
        estaAbierto={modalAbierto}
        ejercicioInicial={ejercicioParaModal}
        catalogoEjercicios={EJERCICIOS_PAUSAS}
        onCerrar={() => setModalAbierto(false)}
        onCompletarPausa={marcarEjercicioComoCompletado}
      />
    </section>
  );
}
