/**
 * CATÁLOGO DESACOPLADO DE NORMAS, RIESGOS GTC 45 Y CAPÍTULOS DE RECORRIDO SST
 * Portal Corporativo SG-SST // SafePulse SST
 * Basado en Decreto 1072/2015, Resolución 0312/2019, NTC 1461 y GTC 45.
 */

export interface CapituloTour {
  id: string;
  capitulo: string; // ej: "01"
  titulo: string;
  subtitulo: string;
  tag: string;
  areaTecnica: string; // Ref a la zona del plano CAD
  resumenVisual: string;
  riesgoGtc45: {
    clasificacion: 'Locativo' | 'Biomecánico' | 'Eléctrico' | 'Mecánico' | 'Físico / Químico';
    nivel: 'CRÍTICO' | 'ALTO' | 'MEDIO' | 'CONTROLADO';
    colorNivel: string;
    descripcion: string;
    medidasExistentes: string[];
  };
  normaObligatoria: {
    hacer: string[];
    evitar: string[];
  };
  eppRequerido: Array<{
    nombre: string;
    tipo: string;
    obligatorio: boolean;
  }>;
  accionRapida: {
    label: string;
    tipo: 'plano' | 'pausa' | 'reporte' | 'modal';
    href?: string;
    accionId?: string;
  };
  coordenadasCad?: { x: number; y: number };
}

