# Estado de Progreso del Proyecto SG-SST (SafePulse SST Suite)

Documento vivo para registrar el avance, decisiones de arquitectura y diseño, supuestos y tareas pendientes a lo largo de las fases de desarrollo.

---

## 1. Estado Actual
* **Fase Actual:** FASE 6 — Cierre y Verificación de Entrega (`sst-verificacion-entrega`)
* **Fecha de actualización:** 2026-11-18
* **Arquitectura de Solución:** Suite monorepo con 3 aplicativos web independientes, cada uno en su propio puerto y con su propia identidad visual:
  1. `apps/portal-empresa` (Puerto 3020) — Dirección 3: Blueprint Cartográfico Isométrico (Público).
  2. `apps/pausas-vitales` (Puerto 3021) — Dirección 2: Ergonomía Vital / El Pulso Humano (Trabajadores).
  3. `apps/admin-sgsst` (Puerto 3022) — Dirección 1: Demarcación Industrial / Tablero Andon (Líder SST / Admin).

---

## 2. Registro de Fases

### Fase 0 a Fase 4 (Completadas y Aprobadas)
- [x] **Fase 0:** Preparación del entorno, 7 skills en `.agents/` y regla del proyecto `sst-proyecto.md`. Commit `8c7b642`.
- [x] **Fase 1:** Requerimientos, historias `HU-001` a `HU-006` y MVP (Punto de Control A). Commit `d9ff521`.
- [x] **Fase 2:** Verificación normativa oficial en fuentes gubernamentales (Res. 1843/2025, Res. 0312/2019, Res. 1401/2007). Commit `dcd3ebf`.
- [x] **Fase 3:** Arquitectura, ADR 0001, ADR 0002, RBAC y plan de pruebas (Punto de Control B). Commit `0861b50`.
- [x] **Fase 4:** Identidad visual tripartita con 3 maquetas hiperrealistas (`docs/diseno/referencias/`) y especificación de tokens y movimiento (Punto de Control C). Commit `2b6aa20`.

### Fase 5 — Construcción por Incrementos (Completada)
- [x] **Reorganización a 3 Aplicativos Independientes (Monorepo Workspace):**
  - Se configuró la raíz como orquestador de paquetes `npm workspaces` (`apps/*`).
  - **Aplicativo 1 (`apps/portal-empresa` - Puerto 3020):**
    - Dirección 3: Blueprint Isométrico en cian cianuro y azul técnico (#00E5FF / #002244).
    - Plano arquitectónico interactivo SVG isométrico en capas (Rutas de evacuación, Estaciones de pausa activa, Equipos de emergencia/extintores) con selector interactivo y popups técnicos.
    - Política de SST firmada digitalmente con hash SHA-256 (`e3b0c442...`) y fecha de actualización.
    - Estructura organizacional interactiva: COPASST (Resolución 2013/1986), Comité de Convivencia Laboral (Ley 1010/2006) y Brigada de Emergencias.
    - Compilación estática Next.js 14 verificada (Code 0).
  - **Aplicativo 2 (`apps/pausas-vitales` - Puerto 3021):**
    - Dirección 2: Ergonomía Vital / El Pulso Humano (#0D7377, #F48C42, #14213D).
    - Orbe biomecánico animado con ciclo de respiración cuadrada 4-4-4 (Inhalar, Sostener, Exhalar).
    - Temporizador circular de cuenta regresiva (5 a 15 min de pausa recomendada por Ley 1355/2009).
    - Alarma sonora con sintetizador Web Audio API (acordes armónicos pentatónicos, sin estridencias) y notificaciones de escritorio Web Notifications API.
    - Catálogo interactivo de ejercicios posturales (cuello, túnel carpiano, espalda lumbar, fatiga ocular).
    - Registro de cumplimiento diario de pausas con telemetría de pausas activas.
    - Compilación estática Next.js 14 verificada (Code 0).
  - **Aplicativo 3 (`apps/admin-sgsst` - Puerto 3022):**
    - Dirección 1: Demarcación Industrial / Tablero Andon (#F59E0B, #10B981, #EF4444, #111827).
    - Telemetría en tiempo real: Marcador de días sin accidentes (342 días), Índices de Frecuencia (IF) y Severidad (IS) calculados según NTC 3701.
    - Autoevaluación interactiva de Estándares Mínimos (Resolución 0312 de 2019) con semáforo dinámico ponderado (Planear 25%, Hacer 60%, Verificar 5%, Actuar 10%).
    - Módulo de Reporte Ágil de Incidentes y Condiciones (< 60 s) con almacenamiento offline IndexedDB/LocalStorage y cola de sincronización.
    - Módulo de Exámenes Médicos Ocupacionales estricto según Resolución 1843 de abril 2025: gestión exclusiva de conceptos de aptitud (*Apto, Apto con restricciones, No apto*) y recomendaciones operativas, con aislamiento total y prohibición de ingreso de diagnósticos CIE-10 o historia clínica.
    - Matriz de Planes de Acción con responsable, fecha límite e indicador de cumplimiento.
    - Registro de Auditoría Inmutable (Append-only) con hash encadenado SHA-256 para trazabilidad legal.
    - Compilación estática Next.js 14 verificada (Code 0).
- [x] **Compilación integral monorepo:** `npm run build` ejecutado en todas las aplicaciones en simultáneo, salida Code 0.

### Fase 6 — Cierre y Verificación (En curso)
- [ ] Verificación exhaustiva de calidad de entrega con `sst-verificacion-entrega`.
- [ ] Creación de `README.md` maestro de la suite con instrucciones claras de ejecución simultánea e individual.
- [ ] Informe formal de entrega en español de Colombia.
