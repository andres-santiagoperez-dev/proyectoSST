'use client';

import React, { useState } from 'react';
import { FileCheck2, AlertTriangle, Target, History, ShieldCheck, Download } from 'lucide-react';
import Estandares0312Manager from './Estandares0312Manager';
import IncidentesManager from './IncidentesManager';
import PlanesAccionManager from './PlanesAccionManager';
import AuditLogViewer from './AuditLogViewer';

export default function ReportesHistorialView() {
  const [seccion, setSeccion] = useState<'0312' | 'INCIDENTES' | 'PLANES' | 'AUDITORIA'>('0312');
  const [puntaje0312, setPuntaje0312] = useState<number>(89.2);

  return (
    <div className="space-y-6">
      {/* Selector de Subsección con desplazamiento seguro */}
      <div className="bg-white rounded-2xl p-2 border border-[#64748B]/20 shadow-xs flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSeccion('0312')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            seccion === '0312'
              ? 'bg-[#0E1B2F] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-100'
          }`}
        >
          <FileCheck2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
          <span className="truncate">Estándares Mínimos Res. 0312</span>
        </button>

        <button
          onClick={() => setSeccion('INCIDENTES')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            seccion === 'INCIDENTES'
              ? 'bg-[#0E1B2F] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-[#0B7A87] shrink-0" />
          <span className="truncate">Incidentes en Campo (&lt; 60s)</span>
        </button>

        <button
          onClick={() => setSeccion('PLANES')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            seccion === 'PLANES'
              ? 'bg-[#0E1B2F] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-100'
          }`}
        >
          <Target className="w-4 h-4 text-[#1A56DB] shrink-0" />
          <span className="truncate">Planes de Acción y Compromisos</span>
        </button>

        <button
          onClick={() => setSeccion('AUDITORIA')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            seccion === 'AUDITORIA'
              ? 'bg-[#0E1B2F] text-white shadow-xs'
              : 'text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-100'
          }`}
        >
          <History className="w-4 h-4 text-[#10B981] shrink-0" />
          <span className="truncate">Libro Mayor de Auditoría Inmutable</span>
        </button>
      </div>

      {/* Vista de la Subsección */}
      <div className="animate-in fade-in duration-200">
        {seccion === '0312' && (
          <Estandares0312Manager onCambioPuntaje={(p) => setPuntaje0312(p)} />
        )}
        {seccion === 'INCIDENTES' && <IncidentesManager />}
        {seccion === 'PLANES' && <PlanesAccionManager />}
        {seccion === 'AUDITORIA' && <AuditLogViewer />}
      </div>
    </div>
  );
}
