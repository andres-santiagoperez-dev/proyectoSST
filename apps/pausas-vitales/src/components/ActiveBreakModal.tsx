'use client';

import React, { useState, useEffect } from 'react';
import { EjercicioPausaInfo, TipoEjercicioPausa } from '@/types';
import MannequinAnimation from './MannequinAnimation';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Shuffle, 
  Clock, 
  Sparkles, 
  HeartHandshake,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface ActiveBreakModalProps {
  estaAbierto: boolean;
  ejercicioInicial?: EjercicioPausaInfo;
  catalogoEjercicios: EjercicioPausaInfo[];
  onCerrar: () => void;
  onCompletarPausa: (ejercicio: EjercicioPausaInfo) => void;
  onPosponer?: () => void;
}

export default function ActiveBreakModal({
  estaAbierto,
  ejercicioInicial,
  catalogoEjercicios,
  onCerrar,
  onCompletarPausa,
  onPosponer,
}: ActiveBreakModalProps) {
  const [ejercicioActivo, setEjercicioActivo] = useState<EjercicioPausaInfo>(
    ejercicioInicial || catalogoEjercicios[0]
  );
  const [segundosRestantes, setSegundosRestantes] = useState<number>(
    (ejercicioInicial || catalogoEjercicios[0]).duracionSegundos
  );
  const [estaContando, setEstaContando] = useState<boolean>(true);
  const [pasoActual, setPasoActual] = useState<number>(0);
  const [completadoConExito, setCompletadoConExito] = useState<boolean>(false);

  // Sincronizar ejercicio inicial cuando se abre el modal
  useEffect(() => {
    if (ejercicioInicial) {
      setEjercicioActivo(ejercicioInicial);
      setSegundosRestantes(ejercicioInicial.duracionSegundos);
      setEstaContando(true);
      setPasoActual(0);
      setCompletadoConExito(false);
    }
  }, [ejercicioInicial, estaAbierto]);

  // Cronómetro del ejercicio guiado
  useEffect(() => {
    if (!estaAbierto || !estaContando || completadoConExito) return;

    const timer = setInterval(() => {
      setSegundosRestantes((prev) => {
        if (prev <= 1) {
          finalizarConExito();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [estaAbierto, estaContando, completadoConExito]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && estaAbierto) {
        onCerrar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [estaAbierto, onCerrar]);

  const seleccionarAleatorio = () => {
    const otros = catalogoEjercicios.filter((e) => e.id !== ejercicioActivo.id);
    const aleatorio = otros[Math.floor(Math.random() * otros.length)] || catalogoEjercicios[0];
    setEjercicioActivo(aleatorio);
    setSegundosRestantes(aleatorio.duracionSegundos);
    setEstaContando(true);
    setPasoActual(0);
    setCompletadoConExito(false);
  };

  const finalizarConExito = () => {
    setEstaContando(false);
    setCompletadoConExito(true);
  };

  const handleConfirmarRegistro = () => {
    onCompletarPausa(ejercicioActivo);
    onCerrar();
  };

  if (!estaAbierto) return null;

  const progresoPorcentaje = Math.min(
    100,
    Math.round(((ejercicioActivo.duracionSegundos - segundosRestantes) / ejercicioActivo.duracionSegundos) * 100)
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-pausa-activa"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-vital-border overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabecera del modal */}
        <div className="px-6 py-4 bg-gradient-to-r from-vital-forest to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-vital-terracotta/20 border border-vital-terracotta flex items-center justify-center text-vital-terracotta">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">
                  Pausa Activa Laboral en Curso
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                  Ley 1355/2009
                </span>
              </div>
              <h2 id="titulo-pausa-activa" className="text-xl sm:text-2xl font-black font-outfit text-white">
                {ejercicioActivo.titulo}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={seleccionarAleatorio}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors border border-white/20"
              title="Seleccionar otra pausa aleatoria"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-300" />
              <span>Cambiar pausa aleatoria</span>
            </button>
            <button
              onClick={onCerrar}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Cerrar ventana de pausa activa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Barra de progreso de la pausa */}
        <div className="w-full bg-slate-100 h-2">
          <div 
            className="bg-gradient-to-r from-emerald-500 via-vital-terracotta to-amber-500 h-2 transition-all duration-1000 ease-linear"
            style={{ width: `${progresoPorcentaje}%` }}
          ></div>
        </div>

        {/* Cuerpo del modal */}
        <div className="p-6 sm:p-8">
          {completadoConExito ? (
            /* Vista de felicitación por completar */
            <div className="text-center py-10 space-y-5 animate-in fade-in duration-300">
              <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black font-outfit text-vital-forest">
                  ¡Excelente trabajo! 🎉
                </h3>
                <p className="text-slate-600 text-sm">
                  Has completado la pausa activa de <strong className="text-vital-forest">{ejercicioActivo.titulo}</strong>. Tus articulaciones y tu mente están oxigenadas y listas para continuar.
                </p>
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-mono text-emerald-800">
                  ✓ Registro sumado a tu historial diario de ergonomía y al informe COPASST.
                </div>
              </div>
              <div className="pt-4 flex justify-center space-x-3">
                <button
                  onClick={handleConfirmarRegistro}
                  className="px-6 py-3 rounded-2xl bg-vital-forest text-white font-mono text-sm font-bold shadow-lg shadow-vital-forest/20 hover:bg-slate-900 transition-all flex items-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Guardar y volver a mis labores</span>
                </button>
              </div>
            </div>
          ) : (
            /* Vista principal con muñeco animado en bucle y controles */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Columna Izquierda: DEMOSTRACIÓN ANIMADA DEL MUÑECO TIPO GIF */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wide">
                    Demostración visual del movimiento:
                  </span>
                  <span className="text-xs font-mono text-vital-terracotta font-semibold">
                    Zona: {ejercicioActivo.zonaCuerpo}
                  </span>
                </div>

                {/* Componente del Muñeco Biomecánico */}
                <MannequinAnimation 
                  ejercicioId={ejercicioActivo.id}
                  duracionSegundos={ejercicioActivo.duracionSegundos}
                  tamano="amplio"
                />

                <p className="text-xs text-slate-500 italic text-center">
                  Observa la animación en bucle y replica el movimiento a tu propio ritmo, sin tirones bruscos.
                </p>
              </div>

              {/* Columna Derecha: Cronómetro circular y Pasos */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Cronómetro y cuenta regresiva */}
                <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="#E2E8F0"
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="#F48C42"
                          strokeWidth="4"
                          strokeDasharray={175.9}
                          strokeDashoffset={175.9 * (1 - progresoPorcentaje / 100)}
                          strokeLinecap="round"
                          fill="none"
                          className="transition-all duration-1000 ease-linear"
                        />
                      </svg>
                      <span className="absolute font-mono font-black text-lg text-vital-forest">
                        {segundosRestantes}s
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-mono text-slate-500">Tiempo restante:</p>
                      <p className="text-sm font-bold text-vital-forest font-outfit">
                        {estaContando ? 'Pausa en ejecución activa' : 'Pausa en espera'}
                      </p>
                    </div>
                  </div>

                  {/* Controles de Play / Pause / Reset */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEstaContando(!estaContando)}
                      className="p-2.5 rounded-xl bg-vital-forest text-white hover:bg-slate-900 transition-colors shadow-sm"
                      title={estaContando ? 'Pausar temporizador' : 'Continuar temporizador'}
                      aria-label={estaContando ? 'Pausar cronómetro' : 'Reanudar cronómetro'}
                    >
                      {estaContando ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        setSegundosRestantes(ejercicioActivo.duracionSegundos);
                        setEstaContando(false);
                      }}
                      className="p-2.5 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                      title="Reiniciar cronómetro"
                      aria-label="Reiniciar tiempo de ejercicio"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Pasos guiados de la postura */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Instrucciones paso a paso:
                  </h4>
                  <div className="space-y-2">
                    {ejercicioActivo.instrucciones.map((instruccion, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl border text-xs sm:text-sm flex items-start space-x-2.5 transition-all ${
                          pasoActual === idx
                            ? 'bg-amber-50/80 border-amber-300 text-slate-900 font-medium shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                        onClick={() => setPasoActual(idx)}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5 ${
                          pasoActual === idx ? 'bg-amber-500 text-white font-bold' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {idx + 1}
                        </span>
                        <span>{instruccion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Beneficio ergonómico */}
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start space-x-2">
                  <HeartHandshake className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold">Beneficio preventivo: </strong>
                    <span>{ejercicioActivo.beneficioErgonomico}</span>
                  </div>
                </div>

                {/* Botones de acción inferior */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={seleccionarAleatorio}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-mono transition-colors"
                  >
                    <Shuffle className="w-4 h-4 text-vital-terracotta" />
                    <span>Lanzar otra pausa aleatoria</span>
                  </button>

                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    {onPosponer && (
                      <button
                        onClick={onPosponer}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-mono transition-colors"
                        title="Posponer alarma 5 minutos"
                      >
                        Posponer 5 min
                      </button>
                    )}
                    <button
                      onClick={finalizarConExito}
                      className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-vital-forest hover:bg-slate-900 text-white font-mono text-xs font-bold shadow-md shadow-vital-forest/20 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Terminar y Registrar</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
