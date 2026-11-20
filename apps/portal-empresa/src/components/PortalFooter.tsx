import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, Layers, Users, BarChart3 } from 'lucide-react';

export default function PortalFooter() {
  return (
    <footer data-theme="dark" className="bg-[#0E1B2F] text-slate-400 border-t border-[#64748B]/30 text-xs py-12 mt-auto font-mono">
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

          {/* Columna 3: Navegación de Vistas del Portal */}
          <div>
            <h4 className="text-white font-bold mb-3 flex items-center font-outfit text-sm">
              <Layers className="w-4 h-4 text-[#10B981] mr-1.5" />
              VISTAS DEL PORTAL INSTITUCIONAL
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/resumen"
                  className="flex items-center space-x-2 text-slate-300 hover:text-[#2DD4BF] transition-colors"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
                  <span>Resumen e Indicadores de Sede</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/plano"
                  className="flex items-center space-x-2 text-slate-300 hover:text-[#2DD4BF] transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
                  <span>Plano Isométrico y Evacuación PE-01</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/politica"
                  className="flex items-center space-x-2 text-slate-300 hover:text-[#2DD4BF] transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
                  <span>Política SST y 6 Reglas de Oro</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/comites"
                  className="flex items-center space-x-2 text-slate-300 hover:text-[#2DD4BF] transition-colors"
                >
                  <Users className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
                  <span>Comités Legales y Central 24/7</span>
                </Link>
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
