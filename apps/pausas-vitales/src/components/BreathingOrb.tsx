'use client';

import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, Maximize2, Minimize2, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BreathingOrb() {
  const [patronRespiracion, setPatronRespiracion] = useState<'4-7-8' | '4-4-4'>('4-7-8');
  const [faseRespiracion, setFaseRespiracion] = useState<'INHALA' | 'SOSTEN' | 'EXHALA'>('INHALA');
  const [segundoFase, setSegundoFase] = useState<number>(1);
  const [estaPausado, setEstaPausado] = useState<boolean>(false);
  const [ciclosCompletados, setCiclosCompletados] = useState<number>(0);
  const [modoZen, setModoZen] = useState<boolean>(false);
  const [sonidoSutil, setSonidoSutil] = useState<boolean>(true);

  // Duración en segundos según el patrón activo
  const maxSegundosFase = () => {
    if (patronRespiracion === '4-4-4') return 4;
    if (faseRespiracion === 'INHALA') return 4;
    if (faseRespiracion === 'SOSTEN') return 7;
    return 8; // EXHALA
  };

  // Sonido armónico suave usando Web Audio API (frecuencias terapéuticas)
  const sonarCampanaFase = (fase: 'INHALA' | 'SOSTEN' | 'EXHALA') => {
    if (!sonidoSutil || typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Frecuencias: 528 Hz (Inhala - Renovación), 660 Hz (Sostén - Claridad), 440 Hz (Exhala - Calma)
      const freqMap = { INHALA: 528, SOSTEN: 660, EXHALA: 440 };
      osc.frequency.setValueAtTime(freqMap[fase], ctx.currentTime);
      osc.type = 'sine';

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.9);
    } catch {
      // Audio no permitido o silenciado
    }
  };

  // Ciclo rítmico con actualización precisa
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
        return 'Inhala profundo y despacio por la nariz... expande el diafragma';
      case 'SOSTEN':
        return 'Sostén el aire en tus pulmones... siente quietud y pausa mental';
      case 'EXHALA':
        return 'Exhala suave y completamente por la boca... suelta tensión en hombros';
    }
  };

  // Color de fase según los 14 tokens obligatorios
  const obtenerColorTokens = () => {
    switch (faseRespiracion) {
      case 'INHALA':
        return {
          bgGradiente: 'from-[#10B981] via-[#14B8A6] to-[#047857]',
          textoFase: 'text-[#10B981]',
          borde: 'border-[#10B981]',
          badge: 'bg-[#10B981]/15 text-[#047857] border-[#10B981]/30',
        };
      case 'SOSTEN':
        return {
          bgGradiente: 'from-[#14B8A6] via-[#2DD4BF] to-[#0B7A87]',
          textoFase: 'text-[#14B8A6]',
          borde: 'border-[#14B8A6]',
          badge: 'bg-[#14B8A6]/15 text-[#0B7A87] border-[#14B8A6]/30',
        };
      case 'EXHALA':
        return {
          bgGradiente: 'from-[#0B7A87] via-[#1A56DB] to-[#0E1B2F]',
          textoFase: 'text-[#0B7A87]',
          borde: 'border-[#0B7A87]',
          badge: 'bg-[#0B7A87]/15 text-[#0E1B2F] border-[#0B7A87]/30',
        };
    }
  };

  const tokens = obtenerColorTokens();

  // Escala física del orbe:
  // INHALA: expande (1.15)
  // SOSTEN: se mantiene lleno (1.18) con suave brillo
  // EXHALA: contrae (0.88)
  const obtenerEscalaOrbe = () => {
    if (faseRespiracion === 'INHALA') return 'scale-110 sm:scale-115';
    if (faseRespiracion === 'SOSTEN') return 'scale-115 sm:scale-120';
    return 'scale-90 sm:scale-92';
  };

  return (
    <div 
      className={`bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#64748B]/20 flex flex-col items-center text-center relative overflow-hidden h-full justify-between transition-all ${
        modoZen ? 'fixed inset-0 z-50 rounded-none p-10 bg-[#0E1B2F] text-white' : ''
      }`}
    >
      {/* Cabecera y Controles */}
      <div className="w-full flex items-center justify-between pb-4 border-b border-[#64748B]/10">
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-bold border ${tokens.badge}`}>
          <Wind className="w-3.5 h-3.5" />
          <span>RITMO {patronRespiracion} // DESCOMPRESIÓN COGNITIVA</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSonidoSutil(!sonidoSutil)}
            className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-slate-200 text-[#0E1B2F] transition-colors text-xs active:scale-95 border border-[#64748B]/20"
            title={sonidoSutil ? 'Silenciar campanilla de respiración' : 'Activar campanilla de respiración'}
            aria-label={sonidoSutil ? 'Silenciar sonido' : 'Activar sonido'}
          >
            {sonidoSutil ? <Volume2 className="w-4 h-4 text-[#10B981]" /> : <VolumeX className="w-4 h-4 text-[#64748B]" />}
          </button>
          <button
            onClick={() => setModoZen(!modoZen)}
            className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-slate-200 text-[#0E1B2F] transition-colors text-xs active:scale-95 border border-[#64748B]/20"
            title={modoZen ? 'Salir de pantalla completa' : 'Modo Zen en pantalla completa'}
            aria-label={modoZen ? 'Salir de modo zen' : 'Activar modo zen'}
          >
            {modoZen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4 text-[#0B7A87]" />}
          </button>
        </div>
      </div>

      {/* Título de Sección y Selector de Patrón */}
      <div className="my-3">
        <h3 className={`text-2xl sm:text-3xl font-black font-outfit ${modoZen ? 'text-white' : 'text-[#0E1B2F]'}`}>
          Orbe de Respiración Diafragmática
        </h3>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-md mt-1 mx-auto font-medium">
          Sincroniza tu ritmo pulmonar con el pulso orgánico del orbe. Reduce el cortisol, oxigena el tejido muscular y alivia la fatiga visual.
        </p>

        {/* Selector de Patrón de Respiración */}
        <div className="inline-flex p-1 bg-[#F8FAFC] border border-[#64748B]/20 rounded-2xl mt-3 font-mono text-xs">
          <button
            onClick={() => {
              setPatronRespiracion('4-7-8');
              setSegundoFase(1);
            }}
            className={`px-3 py-1.5 rounded-xl transition-all font-bold ${
              patronRespiracion === '4-7-8' 
                ? 'bg-[#1A56DB] text-white shadow-sm' 
                : 'text-[#64748B] hover:text-[#0E1B2F]'
            }`}
          >
            Antiestrés 4-7-8 (Recomendado)
          </button>
          <button
            onClick={() => {
              setPatronRespiracion('4-4-4');
              setSegundoFase(1);
            }}
            className={`px-3 py-1.5 rounded-xl transition-all font-bold ${
              patronRespiracion === '4-4-4' 
                ? 'bg-[#0B7A87] text-white shadow-sm' 
                : 'text-[#64748B] hover:text-[#0E1B2F]'
            }`}
          >
            Cuadrado 4-4-4
          </button>
        </div>
      </div>

      {/* Orbe Central con Física de Respiración Dinámica */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-4">
        {/* Halo de luz expansiva difusa */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${tokens.bgGradiente} opacity-25 blur-3xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            faseRespiracion === 'INHALA' || faseRespiracion === 'SOSTEN' ? 'scale-125' : 'scale-75'
          }`}
          aria-hidden="true"
        />

        {/* Orbe principal físico */}
        <div
          className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br ${tokens.bgGradiente} flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${obtenerEscalaOrbe()} ${
            faseRespiracion === 'SOSTEN' ? 'ring-8 ring-white/20' : 'ring-0'
          }`}
        >
          <span className="text-xs font-mono tracking-widest uppercase opacity-90 font-bold">
            {faseRespiracion}
          </span>
          <span className="text-5xl sm:text-6xl font-black font-outfit my-1 num-tabular">
            {segundoFase}s
          </span>
          <span className="text-[11px] font-mono opacity-85">
            de {maxSegundosFase()} segundos
          </span>
        </div>
      </div>

      {/* Instrucción Dinámica en tiempo real */}
      <div className="h-8 my-2 flex items-center justify-center px-4">
        <p className={`text-sm sm:text-base font-semibold transition-all duration-300 ${modoZen ? 'text-slate-200' : 'text-[#0E1B2F]'}`}>
          {obtenerInstruccion()}
        </p>
      </div>

      {/* Controles de Contador y Pausa */}
      <div className="flex items-center space-x-4 pt-4 border-t border-[#64748B]/10 w-full justify-between max-w-sm">
        <div className="text-left font-mono text-xs">
          <span className="text-[#64748B] block text-[10px] font-semibold">CICLOS COMPLETADOS</span>
          <strong className={`text-base font-bold num-tabular flex items-center space-x-1 ${modoZen ? 'text-[#2DD4BF]' : 'text-[#047857]'}`}>
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>{ciclosCompletados} {ciclosCompletados === 1 ? 'ciclo' : 'ciclos'}</span>
          </strong>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setEstaPausado(!estaPausado)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#F8FAFC] hover:bg-slate-200 text-[#0E1B2F] text-xs font-mono font-bold transition-all active:scale-95 border border-[#64748B]/20"
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
            className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-slate-200 text-[#64748B] text-xs transition-all active:scale-95 border border-[#64748B]/20"
            title="Reiniciar contador de respiración"
            aria-label="Reiniciar ciclo de respiración"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
