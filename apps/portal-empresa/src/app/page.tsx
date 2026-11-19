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
    <div className="flex-1 flex flex-col bg-[#F8FAFC] text-[#0E1B2F]">
      {/* =========================================================================
          HERO CORPORATIVO — ALINEADO 100% A LA PALETA OFICIAL
          Fondo: Azul Grisáceo Claro (#F8FAFC)
          Tarjetas: Blanco Puro (#FFFFFF)
          Textos de Alta Jerarquía: Azul Marino Oscuro (#0E1B2F)
          Acción Principal: Azul Corporativo (#1A56DB)
          Acción Secundaria: Agua Marina Oscuro (#0B7A87)
          Bordes y Textos Secundarios: Gris Azulado (#64748B)
          ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-[#F8FAFC] border-b border-[#64748B]/20">
        {/* Acentos de luz sutiles para profundidad sin oscurecer la interfaz */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Texto y presentación institucional */}
            <div className="max-w-2xl space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1A56DB] text-xs font-mono font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#1A56DB]" />
                <span>Portal Corporativo • Dirección 3: Blueprint Cartográfico Isométrico</span>
              </div>

              {/* Título de Alta Jerarquía en Azul Marino Oscuro (#0E1B2F) */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0E1B2F] tracking-tight font-outfit leading-tight">
                La seguridad de cada día, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A56DB] via-[#0B7A87] to-[#10B981]">
                  trazada con precisión.
                </span>
              </h1>

              {/* Texto Secundario en Gris Azulado (#64748B) */}
              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed font-sans max-w-xl font-medium">
                Bienvenidos al portal público oficial de Seguridad y Salud en el Trabajo de <strong className="text-[#0E1B2F] font-semibold">{EMPRESA_EJEMPLO.razonSocial}</strong>.
                Aquí cualquier colaborador, visitante o ente de control puede consultar el plano de instalaciones con rutas de evacuación, zonas de descanso activo y el manifiesto legal.
              </p>

              {/* Botones de Acción con los Colores Oficiales */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                {/* Botón Principal: Azul Corporativo (#1A56DB) */}
                <a
                  href="#plano-isometrico"
                  className="px-6 py-3.5 rounded-xl bg-[#1A56DB] hover:bg-blue-700 text-white font-bold font-mono text-xs sm:text-sm shadow-lg shadow-[#1A56DB]/25 transition-all flex items-center space-x-2 active:scale-95"
                >
                  <Layers className="w-4 h-4 text-white" />
                  <span>Explorar Plano en Capas</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>

                {/* Botón Secundario: Agua Marina Oscuro (#0B7A87) */}
                <a
                  href="http://localhost:3021"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-[#0B7A87] hover:bg-[#09626c] text-white font-mono text-xs sm:text-sm font-bold shadow-md shadow-[#0B7A87]/20 transition-all flex items-center space-x-2 active:scale-95"
                >
                  <HeartHandshake className="w-4 h-4 text-[#2DD4BF]" />
                  <span>App Pausas Vitales</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 text-white/80" />
                </a>

                {/* Enlace Terciario: Blanco (#FFFFFF) con Borde Gris Azulado (#64748B) */}
                <a
                  href="http://localhost:3022"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-[#64748B]/30 text-[#0E1B2F] font-mono text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 shadow-xs"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#1A56DB]" />
                  <span>Control de Bienestar</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 text-[#64748B]" />
                </a>
              </div>

              {/* Datos de la empresa con Bordes y Textos en Gris Azulado (#64748B) */}
              <div className="pt-4 border-t border-[#64748B]/20 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-[#64748B]">
                <span className="flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-[#1A56DB]" />
                  <span>NIT {EMPRESA_EJEMPLO.nit}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-[#10B981]" />
                  <span>Sede Bogotá D.C.</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0B7A87]" />
                  <span>Clase de Riesgo ARL: III</span>
                </span>
              </div>
            </div>

            {/* Tarjetas KPI de Estado Rápido — CONTENEDORES EN BLANCO (#FFFFFF) CON BORDES EN GRIS AZULADO (#64748B) */}
            <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 gap-4 lg:min-w-[340px]">
              
              {/* Tarjeta 1: Días sin accidentes */}
              <div className="bg-white border border-[#64748B]/20 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between text-xs text-[#64748B] font-mono mb-2">
                  <span className="font-semibold">TELEMETRÍA EN VIVO</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping"></span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0E1B2F] font-outfit">
                  342 <span className="text-xs text-[#10B981] font-bold font-mono">DÍAS</span>
                </div>
                <p className="text-xs text-[#64748B] mt-1 font-medium font-sans">
                  Sin accidentes de trabajo incapacitantes
                </p>
                <div className="mt-3 text-[11px] text-[#047857] font-mono font-semibold flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#10B981]" />
                  Meta Anual Cero Accidentes Graves
                </div>
              </div>

              {/* Tarjeta 2: Cumplimiento Res. 0312 */}
              <div className="bg-white border border-[#64748B]/20 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between text-xs text-[#64748B] font-mono mb-2">
                  <span className="font-semibold">RES. 0312 DE 2019</span>
                  <span className="text-[10px] bg-teal-50 text-[#0B7A87] px-2 py-0.5 rounded font-mono font-bold border border-teal-200">
                    Auditado
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0E1B2F] font-outfit">
                  89.2 <span className="text-xs text-[#14B8A6] font-bold font-mono">%</span>
                </div>
                <p className="text-xs text-[#64748B] mt-1 font-medium font-sans">
                  Cumplimiento Estándares Mínimos
                </p>
                <div className="mt-3 text-[11px] text-[#0B7A87] font-mono font-semibold flex items-center">
                  <FileCheck2 className="w-3.5 h-3.5 mr-1 text-[#14B8A6]" />
                  Rango: ACEPTABLE (&gt; 85%)
                </div>
              </div>

              {/* Tarjeta 3: Pausas Activas en Planta */}
              <div className="bg-white border border-[#64748B]/20 p-5 rounded-2xl shadow-sm sm:col-span-2 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between text-xs text-[#64748B] font-mono mb-1.5">
                  <span className="flex items-center text-[#1A56DB] font-semibold">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-[#1A56DB]" />
                    PAUSAS ACTIVAS EN PLANTA
                  </span>
                  <span className="text-[10px] text-[#64748B] font-mono">Ley 1355/2009</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-2xl font-bold text-[#0E1B2F] font-outfit">92 %</span>
                    <p className="text-xs text-[#64748B] font-sans">Cobertura en puestos de pantalla y empaque</p>
                  </div>
                  <a
                    href="http://localhost:3021"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#0B7A87] hover:text-[#1A56DB] font-mono font-bold underline underline-offset-4 flex items-center space-x-1"
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
      <section id="plano-isometrico" className="py-14 bg-[#F8FAFC] relative">
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
