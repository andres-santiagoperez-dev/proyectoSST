# Estado de Progreso del Proyecto SG-SST

Documento vivo para registrar el avance, decisiones de arquitectura y diseño, supuestos y tareas pendientes a lo largo de las fases de desarrollo.

---

## 1. Estado Actual
* **Fase Actual:** FASE 5 — Construcción por Incrementos (Incremento 1 Completado -> Iniciando Incremento 2)
* **Fecha de actualización:** 2026-11-18
* **Último Commit:** `feat(fase-5-inc-1): scaffolding nextjs, tokens, layout base, rbac y auditoria`

---

## 2. Registro de Fases

### Fase 0 a Fase 4 (Completadas y Aprobadas)
- [x] Fase 0: Preparación del entorno, 7 skills y regla del proyecto.
- [x] Fase 1: Requerimientos, historias `HU-001` a `HU-006` y MVP (Punto de Control A).
- [x] Fase 2: Verificación normativa oficial (Res. 1843/2025, Res. 0312/2019, Res. 1401/2007).
- [x] Fase 3: Arquitectura, ADR 0001, ADR 0002, RBAC y plan de pruebas (Punto de Control B).
- [x] Fase 4: Identidad visual tripartita con mockups y especificación de movimiento (Punto de Control C).

### Fase 5 — Construcción por Incrementos
- [x] **Incremento 1:** Scaffolding Next.js 14 + React 18 con TypeScript y Tailwind CSS, importación de tokens de diseño, fuentes especializadas, layout base (`Navbar` con temporizador global y selector de roles, `Footer` normativo), contexto de autenticación RBAC (`src/lib/auth-context.tsx`), módulo de auditoría inmutable (`src/lib/audit.ts`) y datos semilla ficticios (`src/lib/data-mock.ts`). Compilación verificada con éxito (`npm run build`).
- [ ] **Incremento 2:** Portal público institucional (Dirección 3: Blueprint Isométrico) en `/` con plano interactivo en capas, rutas de evacuación, zonas de pausas, política de SST y momento animado con GSAP (respetando `prefers-reduced-motion` y sin destellos).
- [ ] **Incremento 3:** Módulo de Pausas Activas "Pausa Vital" (Dirección 2: Ergonomía) en `/pausas-activas` con orbe biomecánico de respiración 4-4-4, temporizador circular, catálogo animado de ejercicios y registro de participación para indicadores.
- [ ] **Incremento 4:** Formulario ágil de Reporte de Incidentes y Condiciones en Campo en `/reporte-campo` (< 60 seg, offline-first con IndexedDB y sincronización asincrónica).
- [ ] **Incremento 5:** Consola de Administración SG-SST (Dirección 1: Demarcación Andon) en `/admin-dashboard` con semáforo interactivo Res. 0312, indicadores de siniestralidad, gestión de certificados de aptitud médica (Res. 1843/2025) y plan de acción.

### Fase 6 — Cierre (Pendiente)
- [ ] Verificación integral con `sst-verificacion-entrega`.
- [ ] README principal e informe de entrega.
