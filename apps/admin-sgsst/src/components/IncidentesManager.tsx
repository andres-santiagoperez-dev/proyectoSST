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
  Send
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
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block mb-1">
            GESTIÓN DE EVENTOS // RESOLUCIÓN 1401 DE 2007
          </span>
          <h3 className="text-2xl font-bold text-slate-900 font-mono">
            Bandeja de Incidentes y Condiciones Inseguras
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Recepción, investigación y seguimiento. Plazo legal de investigación: 15 días calendario.
          </p>
        </div>

        <button
          onClick={() => setMostrarModalNuevo(true)}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Radicar Novedad en Terreno</span>
        </button>
      </div>

      {/* Filtros de Estado */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-mono">
          {['TODOS', 'REPORTADO', 'EN_INVESTIGACION', 'CERRADO'].map((est) => (
            <button
              key={est}
              onClick={() => setFiltroEstado(est)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filtroEstado === est
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {est}
            </button>
          ))}
        </div>

        {mensajeExito && (
          <span className="text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-mono">
            ✓ {mensajeExito}
          </span>
        )}
      </div>

      {/* Lista de Reportes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportesFiltrados.map((rep) => (
          <div
            key={rep.id}
            className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-amber-400/50 transition-all shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                {rep.radicado}
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                rep.estado === 'REPORTADO' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                rep.estado === 'EN_INVESTIGACION' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {rep.estado}
              </span>
            </div>

            <div>
              <span className={`text-[11px] font-mono font-bold ${
                rep.tipoEvento === 'INCIDENTE' ? 'text-amber-700' : 'text-slate-700'
              }`}>
                [{rep.tipoEvento}]
              </span>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                {rep.descripcion}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{rep.areaEspecifica}</span>
              </span>
              <span>{rep.reportadoPor}</span>
            </div>

            {/* Acciones de cambio de estado */}
            <div className="pt-2 flex items-center space-x-2">
              {rep.estado === 'REPORTADO' && (
                <button
                  onClick={() => cambiarEstado(rep.id, 'EN_INVESTIGACION')}
                  className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-[11px] font-mono font-semibold"
                >
                  Iniciar Investigación
                </button>
              )}
              {rep.estado === 'EN_INVESTIGACION' && (
                <button
                  onClick={() => cambiarEstado(rep.id, 'CERRADO')}
                  className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-mono font-semibold"
                >
                  Cerrar Caso (Medidas Verificadas)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Reporte Ágil (< 60s) */}
      {mostrarModalNuevo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h4 className="font-bold text-lg text-slate-900 font-mono">
                  Reporte Rápido de Novedad (&lt; 60 seg)
                </h4>
              </div>
              <button
                onClick={() => setMostrarModalNuevo(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={enviarReporteAgil} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Clasificación:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['CONDICION_INSEGURA', 'ACTO_INSEGURO', 'INCIDENTE'] as TipoEventoIncidente[]).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTipoEvento(t)}
                      className={`p-2 rounded-xl font-mono text-[11px] font-bold border transition-all ${
                        tipoEvento === t
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {t.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="area-especifica" className="font-semibold text-slate-700 block mb-1">Ubicación / Área:</label>
                <input
                  id="area-especifica"
                  type="text"
                  placeholder="Ej: Tostaduría - Tolva 2"
                  value={areaEspecifica}
                  onChange={(e) => setAreaEspecifica(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="descripcion-suceso" className="font-semibold text-slate-700 block mb-1">¿Qué sucedió o qué peligro viste?</label>
                <textarea
                  id="descripcion-suceso"
                  rows={3}
                  placeholder="Describe brevemente la situación observada..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              {/* Simulación Offline First */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {simularOffline ? (
                    <WifiOff className="w-4 h-4 text-red-500" />
                  ) : (
                    <Wifi className="w-4 h-4 text-emerald-500" />
                  )}
                  <span className="text-[11px] text-slate-600">
                    {simularOffline ? 'Modo Sin Conexión (Offline)' : 'Conexión a Red Activa'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSimularOffline(!simularOffline)}
                  className="text-[10px] font-mono underline text-slate-500"
                >
                  Alternar señal
                </button>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setMostrarModalNuevo(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-mono"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold font-mono shadow-md flex items-center space-x-1.5"
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
