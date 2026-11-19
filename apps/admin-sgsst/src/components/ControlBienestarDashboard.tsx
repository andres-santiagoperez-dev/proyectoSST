'use client';

import React, { useState } from 'react';
import { 
  Laptop, 
  TrendingUp, 
  Clock, 
  BellRing, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  Play, 
  RotateCcw,
  Sparkles,
  ChevronDown,
  UserCheck
} from 'lucide-react';

interface EmpleadoPC {
  id: string;
  nombre: string;
  avatarUrl: string;
  departamento: string;
  estado: 'EN_PAUSA' | 'ACTIVO' | 'PROXIMA_PAUSA' | 'OMITIDA';
  tiempoEstado: string;
}

export default function ControlBienestarDashboard() {
  // Configuración interactiva de alertas (Panel derecho)
  const [frecuenciaAlertas, setFrecuenciaAlertas] = useState<number>(60);
  const [duracionPausa, setDuracionPausa] = useState<number>(5);
  const [forzarPantallaCompleta, setForzarPantallaCompleta] = useState<boolean>(true);
  const [permitirPosponer, setPermitirPosponer] = useState<boolean>(true);
  const [sonidoAlerta, setSonidoAlerta] = useState<boolean>(true);

  // Alerta de emergencia lanzada
  const [alertaTransmitida, setAlertaTransmitida] = useState<boolean>(false);

  // Lista de empleados en tiempo real (según la maqueta de referencia)
  const [empleados, setEmpleados] = useState<EmpleadoPC[]>([
    {
      id: 'EMP-01',
      nombre: 'Ana Gómez',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      departamento: 'Soporte',
      estado: 'EN_PAUSA',
      tiempoEstado: '02:15',
    },
    {
      id: 'EMP-02',
      nombre: 'Pedro Ruiz',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      departamento: 'Finanzas',
      estado: 'ACTIVO',
      tiempoEstado: 'Trabajando',
    },
    {
      id: 'EMP-03',
      nombre: 'Clara Benítez',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      departamento: 'Diseño',
      estado: 'PROXIMA_PAUSA',
      tiempoEstado: '3m',
    },
    {
      id: 'EMP-04',
      nombre: 'Diego Martínez',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      departamento: 'Marketing',
      estado: 'OMITIDA',
      tiempoEstado: '',
    },
    {
      id: 'EMP-05',
      nombre: 'Laura Torres',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      departamento: 'Operaciones',
      estado: 'EN_PAUSA',
      tiempoEstado: '04:10',
    },
    {
      id: 'EMP-06',
      nombre: 'Carlos Montoya',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
      departamento: 'Tecnología',
      estado: 'ACTIVO',
      tiempoEstado: 'Trabajando',
    },
  ]);

  // Transmitir pausa de emergencia a todas las PCs
  const lanzarPausaEmergencia = () => {
    // Reproducir tono de campana
    if (sonidoAlerta && typeof window !== 'undefined') {
      try {
        const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
        const ctx = new AudioContext();
        [528, 660, 792, 1056].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + 2.0);
        });
      } catch (e) {
        console.warn('AudioContext bloqueado:', e);
      }
    }

    setAlertaTransmitida(true);
    // Cambiar temporalmente a todos a EN_PAUSA
    setEmpleados((prev) =>
      prev.map((emp) => ({
        ...emp,
        estado: 'EN_PAUSA',
        tiempoEstado: `${duracionPausa.toString().padStart(2, '0')}:00`,
      }))
    );

    setTimeout(() => {
      setAlertaTransmitida(false);
    }, 6000);
  };

  return (
    <div className="space-y-6">
      
      {/* =========================================================================
          1. FILA SUPERIOR DE TELEMETRÍA (PILLS HORIZONTALES)
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Pill 1: PCs Conectadas */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-brand-blue">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 font-semibold block">
              PCs Conectadas:
            </span>
            <span className="text-xl font-black font-outfit text-brand-navy">
              254 <span className="text-sm font-normal text-slate-400">/ 280</span>
            </span>
          </div>
        </div>

        {/* Pill 2: Cumplimiento Hoy */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-vital-emerald">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-500 font-semibold block">
                Cumplimiento Hoy:
              </span>
              <span className="text-xl font-black font-outfit text-vital-emerald">
                88%
              </span>
            </div>
          </div>
          {/* Anillo de progreso circular verde */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="w-10 h-10 transform -rotate-90">
              <circle cx="20" cy="20" r="15" stroke="#E2E8F0" strokeWidth="3" fill="none" />
              <circle
                cx="20"
                cy="20"
                r="15"
                stroke="#10B981"
                strokeWidth="3.5"
                strokeDasharray={94.2}
                strokeDashoffset={94.2 * (1 - 0.88)}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="absolute text-[10px] font-mono font-bold text-vital-emerald">✓</span>
          </div>
        </div>

        {/* Pill 3: Próxima Pausa General */}
        <div className="bg-sky-50 rounded-2xl p-4 border border-sky-200/80 shadow-xs flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-sm">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-sky-800 font-semibold block">
              Próxima Pausa General:
            </span>
            <span className="text-xl font-black font-mono text-sky-950">
              12:45 min
            </span>
          </div>
        </div>
      </div>

      {/* Banner de confirmación cuando se transmite pausa de emergencia */}
      {alertaTransmitida && (
        <div className="p-4 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-between animate-in fade-in duration-300 font-mono text-xs font-bold">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-amber-200 animate-spin" />
            <span>¡PAUSA DE EMERGENCIA TRANSMITIDA CON ÉXITO A LAS 254 PCS CONECTADAS!</span>
          </div>
          <span className="bg-white/20 px-2.5 py-1 rounded-lg">Transmitido ahora</span>
        </div>
      )}

      {/* =========================================================================
          2. CUADRÍCULA PRINCIPAL (COLUMNA IZQUIERDA + COLUMNA DERECHA)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* =======================================================================
            COLUMNA IZQUIERDA (7 COLS): MONITOREO EN TIEMPO REAL + ESTADÍSTICAS
            ======================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Tarjeta: Monitoreo de PCs en Tiempo Real */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-black font-outfit text-brand-navy">
                Monitoreo de PCs en Tiempo Real
              </h3>
              <span className="text-xs font-mono text-slate-500">
                Sincronización WebSocket • Vivo
              </span>
            </div>

            {/* Tabla de Empleados */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#E6FFFA]/80 text-brand-navy font-bold font-mono border-b border-teal-100">
                    <th className="py-3 px-4 rounded-l-xl">Empleado</th>
                    <th className="py-3 px-4">Departamento</th>
                    <th className="py-3 px-4 rounded-r-xl">Estado en su computadora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {empleados.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Avatar y Nombre */}
                      <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center space-x-3">
                        <img
                          src={emp.avatarUrl}
                          alt={emp.nombre}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <span className="font-outfit text-sm">{emp.nombre}</span>
                      </td>

                      {/* Departamento */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {emp.departamento}
                      </td>

                      {/* Badge de Estado con los colores exactos de la paleta */}
                      <td className="py-3.5 px-4">
                        {emp.estado === 'EN_PAUSA' && (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-status-break shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                            <span>En Pausa ({emp.tiempoEstado || '02:15'})</span>
                          </span>
                        )}

                        {emp.estado === 'ACTIVO' && (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-status-active shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                            <span>Activo (Trabajando)</span>
                          </span>
                        )}

                        {emp.estado === 'PROXIMA_PAUSA' && (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-status-upcoming shadow-xs">
                            <Clock className="w-3 h-3" />
                            <span>Próxima Pausa ({emp.tiempoEstado || '3m'})</span>
                          </span>
                        )}

                        {emp.estado === 'OMITIDA' && (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-status-missed shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            <span>Omitida</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tarjeta: Estadísticas de Participación Semanal */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black font-outfit text-brand-navy">
                  Estadísticas de Participación
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  Participación de la Semana
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="flex items-center space-x-1.5 text-slate-600">
                  <span className="w-3 h-3 rounded-xs bg-accent-turquoise"></span>
                  <span>Turno Mañana</span>
                </span>
                <span className="flex items-center space-x-1.5 text-slate-600">
                  <span className="w-3 h-3 rounded-xs bg-brand-blue"></span>
                  <span>Turno Tarde</span>
                </span>
              </div>
            </div>

            {/* Gráfico Semanal de Barras con Curva Verde Esmeralda */}
            <div className="mt-6 relative h-48 w-full select-none">
              
              {/* Eje Y y Líneas de Fondo */}
              <div className="absolute inset-0 flex flex-col justify-between text-[10px] font-mono text-slate-400 pointer-events-none">
                <div className="border-b border-slate-100 pb-1 flex justify-between"><span>80</span></div>
                <div className="border-b border-slate-100 pb-1 flex justify-between"><span>60</span></div>
                <div className="border-b border-slate-100 pb-1 flex justify-between"><span>40</span></div>
                <div className="border-b border-slate-100 pb-1 flex justify-between"><span>20</span></div>
                <div className="border-b border-slate-200 pb-1 flex justify-between"><span>0</span></div>
              </div>

              {/* Contenedor de Barras (Lun a Vie) */}
              <div className="absolute inset-x-8 bottom-6 top-2 flex items-end justify-between z-0">
                {/* Lunes */}
                <div className="flex space-x-1.5 items-end">
                  <div className="w-7 sm:w-8 bg-accent-turquoise rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '72%' }} title="Lunes Mañana: 65%"></div>
                  <div className="w-7 sm:w-8 bg-vital-mint rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '32%' }} title="Lunes Tarde: 28%"></div>
                </div>

                {/* Martes */}
                <div className="flex space-x-1.5 items-end">
                  <div className="w-7 sm:w-8 bg-brand-tealDark rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '52%' }} title="Martes Mañana: 48%"></div>
                  <div className="w-7 sm:w-8 bg-accent-turquoise rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '22%' }} title="Martes Tarde: 19%"></div>
                </div>

                {/* Miércoles */}
                <div className="flex space-x-1.5 items-end">
                  <div className="w-7 sm:w-8 bg-accent-turquoiseLight rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '72%' }} title="Miércoles Mañana: 68%"></div>
                  <div className="w-7 sm:w-8 bg-sky-400 rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '52%' }} title="Miércoles Tarde: 48%"></div>
                </div>

                {/* Jueves */}
                <div className="flex space-x-1.5 items-end">
                  <div className="w-7 sm:w-8 bg-brand-blue rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '88%' }} title="Jueves Mañana: 82%"></div>
                  <div className="w-7 sm:w-8 bg-slate-800 rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '32%' }} title="Jueves Tarde: 28%"></div>
                </div>

                {/* Viernes */}
                <div className="flex space-x-1.5 items-end">
                  <div className="w-7 sm:w-8 bg-vital-forest rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '64%' }} title="Viernes Mañana: 60%"></div>
                  <div className="w-7 sm:w-8 bg-slate-900 rounded-t-lg transition-all duration-500 hover:opacity-90" style={{ height: '14%' }} title="Viernes Tarde: 12%"></div>
                </div>
              </div>

              {/* Curva Verde Esmeralda Fluida (SVG Spline) */}
              <svg className="absolute inset-x-8 bottom-6 top-2 w-[calc(100%-4rem)] h-[calc(100%-2rem)] z-10 pointer-events-none overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 150">
                <defs>
                  <linearGradient id="splineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Área sombreada bajo la curva */}
                <path
                  d="M 25 80 Q 140 110, 250 50 T 475 110 L 475 150 L 25 150 Z"
                  fill="url(#splineGradient)"
                />
                {/* Línea de trazo suave */}
                <path
                  d="M 25 80 Q 140 110, 250 50 T 475 110"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Etiquetas del Eje X */}
              <div className="absolute inset-x-8 bottom-0 flex justify-between text-xs font-mono font-bold text-slate-600">
                <span className="w-16 text-center">Lun</span>
                <span className="w-16 text-center">Mar</span>
                <span className="w-16 text-center">Mié</span>
                <span className="w-16 text-center">Jue</span>
                <span className="w-16 text-center">Vie</span>
              </div>
            </div>
          </div>

        </div>

        {/* =======================================================================
            COLUMNA DERECHA (5 COLS): CONFIGURACIÓN DE ALERTAS + VISTA PREVIA PC
            ======================================================================= */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Tarjeta: Configuración de Alertas */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <BellRing className="w-5 h-5 text-brand-tealDark" />
              <h3 className="text-lg font-black font-outfit text-brand-navy">
                Configuración de Alertas
              </h3>
            </div>

            {/* Slider: Frecuencia de Alertas */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold font-mono text-slate-700">
                <span>Frecuencia de Alertas</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-brand-blue font-bold">
                  {frecuenciaAlertas} min
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="120"
                step="5"
                value={frecuenciaAlertas}
                onChange={(e) => setFrecuenciaAlertas(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
              />
            </div>

            {/* Slider: Duración de Pausa */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold font-mono text-slate-700">
                <span>Duración de Pausa</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-teal-50 text-accent-turquoise font-bold">
                  {duracionPausa} min
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={duracionPausa}
                onChange={(e) => setDuracionPausa(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accent-turquoise"
              />
            </div>

            {/* Switches de Control */}
            <div className="space-y-3 pt-2 border-t border-slate-100 text-xs font-medium text-slate-700">
              
              {/* Forzar pantalla completa */}
              <div className="flex items-center justify-between">
                <span>Forzar pantalla completa</span>
                <button
                  onClick={() => setForzarPantallaCompleta(!forzarPantallaCompleta)}
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                    forzarPantallaCompleta ? 'bg-vital-emerald justify-end' : 'bg-slate-300 justify-start'
                  }`}
                  role="switch"
                  aria-checked={forzarPantallaCompleta}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
                </button>
              </div>

              {/* Permitir posponer */}
              <div className="flex items-center justify-between">
                <span>Permitir posponer (máx. 1)</span>
                <button
                  onClick={() => setPermitirPosponer(!permitirPosponer)}
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                    permitirPosponer ? 'bg-vital-emerald justify-end' : 'bg-slate-300 justify-start'
                  }`}
                  role="switch"
                  aria-checked={permitirPosponer}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
                </button>
              </div>

              {/* Sonido de alerta */}
              <div className="flex items-center justify-between">
                <span>Sonido de alerta</span>
                <button
                  onClick={() => setSonidoAlerta(!sonidoAlerta)}
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                    sonidoAlerta ? 'bg-vital-emerald justify-end' : 'bg-slate-300 justify-start'
                  }`}
                  role="switch"
                  aria-checked={sonidoAlerta}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
                </button>
              </div>
            </div>

            {/* BOTÓN: LANZAR PAUSA DE EMERGENCIA (COLOR EXACTO AGUA MARINA OSCURO #0B7A87) */}
            <div className="pt-2">
              <button
                onClick={lanzarPausaEmergencia}
                className="w-full py-3.5 px-4 rounded-2xl bg-brand-tealDark hover:bg-[#09626c] text-white font-mono text-xs sm:text-sm font-bold shadow-md shadow-brand-tealDark/25 transition-all flex items-center justify-center space-x-2 group active:scale-[0.98]"
              >
                <BellRing className="w-4 h-4 text-white group-hover:animate-bounce" />
                <span>Lanzar Pausa de Emergencia</span>
              </button>
            </div>
          </div>

          {/* Tarjeta: Vista Previa del Aviso en la PC */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Vista Previa del Aviso en la PC
            </h4>

            {/* Marco de Monitor Realista */}
            <div className="relative pt-2 pb-4 flex flex-col items-center">
              
              {/* Pantalla del monitor */}
              <div className="w-full bg-slate-900 rounded-2xl p-2.5 shadow-xl border border-slate-700">
                {/* Bisel interior y pantalla */}
                <div className="bg-sky-50 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-sky-100">
                  
                  {/* Ilustración de personaje estirando hombros y cuello */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
                      {/* Silla de oficina ergonómica */}
                      <rect x="35" y="65" width="50" height="45" rx="10" fill="#1E293B" />
                      <line x1="60" y1="105" x2="60" y2="118" stroke="#334155" strokeWidth="4" />
                      <line x1="45" y1="118" x2="75" y2="118" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

                      {/* Torso apoyado reclinado hacia atrás */}
                      <path d="M48 65 C48 55, 72 55, 72 65 L76 95 L44 95 Z" fill="#2563EB" />
                      {/* Corbata o detalle */}
                      <path d="M58 65 L60 82 L62 65 Z" fill="#14B8A6" />

                      {/* Cabeza reclinada descansando */}
                      <circle cx="60" cy="40" r="13" fill="#F8FAFC" stroke="#0E1B2F" strokeWidth="1.5" />
                      <path d="M53 35 Q60 30 67 35" fill="#1E293B" />
                      {/* Ojos cerrados de alivio */}
                      <path d="M54 40 Q57 42 60 40" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M62 40 Q65 42 68 40" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M57 46 Q60 48 63 46" stroke="#1E293B" strokeWidth="1" strokeLinecap="round" />

                      {/* Brazos cruzados detrás de la cabeza relajando hombros */}
                      <path d="M48 62 C38 48, 48 35, 54 36" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" />
                      <path d="M72 62 C82 48, 72 35, 66 36" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="56" cy="35" r="4" fill="#F8FAFC" />
                      <circle cx="64" cy="35" r="4" fill="#F8FAFC" />
                    </svg>
                  </div>

                  {/* Texto y Botones de la Alerta del PC */}
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <h5 className="font-extrabold font-outfit text-sm text-slate-900 leading-tight">
                      ¡Es hora de tu <br className="hidden sm:inline" />
                      <span className="text-brand-blue">Pausa Activa!</span>
                    </h5>

                    <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-slate-700 font-mono text-sm font-bold">
                      <Clock className="w-4 h-4 text-brand-tealDark" />
                      <span>{duracionPausa.toString().padStart(2, '0')}:00</span>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start space-x-2 pt-1">
                      <button
                        onClick={() => alert(`Iniciando pausa guiada de ${duracionPausa} minutos`)}
                        className="px-3.5 py-1.5 rounded-xl bg-vital-emerald text-white text-[11px] font-mono font-bold hover:bg-emerald-600 transition-colors shadow-xs"
                      >
                        Comenzar
                      </button>
                      <button
                        onClick={() => alert('Pausa pospuesta 5 minutos')}
                        className="px-3 py-1.5 rounded-xl bg-sky-100 text-sky-800 text-[11px] font-mono hover:bg-sky-200 transition-colors"
                      >
                        Posponer (5 min)
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Base y soporte del monitor */}
              <div className="w-8 h-4 bg-slate-700 -mt-1 z-0"></div>
              <div className="w-24 h-2 bg-slate-800 rounded-full shadow-sm"></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
