'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Clock, 
  Volume2, 
  VolumeX, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Shuffle,
  Music
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

  // Reproductor de sonido armónico suave usando Web Audio API (sin archivos externos)
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
        gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + 2.8);
      });
    } catch (e) {
      console.warn('AudioContext bloqueado o no soportado:', e);
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
    // 1. Seleccionar un ejercicio aleatorio del catálogo de 6 pausas
    const indiceAleatorio = Math.floor(Math.random() * EJERCICIOS_PAUSAS.length);
    const ejercicio = EJERCICIOS_PAUSAS[indiceAleatorio];
    setEjercicioSeleccionado(ejercicio);

    // 2. Tocar sonido armónico
    reproducirChimeArmonico();

    // 3. Notificación de escritorio si está permitida
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`¡Hora de tu Pausa Activa! 🌿`, {
        body: `Pausa aleatoria asignada: ${ejercicio.titulo}. 3 minutos para cuidar tu salud.`,
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
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-vital-border flex flex-col justify-between h-full">
        <div>
          {/* Cabecera */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-vital-terracotta/15 flex items-center justify-center text-vital-terracotta">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-vital-forest font-outfit">
                  Motor de Alarmas Periódicas
                </h3>
                <p className="text-[11px] font-mono text-slate-500">
                  Ley 1355/2009 • Estilos de Vida Saludables
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSonidoHabilitado(!sonidoHabilitado)}
                className={`p-2 rounded-xl transition-all ${
                  sonidoHabilitado ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400'
                }`}
                title={sonidoHabilitado ? 'Sonido armónico activado' : 'Sonido silenciado'}
                aria-label={sonidoHabilitado ? 'Silenciar alarma' : 'Activar sonido de alarma'}
              >
                {sonidoHabilitado ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Racha y Telemetría de Hoy */}
          <div className="mb-5 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🔥</span>
              <div>
                <span className="text-xs font-bold text-emerald-900 block font-outfit">
                  Racha semanal: 4 días activos
                </span>
                <span className="text-[11px] text-emerald-700 font-mono">
                  {pausasHoy} pausas activas registradas hoy
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded-xl text-emerald-800 shadow-sm border border-emerald-200">
              Cumplido: {pausasHoy >= 2 ? '100% ✓' : '50%'}
            </span>
          </div>

          {/* Selector de Intervalo de Alarma */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 font-mono">
                INTERVALO DE FRECUENCIA:
              </label>
              <span className="text-[11px] font-mono text-vital-terracotta font-semibold">
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
                      ? 'bg-vital-forest text-white shadow-md shadow-vital-forest/20 scale-[1.02]'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {min} min
                </button>
              ))}
            </div>
          </div>

          {/* Selector de Tono Armónico Relajante */}
          <div className="mb-5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-600 flex items-center space-x-1.5 font-bold">
                <Music className="w-3.5 h-3.5 text-vital-forest" />
                <span>TONO DE ALARMA (WEB AUDIO API):</span>
              </span>
              <button
                onClick={() => reproducirChimeArmonico()}
                className="text-[10px] font-mono text-vital-terracotta hover:underline font-bold"
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
                  tipoSonido === 'chime' ? 'bg-white border-vital-forest text-vital-forest font-bold shadow-sm' : 'border-transparent text-slate-500'
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
                  tipoSonido === 'bosque' ? 'bg-white border-vital-forest text-vital-forest font-bold shadow-sm' : 'border-transparent text-slate-500'
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
                  tipoSonido === 'arpegio' ? 'bg-white border-vital-forest text-vital-forest font-bold shadow-sm' : 'border-transparent text-slate-500'
                }`}
              >
                Arpegio Mayor
              </button>
            </div>
          </div>

          {/* Cronómetro Visual y Barra de Progreso */}
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 text-center my-2">
            <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase block mb-1">
              TIEMPO PARA LA PRÓXIMA ALARMA
            </span>
            <div className="text-4xl sm:text-5xl font-black text-vital-forest font-mono tracking-tight my-1">
              {formatearTiempo(segundosRestantes)}
            </div>

            {/* Barra de Progreso */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-3">
              <div
                className="bg-gradient-to-r from-emerald-500 via-vital-terracotta to-amber-500 h-full transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${porcentajeTranscurrido}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Acciones Principales: Lanzar Pausa Aleatoria / Pausar / Probar */}
        <div className="space-y-3 pt-5 border-t border-slate-100">
          
          {/* BOTÓN DESTACADO: MANDAR PAUSA ALEATORIA DE FORMA INMEDIATA */}
          <button
            onClick={dispararAlarmaAleatoria}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-vital-terracotta to-amber-600 hover:from-amber-600 hover:to-vital-terracotta text-white font-mono text-xs sm:text-sm font-bold shadow-lg shadow-vital-terracotta/25 transition-all flex items-center justify-center space-x-2 group hover:scale-[1.01]"
          >
            <Shuffle className="w-4 h-4 text-white group-hover:rotate-180 transition-transform duration-500" />
            <span>MANDAR PAUSA ALEATORIA AL EMPLEADO</span>
            <Sparkles className="w-4 h-4 text-amber-200" />
          </button>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setEstaCorriendo(!estaCorriendo)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-vital-forest text-white text-xs font-mono font-bold hover:bg-slate-900 transition-all flex items-center justify-center space-x-1.5"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{estaCorriendo ? 'Pausar Reloj' : 'Reanudar Reloj'}</span>
            </button>

            <button
              onClick={() => setSegundosRestantes(frecuenciaMinutos * 60)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs transition-all border border-slate-200"
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
              className="w-full text-center text-[11px] text-amber-800 bg-amber-50 border border-amber-200 py-1.5 px-3 rounded-xl hover:bg-amber-100 transition-colors flex items-center justify-center space-x-1.5 font-mono"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span>Habilitar alertas de escritorio en segundo plano</span>
            </button>
          )}
        </div>
      </div>

      {/* Modal Interactivo de Pausa Activa con Muñeco Animado tipo GIF */}
      <ActiveBreakModal
        estaAbierto={mostrarModalPausa}
        ejercicioInicial={ejercicioSeleccionado}
        catalogoEjercicios={EJERCICIOS_PAUSAS}
        onCerrar={() => setMostrarModalPausa(false)}
        onCompletarPausa={handleCompletarPausa}
        onPosponer={posponer5Min}
      />
    </>
  );
}
