'use client';

import React, { useState, useEffect } from 'react';
import { 
  Laptop, 
  TrendingUp, 
  Clock, 
  BellRing, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  VolumeX,
  Play, 
  RotateCcw,
  Sparkles,
  ChevronDown,
  UserCheck,
  Send,
  Filter,
  Check,
  Search,
  Monitor,
  Maximize2,
  Radio,
  Coffee,
  Activity,
  ShieldCheck,
  Table,
  BarChart3,
  XCircle,
  X,
  Info
} from 'lucide-react';
import MannequinAnimation from './MannequinAnimation';

export type EstadoPuesto = 'ACTIVO' | 'EN_PAUSA' | 'PROXIMA_PAUSA' | 'OMITIDA';

export interface EmpleadoPC {
  id: string;
  puestoId: string;
  nombre: string;
  avatarUrl: string;
  departamento: 'Soporte' | 'Finanzas' | 'Diseño' | 'Marketing' | 'Operaciones' | 'Tecnología';
  estado: EstadoPuesto;
  tiempoEstado: string;
  ipEstacion: string;
  posposicionesHoy: number;
}

export default function ControlBienestarDashboard() {
  // =========================================================================
  // 1. ESTADOS DE CONFIGURACIÓN Y NORMATIVA DE BIENESTAR
  // =========================================================================
  const [frecuenciaAlertas, setFrecuenciaAlertas] = useState<number>(60); // 45m / 60m / 90m
  const [duracionPausa, setDuracionPausa] = useState<number>(5); // 3m / 5m / 10m
  const [forzarPantallaCompleta, setForzarPantallaCompleta] = useState<boolean>(true);
  const [politicaPosposicion, setPoliticaPosposicion] = useState<'MAX_1' | 'MAX_2' | 'SIN_POSPOSICION'>('MAX_1');
  const [sonidoAlerta, setSonidoAlerta] = useState<boolean>(true);

  // Filtros y Búsqueda
  const [departamentoFiltro, setDepartamentoFiltro] = useState<string>('TODOS');
  const [estadoFiltro, setEstadoFiltro] = useState<string>('TODOS');
  const [busqueda, setBusqueda] = useState<string>('');

  // Estados de Despacho y Feedback
  const [alertaTransmitida, setAlertaTransmitida] = useState<boolean>(false);
  const [alertaSegundosRestantes, setAlertaSegundosRestantes] = useState<number>(0);
  const [mostrarModalTransmision, setMostrarModalTransmision] = useState<boolean>(false);
  const [nudgedIds, setNudgedIds] = useState<Record<string, boolean>>({});
  const [bannerRecordatorio, setBannerRecordatorio] = useState<{ nombre: string; puesto: string } | null>(null);

  // Monitor Desktop Mockup
  const [vistaMockup, setVistaMockup] = useState<'NOTIFICACION' | 'BLOQUEO'>('NOTIFICACION');
  const [vistaEstadisticas, setVistaEstadisticas] = useState<'GRAFICA' | 'TABLA'>('GRAFICA');

  // =========================================================================
  // 2. COLABORADORES Y TELEMETRÍA EN TIEMPO REAL (12 ESTACIONES DISTRIBUIDAS)
  // =========================================================================
  const [empleados, setEmpleados] = useState<EmpleadoPC[]>([
    {
      id: 'EMP-01',
      puestoId: 'WS-SOP-01',
      nombre: 'Ana Gómez',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      departamento: 'Soporte',
      estado: 'EN_PAUSA',
      tiempoEstado: '02:15',
      ipEstacion: '192.168.10.45',
      posposicionesHoy: 0,
    },
    {
      id: 'EMP-02',
      puestoId: 'WS-FIN-01',
      nombre: 'Pedro Ruiz',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      departamento: 'Finanzas',
      estado: 'ACTIVO',
      tiempoEstado: '42 min activo',
      ipEstacion: '192.168.10.72',
      posposicionesHoy: 0,
    },
    {
      id: 'EMP-03',
      puestoId: 'WS-DIS-01',
      nombre: 'Clara Benítez',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      departamento: 'Diseño',
      estado: 'PROXIMA_PAUSA',
      tiempoEstado: '3m aviso',
      ipEstacion: '192.168.10.88',
      posposicionesHoy: 1,
    },
    {
      id: 'EMP-04',
      puestoId: 'WS-MKT-01',
      nombre: 'Diego Martínez',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      departamento: 'Marketing',
      estado: 'OMITIDA',
      tiempoEstado: 'Pendiente reagendar',
      ipEstacion: '192.168.10.104',
      posposicionesHoy: 1,
    },
    {
      id: 'EMP-05',
      puestoId: 'WS-OPE-01',
      nombre: 'Laura Torres',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      departamento: 'Operaciones',
      estado: 'EN_PAUSA',
      tiempoEstado: '04:10',
      ipEstacion: '192.168.10.51',
      posposicionesHoy: 0,
    },
    {
      id: 'EMP-06',
      puestoId: 'WS-TEC-01',
      nombre: 'Carlos Montoya',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
      departamento: 'Tecnología',
      estado: 'ACTIVO',
      tiempoEstado: '51 min activo',
      ipEstacion: '192.168.10.15',
      posposicionesHoy: 0,
    },
    {
      id: 'EMP-07',
      puestoId: 'WS-SOP-02',
      nombre: 'David Ramos',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
      departamento: 'Soporte',
      estado: 'ACTIVO',
      tiempoEstado: '38 min activo',
      ipEstacion: '192.168.10.46',
      posposicionesHoy: 0,
    },
    {
      id: 'EMP-08',
      puestoId: 'WS-FIN-02',
      nombre: 'Valentina Meza',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
      departamento: 'Finanzas',
      estado: 'PROXIMA_PAUSA',
      tiempoEstado: '1m aviso',
      ipEstacion: '192.168.10.73',
      posposicionesHoy: 0,
    },
    {
      id: 'EMP-09',
      puestoId: 'WS-DIS-02',
      nombre: 'Mateo Silva',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
      departamento: 'Diseño',
      estado: 'EN_PAUSA',
      tiempoEstado: '01:45',
      ipEstacion: '192.168.10.89',
      posposicionesHoy: 0,
    },
    {
      id: 'EMP-10',
      puestoId: 'WS-MKT-02',
      nombre: 'Sofía Vargas',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80',
      departamento: 'Marketing',
      estado: 'ACTIVO',
      tiempoEstado: '25 min activo',
      ipEstacion: '192.168.10.105',
      posposicionesHoy: 0,
    },
    {
      id: 'EMP-11',
      puestoId: 'WS-OPE-02',
      nombre: 'Jorge Cárdenas',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
      departamento: 'Operaciones',
      estado: 'OMITIDA',
      tiempoEstado: 'Pendiente reagendar',
      ipEstacion: '192.168.10.52',
      posposicionesHoy: 1,
    },
    {
      id: 'EMP-12',
      puestoId: 'WS-TEC-02',
      nombre: 'Andrés Bernal',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
      departamento: 'Tecnología',
      estado: 'ACTIVO',
      tiempoEstado: '58 min activo',
      ipEstacion: '192.168.10.16',
      posposicionesHoy: 0,
    },
  ]);

  // Colaborador actualmente seleccionado para simulación en pantalla
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<EmpleadoPC>(empleados[2]); // Clara Benítez

  // =========================================================================
  // 3. SÍNTESIS DE AUDIO CON WEB AUDIO API
  // =========================================================================
  const reproducirTonoAlerta = (tipo: 'EMERGENCIA' | 'NUDGE') => {
    if (!sonidoAlerta || typeof window === 'undefined') return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;
      const ctx = new AudioCtxClass();

      if (tipo === 'EMERGENCIA') {
        // Armónicos síncronos (528Hz, 660Hz, 792Hz, 1056Hz)
        const frecuencias = [528, 660, 792, 1056];
        frecuencias.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.0001, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + 2.0);
        });
      } else {
        // Nudge individual: dos notas gentiles y nítidas (587.33Hz -> 880Hz)
        [587.33, 880].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.0001, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.12);
          osc.stop(ctx.currentTime + 0.6);
        });
      }
    } catch (err) {
      console.warn('AudioContext no disponible o bloqueado por el navegador:', err);
    }
  };

  // Temporizador para cuenta regresiva durante la pausa de emergencia colectiva
  useEffect(() => {
    if (!alertaTransmitida) return;
    const interval = setInterval(() => {
      setAlertaSegundosRestantes((prev) => {
        if (prev <= 1) {
          setAlertaTransmitida(false);
          setMostrarModalTransmision(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [alertaTransmitida]);

  // =========================================================================
  // 4. ACCIONES DE TRANSMISIÓN Y NUDGE
  // =========================================================================
  const lanzarPausaEmergencia = () => {
    reproducirTonoAlerta('EMERGENCIA');
    setAlertaTransmitida(true);
    const duracionSegundos = duracionPausa * 60;
    setAlertaSegundosRestantes(duracionSegundos);
    setVistaMockup('BLOQUEO');
    setMostrarModalTransmision(true);

    // Cambiar masivamente a todos los colaboradores al estado EN_PAUSA
    setEmpleados((prev) =>
      prev.map((emp) => ({
        ...emp,
        estado: 'EN_PAUSA',
        tiempoEstado: `${duracionPausa.toString().padStart(2, '0')}:00`,
      }))
    );
  };

  const detenerPausaEmergencia = () => {
    setAlertaTransmitida(false);
    setAlertaSegundosRestantes(0);
    setMostrarModalTransmision(false);
    setVistaMockup('NOTIFICACION');
  };

  const enviarRecordatorioIndividual = (emp: EmpleadoPC) => {
    // 1. Tono háptico auditivo Web Audio
    reproducirTonoAlerta('NUDGE');

    // 2. Feedback táctil inmediato: Check verde animado y deshabilitación temporal
    setNudgedIds((prev) => ({ ...prev, [emp.id]: true }));
    setEmpleadoSeleccionado(emp);
    setVistaMockup('NOTIFICACION');
    setBannerRecordatorio({ nombre: emp.nombre, puesto: emp.puestoId });

    // 3. Actualizar estado del colaborador a PROXIMA_PAUSA
    setEmpleados((prev) =>
      prev.map((e) =>
        e.id === emp.id
          ? { ...e, estado: 'PROXIMA_PAUSA', tiempoEstado: '1m (Aviso enviado)' }
          : e
      )
    );

    // 4. Limpiar banner tras 3.5s y rehabilitar botón tras 4s
    setTimeout(() => {
      setBannerRecordatorio(null);
    }, 3500);

    setTimeout(() => {
      setNudgedIds((prev) => ({ ...prev, [emp.id]: false }));
    }, 4000);
  };

  // =========================================================================
  // 5. CÁLCULO DE TELEMETRÍA Y FILTRADO
  // =========================================================================
  const departamentos = ['TODOS', 'Soporte', 'Finanzas', 'Diseño', 'Marketing', 'Operaciones', 'Tecnología'];

  const conteoActivos = empleados.filter((e) => e.estado === 'ACTIVO').length;
  const conteoEnPausa = empleados.filter((e) => e.estado === 'EN_PAUSA').length;
  const conteoProxima = empleados.filter((e) => e.estado === 'PROXIMA_PAUSA').length;
  const conteoOmitida = empleados.filter((e) => e.estado === 'OMITIDA').length;

  const empleadosFiltrados = empleados.filter((e) => {
    const coincideDepto = departamentoFiltro === 'TODOS' || e.departamento === departamentoFiltro;
    const coincideEstado = estadoFiltro === 'TODOS' || e.estado === estadoFiltro;
    const coincideBusqueda = 
      busqueda.trim() === '' ||
      e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.puestoId.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.departamento.toLowerCase().includes(busqueda.toLowerCase());
    return coincideDepto && coincideEstado && coincideBusqueda;
  });

  // Datos para Estadísticas Semanales y Tabla Tabular
  const datosSemanales = [
    { dia: 'Lunes', manana: 88, tarde: 82, total: 85.0, participantes: 238, estado: 'Óptimo' },
    { dia: 'Martes', manana: 92, tarde: 86, total: 89.0, participantes: 249, estado: 'Óptimo' },
    { dia: 'Miércoles', manana: 84, tarde: 79, total: 81.5, participantes: 228, estado: 'Aceptable' },
    { dia: 'Jueves', manana: 95, tarde: 91, total: 93.0, participantes: 260, estado: 'Óptimo' },
    { dia: 'Viernes', manana: 89, tarde: 84, total: 86.5, participantes: 242, estado: 'Óptimo' },
  ];

  return (
    <div className="space-y-6">
      
      {/* =========================================================================
          BANNER INFORMATIVO DE DESPACHO COLECTIVO (CUANDO LA ALERTA ESTÁ TRANSMITIENDO)
          ========================================================================= */}
      {alertaTransmitida && (
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0B7A87] via-[#10B981] to-[#047857] text-white rounded-3xl shadow-xl shadow-[#10B981]/20 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-white animate-spin" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
                  Transmisión Masiva Activa
                </span>
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              </div>
              <h2 className="text-base sm:text-lg font-black font-outfit mt-0.5 truncate">
                Pausa de Emergencia Colectiva Sincronizada en 254 PCs
              </h2>
              <p className="text-xs font-mono text-white/90 truncate">
                Bloqueo normativo en curso • Tiempo restante: <strong className="num-tabular text-white underline">{Math.floor(alertaSegundosRestantes / 60)}:{(alertaSegundosRestantes % 60).toString().padStart(2, '0')} min</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setMostrarModalTransmision(true)}
              className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-mono text-xs font-bold transition-colors"
            >
              Ver Panel en Red
            </button>
            <button
              onClick={detenerPausaEmergencia}
              className="px-4 py-2 rounded-xl bg-white text-[#0B7A87] font-mono text-xs font-bold hover:bg-slate-100 transition-colors shadow-xs active:scale-95"
            >
              Finalizar Pausa
            </button>
          </div>
        </div>
      )}

      {/* Banner de Feedback Táctil cuando se envía Nudge individual */}
      {bannerRecordatorio && !alertaTransmitida && (
        <div className="p-3.5 bg-[#1A56DB] text-white rounded-2xl shadow-lg shadow-[#1A56DB]/25 flex items-center justify-between animate-in fade-in duration-200 font-mono text-xs font-medium">
          <div className="flex items-center space-x-2.5 truncate">
            <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="truncate">
              Aviso preventivo enviado con éxito al puesto <strong>{bannerRecordatorio.puesto}</strong> ({bannerRecordatorio.nombre})
            </span>
          </div>
          <span className="bg-white/20 px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider shrink-0 ml-2">
            PC Sincronizada
          </span>
        </div>
      )}

      {/* =========================================================================
          FILA SUPERIOR: PILLS DE TELEMETRÍA Y RESUMEN DE ESTADOS NORMATIVOS
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Pill 1: PCs Conectadas Total */}
        <div className="bg-white rounded-3xl p-5 border border-[#64748B]/20 shadow-xs flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#1A56DB] shrink-0">
              <Laptop className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-mono text-[#64748B] font-semibold block uppercase tracking-wider truncate">
                PCs Conectadas
              </span>
              <span className="text-xl sm:text-2xl font-black font-outfit text-[#0E1B2F] num-tabular block truncate">
                254 <span className="text-xs font-normal text-[#64748B]">/ 280 (90.7%)</span>
              </span>
            </div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] ring-4 ring-[#10B981]/20 shrink-0 ml-2"></div>
        </div>

        {/* Pill 2: Cumplimiento de Hoy */}
        <div className="bg-white rounded-3xl p-5 border border-[#64748B]/20 shadow-xs flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-[#10B981] shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-mono text-[#64748B] font-semibold block uppercase tracking-wider truncate">
                Cumplimiento Hoy
              </span>
              <span className="text-xl sm:text-2xl font-black font-outfit text-[#10B981] num-tabular block truncate">
                88.4%
              </span>
            </div>
          </div>
          <div className="relative w-10 h-10 flex items-center justify-center shrink-0 ml-2">
            <svg className="w-10 h-10 transform -rotate-90">
              <circle cx="20" cy="20" r="15" stroke="#E2E8F0" strokeWidth="3" fill="none" />
              <circle
                cx="20"
                cy="20"
                r="15"
                stroke="#10B981"
                strokeWidth="3.5"
                strokeDasharray={94.2}
                strokeDashoffset={94.2 * (1 - 0.884)}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="absolute text-[10px] font-mono font-bold text-[#10B981]">✓</span>
          </div>
        </div>

        {/* Pill 3: Próxima Pausa General Programada */}
        <div className="bg-white rounded-3xl p-5 border border-[#64748B]/20 shadow-xs flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200/80 flex items-center justify-center text-[#06B6D4] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-mono text-[#64748B] font-semibold block uppercase tracking-wider truncate">
                Próxima Pausa Red
              </span>
              <span className="text-xl sm:text-2xl font-black font-mono text-[#0E1B2F] num-tabular block truncate">
                12:45 min
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-cyan-50 text-[#06B6D4] font-bold border border-cyan-200/60 shrink-0 ml-2">
            Auto
          </span>
        </div>

        {/* Pill 4: Botón de Audio y Protocolo Normativo */}
        <div className="bg-white rounded-3xl p-5 border border-[#64748B]/20 shadow-xs flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-[#0B7A87] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-mono text-[#64748B] font-semibold block uppercase tracking-wider truncate">
                Protocolo SG-SST
              </span>
              <span className="text-sm font-black font-outfit text-[#0E1B2F] block truncate">
                Res. 0312 / GTC 45
              </span>
            </div>
          </div>
          <button
            onClick={() => reproducirTonoAlerta('NUDGE')}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B7A87] transition-colors shrink-0 ml-2"
            title="Probar tono de audio Web Audio"
            aria-label="Probar tono de audio"
          >
            {sonidoAlerta ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>

      </div>

      {/* =========================================================================
          DISTRIBUCIÓN DE LOS 4 ESTADOS NORMATIVOS (BADGES OBLIGATORIOS)
          ========================================================================= */}
      <div className="bg-white rounded-3xl p-5 border border-[#64748B]/20 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-xs font-mono font-bold text-[#0E1B2F] uppercase tracking-wider flex items-center space-x-2">
              <span>Distribución en Vivo de los 4 Estados Normativos</span>
              <span className="text-[10px] text-[#64748B] font-normal hidden sm:inline">(Monitoreo Telemetría PC)</span>
            </h4>
          </div>
          <span className="text-[11px] font-mono text-[#64748B]">
            Filtro rápido por estado:
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3">
          
          {/* 1. Activo (en su PC): #2563EB (Azul Enérgico) */}
          <button
            onClick={() => setEstadoFiltro(estadoFiltro === 'ACTIVO' ? 'TODOS' : 'ACTIVO')}
            className={`p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              estadoFiltro === 'ACTIVO'
                ? 'bg-blue-50/80 border-[#2563EB] ring-2 ring-[#2563EB]/30'
                : 'bg-[#F8FAFC] border-[#64748B]/20 hover:border-[#2563EB]/40'
            }`}
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <span className="w-3.5 h-3.5 rounded-full bg-[#2563EB] ring-4 ring-[#2563EB]/20 shrink-0"></span>
              <div className="min-w-0">
                <span className="text-xs font-outfit font-bold text-[#0E1B2F] block truncate leading-tight">
                  Activo (en PC)
                </span>
                <span className="text-[10px] font-mono text-[#64748B] block truncate mt-0.5">
                  Trabajando
                </span>
              </div>
            </div>
            <span className="text-base font-black font-outfit text-[#2563EB] num-tabular shrink-0 pl-1">
              {conteoActivos}
            </span>
          </button>

          {/* 2. En Pausa (cumpliendo rutina): #10B981 (Verde Esmeralda) */}
          <button
            onClick={() => setEstadoFiltro(estadoFiltro === 'EN_PAUSA' ? 'TODOS' : 'EN_PAUSA')}
            className={`p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              estadoFiltro === 'EN_PAUSA'
                ? 'bg-emerald-50/80 border-[#10B981] ring-2 ring-[#10B981]/30'
                : 'bg-[#F8FAFC] border-[#64748B]/20 hover:border-[#10B981]/40'
            }`}
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <span className="w-3.5 h-3.5 rounded-full bg-[#10B981] ring-4 ring-[#10B981]/20 animate-pulse shrink-0"></span>
              <div className="min-w-0">
                <span className="text-xs font-outfit font-bold text-[#0E1B2F] block truncate leading-tight">
                  En Pausa
                </span>
                <span className="text-[10px] font-mono text-[#64748B] block truncate mt-0.5">
                  En rutina activa
                </span>
              </div>
            </div>
            <span className="text-base font-black font-outfit text-[#10B981] num-tabular shrink-0 pl-1">
              {conteoEnPausa}
            </span>
          </button>

          {/* 3. Próxima Pausa (aviso preventivo): #06B6D4 (Agua Marina) */}
          <button
            onClick={() => setEstadoFiltro(estadoFiltro === 'PROXIMA_PAUSA' ? 'TODOS' : 'PROXIMA_PAUSA')}
            className={`p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              estadoFiltro === 'PROXIMA_PAUSA'
                ? 'bg-cyan-50/80 border-[#06B6D4] ring-2 ring-[#06B6D4]/30'
                : 'bg-[#F8FAFC] border-[#64748B]/20 hover:border-[#06B6D4]/40'
            }`}
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <span className="w-3.5 h-3.5 rounded-full bg-[#06B6D4] ring-4 ring-[#06B6D4]/20 shrink-0"></span>
              <div className="min-w-0">
                <span className="text-xs font-outfit font-bold text-[#0E1B2F] block truncate leading-tight">
                  Próxima Pausa
                </span>
                <span className="text-[10px] font-mono text-[#64748B] block truncate mt-0.5">
                  Aviso (≤ 3 min)
                </span>
              </div>
            </div>
            <span className="text-base font-black font-outfit text-[#06B6D4] num-tabular shrink-0 pl-1">
              {conteoProxima}
            </span>
          </button>

          {/* 4. Omitida (pausa no realizada): #1E293B (Azul Grisáceo Oscuro - neutro, no punitivo) */}
          <button
            onClick={() => setEstadoFiltro(estadoFiltro === 'OMITIDA' ? 'TODOS' : 'OMITIDA')}
            className={`p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
              estadoFiltro === 'OMITIDA'
                ? 'bg-slate-100 border-[#1E293B] ring-2 ring-[#1E293B]/20'
                : 'bg-[#F8FAFC] border-[#64748B]/20 hover:border-[#1E293B]/40'
            }`}
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <span className="w-3.5 h-3.5 rounded-full bg-[#1E293B] shrink-0"></span>
              <div className="min-w-0">
                <span className="text-xs font-outfit font-bold text-[#0E1B2F] block truncate leading-tight">
                  Omitida
                </span>
                <span className="text-[10px] font-mono text-[#64748B] block truncate mt-0.5">
                  Reagendar
                </span>
              </div>
            </div>
            <span className="text-base font-black font-outfit text-[#1E293B] num-tabular shrink-0 pl-1">
              {conteoOmitida}
            </span>
          </button>

        </div>
      </div>

      {/* =========================================================================
          ÁREA PRINCIPAL EN DOS COLUMNAS:
          COLUMNA IZQUIERDA (7 COLS): TABLA DE TELEMETRÍA + FILTROS + ESTADÍSTICAS
          COLUMNA DERECHA (5 COLS): DESPACHO MASIVO + CONFIGURACIÓN + DESKTOP MOCKUP
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* =====================================================================
            COLUMNA IZQUIERDA (7 COLUMNAS)
            ===================================================================== */}
        <div className="lg:col-span-7 space-y-6 min-w-0">
          
          {/* TARJETA 1: TABLA DE MONITOREO EN TIEMPO REAL */}
          <div className="bg-white rounded-3xl p-6 border border-[#64748B]/20 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h3 className="text-lg font-black font-outfit text-[#0E1B2F]">
                  Monitoreo en Tiempo Real de Puestos PC
                </h3>
                <span className="text-xs font-mono text-[#64748B]">
                  Sincronización Local WebSocket • 254 PCs Conectadas en Sede Principal
                </span>
              </div>

              {/* Búsqueda rápida */}
              <div className="relative w-full sm:w-auto">
                <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar colaborador o puesto..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-[#64748B]/20 text-xs font-mono text-[#0E1B2F] placeholder-[#64748B]/60 focus:outline-hidden focus:border-[#1A56DB] bg-[#F8FAFC] w-full sm:w-56"
                />
              </div>
            </div>

            {/* FILTROS RÁPIDOS POR DEPARTAMENTO (6 ÁREAS NORMATIVAS) */}
            <div className="py-3 flex items-center space-x-1.5 overflow-x-auto pb-2 -mb-1">
              <span className="text-[11px] font-mono text-[#64748B] shrink-0 mr-1 flex items-center">
                <Filter className="w-3 h-3 mr-1" /> Área:
              </span>
              {departamentos.map((dep) => (
                <button
                  key={dep}
                  onClick={() => setDepartamentoFiltro(dep)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-150 shrink-0 cursor-pointer ${
                    departamentoFiltro === dep
                      ? 'bg-[#1A56DB] text-white font-bold shadow-xs'
                      : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0E1B2F] hover:bg-slate-100 border border-[#64748B]/20'
                  }`}
                >
                  {dep}
                </button>
              ))}
            </div>

            {/* TABLA DE EMPLEADOS CON MIN-WIDTH PREVINIENDO TEXTO RECORTADO */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs min-w-[640px]">
                <thead>
                  <tr className="bg-[#F8FAFC] text-[#0E1B2F] font-bold font-mono border-b border-[#64748B]/15">
                    <th className="py-3 px-3.5 rounded-l-xl">Colaborador / Puesto</th>
                    <th className="py-3 px-3">Departamento</th>
                    <th className="py-3 px-3">Estado en su PC</th>
                    <th className="py-3 px-3.5 rounded-r-xl text-right">Acción Individual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {empleadosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-[#64748B] font-mono text-xs">
                        No se encontraron colaboradores que coincidan con los filtros aplicados.
                      </td>
                    </tr>
                  ) : (
                    empleadosFiltrados.map((emp) => {
                      const isNudged = nudgedIds[emp.id];
                      const isSelected = empleadoSeleccionado?.id === emp.id;

                      return (
                        <tr 
                          key={emp.id} 
                          className={`transition-colors cursor-pointer ${
                            isSelected ? 'bg-blue-50/40' : 'hover:bg-slate-50/80'
                          }`}
                          onClick={() => setEmpleadoSeleccionado(emp)}
                        >
                          {/* Columna: Nombre e ID de Puesto */}
                          <td className="py-3 px-3.5 font-semibold text-[#0E1B2F]">
                            <div className="flex items-center space-x-3">
                              <img
                                src={emp.avatarUrl}
                                alt={emp.nombre}
                                className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="font-outfit text-sm font-bold text-[#0E1B2F] block leading-tight truncate">
                                  {emp.nombre}
                                </span>
                                <span className="text-[10px] font-mono text-[#64748B] flex items-center space-x-1">
                                  <span>{emp.puestoId}</span>
                                  <span>•</span>
                                  <span>{emp.ipEstacion}</span>
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Columna: Departamento */}
                          <td className="py-3 px-3 text-[#64748B] font-medium">
                            <span className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#64748B]/20 text-[11px] font-mono text-[#0E1B2F] whitespace-nowrap">
                              {emp.departamento}
                            </span>
                          </td>

                          {/* Columna: Badges de Estado con los 4 Tokens Obligatorios */}
                          <td className="py-3 px-3">
                            {/* ESTADO 1: ACTIVO -> #2563EB (Azul Enérgico) */}
                            {emp.estado === 'ACTIVO' && (
                              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#2563EB] shadow-xs whitespace-nowrap">
                                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                                <span>Activo ({emp.tiempoEstado})</span>
                              </span>
                            )}

                            {/* ESTADO 2: EN PAUSA -> #10B981 (Verde Esmeralda) */}
                            {emp.estado === 'EN_PAUSA' && (
                              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#10B981] shadow-xs num-tabular whitespace-nowrap">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                                <span>En Pausa ({emp.tiempoEstado})</span>
                              </span>
                            )}

                            {/* ESTADO 3: PRÓXIMA PAUSA -> #06B6D4 (Agua Marina) */}
                            {emp.estado === 'PROXIMA_PAUSA' && (
                              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#06B6D4] shadow-xs num-tabular whitespace-nowrap">
                                <Clock className="w-3 h-3 text-white" />
                                <span>Próxima Pausa ({emp.tiempoEstado})</span>
                              </span>
                            )}

                            {/* ESTADO 4: OMITIDA -> #1E293B (Azul Grisáceo Oscuro - neutro, no punitivo) */}
                            {emp.estado === 'OMITIDA' && (
                              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#1E293B] shadow-xs whitespace-nowrap" title="Pausa pendiente de reagendamiento">
                                <Coffee className="w-3 h-3 text-slate-300" />
                                <span>Omitida (Reagendar)</span>
                              </span>
                            )}
                          </td>

                          {/* Columna: Botón Nudge con Feedback Táctil Inmediato */}
                          <td className="py-3 px-3.5 text-right whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                enviarRecordatorioIndividual(emp);
                              }}
                              disabled={isNudged}
                              aria-label={`Enviar recordatorio individual a ${emp.nombre}`}
                              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
                                isNudged
                                  ? 'bg-[#10B981] text-white cursor-default scale-95 shadow-md shadow-[#10B981]/25 ring-2 ring-[#10B981]/30'
                                  : 'bg-blue-50 text-[#1A56DB] hover:bg-[#1A56DB] hover:text-white border border-blue-200/60 active:scale-95'
                              }`}
                              title={isNudged ? 'Recordatorio enviado' : 'Enviar aviso inmediato (Nudge)'}
                            >
                              {isNudged ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-white animate-in zoom-in duration-200" />
                                  <span>Enviado</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-3 h-3" />
                                  <span>Avisar PC</span>
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
              <span>Mostrando {empleadosFiltrados.length} de {empleados.length} puestos monitorizados</span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#10B981] inline-block"></span>
                <span>Latencia de red: 18ms</span>
              </span>
            </div>
          </div>

          {/* TARJETA 2: ESTADÍSTICAS DE CUMPLIMIENTO SEMANAL (GRÁFICA Y TABLA TABULAR) */}
          <div className="bg-white rounded-3xl p-6 border border-[#64748B]/20 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
              <div>
                <h3 className="text-lg font-black font-outfit text-[#0E1B2F]">
                  Cumplimiento Semanal de Pausas Activas
                </h3>
                <span className="text-xs font-mono text-[#64748B]">
                  Medición de adherencia ergonómica conforme a estándares GTC 45 y Res. 0312
                </span>
              </div>

              {/* Selector de Vista: Gráfico vs Tabla Tabular */}
              <div className="flex items-center space-x-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#64748B]/20 self-start sm:self-auto">
                <button
                  onClick={() => setVistaEstadisticas('GRAFICA')}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    vistaEstadisticas === 'GRAFICA'
                      ? 'bg-white text-[#0E1B2F] font-bold shadow-xs'
                      : 'text-[#64748B] hover:text-[#0E1B2F]'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-[#1A56DB]" />
                  <span>Gráfica</span>
                </button>
                <button
                  onClick={() => setVistaEstadisticas('TABLA')}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    vistaEstadisticas === 'TABLA'
                      ? 'bg-white text-[#0E1B2F] font-bold shadow-xs'
                      : 'text-[#64748B] hover:text-[#0E1B2F]'
                  }`}
                >
                  <Table className="w-3.5 h-3.5 text-[#0B7A87]" />
                  <span>Porcentajes Tabulares</span>
                </button>
              </div>
            </div>

            {vistaEstadisticas === 'GRAFICA' ? (
              <div>
                {/* Leyenda */}
                <div className="flex flex-wrap items-center justify-between text-xs font-mono pt-3 pb-2 text-[#64748B] gap-2">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-3 h-3 rounded-xs bg-[#14B8A6]"></span>
                      <span>Turno Mañana (09:30 AM)</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <span className="w-3 h-3 rounded-xs bg-[#1A56DB]"></span>
                      <span>Turno Tarde (03:30 PM)</span>
                    </span>
                  </div>
                  <span className="flex items-center space-x-1 text-[#047857] font-semibold">
                    <span className="w-2.5 h-0.5 bg-[#10B981] inline-block"></span>
                    <span>Meta SG-SST: 85%</span>
                  </span>
                </div>

                {/* Gráfico Semanal de Barras con Curva Verde Esmeralda */}
                <div className="mt-4 relative h-48 w-full select-none">
                  {/* Líneas guía de fondo */}
                  <div className="absolute inset-0 flex flex-col justify-between text-[10px] font-mono text-[#64748B]/50 pointer-events-none">
                    <div className="border-b border-slate-100 pb-0.5 flex justify-between"><span>100%</span></div>
                    <div className="border-b border-slate-100 pb-0.5 flex justify-between"><span>80%</span></div>
                    <div className="border-b border-slate-100 pb-0.5 flex justify-between"><span>60%</span></div>
                    <div className="border-b border-slate-100 pb-0.5 flex justify-between"><span>40%</span></div>
                    <div className="border-b border-slate-100 pb-0.5 flex justify-between"><span>20%</span></div>
                  </div>

                  {/* SVG interactivo con barras y curva de cumplimiento */}
                  <svg className="w-full h-full pt-1 pb-5 px-3" viewBox="0 0 500 160" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradCurvaEsmeralda" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.30" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Barras Lunes: Mañana 88% (h=95), Tarde 82% (h=88) */}
                    <rect x="35" y="45" width="16" height="95" rx="3" fill="#14B8A6" opacity="0.9" />
                    <rect x="55" y="55" width="16" height="85" rx="3" fill="#1A56DB" opacity="0.9" />

                    {/* Barras Martes: Mañana 92%, Tarde 86% */}
                    <rect x="135" y="38" width="16" height="102" rx="3" fill="#14B8A6" opacity="0.9" />
                    <rect x="155" y="48" width="16" height="92" rx="3" fill="#1A56DB" opacity="0.9" />

                    {/* Barras Miércoles: Mañana 84%, Tarde 79% */}
                    <rect x="235" y="52" width="16" height="88" rx="3" fill="#14B8A6" opacity="0.9" />
                    <rect x="255" y="62" width="16" height="78" rx="3" fill="#1A56DB" opacity="0.9" />

                    {/* Barras Jueves: Mañana 95%, Tarde 91% */}
                    <rect x="335" y="32" width="16" height="108" rx="3" fill="#14B8A6" opacity="0.9" />
                    <rect x="355" y="40" width="16" height="100" rx="3" fill="#1A56DB" opacity="0.9" />

                    {/* Barras Viernes: Mañana 89%, Tarde 84% */}
                    <rect x="435" y="44" width="16" height="96" rx="3" fill="#14B8A6" opacity="0.9" />
                    <rect x="455" y="52" width="16" height="88" rx="3" fill="#1A56DB" opacity="0.9" />

                    {/* Área sombreada bajo la curva verde esmeralda */}
                    <path
                      d="M 53 50 C 153 42, 253 58, 353 36 S 453 48, 453 48 L 453 140 L 53 140 Z"
                      fill="url(#gradCurvaEsmeralda)"
                    />

                    {/* Curva Verde Esmeralda (#10B981) */}
                    <path
                      d="M 53 50 C 153 42, 253 58, 353 36 S 453 48, 453 48"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Puntos de datos */}
                    <circle cx="53" cy="50" r="4.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                    <circle cx="153" cy="42" r="4.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                    <circle cx="253" cy="58" r="4.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                    <circle cx="353" cy="36" r="4.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                    <circle cx="453" cy="48" r="4.5" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                  </svg>

                  {/* Días de la semana con responsive labels para evitar recortes */}
                  <div className="flex justify-between px-6 pt-1 text-[11px] sm:text-xs font-mono text-[#64748B] font-bold">
                    <span><span className="hidden sm:inline">Lunes</span><span className="sm:hidden">Lun</span> (85%)</span>
                    <span><span className="hidden sm:inline">Martes</span><span className="sm:hidden">Mar</span> (89%)</span>
                    <span><span className="hidden sm:inline">Miércoles</span><span className="sm:hidden">Mié</span> (81.5%)</span>
                    <span><span className="hidden sm:inline">Jueves</span><span className="sm:hidden">Jue</span> (93%)</span>
                    <span><span className="hidden sm:inline">Viernes</span><span className="sm:hidden">Vie</span> (86.5%)</span>
                  </div>
                </div>
              </div>
            ) : (
              /* TABLA DE PORCENTAJES TABULARES (REQUISITO DE ACCESIBILIDAD SG-SST) */
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-left text-xs min-w-[560px]">
                  <thead>
                    <tr className="bg-[#F8FAFC] text-[#0E1B2F] font-bold font-mono border-b border-[#64748B]/15">
                      <th className="py-2.5 px-3 rounded-l-lg">Día Laboral</th>
                      <th className="py-2.5 px-3">Turno Mañana</th>
                      <th className="py-2.5 px-3">Turno Tarde</th>
                      <th className="py-2.5 px-3">Cumplimiento Global</th>
                      <th className="py-2.5 px-3">Colaboradores</th>
                      <th className="py-2.5 px-3 rounded-r-lg text-right">Estado Normativo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {datosSemanales.map((item) => (
                      <tr key={item.dia} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-[#0E1B2F]">{item.dia}</td>
                        <td className="py-2.5 px-3 text-[#14B8A6] font-semibold num-tabular">{item.manana}%</td>
                        <td className="py-2.5 px-3 text-[#1A56DB] font-semibold num-tabular">{item.tarde}%</td>
                        <td className="py-2.5 px-3 font-bold text-[#10B981] num-tabular">{item.total}%</td>
                        <td className="py-2.5 px-3 text-[#64748B] num-tabular">{item.participantes} PCs</td>
                        <td className="py-2.5 px-3 text-right">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            item.total >= 85 
                              ? 'bg-emerald-50 text-[#047857] border border-emerald-200'
                              : 'bg-cyan-50 text-[#0B7A87] border border-cyan-200'
                          }`}>
                            {item.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* =====================================================================
            COLUMNA DERECHA (5 COLUMNAS):
            DESPACHO CENTRAL + CONFIGURACIONES + DESKTOP MOCKUP REACTIVO
            ===================================================================== */}
        <div className="lg:col-span-5 space-y-6 min-w-0">
          
          {/* TARJETA 3: DESPACHO CENTRAL Y TRANSMISIÓN DE EMERGENCIA */}
          <div className="bg-white rounded-3xl p-6 border border-[#64748B]/20 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 text-[#0B7A87] flex items-center justify-center shrink-0">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black font-outfit text-[#0E1B2F]">
                    Despacho Central de Alertas
                  </h3>
                  <span className="text-[11px] font-mono text-[#64748B]">
                    Transmisión Síncrona Colectiva a Red Corporativa
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed">
              Activa la pausa obligatoria simultánea en todas las pantallas de la organización con tono sonoro Web Audio y bloqueo temporal ergonómico.
            </p>

            {/* BOTÓN DE ACCIÓN: TRANSMISIÓN MASIVA DE PAUSA DE EMERGENCIA */}
            <button
              onClick={alertaTransmitida ? detenerPausaEmergencia : lanzarPausaEmergencia}
              className={`w-full py-4 px-5 rounded-2xl font-mono text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center justify-center space-x-2.5 active:scale-98 cursor-pointer ${
                alertaTransmitida
                  ? 'bg-[#1E293B] hover:bg-[#0E1B2F] text-white shadow-slate-900/20'
                  : 'bg-[#0B7A87] hover:bg-[#09636e] text-white shadow-[#0B7A87]/30 ring-2 ring-[#0B7A87]/20'
              }`}
            >
              <BellRing className={`w-4 h-4 text-white ${alertaTransmitida ? 'animate-pulse' : 'animate-bounce'}`} />
              <span className="truncate">
                {alertaTransmitida ? 'Liberar Estaciones (Finalizar Transmisión)' : 'Lanzar Pausa de Emergencia Colectiva'}
              </span>
            </button>
          </div>

          {/* TARJETA 4: CONFIGURACIONES DE BIENESTAR Y ESTÁNDARES SG-SST */}
          <div className="bg-white rounded-3xl p-6 border border-[#64748B]/20 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black font-outfit text-[#0E1B2F] flex items-center space-x-2">
                <span>Configuraciones de Bienestar</span>
              </h3>
              <span className="text-[10px] font-mono text-[#10B981] font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
                Res. 0312
              </span>
            </div>

            {/* Frecuencia de Pausas: Segmented Control (45m / 60m / 90m) + Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold font-mono text-[#0E1B2F]">
                <span>Frecuencia de Pausas en Red</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-[#1A56DB] font-bold num-tabular border border-blue-200/60">
                  Cada {frecuenciaAlertas} min
                </span>
              </div>

              {/* Botones de Presets Obligatorios */}
              <div className="grid grid-cols-3 gap-1.5">
                {[45, 60, 90].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setFrecuenciaAlertas(mins)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer ${
                      frecuenciaAlertas === mins
                        ? 'bg-[#1A56DB] text-white shadow-xs'
                        : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100 border border-[#64748B]/20'
                    }`}
                  >
                    {mins} min
                  </button>
                ))}
              </div>

              <input
                type="range"
                min="15"
                max="120"
                step="5"
                value={frecuenciaAlertas}
                onChange={(e) => setFrecuenciaAlertas(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#14B8A6]"
              />
            </div>

            {/* Duración de Pausas: Segmented Control (3m / 5m / 10m) + Slider */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center text-xs font-semibold font-mono text-[#0E1B2F]">
                <span>Duración de la Rutina</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-teal-50 text-[#0B7A87] font-bold num-tabular border border-teal-200/60">
                  {duracionPausa} min
                </span>
              </div>

              {/* Botones de Presets Obligatorios */}
              <div className="grid grid-cols-3 gap-1.5">
                {[3, 5, 10].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDuracionPausa(mins)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer ${
                      duracionPausa === mins
                        ? 'bg-[#0B7A87] text-white shadow-xs'
                        : 'bg-[#F8FAFC] text-[#64748B] hover:bg-slate-100 border border-[#64748B]/20'
                    }`}
                  >
                    {mins} min
                  </button>
                ))}
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

            {/* Políticas de Posposición */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="text-xs font-mono font-semibold text-[#0E1B2F] block">
                Política de Posposición:
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-[10px] sm:text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setPoliticaPosposicion('MAX_1')}
                  className={`py-1.5 px-1.5 rounded-xl transition-colors cursor-pointer truncate ${
                    politicaPosposicion === 'MAX_1'
                      ? 'bg-[#14B8A6] text-white font-bold'
                      : 'bg-[#F8FAFC] text-[#64748B] border border-[#64748B]/20'
                  }`}
                >
                  Máx. 1 (5m)
                </button>
                <button
                  type="button"
                  onClick={() => setPoliticaPosposicion('MAX_2')}
                  className={`py-1.5 px-1.5 rounded-xl transition-colors cursor-pointer truncate ${
                    politicaPosposicion === 'MAX_2'
                      ? 'bg-[#14B8A6] text-white font-bold'
                      : 'bg-[#F8FAFC] text-[#64748B] border border-[#64748B]/20'
                  }`}
                >
                  Máx. 2 (3m)
                </button>
                <button
                  type="button"
                  onClick={() => setPoliticaPosposicion('SIN_POSPOSICION')}
                  className={`py-1.5 px-1.5 rounded-xl transition-colors cursor-pointer truncate ${
                    politicaPosposicion === 'SIN_POSPOSICION'
                      ? 'bg-[#14B8A6] text-white font-bold'
                      : 'bg-[#F8FAFC] text-[#64748B] border border-[#64748B]/20'
                  }`}
                >
                  Estricto
                </button>
              </div>
            </div>

            {/* Toggles Normativos con Colores Obligatorios #14B8A6 y #34D399 */}
            <div className="space-y-3 pt-2 border-t border-slate-100 text-xs font-semibold text-[#0E1B2F]">
              
              {/* Toggle 1: Forzar pantalla completa */}
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="block truncate">Forzar pantalla completa (kiosko)</span>
                  <span className="text-[10px] text-[#64748B] font-normal block truncate">
                    Bloqueo temporal para desconexión muscular
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setForzarPantallaCompleta(!forzarPantallaCompleta)}
                  className={`w-12 h-6.5 rounded-full transition-colors p-0.5 flex items-center shrink-0 cursor-pointer ${
                    forzarPantallaCompleta ? 'bg-[#14B8A6] justify-end' : 'bg-slate-300 justify-start'
                  }`}
                  role="switch"
                  aria-checked={forzarPantallaCompleta}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-md"></span>
                </button>
              </div>

              {/* Toggle 2: Sonido Web Audio API */}
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="block truncate">Tono Web Audio API en PC</span>
                  <span className="text-[10px] text-[#64748B] font-normal block truncate">
                    Frecuencia binaural suave (528 Hz armónico)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSonidoAlerta(!sonidoAlerta)}
                  className={`w-12 h-6.5 rounded-full transition-colors p-0.5 flex items-center shrink-0 cursor-pointer ${
                    sonidoAlerta ? 'bg-[#10B981] justify-end' : 'bg-slate-300 justify-start'
                  }`}
                  role="switch"
                  aria-checked={sonidoAlerta}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-md"></span>
                </button>
              </div>

            </div>
          </div>

          {/* TARJETA 5: MONITOR DE ESCRITORIO REACTIVO (DESKTOP MOCKUP) */}
          <div className="bg-white rounded-3xl p-6 border border-[#64748B]/20 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 gap-2">
              <div className="min-w-0">
                <h4 className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider truncate">
                  Monitor de Escritorio Reactivo
                </h4>
                <span className="text-[11px] font-mono text-[#0E1B2F] font-bold block truncate">
                  Puesto: {empleadoSeleccionado ? `${empleadoSeleccionado.puestoId} • ${empleadoSeleccionado.nombre}` : 'PC General'}
                </span>
              </div>

              {/* Selector de Simulación en Mockup */}
              <div className="flex items-center space-x-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#64748B]/20 text-[10px] font-mono shrink-0">
                <button
                  type="button"
                  onClick={() => setVistaMockup('NOTIFICACION')}
                  className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                    vistaMockup === 'NOTIFICACION' && !alertaTransmitida
                      ? 'bg-white text-[#1A56DB] font-bold shadow-xs'
                      : 'text-[#64748B]'
                  }`}
                >
                  Toast Nudge
                </button>
                <button
                  type="button"
                  onClick={() => setVistaMockup('BLOQUEO')}
                  className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                    vistaMockup === 'BLOQUEO' || alertaTransmitida
                      ? 'bg-white text-[#10B981] font-bold shadow-xs'
                      : 'text-[#64748B]'
                  }`}
                >
                  Pantalla Completa
                </button>
              </div>
            </div>

            {/* CHASIS REALISTA DEL MONITOR DE ESCRITORIO */}
            <div className="relative pt-2 pb-2 flex flex-col items-center">
              
              {/* Marco externo del monitor */}
              <div className="w-full bg-[#0E1B2F] rounded-2xl p-2.5 shadow-2xl border border-slate-700 relative">
                
                {/* Cámara web y LED de energía */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-600"></div>
                  <div className="w-1 h-1 rounded-full bg-[#10B981] animate-pulse"></div>
                </div>

                {/* PANTALLA INTERNA DEL PC */}
                <div className="bg-slate-900 rounded-xl min-h-[220px] relative overflow-hidden flex flex-col justify-between border border-slate-800">
                  
                  {/* Barra de menú superior del SO del trabajador */}
                  <div className="h-6 bg-slate-900/90 backdrop-blur-md px-3 flex items-center justify-between text-[9px] font-mono text-slate-300 border-b border-slate-800 select-none">
                    <div className="flex items-center space-x-2 truncate">
                      <span className="font-bold text-[#14B8A6]">SafePulse SST</span>
                      <span>•</span>
                      <span className="truncate">{empleadoSeleccionado?.puestoId}</span>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                      <span>10:45 AM</span>
                    </div>
                  </div>

                  {/* CONTENIDO INTERNO: SEGÚN MODO DE SIMULACIÓN */}
                  {alertaTransmitida || vistaMockup === 'BLOQUEO' ? (
                    
                    /* MODO A: BLOQUEO ACTIVO DE PANTALLA COMPLETA */
                    <div className="p-4 flex-1 flex flex-col items-center justify-center text-center bg-gradient-to-b from-slate-900 via-[#0E1B2F] to-slate-900 relative">
                      <div className="absolute top-2 right-2 text-[8px] font-mono px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 animate-pulse">
                        Sincronización Colectiva Activa
                      </div>

                      <div className="w-12 h-12 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/50 flex items-center justify-center text-[#10B981] mb-2 shadow-lg shadow-[#10B981]/20">
                        <Activity className="w-6 h-6 animate-pulse" />
                      </div>

                      <h5 className="font-black font-outfit text-white text-sm sm:text-base tracking-tight leading-tight">
                        ¡Momento de Pausa Vital Colectiva!
                      </h5>
                      <p className="text-[10px] font-mono text-slate-300 mt-1 max-w-xs">
                        Ejercicios osteomusculares para cuello, hombros y muñecas.
                      </p>

                      <div className="my-2.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[#34D399] font-mono text-xs font-bold num-tabular">
                        ⏱️ Tiempo: {alertaTransmitida ? `${Math.floor(alertaSegundosRestantes / 60)}:${(alertaSegundosRestantes % 60).toString().padStart(2, '0')}` : `${duracionPausa}:00 min`}
                      </div>

                      <div className="flex items-center space-x-2 mt-1">
                        <button
                          type="button"
                          onClick={() => alert('Rutina iniciada en el monitor del colaborador')}
                          className="px-3.5 py-1.5 rounded-xl bg-[#10B981] text-white text-[10px] font-mono font-bold hover:bg-emerald-600 transition-colors shadow-xs cursor-pointer"
                        >
                          Iniciar Ejercicios
                        </button>
                        <button
                          type="button"
                          onClick={detenerPausaEmergencia}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-[10px] font-mono hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>

                  ) : (

                    /* MODO B: NOTIFICACIÓN TOAST NUDGE EN EL ESCRITORIO */
                    <div className="p-4 flex-1 flex flex-col justify-end relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px]">
                      
                      {/* Fondo de pantalla simulado */}
                      <div className="text-center my-auto py-2 opacity-40">
                        <Monitor className="w-10 h-10 text-slate-600 mx-auto mb-1" />
                        <span className="text-[10px] font-mono text-slate-500">
                          Estación de Trabajo • {empleadoSeleccionado?.departamento}
                        </span>
                      </div>

                      {/* Toast Flotante Superior Derecho */}
                      <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200 shadow-2xl text-left space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 rounded-md bg-[#1A56DB] text-white flex items-center justify-center text-[10px] font-black">
                              P
                            </div>
                            <span className="text-[11px] font-outfit font-bold text-[#0E1B2F]">
                              PausaActiva SG-SST
                            </span>
                          </div>
                          <span className="text-[9px] font-mono text-[#06B6D4] font-bold bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-200">
                            Próxima Pausa
                          </span>
                        </div>

                        <p className="text-[10px] text-[#0E1B2F] font-medium leading-snug">
                          Hola <strong>{empleadoSeleccionado?.nombre}</strong>, tu rutina programada de descanso postural inicia en <strong>1 minuto</strong>.
                        </p>

                        <div className="flex items-center space-x-2 pt-0.5">
                          <button
                            type="button"
                            onClick={() => setVistaMockup('BLOQUEO')}
                            className="px-3 py-1 rounded-lg bg-[#10B981] hover:bg-emerald-600 text-white text-[10px] font-mono font-bold transition-colors cursor-pointer"
                          >
                            Comenzar ({duracionPausa}m)
                          </button>
                          <button
                            type="button"
                            onClick={() => alert('Pausa pospuesta 5 minutos por el usuario')}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-[10px] font-mono transition-colors cursor-pointer"
                          >
                            Posponer
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Dock / Barra de tareas inferior */}
                  <div className="h-5 bg-slate-900/90 px-3 flex items-center justify-between text-[8px] font-mono text-slate-400 border-t border-slate-800">
                    <span>SafePulse Agent v2.4 (Conectado)</span>
                    <span className="text-[#10B981]">● En línea</span>
                  </div>

                </div>
              </div>

              {/* Base y soporte del monitor */}
              <div className="w-8 h-4 bg-slate-700 -mt-0.5 z-0"></div>
              <div className="w-24 h-2 bg-slate-800 rounded-full shadow-md"></div>
            </div>

            <div className="pt-2 text-center">
              <span className="text-[10px] font-mono text-[#64748B]">
                Haz clic en cualquier colaborador de la tabla para proyectar su estación en este monitor.
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* =========================================================================
          MODAL DE CONTROL Y TELEMETRÍA DE TRANSMISIÓN MASIVA COLECTIVA
          ========================================================================= */}
      {mostrarModalTransmision && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Cabecera del Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0B7A87]">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-black font-outfit text-[#0E1B2F]">
                    Despacho Central de Transmisión Masiva
                  </h3>
                  <span className="text-xs font-mono text-[#64748B]">
                    Bloqueo Síncrono y Pausa Activa Colectiva SG-SST
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMostrarModalTransmision(false)}
                aria-label="Cerrar modal de transmisión"
                className="p-1.5 rounded-xl hover:bg-slate-100 text-[#64748B] hover:text-[#0E1B2F] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Temporizador Central y Cobertura */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/60 via-teal-50/60 to-emerald-50/60 border border-teal-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <span className="text-xs font-mono font-bold text-[#0B7A87] uppercase tracking-wider block">
                  Tiempo Restante de Pausa Síncrona:
                </span>
                <span className="text-3xl sm:text-4xl font-black font-outfit text-[#0E1B2F] num-tabular block mt-1">
                  {Math.floor(alertaSegundosRestantes / 60)}:{(alertaSegundosRestantes % 60).toString().padStart(2, '0')} <span className="text-sm font-normal text-[#64748B]">min</span>
                </span>
                <span className="text-[11px] font-mono text-[#047857] flex items-center justify-center sm:justify-start space-x-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>254 de 254 PCs bloqueadas y cumpliendo rutina</span>
                </span>
              </div>

              <div className="flex flex-col items-center sm:items-end space-y-2">
                <span className="text-xs font-mono text-[#64748B]">Tono sonoro en red:</span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#047857] font-mono text-xs font-bold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
                  <span>528 Hz Activo</span>
                </span>
              </div>
            </div>

            {/* Cobertura por Departamento */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-[#0E1B2F] uppercase tracking-wider">
                Cobertura por Departamento Conectado:
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                {[
                  { depto: 'Soporte', pcs: 42, pct: '100%' },
                  { depto: 'Finanzas', pcs: 38, pct: '100%' },
                  { depto: 'Diseño', pcs: 30, pct: '100%' },
                  { depto: 'Marketing', pcs: 34, pct: '100%' },
                  { depto: 'Operaciones', pcs: 62, pct: '100%' },
                  { depto: 'Tecnología', pcs: 48, pct: '100%' },
                ].map((item) => (
                  <div key={item.depto} className="p-3 bg-[#F8FAFC] rounded-xl border border-[#64748B]/20 flex items-center justify-between">
                    <div>
                      <strong className="text-[#0E1B2F] block">{item.depto}</strong>
                      <span className="text-[10px] text-[#64748B]">{item.pcs} PCs en pausa</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {item.pct}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Acciones del Modal */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-mono text-[#64748B]">
                Conforme a Estándar 3.1.2 Resolución 0312 de 2019
              </span>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setMostrarModalTransmision(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#64748B] font-mono text-xs transition-colors"
                >
                  Ocultar Ventana
                </button>
                <button
                  type="button"
                  onClick={detenerPausaEmergencia}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0B7A87] hover:bg-[#09636e] text-white font-mono text-xs font-bold shadow-md shadow-[#0B7A87]/25 transition-colors"
                >
                  Finalizar Pausa y Desbloquear
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
