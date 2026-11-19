'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Filter, 
  Wifi, 
  WifiOff, 
  Camera, 
  ShieldCheck,
  Send,
  X
} from 'lucide-react';
import { REPORTES_INICIALES } from '@/lib/data-mock';
import { ReporteIncidente, TipoEventoIncidente, EstadoIncidente } from '@/types';
import { registrarAuditoria } from '@/lib/audit';
import { useAuth } from '@/lib/auth-context';

export default function IncidentesManager() {
  const { usuarioActual, rolActivo } = useAuth();
  const [reportes, setReportes] = useState<ReporteIncidente[]>(REPORTES_INICIALES);
  const [filtroEstado, setFiltroEstado] = useState<string>('TODOS');
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState<boolean>(false);

  // Estados para el formulario de reporte ágil (< 60s)
  const [tipoEvento, setTipoEvento] = useState<TipoEventoIncidente>('CONDICION_INSEGURA');
  const [descripcion, setDescripcion] = useState<string>('');
  const [areaEspecifica, setAreaEspecifica] = useState<string>('');
  const [simularOffline, setSimularOffline] = useState<boolean>(false);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const cambiarEstado = (id: string, nuevoEstado: EstadoIncidente) => {
    const actualizados = reportes.map((rep) => {
      if (rep.id === id) {
        return { ...rep, estado: nuevoEstado };
      }
      return rep;
    });
    setReportes(actualizados);

    const match = reportes.find((r) => r.id === id);
    registrarAuditoria(
      usuarioActual?.email || 'lider.sst@andinas.ejemplo.co',
      rolActivo,
      'CAMBIAR_ESTADO',
      'ReporteIncidente',
      id,
      `Cambio de estado del reporte ${match?.radicado} a ${nuevoEstado}`
    );
  };

  const enviarReporteAgil = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descripcion || !areaEspecifica) return;

    const nuevoRadicado = `REP-2026-00${reportes.length + 41}`;
    const nuevoReporte: ReporteIncidente = {
      id: `INC-00${Date.now()}`,
      radicado: nuevoRadicado,
      tipoEvento,
      descripcion,
      ubicacionSede: 'Planta Principal y Tostaduría',
      areaEspecifica,
      estado: 'REPORTADO',
      reportadoPor: usuarioActual?.nombre || 'Anónimo (Colaborador de Turno)',
      fechaOcurrencia: new Date().toISOString(),
      creadoEn: new Date().toISOString(),
      sincronizado: !simularOffline,
    };

    setReportes([nuevoReporte, ...reportes]);

    registrarAuditoria(
      usuarioActual?.email || 'anonimo@andinas.ejemplo.co',
      rolActivo,
      'CREAR',
      'ReporteIncidente',
      nuevoReporte.id,
      `Radicación de novedad ${nuevoRadicado} (${tipoEvento}) en ${areaEspecifica}. Estado sincronización: ${!simularOffline}`
    );

    setMensajeExito(`Novedad radicada exitosamente bajo el código ${nuevoRadicado}.`);
    setDescripcion('');
    setAreaEspecifica('');
    setMostrarModalNuevo(false);
    setTimeout(() => setMensajeExito(null), 4000);
  };

  const reportesFiltrados = filtroEstado === 'TODOS'
    ? reportes
    : reportes.filter((r) => r.estado === filtroEstado);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#64748B]/20 shadow-xs space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#0B7A87] uppercase tracking-wider block mb-1">
            GESTIÓN DE EVENTOS // RESOLUCIÓN 1401 DE 2007
          </span>
          <h3 className="text-2xl font-black font-outfit text-[#0E1B2F]">
            Bandeja de Incidentes y Condiciones Inseguras
          </h3>
          <p className="text-xs text-[#64748B] font-mono mt-1">
            Recepción, investigación y seguimiento. Plazo legal de investigación: 15 días calendario.
          </p>
        </div>

        <button
          onClick={() => setMostrarModalNuevo(true)}
          className="px-5 py-2.5 rounded-xl bg-[#1A56DB] hover:bg-blue-700 text-white font-mono text-xs font-bold shadow-md shadow-[#1A56DB]/20 transition-all flex items-center space-x-2 shrink-0 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Radicar Novedad en Terreno</span>
        </button>
      </div>

      {/* Filtros de Estado */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 bg-[#F8FAFC] p-1 rounded-xl text-xs font-mono border border-[#64748B]/20 overflow-x-auto">
          {['TODOS', 'REPORTADO', 'EN_INVESTIGACION', 'CERRADO'].map((est) => (
            <button
              key={est}
              onClick={() => setFiltroEstado(est)}
              className={`px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                filtroEstado === est
                  ? 'bg-[#0E1B2F] text-white font-bold shadow-xs'
                  : 'text-[#64748B] hover:text-[#0E1B2F]'
              }`}
            >
              {est === 'EN_INVESTIGACION' ? 'En Investigación' : est === 'REPORTADO' ? 'Reportado' : est === 'CERRADO' ? 'Cerrado' : 'Todos'}
            </button>
          ))}
        </div>

        {mensajeExito && (
          <span className="text-xs text-[#047857] bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-mono animate-in fade-in">
            ✓ {mensajeExito}
          </span>
        )}
      </div>

      {/* Lista de Reportes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportesFiltrados.map((rep) => (
          <div
            key={rep.id}
            className="p-5 rounded-2xl border border-[#64748B]/20 bg-[#F8FAFC]/60 hover:bg-white hover:border-[#1A56DB]/40 transition-all shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#0E1B2F] bg-white px-2.5 py-1 rounded-lg border border-[#64748B]/20 shadow-xs">
                {rep.radicado}
              </span>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md ${
                rep.estado === 'REPORTADO' ? 'bg-cyan-50 text-[#0B7A87] border border-cyan-200' :
                rep.estado === 'EN_INVESTIGACION' ? 'bg-blue-50 text-[#1A56DB] border border-blue-200' :
                'bg-emerald-50 text-[#047857] border border-emerald-200'
              }`}>
                {rep.estado}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold text-[#0B7A87]">
                [{rep.tipoEvento.replace(/_/g, ' ')}]
              </span>
              <p className="text-xs text-[#0E1B2F] mt-1 leading-relaxed">
                {rep.descripcion}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-[#64748B] font-mono">
              <span className="flex items-center space-x-1 truncate max-w-[55%]">
                <MapPin className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                <span className="truncate">{rep.areaEspecifica}</span>
              </span>
              <span className="truncate max-w-[40%] text-right">{rep.reportadoPor}</span>
            </div>

            {/* Acciones de cambio de estado */}
            <div className="pt-2 flex items-center space-x-2">
              {rep.estado === 'REPORTADO' && (
                <button
                  onClick={() => cambiarEstado(rep.id, 'EN_INVESTIGACION')}
                  className="px-3 py-1 rounded-lg bg-blue-50 text-[#1A56DB] hover:bg-blue-100 border border-blue-200 text-[11px] font-mono font-semibold transition-colors"
                >
                  Iniciar Investigación
                </button>
              )}
              {rep.estado === 'EN_INVESTIGACION' && (
                <button
                  onClick={() => cambiarEstado(rep.id, 'CERRADO')}
                  className="px-3 py-1 rounded-lg bg-emerald-50 text-[#047857] hover:bg-emerald-100 border border-emerald-200 text-[11px] font-mono font-semibold transition-colors"
                >
                  Cerrar Caso (Medidas Verificadas)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================================
          MODAL DE REPORTE ÁGIL (< 60s) CON ALTURA MÁXIMA Y SCROLL RESPONSIVO
          ========================================================================= */}
      {mostrarModalNuevo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            {/* Cabecera del Modal */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 sticky top-0 bg-white z-10">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-[#0B7A87] shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-base sm:text-lg text-[#0E1B2F] font-outfit truncate">
                  Reporte Rápido de Novedad (&lt; 60 seg)
                </h4>
              </div>
              <button
                onClick={() => setMostrarModalNuevo(false)}
                aria-label="Cerrar modal de reporte"
                className="p-1.5 rounded-xl hover:bg-slate-100 text-[#64748B] hover:text-[#0E1B2F] transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={enviarReporteAgil} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold font-mono text-[#0E1B2F] block mb-1.5">
                  Clasificación del Evento:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(['CONDICION_INSEGURA', 'ACTO_INSEGURO', 'INCIDENTE'] as TipoEventoIncidente[]).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTipoEvento(t)}
                      className={`p-2.5 rounded-xl font-mono text-[11px] font-bold border transition-all text-center leading-tight ${
                        tipoEvento === t
                          ? 'bg-[#1A56DB] text-white border-[#1A56DB] shadow-xs'
                          : 'bg-[#F8FAFC] text-[#64748B] border-[#64748B]/20 hover:bg-slate-100'
                      }`}
                    >
                      {t === 'CONDICION_INSEGURA' ? 'Condición Insegura' : t === 'ACTO_INSEGURO' ? 'Acto Inseguro' : 'Incidente'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="area-especifica" className="font-semibold font-mono text-[#0E1B2F] block mb-1">
                  Ubicación / Área Específica:
                </label>
                <input
                  id="area-especifica"
                  type="text"
                  placeholder="Ej: Tostaduría - Tolva 2"
                  value={areaEspecifica}
                  onChange={(e) => setAreaEspecifica(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#64748B]/20 bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:border-[#1A56DB] focus:ring-1 focus:ring-[#1A56DB] text-[#0E1B2F] font-mono"
                  required
                />
              </div>

              <div>
                <label htmlFor="descripcion-suceso" className="font-semibold font-mono text-[#0E1B2F] block mb-1">
                  ¿Qué sucedió o qué peligro observaste?
                </label>
                <textarea
                  id="descripcion-suceso"
                  rows={3}
                  placeholder="Describe brevemente la situación observada..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#64748B]/20 bg-[#F8FAFC] focus:bg-white focus:outline-hidden focus:border-[#1A56DB] focus:ring-1 focus:ring-[#1A56DB] text-[#0E1B2F]"
                  required
                />
              </div>

              {/* Simulación Offline First */}
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#64748B]/20 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {simularOffline ? (
                    <WifiOff className="w-4 h-4 text-red-500 shrink-0" />
                  ) : (
                    <Wifi className="w-4 h-4 text-[#10B981] shrink-0" />
                  )}
                  <span className="text-[11px] font-mono text-[#64748B]">
                    {simularOffline ? 'Modo Sin Conexión (Offline)' : 'Conexión a Red Activa'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSimularOffline(!simularOffline)}
                  className="text-[10px] font-mono underline text-[#1A56DB] hover:text-blue-800"
                >
                  Alternar señal
                </button>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setMostrarModalNuevo(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#64748B] font-mono text-xs transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1A56DB] hover:bg-blue-700 text-white font-bold font-mono text-xs shadow-md shadow-[#1A56DB]/20 flex items-center space-x-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Radicar Novedad</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
