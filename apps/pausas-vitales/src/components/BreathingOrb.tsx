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
    // Patrón 4-7-8
    if (faseRespiracion === 'INHALA') return 4;
    if (faseRespiracion === 'SOSTEN') return 7;
    return 8;
  };

  // Sonido suave de campana al cambiar de fase
  const sonarCampanaFase = (fase: 'INHALA' | 'SOSTEN' | 'EXHALA') => {
    if (!sonidoSutil || typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

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
      // Audio no permitido
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
          // Cambiar fase
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
        return 'Inhala despacio por la nariz... expande tu abdomen';
      case 'SOSTEN':
        return 'Sostén el aire con calma... siente la quietud';
      case 'EXHALA':
        return 'Exhala suavemente por la boca... suelta hombros y mandíbula';
    }
  };

  const obtenerColorAcento = () => {
    switch (faseRespiracion) {
      case 'INHALA':
        return 'from-emerald-700 via-teal-600 to-vital-forest';
      case 'SOSTEN':
        return 'from-amber-600 via-yellow-600 to-amber-700';
      case 'EXHALA':
        return 'from-vital-terracotta via-rose-600 to-vital-forest';
    }
  };

  return (
    <>
      <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-vital-border flex flex-col items-center text-center relative overflow-hidden h-full justify-between transition-all ${
        modoZen ? 'fixed inset-0 z-50 rounded-none p-10 bg-slate-950 text-white' : ''
      }`}>
        {/* Cabecera y Controles */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
            <Wind className="w-3.5 h-3.5 text-emerald-600" />
            <span>RITMO {patronRespiracion} // DESCOMPRESIÓN FISIOLÓGICA</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSonidoSutil(!sonidoSutil)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors text-xs"
              title={sonidoSutil ? 'Silenciar campanilla de respiración' : 'Activar campanilla de respiración'}
            >
              {sonidoSutil ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
            <button
              onClick={() => setModoZen(!modoZen)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors text-xs"
              title={modoZen ? 'Salir de pantalla completa' : 'Modo Zen en pantalla completa'}
            >
              {modoZen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Título */}
        <div className="my-3">
          <h3 className={`text-2xl sm:text-3xl font-bold font-outfit ${modoZen ? 'text-white' : 'text-vital-forest'}`}>
            El Orbe de Respiración Guiada
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-1 mx-auto">
            Sincroniza tus pulmones con la cadencia orgánica del orbe. Tres ciclos oxigenan el cerebro y reducen el cortisol acumulado.
          </p>

          {/* Selector de Patrón */}
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl mt-3 font-mono text-xs">
            <button
              onClick={() => {
                setPatronRespiracion('4-4-4');
                setSegundoFase(1);
              }}
              className={`px-3 py-1 rounded-xl transition-all font-bold ${
                patronRespiracion === '4-4-4' ? 'bg-white text-vital-forest shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Ritmo Cuadrado (4-4-4)
            </button>
            <button
              onClick={() => {
                setPatronRespiracion('4-7-8');
                setSegundoFase(1);
              }}
              className={`px-3 py-1 rounded-xl transition-all font-bold ${
                patronRespiracion === '4-7-8' ? 'bg-white text-vital-forest shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Antiestrés Profundo (4-7-8)
            </button>
          </div>
        </div>

        {/* Orbe Central Animado */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-4">
          {/* Anillo de onda expansiva */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${obtenerColorAcento()} opacity-25 blur-3xl transition-all duration-1000 ${
              faseRespiracion === 'INHALA' || faseRespiracion === 'SOSTEN' ? 'scale-125' : 'scale-90'
            }`}
          ></div>

          {/* Orbe principal */}
          <div
            className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br ${obtenerColorAcento()} flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-1000 ${
              faseRespiracion === 'INHALA' || faseRespiracion === 'SOSTEN'
                ? 'scale-110 shadow-emerald-900/40 ring-8 ring-white/10'
                : 'scale-90 shadow-slate-900/20'
            }`}
          >
            <span className="text-xs font-mono tracking-widest uppercase opacity-90 font-bold">
              {faseRespiracion}
            </span>
            <span className="text-5xl sm:text-6xl font-black font-outfit my-1">
              {segundoFase}s
            </span>
            <span className="text-[11px] font-mono opacity-80">
              de {maxSegundosFase()} segundos
            </span>
          </div>
        </div>

        {/* Instrucción dinámica */}
        <div className="h-8 my-2 flex items-center justify-center">
          <p className={`text-sm sm:text-base font-semibold transition-all duration-300 ${modoZen ? 'text-slate-300' : 'text-slate-700'}`}>
            {obtenerInstruccion()}
          </p>
        </div>

        {/* Controles de pausa y conteo */}
        <div className="flex items-center space-x-4 pt-4 border-t border-slate-100 w-full justify-between max-w-sm">
          <div className="text-left font-mono text-xs">
            <span className="text-slate-400 block text-[10px]">CICLOS COMPLETOS</span>
            <strong className={`text-base font-bold ${modoZen ? 'text-emerald-400' : 'text-vital-forest'}`}>
              {ciclosCompletados}
            </strong>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEstaPausado(!estaPausado)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold transition-all"
            >
              {estaPausado ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Reanudar</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-600" />
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
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs transition-all"
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
