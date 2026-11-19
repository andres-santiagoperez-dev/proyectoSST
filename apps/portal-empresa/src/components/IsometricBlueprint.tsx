'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Layers, 
  MapPin, 
  ShieldAlert, 
  HeartPulse, 
  DoorOpen, 
  Info, 
  CheckCircle2, 
  Maximize2,
  Play,
  RotateCcw,
  Volume2
} from 'lucide-react';

interface ZonaPlano {
  id: string;
  nombre: string;
  area: string;
  tipoRiesgo: string;
  aforoMax: number;
  equiposSeguridad: string[];
  responsableZona: string;
  coordenadasSvg: { x: number; y: number; ancho: number; alto: number };
  colorAcento: string;
}

const ZONAS_EMPRESA: ZonaPlano[] = [
  {
    id: 'ZONA-1',
    nombre: 'Laboratorio de Calidad y Catación',
    area: 'Control de Calidad',
    tipoRiesgo: 'Bajo / Biomecánico por pantallas y microscopía',
    aforoMax: 12,
    equiposSeguridad: ['Extintor Solkaflam (C)', 'Botiquín Tipo A', 'Sensor de Humo Óptico'],
    responsableZona: 'Laura Camila Torres (Analista)',
    coordenadasSvg: { x: 80, y: 70, ancho: 160, alto: 110 },
    colorAcento: '#0B7A87', // Agua Marina Oscuro
  },
  {
    id: 'ZONA-2',
    nombre: 'Sala de Tostaduría y Molienda',
    area: 'Producción Primaria',
    tipoRiesgo: 'Alto / Físico (Calor, Ruido), Químico (Material Particulado)',
    aforoMax: 18,
    equiposSeguridad: ['2 Extintores Multipropósito ABC 20 lbs', 'Ducha de Emergencia y Lavaojos', 'Pulsador Parada de Emergencia'],
    responsableZona: 'Mario Alberto Silva (Supervisor de Planta)',
    coordenadasSvg: { x: 260, y: 70, ancho: 220, alto: 140 },
    colorAcento: '#1A56DB', // Azul Corporativo
  },
  {
    id: 'ZONA-3',
    nombre: 'Línea de Envasado al Vacío y Sellado',
    area: 'Empaque y Acabados',
    tipoRiesgo: 'Medio / Mecánico (Atrapamiento), Biomecánico (Movimientos Repetitivos)',
    aforoMax: 24,
    equiposSeguridad: ['Extintor CO2 10 lbs', 'Barreras Fotoeléctricas de Seguridad', 'Botiquín Tipo B'],
    responsableZona: 'Gloria Inés Patiño (Líder de Empaque)',
    coordenadasSvg: { x: 500, y: 70, ancho: 200, alto: 130 },
    colorAcento: '#10B981', // Verde Esmeralda
  },
  {
    id: 'ZONA-4',
    nombre: 'Bodega de Almacenamiento y Estibado',
    area: 'Logística',
    tipoRiesgo: 'Alto / Caída de Cargas, Tránsito de Montacargas',
    aforoMax: 15,
    equiposSeguridad: ['3 Extintores ABC 30 lbs', 'Espejos Cóncavos Viales', 'Camilla Rígida Espinal'],
    responsableZona: 'Javier Enrique Gómez (Vigía COPASST)',
    coordenadasSvg: { x: 260, y: 230, ancho: 440, alto: 160 },
    colorAcento: '#14B8A6', // Turquesa
  },
  {
    id: 'ZONA-5',
    nombre: 'Oficinas Administrativas y SG-SST',
    area: 'Administración',
    tipoRiesgo: 'Bajo / Biomecánico postural, Visual por VDT',
    aforoMax: 30,
    equiposSeguridad: ['Extintor Solkaflam', 'Botiquín Tipo A', 'Desfibrilador DEA'],
    responsableZona: 'Ing. Carlos Andrés Montoya (Líder SST)',
    coordenadasSvg: { x: 80, y: 200, ancho: 160, alto: 190 },
    colorAcento: '#2563EB', // Azul Enérgico
  },
  {
    id: 'ZONA-6',
    nombre: 'Punto de Encuentro Exterior (PE-01)',
    area: 'Patio Principal y Bahía Externa',
    tipoRiesgo: 'Zona Segura de Despeje ante Evacuación',
    aforoMax: 300,
    equiposSeguridad: ['Megáfono de Evacuación', 'Chalecos Brigada', 'Plano General y Censo'],
    responsableZona: 'Comandante de Brigada',
    coordenadasSvg: { x: 80, y: 410, ancho: 620, alto: 70 },
    colorAcento: '#047857', // Verde Bosque
  },
];

