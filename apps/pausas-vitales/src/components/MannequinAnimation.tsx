'use client';

import React, { useState } from 'react';
import { TipoEjercicioPausa } from '@/types';
import { Play, Pause, Activity, Zap } from 'lucide-react';

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

  // Clases y alturas proporcionadas
  const contenedorClasses = tamano === 'amplio'
    ? 'w-full h-64 sm:h-72'
    : 'w-full h-48 sm:h-52';

  return (
    <div 
      className={`relative ${contenedorClasses} bg-gradient-to-b from-[#0E1B2F] via-[#091322] to-[#050C16] rounded-2xl border border-[#14B8A6]/25 flex items-center justify-center overflow-hidden shadow-inner select-none group`}
      role="region"
      aria-label={`Demostración biomecánica animada en bucle para ${ejercicioId}`}
    >
      {/* Retícula técnica biomecánica de fondo */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#14B8A6_1px,transparent_1px)] [background-size:18px_18px] opacity-20 pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Guías de eje postural vertical y horizontal sutiles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15" aria-hidden="true">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#2DD4BF] to-transparent" />
      </div>

      {/* Badge tipo GIF en bucle continuo */}
      <div className="absolute top-2.5 left-2.5 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#0E1B2F]/90 backdrop-blur-md border border-[#14B8A6]/40 text-[10px] font-mono text-[#2DD4BF] shadow-sm">
        <span className={`w-2 h-2 rounded-full bg-[#10B981] ${animacionPausada ? '' : 'animate-ping'}`} />
        <span className="font-semibold tracking-wide">BUCLE BIOMECÁNICO 60 FPS</span>
      </div>

      {/* Botón accesible de pausa/reanudación (WCAG 2.2.2) */}
      <button
        onClick={() => setAnimacionPausada(!animacionPausada)}
        className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-xl bg-[#0E1B2F]/80 hover:bg-[#142642] text-slate-200 text-xs transition-all border border-[#14B8A6]/30 active:scale-95 shadow-sm"
        title={animacionPausada ? 'Reanudar animación biomecánica' : 'Pausar animación biomecánica'}
        aria-label={animacionPausada ? 'Reanudar bucle demostrativo' : 'Pausar bucle demostrativo'}
      >
        {animacionPausada ? (
          <Play className="w-3.5 h-3.5 text-[#34D399]" />
        ) : (
          <Pause className="w-3.5 h-3.5 text-[#2DD4BF]" />
        )}
      </button>

      {/* Renderizado del Avatar Biomecánico según el ejercicio activo */}
      <div 
        className={`w-full h-full flex items-center justify-center p-3 pb-8 transition-transform duration-300 ${
          animacionPausada ? '[&_*]:!animation-play-state-paused' : ''
        }`}
      >
        {ejercicioId === 'HOMBROS_ROTACION' && <MuñecoHombros animada={!animacionPausada} />}
        {ejercicioId === 'TUNEL_CARPIANO' && <MuñecoTunelCarpiano animada={!animacionPausada} />}
        {ejercicioId === 'CUELLO_TRAPECIO' && <MuñecoCuello animada={!animacionPausada} />}
        {ejercicioId === 'VISUAL_20_20' && <MuñecoVisual animada={!animacionPausada} />}
        {ejercicioId === 'LUMBAR_POSTURAL' && <MuñecoLumbar animada={!animacionPausada} />}
        {ejercicioId === 'PIERNAS_CIRCULACION' && <MuñecoPiernas animada={!animacionPausada} />}
      </div>

      {/* Pie de animación: Foco biomecánico y cadencia (diseño compacto, sin superposición) */}
      <div className="absolute bottom-2 inset-x-2.5 z-10 flex items-center justify-between px-3 py-1 rounded-xl bg-[#0E1B2F]/90 backdrop-blur-md border border-[#14B8A6]/30 text-[11px] font-mono shadow-sm">
        <span className="flex items-center space-x-1.5 text-[#2DD4BF] font-semibold truncate mr-2">
          <Activity className="w-3.5 h-3.5 text-[#10B981] shrink-0 animate-pulse" />
          <span className="truncate">Foco: {obtenerFocoMuscular(ejercicioId)}</span>
        </span>
        <span className="text-[#34D399] font-medium text-[10px] shrink-0 hidden sm:inline-flex items-center space-x-1">
          <Zap className="w-3 h-3 text-[#14B8A6]" />
          <span>Cadencia suave</span>
        </span>
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
    <svg viewBox="0 0 200 180" className="w-44 h-44 sm:w-52 sm:h-52 overflow-visible" fill="none">
      <defs>
        <radialGradient id="hombroTurquesaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#14B8A6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0B7A87" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="torsoHombros" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0E1B2F" />
          <stop offset="100%" stopColor="#0B7A87" />
        </linearGradient>
      </defs>

      {/* Torso y Base Anatómica */}
      <path 
        d="M70 120 C70 85, 130 85, 130 120 L135 165 L65 165 Z" 
        fill="url(#torsoHombros)" 
        stroke="#14B8A6" 
        strokeWidth="2.5" 
      />
      {/* Eje vertebral */}
      <line x1="100" y1="85" x2="100" y2="160" stroke="#2DD4BF" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />

      {/* Cabeza y Cuello */}
      <rect x="94" y="55" width="12" height="22" rx="6" fill="#F8FAFC" opacity="0.95" />
      <circle cx="100" cy="40" r="18" fill="#F8FAFC" stroke="#0B7A87" strokeWidth="2.5" />
      {/* Rasgos faciales neutros serenos */}
      <circle cx="94" cy="38" r="2" fill="#0E1B2F" />
      <circle cx="106" cy="38" r="2" fill="#0E1B2F" />
      <path d="M96 46 Q100 50 104 46" stroke="#0B7A87" strokeWidth="1.5" strokeLinecap="round" />

      {/* Hombro Izquierdo y Brazo con Animación en Círculo */}
      <g className={animada ? 'animate-shoulder-roll-left origin-[65px_85px]' : ''}>
        <circle cx="65" cy="85" r="14" fill="#0B7A87" stroke="#2DD4BF" strokeWidth="2" />
        {/* Resplandor de descompresión biomecánica */}
        <circle cx="65" cy="85" r="22" fill="url(#hombroTurquesaGlow)" className="animate-pulse" />
        {/* Brazo izquierdo */}
        <path d="M65 85 L50 135" stroke="#F8FAFC" strokeWidth="8" strokeLinecap="round" />
        <circle cx="50" cy="138" r="5" fill="#10B981" />
      </g>

      {/* Hombro Derecho y Brazo con Animación en Círculo */}
      <g className={animada ? 'animate-shoulder-roll-right origin-[135px_85px]' : ''}>
        <circle cx="135" cy="85" r="14" fill="#0B7A87" stroke="#2DD4BF" strokeWidth="2" />
        <circle cx="135" cy="85" r="22" fill="url(#hombroTurquesaGlow)" className="animate-pulse" />
        {/* Brazo derecho */}
        <path d="M135 85 L150 135" stroke="#F8FAFC" strokeWidth="8" strokeLinecap="round" />
        <circle cx="150" cy="138" r="5" fill="#10B981" />
      </g>

      {/* Flechas indicativas de rotación armónica */}
      <path d="M50 68 C48 54, 76 54, 76 66" stroke="#10B981" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
      <polygon points="76,67 72,62 80,62" fill="#10B981" />
      
      <path d="M150 68 C152 54, 124 54, 124 66" stroke="#10B981" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
      <polygon points="124,67 120,62 128,62" fill="#10B981" />

      <style jsx>{`
        @keyframes shoulderRollLeft {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(-8deg); }
          50% { transform: translateY(-3px) rotate(-14deg); }
          75% { transform: translateY(5px) rotate(-4deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes shoulderRollRight {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(8deg); }
          50% { transform: translateY(-3px) rotate(14deg); }
          75% { transform: translateY(5px) rotate(4deg); }
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
    <svg viewBox="0 0 200 180" className="w-44 h-44 sm:w-52 sm:h-52 overflow-visible" fill="none">
      <defs>
        <radialGradient id="munecaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0B7A87" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Antebrazo principal extendido */}
      <rect x="20" y="82" width="80" height="20" rx="10" fill="#0E1B2F" stroke="#0B7A87" strokeWidth="2.5" />
      <line x1="25" y1="92" x2="95" y2="92" stroke="#2DD4BF" strokeWidth="2" strokeDasharray="4 2" opacity="0.7" />

      {/* Articulación de Muñeca (Pivote y Retináculo) */}
      <circle cx="102" cy="92" r="14" fill="url(#munecaGlow)" className="animate-pulse" />
      <circle cx="102" cy="92" r="11" fill="#0B7A87" stroke="#10B981" strokeWidth="2.5" />

      {/* Mano y Dedos oscilando suavemente */}
      <g className={animada ? 'animate-wrist-flex origin-[102px_92px]' : ''}>
        {/* Palma */}
        <rect x="108" y="83" width="34" height="18" rx="6" fill="#F8FAFC" stroke="#0B7A87" strokeWidth="2" />
        {/* Dedos extendidos */}
        <rect x="142" y="83" width="22" height="4" rx="2" fill="#14B8A6" />
        <rect x="144" y="88" width="24" height="4" rx="2" fill="#10B981" />
        <rect x="143" y="93" width="23" height="4" rx="2" fill="#14B8A6" />
        <rect x="140" y="98" width="18" height="4" rx="2" fill="#10B981" />
        {/* Pulgar */}
        <rect x="114" y="75" width="12" height="6" rx="3" fill="#F8FAFC" transform="rotate(-30 114 75)" />
      </g>

      {/* Mano de apoyo que ejerce suave tracción ergonómica */}
      <g className={animada ? 'animate-support-hand origin-[155px_92px]' : ''}>
        <path d="M165 60 C165 80, 150 85, 145 88" stroke="#2DD4BF" strokeWidth="5" strokeLinecap="round" />
        <circle cx="145" cy="88" r="5" fill="#10B981" />
      </g>

      {/* Arcos de movimiento guiado flexo-extensión */}
      <path d="M135 58 C158 70, 158 112, 135 124" stroke="#14B8A6" strokeWidth="2" strokeDasharray="3 3" />
      <polygon points="135,58 142,60 138,66" fill="#14B8A6" />
      <polygon points="135,124 142,122 138,116" fill="#14B8A6" />

      <style jsx>{`
        @keyframes wristFlex {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-28deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(24deg); }
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
    <svg viewBox="0 0 200 180" className="w-44 h-44 sm:w-52 sm:h-52 overflow-visible" fill="none">
      {/* Torso estable (anclaje biomecánico) */}
      <path 
        d="M60 125 C60 100, 140 100, 140 125 L145 165 L55 165 Z" 
        fill="#0E1B2F" 
        stroke="#0B7A87" 
        strokeWidth="2.5" 
      />
      
      {/* Hombros fijos alineados para evitar compensación */}
      <circle cx="65" cy="105" r="8" fill="#0B7A87" stroke="#2DD4BF" strokeWidth="1.5" />
      <circle cx="135" cy="105" r="8" fill="#0B7A87" stroke="#2DD4BF" strokeWidth="1.5" />
      <line x1="65" y1="105" x2="135" y2="105" stroke="#0B7A87" strokeWidth="3" />

      {/* Cuello y Cabeza con Animación Lateral y Semicírculo */}
      <g className={animada ? 'animate-neck-tilt origin-[100px_100px]' : ''}>
        {/* Columna cervical */}
        <rect x="94" y="70" width="12" height="30" rx="5" fill="#F8FAFC" opacity="0.95" />
        {/* Cabeza */}
        <circle cx="100" cy="55" r="22" fill="#F8FAFC" stroke="#0B7A87" strokeWidth="2.5" />
        {/* Ojos y sonrisa serena */}
        <circle cx="93" cy="53" r="2.5" fill="#0E1B2F" />
        <circle cx="107" cy="53" r="2.5" fill="#0E1B2F" />
        <path d="M96 61 Q100 65 104 61" stroke="#0B7A87" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Destellos de descompresión en trapecio */}
        <circle cx="75" cy="45" r="3" fill="#34D399" className="animate-ping" opacity="0.8" />
        <circle cx="125" cy="45" r="3" fill="#34D399" className="animate-ping" opacity="0.8" />
      </g>

      {/* Arcos guía de inclinación lateral oreja a hombro */}
      <path d="M65 45 C80 25, 120 25, 135 45" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
      <polygon points="65,45 67,37 73,41" fill="#10B981" />
      <polygon points="135,45 133,37 127,41" fill="#10B981" />

      <style jsx>{`
        @keyframes neckTilt {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-20deg); }
          40% { transform: rotate(0deg); }
          60% { transform: rotate(20deg); }
          80% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-neck-tilt {
          animation: neckTilt 4.2s ease-in-out infinite;
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
    <svg viewBox="0 0 200 180" className="w-44 h-44 sm:w-52 sm:h-52 overflow-visible" fill="none">
      {/* Rostro en primer plano */}
      <circle cx="100" cy="85" r="55" fill="#0E1B2F" stroke="#0B7A87" strokeWidth="3" />
      
      {/* Ojos con parpadeo y enfoque al horizonte */}
      <g className={animada ? 'animate-eyes-blink origin-[100px_80px]' : ''}>
        {/* Ojo Izquierdo */}
        <ellipse cx="80" cy="80" rx="15" ry="11" fill="#FFFFFF" stroke="#0B7A87" strokeWidth="2" />
        <circle cx="80" cy="80" r="5.5" fill="#0B7A87" className={animada ? 'animate-pupil-shift' : ''} />
        <circle cx="82" cy="78" r="1.5" fill="#2DD4BF" />

        {/* Ojo Derecho */}
        <ellipse cx="120" cy="80" rx="15" ry="11" fill="#FFFFFF" stroke="#0B7A87" strokeWidth="2" />
        <circle cx="120" cy="80" r="5.5" fill="#0B7A87" className={animada ? 'animate-pupil-shift' : ''} />
        <circle cx="122" cy="78" r="1.5" fill="#2DD4BF" />
      </g>

      {/* Cejas relajadas */}
      <path d="M68 66 Q80 63 92 66" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M108 66 Q120 63 132 66" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" />

      {/* Líneas de enfoque hacia el horizonte distante */}
      <g className={animada ? 'animate-pulse' : ''}>
        <line x1="80" y1="75" x2="35" y2="25" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="120" y1="75" x2="165" y2="25" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="35" cy="25" r="4" fill="#34D399" />
        <circle cx="165" cy="25" r="4" fill="#34D399" />
      </g>

      {/* Boca sonriente de relajación */}
      <path d="M90 110 Q100 118 110 110" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />

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
          animation: eyesBlink 3.8s infinite;
        }
        .animate-pupil-shift {
          animation: pupilShift 3.8s ease-in-out infinite;
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
    <svg viewBox="0 0 200 180" className="w-44 h-44 sm:w-52 sm:h-52 overflow-visible" fill="none">
      {/* Piernas estables */}
      <path d="M85 115 L80 165" stroke="#0E1B2F" strokeWidth="8" strokeLinecap="round" />
      <path d="M115 115 L120 165" stroke="#0E1B2F" strokeWidth="8" strokeLinecap="round" />
      <rect x="70" y="160" width="22" height="6" rx="3" fill="#0B7A87" />
      <rect x="110" y="160" width="22" height="6" rx="3" fill="#0B7A87" />

      {/* Cadera / Pelvis (Centro de apoyo) */}
      <ellipse cx="100" cy="115" rx="20" ry="10" fill="#0B7A87" stroke="#14B8A6" strokeWidth="1.5" />

      {/* Tronco, Manos en Cadera y Cabeza arqueándose hacia atrás */}
      <g className={animada ? 'animate-lumbar-arch origin-[100px_115px]' : ''}>
        {/* Columna dorsal y lumbar */}
        <path d="M100 115 Q100 75 98 50" stroke="#F8FAFC" strokeWidth="12" strokeLinecap="round" />
        
        {/* Manos apoyadas en la zona lumbar */}
        <circle cx="85" cy="110" r="7" fill="#10B981" />
        <circle cx="115" cy="110" r="7" fill="#10B981" />
        <path d="M85 110 L92 75" stroke="#14B8A6" strokeWidth="4" strokeLinecap="round" />
        <path d="M115 110 L108 75" stroke="#14B8A6" strokeWidth="4" strokeLinecap="round" />

        {/* Cabeza mirando hacia el techo */}
        <circle cx="98" cy="35" r="16" fill="#F8FAFC" stroke="#0B7A87" strokeWidth="2.5" />
        <circle cx="105" cy="31" r="2" fill="#0E1B2F" />
      </g>

      {/* Resplandor de descompresión lumbar L4-S1 */}
      <circle cx="100" cy="110" r="16" fill="#34D399" opacity="0.35" className="animate-ping" />

      <style jsx>{`
        @keyframes lumbarArch {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-16deg); }
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
    <svg viewBox="0 0 200 180" className="w-44 h-44 sm:w-52 sm:h-52 overflow-visible" fill="none">
      {/* Tronco superior erguido */}
      <rect x="92" y="20" width="16" height="50" rx="8" fill="#0E1B2F" stroke="#0B7A87" strokeWidth="2" />
      <circle cx="100" cy="12" r="12" fill="#F8FAFC" stroke="#0B7A87" strokeWidth="2" />

      {/* Piernas y Pies que se elevan sobre las puntas */}
      <g className={animada ? 'animate-calf-raise origin-[100px_145px]' : ''}>
        {/* Muslos */}
        <line x1="93" y1="70" x2="88" y2="105" stroke="#0B7A87" strokeWidth="7" strokeLinecap="round" />
        <line x1="107" y1="70" x2="112" y2="105" stroke="#0B7A87" strokeWidth="7" strokeLinecap="round" />
        {/* Rodillas */}
        <circle cx="88" cy="105" r="5" fill="#2DD4BF" />
        <circle cx="112" cy="105" r="5" fill="#2DD4BF" />
        {/* Pantorrillas / Gemelos con foco de contracción */}
        <line x1="88" y1="105" x2="86" y2="140" stroke="#10B981" strokeWidth="8" strokeLinecap="round" />
        <line x1="112" y1="105" x2="114" y2="140" stroke="#10B981" strokeWidth="8" strokeLinecap="round" />
        {/* Pies sobre la punta */}
        <polygon points="82,145 90,145 86,135" fill="#F8FAFC" />
        <polygon points="110,145 118,145 114,135" fill="#F8FAFC" />
      </g>

      {/* Línea del suelo */}
      <line x1="50" y1="150" x2="150" y2="150" stroke="#64748B" strokeWidth="2" strokeDasharray="4 2" />

      {/* Flechas ascendentes de flujo de retorno venoso */}
      <g className={animada ? 'animate-bounce' : ''}>
        <path d="M72 135 L72 105" stroke="#2DD4BF" strokeWidth="2.5" />
        <polygon points="72,103 68,109 76,109" fill="#2DD4BF" />
        
        <path d="M128 135 L128 105" stroke="#2DD4BF" strokeWidth="2.5" />
        <polygon points="128,103 124,109 132,109" fill="#2DD4BF" />
      </g>

      <style jsx>{`
        @keyframes calfRaise {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .animate-calf-raise {
          animation: calfRaise 2.6s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
}
