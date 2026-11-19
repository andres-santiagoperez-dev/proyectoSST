'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  HelpCircle, 
  MessageSquarePlus, 
  Lock, 
  MapPin, 
  FileCheck, 
  Copy, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface SuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialZoneId?: string;
  initialZoneName?: string;
}

export default function SuggestionModal({
  isOpen,
  onClose,
  initialZoneId,
  initialZoneName,
}: SuggestionModalProps) {
  const [tipo, setTipo] = useState<'SUGERENCIA' | 'CONDICION' | 'ACTO' | 'BIENESTAR'>('SUGERENCIA');
  const [zonaId, setZonaId] = useState(initialZoneId || 'ZONA-1');
  const [asunto, setAsunto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [esAnonimo, setEsAnonimo] = useState(false);
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('');
  const [correo, setCorreo] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [radicadoExitoso, setRadicadoExitoso] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState('');

  useEffect(() => {
    if (initialZoneId) {
      setZonaId(initialZoneId);
    }
  }, [initialZoneId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorValidacion('');

    if (!asunto.trim()) {
      setErrorValidacion('Por favor ingrese el asunto o título del reporte.');
      return;
    }
    if (descripcion.trim().length < 15) {
      setErrorValidacion('La descripción debe contener al menos 15 caracteres para permitir la valoración del COPASST.');
      return;
    }
    if (!esAnonimo && (!nombre.trim() || !correo.trim())) {
      setErrorValidacion('Por favor complete su nombre y correo, o active la opción de radicación anónima.');
      return;
    }

    setEnviando(true);

    // Simulación de procesamiento y registro en libro de radicación SG-SST
    setTimeout(() => {
      const year = new Date().getFullYear();
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const codigoRadicado = `RAD-${year}-SST-${randomNum}`;
      setRadicadoExitoso(codigoRadicado);
      setEnviando(false);
    }, 600);
  };

  const handleCopiarRadicado = () => {
    if (!radicadoExitoso) return;
    navigator.clipboard.writeText(radicadoExitoso);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const resetFormulario = () => {
    setRadicadoExitoso(null);
    setAsunto('');
    setDescripcion('');
    setEsAnonimo(false);
    setNombre('');
    setCargo('');
    setCorreo('');
    setErrorValidacion('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0E1B2F]/65 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-radicacion-titulo"
    >
      <div 
        className="bg-white border border-[#64748B]/20 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal — Fija arriba para que nunca se recorte */}
        <div className="shrink-0 flex items-start sm:items-center justify-between p-4 sm:p-6 border-b border-[#64748B]/20 bg-[#F8FAFC]">
          <div className="flex items-start sm:items-center space-x-3 pr-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1A56DB] shrink-0 mt-0.5 sm:mt-0">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#0B7A87] font-bold uppercase tracking-wider block">
                MECANISMO DE COMUNICACIÓN // DEC. 1072 ART. 2.2.4.6.14
              </span>
              <h3 id="modal-radicacion-titulo" className="text-lg sm:text-xl font-black text-[#0E1B2F] font-outfit leading-tight mt-0.5">
                Radicación de Sugerencias y Reportes SST
              </h3>
            </div>
          </div>

          <button
            onClick={resetFormulario}
            className="w-9 h-9 rounded-xl text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-200/60 flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#1A56DB] shrink-0"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido del Modal — Desplazable con scroll suave sin recortar bordes */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {radicadoExitoso ? (
            <div className="text-center py-4 sm:py-6 space-y-4 sm:space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#10B981] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-[#047857] uppercase tracking-wider">
                  RADICACIÓN CONFORME // SG-SST
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-[#0E1B2F] font-outfit mt-1">
                  ¡Aporte Registrado Exitosamente!
                </h4>
                <p className="text-xs text-[#64748B] max-w-md mx-auto mt-2 font-sans font-medium leading-relaxed">
                  Tu reporte ha sido transmitido de manera oficial al comité COPASST y a la Coordinación del SG-SST para su valoración y plan de intervención.
                </p>
              </div>

              {/* Tarjeta de Radicado */}
              <div className="bg-[#F8FAFC] border border-[#64748B]/20 p-4 sm:p-5 rounded-2xl max-w-sm mx-auto">
                <span className="text-[10px] font-mono text-[#64748B] block uppercase">Código de Trazabilidad Oficial</span>
                <div className="flex items-center justify-center space-x-2 mt-1">
                  <span className="text-xl sm:text-2xl font-black font-mono text-[#1A56DB] tracking-wider break-all">
                    {radicadoExitoso}
                  </span>
                  <button
                    onClick={handleCopiarRadicado}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-[#0B7A87] transition-colors shrink-0"
                    title="Copiar código de radicado"
                    aria-label="Copiar radicado"
                  >
                    {copiado ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-[11px] text-[#64748B] font-mono mt-2 pt-2 border-t border-[#64748B]/20 break-words">
                  {esAnonimo ? 'Radicación: Anónima Protegida' : `Radicado por: ${nombre || 'Colaborador'}`}
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={resetFormulario}
                  className="px-6 py-2.5 rounded-xl bg-[#1A56DB] text-white text-xs font-mono font-bold hover:bg-blue-700 transition-all shadow-md shadow-[#1A56DB]/20"
                >
                  Entendido y Finalizar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorValidacion && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="font-medium">{errorValidacion}</span>
                </div>
              )}

              {/* Selector de Tipo de Comunicación */}
              <div>
                <label className="block text-xs font-bold text-[#0E1B2F] font-mono uppercase mb-2">
                  Tipo de Notificación
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {[
                    { id: 'SUGERENCIA', label: 'Sugerencia SST', desc: 'Mejora continua' },
                    { id: 'CONDICION', label: 'Condición Insegura', desc: 'Instalación o equipo' },
                    { id: 'ACTO', label: 'Acto Inseguro', desc: 'Comportamiento en planta' },
                    { id: 'BIENESTAR', label: 'Pausas y Bienestar', desc: 'Salud y ergonomía' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTipo(item.id as typeof tipo)}
                      className={`p-3 rounded-xl border text-left transition-all text-xs min-h-[58px] flex flex-col justify-center ${
                        tipo === item.id
                          ? 'bg-blue-50/80 border-[#1A56DB] text-[#1A56DB] font-bold shadow-xs'
                          : 'bg-[#F8FAFC] border-[#64748B]/20 text-[#0E1B2F] hover:bg-white'
                      }`}
                    >
                      <span className="font-bold block leading-snug break-words">{item.label}</span>
                      <span className="text-[10px] text-[#64748B] font-mono block mt-0.5">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Zona Operativa Relacionada */}
              <div>
                <label className="block text-xs font-bold text-[#0E1B2F] font-mono uppercase mb-1.5">
                  Zona Operativa o Sede
                </label>
                <div className="relative">
                  <select
                    value={zonaId}
                    onChange={(e) => setZonaId(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#64748B]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#0E1B2F] font-medium focus:border-[#1A56DB] focus:bg-white focus:outline-none"
                  >
                    <option value="ZONA-1">Laboratorio de Calidad y Catación (Z-01)</option>
                    <option value="ZONA-2">Sala de Tostaduría y Molienda (Z-02)</option>
                    <option value="ZONA-3">Línea de Envasado al Vacío y Sellado (Z-03)</option>
                    <option value="ZONA-4">Bodega de Almacenamiento y Estibado (Z-04)</option>
                    <option value="ZONA-5">Oficinas Administrativas y SG-SST (Z-05)</option>
                    <option value="ZONA-6">Punto de Encuentro Exterior PE-01 (Z-06)</option>
                    <option value="GENERAL">Instalaciones Generales / Otra Sede</option>
                  </select>
                </div>
              </div>

              {/* Asunto y Descripción */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#0E1B2F] font-mono uppercase mb-1">
                    Título o Asunto Conciso
                  </label>
                  <input
                    type="text"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    placeholder="Ej. Ajuste de luminaria o propuesta de apoyo lumbar"
                    className="w-full bg-[#F8FAFC] border border-[#64748B]/30 rounded-xl px-3.5 py-2 text-xs text-[#0E1B2F] placeholder-[#64748B] focus:border-[#1A56DB] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0E1B2F] font-mono uppercase mb-1">
                    Descripción Detallada del Evento o Sugerencia
                  </label>
                  <textarea
                    rows={4}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Describe los hechos observados, ubicación exacta, riesgo potencial o propuesta de solución constructiva..."
                    className="w-full bg-[#F8FAFC] border border-[#64748B]/30 rounded-xl p-3 text-xs text-[#0E1B2F] placeholder-[#64748B] focus:border-[#1A56DB] focus:bg-white focus:outline-none font-sans leading-relaxed"
                  />
                  <span className="text-[11px] text-[#64748B] font-mono block text-right mt-1">
                    {descripcion.length} caracteres (mínimo 15)
                  </span>
                </div>
              </div>

              {/* Modalidad Anónima o Identificada */}
              <div className="bg-[#F8FAFC] border border-[#64748B]/20 p-3.5 sm:p-4 rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={esAnonimo}
                      onChange={(e) => setEsAnonimo(e.target.checked)}
                      className="w-4 h-4 rounded text-[#1A56DB] border-[#64748B] focus:ring-0 cursor-pointer shrink-0"
                    />
                    <span className="text-xs font-bold text-[#0E1B2F] font-mono leading-tight">
                      Deseo radicar esta comunicación de forma ANÓNIMA
                    </span>
                  </label>
                  <span className="self-start sm:self-auto text-[10px] text-[#0B7A87] font-mono bg-white px-2 py-0.5 rounded border border-[#64748B]/20 flex items-center shrink-0">
                    <Lock className="w-3 h-3 mr-1" />
                    Protección Habeas Data
                  </span>
                </div>

                {!esAnonimo && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-[#64748B]/20 animate-fade-in">
                    <div>
                      <label className="text-[10px] font-mono text-[#64748B] uppercase block">Nombre Completo</label>
                      <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej. Laura Torres"
                        className="w-full bg-white border border-[#64748B]/30 rounded-lg px-2.5 py-1.5 text-xs text-[#0E1B2F]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-[#64748B] uppercase block">Cargo / Área</label>
                      <input
                        type="text"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        placeholder="Ej. Analista Calidad"
                        className="w-full bg-white border border-[#64748B]/30 rounded-lg px-2.5 py-1.5 text-xs text-[#0E1B2F]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-[#64748B] uppercase block">Correo Corporativo</label>
                      <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="correo@andinas.ejemplo.co"
                        className="w-full bg-white border border-[#64748B]/30 rounded-lg px-2.5 py-1.5 text-xs text-[#0E1B2F]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Botones de Acción */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5">
                <button
                  type="button"
                  onClick={resetFormulario}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#64748B]/30 text-[#0E1B2F] text-xs font-mono font-medium hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1A56DB] hover:bg-blue-700 text-white text-xs font-mono font-bold shadow-md shadow-[#1A56DB]/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{enviando ? 'Registrando...' : 'Radicar Oficialmente'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
