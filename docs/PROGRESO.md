# Estado de Progreso del Proyecto SG-SST

Documento vivo para registrar el avance, decisiones de arquitectura y diseño, supuestos y tareas pendientes a lo largo de las fases de desarrollo.

---

## 1. Estado Actual
* **Fase Actual:** FASE 3 — Arquitectura (Iniciando definición técnica tras aprobación de stack y requerimientos)
* **Fecha de actualización:** 2026-11-18
* **Último Commit:** `docs(fase-1): requerimientos, historias de usuario y definicion de MVP` (hash: `d9ff521`)

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
- [x] Elaboración de `docs/requerimientos/00-vision.md`.
- [x] Elaboración de `docs/requerimientos/01-actores-roles.md` (RBAC y confidencialidad).
- [x] Elaboración de `docs/requerimientos/02-epicas.md` (Opción B seleccionada).
- [x] Elaboración de historias de usuario del MVP (`HU-001` a `HU-006`) con criterios Dado/Cuando/Entonces.
- [x] Elaboración de `docs/requerimientos/03-rnf.md` con metas medibles `[PROPUESTO]`.
- [x] Registro de preguntas y supuestos en `docs/requerimientos/05-preguntas-abiertas.md`.
- [x] **Punto de Control A:** Aprobado por el usuario. Commit registrado (`d9ff521`).

### Fase 2 — Norma y Trazabilidad
- [x] Búsqueda y verificación de fuentes oficiales colombianas (Gestor Normativo Función Pública, SUIN-Juriscol, MinTrabajo).
- [x] Resolución de `[VERIFICAR]`: Confirmada la derogatoria de la Res. 2346/2007 por la **Resolución 1843 de 2025** (7 tipos de exámenes, reserva médica estricta, prohibición de VIH/embarazo).
- [x] Confirmación de plazos: Reporte accidente ARL/EPS en 2 días hábiles; investigación interna en 15 días calendario (Res. 1401 de 2007).
- [x] Confirmación de ponderaciones Res. 0312 de 2019: Planear (25%), Hacer (60%), Verificar (5%), Actuar (10%); escala <60% crítico, 60-85% moderado, >85% aceptable.
- [x] Creación de la matriz completa en `docs/requerimientos/04-trazabilidad.md`.
- [x] Identificación de huecos diferidos (Furat directo ARL, riesgo psicosocial) y puntos para validación por profesional SST.

### Fase 3 — Arquitectura (En curso)
- [ ] Decisión de stack técnico: React asincrónico (Next.js / Vite + React con arquitectura asíncrona, TS, Tailwind, GSAP/Motion).
- [ ] Redacción del ADR en `docs/adr/0001-stack.md`.
- [ ] Modelo de datos inicial del MVP (esquema relacional con auditoría inmutable).
- [ ] Matriz detallada de roles y permisos.
- [ ] Lista de datos sensibles y tratamiento de confidencialidad.
- [ ] Plan de pruebas para cálculos normativos y permisos.
- [ ] **Punto de Control B:** Espera de aprobación de stack y modelo.

### Fase 4 — Identidad Visual (Pendiente)
- [ ] Brief mínimo y 3 direcciones visuales diferenciadas con momentos animados memorables.
- [ ] **Punto de Control C:** Elección/combinación de dirección visual.
- [ ] Tokens de diseño, especificación de movimiento (`docs/diseno/movimiento.md`) y registro en `docs/diseno/direccion.md`.

### Fase 5 — Construcción por Incrementos (Pendiente)
- [ ] Incremento 1: Scaffolding, tokens, layout base, auth y auditoría.
- [ ] Incremento 2: Landing/portal público con momento animado memorable.
- [ ] Incremento 3+: Módulos del MVP (historia → datos/permisos → UI accesible → pruebas → verificación).

### Fase 6 — Cierre (Pendiente)
- [ ] Verificación integral con `sst-verificacion-entrega` (responsive 375/768/1280/1920, accesibilidad, tests).
- [ ] README principal y reporte final de entrega.

---

## 3. Decisiones Tomadas
* **D-001:** Estructura recomendada por Antigravity en `.agents/` para portabilidad.
* **D-002:** Confirmado país: Colombia. SG-SST (Dec. 1072/2015, Res. 0312/2019, Res. 1401/2007, Ley 1355/2009).
* **D-003:** Marco médico actualizado a la **Resolución 1843 de 2025** (vigente en Colombia, deroga Res. 2346/2007).
* **D-004:** Operador: Empresa particular para sus trabajadores directos y contratistas.
* **D-005:** Requerimiento estrella: Alarmas programables para pausas activas con guía interactiva animada.
* **D-006:** Selección de arquitectura de frontend: **React de forma asincrónica** (TypeScript, Next.js / Server Actions / TanStack Query, Tailwind CSS, GSAP y Motion).

---

## 4. Supuestos Activos
* **[SUPUESTO-001]:** Las alarmas de pausas activas contarán con temporizador en segundo plano, Web Notifications API y alerta modal emergente con audio opcional.
* **[SUPUESTO-002]:** Almacenamiento local offline en el formulario de incidentes mediante IndexedDB con cola de sincronización asincrónica.
* **[SUPUESTO-003]:** Los estándares mínimos (Res. 0312) se configuran con la tabla de ponderación oficial (25-60-5-10).

---

## 5. Pendientes Inmediatos
* Elaboración y entrega del ADR `docs/adr/0001-stack.md` y modelo de datos en Fase 3 para el **Punto de Control B**.
