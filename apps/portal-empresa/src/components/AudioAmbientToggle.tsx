'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioAmbientToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Reproducir un sutil chime armónico de confirmación al activar (Web Audio API)
  const playHarmonicChime = (freqs: number[] = [440, 554.37, 659.25]) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.45);
      });
    } catch {
      // Audio no disponible
    }
  };

  const toggleAudio = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      playHarmonicChime([523.25, 659.25, 783.99]); // C5 - E5 - G5 mayor acorde de seguridad
    } else {
      setIsPlaying(false);
      playHarmonicChime([392.0, 329.63]); // Descenso suave
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      <button
        onClick={toggleAudio}
        data-cursor="hover"
        className={`group relative flex items-center space-x-2.5 px-3.5 py-2.5 rounded-full shadow-lg border transition-all duration-300 backdrop-blur-md cursor-pointer ${
          isPlaying
            ? 'bg-white/95 text-[#0E1B2F] border-[#10B981]/50 shadow-[#10B981]/15 ring-2 ring-[#10B981]/20'
            : 'bg-[#0E1B2F]/90 text-slate-300 border-[#1E293B] hover:text-white hover:border-slate-700'
        }`}
        title={isPlaying ? 'Silenciar retroalimentación sonora' : 'Activar ambiente sonoro de seguridad'}
        aria-label="Control de audio ambiental SST"
      >
        {/* Ecualizador animado de 4 barras (Estilo Unseen Studio) */}
        <div className="flex items-end space-x-1 h-3.5 w-4 justify-center">
          <span 
            className={`w-0.5 rounded-full transition-all ${isPlaying ? 'bg-[#10B981] animate-pulse h-3' : 'bg-slate-400 h-1.5'}`}
            style={{ animationDuration: '0.6s' }}
          />
          <span 
            className={`w-0.5 rounded-full transition-all ${isPlaying ? 'bg-[#06B6D4] animate-pulse h-3.5' : 'bg-slate-400 h-2.5'}`}
            style={{ animationDuration: '0.4s', animationDelay: '0.15s' }}
          />
          <span 
            className={`w-0.5 rounded-full transition-all ${isPlaying ? 'bg-[#10B981] animate-pulse h-2' : 'bg-slate-400 h-1'}`}
            style={{ animationDuration: '0.7s', animationDelay: '0.3s' }}
          />
          <span 
            className={`w-0.5 rounded-full transition-all ${isPlaying ? 'bg-[#14B8A6] animate-pulse h-3' : 'bg-slate-400 h-2'}`}
            style={{ animationDuration: '0.5s', animationDelay: '0.1s' }}
          />
        </div>

        {/* Etiqueta flotante al hover */}
        <span className="text-[11px] font-mono font-medium hidden sm:inline">
          {isPlaying ? 'Audio ON' : 'Audio OFF'}
        </span>
      </button>
    </div>
  );
}
