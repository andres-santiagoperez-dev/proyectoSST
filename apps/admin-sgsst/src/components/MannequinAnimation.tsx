'use client';

import React, { useState } from 'react';
import { TipoEjercicioPausa } from '@/types';
import { Play, Pause, Sparkles, Activity } from 'lucide-react';

interface MannequinAnimationProps {
  ejercicioId: TipoEjercicioPausa;
  duracionSegundos?: number;
  tamano?: 'compacto' | 'amplio';
}

export default function MannequinAnimation({
  ejercicioId,
  tamano = 'amplio',
}: MannequinAnimationProps) {
  const [animacionPausada, setAnimacionPausada] = useState<boolean>(false);

  const contenedorClasses = tamano === 'amplio'
    ? 'w-full h-64 sm:h-72'
    : 'w-full h-44 sm:h-48';

  return (
    <div className={`relative ${contenedorClasses} bg-gradient-to-b from-brand-navy to-[#08101C] rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden shadow-inner select-none`}>
      {/* Retícula sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(#14B8A6_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>

      {/* Badge tipo GIF en bucle */}
      <div className="absolute top-3 left-3 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-accent-turquoise/40 text-[10px] font-mono text-accent-turquoise shadow">
        <span className={`w-2 h-2 rounded-full bg-accent-turquoise ${animacionPausada ? '' : 'animate-ping'}`}></span>
        <span>DEMOSTRACIÓN EN BUCLE</span>
      </div>

      <button
        onClick={() => setAnimacionPausada(!animacionPausada)}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs transition-colors border border-slate-700"
        title={animacionPausada ? 'Reanudar' : 'Pausar'}
      >
        {animacionPausada ? <Play className="w-3.5 h-3.5 text-vital-emerald" /> : <Pause className="w-3.5 h-3.5 text-slate-300" />}
      </button>

      <div className={`w-full h-full flex items-center justify-center p-4 transition-transform duration-300 ${animacionPausada ? '[&_*]:!animation-play-state-paused' : ''}`}>
        {ejercicioId === 'HOMBROS_ROTACION' && <MuñecoHombros animada={!animacionPausada} />}
        {ejercicioId === 'TUNEL_CARPIANO' && <MuñecoTunelCarpiano animada={!animacionPausada} />}
        {ejercicioId === 'CUELLO_TRAPECIO' && <MuñecoCuello animada={!animacionPausada} />}
        {ejercicioId === 'VISUAL_20_20' && <MuñecoVisual animada={!animacionPausada} />}
        {ejercicioId === 'LUMBAR_POSTURAL' && <MuñecoLumbar animada={!animacionPausada} />}
        {ejercicioId === 'PIERNAS_CIRCULACION' && <MuñecoPiernas animada={!animacionPausada} />}
      </div>
    </div>
  );
}

function MuñecoHombros({ animada }: { animada: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-44 h-44 sm:w-52 sm:h-52 overflow-visible" fill="none">
      <path d="M70 130 C70 95, 130 95, 130 130 L135 180 L65 180 Z" fill="#0E1B2F" stroke="#14B8A6" strokeWidth="2.5" />
      <rect x="94" y="65" width="12" height="22" rx="6" fill="#F8FAFC" opacity="0.9" />
      <circle cx="100" cy="52" r="18" fill="#F8FAFC" stroke="#14B8A6" strokeWidth="2.5" />
      <g className={animada ? 'animate-shoulder-roll-left origin-[65px_95px]' : ''}>
        <circle cx="65" cy="95" r="14" fill="#0B7A87" stroke="#2DD4BF" strokeWidth="2" />
        <path d="M65 95 L50 145" stroke="#F8FAFC" strokeWidth="8" strokeLinecap="round" />
        <circle cx="50" cy="148" r="5" fill="#14B8A6" />
      </g>
      <g className={animada ? 'animate-shoulder-roll-right origin-[135px_95px]' : ''}>
        <circle cx="135" cy="95" r="14" fill="#0B7A87" stroke="#2DD4BF" strokeWidth="2" />
        <path d="M135 95 L150 145" stroke="#F8FAFC" strokeWidth="8" strokeLinecap="round" />
        <circle cx="150" cy="148" r="5" fill="#14B8A6" />
      </g>
      <style jsx>{`
        @keyframes shoulderRollLeft {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-14deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes shoulderRollRight {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(14deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-shoulder-roll-left { animation: shoulderRollLeft 2.8s ease-in-out infinite; }
        .animate-shoulder-roll-right { animation: shoulderRollRight 2.8s ease-in-out infinite; }
      `}</style>
    </svg>
  );
}

