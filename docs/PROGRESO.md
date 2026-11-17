# Estado de Progreso del Proyecto SG-SST

Documento vivo para registrar el avance, decisiones de arquitectura y diseño, supuestos y tareas pendientes a lo largo de las fases de desarrollo.

---

## 1. Estado Actual
* **Fase Actual:** FASE 0 — Preparación (Finalizada) / Pasando a FASE 1 — Requerimientos
* **Fecha de actualización:** 2026-11-17
* **Último Commit:** Inicialización y estructura base del proyecto (Fase 0)

---

## 2. Registro de Fases

### Fase 0 — Preparación
- [x] Copia y verificación de los 7 skills `sst-*` y la regla `sst-proyecto.md` en `.agents/`.
- [x] Inicialización del repositorio Git local (`git init`).
- [x] Creación de la estructura de documentación (`docs/requerimientos/`, `docs/diseno/`, `docs/adr/`).
- [x] Creación de `docs/PROGRESO.md`.
- [x] Propuesta y análisis de 4 skills externos complementarios (esperando aprobación del usuario para instalación).

### Fase 1 — Requerimientos
- [ ] Ronda 1 de preguntas de descubrimiento (país, operador, datos de salud, contexto de uso, módulos MVP).
- [ ] Borradores en `docs/requerimientos/` (visión, actores y permisos, épicas, opciones de MVP, historias con criterios Given/When/Then, RNF).
- [ ] **Punto de Control A:** Resumen "lo que entendí / lo que asumí / lo que necesito decidir" y aprobación del MVP.

### Fase 2 — Norma y Trazabilidad
- [ ] Verificación en fuentes oficiales de la normativa colombiana aplicable (SG-SST).
- [ ] Trazabilidad completa en `docs/requerimientos/04-trazabilidad.md` (norma → requerimiento → historia → prueba).
- [ ] Identificación de elementos pendientes para validación con profesional SST con licencia.

### Fase 3 — Arquitectura
- [ ] Opciones de stack técnico (portal público + app autenticada, frontend animado).
- [ ] ADR en `docs/adr/0001-stack.md`.
- [ ] Modelo de datos MVP, matriz RBAC, tratamiento de datos sensibles y plan de pruebas.
- [ ] **Punto de Control B:** Aprobación de stack y modelo.

### Fase 4 — Identidad Visual
- [ ] Brief mínimo y 3 direcciones visuales diferenciadas con momentos animados memorables.
- [ ] **Punto de Control C:** Elección/combinación de dirección visual.
- [ ] Tokens de diseño, especificación de movimiento (`docs/diseno/movimiento.md`) y registro en `docs/diseno/direccion.md`.

### Fase 5 — Construcción por Incrementos
- [ ] Incremento 1: Scaffolding, tokens, layout base, auth y auditoría.
- [ ] Incremento 2: Landing/portal público con momento animado memorable.
- [ ] Incremento 3+: Módulos del MVP (historia → datos/permisos → UI accesible → pruebas → verificación).

### Fase 6 — Cierre
- [ ] Verificación integral con `sst-verificacion-entrega` (responsive 375/768/1280/1920, accesibilidad, tests).
- [ ] README principal y reporte final de entrega.

---

## 3. Decisiones Tomadas
* **D-001:** Se utilizará la estructura recomendada por Antigravity en `.agents/` para asegurar portabilidad en el repositorio.
* **D-002:** Se asume Colombia como país y marco normativo (Decreto 1072 de 2015, Resolución 0312 de 2019) sujeto a confirmación con el usuario [SUPUESTO].

---

## 4. Supuestos Activos
* **[SUPUESTO-001]:** Marco normativo primario: Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST) de Colombia.
* **[SUPUESTO-002]:** Los datos de demostración o prueba serán 100% ficticios y rotulados explícitamente como "dato de ejemplo".

---

## 5. Pendientes y Bloqueos Inmediatos
* Aprobación del usuario para instalar (o descartar) los skills externos propuestos.
* Respuestas a la Ronda 1 de preguntas de descubrimiento (Fase 1).
