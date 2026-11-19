'use client';

import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, Maximize2, Minimize2, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function BreathingOrb() {
  const [patronRespiracion, setPatronRespiracion] = useState<'4-4-4' | '4-7-8'>('4-4-4');
  const [faseRespiracion, setFaseRespiracion] = useState<'INHALA' | 'SOSTEN' | 'EXHALA'>('INHALA');
  const [segundoFase, setSegundoFase] = useState<number>(1);
  const [estaPausado, setEstaPausado] = useState<boolean>(false);
  const [ciclosCompletados, setCiclosCompletados] = useState<number>(0);
  const [modoZen, setModoZen] = useState<boolean>(false);
  const [sonidoSutil, setSonidoSutil] = useState<boolean>(true);

  // Duración según el patrón
  const maxSegundosFase = () => {
    if (patronRespiracion === '4-4-4') return 4;
    if (faseRespiracion === 'INHALA') return 4;
    if (faseRespiracion === 'SOSTEN') return 7;
    return 8;
  };

  // Sonido armónico suave usando Web Audio API con frecuencias terapéuticas
  const sonarCampanaFase = (fase: 'INHALA' | 'SOSTEN' | 'EXHALA') => {
    if (!sonidoSutil || typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Frecuencias: 528 Hz (Transformación), 660 Hz (Claridad), 440 Hz (Calma)
      const freqMap = { INHALA: 528, SOSTEN: 660, EXHALA: 440 };
      osc.frequency.setValueAtTime(freqMap[fase], ctx.currentTime);
      osc.type = 'sine';

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 2.0);
    } catch {
      // Audio no permitido o silenciado
    }
  };

  // Ciclo rítmico
  useEffect(() => {
    if (estaPausado) return;

    const timer = setInterval(() => {
      setSegundoFase((prev) => {
        const limite = maxSegundosFase();
        if (prev < limite) {
          return prev + 1;
        } else {
          setFaseRespiracion((faseActual) => {
            let siguiente: 'INHALA' | 'SOSTEN' | 'EXHALA' = 'SOSTEN';
            if (faseActual === 'INHALA') siguiente = 'SOSTEN';
            else if (faseActual === 'SOSTEN') siguiente = 'EXHALA';
            else {
              siguiente = 'INHALA';
              setCiclosCompletados((c) => c + 1);
            }
            sonarCampanaFase(siguiente);
            return siguiente;
          });
          return 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [estaPausado, patronRespiracion, faseRespiracion, sonidoSutil]);

  const obtenerInstruccion = () => {
    switch (faseRespiracion) {
      case 'INHALA':
        return 'Inhala despacio por la nariz... expande tu diafragma';
      case 'SOSTEN':
        return 'Sostén el aire con serenidad... siente la quietud';
      case 'EXHALA':
        return 'Exhala suavemente por la boca... relaja hombros y cuello';
    }
  };

  // Colores estrictamente alineados con la paleta unificada
  const obtenerColorAcento = () => {
    switch (faseRespiracion) {
      case 'INHALA':
        return 'from-[#10B981] via-[#14B8A6] to-[#047857]'; // Esmeralda y Turquesa
      case 'SOSTEN':
        return 'from-[#14B8A6] via-[#2DD4BF] to-[#0B7A87]'; // Turquesa y Agua Marina
      case 'EXHALA':
        return 'from-[#0B7A87] via-[#1A56DB] to-[#0E1B2F]'; // Agua Marina y Azul Corporativo
    }
  };

  return (
    <>
      <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#64748B]/20 flex flex-col items-center text-center relative overflow-hidden h-full justify-between transition-all ${
        modoZen ? 'fixed inset-0 z-50 rounded-none p-10 bg-[#0E1B2F] text-white' : ''
      }`}>
        {/* Cabecera y Controles */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-[#64748B]/10">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-[#047857] text-xs font-mono font-bold border border-emerald-200">
            <Wind className="w-3.5 h-3.5 text-[#10B981]" />
            <span>RITMO {patronRespiracion} // DESCOMPRESIÓN FISIOLÓGICA</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSonidoSutil(!sonidoSutil)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0E1B2F] transition-colors text-xs active:scale-[0.98]"
              title={sonidoSutil ? 'Silenciar campanilla de respiración' : 'Activar campanilla de respiración'}
            >
              {sonidoSutil ? <Volume2 className="w-4 h-4 text-[#10B981]" /> : <VolumeX className="w-4 h-4 text-[#64748B]" />}
            </button>
            <button
              onClick={() => setModoZen(!modoZen)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0E1B2F] transition-colors text-xs active:scale-[0.98]"
              title={modoZen ? 'Salir de pantalla completa' : 'Modo Zen en pantalla completa'}
            >
              {modoZen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Título de Sección */}
        <div className="my-3">
          <h3 className={`text-2xl sm:text-3xl font-black font-outfit ${modoZen ? 'text-white' : 'text-[#0E1B2F]'}`}>
            Orbe de Respiración Diafragmática
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md mt-1 mx-auto font-medium">
            Sincroniza tus pulmones con la cadencia orgánica del orbe. Tres ciclos oxigenan el cerebro y reducen la tensión muscular acumulada.
          </p>

          {/* Selector de Patrón */}
          <div className="inline-flex p-1 bg-[#F8FAFC] border border-[#64748B]/20 rounded-2xl mt-3 font-mono text-xs">
            <button
              onClick={() => {
                setPatronRespiracion('4-4-4');
                setSegundoFase(1);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all font-bold ${
                patronRespiracion === '4-4-4' ? 'bg-[#1A56DB] text-white shadow-sm' : 'text-[#64748B] hover:text-[#0E1B2F]'
              }`}
            >
              Ritmo Cuadrado (4-4-4)
            </button>
            <button
              onClick={() => {
                setPatronRespiracion('4-7-8');
                setSegundoFase(1);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all font-bold ${
                patronRespiracion === '4-7-8' ? 'bg-[#1A56DB] text-white shadow-sm' : 'text-[#64748B] hover:text-[#0E1B2F]'
              }`}
            >
              Antiestrés Profundo (4-7-8)
            </button>
          </div>
        </div>

        {/* Orbe Central Animado con Física de Pulso */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-4">
          {/* Anillo de halo de luz expansiva */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${obtenerColorAcento()} opacity-25 blur-3xl transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              faseRespiracion === 'INHALA' || faseRespiracion === 'SOSTEN' ? 'scale-125' : 'scale-90'
            }`}
          ></div>

          {/* Orbe principal */}
          <div
            className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br ${obtenerColorAcento()} flex flex-col items-center justify-center text-white shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              faseRespiracion === 'INHALA' || faseRespiracion === 'SOSTEN'
                ? 'scale-110 ring-8 ring-white/15'
                : 'scale-90 ring-0'
            }`}
          >
            <span className="text-xs font-mono tracking-widest uppercase opacity-90 font-bold">
              {faseRespiracion}
            </span>
            <span className="text-5xl sm:text-6xl font-black font-outfit my-1 num-tabular">
              {segundoFase}s
            </span>
            <span className="text-[11px] font-mono opacity-80">
              de {maxSegundosFase()} segundos
            </span>
          </div>
        </div>

        {/* Instrucción dinámica */}
        <div className="h-8 my-2 flex items-center justify-center">
          <p className={`text-sm sm:text-base font-semibold transition-all duration-300 ${modoZen ? 'text-slate-200' : 'text-[#0E1B2F]'}`}>
            {obtenerInstruccion()}
          </p>
        </div>

        {/* Controles de pausa y conteo */}
        <div className="flex items-center space-x-4 pt-4 border-t border-[#64748B]/10 w-full justify-between max-w-sm">
          <div className="text-left font-mono text-xs">
            <span className="text-[#64748B] block text-[10px] font-semibold">CICLOS COMPLETOS</span>
            <strong className={`text-base font-bold num-tabular ${modoZen ? 'text-[#2DD4BF]' : 'text-[#10B981]'}`}>
              {ciclosCompletados}
            </strong>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEstaPausado(!estaPausado)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0E1B2F] text-xs font-mono font-bold transition-all active:scale-[0.98]"
            >
              {estaPausado ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Reanudar</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#0B7A87]" />
                  <span>Pausar</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setFaseRespiracion('INHALA');
                setSegundoFase(1);
                setCiclosCompletados(0);
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#64748B] text-xs transition-all active:scale-[0.98]"
              title="Reiniciar contador"
              aria-label="Reiniciar ciclo de respiración"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
