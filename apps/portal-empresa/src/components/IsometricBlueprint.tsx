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
  Play, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Send
} from 'lucide-react';
import SuggestionModal from './SuggestionModal';

export interface ZonaPlano {
  id: string;
  codigo: string;
  nombre: string;
  area: string;
  ala: string;
  tipoRiesgoGTC45: {
    clasificacion: string;
    nivelDeficiencia: string;
    nivelExposicion: string;
    nivelProbabilidad: string;
    nivelConsecuencia: string;
    nivelRiesgo: 'I' | 'II' | 'III' | 'IV';
    aceptabilidad: string;
    controles: {
      eliminacionSustitucion: string;
      ingenieria: string;
      administrativos: string;
      epp: string;
    };
  };
  aforoMax: number;
  aforoNominal: number;
  equiposSeguridad: Array<{ nombre: string; tipo: 'EXTINTOR' | 'PRIMEROS_AUXILIOS' | 'EMERGENCIA'; detalle: string }>;
  responsableZona: string;
  suplenteBrigada: string;
  canalRadio: string;
  gridCoord: { x: number; y: number; w: number; h: number; z: number };
  colorAcento: string;
  colorHighlight: string;
  ultimaInspeccion: string;
}

export const ZONAS_EMPRESA: ZonaPlano[] = [
  {
    id: 'ZONA-1',
    codigo: 'Z-01-LAB',
    nombre: 'Laboratorio de Calidad y Catación',
    area: 'Control de Calidad Ocupacional',
    ala: 'Ala Norte Occidental (Nivel 1)',
    tipoRiesgoGTC45: {
      clasificacion: 'Biomecánico (Pantallas VDT / Postura Sedente Prolongada) y Químico Menor (Vapores de infusión y reactivos de catación)',
      nivelDeficiencia: 'Medio (2)',
      nivelExposicion: 'Frecuente (3)',
      nivelProbabilidad: 'Medio (6)',
      nivelConsecuencia: 'Leve (10)',
      nivelRiesgo: 'III',
      aceptabilidad: 'Mejorable con Controles de Ergonomía',
      controles: {
        eliminacionSustitucion: 'No aplica (proceso analítico de café esencial para exportación).',
        ingenieria: 'Luminarias LED antirreflejo 500 Lux, sillas ergonómicas con soporte lumbar ajustable en 3 ejes.',
        administrativos: 'Pausas activas visuales cada 60 min (regla 20-20-20), rotación de turnos de catación.',
        epp: 'Bata de laboratorio de algodón ignífugo, calzado cerrado antideslizante con puntera de policarbonato.',
      },
    },
    aforoMax: 12,
    aforoNominal: 8,
    equiposSeguridad: [
      { nombre: 'Extintor Solkaflam 123 (5 lbs)', tipo: 'EXTINTOR', detalle: 'Apto para equipos de laboratorio y cómputo' },
      { nombre: 'Botiquín Tipo A (Res. 0705/2007)', tipo: 'PRIMEROS_AUXILIOS', detalle: 'Dotación básica para atención menor' },
      { nombre: 'Sensor Óptico de Humo y Térmico', tipo: 'EMERGENCIA', detalle: 'Conexión a panel central contra incendio' },
    ],
    responsableZona: 'Laura Camila Torres',
    suplenteBrigada: 'Esteban Darío Ruiz (Brigadista Auxilios)',
    canalRadio: 'Canal 1 (Brigada SST)',
    gridCoord: { x: 40, y: 30, w: 150, h: 120, z: 20 },
    colorAcento: '#0B7A87', // Agua Marina Oscuro
    colorHighlight: '#14B8A6',
    ultimaInspeccion: '12 de Noviembre de 2026',
  },
  {
    id: 'ZONA-2',
    codigo: 'Z-02-TOST',
    nombre: 'Sala de Tostaduría y Molienda',
    area: 'Producción Primaria y Transformación',
    ala: 'Ala Norte Oriental (Nivel 1)',
    tipoRiesgoGTC45: {
      clasificacion: 'Físico (Calor Radiante 34°C, Ruido Continuo 86 dBA) y Químico (Material Particulado Orgánico Polvo de Café)',
      nivelDeficiencia: 'Alto (6)',
      nivelExposicion: 'Continua (4)',
      nivelProbabilidad: 'Muy Alto (24)',
      nivelConsecuencia: 'Grave (25)',
      nivelRiesgo: 'II',
      aceptabilidad: 'Aceptable con Controles Específicos Estrictos',
      controles: {
        eliminacionSustitucion: 'Mantenimiento predictivo de rodamientos de molinos para abatir emisión sonora.',
        ingenieria: 'Sistema de extracción localizada ciclónica de humos y particulado, apantallamiento térmico de pailas tostadoras.',
        administrativos: 'Mediciones semestrales de sonometría y estrés térmico TGBH, hidratación reglamentaria cada 45 min.',
        epp: 'Protección auditiva tipo copa NRR 27 dB, respirador con filtro N95 para polvos orgánicos, guantes térmicos de carnaza de descarne.',
      },
    },
    aforoMax: 18,
    aforoNominal: 14,
    equiposSeguridad: [
      { nombre: '2 Extintores Multipropósito ABC 20 lbs', tipo: 'EXTINTOR', detalle: 'Presión contenida PQS con manómetro verificado' },
      { nombre: 'Ducha de Emergencia y Lavaojos', tipo: 'EMERGENCIA', detalle: 'Flujo continuo 15 min según norma ANSI Z358.1' },
      { nombre: 'Pulsadores de Parada de Emergencia (Seta)', tipo: 'EMERGENCIA', detalle: 'Interbloqueo eléctrico de molinos y quemadores' },
    ],
    responsableZona: 'Mario Alberto Silva (Supervisor de Planta)',
    suplenteBrigada: 'Nelson Javier Cárdenas (Brigadista Incendios)',
    canalRadio: 'Canal 1 (Brigada SST)',
    gridCoord: { x: 230, y: 30, w: 170, h: 120, z: 20 },
    colorAcento: '#1A56DB', // Azul Corporativo
    colorHighlight: '#2563EB',
    ultimaInspeccion: '15 de Noviembre de 2026',
  },
  {
    id: 'ZONA-3',
    codigo: 'Z-03-ENV',
    nombre: 'Línea de Envasado al Vacío y Sellado',
    area: 'Empaque, Termosellado y Embalaje',
    ala: 'Sector Central Oriental (Nivel 1)',
    tipoRiesgoGTC45: {
      clasificacion: 'Mecánico (Atrapamiento en mordazas neumáticas) y Biomecánico (Movimientos repetitivos de miembro superior)',
      nivelDeficiencia: 'Alto (6)',
      nivelExposicion: 'Frecuente (3)',
      nivelProbabilidad: 'Alto (18)',
      nivelConsecuencia: 'Grave (25)',
      nivelRiesgo: 'II',
      aceptabilidad: 'Aceptable con Controles Específicos',
      controles: {
        eliminacionSustitucion: 'Diseño de tolvas de alimentación gravitacional automatizadas.',
        ingenieria: 'Cortinas fotoeléctricas de seguridad categoría 4, resguardos de acrílico de alta resistencia en bandas.',
        administrativos: 'Rotación obligatoria de puestos operativos cada 90 minutos, pausas de elongación de túnel carpiano.',
        epp: 'Calzado ergonómico de seguridad dieléctrico, cofia desechable, guantes de nitrilo antideslizantes para empaque.',
      },
    },
    aforoMax: 24,
    aforoNominal: 20,
    equiposSeguridad: [
      { nombre: 'Extintor CO2 10 lbs (Dióxido de Carbono)', tipo: 'EXTINTOR', detalle: 'Para tableros eléctricos y motores de selladoras' },
      { nombre: 'Botiquín Tipo B Industrial', tipo: 'PRIMEROS_AUXILIOS', detalle: 'Dotación para inmovilización y curaciones' },
      { nombre: 'Estación de Pausa Activa EP-02', tipo: 'EMERGENCIA', detalle: 'Guía visual y cronómetro de estiramiento articular' },
    ],
    responsableZona: 'Gloria Inés Patiño',
    suplenteBrigada: 'Diana Marcela López (Brigadista Evacuación)',
    canalRadio: 'Canal 1 (Brigada SST)',
    gridCoord: { x: 230, y: 180, w: 170, h: 110, z: 20 },
    colorAcento: '#10B981', // Verde Esmeralda
    colorHighlight: '#34D399',
    ultimaInspeccion: '14 de Noviembre de 2026',
  },
  {
    id: 'ZONA-4',
    codigo: 'Z-04-BOD',
    nombre: 'Bodega de Almacenamiento y Estibado',
    area: 'Logística, Carga y Despachos',
    ala: 'Sector Central Occidental (Nivel 1)',
    tipoRiesgoGTC45: {
      clasificacion: 'Locativo (Caída de objetos en estanterías drive-in) y Mecánico (Interacción peatón - montacargas eléctrico)',
      nivelDeficiencia: 'Alto (6)',
      nivelExposicion: 'Continua (4)',
      nivelProbabilidad: 'Muy Alto (24)',
      nivelConsecuencia: 'Muy Grave (60)',
      nivelRiesgo: 'I',
      aceptabilidad: 'Situación Crítica / Control Prioritario Inmediato',
      controles: {
        eliminacionSustitucion: 'Sustitución de estibas deterioradas por estibas plásticas sanitarias de alta carga.',
        ingenieria: 'Barreras de contención de estanterías según norma EN 15635, espejos cóncavos panorámicos en intersecciones de pasillo.',
        administrativos: 'Velocidad máxima de montacargas limitada a 8 km/h, demarcación estricta de sendas peatonales de 1.20 m.',
        epp: 'Casco de seguridad Tipo I Clase E, chaleco reflectivo clase 2 según ANSI/ISEA 107, botas con puntera de acero.',
      },
    },
    aforoMax: 15,
    aforoNominal: 10,
    equiposSeguridad: [
      { nombre: '3 Extintores Multipropósito ABC 30 lbs', tipo: 'EXTINTOR', detalle: 'Ubicados en cabeceras de pasillos principales' },
      { nombre: 'Camilla Rígida Espinal con Inmovilizadores', tipo: 'PRIMEROS_AUXILIOS', detalle: 'Equipada con arnés de sujeción tipo araña' },
      { nombre: 'Luces Estroboscópicas de Intersección', tipo: 'EMERGENCIA', detalle: 'Advertencia visual de proximidad de montacargas' },
    ],
    responsableZona: 'Javier Enrique Gómez (Vigía COPASST)',
    suplenteBrigada: 'Wilmer Alexander Castro (Brigadista Rescate)',
    canalRadio: 'Canal 1 (Brigada SST)',
    gridCoord: { x: 40, y: 180, w: 150, h: 110, z: 20 },
    colorAcento: '#14B8A6', // Turquesa
    colorHighlight: '#2DD4BF',
    ultimaInspeccion: '16 de Noviembre de 2026',
  },
  {
    id: 'ZONA-5',
    codigo: 'Z-05-ADM',
    nombre: 'Oficinas Administrativas y SG-SST',
    area: 'Administración, Gestión del Talento y SG-SST',
    ala: 'Ala Sur Occidental (Nivel 1)',
    tipoRiesgoGTC45: {
      clasificacion: 'Biomecánico (Sedestación continua y trabajo en VDT) y Psicosocial (Atención y cumplimiento de metas anuales)',
      nivelDeficiencia: 'Bajo (0)',
      nivelExposicion: 'Continua (4)',
      nivelProbabilidad: 'Bajo (4)',
      nivelConsecuencia: 'Leve (10)',
      nivelRiesgo: 'III',
      aceptabilidad: 'Aceptable con Mantenimiento de Controles',
      controles: {
        eliminacionSustitucion: 'Digitalización completa de archivo documental SST (cero cargue de carpetas pesadas).',
        ingenieria: 'Brazos neumáticos portamonitor a la altura de la vista, apoyapiés ergonómicos ajustables con inclinación.',
        administrativos: 'App Pausas Vitales instalada en estaciones con bloqueo recordatorio cada 60 min, tamizaje psicosocial Res. 2764/2022.',
        epp: 'Lentes con filtro de luz azul antirreflejo para colaboradores con prescripción optométrica.',
      },
    },
    aforoMax: 30,
    aforoNominal: 22,
    equiposSeguridad: [
      { nombre: 'Extintor Solkaflam 123 (10 lbs)', tipo: 'EXTINTOR', detalle: 'Para servidor y equipos de cómputo' },
      { nombre: 'Desfibrilador Externo Automático (DEA)', tipo: 'PRIMEROS_AUXILIOS', detalle: 'Cumplimiento Ley 1831 de 2017 con batería testeada' },
      { nombre: 'Botiquín Tipo A Institucional', tipo: 'PRIMEROS_AUXILIOS', detalle: 'Ubicado en recepción principal' },
    ],
    responsableZona: 'Ing. Carlos Andrés Montoya (Líder SST)',
    suplenteBrigada: 'Paola Andrea Méndez (Brigadista Auxilios)',
    canalRadio: 'Canal 1 (Brigada SST)',
    gridCoord: { x: 40, y: 310, w: 150, h: 70, z: 20 },
    colorAcento: '#0B7A87', // Agua Marina Oscuro
    colorHighlight: '#1A56DB',
    ultimaInspeccion: '10 de Noviembre de 2026',
  },
  {
    id: 'ZONA-6',
    codigo: 'PE-01-EXT',
    nombre: 'Punto de Encuentro Exterior (PE-01)',
    area: 'Patio Principal, Bahía de Maniobras y Despeje',
    ala: 'Explanada Sur Exterior (Zona Segura)',
    tipoRiesgoGTC45: {
      clasificacion: 'Zona Segura de Concentración y Conteo (Libre de riesgos de colapso estructural y redes aéreas de media tensión)',
      nivelDeficiencia: 'Bajo (0)',
      nivelExposicion: 'Esporádica (1)',
      nivelProbabilidad: 'Bajo (2)',
      nivelConsecuencia: 'Leve (10)',
      nivelRiesgo: 'IV',
      aceptabilidad: 'Aceptable Pleno / Zona Normalizada',
      controles: {
        eliminacionSustitucion: 'Ubicación calculada a más de 1.5 veces la altura máxima de la edificación adyacente.',
        ingenieria: 'Demarcación con pintura epóxica verde reflectiva de alta durabilidad, baliza solar estroboscópica.',
        administrativos: 'Simulacros de evacuación generales cada 6 meses, censo nominal digital en tableta de mando.',
        epp: 'Chalecos reflectivos de alta visibilidad para coordinadores de evacuación y brigadistas.',
      },
    },
    aforoMax: 300,
    aforoNominal: 0,
    equiposSeguridad: [
      { nombre: 'Megáfono Electrónico de Evacuación (25W)', tipo: 'EMERGENCIA', detalle: 'Con sirena audible a más de 500 metros' },
      { nombre: 'Carpeta Maestra de Censo y Trazabilidad', tipo: 'EMERGENCIA', detalle: 'Listado actualizado de turnos y contratistas' },
      { nombre: 'Baliza Verde Fotoluminiscente de Despeje', tipo: 'EMERGENCIA', detalle: 'Baliza solar permanente de georreferenciación' },
    ],
    responsableZona: 'Comandante de Brigada Integral',
    suplenteBrigada: 'Coordinador General de Evacuación',
    canalRadio: 'Canal 1 (Brigada SST)',
    gridCoord: { x: 210, y: 310, w: 190, h: 70, z: 6 },
    colorAcento: '#047857', // Verde Bosque
    colorHighlight: '#10B981',
    ultimaInspeccion: '18 de Noviembre de 2026',
  },
];

