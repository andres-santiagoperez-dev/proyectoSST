'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  HeartPulse, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  X,
  Laptop,
  Calendar,
  Lock,
  Eye
} from 'lucide-react';

interface EmpleadoDirectorio {
  id: string;
  nombre: string;
  depto: string;
  puestoId: string;
  estadoPC: 'EN_PAUSA' | 'ACTIVO' | 'PROXIMA_PAUSA' | 'OMITIDA';
  aptitud: 'APTO' | 'APTO_CON_RESTRICCIONES';
  restricciones: string;
  ultimoExamen: string;
  vigencia: string;
  ipsEmisora: string;
}

export default function EmpleadosView() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [empleadoModal, setEmpleadoModal] = useState<EmpleadoDirectorio | null>(null);

  const lista: EmpleadoDirectorio[] = [
    { 
      id: 'EMP-01', 
      nombre: 'Ana Gómez', 
      depto: 'Soporte Técnico', 
      puestoId: 'WS-SOP-01',
      estadoPC: 'EN_PAUSA', 
      aptitud: 'APTO', 
      restricciones: 'Ninguna restricción osteomuscular',
      ultimoExamen: '2026-03-12',
      vigencia: '2027-03-12',
      ipsEmisora: 'IPS Salud Laboral Andina'
    },
    { 
      id: 'EMP-02', 
      nombre: 'Pedro Ruiz', 
      depto: 'Finanzas y Cartera', 
      puestoId: 'WS-FIN-01',
      estadoPC: 'ACTIVO', 
      aptitud: 'APTO_CON_RESTRICCIONES', 
      restricciones: 'Pausa cada 45m por sospecha túnel carpiano bilateral',
      ultimoExamen: '2026-05-18',
      vigencia: '2027-05-18',
      ipsEmisora: 'Servicios Médicos Ocupacionales S.A.S'
    },
    { 
      id: 'EMP-03', 
      nombre: 'Clara Benítez', 
      depto: 'Diseño UX / UI', 
      puestoId: 'WS-DIS-01',
      estadoPC: 'PROXIMA_PAUSA', 
      aptitud: 'APTO', 
      restricciones: 'Regla 20-20-20 visual por uso continuo de monitores',
      ultimoExamen: '2026-02-10',
      vigencia: '2027-02-10',
      ipsEmisora: 'IPS Salud Laboral Andina'
    },
    { 
      id: 'EMP-04', 
      nombre: 'Diego Martínez', 
      depto: 'Marketing Digital', 
      puestoId: 'WS-MKT-01',
      estadoPC: 'OMITIDA', 
      aptitud: 'APTO', 
      restricciones: 'Ajuste de soporte lumbar y elevador de pantalla',
      ultimoExamen: '2026-04-05',
      vigencia: '2027-04-05',
      ipsEmisora: 'Centro Médico Integral Ocupacional'
    },
    { 
      id: 'EMP-05', 
      nombre: 'Laura Camila Torres', 
      depto: 'Operaciones', 
      puestoId: 'WS-OPE-01',
      estadoPC: 'EN_PAUSA', 
      aptitud: 'APTO', 
      restricciones: 'Alternancia postural bipedestación / sedestación',
      ultimoExamen: '2026-01-20',
      vigencia: '2027-01-20',
      ipsEmisora: 'IPS Salud Laboral Andina'
    },
    { 
      id: 'EMP-06', 
      nombre: 'Carlos Andrés Montoya', 
      depto: 'Tecnología', 
      puestoId: 'WS-TEC-01',
      estadoPC: 'ACTIVO', 
      aptitud: 'APTO', 
      restricciones: 'Estiramientos articulares de muñeca y hombros',
      ultimoExamen: '2026-06-14',
      vigencia: '2027-06-14',
      ipsEmisora: 'Servicios Médicos Ocupacionales S.A.S'
    },
  ];

  const filtrados = lista.filter((e) => {
    const coincideNombre = e.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                          e.depto.toLowerCase().includes(busqueda.toLowerCase()) ||
                          e.puestoId.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'TODOS' || e.estadoPC === filtroEstado;
    return coincideNombre && coincideEstado;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#64748B]/20 shadow-xs space-y-6">
      
      {/* Encabezado con buscador responsivo */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-black font-outfit text-[#0E1B2F]">
            Directorio de Empleados y Monitoreo Ergonómico
          </h3>
          <p className="text-xs text-[#64748B] font-mono mt-1">
            Gestión de puestos de trabajo y aptitud médica laboral bajo la Resolución 1843 de abril de 2025.
          </p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por nombre, área o puesto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-[#64748B]/20 text-xs font-mono focus:border-[#1A56DB] focus:ring-1 focus:ring-[#1A56DB] outline-hidden w-full bg-[#F8FAFC]"
            />
          </div>
        </div>
      </div>

      {/* Filtros de Estado */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs font-mono">
        <span className="text-[#64748B] shrink-0 mr-1 flex items-center">
          <Filter className="w-3 h-3 mr-1" /> Filtrar estado:
        </span>
        {['TODOS', 'ACTIVO', 'EN_PAUSA', 'PROXIMA_PAUSA', 'OMITIDA'].map((est) => (
          <button
            key={est}
            onClick={() => setFiltroEstado(est)}
            className={`px-3 py-1 rounded-xl transition-all shrink-0 cursor-pointer ${
              filtroEstado === est
                ? 'bg-[#1A56DB] text-white font-bold shadow-xs'
                : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0E1B2F] border border-[#64748B]/20'
            }`}
          >
            {est === 'TODOS' ? 'Todos' : est === 'EN_PAUSA' ? 'En Pausa' : est === 'PROXIMA_PAUSA' ? 'Próxima Pausa' : est === 'OMITIDA' ? 'Omitida' : 'Activo'}
          </button>
        ))}
      </div>

      {/* Tabla con min-width previendo textos recortados */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[720px]">
          <thead>
            <tr className="bg-[#F8FAFC] text-[#0E1B2F] font-bold font-mono border-b border-[#64748B]/15">
              <th className="py-3 px-4 rounded-l-xl">Empleado / Puesto</th>
              <th className="py-3 px-4">Departamento</th>
              <th className="py-3 px-4">Estado en PC</th>
              <th className="py-3 px-4">Aptitud Laboral (Res. 1843/2025)</th>
              <th className="py-3 px-4">Recomendaciones Ergonómicas</th>
              <th className="py-3 px-4 rounded-r-xl text-right">Detalle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-[#64748B] font-mono text-xs">
                  No se encontraron colaboradores con los criterios seleccionados.
                </td>
              </tr>
            ) : (
              filtrados.map((emp) => (
                <tr 
                  key={emp.id} 
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  onClick={() => setEmpleadoModal(emp)}
                >
                  <td className="py-3.5 px-4 font-semibold text-[#0E1B2F] font-outfit text-sm">
                    <span className="block font-bold">{emp.nombre}</span>
                    <span className="text-[10px] font-mono text-[#64748B] font-normal">{emp.puestoId} • {emp.id}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#64748B] font-medium">
                    {emp.depto}
                  </td>
                  <td className="py-3.5 px-4">
                    {emp.estadoPC === 'EN_PAUSA' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-[#10B981] shadow-xs">
                        • En Pausa
                      </span>
                    )}
                    {emp.estadoPC === 'ACTIVO' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-[#2563EB] shadow-xs">
                        • Activo
                      </span>
                    )}
                    {emp.estadoPC === 'PROXIMA_PAUSA' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-[#06B6D4] shadow-xs">
                        Próxima Pausa
                      </span>
                    )}
                    {emp.estadoPC === 'OMITIDA' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-[#1E293B] shadow-xs">
                        Omitida
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {emp.aptitud === 'APTO' ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-50 text-[#047857] font-mono text-[11px] font-bold border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>Apto</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-cyan-50 text-[#0B7A87] font-mono text-[11px] font-bold border border-cyan-200">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#0B7A87]" />
                        <span>Apto con restricciones</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-[#64748B] text-xs max-w-xs">
                    <span className="line-clamp-2">{emp.restricciones}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEmpleadoModal(emp);
                      }}
                      className="p-1.5 rounded-lg text-[#1A56DB] hover:bg-blue-50 transition-colors"
                      title="Ver ficha completa"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* =========================================================================
          MODAL DE FICHA ERGONÓMICA INDIVIDUAL (RESOLUCIÓN 1843/2025)
          ========================================================================= */}
      {empleadoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1A56DB]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#0E1B2F] font-outfit">
                    Ficha de Monitoreo del Colaborador
                  </h4>
                  <span className="text-xs font-mono text-[#64748B]">
                    {empleadoModal.puestoId} • {empleadoModal.depto}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setEmpleadoModal(null)}
                aria-label="Cerrar modal"
                className="p-1.5 rounded-xl hover:bg-slate-100 text-[#64748B] hover:text-[#0E1B2F] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Datos Principales */}
            <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#64748B]/20 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <strong className="text-sm font-outfit text-[#0E1B2F] font-bold">
                  {empleadoModal.nombre}
                </strong>
                <span className={`px-2.5 py-0.5 rounded-md font-bold text-[10px] ${
                  empleadoModal.aptitud === 'APTO'
                    ? 'bg-emerald-50 text-[#047857] border border-emerald-200'
                    : 'bg-cyan-50 text-[#0B7A87] border border-cyan-200'
                }`}>
                  {empleadoModal.aptitud.replace(/_/g, ' ')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 text-[11px] text-[#64748B]">
                <div>
                  <span>Último Examen Ocupacional:</span>
                  <strong className="block text-[#0E1B2F] mt-0.5">{empleadoModal.ultimoExamen}</strong>
                </div>
                <div>
                  <span>Vigencia Médica:</span>
                  <strong className="block text-[#0E1B2F] mt-0.5">{empleadoModal.vigencia}</strong>
                </div>
              </div>

              <div className="text-[11px] text-[#64748B] pt-1">
                <span>IPS Emisora: </span>
                <strong className="text-[#0E1B2F]">{empleadoModal.ipsEmisora}</strong>
              </div>
            </div>

            {/* Pautas Ergonómicas */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#0E1B2F] uppercase tracking-wider block">
                Prescripción Ergonómica del Puesto:
              </span>
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/60 text-xs text-[#0E1B2F] leading-relaxed">
                {empleadoModal.restricciones}
              </div>
            </div>

            {/* Aviso de Confidencialidad */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-2 text-[11px] font-mono text-[#64748B]">
              <Lock className="w-4 h-4 text-[#0B7A87] shrink-0" />
              <span>Reserva Legal Res. 1843/2025: Sin diagnósticos clínicos CIE-10.</span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setEmpleadoModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#1A56DB] text-white font-mono text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
              >
                Cerrar Ficha
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
