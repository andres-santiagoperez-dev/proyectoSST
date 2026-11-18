'use client';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  HeartHandshake, 
  ExternalLink, 
  User, 
  Radio, 
  HardHat 
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Rol } from '@/types';

export default function AdminNavbar() {
  const { usuarioActual, rolActivo, cambiarRol } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-amber-500/40 shadow-lg">
      {/* Cinta de demarcación industrial superior */}
      <div className="h-1.5 w-full patron-demarcacion"></div>

      {/* Barra de telemetría operativa */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between text-xs border-b border-slate-800 font-mono">
        <div className="flex items-center space-x-3 text-amber-400 font-bold">
          <Radio className="w-4 h-4 animate-pulse text-amber-500" />
          <span>CONSOLA ANDON // SISTEMA DE GESTIÓN SG-SST</span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300 font-normal">
            Sede Principal Bogotá • Industrias Andinas del Café
          </span>
        </div>

        {/* Selector de rol para auditoría */}
        <div className="flex items-center space-x-2 mt-1 sm:mt-0">
          <span className="text-slate-400 text-[11px]">Usuario Activo:</span>
          <div className="flex items-center space-x-1.5 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
            <User className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={rolActivo}
              onChange={(e) => cambiarRol(e.target.value as Rol)}
              className="bg-transparent text-amber-300 font-bold text-xs focus:outline-none cursor-pointer font-mono"
            >
              <option value="LIDER_SST" className="bg-slate-900 text-white">Líder SST (Ing. Carlos Montoya)</option>
              <option value="GERENCIA" className="bg-slate-900 text-white">Gerencia (Dra. M.F. Restrepo)</option>
              <option value="COPASST" className="bg-slate-900 text-white">COPASST (Javier Gómez)</option>
              <option value="COLABORADOR" className="bg-slate-900 text-white">Colaborador (Laura Torres)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Consola */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 font-mono">
                <span className="font-extrabold text-lg text-white">Safe<span className="text-amber-400">Pulse</span></span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-bold">
                  ADMIN ANDON
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                Consola de Control, Estándares 0312 y Salud Ocupacional
              </p>
            </div>
          </Link>

          {/* Enlaces directos a los 2 aplicativos hermanos */}
          <div className="flex items-center space-x-3">
            <a
              href="http://localhost:3010"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 border border-slate-700 hover:bg-slate-700 transition-all text-xs font-mono"
              title="Abrir Proyecto 1: Portal Empresa (Público)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Portal Empresa</span>
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </a>

            <a
              href="http://localhost:3015"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-700 hover:bg-emerald-900 transition-all text-xs font-mono"
              title="Abrir Proyecto 2: Pausas Vitales"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Pausas Vitales</span>
              <ExternalLink className="w-3 h-3 text-emerald-400" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
