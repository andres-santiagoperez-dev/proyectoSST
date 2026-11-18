'use client';

import React, { useState } from 'react';
import AndonDashboard from '@/components/AndonDashboard';
import Estandares0312Manager from '@/components/Estandares0312Manager';
import IncidentesManager from '@/components/IncidentesManager';
import AptitudMedicaManager from '@/components/AptitudMedicaManager';
import PlanesAccionManager from '@/components/PlanesAccionManager';
import AuditLogViewer from '@/components/AuditLogViewer';
import { 
  FileCheck2, 
  AlertTriangle, 
  HeartPulse, 
  Target, 
  History, 
  HardHat 
} from 'lucide-react';

export default function AdminPage() {
  const [pestanaActiva, setPestanaActiva] = useState<'0312' | 'INCIDENTES' | 'SALUD' | 'PLANES' | 'AUDITORIA'>('0312');
  const [puntaje0312, setPuntaje0312] = useState<number>(89.2);

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Tablero Andon Central Superior */}
      <AndonDashboard porcentaje0312={puntaje0312} />

      {/* Menú de Módulos Administrativos */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-300 pb-3 font-mono text-xs">
        <button
          onClick={() => setPestanaActiva('0312')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all font-bold ${
            pestanaActiva === '0312'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileCheck2 className="w-4 h-4 text-cyan-400" />
          <span>Autoevaluación Res. 0312</span>
        </button>

        <button
          onClick={() => setPestanaActiva('INCIDENTES')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all font-bold ${
            pestanaActiva === 'INCIDENTES'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Gestión de Incidentes (&lt; 60s)</span>
        </button>

        <button
          onClick={() => setPestanaActiva('SALUD')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all font-bold ${
            pestanaActiva === 'SALUD'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <HeartPulse className="w-4 h-4 text-emerald-500" />
          <span>Aptitud Médica (Res. 1843/2025)</span>
        </button>

        <button
          onClick={() => setPestanaActiva('PLANES')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all font-bold ${
            pestanaActiva === 'PLANES'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Target className="w-4 h-4 text-blue-500" />
          <span>Planes de Acción</span>
        </button>

        <button
          onClick={() => setPestanaActiva('AUDITORIA')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all font-bold ${
            pestanaActiva === 'AUDITORIA'
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <History className="w-4 h-4 text-purple-500" />
          <span>Bitácora de Auditoría</span>
        </button>
      </div>

      {/* Renderizado del Módulo Seleccionado */}
      {pestanaActiva === '0312' && (
        <Estandares0312Manager onCambioPuntaje={(p) => setPuntaje0312(p)} />
      )}

      {pestanaActiva === 'INCIDENTES' && (
        <IncidentesManager />
      )}

      {pestanaActiva === 'SALUD' && (
        <AptitudMedicaManager />
      )}

      {pestanaActiva === 'PLANES' && (
        <PlanesAccionManager />
      )}

      {pestanaActiva === 'AUDITORIA' && (
        <AuditLogViewer />
      )}
    </div>
  );
}
