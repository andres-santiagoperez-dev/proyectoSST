import React from 'react';
import Link from 'next/link';
import { ShieldCheck, HeartHandshake, AlertTriangle, LayoutDashboard } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-950">
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Fase 5 • Incremento 1 Configurado Exitosamente</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
          Safe<span className="text-cyan-400">Pulse</span> SST
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Plataforma web de Seguridad y Salud en el Trabajo para Colombia. Scaffolding, tokens de diseño multitema, autenticación con roles RBAC y registro de auditoría inmutable completados.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left">
            <div className="w-8 h-8 rounded bg-cyan-950 flex items-center justify-center text-cyan-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-sm">Dirección 3 (Blueprint)</h3>
            <p className="text-xs text-slate-400 mt-1">Portal público cartográfico con plano isométrico de la empresa.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left">
            <div className="w-8 h-8 rounded bg-emerald-950 flex items-center justify-center text-emerald-400 mb-2">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-sm">Dirección 2 (Vital)</h3>
            <p className="text-xs text-slate-400 mt-1">Pausas activas con orbe de respiración y ergonomía activa.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left">
            <div className="w-8 h-8 rounded bg-amber-950 flex items-center justify-center text-amber-400 mb-2">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-white text-sm">Dirección 1 (Andon)</h3>
            <p className="text-xs text-slate-400 mt-1">Consola administrativa con telemetría de siniestralidad.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
