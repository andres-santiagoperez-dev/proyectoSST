'use client';

import React, { useState, useEffect, useRef } from 'react';
import { EjercicioPausaInfo, TipoEjercicioPausa } from '@/types';
import MannequinAnimation from './MannequinAnimation';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Shuffle, 
  Clock, 
  Sparkles, 
  HeartHandshake,
  ShieldCheck,
  Flame,
  Activity,
  Lock,
  Unlock,
  AlertTriangle,
  Maximize2
} from 'lucide-react';

interface ActiveBreakModalProps {
  estaAbierto: boolean;
  ejercicioInicial?: EjercicioPausaInfo;
  catalogoEjercicios: EjercicioPausaInfo[];
  modoBloqueo?: boolean;
  onCerrar: () => void;
  onCompletarPausa: (ejercicio: EjercicioPausaInfo) => void;
  onPosponer?: () => void;
}

const NOMBRES_CORTOS_ZONA: Record<TipoEjercicioPausa, string> = {
  VISUAL_20_20: '👁️ Ojos 20-20',
  CUELLO_TRAPECIO: '🧣 Cuello',
  HOMBROS_ROTACION: '💪 Hombros',
  TUNEL_CARPIANO: '🖐️ Muñecas',
  LUMBAR_POSTURAL: '🧘 Lumbar',
  PIERNAS_CIRCULACION: '🦵 Piernas',
};

