'use client';

import React, { useState } from 'react';
import { 
  Eye, 
  Activity, 
  Hand, 
  UserCheck, 
  CheckCircle2, 
  Sparkles, 
  Trophy,
  Shuffle,
  Play,
  RotateCw,
  Footprints,
  HeartHandshake
} from 'lucide-react';
import { EJERCICIOS_PAUSAS } from '@/lib/data-mock';
import { TipoEjercicioPausa, EjercicioPausaInfo } from '@/types';
import MannequinAnimation from './MannequinAnimation';
import ActiveBreakModal from './ActiveBreakModal';
import BodyErgonomicMap from './BodyErgonomicMap';

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

  const intentarEntrarPantallaCompleta = () => {
    if (typeof document !== 'undefined') {
      try {
        const docEl = document.documentElement as unknown as {
          requestFullscreen?: () => Promise<void>;
          webkitRequestFullscreen?: () => Promise<void>;
          mozRequestFullScreen?: () => Promise<void>;
          msRequestFullscreen?: () => Promise<void>;
        };
        const reqFS =
          docEl.requestFullscreen ||
          docEl.webkitRequestFullscreen ||
          docEl.mozRequestFullScreen ||
          docEl.msRequestFullscreen;

        if (reqFS && !document.fullscreenElement) {
          reqFS.call(docEl).catch(() => {});
        }
      } catch {
        // Ignorar si el navegador restringe fullscreen
      }
    }
  };

  const lanzarPausaAleatoria = () => {
    intentarEntrarPantallaCompleta();
    const indiceAleatorio = Math.floor(Math.random() * EJERCICIOS_PAUSAS.length);
    const seleccionado = EJERCICIOS_PAUSAS[indiceAleatorio];
    setEjercicioActivoIdx(indiceAleatorio);
    setEjercicioParaModal(seleccionado);
    setModalAbierto(true);
  };

  const abrirModalEjercicioActual = () => {
    intentarEntrarPantallaCompleta();
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

  const handleSeleccionarDesdeMapa = (id: TipoEjercicioPausa) => {
    const idx = EJERCICIOS_PAUSAS.findIndex((e) => e.id === id);
    if (idx !== -1) {
      setEjercicioActivoIdx(idx);
    }
  };

  return (
    <section id="rutina-ejercicios" className="py-6">
      <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 shadow-sm border border-[#64748B]/20">
        
        {/* Encabezado */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-6 border-b border-[#64748B]/10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#0B7A87] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <span>BIOMECÁNICA OCUPACIONAL // DEMOSTRACIONES EN VIVO</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0E1B2F] font-outfit">
              Catálogo Interactivo de Pausas Activas
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-xl font-medium">
              Demostraciones biomecánicas en bucle continuo de 60 FPS, mapa anatómico interactivo y pautas de salud ocupacional.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* BOTÓN LANZAR PAUSA ALEATORIA */}
            <button
              onClick={lanzarPausaAleatoria}
              className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#1A56DB] to-[#0B7A87] hover:from-[#0B7A87] hover:to-[#1A56DB] text-white font-mono text-xs font-bold shadow-md shadow-[#1A56DB]/20 transition-all hover:scale-[1.02] active:scale-95"
              title="Selecciona una pausa al azar y abre la sesión interactiva guiada"
            >
              <Shuffle className="w-4 h-4 text-[#2DD4BF]" />
              <span>Lanzar Pausa Aleatoria al Empleado 🎲</span>
            </button>

            {/* Contador de Cumplimiento */}
            <div className="flex items-center space-x-2 bg-[#10B981]/10 px-3.5 py-2.5 rounded-2xl border border-[#10B981]/30">
              <Trophy className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs font-bold text-[#047857] font-mono num-tabular">
                {ejerciciosCompletados.length} de {EJERCICIOS_PAUSAS.length} Listas
              </span>
            </div>
          </div>
        </div>

        {/* Pestañas de Selección Rápida de los 6 Ejercicios */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 my-6">
          {EJERCICIOS_PAUSAS.map((ej, idx) => {
            const Icon = iconosPorTipo[ej.id] || Activity;
            const esActivo = ejercicioActivoIdx === idx;
            const esCompletado = ejerciciosCompletados.includes(ej.id);

            return (
              <button
                key={ej.id}
                onClick={() => setEjercicioActivoIdx(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between relative overflow-hidden group min-h-[110px] active:scale-95 ${
                  esActivo
                    ? 'bg-[#0E1B2F] text-white border-[#0E1B2F] shadow-lg shadow-[#0E1B2F]/20 scale-[1.02]'
                    : 'bg-[#F8FAFC] hover:bg-slate-100 text-[#0E1B2F] border-[#64748B]/20'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className={`p-2 rounded-xl ${esActivo ? 'bg-white/15 text-[#2DD4BF]' : 'bg-white text-[#0B7A87] shadow-xs'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {esCompletado && (
                    <CheckCircle2 className={`w-4 h-4 ${esActivo ? 'text-[#34D399]' : 'text-[#047857]'}`} />
                  )}
                </div>

                <div>
                  <span className={`text-[10px] font-mono block num-tabular ${esActivo ? 'text-[#2DD4BF]' : 'text-[#64748B]'}`}>
                    {ej.duracionSegundos} seg
                  </span>
                  <span className={`text-xs font-bold font-outfit leading-tight line-clamp-2 ${esActivo ? 'text-white' : 'text-[#0E1B2F]'}`}>
                    {ej.titulo}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            VISTA EN 3 COLUMNAS:
            Col 1: Mapa Anatómico Ergonómico Interactivo (BodyErgonomicMap)
            Col 2: Demostración en Bucle del Muñeco Biomecánico (MannequinAnimation)
            Col 3: Instrucciones, Efecto Biomecánico y Disparador de Cronómetro
            ========================================================================= */}
        <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-[#64748B]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Columna 1: MAPA CORPORAL ANATÓMICO INTERACTIVO */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <BodyErgonomicMap
                ejercicioSeleccionadoId={ejercicioActual.id}
                onSeleccionarEjercicio={handleSeleccionarDesdeMapa}
              />
            </div>

            {/* Columna 2: DEMOSTRACIÓN TIPO GIF DEL MUÑECO EN BUCLE */}
            <div className="lg:col-span-4 bg-[#FFFFFF] rounded-3xl p-5 border border-[#64748B]/20 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#64748B]/10">
                <span className="text-xs font-mono text-[#64748B] font-bold uppercase">
                  Animación Biomecánica:
                </span>
                <span className="text-xs font-mono text-[#047857] bg-[#10B981]/15 border border-[#10B981]/30 px-2.5 py-0.5 rounded-full font-bold">
                  {ejercicioActual.zonaCuerpo.split(',')[0]}
                </span>
              </div>

              {/* Renderizado del avatar animado vector en bucle continuo */}
              <div className="my-2">
                <MannequinAnimation
                  ejercicioId={ejercicioActual.id}
                  duracionSegundos={ejercicioActual.duracionSegundos}
                  tamano="amplio"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] pt-2 border-t border-[#64748B]/10">
                <span className="num-tabular">⏱ Duración: {ejercicioActual.duracionSegundos}s</span>
                <span className="text-[#047857] font-bold">Cadencia guiada</span>
              </div>
            </div>

            {/* Columna 3: Título, Instrucciones y Botón Guiado */}
            <div className="lg:col-span-4 bg-[#FFFFFF] rounded-3xl p-5 border border-[#64748B]/20 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#0B7A87] border border-teal-200 text-xs font-mono mb-2 font-bold">
                    <IconoActual className="w-3.5 h-3.5 text-[#0B7A87]" />
                    <span>RUTINA SELECCIONADA</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-[#0E1B2F] font-outfit leading-tight">
                    {ejercicioActual.titulo}
                  </h4>
                  <p className="text-xs text-[#64748B] mt-1 font-medium font-sans">
                    Foco anatómico: <strong className="text-[#0E1B2F]">{ejercicioActual.zonaCuerpo}</strong>
                  </p>
                </div>

                {/* Pasos de ejecución con tipografía limpia */}
                <div className="space-y-2">
                  <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B]">
                    Instrucciones de postura:
                  </h5>
                  <div className="space-y-1.5">
                    {ejercicioActual.instrucciones.map((instruccion, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#64748B]/15 text-xs text-[#0E1B2F] flex items-start space-x-2.5"
                      >
                        <span className="w-4 h-4 rounded-full bg-[#1A56DB] text-white flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="font-medium">{instruccion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Beneficio ergonómico normativo */}
                <div className="p-3 bg-[#10B981]/10 rounded-xl border border-[#10B981]/25 text-xs text-[#047857] flex items-start space-x-2">
                  <HeartHandshake className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Efecto Biomecánico: </strong>
                    <span className="font-medium">{ejercicioActual.beneficioErgonomico}</span>
                  </div>
                </div>
              </div>

              {/* Botón para iniciar la sesión guiada con cronómetro */}
              <div className="pt-4 mt-2 border-t border-[#64748B]/10 space-y-2">
                <button
                  onClick={abrirModalEjercicioActual}
                  className="w-full py-3 px-4 rounded-xl bg-[#1A56DB] hover:bg-blue-700 text-white font-mono text-xs font-bold shadow-md shadow-[#1A56DB]/25 transition-all flex items-center justify-center space-x-2 group active:scale-95"
                >
                  <Play className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>INICIAR PAUSA CON CRONÓMETRO</span>
                </button>

                <button
                  onClick={() => marcarEjercicioComoCompletado(ejercicioActual)}
                  className="w-full py-2 px-3 rounded-xl border border-[#0B7A87]/30 bg-white hover:bg-teal-50 text-[#0B7A87] font-mono text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5 active:scale-95"
                  title="Marcar como realizado directamente"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Marcar como completado</span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Modal Inmersivo con Cuenta Regresiva, Bloqueo de Pantalla y Animación */}
      <ActiveBreakModal
        estaAbierto={modalAbierto}
        ejercicioInicial={ejercicioParaModal}
        catalogoEjercicios={EJERCICIOS_PAUSAS}
        modoBloqueo={true}
        onCerrar={() => setModalAbierto(false)}
        onCompletarPausa={marcarEjercicioComoCompletado}
        onPosponer={() => setModalAbierto(false)}
      />
    </section>
  );
}
