import React from 'react';
import { ShieldCheck, FileText, Lock, Building2 } from 'lucide-react';

export default function PortalFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 text-xs py-10 mt-auto font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-sm mb-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>Industrias Andinas del Café S.A.S.</span>
            </div>
            <p className="text-slate-400 text-xs font-sans leading-relaxed">
              Portal Público Institucional de Seguridad y Salud en el Trabajo. Visualización de planos de evacuación, puntos de encuentro y divulgación de compromisos normativos.
            </p>
            <div className="mt-2 text-[11px] text-cyan-400">
              NIT 900.543.210-8 • Sede Bogotá D.C. • Clase Riesgo III
            </div>
          </div>

          <div>
            <h4 className="text-slate-200 font-bold mb-2 flex items-center">
              <FileText className="w-4 h-4 text-cyan-400 mr-1.5" />
              MARCO LEGAL VIGENTE
            </h4>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>• Decreto 1072 de 2015 — SG-SST</li>
              <li>• Resolución 0312 de 2019 — Estándares Mínimos</li>
              <li>• Resolución 1843 de 2025 — Evaluaciones Ocupacionales</li>
              <li>• Resolución 1401 de 2007 — Investigación Incidentes</li>
              <li>• Ley 1355 de 2009 — Pausas Activas Laborales</li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-bold mb-2 flex items-center">
              <Lock className="w-4 h-4 text-emerald-400 mr-1.5" />
              SUITE DE 3 APLICATIVOS INDEPENDIENTES
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <span className="text-cyan-400">[App 1]</span> Portal Empresa (Puerto 3010) — Blueprint Público
              </li>
              <li>
                <span className="text-emerald-400">[App 2]</span> Pausas Vitales (Puerto 3011) — Ergonomía y Alarmas
              </li>
              <li>
                <span className="text-amber-400">[App 3]</span> Consola Admin (Puerto 3012) — Demarcación y Telemetría
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 text-center text-slate-400 text-[11px]">
          © 2026 SafePulse SST — Proyecto 1: Portal Empresa. Diseñado bajo la Dirección 3 (Blueprint Cartográfico Isométrico).
        </div>
      </div>
    </footer>
  );
}
