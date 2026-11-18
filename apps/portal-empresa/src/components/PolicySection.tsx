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
    <section className="py-12 border-t border-slate-800 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de Sección */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono mb-3">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Marco Legal Decreto 1072 de 2015 • Artículo 2.2.4.6.5</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-mono">
            Política de Seguridad y Salud en el Trabajo
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Declaración formal de compromiso de la Alta Dirección, firmada y divulgada a todo el personal.
          </p>
        </div>

        {/* Tarjeta de Política Firmada con Sello Digital */}
        <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-12">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                DOCUMENTO OFICIAL DEL SG-SST // POL-SST-001
              </span>
              <h3 className="text-xl font-bold text-slate-100 font-mono mt-1">
                {EMPRESA_EJEMPLO.razonSocial}
              </h3>
              <p className="text-xs text-slate-400">
                NIT {EMPRESA_EJEMPLO.nit} • Vigencia: {EMPRESA_EJEMPLO.politicaSST.vigenciaAnual}
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
              <Award className="w-8 h-8 text-amber-400" />
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">ESTADO LEGAL</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">FIRMADA Y VIGENTE</span>
              </div>
            </div>
          </div>

          <div className="py-6 text-sm text-slate-300 leading-relaxed space-y-4">
            <p className="italic bg-slate-900/50 p-4 rounded-xl border-l-4 border-cyan-500 font-sans">
              "{EMPRESA_EJEMPLO.politicaSST.textoCompromiso}"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="flex items-center space-x-2 text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Alcance: 100% Trabajadores y Contratistas</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Recursos asignados en presupuesto anual</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Revisión anual por Alta Dirección</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 gap-4">
            <div className="font-mono">
              <span>Fecha de expedición y firma: </span>
              <strong className="text-white">{EMPRESA_EJEMPLO.politicaSST.fechaFirma}</strong>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded border border-slate-800 font-mono">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-200">{EMPRESA_EJEMPLO.politicaSST.firmaGerente}</span>
            </div>
          </div>
        </div>

        {/* Las 6 Reglas de Oro de Seguridad */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-white font-mono">
              Las 6 Reglas de Oro de Seguridad y Salud
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Pilares inquebrantables de comportamiento seguro en todas nuestras plantas y centros de trabajo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reglasOro.map((r) => (
              <div
                key={r.num}
                className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-0.5 duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-cyan-400 font-mono opacity-80">
                    {r.num}
                  </span>
                  <Shield className="w-4 h-4 text-slate-500" />
                </div>
                <h4 className="text-base font-bold text-slate-100 mb-1.5 font-mono">
                  {r.titulo}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
