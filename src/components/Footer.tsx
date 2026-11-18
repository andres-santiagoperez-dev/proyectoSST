import React from 'react';
import Link from 'next/link';
import { Shield, FileText, Lock, Activity } from 'lucide-react';
import { EMPRESA_EJEMPLO } from '@/lib/data-mock';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Empresa y Sistema */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-slate-100 font-mono tracking-tight text-sm">
                SafePulse SST
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Plataforma integral del Sistema de Gestión de Seguridad y Salud en el Trabajo para {EMPRESA_EJEMPLO.razonSocial}.
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              NIT: {EMPRESA_EJEMPLO.nit} • Clase de Riesgo: {EMPRESA_EJEMPLO.claseRiesgo} • {EMPRESA_EJEMPLO.numTrabajadores} Colaboradores
            </div>
          </div>

          {/* Columna 2: Marco Normativo Colombia */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] font-mono flex items-center">
              <FileText className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
              Fundamentos Normativos
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Decreto 1072 de 2015 (Libro 2, Parte 2, Título 4)</li>
              <li>• Resolución 0312 de 2019 (Estándares Mínimos)</li>
              <li>• Resolución 1843 de 2025 (Evaluaciones Ocupacionales)</li>
              <li>• Resolución 1401 de 2007 (Investigación ATEL)</li>
              <li>• Ley 1355 de 2009 (Pausas Activas y Salud)</li>
            </ul>
          </div>

          {/* Columna 3: Privacidad y Habeas Data */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] font-mono flex items-center">
              <Lock className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              Privacidad y Salud
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Cumplimiento estricto de reserva médica conforme a la Res. 1843/2025. El aplicativo solo almacena conceptos de aptitud laboral y recomendaciones ergonómicas. Prohibido registrar historias clínicas o diagnósticos CIE-10.
            </p>
            <div className="text-[10px] text-emerald-400 font-mono">
              ✓ Log de Auditoría Inmutable Activo
            </div>
          </div>

          {/* Columna 4: Accesos Rápidos */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] font-mono flex items-center">
              <Activity className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              Ámbitos de Interfaz
            </h4>
            <div className="flex flex-col space-y-1.5 text-slate-300">
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                • Portal Público: Blueprint Isométrico
              </Link>
              <Link href="/pausas-activas" className="hover:text-emerald-400 transition-colors">
                • Pausa Vital: Orbe de Respiración
              </Link>
              <Link href="/reporte-campo" className="hover:text-amber-400 transition-colors">
                • Reporte Móvil Offline en Campo
              </Link>
              <Link href="/admin-dashboard" className="hover:text-cyan-400 transition-colors">
                • Consola Andon del Administrador
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
          <p>© 2026 SafePulse SST — Implementación para Colombia. Todos los datos mostrados son ficticios con fines de demostración.</p>
          <p className="mt-2 sm:mt-0 font-mono text-slate-400">
            Accesibilidad WCAG 2.2 AA • Modo Reduced Motion Soportado
          </p>
        </div>
      </div>
    </footer>
  );
}
