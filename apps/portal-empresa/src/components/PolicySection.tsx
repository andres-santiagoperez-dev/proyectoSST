'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  Award, 
  Shield, 
  MessageSquarePlus, 
  Lock, 
  Clock, 
  ArrowRight, 
  FileCheck2
} from 'lucide-react';
import { EMPRESA_EJEMPLO } from '@/lib/data-mock';
import SuggestionModal from './SuggestionModal';

export default function PolicySection() {
  const [modalAbierto, setModalAbierto] = useState(false);

  const reglasOro = [
    {
      num: '01',
      titulo: 'Parada Segura de Emergencia',
      desc: 'Ninguna meta de producción justifica operar una máquina sin guardas de protección o con sensores puenteados. Ante cualquier vibración o ruido anormal, se presiona la seta de paro.',
      norma: 'Res. 2400/1979 Art. 85',
    },
    {
      num: '02',
      titulo: 'Pausas Activas Obligatorias',
      desc: 'Cada 60 minutos en pantalla o puesto operativo, es mandatorio pausar 3 a 5 minutos para el cuidado osteomuscular y descanso visual mediante la regla 20-20-20.',
      norma: 'Ley 1355/2009 & Res. 0312',
    },
    {
      num: '03',
      titulo: 'Reporte Inmediato de Novedades',
      desc: 'Todo incidente o condición insegura debe reportarse en menos de 24 horas a través de este portal para que el COPASST y la brigada intervengan antes de que ocurra un accidente.',
      norma: 'Res. 1401/2007 Art. 4',
    },
    {
      num: '04',
      titulo: 'Uso Innegociable de EPP Certificado',
      desc: 'Uso obligatorio y permanente de calzado dieléctrico, protección auditiva tipo copa en tostaduría y mascarilla de filtración N95 contra material particulado de café.',
      norma: 'Dec. 1072 Art. 2.2.4.6.24',
    },
    {
      num: '05',
      titulo: 'Demarcación y Respeto al Montacargas',
      desc: 'Transitar exclusivamente por las sendas peatonales demarcadas en verde y franjas antideslizantes. Mantener distancia mínima de 3 metros respecto a montacargas en maniobra.',
      norma: 'NTC 1461 & Res. 2400',
    },
    {
      num: '06',
      titulo: 'Cero Consumo y Cuidado Mutuo',
      desc: 'Prohibición absoluta de ingresar o laborar bajo efectos de alcohol o sustancias psicoactivas. Vigilar activamente la salud y seguridad de los compañeros de turno.',
      norma: 'Res. 1075/1992 & RIT',
    },
  ];

  return (
    <div className="py-6 sm:py-10 bg-[#F8FAFC] text-[#0E1B2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =====================================================================
            CABECERA DE LA POLÍTICA
            ===================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1A56DB] text-xs font-mono font-bold mb-3 shadow-xs">
            <FileText className="w-3.5 h-3.5 text-[#1A56DB] shrink-0" />
            <span>Marco Legal Decreto 1072 de 2015 • Artículo 2.2.4.6.5</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0E1B2F] tracking-tight font-outfit leading-tight">
            Política de Seguridad y Salud en el Trabajo
          </h2>
          <p className="text-sm text-[#64748B] mt-2 font-sans font-medium leading-relaxed">
            Declaración formal de compromiso de la Alta Dirección, firmada, fechada y divulgada al 100% de los trabajadores y partes interesadas.
          </p>
        </div>

        {/* =====================================================================
            TARJETA DE POLÍTICA FIRMADA DIGITALMENTE
            Fondo: Blanco (#FFFFFF) con Borde en #64748B/20
            ===================================================================== */}
        <div className="bg-white border border-[#64748B]/20 rounded-3xl p-5 sm:p-8 shadow-sm relative overflow-hidden mb-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-[#64748B]/20 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#0B7A87] font-bold">
                DOCUMENTO OFICIAL DEL SG-SST // POL-SST-001
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0E1B2F] font-outfit mt-1 leading-snug">
                {EMPRESA_EJEMPLO.razonSocial}
              </h3>
              <p className="text-xs text-[#64748B] font-mono mt-0.5 font-medium">
                NIT {EMPRESA_EJEMPLO.nit} • Vigencia: {EMPRESA_EJEMPLO.politicaSST.vigenciaAnual}
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-200 shadow-xs shrink-0">
              <Award className="w-8 h-8 text-[#10B981] shrink-0" />
              <div>
                <span className="text-[10px] text-[#047857] font-mono block font-bold">ESTADO LEGAL</span>
                <span className="text-xs font-bold text-[#10B981] font-mono">FIRMADA Y VIGENTE</span>
              </div>
            </div>
          </div>

          {/* Manifiesto y Compromiso */}
          <div className="py-6 text-sm text-[#0E1B2F] leading-relaxed space-y-4">
            <p className="italic bg-[#F8FAFC] p-5 sm:p-6 rounded-2xl border-l-4 border-[#14B8A6] font-sans text-[#0E1B2F] font-medium leading-relaxed break-words">
              "{EMPRESA_EJEMPLO.politicaSST.textoCompromiso}"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2 text-xs font-semibold text-[#0E1B2F]">
              <div className="flex items-start space-x-2.5 bg-[#F8FAFC] p-3.5 rounded-xl border border-[#64748B]/15">
                <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span className="break-words leading-snug">Cobertura: 100% Trabajadores, Contratistas y Visitas</span>
              </div>
              <div className="flex items-start space-x-2.5 bg-[#F8FAFC] p-3.5 rounded-xl border border-[#64748B]/15">
                <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span className="break-words leading-snug">Presupuesto y Recursos Financieros Asignados</span>
              </div>
              <div className="flex items-start space-x-2.5 bg-[#F8FAFC] p-3.5 rounded-xl border border-[#64748B]/15">
                <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span className="break-words leading-snug">Revisión y Rendición de Cuentas Anual</span>
              </div>
            </div>
          </div>

          {/* Pie de Firma y Trazabilidad */}
          <div className="pt-4 border-t border-[#64748B]/20 flex flex-wrap items-center justify-between text-xs text-[#64748B] font-mono gap-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0"></span>
              <span className="break-words">Firma Digital: Gerencia General &amp; Especialista SST (Licencia 14892)</span>
            </div>
            <span className="text-[#1A56DB] font-bold">
              Resolución 0312 de 2019 Estándar 1.1.1
            </span>
          </div>
        </div>

        {/* =====================================================================
            LAS 6 REGLAS DE ORO OPERATIVAS
            ===================================================================== */}
        <div className="mb-14">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#0B7A87] uppercase tracking-wider">
              <Shield className="w-4 h-4 text-[#0B7A87]" />
              <span>Cultura del Autocuidado en Planta</span>
            </div>
            <h3 className="text-2xl font-black text-[#0E1B2F] font-outfit mt-1 leading-tight">
              Las 6 Reglas de Oro de Nuestra Planta
            </h3>
            <p className="text-xs text-[#64748B] font-sans mt-1 font-medium leading-relaxed">
              Directrices de obligado cumplimiento que previenen eventos severos y protegen la salud de nuestro equipo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reglasOro.map((r) => (
              <div
                key={r.num}
                className="bg-white border border-[#64748B]/20 rounded-2xl p-5 sm:p-6 shadow-sm hover:border-[#1A56DB] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-black text-[#1A56DB] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-xl">
                      REGLA #{r.num}
                    </span>
                    <span className="text-[10px] font-mono text-[#0B7A87] bg-teal-50 px-2 py-0.5 rounded font-bold border border-teal-200">
                      {r.norma}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#0E1B2F] font-outfit mb-2 leading-snug break-words">
                    {r.titulo}
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed font-sans font-medium break-words">
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================================
            MÓDULO DE RADICACIÓN DE SUGERENCIAS Y CONDICIONES INSEGURAS
            (Requisito: "enlace a radicación de sugerencias")
            ===================================================================== */}
        <div className="bg-white border border-[#64748B]/20 rounded-3xl p-5 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="space-y-2 text-center lg:text-left max-w-2xl min-w-0">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0B7A87] text-xs font-mono font-bold">
                <MessageSquarePlus className="w-3.5 h-3.5 text-[#0B7A87] shrink-0" />
                <span>Canal Oficial de Participación y Trazabilidad</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-[#0E1B2F] font-outfit leading-tight break-words">
                ¿Tienes una sugerencia de mejora o detectaste una condición insegura?
              </h3>
              
              <p className="text-xs sm:text-sm text-[#64748B] font-sans font-medium leading-relaxed break-words">
                Conforme al <strong className="text-[#0E1B2F]">Decreto 1072 de 2015 (Artículo 2.2.4.6.14)</strong>, cualquier trabajador o colaborador tiene derecho a radicar observaciones, aportes ergonómicos y alertas preventivas. Tu comunicación puede ser anónima o identificada y se tramita con el COPASST.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-mono text-[#0B7A87]">
                <span className="flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
                  <span>Opción Anónima Garantizada</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#1A56DB] shrink-0" />
                  <span>Respuesta COPASST &le; 10 días</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                  <span>Radicado Oficial Inmediato</span>
                </span>
              </div>
            </div>

            {/* Botón de Acción Principal para Radicar */}
            <div className="shrink-0 w-full sm:w-auto flex justify-center">
              <button
                onClick={() => setModalAbierto(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#1A56DB] hover:bg-blue-700 text-white font-mono text-xs sm:text-sm font-bold shadow-lg shadow-[#1A56DB]/25 transition-all flex items-center justify-center space-x-2 active:scale-95"
              >
                <MessageSquarePlus className="w-4 h-4 text-white shrink-0" />
                <span>Radicar Sugerencia o Reporte</span>
                <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Interactivo de Radicación */}
      <SuggestionModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        initialZoneId="GENERAL"
        initialZoneName="Instalaciones Generales"
      />
    </div>
  );
}
