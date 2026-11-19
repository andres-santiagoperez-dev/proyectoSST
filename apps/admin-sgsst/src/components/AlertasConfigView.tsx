'use client';

import React, { useState } from 'react';
import { BellRing, Clock, Volume2, ShieldCheck, CheckCircle2, Music, Sparkles } from 'lucide-react';

export default function AlertasConfigView() {
  const [frecuencia, setFrecuencia] = useState(60);
  const [duracion, setDuracion] = useState(5);
  const [horaInicio, setHoraInicio] = useState('08:00');
  const [horaFin, setHoraFin] = useState('17:00');
  const [almuerzoInicio, setAlmuerzoInicio] = useState('12:30');
  const [almuerzoFin, setAlmuerzoFin] = useState('13:30');
  const [sonido, setSonido] = useState('tibet');
  const [guardado, setGuardado] = useState(false);

  const probarSonido = () => {
    if (typeof window !== 'undefined') {
      try {
        const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
        const ctx = new AudioContext();
        [528, 660, 792].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + 2.0);
        });
      } catch (e) {
        console.warn('AudioContext bloqueado:', e);
      }
    }
  };

  const guardarConfiguracion = (e: React.FormEvent) => {
    e.preventDefault();
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm max-w-4xl space-y-6">
      <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black font-outfit text-brand-navy">
            Configuración General de Alertas y Horarios
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Parámetros aplicados en red a todas las estaciones de trabajo de la empresa.
          </p>
        </div>
        <button
          onClick={probarSonido}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5 text-accent-turquoise" />
          <span>Probar sonido</span>
        </button>
      </div>

      <form onSubmit={guardarConfiguracion} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-700 block">
              Frecuencia de alerta (minutos):
            </label>
            <input
              type="number"
              min="15"
              max="120"
              value={frecuencia}
              onChange={(e) => setFrecuencia(parseInt(e.target.value, 10))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:border-accent-turquoise outline-none"
            />
            <span className="text-[11px] text-slate-400 block font-mono">
              Recomendado por Ley 1355/2009: cada 45 a 60 minutos.
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-700 block">
              Duración de la pausa activa (minutos):
            </label>
            <input
              type="number"
              min="1"
              max="15"
              value={duracion}
              onChange={(e) => setDuracion(parseInt(e.target.value, 10))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:border-accent-turquoise outline-none"
            />
            <span className="text-[11px] text-slate-400 block font-mono">
              Estándar médico biomecánico: 3 a 5 minutos.
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-700 block">
              Horario de inicio laboral:
            </label>
            <input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:border-accent-turquoise outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-700 block">
              Horario de fin laboral:
            </label>
            <input
              type="time"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:border-accent-turquoise outline-none"
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <span className="text-xs font-mono font-bold text-slate-700 block">
            Silenciar alertas durante el almuerzo:
          </span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] text-slate-500 font-mono block mb-1">Desde:</span>
              <input
                type="time"
                value={almuerzoInicio}
                onChange={(e) => setAlmuerzoInicio(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono"
              />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-mono block mb-1">Hasta:</span>
              <input
                type="time"
                value={almuerzoFin}
                onChange={(e) => setAlmuerzoFin(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-mono text-xs font-bold shadow-md shadow-brand-blue/20 transition-all flex items-center space-x-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Guardar Parámetros en Red</span>
          </button>

          {guardado && (
            <span className="text-xs font-mono text-vital-emerald flex items-center space-x-1 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Configuración guardada exitosamente</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
