import React from 'react';
import { ShieldCheck, FileText, Lock, Building2, HeartHandshake, LayoutDashboard } from 'lucide-react';

export default function PortalFooter() {
  return (
    <footer className="bg-[#0E1B2F] text-slate-400 border-t border-[#64748B]/30 text-xs py-12 mt-auto font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Columna 1: Información Corporativa */}
          <div>
            <div className="flex items-center space-x-2 text-white font-bold text-sm mb-2">
              <ShieldCheck className="w-5 h-5 text-[#14B8A6]" />
              <span className="font-outfit">Industrias Andinas del Café S.A.S.</span>
            </div>
            <p className="text-slate-400 text-xs font-sans leading-relaxed">
              Portal Público Institucional de Seguridad y Salud en el Trabajo. Visualización de planos de evacuación, puntos de encuentro y divulgación de compromisos normativos.
            </p>
            <div className="mt-3 text-[11px] text-[#2DD4BF]">
              NIT 900.543.210-8 • Sede Bogotá D.C. • Clase Riesgo III
            </div>
          </div>

          {/* Columna 2: Marco Legal Vigente */}
          <div>
            <h4 className="text-white font-bold mb-3 flex items-center font-outfit text-sm">
              <FileText className="w-4 h-4 text-[#1A56DB] mr-1.5" />
              MARCO LEGAL COLOMBIANO VIGENTE
            </h4>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li>• Decreto 1072 de 2015 — SG-SST</li>
              <li>• Resolución 0312 de 2019 — Estándares Mínimos</li>
              <li>• Resolución 1843 de 2025 — Evaluaciones Ocupacionales</li>
              <li>• Resolución 1401 de 2007 — Investigación Incidentes</li>
              <li>• Ley 1355 de 2009 — Pausas Activas Laborales</li>
            </ul>
          </div>

          {/* Columna 3: Suite de 3 Aplicativos con Puertos Oficiales */}
          <div>
            <h4 className="text-white font-bold mb-3 flex items-center font-outfit text-sm">
              <Lock className="w-4 h-4 text-[#10B981] mr-1.5" />
              SUITE DE 3 APLICATIVOS INDEPENDIENTES
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-2">
                <span className="text-[#14B8A6] font-bold">[App 1]</span>
                <span className="text-slate-200">Portal Empresa (Puerto 3020) — Blueprint Público</span>
              </li>
              <li>
                <a
                  href="http://localhost:3021"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 text-slate-300 hover:text-[#10B981] transition-colors"
                >
                  <span className="text-[#10B981] font-bold">[App 2]</span>
                  <span>Pausas Vitales (Puerto 3021) — Ergonomía y Alarmas ↗</span>
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:3022"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 text-slate-300 hover:text-[#2DD4BF] transition-colors"
                >
                  <span className="text-[#2DD4BF] font-bold">[App 3]</span>
                  <span>Control de Bienestar (Puerto 3022) — Consola Admin ↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-slate-500 text-[11px]">
          © 2026 SafePulse SST / PausaActiva — Suite Multi-portal de Seguridad y Salud en el Trabajo.
        </div>
      </div>
    </footer>
  );
}
