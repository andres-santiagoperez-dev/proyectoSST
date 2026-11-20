'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Layers, 
  FileText, 
  Users, 
  BarChart3,
  ShieldAlert
} from 'lucide-react';
import EmergencyQuickModal from '@/components/EmergencyQuickModal';

export default function PortalNavbar() {
  const pathname = usePathname();
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  const esResumen = pathname === '/' || pathname === '/resumen';
  const esPlano = pathname === '/plano' || pathname === '/plano-isometrico';
  const esPolitica = pathname === '/politica';
  const esComites = pathname === '/comites' || pathname === '/central';

  const navItems = [
    { 
      href: '/resumen', 
      label: 'Resumen Sede', 
      shortLabel: 'Resumen', 
      icon: BarChart3, 
      activo: esResumen 
    },
    { 
      href: '/plano', 
      label: 'Plano Isométrico', 
      shortLabel: 'Plano', 
      icon: Layers, 
      activo: esPlano 
    },
    { 
      href: '/politica', 
      label: 'Política y Reglas', 
      shortLabel: 'Política', 
      icon: FileText, 
      activo: esPolitica 
    },
    { 
      href: '/comites', 
      label: 'Comités y Brigada', 
      shortLabel: 'Comités', 
      icon: Users, 
      activo: esComites 
    },
  ];

  return (
    <header data-theme="dark" className="sticky top-0 z-50 backdrop-blur-md bg-[#0E1B2F]/95 border-b border-[#64748B]/30 text-white shadow-sm">
      {/* Barra superior de telemetría y marco legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-end text-xs border-b border-slate-800/80 font-mono">
        <div className="hidden md:flex items-center space-x-3 text-slate-400 text-[11px] shrink-0">
          <span>Decreto 1072/2015</span>
          <span>•</span>
          <span>Res. 0312/2019</span>
          <span>•</span>
          <span>Res. 1843/2025</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo PausaActiva / SafePulse -> Vista Resumen */}
          <Link 
            href="/resumen" 
            className="flex items-center space-x-2.5 sm:space-x-3 group min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#10B981] flex items-center justify-center shadow-lg shadow-[#14B8A6]/20 group-hover:scale-105 transition-transform shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#0E1B2F]" stroke="none">
                <circle cx="14" cy="4" r="2.5" />
                <path d="M15 8.5 C13 8.5, 11 9.5, 10 11 L7 9 L5 11 L8.5 13 L6 19 L8.5 19 L10.5 14.5 L13 16 L13 21 L15.5 21 L15.5 14.5 L13.5 12.5 L14.5 10.5 C16 11.5, 18 11.5, 19.5 11 L19 8.5 C17.5 9, 16 9, 15 8.5 Z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 font-outfit">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white whitespace-nowrap">
                  Pausa<span className="text-[#14B8A6]">Activa</span>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans font-medium truncate max-w-[150px] sm:max-w-none">
                Industrias Andinas del Café S.A.S.
              </p>
            </div>
          </Link>

          {/* Menú de Vistas Individuales en Desktop */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5 shrink-0" aria-label="Navegación de vistas individuales">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs font-mono px-3 py-1.5 rounded-xl transition-all hidden md:flex items-center space-x-1.5 font-medium ${
                    item.activo 
                      ? 'text-[#2DD4BF] bg-slate-800/90 font-bold border border-[#14B8A6]/40 shadow-xs scale-100' 
                      : 'text-slate-300 hover:text-[#2DD4BF] hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Botón de Emergencia 1 Clic (#EF4444 Rojo Señal) */}
            <button
              onClick={() => setIsEmergencyOpen(true)}
              className="ml-1 sm:ml-2 px-3 py-1.5 rounded-xl bg-[#EF4444] hover:bg-red-600 text-white font-mono text-xs font-bold flex items-center space-x-1.5 shadow-sm shadow-red-500/20 active:scale-95 transition-all group"
              title="Abrir protocolo de emergencia en 1 clic"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <ShieldAlert className="w-3.5 h-3.5 text-white group-hover:rotate-12 transition-transform" />
              <span className="uppercase tracking-wider">SOS Emergencia</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Sub-barra de navegación móvil para vistas individuales */}
      <nav 
        className="flex md:hidden items-center justify-between py-2 border-t border-slate-800/90 bg-[#0E1B2F] px-2 text-xs font-mono"
        aria-label="Navegación móvil de vistas individuales"
      >
        <div className="flex items-center space-x-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-1 rounded-lg transition-colors flex items-center space-x-1 shrink-0 ${
                  item.activo 
                    ? 'text-[#2DD4BF] bg-slate-800 font-bold border border-[#14B8A6]/40' 
                    : 'text-slate-300'
                }`}
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span>{item.shortLabel}</span>
              </Link>
            );
          })}
        </div>

        {/* SOS Móvil */}
        <button
          onClick={() => setIsEmergencyOpen(true)}
          className="ml-1 px-2.5 py-1 rounded-lg bg-[#EF4444] text-white font-mono text-[11px] font-bold flex items-center space-x-1 shrink-0"
        >
          <ShieldAlert className="w-3 h-3 text-white" />
          <span>SOS</span>
        </button>
      </nav>

      {/* Modal de Emergencia Rápido */}
      <EmergencyQuickModal 
        isOpen={isEmergencyOpen} 
        onClose={() => setIsEmergencyOpen(false)} 
      />
    </header>
  );
}
