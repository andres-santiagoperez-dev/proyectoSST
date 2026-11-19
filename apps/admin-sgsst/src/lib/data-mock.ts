/**
 * DATOS SEMILLA Y MOCKS DEL SG-SST (SafePulse SST)
 * NOTA DE SEGURIDAD: Todos los datos son FICTICIOS (Dato de ejemplo).
 * No corresponden a personas, números de identificación ni incidentes reales.
 */

import {
  EjercicioPausaInfo,
  EstandarMinimo0312,
  CertificadoAptitudMedica,
  ReporteIncidente,
  PlanAccion,
  Usuario,
} from '@/types';

// ============================================================================
// 1. INFORMACIÓN DE LA EMPRESA (Dato de ejemplo)
// ============================================================================
export const EMPRESA_EJEMPLO = {
  razonSocial: 'Industrias Andinas del Café S.A.S.',
  nit: '900.543.210-8',
  actividadEconomica: 'Procesamiento y envasado de café especial para exportación',
  codigoCiiu: '1071',
  claseRiesgo: 3, // Riesgo III (Riesgo medio según Decreto 768/2022)
  numTrabajadores: 240,
  representanteLegal: 'María Fernanda Restrepo Gómez (Dato de ejemplo)',
  responsableSST: 'Ing. Carlos Andrés Montoya - Licencia SST 14892-2021 (Dato de ejemplo)',
  arl: 'Seguros Bolívar ARL (Dato de ejemplo)',
  sedes: [
    { id: 'SEDE-01', nombre: 'Planta Principal y Tostaduría', ciudad: 'Bogotá D.C.', direccion: 'Cra 68D # 19-42' },
    { id: 'SEDE-02', nombre: 'Centro de Trilla y Almacenamiento', ciudad: 'Funza, Cundinamarca', direccion: 'Parque Industrial San Carlos Bodega 4' },
  ],
  politicaSST: {
    fechaFirma: '15 de enero de 2026',
    vigenciaAnual: '2026 - 2027',
    textoCompromiso: `Industrias Andinas del Café S.A.S. se compromete con la protección integral de la seguridad, salud física y mental de todos sus trabajadores dependientes, contratistas y partes interesadas. Destinamos los recursos físicos, técnicos y financieros para la identificación oportuna de peligros, evaluación de riesgos, prevención de lesiones osteomusculares mediante programas de ergonomía activa y pausas estructuradas, fomento de ambientes laborales dignos y cumplimiento riguroso de la normatividad colombiana (Decreto 1072 de 2015, Resolución 0312 de 2019 y Resolución 1843 de 2025).`,
    firmaGerente: 'M.F. Restrepo G. — Gerente General',
  },
};

// ============================================================================
// 2. USUARIOS Y ROLES DE DEMOSTRACIÓN (Datos de ejemplo)
// ============================================================================
export const USUARIOS_DEMO: Usuario[] = [
  {
    id: 'USR-001',
    nombre: 'Laura Camila Torres',
    email: 'laura.colaboradora@andinas.ejemplo.co',
    rol: 'COLABORADOR',
    cargo: 'Analista de Calidad en Laboratorio',
    sedeId: 'SEDE-01',
  },
  {
    id: 'USR-002',
    nombre: 'Carlos Andrés Montoya (Líder SST)',
    email: 'carlos.sst@andinas.ejemplo.co',
    rol: 'LIDER_SST',
    cargo: 'Coordinador del SG-SST',
    sedeId: 'SEDE-01',
  },
  {
    id: 'USR-003',
    nombre: 'Dra. María Fernanda Restrepo',
    email: 'gerencia@andinas.ejemplo.co',
    rol: 'GERENCIA',
    cargo: 'Gerente General',
    sedeId: 'SEDE-01',
  },
  {
    id: 'USR-004',
    nombre: 'Javier Enrique Gómez (Vigía)',
    email: 'javier.copasst@andinas.ejemplo.co',
    rol: 'COPASST',
    cargo: 'Presidente del COPASST / Supervisor de Planta',
    sedeId: 'SEDE-02',
  },
];

