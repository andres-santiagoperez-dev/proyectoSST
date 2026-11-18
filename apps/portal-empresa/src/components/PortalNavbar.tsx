import React from 'react';
import Link from 'next/link';
import { ShieldCheck, HeartHandshake, LayoutDashboard, ExternalLink, Building2 } from 'lucide-react';

export default function PortalNavbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 border-b border-cyan-500/20 text-white">
      {/* Barra superior de telemetría */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-xs border-b border-slate-900 font-mono">
        <div className="flex items-center space-x-2 text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
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
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 font-mono">
                <span className="font-black text-lg tracking-tight text-white">Safe<span className="text-cyan-400">Pulse</span></span>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.2 rounded">PORTAL EMPRESA</span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">Industrias Andinas del Café S.A.S.</p>
            </div>
          </Link>

          {/* Menú de Secciones y Enlaces a los 2 Aplicativos Hermanos */}
          <div className="flex items-center space-x-3">
            <a
              href="#plano-isometrico"
              className="text-xs font-mono text-slate-300 hover:text-cyan-400 px-3 py-1.5 rounded transition-colors hidden md:inline"
            >
              Plano de Instalaciones
            </a>
            <a
              href="#politica-sst"
              className="text-xs font-mono text-slate-300 hover:text-cyan-400 px-3 py-1.5 rounded transition-colors hidden md:inline"
            >
              Política y Reglas
            </a>
            <a
              href="#comites"
              className="text-xs font-mono text-slate-300 hover:text-cyan-400 px-3 py-1.5 rounded transition-colors hidden md:inline"
            >
              Comités y Emergencias
            </a>

            {/* Acceso directo a Aplicativo 2: Pausas Vitales */}
            <a
              href="http://localhost:3011"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/80 transition-all text-xs font-mono"
              title="Abrir aplicativo independiente de Pausas Activas"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              <span>App Pausas Vitales</span>
              <ExternalLink className="w-3 h-3 text-emerald-400/80" />
            </a>

            {/* Acceso directo a Aplicativo 3: Consola Admin */}
            <a
              href="http://localhost:3012"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-500/40 hover:bg-amber-900/80 transition-all text-xs font-mono"
              title="Abrir consola administrativa SG-SST"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
              <span>Consola Admin</span>
              <ExternalLink className="w-3 h-3 text-amber-400/80" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
