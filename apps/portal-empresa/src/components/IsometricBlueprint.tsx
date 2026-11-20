'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  Layers, 
  MapPin, 
  ShieldAlert, 
  DoorOpen, 
  Info, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Send,
  Flame,
  Activity,
  Calendar,
  Bell,
  User,
  Sliders,
  FileCheck2,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building,
  Check
} from 'lucide-react';
import SuggestionModal from './SuggestionModal';

/* =========================================================================
   DEFINICIÓN DE ZONAS OPERATIVAS BASADAS EN EL PLANO REAL
   (Innovatec Soluciones S.A. // SG-SST)
   ========================================================================= */
export interface ZonaPlanoReal {
  id: string;
  codigo: string;
  nombre: string;
  categoria: 'OPERATIVA' | 'ADMINISTRATIVA' | 'REUNION' | 'TECNICA' | 'SERVICIOS';
  areaM2: number;
  aforoNominal: number;
  aforoMax: number;
  aforoActual: number;
  temperatura: string;
  statusSST: 'PASSED' | 'WARNING' | 'CRITICAL';
  salidaCercana: string;
  distanciaSalidaM: number;
  tipoRiesgoGTC45: {
    clasificacion: string;
    nivelDeficiencia: string;
    nivelExposicion: string;
    nivelProbabilidad: string;
    nivelConsecuencia: string;
    nivelRiesgo: 'I' | 'II' | 'III' | 'IV';
    aceptabilidad: string;
    controles: {
      ingenieria: string;
      administrativos: string;
      epp: string;
    };
  };
  equiposSeguridad: Array<{ nombre: string; tipo: 'EXTINTOR' | 'PRIMEROS_AUXILIOS' | 'DETECTOR'; detalle: string }>;
  responsableZona: string;
  colorHalo: string;
  // Bounding box en coordenadas CAD del plano (X: 0..1000, Y: 0..500)
  cadBox: { x: number; y: number; w: number; h: number };
}

