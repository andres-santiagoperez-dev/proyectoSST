# Estado de Progreso del Proyecto SG-SST

Documento vivo para registrar el avance, decisiones de arquitectura y diseño, supuestos y tareas pendientes a lo largo de las fases de desarrollo.

---

## 1. Estado Actual
* **Fase Actual:** FASE 3 — Arquitectura (Entregables completados -> En PUNTO DE CONTROL B)
* **Fecha de actualización:** 2026-11-18
* **Último Commit:** `docs(fase-2): verificacion normativa colombiana y matriz de trazabilidad` (hash: `dcd3ebf`)

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
- [x] Verificación en fuentes oficiales de la normativa colombiana aplicable (SG-SST).
- [x] Confirmada la **Resolución 1843 de 2025** (deroga Res. 2346/2007, 7 exámenes ocupacionales, confidencialidad estricta).
- [x] Confirmados plazos (2 días hábiles reporte accidente, 15 días calendario investigación Res. 1401/2007).
- [x] Confirmadas ponderaciones Res. 0312 de 2019 (Planear 25%, Hacer 60%, Verificar 5%, Actuar 10%).
- [x] Matriz de trazabilidad completa en `docs/requerimientos/04-trazabilidad.md`.
- [x] Commit de Fase 2 registrado (`dcd3ebf`).

### Fase 3 — Arquitectura
- [x] ADR 0001: Selección de stack tecnológico en `docs/adr/0001-stack.md` (React Asincrónico con Next.js, Tailwind CSS, GSAP/Motion, Prisma).
- [x] ADR 0002: Modelo de datos relacional para el MVP, esquema de entidades, inmutabilidad de auditoría en `docs/adr/0002-modelo-datos-mvp.md`.
- [x] Matriz técnica de permisos por rol (RBAC endpoint por endpoint).
- [x] Protocolo de tratamiento de datos sensibles (salud laboral y privacidad).
- [x] Plan de pruebas de cálculos normativos (casos dorados de estándares e indicadores) y seguridad.
- [ ] **PUNTO DE CONTROL B:** Esperando aprobación del stack y modelo por parte del usuario.

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
* **D-001 a D-006:** Aprobadas en fases anteriores.
* **D-007:** Adopción del stack **React Asincrónico (Next.js App Router) + TypeScript + Tailwind CSS + GSAP/Motion + Prisma/SQLite-PostgreSQL** documentado en `ADR-0001`.
* **D-008:** Esquema de base de datos relacional con tabla `RegistroAuditoria` de solo inserción (inmutable) y exclusión estructural de cualquier campo de diagnóstico clínico médico.

---

## 4. Supuestos Activos
* **[SUPUESTO-001]:** Las alarmas de pausas activas contarán con temporizador en segundo plano, Web Notifications API y alerta modal emergente con audio opcional.
* **[SUPUESTO-002]:** Almacenamiento local offline en el formulario de incidentes mediante IndexedDB con cola de sincronización asincrónica.
* **[SUPUESTO-003]:** Los estándares mínimos (Res. 0312) se configuran con la tabla de ponderación oficial (25-60-5-10).

---

## 5. Pendientes Inmediatos
* Aprobación del usuario en el **Punto de Control B** para dar inicio a la Fase 4 (Identidad visual y movimiento).