// Etiquetas en 2 líneas para el visor SVG que garantizan cero recortes
const LABELS_ZONAS_SVG: Record<string, { linea1: string; linea2: string }> = {
  'ZONA-1': { linea1: 'Laboratorio Calidad', linea2: '& Catación' },
  'ZONA-2': { linea1: 'Sala de Tostaduría', linea2: '& Molienda' },
  'ZONA-3': { linea1: 'Línea de Envasado', linea2: '& Sellado al Vacío' },
  'ZONA-4': { linea1: 'Bodega Almacenamiento', linea2: '& Estibado' },
  'ZONA-5': { linea1: 'Oficinas Administrativas', linea2: '& SG-SST' },
  'ZONA-6': { linea1: 'Punto de Encuentro', linea2: 'Exterior (PE-01)' },
};

// Helper para proyección isométrica (30 grados)
function toIso(x: number, y: number, z: number = 0, originX = 460, originY = 110, scale = 1.05) {
  const cos30 = 0.86602540378;
  const sin30 = 0.5;
  const px = originX + (x - y) * cos30 * scale;
  const py = originY + (x + y) * sin30 * scale - z * scale;
  return { x: Math.round(px * 10) / 10, y: Math.round(py * 10) / 10 };
}

function getTopPoly(x: number, y: number, w: number, h: number, z: number) {
  const p0 = toIso(x, y, z);
  const p1 = toIso(x + w, y, z);
  const p2 = toIso(x + w, y + h, z);
  const p3 = toIso(x, y + h, z);
  return `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
}

function getFrontLeftWall(x: number, y: number, w: number, h: number, z: number) {
  const p3_top = toIso(x, y + h, z);
  const p2_top = toIso(x + w, y + h, z);
  const p2_bot = toIso(x + w, y + h, 0);
  const p3_bot = toIso(x, y + h, 0);
  return `${p3_top.x},${p3_top.y} ${p2_top.x},${p2_top.y} ${p2_bot.x},${p2_bot.y} ${p3_bot.x},${p3_bot.y}`;
}

function getFrontRightWall(x: number, y: number, w: number, h: number, z: number) {
  const p2_top = toIso(x + w, y + h, z);
  const p1_top = toIso(x + w, y, z);
  const p1_bot = toIso(x + w, y, 0);
  const p2_bot = toIso(x + w, y + h, 0);
  return `${p2_top.x},${p2_top.y} ${p1_top.x},${p1_top.y} ${p1_bot.x},${p1_bot.y} ${p2_bot.x},${p2_bot.y}`;
}

function getCenter(x: number, y: number, w: number, h: number, z: number) {
  return toIso(x + w / 2, y + h / 2, z);
}

export default function IsometricBlueprint() {
  const [capaActiva, setCapaActiva] = useState<'GENERAL' | 'EVACUACION' | 'PAUSAS' | 'EQUIPOS'>('GENERAL');
  const [zonaSeleccionada, setZonaSeleccionada] = useState<ZonaPlano>(ZONAS_EMPRESA[0]);
  const [simulando, setSimulando] = useState(false);
  const [segundosSimulacion, setSegundosSimulacion] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [modalSugerenciaAbierto, setModalSugerenciaAbierto] = useState(false);
  const [zonaModal, setZonaModal] = useState<string>('ZONA-1');
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Reproducción armónica del chime de despeje (Do-Mi-Sol-Do) con Web Audio API
  const reproducirChime = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Campanas armónicas de despeje (Acorde mayor brillante en Do Mayor: C5, E5, G5, C6)
      const notas = [523.25, 659.25, 783.99, 1046.50];
      notas.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        const startTime = audioCtx.currentTime + idx * 0.08;
        const duracion = 0.5;

        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.05, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duracion);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + duracion);
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
    let timer: NodeJS.Timeout;
    if (simulando) {
      timer = setInterval(() => {
        setSegundosSimulacion((s) => {
          if (s >= 15) {
            setSimulando(false);
            return 0;
          }
          return s + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [simulando]);

  // Entrada animada con GSAP respetando prefers-reduced-motion
  useEffect(() => {
    if (!svgRef.current) return;
    const prefiereReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefiereReducido) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.iso-bloque',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power2.out' }
        );
        gsap.fromTo(
          '.iso-linea-trazado',
          { strokeDashoffset: 500, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: 'power2.out' }
        );
      }, svgRef);

      return () => ctx.revert();
    }
  }, []);

  const abrirModalParaZona = (zonaId: string) => {
    setZonaModal(zonaId);
    setModalSugerenciaAbierto(true);
  };

  // Coordenadas calculadas de los pasillos de evacuación (isométricos)
  const rutaLab = `${toIso(115, 90, 2).x},${toIso(115, 90, 2).y} L ${toIso(210, 90, 2).x},${toIso(210, 90, 2).y}`;
  const rutaTost = `${toIso(315, 90, 2).x},${toIso(315, 90, 2).y} L ${toIso(210, 90, 2).x},${toIso(210, 90, 2).y}`;
  const rutaBodega = `${toIso(115, 235, 2).x},${toIso(115, 235, 2).y} L ${toIso(210, 235, 2).x},${toIso(210, 235, 2).y}`;
  const rutaEnv = `${toIso(315, 235, 2).x},${toIso(315, 235, 2).y} L ${toIso(210, 235, 2).x},${toIso(210, 235, 2).y}`;
  const rutaOficinas = `${toIso(115, 345, 2).x},${toIso(115, 345, 2).y} L ${toIso(210, 345, 2).x},${toIso(210, 345, 2).y}`;
  const espinaTroncal = `M ${toIso(210, 60, 2).x},${toIso(210, 60, 2).y} L ${toIso(210, 310, 2).x},${toIso(210, 310, 2).y} L ${toIso(300, 345, 2).x},${toIso(300, 345, 2).y}`;

  return (
    <div className="w-full bg-white border border-[#64748B]/20 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm relative overflow-hidden">
      
      {/* =========================================================================
          ENCABEZADO DEL PLANO: TÍTULO, SUBTÍTULO Y SELECTORES DE CAPA
          ========================================================================= */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between pb-6 border-b border-[#64748B]/20 gap-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1A56DB] animate-pulse shrink-0"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#1A56DB] font-bold">
              DIRECCIÓN 3: BLUEPRINT CARTOGRÁFICO E ISOMÉTRICO // SEDE BOGOTÁ
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0E1B2F] font-outfit mt-1 leading-tight">
            Plano Isométrico Cartográfico e Instalaciones
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] font-sans mt-1 font-medium leading-relaxed">
            Proyección axonométrica de las 6 zonas operativas, rutas fotoluminiscentes y estaciones ergonómicas.
          </p>
        </div>

        {/* Selector de las 4 Capas Operativas Requeridas — Responsive sin recortes */}
        <div className="w-full xl:w-auto flex flex-wrap items-center gap-1.5 bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#64748B]/20 shadow-xs">
          
          {/* Capa 1: General */}
          <button
            onClick={() => setCapaActiva('GENERAL')}
            className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'GENERAL'
                ? 'bg-[#1A56DB] text-white font-bold shadow-md shadow-[#1A56DB]/25'
                : 'text-[#64748B] hover:text-[#0E1B2F] hover:bg-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>General</span>
          </button>

          {/* Capa 2: Evacuación (Verde) */}
          <button
            onClick={() => setCapaActiva('EVACUACION')}
            className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'EVACUACION'
                ? 'bg-[#10B981] text-white font-bold shadow-md shadow-[#10B981]/25'
                : 'text-[#047857] hover:bg-white'
            }`}
          >
            <DoorOpen className="w-3.5 h-3.5 shrink-0" />
            <span>Evacuación <span className="hidden sm:inline">(Verde)</span></span>
          </button>

          {/* Capa 3: Zonas de Pausa (Turquesa) */}
          <button
            onClick={() => setCapaActiva('PAUSAS')}
            className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'PAUSAS'
                ? 'bg-[#14B8A6] text-white font-bold shadow-md shadow-[#14B8A6]/25'
                : 'text-[#0B7A87] hover:bg-white'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 shrink-0" />
            <span><span className="hidden sm:inline">Zonas de </span>Pausas</span>
          </button>

          {/* Capa 4: Equipos y Extintores (Agua Marina / Rojo) */}
          <button
            onClick={() => setCapaActiva('EQUIPOS')}
            className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 ${
              capaActiva === 'EQUIPOS'
                ? 'bg-[#0B7A87] text-white font-bold shadow-md shadow-[#0B7A87]/25'
                : 'text-[#64748B] hover:bg-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Equipos <span className="hidden sm:inline">/ Extintores</span></span>
          </button>

          {/* Control de Audio Chime */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-xl bg-white border border-[#64748B]/20 text-[#64748B] hover:text-[#0E1B2F] transition-colors shrink-0"
            title={isMuted ? 'Activar sonido armónico' : 'Silenciar feedback sonoro'}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#10B981]" />}
          </button>

          {/* Botón de Simulación Activa de Evacuación */}
          <button
            onClick={alternarSimulacion}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-1.5 sm:space-x-2 border shrink-0 ${
              simulando
                ? 'bg-[#047857] hover:bg-[#035941] text-white border-emerald-400 font-bold shadow-md shadow-emerald-500/25'
                : 'bg-[#10B981]/15 hover:bg-[#10B981]/25 text-[#047857] border-[#10B981]/40 font-bold'
            }`}
            title="Activa el trazado dinámico y continuo de evacuación hacia PE-01"
          >
            {simulando ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Detener ({15 - segundosSimulacion}s)</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simular <span className="hidden sm:inline">Evacuación</span></span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* =========================================================================
          TELEMETRÍA EN VIVO DURANTE LA SIMULACIÓN
          ========================================================================= */}
      {simulando && (
        <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-[#10B981] text-white flex items-center justify-center shrink-0 shadow-sm animate-bounce">
              <DoorOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#047857] font-bold uppercase tracking-wider block">
                SIMULACIÓN DE EMERGENCIA ACTIVA // NORMA NTC 1461
              </span>
              <p className="text-xs font-bold text-emerald-900 font-sans">
                Flujo continuo despejado hacia el <strong className="text-[#047857]">Punto de Encuentro Exterior (PE-01 - Patio Principal)</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0 text-xs font-mono">
            <div className="bg-white px-3 py-1.5 rounded-xl border border-emerald-200">
              <span className="text-[#64748B] text-[10px] block">Tiempo Transcurrido</span>
              <span className="font-bold text-[#0E1B2F] num-tabular">{segundosSimulacion} segundos</span>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-xl border border-emerald-200">
              <span className="text-[#64748B] text-[10px] block">Meta Despeje</span>
              <span className="font-bold text-[#10B981] num-tabular">&le; 90 s (Conforme)</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          CUERPO: VISOR ISOMÉTRICO (COL-8) + FICHA TÉCNICA INTERACTIVA (COL-4)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        
        {/* Visor Técnico Axonométrico (Azul Marino Oscuro #0E1B2F) */}
        <div className="lg:col-span-8 bg-[#0E1B2F] rounded-3xl p-3 sm:p-5 border border-[#64748B]/30 relative shadow-inner overflow-hidden">
          
          {/* Overlay de telemetría técnica superior */}
          <div className="flex items-center justify-between px-2 pb-2 text-[11px] font-mono border-b border-[#64748B]/30 text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-ping"></span>
              <span className="text-[#2DD4BF] font-bold">PROYECCIÓN AXONOMÉTRICA 30° // PLANO SEDE</span>
            </div>
            <div className="flex items-center space-x-3 text-[10px]">
              <span>Escala 1:100</span>
              <span>•</span>
              <span className="text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                Capa: {capaActiva}
              </span>
            </div>
          </div>

          {/* SVG ISOMÉTRICO */}
          <div className="relative mt-2 w-full flex items-center justify-center overflow-hidden">
            <svg
              ref={svgRef}
              viewBox="0 0 920 580"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Plano Isométrico Cartográfico interactivo de las instalaciones de Industrias Andinas del Café"
            >
              <defs>
                {/* Patrón de Rejilla Isométrica Técnica */}
                <pattern id="iso-tech-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(20, 184, 166, 0.12)" strokeWidth="0.75" />
                </pattern>

                {/* Marcador de Flecha Fotoluminiscente Verde */}
                <marker id="flecha-fotoluminiscente" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M 0 0 L 8 4 L 0 8 Z" fill="#10B981" />
                </marker>

                {/* Estilos CSS para animaciones continuas */}
                <style>{`
                  @keyframes flujoEvacuacionIso {
                    from { stroke-dashoffset: 40; }
                    to { stroke-dashoffset: 0; }
                  }
                  .anim-flujo-evacuacion {
                    animation: flujoEvacuacionIso 0.65s linear infinite;
                  }
                  @keyframes pulsoBaliza {
                    0% { r: 14px; opacity: 0.9; }
                    50% { r: 38px; opacity: 0.3; }
                    100% { r: 52px; opacity: 0; }
                  }
                  .baliza-sonar {
                    animation: pulsoBaliza 1.8s ease-out infinite;
                  }
                  .iso-bloque {
                    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                  }
                `}</style>
              </defs>

              {/* Fondo con rejilla isométrica */}
              <rect width="920" height="580" fill="url(#iso-tech-grid)" rx="16" />

              {/* Plinto de Cimentación Perimetral Exterior */}
              <polygon
                points={`${toIso(20, 10, 0).x},${toIso(20, 10, 0).y} ${toIso(420, 10, 0).x},${toIso(420, 10, 0).y} ${toIso(420, 400, 0).x},${toIso(420, 400, 0).y} ${toIso(20, 400, 0).x},${toIso(20, 400, 0).y}`}
                fill="none"
                stroke="rgba(20, 184, 166, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />

              {/* =================================================================
                  PASILLOS Y SENDEROS ISOMÉTRICOS (Suelo Z = 0)
                  ================================================================= */}
              {/* Pasillo Troncal Central */}
              <polygon
                points={`${toIso(190, 30, 0).x},${toIso(190, 30, 0).y} ${toIso(230, 30, 0).x},${toIso(230, 30, 0).y} ${toIso(230, 310, 0).x},${toIso(230, 310, 0).y} ${toIso(190, 310, 0).x},${toIso(190, 310, 0).y}`}
                fill="rgba(14, 27, 47, 0.9)"
                stroke="rgba(20, 184, 166, 0.3)"
                strokeWidth="1"
              />

              {/* Pasillo Transversal */}
              <polygon
                points={`${toIso(40, 150, 0).x},${toIso(40, 150, 0).y} ${toIso(400, 150, 0).x},${toIso(400, 150, 0).y} ${toIso(400, 180, 0).x},${toIso(400, 180, 0).y} ${toIso(40, 180, 0).x},${toIso(40, 180, 0).y}`}
                fill="rgba(14, 27, 47, 0.9)"
                stroke="rgba(20, 184, 166, 0.3)"
                strokeWidth="1"
              />

              {/* Demarcación Peatonal de Pasillo (Líneas de Cebra según NTC 1461) */}
              {[70, 110, 165, 210, 260, 290].map((posY) => {
                const ptA = toIso(200, posY, 0.5);
                const ptB = toIso(220, posY, 0.5);
                return (
                  <line
                    key={posY}
                    x1={ptA.x}
                    y1={ptA.y}
                    x2={ptB.x}
                    y2={ptB.y}
                    stroke="#14B8A6"
                    strokeWidth="1.2"
                    strokeDasharray="2,2"
                    opacity="0.5"
                  />
                );
              })}

              {/* =================================================================
                  ZONAS OPERATIVAS (BLOQUES ISOMÉTRICOS 3D)
                  ================================================================= */}
              {ZONAS_EMPRESA.map((zona) => {
                const esSeleccionada = zonaSeleccionada.id === zona.id;
                const { x, y, w, h, z } = zona.gridCoord;
                const topPoly = getTopPoly(x, y, w, h, z);
                const leftWallPoly = getFrontLeftWall(x, y, w, h, z);
                const rightWallPoly = getFrontRightWall(x, y, w, h, z);
                const centerPos = getCenter(x, y, w, h, z);
                const labelSvg = LABELS_ZONAS_SVG[zona.id] || { linea1: zona.nombre, linea2: '' };

                // Colores adaptativos según capa activa
                let fillColor = 'rgba(15, 30, 55, 0.82)';
                let strokeColor = 'rgba(20, 184, 166, 0.45)';
                let wallLeftColor = 'rgba(10, 20, 38, 0.95)';
                let wallRightColor = 'rgba(8, 16, 32, 0.98)';

                if (esSeleccionada) {
                  fillColor = zona.id === 'ZONA-6' ? 'rgba(4, 120, 87, 0.45)' : 'rgba(20, 184, 166, 0.32)';
                  strokeColor = zona.id === 'ZONA-6' ? '#10B981' : '#2DD4BF';
                  wallLeftColor = '#0B7A87';
                  wallRightColor = '#0E1B2F';
                } else if (capaActiva === 'EVACUACION') {
                  fillColor = zona.id === 'ZONA-6' ? 'rgba(4, 120, 87, 0.35)' : 'rgba(15, 30, 55, 0.5)';
                  strokeColor = zona.id === 'ZONA-6' ? '#10B981' : 'rgba(20, 184, 166, 0.25)';
                } else if (capaActiva === 'PAUSAS') {
                  if (['ZONA-1', 'ZONA-3', 'ZONA-5'].includes(zona.id)) {
                    fillColor = 'rgba(20, 184, 166, 0.25)';
                    strokeColor = '#14B8A6';
                  }
                }

                return (
                  <g
                    key={zona.id}
                    onClick={() => setZonaSeleccionada(zona)}
                    className="cursor-pointer group iso-bloque"
                    tabIndex={0}
                    role="button"
                    aria-label={`Seleccionar área ${zona.nombre}`}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setZonaSeleccionada(zona)}
                  >
                    {/* Pared Frontal Izquierda */}
                    <polygon
                      points={leftWallPoly}
                      fill={wallLeftColor}
                      stroke={strokeColor}
                      strokeWidth="0.8"
                    />

                    {/* Pared Frontal Derecha */}
                    <polygon
                      points={rightWallPoly}
                      fill={wallRightColor}
                      stroke={strokeColor}
                      strokeWidth="0.8"
                    />

                    {/* Superficie Superior (Techo / Suelo de Zona) */}
                    <polygon
                      points={topPoly}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={esSeleccionada ? '2.5' : '1.2'}
                      className="group-hover:fill-[#14B8A6]/25 group-hover:stroke-[#2DD4BF] transition-all"
                    />

                    {/* Nombre de la Zona en 2 Líneas perfectamente calculadas para no recortarse */}
                    <text
                      x={centerPos.x}
                      y={centerPos.y - 13}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize={zona.id === 'ZONA-6' ? '11.5' : '10.5'}
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      fontWeight="700"
                    >
                      {labelSvg.linea1}
                    </text>
                    <text
                      x={centerPos.x}
                      y={centerPos.y}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize={zona.id === 'ZONA-6' ? '11.5' : '10.5'}
                      fontFamily="Plus Jakarta Sans, sans-serif"
                      fontWeight="700"
                    >
                      {labelSvg.linea2}
                    </text>

                    {/* Subtítulo técnico y aforo */}
                    <text
                      x={centerPos.x}
                      y={centerPos.y + 14}
                      textAnchor="middle"
                      fill={esSeleccionada ? '#2DD4BF' : '#94A3B8'}
                      fontSize="9"
                      fontFamily="Space Mono, monospace"
                      fontWeight="600"
                    >
                      [{zona.codigo}] • {zona.aforoNominal}/{zona.aforoMax} pers.
                    </text>

                    {/* Badge de Nivel de Riesgo GTC 45 */}
                    <text
                      x={centerPos.x}
                      y={centerPos.y + 26}
                      textAnchor="middle"
                      fill={zona.tipoRiesgoGTC45.nivelRiesgo === 'I' ? '#2DD4BF' : '#14B8A6'}
                      fontSize="8.5"
                      fontFamily="Space Mono, monospace"
                      fontWeight="bold"
                    >
                      GTC 45: NR {zona.tipoRiesgoGTC45.nivelRiesgo}
                    </text>

                    {/* Baliza Pulsante Exclusiva en PE-01 */}
                    {zona.id === 'ZONA-6' && (
                      <g transform={`translate(${centerPos.x + 65}, ${centerPos.y})`}>
                        <circle cx="0" cy="0" r="10" fill="#047857" stroke="#10B981" strokeWidth="2" />
                        <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
                        {simulando && (
                          <>
                            <circle cx="0" cy="0" r="14" fill="none" stroke="#10B981" strokeWidth="2" className="baliza-sonar" />
                            <circle cx="0" cy="0" r="28" fill="none" stroke="#2DD4BF" strokeWidth="1.5" className="baliza-sonar" style={{ animationDelay: '0.6s' }} />
                          </>
                        )}
                        <text x="0" y="-14" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="bold" fontFamily="Space Mono">
                          BALIZA PE-01
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* =================================================================
                  CAPA 2: RUTAS DE EVACUACIÓN Y SIMULACIÓN ACTIVA (Verde Esmeralda)
                  ================================================================= */}
              {(capaActiva === 'GENERAL' || capaActiva === 'EVACUACION') && (
                <g className="capa-evacuacion-iso">
                  {/* Ramales laterales que desembocan en el pasillo central */}
                  <path
                    d={`M ${rutaLab}`}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth={simulando ? '3.5' : '2.5'}
                    strokeDasharray="6,4"
                    className={simulando ? 'anim-flujo-evacuacion' : ''}
                    markerEnd="url(#flecha-fotoluminiscente)"
                  />
                  <path
                    d={`M ${rutaTost}`}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth={simulando ? '3.5' : '2.5'}
                    strokeDasharray="6,4"
                    className={simulando ? 'anim-flujo-evacuacion' : ''}
                    markerEnd="url(#flecha-fotoluminiscente)"
                  />
                  <path
                    d={`M ${rutaBodega}`}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth={simulando ? '3.5' : '2.5'}
                    strokeDasharray="6,4"
                    className={simulando ? 'anim-flujo-evacuacion' : ''}
                    markerEnd="url(#flecha-fotoluminiscente)"
                  />
                  <path
                    d={`M ${rutaEnv}`}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth={simulando ? '3.5' : '2.5'}
                    strokeDasharray="6,4"
                    className={simulando ? 'anim-flujo-evacuacion' : ''}
                    markerEnd="url(#flecha-fotoluminiscente)"
                  />
                  <path
                    d={`M ${rutaOficinas}`}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth={simulando ? '3.5' : '2.5'}
                    strokeDasharray="6,4"
                    className={simulando ? 'anim-flujo-evacuacion' : ''}
                    markerEnd="url(#flecha-fotoluminiscente)"
                  />

                  {/* Espina Troncal hacia Salida de Emergencia y PE-01 */}
                  <path
                    d={espinaTroncal}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth={simulando ? '5' : '3.5'}
                    strokeDasharray="10,6"
                    className={simulando ? 'anim-flujo-evacuacion' : ''}
                    markerEnd="url(#flecha-fotoluminiscente)"
                  />

                  {/* Cartel Salida de Emergencia Fotoluminiscente */}
                  <g transform={`translate(${toIso(210, 310, 8).x - 30}, ${toIso(210, 310, 8).y - 12})`}>
                    <rect width="60" height="15" rx="3" fill="#047857" stroke="#10B981" strokeWidth="1" />
                    <text x="30" y="11" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" fontFamily="Space Mono">
                      SALIDA EMERG.
                    </text>
                  </g>
                </g>
              )}

              {/* =================================================================
                  CAPA 3: ESTACIONES DE PAUSAS VITALES (Turquesa #14B8A6)
                  ================================================================= */}
              {(capaActiva === 'GENERAL' || capaActiva === 'PAUSAS') && (
                <g className="capa-pausas-iso">
                  {/* Estación EP-01 en Oficinas Administrativas */}
                  <g transform={`translate(${getCenter(40, 310, 150, 70, 22).x}, ${getCenter(40, 310, 150, 70, 22).y - 24})`}>
                    <circle cx="0" cy="0" r="14" fill="rgba(20, 184, 166, 0.25)" stroke="#14B8A6" strokeWidth="1.8" strokeDasharray="3,2" />
                    <circle cx="0" cy="0" r="4" fill="#2DD4BF" />
                    <text x="0" y="-17" textAnchor="middle" fill="#2DD4BF" fontSize="8" fontWeight="bold" fontFamily="Space Mono">
                      PAUSA VITAL EP-01
                    </text>
                  </g>

                  {/* Estación EP-02 en Línea de Envasado */}
                  <g transform={`translate(${getCenter(230, 180, 170, 110, 22).x}, ${getCenter(230, 180, 170, 110, 22).y - 24})`}>
                    <circle cx="0" cy="0" r="14" fill="rgba(20, 184, 166, 0.25)" stroke="#14B8A6" strokeWidth="1.8" strokeDasharray="3,2" />
                    <circle cx="0" cy="0" r="4" fill="#2DD4BF" />
                    <text x="0" y="-17" textAnchor="middle" fill="#2DD4BF" fontSize="8" fontWeight="bold" fontFamily="Space Mono">
                      PAUSA VITAL EP-02
                    </text>
                  </g>

                  {/* Estación EP-03 en Molienda */}
                  <g transform={`translate(${getCenter(230, 30, 170, 120, 22).x}, ${getCenter(230, 30, 170, 120, 22).y - 24})`}>
                    <circle cx="0" cy="0" r="14" fill="rgba(20, 184, 166, 0.25)" stroke="#14B8A6" strokeWidth="1.8" strokeDasharray="3,2" />
                    <circle cx="0" cy="0" r="4" fill="#2DD4BF" />
                    <text x="0" y="-17" textAnchor="middle" fill="#2DD4BF" fontSize="8" fontWeight="bold" fontFamily="Space Mono">
                      PAUSA VITAL EP-03
                    </text>
                  </g>
                </g>
              )}

              {/* =================================================================
                  CAPA 4: EQUIPOS DE EXTINCIÓN Y PRIMEROS AUXILIOS
                  ================================================================= */}
              {(capaActiva === 'GENERAL' || capaActiva === 'EQUIPOS') && (
                <g className="capa-equipos-iso">
                  {/* Extintores Solkaflam / ABC / CO2 (Rojo de Señal #DC2626) */}
                  {[
                    { pos: toIso(50, 40, 22), label: 'SOLK' },
                    { pos: toIso(240, 40, 22), label: 'ABC' },
                    { pos: toIso(390, 40, 22), label: 'ABC' },
                    { pos: toIso(240, 190, 22), label: 'CO2' },
                    { pos: toIso(50, 190, 22), label: 'ABC' },
                    { pos: toIso(50, 320, 22), label: 'SOLK' },
                  ].map((ext, idx) => (
                    <g key={idx} transform={`translate(${ext.pos.x}, ${ext.pos.y})`}>
                      <circle cx="0" cy="0" r="7.5" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1.2" />
                      <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="Space Mono">
                        E
                      </text>
                    </g>
                  ))}

                  {/* Botiquines y DEA (Azul Corporativo / Verde) */}
                  <g transform={`translate(${toIso(180, 40, 22).x}, ${toIso(180, 40, 22).y})`}>
                    <rect x="-7" y="-7" width="14" height="14" rx="3" fill="#1A56DB" stroke="#FFFFFF" strokeWidth="1" />
                    <text x="0" y="3.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">+</text>
                  </g>
                  <g transform={`translate(${toIso(180, 320, 22).x}, ${toIso(180, 320, 22).y})`}>
                    <rect x="-8" y="-8" width="16" height="16" rx="3" fill="#0B7A87" stroke="#2DD4BF" strokeWidth="1.2" />
                    <text x="0" y="3.5" textAnchor="middle" fill="#2DD4BF" fontSize="7" fontWeight="bold">DEA</text>
                  </g>
                  <g transform={`translate(${toIso(180, 230, 22).x}, ${toIso(180, 230, 22).y})`}>
                    <rect x="-7" y="-7" width="14" height="14" rx="3" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
                    <text x="0" y="3.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">+</text>
                  </g>
                </g>
              )}
            </svg>
          </div>

          {/* Leyenda Técnica Normativa Inferior (ISO 7010 / NTC 1461) */}
          <div className="flex flex-wrap items-center justify-between mt-3 pt-3 border-t border-[#64748B]/30 text-[11px] font-mono text-slate-300 gap-2">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0"></span>
              <span>Ruta Evacuación NTC 1461</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] shrink-0"></span>
              <span>Pausa Vital Ergonómica</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] shrink-0"></span>
              <span>Extintor / Conato</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1A56DB] shrink-0"></span>
              <span>Primeros Auxilios / DEA</span>
            </span>
          </div>
        </div>

        {/* =====================================================================
            PANEL LATERAL: FICHA TÉCNICA INTERACTIVA DE LA ZONA SELECCIONADA
            Fondo: Azul Grisáceo Claro (#F8FAFC)
            Contenedores: Blanco (#FFFFFF) con bordes en #64748B/20
            ===================================================================== */}
        <div className="lg:col-span-4 bg-[#F8FAFC] rounded-3xl p-4 sm:p-6 border border-[#64748B]/20 text-[#0E1B2F] shadow-xs space-y-4">
          
          {/* Cabecera de la Ficha */}
          <div className="flex items-center justify-between pb-3 border-b border-[#64748B]/20">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-[#0B7A87]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#0B7A87] font-bold">
                FICHA TÉCNICA DE CONTROL
              </span>
            </div>
            <span className="text-[10px] bg-white text-[#0E1B2F] px-2.5 py-1 rounded-lg font-mono font-bold border border-[#64748B]/20 shadow-xs">
              {zonaSeleccionada.codigo}
            </span>
          </div>

          {/* Nombre y Ubicación */}
          <div>
            <h3 className="text-xl font-black text-[#0E1B2F] font-outfit leading-tight break-words">
              {zonaSeleccionada.nombre}
            </h3>
            <p className="text-xs text-[#0B7A87] font-mono mt-1 font-bold break-words">
              {zonaSeleccionada.ala}
            </p>
          </div>

          {/* Métricas de Aforo y Liderazgo */}
          <div className="bg-white p-4 rounded-2xl border border-[#64748B]/20 space-y-2.5 text-xs shadow-xs">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <span className="text-[#64748B] shrink-0">Aforo Autorizado:</span>
              <span className="font-bold text-[#0E1B2F] font-mono break-words">
                {zonaSeleccionada.aforoNominal} nominal / {zonaSeleccionada.aforoMax} máx.
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
              <span className="text-[#64748B] shrink-0">Líder de Área:</span>
              <span className="font-semibold text-[#0E1B2F] break-words sm:text-right">
                {zonaSeleccionada.responsableZona}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
              <span className="text-[#64748B] shrink-0">Suplente Brigada:</span>
              <span className="font-semibold text-[#0B7A87] break-words sm:text-right">
                {zonaSeleccionada.suplenteBrigada}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 pt-2 border-t border-[#64748B]/10">
              <span className="text-[#64748B] shrink-0">Canal de Radio:</span>
              <span className="font-mono font-bold text-[#1A56DB] break-words">
                {zonaSeleccionada.canalRadio}
              </span>
            </div>
          </div>

          {/* Matriz de Riesgo GTC 45 Detallada — Totalmente legible sin recortes */}
          <div className="bg-white p-4 rounded-2xl border border-[#64748B]/20 space-y-3 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <span className="text-[11px] font-bold text-[#0E1B2F] uppercase tracking-wider font-mono">
                Matriz de Riesgo (GTC 45)
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                zonaSeleccionada.tipoRiesgoGTC45.nivelRiesgo === 'I'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : zonaSeleccionada.tipoRiesgoGTC45.nivelRiesgo === 'II'
                  ? 'bg-blue-50 text-[#1A56DB] border-blue-200'
                  : 'bg-teal-50 text-[#0B7A87] border-teal-200'
              }`}>
                NIVEL DE RIESGO: {zonaSeleccionada.tipoRiesgoGTC45.nivelRiesgo}
              </span>
            </div>

            <p className="text-xs text-[#0E1B2F] font-sans font-medium leading-relaxed bg-[#F8FAFC] p-3 rounded-xl border border-[#64748B]/15 break-words">
              {zonaSeleccionada.tipoRiesgoGTC45.clasificacion}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#64748B]/15">
                <span className="text-[#64748B] block text-[10px]">Deficiencia / Exposición</span>
                <span className="font-bold text-[#0E1B2F] block mt-0.5 break-words">
                  ND: {zonaSeleccionada.tipoRiesgoGTC45.nivelDeficiencia} • NE: {zonaSeleccionada.tipoRiesgoGTC45.nivelExposicion}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#64748B]/15">
                <span className="text-[#64748B] block text-[10px]">Aceptabilidad Legal</span>
                <span className="font-bold text-[#047857] block mt-0.5 break-words leading-tight">
                  {zonaSeleccionada.tipoRiesgoGTC45.aceptabilidad}
                </span>
              </div>
            </div>

            {/* Medidas de Intervención Clave */}
            <div className="text-xs space-y-2 pt-1">
              <div>
                <span className="text-[10px] font-mono text-[#0B7A87] font-bold block">Control de Ingeniería:</span>
                <p className="text-[11px] text-[#64748B] font-sans break-words leading-relaxed">{zonaSeleccionada.tipoRiesgoGTC45.controles.ingenieria}</p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#1A56DB] font-bold block">EPP Obligatorio:</span>
                <p className="text-[11px] text-[#64748B] font-sans break-words leading-relaxed">{zonaSeleccionada.tipoRiesgoGTC45.controles.epp}</p>
              </div>
            </div>
          </div>

          {/* Equipos de Seguridad Presentes */}
          <div className="bg-white p-4 rounded-2xl border border-[#64748B]/20 shadow-xs space-y-2.5">
            <span className="text-[11px] font-bold text-[#0E1B2F] uppercase tracking-wider font-mono block">
              Equipamiento de Protección Presente
            </span>
            <ul className="space-y-2">
              {zonaSeleccionada.equiposSeguridad.map((eq, i) => (
                <li key={i} className="text-xs text-[#0E1B2F] flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="font-semibold block leading-tight break-words">{eq.nombre}</span>
                    <span className="text-[10px] text-[#64748B] font-sans block mt-0.5 break-words">{eq.detalle}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Acciones y Enlace Directo a Radicación */}
          <div className="pt-2">
            <button
              onClick={() => abrirModalParaZona(zonaSeleccionada.id)}
              className="w-full py-3 px-4 rounded-xl bg-[#1A56DB] hover:bg-blue-700 text-white font-mono text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-md shadow-[#1A56DB]/20 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Radicar Reporte de esta Zona</span>
            </button>
          </div>

          <div className="pt-2 border-t border-[#64748B]/20 text-[10px] text-[#64748B] flex items-center justify-between font-mono">
            <span>Última inspección: {zonaSeleccionada.ultimaInspeccion}</span>
            <span className="text-[#10B981] font-bold">✓ Conforme</span>
          </div>
        </div>
      </div>

      {/* Modal de Radicación de Sugerencias y Reportes */}
      <SuggestionModal
        isOpen={modalSugerenciaAbierto}
        onClose={() => setModalSugerenciaAbierto(false)}
        initialZoneId={zonaModal}
        initialZoneName={zonaSeleccionada.nombre}
      />
    </div>
  );
}
