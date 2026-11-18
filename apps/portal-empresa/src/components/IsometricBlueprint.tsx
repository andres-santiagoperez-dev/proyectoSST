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
  Maximize2 
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
    colorAcento: '#38BDF8',
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
    colorAcento: '#F59E0B',
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
    colorAcento: '#10B981',
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
    colorAcento: '#EC4899',
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
    colorAcento: '#818CF8',
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
    colorAcento: '#16A34A',
  },
];

export default function IsometricBlueprint() {
  const [capaActiva, setCapaActiva] = useState<'TODAS' | 'EVACUACION' | 'PAUSAS' | 'EMERGENCIA'>('TODAS');
  const [zonaSeleccionada, setZonaSeleccionada] = useState<ZonaPlano | null>(ZONAS_EMPRESA[0]);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Momento Animado GSAP: Dibujo técnico del plano y sus capas (respetando reduced-motion)
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
    <div className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden theme-blueprint">
      {/* Encabezado del Plano */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-cyan-500/20 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              PLANO ISOMÉTRICO DIGITAL // SEDE BOGOTÁ
            </span>
          </div>
          <h3 className="text-xl font-bold text-white font-mono mt-0.5">
            Zonificación de Riesgos, Evacuación y Bienestar
          </h3>
          <p className="text-xs text-slate-400">
            Explora las áreas operativas, rutas de salida rápida y estaciones de pausas activas.
          </p>
        </div>

        {/* Selector de Capas Operativas */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setCapaActiva('TODAS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'TODAS'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>General</span>
          </button>

          <button
            onClick={() => setCapaActiva('EVACUACION')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'EVACUACION'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-emerald-400 hover:bg-emerald-950/50'
            }`}
          >
            <DoorOpen className="w-3.5 h-3.5" />
            <span>Evacuación (Verde)</span>
          </button>

          <button
            onClick={() => setCapaActiva('PAUSAS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'PAUSAS'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-amber-400 hover:bg-amber-950/50'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Zonas de Pausa (Ámbar)</span>
          </button>

          <button
            onClick={() => setCapaActiva('EMERGENCIA')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'EMERGENCIA'
                ? 'bg-red-500 text-white font-bold shadow-md shadow-red-500/30'
                : 'text-red-400 hover:bg-red-950/50'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Equipos y Extintores</span>
          </button>
        </div>
      </div>

      {/* Cuerpo: Visualizador SVG + Panel de Detalle */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* SVG Interactivo del Plano */}
        <div className="lg:col-span-8 bg-slate-950/90 rounded-xl p-3 border border-cyan-500/20 relative shadow-inner">
          <div className="absolute top-3 right-3 text-[10px] font-mono text-cyan-400/80 bg-slate-900/90 px-2 py-1 rounded border border-cyan-500/20 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
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
              {/* Patrón de Retícula Blueprint */}
              <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="0.8" />
              </pattern>
              {/* Marcadores de flechas para evacuación */}
              <marker id="flecha-verde" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#16A34A" />
              </marker>
            </defs>

            {/* Fondo de rejilla milimétrica */}
            <rect width="780" height="500" fill="url(#blueprint-grid)" rx="8" />

            {/* Muros Perimetrales Exteriores */}
            <rect
              x="60"
              y="50"
              width="660"
              height="440"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeDasharray="1000"
              className="blueprint-linea"
              rx="4"
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
                    fill={esSeleccionada ? 'rgba(56, 189, 248, 0.18)' : 'rgba(15, 23, 42, 0.65)'}
                    stroke={esSeleccionada ? '#38BDF8' : 'rgba(56, 189, 248, 0.35)'}
                    strokeWidth={esSeleccionada ? '2.5' : '1.2'}
                    rx="4"
                    className="transition-all duration-200 group-hover:fill-cyan-500/20 group-hover:stroke-cyan-300"
                  />
                  {/* Rótulo de la zona */}
                  <text
                    x={x + 12}
                    y={y + 24}
                    fill="#F8FAFC"
                    fontSize="11"
                    fontFamily="Space Grotesk, sans-serif"
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

                  {/* Indicador de Punto de Encuentro si es zona 6 */}
                  {zona.id === 'ZONA-6' && (
                    <circle cx={x + ancho - 30} cy={y + 35} r="16" fill="#16A34A" opacity="0.85" />
                  )}
                </g>
              );
            })}

            {/* CAPA 1: RUTAS DE EVACUACIÓN (Verde) */}
            {(capaActiva === 'TODAS' || capaActiva === 'EVACUACION') && (
              <g className="capa-evacuacion" opacity="0.95">
                {/* Pasillo central de evacuación hacia el punto de encuentro */}
                <path
                  d="M 250 150 L 250 410"
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="3.5"
                  strokeDasharray="6,4"
                  markerEnd="url(#flecha-verde)"
                />
                <path
                  d="M 490 150 L 490 230 L 250 230"
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="3"
                  strokeDasharray="6,4"
                  markerEnd="url(#flecha-verde)"
                />
                <path
                  d="M 680 300 L 260 300"
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="3"
                  strokeDasharray="6,4"
                  markerEnd="url(#flecha-verde)"
                />
                {/* Salida de emergencia señalizada */}
                <rect x="235" y="400" width="30" height="10" fill="#16A34A" rx="2" />
                <text x="220" y="394" fill="#16A34A" fontSize="9" fontWeight="bold" fontFamily="Space Mono">
                  SALIDA EMERGENCIA
                </text>
              </g>
            )}

            {/* CAPA 2: ZONAS DE PAUSAS ACTIVAS (Ámbar / Naranja) */}
            {(capaActiva === 'TODAS' || capaActiva === 'PAUSAS') && (
              <g className="capa-pausas">
                {/* Zona de pausa en oficinas */}
                <circle cx="160" cy="300" r="22" fill="rgba(245, 158, 11, 0.25)" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
                <text x="135" y="304" fill="#FDE68A" fontSize="8" fontWeight="bold" fontFamily="Space Mono">
                  PAUSA VITAL 1
                </text>

                {/* Zona de pausa en empaque */}
                <circle cx="600" cy="140" r="22" fill="rgba(245, 158, 11, 0.25)" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
                <text x="575" y="144" fill="#FDE68A" fontSize="8" fontWeight="bold" fontFamily="Space Mono">
                  PAUSA VITAL 2
                </text>
              </g>
            )}

            {/* CAPA 3: EXTINTORES Y PRIMEROS AUXILIOS (Rojo y Azul) */}
            {(capaActiva === 'TODAS' || capaActiva === 'EMERGENCIA') && (
              <g className="capa-emergencia">
                {/* Extintores */}
                <circle cx="255" cy="80" r="7" fill="#DC2626" />
                <text x="252" y="83" fill="#FFF" fontSize="8" fontWeight="bold">E</text>

                <circle cx="485" cy="80" r="7" fill="#DC2626" />
                <text x="482" y="83" fill="#FFF" fontSize="8" fontWeight="bold">E</text>

                <circle cx="690" cy="240" r="7" fill="#DC2626" />
                <text x="687" y="243" fill="#FFF" fontSize="8" fontWeight="bold">E</text>

                {/* Botiquines */}
                <rect x="75" y="210" width="14" height="14" fill="#2563EB" rx="2" />
                <text x="79" y="221" fill="#FFF" fontSize="10" fontWeight="bold">+</text>

                <rect x="495" y="80" width="14" height="14" fill="#2563EB" rx="2" />
                <text x="499" y="91" fill="#FFF" fontSize="10" fontWeight="bold">+</text>
              </g>
            )}
          </svg>

          {/* Leyenda de Significado Normativo (ISO 7010) */}
          <div className="flex flex-wrap items-center justify-between mt-3 pt-2.5 border-t border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span>
              <span>Ruta Evacuación (NTC 1461)</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-500"></span>
              <span>Estación Pausa Activa</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded bg-red-600"></span>
              <span>Extintor / Parada Emergencia</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded bg-blue-600"></span>
              <span>Primeros Auxilios</span>
            </span>
          </div>
        </div>

        {/* Panel Lateral: Ficha Técnica de la Zona Seleccionada */}
        <div className="lg:col-span-4 bg-slate-950/80 border border-cyan-500/30 rounded-xl p-5 text-slate-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                FICHA TÉCNICA DE CONTROL
              </span>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
              {zonaSeleccionada?.id}
            </span>
          </div>

          {zonaSeleccionada ? (
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="text-lg font-bold text-white font-mono leading-tight">
                  {zonaSeleccionada.nombre}
                </h4>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">
                  Área: {zonaSeleccionada.area}
                </p>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Aforo Máximo:</span>
                  <span className="font-bold text-white font-mono">{zonaSeleccionada.aforoMax} personas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Líder / Responsable:</span>
                  <span className="font-medium text-slate-200">{zonaSeleccionada.responsableZona}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                  Nivel y Tipo de Riesgo (GTC 45):
                </span>
                <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-600/30 text-amber-200 text-xs">
                  {zonaSeleccionada.tipoRiesgo}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                  Equipamiento de Protección Presente:
                </span>
                <ul className="space-y-1">
                  {zonaSeleccionada.equiposSeguridad.map((eq, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Inspección vigente: 2026-11</span>
                <span className="text-emerald-400 font-mono">✓ Conforme</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 mt-4">
              Haz clic en cualquier área del plano para inspeccionar su ficha técnica.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
