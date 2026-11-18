# Preguntas Abiertas, Supuestos y Riesgos — SafePulse SST

Versión: 1.0 · Fecha: 2026-11-17

---

## 1. Preguntas Abiertas

| ID | Pregunta | Quién decide | Impacto si no se resuelve | Estado |
|---|---|---|---|---|
| **PA-001** | ¿Cuál es el tamaño (número de trabajadores) y clase de riesgo (I a V) de la empresa para la autoevaluación Res. 0312? | Cliente / Responsable SST | Determina si aplican 7, 21 o 60 estándares mínimos. Se asume selector configurable en el MVP. | Abierta `[SUPUESTO]` |
| **PA-002** | ¿Se desea que las alarmas de pausas activas incluyan sonido/audio además del banner visual y la notificación de navegador? | Cliente | Define la inclusión de síntesis de audio o chime suave respetando preferencias del usuario. | Abierta `[SUPUESTO]` |
| **PA-003** | ¿Se aprueba la instalación en terminal de los skills externos analizados (`greensock/gsap-skills`, `vercel-labs/agent-skills`, `johnpolacek/animaxxing-skills`)? | Usuario / Desarrollador | Determina si se usan skills externos adicionales o se trabaja 100% con los 7 skills nativos del kit. | Abierta |

---

## 2. Supuestos Activos en Requerimientos

* `[SUPUESTO-REQ-001]`: Marco normativo 100% colombiano (Decreto 1072/2015, Resolución 0312/2019, Resolución 1401/2007, Resolución 2346/2007 y Ley 1355/2009).
* `[SUPUESTO-REQ-002]`: El módulo de pausas activas contará con un selector de periodicidad (ej. cada 60, 90 o 120 minutos) y un catálogo animado de al menos 4 ejercicios clave (pausa visual, estiramiento cervical, estiramiento de muñecas/túnel carpiano y movilidad lumbar).
* `[SUPUESTO-REQ-003]`: El portal corporativo público cumple una doble función: exhibe la identidad de seguridad, política y compromisos de la empresa hacia afuera, y sirve de punto de entrada amable para los colaboradores hacia las herramientas del SG-SST.
* `[SUPUESTO-REQ-004]`: Los estándares mínimos se mostrarán con una escala ponderada interactiva basada en el ciclo PHVA según la Resolución 0312 de 2019.

---

## 3. Matriz de Riesgos Inicial

| Riesgo | Probabilidad | Impacto | Estrategia de Mitigación |
|---|:---:|:---:|---|
| Bloqueo o descarte de notificaciones del navegador por parte del usuario | Media | Media | Alarma visual modal en la interfaz con animación sutil no invasiva y barra de progreso de tiempo restante en pantalla. |
| Fuga involuntaria de diagnósticos médicos reservados | Baja | Crítica | Restricción arquitectónica a nivel de esquema de base de datos: solo campos cerrados de concepto de aptitud y recomendaciones ergonómicas. |
| Reportes de incidentes no enviados por caídas de internet en campo | Alta | Alta | Arquitectura offline-first en el formulario móvil con persistencia local y sincronización automática en segundo plano. |