export const CAPITULOS_TOUR: CapituloTour[] = [
  {
    id: 'recepcion',
    capitulo: '01',
    titulo: 'Recepción & Control de Acceso',
    subtitulo: 'Filtro biométrico, inducción de ingreso y registro de visitantes',
    tag: 'ZONA PÚBLICA // ACCESO GENERAL',
    areaTecnica: 'Recepción & Acceso',
    resumenVisual: 'Primer anillo de seguridad perimetral. Todo visitante y contratista debe contar con ARL vigente validada antes de ingresar.',
    riesgoGtc45: {
      clasificacion: 'Locativo',
      nivel: 'MEDIO',
      colorNivel: '#F59E0B',
      descripcion: 'Tránsito de personal externo, desniveles de piso en torniquetes y caída al mismo nivel por superficies húmedas.',
      medidasExistentes: [
        'Cintas antideslizantes de alta fricción en rampas de acceso',
        'Validación automática de ARL y planilla PILA en recepción',
        'Cámaras de circuito cerrado y carnetización con cinta distintiva',
      ],
    },
    normaObligatoria: {
      hacer: [
        'Portar siempre el carné corporativo o escarapela de visitante visible en el pecho.',
        'Declarar equipos de cómputo personales o herramientas en el libro de control.',
        'Atender las instrucciones de la brigada ante una alarma sonora de primer tono.',
      ],
      evitar: [
        'Permitir el ingreso de personas ajenas sin previa autorización o sin registro fotográfico.',
        'Obstaculizar el giro libre de los torniquetes o dejar puertas de escape calzadas.',
        'Ingresar a la sede bajo los efectos de alcohol o sustancias psicoactivas (Cero Tolerancia).',
      ],
    },
    eppRequerido: [
      { nombre: 'Carné con Cinta Reflectiva', tipo: 'Identificación', obligatorio: true },
      { nombre: 'Calzado Cerrado Antideslizante', tipo: 'Ergonomía', obligatorio: true },
    ],
    accionRapida: {
      label: 'Localizar en Plano CAD',
      tipo: 'plano',
      href: '/plano?focus=recepcion',
    },
    coordenadasCad: { x: 50, y: 180 },
  },
  {
    id: 'oficinas',
    capitulo: '02',
    titulo: 'Open Space & Ergonomía VDT',
    subtitulo: 'Puestos de trabajo con pantallas, postura y pausas activas',
    tag: 'ÁREA ADMINISTRATIVA // ERGONOMÍA',
    areaTecnica: 'Oficinas & Ingeniería',
    resumenVisual: 'Espacio enfocado en la prevención de Desórdenes Músculo-Esqueléticos (DME) y fatiga visual en usuarios de computador.',
    riesgoGtc45: {
      clasificacion: 'Biomecánico',
      nivel: 'MEDIO',
      colorNivel: '#F59E0B',
      descripcion: 'Posturas prolongadas sedentes (>6h continuas), movimientos repetitivos de digitación y deslumbramiento por luz solar.',
      medidasExistentes: [
        'Sillas ergonómicas ajustables con apoyo lumbar 3D certificadas ANSI/BIFMA',
        'Brazos articulados para monitor a la altura de la línea de vista horizontal',
        'Programa institucional de Pausas Activas guiadas cada 2 horas con SafePulse',
      ],
    },
    normaObligatoria: {
      hacer: [
        'Ajustar la altura de la silla para que los pies queden completamente apoyados y rodillas a 90°.',
        'Pausar 5 minutos cada 2 horas: estiramientos guiados cervicales, lumbares y visuales.',
        'Mantener despejada la canaleta pasacables debajo del escritorio.',
      ],
      evitar: [
        'Adoptar posturas encorvadas o cruzar las piernas continuamente durante la jornada.',
        'Consumir líquidos destapados directamente sobre teclados o multicontactos.',
        'Ignorar los síntomas tempranos de dolor en muñecas, hombros o zona dorsal.',
      ],
    },
    eppRequerido: [
      { nombre: 'Filtro Anti-reflejo VDT', tipo: 'Salud Visual', obligatorio: false },
      { nombre: 'Apoyapiés Anatómico', tipo: 'Ergonomía', obligatorio: true },
    ],
    accionRapida: {
      label: 'Iniciar Pausa Activa',
      tipo: 'pausa',
      href: '/resumen#pausas',
    },
    coordenadasCad: { x: 140, y: 150 },
  },
  {
    id: 'datacenter',
    capitulo: '03',
    titulo: 'Datacenter & Subestación Eléctrica',
    subtitulo: 'Alta disponibilidad, riesgo eléctrico RETIE y fuego Clase C',
    tag: 'ZONA CRÍTICA // ACCESO RESTRINGIDO',
    areaTecnica: 'Datacenter / Servidores',
    resumenVisual: 'Bóveda de telecomunicaciones y energía ininterrumpida. Prohibido el ingreso sin autorización expresa del Oficial de Seguridad.',
    riesgoGtc45: {
      clasificacion: 'Eléctrico',
      nivel: 'CRÍTICO',
      colorNivel: '#EF4444',
      descripcion: 'Arco eléctrico, contacto indirecto por alta corriente en tableros UPS y conflagración Clase C.',
      medidasExistentes: [
        'Sistema de supresión de incendios por gas limpio FM-200 / Novec (sin agua)',
        'Extintor satélite HCFC 123 (Solkaflam blanco) no conductor adyacente a la puerta',
        'Piso falso antiestático con barras de cobre de puesta a tierra certificadas RETIE',
      ],
    },
    normaObligatoria: {
      hacer: [
        'Aplicar las 5 Reglas de Oro de Seguridad Eléctrica y Bloqueo/Etiquetado (LOTO).',
        'Utilizar herramientas manuales con aislamiento dieléctrico certificado 1000V.',
        'Verificar el indicador del manómetro del extintor Solkaflam antes de intervenir.',
      ],
      evitar: [
        'Ingresar con objetos metálicos colgantes, anillos, cadenas o relojes metálicos.',
        'Abrir gabinetes de transferencia eléctrica sin traje de protección para arco categoría 2.',
        'Bloquear los difusores de aire acondicionado de precisión o las toberas de gas limpio.',
      ],
    },
    eppRequerido: [
      { nombre: 'Calzado Dieléctrico EH', tipo: 'Eléctrico 18kV', obligatorio: true },
      { nombre: 'Guantes Dieléctricos Clase 0', tipo: 'Eléctrico', obligatorio: true },
      { nombre: 'Careta Antiarco Eléctrico NFPA 70E', tipo: 'Facial', obligatorio: true },
    ],
    accionRapida: {
      label: 'Ver Protocolo LOTO',
      tipo: 'modal',
      accionId: 'loto',
    },
    coordenadasCad: { x: 260, y: 110 },
  },
  {
    id: 'ensamblaje',
    capitulo: '04',
    titulo: 'Área de Ensamblaje & Maquinaria',
    subtitulo: 'Operación técnica, herramientas neumáticas y ruido ocupacional',
    tag: 'ZONA OPERATIVA // USO DE EPP NIVEL 3',
    areaTecnica: 'Área de Ensamblaje',
    resumenVisual: 'Sector de manufactura ligera e integración mecánica. Exige uso continuo de elementos de protección personal certificados.',
    riesgoGtc45: {
      clasificacion: 'Mecánico',
      nivel: 'ALTO',
      colorNivel: '#EF4444',
      descripcion: 'Atrapamiento en partes móviles, proyección de partículas virutas y exposición a ruido intermitente > 82 dB.',
      medidasExistentes: [
        'Resguardos fijos con micro-switches de enclavamiento en todas las prensas',
        'Pulsadores tipo hongo de parada de emergencia en cada módulo de trabajo',
        'Extractores de humo localizado y programa de vigilancia epidemiológica auditiva',
      ],
    },
    normaObligatoria: {
      hacer: [
        'Inspeccionar los protectores de seguridad antes de activar cualquier máquina.',
        'Recoger cabello largo y asegurar ropa de trabajo ceñida al cuerpo sin cordones sueltos.',
        'Suspender la operación inmediatamente si se percibe vibración o sonido anormal.',
      ],
      evitar: [
        'Anular o puentear los sensores de seguridad de las cubiertas mecánicas.',
        'Manipular piezas en movimiento con guantes de tela holgados o deshilachados.',
        'Realizar ajustes mecánicos con la máquina conectada a la red de aire o energía.',
      ],
    },
    eppRequerido: [
      { nombre: 'Gafas de Seguridad ANSI Z87.1', tipo: 'Ocular', obligatorio: true },
      { nombre: 'Protectores Auditivos Tipo Copa (NRR 27)', tipo: 'Auditivo', obligatorio: true },
      { nombre: 'Guantes de Nitrilo Antipunzante', tipo: 'Manual', obligatorio: true },
      { nombre: 'Botas con Puntera Composite', tipo: 'Podológico', obligatorio: true },
    ],
    accionRapida: {
      label: 'Reportar Novedad de Máquina',
      tipo: 'reporte',
      href: '/resumen#sugerencias',
    },
    coordenadasCad: { x: 380, y: 150 },
  },
  {
    id: 'almacen-evacuacion',
    capitulo: '05',
    titulo: 'Almacén, Carga & Ruta de Evacuación PE-01',
    subtitulo: 'Estanterías pesadas, montacargas y vía libre hacia salida de emergencia',
    tag: 'LOGÍSTICA & EMERGENCIAS // NTC 1461',
    areaTecnica: 'Almacén & Logística',
    resumenVisual: 'Centro neurálgico de despacho y salida de emergencia hacia el Punto de Encuentro Exterior (PE-01). Vías 100% despejadas las 24 horas.',
    riesgoGtc45: {
      clasificacion: 'Mecánico',
      nivel: 'ALTO',
      colorNivel: '#EF4444',
      descripcion: 'Colisión montacargas-peatón, caída de objetos desde alturas en racks y obstrucción de puertas de escape.',
      medidasExistentes: [
        'Líneas amarillas de tráfico peatonal de 1.20m segregadas de la calzada de carga',
        'Pintura y cinta fotoluminiscente clase B visible durante corte de energía',
        'Barra antipánico certificada en la puerta de salida hacia el Punto PE-01',
      ],
    },
    normaObligatoria: {
      hacer: [
        'Caminar exclusivamente por las sendas peatonales delimitadas con franjas amarillas.',
        'Contacto visual con el operario de montacargas antes de cruzar una intersección.',
        'En caso de evacuación: paso rápido sin correr, sin devolverse por objetos y seguir al brigadista.',
      ],
      evitar: [
        'Almacenar cajas, paletas o residuos frente a extintores, gabinetes o salidas.',
        'Cargar manualmente pesos superiores a 25 kg para hombres o 12.5 kg para mujeres.',
        'Usar el teléfono celular mientras se transita por la zona de maniobra de carga.',
      ],
    },
    eppRequerido: [
      { nombre: 'Chaleco de Alta Visibilidad Clase 2', tipo: 'Visual', obligatorio: true },
      { nombre: 'Casco de Seguridad Clase E con Barbuquejo', tipo: 'Craneal', obligatorio: true },
      { nombre: 'Calzado de Seguridad con Puntera de Acero', tipo: 'Podológico', obligatorio: true },
    ],
    accionRapida: {
      label: 'Simular Evacuación PE-01',
      tipo: 'plano',
      href: '/plano?simular=true',
    },
    coordenadasCad: { x: 500, y: 180 },
  },
];

