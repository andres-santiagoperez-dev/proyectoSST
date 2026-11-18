# Estado de Progreso del Proyecto SG-SST

Documento vivo para registrar el avance, decisiones de arquitectura y diseño, supuestos y tareas pendientes a lo largo de las fases de desarrollo.

---

## 1. Estado Actual
* **Fase Actual:** FASE 1 — Requerimientos (Borradores generados -> En PUNTO DE CONTROL A)
* **Fecha de actualización:** 2026-11-17
* **Último Commit:** `chore(fase-0): inicializacion de estructura base, regla y skills sst` (hash: `8c7b642`)

---

## 2. Registro de Fases

### Fase 0 — Preparación
- [x] Copia y verificación de los 7 skills `sst-*` y la regla `sst-proyecto.md` en `.agents/`.
- [x] Inicialización del repositorio Git local (`git init`).
- [x] Creación de la estructura de documentación (`docs/requerimientos/`, `docs/diseno/`, `docs/adr/`).
- [x] Creación de `docs/PROGRESO.md`.
- [x] Propuesta y análisis de 4 skills externos complementarios (esperando aprobación del usuario para instalación).
- [x] Commit de Fase 0 realizado.

### Fase 1 — Requerimientos
- [x] Ronda 1 de preguntas de descubrimiento completada.
- [x] Elaboración de `docs/requerimientos/00-vision.md`.
- [x] Elaboración de `docs/requerimientos/01-actores-roles.md` (RBAC y confidencialidad Res. 2346).
- [x] Elaboración de `docs/requerimientos/02-epicas.md` (3 opciones de MVP, seleccionada Opción B).
- [x] Elaboración de historias de usuario del MVP (`HU-001` a `HU-006`) con criterios Dado/Cuando/Entonces.
- [x] Elaboración de `docs/requerimientos/03-rnf.md` con metas medibles `[PROPUESTO]`.
- [x] Registro de preguntas y supuestos en `docs/requerimientos/05-preguntas-abiertas.md`.
- [ ] **PUNTO DE CONTROL A:** Esperando aprobación del MVP y resolución de decisiones clave por parte del usuario.

### Fase 2 — Norma y Trazabilidad (Pendiente)
- [ ] Verificación en fuentes oficiales de la normativa colombiana aplicable (SG-SST).
- [ ] Trazabilidad completa en `docs/requerimientos/04-trazabilidad.md` (norma → requerimiento → historia → prueba).
- [ ] Identificación de elementos pendientes para validación con profesional SST con licencia.

### Fase 3 — Arquitectura (Pendiente)
- [ ] Opciones de stack técnico (portal público + app autenticada, frontend animado).
- [ ] ADR en `docs/adr/0001-stack.md`.
- [ ] Modelo de datos MVP, matriz RBAC, tratamiento de datos sensibles y plan de pruebas.
- [ ] **Punto de Control B:** Aprobación de stack y modelo.

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
* **D-001:** Se utilizará la estructura recomendada por Antigravity en `.agents/` para asegurar portabilidad en el repositorio.
* **D-002:** Confirmado país: Colombia. Marco legal: Decreto 1072 de 2015, Resolución 0312 de 2019, Resolución 1401 de 2007, Resolución 2346 de 2007 y Ley 1355 de 2009.
* **D-003:** Operador del aplicativo: Una sola empresa particular para sus colaboradores directos y contratistas.
* **D-004:** Privacidad médica estricta: Solo conceptos de aptitud laboral y recomendaciones ergonómicas. Cero diagnósticos CIE-10 ni historias clínicas.
* **D-005:** Requerimiento estrella del cliente: Sistema de alarmas programables en pantalla con guías interactivas y animadas para pausas activas.
* **D-006:** Selección de la Opción B de MVP ("Experiencia Preventiva y Cumplimiento").

---

## 4. Supuestos Activos
* **[SUPUESTO-001]:** Las alarmas de pausas activas funcionarán con notificación de navegador (Web Notifications API), modal visual emergente y sonido opcional.
* **[SUPUESTO-002]:** El reporte de incidentes en campo utilizará almacenamiento local (IndexedDB/localStorage) para permitir captura sin señal y sincronización posterior.
* **[SUPUESTO-003]:** Los estándares mínimos (Res. 0312) se presentarán con selector configurable según tamaño y riesgo de la empresa.

---

## 5. Pendientes Inmediatos
* Aprobación del MVP en el **Punto de Control A**.
* Decisión sobre la instalación de los skills externos analizados (`greensock/gsap-skills`, `vercel-labs/agent-skills`, `johnpolacek/animaxxing-skills`).