// ============================================================================
// 3. CATÁLOGO DE EJERCICIOS DE PAUSAS ACTIVAS (Ergonomía Vital)
// ============================================================================
export const EJERCICIOS_PAUSAS: EjercicioPausaInfo[] = [
  {
    id: 'HOMBROS_ROTACION',
    titulo: 'Relajación y Rotación de Hombros',
    zonaCuerpo: 'Cintura Escapular, Trapecio y Deltoides',
    duracionSegundos: 60,
    instrucciones: [
      'Siéntate o ponte de pie con la espalda erguida y los brazos sueltos a los lados.',
      'Inhala y eleva lentamente los hombros hacia las orejas.',
      'Dibuja círculos amplios y suaves hacia atrás, sintiendo cómo se juntan los omóplatos.',
      'Realiza 10 giros hacia atrás, respira profundo y repite 10 giros hacia adelante.',
    ],
    beneficioErgonomico: 'Libera la sobrecarga muscular en trapecios por tensión postural sostenida y tecleo.',
    iconoSvg: 'activity',
  },
  {
    id: 'VISUAL_20_20',
    titulo: 'Regla 20-20-20 (Descanso Ocular)',
    zonaCuerpo: 'Músculos Oculares y Sistema Visual',
    duracionSegundos: 45,
    instrucciones: [
      'Separa la vista del monitor o pantalla.',
      'Enfoca un objeto situado a 20 pies de distancia (al menos 6 metros).',
      'Parpadea suavemente 10 veces continuas para lubricar la córnea.',
      'Cierra los ojos con suavidad y respira profundo durante 15 segundos.',
    ],
    beneficioErgonomico: 'Previene el síndrome de fatiga visual informática y sequedad ocular.',
    iconoSvg: 'eye',
  },
  {
    id: 'CUELLO_TRAPECIO',
    titulo: 'Descompresión Cervical y Trapecio',
    zonaCuerpo: 'Columna Cervical y Hombros',
    duracionSegundos: 60,
    instrucciones: [
      'Inclina la cabeza lentamente hacia el hombro derecho sin elevar el hombro.',
      'Con la mano derecha, ejerce una leve presión sin dolor durante 15 segundos.',
      'Repite el movimiento hacia el hombro izquierdo.',
      'Gira la cabeza suavemente dibujando un semicírculo mirando hacia el suelo.',
    ],
    beneficioErgonomico: 'Alivia la tensión muscular por postura fija ante pantallas y puestos operativos.',
    iconoSvg: 'activity',
  },
  {
    id: 'TUNEL_CARPIANO',
    titulo: 'Movilidad de Muñecas y Dedos',
    zonaCuerpo: 'Antebrazos, Muñeca y Nervio Mediano',
    duracionSegundos: 60,
    instrucciones: [
      'Extiende el brazo derecho al frente con la palma hacia arriba.',
      'Con la mano izquierda, tira suavemente de los dedos hacia atrás durante 15 segundos.',
      'Invierte la palma hacia abajo y repite el estiramiento de extensores.',
      'Realiza círculos lentos con ambas muñecas en sentido horario y antihorario.',
    ],
    beneficioErgonomico: 'Reduce la presión en el túnel carpiano por uso intensivo de teclado, mouse o herramientas.',
    iconoSvg: 'hand',
  },
  {
    id: 'LUMBAR_POSTURAL',
    titulo: 'Extensión Lumbar y Descompresión',
    zonaCuerpo: 'Zona Lumbar y Cadenas Posteriores',
    duracionSegundos: 75,
    instrucciones: [
      'Ponte de pie con los pies separados al ancho de los hombros.',
      'Coloca las palmas de las manos sobre la parte baja de la espalda.',
      'Inhala y arquea suavemente el torso hacia atrás mirando al techo durante 5 segundos.',
      'Exhala y vuelve al centro. Repite 5 veces de forma controlada.',
    ],
    beneficioErgonomico: 'Compensa el acortamiento de flexores de cadera y la compresión discal por sedentarismo.',
    iconoSvg: 'user-check',
  },
  {
    id: 'PIERNAS_CIRCULACION',
    titulo: 'Activación de Gemelos y Retorno Venoso',
    zonaCuerpo: 'Piernas, Pantorrillas y Tobillos',
    duracionSegundos: 60,
    instrucciones: [
      'Ponte de pie con la espalda recta, apoyándote suavemente si requieres equilibrio.',
      'Elévate sobre la punta de ambos pies durante 3 segundos, contrayendo las pantorrillas.',
      'Baja despacio apoyando los talones y levanta ligeramente las puntas de los pies.',
      'Realiza 15 elevaciones suaves para activar la bomba muscular de las piernas.',
    ],
    beneficioErgonomico: 'Estimula el retorno venoso, previene edemas en miembros inferiores y pesadez.',
    iconoSvg: 'activity',
  },
];

