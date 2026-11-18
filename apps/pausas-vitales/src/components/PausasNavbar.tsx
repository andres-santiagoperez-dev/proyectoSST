'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeartHandshake, ShieldCheck, LayoutDashboard, ExternalLink, Flame } from 'lucide-react';

export default function PausasNavbar() {
  const [pausasHoy, setPausasHoy] = useState<number>(1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hoy = new Date().toISOString().split('T')[0];
      const guardadas = parseInt(localStorage.getItem(`pausas_hoy_${hoy}`) || '1', 10);
      setPausasHoy(guardadas);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-vital-border text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Pausas Vitales */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-vital-forest flex items-center justify-center shadow-lg shadow-emerald-800/20 group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 font-outfit">
                <span className="font-extrabold text-xl tracking-tight text-vital-forest">
                  Pausa<span className="text-vital-terracotta">Vital</span>
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-mono font-bold">
                  ERGONOMÍA ACTIVA
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-sans">
                Industrias Andinas del Café • Cuidado Diario
              </p>
            </div>
          </Link>

          {/* Contador diario y Enlaces a los 2 Aplicativos Hermanos */}
          <div className="flex items-center space-x-3">
            {/* Racha / Pausas hoy */}
            <div className="hidden sm:flex items-center space-x-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 text-amber-800 text-xs font-mono font-bold">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{pausasHoy} de 2 Pausas Hoy</span>
            </div>

            {/* Enlace a Proyecto 1: Portal Empresa */}
            <a
              href="http://localhost:3010"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-cyan-300 border border-slate-800 hover:bg-slate-800 transition-all text-xs font-mono"
              title="Abrir portal público de la empresa"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Portal Empresa</span>
              <ExternalLink className="w-3 h-3 text-cyan-400/80" />
            </a>

            {/* Enlace a Proyecto 3: Consola Admin */}
            <a
              href="http://localhost:3012"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all text-xs font-mono"
              title="Abrir consola administrativa SG-SST"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Consola Admin</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
