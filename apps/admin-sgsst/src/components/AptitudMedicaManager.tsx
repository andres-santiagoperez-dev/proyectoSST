'use client';

import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Calendar, 
  UserCheck 
} from 'lucide-react';
import { CERTIFICADOS_MEDICOS_INICIALES } from '@/lib/data-mock';
import { CertificadoAptitudMedica } from '@/types';

export default function AptitudMedicaManager() {
  const [certificados, setCertificados] = useState<CertificadoAptitudMedica[]>(CERTIFICADOS_MEDICOS_INICIALES);
  const [certificadoSeleccionado, setCertificadoSeleccionado] = useState<CertificadoAptitudMedica | null>(certificados[0]);

  // Verificar si un examen vence en los próximos 30 días
  const proximoAVencer = (fechaVencimiento: string) => {
    const dias = Math.ceil((new Date(fechaVencimiento).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return dias > 0 && dias <= 30;
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
      {/* Cabecera y Aviso de Confidencialidad Legal Res. 1843/2025 */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            SALUD OCUPACIONAL // RESOLUCIÓN 1843 DE 2025 (DEROGA RES. 2346/2007)
          </span>
          <h3 className="text-2xl font-bold text-slate-900 font-mono">
            Control de Certificados de Aptitud Médica Laboral
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Seguimiento a recomendaciones ergonómicas y fechas de vencimiento de exámenes periódicos.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-mono">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>Reserva Médica Estricta: CERO Diagnósticos Clínicos</span>
        </div>
      </div>

      {/* Cuadrícula: Lista de Trabajadores + Ficha de Recomendaciones Ergonómicas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lista de Certificados */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mb-2">
            REGISTROS OCUPACIONALES VIGENTES ({certificados.length})
          </span>

          {certificados.map((cert) => {
            const vencePronto = proximoAVencer(cert.fechaVencimiento);
            const esSeleccionado = certificadoSeleccionado?.id === cert.id;

            return (
              <div
                key={cert.id}
                onClick={() => setCertificadoSeleccionado(cert)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  esSeleccionado
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 font-outfit">
                      {cert.trabajadorNombre}
                    </h5>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {cert.cargo} • {cert.documentoIdentidad}
                    </span>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                    cert.concepto === 'APTO' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                    cert.concepto === 'APTO_CON_RECOMENDACIONES' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                    'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {cert.concepto.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-2 border-t border-slate-200/80">
                  <span>Examen: {cert.tipoEvaluacion}</span>
                  <span className={vencePronto ? 'text-amber-600 font-bold flex items-center' : ''}>
                    {vencePronto && <AlertTriangle className="w-3.5 h-3.5 mr-1" />}
                    Vence: {cert.fechaVencimiento}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ficha Lateral: Recomendaciones Ergonómicas */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center">
              <UserCheck className="w-4 h-4 mr-1.5" />
              RECOMENDACIONES LABORALES
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              IPS: {certificadoSeleccionado?.ipsEmisora}
            </span>
          </div>

          {certificadoSeleccionado ? (
            <div className="space-y-4">
              <div>
                <strong className="text-lg font-bold text-white font-mono block">
                  {certificadoSeleccionado.trabajadorNombre}
                </strong>
                <span className="text-xs text-slate-400 font-mono">
                  Concepto: <span className="text-emerald-400 font-bold">{certificadoSeleccionado.concepto}</span>
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 font-mono block">
                  Pautas Ergonómicas Mandatorias para el Puesto:
                </span>
                <ul className="space-y-2">
                  {certificadoSeleccionado.recomendacionesLaborales.map((rec, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start space-x-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                Médico Ocupacional: {certificadoSeleccionado.medicoLicencia}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Selecciona un registro para ver las recomendaciones.</p>
          )}
        </div>
      </div>
    </div>
  );
}