export const ZONAS_REALES_SST: ZonaPlanoReal[] = [
  {
    id: 'Z-PROD',
    codigo: 'Z-01-PROD',
    nombre: 'Área de Ensamblaje / Producción',
    categoria: 'OPERATIVA',
    areaM2: 52,
    aforoNominal: 8,
    aforoMax: 12,
    aforoActual: 8,
    temperatura: '22.1°C',
    statusSST: 'PASSED',
    salidaCercana: 'Salida de Emergencia 3 (Norte-Este) & Acceso Carga',
    distanciaSalidaM: 4.5,
    tipoRiesgoGTC45: {
      clasificacion: 'Mecánico (Herramientas de ensamble, componentes cortopunzantes) y Físico (Ruido continuo 82 dBA)',
      nivelDeficiencia: 'Medio (2)',
      nivelExposicion: 'Continua (4)',
      nivelProbabilidad: 'Alto (8)',
      nivelConsecuencia: 'Grave (25)',
      nivelRiesgo: 'II',
      aceptabilidad: 'Aceptable con Control Específico',
      controles: {
        ingenieria: 'Mesas antiestáticas ESD, iluminación focalizada 500 Lux, extracción localizada de humos de soldadura.',
        administrativos: 'Pausas osteomusculares cada 60 min, inspección preoperacional de herramientas manuales.',
        epp: 'Guantes de nitrilo anticorte Nivel 3, gafas de policarbonato con filtro UV, calzado dieléctrico.',
      },
    },
    equiposSeguridad: [
      { nombre: 'Extintor PQS ABC (20 lbs)', tipo: 'EXTINTOR', detalle: 'Ubicado en columna central de ensamblaje' },
      { nombre: 'Sensor Óptico de Humo', tipo: 'DETECTOR', detalle: 'Enlace inalámbrico a central de alarmas' },
      { nombre: 'Botiquín Tipo B Industrial', tipo: 'PRIMEROS_AUXILIOS', detalle: 'Dotación contra laceraciones y quemaduras' }
    ],
    responsableZona: 'Ing. Carlos Mendoza (Líder Producción)',
    colorHalo: '#F59E0B', // Ámbar Neón (como en la referencia)
    cadBox: { x: 720, y: 30, w: 260, h: 160 },
  },
  {
    id: 'Z-ALMACEN',
    codigo: 'Z-02-ALM',
    nombre: 'Almacén General y Estibas',
    categoria: 'OPERATIVA',
    areaM2: 85,
    aforoNominal: 4,
    aforoMax: 8,
    aforoActual: 3,
    temperatura: '20.4°C',
    statusSST: 'PASSED',
    salidaCercana: 'Acceso de Carga Este (Portón Seccional)',
    distanciaSalidaM: 6.0,
    tipoRiesgoGTC45: {
      clasificacion: 'Biomecánico (Levantamiento de cargas pesadas) y Locativo (Trabajo en altura en estanterías > 1.50m)',
      nivelDeficiencia: 'Alto (6)',
      nivelExposicion: 'Frecuente (3)',
      nivelProbabilidad: 'Alto (18)',
      nivelConsecuencia: 'Muy Grave (60)',
      nivelRiesgo: 'I',
      aceptabilidad: 'No Aceptable sin Controles Severos',
      controles: {
        ingenieria: 'Estanterías industriales ancladas con pernos Hilti a losa, transpaletas hidráulicas de apoyo.',
        administrativos: 'Límite de carga manual máx. 25 kg hombres / 12.5 kg mujeres (Res. 2400/1979). Certificación alturas.',
        epp: 'Casco con barbuquejo dieléctrico, botas con puntera de acero, faja ergonómica certificada.',
      },
    },
    equiposSeguridad: [
      { nombre: 'Extintor PQS ABC (20 lbs)', tipo: 'EXTINTOR', detalle: 'Cabecera de rack pasillo 2' },
      { nombre: 'Alarma Manual tipo Estación', tipo: 'DETECTOR', detalle: 'Pulsador de emergencia junto a portón' },
    ],
    responsableZona: 'Javier Enrique Gómez (Jefe Almacén)',
    colorHalo: '#F59E0B',
    cadBox: { x: 810, y: 200, w: 170, h: 280 },
  },
  {
    id: 'Z-TI',
    codigo: 'Z-03-SRV',
    nombre: 'Cuarto de Servidores / Datacenter IT',
    categoria: 'TECNICA',
    areaM2: 18,
    aforoNominal: 1,
    aforoMax: 3,
    aforoActual: 1,
    temperatura: '18.5°C',
    statusSST: 'PASSED',
    salidaCercana: 'Salida de Emergencia 1 (Norte)',
    distanciaSalidaM: 2.5,
    tipoRiesgoGTC45: {
      clasificacion: 'Eléctrico (Alta tensión en UPS y tableros trifásicos) y Tecnológico (Riesgo de arco eléctrico / conato)',
      nivelDeficiencia: 'Alto (6)',
      nivelExposicion: 'Ocasional (2)',
      nivelProbabilidad: 'Medio (12)',
      nivelConsecuencia: 'Mortal / Catastrófico (100)',
      nivelRiesgo: 'I',
      aceptabilidad: 'Crítico — Control Automático',
      controles: {
        ingenieria: 'Sistema de supresión de incendios por gas limpio FM-200, climatización de precisión dual redundancy.',
        administrativos: 'Acceso restringido por tarjeta biométrica RFID, mantenimiento preventivo según RETIE.',
        epp: 'Calzado dieléctrico 18 kV, traje ignífugo para maniobras en tableros energizados.',
      },
    },
    equiposSeguridad: [
      { nombre: 'Extintor Solkaflam 123 (10 lbs)', tipo: 'EXTINTOR', detalle: 'Agente limpio no conductor de electricidad' },
      { nombre: 'Boquilla de Descarga FM-200', tipo: 'DETECTOR', detalle: 'Inundación total automática ante humo' },
    ],
    responsableZona: 'Ing. David Arboleda (SysAdmin / IT)',
    colorHalo: '#06B6D4', // Cian Neón Técnico
    cadBox: { x: 400, y: 30, w: 100, h: 140 },
  },
  {
    id: 'Z-ID',
    codigo: 'Z-04-DEV',
    nombre: 'Desarrollo, Diseño e I+D',
    categoria: 'OPERATIVA',
    areaM2: 44,
    aforoNominal: 6,
    aforoMax: 10,
    aforoActual: 5,
    temperatura: '21.8°C',
    statusSST: 'PASSED',
    salidaCercana: 'Salida de Emergencia 2 (Norte)',
    distanciaSalidaM: 2.0,
    tipoRiesgoGTC45: {
      clasificacion: 'Biomecánico (Postura sedente prolongada en pantallas VDT) y Psicosocial (Carga mental / entregas)',
      nivelDeficiencia: 'Medio (2)',
      nivelExposicion: 'Continua (4)',
      nivelProbabilidad: 'Alto (8)',
      nivelConsecuencia: 'Leve (10)',
      nivelRiesgo: 'III',
      aceptabilidad: 'Mejorable con Ergonomía',
      controles: {
        ingenieria: 'Sillas ergonómicas certificación BIFMA, brazos de monitor ajustables en 3 ejes, luminarias antirreflejo.',
        administrativos: 'Pausas activas visuales cada 50 minutos (regla 20-20-20), monitoreo de confort higrotérmico.',
        epp: 'Gafas con filtro blue-light antirreflejo para programadores y diseñadores.',
      },
    },
    equiposSeguridad: [
      { nombre: 'Extintor Solkaflam 123 (5 lbs)', tipo: 'EXTINTOR', detalle: 'Montado en pared norte junto a salida' },
      { nombre: 'Detector Fotoeléctrico', tipo: 'DETECTOR', detalle: 'Conexión direccionable al panel central' },
    ],
    responsableZona: 'Laura Camila Torres (Líder I+D)',
    colorHalo: '#10B981', // Verde Esmeralda
    cadBox: { x: 510, y: 30, w: 200, h: 140 },
  },
  {
    id: 'Z-JUNTAS1',
    codigo: 'Z-05-JUN1',
    nombre: 'Sala de Juntas Ejecutiva 1',
    categoria: 'REUNION',
    areaM2: 36,
    aforoNominal: 10,
    aforoMax: 12,
    aforoActual: 0,
    temperatura: '21.0°C',
    statusSST: 'PASSED',
    salidaCercana: 'Salida de Emergencia 1 (Norte)',
    distanciaSalidaM: 3.0,
    tipoRiesgoGTC45: {
      clasificacion: 'Locativo Menor (Cables pasacables, tropiezo) y Biomecánico leve',
      nivelDeficiencia: 'Bajo (1)',
      nivelExposicion: 'Ocasional (2)',
      nivelProbabilidad: 'Bajo (2)',
      nivelConsecuencia: 'Leve (10)',
      nivelRiesgo: 'IV',
      aceptabilidad: 'Aceptable sin Novedad',
      controles: {
        ingenieria: 'Canaletas embutidas en mesa para conectividad HDMI/Red, climatización silenciosa.',
        administrativos: 'Control estricto de aforo máximo en puerta (máx 12 personas).',
        epp: 'No requiere EPP especial.',
      },
    },
    equiposSeguridad: [
      { nombre: 'Detector Iónico de Humo', tipo: 'DETECTOR', detalle: 'En cielo raso suspendido' },
    ],
    responsableZona: 'Secretaría de Gerencia',
    colorHalo: '#3B82F6',
    cadBox: { x: 190, y: 30, w: 200, h: 140 },
  },
  {
    id: 'Z-JUNTAS2',
    codigo: 'Z-06-JUN2',
    nombre: 'Sala de Juntas Central 2',
    categoria: 'REUNION',
    areaM2: 48,
    aforoNominal: 12,
    aforoMax: 16,
    aforoActual: 6,
    temperatura: '21.5°C',
    statusSST: 'PASSED',
    salidaCercana: 'Pasillo Central hacia Acceso Principal',
    distanciaSalidaM: 8.0,
    tipoRiesgoGTC45: {
      clasificacion: 'Locativo y Biomecánico',
      nivelDeficiencia: 'Bajo (1)',
      nivelExposicion: 'Frecuente (3)',
      nivelProbabilidad: 'Medio (3)',
      nivelConsecuencia: 'Leve (10)',
      nivelRiesgo: 'IV',
      aceptabilidad: 'Aceptable Conforme',
      controles: {
        ingenieria: 'Doble puerta de salida abatible hacia afuera conforme a NSR-10.',
        administrativos: 'Plan de evacuación impreso junto al interruptor.',
        epp: 'No aplica.',
      },
    },
    equiposSeguridad: [
      { nombre: 'Sensor de Humo y Térmico', tipo: 'DETECTOR', detalle: 'Direccionable zona 2' }
    ],
    responsableZona: 'Coordinación COPASST',
    colorHalo: '#3B82F6',
    cadBox: { x: 190, y: 220, w: 230, h: 140 },
  },
  {
    id: 'Z-RECEPCION',
    codigo: 'Z-07-REC',
    nombre: 'Recepción, Hall y Sala de Espera',
    categoria: 'ADMINISTRATIVA',
    areaM2: 60,
    aforoNominal: 10,
    aforoMax: 20,
    aforoActual: 4,
    temperatura: '21.2°C',
    statusSST: 'PASSED',
    salidaCercana: 'Acceso Principal Oeste (Doble Batiente)',
    distanciaSalidaM: 1.5,
    tipoRiesgoGTC45: {
      clasificacion: 'Público (Ingreso de terceros no autorizados) y Locativo (Piso pulido / riesgo de resbalón)',
      nivelDeficiencia: 'Medio (2)',
      nivelExposicion: 'Continua (4)',
      nivelProbabilidad: 'Alto (8)',
      nivelConsecuencia: 'Leve (10)',
      nivelRiesgo: 'III',
      aceptabilidad: 'Mejorable con Controles de Seguridad Física',
      controles: {
        ingenieria: 'Cinta antideslizante en umbral de entrada, torniquetes de control biométrico.',
        administrativos: 'Registro de visitas con carné de identificación e inducción SST express.',
        epp: 'Calzado antideslizante.',
      },
    },
    equiposSeguridad: [
      { nombre: 'Extintor Solkaflam 123 (10 lbs)', tipo: 'EXTINTOR', detalle: 'Detrás de mostrador de recepción' },
      { nombre: 'Pulsador de Pánico Asaltos/Emergencia', tipo: 'DETECTOR', detalle: 'Enlace directo con Policía 123 y Central SST' },
      { nombre: 'Botiquín Primeros Auxilios Tipo A', tipo: 'PRIMEROS_AUXILIOS', detalle: 'Junto a sala de espera' },
    ],
    responsableZona: 'Valeria Cárdenas (Recepcionista)',
    colorHalo: '#10B981',
    cadBox: { x: 20, y: 200, w: 160, h: 280 },
  },
  {
    id: 'Z-OFICINAS-SUR',
    codigo: 'Z-08-OFIC',
    nombre: 'Batería de Oficinas Sur (Gerencia, RRHH, Finanzas)',
    categoria: 'ADMINISTRATIVA',
    areaM2: 78,
    aforoNominal: 14,
    aforoMax: 18,
    aforoActual: 11,
    temperatura: '22.0°C',
    statusSST: 'PASSED',
    salidaCercana: 'Pasillo Sur hacia Salida 2 o Recepción',
    distanciaSalidaM: 9.0,
    tipoRiesgoGTC45: {
      clasificacion: 'Biomecánico (Sedestación) y Psicosocial (Atención y responsabilidades directivas)',
      nivelDeficiencia: 'Medio (2)',
      nivelExposicion: 'Continua (4)',
      nivelProbabilidad: 'Alto (8)',
      nivelConsecuencia: 'Leve (10)',
      nivelRiesgo: 'III',
      aceptabilidad: 'Aceptable con Controles Ergonómicos',
      controles: {
        ingenieria: 'Luminarias microprismáticas < 19 UGR para prevención de fatiga visual.',
        administrativos: 'Capacitaciones anuales de manejo de estrés y pausas activas.',
        epp: 'No aplica.',
      },
    },
    equiposSeguridad: [
      { nombre: 'Extintor PQS ABC (10 lbs)', tipo: 'EXTINTOR', detalle: 'Pasillo intermedio oficinas sur' },
      { nombre: 'Detectores Fotoeléctricos', tipo: 'DETECTOR', detalle: 'Uno por cada oficina privada' },
    ],
    responsableZona: 'Dra. Elena Santos (Directora RRHH)',
    colorHalo: '#14B8A6',
    cadBox: { x: 190, y: 390, w: 510, h: 90 },
  },
  {
    id: 'Z-COMEDOR',
    codigo: 'Z-09-COM',
    nombre: 'Comedor / Kitchenette y Servicios',
    categoria: 'SERVICIOS',
    areaM2: 32,
    aforoNominal: 8,
    aforoMax: 12,
    aforoActual: 2,
    temperatura: '22.5°C',
    statusSST: 'PASSED',
    salidaCercana: 'Pasillo Este hacia Acceso de Carga',
    distanciaSalidaM: 5.0,
    tipoRiesgoGTC45: {
      clasificacion: 'Físico (Quemaduras por microondas y cafetera) y Biológico / Higiene alimentaria',
      nivelDeficiencia: 'Medio (2)',
      nivelExposicion: 'Ocasional (2)',
      nivelProbabilidad: 'Bajo (4)',
      nivelConsecuencia: 'Grave (25)',
      nivelRiesgo: 'III',
      aceptabilidad: 'Aceptable con Mantenimiento',
      controles: {
        ingenieria: 'Tomacorrientes GFCI a prueba de agua y cortocircuitos, extractor de olores.',
        administrativos: 'Protocolo de desinfección diaria y limpieza de superficies.',
        epp: 'Guantes de látex y delantal para personal de aseo.',
      },
    },
    equiposSeguridad: [
      { nombre: 'Extintor Acetato de Potasio Tipo K', tipo: 'EXTINTOR', detalle: 'Especial para fuegos en cocinas y grasas' },
      { nombre: 'Detector Térmico de Temperatura', tipo: 'DETECTOR', detalle: 'Evita falsas alarmas por vapor de cocción' },
    ],
    responsableZona: 'Gloria Inés Patiño (Líder COPASST)',
    colorHalo: '#10B981',
    cadBox: { x: 720, y: 200, w: 80, h: 280 },
  },
];

