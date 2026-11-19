'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeartHandshake, Flame, Sparkles } from 'lucide-react';

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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FFFFFF]/90 border-b border-[#64748B]/20 text-[#0E1B2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Pausas Vitales */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10B981] to-[#047857] flex items-center justify-center shadow-lg shadow-[#047857]/20 group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 font-outfit">
                <span className="font-extrabold text-xl tracking-tight text-[#0E1B2F]">
                  Pausa<span className="text-[#0B7A87]">Vital</span>
                </span>
                <span className="text-[10px] bg-[#10B981]/15 text-[#047857] border border-[#10B981]/30 px-2 py-0.5 rounded-full font-mono font-bold">
                  ERGONOMÍA ACTIVA
                </span>
              </div>
              <p className="text-[10px] text-[#64748B] font-sans">
                Industrias Andinas del Café • Cuidado Diario
              </p>
            </div>
          </Link>

          {/* Telemetría de Racha y Estado de Bienestar del Colaborador */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-[#10B981]/10 px-3.5 py-1.5 rounded-xl border border-[#10B981]/30 text-[#047857] text-xs font-mono font-bold shadow-xs">
              <Flame className="w-4 h-4 text-[#10B981] fill-[#10B981]" />
              <span className="num-tabular">{pausasHoy} de 2 Pausas Hoy</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
