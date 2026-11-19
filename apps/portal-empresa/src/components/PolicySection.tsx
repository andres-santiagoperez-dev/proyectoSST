import React from 'react';
import { FileText, CheckCircle, Award, Shield, AlertOctagon, UserCheck } from 'lucide-react';
import { EMPRESA_EJEMPLO } from '@/lib/data-mock';

export default function PolicySection() {
  const reglasOro = [
    {
      num: '01',
      titulo: 'Parada Segura de Emergencia',
      desc: 'Ninguna meta de producción justifica operar una máquina sin guardas de protección o con sensores puenteados.',
    },
    {
      num: '02',
      titulo: 'Pausas Activas Obligatorias',
      desc: 'Cada 60 minutos en pantalla o puesto operativo, es mandatorio pausar 3 minutos para el cuidado osteomuscular y visual.',
    },
    {
      num: '03',
      titulo: 'Reporte Inmediato de Novedades',
      desc: 'Todo incidente o condición insegura debe reportarse en menos de 24 horas para evitar accidentes incapacitantes.',
    },
    {
      num: '04',
      titulo: 'Uso de EPP Certificado',
      desc: 'Uso innegociable de calzado dieléctrico, protección auditiva en tostaduría y mascarilla para material particulado.',
    },
    {
      num: '05',
      titulo: 'Respeto al Peatón y Montacargas',
      desc: 'Transitar exclusivamente por las líneas de demarcación peatonal. Mantener 3 metros de distancia de equipos móviles.',
    },
    {
      num: '06',
      titulo: 'Cero Consumo y Aptitud Ocupacional',
      desc: 'Prohibición absoluta de laborar bajo efectos de alcohol o sustancias psicoactivas. Cuidado mutuo entre compañeros.',
    },
  ];

  return (
    <section className="py-14 border-t border-slate-200 bg-surface-bg text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-mono font-bold mb-3">
            <FileText className="w-3.5 h-3.5 text-brand-blue" />
            <span>Marco Legal Decreto 1072 de 2015 • Artículo 2.2.4.6.5</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight font-outfit">
            Política de Seguridad y Salud en el Trabajo
          </h2>
          <p className="text-sm text-slate-600 mt-2 font-sans">
            Declaración formal de compromiso de la Alta Dirección, firmada y divulgada a todo el personal.
          </p>
        </div>

        {/* Tarjeta de Política Firmada con Sello Digital */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-brand-tealDark font-bold">
                DOCUMENTO OFICIAL DEL SG-SST // POL-SST-001
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-brand-navy font-outfit mt-1">
                {EMPRESA_EJEMPLO.razonSocial}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                NIT {EMPRESA_EJEMPLO.nit} • Vigencia: {EMPRESA_EJEMPLO.politicaSST.vigenciaAnual}
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-200">
              <Award className="w-8 h-8 text-vital-emerald" />
              <div>
                <span className="text-[10px] text-emerald-800 font-mono block font-semibold">ESTADO LEGAL</span>
                <span className="text-xs font-bold text-vital-emerald font-mono">FIRMADA Y VIGENTE</span>
              </div>
            </div>
          </div>

          <div className="py-6 text-sm text-slate-700 leading-relaxed space-y-4">
            <p className="italic bg-surface-bg p-5 rounded-2xl border-l-4 border-accent-turquoise font-sans text-slate-700">
              "{EMPRESA_EJEMPLO.politicaSST.textoCompromiso}"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-medium">
              <div className="flex items-center space-x-2 text-slate-700">
                <CheckCircle className="w-4 h-4 text-vital-emerald shrink-0" />
                <span>Alcance: 100% Trabajadores y Contratistas</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <CheckCircle className="w-4 h-4 text-vital-emerald shrink-0" />
                <span>Recursos asignados en presupuesto anual</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700">
                <CheckCircle className="w-4 h-4 text-vital-emerald shrink-0" />
                <span>Revisión anual por Alta Dirección</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono gap-2">
            <span>Firma Digital Certificada: Gerencia General &amp; Responsable SG-SST</span>
            <span className="text-brand-blue font-semibold">Resolución 0312/2019 Estándar 1.1.1</span>
          </div>
        </div>

        {/* Las 6 Reglas de Oro para la Prevención */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-brand-tealDark uppercase tracking-wider">
              <Shield className="w-4 h-4 text-brand-tealDark" />
              <span>Cultura del Autocuidado</span>
            </div>
            <h3 className="text-2xl font-black text-brand-navy font-outfit mt-1">
              Las 6 Reglas de Oro de Nuestra Planta
            </h3>
            <p className="text-xs text-slate-500 font-sans mt-1">
              Normas no negociables que salvan vidas y previenen lesiones osteomusculares y accidentes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reglasOro.map((r) => (
              <div
                key={r.num}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:border-accent-turquoise hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-black text-brand-blue bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-xl">
                      REGLA #{r.num}
                    </span>
                    <Shield className="w-4 h-4 text-accent-turquoise" />
                  </div>
                  <h4 className="text-base font-bold text-brand-navy font-outfit mb-2">
                    {r.titulo}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {r.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