export default function IsometricBlueprint() {
  const [capaActiva, setCapaActiva] = useState<'GENERAL' | 'EVACUACION' | 'EQUIPOS' | 'RIESGOS'>('GENERAL');
  const [zonaSeleccionada, setZonaSeleccionada] = useState<ZonaPlanoReal>(ZONAS_REALES_SST[0]);
  const [zonaHover, setZonaHover] = useState<ZonaPlanoReal | null>(null);
  const [simulandoEvacuacion, setSimulandoEvacuacion] = useState(false);
  const [sonidoHabilitado, setSonidoHabilitado] = useState(true);
  const [modalSugerenciaAbierto, setModalSugerenciaAbierto] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [tiempoSimulacion, setTiempoSimulacion] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Reproducción de sonido de evacuación armónico (Web Audio API)
  const reproducirChimeEvacuacion = () => {
    if (!sonidoHabilitado) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Secuencia de campanas armónicas de seguridad (C5, E5, G5, C6)
      const frecuencias = [523.25, 659.25, 783.99, 1046.50];
      const tiempos = [0, 0.14, 0.28, 0.42];

      frecuencias.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + tiempos[idx]);

        gain.gain.setValueAtTime(0, ctx.currentTime + tiempos[idx]);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + tiempos[idx] + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + tiempos[idx] + 0.55);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + tiempos[idx]);
        osc.stop(ctx.currentTime + tiempos[idx] + 0.6);
      });
    } catch {
      // Audio no disponible
    }
  };

  const toggleSimulacion = () => {
    if (!simulandoEvacuacion) {
      setSimulandoEvacuacion(true);
      setCapaActiva('EVACUACION');
      setTiempoSimulacion(0);
      reproducirChimeEvacuacion();
    } else {
      setSimulandoEvacuacion(false);
      setTiempoSimulacion(0);
    }
  };

  // Temporizador de simulación
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (simulandoEvacuacion) {
      timer = setInterval(() => {
        setTiempoSimulacion((prev) => {
          if (prev >= 25) {
            setSimulandoEvacuacion(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [simulandoEvacuacion]);

  // Animación de entrada GSAP
  useEffect(() => {
    if (!svgRef.current) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      gsap.fromTo(
        '.cad-wall-element',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.03, ease: 'power2.out' }
      );
    }
  }, []);

  // Detección de parámetros de URL (?simular=true & ?focus=...)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('simular') === 'true') {
        setSimulandoEvacuacion(true);
        setCapaActiva('EVACUACION');
        setTiempoSimulacion(0);
      }
      const focusParam = params.get('focus');
      if (focusParam) {
        const found = ZONAS_REALES_SST.find(z => 
          z.id.toLowerCase().includes(focusParam.toLowerCase()) || 
          z.nombre.toLowerCase().includes(focusParam.toLowerCase())
        );
        if (found) {
          setZonaSeleccionada(found);
        }
      }
    }
  }, []);

  /* =========================================================================
     MOTOR DE PROYECCIÓN ISOMÉTRICA (30° CAD AXONOMETRIC ENGINE)
     Transforma coordenadas del plano 2D (X: 0..1000, Y: 0..500) a pantalla SVG
     ========================================================================= */
  const originX = 720;
  const originY = 230;
  const scale = 1.12;
  const cos30 = 0.866025;
  const sin30 = 0.5;

  const toIso = (x: number, y: number, z: number = 0) => {
    const screenX = originX + (x - y) * cos30 * scale;
    const screenY = originY + (x + y) * sin30 * scale - z * scale;
    return { x: Math.round(screenX), y: Math.round(screenY) };
  };

  // Función auxiliar para dibujar un polígono de piso isométrico
  const isoFloor = (x: number, y: number, w: number, h: number, z: number = 0) => {
    const p1 = toIso(x, y, z);
    const p2 = toIso(x + w, y, z);
    const p3 = toIso(x + w, y + h, z);
    const p4 = toIso(x, y + h, z);
    return `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`;
  };

  // Función para dibujar muros con volumen 3D (Cutaway a altura zWall)
  const isoWallBox = (x: number, y: number, w: number, h: number, wallHeight: number = 26) => {
    // Cara superior (top face)
    const t1 = toIso(x, y, wallHeight);
    const t2 = toIso(x + w, y, wallHeight);
    const t3 = toIso(x + w, y + h, wallHeight);
    const t4 = toIso(x, y + h, wallHeight);
    const topPolygon = `${t1.x},${t1.y} ${t2.x},${t2.y} ${t3.x},${t3.y} ${t4.x},${t4.y}`;

    // Cara frontal sur (front-south face)
    const b3 = toIso(x + w, y + h, 0);
    const b4 = toIso(x, y + h, 0);
    const frontPolygon = `${t4.x},${t4.y} ${t3.x},${t3.y} ${b3.x},${b3.y} ${b4.x},${b4.y}`;

    // Cara lateral este (right-east face)
    const b2 = toIso(x + w, y, 0);
    const rightPolygon = `${t2.x},${t2.y} ${t3.x},${t3.y} ${b3.x},${b3.y} ${b2.x},${b2.y}`;

    return { topPolygon, frontPolygon, rightPolygon };
  };

  // Coordenadas calculadas para rutas de evacuación
  // 1. Ruta desde Ensamblaje hacia Salida 3
  const pSalida3 = toIso(950, 30, 2);
  const pProduccionCentro = toIso(850, 110, 2);
  const pSalidaCarga = toIso(980, 180, 2);

  // 2. Ruta troncal desde Almacén hacia pasillos
  const pAlmacen1 = toIso(900, 340, 2);
  const pAlmacenSalida = toIso(810, 270, 2);

  // 3. Troncal central
  const pPasilloEste = toIso(720, 195, 2);
  const pPasilloCentro = toIso(450, 195, 2);
  const pPasilloOeste = toIso(180, 195, 2);

  // 4. Salida de Emergencia 2 (I+D)
  const pSalida2 = toIso(690, 30, 2);
  const pIDCentro = toIso(610, 100, 2);

  // 5. Salida de Emergencia 1 (Sala de Juntas 1)
  const pSalida1 = toIso(370, 30, 2);
  const pJuntas1Centro = toIso(290, 100, 2);

  // 6. Acceso Principal Oeste
  const pAccesoPrincipal = toIso(20, 250, 2);

  // Rutas SVG
  const rutaEvacNorte = `M ${pIDCentro.x},${pIDCentro.y} L ${pSalida2.x},${pSalida2.y}`;
  const rutaEvacJuntas1 = `M ${pJuntas1Centro.x},${pJuntas1Centro.y} L ${pSalida1.x},${pSalida1.y}`;
  const rutaEvacProd = `M ${pProduccionCentro.x},${pProduccionCentro.y} L ${pSalida3.x},${pSalida3.y}`;
  const rutaTroncalPrincipal = `M ${pAlmacen1.x},${pAlmacen1.y} L ${pAlmacenSalida.x},${pAlmacenSalida.y} L ${pPasilloEste.x},${pPasilloEste.y} L ${pPasilloCentro.x},${pPasilloCentro.y} L ${pPasilloOeste.x},${pPasilloOeste.y} L ${pAccesoPrincipal.x},${pAccesoPrincipal.y}`;
  const rutaConexionID = `M ${pIDCentro.x},${pIDCentro.y} L ${toIso(610, 195, 2).x},${toIso(610, 195, 2).y}`;
  const rutaConexionOficinasSur = `M ${toIso(450, 420, 2).x},${toIso(450, 420, 2).y} L ${pPasilloCentro.x},${pPasilloCentro.y}`;
  const rutaEvacOficinas = `M ${toIso(330, 420, 2).x},${toIso(330, 420, 2).y} L ${toIso(330, 370, 2).x},${toIso(330, 370, 2).y} L ${toIso(370, 195, 2).x},${toIso(370, 195, 2).y} L ${pSalida1.x},${pSalida1.y}`;

  // Callouts flotantes (Tooltips anclados en 3D exactamente como en la imagen)
  const posCalloutProd = toIso(850, 110, 65);
  const posCalloutSalida2 = toIso(690, 30, 75);

  return (
    <div data-theme="dark" className="w-full bg-[#0B132B] border border-[#1E293B] rounded-3xl overflow-hidden shadow-2xl text-white font-sans select-none relative">
      
      {/* =========================================================================
          1. HEADER SUPERIOR DEL DASHBOARD CAD (Idéntico a SafePulse SST)
          ========================================================================= */}
      <div className="bg-[#0E1726]/95 border-b border-[#1E293B] px-4 sm:px-6 py-3 flex items-center justify-between font-mono text-xs">
        
        {/* Lado Izquierdo: Logotipo SafePulse SST */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0B7A87] to-[#14B8A6] flex items-center justify-center shadow-lg shadow-[#14B8A6]/20">
            <Activity className="w-4 h-4 text-[#0B132B] stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-white text-sm tracking-tight font-outfit">
                SafePulse <span className="text-[#14B8A6]">SST</span>
              </span>
              <span className="text-[10px] bg-[#1E293B] text-[#2DD4BF] border border-[#14B8A6]/30 px-1.5 py-0.5 rounded font-bold">
                CAD BIM v2.6
              </span>
            </div>
            <p className="text-[9.5px] text-slate-400 font-sans hidden sm:block">
              INNOVATEC SOLUCIONES S.A. // Sede Principal Operativa
            </p>
          </div>
        </div>

        {/* Centro: Telemetría de Coordenadas CAD en Vivo */}
        <div className="hidden lg:flex items-center space-x-4 bg-[#0B132B]/80 border border-[#1E293B] px-3.5 py-1.5 rounded-xl text-slate-400 font-mono text-[11px]">
          <span className="flex items-center space-x-1.5">
            <span className="text-[#14B8A6] font-bold">X:</span>
            <span className="text-slate-200">1450</span>
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center space-x-1.5">
            <span className="text-[#14B8A6] font-bold">Y:</span>
            <span className="text-slate-200">620</span>
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center space-x-1.5">
            <span className="text-[#10B981] font-bold">Z:</span>
            <span className="text-slate-200">18</span>
          </span>
          <span className="text-slate-700">•</span>
          <span className="text-[10px] text-emerald-400 font-bold flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1"></span>
            LIVE SYNC
          </span>
        </div>

        {/* Lado Derecho: Acciones de Simulación, Sonido y Perfil */}
        <div className="flex items-center space-x-2">
          {/* Botón Simulación de Evacuación */}
          <button
            onClick={toggleSimulacion}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all shadow-md ${
              simulandoEvacuacion
                ? 'bg-emerald-500 text-[#0B132B] shadow-emerald-500/30 animate-pulse'
                : 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/40 hover:bg-[#10B981]/25'
            }`}
          >
            {simulandoEvacuacion ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {simulandoEvacuacion ? `Evacuando (${tiempoSimulacion}s)` : 'Simular Evacuación'}
            </span>
          </button>

          {/* Toggle Sonido */}
          <button
            onClick={() => setSonidoHabilitado(!sonidoHabilitado)}
            className="p-1.5 rounded-xl bg-[#0E1726] border border-[#1E293B] text-slate-300 hover:text-white transition-colors"
            title={sonidoHabilitado ? 'Silenciar alarma' : 'Activar alarma sonora'}
          >
            {sonidoHabilitado ? <Volume2 className="w-4 h-4 text-[#14B8A6]" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Notificaciones */}
          <div className="relative p-1.5 rounded-xl bg-[#0E1726] border border-[#1E293B] text-slate-300">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#0B132B]"></span>
          </div>
        </div>

      </div>

      {/* =========================================================================
          2. CUERPO PRINCIPAL: SIDEBAR IZQUIERDO + CANVAS CAD 3D + PANEL HUD DERECHO
          ========================================================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 min-h-[640px] relative">
        
        {/* =======================================================================
            BARRA LATERAL IZQUIERDA DE NAVEGACIÓN TÉCNICA
            (Iconos como en la imagen: Dashboard, Blueprints, Reports, Sensors, Settings)
            ======================================================================= */}
        <aside className="hidden xl:flex xl:col-span-1 bg-[#091024] border-r border-[#1E293B] flex-col items-center py-5 justify-between">
          <div className="space-y-4 w-full flex flex-col items-center">
            {/* Blueprints Activo */}
            <button 
              className="w-10 h-10 rounded-xl bg-[#14B8A6]/20 border border-[#14B8A6] text-[#2DD4BF] flex items-center justify-center shadow-lg shadow-[#14B8A6]/20"
              title="Visor Cartográfico Isométrico"
            >
              <Layers className="w-5 h-5" />
            </button>

            <button 
              onClick={() => setCapaActiva('GENERAL')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                capaActiva === 'GENERAL' ? 'bg-slate-800 text-[#14B8A6]' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              title="Capa General de Arquitectura"
            >
              <Building className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setCapaActiva('EVACUACION')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                capaActiva === 'EVACUACION' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              title="Rutas de Evacuación y Salidas"
            >
              <DoorOpen className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setCapaActiva('EQUIPOS')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                capaActiva === 'EQUIPOS' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              title="Extintores y Detectores de Humo"
            >
              <Flame className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setCapaActiva('RIESGOS')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                capaActiva === 'RIESGOS' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              title="Matriz de Riesgos GTC 45"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 w-full flex flex-col items-center text-slate-500">
            <button className="p-2 hover:text-slate-300 transition-colors" title="Ajustes de Capas">
              <Sliders className="w-4 h-4" />
            </button>
            <button className="p-2 hover:text-slate-300 transition-colors" title="Información Normativa">
              <Info className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* =======================================================================
            CANVAS ISOMÉTRICO CENTRAL CON CORTE ARQUITECTÓNICO 3D (CAD VIEWER)
            ======================================================================= */}
        <div className="xl:col-span-8 relative overflow-hidden flex flex-col justify-between bg-[#080E1E] p-2 sm:p-4">
          
          {/* Barra de Herramientas de Control Flotante Superior */}
          <div className="flex flex-wrap items-center justify-between gap-2 z-10 font-mono text-[11px] mb-2 px-2">
            
            {/* Selector de Capas */}
            <div className="flex items-center space-x-1 bg-[#0E1726]/90 p-1 rounded-xl border border-[#1E293B]">
              <button
                onClick={() => setCapaActiva('GENERAL')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  capaActiva === 'GENERAL' ? 'bg-[#1E293B] text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                General
              </button>
              <button
                onClick={() => setCapaActiva('EVACUACION')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 ${
                  capaActiva === 'EVACUACION' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Evacuación</span>
              </button>
              <button
                onClick={() => setCapaActiva('EQUIPOS')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 ${
                  capaActiva === 'EQUIPOS' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Extintores</span>
              </button>
              <button
                onClick={() => setCapaActiva('RIESGOS')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1 ${
                  capaActiva === 'RIESGOS' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Riesgos GTC 45</span>
              </button>
            </div>

            {/* Controles de Zoom */}
            <div className="flex items-center space-x-1 bg-[#0E1726]/90 p-1 rounded-xl border border-[#1E293B] text-slate-300">
              <button 
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))} 
                className="p-1 hover:text-white"
                title="Alejar"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1 text-[10px] text-slate-400">{Math.round(zoomLevel * 100)}%</span>
              <button 
                onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))} 
                className="p-1 hover:text-white"
                title="Acercar"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setZoomLevel(1)} 
                className="p-1 hover:text-white ml-1 border-l border-slate-700 pl-1.5"
                title="Restablecer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* =====================================================================
              LIENZO VECTORIAL SVG CON EL PLANO REAL MODELADO
              ===================================================================== */}
          <div className="relative w-full flex-1 flex items-center justify-center min-h-[500px]">
            
            {/* Regla de Calibración CAD en la esquina inferior izquierda (como en la imagen: '0 mm') */}
            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-600 flex items-center space-x-2 pointer-events-none">
              <span>0 mm</span>
              <div className="w-16 h-[1px] bg-slate-700"></div>
              <span>5.0 m</span>
            </div>

            <svg
              ref={svgRef}
              viewBox="0 0 1700 960"
              className="w-full h-auto max-h-[620px] select-none transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <defs>
                {/* Grilla isométrica de fondo estilo blueprint */}
                <pattern id="cad-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeOpacity="0.4" />
                </pattern>

                {/* Filtro de resplandor neón verde (Glow) */}
                <filter id="neon-glow-green" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Filtro de resplandor cian para extintores */}
                <filter id="neon-glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Filtro de resplandor ámbar */}
                <filter id="neon-glow-amber" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Marcador de flecha de evacuación */}
                <marker id="flecha-evac" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M 0 0 L 6 3 L 0 6 Z" fill="#10B981" />
                </marker>
              </defs>

              {/* Fondo con grilla técnica */}
              <rect x="0" y="0" width="1700" height="960" fill="url(#cad-grid)" />

              {/* =================================================================
                  1. LOSA BASE EXTERIOR DEL EDIFICIO (Concreto Técnico Isométrico)
                  ================================================================= */}
              <g className="cad-slab-base">
                {/* Losa de piso */}
                <polygon
                  points={isoFloor(0, 0, 1000, 500, 0)}
                  fill="#0D1629"
                  stroke="#1E293B"
                  strokeWidth="2"
                />
                
                {/* Borde inferior de la losa para espesor 3D de cimentación */}
                <polygon
                  points={`${toIso(0, 500, 0).x},${toIso(0, 500, 0).y} ${toIso(1000, 500, 0).x},${toIso(1000, 500, 0).y} ${toIso(1000, 500, -12).x},${toIso(1000, 500, -12).y} ${toIso(0, 500, -12).x},${toIso(0, 500, -12).y}`}
                  fill="#080F1E"
                  stroke="#1E293B"
                  strokeWidth="1.5"
                />
                <polygon
                  points={`${toIso(1000, 0, 0).x},${toIso(1000, 0, 0).y} ${toIso(1000, 500, 0).x},${toIso(1000, 500, 0).y} ${toIso(1000, 500, -12).x},${toIso(1000, 500, -12).y} ${toIso(1000, 0, -12).x},${toIso(1000, 0, -12).y}`}
                  fill="#060C18"
                  stroke="#1E293B"
                  strokeWidth="1.5"
                />
              </g>

              {/* =================================================================
                  2. PISOS DE ZONAS OPERATIVAS CON HALOS ILUMINADOS
                  ================================================================= */}
              <g className="cad-zone-floors">
                {ZONAS_REALES_SST.map((zona) => {
                  const esSeleccionada = zonaSeleccionada.id === zona.id;
                  const esHover = zonaHover?.id === zona.id;

                  // Color de piso según capa activa
                  let fillPiso = '#0F1A30';
                  let strokePiso = '#1E293B';
                  let strokeWidth = '1';

                  if (capaActiva === 'RIESGOS') {
                    if (zona.tipoRiesgoGTC45.nivelRiesgo === 'I') fillPiso = '#450A0A/40';
                    else if (zona.tipoRiesgoGTC45.nivelRiesgo === 'II') fillPiso = '#78350F/40';
                    else fillPiso = '#064E3B/40';
                    strokePiso = zona.colorHalo;
                  } else if (zona.id === 'Z-PROD' || zona.id === 'Z-ALMACEN') {
                    fillPiso = '#1C1917/60';
                    strokePiso = '#F59E0B';
                  } else if (zona.id === 'Z-TI') {
                    fillPiso = '#082F49/50';
                    strokePiso = '#06B6D4';
                  }

                  if (esSeleccionada || esHover) {
                    strokeWidth = '2.5';
                    strokePiso = zona.colorHalo;
                  }

                  return (
                    <polygon
                      key={zona.id}
                      points={isoFloor(zona.cadBox.x, zona.cadBox.y, zona.cadBox.w, zona.cadBox.h, 1)}
                      fill={fillPiso}
                      stroke={strokePiso}
                      strokeWidth={strokeWidth}
                      className="cursor-pointer transition-all duration-200 hover:opacity-90"
                      onClick={() => setZonaSeleccionada(zona)}
                      onMouseEnter={() => setZonaHover(zona)}
                      onMouseLeave={() => setZonaHover(null)}
                      filter={esSeleccionada ? 'url(#neon-glow-cyan)' : undefined}
                    />
                  );
                })}
              </g>

              {/* =================================================================
                  3. MOBILIARIO INTERNO ARQUITECTÓNICO (Escritorios, Racks, Juntas)
                  ================================================================= */}
              <g className="cad-interior-furniture opacity-80 pointer-events-none">
                {/* Mesa de Juntas 1 (10 puestos) */}
                <polygon
                  points={isoFloor(240, 70, 100, 50, 4)}
                  fill="#1E293B"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                
                {/* Mesa de Juntas Central 2 (12 puestos) */}
                <polygon
                  points={isoFloor(240, 260, 130, 60, 4)}
                  fill="#1E293B"
                  stroke="#334155"
                  strokeWidth="1.5"
                />

                {/* Racks de Datacenter IT (3 racks verticales luminosos) */}
                {[0, 25, 50].map((offset, i) => (
                  <g key={i}>
                    <polygon
                      points={isoFloor(420 + offset, 50, 18, 45, 12)}
                      fill="#0C4A6E"
                      stroke="#0284C7"
                      strokeWidth="1"
                    />
                    {/* Luces de los servidores */}
                    <line
                      x1={toIso(422 + offset, 52, 12).x}
                      y1={toIso(422 + offset, 52, 12).y}
                      x2={toIso(436 + offset, 52, 12).x}
                      y2={toIso(436 + offset, 52, 12).y}
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                    />
                  </g>
                ))}

                {/* Escritorios en I+D */}
                {[0, 60].map((dx, i) => (
                  <polygon
                    key={i}
                    points={isoFloor(530 + dx, 60, 45, 70, 3)}
                    fill="#1E293B"
                    stroke="#475569"
                    strokeWidth="1"
                  />
                ))}

                {/* Mostrador de Recepción */}
                <polygon
                  points={isoFloor(60, 270, 80, 25, 5)}
                  fill="#0F766E"
                  stroke="#14B8A6"
                  strokeWidth="1.5"
                />

                {/* Mesas de Trabajo en Ensamblaje / Producción */}
                <polygon
                  points={isoFloor(760, 60, 160, 50, 4)}
                  fill="#292524"
                  stroke="#78350F"
                  strokeWidth="1.5"
                />
                <polygon
                  points={isoFloor(760, 125, 160, 45, 4)}
                  fill="#292524"
                  stroke="#78350F"
                  strokeWidth="1.5"
                />

                {/* Racks de Almacén General (3 baterías de estanterías industriales) */}
                {[0, 70, 140].map((dy, i) => (
                  <g key={i}>
                    <polygon
                      points={isoFloor(835, 230 + dy, 120, 35, 18)}
                      fill="#1C1917"
                      stroke="#F59E0B"
                      strokeWidth="1.2"
                      strokeDasharray="4 2"
                    />
                  </g>
                ))}
              </g>

              {/* =================================================================
                  4. MUROS ARQUITECTÓNICOS EN CORTE 3D (Cutaway Walls a Z = 26)
                  Muros modelados a media altura para ver los interiores
                  ================================================================= */}
              <g className="cad-walls pointer-events-none">
                {/* Muros Perimetrales Exteriores */}
                {/* Muro Norte con aberturas para las 3 Salidas de Emergencia */}
                <g className="cad-wall-element">
                  {/* Segmento 1: Oeste hasta Salida 1 */}
                  {(() => {
                    const w = isoWallBox(0, 0, 370, 12, 28);
                    return (
                      <>
                        <polygon points={w.frontPolygon} fill="#1E293B" stroke="#334155" />
                        <polygon points={w.rightPolygon} fill="#0F172A" stroke="#334155" />
                        <polygon points={w.topPolygon} fill="#334155" stroke="#64748B" />
                      </>
                    );
                  })()}
                  {/* Segmento 2: Entre Salida 1 y Salida 2 */}
                  {(() => {
                    const w = isoWallBox(400, 0, 290, 12, 28);
                    return (
                      <>
                        <polygon points={w.frontPolygon} fill="#1E293B" stroke="#334155" />
                        <polygon points={w.rightPolygon} fill="#0F172A" stroke="#334155" />
                        <polygon points={w.topPolygon} fill="#334155" stroke="#64748B" />
                      </>
                    );
                  })()}
                  {/* Segmento 3: Entre Salida 2 y Salida 3 */}
                  {(() => {
                    const w = isoWallBox(720, 0, 230, 12, 28);
                    return (
                      <>
                        <polygon points={w.frontPolygon} fill="#1E293B" stroke="#334155" />
                        <polygon points={w.rightPolygon} fill="#0F172A" stroke="#334155" />
                        <polygon points={w.topPolygon} fill="#334155" stroke="#64748B" />
                      </>
                    );
                  })()}
                </g>

                {/* Muro Oeste con vano para Acceso Principal */}
                <g className="cad-wall-element">
                  {(() => {
                    const w1 = isoWallBox(0, 0, 12, 220, 28);
                    const w2 = isoWallBox(0, 280, 12, 220, 28);
                    return (
                      <>
                        <polygon points={w1.frontPolygon} fill="#1E293B" stroke="#334155" />
                        <polygon points={w1.rightPolygon} fill="#0F172A" stroke="#334155" />
                        <polygon points={w1.topPolygon} fill="#334155" stroke="#64748B" />
                        <polygon points={w2.frontPolygon} fill="#1E293B" stroke="#334155" />
                        <polygon points={w2.rightPolygon} fill="#0F172A" stroke="#334155" />
                        <polygon points={w2.topPolygon} fill="#334155" stroke="#64748B" />
                      </>
                    );
                  })()}
                </g>

                {/* Muro Sur (Batería de oficinas frontales) */}
                <g className="cad-wall-element">
                  {(() => {
                    const w = isoWallBox(0, 488, 1000, 12, 20);
                    return (
                      <>
                        <polygon points={w.frontPolygon} fill="#1E293B" stroke="#334155" />
                        <polygon points={w.rightPolygon} fill="#0F172A" stroke="#334155" />
                        <polygon points={w.topPolygon} fill="#334155" stroke="#64748B" />
                      </>
                    );
                  })()}
                </g>

                {/* Muro Este (Zona de Ensamblaje y Almacén con Acceso de Carga) */}
                <g className="cad-wall-element">
                  {(() => {
                    const w1 = isoWallBox(988, 0, 12, 150, 28);
                    const w2 = isoWallBox(988, 220, 12, 280, 28);
                    return (
                      <>
                        <polygon points={w1.frontPolygon} fill="#1E293B" stroke="#334155" />
                        <polygon points={w1.rightPolygon} fill="#0F172A" stroke="#334155" />
                        <polygon points={w1.topPolygon} fill="#334155" stroke="#64748B" />
                        <polygon points={w2.frontPolygon} fill="#1E293B" stroke="#334155" />
                        <polygon points={w2.rightPolygon} fill="#0F172A" stroke="#334155" />
                        <polygon points={w2.topPolygon} fill="#334155" stroke="#64748B" />
                      </>
                    );
                  })()}
                </g>

                {/* Tabiques Interiores Divisorios */}
                {/* Muro divisorio entre Oficinas Norte y Pasillo Central */}
                <g className="cad-wall-element">
                  {(() => {
                    const w = isoWallBox(180, 170, 530, 8, 22);
                    return (
                      <>
                        <polygon points={w.frontPolygon} fill="#162032" stroke="#253347" />
                        <polygon points={w.rightPolygon} fill="#0D1524" stroke="#253347" />
                        <polygon points={w.topPolygon} fill="#2A384F" stroke="#4B5E7A" />
                      </>
                    );
                  })()}
                </g>

                {/* Muro divisorio entre Producción/Almacén y Oficinas Centrales */}
                <g className="cad-wall-element">
                  {(() => {
                    const w = isoWallBox(712, 0, 8, 490, 24);
                    return (
                      <>
                        <polygon points={w.frontPolygon} fill="#162032" stroke="#253347" />
                        <polygon points={w.rightPolygon} fill="#0D1524" stroke="#253347" />
                        <polygon points={w.topPolygon} fill="#2A384F" stroke="#4B5E7A" />
                      </>
                    );
                  })()}
                </g>

                {/* Muro divisorio Servidores IT (Blindado) */}
                <g className="cad-wall-element">
                  {(() => {
                    const w1 = isoWallBox(395, 0, 6, 170, 24);
                    const w2 = isoWallBox(500, 0, 6, 170, 24);
                    return (
                      <>
                        <polygon points={w1.topPolygon} fill="#0284C7" stroke="#38BDF8" />
                        <polygon points={w2.topPolygon} fill="#0284C7" stroke="#38BDF8" />
                      </>
                    );
                  })()}
                </g>
              </g>

              {/* =================================================================
                  5. RUTAS DE EVACUACIÓN FOTOLUMINISCENTES (Verde Neón Resplandeciente)
                  (Se activan en Capa 'EVACUACION' o durante simulación)
                  ================================================================= */}
              {(capaActiva === 'EVACUACION' || simulandoEvacuacion) && (
                <g className="cad-evacuation-routes" filter="url(#neon-glow-green)">
                  {/* Troncal Principal de Evacuación */}
                  <path
                    d={rutaTroncalPrincipal}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={simulandoEvacuacion ? 'animate-pulse' : ''}
                  />

                  {/* Rutas hacia las 3 Salidas de Emergencia Norte (Líneas fotoluminiscentes sin flechas) */}
                  <path
                    d={rutaEvacNorte}
                    fill="none"
                    stroke="#34D399"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d={rutaEvacJuntas1}
                    fill="none"
                    stroke="#34D399"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d={rutaEvacProd}
                    fill="none"
                    stroke="#34D399"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Alimentadores desde oficinas */}
                  <path
                    d={rutaConexionID}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                  <path
                    d={rutaConexionOficinasSur}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                  <path
                    d={rutaEvacOficinas}
                    fill="none"
                    stroke="#34D399"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Marcadores de Puertas de Salida Iluminadas */}
                  {/* Salida 1 */}
                  <circle cx={pSalida1.x} cy={pSalida1.y} r="7" fill="#10B981" className="animate-ping" />
                  <circle cx={pSalida1.x} cy={pSalida1.y} r="5" fill="#34D399" />
                  
                  {/* Salida 2 */}
                  <circle cx={pSalida2.x} cy={pSalida2.y} r="7" fill="#10B981" className="animate-ping" />
                  <circle cx={pSalida2.x} cy={pSalida2.y} r="5" fill="#34D399" />

                  {/* Salida 3 */}
                  <circle cx={pSalida3.x} cy={pSalida3.y} r="7" fill="#10B981" className="animate-ping" />
                  <circle cx={pSalida3.x} cy={pSalida3.y} r="5" fill="#34D399" />

                  {/* Acceso Principal */}
                  <circle cx={pAccesoPrincipal.x} cy={pAccesoPrincipal.y} r="8" fill="#10B981" className="animate-ping" />
                  <circle cx={pAccesoPrincipal.x} cy={pAccesoPrincipal.y} r="6" fill="#34D399" />
                </g>
              )}

              {/* =================================================================
                  5.1 MUÑECOS EN RECORRIDO DE EVACUACIÓN (SIMULACIÓN ACTIVA)
                  Reemplaza flechas estáticas por avatares humanos con casco y chaleco SST
                  que recorren físicamente el plano hasta las salidas
                  ================================================================= */}
              {simulandoEvacuacion && (
                <g className="cad-evacuees-group">
                  {/* Muñeco 1: Operario de Ensamblaje / Producción -> Salida 3 */}
                  <g id="evacuante-produccion">
                    <animateMotion
                      path={rutaEvacProd}
                      dur="4.5s"
                      repeatCount="indefinite"
                    />
                    <g transform="translate(0, -2)">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 0,-3; 0,0; 0,-3; 0,0"
                        dur="0.5s"
                        repeatCount="indefinite"
                      />
                      {/* Sombra y halo de piso */}
                      <ellipse cx="0" cy="0" rx="9" ry="4.5" fill="#000000" fillOpacity="0.5" />
                      <ellipse cx="0" cy="0" rx="14" ry="7" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
                      
                      {/* Piernas */}
                      <line x1="-3" y1="-6" x2="-4" y2="0" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                      <line x1="3" y1="-6" x2="4" y2="0" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="-4" cy="0" r="1.8" fill="#1E293B" />
                      <circle cx="4" cy="0" r="1.8" fill="#1E293B" />

                      {/* Torso con chaleco reflectivo naranja industrial */}
                      <path d="M -6 -18 L 6 -18 L 5 -6 L -5 -6 Z" fill="#F97316" stroke="#0F172A" strokeWidth="1" />
                      <line x1="-5.5" y1="-14" x2="5.5" y2="-14" stroke="#FFFFFF" strokeWidth="1.5" />
                      <line x1="-5" y1="-10" x2="5" y2="-10" stroke="#FFFFFF" strokeWidth="1.5" />

                      {/* Brazos en marcha */}
                      <line x1="-6" y1="-17" x2="-9" y2="-11" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="6" y1="-17" x2="9" y2="-11" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />

                      {/* Cabeza y Casco Blanco */}
                      <circle cx="0" cy="-21" r="4.2" fill="#FBBF24" />
                      <path d="M -6 -23 C -6 -28, 6 -28, 6 -23 L 7 -22 L -7 -22 Z" fill="#FFFFFF" stroke="#334155" strokeWidth="1" />

                      {/* Badge HUD de Rol */}
                      <g transform="translate(0, -32)">
                        <rect x="-26" y="-13" width="52" height="13" rx="4" fill="#091024" fillOpacity="0.9" stroke="#F59E0B" strokeWidth="1" />
                        <text x="0" y="-4" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                          🏃 Ensamblaje
                        </text>
                      </g>
                    </g>
                  </g>

                  {/* Muñeco 2: Ingeniero / Dev I+D -> Salida 2 */}
                  <g id="evacuante-id">
                    <animateMotion
                      path={rutaEvacNorte}
                      dur="5s"
                      repeatCount="indefinite"
                    />
                    <g transform="translate(0, -2)">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 0,-3; 0,0; 0,-3; 0,0"
                        dur="0.55s"
                        repeatCount="indefinite"
                      />
                      <ellipse cx="0" cy="0" rx="9" ry="4.5" fill="#000000" fillOpacity="0.5" />
                      <ellipse cx="0" cy="0" rx="14" ry="7" fill="none" stroke="#10B981" strokeWidth="1.5" />

                      <line x1="-3" y1="-6" x2="-4" y2="0" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                      <line x1="3" y1="-6" x2="4" y2="0" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="-4" cy="0" r="1.8" fill="#1E293B" />
                      <circle cx="4" cy="0" r="1.8" fill="#1E293B" />

                      <path d="M -6 -18 L 6 -18 L 5 -6 L -5 -6 Z" fill="#10B981" stroke="#0F172A" strokeWidth="1" />
                      <line x1="-5.5" y1="-14" x2="5.5" y2="-14" stroke="#FFFFFF" strokeWidth="1.5" />
                      <line x1="-5" y1="-10" x2="5" y2="-10" stroke="#FFFFFF" strokeWidth="1.5" />

                      <line x1="-6" y1="-17" x2="-9" y2="-11" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="6" y1="-17" x2="9" y2="-11" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />

                      <circle cx="0" cy="-21" r="4.2" fill="#FBBF24" />
                      <path d="M -6 -23 C -6 -28, 6 -28, 6 -23 L 7 -22 L -7 -22 Z" fill="#FFFFFF" stroke="#334155" strokeWidth="1" />

                      <g transform="translate(0, -32)">
                        <rect x="-24" y="-13" width="48" height="13" rx="4" fill="#091024" fillOpacity="0.9" stroke="#10B981" strokeWidth="1" />
                        <text x="0" y="-4" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                          🏃 Dev I+D
                        </text>
                      </g>
                    </g>
                  </g>

                  {/* Muñeco 3: Líder de Almacén -> Pasillo Troncal -> Acceso Principal */}
                  <g id="evacuante-almacen">
                    <animateMotion
                      path={rutaTroncalPrincipal}
                      dur="9.5s"
                      repeatCount="indefinite"
                    />
                    <g transform="translate(0, -2)">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 0,-3; 0,0; 0,-3; 0,0"
                        dur="0.5s"
                        repeatCount="indefinite"
                      />
                      <ellipse cx="0" cy="0" rx="9" ry="4.5" fill="#000000" fillOpacity="0.5" />
                      <ellipse cx="0" cy="0" rx="14" ry="7" fill="none" stroke="#FACC15" strokeWidth="1.5" />

                      <line x1="-3" y1="-6" x2="-4" y2="0" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                      <line x1="3" y1="-6" x2="4" y2="0" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="-4" cy="0" r="1.8" fill="#1E293B" />
                      <circle cx="4" cy="0" r="1.8" fill="#1E293B" />

                      <path d="M -6 -18 L 6 -18 L 5 -6 L -5 -6 Z" fill="#FACC15" stroke="#0F172A" strokeWidth="1" />
                      <line x1="-5.5" y1="-14" x2="5.5" y2="-14" stroke="#FFFFFF" strokeWidth="1.5" />
                      <line x1="-5" y1="-10" x2="5" y2="-10" stroke="#FFFFFF" strokeWidth="1.5" />

                      <line x1="-6" y1="-17" x2="-9" y2="-11" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="6" y1="-17" x2="9" y2="-11" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />

                      <circle cx="0" cy="-21" r="4.2" fill="#FBBF24" />
                      <path d="M -6 -23 C -6 -28, 6 -28, 6 -23 L 7 -22 L -7 -22 Z" fill="#FACC15" stroke="#713F12" strokeWidth="1" />

                      <g transform="translate(0, -32)">
                        <rect x="-26" y="-13" width="52" height="13" rx="4" fill="#091024" fillOpacity="0.9" stroke="#FACC15" strokeWidth="1" />
                        <text x="0" y="-4" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                          🏃 Almacén
                        </text>
                      </g>
                    </g>
                  </g>

                  {/* Muñeco 4: Colaborador de Oficinas Sur -> Salida 1 */}
                  <g id="evacuante-oficinas">
                    <animateMotion
                      path={rutaEvacOficinas}
                      dur="6.5s"
                      repeatCount="indefinite"
                    />
                    <g transform="translate(0, -2)">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 0,-3; 0,0; 0,-3; 0,0"
                        dur="0.55s"
                        repeatCount="indefinite"
                      />
                      <ellipse cx="0" cy="0" rx="9" ry="4.5" fill="#000000" fillOpacity="0.5" />
                      <ellipse cx="0" cy="0" rx="14" ry="7" fill="none" stroke="#22D3EE" strokeWidth="1.5" />

                      <line x1="-3" y1="-6" x2="-4" y2="0" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                      <line x1="3" y1="-6" x2="4" y2="0" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="-4" cy="0" r="1.8" fill="#1E293B" />
                      <circle cx="4" cy="0" r="1.8" fill="#1E293B" />

                      <path d="M -6 -18 L 6 -18 L 5 -6 L -5 -6 Z" fill="#06B6D4" stroke="#0F172A" strokeWidth="1" />
                      <line x1="-5.5" y1="-14" x2="5.5" y2="-14" stroke="#FFFFFF" strokeWidth="1.5" />
                      <line x1="-5" y1="-10" x2="5" y2="-10" stroke="#FFFFFF" strokeWidth="1.5" />

                      <line x1="-6" y1="-17" x2="-9" y2="-11" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="6" y1="-17" x2="9" y2="-11" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />

                      <circle cx="0" cy="-21" r="4.2" fill="#FBBF24" />
                      <path d="M -6 -23 C -6 -28, 6 -28, 6 -23 L 7 -22 L -7 -22 Z" fill="#FFFFFF" stroke="#334155" strokeWidth="1" />

                      <g transform="translate(0, -32)">
                        <rect x="-24" y="-13" width="48" height="13" rx="4" fill="#091024" fillOpacity="0.9" stroke="#22D3EE" strokeWidth="1" />
                        <text x="0" y="-4" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                          🏃 Oficinas
                        </text>
                      </g>
                    </g>
                  </g>
                </g>
              )}

              {/* =================================================================
                  6. PINES FLOTANTES 3D DE EXTINTORES Y DETECTORES (Cian Neón)
                  ================================================================= */}
              {(capaActiva === 'EQUIPOS' || capaActiva === 'GENERAL') && (
                <g className="cad-safety-pins" filter="url(#neon-glow-cyan)">
                  {/* Extintor 1: Servidores IT */}
                  {(() => {
                    const p = toIso(410, 165, 32);
                    return (
                      <g className="cursor-pointer" onClick={() => setZonaSeleccionada(ZONAS_REALES_SST[2])}>
                        <rect x={p.x - 12} y={p.y - 12} width="24" height="24" rx="6" fill="#0E7490" stroke="#22D3EE" strokeWidth="1.5" />
                        <path d="M 0 -5 L 0 5 M -3 -2 L 3 -2" transform={`translate(${p.x}, ${p.y})`} stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                      </g>
                    );
                  })()}

                  {/* Extintor 2: Pasillo Central */}
                  {(() => {
                    const p = toIso(450, 205, 32);
                    return (
                      <g className="cursor-pointer" onClick={() => setZonaSeleccionada(ZONAS_REALES_SST[5])}>
                        <rect x={p.x - 12} y={p.y - 12} width="24" height="24" rx="6" fill="#0E7490" stroke="#22D3EE" strokeWidth="1.5" />
                        <path d="M 0 -5 L 0 5 M -3 -2 L 3 -2" transform={`translate(${p.x}, ${p.y})`} stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                      </g>
                    );
                  })()}

                  {/* Extintor 3: Ensamblaje / Producción */}
                  {(() => {
                    const p = toIso(780, 45, 34);
                    return (
                      <g className="cursor-pointer" onClick={() => setZonaSeleccionada(ZONAS_REALES_SST[0])}>
                        <rect x={p.x - 12} y={p.y - 12} width="24" height="24" rx="6" fill="#0E7490" stroke="#22D3EE" strokeWidth="1.5" />
                        <path d="M 0 -5 L 0 5 M -3 -2 L 3 -2" transform={`translate(${p.x}, ${p.y})`} stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                      </g>
                    );
                  })()}

                  {/* Extintor 4: Almacén Industrial */}
                  {(() => {
                    const p = toIso(840, 240, 34);
                    return (
                      <g className="cursor-pointer" onClick={() => setZonaSeleccionada(ZONAS_REALES_SST[1])}>
                        <rect x={p.x - 12} y={p.y - 12} width="24" height="24" rx="6" fill="#0E7490" stroke="#22D3EE" strokeWidth="1.5" />
                        <path d="M 0 -5 L 0 5 M -3 -2 L 3 -2" transform={`translate(${p.x}, ${p.y})`} stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                      </g>
                    );
                  })()}

                  {/* Extintor 5: Recepción */}
                  {(() => {
                    const p = toIso(50, 240, 32);
                    return (
                      <g className="cursor-pointer" onClick={() => setZonaSeleccionada(ZONAS_REALES_SST[6])}>
                        <rect x={p.x - 12} y={p.y - 12} width="24" height="24" rx="6" fill="#0E7490" stroke="#22D3EE" strokeWidth="1.5" />
                        <path d="M 0 -5 L 0 5 M -3 -2 L 3 -2" transform={`translate(${p.x}, ${p.y})`} stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                      </g>
                    );
                  })()}
                </g>
              )}

              {/* =================================================================
                  7. CALLOUTS FLOTANTES GLASSMORPHISM CON LÍNEAS GUÍA (Idénticos a la Imagen)
                  ================================================================= */}
              {/* Callout 1: Manufacturing / Ensamblaje Zone B */}
              <g className="cad-callout-manufacturing">
                {/* Línea guía conectora */}
                <line
                  x1={toIso(850, 110, 10).x}
                  y1={toIso(850, 110, 10).y}
                  x2={posCalloutProd.x}
                  y2={posCalloutProd.y}
                  stroke="#F59E0B"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                <circle cx={toIso(850, 110, 10).x} cy={toIso(850, 110, 10).y} r="3" fill="#F59E0B" />

                {/* Tarjeta flotante SVG */}
                <g transform={`translate(${posCalloutProd.x - 100}, ${posCalloutProd.y - 95})`}>
                  <rect
                    width="190"
                    height="85"
                    rx="12"
                    fill="#0E1726"
                    fillOpacity="0.95"
                    stroke="#F59E0B"
                    strokeWidth="1.2"
                    filter="drop-shadow(0 10px 15px rgba(0,0,0,0.5))"
                  />
                  <text x="14" y="22" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="outfit">
                    Área de Ensamblaje
                  </text>
                  <text x="14" y="40" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                    Temperatura: <tspan fill="#F8FAFC">22.1°C</tspan>
                  </text>
                  <text x="14" y="55" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                    Check SST: <tspan fill="#10B981" fontWeight="bold">Passed ✓</tspan>
                  </text>
                  <text x="14" y="70" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                    Aforo en Planta: <tspan fill="#F59E0B" fontWeight="bold">8 / 10</tspan>
                  </text>
                </g>
              </g>

              {/* Callout 2: Emergency Exit 2 (Salida de Emergencia I+D) */}
              <g className="cad-callout-emergency-exit">
                {/* Línea guía */}
                <line
                  x1={pSalida2.x}
                  y1={pSalida2.y}
                  x2={posCalloutSalida2.x}
                  y2={posCalloutSalida2.y}
                  stroke="#10B981"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                <circle cx={pSalida2.x} cy={pSalida2.y} r="3" fill="#10B981" />

                {/* Tarjeta flotante */}
                <g transform={`translate(${posCalloutSalida2.x - 95}, ${posCalloutSalida2.y - 90})`}>
                  <rect
                    width="190"
                    height="80"
                    rx="12"
                    fill="#0E1726"
                    fillOpacity="0.95"
                    stroke="#10B981"
                    strokeWidth="1.2"
                    filter="drop-shadow(0 10px 15px rgba(0,0,0,0.5))"
                  />
                  <text x="14" y="22" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="outfit">
                    Salida de Emergencia 2
                  </text>
                  <text x="14" y="38" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                    Estado: <tspan fill="#10B981" fontWeight="bold">Despejada (Clear)</tspan>
                  </text>
                  <text x="14" y="53" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                    Inspección: <tspan fill="#F8FAFC">Hace 10 min</tspan>
                  </text>
                  <text x="14" y="68" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                    Flujo: <tspan fill="#34D399">Sin Obstrucción</tspan>
                  </text>
                </g>
              </g>

            </svg>
          </div>

          {/* Barra de Leyenda Rápida Inferior */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#1E293B] text-[11px] font-mono text-slate-400 px-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                <span>Rutas y Salidas Despejadas</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                <span>Zonas de Operación / Producción</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]"></span>
                <span>Extintores & Datacenter</span>
              </span>
            </div>

            <span className="text-slate-500 hidden sm:inline">
              Haz clic en cualquier área para ver su ficha técnica de control GTC 45
            </span>
          </div>

        </div>

        {/* =======================================================================
            PANEL LATERAL DERECHO: TELEMETRÍA, INCIDENT FEED Y COMPLIANCE
            (Copia fiel del sidebar derecho en la imagen de referencia)
            ======================================================================= */}
        <aside className="xl:col-span-3 bg-[#0A1124] border-t xl:border-t-0 xl:border-l border-[#1E293B] p-4 sm:p-5 flex flex-col justify-between space-y-6">
          
          <div className="space-y-6">
            
            {/* 1. MÓDULO SYSTEM HEALTH */}
            <div className="bg-[#0E1726] border border-[#1E293B] rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E293B] mb-3">
                <span className="text-xs font-mono font-bold text-white flex items-center">
                  <ShieldCheck className="w-4 h-4 text-[#10B981] mr-1.5" />
                  System Health: <span className="text-[#10B981] ml-1">OK</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span>System Health:</span>
                  <span className="text-emerald-400 font-bold flex items-center">
                    Passed <Check className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Safety Check:</span>
                  <span className="text-emerald-400 font-bold flex items-center">
                    Passed <Check className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Last Check:</span>
                  <span className="text-slate-200">10 mins ago</span>
                </div>
              </div>
            </div>

            {/* 2. MÓDULO INCIDENT FEED EN TIEMPO REAL */}
            <div className="bg-[#0E1726] border border-[#1E293B] rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Incident Feed
                </span>
                <span className="text-[10px] font-mono text-[#14B8A6] bg-[#14B8A6]/10 px-2 py-0.5 rounded border border-[#14B8A6]/30">
                  Real time
                </span>
              </div>

              <div className="space-y-3 text-[11px] font-mono">
                {/* Evento 1 */}
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                  <div>
                    <p className="text-slate-200 leading-tight">Manufacturing Capacity verified: 8/10</p>
                    <span className="text-[9.5px] text-slate-500 block mt-0.5">10 mins ago • Zona Ensamblaje</span>
                  </div>
                </div>

                {/* Evento 2 */}
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1 shrink-0"></span>
                  <div>
                    <p className="text-slate-200 leading-tight">Exit 2 magnetic latch checked</p>
                    <span className="text-[9.5px] text-slate-500 block mt-0.5">10 mins ago • Sensor I+D</span>
                  </div>
                </div>

                {/* Evento 3 */}
                <div className="flex items-start space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1 shrink-0"></span>
                  <div>
                    <p className="text-slate-200 leading-tight">Warehouse forklift lane inspected</p>
                    <span className="text-[9.5px] text-slate-500 block mt-0.5">18 mins ago • Almacén</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. MÓDULO COMPLIANCE OVERVIEW */}
            <div className="bg-[#0E1726] border border-[#1E293B] rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Compliance Overview
                </span>
                <span className="text-[10px] text-slate-400 font-mono">SG-SST</span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                {/* Barra 1: Extintores */}
                <div>
                  <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                    <span>Fire Extinguishers (NTC 2885)</span>
                    <span className="text-emerald-400 font-bold">100%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-full"></div>
                  </div>
                </div>

                {/* Barra 2: Zonas Operativas */}
                <div>
                  <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                    <span>Operating Zones GTC 45</span>
                    <span className="text-amber-400 font-bold">85%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-[85%]"></div>
                  </div>
                </div>

                {/* Barra 3: Rutas de Evacuación */}
                <div>
                  <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                    <span>Assembly Point Cleared</span>
                    <span className="text-cyan-400 font-bold">100%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full w-full"></div>
                  </div>
                </div>

                {/* Barra 4: Salidas de Emergencia */}
                <div>
                  <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                    <span>Emergency Exits (3 Norte + Acceso)</span>
                    <span className="text-emerald-400 font-bold">100%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full w-full"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* FICHA TÉCNICA RÁPIDA DE LA SALA SELECCIONADA */}
          <div className="bg-[#0E1726] border border-[#14B8A6]/40 rounded-2xl p-4 text-xs font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E293B] mb-2">
              <span className="text-[10px] text-[#14B8A6] font-bold uppercase">Área Seleccionada</span>
              <span className="text-[10px] bg-slate-800 text-white px-2 py-0.5 rounded font-bold">
                {zonaSeleccionada.codigo}
              </span>
            </div>

            <h4 className="font-bold text-white font-outfit text-sm leading-tight mb-1">
              {zonaSeleccionada.nombre}
            </h4>
            <p className="text-[10px] text-slate-400 mb-2">
              Aforo Actual: <strong className="text-white">{zonaSeleccionada.aforoActual}</strong> / {zonaSeleccionada.aforoMax} máx.
            </p>

            <div className="p-2 rounded-xl bg-[#091024] border border-[#1E293B] mb-3 text-[10.5px]">
              <span className="text-[#14B8A6] block text-[9.5px]">Control Primario:</span>
              <span className="text-slate-300 leading-tight block mt-0.5">
                {zonaSeleccionada.tipoRiesgoGTC45.controles.ingenieria}
              </span>
            </div>

            <button
              onClick={() => setModalSugerenciaAbierto(true)}
              className="w-full py-2 px-3 rounded-xl bg-[#1A56DB] hover:bg-blue-600 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-blue-600/20 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Radicar Novedad en esta Área</span>
            </button>
          </div>

        </aside>

      </div>

      {/* Modal de Radicación de Sugerencias y Reportes */}
      <SuggestionModal
        isOpen={modalSugerenciaAbierto}
        onClose={() => setModalSugerenciaAbierto(false)}
        initialZoneId={zonaSeleccionada.id}
        initialZoneName={zonaSeleccionada.nombre}
      />
    </div>
  );
}
