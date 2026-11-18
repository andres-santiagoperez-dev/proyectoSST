# Estado de Progreso del Proyecto SG-SST

Documento vivo para registrar el avance, decisiones de arquitectura y diseño, supuestos y tareas pendientes a lo largo de las fases de desarrollo.

---

## 1. Estado Actual
* **Fase Actual:** FASE 5 — Construcción por Incrementos (Iniciando Incremento 1: Scaffolding, Tokens, Base)
* **Fecha de actualización:** 2026-11-18
* **Último Commit:** `docs(fase-3): arquitectura de stack react asincronico, modelo de datos y rbac` (hash: `0861b50`)

---

## 2. Registro de Fases

### Fase 0 — Preparación
- [x] Copia y verificación de los 7 skills `sst-*` y la regla `sst-proyecto.md` en `.agents/`.
- [x] Inicialización del repositorio Git local (`git init`).
- [x] Creación de la estructura de documentación (`docs/requerimientos/`, `docs/diseno/`, `docs/adr/`).
- [x] Creación de `docs/PROGRESO.md`.
- [x] Propuesta y análisis de skills externos complementarios.
- [x] Commit de Fase 0 registrado.

### Fase 1 — Requerimientos
- [x] Ronda 1 de preguntas de descubrimiento completada.
- [x] Documentos de visión, actores, roles, épicas (Opción B seleccionada).
- [x] Historias de usuario (`HU-001` a `HU-006`) con criterios Dado/Cuando/Entonces.
- [x] Requisitos No Funcionales con metas medibles `[PROPUESTO]`.
- [x] **Punto de Control A:** Aprobado por el usuario. Commit `d9ff521`.

### Fase 2 — Norma y Trazabilidad
- [x] Búsqueda y verificación de fuentes oficiales colombianas.
- [x] Resolución de `[VERIFICAR]`: Confirmada **Resolución 1843 de 2025** (deroga Res. 2346/2007).
- [x] Confirmación de plazos (2 días hábiles reporte accidente, 15 días calendario investigación Res. 1401/2007).
- [x] Confirmación de ponderaciones Res. 0312 de 2019 (Planear 25%, Hacer 60%, Verificar 5%, Actuar 10%).
- [x] Matriz de trazabilidad en `docs/requerimientos/04-trazabilidad.md`.
- [x] Commit `dcd3ebf`.

### Fase 3 — Arquitectura
- [x] ADR 0001: Stack React Full-Stack Asincrónico (Next.js, Tailwind, GSAP/Motion, Prisma).
- [x] ADR 0002: Modelo de datos, matriz RBAC, tratamiento de datos de salud y plan de pruebas.
- [x] **Punto de Control B:** Aprobado por el usuario. Commit `0861b50`.

### Fase 4 — Identidad Visual y Movimiento
- [x] Brief mínimo y propuesta de 3 direcciones visuales con mockups de alta calidad generados por subagent.
- [x] **Punto de Control C:** Aprobada la integración de las 3 direcciones por ámbitos:
  * **Pública:** Dirección 3 (Blueprint Cartográfico Isométrico: estructura, rutas de evacuación, zonas de pausas y normas).
  * **Pausas Activas:** Dirección 2 (Ergonomía Vital y Bienestar: orbe de respiración y rutinas guiadas).
  * **Administración:** Dirección 1 (Planta Viva y Demarcación Industrial: tablero Andon y telemetría de gestión).
- [x] Definición de tokens multitema en `docs/diseno/tokens.css`.
- [x] Especificación de movimiento y accesibilidad en `docs/diseno/movimiento.md`.
- [x] Registro formal de decisiones en `docs/diseno/direccion.md`.

### Fase 5 — Construcción por Incrementos (En curso)
- [ ] **Incremento 1:** Scaffolding del proyecto React/Next.js asincrónico, configuración de Tailwind y tokens de diseño, tipografías, layout base, sistema de autenticación/roles y registro de auditoría inmutable.
- [ ] **Incremento 2:** Portal público interactivo (Dirección 3 Blueprint) con plano isométrico, capas de evacuación/pausas, política y manifiesto normativo.
- [ ] **Incremento 3:** Módulo de Pausas Activas "Pausa Vital" (Dirección 2) con orbe animado de respiración, temporizador/alarmas en segundo plano, rutinas osteomusculares y registro de participación.
- [ ] **Incremento 4:** Formulario ágil de reporte de incidentes y condiciones inseguras (móvil/campo, soporte offline con IndexedDB y sincronización).
- [ ] **Incremento 5:** Tablero de control gerencial del Administrador (Dirección 1 Andon) con semáforo de Estándares Mínimos (Res. 0312), control de aptitud médica (Res. 1843/2025) y plan de acción.

### Fase 6 — Cierre (Pendiente)
- [ ] Verificación integral con `sst-verificacion-entrega` (responsive 375/768/1280/1920, accesibilidad, tests).
- [ ] README principal y reporte final de entrega.

---

## 3. Decisiones Tomadas
* **D-001 a D-008:** Registradas en fases anteriores.
* **D-009:** Arquitectura visual tripartita con propósito: Dirección 3 (Blueprint) para el portal público, Dirección 2 (Ergonomía Vital) para las pausas activas, y Dirección 1 (Andon Industrial) para la consola administrativa.

---

## 4. Supuestos Activos
* **[SUPUESTO-001]:** Las alarmas de pausas activas contarán con temporizador en segundo plano, Web Notifications API y alerta modal emergente con audio opcional.
* **[SUPUESTO-002]:** Almacenamiento local offline en el formulario de incidentes mediante IndexedDB con cola de sincronización asincrónica.
* **[SUPUESTO-003]:** Los estándares mínimos (Res. 0312) se configuran con la tabla de ponderación oficial (25-60-5-10).

---

## 5. Pendientes Inmediatos
* Ejecutar Incremento 1 de la Fase 5.
