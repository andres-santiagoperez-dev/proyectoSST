'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowDown, 
  Search, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  Radio,
  ExternalLink
} from 'lucide-react';
import UnseenButton from './UnseenButton';

interface ImmersiveHeroProps {
  onStartTour?: () => void;
  onOpenDirectory?: () => void;
}

export default function ImmersiveHero({ onStartTour, onOpenDirectory }: ImmersiveHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detección de reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Respuesta sutil al cursor (Unseen Studio style)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0.5, y: 0.5 });
  };

  const scrollToTour = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onStartTour) {
      onStartTour();
      return;
    }
    const target = document.getElementById('recorrido-sst');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDirectory = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenDirectory) {
      onOpenDirectory();
      return;
    }
    const target = document.getElementById('directorio-normas');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cálculo de offsets para el parallax sutil (máximo +/- 15px)
  const offsetX = (mousePos.x - 0.5) * 28;
  const offsetY = (mousePos.y - 0.5) * 20;

  return (
    <section 
      ref={containerRef}
      data-theme="dark"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[85vh] sm:min-h-[88vh] flex flex-col justify-between overflow-hidden rounded-3xl bg-[#0E1B2F] text-white border border-[#1E293B] shadow-2xl transition-colors select-none"
      aria-label="Portada inmersiva de Seguridad y Salud en el Trabajo"
    >
      {/* Fondo Interactivo Reactivo (SVG / Grid con parallax sutil) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: prefersReducedMotion 
            ? 'none' 
            : `translate3d(${offsetX * 0.4}px, ${offsetY * 0.4}px, 0)`,
        }}
      >
        {/* Retícula arquitectónica ortogonal */}
        <div 
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #64748B 1px, transparent 1px),
              linear-gradient(to bottom, #64748B 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Resplandores de luz ambiental */}
        <div 
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#1A56DB]/25 blur-[120px] pointer-events-none"
          style={{
            transform: `translate(${offsetX * -0.6}px, ${offsetY * -0.6}px)`,
          }}
        />
        <div 
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#0B7A87]/30 blur-[120px] pointer-events-none"
          style={{
            transform: `translate(${offsetX * 0.8}px, ${offsetY * 0.8}px)`,
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#10B981]/10 blur-[140px] pointer-events-none"
        />

        {/* Nodos de telemetría y seguridad flotantes reactivos */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
          viewBox="0 0 1000 600" 
          preserveAspectRatio="none"
        >
          {/* Línea axonométrica de seguridad */}
          <path 
            d="M 100 120 L 350 240 L 680 180 L 920 320" 
            stroke="#14B8A6" 
            strokeWidth="1.5" 
            strokeDasharray="6 6" 
            fill="none" 
            opacity="0.5"
          />
          <path 
            d="M 200 480 L 450 380 L 750 440 L 950 280" 
            stroke="#1A56DB" 
            strokeWidth="1.5" 
            strokeDasharray="4 8" 
            fill="none" 
            opacity="0.4"
          />

          {/* Nodos pulsantes */}
          <circle cx="350" cy="240" r="4" fill="#34D399" className="animate-pulse" />
          <circle cx="680" cy="180" r="4" fill="#06B6D4" />
          <circle cx="450" cy="380" r="4" fill="#F59E0B" />
        </svg>
      </div>

      {/* Franja Superior: Status en Vivo // System Health */}
      <div className="relative z-10 px-6 sm:px-12 pt-8 sm:pt-10 flex flex-wrap items-center justify-between gap-4">
        
        {/* Badge en vivo System Health: OK */}
        <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#0E1726]/80 backdrop-blur-md border border-[#1E293B] shadow-inner text-xs font-mono">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
          </span>
          <span className="text-[#34D399] font-bold tracking-wider">SYSTEM HEALTH: OK</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">0 Incidentes Hoy</span>
        </div>

        {/* Metadatos normativos corporativos */}
        <div className="hidden md:flex items-center space-x-4 text-xs font-mono text-slate-400">
          <span>SG-SST VIGENCIA 2026</span>
          <span>|</span>
          <span className="text-slate-300">NTC 1461 // GTC 45 // RES. 0312</span>
        </div>
      </div>

      {/* Contenido Central: Tipografía Protagonista y Narrativa Estilo Unseen Studio */}
      <div className="relative z-10 px-6 sm:px-12 py-10 sm:py-16 max-w-5xl">
        
        {/* Micro-etiqueta superior */}
        <div className="inline-flex items-center space-x-2 mb-4 text-xs font-mono uppercase tracking-[0.2em] text-[#14B8A6]">
          <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
          <span>Experiencia Web Interactiva de Seguridad</span>
        </div>

        {/* Titular Principal de Alto Impacto */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-outfit tracking-tight leading-[1.08] text-white">
          La seguridad de la empresa, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            vivida paso a paso.
          </span>
        </h1>

        {/* Subtítulo editorial breve y claro */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 font-sans max-w-2xl leading-relaxed font-normal">
          Explora los protocolos de protección, los riesgos mapeados bajo GTC 45 y el gemelo digital de la sede a través de una narrativa visual clara y sin saturación.
        </p>

        {/* Dual CTA con Microinteracción Rollover Unseen */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4 font-mono">
          
          {/* CTA Principal: Iniciar recorrido */}
          <UnseenButton
            variant="primary"
            arrow="down"
            onClick={scrollToTour}
            dataCursor="hover"
          >
            Iniciar recorrido de seguridad
          </UnseenButton>

          {/* CTA Secundario: Directorio rápido */}
          <UnseenButton
            variant="dark"
            arrow="right"
            onClick={scrollToDirectory}
            dataCursor="hover"
          >
            Directorio rápido de normas
          </UnseenButton>

          {/* Enlace directo a Plano CAD */}
          <UnseenButton
            variant="ghost"
            arrow="up-right"
            href="/plano"
            dataCursor="hover"
          >
            Ver Plano Digital Twin
          </UnseenButton>
        </div>
      </div>

      {/* Franja Inferior: Telemetría de Protección y Scroll Indicator */}
      <div className="relative z-10 px-6 sm:px-12 py-5 bg-[#080E1E]/80 backdrop-blur-md border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-4">
        
        {/* Métricas clave num-tabular */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-mono">
          <div className="flex items-center space-x-2.5">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            <div>
              <span className="text-white font-bold num-tabular text-sm">240</span>
              <span className="text-slate-400 ml-1.5">Colaboradores</span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="w-2 h-2 rounded-full bg-[#06B6D4]" />
            <div>
              <span className="text-white font-bold num-tabular text-sm">100%</span>
              <span className="text-slate-400 ml-1.5">Cobertura EPP</span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <div>
              <span className="text-white font-bold num-tabular text-sm">18</span>
              <span className="text-slate-400 ml-1.5">Brigadistas en Turno</span>
            </div>
          </div>
        </div>

        {/* Indicador de scroll descendente */}
        <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-400">
          <span className="animate-pulse">Desplaza para explorar los capítulos</span>
          <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </section>
  );
}
