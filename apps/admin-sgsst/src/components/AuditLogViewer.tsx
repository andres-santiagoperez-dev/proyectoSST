'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, RefreshCw, FileText } from 'lucide-react';
import { consultarBitacoraAuditoria } from '@/lib/audit';
import { RegistroAuditoria } from '@/types';

export default function AuditLogViewer() {
  const [registros, setRegistros] = useState<RegistroAuditoria[]>([]);

  const recargar = () => {
    setRegistros(consultarBitacoraAuditoria());
  };

  useEffect(() => {
    recargar();
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#64748B]/20 shadow-xs space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#0B7A87] uppercase tracking-wider block mb-1">
            TRAZABILIDAD E INMUTABILIDAD // DECRETO 1072 DE 2015 ART. 2.2.4.6.13
          </span>
          <h3 className="text-2xl font-black font-outfit text-[#0E1B2F]">
            Bitácora de Auditoría del Sistema (Append-Only)
          </h3>
          <p className="text-xs text-[#64748B] font-mono mt-1">
            Registro secuencial inmutable. Ningún usuario puede editar ni eliminar eventos de esta lista.
          </p>
        </div>

        <button
          onClick={recargar}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0E1B2F] font-mono text-xs flex items-center space-x-1.5 transition-colors shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Actualizar Registros</span>
        </button>
      </div>

      <div className="overflow-x-auto border border-[#64748B]/20 rounded-2xl">
        <table className="w-full text-left text-xs min-w-[720px]">
          <thead className="bg-[#F8FAFC] border-b border-[#64748B]/15 text-[#0E1B2F] font-mono text-[11px] uppercase tracking-wider font-bold">
            <tr>
              <th className="py-3 px-4">Fecha / Hora (UTC)</th>
              <th className="py-3 px-4">Usuario / Rol</th>
              <th className="py-3 px-4">Acción</th>
              <th className="py-3 px-4">Entidad</th>
              <th className="py-3 px-4">Detalles</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {registros.map((reg) => (
              <tr key={reg.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 text-[#64748B] text-[11px] whitespace-nowrap">
                  {new Date(reg.fechaUtc).toLocaleString('es-CO')}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <strong className="text-[#0E1B2F] block">{reg.usuarioEmail}</strong>
                  <span className="text-[10px] text-[#0B7A87]">[{reg.rol}]</span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    reg.accion === 'CREAR' ? 'bg-emerald-50 text-[#047857] border border-emerald-200' :
                    reg.accion === 'CALIFICAR' ? 'bg-blue-50 text-[#1A56DB] border border-blue-200' :
                    'bg-slate-100 text-[#0E1B2F] border border-slate-300'
                  }`}>
                    {reg.accion}
                  </span>
                </td>
                <td className="py-3 px-4 text-[#0E1B2F] font-semibold whitespace-nowrap">
                  {reg.entidad}
                </td>
                <td className="py-3 px-4 text-[#64748B] font-sans text-xs max-w-sm">
                  {reg.detalles}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
