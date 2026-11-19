'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ShieldCheck, User, LogOut, CheckCircle2, Menu } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Rol } from '@/types';

interface AdminHeaderProps {
  titulo: string;
  onAbrirSidebarMovil?: () => void;
}

export default function AdminHeader({ titulo, onAbrirSidebarMovil }: AdminHeaderProps) {
  const { rolActivo, cambiarRol } = useAuth();
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera del dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMostrarMenuUsuario(false);
      }
    }
    if (mostrarMenuUsuario) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mostrarMenuUsuario]);

  return (
    <header className="min-h-[4.5rem] py-3 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 gap-3">
      {/* Título de la Sección con Botón Hamburguesa en Móvil */}
      <div className="flex items-center space-x-3 min-w-0">
        {onAbrirSidebarMovil && (
          <button
            onClick={onAbrirSidebarMovil}
            aria-label="Abrir menú de navegación"
            className="p-2 -ml-1 rounded-xl text-brand-navy hover:bg-slate-100 lg:hidden transition-colors shrink-0"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold font-outfit text-brand-navy tracking-tight truncate leading-tight">
          {titulo}
        </h1>
      </div>

      {/* Perfil de Usuario y Modal de Simulación de Roles */}
      <div className="relative shrink-0" ref={menuRef}>
        <button
          onClick={() => setMostrarMenuUsuario(!mostrarMenuUsuario)}
          className="flex items-center space-x-2 sm:space-x-3 p-1.5 rounded-2xl hover:bg-slate-100 transition-colors group cursor-pointer"
          aria-expanded={mostrarMenuUsuario}
          aria-haspopup="true"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
            alt="Foto Administrador"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-accent-turquoise/40 shadow-xs shrink-0"
          />
          <div className="text-left hidden sm:block">
            <span className="text-sm font-bold font-outfit text-brand-navy block leading-tight">
              Administrador
            </span>
            <span className="text-xs text-[#64748B] font-mono block">
              {rolActivo === 'LIDER_SST' ? 'Líder SST' : rolActivo === 'GERENCIA' ? 'Gerencia' : 'COPASST'}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-navy transition-transform duration-200 shrink-0" />
        </button>

        {/* Dropdown Modal de opciones de sesión / simulación */}
        {mostrarMenuUsuario && (
          <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-slate-100 mb-2">
              <span className="text-xs font-bold text-brand-navy block font-outfit">
                Rol de Simulación Activo
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Selecciona la vista de auditoría:
              </span>
            </div>

            <div className="space-y-1 text-xs font-mono">
              <button
                onClick={() => {
                  cambiarRol('LIDER_SST');
                  setMostrarMenuUsuario(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                  rolActivo === 'LIDER_SST' ? 'bg-teal-50 text-accent-turquoise font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>Líder SST / Admin</span>
                {rolActivo === 'LIDER_SST' && <CheckCircle2 className="w-3.5 h-3.5 text-accent-turquoise" />}
              </button>

              <button
                onClick={() => {
                  cambiarRol('GERENCIA');
                  setMostrarMenuUsuario(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                  rolActivo === 'GERENCIA' ? 'bg-teal-50 text-accent-turquoise font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>Gerencia General</span>
                {rolActivo === 'GERENCIA' && <CheckCircle2 className="w-3.5 h-3.5 text-accent-turquoise" />}
              </button>

              <button
                onClick={() => {
                  cambiarRol('COPASST');
                  setMostrarMenuUsuario(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                  rolActivo === 'COPASST' ? 'bg-teal-50 text-accent-turquoise font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>Comité COPASST</span>
                {rolActivo === 'COPASST' && <CheckCircle2 className="w-3.5 h-3.5 text-accent-turquoise" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