export default function IsometricBlueprint() {
  const [capaActiva, setCapaActiva] = useState<'TODAS' | 'EVACUACION' | 'PAUSAS' | 'EMERGENCIA'>('TODAS');
  const [zonaSeleccionada, setZonaSeleccionada] = useState<ZonaPlano | null>(ZONAS_EMPRESA[0]);
  const [simulando, setSimulando] = useState(false);
  const [segundosSimulacion, setSegundosSimulacion] = useState(0);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const reproducirChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const notas = [523.25, 659.25, 783.99]; // Acorde mayor despeje Do-Mi-Sol
      notas.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + idx * 0.09 + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + idx * 0.09);
        osc.stop(audioCtx.currentTime + idx * 0.09 + 0.35);
      });
    } catch {
      // Audio silencioso en entornos restringidos
    }
  };

  const alternarSimulacion = () => {
    if (simulando) {
      setSimulando(false);
      setSegundosSimulacion(0);
    } else {
      setCapaActiva('EVACUACION');
      setSimulando(true);
      setSegundosSimulacion(0);
      const pe01 = ZONAS_EMPRESA.find((z) => z.id === 'ZONA-6');
      if (pe01) setZonaSeleccionada(pe01);
      reproducirChime();
    }
  };

  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    if (simulando) {
      intervalo = setInterval(() => {
        setSegundosSimulacion((s) => {
          if (s >= 10) {
            setSimulando(false);
            return 0;
          }
          return s + 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [simulando]);

  useEffect(() => {
    if (!svgRef.current) return;
    const prefiereReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefiereReducido) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.blueprint-linea',
          { strokeDashoffset: 1000, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: 'power2.out' }
        );
        gsap.fromTo(
          '.blueprint-zona',
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, delay: 0.4, stagger: 0.05, ease: 'power1.out' }
        );
      }, svgRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <div className="w-full bg-white border border-[#64748B]/20 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
      
      {/* Encabezado del Plano en Blanco con Título en Azul Marino Oscuro (#0E1B2F) */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-[#64748B]/20 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A56DB] animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#1A56DB] font-bold">
              PLANO ISOMÉTRICO DIGITAL // SEDE BOGOTÁ
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0E1B2F] font-outfit mt-1">
            Zonificación de Riesgos, Evacuación y Bienestar
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] font-sans mt-0.5 font-medium">
            Explora las áreas operativas, rutas de salida rápida y estaciones de pausas activas.
          </p>
        </div>

        {/* Selector de Capas Operativas */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#64748B]/20 shadow-xs">
          <button
            onClick={() => setCapaActiva('TODAS')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'TODAS'
                ? 'bg-[#1A56DB] text-white font-bold shadow-md shadow-[#1A56DB]/25'
                : 'text-[#64748B] hover:text-[#0E1B2F] hover:bg-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>General</span>
          </button>

          <button
            onClick={() => setCapaActiva('EVACUACION')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'EVACUACION'
                ? 'bg-[#10B981] text-white font-bold shadow-md shadow-[#10B981]/25'
                : 'text-[#047857] hover:bg-white'
            }`}
          >
            <DoorOpen className="w-3.5 h-3.5" />
            <span>Evacuación (Verde)</span>
          </button>

          <button
            onClick={() => setCapaActiva('PAUSAS')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'PAUSAS'
                ? 'bg-[#14B8A6] text-white font-bold shadow-md shadow-[#14B8A6]/25'
                : 'text-[#0B7A87] hover:bg-white'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Zonas de Pausa (Turquesa)</span>
          </button>

          <button
            onClick={() => setCapaActiva('EMERGENCIA')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'EMERGENCIA'
                ? 'bg-[#0B7A87] text-white font-bold shadow-md shadow-[#0B7A87]/25'
                : 'text-[#64748B] hover:bg-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Equipos y Extintores</span>
          </button>

          {/* Botón de Simulación de Evacuación Interactivo */}
          <button
            onClick={alternarSimulacion}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 border ml-1 ${
              simulando
                ? 'bg-[#047857] hover:bg-[#035941] text-white border-emerald-400 font-bold shadow-md shadow-emerald-500/25'
                : 'bg-[#10B981]/15 hover:bg-[#10B981]/25 text-[#047857] border-[#10B981]/30 font-bold'
            }`}
            title="Activa el trazado dinámico de flujo hacia el Punto de Encuentro PE-01"
          >
            {simulando ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Detener ({10 - segundosSimulacion}s)</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simular Evacuación</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Alerta de Simulación Activa */}
      {simulando && (
        <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Volume2 className="w-4 h-4 text-[#10B981] animate-bounce shrink-0" />
            <span className="text-xs font-mono font-bold">
              SIMULACIÓN ACTIVA: Flujo de evacuación despejado hacia Punto de Encuentro Exterior (PE-01 - Patio Principal).
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#047857] bg-white px-2 py-0.5 rounded border border-emerald-200 font-bold shrink-0">
            Tiempo de arribo: 45s
          </span>
        </div>
      )}

      {/* Cuerpo: Visor Vectorial de Ingeniería + Panel de Detalle */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        
        {/* SVG Interactivo del Plano — Visor Técnico de Alta Definición */}
        <div className="lg:col-span-8 bg-[#0E1B2F] rounded-2xl p-3 border border-[#64748B]/30 relative shadow-inner">
          <div className="absolute top-3 right-3 text-[10px] font-mono text-[#2DD4BF] bg-[#0E1B2F]/90 px-2.5 py-1 rounded-lg border border-[#2DD4BF]/40 flex items-center space-x-1.5 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-ping"></span>
            <span>Escala 1:100 • Nivel 1</span>
          </div>

          <svg
            ref={svgRef}
            viewBox="0 0 780 500"
            className="w-full h-auto max-h-[480px] select-none"
            role="img"
            aria-label="Plano de instalaciones de Industrias Andinas del Café"
          >
            <defs>
              <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(20, 184, 166, 0.15)" strokeWidth="0.8" />
              </pattern>
              <marker id="flecha-verde" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#10B981" />
              </marker>
              <style>{`
                @keyframes dashEvacuacion {
                  from { stroke-dashoffset: 40; }
                  to { stroke-dashoffset: 0; }
                }
                .ruta-activa-anim {
                  animation: dashEvacuacion 0.75s linear infinite;
                }
              `}</style>
            </defs>

            <rect width="780" height="500" fill="url(#blueprint-grid)" rx="12" />

            {/* Muros Perimetrales Exteriores en Turquesa Claro (#2DD4BF) */}
            <rect
              x="60"
              y="50"
              width="660"
              height="440"
              fill="none"
              stroke="#2DD4BF"
              strokeWidth="2.5"
              strokeDasharray="1000"
              className="blueprint-linea"
              rx="6"
            />

            {/* Zonas Interactivas */}
            {ZONAS_EMPRESA.map((zona) => {
              const esSeleccionada = zonaSeleccionada?.id === zona.id;
              const { x, y, ancho, alto } = zona.coordenadasSvg;

              return (
                <g
                  key={zona.id}
                  onClick={() => setZonaSeleccionada(zona)}
                  className="cursor-pointer group blueprint-zona"
                  tabIndex={0}
                  role="button"
                  aria-label={`Ver detalles de ${zona.nombre}`}
                  onKeyDown={(e) => e.key === 'Enter' && setZonaSeleccionada(zona)}
                >
                  <rect
                    x={x}
                    y={y}
                    width={ancho}
                    height={alto}
                    fill={esSeleccionada ? `${zona.colorAcento}40` : 'rgba(14, 27, 47, 0.75)'}
                    stroke={esSeleccionada ? zona.colorAcento : 'rgba(20, 184, 166, 0.4)'}
                    strokeWidth={esSeleccionada ? '2.5' : '1.2'}
                    rx="6"
                    className="transition-all duration-200 group-hover:fill-[#14B8A6]/25 group-hover:stroke-[#2DD4BF]"
                  />
                  <text
                    x={x + 12}
                    y={y + 24}
                    fill="#FFFFFF"
                    fontSize="11"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight="700"
                  >
                    {zona.nombre}
                  </text>
                  <text
                    x={x + 12}
                    y={y + 42}
                    fill="#94A3B8"
                    fontSize="9.5"
                    fontFamily="Space Mono, monospace"
                  >
                    Aforo: {zona.aforoMax} pers. • {zona.area}
                  </text>

                  {zona.id === 'ZONA-6' && (
                    <g>
                      <circle cx={x + ancho - 30} cy={y + 35} r="16" fill="#047857" opacity="0.9" />
                      {simulando && (
                        <circle
                          cx={x + ancho - 30}
                          cy={y + 35}
                          r="24"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2.5"
                          className="animate-ping origin-center"
                        />
                      )}
                    </g>
                  )}
                </g>
              );
            })}

            {/* CAPA 1: RUTAS DE EVACUACIÓN (Verde Esmeralda #10B981) */}
            {(capaActiva === 'TODAS' || capaActiva === 'EVACUACION') && (
              <g className="capa-evacuacion" opacity="0.95">
                <path
                  d="M 250 150 L 250 410"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth={simulando ? '4' : '3.5'}
                  strokeDasharray="6,4"
                  className={simulando ? 'ruta-activa-anim' : ''}
                  markerEnd="url(#flecha-verde)"
                />
                <path
                  d="M 490 150 L 490 230 L 250 230"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth={simulando ? '3.5' : '3'}
                  strokeDasharray="6,4"
                  className={simulando ? 'ruta-activa-anim' : ''}
                  markerEnd="url(#flecha-verde)"
                />
                <path
                  d="M 680 300 L 260 300"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth={simulando ? '3.5' : '3'}
                  strokeDasharray="6,4"
                  className={simulando ? 'ruta-activa-anim' : ''}
                  markerEnd="url(#flecha-verde)"
                />
                <rect x="235" y="400" width="30" height="10" fill="#10B981" rx="2" />
                <text x="220" y="394" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="Space Mono">
                  SALIDA EMERGENCIA
                </text>
              </g>
            )}

            {/* CAPA 2: ZONAS DE PAUSAS ACTIVAS (Turquesa #14B8A6) */}
            {(capaActiva === 'TODAS' || capaActiva === 'PAUSAS') && (
              <g className="capa-pausas">
                <circle cx="160" cy="300" r="22" fill="rgba(20, 184, 166, 0.25)" stroke="#14B8A6" strokeWidth="2" strokeDasharray="3,3" />
                <text x="135" y="304" fill="#2DD4BF" fontSize="8" fontWeight="bold" fontFamily="Space Mono">
                  PAUSA VITAL 1
                </text>

                <circle cx="600" cy="140" r="22" fill="rgba(20, 184, 166, 0.25)" stroke="#14B8A6" strokeWidth="2" strokeDasharray="3,3" />
                <text x="575" y="144" fill="#2DD4BF" fontSize="8" fontWeight="bold" fontFamily="Space Mono">
                  PAUSA VITAL 2
                </text>
              </g>
            )}

            {/* CAPA 3: EXTINTORES Y PRIMEROS AUXILIOS */}
            {(capaActiva === 'TODAS' || capaActiva === 'EMERGENCIA') && (
              <g className="capa-emergencia">
                <circle cx="255" cy="80" r="7" fill="#DC2626" />
                <text x="252" y="83" fill="#FFF" fontSize="8" fontWeight="bold">E</text>

                <circle cx="485" cy="80" r="7" fill="#DC2626" />
                <text x="482" y="83" fill="#FFF" fontSize="8" fontWeight="bold">E</text>

                <circle cx="690" cy="240" r="7" fill="#DC2626" />
                <text x="687" y="243" fill="#FFF" fontSize="8" fontWeight="bold">E</text>

                <rect x="75" y="210" width="14" height="14" fill="#1A56DB" rx="3" />
                <text x="79" y="221" fill="#FFF" fontSize="10" fontWeight="bold">+</text>

                <rect x="495" y="80" width="14" height="14" fill="#1A56DB" rx="3" />
                <text x="499" y="91" fill="#FFF" fontSize="10" fontWeight="bold">+</text>
              </g>
            )}
          </svg>

          {/* Leyenda de Significado Normativo */}
          <div className="flex flex-wrap items-center justify-between mt-3 pt-3 border-t border-slate-700 text-[11px] font-mono text-slate-300">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
              <span>Ruta Evacuación (NTC 1461)</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></span>
              <span>Estación Pausa Activa</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              <span>Extintor / Emergencia</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1A56DB]"></span>
              <span>Primeros Auxilios</span>
            </span>
          </div>
        </div>

        {/* Panel Lateral: Ficha Técnica de la Zona Seleccionada — FONDO EN AZUL GRISÁCEO CLARO (#F8FAFC) */}
        <div className="lg:col-span-4 bg-[#F8FAFC] rounded-2xl p-5 border border-[#64748B]/20 text-[#0E1B2F] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#64748B]/20">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-[#0B7A87]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#0B7A87] font-bold">
                FICHA TÉCNICA DE CONTROL
              </span>
            </div>
            <span className="text-[10px] bg-white text-[#0E1B2F] px-2.5 py-0.5 rounded font-mono font-bold border border-[#64748B]/20">
              {zonaSeleccionada?.id}
            </span>
          </div>

          {zonaSeleccionada ? (
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="text-xl font-black text-[#0E1B2F] font-outfit leading-tight">
                  {zonaSeleccionada.nombre}
                </h4>
                <p className="text-xs text-[#0B7A87] font-mono mt-0.5 font-bold">
                  Área: {zonaSeleccionada.area}
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-[#64748B]/20 space-y-2 text-xs shadow-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Aforo Máximo:</span>
                  <span className="font-bold text-[#0E1B2F] font-mono">{zonaSeleccionada.aforoMax} personas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Líder / Responsable:</span>
                  <span className="font-semibold text-[#0E1B2F]">{zonaSeleccionada.responsableZona}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-[#0E1B2F] uppercase tracking-wider block mb-1">
                  Nivel y Tipo de Riesgo (GTC 45):
                </span>
                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-[#0B7A87] text-xs font-semibold">
                  {zonaSeleccionada.tipoRiesgo}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-[#0E1B2F] uppercase tracking-wider block mb-1.5">
                  Equipamiento de Protección Presente:
                </span>
                <ul className="space-y-1.5">
                  {zonaSeleccionada.equiposSeguridad.map((eq, i) => (
                    <li key={i} className="text-xs text-[#0E1B2F] flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                      <span className="font-medium">{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#64748B]/20 text-[11px] text-[#64748B] flex items-center justify-between font-mono">
                <span>Inspección vigente: 2026-11</span>
                <span className="text-[#10B981] font-bold">✓ Conforme</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-[#64748B] mt-4 font-medium">
              Haz clic en cualquier área del plano para inspeccionar su ficha técnica.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
