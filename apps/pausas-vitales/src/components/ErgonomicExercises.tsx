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
  Trophy 
} from 'lucide-react';
import { EJERCICIOS_PAUSAS } from '@/lib/data-mock';
import { TipoEjercicioPausa } from '@/types';

export default function ErgonomicExercises({ onPausaCompletada }: { onPausaCompletada?: () => void }) {
  const [ejercicioActivoIdx, setEjercicioActivoIdx] = useState<number>(0);
  const [segundosRestantes, setSegundosRestantes] = useState<number>(EJERCICIOS_PAUSAS[0].duracionSegundos);
  const [estaContando, setEstaContando] = useState<boolean>(false);
  const [ejerciciosCompletados, setEjerciciosCompletados] = useState<string[]>([]);
  const [mostrarFelicitacion, setMostrarFelicitacion] = useState<boolean>(false);

  const ejercicioActual = EJERCICIOS_PAUSAS[ejercicioActivoIdx];

  // Cambiar tiempo al cambiar de ejercicio
  useEffect(() => {
    setSegundosRestantes(EJERCICIOS_PAUSAS[ejercicioActivoIdx].duracionSegundos);
    setEstaContando(false);
  }, [ejercicioActivoIdx]);

  // Cronómetro del ejercicio activo
  useEffect(() => {
    if (!estaContando) return;

    const timer = setInterval(() => {
      setSegundosRestantes((prev) => {
        if (prev <= 1) {
          marcarEjercicioHecho();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [estaContando, ejercicioActivoIdx]);

  const marcarEjercicioHecho = () => {
    setEstaContando(false);
    if (!ejerciciosCompletados.includes(ejercicioActual.id)) {
      setEjerciciosCompletados((prev) => [...prev, ejercicioActual.id]);
    }
  };

  const registrarPausaGlobal = () => {
    setMostrarFelicitacion(true);
    if (typeof window !== 'undefined') {
      const hoy = new Date().toISOString().split('T')[0];
      const count = parseInt(localStorage.getItem(`pausas_hoy_${hoy}`) || '0', 10);
      localStorage.setItem(`pausas_hoy_${hoy}`, (count + 1).toString());
    }
    if (onPausaCompletada) {
      onPausaCompletada();
    }
  };

  const iconosPorTipo: Record<TipoEjercicioPausa, React.ElementType> = {
    VISUAL_20_20: Eye,
    CUELLO_TRAPECIO: Activity,
    TUNEL_CARPIANO: Hand,
    LUMBAR_POSTURAL: UserCheck,
  };

  const IconoActual = iconosPorTipo[ejercicioActual.id];

  return (
    <section id="rutina-ejercicios" className="py-10">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-vital-border">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-vital-terracotta uppercase tracking-wider block mb-1">
              GUÍA INTERACTIVA DE BIOMECÁNICA OCUPACIONAL
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-vital-forest font-outfit">
              Catálogo de Ejercicios Ergonómicos
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Selecciona una postura y sigue las instrucciones para descomprimir la zona afectada.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
            <Trophy className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-900 font-mono">
              {ejerciciosCompletados.length} de {EJERCICIOS_PAUSAS.length} Posturas Listas
            </span>
          </div>
        </div>

        {/* Pestañas de Selección de Ejercicio */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-6">
          {EJERCICIOS_PAUSAS.map((ej, idx) => {
            const Icon = iconosPorTipo[ej.id];
            const esActivo = ejercicioActivoIdx === idx;
            const esCompletado = ejerciciosCompletados.includes(ej.id);

            return (
              <button
                key={ej.id}
                onClick={() => setEjercicioActivoIdx(idx)}
                className={`p-3.5 rounded-2xl text-left border transition-all flex items-start space-x-3 ${
                  esActivo
                    ? 'bg-vital-forest text-white border-vital-forest shadow-lg shadow-vital-forest/20'
                    : esCompletado
                    ? 'bg-emerald-50/80 border-emerald-300 text-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    esActivo ? 'bg-white/20 text-white' : 'bg-white text-slate-700 shadow-sm'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate font-outfit">{ej.titulo}</div>
                  <div className={`text-[10px] truncate ${esActivo ? 'text-emerald-200' : 'text-slate-400'}`}>
                    {ej.zonaCuerpo}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Panel Principal del Ejercicio Seleccionado */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 my-4">
          {/* Ilustración SVG Biomecánica y Cronómetro */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-emerald-100 to-amber-100 border-4 border-white shadow-xl flex flex-col items-center justify-center p-4 relative mb-4">
              <IconoActual className="w-14 h-14 text-vital-forest mb-1 animate-pulse" />
              <span className="text-3xl font-black text-vital-forest font-mono">
                {segundosRestantes}s
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {estaContando ? 'En ejecución' : 'Listo para iniciar'}
              </span>
            </div>

            <button
              onClick={() => setEstaContando(!estaContando)}
              className={`w-full max-w-xs py-3 px-6 rounded-xl font-mono text-xs font-bold transition-all shadow-md ${
                estaContando
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-vital-forest text-white hover:bg-emerald-950'
              }`}
            >
              {estaContando ? 'Pausar Cronómetro' : 'Iniciar Esta Postura'}
            </button>
          </div>

          {/* Instrucciones Detalladas y Beneficios */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-mono font-bold text-vital-forest uppercase tracking-wider">
                ZONA: {ejercicioActual.zonaCuerpo}
              </span>
              <h4 className="text-2xl font-black text-slate-900 font-outfit mt-0.5">
                {ejercicioActual.titulo}
              </h4>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
              <strong className="text-vital-forest font-mono block">Pasos para realizarlo correctamente:</strong>
              <ol className="space-y-1.5 list-decimal list-inside text-slate-600 leading-relaxed">
                {ejercicioActual.instrucciones.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ol>
            </div>

            <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200/80 text-xs text-emerald-900">
              <strong>Beneficio Ergonómico:</strong> {ejercicioActual.beneficioErgonomico}
            </div>

            {/* Navegación entre posturas */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={ejercicioActivoIdx === 0}
                onClick={() => setEjercicioActivoIdx((prev) => Math.max(0, prev - 1))}
                className="flex items-center space-x-1 text-xs font-mono text-slate-500 hover:text-slate-900 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <button
                disabled={ejercicioActivoIdx === EJERCICIOS_PAUSAS.length - 1}
                onClick={() => setEjercicioActivoIdx((prev) => Math.min(EJERCICIOS_PAUSAS.length - 1, prev + 1))}
                className="flex items-center space-x-1 text-xs font-mono text-vital-forest font-bold hover:text-emerald-800 disabled:opacity-40"
              >
                <span>Siguiente postura</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Botón Final: Registrar Pausa Activa en el SG-SST */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-sans">
            Al registrar tu pausa activa, ayudas al cumplimiento de los indicadores de medicina preventiva (Ley 1355 de 2009).
          </div>

          <button
            onClick={registrarPausaGlobal}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-vital-forest text-white font-bold font-mono text-xs shadow-lg shadow-emerald-600/30 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>Marcar Pausa Activa Realizada</span>
          </button>
        </div>

        {/* Tarjeta emergente de felicitación al completar */}
        {mostrarFelicitacion && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <strong className="text-sm font-bold block">¡Excelente trabajo! Has cuidado tu salud hoy.</strong>
                <span className="text-xs text-emerald-800">
                  Tu participación ha quedado registrada en el indicador de bienestar SG-SST de la empresa.
                </span>
              </div>
            </div>
            <button
              onClick={() => setMostrarFelicitacion(false)}
              className="text-xs font-mono font-bold text-emerald-800 hover:text-emerald-950 px-3 py-1 rounded bg-white/60"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
