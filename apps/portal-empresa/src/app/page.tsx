import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  HeartHandshake, 
  AlertTriangle, 
  ArrowRight, 
  MapPin, 
  Building2, 
  Sparkles, 
  Clock, 
  FileCheck2, 
  CheckCircle2, 
  ExternalLink,
  Layers
} from 'lucide-react';
import IsometricBlueprint from '@/components/IsometricBlueprint';
import PolicySection from '@/components/PolicySection';
import StructureSection from '@/components/StructureSection';
import { EMPRESA_EJEMPLO } from '@/lib/data-mock';

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100">
      {/* =========================================================================
          HERO CORPORATIVO — BLUEPRINT TÉCNICO (DIRECCIÓN 3)
          ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-16 border-b border-cyan-500/20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Texto y presentación */}
            <div className="max-w-2xl space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Proyecto 1 • Dirección 3: Blueprint Cartográfico Isométrico</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-mono leading-none">
                La seguridad de cada día, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                  trazada con precisión.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-xl">
                Bienvenidos al portal público oficial de Seguridad y Salud en el Trabajo de <strong className="text-white">{EMPRESA_EJEMPLO.razonSocial}</strong>.
                Aquí cualquier colaborador, visitante o ente de control puede consultar el plano de instalaciones con rutas de evacuación, zonas de descanso activo y el manifiesto legal.
              </p>

              {/* Botones de Exploración del Portal y Apps Conectadas */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#plano-isometrico"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-mono text-sm shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center space-x-2"
                >
                  <Layers className="w-4 h-4 text-slate-950" />
                  <span>Explorar Plano en Capas</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>

                <a
                  href="http://localhost:3011"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 font-mono text-sm hover:bg-emerald-950/60 transition-all flex items-center space-x-2"
                >
                  <HeartHandshake className="w-4 h-4 text-emerald-400" />
                  <span>Abrir App Pausas Activas</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 text-emerald-400/80" />
                </a>
              </div>

              {/* Datos de la empresa */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>NIT {EMPRESA_EJEMPLO.nit}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Sede Bogotá D.C.</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Clase de Riesgo ARL: III</span>
                </span>
              </div>
            </div>

            {/* Tarjetas KPI de Estado Rápido */}
            <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 gap-4 lg:min-w-[340px]">
              <div className="bg-slate-900/90 border border-emerald-500/30 p-5 rounded-2xl shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                  <span>TELEMETRÍA EN VIVO</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                  342 <span className="text-xs text-emerald-400 font-normal">DÍAS</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 font-medium">
                  Sin accidentes de trabajo incapacitantes
                </p>
                <div className="mt-3 text-[11px] text-emerald-400/90 font-mono flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Meta Anual Cero Accidentes Graves
                </div>
              </div>

              <div className="bg-slate-900/90 border border-cyan-500/30 p-5 rounded-2xl shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                  <span>RES. 0312 DE 2019</span>
                  <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
                    Auditado
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                  89.2 <span className="text-xs text-cyan-400 font-normal">%</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 font-medium">
                  Cumplimiento Estándares Mínimos
                </p>
                <div className="mt-3 text-[11px] text-cyan-300 font-mono flex items-center">
                  <FileCheck2 className="w-3.5 h-3.5 mr-1" />
                  Rango: ACEPTABLE (&gt; 85%)
                </div>
              </div>

              <div className="bg-slate-900/90 border border-amber-500/30 p-5 rounded-2xl shadow-xl backdrop-blur-sm sm:col-span-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1.5">
                  <span className="flex items-center text-amber-400">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    PAUSAS ACTIVAS EN PLANTA
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Ley 1355/2009</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-2xl font-bold text-white font-mono">92 %</span>
                    <p className="text-xs text-slate-300">Cobertura en puestos de pantalla y empaque</p>
                  </div>
                  <a
                    href="http://localhost:3011"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-amber-400 hover:text-amber-300 font-mono font-semibold underline underline-offset-4 flex items-center space-x-1"
                  >
                    <span>Ir a la App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOMENTO MEMORABLE: PLANO ISOMÉTRICO INTERACTIVO
          ========================================================================= */}
      <section id="plano-isometrico" className="py-14 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IsometricBlueprint />
        </div>
      </section>

      {/* =========================================================================
          POLÍTICA DE SST Y 6 REGLAS DE ORO
          ========================================================================= */}
      <section id="politica-sst">
        <PolicySection />
      </section>

      {/* =========================================================================
          COMITÉS (COPASST, BRIGADA, CONVIVENCIA) Y EMERGENCIAS
          ========================================================================= */}
      <section id="comites">
        <StructureSection />
      </section>
    </div>
  );
}
