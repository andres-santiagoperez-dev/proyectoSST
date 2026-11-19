'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, HeartHandshake, LayoutDashboard, ExternalLink, Building2 } from 'lucide-react';

export default function PortalNavbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-brand-navy/95 border-b border-accent-turquoise/20 text-white">
      {/* Barra superior de telemetría */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-xs border-b border-slate-800 font-mono">
        <div className="flex items-center space-x-2 text-accent-turquoise">
          <span className="w-2 h-2 rounded-full bg-accent-turquoise animate-ping"></span>
          <span>PORTAL PÚBLICO CORPORATIVO // SG-SST COLOMBIA</span>
        </div>
        <div className="hidden sm:flex items-center space-x-3 text-slate-400">
          <span>Decreto 1072/2015</span>
          <span>•</span>
          <span>Res. 0312/2019</span>
          <span>•</span>
          <span>Res. 1843/2025</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo PausaActiva / SafePulse */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-turquoise to-vital-emerald flex items-center justify-center shadow-lg shadow-accent-turquoise/20 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-brand-navy" stroke="none">
                <circle cx="14" cy="4" r="2.5" />
                <path d="M15 8.5 C13 8.5, 11 9.5, 10 11 L7 9 L5 11 L8.5 13 L6 19 L8.5 19 L10.5 14.5 L13 16 L13 21 L15.5 21 L15.5 14.5 L13.5 12.5 L14.5 10.5 C16 11.5, 18 11.5, 19.5 11 L19 8.5 C17.5 9, 16 9, 15 8.5 Z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-1.5 font-outfit">
                <span className="font-extrabold text-lg tracking-tight text-white">
                  Pausa<span className="text-accent-turquoise">Activa</span>
                </span>
                <span className="text-[10px] bg-slate-800 text-accent-turquoiseLight border border-accent-turquoise/30 px-1.5 py-0.5 rounded font-mono font-bold">
                  PORTAL CORPORATIVO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">Industrias Andinas del Café S.A.S.</p>
            </div>
          </Link>

          {/* Menú de Secciones y Enlaces a los 2 Aplicativos Hermanos */}
          <div className="flex items-center space-x-3">
            <a
              href="#plano-isometrico"
              className="text-xs font-mono text-slate-300 hover:text-accent-turquoise px-3 py-1.5 rounded transition-colors hidden md:inline"
            >
              Plano de Instalaciones
            </a>
            <a
              href="#politica-sst"
              className="text-xs font-mono text-slate-300 hover:text-accent-turquoise px-3 py-1.5 rounded transition-colors hidden md:inline"
            >
              Política y Reglas
            </a>
            <a
              href="#comites"
              className="text-xs font-mono text-slate-300 hover:text-accent-turquoise px-3 py-1.5 rounded transition-colors hidden md:inline"
            >
              Comités y Emergencias
            </a>

            {/* Acceso directo a Aplicativo 2: Pausas Vitales (Puerto 3021) */}
            <a
              href="http://localhost:3021"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-vital-emerald/15 text-vital-emerald border border-vital-emerald/40 hover:bg-vital-emerald/25 transition-all text-xs font-mono font-bold"
              title="Abrir aplicativo de Pausas Activas y Ergonomía"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-vital-emerald" />
              <span>Pausas Vitales</span>
              <ExternalLink className="w-3 h-3 text-vital-emerald/80" />
            </a>

            {/* Acceso directo a Aplicativo 3: Consola Admin (Puerto 3022) */}
            <a
              href="http://localhost:3022"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-brand-blue hover:bg-blue-700 text-white shadow-sm text-xs font-mono font-bold transition-all"
              title="Abrir portal administrativo Control de Bienestar"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-white" />
              <span>Control de Bienestar</span>
              <ExternalLink className="w-3 h-3 text-white/80" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
