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
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block mb-1">
            MÓDULO DE AUTOEVALUACIÓN LEGAL // RESOLUCIÓN 0312 DE 2019
          </span>
          <h3 className="text-2xl font-bold text-slate-900 font-mono">
            Estándares Mínimos del SG-SST (Tabla Ponderada)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Calificación según el ciclo PHVA. Cada cambio recalcula el semáforo y queda grabado en la bitácora inmutable.
          </p>
        </div>

        {/* Resumen Ponderado de Fases */}
        <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 font-mono text-xs">
          <div className="px-2 py-1 text-center">
            <span className="text-[10px] text-slate-400 block">PLANEAR (25%)</span>
            <strong className="text-slate-800">{calcularSubtotal('PLANEAR')}%</strong>
          </div>
          <div className="px-2 py-1 text-center border-l border-slate-200">
            <span className="text-[10px] text-slate-400 block">HACER (60%)</span>
            <strong className="text-slate-800">{calcularSubtotal('HACER')}%</strong>
          </div>
          <div className="px-2 py-1 text-center border-l border-slate-200">
            <span className="text-[10px] text-slate-400 block">VERIFICAR (5%)</span>
            <strong className="text-slate-800">{calcularSubtotal('VERIFICAR')}%</strong>
          </div>
          <div className="px-2 py-1 text-center border-l border-slate-200">
            <span className="text-[10px] text-slate-400 block">ACTUAR (10%)</span>
            <strong className="text-slate-800">{calcularSubtotal('ACTUAR')}%</strong>
          </div>
          <div className="px-3 py-1 text-center bg-slate-900 text-white rounded-xl">
            <span className="text-[9px] text-amber-400 block">TOTAL</span>
            <strong className="text-base text-white">{puntajeTotal.toFixed(1)}%</strong>
          </div>
        </div>
      </div>

      {/* Filtros de Fase PHVA */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs font-mono">
          {['TODAS', 'PLANEAR', 'HACER', 'VERIFICAR', 'ACTUAR'].map((f) => (
            <button
              key={f}
              onClick={() => setFaseFiltro(f)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                faseFiltro === f
                  ? 'bg-slate-900 text-white font-bold shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {mensajeGuardado && (
          <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-mono animate-in fade-in">
            ✓ {mensajeGuardado}
          </span>
        )}
      </div>

      {/* Tabla de Estándares Mínimos */}
      <div className="overflow-x-auto border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
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
                <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                  {est.codigo}
                </td>
                <td className="py-3.5 px-4 font-mono">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    est.fase === 'PLANEAR' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    est.fase === 'HACER' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    est.fase === 'VERIFICAR' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                    'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {est.fase}
                  </span>
                </td>
                <td className="py-3.5 px-4 max-w-md">
                  <strong className="text-slate-900 block text-xs">{est.nombre}</strong>
                  <span className="text-slate-500 text-[11px] leading-relaxed block mt-0.5">
                    {est.criterio}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-700">
                  {est.pesoPorcentual}%
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="inline-flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => calificarEstandar(est.id, 'CUMPLE_TOTAL')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1 ${
                        est.calificacion === 'CUMPLE_TOTAL'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-500 hover:text-emerald-700'
                      }`}
                      title="Cumple Totalmente"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Cumple</span>
                    </button>

                    <button
                      onClick={() => calificarEstandar(est.id, 'NO_CUMPLE')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1 ${
                        est.calificacion === 'NO_CUMPLE'
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'text-slate-500 hover:text-red-700'
                      }`}
                      title="No Cumple"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>No Cumple</span>
                    </button>

                    <button
                      onClick={() => calificarEstandar(est.id, 'NO_APLICA_JUSTIFICADO')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center space-x-1 ${
                        est.calificacion === 'NO_APLICA_JUSTIFICADO'
                          ? 'bg-slate-700 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
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