// ============================================================================
// 4. ESTÁNDARES MÍNIMOS RESOLUCIÓN 0312 DE 2019 (Ponderaciones oficiales)
// ============================================================================
export const ESTANDARES_0312_INICIALES: EstandarMinimo0312[] = [
  // PLANEAR (Total peso: 25%)
  {
    id: 'EST-1.1.1',
    codigo: '1.1.1',
    fase: 'PLANEAR',
    nombre: 'Responsable del SG-SST',
    criterio: 'Asignar persona con licencia en SST vigente y curso de 50 horas.',
    pesoPorcentual: 4.0,
    calificacion: 'CUMPLE_TOTAL',
  },
  {
    id: 'EST-1.1.2',
    codigo: '1.1.2',
    fase: 'PLANEAR',
    nombre: 'Responsabilidades en SST',
    criterio: 'Asignar, documentar y divulgar responsabilidades en SST a todos los niveles.',
    pesoPorcentual: 4.0,
    calificacion: 'CUMPLE_TOTAL',
  },
  {
    id: 'EST-1.1.3',
    codigo: '1.1.3',
    fase: 'PLANEAR',
    nombre: 'Asignación de Recursos para SST',
    criterio: 'Presupuesto financiero, recursos técnicos y físicos asignados para el año.',
    pesoPorcentual: 4.0,
    calificacion: 'CUMPLE_TOTAL',
  },
  {
    id: 'EST-1.1.4',
    codigo: '1.1.4',
    fase: 'PLANEAR',
    nombre: 'Afiliación al Sistema de Seguridad Social',
    criterio: 'Afiliación a ARL, EPS y Fondo de Pensiones de todo el personal y contratistas.',
    pesoPorcentual: 4.0,
    calificacion: 'CUMPLE_TOTAL',
  },
  {
    id: 'EST-1.2.1',
    codigo: '1.2.1',
    fase: 'PLANEAR',
    nombre: 'Política de Seguridad y Salud en el Trabajo',
    criterio: 'Política documentada, firmada por el representante legal y divulgada.',
    pesoPorcentual: 5.0,
    calificacion: 'CUMPLE_TOTAL',
  },
  {
    id: 'EST-1.2.2',
    codigo: '1.2.2',
    fase: 'PLANEAR',
    nombre: 'Plan Anual de Trabajo',
    criterio: 'Plan anual estructurado con objetivos, metas, cronograma y responsables.',
    pesoPorcentual: 4.0,
    calificacion: 'CUMPLE_TOTAL',
  },

  // HACER (Total peso: 60%)
  {
    id: 'EST-2.1.1',
    codigo: '2.1.1',
    fase: 'HACER',
    nombre: 'Evaluaciones Médicas Ocupacionales',
    criterio: 'Exámenes médicos de ingreso, periódicos y retiro conforme a Res. 1843/2025.',
    pesoPorcentual: 10.0,
    calificacion: 'CUMPLE_TOTAL',
  },
  {
    id: 'EST-2.2.1',
    codigo: '2.2.1',
    fase: 'HACER',
    nombre: 'Custodia de Historias Clínicas',
    criterio: 'Custodia exclusiva por la IPS; el empleador solo conserva certificados de aptitud.',
    pesoPorcentual: 5.0,
    calificacion: 'CUMPLE_TOTAL',
  },
  {
    id: 'EST-2.3.1',
    codigo: '2.3.1',
    fase: 'HACER',
    nombre: 'Programa de Pausas Activas y Estilo de Vida Saludable',
    criterio: 'Ejecución y registro de pausas activas para prevención de DME (Ley 1355/2009).',
    pesoPorcentual: 10.0,
    calificacion: 'CUMPLE_TOTAL',
  },
  {
    id: 'EST-3.1.1',
    codigo: '3.1.1',
    fase: 'HACER',
    nombre: 'Identificación de Peligros y Valoración de Riesgos',
    criterio: 'Metodología GTC 45 actualizada con participación de todos los centros de trabajo.',
    pesoPorcentual: 15.0,
    calificacion: 'CUMPLE_TOTAL',
  },
  {
    id: 'EST-3.2.1',
    codigo: '3.2.1',
    fase: 'HACER',
    nombre: 'Medidas de Prevención y Control',
    criterio: 'Jerarquía de controles (eliminación, sustitución, ingeniería, admin y EPP).',
    pesoPorcentual: 10.0,
    calificacion: 'CUMPLE_TOTAL',
  },
  {
    id: 'EST-4.1.1',
    codigo: '4.1.1',
    fase: 'HACER',
    nombre: 'Plan de Prevención y Respuesta ante Emergencias',
    criterio: 'Brigada conformada, capacitada, planos de evacuación y simulacros anuales.',
    pesoPorcentual: 10.0,
    calificacion: 'CUMPLE_TOTAL',
  },

  // VERIFICAR (Total peso: 5%)
  {
    id: 'EST-5.1.1',
    codigo: '5.1.1',
    fase: 'VERIFICAR',
    nombre: 'Indicadores del SG-SST',
    criterio: 'Medición de frecuencia y severidad de accidentalidad, ausentismo y cobertura.',
    pesoPorcentual: 2.5,
    calificacion: 'CUMPLE_TOTAL',
  },
  {
    id: 'EST-5.1.2',
    codigo: '5.1.2',
    fase: 'VERIFICAR',
    nombre: 'Investigación de Incidentes y Accidentes',
    criterio: 'Investigar todos los eventos en máx. 15 días con el equipo COPASST (Res. 1401).',
    pesoPorcentual: 2.5,
    calificacion: 'CUMPLE_TOTAL',
  },

  // ACTUAR (Total peso: 10%)
  {
    id: 'EST-6.1.1',
    codigo: '6.1.1',
    fase: 'ACTUAR',
    nombre: 'Acciones Preventivas y Correctivas',
    criterio: 'Planes de mejora derivados de hallazgos, inspecciones y auditorías.',
    pesoPorcentual: 5.0,
    calificacion: 'CUMPLE_TOTAL',
  },
  {
    id: 'EST-6.1.2',
    codigo: '6.1.2',
    fase: 'ACTUAR',
    nombre: 'Plan de Mejoramiento Continuo',
    criterio: 'Seguimiento semestral a la eficacia de las medidas adoptadas.',
    pesoPorcentual: 5.0,
    calificacion: 'CUMPLE_TOTAL',
  },
];

