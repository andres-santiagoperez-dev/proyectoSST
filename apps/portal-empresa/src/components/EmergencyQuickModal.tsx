'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { 
  AlertTriangle, 
  PhoneCall, 
  Radio, 
  PowerOff, 
  MapPin, 
  X, 
  ExternalLink, 
  ShieldAlert,
  Copy,
  Check,
  Phone
} from 'lucide-react';
import { PROTOCOLO_EMERGENCIA } from '@/data/normas-sst';
import { registrarAuditoria } from '@/lib/audit';

interface EmergencyQuickModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyQuickModal({ isOpen, onClose }: EmergencyQuickModalProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Registro en bitácora de auditoría y sonido de alerta al abrir
  useEffect(() => {
    if (isOpen) {
      // 1. Bitácora inmutable SG-SST (Decreto 1072/2015)
      try {
        registrarAuditoria(
          'operador.planta@andinas.ejemplo.co',
          'COLABORADOR',
          'CREAR',
          'PROTOCOLO_EMERGENCIA',
          'SOS-ACTIVO',
          'Activación de protocolo de emergencia en 1 clic (Código Rojo) desde portal público.'
        );
      } catch (e) {
        console.warn('Auditoría SOS local:', e);
      }

      // 2. Chime de alerta sonora suave (Dos tonos de advertencia F5 -> C5)
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(698.46, ctx.currentTime); // F5
        osc.frequency.setValueAtTime(523.25, ctx.currentTime + 0.15); // C5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
      } catch {
        // Audio deshabilitado en navegador
      }
    }
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevenir scroll en body cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  if (!isOpen || !mounted) return null;

  // React Portal directo a document.body para evitar que backdrop-filter o sticky en el header creen un containing block
  return createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-modal-title"
    >
      {/* Backdrop click to close */}
      <div className="fixed inset-0 bg-transparent" onClick={onClose} />

      {/* Contenedor del Modal centrado vertical y horizontalmente */}
      <div className="relative w-full max-w-2xl my-auto bg-[#0E1726] border-2 border-[#EF4444] rounded-2xl shadow-2xl shadow-red-950/70 overflow-hidden text-white z-10 font-sans flex flex-col max-h-[90vh]">
        
        {/* Banner Superior Rojo Señal (Header fijo del modal) */}
        <div className="bg-[#EF4444] px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
            </span>
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-white" />
              <h2 id="emergency-modal-title" className="text-sm sm:text-base font-black tracking-wider uppercase font-mono text-white">
                Protocolo de Emergencia en 1 Clic
              </h2>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="Cerrar modal de emergencia"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subcabecera informativa */}
        <div className="px-5 py-2.5 bg-[#080E1E] border-b border-[#1E293B] text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <span className="font-mono text-red-400 font-semibold flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>ESTADO CRÍTICO // CÓDIGO ROJO OPERATIVO</span>
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Sede Principal // S.G.S.S.T
          </span>
        </div>

        {/* Cuerpo del Modal con Acciones Rápidas (Scrollable) */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* Tarjeta 1: Líneas Telefónicas de Socorro */}
          <div className="bg-[#0B132B] border border-[#1E293B] hover:border-red-500/40 rounded-xl p-4 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 rounded-lg bg-red-500/15 text-[#EF4444] shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Líneas Directas de Socorro
                    <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/60">
                      Inmediato
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Comunícate de inmediato con la central distrital de emergencias o la línea prioritaria de ARL Bolívar.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <a
                      href="tel:123"
                      className="px-3.5 py-1.5 rounded-lg bg-[#EF4444] hover:bg-red-600 text-white font-mono text-xs font-bold flex items-center space-x-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Llamar al 123 (Emergencias Nacional)</span>
                    </a>
                    <a
                      href="tel:%23322"
                      className="px-3.5 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-red-200 font-mono text-xs font-bold flex items-center space-x-1.5 active:scale-95 transition-all cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-red-400" />
                      <span>Llamar #322 (ARL Bolívar)</span>
                    </a>
                    <button
                      onClick={() => copyToClipboard('#322', 'ARL')}
                      className="px-3 py-1.5 rounded-lg bg-[#1E293B] hover:bg-slate-700 text-slate-300 font-mono text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                      title="Copiar número de ARL al portapapeles"
                    >
                      {copiedText === 'ARL' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copiar #322</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Canal de Radio y Brigada Interna */}
          <div className="bg-[#0B132B] border border-[#1E293B] hover:border-cyan-500/40 rounded-xl p-4 transition-all">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/15 text-[#06B6D4] shrink-0">
                <Radio className="w-5 h-5" />
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    Frecuencia de Radio // Brigada de Emergencia
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                    {PROTOCOLO_EMERGENCIA.brigadaCanal}
                  </span>
                </div>
                <div className="mt-2 text-xs text-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
                  <div className="p-2 rounded bg-[#080E1E] border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Frecuencia VHF/UHF:</span>
                    <strong className="text-cyan-300 text-xs">{PROTOCOLO_EMERGENCIA.frecuenciaRadio}</strong>
                  </div>
                  <div className="p-2 rounded bg-[#080E1E] border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Extensión Telefónica Interna:</span>
                    <strong className="text-cyan-300 text-xs">{PROTOCOLO_EMERGENCIA.extensionInterna}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 3: Pulsador de Parada de Emergencia (E-Stop) */}
          <div className="bg-[#0B132B] border border-[#1E293B] hover:border-amber-500/40 rounded-xl p-4 transition-all">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 rounded-lg bg-amber-500/15 text-[#F59E0B] shrink-0">
                <PowerOff className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Parada de Emergencia de Planta (E-Stop)
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    LOTO
                  </span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {PROTOCOLO_EMERGENCIA.paradaEmergencia.procedimiento}
                </p>
                <div className="mt-2 text-[11px] font-mono text-amber-200/90 bg-amber-950/40 p-2 rounded border border-amber-900/40">
                  📍 Ubicación física: {PROTOCOLO_EMERGENCIA.paradaEmergencia.ubicacion}
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 4: Punto de Encuentro PE-01 & Plano */}
          <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-4 transition-all">
            <div className="flex items-start space-x-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/20 text-[#10B981] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    Punto de Encuentro Exterior (PE-01)
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    ZONA SEGURA
                  </span>
                </div>
                <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
                  {PROTOCOLO_EMERGENCIA.puntoEncuentro}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href="/plano?simular=true"
                    onClick={onClose}
                    className="px-3.5 py-1.5 rounded-lg bg-[#10B981] hover:bg-emerald-600 text-[#0E1B2F] font-mono text-xs font-bold flex items-center space-x-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Abrir Simulación en Plano CAD</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer del Modal (Fijo al pie del modal) */}
        <div className="px-5 py-3 bg-[#080E1E] border-t border-[#1E293B] flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-400 font-mono text-[11px]">
            Presiona <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">ESC</kbd> para cerrar
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-semibold transition-colors cursor-pointer"
          >
            Entendido / Cerrar
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
