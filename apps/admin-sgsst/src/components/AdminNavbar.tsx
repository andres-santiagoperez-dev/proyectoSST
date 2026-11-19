'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ExternalLink, 
  Sparkles, 
  Activity, 
  HeartHandshake, 
  Building2, 
  AlertTriangle 
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Rol } from '@/types';

export default function AdminNavbar() {
  const { usuarioActual, rolActivo, cambiarRol } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-amber-500/40 shadow-lg">
      {/* Cinta superior de contexto normativo colombiano */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-mono text-[11px] px-4 py-1 flex items-center justify-between font-bold">
        <span className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-slate-950 animate-pulse"></span>
          <span>TABLERO DE CONTROL SST // RES. 0312 DE 2019 // RES. 1843 DE 2025</span>
        </span>
        <span className="hidden md:inline text-[10px] tracking-wider uppercase">
          DIRECCIÓN VISUAL: DEMARCACIÓN INDUSTRIAL / TABLERO ANDON
        </span>
      </div>

      {/* Barra principal de navegación */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título del aplicativo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black font-mono shadow-md group-hover:bg-amber-400 transition-colors">
              ▲
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-sm text-white tracking-wider">
                  SAFEPULSE
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-bold">
                  ADMIN ANDON
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                Consola de Control, Estándares 0312 y Salud Ocupacional
              </p>
            </div>
          </Link>

          {/* Estado del Sistema */}
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Sistema en línea</span>
          </div>
        </div>
      </div>
    </header>
  );
}
