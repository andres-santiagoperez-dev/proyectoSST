import React from 'react';
import { Users, Flame, HeartHandshake, PhoneCall, Check, ExternalLink, ShieldAlert } from 'lucide-react';
import { EMPRESA_EJEMPLO } from '@/lib/data-mock';

export default function StructureSection() {
  const comites = [
    {
      nombre: 'COPASST (Comité Paritario de SST)',
      baseLegal: 'Resolución 2013 de 1986 & Dec. 1072/2015',
      descripcion: 'Organismo de promoción y vigilancia de las normas de SST con representación paritaria entre la empresa y los trabajadores.',
      integrantes: '4 Principales y 4 Suplentes (Vigencia 2025 - 2027)',
      reunion: 'Mensual ordinaria (último jueves de cada mes)',
      icono: Users,
      colorIcono: 'text-[#1A56DB]',
      bgIcono: 'bg-blue-50 border-blue-200',
    },
    {
      nombre: 'Brigada Integral de Emergencias',
      baseLegal: 'Resolución 2400 de 1979 & Dec. 1072/2015',
      descripcion: 'Grupo voluntario entrenado en primeros auxilios, control inicial de conatos de incendio y evacuación de instalaciones.',
      integrantes: '24 Brigadistas activos en los 3 turnos operativos',
      reunion: 'Simulacros trimestrales y reentrenamiento semestral',
      icono: Flame,
      colorIcono: 'text-[#0B7A87]',
      bgIcono: 'bg-teal-50 border-teal-200',
    },
    {
      nombre: 'Comité de Convivencia Laboral',
      baseLegal: 'Resolución 652 y 1356 de 2012',
      descripcion: 'Medida preventiva de acoso laboral que protege la salud mental y genera canales de diálogo confidencial y conciliatorio.',
      integrantes: '2 Representantes del empleador y 2 de los trabajadores',
      reunion: 'Trimestral ordinaria y extraordinarias ante requerimientos',
      icono: HeartHandshake,
      colorIcono: 'text-[#10B981]',
      bgIcono: 'bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <section className="py-14 border-t border-[#64748B]/20 bg-white text-[#0E1B2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0B7A87] text-xs font-mono font-bold mb-3 shadow-xs">
            <Users className="w-3.5 h-3.5 text-[#0B7A87]" />
            <span>Participación de los Trabajadores en el SG-SST</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0E1B2F] tracking-tight font-outfit">
            Estructura Organizativa de Seguridad y Comités
          </h2>
          <p className="text-sm text-[#64748B] mt-2 font-sans font-medium">
            Equipos conformados y vigentes para velar por las condiciones de trabajo y la respuesta oportuna ante emergencias.
          </p>
        </div>

        {/* Tarjetas de Comités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {comites.map((c, i) => {
            const Icon = c.icono;
            return (
              <div
                key={i}
                className="bg-[#F8FAFC] border border-[#64748B]/20 rounded-3xl p-6 flex flex-col justify-between hover:border-[#1A56DB] hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${c.bgIcono} border flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${c.colorIcono}`} />
                    </div>
                    <span className="text-[10px] font-mono text-[#64748B] bg-white px-2.5 py-1 rounded-xl border border-[#64748B]/20 font-bold">
                      {c.baseLegal}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0E1B2F] font-outfit mb-2">
                    {c.nombre}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mb-4 font-sans font-medium">
                    {c.descripcion}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#64748B]/20 space-y-2 text-xs text-[#0E1B2F] font-mono font-medium">
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span>{c.integrantes}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
                    <span>{c.reunion}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Directorio de Emergencia y Contacto de Ayuda Inmediata — AZUL MARINO OSCURO (#0E1B2F) */}
        <div className="bg-[#0E1B2F] border border-[#64748B]/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-white">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0B7A87]/40 border border-[#0B7A87] flex items-center justify-center shrink-0">
              <PhoneCall className="w-7 h-7 text-[#2DD4BF]" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#14B8A6] font-bold uppercase tracking-wider block">
                CENTRAL DE EMERGENCIAS Y COMUNICACIÓN INMEDIATA
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-outfit mt-0.5">
                ¿Presenciaste un conato, derrame o condición de peligro inminente?
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-sans max-w-xl font-medium">
                Activa de inmediato la alarma de evacuación o comunícate por radio al Canal 1 (Brigada SST) o a la línea fija de portería principal.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="bg-[#13233D] px-4 py-2.5 rounded-2xl border border-[#14B8A6]/40 text-center font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Línea de Emergencia</span>
              <span className="text-base font-bold text-[#2DD4BF]">Ext. 911 / 104</span>
            </div>
            
            <a
              href="tel:123"
              className="px-5 py-3.5 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-[#0E1B2F] font-mono text-xs font-bold transition-all flex items-center space-x-2 shadow-md shadow-[#10B981]/25"
            >
              <ShieldAlert className="w-4 h-4 text-[#0E1B2F]" />
              <span>Contactar Brigada</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
