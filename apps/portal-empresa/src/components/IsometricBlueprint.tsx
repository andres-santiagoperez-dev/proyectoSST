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
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Animación GSAP: Dibujo técnico del plano y sus capas (respetando reduced-motion)
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
    <div className="w-full bg-brand-navy border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      
      {/* Encabezado del Plano */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-5 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-turquoise animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-accent-turquoise font-bold">
              PLANO ISOMÉTRICO DIGITAL // SEDE BOGOTÁ
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-outfit mt-1">
            Zonificación de Riesgos, Evacuación y Bienestar
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Explora las áreas operativas, rutas de salida rápida y estaciones de pausas activas.
          </p>
        </div>

        {/* Selector de Capas Operativas con los Colores Oficiales */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#13233D] p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setCapaActiva('TODAS')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'TODAS'
                ? 'bg-brand-blue text-white font-bold shadow-md shadow-brand-blue/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>General</span>
          </button>

          <button
            onClick={() => setCapaActiva('EVACUACION')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'EVACUACION'
                ? 'bg-vital-emerald text-brand-navy font-bold shadow-md shadow-vital-emerald/30'
                : 'text-vital-mint hover:bg-slate-800'
            }`}
          >
            <DoorOpen className="w-3.5 h-3.5" />
            <span>Evacuación (Verde)</span>
          </button>

          <button
            onClick={() => setCapaActiva('PAUSAS')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'PAUSAS'
                ? 'bg-accent-turquoise text-brand-navy font-bold shadow-md shadow-accent-turquoise/30'
                : 'text-accent-turquoiseLight hover:bg-slate-800'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Zonas de Pausa (Turquesa)</span>
          </button>

          <button
            onClick={() => setCapaActiva('EMERGENCIA')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'EMERGENCIA'
                ? 'bg-brand-tealDark text-white font-bold shadow-md shadow-brand-tealDark/30'
                : 'text-slate-300 hover:bg-slate-800'
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
        <div className="lg:col-span-8 bg-[#091322] rounded-2xl p-3 border border-slate-800 relative shadow-inner">
          <div className="absolute top-3 right-3 text-[10px] font-mono text-accent-turquoise bg-brand-navy/90 px-2.5 py-1 rounded-lg border border-accent-turquoise/30 flex items-center space-x-1.5 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-turquoise animate-ping"></span>
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
              {/* Patrón de Retícula Blueprint en Turquesa */}
              <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(20, 184, 166, 0.12)" strokeWidth="0.8" />
              </pattern>
              {/* Marcadores de flechas para evacuación en Verde Esmeralda */}
              <marker id="flecha-verde" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#10B981" />
              </marker>
            </defs>

            {/* Fondo de rejilla milimétrica */}
            <rect width="780" height="500" fill="url(#blueprint-grid)" rx="12" />

            {/* Muros Perimetrales Exteriores en Turquesa Claro */}
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
                    fill={esSeleccionada ? `${zona.colorAcento}33` : 'rgba(14, 27, 47, 0.75)'}
                    stroke={esSeleccionada ? zona.colorAcento : 'rgba(20, 184, 166, 0.35)'}
                    strokeWidth={esSeleccionada ? '2.5' : '1.2'}
                    rx="6"
                    className="transition-all duration-200 group-hover:fill-accent-turquoise/20 group-hover:stroke-accent-turquoiseLight"
                  />
                  {/* Rótulo de la zona */}
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

                  {/* Indicador de Punto de Encuentro si es zona 6 */}
                  {zona.id === 'ZONA-6' && (
                    <circle cx={x + ancho - 30} cy={y + 35} r="16" fill="#047857" opacity="0.9" />
                  )}
                </g>
              );
            })}

            {/* CAPA 1: RUTAS DE EVACUACIÓN (Verde Esmeralda #10B981) */}
            {(capaActiva === 'TODAS' || capaActiva === 'EVACUACION') && (
              <g className="capa-evacuacion" opacity="0.95">
                {/* Pasillo central de evacuación hacia el punto de encuentro */}
                <path
                  d="M 250 150 L 250 410"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3.5"
                  strokeDasharray="6,4"
                  markerEnd="url(#flecha-verde)"
                />
                <path
                  d="M 490 150 L 490 230 L 250 230"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray="6,4"
                  markerEnd="url(#flecha-verde)"
                />
                <path
                  d="M 680 300 L 260 300"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray="6,4"
                  markerEnd="url(#flecha-verde)"
                />
                {/* Salida de emergencia señalizada */}
                <rect x="235" y="400" width="30" height="10" fill="#10B981" rx="2" />
                <text x="220" y="394" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="Space Mono">
                  SALIDA EMERGENCIA
                </text>
              </g>
            )}

            {/* CAPA 2: ZONAS DE PAUSAS ACTIVAS (Turquesa #14B8A6) */}
            {(capaActiva === 'TODAS' || capaActiva === 'PAUSAS') && (
              <g className="capa-pausas">
                {/* Zona de pausa en oficinas */}
                <circle cx="160" cy="300" r="22" fill="rgba(20, 184, 166, 0.25)" stroke="#14B8A6" strokeWidth="2" strokeDasharray="3,3" />
                <text x="135" y="304" fill="#2DD4BF" fontSize="8" fontWeight="bold" fontFamily="Space Mono">
                  PAUSA VITAL 1
                </text>

                {/* Zona de pausa en empaque */}
                <circle cx="600" cy="140" r="22" fill="rgba(20, 184, 166, 0.25)" stroke="#14B8A6" strokeWidth="2" strokeDasharray="3,3" />
                <text x="575" y="144" fill="#2DD4BF" fontSize="8" fontWeight="bold" fontFamily="Space Mono">
                  PAUSA VITAL 2
                </text>
              </g>
            )}

            {/* CAPA 3: EXTINTORES Y PRIMEROS AUXILIOS (Agua Marina Oscuro y Rojo) */}
            {(capaActiva === 'TODAS' || capaActiva === 'EMERGENCIA') && (
              <g className="capa-emergencia">
                {/* Extintores */}
                <circle cx="255" cy="80" r="7" fill="#DC2626" />
                <text x="252" y="83" fill="#FFF" fontSize="8" fontWeight="bold">E</text>

                <circle cx="485" cy="80" r="7" fill="#DC2626" />
                <text x="482" y="83" fill="#FFF" fontSize="8" fontWeight="bold">E</text>

                <circle cx="690" cy="240" r="7" fill="#DC2626" />
                <text x="687" y="243" fill="#FFF" fontSize="8" fontWeight="bold">E</text>

                {/* Botiquines en Azul Corporativo */}
                <rect x="75" y="210" width="14" height="14" fill="#1A56DB" rx="3" />
                <text x="79" y="221" fill="#FFF" fontSize="10" fontWeight="bold">+</text>

                <rect x="495" y="80" width="14" height="14" fill="#1A56DB" rx="3" />
                <text x="499" y="91" fill="#FFF" fontSize="10" fontWeight="bold">+</text>
              </g>
            )}
          </svg>

          {/* Leyenda de Significado Normativo (ISO 7010 / NTC 1461) */}
          <div className="flex flex-wrap items-center justify-between mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-vital-emerald"></span>
              <span>Ruta Evacuación (NTC 1461)</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-turquoise"></span>
              <span>Estación Pausa Activa</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              <span>Extintor / Parada Emergencia</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-blue"></span>
              <span>Primeros Auxilios</span>
            </span>
          </div>
        </div>

        {/* Panel Lateral: Ficha Técnica de la Zona Seleccionada (Blanco Limpio #FFFFFF) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xl text-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-brand-tealDark" />
              <span className="text-xs font-mono uppercase tracking-wider text-brand-tealDark font-bold">
                FICHA TÉCNICA DE CONTROL
              </span>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold border border-slate-200">
              {zonaSeleccionada?.id}
            </span>
          </div>

          {zonaSeleccionada ? (
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="text-lg font-bold text-brand-navy font-outfit leading-tight">
                  {zonaSeleccionada.nombre}
                </h4>
                <p className="text-xs text-brand-tealDark font-mono mt-0.5 font-semibold">
                  Área: {zonaSeleccionada.area}
                </p>
              </div>

              <div className="bg-surface-bg p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Aforo Máximo:</span>
                  <span className="font-bold text-brand-navy font-mono">{zonaSeleccionada.aforoMax} personas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Líder / Responsable:</span>
                  <span className="font-semibold text-slate-700">{zonaSeleccionada.responsableZona}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Nivel y Tipo de Riesgo (GTC 45):
                </span>
                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-brand-tealDark text-xs font-medium">
                  {zonaSeleccionada.tipoRiesgo}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Equipamiento de Protección Presente:
                </span>
                <ul className="space-y-1.5">
                  {zonaSeleccionada.equiposSeguridad.map((eq, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-vital-emerald shrink-0" />
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Inspección vigente: 2026-11</span>
                <span className="text-vital-emerald font-mono font-bold">✓ Conforme</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 mt-4">
              Haz clic en cualquier área del plano para inspeccionar su ficha técnica.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
