'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BellRing, 
  BookOpen, 
  FileText, 
  ExternalLink,
  ShieldCheck,
  HeartHandshake,
  Activity
} from 'lucide-react';

export type TabAdmin = 'DASHBOARD' | 'EMPLEADOS' | 'ALERTAS' | 'BIBLIOTECA' | 'REPORTES';

interface AdminSidebarProps {
  tabActiva: TabAdmin;
  onCambiarTab: (tab: TabAdmin) => void;
}

export default function AdminSidebar({ tabActiva, onCambiarTab }: AdminSidebarProps) {
  const navItems = [
    {
      id: 'DASHBOARD' as TabAdmin,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'EMPLEADOS' as TabAdmin,
      label: 'Empleados',
      icon: Users,
    },
    {
      id: 'ALERTAS' as TabAdmin,
      label: 'Configuración de Alertas',
      icon: BellRing,
    },
    {
      id: 'BIBLIOTECA' as TabAdmin,
      label: 'Biblioteca de Ejercicios',
      icon: BookOpen,
    },
    {
      id: 'REPORTES' as TabAdmin,
      label: 'Reportes e Historial',
      icon: FileText,
    },
  ];

  return (
    <aside className="w-64 bg-brand-navy text-white flex flex-col justify-between shrink-0 min-h-screen border-r border-slate-800 selection:bg-accent-turquoise selection:text-brand-navy">
      {/* Sección Superior: Logo y Navegación */}
      <div>
        {/* Logo PausaActiva */}
        <div className="p-6 flex items-center space-x-3 border-b border-slate-800/80">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-turquoise to-vital-emerald flex items-center justify-center text-brand-navy shadow-md shadow-accent-turquoise/20">
            {/* Ícono de silueta de persona en movimiento */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-brand-navy" stroke="none">
              <circle cx="14" cy="4" r="2.5" />
              <path d="M15 8.5 C13 8.5, 11 9.5, 10 11 L7 9 L5 11 L8.5 13 L6 19 L8.5 19 L10.5 14.5 L13 16 L13 21 L15.5 21 L15.5 14.5 L13.5 12.5 L14.5 10.5 C16 11.5, 18 11.5, 19.5 11 L19 8.5 C17.5 9, 16 9, 15 8.5 Z" />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="text-xl font-black font-outfit tracking-tight text-white flex items-center">
              Pausa<span className="text-accent-turquoise">Activa</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 block tracking-wider uppercase">
              Control de Bienestar
            </span>
          </div>
        </div>

        {/* Menú de Navegación Vertical */}
        <nav className="p-4 space-y-1.5" aria-label="Menú principal del administrador">
          {navItems.map((item) => {
            const Icon = item.icon;
            const esActivo = tabActiva === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onCambiarTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-left ${
                  esActivo
                    ? 'bg-gradient-to-r from-accent-turquoiseLight to-accent-turquoise text-brand-navy font-bold shadow-lg shadow-accent-turquoise/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${esActivo ? 'text-brand-navy' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sección Inferior: Enlaces cruzados y Telemetría del Sistema */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        <div className="px-3 py-2 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
          <div className="flex items-center justify-between text-accent-turquoise">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-vital-emerald animate-ping"></span>
              <span>TELEMETRÍA PC ACTIVA</span>
            </span>
            <span className="text-slate-300 font-bold">98.2%</span>
          </div>
          <p className="text-[10px] text-slate-500">
            Red de pausas activas sincronizada
          </p>
        </div>

        {/* Enlaces directos a los aplicativos hermanos */}
        <div className="space-y-1 pt-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block px-2">
            Otros Aplicativos de la Suite:
          </span>
          <a
            href="http://localhost:3020"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-turquoise" />
              <span>Portal Empresa (Público)</span>
            </span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
          <a
            href="http://localhost:3021"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <HeartHandshake className="w-3.5 h-3.5 text-vital-emerald" />
              <span>App Pausas Vitales</span>
            </span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>
    </aside>
  );
}
