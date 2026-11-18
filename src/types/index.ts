/**
 * TIPOS DE DOMINIO DEL APLICATIVO SG-SST (SafePulse SST)
 * Conforme a Decreto 1072/2015, Resolución 0312/2019 y Resolución 1843/2025.
 * Todos los datos son ejemplos simulados. CERO datos reales.
 */

export type Rol = 'VISITANTE' | 'COLABORADOR' | 'LIDER_SST' | 'GERENCIA' | 'COPASST';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
  cargo: string;
  sedeId: string;
}

export type TipoEjercicioPausa = 
  | 'VISUAL_20_20' 
  | 'CUELLO_TRAPECIO' 
  | 'TUNEL_CARPIANO' 
  | 'LUMBAR_POSTURAL';

export interface EjercicioPausaInfo {
  id: TipoEjercicioPausa;
  titulo: string;
  zonaCuerpo: string;
  duracionSegundos: number;
  instrucciones: string[];
  beneficioErgonomico: string;
  iconoSvg: string;
}

export interface RegistroPausa {
  id: string;
  usuarioId: string;
  usuarioNombre: string;
  tipoEjercicio: TipoEjercicioPausa;
  duracionSegundos: number;
  completadaEn: string; // ISO String
}

export interface PausaConfig {
  frecuenciaMinutos: number;
  sonidoHabilitado: boolean;
  notificacionesHabilitadas: boolean;
}

export type TipoEventoIncidente = 'INCIDENTE' | 'CONDICION_INSEGURA' | 'ACTO_INSEGURO';
export type EstadoIncidente = 'REPORTADO' | 'EN_INVESTIGACION' | 'GESTIONADO' | 'CERRADO';

export interface ReporteIncidente {
  id: string;
  radicado: string; // Ej. REP-2026-0042
  tipoEvento: TipoEventoIncidente;
  descripcion: string;
  ubicacionSede: string;
  areaEspecifica: string;
  fotoUrl?: string;
  estado: EstadoIncidente;
  reportadoPor: string; // "Anónimo" o nombre
  fechaOcurrencia: string;
  creadoEn: string;
  sincronizado: boolean; // para modo offline
}

export type FasePHVA = 'PLANEAR' | 'HACER' | 'VERIFICAR' | 'ACTUAR';
export type CalificacionEstandar = 'CUMPLE_TOTAL' | 'NO_CUMPLE' | 'NO_APLICA_JUSTIFICADO';

export interface EstandarMinimo0312 {
  id: string;
  codigo: string; // Ej: 1.1.1, 2.1.1
  fase: FasePHVA;
  nombre: string;
  criterio: string;
  pesoPorcentual: number;
  calificacion: CalificacionEstandar;
  justificacionNoAplica?: string;
}

export type TipoEvaluacionMedica = 
  | 'PREINGRESO' 
  | 'PERIODICA' 
  | 'EGRESO' 
  | 'CAMBIO_OCUPACION' 
  | 'POST_INCAPACIDAD' 
  | 'RETORNO' 
  | 'SEGUIMIENTO';

export type ConceptoAptitud = 
  | 'APTO' 
  | 'APTO_CON_RECOMENDACIONES' 
  | 'APTO_CON_RESTRICCIONES' 
  | 'NO_APTO_TEMPORAL';

export interface CertificadoAptitudMedica {
  id: string;
  trabajadorNombre: string;
  documentoIdentidad: string; // Ficticio
  cargo: string;
  tipoEvaluacion: TipoEvaluacionMedica;
  concepto: ConceptoAptitud;
  fechaExpedicion: string;
  fechaVencimiento: string; // Alerta si < 30 días
  recomendacionesLaborales: string[];
  ipsEmisora: string;
  medicoLicencia: string;
  // NOTA LEGAL: Prohibido estrictamente almacenar diagnósticos clínicos CIE-10 (Res. 1843/2025)
}

export type EstadoAccion = 'ABIERTA' | 'EN_EJECUCION' | 'CERRADA_EFICAZ';

export interface PlanAccion {
  id: string;
  codigo: string;
  origen: 'INCIDENTE' | 'ESTANDAR_0312' | 'INSPECCION';
  descripcionHallazgo: string;
  medidaPropuesta: string;
  responsableNombre: string;
  fechaLimite: string;
  estado: EstadoAccion;
  fechaCierre?: string;
}

export interface RegistroAuditoria {
  id: string;
  fechaUtc: string;
  usuarioEmail: string;
  rol: Rol;
  accion: 'CREAR' | 'ACTUALIZAR' | 'CALIFICAR' | 'CAMBIAR_ESTADO';
  entidad: string;
  entidadId: string;
  detalles: string;
  ip: string;
}
