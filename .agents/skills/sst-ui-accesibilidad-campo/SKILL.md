---
name: sst-ui-accesibilidad-campo
description: "Reglas de UX y accesibilidad para interfaces SST usadas en campo y en oficina: contraste, objetivos táctiles, colores de seguridad con redundancia, formularios de inspección y reporte, modo offline (PWA), uso con guantes o bajo el sol, WCAG 2.2 AA, tableros de indicadores, impresión y español de Colombia. Úsala siempre que se diseñen o implementen formularios, listas de chequeo, reportes de incidentes, tableros, vistas móviles o formatos imprimibles del proyecto SST, o cuando el usuario mencione accesibilidad, responsive, móvil, offline, PWA o usabilidad."
---

# UI y accesibilidad para SST en campo

Una app de SST falla si el trabajador no puede reportar un incidente porque la pantalla no se ve al sol, los botones son diminutos para unos guantes o se pierde el reporte por falta de señal. La belleza (ver `sst-direccion-creativa`) se construye **sobre** estas reglas, no en lugar de ellas.

## 1. Contextos de uso: decide cuál manda
| Contexto | Implicaciones |
|---|---|
| Oficina (responsable SG-SST, gerencia) | Densidad alta, tablas, filtros, exportaciones, teclado y mouse |
| Celular en planta u obra | Una tarea por pantalla, objetivos grandes, contraste alto, conexión intermitente |
| Tablet con guantes | Objetivos ≥ 56 px, sin gestos finos, sin arrastrar |
| Pantalla de capacitación o proyector | Texto grande, poco contenido por vista, contraste alto |
| Papel impreso (actas, listas, permisos) | Hoja de estilos de impresión, folio, fecha y firma |

Declara en el brief qué contexto manda en cada pantalla. Si dos chocan, gana el de campo.

## 2. Línea base: WCAG 2.2 nivel AA
- Contraste de texto ≥ 4.5:1 (≥ 3:1 si es grande); componentes de interfaz y gráficos ≥ 3:1.
- Foco siempre visible y no tapado por barras fijas (2.4.7, 2.4.11).
- Objetivo táctil mínimo 24×24 px (2.5.8). **Para campo usa 48–56 px** y separación suficiente.
- No dependas del color: color + icono + texto (1.4.1).
- Reflow a 320 px de ancho y zoom de texto al 200 % sin perder contenido (1.4.4, 1.4.10).
- Etiquetas visibles en cada campo; errores identificados con texto y sugerencia de corrección (3.3.1–3.3.3); no pedir dos veces el mismo dato en un flujo (3.3.7).
- Alternativas al arrastrar (2.5.7) y autenticación sin pruebas cognitivas (3.3.8).
- Mensajes de estado anunciados a lectores de pantalla (`role="status"`, 4.1.3).
- `lang="es-CO"` en `<html>`; fragmentos en otro idioma con su `lang`.
- Movimiento: ver `sst-motion-design` (sin destellos, pausable, `prefers-reduced-motion`).

## 3. Colores de seguridad con redundancia
- Cada señal usa **color + forma + icono + texto**. Nunca rojo/verde como única pista (daltonismo).
- El amarillo de advertencia no tiene contraste suficiente con texto claro: usa **texto oscuro sobre amarillo** (como las señales reales) y borde.
- Los colores de señal son tokens separados de la marca (`--senal-*`). Verifica el contraste de cada pareja texto/fondo.
- Estados de cumplimiento (crítico / moderadamente aceptable / aceptable) se muestran con etiqueta escrita además del color.

## 4. Formularios de inspección y reporte
- **Móvil: una tarea por pantalla**, progreso visible («Paso 2 de 4»).
- Tipo de teclado correcto (`inputmode`, `autocomplete`); fecha y hora por defecto «ahora» y editables.
- Preferir controles segmentados, listas con búsqueda y botones grandes sobre `select` nativos largos.
- **Autoguardado de borradores** y confirmación clara del estado: *Guardado en el dispositivo · Pendiente de sincronizar · Enviado*.
- Fotografía de evidencia con compresión en el cliente; firma en pantalla cuando el formato la exija.
- Geolocalización solo con consentimiento y para un fin declarado.
- Validación en línea sin castigar: no bloquear el envío de un **reporte de emergencia o de incidente** por un campo opcional. Reportar rápido vale más que reportar perfecto; la depuración se hace después.
- Listas de chequeo: ítem con tres estados (cumple / no cumple / no aplica), hallazgo con foto y acción asignable.

## 5. Offline primero (donde importe)
Prioriza offline para: inspecciones, reporte de incidentes, listas de asistencia y consulta de planes de emergencia.
- Service worker para el shell; IndexedDB para la cola de cambios; sincronización al volver la conexión.
- Estados visibles: sin conexión, sincronizando, conflicto. Resolución de conflictos explícita (nunca perder datos en silencio).
- Datos sensibles guardados en el dispositivo: mínimo necesario, con caducidad; ver `sst-arquitectura-app`.
- Muestra siempre el estado de conexión en un lugar estable.

## 6. Datos de salud en pantalla
- Los listados **no muestran diagnósticos**; muestran estado (apto / apto con restricciones / pendiente) cuando el rol tiene derecho a verlo.
- Vistas distintas por rol; el responsable del SG-SST no ve lo mismo que el médico ocupacional ni lo mismo que la gerencia.
- Enmascara por defecto identificaciones y datos personales en tablas y capturas de pantalla.

## 7. Tableros e indicadores
- Cada indicador muestra su **definición** (fórmula, periodo, fuente) a un clic.
- Ejes que no engañan (sin truncar barras); paletas aptas para daltonismo; **tabla alternativa** para cada gráfico.
- Distingue dato real de dato de ejemplo; en desarrollo, marca los de ejemplo con una insignia visible.
- Muestra la fecha y hora del último cálculo.

## 8. Impresión y exportación
- `@media print` para actas, permisos de trabajo, listas de chequeo y certificados: folio, fecha, responsable y espacio de firma.
- Tamaño de papel configurable (carta u oficio).
- Exportar a PDF y Excel lo que el responsable del SG-SST deba presentar a auditorías o a la ARL.

## 9. Lenguaje
Español de Colombia, directo y sin jerga innecesaria. Un error dice qué pasó y cómo corregirlo. No culpabilices al trabajador. Mismo nombre para la misma acción en toda la app. Glosario en `sst-dominio-sg-sst`.

## 10. Cómo comprobarlo
Teclado solo · zoom al 200 % · 320 px de ancho · contraste (herramienta de DevTools) · simulación de daltonismo · `prefers-reduced-motion` emulado · modo sin conexión en DevTools · CPU limitada · axe o Lighthouse · lector de pantalla (NVDA, VoiceOver o TalkBack) en el flujo principal. El procedimiento completo está en `sst-verificacion-entrega`.
