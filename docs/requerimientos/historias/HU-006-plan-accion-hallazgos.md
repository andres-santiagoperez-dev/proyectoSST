# HU-006 — Gestor de Acciones Preventivas, Correctivas y Planes de Mejora

**Épica:** Épica 4 — Actuar / Mejora Continua · **Prioridad:** Debería · **Estado:** lista  
**Norma o fuente (`norma_ref`):** Decreto 1072 de 2015, Art. 2.2.4.6.33 (Acciones preventivas y correctivas) `[VERIFICAR]` · **Datos sensibles:** No

---

## Historia
Como **Responsable del SG-SST o Líder de Área**, quiero **crear y dar seguimiento a planes de acción correctivos y preventivos derivados de incidentes o autoevaluaciones, asignando un responsable y fecha límite**, para **eliminar causas raíz de riesgo y evidenciar el ciclo de mejora continua en auditorías**.

---

## Criterios de Aceptación

1. **Criterio 1: Creación de acción correctiva o preventiva (Camino feliz)**
   - **Dado** que se ha investigado un incidente o detectado un hallazgo en los estándares mínimos
   - **Cuando** el Responsable del SG-SST crea una acción indicando: descripción del hallazgo, acción propuesta, origen (Incidente / Inspección / Autoevaluación), responsable asignado y fecha límite de implementación
   - **Entonces** la acción se guarda en estado "Abierta", queda vinculada al evento de origen y se notifica al responsable.

2. **Criterio 2: Cierre y verificación de eficacia**
   - **Dado** que el responsable ejecutó las medidas correctivas
   - **Cuando** el Responsable del SG-SST revisa la evidencia y marca la acción como "Cerrada y Eficaz"
   - **Entonces** el sistema actualiza el estado a "Cerrada", registra la fecha de cierre y recalcula el porcentaje de eficacia del plan de acción en el tablero general.

3. **Criterio 3: Alerta de acciones vencidas**
   - **Dado** que una acción supera la fecha límite establecida sin haber sido cerrada
   - **Cuando** se visualiza la lista del plan de acción
   - **Entonces** se resalta automáticamente con indicador visual rojo y etiqueta "Vencida (X días de retraso)".

4. **Criterio 4: Permisos de modificación (Permisos)**
   - **Dado** un colaborador asignado a una tarea
   - **Cuando** ingresa a la acción
   - **Entonces** puede adjuntar comentarios y marcar "Implementada para revisión", pero solo el Responsable del SG-SST puede cambiar el estado a "Cerrada / Eficaz".

---

## Estados de Interfaz a Diseñar
* **Tablero tipo Kanban o lista filtrable:** Columnas por estado (Abiertas, En progreso, En revisión, Cerradas).
* **Tarjeta de acción:** Con avatar del responsable, barra de días restantes y badge de severidad.
* **Modal de cierre:** Formulario con campo para describir la verificación de eficacia antes de permitir el cierre.

---

## Dependencias y Pruebas
* **Depende de:** HU-003 (Reporte de incidentes) y HU-004 (Tablero e indicadores).
* **Pruebas:**
  - [ ] Prueba de transición de estados (Abierta -> En progreso -> Cerrada).
  - [ ] Prueba de bloqueo de cierre para usuarios no autorizados.

---

## Historial
| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 2026-11-17 | Creación inicial de la historia de usuario para el MVP. |
