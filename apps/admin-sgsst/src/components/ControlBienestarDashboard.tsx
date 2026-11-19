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
  UserCheck,
  Send,
  Filter,
  Check
} from 'lucide-react';
import MannequinAnimation from './MannequinAnimation';

interface EmpleadoPC {
  id: string;
  nombre: string;
  avatarUrl: string;
  departamento: string;
  estado: 'EN_PAUSA' | 'ACTIVO' | 'PROXIMA_PAUSA' | 'OMITIDA';
  tiempoEstado: string;
}

export default function ControlBienestarDashboard() {
  const [frecuenciaAlertas, setFrecuenciaAlertas] = useState<number>(60);
  const [duracionPausa, setDuracionPausa] = useState<number>(5);
  const [forzarPantallaCompleta, setForzarPantallaCompleta] = useState<boolean>(true);
  const [permitirPosponer, setPermitirPosponer] = useState<boolean>(true);
  const [sonidoAlerta, setSonidoAlerta] = useState<boolean>(true);

  // Filtro por departamento
  const [departamentoFiltro, setDepartamentoFiltro] = useState<string>('TODOS');
  
  // Alerta de emergencia lanzada
  const [alertaTransmitida, setAlertaTransmitida] = useState<boolean>(false);
  const [recordatorioEnviado, setRecordatorioEnviado] = useState<string | null>(null);

  // Lista de empleados en tiempo real
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
    // Cambiar a todos los empleados a EN_PAUSA
    setEmpleados((prev) =>
      prev.map((emp) => ({
        ...emp,
        estado: 'EN_PAUSA',
        tiempoEstado: `${duracionPausa.toString().padStart(2, '0')}:00`,
      }))
    );

    setTimeout(() => {
      setAlertaTransmitida(false);
    }, 7000);
  };

  const enviarRecordatorioIndividual = (id: string, nombre: string) => {
    setRecordatorioEnviado(nombre);
    setEmpleados((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, estado: 'PROXIMA_PAUSA', tiempoEstado: '1m' } : emp))
    );
    setTimeout(() => setRecordatorioEnviado(null), 3000);
  };

  const departamentosUnicos = ['TODOS', 'Soporte', 'Finanzas', 'Diseño', 'Marketing', 'Operaciones', 'Tecnología'];

  const empleadosFiltrados = departamentoFiltro === 'TODOS'
    ? empleados
    : empleados.filter((e) => e.departamento.toLowerCase() === departamentoFiltro.toLowerCase());

  return (
    <div className="space-y-6">
      
      {/* =========================================================================
          1. FILA SUPERIOR DE TELEMETRÍA (PILLS HORIZONTALES - IMPECCABLE CRAFT)
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Pill 1: PCs Conectadas */}
        <div className="bg-white rounded-2xl p-4 border border-[#64748B]/20 shadow-xs flex items-center space-x-3.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1A56DB]">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono text-[#64748B] font-semibold block">
              PCs Conectadas:
            </span>
            <span className="text-xl font-black font-outfit text-[#0E1B2F] num-tabular">
              254 <span className="text-sm font-normal text-[#64748B]">/ 280</span>
            </span>
          </div>
        </div>

        {/* Pill 2: Cumplimiento Hoy */}
        <div className="bg-white rounded-2xl p-4 border border-[#64748B]/20 shadow-xs flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#10B981]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#64748B] font-semibold block">
                Cumplimiento Hoy:
              </span>
              <span className="text-xl font-black font-outfit text-[#10B981] num-tabular">
                88%
              </span>
            </div>
          </div>
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
            <span className="absolute text-[10px] font-mono font-bold text-[#10B981]">✓</span>
          </div>
        </div>

        {/* Pill 3: Próxima Pausa General */}
        <div className="bg-white rounded-2xl p-4 border border-[#64748B]/20 shadow-xs flex items-center space-x-3.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-[#0B7A87] flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#0B7A87]" />
          </div>
          <div>
            <span className="text-xs font-mono text-[#64748B] font-semibold block">
              Próxima Pausa General:
            </span>
            <span className="text-xl font-black font-mono text-[#0E1B2F] num-tabular">
              12:45 min
            </span>
          </div>
        </div>
      </div>

      {/* Banner de confirmación cuando se transmite pausa de emergencia */}
      {alertaTransmitida && (
        <div className="p-4 bg-[#10B981] text-white rounded-2xl shadow-lg shadow-[#10B981]/25 flex items-center justify-between animate-in fade-in zoom-in-95 duration-200 font-mono text-xs font-bold">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-white animate-spin" />
            <span>¡PAUSA DE EMERGENCIA TRANSMITIDA CON ÉXITO A LAS 254 PCS CONECTADAS!</span>
          </div>
          <span className="bg-white/20 px-2.5 py-1 rounded-lg">Transmitido en vivo</span>
        </div>
      )}

      {/* Banner cuando se envía recordatorio individual */}
      {recordatorioEnviado && (
        <div className="p-3 bg-[#1A56DB] text-white rounded-2xl shadow-md shadow-[#1A56DB]/20 flex items-center justify-between animate-in fade-in duration-200 font-mono text-xs font-semibold">
          <span>Notificación enviada a la pantalla de <strong>{recordatorioEnviado}</strong></span>
          <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">PC Sincronizada</span>
        </div>
      )}

      {/* =========================================================================
          2. CUADRÍCULA PRINCIPAL
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMNA IZQUIERDA (7 COLS): MONITOREO + ESTADÍSTICAS */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Tarjeta: Monitoreo de PCs en Tiempo Real */}
          <div className="bg-white rounded-3xl p-6 border border-[#64748B]/20 shadow-xs overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-lg font-black font-outfit text-[#0E1B2F]">
                  Monitoreo de PCs en Tiempo Real
                </h3>
                <span className="text-xs font-mono text-[#64748B]">
                  Sincronización WebSocket • Red Local de la Empresa
                </span>
              </div>

              {/* Filtro por Departamento */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                {departamentosUnicos.slice(0, 4).map((dep) => (
                  <button
                    key={dep}
                    onClick={() => setDepartamentoFiltro(dep)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                      departamentoFiltro === dep
                        ? 'bg-[#1A56DB] text-white font-bold'
                        : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100 border border-[#64748B]/20'
                    }`}
                  >
                    {dep}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabla de Empleados */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] text-[#0E1B2F] font-bold font-mono border-b border-[#64748B]/15">
                    <th className="py-3 px-4 rounded-l-xl">Empleado</th>
                    <th className="py-3 px-4">Departamento</th>
                    <th className="py-3 px-4">Estado en su PC</th>
                    <th className="py-3 px-4 rounded-r-xl text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {empleadosFiltrados.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-[#0E1B2F] flex items-center space-x-3">
                        <img
                          src={emp.avatarUrl}
                          alt={emp.nombre}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <span className="font-outfit text-sm font-bold">{emp.nombre}</span>
                      </td>

                      <td className="py-3.5 px-4 text-[#64748B] font-medium">
                        {emp.departamento}
                      </td>

                      {/* Badges de Estado con los Colores Oficiales */}
                      <td className="py-3.5 px-4">
                        {emp.estado === 'EN_PAUSA' && (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#10B981] shadow-xs num-tabular">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                            <span>En Pausa ({emp.tiempoEstado || '02:15'})</span>
                          </span>
                        )}

                        {emp.estado === 'ACTIVO' && (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#2563EB] shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                            <span>Activo (Trabajando)</span>
                          </span>
                        )}

                        {emp.estado === 'PROXIMA_PAUSA' && (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#06B6D4] shadow-xs num-tabular">
                            <Clock className="w-3 h-3" />
                            <span>Próxima Pausa ({emp.tiempoEstado || '3m'})</span>
                          </span>
                        )}

                        {emp.estado === 'OMITIDA' && (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#1E293B] shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            <span>Omitida</span>
                          </span>
                        )}
                      </td>

                      {/* Botón de acción individual */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => enviarRecordatorioIndividual(emp.id, emp.nombre)}
                          className="p-1.5 rounded-lg text-[#1A56DB] hover:bg-blue-50 transition-colors"
                          title="Enviar aviso a la PC"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tarjeta: Estadísticas de Participación Semanal */}
          <div className="bg-white rounded-3xl p-6 border border-[#64748B]/20 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black font-outfit text-[#0E1B2F]">
                  Estadísticas de Participación
                </h3>
                <span className="text-xs font-mono text-[#64748B]">
                  Participación de la Semana por Turno
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="flex items-center space-x-1.5 text-[#64748B]">
                  <span className="w-3 h-3 rounded-xs bg-[#14B8A6]"></span>
                  <span>Turno Mañana</span>
                </span>
                <span className="flex items-center space-x-1.5 text-[#64748B]">
                  <span className="w-3 h-3 rounded-xs bg-[#1A56DB]"></span>
                  <span>Turno Tarde</span>
                </span>
              </div>
            </div>

            {/* Gráfico Semanal de Barras con Curva Verde Esmeralda */}
            <div className="mt-6 relative h-48 w-full select-none">
              <div className="absolute inset-0 flex flex-col justify-between text-[10px] font-mono text-[#64748B]/60 pointer-events-none">
                <div className="border-b border-slate-100 pb-1 flex justify-between"><span>80</span></div>
                <div className="border-b border-slate-100 pb-1 flex justify-between"><span>60</span></div>
                <div className="border-b border-slate-100 pb-1 flex justify-between"><span>40</span></div>
                <div className="border-b border-slate-100 pb-1 flex justify-between"><span>20</span></div>
                <div className="border-b border-slate-100 pb-1 flex justify-between"><span>0</span></div>
              </div>

              {/* SVG de las curvas y barras */}
              <svg className="w-full h-full pt-2 pb-6 px-4" viewBox="0 0 500 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradCurvaVerde" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Barras Lunes */}
                <rect x="35" y="45" width="16" height="105" rx="3" fill="#14B8A6" opacity="0.9" />
                <rect x="55" y="65" width="16" height="85" rx="3" fill="#1A56DB" opacity="0.9" />

                {/* Barras Martes */}
                <rect x="135" y="35" width="16" height="115" rx="3" fill="#14B8A6" opacity="0.9" />
                <rect x="155" y="50" width="16" height="100" rx="3" fill="#1A56DB" opacity="0.9" />

                {/* Barras Miércoles */}
                <rect x="235" y="55" width="16" height="95" rx="3" fill="#14B8A6" opacity="0.9" />
                <rect x="255" y="70" width="16" height="80" rx="3" fill="#1A56DB" opacity="0.9" />

                {/* Barras Jueves */}
                <rect x="335" y="25" width="16" height="125" rx="3" fill="#14B8A6" opacity="0.9" />
                <rect x="355" y="40" width="16" height="110" rx="3" fill="#1A56DB" opacity="0.9" />

                {/* Barras Viernes */}
                <rect x="435" y="40" width="16" height="110" rx="3" fill="#14B8A6" opacity="0.9" />
                <rect x="455" y="60" width="16" height="90" rx="3" fill="#1A56DB" opacity="0.9" />

                {/* Área sombreada bajo la curva verde esmeralda */}
                <path
                  d="M 53 55 C 153 38, 253 62, 353 30 S 453 50, 453 50 L 453 150 L 53 150 Z"
                  fill="url(#gradCurvaVerde)"
                />

                {/* Curva Verde Esmeralda (#10B981) */}
                <path
                  d="M 53 55 C 153 38, 253 62, 353 30 S 453 50, 453 50"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Puntos de datos */}
                <circle cx="53" cy="55" r="4.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                <circle cx="153" cy="42" r="4.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                <circle cx="253" cy="62" r="4.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                <circle cx="353" cy="32" r="4.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                <circle cx="453" cy="50" r="4.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
              </svg>

              {/* Rótulos de los días de la semana */}
              <div className="flex justify-between px-6 pt-1 text-xs font-mono text-[#64748B] font-bold">
                <span>Lun</span>
                <span>Mar</span>
                <span>Mié</span>
                <span>Jue</span>
                <span>Vie</span>
              </div>
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA (5 COLS): CONFIGURACIÓN DE ALERTAS + VISTA PREVIA PC */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Tarjeta: Configuración de Alertas */}
          <div className="bg-white rounded-3xl p-6 border border-[#64748B]/20 shadow-xs space-y-5">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <BellRing className="w-5 h-5 text-[#0B7A87]" />
              <h3 className="text-lg font-black font-outfit text-[#0E1B2F]">
                Configuración de Alertas
              </h3>
            </div>

            {/* Slider: Frecuencia de Alertas */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold font-mono text-[#0E1B2F]">
                <span>Frecuencia de Alertas</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-[#1A56DB] font-bold num-tabular">
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
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1A56DB]"
              />
            </div>

            {/* Slider: Duración de Pausa */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold font-mono text-[#0E1B2F]">
                <span>Duración de Pausa</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-teal-50 text-[#0B7A87] font-bold num-tabular">
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
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#14B8A6]"
              />
            </div>

            {/* Switches de Control */}
            <div className="space-y-3 pt-2 border-t border-slate-100 text-xs font-semibold text-[#0E1B2F]">
              
              <div className="flex items-center justify-between">
                <span>Forzar pantalla completa</span>
                <button
                  onClick={() => setForzarPantallaCompleta(!forzarPantallaCompleta)}
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                    forzarPantallaCompleta ? 'bg-[#10B981] justify-end' : 'bg-slate-300 justify-start'
                  }`}
                  role="switch"
                  aria-checked={forzarPantallaCompleta}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>Permitir posponer (máx. 1)</span>
                <button
                  onClick={() => setPermitirPosponer(!permitirPosponer)}
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                    permitirPosponer ? 'bg-[#10B981] justify-end' : 'bg-slate-300 justify-start'
                  }`}
                  role="switch"
                  aria-checked={permitirPosponer}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>Sonido de alerta</span>
                <button
                  onClick={() => setSonidoAlerta(!sonidoAlerta)}
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                    sonidoAlerta ? 'bg-[#10B981] justify-end' : 'bg-slate-300 justify-start'
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
                className="w-full py-3.5 px-4 rounded-2xl bg-[#0B7A87] hover:bg-[#09626c] text-white font-mono text-xs sm:text-sm font-bold shadow-md shadow-[#0B7A87]/25 transition-all flex items-center justify-center space-x-2 group active:scale-[0.98]"
              >
                <BellRing className="w-4 h-4 text-white group-hover:animate-bounce" />
                <span>Lanzar Pausa de Emergencia</span>
              </button>
            </div>
          </div>

          {/* Tarjeta: Vista Previa del Aviso en la PC (REACTIVA CON LA PAUSA DE EMERGENCIA) */}
          <div className="bg-white rounded-3xl p-6 border border-[#64748B]/20 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider">
                Vista Previa del Aviso en la PC
              </h4>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                alertaTransmitida ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' : 'bg-slate-100 text-[#64748B]'
              }`}>
                {alertaTransmitida ? '🔴 ALERTA EN PANTALLA' : 'Modo Espera'}
              </span>
            </div>

            {/* Marco de Monitor Realista */}
            <div className="relative pt-2 pb-4 flex flex-col items-center">
              
              {/* Pantalla del monitor */}
              <div className="w-full bg-[#0E1B2F] rounded-2xl p-2.5 shadow-xl border border-slate-700">
                <div className="bg-sky-50 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-sky-100 relative overflow-hidden">
                  
                  {/* Si la alerta está transmitida, mostrar animación viva */}
                  {alertaTransmitida && (
                    <div className="absolute top-1 right-2 text-[9px] font-mono font-bold text-red-600 bg-white px-2 py-0.5 rounded shadow-xs">
                      Pausa General Activa
                    </div>
                  )}

                  {/* Ilustración de personaje estirando hombros y cuello */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
                      <rect x="35" y="65" width="50" height="45" rx="10" fill="#1E293B" />
                      <line x1="60" y1="105" x2="60" y2="118" stroke="#334155" strokeWidth="4" />
                      <line x1="45" y1="118" x2="75" y2="118" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

                      <path d="M48 65 C48 55, 72 55, 72 65 L76 95 L44 95 Z" fill="#2563EB" />
                      <path d="M58 65 L60 82 L62 65 Z" fill="#14B8A6" />

                      <circle cx="60" cy="40" r="13" fill="#F8FAFC" stroke="#0E1B2F" strokeWidth="1.5" />
                      <path d="M53 35 Q60 30 67 35" fill="#1E293B" />
                      <path d="M54 40 Q57 42 60 40" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M62 40 Q65 42 68 40" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M57 46 Q60 48 63 46" stroke="#1E293B" strokeWidth="1" strokeLinecap="round" />

                      <path d="M48 62 C38 48, 48 35, 54 36" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" />
                      <path d="M72 62 C82 48, 72 35, 66 36" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" />
                      <circle cx="56" cy="35" r="4" fill="#F8FAFC" />
                      <circle cx="64" cy="35" r="4" fill="#F8FAFC" />
                    </svg>
                  </div>

                  {/* Texto y Botones de la Alerta del PC */}
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <h5 className="font-extrabold font-outfit text-sm text-[#0E1B2F] leading-tight">
                      ¡Es hora de tu <br className="hidden sm:inline" />
                      <span className="text-[#1A56DB]">Pausa Activa!</span>
                    </h5>

                    <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-[#0E1B2F] font-mono text-sm font-bold num-tabular">
                      <Clock className="w-4 h-4 text-[#0B7A87]" />
                      <span>{duracionPausa.toString().padStart(2, '0')}:00</span>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start space-x-2 pt-1">
                      <a
                        href="http://localhost:3021"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-[#10B981] text-white text-[11px] font-mono font-bold hover:bg-emerald-600 transition-colors shadow-xs"
                      >
                        Comenzar
                      </a>
                      <button
                        onClick={() => alert('Pausa pospuesta 5 minutos')}
                        className="px-3 py-1.5 rounded-xl bg-sky-100 text-sky-800 text-[11px] font-mono hover:bg-sky-200 transition-colors"
                      >
                        Posponer
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
