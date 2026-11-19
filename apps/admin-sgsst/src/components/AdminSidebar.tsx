'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BellRing, 
  BookOpen, 
  FileText, 
  ShieldCheck,
  X
} from 'lucide-react';

export type TabAdmin = 'DASHBOARD' | 'EMPLEADOS' | 'ALERTAS' | 'BIBLIOTECA' | 'REPORTES';

interface AdminSidebarProps {
  tabActiva: TabAdmin;
  onCambiarTab: (tab: TabAdmin) => void;
  sidebarMovilAbierto?: boolean;
  onCerrarSidebarMovil?: () => void;
}

export default function AdminSidebar({ 
  tabActiva, 
  onCambiarTab,
  sidebarMovilAbierto = false,
  onCerrarSidebarMovil
}: AdminSidebarProps) {
  const navItems = [
    {
      id: 'DASHBOARD' as TabAdmin,
      label: 'Control de Bienestar',
      icon: LayoutDashboard,
    },
    {
      id: 'EMPLEADOS' as TabAdmin,
      label: 'Directorio de Empleados',
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
      label: 'Reportes y Auditoría',
      icon: FileText,
    },
  ];

  const handleSeleccionarTab = (tab: TabAdmin) => {
    onCambiarTab(tab);
    if (onCerrarSidebarMovil) {
      onCerrarSidebarMovil();
    }
  };

  const contenidoSidebar = (
    <div className="flex flex-col justify-between h-full">
      {/* Sección Superior: Logo y Navegación */}
      <div>
        {/* Logo PausaActiva */}
        <div className="p-6 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-turquoise to-vital-emerald flex items-center justify-center text-brand-navy shadow-md shadow-accent-turquoise/20 shrink-0">
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

          {/* Botón de cerrar solo en móvil */}
          {onCerrarSidebarMovil && (
            <button
              onClick={onCerrarSidebarMovil}
              aria-label="Cerrar menú lateral"
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Menú de Navegación Vertical */}
        <nav className="p-4 space-y-1.5" aria-label="Menú principal del administrador">
          {navItems.map((item) => {
            const Icon = item.icon;
            const esActivo = tabActiva === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSeleccionarTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-left cursor-pointer ${
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

      {/* Sección Inferior: Telemetría y Estado de Conexión del Sistema */}
      <div className="p-4 border-t border-slate-800/80 space-y-2">
        <div className="px-3.5 py-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1.5">
          <div className="flex items-center justify-between text-accent-turquoise">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-vital-emerald animate-ping"></span>
              <span className="font-bold">TELEMETRÍA PC ACTIVA</span>
            </span>
            <span className="text-white font-bold">98.2%</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Red de pausas activas sincronizada en puesto local
          </p>
          <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
            <span>Sede Principal</span>
            <span className="text-vital-emerald font-bold">● En línea</span>
          </div>
        </div>

        <div className="px-2 py-1 text-center">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
            Consola SG-SST • v2.4
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. SIDEBAR DE ESCRITORIO (PERSISTENTE EN PANTALLAS GRANDES) */}
      <aside className="hidden lg:flex w-64 bg-brand-navy text-white flex-col justify-between shrink-0 min-h-screen border-r border-slate-800 selection:bg-accent-turquoise selection:text-brand-navy">
        {contenidoSidebar}
      </aside>

      {/* 2. DRAWER / MODAL OFF-CANVAS EN PANTALLAS MÓVILES Y TABLETS */}
      {sidebarMovilAbierto && (
        <div className="fixed inset-0 z-50 lg:hidden flex animate-in fade-in duration-200">
          {/* Backdrop con desenfoque */}
          <div 
            onClick={onCerrarSidebarMovil}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Panel deslizante lateral */}
          <div className="relative w-72 max-w-[85vw] bg-brand-navy text-white h-full z-10 shadow-2xl flex flex-col border-r border-slate-800 animate-in slide-in-from-left duration-250">
            {contenidoSidebar}
          </div>
        </div>
      )}
    </>
  );
}