// ============================================================================
// 5. REPORTES DE INCIDENTES Y CONDICIONES (Datos de ejemplo)
// ============================================================================
export const REPORTES_INICIALES: ReporteIncidente[] = [
  {
    id: 'INC-001',
    radicado: 'REP-2026-0038',
    tipoEvento: 'CONDICION_INSEGURA',
    descripcion: 'Derrame de agua condensada sobre pasillo de empaque; superficie resbaladiza sin señalización preventiva.',
    ubicacionSede: 'Planta Principal y Tostaduría',
    areaEspecifica: 'Línea de Envasado al Vacío - Pasillo Norte',
    estado: 'CERRADO',
    reportadoPor: 'Carlos Pérez (Operario de Empaque - Ficticio)',
    fechaOcurrencia: '2026-11-14T10:15:00',
    creadoEn: '2026-11-14T10:20:00Z',
    sincronizado: true,
  },
  {
    id: 'INC-002',
    radicado: 'REP-2026-0039',
    tipoEvento: 'INCIDENTE',
    descripcion: 'Estiba de sacos de café verde de 50 kg se desestabilizó al maniobrar con montacargas; cayó al suelo sin golpear personas.',
    ubicacionSede: 'Centro de Trilla y Almacenamiento',
    areaEspecifica: 'Bahía de Cargue 2 - Bodega B',
    estado: 'EN_INVESTIGACION',
    reportadoPor: 'Javier Gómez (Presidente COPASST - Ficticio)',
    fechaOcurrencia: '2026-11-16T15:40:00',
    creadoEn: '2026-11-16T15:45:00Z',
    sincronizado: true,
  },
  {
    id: 'INC-003',
    radicado: 'REP-2026-0040',
    tipoEvento: 'CONDICION_INSEGURA',
    descripcion: 'Parada de emergencia de la selladora térmica automática presenta holgura en el switch de corte eléctrico.',
    ubicacionSede: 'Planta Principal y Tostaduría',
    areaEspecifica: 'Línea de Sellado 1',
    estado: 'REPORTADO',
    reportadoPor: 'Anónimo (Colaborador de Turno)',
    fechaOcurrencia: '2026-11-17T09:10:00',
    creadoEn: '2026-11-17T09:12:00Z',
    sincronizado: true,
  },
];

