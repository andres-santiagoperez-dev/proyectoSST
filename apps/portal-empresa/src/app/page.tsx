import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  HeartHandshake, 
  ArrowRight, 
  MapPin, 
  Building2, 
  Sparkles, 
  Clock, 
  FileCheck2, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  LayoutDashboard
} from 'lucide-react';
import IsometricBlueprint from '@/components/IsometricBlueprint';
import PolicySection from '@/components/PolicySection';
import StructureSection from '@/components/StructureSection';
import { EMPRESA_EJEMPLO } from '@/lib/data-mock';

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col bg-surface-bg text-slate-800">
      {/* =========================================================================
          HERO CORPORATIVO — IDENTIDAD UNIFICADA: AZUL MARINO, AZUL CORPORATIVO, TURQUESA Y ESMERALDA
          ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-brand-navy border-b border-slate-800 text-white">
        {/* Halos de luz de fondo con los tonos de acento turquesa y esmeralda */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-turquoise/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Texto y presentación institucional */}
            <div className="max-w-2xl space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#13233D] border border-accent-turquoise/30 text-accent-turquoise text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-accent-turquoise" />
                <span>Portal Corporativo • Dirección 3: Blueprint Cartográfico Isométrico</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-outfit leading-tight">
                La seguridad de cada día, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-turquoise via-accent-turquoiseLight to-vital-mint">
                  trazada con precisión.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-xl">
                Bienvenidos al portal público oficial de Seguridad y Salud en el Trabajo de <strong className="text-white font-semibold">{EMPRESA_EJEMPLO.razonSocial}</strong>.
                Aquí cualquier colaborador, visitante o ente de control puede consultar el plano de instalaciones con rutas de evacuación, zonas de descanso activo y el manifiesto legal.
              </p>

              {/* Botones de Exploración del Portal y Apps Conectadas */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a
                  href="#plano-isometrico"
                  className="px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-blue-700 text-white font-bold font-mono text-xs sm:text-sm shadow-lg shadow-brand-blue/30 transition-all flex items-center space-x-2 active:scale-95"
                >
                  <Layers className="w-4 h-4 text-white" />
                  <span>Explorar Plano en Capas</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>

                <a
                  href="http://localhost:3021"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-brand-tealDark hover:bg-[#09626c] text-white font-mono text-xs sm:text-sm font-bold shadow-md shadow-brand-tealDark/25 transition-all flex items-center space-x-2 active:scale-95"
                >
                  <HeartHandshake className="w-4 h-4 text-accent-turquoiseLight" />
                  <span>App Pausas Vitales</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 text-white/80" />
                </a>

                <a
                  href="http://localhost:3022"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-accent-turquoise" />
                  <span>Control de Bienestar</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 text-white/80" />
                </a>
              </div>

              {/* Datos de la empresa con los tonos normativos */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-accent-turquoise" />
                  <span>NIT {EMPRESA_EJEMPLO.nit}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-vital-emerald" />
                  <span>Sede Bogotá D.C.</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent-turquoiseLight" />
                  <span>Clase de Riesgo ARL: III</span>
                </span>
              </div>
            </div>

            {/* Tarjetas KPI de Estado Rápido (Armonía en Azul Marino, Esmeralda y Turquesa) */}
            <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 gap-4 lg:min-w-[340px]">
              
              {/* Card 1: Días sin accidentes */}
              <div className="bg-[#13233D] border border-vital-emerald/40 p-5 rounded-2xl shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono mb-2">
                  <span>TELEMETRÍA EN VIVO</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-vital-emerald animate-ping"></span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
                  342 <span className="text-xs text-vital-emerald font-normal font-mono">DÍAS</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 font-medium font-sans">
                  Sin accidentes de trabajo incapacitantes
                </p>
                <div className="mt-3 text-[11px] text-vital-mint font-mono flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-vital-emerald" />
                  Meta Anual Cero Accidentes Graves
                </div>
              </div>

              {/* Card 2: Cumplimiento Res. 0312 */}
              <div className="bg-[#13233D] border border-accent-turquoise/40 p-5 rounded-2xl shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono mb-2">
                  <span>RES. 0312 DE 2019</span>
                  <span className="text-[10px] bg-brand-navy text-accent-turquoiseLight px-2 py-0.5 rounded font-mono font-bold border border-accent-turquoise/30">
                    Auditado
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
                  89.2 <span className="text-xs text-accent-turquoise font-normal font-mono">%</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 font-medium font-sans">
                  Cumplimiento Estándares Mínimos
                </p>
                <div className="mt-3 text-[11px] text-accent-turquoise font-mono flex items-center">
                  <FileCheck2 className="w-3.5 h-3.5 mr-1" />
                  Rango: ACEPTABLE (&gt; 85%)
                </div>
              </div>

              {/* Card 3: Pausas Activas en Planta */}
              <div className="bg-[#13233D] border border-brand-tealDark/50 p-5 rounded-2xl shadow-xl backdrop-blur-sm sm:col-span-2">
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono mb-1.5">
                  <span className="flex items-center text-accent-turquoise">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    PAUSAS ACTIVAS EN PLANTA
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Ley 1355/2009</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-2xl font-bold text-white font-outfit">92 %</span>
                    <p className="text-xs text-slate-300 font-sans">Cobertura en puestos de pantalla y empaque</p>
                  </div>
                  <a
                    href="http://localhost:3021"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-vital-mint hover:text-white font-mono font-semibold underline underline-offset-4 flex items-center space-x-1"
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
          MOMENTO MEMORABLE: PLANO ISOMÉTRICO INTERACTIVO (DIRECCIÓN 3)
          ========================================================================= */}
      <section id="plano-isometrico" className="py-14 bg-surface-bg relative">
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
          COMITÉS (COPASST, BRIGADA, CONVIVENCIA) Y DIRECTORIO DE EMERGENCIAS
          ========================================================================= */}
      <section id="comites">
        <StructureSection />
      </section>
    </div>
  );
}
