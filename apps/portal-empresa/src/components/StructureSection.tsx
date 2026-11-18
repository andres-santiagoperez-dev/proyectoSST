import React from 'react';
import { Users, Flame, HeartHandshake, PhoneCall, Check, ExternalLink } from 'lucide-react';
import { EMPRESA_EJEMPLO } from '@/lib/data-mock';

export default function StructureSection() {
  const comites = [
    {
      nombre: 'COPASST (Comité Paritario de SST)',
      baseLegal: 'Resolución 2013 de 1986 & Dec. 1072/2015',
      descripcion: 'Organismo de promoción y vigilancia de las normas de SST con representación igualitaria de la empresa y los trabajadores.',
      integrantes: '4 Principales y 4 Suplentes (Vigencia 2025 - 2027)',
      reunion: 'Mensual ordinaria (último jueves de cada mes)',
      icono: Users,
      colorIcono: 'text-cyan-400',
    },
    {
      nombre: 'Brigada Integral de Emergencias',
      baseLegal: 'Resolución 2400 de 1979 & Dec. 1072/2015',
      descripcion: 'Grupo voluntario entrenado en primeros auxilios, control inicial de conatos de incendio y evacuación de instalaciones.',
      integrantes: '24 Brigadistas activos en los 3 turnos operativos',
      reunion: 'Simulacros trimestrales y reentrenamiento semestral',
      icono: Flame,
      colorIcono: 'text-amber-400',
    },
    {
      nombre: 'Comité de Convivencia Laboral',
      baseLegal: 'Resolución 652 y 1356 de 2012',
      descripcion: 'Medida preventiva de acoso laboral que protege la salud mental y genera canales de diálogo confidencial.',
      integrantes: '2 Representantes del empleador y 2 de los trabajadores',
      reunion: 'Trimestral ordinaria y extraordinarias ante requerimientos',
      icono: HeartHandshake,
      colorIcono: 'text-emerald-400',
    },
  ];

  return (
    <section className="py-12 border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono mb-3">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Participación de los Trabajadores en el SG-SST</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-mono">
            Estructura Organizativa de Seguridad y Comités
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Equipos conformados y vigentes para velar por las condiciones de trabajo y la respuesta ante emergencias.
          </p>
        </div>

        {/* Tarjetas de Comités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {comites.map((c, i) => {
            const Icon = c.icono;
            return (
              <div
                key={i}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${c.colorIcono}`} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                      {c.baseLegal}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono mb-2">
                    {c.nombre}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {c.descripcion}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300 font-mono">
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{c.integrantes}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{c.reunion}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Directorio de Emergencia y Contacto de Ayuda Inmediata */}
        <div className="bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-900/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-600/40 flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                CANAL DE ATENCIÓN DE EMERGENCIAS // LÍNEA DIRECTA 24/7
              </span>
              <h3 className="text-xl font-bold text-white font-mono mt-0.5">
                ¿Ocurrió un accidente o identificas un peligro inminente?
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Comunícate inmediatamente con el Coordinador SST o activa la alarma general de planta. También puedes radicar el reporte ágil en menos de 60 segundos.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-400 block">LÍNEA INTERNA</span>
              <span className="text-base font-bold text-red-400">Ext. 911 / 104</span>
            </div>
            <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-400 block">ARL BOLÍVAR</span>
              <span className="text-base font-bold text-white">#322 / 018000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
