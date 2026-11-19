'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Clock, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Shuffle,
  Music,
  Flame,
  ShieldCheck,
  Lock,
  Unlock,
  Info
} from 'lucide-react';
import { EJERCICIOS_PAUSAS } from '@/lib/data-mock';
import { EjercicioPausaInfo } from '@/types';
import ActiveBreakModal from './ActiveBreakModal';

interface AlarmSchedulerProps {
  onPausaCompletadaGlobal?: (ejercicio: EjercicioPausaInfo) => void;
}

export default function AlarmScheduler({ onPausaCompletadaGlobal }: AlarmSchedulerProps) {
  const [frecuenciaMinutos, setFrecuenciaMinutos] = useState<number>(60);
  const [segundosRestantes, setSegundosRestantes] = useState<number>(60 * 60);
  const [estaCorriendo, setEstaCorriendo] = useState<boolean>(true);
  const [sonidoHabilitado, setSonidoHabilitado] = useState<boolean>(true);
  const [tipoSonido, setTipoSonido] = useState<'chime' | 'bosque' | 'arpegio'>('chime');
  const [permisoNotificacion, setPermisoNotificacion] = useState<string>('default');
  const [modoBloqueoKiosko, setModoBloqueoKiosko] = useState<boolean>(true);
  
  // Estado para el modal de pausa activa aleatoria
  const [mostrarModalPausa, setMostrarModalPausa] = useState<boolean>(false);
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState<EjercicioPausaInfo>(EJERCICIOS_PAUSAS[0]);
  const [pausasHoy, setPausasHoy] = useState<number>(0);

  // Leer pausas hoy de localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hoy = new Date().toISOString().split('T')[0];
      const count = parseInt(localStorage.getItem(`pausas_hoy_${hoy}`) || '2', 10);
      setPausasHoy(count);
    }
  }, []);

  // Reproductor de sonido armónico suave usando Web Audio API
  const reproducirChimeArmonico = (tipo = tipoSonido) => {
    if (!sonidoHabilitado || typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();

      let frecuencias = [528, 660, 792]; // Chime tibetano por defecto
      if (tipo === 'bosque') {
        frecuencias = [432, 576, 720]; // Tono tierra relajante
      } else if (tipo === 'arpegio') {
        frecuencias = [440, 554.37, 659.25, 880]; // Acorde Mayor La
      }

      frecuencias.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1 / (idx + 1), ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + 2.8);
      });
    } catch (e) {
      console.warn('AudioContext no soportado o bloqueado:', e);
    }
  };

  // Solicitar permiso de notificaciones
  const solicitarPermisoNotificaciones = async () => {
    if ('Notification' in window) {
      const resp = await Notification.requestPermission();
      setPermisoNotificacion(resp);
    }
  };

  useEffect(() => {
    if ('Notification' in window) {
      setPermisoNotificacion(Notification.permission);
    }
  }, []);

  // Temporizador regresivo continuo
  useEffect(() => {
    if (!estaCorriendo) return;

    const timer = setInterval(() => {
      setSegundosRestantes((prev) => {
        if (prev <= 1) {
          dispararAlarmaAleatoria();
          return frecuenciaMinutos * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [estaCorriendo, frecuenciaMinutos]);

  // Disparo automático o manual de pausa aleatoria
  const dispararAlarmaAleatoria = () => {
    // 1. Seleccionar un ejercicio aleatorio entre los 6 tipos de pausa
    const indiceAleatorio = Math.floor(Math.random() * EJERCICIOS_PAUSAS.length);
    const ejercicio = EJERCICIOS_PAUSAS[indiceAleatorio];
    setEjercicioSeleccionado(ejercicio);

    // 2. Tocar sonido armónico
    reproducirChimeArmonico();

    // 3. Notificación de escritorio si está permitida
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`¡Hora de tu Pausa Activa! 🌿`, {
        body: `Pausa aleatoria sugerida: ${ejercicio.titulo}. 3 minutos para cuidar tu salud.`,
        icon: '/favicon.ico',
      });
    }

    // 4. Abrir modal interactivo con el muñeco animado
    setMostrarModalPausa(true);
  };

  const cambiarFrecuencia = (minutos: number) => {
    setFrecuenciaMinutos(minutos);
    setSegundosRestantes(minutos * 60);
  };

  const posponer5Min = () => {
    setMostrarModalPausa(false);
    setSegundosRestantes(5 * 60);
  };

  const handleCompletarPausa = (ejercicio: EjercicioPausaInfo) => {
    if (typeof window !== 'undefined') {
      const hoy = new Date().toISOString().split('T')[0];
      const count = parseInt(localStorage.getItem(`pausas_hoy_${hoy}`) || '0', 10) + 1;
      localStorage.setItem(`pausas_hoy_${hoy}`, count.toString());
      setPausasHoy(count);
    }
    if (onPausaCompletadaGlobal) {
      onPausaCompletadaGlobal(ejercicio);
    }
  };

  const formatearTiempo = (totalSegundos: number) => {
    const mins = Math.floor(totalSegundos / 60);
    const secs = totalSegundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const porcentajeTranscurrido = ((frecuenciaMinutos * 60 - segundosRestantes) / (frecuenciaMinutos * 60)) * 100;

  return (
    <>
      <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#64748B]/20 flex flex-col justify-between h-full">
        <div>
          {/* Cabecera */}
          <div className="flex items-center justify-between pb-4 border-b border-[#64748B]/10 mb-6">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#0B7A87]/15 flex items-center justify-center text-[#0B7A87]">
                <Clock className="w-5 h-5 text-[#0B7A87]" />
              </div>
              <div>
                <h3 className="font-black text-lg text-[#0E1B2F] font-outfit">
                  Motor de Alarmas Periódicas
                </h3>
                <p className="text-[11px] font-mono text-[#64748B]">
                  Ley 1355/2009 • Estilos de Vida Saludables
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSonidoHabilitado(!sonidoHabilitado)}
                className={`p-2 rounded-xl transition-all border ${
                  sonidoHabilitado 
                    ? 'bg-[#10B981]/15 text-[#047857] border-[#10B981]/30' 
                    : 'bg-[#F8FAFC] text-[#64748B] border-[#64748B]/20'
                }`}
                title={sonidoHabilitado ? 'Sonido armónico activado' : 'Sonido silenciado'}
                aria-label={sonidoHabilitado ? 'Silenciar alarma' : 'Activar sonido de alarma'}
              >
                {sonidoHabilitado ? <Volume2 className="w-4 h-4 text-[#10B981]" /> : <VolumeX className="w-4 h-4 text-[#64748B]" />}
              </button>
            </div>
          </div>

          {/* Racha y Telemetría de Hoy */}
          <div className="mb-5 p-3.5 bg-gradient-to-r from-[#10B981]/10 via-[#14B8A6]/10 to-[#0B7A87]/10 border border-[#14B8A6]/30 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Flame className="w-5 h-5 text-[#10B981]" />
              <div>
                <span className="text-xs font-bold text-[#0E1B2F] block font-outfit">
                  Racha semanal: 4 días activos
                </span>
                <span className="text-[11px] text-[#047857] font-mono num-tabular">
                  {pausasHoy} pausas activas registradas hoy
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-[#FFFFFF] px-2.5 py-1 rounded-xl text-[#047857] shadow-xs border border-[#10B981]/30 num-tabular">
              {pausasHoy >= 2 ? 'Meta 100% ✓' : 'Meta 50%'}
            </span>
          </div>

          {/* Selector de Intervalo de Alarma */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#0E1B2F] font-mono">
                INTERVALO DE FRECUENCIA:
              </label>
              <span className="text-[11px] font-mono text-[#0B7A87] font-bold">
                Cada {frecuenciaMinutos} minutos
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[30, 45, 60, 90].map((min) => (
                <button
                  key={min}
                  onClick={() => cambiarFrecuencia(min)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    frecuenciaMinutos === min
                      ? 'bg-[#1A56DB] text-white shadow-md shadow-[#1A56DB]/20 scale-[1.02]'
                      : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-200 border border-[#64748B]/15'
                  }`}
                >
                  {min} min
                </button>
              ))}
            </div>
          </div>

          {/* Toggle de Modo Bloqueo Kiosko de Pantalla Completa */}
          <div className="mb-4 p-3 rounded-2xl bg-[#F8FAFC] border border-[#64748B]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-lg ${modoBloqueoKiosko ? 'bg-[#0B7A87] text-white' : 'bg-slate-200 text-[#64748B]'}`}>
                  {modoBloqueoKiosko ? <Lock className="w-4 h-4 text-[#2DD4BF]" /> : <Unlock className="w-4 h-4" />}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#0E1B2F] block">
                    MODO BLOQUEO KIOSKO
                  </span>
                  <span className="text-[10px] text-[#64748B] font-sans">
                    {modoBloqueoKiosko ? 'Aislará pantalla completa al sonar' : 'Modal interactivo flotante normal'}
                  </span>
                </div>
              </div>

              {/* Interruptor Toggle */}
              <button
                type="button"
                onClick={() => setModoBloqueoKiosko(!modoBloqueoKiosko)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  modoBloqueoKiosko ? 'bg-[#14B8A6]' : 'bg-slate-300'
                }`}
                role="switch"
                aria-checked={modoBloqueoKiosko}
                title={modoBloqueoKiosko ? 'Desactivar modo bloqueo kiosko' : 'Activar modo bloqueo kiosko'}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    modoBloqueoKiosko ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Selector de Tono Armónico Relajante */}
          <div className="mb-4 p-3 rounded-2xl bg-[#F8FAFC] border border-[#64748B]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#0E1B2F] flex items-center space-x-1.5 font-bold">
                <Music className="w-3.5 h-3.5 text-[#0B7A87]" />
                <span>TONO DE ALARMA (WEB AUDIO API):</span>
              </span>
              <button
                onClick={() => reproducirChimeArmonico()}
                className="text-[10px] font-mono text-[#0B7A87] hover:underline font-bold"
              >
                Probar tono 🔔
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
              <button
                onClick={() => {
                  setTipoSonido('chime');
                  reproducirChimeArmonico('chime');
                }}
                className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                  tipoSonido === 'chime' 
                    ? 'bg-white border-[#14B8A6] text-[#0B7A87] font-bold shadow-xs' 
                    : 'border-transparent text-[#64748B] hover:text-[#0E1B2F]'
                }`}
              >
                Tíbet (528 Hz)
              </button>
              <button
                onClick={() => {
                  setTipoSonido('bosque');
                  reproducirChimeArmonico('bosque');
                }}
                className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                  tipoSonido === 'bosque' 
                    ? 'bg-white border-[#14B8A6] text-[#0B7A87] font-bold shadow-xs' 
                    : 'border-transparent text-[#64748B] hover:text-[#0E1B2F]'
                }`}
              >
                Bosque (432 Hz)
              </button>
              <button
                onClick={() => {
                  setTipoSonido('arpegio');
                  reproducirChimeArmonico('arpegio');
                }}
                className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                  tipoSonido === 'arpegio' 
                    ? 'bg-white border-[#14B8A6] text-[#0B7A87] font-bold shadow-xs' 
                    : 'border-transparent text-[#64748B] hover:text-[#0E1B2F]'
                }`}
              >
                Arpegio Mayor
              </button>
            </div>
          </div>

          {/* Cronómetro Visual y Barra de Progreso */}
          <div className="bg-[#F8FAFC] p-4 rounded-3xl border border-[#64748B]/20 text-center my-2">
            <span className="text-[11px] font-mono text-[#64748B] tracking-wider uppercase block mb-1">
              TIEMPO PARA LA PRÓXIMA ALARMA
            </span>
            <div className="text-4xl font-black text-[#0E1B2F] font-mono tracking-tight my-1 num-tabular">
              {formatearTiempo(segundosRestantes)}
            </div>

            {/* Barra de Progreso */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-3">
              <div
                className="bg-gradient-to-r from-[#14B8A6] via-[#10B981] to-[#1A56DB] h-full transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${porcentajeTranscurrido}%` }}
              />
            </div>
          </div>
        </div>

        {/* Acciones Principales: Lanzar Pausa Aleatoria / Pausar / Probar */}
        <div className="space-y-3 pt-4 border-t border-[#64748B]/10">
          
          {/* BOTÓN DESTACADO: MANDAR PAUSA ALEATORIA DE FORMA INMEDIATA */}
          <button
            onClick={dispararAlarmaAleatoria}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#1A56DB] to-[#0B7A87] hover:from-[#0B7A87] hover:to-[#1A56DB] text-white font-mono text-xs sm:text-sm font-bold shadow-lg shadow-[#1A56DB]/25 transition-all flex items-center justify-center space-x-2 group hover:scale-[1.01] active:scale-95"
          >
            <Shuffle className="w-4 h-4 text-[#2DD4BF] group-hover:rotate-180 transition-transform duration-500" />
            <span>MANDAR PAUSA ALEATORIA AL EMPLEADO</span>
            <Sparkles className="w-4 h-4 text-[#2DD4BF]" />
          </button>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setEstaCorriendo(!estaCorriendo)}
              className="flex-1 py-2 px-3 rounded-xl bg-[#0B7A87] text-white text-xs font-mono font-bold hover:bg-[#08626d] transition-all flex items-center justify-center space-x-1.5 active:scale-95"
            >
              {estaCorriendo ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#2DD4BF]" />}
              <span>{estaCorriendo ? 'Pausar Reloj' : 'Reanudar Reloj'}</span>
            </button>

            <button
              onClick={() => setSegundosRestantes(frecuenciaMinutos * 60)}
              className="p-2 rounded-xl bg-[#F8FAFC] text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-200 text-xs transition-all border border-[#64748B]/20 active:scale-95"
              title="Reiniciar contador de alarma"
              aria-label="Reiniciar contador de tiempo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Permiso de Notificaciones */}
          {permisoNotificacion !== 'granted' && (
            <button
              onClick={solicitarPermisoNotificaciones}
              className="w-full text-center text-[11px] text-[#0B7A87] bg-teal-50 border border-teal-200 py-1.5 px-3 rounded-xl hover:bg-teal-100 transition-colors flex items-center justify-center space-x-1.5 font-mono"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#0B7A87]" />
              <span>Habilitar alertas de escritorio en segundo plano</span>
            </button>
          )}
        </div>
      </div>

      {/* Modal Interactivo de Pausa Activa con Muñeco Animado tipo GIF y Soporte de Modo Bloqueo */}
      <ActiveBreakModal
        estaAbierto={mostrarModalPausa}
        ejercicioInicial={ejercicioSeleccionado}
        catalogoEjercicios={EJERCICIOS_PAUSAS}
        modoBloqueo={modoBloqueoKiosko}
        onCerrar={() => setMostrarModalPausa(false)}
        onCompletarPausa={handleCompletarPausa}
        onPosponer={posponer5Min}
      />
    </>
  );
}
