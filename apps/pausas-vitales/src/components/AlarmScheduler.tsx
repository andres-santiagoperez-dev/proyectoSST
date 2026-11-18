'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Clock, 
  Volume2, 
  VolumeX, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function AlarmScheduler({ onDispararPausa }: { onDispararPausa?: () => void }) {
  const [frecuenciaMinutos, setFrecuenciaMinutos] = useState<number>(60);
  const [segundosRestantes, setSegundosRestantes] = useState<number>(60 * 60);
  const [estaCorriendo, setEstaCorriendo] = useState<boolean>(true);
  const [sonidoHabilitado, setSonidoHabilitado] = useState<boolean>(true);
  const [permisoNotificacion, setPermisoNotificacion] = useState<string>('default');
  const [mostrarModalAlarma, setMostrarModalAlarma] = useState<boolean>(false);

  // Reproductor de sonido armónico suave usando Web Audio API (sin archivos externos)
  const reproducirChimeArmonico = () => {
    if (!sonidoHabilitado || typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();

      // Acorde armónico de campana tibetana (Frecuencias suaves: 528Hz amor/calma, 660Hz, 792Hz)
      const frecuencias = [528, 660, 792];
      frecuencias.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15 / (idx + 1), ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.15);
        osc.stop(ctx.currentTime + 3.0);
      });
    } catch (e) {
      console.warn('AudioContext no soportado o bloqueado por el navegador:', e);
    }
  };

  // Solicitar permiso de notificaciones de escritorio
  const solicitarPermisoNotificaciones = async () => {
    if ('Notification' in window) {
      const resp = await Notification.requestPermission();
      setPermisoNotificacion(resp);
    }
  };

  // Comprobar estado de notificaciones al cargar
  useEffect(() => {
    if ('Notification' in window) {
      setPermisoNotificacion(Notification.permission);
    }
  }, []);

  // Temporizador principal
  useEffect(() => {
    if (!estaCorriendo) return;

    const timer = setInterval(() => {
      setSegundosRestantes((prev) => {
        if (prev <= 1) {
          // ¡Disparo de alarma!
          dispararAlarma();
          return frecuenciaMinutos * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [estaCorriendo, frecuenciaMinutos]);

  const dispararAlarma = () => {
    reproducirChimeArmonico();
    setMostrarModalAlarma(true);

    // Enviar notificación al sistema operativo si tiene permiso
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('¡Es momento de tu Pausa Vital! 🌿', {
        body: '3 minutos de descanso para tus ojos y tu espalda reducen la fatiga y protegen tu salud laboral.',
        icon: '/favicon.ico',
      });
    }

    if (onDispararPausa) {
      onDispararPausa();
    }
  };

  const cambiarFrecuencia = (minutos: number) => {
    setFrecuenciaMinutos(minutos);
    setSegundosRestantes(minutos * 60);
  };

  const posponer5Min = () => {
    setMostrarModalAlarma(false);
    setSegundosRestantes(5 * 60);
  };

  const formatearTiempo = (totalSegundos: number) => {
    const mins = Math.floor(totalSegundos / 60);
    const secs = totalSegundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const porcentajeTranscurrido = ((frecuenciaMinutos * 60 - segundosRestantes) / (frecuenciaMinutos * 60)) * 100;

  return (
    <>
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-vital-border flex flex-col justify-between">
        <div>
          {/* Cabecera */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-vital-terracotta" />
              <h3 className="font-bold text-lg text-vital-forest font-outfit">
                Programador de Alarmas Periódicas
              </h3>
            </div>
            <button
              onClick={() => setSonidoHabilitado(!sonidoHabilitado)}
              className={`p-2 rounded-xl transition-all ${
                sonidoHabilitado ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'
              }`}
              title={sonidoHabilitado ? 'Sonido activado' : 'Sonido silenciado'}
            >
              {sonidoHabilitado ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Selector de Frecuencia */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-slate-600 block mb-2 font-mono">
              FRECUENCIA DE ALARMA PROGRAMADA:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[30, 45, 60, 90].map((min) => (
                <button
                  key={min}
                  onClick={() => cambiarFrecuencia(min)}
                  className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all ${
                    frecuenciaMinutos === min
                      ? 'bg-vital-forest text-white shadow-md shadow-vital-forest/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {min} min
                </button>
              ))}
            </div>
          </div>

          {/* Cronómetro Visual y Barra de Progreso */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center my-4">
            <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase block mb-1">
              TIEMPO HASTA LA PRÓXIMA PAUSA VITAL
            </span>
            <div className="text-5xl sm:text-6xl font-black text-vital-forest font-mono tracking-tight my-2">
              {formatearTiempo(segundosRestantes)}
            </div>

            {/* Barra de Progreso */}
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mt-4">
              <div
                className="bg-gradient-to-r from-emerald-500 to-vital-terracotta h-full transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${porcentajeTranscurrido}%` }}
              ></div>
            </div>

            <p className="text-xs text-slate-500 mt-3 font-sans">
              La alarma sonará automáticamente y te guiará en tu rutina ergonómica.
            </p>
          </div>
        </div>

        {/* Acciones y Notificaciones del Navegador */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setEstaCorriendo(!estaCorriendo)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-vital-forest text-white text-xs font-mono font-bold hover:bg-emerald-950 transition-all flex items-center justify-center space-x-1.5"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{estaCorriendo ? 'Pausar Reloj' : 'Reanudar Reloj'}</span>
            </button>

            <button
              onClick={() => setSegundosRestantes(frecuenciaMinutos * 60)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs transition-all"
              title="Reiniciar contador al inicio"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={dispararAlarma}
              className="py-2.5 px-3 rounded-xl bg-vital-terracotta text-white text-xs font-mono font-bold hover:bg-amber-700 transition-all"
              title="Simular alarma inmediata para pruebas"
            >
              Probar Alarma
            </button>
          </div>

          {/* Permiso de Notificaciones */}
          {permisoNotificacion !== 'granted' && (
            <button
              onClick={solicitarPermisoNotificaciones}
              className="w-full text-center text-[11px] text-amber-700 bg-amber-50 border border-amber-200 py-1.5 px-3 rounded-xl hover:bg-amber-100 transition-colors flex items-center justify-center space-x-1"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Activar notificaciones en segundo plano para no perder tu pausa</span>
            </button>
          )}
        </div>
      </div>

      {/* Modal de Alarma Activa en Pantalla */}
      {mostrarModalAlarma && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-emerald-500 text-center relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Bell className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono font-bold text-vital-terracotta uppercase tracking-wider block mb-1">
              ¡ALARMA PROGRAMADA DE PAUSA VITAL!
            </span>
            <h3 className="text-2xl font-black text-vital-forest font-outfit mb-2">
              Momento de Cuidar tu Cuerpo
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Llevas {frecuenciaMinutos} minutos de trabajo continuo. Tómate 3 minutos para descansar la vista, estirar cuello y muñecas.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  setMostrarModalAlarma(false);
                  const el = document.getElementById('rutina-ejercicios');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold font-mono text-sm shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-600 transition-all flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Comenzar Rutina Ahora</span>
              </button>

              <button
                onClick={posponer5Min}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-semibold transition-all whitespace-nowrap"
              >
                Posponer 5 min
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
