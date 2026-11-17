---
name: sst-motion-design
description: "Diseña e implementa animaciones y microinteracciones para el frontend del proyecto SST con criterio: scroll storytelling, transiciones de página, SVG animado, contadores, timelines y estados de interfaz, usando CSS nativo, Motion o GSAP, y respetando accesibilidad (prefers-reduced-motion, sin destellos) y rendimiento. Úsala siempre que el usuario pida animaciones, efectos, scroll, parallax, transiciones, hover, 'que se mueva', 'que tenga vida', o mencione GSAP, ScrollTrigger, Framer Motion o Motion, aunque no diga la palabra animación."
---

# Motion design para SST

El movimiento bien usado explica un cambio de estado o guía la atención. Mal usado es ruido, y en un producto de seguridad es peor: una alerta que parpadea sin control puede dañar a quien tiene sensibilidad a destellos, y una animación que oculta contenido hace perder datos críticos. Este skill busca movimiento **memorable, útil y seguro**.

## Principio: una coreografía, no efectos sueltos
- **Presupuesto de movimiento.** Landing o portal: un momento de carga (hero) y como máximo una secuencia de scroll destacada. App operativa: el movimiento solo responde a acciones de la persona (abrir, confirmar, guardar, cambiar de paso).
- Aparecer-subiendo en cada sección y elevar cada tarjeta al pasar el cursor es el valor por defecto de las páginas generadas; evítalo.
- Antes de codificar, completa la **especificación de movimiento** (abajo). Si no puedes decir qué comunica un movimiento, no lo hagas.

## Elegir herramienta
| Necesidad | Herramienta |
|---|---|
| Hover, foco, estados, apertura/cierre simples | CSS (`transition`, `@starting-style`) |
| Scroll ligado a progreso, revelados simples | CSS `animation-timeline: scroll()/view()` si el soporte lo permite; si no, IntersectionObserver. **Verifica soporte actual en caniuse y deja alternativa.** |
| Cambio de página o de vista con continuidad de elementos | View Transitions API (`document.startViewTransition`) con alternativa si no existe |
| React: layout animado, gestos, entrada/salida de componentes | Motion (antes Framer Motion) |
| Timelines complejos, scroll storytelling, SVG, texto dividido, Flip | GSAP (+ ScrollTrigger, SplitText, Flip, DrawSVG). GSAP y sus plugins son gratuitos hoy `[VERIFICAR licencia vigente]` |
| Ilustración animada ya compuesta | Lottie o Rive, cuidando el peso |
| Escena 3D | three.js solo si el concepto lo exige (p. ej. recorrido 3D de una planta); fija presupuesto de rendimiento primero |

Si usas GSAP y el repo tiene instalado el skill oficial `greensock/gsap-skills`, **léelo antes de escribir código GSAP**: conoce la API actual mejor que este documento. Elige una sola librería de movimiento por pantalla; mezclar dos para lo mismo genera conflictos.

## Reglas de oro
1. **Anima `transform` y `opacity`.** No animes `width`, `height`, `top`, `left` ni `margin`. Usa `will-change` solo durante la animación.
2. **Duraciones con sentido**: micro 120–200 ms; cambio de estado 200–350 ms; secuencia de entrada completa 500–900 ms. Easing con intención (salida rápida y suave para elementos que entran). `linear` solo para progreso.
3. **`prefers-reduced-motion: reduce` es obligatorio.** Sustituye el movimiento por un fundido corto o por el estado final inmediato. Nunca dejes contenido oculto esperando una animación.
4. **Contenido primero.** Si el JavaScript falla, todo el contenido es visible. No pongas `opacity: 0` en el CSS base; agrega una clase en `<html>` (por ejemplo `js-anim`) cuando la librería esté lista.
5. **Sin destellos.** Nada parpadea más de 3 veces por segundo (WCAG 2.3.1). Las alertas de peligro o emergencia usan color + icono + texto; si pulsan, ≤ 1 Hz y con opción de pausar. Todo movimiento automático de más de 5 s debe poder pausarse (WCAG 2.2.2).
6. **El movimiento no es la información.** Todo estado debe entenderse sin animación (el contador muestra su valor final en el DOM; la barra de cumplimiento tiene texto con el porcentaje).
7. **Rendimiento.** Prueba con CPU 4× más lenta en DevTools y en un celular de gama media. Si baja de 60 fps, simplifica.
8. **Limpieza.** Mata ScrollTriggers, cancela listeners y usa `useGSAP` con `scope` en React.

## Ideas de movimiento con significado en SST
- **Contador «días sin accidentes»**: cuenta una sola vez al entrar en vista; el valor real queda en el texto accesible.
- **Ciclo PHVA** como anillo que se dibuja al hacer scroll; cada fase se enciende al llegar.
- **Mapa de riesgos o plano**: las capas aparecen por tipo de peligro; al enfocar una zona se resalta y muestra su leyenda.
- **Semáforo de cumplimiento (autoevaluación)**: la barra se llena hasta el porcentaje real y toma el color del rango.
- **Señales que se componen**: las formas geométricas de una señal de seguridad se ensamblan en el hero.
- **Lista de chequeo**: micro-confirmación al marcar un ítem; vibración corta opcional en móvil donde exista `navigator.vibrate`.
- **Formulario por pasos** (reporte de incidente): transición entre pasos con View Transitions o Flip; guardado automático con confirmación discreta.
- **Lista → detalle**: continuidad del elemento compartido.

Evita animar datos sensibles de salud o eventos graves de forma «espectacular»: el tono debe ser sobrio.

## Especificación de movimiento (rellénala antes de codificar)
Guárdala en `docs/diseno/movimiento.md`.

| Momento | Disparador | Qué cambia | Duración y easing | Con reduced-motion | Herramienta |
|---|---|---|---|---|---|
| Carga del hero | Carga de página | Señales se componen | 700 ms, salida | Estado final inmediato | GSAP |
| … | … | … | … | … | … |

## Código de referencia
Fragmentos listos (reduced-motion global, `gsap.matchMedia`, `useGSAP`, contador accesible, anillo SVG, View Transitions): `references/snippets.md`.

## Antes de entregar
Verifica con `sst-verificacion-entrega`: emula `prefers-reduced-motion`, revisa con el teclado, mide con CPU limitada y confirma que ninguna animación oculta contenido ni se repite sin fin sin control de pausa.
