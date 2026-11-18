'use client';

import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw } from 'lucide-react';

export default function BreathingOrb() {
  const [faseRespiracion, setFaseRespiracion] = useState<'INHALA' | 'SOSTEN' | 'EXHALA'>('INHALA');
  const [segundoFase, setSegundoFase] = useState<number>(1);
  const [estaPausado, setEstaPausado] = useState<boolean>(false);
  const [ciclosCompletados, setCiclosCompletados] = useState<number>(0);

  // Ciclo rítmico 4-4-4 (Inhala 4s -> Sostén 4s -> Exhala 4s)
  useEffect(() => {
    if (estaPausado) return;

    const timer = setInterval(() => {
      setSegundoFase((prev) => {
        if (prev < 4) {
          return prev + 1;
        } else {
          // Cambiar fase
          setFaseRespiracion((faseActual) => {
            if (faseActual === 'INHALA') return 'SOSTEN';
            if (faseActual === 'SOSTEN') return 'EXHALA';
            setCiclosCompletados((c) => c + 1);
            return 'INHALA';
          });
          return 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [estaPausado]);

  const obtenerInstruccion = () => {
    switch (faseRespiracion) {
      case 'INHALA':
        return 'Inhala despacio por la nariz... expande tu abdomen';
      case 'SOSTEN':
        return 'Sostén el aire con calma... siente la pausa';
      case 'EXHALA':
        return 'Exhala suave por la boca... suelta hombros y mandíbula';
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
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-vital-border flex flex-col items-center text-center relative overflow-hidden">
      {/* Etiqueta superior */}
      <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold mb-4 border border-emerald-200">
        <Wind className="w-3.5 h-3.5 text-emerald-600" />
        <span>RITMO BIOMECÁNICO 4-4-4 // DESCOMPRESIÓN FISIOLÓGICA</span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold text-vital-forest font-outfit">
        El Orbe de Respiración Guiada
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-1 mb-8">
        Sincroniza tu respiración con la pulsación del orbe. Tres ciclos completos oxigenan el cerebro y reducen la tensión muscular acumulada.
      </p>

      {/* Orbe Central Animado */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-4">
        {/* Anillo de onda expansiva */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${obtenerColorAcento()} opacity-20 blur-2xl transition-all duration-1000 ${
            faseRespiracion === 'INHALA' || faseRespiracion === 'SOSTEN' ? 'scale-125' : 'scale-95'
          }`}
        ></div>

        {/* Orbe principal */}
        <div
          className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br ${obtenerColorAcento()} flex flex-col items-center justify-center text-white shadow-2xl transition-all duration-1000 ${
            faseRespiracion === 'INHALA' || faseRespiracion === 'SOSTEN'
              ? 'scale-110 shadow-emerald-900/40'
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
            Fase de 4 segundos
          </span>
        </div>
      </div>

      {/* Instrucción dinámica */}
      <div className="h-10 mt-4 flex items-center justify-center">
        <p className="text-sm sm:text-base font-semibold text-slate-700 transition-all duration-300">
          {obtenerInstruccion()}
        </p>
      </div>

      {/* Controles de pausa y conteo */}
      <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-slate-100 w-full justify-between max-w-sm">
        <div className="text-left font-mono text-xs">
          <span className="text-slate-400 block text-[10px]">CICLOS COMPLETADOS</span>
          <strong className="text-vital-forest text-base font-bold">{ciclosCompletados}</strong>
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
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
