'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Flame, 
  HeartHandshake, 
  PhoneCall, 
  Check, 
  Calendar, 
  Mail, 
  Radio, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Phone
} from 'lucide-react';

export default function StructureSection() {
  const [comiteExpandido, setComiteExpandido] = useState<string | null>('COPASST');
  const [telefonoCopiado, setTelefonoCopiado] = useState<string | null>(null);

  const copiarNumero = (numero: string, etiqueta: string) => {
    navigator.clipboard.writeText(numero);
    setTelefonoCopiado(etiqueta);
    setTimeout(() => setTelefonoCopiado(null), 2500);
  };

  const comites = [
    {
      id: 'COPASST',
      nombre: 'COPASST (Comité Paritario de Seguridad y Salud en el Trabajo)',
      baseLegal: 'Resolución 2013 de 1986 & Decreto 1072 de 2015',
      descripcion: 'Organismo paritario de promoción, vigilancia y concertación de las políticas y normas de SST en toda la empresa.',
      periodo: 'Vigencia 2025 - 2027 (Periodo Institucional de 2 años)',
      reunion: 'Mensual ordinaria (último jueves de cada mes, 8:00 AM)',
      correo: 'copasst@andinas.ejemplo.co',
      icono: Users,
      colorIcono: 'text-[#1A56DB]',
      bgIcono: 'bg-blue-50 border-blue-200',
      integrantes: [
        { rol: 'Presidente (Designado Empresa)', nombre: 'Mario Alberto Silva', cargo: 'Supervisor de Planta' },
        { rol: 'Secretario (Electo Trabajadores)', nombre: 'Javier Enrique Gómez', cargo: 'Líder de Bodega y Logística' },
        { rol: 'Principal Empresa', nombre: 'Carlos Andrés Montoya', cargo: 'Coordinador SG-SST' },
        { rol: 'Principal Trabajadores', nombre: 'Gloria Inés Patiño', cargo: 'Operaria Línea Envasado' },
        { rol: 'Suplente Empresa', nombre: 'Esteban Darío Ruiz', cargo: 'Analista de Mantenimiento' },
        { rol: 'Suplente Trabajadores', nombre: 'Laura Camila Torres', cargo: 'Analista de Calidad' },
      ],
      funcionesClave: [
        'Inspecciones periódicas a puestos de trabajo, máquinas y extintores.',
        'Participar en la comisión investigadora de todo incidente o accidente de trabajo (Res. 1401/2007).',
        'Vigilar el cumplimiento y avance del Plan Anual de Trabajo en SST.',
        'Proponer medidas de control ergonómico y adopción de pausas activas.',
      ],
    },
    {
      id: 'CONVIVENCIA',
      nombre: 'Comité de Convivencia Laboral',
      baseLegal: 'Resolución 652 y 1356 de 2012 & Ley 1010 de 2006',
      descripcion: 'Medida preventiva de conductas de acoso laboral que protege la salud mental, el clima organizacional y la dignidad humana.',
      periodo: 'Vigencia 2025 - 2027 (Elección Paritaria)',
      reunion: 'Trimestral ordinaria y extraordinarias ante quejas radicadas',
      correo: 'convivencia@andinas.ejemplo.co',
      icono: HeartHandshake,
      colorIcono: 'text-[#0B7A87]',
      bgIcono: 'bg-teal-50 border-teal-200',
      integrantes: [
        { rol: 'Representante Empleador (Principal)', nombre: 'Dra. Sandra Milena Pardo', cargo: 'Directora de Talento Humano' },
        { rol: 'Representante Trabajadores (Principal)', nombre: 'Andrés Felipe Morales', cargo: 'Técnico de Mantenimiento' },
        { rol: 'Representante Empleador (Suplente)', nombre: 'Héctor Fabio Benítez', cargo: 'Jefe de Compras y Suministros' },
        { rol: 'Representante Trabajadores (Suplente)', nombre: 'Diana Marcela López', cargo: 'Auxiliar Administrativa' },
      ],
      funcionesClave: [
        'Recibir y dar trámite a quejas que puedan constituir conductas de acoso laboral bajo estricta confidencialidad.',
        'Escuchar a las partes involucradas de manera individual y neutral.',
        'Formular planes de mejora concertados para restablecer la armonía laboral.',
        'Remitir informes preventivos y de seguimiento a la Alta Dirección.',
      ],
    },
    {
      id: 'BRIGADA',
      nombre: 'Brigada Integral de Emergencias',
      baseLegal: 'Resolución 2400 de 1979, Dec. 1072/2015 & Ley 1523 de 2012',
      descripcion: 'Cuerpo operativo voluntario capacitado y dotado para responder con inmediatez ante conatos de incendio, eventos médicos y evacuación.',
      periodo: '24 Brigadistas activos divididos en los 3 turnos de planta',
      reunion: 'Prácticas mensuales y simulacro general semestral',
      correo: 'brigada.sst@andinas.ejemplo.co',
      icono: Flame,
      colorIcono: 'text-[#10B981]',
      bgIcono: 'bg-emerald-50 border-emerald-200',
      integrantes: [
        { rol: 'Comandante de Brigada', nombre: 'Ing. Carlos Andrés Montoya', cargo: 'Jefe de Brigada / Líder SST' },
        { rol: 'Líder Grupo Incendios (Turno 1 y 2)', nombre: 'Nelson Javier Cárdenas', cargo: 'Mecánico de Planta' },
        { rol: 'Líder Primeros Auxilios y DEA', nombre: 'Esteban Darío Ruiz', cargo: 'Brigadista Soporte Vital' },
        { rol: 'Líder Evacuación hacia PE-01', nombre: 'Diana Marcela López', cargo: 'Coordinadora de Salidas' },
      ],
      funcionesClave: [
        'Atención inmediata con botiquines y desfibrilador (DEA) en menos de 3 minutos.',
        'Combate inicial y control de conatos con extintores PQS ABC y Solkaflam.',
        'Guiar la evacuación ordenada hacia el Punto de Encuentro Exterior PE-01.',
        'Conteo y censo nominal en el patio principal de despeje.',
      ],
    },
  ];

  return (
    <div className="py-6 sm:py-10 bg-white text-[#0E1B2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =====================================================================
            ENCABEZADO DE SECCIÓN
            ===================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#0B7A87] text-xs font-mono font-bold mb-3 shadow-xs">
            <Users className="w-3.5 h-3.5 text-[#0B7A87] shrink-0" />
            <span>Participación de los Trabajadores en el SG-SST</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0E1B2F] tracking-tight font-outfit leading-tight">
            Estructura Organizativa de Seguridad y Comités
          </h2>
          <p className="text-sm text-[#64748B] mt-2 font-sans font-medium leading-relaxed">
            Conformación oficial, integrantes vigentes y canales de contacto de los organismos legales del SG-SST.
          </p>
        </div>

        {/* =====================================================================
            TARJETAS DE LOS 3 COMITÉS LEGALES
            Fondo: Azul Grisáceo Claro (#F8FAFC) con Bordes en #64748B/20
            ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {comites.map((c) => {
            const Icon = c.icono;
            const estaExpandido = comiteExpandido === c.id;

            return (
              <div
                key={c.id}
                className="bg-[#F8FAFC] border border-[#64748B]/20 rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#1A56DB] hover:shadow-md transition-all shadow-xs"
              >
                <div>
                  {/* Encabezado del Comité */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${c.bgIcono} border flex items-center justify-center shrink-0`}>
                      <Icon className={`w-6 h-6 ${c.colorIcono}`} />
                    </div>
                    <span className="text-[10px] font-mono text-[#0B7A87] bg-white px-2.5 py-1 rounded-xl border border-[#64748B]/20 font-bold shrink-0">
                      {c.baseLegal.split('&')[0]}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0E1B2F] font-outfit mb-2 leading-snug break-words">
                    {c.nombre}
                  </h3>
                  
                  <p className="text-xs text-[#64748B] leading-relaxed mb-4 font-sans font-medium break-words">
                    {c.descripcion}
                  </p>

                  <div className="space-y-2 text-xs text-[#0E1B2F] font-mono font-medium mb-4">
                    <div className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="break-words leading-snug">{c.periodo}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-[#14B8A6] shrink-0 mt-0.5" />
                      <span className="break-words leading-snug">{c.reunion}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Mail className="w-3.5 h-3.5 text-[#1A56DB] shrink-0 mt-0.5" />
                      <span className="text-[#1A56DB] break-all">{c.correo}</span>
                    </div>
                  </div>

                  {/* Detalle Desplegable de Integrantes y Funciones */}
                  {estaExpandido && (
                    <div className="pt-4 border-t border-[#64748B]/20 space-y-3 animate-fade-in">
                      <div>
                        <span className="text-[10px] font-mono text-[#0B7A87] uppercase font-bold block mb-1.5">
                          Integrantes Oficiales:
                        </span>
                        <div className="space-y-1.5">
                          {c.integrantes.map((m, idx) => (
                            <div key={idx} className="bg-white p-2.5 rounded-xl border border-[#64748B]/15 text-[11px]">
                              <span className="font-bold text-[#0E1B2F] block break-words">{m.nombre}</span>
                              <span className="text-[10px] text-[#64748B] block font-mono mt-0.5 break-words">{m.rol} • {m.cargo}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-[#1A56DB] uppercase font-bold block mb-1">
                          Funciones Principales:
                        </span>
                        <ul className="space-y-1.5 text-[11px] text-[#64748B] font-sans">
                          {c.funcionesClave.map((f, idx) => (
                            <li key={idx} className="flex items-start space-x-1.5">
                              <span className="text-[#10B981] font-bold mt-0.5 shrink-0">•</span>
                              <span className="break-words leading-relaxed">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#64748B]/20 mt-4">
                  <button
                    onClick={() => setComiteExpandido(estaExpandido ? null : c.id)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 border border-[#64748B]/20 text-[#0E1B2F] text-xs font-mono font-bold transition-all flex items-center justify-center space-x-1"
                  >
                    <span>{estaExpandido ? 'Ocultar Integrantes' : 'Ver Integrantes y Funciones'}</span>
                    {estaExpandido ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================================
            CENTRAL DE EMERGENCIAS Y DIRECTORIO INMEDIATO
            Fondo: Azul Marino Oscuro (#0E1B2F)
            ===================================================================== */}
        <div className="bg-[#0E1B2F] border border-[#64748B]/30 rounded-3xl p-5 sm:p-8 shadow-xl text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-700/80">
            <div className="flex items-start space-x-3.5 sm:space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0B7A87]/40 border border-[#0B7A87] flex items-center justify-center shrink-0">
                <PhoneCall className="w-6 h-6 sm:w-7 sm:h-7 text-[#2DD4BF]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping shrink-0"></span>
                  <span className="text-[11px] sm:text-xs font-mono text-[#14B8A6] font-bold uppercase tracking-wider block truncate">
                    CENTRAL DE EMERGENCIAS Y COMUNICACIÓN INMEDIATA (24/7)
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-white font-outfit mt-0.5 leading-snug break-words">
                  ¿Presenciaste un conato, derrame o condición de peligro inminente?
                </h3>
                <p className="text-xs text-slate-300 mt-1 font-sans max-w-2xl font-medium leading-relaxed break-words">
                  Activa de inmediato el pulsador de parada más cercano o comunícate por radio al Canal 1 de la Brigada SST o a las líneas de conmutador de emergencia.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto justify-center sm:justify-start">
              <a
                href="tel:123"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-[#0E1B2F] font-mono text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-md shadow-[#10B981]/25 active:scale-95"
              >
                <Phone className="w-4 h-4 text-[#0E1B2F] shrink-0" />
                <span>Llamar a Emergencias (123)</span>
              </a>
            </div>
          </div>

          {/* Directorio Telefónico Rápido */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 text-xs font-mono">
            
            {/* Canal 1: Conmutador Planta */}
            <div className="bg-[#13233D] p-4 rounded-2xl border border-slate-700 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block uppercase">Línea Interna de Planta</span>
                <span className="text-sm font-bold text-[#2DD4BF] block truncate">Ext. 911 / 104</span>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate">Portería y Enfermería</span>
              </div>
              <button
                onClick={() => copiarNumero('Ext 911', 'Ext. 911')}
                className="p-2 rounded-lg hover:bg-slate-700 text-slate-300 shrink-0"
                title="Copiar extensión"
                aria-label="Copiar extensión interna"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Canal 2: Frecuencia Radio */}
            <div className="bg-[#13233D] p-4 rounded-2xl border border-slate-700 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block uppercase">Radio Frecuencia</span>
                <span className="text-sm font-bold text-[#14B8A6] block truncate">Canal 1 (Brigada)</span>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate">UHF 462.5625 MHz</span>
              </div>
              <Radio className="w-4 h-4 text-[#14B8A6] shrink-0" />
            </div>

            {/* Canal 3: ARL Seguros Bolívar */}
            <div className="bg-[#13233D] p-4 rounded-2xl border border-slate-700 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block uppercase">Línea Asistencial ARL</span>
                <span className="text-sm font-bold text-[#10B981] block truncate">#322 / 018000</span>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate">Seguros Bolívar</span>
              </div>
              <button
                onClick={() => copiarNumero('#322', 'ARL')}
                className="p-2 rounded-lg hover:bg-slate-700 text-slate-300 shrink-0"
                title="Copiar número ARL"
                aria-label="Copiar número de ARL"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Canal 4: Bomberos Bogotá */}
            <div className="bg-[#13233D] p-4 rounded-2xl border border-slate-700 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block uppercase">Cuerpo de Bomberos</span>
                <span className="text-sm font-bold text-[#2DD4BF] block truncate">Línea 119 / 123</span>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate">Estación Central Bogotá</span>
              </div>
              <button
                onClick={() => copiarNumero('119', 'Bomberos')}
                className="p-2 rounded-lg hover:bg-slate-700 text-slate-300 shrink-0"
                title="Copiar número bomberos"
                aria-label="Copiar número de bomberos"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {telefonoCopiado && (
            <div className="mt-3 text-right text-[11px] font-mono text-[#10B981] animate-fade-in">
              ✓ Número {telefonoCopiado} copiado al portapapeles.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
