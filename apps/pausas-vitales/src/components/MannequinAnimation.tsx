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
  duracionSegundos = 60,
  tamano = 'amplio',
}: MannequinAnimationProps) {
  const [animacionPausada, setAnimacionPausada] = useState<boolean>(false);

  // Clases y alturas según tamaño
  const contenedorClasses = tamano === 'amplio'
    ? 'w-full h-72 sm:h-80'
    : 'w-full h-48 sm:h-56';

  return (
    <div className={`relative ${contenedorClasses} bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-vital-forest/30 flex items-center justify-center overflow-hidden shadow-inner select-none`}>
      {/* Retícula sutil de fondo biomecánico */}
      <div className="absolute inset-0 bg-[radial-gradient(#0D7377_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none"></div>

      {/* Badge tipo GIF en bucle */}
      <div className="absolute top-3 left-3 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-vital-terracotta/40 text-[10px] font-mono text-amber-300 shadow">
        <span className={`w-2 h-2 rounded-full bg-vital-terracotta ${animacionPausada ? '' : 'animate-ping'}`}></span>
        <span>DEMOSTRACIÓN EN BUCLE</span>
      </div>

      {/* Botón accesible de pausa de animación (WCAG 2.2.2) */}
      <button
        onClick={() => setAnimacionPausada(!animacionPausada)}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs transition-colors border border-slate-700"
        title={animacionPausada ? 'Reanudar animación' : 'Pausar animación'}
        aria-label={animacionPausada ? 'Reanudar demostración animada' : 'Pausar demostración animada'}
      >
        {animacionPausada ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-slate-300" />}
      </button>

      {/* Renderizado del Muñeco Biomecánico según el ejercicio */}
      <div className={`w-full h-full flex items-center justify-center p-4 transition-transform duration-300 ${animacionPausada ? '[&_*]:!animation-play-state-paused' : ''}`}>
        {ejercicioId === 'HOMBROS_ROTACION' && <MuñecoHombros animada={!animacionPausada} />}
        {ejercicioId === 'TUNEL_CARPIANO' && <MuñecoTunelCarpiano animada={!animacionPausada} />}
        {ejercicioId === 'CUELLO_TRAPECIO' && <MuñecoCuello animada={!animacionPausada} />}
        {ejercicioId === 'VISUAL_20_20' && <MuñecoVisual animada={!animacionPausada} />}
        {ejercicioId === 'LUMBAR_POSTURAL' && <MuñecoLumbar animada={!animacionPausada} />}
        {ejercicioId === 'PIERNAS_CIRCULACION' && <MuñecoPiernas animada={!animacionPausada} />}
      </div>

      {/* Pie de animación: Músculo enfocado */}
      <div className="absolute bottom-2.5 inset-x-3 z-10 flex items-center justify-between px-3 py-1 rounded-lg bg-slate-900/85 backdrop-blur-sm border border-slate-800 text-[11px] font-mono text-slate-400">
        <span className="flex items-center space-x-1 text-emerald-400">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span>Foco: {obtenerFocoMuscular(ejercicioId)}</span>
        </span>
        <span className="text-slate-400">Cadencia suave • Sin dolor</span>
      </div>
    </div>
  );
}

function obtenerFocoMuscular(id: TipoEjercicioPausa): string {
  switch (id) {
    case 'HOMBROS_ROTACION': return 'Trapecio y manguito rotador';
    case 'TUNEL_CARPIANO': return 'Tendones flexores y nervio mediano';
    case 'CUELLO_TRAPECIO': return 'Esternocleidomastoideo y nuca';
    case 'VISUAL_20_20': return 'Músculos ciliares y córnea';
    case 'LUMBAR_POSTURAL': return 'Erectores espinales y cuadrado lumbar';
    case 'PIERNAS_CIRCULACION': return 'Gemelos, sóleo y bomba venosa';
  }
}

// ============================================================================
// 1. ANIMACIÓN: RELAJACIÓN Y ROTACIÓN DE HOMBROS
// ============================================================================
function MuñecoHombros({ animada }: { animada: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 sm:w-56 sm:h-56 overflow-visible" fill="none">
      <defs>
        <radialGradient id="hombroGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F48C42" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F48C42" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Torso y Base */}
      <path d="M70 130 C70 95, 130 95, 130 130 L135 180 L65 180 Z" fill="#14213D" stroke="#0D7377" strokeWidth="2.5" />
      <line x1="100" y1="95" x2="100" y2="175" stroke="#0D7377" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />

      {/* Cabeza y Cuello */}
      <rect x="94" y="65" width="12" height="22" rx="6" fill="#F8FAFC" opacity="0.9" />
      <circle cx="100" cy="52" r="18" fill="#F8FAFC" stroke="#0D7377" strokeWidth="2.5" />
      {/* Rasgos faciales neutros */}
      <circle cx="94" cy="50" r="2" fill="#14213D" />
      <circle cx="106" cy="50" r="2" fill="#14213D" />
      <path d="M96 58 Q100 62 104 58" stroke="#14213D" strokeWidth="1.5" strokeLinecap="round" />

      {/* Hombro Izquierdo y Brazo con Animación en Círculo */}
      <g className={animada ? 'animate-shoulder-roll-left origin-[65px_95px]' : ''}>
        <circle cx="65" cy="95" r="14" fill="#0D7377" stroke="#38BDF8" strokeWidth="2" />
        {/* Resplandor de tensión liberada */}
        <circle cx="65" cy="95" r="20" fill="url(#hombroGlow)" className="animate-pulse" />
        {/* Brazo izquierdo */}
        <path d="M65 95 L50 145" stroke="#F8FAFC" strokeWidth="8" strokeLinecap="round" />
        <circle cx="50" cy="148" r="5" fill="#F48C42" />
      </g>

      {/* Hombro Derecho y Brazo con Animación en Círculo */}
      <g className={animada ? 'animate-shoulder-roll-right origin-[135px_95px]' : ''}>
        <circle cx="135" cy="95" r="14" fill="#0D7377" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="135" cy="95" r="20" fill="url(#hombroGlow)" className="animate-pulse" />
        {/* Brazo derecho */}
        <path d="M135 95 L150 145" stroke="#F8FAFC" strokeWidth="8" strokeLinecap="round" />
        <circle cx="150" cy="148" r="5" fill="#F48C42" />
      </g>

      {/* Flechas indicativas de rotación */}
      <path d="M52 80 C50 65, 75 65, 75 75" stroke="#F48C42" strokeWidth="2.5" strokeDasharray="3 2" fill="none" markerEnd="url(#arrow)" />
      <path d="M148 80 C150 65, 125 65, 125 75" stroke="#F48C42" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
      
      {/* Texto de cadencia */}
      <text x="100" y="195" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">
        Giro circular continuo (atrás ⟲ adelante)
      </text>

      <style jsx>{`
        @keyframes shoulderRollLeft {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(-8deg); }
          50% { transform: translateY(-4px) rotate(-14deg); }
          75% { transform: translateY(4px) rotate(-4deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes shoulderRollRight {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(8deg); }
          50% { transform: translateY(-4px) rotate(14deg); }
          75% { transform: translateY(4px) rotate(4deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-shoulder-roll-left {
          animation: shoulderRollLeft 2.8s ease-in-out infinite;
        }
        .animate-shoulder-roll-right {
          animation: shoulderRollRight 2.8s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
}

// ============================================================================
// 2. ANIMACIÓN: MOVILIDAD TÚNEL CARPIANO Y MUÑECAS
// ============================================================================
function MuñecoTunelCarpiano({ animada }: { animada: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 sm:w-56 sm:h-56 overflow-visible" fill="none">
      {/* Antebrazo principal extendido */}
      <rect x="20" y="92" width="80" height="20" rx="10" fill="#14213D" stroke="#0D7377" strokeWidth="2.5" />
      <line x1="25" y1="102" x2="95" y2="102" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 2" opacity="0.6" />

      {/* Articulación de Muñeca (Pivote) */}
      <circle cx="102" cy="102" r="11" fill="#0D7377" stroke="#F48C42" strokeWidth="2.5" />

      {/* Mano y Dedos oscilando suavemente (Flexión y Extensión) */}
      <g className={animada ? 'animate-wrist-flex origin-[102px_102px]' : ''}>
        {/* Palma */}
        <rect x="108" y="93" width="34" height="18" rx="6" fill="#F8FAFC" stroke="#0D7377" strokeWidth="2" />
        {/* Dedos extendidos */}
        <rect x="142" y="93" width="22" height="4" rx="2" fill="#F48C42" />
        <rect x="144" y="98" width="24" height="4" rx="2" fill="#F48C42" />
        <rect x="143" y="103" width="23" height="4" rx="2" fill="#F48C42" />
        <rect x="140" y="108" width="18" height="4" rx="2" fill="#F48C42" />
        {/* Pulgar */}
        <rect x="114" y="85" width="12" height="6" rx="3" fill="#F8FAFC" transform="rotate(-30 114 85)" />
      </g>

      {/* Mano de apoyo que ejerce suave tracción */}
      <g className={animada ? 'animate-support-hand origin-[155px_102px]' : ''}>
        <path d="M165 70 C165 90, 150 95, 145 98" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
        <circle cx="145" cy="98" r="5" fill="#F48C42" />
      </g>

      {/* Arcos de movimiento de flexo-extensión */}
      <path d="M135 70 C155 80, 155 120, 135 130" stroke="#F48C42" strokeWidth="2" strokeDasharray="3 3" />
      <polygon points="135,70 142,72 138,78" fill="#F48C42" />
      <polygon points="135,130 142,128 138,122" fill="#F48C42" />

      <text x="100" y="180" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">
        Flexión y extensión del nervio mediano
      </text>

      <style jsx>{`
        @keyframes wristFlex {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-30deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(25deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes supportHand {
          0% { transform: translateY(0); }
          25% { transform: translateY(-6px) translateX(-2px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(6px) translateX(-2px); }
          100% { transform: translateY(0); }
        }
        .animate-wrist-flex {
          animation: wristFlex 3.2s ease-in-out infinite;
        }
        .animate-support-hand {
          animation: supportHand 3.2s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
}

// ============================================================================
// 3. ANIMACIÓN: DESCOMPRESIÓN CERVICAL Y CUELLO
// ============================================================================
function MuñecoCuello({ animada }: { animada: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 sm:w-56 sm:h-56 overflow-visible" fill="none">
      {/* Torso estable (no se mueve) */}
      <path d="M60 140 C60 115, 140 115, 140 140 L145 180 L55 180 Z" fill="#14213D" stroke="#0D7377" strokeWidth="2.5" />
      
      {/* Hombros fijos alineados */}
      <circle cx="65" cy="120" r="8" fill="#0D7377" />
      <circle cx="135" cy="120" r="8" fill="#0D7377" />
      <line x1="65" y1="120" x2="135" y2="120" stroke="#0D7377" strokeWidth="3" />

      {/* Cuello y Cabeza con Animación Lateral y Semicírculo */}
      <g className={animada ? 'animate-neck-tilt origin-[100px_115px]' : ''}>
        {/* Cuello */}
        <rect x="94" y="85" width="12" height="30" rx="5" fill="#F8FAFC" opacity="0.9" />
        {/* Cabeza */}
        <circle cx="100" cy="70" r="22" fill="#F8FAFC" stroke="#0D7377" strokeWidth="2.5" />
        {/* Ojos y sonrisa tranquila */}
        <circle cx="93" cy="68" r="2.5" fill="#14213D" />
        <circle cx="107" cy="68" r="2.5" fill="#14213D" />
        <path d="M96 76 Q100 80 104 76" stroke="#14213D" strokeWidth="1.5" strokeLinecap="round" />
        {/* Destellos de alivio */}
        <circle cx="75" cy="60" r="3" fill="#F48C42" className="animate-ping" opacity="0.7" />
        <circle cx="125" cy="60" r="3" fill="#F48C42" className="animate-ping" opacity="0.7" />
      </g>

      {/* Arcos guía de inclinación lateral */}
      <path d="M65 60 C80 40, 120 40, 135 60" stroke="#F48C42" strokeWidth="2" strokeDasharray="3 3" />
      <text x="100" y="195" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">
        Inclinación lenta oreja a hombro (sin forzar)
      </text>

      <style jsx>{`
        @keyframes neckTilt {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-22deg); }
          40% { transform: rotate(0deg); }
          60% { transform: rotate(22deg); }
          80% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-neck-tilt {
          animation: neckTilt 4s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
}

// ============================================================================
// 4. ANIMACIÓN: REGLA 20-20-20 DESCANSO OCULAR
// ============================================================================
function MuñecoVisual({ animada }: { animada: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 sm:w-56 sm:h-56 overflow-visible" fill="none">
      {/* Rostro en primer plano */}
      <circle cx="100" cy="95" r="55" fill="#14213D" stroke="#0D7377" strokeWidth="3" />
      
      {/* Ojos Grandes con Pupilas que se mueven y parpadean */}
      <g className={animada ? 'animate-eyes-blink origin-[100px_90px]' : ''}>
        {/* Ojo Izquierdo */}
        <ellipse cx="80" cy="90" rx="14" ry="10" fill="#FFFFFF" stroke="#0D7377" strokeWidth="2" />
        <circle cx="80" cy="90" r="5" fill="#0D7377" className={animada ? 'animate-pupil-shift' : ''} />
        <circle cx="82" cy="88" r="1.5" fill="#FFFFFF" />

        {/* Ojo Derecho */}
        <ellipse cx="120" cy="90" rx="14" ry="10" fill="#FFFFFF" stroke="#0D7377" strokeWidth="2" />
        <circle cx="120" cy="90" r="5" fill="#0D7377" className={animada ? 'animate-pupil-shift' : ''} />
        <circle cx="122" cy="88" r="1.5" fill="#FFFFFF" />
      </g>

      {/* Cejas relajadas */}
      <path d="M68 76 Q80 73 92 76" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M108 76 Q120 73 132 76" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />

      {/* Líneas de enfoque hacia el horizonte distante (20 pies / 6 metros) */}
      <g className={animada ? 'animate-pulse' : ''}>
        <line x1="80" y1="85" x2="40" y2="40" stroke="#F48C42" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="120" y1="85" x2="160" y2="40" stroke="#F48C42" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="35" cy="35" r="4" fill="#F48C42" />
        <circle cx="165" cy="35" r="4" fill="#F48C42" />
      </g>

      {/* Boca sonriente de descanso */}
      <path d="M90 120 Q100 128 110 120" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />

      <text x="100" y="180" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">
        Enfoque lejano a 6 metros (parpadeo consciente)
      </text>

      <style jsx>{`
        @keyframes eyesBlink {
          0%, 45%, 55%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.1); }
        }
        @keyframes pupilShift {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        .animate-eyes-blink {
          animation: eyesBlink 3.5s infinite;
        }
        .animate-pupil-shift {
          animation: pupilShift 3.5s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
}

// ============================================================================
// 5. ANIMACIÓN: EXTENSIÓN LUMBAR Y DESCOMPRESIÓN
// ============================================================================
function MuñecoLumbar({ animada }: { animada: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 sm:w-56 sm:h-56 overflow-visible" fill="none">
      {/* Piernas estables */}
      <path d="M85 130 L80 185" stroke="#14213D" strokeWidth="8" strokeLinecap="round" />
      <path d="M115 130 L120 185" stroke="#14213D" strokeWidth="8" strokeLinecap="round" />
      <rect x="70" y="180" width="22" height="6" rx="3" fill="#0D7377" />
      <rect x="110" y="180" width="22" height="6" rx="3" fill="#0D7377" />

      {/* Cadera / Pelvis (Centro de apoyo) */}
      <ellipse cx="100" cy="130" rx="20" ry="10" fill="#0D7377" />

      {/* Tronco, Manos en Cadera y Cabeza arqueándose hacia atrás */}
      <g className={animada ? 'animate-lumbar-arch origin-[100px_130px]' : ''}>
        {/* Columna dorsal y lumbar */}
        <path d="M100 130 Q100 90 98 65" stroke="#F8FAFC" strokeWidth="12" strokeLinecap="round" />
        
        {/* Manos apoyadas en la zona lumbar */}
        <circle cx="85" cy="125" r="7" fill="#F48C42" />
        <circle cx="115" cy="125" r="7" fill="#F48C42" />
        <path d="M85 125 L92 90" stroke="#F48C42" strokeWidth="4" strokeLinecap="round" />
        <path d="M115 125 L108 90" stroke="#F48C42" strokeWidth="4" strokeLinecap="round" />

        {/* Cabeza mirando al techo */}
        <circle cx="98" cy="50" r="16" fill="#F8FAFC" stroke="#0D7377" strokeWidth="2.5" />
        <circle cx="105" cy="46" r="2" fill="#14213D" />
      </g>

      {/* Resplandor de descompresión lumbar */}
      <circle cx="100" cy="125" r="14" fill="#F48C42" opacity="0.3" className="animate-ping" />

      <text x="100" y="198" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">
        Arqueo controlado con manos en la cintura
      </text>

      <style jsx>{`
        @keyframes lumbarArch {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-18deg); }
        }
        .animate-lumbar-arch {
          animation: lumbarArch 3.6s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
}

// ============================================================================
// 6. ANIMACIÓN: ACTIVACIÓN DE PIERNAS Y RETORNO VENOSO
// ============================================================================
function MuñecoPiernas({ animada }: { animada: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48 sm:w-56 sm:h-56 overflow-visible" fill="none">
      {/* Tronco superior erguido */}
      <rect x="92" y="30" width="16" height="50" rx="8" fill="#14213D" stroke="#0D7377" strokeWidth="2" />
      <circle cx="100" cy="20" r="12" fill="#F8FAFC" stroke="#0D7377" strokeWidth="2" />

      {/* Piernas y Pies que se elevan sobre las puntas */}
      <g className={animada ? 'animate-calf-raise origin-[100px_160px]' : ''}>
        {/* Muslos */}
        <line x1="93" y1="80" x2="88" y2="120" stroke="#0D7377" strokeWidth="7" strokeLinecap="round" />
        <line x1="107" y1="80" x2="112" y2="120" stroke="#0D7377" strokeWidth="7" strokeLinecap="round" />
        {/* Rodillas */}
        <circle cx="88" cy="120" r="5" fill="#38BDF8" />
        <circle cx="112" cy="120" r="5" fill="#38BDF8" />
        {/* Pantorrillas / Gemelos con foco de contracción */}
        <line x1="88" y1="120" x2="86" y2="155" stroke="#F48C42" strokeWidth="8" strokeLinecap="round" />
        <line x1="112" y1="120" x2="114" y2="155" stroke="#F48C42" strokeWidth="8" strokeLinecap="round" />
        {/* Pies sobre la punta */}
        <polygon points="82,160 90,160 86,150" fill="#F8FAFC" />
        <polygon points="110,160 118,160 114,150" fill="#F8FAFC" />
      </g>

      {/* Línea del suelo */}
      <line x1="50" y1="165" x2="150" y2="165" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />

      {/* Flechas ascendentes de retorno venoso */}
      <g className={animada ? 'animate-bounce' : ''}>
        <path d="M72 150 L72 120" stroke="#38BDF8" strokeWidth="2" markerEnd="url(#arrow)" />
        <path d="M128 150 L128 120" stroke="#38BDF8" strokeWidth="2" markerEnd="url(#arrow)" />
      </g>

      <text x="100" y="185" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">
        Elevación de talones (estimula circulación)
      </text>

      <style jsx>{`
        @keyframes calfRaise {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .animate-calf-raise {
          animation: calfRaise 2.5s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
}
