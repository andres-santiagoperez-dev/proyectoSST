'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  FileCheck2, 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Users 
} from 'lucide-react';
import { EMPRESA_EJEMPLO } from '@/lib/data-mock';

export default function SummarySection() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Corporativo */}
      <div className="bg-white border border-[#64748B]/20 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Luces sutiles de fondo para profundidad */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-100/25 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="max-w-2xl space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1A56DB] text-xs font-mono font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#1A56DB] shrink-0" />
              <span>Portal Corporativo Oficial // SG-SST Colombia</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0E1B2F] tracking-tight font-outfit leading-tight">
              La seguridad de cada día, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A56DB] via-[#0B7A87] to-[#10B981]">
                trazada con precisión.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed font-sans font-medium">
              Bienvenidos al portal público oficial de Seguridad y Salud en el Trabajo de <strong className="text-[#0E1B2F] font-semibold">{EMPRESA_EJEMPLO.razonSocial}</strong>.
              Consulta el plano axonométrico de instalaciones con rutas de evacuación continuas hacia el Punto de Encuentro Exterior (PE-01), estaciones de pausas activas, manifiesto legal y comités institucionales.
            </p>

            {/* Accesos a las Vistas Individuales */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/plano"
                className="px-5 py-3 rounded-xl bg-[#1A56DB] hover:bg-blue-700 text-white font-mono text-xs sm:text-sm font-bold shadow-md shadow-[#1A56DB]/25 transition-all flex items-center space-x-2 active:scale-95"
              >
                <Layers className="w-4 h-4 text-white shrink-0" />
                <span>Abrir Plano Isométrico</span>
                <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
              </Link>

              <Link
                href="/politica"
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-[#64748B]/30 text-[#0E1B2F] font-mono text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 shadow-xs active:scale-95"
              >
                <FileText className="w-4 h-4 text-[#0B7A87] shrink-0" />
                <span>Política y 6 Reglas</span>
              </Link>

              <Link
                href="/comites"
                className="px-5 py-3 rounded-xl bg-[#0B7A87] hover:bg-[#09626c] text-white font-mono text-xs sm:text-sm font-bold shadow-md shadow-[#0B7A87]/20 transition-all flex items-center space-x-2 active:scale-95"
              >
                <Users className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                <span>Comités y Brigada</span>
              </Link>
            </div>

            {/* Datos Técnicos de la Empresa */}
            <div className="pt-4 border-t border-[#64748B]/20 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-[#64748B]">
              <span className="flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-[#1A56DB] shrink-0" />
                <span>NIT {EMPRESA_EJEMPLO.nit}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Sede Bogotá D.C.</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0B7A87] shrink-0" />
                <span>Clase de Riesgo ARL: III</span>
              </span>
            </div>
          </div>

          {/* Tarjetas KPI de Estado Rápido */}
          <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-2 gap-4 lg:min-w-[340px]">
            
            {/* Tarjeta 1: Días sin accidentes */}
            <div className="bg-[#F8FAFC] border border-[#64748B]/20 p-5 rounded-2xl shadow-xs hover:border-[#10B981] transition-all">
              <div className="flex items-center justify-between text-xs text-[#64748B] font-mono mb-2">
                <span className="font-semibold">TELEMETRÍA EN VIVO</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping shrink-0"></span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0E1B2F] font-outfit num-tabular">
                342 <span className="text-xs text-[#10B981] font-bold font-mono">DÍAS</span>
              </div>
              <p className="text-xs text-[#64748B] mt-1 font-medium font-sans">
                Sin accidentes de trabajo incapacitantes
              </p>
              <div className="mt-3 text-[11px] text-[#047857] font-mono font-semibold flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#10B981] shrink-0" />
                <span>Meta Anual Cero Accidentes</span>
              </div>
            </div>

            {/* Tarjeta 2: Cumplimiento Res. 0312 */}
            <div className="bg-[#F8FAFC] border border-[#64748B]/20 p-5 rounded-2xl shadow-xs hover:border-[#14B8A6] transition-all">
              <div className="flex items-center justify-between text-xs text-[#64748B] font-mono mb-2">
                <span className="font-semibold">RES. 0312 DE 2019</span>
                <span className="text-[10px] bg-teal-50 text-[#0B7A87] px-2 py-0.5 rounded font-mono font-bold border border-teal-200 shrink-0">
                  Auditado
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0E1B2F] font-outfit num-tabular">
                89.2 <span className="text-xs text-[#14B8A6] font-bold font-mono">%</span>
              </div>
              <p className="text-xs text-[#64748B] mt-1 font-medium font-sans">
                Cumplimiento Estándares Mínimos
              </p>
              <div className="mt-3 text-[11px] text-[#0B7A87] font-mono font-semibold flex items-center">
                <FileCheck2 className="w-3.5 h-3.5 mr-1 text-[#14B8A6] shrink-0" />
                <span>Rango: ACEPTABLE (&gt; 85%)</span>
              </div>
            </div>

            {/* Tarjeta 3: Pausas Activas en Planta */}
            <div className="bg-[#F8FAFC] border border-[#64748B]/20 p-5 rounded-2xl shadow-xs sm:col-span-2 hover:border-[#1A56DB] transition-all">
              <div className="flex items-center justify-between text-xs text-[#64748B] font-mono mb-1.5">
                <span className="flex items-center text-[#1A56DB] font-semibold">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-[#1A56DB] shrink-0" />
                  PAUSAS ACTIVAS EN PLANTA
                </span>
                <span className="text-[10px] text-[#64748B] font-mono">Ley 1355/2009</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <span className="text-2xl font-bold text-[#0E1B2F] font-outfit num-tabular">92 %</span>
                  <p className="text-xs text-[#64748B] font-sans">Cobertura en puestos de pantalla y empaque</p>
                </div>
                <span className="text-[11px] text-[#0B7A87] font-mono font-bold flex items-center space-x-1 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#14B8A6] shrink-0 mr-1" />
                  <span>Monitoreo Conforme</span>
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
