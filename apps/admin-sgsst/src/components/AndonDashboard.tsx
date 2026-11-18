'use client';

import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  HeartHandshake, 
  FileCheck2, 
  Activity, 
  Clock, 
  TrendingUp, 
  CheckCircle2 
} from 'lucide-react';

interface AndonProps {
  diasSeguros?: number;
  porcentaje0312?: number;
  incidentesAbiertos?: number;
  tasaPausas?: number;
}

export default function AndonDashboard({
  diasSeguros = 342,
  porcentaje0312 = 89.2,
  incidentesAbiertos = 2,
  tasaPausas = 92,
}: AndonProps) {
  // Cálculo del semáforo legal Res. 0312
  const obtenerEstado0312 = () => {
    if (porcentaje0312 >= 85) {
      return { texto: 'ACEPTABLE', colorBg: 'bg-emerald-950 text-emerald-300 border-emerald-500/40', dotColor: 'bg-emerald-400' };
    } else if (porcentaje0312 >= 60) {
      return { texto: 'MODERADAMENTE ACEPTABLE', colorBg: 'bg-amber-950 text-amber-300 border-amber-500/40', dotColor: 'bg-amber-400' };
    } else {
      return { texto: 'CRÍTICO (<60%)', colorBg: 'bg-red-950 text-red-300 border-red-500/40', dotColor: 'bg-red-500' };
    }
  };

  const semaforo = obtenerEstado0312();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
      {/* Fondo con brillo sutil */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Cabecera del Tablero Andon */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>TELEMETRÍA INDUSTRIAL EN VIVO // SISTEMA ANDON</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono mt-1 text-white">
            Tablero Gerencial de Control y Siniestralidad
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Monitoreo en tiempo real de accidentalidad, autoevaluación Res. 0312 y cobertura de pausas activas.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-slate-400">Estado de Planta:</span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>OPERACIÓN SEGURA</span>
          </span>
        </div>
      </div>

      {/* Cuadrícula de Indicadores Centrales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-6">
        {/* KPI 1: Días sin accidentes */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>DÍAS SEGUROS</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-white font-mono my-1">
            {diasSeguros}
          </div>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Sin accidentes de trabajo incapacitantes en 240 colaboradores.
          </p>
        </div>

        {/* KPI 2: Estándares Mínimos Res. 0312 */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>RES. 0312 / 2019</span>
            <FileCheck2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline space-x-2 my-1">
            <span className="text-4xl sm:text-5xl font-black text-white font-mono">
              {porcentaje0312.toFixed(1)}
            </span>
            <span className="text-xs font-mono text-cyan-400">%</span>
          </div>
          <div className={`mt-2 px-2.5 py-1 rounded text-[10px] font-mono font-bold border inline-flex items-center space-x-1.5 ${semaforo.colorBg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${semaforo.dotColor}`}></span>
            <span>{semaforo.texto}</span>
          </div>
        </div>

        {/* KPI 3: Cobertura de Pausas Activas */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>PAUSAS ACTIVAS</span>
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2 my-1">
            <span className="text-4xl sm:text-5xl font-black text-white font-mono">
              {tasaPausas}
            </span>
            <span className="text-xs font-mono text-emerald-400">%</span>
          </div>
          <p className="text-xs text-emerald-400 font-mono mt-1">
            ✓ Meta cumplida (&gt;80% en turnos diarios)
          </p>
        </div>

        {/* KPI 4: Novedades / Incidentes en Investigación */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>INCIDENTES / CONDICIONES</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono my-1">
            {incidentesAbiertos}
          </div>
          <p className="text-xs text-slate-400 font-sans mt-1">
            En investigación dentro del plazo de 15 días (Res. 1401).
          </p>
        </div>
      </div>

      {/* Fórmulas Normativas de Siniestralidad (Decreto 1072/2015) */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Índice de Frecuencia (IF): <strong>0.8</strong> (Meta &lt; 1.5)</span>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span>Índice de Severidad (IS): <strong>1.2</strong> (Meta &lt; 3.0)</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Horas Hombre Trabajadas (HHT): <strong>48.000 hrs/mes</strong></span>
        </div>
      </div>
    </div>
  );
}