export interface ProtocoloEmergenciaData {
  lineaNacional: string;
  arlEmergencias: string;
  brigadaCanal: string;
  frecuenciaRadio: string;
  extensionInterna: string;
  puntoEncuentro: string;
  paradaEmergencia: {
    ubicacion: string;
    procedimiento: string;
  };
}

export const PROTOCOLO_EMERGENCIA: ProtocoloEmergenciaData = {
  lineaNacional: '123',
  arlEmergencias: '#322 (Seguros Bolívar ARL)',
  brigadaCanal: 'Canal 1 - Brigada Operativa',
  frecuenciaRadio: '462.5625 MHz (Subtono 1)',
  extensionInterna: 'Ext. 101 / 102',
  puntoEncuentro: 'PE-01: Bahía Exterior Parqueadero Norte (Frente a Portería)',
  paradaEmergencia: {
    ubicacion: 'Tablero TG-01 Subestación & Pulsador Hongo Rojo en cada Isla de Ensamblaje',
    procedimiento: 'Presionar firmemente el hongo rojo sin girar. Desactiva inmediatamente la fuerza motriz de la nave.',
  },
};

export interface NormaDirectorioItem {
  id: string;
  codigo: string;
  categoria: 'Locativo' | 'Biomecánico' | 'Eléctrico' | 'Mecánico' | 'Emergencias' | 'Químico';
  titulo: string;
  normaLegal: string;
  resumen: string;
  reglaOro: string;
  epp: string[];
  areaAfectada: string;
  colorCategoria: string;
}

