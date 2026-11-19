'use client';

import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, User, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Rol } from '@/types';

interface AdminHeaderProps {
  titulo: string;
}

export default function AdminHeader({ titulo }: AdminHeaderProps) {
  const { rolActivo, cambiarRol } = useAuth();
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Título de la Sección (como en la referencia: "Control de Bienestar") */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-outfit text-brand-navy tracking-tight">
          {titulo}
        </h1>
      </div>

      {/* Perfil de Usuario y Opciones */}
      <div className="relative">
        <button
          onClick={() => setMostrarMenuUsuario(!mostrarMenuUsuario)}
          className="flex items-center space-x-3 p-1.5 rounded-2xl hover:bg-slate-100 transition-colors group"
          aria-expanded={mostrarMenuUsuario}
          aria-haspopup="true"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
            alt="Foto Administrador"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-accent-turquoise/40 shadow-xs"
          />
          <div className="text-left hidden sm:block">
            <span className="text-sm font-bold font-outfit text-brand-navy block leading-tight">
              Administrador
            </span>
            <span className="text-xs text-slate-500 font-mono block">
              Administrador
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-brand-navy transition-transform duration-200" />
        </button>

        {/* Dropdown de opciones de sesión / simulación */}
        {mostrarMenuUsuario && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
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
                className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between ${
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
                className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between ${
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
                className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between ${
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
