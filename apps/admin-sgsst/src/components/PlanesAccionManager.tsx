'use client';

import React, { useState } from 'react';
import { Target, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { PLANES_ACCION_INICIALES } from '@/lib/data-mock';
import { PlanAccion, EstadoAccion } from '@/types';
import { registrarAuditoria } from '@/lib/audit';
import { useAuth } from '@/lib/auth-context';

export default function PlanesAccionManager() {
  const { usuarioActual, rolActivo } = useAuth();
  const [acciones, setAcciones] = useState<PlanAccion[]>(PLANES_ACCION_INICIALES);

  const cambiarEstadoAccion = (id: string, nuevoEstado: EstadoAccion) => {
    const actualizadas = acciones.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          estado: nuevoEstado,
          fechaCierre: nuevoEstado === 'CERRADA_EFICAZ' ? new Date().toISOString().split('T')[0] : undefined,
        };
      }
      return a;
    });

    setAcciones(actualizadas);

    const match = acciones.find((a) => a.id === id);
    registrarAuditoria(
      usuarioActual?.email || 'lider.sst@andinas.ejemplo.co',
      rolActivo,
      'CAMBIAR_ESTADO',
      'PlanAccion',
      id,
      `Acción correctiva ${match?.codigo} marcada como ${nuevoEstado}`
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#64748B]/20 shadow-xs space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#0B7A87] uppercase tracking-wider block mb-1">
            CICLO ACTUAR // DECRETO 1072 DE 2015 ART. 2.2.4.6.33
          </span>
          <h3 className="text-2xl font-black font-outfit text-[#0E1B2F]">
            Planes de Acción y Medidas Correctivas
          </h3>
          <p className="text-xs text-[#64748B] font-mono mt-1">
            Seguimiento a hallazgos derivados de incidentes y autoevaluaciones con verificación de eficacia.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {acciones.map((acc) => (
          <div
            key={acc.id}
            className="p-5 rounded-2xl border border-[#64748B]/20 bg-[#F8FAFC]/50 hover:bg-white transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#0E1B2F] bg-white px-2.5 py-1 rounded-lg border border-[#64748B]/20">
                {acc.codigo} • Origen: {acc.origen}
              </span>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md ${
                acc.estado === 'ABIERTA' ? 'bg-cyan-50 text-[#0B7A87] border border-cyan-200' :
                acc.estado === 'EN_EJECUCION' ? 'bg-blue-50 text-[#1A56DB] border border-blue-200' :
                'bg-emerald-50 text-[#047857] border border-emerald-200'
              }`}>
                {acc.estado.replace('_', ' ')}
              </span>
            </div>

            <div>
              <strong className="text-sm text-[#0E1B2F] block font-outfit">
                Hallazgo: {acc.descripcionHallazgo}
              </strong>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                <strong className="text-[#0E1B2F]">Medida Propuesta:</strong> {acc.medidaPropuesta}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-xs text-[#64748B] font-mono gap-2">
              <span>Responsable: <strong className="text-[#0E1B2F]">{acc.responsableNombre}</strong></span>
              <span>Fecha límite: <strong className="text-[#0E1B2F]">{acc.fechaLimite}</strong></span>
              {acc.fechaCierre && <span>Cerrada en: <strong className="text-[#047857]">{acc.fechaCierre}</strong></span>}

              {acc.estado !== 'CERRADA_EFICAZ' && (
                <button
                  onClick={() => cambiarEstadoAccion(acc.id, 'CERRADA_EFICAZ')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#10B981] hover:bg-emerald-600 text-white text-xs font-mono font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Verificar Eficacia y Cerrar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
