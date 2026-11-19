'use client';

import React, { useState } from 'react';
import { Users, Search, ShieldCheck, HeartPulse, Filter, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function EmpleadosView() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');

  const lista = [
    { id: 'EMP-01', nombre: 'Ana Gómez', depto: 'Soporte Técnico', estadoPC: 'EN_PAUSA', aptitud: 'APTO', restricciones: 'Ninguna' },
    { id: 'EMP-02', nombre: 'Pedro Ruiz', depto: 'Finanzas y Cartera', estadoPC: 'ACTIVO', aptitud: 'APTO_CON_RESTRICCIONES', restricciones: 'Pausa cada 45m por túnel carpiano' },
    { id: 'EMP-03', nombre: 'Clara Benítez', depto: 'Diseño UX / UI', estadoPC: 'PROXIMA_PAUSA', aptitud: 'APTO', restricciones: 'Regla 20-20-20 visual' },
    { id: 'EMP-04', nombre: 'Diego Martínez', depto: 'Marketing Digital', estadoPC: 'OMITIDA', aptitud: 'APTO', restricciones: 'Ninguna' },
    { id: 'EMP-05', nombre: 'Laura Camila Torres', depto: 'Laboratorio de Calidad', estadoPC: 'EN_PAUSA', aptitud: 'APTO', restricciones: 'Ninguna' },
    { id: 'EMP-06', nombre: 'Carlos Andrés Montoya', depto: 'Seguridad y Salud (SG-SST)', estadoPC: 'ACTIVO', aptitud: 'APTO', restricciones: 'Ninguna' },
  ];

  const filtrados = lista.filter((e) => {
    const coincideNombre = e.nombre.toLowerCase().includes(busqueda.toLowerCase()) || e.depto.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'TODOS' || e.estadoPC === filtroEstado;
    return coincideNombre && coincideEstado;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-black font-outfit text-brand-navy">
            Directorio de Empleados y Monitoreo Ergonómico
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Gestión de puestos de trabajo y aptitud médica laboral bajo la Resolución 1843 de abril de 2025.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por nombre o área..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:border-accent-turquoise focus:ring-1 focus:ring-accent-turquoise outline-none w-64"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#E6FFFA]/80 text-brand-navy font-bold font-mono border-b border-teal-100">
              <th className="py-3 px-4 rounded-l-xl">Empleado</th>
              <th className="py-3 px-4">Departamento</th>
              <th className="py-3 px-4">Estado en PC</th>
              <th className="py-3 px-4">Aptitud Laboral (Res. 1843/2025)</th>
              <th className="py-3 px-4 rounded-r-xl">Recomendaciones Ergonómicas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtrados.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-slate-900 font-outfit text-sm">
                  {emp.nombre}
                </td>
                <td className="py-3.5 px-4 text-slate-600 font-medium">
                  {emp.depto}
                </td>
                <td className="py-3.5 px-4">
                  {emp.estadoPC === 'EN_PAUSA' && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-status-break">
                      • En Pausa
                    </span>
                  )}
                  {emp.estadoPC === 'ACTIVO' && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-status-active">
                      • Activo
                    </span>
                  )}
                  {emp.estadoPC === 'PROXIMA_PAUSA' && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-status-upcoming">
                      Próxima Pausa
                    </span>
                  )}
                  {emp.estadoPC === 'OMITIDA' && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-status-missed">
                      Omitida
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  {emp.aptitud === 'APTO' ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Apto</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-mono text-[11px] font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Apto con restricciones</span>
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-slate-600 text-xs italic">
                  {emp.restricciones}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