function MuñecoTunelCarpiano({ animada }: { animada: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-44 h-44 sm:w-52 sm:h-52 overflow-visible" fill="none">
      <rect x="20" y="92" width="80" height="20" rx="10" fill="#0E1B2F" stroke="#14B8A6" strokeWidth="2.5" />
      <circle cx="102" cy="102" r="11" fill="#0B7A87" stroke="#14B8A6" strokeWidth="2.5" />
      <g className={animada ? 'animate-wrist-flex origin-[102px_102px]' : ''}>
        <rect x="108" y="93" width="34" height="18" rx="6" fill="#F8FAFC" stroke="#14B8A6" strokeWidth="2" />
        <rect x="142" y="93" width="22" height="4" rx="2" fill="#14B8A6" />
        <rect x="144" y="98" width="24" height="4" rx="2" fill="#14B8A6" />
        <rect x="143" y="103" width="23" height="4" rx="2" fill="#14B8A6" />
        <rect x="140" y="108" width="18" height="4" rx="2" fill="#14B8A6" />
      </g>
      <style jsx>{`
        @keyframes wristFlex {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-25deg); }
        }
        .animate-wrist-flex { animation: wristFlex 3s ease-in-out infinite; }
      `}</style>
    </svg>
  );
}

function MuñecoCuello({ animada }: { animada: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-44 h-44 sm:w-52 sm:h-52 overflow-visible" fill="none">
      <path d="M60 140 C60 115, 140 115, 140 140 L145 180 L55 180 Z" fill="#0E1B2F" stroke="#14B8A6" strokeWidth="2.5" />
      <g className={animada ? 'animate-neck-tilt origin-[100px_115px]' : ''}>
        <rect x="94" y="85" width="12" height="30" rx="5" fill="#F8FAFC" opacity="0.9" />
        <circle cx="100" cy="70" r="22" fill="#F8FAFC" stroke="#14B8A6" strokeWidth="2.5" />
        <circle cx="93" cy="68" r="2.5" fill="#0E1B2F" />
        <circle cx="107" cy="68" r="2.5" fill="#0E1B2F" />
      </g>
      <style jsx>{`
        @keyframes neckTilt {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-20deg); }
          75% { transform: rotate(20deg); }
        }
        .animate-neck-tilt { animation: neckTilt 3.6s ease-in-out infinite; }
      `}</style>
    </svg>
  );
}

function MuñecoVisual({ animada }: { animada: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-44 h-44 sm:w-52 sm:h-52 overflow-visible" fill="none">
      <circle cx="100" cy="95" r="55" fill="#0E1B2F" stroke="#14B8A6" strokeWidth="3" />
      <g className={animada ? 'animate-eyes-blink' : ''}>
        <ellipse cx="80" cy="90" rx="14" ry="10" fill="#FFFFFF" stroke="#14B8A6" strokeWidth="2" />
        <circle cx="80" cy="90" r="5" fill="#14B8A6" />
        <ellipse cx="120" cy="90" rx="14" ry="10" fill="#FFFFFF" stroke="#14B8A6" strokeWidth="2" />
        <circle cx="120" cy="90" r="5" fill="#14B8A6" />
      </g>
      <style jsx>{`
        @keyframes eyesBlink {
          0%, 45%, 55%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.1); }
        }
        .animate-eyes-blink { animation: eyesBlink 3s infinite; }
      `}</style>
    </svg>
  );
}

function MuñecoLumbar({ animada }: { animada: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-44 h-44 sm:w-52 sm:h-52 overflow-visible" fill="none">
      <path d="M85 130 L80 185" stroke="#0E1B2F" strokeWidth="8" strokeLinecap="round" />
      <path d="M115 130 L120 185" stroke="#0E1B2F" strokeWidth="8" strokeLinecap="round" />
      <g className={animada ? 'animate-lumbar-arch origin-[100px_130px]' : ''}>
        <path d="M100 130 Q100 90 98 65" stroke="#F8FAFC" strokeWidth="12" strokeLinecap="round" />
        <circle cx="98" cy="50" r="16" fill="#F8FAFC" stroke="#14B8A6" strokeWidth="2.5" />
      </g>
      <style jsx>{`
        @keyframes lumbarArch {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-18deg); }
        }
        .animate-lumbar-arch { animation: lumbarArch 3.5s ease-in-out infinite; }
      `}</style>
    </svg>
  );
}

function MuñecoPiernas({ animada }: { animada: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-44 h-44 sm:w-52 sm:h-52 overflow-visible" fill="none">
      <rect x="92" y="30" width="16" height="50" rx="8" fill="#0E1B2F" stroke="#14B8A6" strokeWidth="2" />
      <g className={animada ? 'animate-calf-raise origin-[100px_160px]' : ''}>
        <line x1="88" y1="120" x2="86" y2="155" stroke="#14B8A6" strokeWidth="8" strokeLinecap="round" />
        <line x1="112" y1="120" x2="114" y2="155" stroke="#14B8A6" strokeWidth="8" strokeLinecap="round" />
      </g>
      <style jsx>{`
        @keyframes calfRaise {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .animate-calf-raise { animation: calfRaise 2.5s ease-in-out infinite; }
      `}</style>
    </svg>
  );
}
