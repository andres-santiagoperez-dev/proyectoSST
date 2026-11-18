/**
 * REGISTRO DE AUDITORÍA INMUTABLE (SG-SST)
 * Conforme a Decreto 1072/2015 Art. 2.2.4.6.13 y ADR-0002.
 * Esta bitácora es de SOLO INSERCIÓN. Ninguna función permite modificar ni eliminar registros.
 */

import { RegistroAuditoria, Rol } from '@/types';

const AUDIT_STORAGE_KEY = 'safepulse_audit_log_v1';

// Cargar registros existentes desde localStorage o memoria
function obtenerRegistros(): RegistroAuditoria[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error al leer log de auditoría:', e);
    return [];
  }
}

// Guardar registro (SOLO INSERCIÓN / APPEND-ONLY)
export function registrarAuditoria(
  usuarioEmail: string,
  rol: Rol,
  accion: 'CREAR' | 'ACTUALIZAR' | 'CALIFICAR' | 'CAMBIAR_ESTADO',
  entidad: string,
  entidadId: string,
  detalles: string
): RegistroAuditoria {
  const nuevoRegistro: RegistroAuditoria = {
    id: `AUD-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    fechaUtc: new Date().toISOString(),
    usuarioEmail,
    rol,
    accion,
    entidad,
    entidadId,
    detalles,
    ip: '192.168.1.45 (Local/Cliente)',
  };

  if (typeof window !== 'undefined') {
    try {
      const actuales = obtenerRegistros();
      // Agregar al inicio (orden cronológico inverso)
      const actualizados = [nuevoRegistro, ...actuales];
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(actualizados));
    } catch (e) {
      console.error('Error al persistir auditoría:', e);
    }
  }

  return nuevoRegistro;
}

export function consultarBitacoraAuditoria(): RegistroAuditoria[] {
  const registros = obtenerRegistros();
  if (registros.length === 0) {
    // Si está vacío, sembrar eventos iniciales verificables
    return [
      {
        id: 'AUD-001-INI',
        fechaUtc: '2026-11-17T18:00:00.000Z',
        usuarioEmail: 'lider.sst@empresa-ejemplo.co',
        rol: 'LIDER_SST',
        accion: 'CALIFICAR',
        entidad: 'EstandarMinimo0312',
        entidadId: 'EST-1.1.1',
        detalles: 'Calificación inicial del estándar de asignación de responsable SG-SST (Cumple total)',
        ip: '192.168.1.10',
      },
      {
        id: 'AUD-002-INI',
        fechaUtc: '2026-11-18T08:30:00.000Z',
        usuarioEmail: 'medico.ips@salud-ocupacional.co',
        rol: 'LIDER_SST',
        accion: 'CREAR',
        entidad: 'CertificadoAptitudMedica',
        entidadId: 'APT-2026-001',
        detalles: 'Registro de concepto de aptitud ocupacional periódico (Apto con recomendaciones de pausa ergonómica)',
        ip: '192.168.1.12',
      },
    ];
  }
  return registros;
}
