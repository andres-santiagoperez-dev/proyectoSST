'use client';

import React, { useState } from 'react';
import { 
  FileCheck2, 
  CheckCircle, 
  XCircle, 
  MinusCircle, 
  AlertOctagon, 
  Info, 
  Save, 
  Filter 
} from 'lucide-react';
import { ESTANDARES_0312_INICIALES } from '@/lib/data-mock';
import { EstandarMinimo0312, CalificacionEstandar, FasePHVA } from '@/types';
import { registrarAuditoria } from '@/lib/audit';
import { useAuth } from '@/lib/auth-context';

export default function Estandares0312Manager({ onCambioPuntaje }: { onCambioPuntaje?: (nuevoPuntaje: number) => void }) {
  const { usuarioActual, rolActivo } = useAuth();
  const [estandares, setEstandares] = useState<EstandarMinimo0312[]>(ESTANDARES_0312_INICIALES);
  const [faseFiltro, setFaseFiltro] = useState<string>('TODAS');
  const [mensajeGuardado, setMensajeGuardado] = useState<string | null>(null);

  // Calcular puntaje total ponderado
  const puntajeTotal = estandares.reduce((acum, est) => {
    if (est.calificacion === 'CUMPLE_TOTAL' || est.calificacion === 'NO_APLICA_JUSTIFICADO') {
      return acum + est.pesoPorcentual;
    }
    return acum;
  }, 0);

  // Subtotales por fase
  const calcularSubtotal = (fase: FasePHVA) => {
    return estandares
      .filter((e) => e.fase === fase)
      .reduce((acum, e) => {
        if (e.calificacion === 'CUMPLE_TOTAL' || e.calificacion === 'NO_APLICA_JUSTIFICADO') {
          return acum + e.pesoPorcentual;
        }
        return acum;
      }, 0);
  };

  const calificarEstandar = (id: string, nuevaCalificacion: CalificacionEstandar) => {
    const actualizados = estandares.map((est) => {
      if (est.id === id) {
        return { ...est, calificacion: nuevaCalificacion };
      }
      return est;
    });

    setEstandares(actualizados);

    const estModificado = estandares.find((e) => e.id === id);
    const nuevoTotal = actualizados.reduce((acc, e) => {
      return e.calificacion === 'CUMPLE_TOTAL' || e.calificacion === 'NO_APLICA_JUSTIFICADO' ? acc + e.pesoPorcentual : acc;
    }, 0);

    if (onCambioPuntaje) {
      onCambioPuntaje(nuevoTotal);
    }

    // Registrar en auditoría inmutable
    registrarAuditoria(
      usuarioActual?.email || 'lider.sst@andinas.ejemplo.co',
      rolActivo,
      'CALIFICAR',
      'EstandarMinimo0312',
      id,
      `Cambio de calificación en estándar ${estModificado?.codigo} a ${nuevaCalificacion}. Nuevo total: ${nuevoTotal.toFixed(1)}%`
    );

    setMensajeGuardado(`Calificación de ${estModificado?.codigo} actualizada y registrada en auditoría.`);
    setTimeout(() => setMensajeGuardado(null), 3000);
  };

  const estandaresFiltrados = faseFiltro === 'TODAS'
    ? estandares
    : estandares.filter((e) => e.fase === faseFiltro);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#64748B]/20 shadow-xs space-y-6">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#0B7A87] uppercase tracking-wider block mb-1">
            MÓDULO DE AUTOEVALUACIÓN LEGAL // RESOLUCIÓN 0312 DE 2019
          </span>
          <h3 className="text-2xl font-black font-outfit text-[#0E1B2F]">
            Estándares Mínimos del SG-SST (Tabla Ponderada)
          </h3>
          <p className="text-xs text-[#64748B] font-mono mt-1">
            Calificación según el ciclo PHVA. Cada cambio recalcula el semáforo y queda grabado en la bitácora inmutable.
          </p>
        </div>

        {/* Resumen Ponderado de Fases con Scroll Horizontal Seguro */}
        <div className="flex items-center space-x-2 bg-[#F8FAFC] p-2 rounded-2xl border border-[#64748B]/20 font-mono text-xs overflow-x-auto max-w-full pb-2 shrink-0">
          <div className="px-2.5 py-1 text-center shrink-0">
            <span className="text-[10px] text-[#64748B] block">PLANEAR (25%)</span>
            <strong className="text-[#0E1B2F]">{calcularSubtotal('PLANEAR')}%</strong>
          </div>
          <div className="px-2.5 py-1 text-center border-l border-slate-200 shrink-0">
            <span className="text-[10px] text-[#64748B] block">HACER (60%)</span>
            <strong className="text-[#0E1B2F]">{calcularSubtotal('HACER')}%</strong>
          </div>
          <div className="px-2.5 py-1 text-center border-l border-slate-200 shrink-0">
            <span className="text-[10px] text-[#64748B] block">VERIFICAR (5%)</span>
            <strong className="text-[#0E1B2F]">{calcularSubtotal('VERIFICAR')}%</strong>
          </div>
          <div className="px-2.5 py-1 text-center border-l border-slate-200 shrink-0">
            <span className="text-[10px] text-[#64748B] block">ACTUAR (10%)</span>
            <strong className="text-[#0E1B2F]">{calcularSubtotal('ACTUAR')}%</strong>
          </div>
          <div className="px-3.5 py-1 text-center bg-[#0E1B2F] text-white rounded-xl shrink-0">
            <span className="text-[9px] text-[#14B8A6] block font-bold">TOTAL</span>
            <strong className="text-base text-white font-outfit">{puntajeTotal.toFixed(1)}%</strong>
          </div>
        </div>
      </div>

      {/* Filtros de Fase PHVA */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 bg-[#F8FAFC] p-1 rounded-xl text-xs font-mono border border-[#64748B]/20 overflow-x-auto">
          {['TODAS', 'PLANEAR', 'HACER', 'VERIFICAR', 'ACTUAR'].map((f) => (
            <button
              key={f}
              onClick={() => setFaseFiltro(f)}
              className={`px-3 py-1.5 rounded-lg transition-all shrink-0 cursor-pointer ${
                faseFiltro === f
                  ? 'bg-[#1A56DB] text-white font-bold shadow-xs'
                  : 'text-[#64748B] hover:text-[#0E1B2F]'
              }`}
            >
              {f === 'TODAS' ? 'Todas las Fases' : f}
            </button>
          ))}
        </div>

        {mensajeGuardado && (
          <span className="text-xs text-[#047857] bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-mono animate-in fade-in">
            ✓ {mensajeGuardado}
          </span>
        )}
      </div>

      {/* Tabla de Estándares Mínimos con min-width */}
      <div className="overflow-x-auto border border-[#64748B]/20 rounded-2xl">
        <table className="w-full text-left text-xs min-w-[720px]">
          <thead className="bg-[#F8FAFC] border-b border-[#64748B]/15 text-[#0E1B2F] font-mono text-[11px] uppercase tracking-wider font-bold">
            <tr>
              <th className="py-3 px-4">Código</th>
              <th className="py-3 px-4">Fase</th>
              <th className="py-3 px-4">Estándar y Criterio</th>
              <th className="py-3 px-4 text-center">Peso</th>
              <th className="py-3 px-4 text-center">Calificación</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {estandaresFiltrados.map((est) => (
              <tr key={est.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-[#0E1B2F]">
                  {est.codigo}
                </td>
                <td className="py-3.5 px-4 font-mono">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    est.fase === 'PLANEAR' ? 'bg-blue-50 text-[#1A56DB] border border-blue-200' :
                    est.fase === 'HACER' ? 'bg-teal-50 text-[#0B7A87] border border-teal-200' :
                    est.fase === 'VERIFICAR' ? 'bg-slate-100 text-[#0E1B2F] border border-slate-300' :
                    'bg-emerald-50 text-[#047857] border border-emerald-200'
                  }`}>
                    {est.fase}
                  </span>
                </td>
                <td className="py-3.5 px-4 max-w-md">
                  <strong className="text-[#0E1B2F] block text-xs font-outfit">{est.nombre}</strong>
                  <span className="text-[#64748B] text-[11px] leading-relaxed block mt-0.5">
                    {est.criterio}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-[#0E1B2F]">
                  {est.pesoPorcentual}%
                </td>
                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  <div className="inline-flex items-center space-x-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#64748B]/20">
                    <button
                      onClick={() => calificarEstandar(est.id, 'CUMPLE_TOTAL')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                        est.calificacion === 'CUMPLE_TOTAL'
                          ? 'bg-[#10B981] text-white shadow-xs'
                          : 'text-[#64748B] hover:text-[#10B981]'
                      }`}
                      title="Cumple Totalmente"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Cumple</span>
                    </button>

                    <button
                      onClick={() => calificarEstandar(est.id, 'NO_CUMPLE')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                        est.calificacion === 'NO_CUMPLE'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'text-[#64748B] hover:text-rose-600'
                      }`}
                      title="No Cumple"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>No Cumple</span>
                    </button>

                    <button
                      onClick={() => calificarEstandar(est.id, 'NO_APLICA_JUSTIFICADO')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                        est.calificacion === 'NO_APLICA_JUSTIFICADO'
                          ? 'bg-[#1E293B] text-white shadow-xs'
                          : 'text-[#64748B] hover:text-[#0E1B2F]'
                      }`}
                      title="No Aplica Justificado"
                    >
                      <MinusCircle className="w-3.5 h-3.5" />
                      <span>No Aplica</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