// ============================================================================
// 6. CERTIFICADOS DE APTITUD MÉDICA OCUPACIONAL (Res. 1843/2025)
// Solo conceptos y recomendaciones laborales. CERO diagnósticos médicos.
// ============================================================================
export const CERTIFICADOS_MEDICOS_INICIALES: CertificadoAptitudMedica[] = [
  {
    id: 'APT-001',
    trabajadorNombre: 'Laura Camila Torres (Dato de ejemplo)',
    documentoIdentidad: 'CC 1.020.334.891 (Ficticio)',
    cargo: 'Analista de Calidad en Laboratorio',
    tipoEvaluacion: 'PERIODICA',
    concepto: 'APTO_CON_RECOMENDACIONES',
    fechaExpedicion: '2026-03-10',
    fechaVencimiento: '2027-03-10',
    recomendacionesLaborales: [
      'Pausa activa visual (regla 20-20-20) cada 60 minutos de lectura en microscopio.',
      'Ajustar altura de silla ergonómica para mantener ángulo de 90° en codos y rodillas.',
      'Control optométrico anual preventivo.',
    ],
    ipsEmisora: 'Salud Ocupacional Andina I.P.S. Lic. 4529-2020 (Ficticio)',
    medicoLicencia: 'Dra. Sandra Milena Peña - Lic. SST 9821-2018',
  },
  {
    id: 'APT-002',
    trabajadorNombre: 'Diego Fernando Suárez (Dato de ejemplo)',
    documentoIdentidad: 'CC 80.123.456 (Ficticio)',
    cargo: 'Operario de Almacenamiento y Estibado',
    tipoEvaluacion: 'PERIODICA',
    concepto: 'APTO_CON_RESTRICCIONES',
    fechaExpedicion: '2025-12-05',
    fechaVencimiento: '2026-12-05', // Próximo a vencer
    recomendacionesLaborales: [
      'No levantar pesos mayores a 15 kg de forma manual; utilizar transpaleta hidráulica obligatoria.',
      'Rotación de puesto entre carga y registro de inventario cada 2 horas.',
      'Uso estricto de cinturón ergonómico de apoyo postural.',
    ],
    ipsEmisora: 'Protección Médica Laboral S.A.S. (Ficticio)',
    medicoLicencia: 'Dr. Hernán Cortázar - Lic. SST 3412-2019',
  },
];

// ============================================================================
// 7. PLANES DE ACCIÓN Y HALLAZGOS (Ciclo Actuar)
// ============================================================================
export const PLANES_ACCION_INICIALES: PlanAccion[] = [
  {
    id: 'ACC-001',
    codigo: 'ACT-2026-001',
    origen: 'INCIDENTE',
    descripcionHallazgo: 'Derrame de líquido condensado en pasillo de envasado sin canalización adecuada.',
    medidaPropuesta: 'Instalar bandeja recolectora de acero inoxidable y purga automática hacia drenaje industrial.',
    responsableNombre: 'Ing. Mantenimiento Juan Pablo Vera',
    fechaLimite: '2026-11-30',
    estado: 'EN_EJECUCION',
  },
  {
    id: 'ACC-002',
    codigo: 'ACT-2026-002',
    origen: 'ESTANDAR_0312',
    descripcionHallazgo: 'Se requiere ampliar cobertura de pausas activas guiadas al 100% de colaboradores en turnos nocturnos.',
    medidaPropuesta: 'Desplegar la alarma interactiva SafePulse SST con módulo de Orbe Biomecánico en pantallas de planta.',
    responsableNombre: 'Carlos Andrés Montoya (Líder SST)',
    fechaLimite: '2026-11-25',
    estado: 'EN_EJECUCION',
  },
];