export default function ActiveBreakModal({
  estaAbierto,
  ejercicioInicial,
  catalogoEjercicios,
  modoBloqueo = true, // Bloqueo de pantalla completo activado por defecto
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
  const [pantallaCompletaActiva, setPantallaCompletaActiva] = useState<boolean>(false);
  const [alertaIntentoSalida, setAlertaIntentoSalida] = useState<boolean>(false);

  // Sincronizar ejercicio inicial cuando se abre el modal
  useEffect(() => {
    if (ejercicioInicial) {
      setEjercicioActivo(ejercicioInicial);
      setSegundosRestantes(ejercicioInicial.duracionSegundos);
      setEstaContando(true);
      setPasoActual(0);
      setCompletadoConExito(false);
      setAlertaIntentoSalida(false);
    }
  }, [ejercicioInicial, estaAbierto]);

  // Sonido de alerta biomecánica con Web Audio API
  const sonarAlertaSeguridad = () => {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;
      const ctx = new AudioCtxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio silencioso si el navegador lo bloquea
    }
  };

  // 1. Activar Bloqueo de Pantalla Completa y atrapar Teclado
  const forzarPantallaCompleta = () => {
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
          reqFS.call(docEl).then(() => {
            setPantallaCompletaActiva(true);
            setAlertaIntentoSalida(false);
          }).catch(() => {
            // El navegador puede requerir interacción directa del usuario
          });
        } else {
          setPantallaCompletaActiva(true);
        }

        // Bloquear teclas del sistema en navegadores Chromium (Keyboard Lock API)
        if (typeof navigator !== 'undefined' && 'keyboard' in navigator) {
          const navAny = navigator as unknown as { keyboard?: { lock?: (keys: string[]) => Promise<void>; unlock?: () => void } };
          navAny.keyboard?.lock?.(['Escape', 'Tab', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight']).catch(() => {});
        }
      } catch {
        // Ignorar excepciones de política de permisos del navegador
      }
    }
  };

  // Manejador infalible y directo para "Continuar Pausa en Pantalla Completa"
  const handleContinuarPantallaCompleta = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    // Quitar inmediatamente el overlay de advertencia para que el usuario pueda ver la rutina
    setAlertaIntentoSalida(false);
    setEstaContando(true);

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
          await reqFS.call(docEl);
          setPantallaCompletaActiva(true);
        } else {
          setPantallaCompletaActiva(true);
        }

        // Re-enganchar Keyboard Lock API en Chromium
        if (typeof navigator !== 'undefined' && 'keyboard' in navigator) {
          const navAny = navigator as unknown as { keyboard?: { lock?: (keys: string[]) => Promise<void>; unlock?: () => void } };
          navAny.keyboard?.lock?.(['Escape', 'Tab', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight']).catch(() => {});
        }
      } catch (err) {
        console.warn('Pantalla completa restringida por política del navegador:', err);
        // Aun si el navegador bloquea fullscreen nativo, mantenemos la pausa visible sin atrapar al usuario
        setAlertaIntentoSalida(false);
      }
    }
  };

  useEffect(() => {
    if (!estaAbierto) {
      if (typeof document !== 'undefined' && document.fullscreenElement) {
        document.exitFullscreen?.().catch(() => {});
      }
      setPantallaCompletaActiva(false);
      setAlertaIntentoSalida(false);
      return;
    }

    if (modoBloqueo) {
      forzarPantallaCompleta();
    }

    // Escuchar cambios de pantalla completa
    const handleFullscreenChange = () => {
      const docAny = document as unknown as {
        fullscreenElement?: Element | null;
        webkitFullscreenElement?: Element | null;
        mozFullScreenElement?: Element | null;
        msFullscreenElement?: Element | null;
      };
      const esFullscreen = !!(
        document.fullscreenElement ||
        docAny.webkitFullscreenElement ||
        docAny.mozFullScreenElement ||
        docAny.msFullscreenElement
      );

      setPantallaCompletaActiva(esFullscreen);
      if (!esFullscreen && estaAbierto && !completadoConExito) {
        // El usuario intentó salirse de pantalla completa
        sonarAlertaSeguridad();
        setAlertaIntentoSalida(true);
      } else if (esFullscreen) {
        setAlertaIntentoSalida(false);
      }
    };

    // Escuchar si el usuario cambia de pestaña o minimiza (Visibility & Blur)
    const handleVisibilityChange = () => {
      if (document.hidden && estaAbierto && !completadoConExito) {
        sonarAlertaSeguridad();
        setAlertaIntentoSalida(true);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (estaAbierto && !completadoConExito) {
        e.preventDefault();
        e.returnValue = 'Pausa activa ergonómica en curso. Completa la rutina antes de cerrar.';
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (typeof navigator !== 'undefined' && 'keyboard' in navigator) {
        const navAny = navigator as unknown as { keyboard?: { unlock?: () => void } };
        navAny.keyboard?.unlock?.();
      }
    };
  }, [estaAbierto, modoBloqueo, completadoConExito]);

  // 2. Cronómetro regresivo inmersivo
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

  // 3. Interceptar Escape y atajos para evitar cancelar o cerrar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (estaAbierto) {
        if (!completadoConExito) {
          if (e.key === 'Escape' || (e.altKey && e.key === 'F4') || (e.ctrlKey && e.key === 'w')) {
            e.preventDefault();
            e.stopPropagation();
            sonarAlertaSeguridad();
            setAlertaIntentoSalida(true);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [estaAbierto, completadoConExito]);

  const cerrarYSalir = () => {
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    onCerrar();
  };

  const seleccionarAleatorio = () => {
    const otros = catalogoEjercicios.filter((e) => e.id !== ejercicioActivo.id);
    const aleatorio = otros[Math.floor(Math.random() * otros.length)] || catalogoEjercicios[0];
    cambiarEjercicio(aleatorio);
  };

  const cambiarEjercicio = (nuevo: EjercicioPausaInfo) => {
    setEjercicioActivo(nuevo);
    setSegundosRestantes(nuevo.duracionSegundos);
    setEstaContando(true);
    setPasoActual(0);
    setCompletadoConExito(false);
  };

  const finalizarConExito = () => {
    setEstaContando(false);
    setCompletadoConExito(true);
    setAlertaIntentoSalida(false);
  };

  const handleConfirmarRegistro = () => {
    onCompletarPausa(ejercicioActivo);
    cerrarYSalir();
  };

  const handlePosponerProvisional = () => {
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    setAlertaIntentoSalida(false);
    setPantallaCompletaActiva(false);
    if (onPosponer) {
      onPosponer();
    } else {
      onCerrar();
    }
  };

  if (!estaAbierto) return null;

  const progresoPorcentaje = Math.min(
    100,
    Math.round(((ejercicioActivo.duracionSegundos - segundosRestantes) / ejercicioActivo.duracionSegundos) * 100)
  );

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#0E1B2F]/95 backdrop-blur-xl overflow-hidden select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-pausa-activa"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Overlay de Advertencia Obligatoria si el usuario intenta salirse de pantalla completa o cambiar de ventana */}
      {alertaIntentoSalida && !completadoConExito && (
        <div 
          onClick={handleContinuarPantallaCompleta}
          className="fixed inset-0 z-[10000] bg-[#0E1B2F]/98 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center text-white cursor-pointer animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="w-20 h-20 rounded-full bg-red-500/20 border-4 border-red-500 flex items-center justify-center mb-4 text-red-400 animate-pulse">
            <Lock className="w-10 h-10" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#2DD4BF] font-bold mb-1">
            SEGURIDAD Y SALUD EN EL TRABAJO • LEY 1355 DE 2009
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-outfit text-white max-w-xl leading-tight mb-2">
            Puesto de Trabajo Bloqueado por Pausa Vital
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mb-6 leading-relaxed">
            No está permitido cambiar de pestaña, cerrar la ventana ni operar otros programas durante la rutina de descompresión biomecánica.
          </p>

          <button
            type="button"
            onClick={handleContinuarPantallaCompleta}
            className="px-8 py-3.5 rounded-2xl bg-[#1A56DB] hover:bg-blue-700 text-white font-mono text-sm font-bold shadow-xl shadow-[#1A56DB]/30 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer relative z-10"
          >
            <Maximize2 className="w-4 h-4 text-[#2DD4BF]" />
            <span>Continuar Pausa en Pantalla Completa</span>
          </button>

          <div className="mt-6 pt-4 border-t border-slate-700/60 max-w-sm w-full relative z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePosponerProvisional();
              }}
              className="text-xs font-mono text-[#2DD4BF] hover:text-white underline transition-colors cursor-pointer"
            >
              ⏱️ Posponer 5 min (Modo de Prueba Provisional)
            </button>
          </div>
        </div>
      )}

      {/* Contenedor Modal Infranqueable (sin botón X de cierre, con cabecera fija y footer fijo) */}
      <div 
        className="relative w-full max-w-5xl max-h-[96vh] sm:max-h-[92vh] bg-[#FFFFFF] rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#14B8A6]/40 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Banner de Bloqueo Infranqueable Activo */}
        <div className="bg-[#0B7A87] text-white px-4 sm:px-6 py-2 flex items-center justify-between text-[11px] font-mono font-bold border-b border-[#14B8A6]/30 shrink-0">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-[#2DD4BF] animate-pulse" />
            <span className="truncate">SISTEMA BLOQUEADO • PAUSA ACTIVA ERGONÓMICA EN CURSO (INFRANQUEABLE)</span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {!pantallaCompletaActiva && (
              <button
                type="button"
                onClick={handleContinuarPantallaCompleta}
                className="text-[10px] bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-lg text-[#2DD4BF] hover:text-white flex items-center space-x-1 cursor-pointer transition-colors"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Maximizar Pantalla</span>
              </button>
            )}

            {/* BOTÓN PROVISIONAL PARA POSPONER SOLICITADO POR EL USUARIO */}
            <button
              onClick={handlePosponerProvisional}
              className="px-3 py-1 rounded-lg bg-[#0E1B2F] hover:bg-[#152a48] text-[#2DD4BF] border border-[#14B8A6]/40 text-[11px] font-mono flex items-center space-x-1 transition-all active:scale-95 shadow-sm"
              title="Posponer temporalmente la pausa activa (Disponible en modo de prueba)"
            >
              <Clock className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>⏱️ Posponer 5m (Pruebas)</span>
            </button>
          </div>
        </div>

        {/* Cabecera del modal */}
        <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-[#0E1B2F] text-white flex items-center justify-between border-b border-[#64748B]/20 shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#14B8A6]/20 border border-[#14B8A6]/40 flex items-center justify-center text-[#2DD4BF] shrink-0">
              <Lock className="w-4 h-4 text-[#2DD4BF]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#34D399] font-bold truncate">
                  Puesto de Trabajo Protegido
                </span>
                <span className="text-[9px] bg-[#14B8A6]/20 text-[#2DD4BF] px-1.5 py-0.5 rounded-full border border-[#14B8A6]/30 font-mono shrink-0">
                  Ley 1355/2009
                </span>
              </div>
              <h2 id="titulo-pausa-activa" className="text-base sm:text-xl font-black font-outfit text-white truncate">
                {ejercicioActivo.titulo}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 ml-3">
            {/* Botón selector de rutina aleatoria alternativa */}
            <button
              onClick={seleccionarAleatorio}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#0B7A87] hover:bg-[#09606a] text-white text-xs font-mono transition-all border border-[#14B8A6]/30 active:scale-95 shadow-sm"
              title="Seleccionar otra pausa activa de forma aleatoria"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span>Cambiar pausa</span>
            </button>
          </div>
        </div>

        {/* Barra de progreso visual (fija) */}
        <div className="w-full bg-[#F8FAFC] h-1.5 shrink-0">
          <div 
            className="bg-gradient-to-r from-[#10B981] via-[#14B8A6] to-[#1A56DB] h-1.5 transition-all duration-1000 ease-linear"
            style={{ width: `${progresoPorcentaje}%` }}
          />
        </div>

        {/* Selector de Zona Muscular (fijo) */}
        <div className="bg-[#F8FAFC] px-4 sm:px-6 py-2 border-b border-[#64748B]/15 flex items-center justify-between gap-2 text-xs shrink-0 overflow-x-auto">
          <div className="flex items-center space-x-1.5 text-[#0E1B2F] font-mono shrink-0">
            <Activity className="w-3.5 h-3.5 text-[#0B7A87]" />
            <span className="font-bold text-[11px] hidden sm:inline">Zona:</span>
          </div>
          <div className="flex items-center space-x-1.5 shrink-0">
            {catalogoEjercicios.map((ej) => {
              const esActivo = ej.id === ejercicioActivo.id;
              const etiquetaCorta = NOMBRES_CORTOS_ZONA[ej.id] || ej.titulo.split(' ')[0];
              return (
                <button
                  key={ej.id}
                  onClick={() => cambiarEjercicio(ej)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all shrink-0 active:scale-95 ${
                    esActivo
                      ? 'bg-[#1A56DB] text-white font-bold shadow-xs'
                      : 'bg-white hover:bg-slate-200 text-[#64748B] border border-[#64748B]/20'
                  }`}
                  title={ej.titulo}
                >
                  {etiquetaCorta}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cuerpo del modal (Desplazable en pantallas bajas) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {completadoConExito ? (
            /* Vista de felicitación por completar */
            <div className="text-center py-6 sm:py-10 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#10B981]/15 border-4 border-[#10B981] text-[#047857] flex items-center justify-center mx-auto shadow-lg shadow-[#10B981]/20">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#10B981]" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-[#10B981]/15 text-[#047857] border border-[#10B981]/30 text-[11px] font-mono font-bold">
                  <Unlock className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>BLOQUEO LEVANTADO AUTOMÁTICAMENTE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-outfit text-[#0E1B2F]">
                  ¡Pausa Completada con Éxito! 🎉
                </h3>
                <p className="text-[#64748B] text-xs sm:text-sm font-medium leading-relaxed">
                  Has completado la rutina de <strong className="text-[#0E1B2F]">{ejercicioActivo.titulo}</strong>. El equipo ha sido desbloqueado y puedes reanudar tus labores.
                </p>
                <div className="p-3 bg-[#10B981]/10 rounded-xl border border-[#10B981]/30 text-xs font-mono text-[#047857]">
                  ✓ Cumplimiento sumado a tu historial diario y al reporte de ergonomía COPASST.
                </div>
              </div>
            </div>
          ) : (
            /* Vista principal interactiva con muñeco biomecánico en bucle y controles */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
              
              {/* Columna Izquierda: DEMOSTRACIÓN ANIMADA DEL MUÑECO TIPO GIF */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#64748B] uppercase tracking-wide font-bold">
                    Demostración biomecánica en bucle:
                  </span>
                  <span className="text-[10px] font-mono text-[#047857] bg-[#10B981]/15 border border-[#10B981]/30 px-2 py-0.5 rounded-full font-bold">
                    {ejercicioActivo.zonaCuerpo.split(',')[0]}
                  </span>
                </div>

                {/* Componente del Muñeco Biomecánico */}
                <MannequinAnimation 
                  ejercicioId={ejercicioActivo.id}
                  duracionSegundos={ejercicioActivo.duracionSegundos}
                  tamano="compacto"
                />

                <p className="text-[11px] text-[#64748B] italic text-center font-medium">
                  Replica el movimiento biomecánico mostrado en pantalla de forma suave y sin sobreesfuerzo.
                </p>
              </div>

              {/* Columna Derecha: Cronómetro circular y Pasos de postura */}
              <div className="lg:col-span-6 space-y-3 sm:space-y-4">
                
                {/* Cronómetro visual inmersivo */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F8FAFC] border border-[#64748B]/20 flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                      <svg className="w-14 h-14 transform -rotate-90">
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          stroke="#E2E8F0"
                          strokeWidth="3.5"
                          fill="none"
                        />
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          stroke="#14B8A6"
                          strokeWidth="3.5"
                          strokeDasharray={150.8}
                          strokeDashoffset={150.8 * (1 - progresoPorcentaje / 100)}
                          strokeLinecap="round"
                          fill="none"
                          className="transition-all duration-1000 ease-linear"
                        />
                      </svg>
                      <span className="absolute font-mono font-black text-base text-[#0E1B2F] num-tabular">
                        {segundosRestantes}s
                      </span>
                    </div>

                    <div>
                      <p className="text-[10px] font-mono text-[#64748B]">Tiempo restante obligatorio:</p>
                      <p className="text-xs sm:text-sm font-bold text-[#0E1B2F] font-outfit">
                        {estaContando ? 'Pausa en ejecución activa' : 'Pausa pausada temporalmente'}
                      </p>
                    </div>
                  </div>

                  {/* Controles de Play / Pause / Reset */}
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <button
                      onClick={() => setEstaContando(!estaContando)}
                      className="p-2 rounded-xl bg-[#1A56DB] text-white hover:bg-blue-700 transition-colors shadow-xs active:scale-95"
                      title={estaContando ? 'Pausar cronómetro' : 'Continuar cronómetro'}
                      aria-label={estaContando ? 'Pausar cronómetro' : 'Reanudar cronómetro'}
                    >
                      {estaContando ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        setSegundosRestantes(ejercicioActivo.duracionSegundos);
                        setEstaContando(false);
                      }}
                      className="p-2 rounded-xl bg-[#FFFFFF] text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-200 transition-colors border border-[#64748B]/20 active:scale-95"
                      title="Reiniciar cronómetro"
                      aria-label="Reiniciar tiempo de ejercicio"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Pasos guiados de postura */}
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] font-bold">
                    Instrucciones ergonómicas paso a paso:
                  </h4>
                  <div className="space-y-1.5 max-h-36 sm:max-h-44 overflow-y-auto pr-1">
                    {ejercicioActivo.instrucciones.map((instruccion, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-xl border text-xs flex items-start space-x-2 transition-all cursor-pointer ${
                          pasoActual === idx
                            ? 'bg-teal-50/90 border-[#14B8A6] text-[#0E1B2F] font-medium shadow-xs'
                            : 'bg-[#FFFFFF] border-[#64748B]/15 text-[#64748B] hover:bg-slate-50'
                        }`}
                        onClick={() => setPasoActual(idx)}
                      >
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5 ${
                          pasoActual === idx 
                            ? 'bg-[#14B8A6] text-white font-bold' 
                            : 'bg-slate-200 text-[#64748B]'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{instruccion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Beneficio preventivo SG-SST */}
                <div className="p-2.5 bg-[#10B981]/10 rounded-xl border border-[#10B981]/25 text-xs text-[#047857] flex items-start space-x-2">
                  <HeartHandshake className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold">Beneficio preventivo: </strong>
                    <span className="font-medium">{ejercicioActivo.beneficioErgonomico}</span>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Pie de acciones del modal (Fijo al fondo, sin botón de cancelar) */}
        <div className="px-4 sm:px-6 py-3 bg-[#F8FAFC] border-t border-[#64748B]/15 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={seleccionarAleatorio}
            className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl border border-[#0B7A87]/30 text-[#0B7A87] bg-white hover:bg-teal-50 text-xs font-mono font-bold transition-all active:scale-95"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span className="hidden sm:inline">Lanzar otra rutina aleatoria</span>
            <span className="sm:hidden">Otra rutina</span>
          </button>

          <div className="flex items-center space-x-2">
            {/* Botón Provisional para Posponer (Pruebas) */}
            <button
              onClick={handlePosponerProvisional}
              className="px-3.5 py-2 rounded-xl border border-[#0B7A87]/30 bg-white hover:bg-teal-50 text-[#0B7A87] font-mono text-xs font-bold transition-all active:scale-95 flex items-center space-x-1"
              title="Posponer temporalmente por 5 minutos (Provisional para pruebas)"
            >
              <Clock className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Posponer 5m (Pruebas)</span>
            </button>

            {completadoConExito ? (
              <button
                onClick={handleConfirmarRegistro}
                className="flex items-center justify-center space-x-1.5 px-5 py-2 rounded-xl bg-[#1A56DB] hover:bg-blue-700 text-white font-mono text-xs font-bold shadow-md shadow-[#1A56DB]/25 transition-all active:scale-95"
              >
                <ShieldCheck className="w-4 h-4 text-[#2DD4BF]" />
                <span>Desbloquear y volver al trabajo</span>
              </button>
            ) : (
              <button
                onClick={finalizarConExito}
                className="flex items-center justify-center space-x-1.5 px-4 sm:px-5 py-2 rounded-xl bg-[#047857] hover:bg-[#035f45] text-white font-mono text-xs font-bold shadow-md shadow-[#047857]/20 transition-all active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4 text-[#34D399]" />
                <span>Terminar y Registrar</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