export const DIRECTORIO_NORMAS: NormaDirectorioItem[] = [
  {
    id: 'norma-01',
    codigo: 'SST-NORM-01',
    categoria: 'Biomecánico',
    titulo: 'Pausas Activas y Ergonomía en Pantallas VDT',
    normaLegal: 'Res. 0312/2019 Art. 16 // NTC 5655',
    resumen: 'Todo colaborador con jornada frente a computador debe realizar descansos activos de 5 minutos cada 2 horas para relajar el sistema muscular y visual.',
    reglaOro: 'La pantalla debe situarse a la altura de los ojos y a un brazo de distancia. Nunca ignores la fatiga ocular.',
    epp: ['Apoyapiés ergonómico', 'Silla regulable'],
    areaAfectada: 'Oficinas & Ingeniería',
    colorCategoria: '#1A56DB',
  },
  {
    id: 'norma-02',
    codigo: 'SST-NORM-02',
    categoria: 'Eléctrico',
    titulo: 'Procedimiento de Bloqueo y Etiquetado (LOTO)',
    normaLegal: 'Decreto 1072/2015 // RETIE Cap. 13 // OSHA 1910.147',
    resumen: 'Cero energía residual. Toda intervención técnica o de mantenimiento en tableros de más de 110V requiere candado personal y tarjeta de advertencia.',
    reglaOro: 'Una persona, un candado, una llave. Prohibido prestar o transferir candados de bloqueo.',
    epp: ['Guantes dieléctricos 1000V', 'Calzado EH', 'Careta antiarco'],
    areaAfectada: 'Datacenter / Subestación',
    colorCategoria: '#EF4444',
  },
  {
    id: 'norma-03',
    codigo: 'SST-NORM-03',
    categoria: 'Mecánico',
    titulo: 'Guardas de Seguridad y Botones de Parada de Emergencia',
    normaLegal: 'Res. 2400/1979 Título IX // ISO 13850',
    resumen: 'Las máquinas rotativas deben operar con sus resguardos fijados. Los pulsadores tipo hongo deben estar despejados a menos de un metro de alcance.',
    reglaOro: 'Bajo ninguna circunstancia se permite puentear interruptores de seguridad mecánicos.',
    epp: ['Gafas ANSI Z87.1', 'Protección auditiva copa', 'Botas con puntera'],
    areaAfectada: 'Área de Ensamblaje',
    colorCategoria: '#F59E0B',
  },
  {
    id: 'norma-04',
    codigo: 'SST-NORM-04',
    categoria: 'Emergencias',
    titulo: 'Rutas de Evacuación y Punto de Encuentro PE-01',
    normaLegal: 'Decreto 1072/2015 Art. 2.2.4.6.25 // NTC 1461',
    resumen: 'Al sonar la sirena continua de evacuación, todo el personal suspende labores y sale de manera ordenada hacia el punto exterior PE-01 sin correr.',
    reglaOro: 'Las puertas de emergencia nunca deben tener candado ni estar bloqueadas con pallets o cajas.',
    epp: ['Chaleco reflectivo (Brigadistas)', 'Linterna antiexplosión'],
    areaAfectada: 'Toda la Sede // Salida Norte',
    colorCategoria: '#10B981',
  },
  {
    id: 'norma-05',
    codigo: 'SST-NORM-05',
    categoria: 'Locativo',
    titulo: 'Segregación Peatonal y Operación de Montacargas',
    normaLegal: 'NTC 4114 // Res. 2400/1979 Art. 17',
    resumen: 'En zonas de almacén y logística, peatones y vehículos circulan por carriles independientes señalizados con pintura amarilla tráfico.',
    reglaOro: 'Mantén 3 metros de distancia mínima con montacargas en movimiento. Contacto visual obligatorio.',
    epp: ['Chaleco alta visibilidad', 'Calzado con puntera de acero'],
    areaAfectada: 'Almacén & Logística',
    colorCategoria: '#F59E0B',
  },
  {
    id: 'norma-06',
    codigo: 'SST-NORM-06',
    categoria: 'Químico',
    titulo: 'Manejo de Sustancias y Hojas de Datos de Seguridad (FDS)',
    normaLegal: 'Decreto 1496/2018 (SGA) // NTC 4435',
    resumen: 'Toda sustancia química (solventes, lubricantes, aerosoles) debe estar rotulada con pictogramas del Sistema Globalmente Armonizado (SGA).',
    reglaOro: 'Prohibido trasegar químicos en envases de gaseosas o recipientes de alimentos sin rotular.',
    epp: ['Respirador con cartucho químico', 'Guantes de nitrilo químico', 'Monogafas'],
    areaAfectada: 'Taller de Mantenimiento',
    colorCategoria: '#06B6D4',
  },
];
