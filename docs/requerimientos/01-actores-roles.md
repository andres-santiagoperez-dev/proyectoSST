# Matriz de Actores, Roles y Permisos (RBAC) — SafePulse SST

Versión: 1.0 · Fecha: 2026-11-17

---

## 1. Definición de Roles

1. **Visitante (Público):** Usuario no autenticado que ingresa al portal corporativo.
2. **Colaborador / Trabajador:** Empleado directo o contratista que accede a sus herramientas personales (pausas activas, reporte de incidentes y consulta de sus propias recomendaciones ergonómicas).
3. **Responsable del SG-SST (Líder SST con Licencia):** Administrador de la plataforma, encargado del monitoreo del sistema, registro de eventos, seguimiento de conceptos médicos y gestión de auditorías.
4. **Alta Dirección / Gerencia:** Perfil ejecutivo con acceso a tableros de control de alto nivel, métricas consolidadas y aprobación de compromisos.
5. **COPASST / Vigía de SST:** Representantes de los trabajadores que participan en investigaciones de incidentes y seguimiento de medidas preventivas.

---

## 2. Matriz de Permisos por Módulo

Acciones: **V** (Ver) · **C** (Crear) · **E** (Editar) · **A** (Aprobar / Cerrar) · **X** (Exportar) · **B** (Borrar / Inactivar)

| Módulo / Recurso | Visitante | Colaborador | Responsable SG-SST | Alta Dirección | COPASST / Vigía | Datos Sensibles Asociados |
|---|:---:|:---:|:---:|:---:|:---:|---|
| **Portal Corporativo y Política SST** | V | V | V, E, X | V, A, X | V | No |
| **Módulo Pausas Activas ("Pausa Vital")** | V (Demo) | V, C (Completar), E (Horarios) | V, C, E, X (Reporte global) | V (Métricas) | V | No (Solo métrica de participación) |
| **Reporte de Incidentes / Condiciones** | C (Anónimo) | V (Propios), C | V, C, E, A, X | V, X | V, E (Aporte a investigación) | Sí (Nombre, cargo, relato de lesión/daño) |
| **Tablero de Indicadores y Res. 0312** | — | — | V, C, E, X | V, X | V | No (Estadísticas anonimizadas) |
| **Conceptos de Aptitud Médica Laboral** | — | V (Solo los suyos) | V, C, E, X (Todos) | V (Consolidado estadístico) | — | **SÍ (Restricciones y recomendaciones)** |
| **Plan de Acción y Hallazgos** | — | V (Asignadas a él) | V, C, E, A, X | V, X | V, E | No |
| **Registro de Auditoría e Inmutabilidad** | — | — | V (Solo lectura) | V (Solo lectura) | — | Trazabilidad del sistema |

---

## 3. Principio de Privacidad y Manejo de Datos de Salud (Resolución 2346 de 2007)
* **Regla estricta:** La base de datos y la interfaz **NO** contienen campos para diagnósticos médicos CIE-10 ni descripciones de antecedentes clínicos personales.
* Los datos de salud permitidos se limitan exclusivamente a:
  1. Tipo de examen (Ingreso, Periódico, Egreso, Post-incapacidad).
  2. Fecha de realización y fecha de vencimiento.
  3. Concepto médico: *Apto*, *Apto con recomendaciones*, *Apto con restricciones*, o *No apto temporal/definitivo*.
  4. Restricciones operativas (ejemplo: "No levantar cargas mayores a 12 kg", "Uso de descansapiés ergonómico").
  5. Remisión a programa de vigilancia epidemiológica (Sí / No).

---

## 4. Reglas de Acceso y Sesión
* La visualización de conceptos de aptitud propios por parte de los trabajadores requiere sesión autenticada individual.
* Los reportes de incidentes desde campo permiten un flujo ágil autenticado o un código de colaborador sin fricción burocrática para incentivar la cultura del reporte.
* Ningún usuario (ni siquiera el Responsable SST) tiene permiso para eliminar registros del Log de Auditoría.
