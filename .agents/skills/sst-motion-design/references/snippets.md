# Fragmentos de movimiento

Contenido: 1. Reduced-motion global · 2. GSAP con matchMedia · 3. GSAP en React · 4. Contador accesible · 5. Anillo SVG que se dibuja · 6. View Transitions con alternativa · 7. Entrada progresiva sin ocultar contenido

> Son puntos de partida. Si el repo tiene `greensock/gsap-skills` instalado, prevalece su API sobre estos fragmentos.

## 1. Reduced-motion global (red de seguridad)
No sustituye el diseño de una alternativa por componente; es la última línea de defensa.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 2. GSAP con matchMedia
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add(
  {
    conMovimiento: "(prefers-reduced-motion: no-preference)",
    reducido: "(prefers-reduced-motion: reduce)",
  },
  (ctx) => {
    const { conMovimiento } = ctx.conditions;

    if (conMovimiento) {
      gsap.from(".hero-senal", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.08,
      });
    }
    // Con reducido: el contenido ya está visible, no se anima nada.
  }
);
// mm.revert() al desmontar
```

## 3. GSAP en React
```jsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const raiz = useRef(null);

  useGSAP(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducido) return;
    gsap.from(".item", { opacity: 0, y: 24, duration: 0.6, stagger: 0.06 });
  }, { scope: raiz });

  return <section ref={raiz}>{/* … */}</section>;
}
```

## 4. Contador accesible
El valor real vive en el texto accesible; el número animado es solo visual.

```html
<p class="contador" aria-label="152 días sin accidentes con incapacidad">
  <span class="contador__valor" aria-hidden="true" data-hasta="152">152</span>
  <span aria-hidden="true">días sin accidentes con incapacidad</span>
</p>
```
```js
function contar(el, hasta, ms = 1200) {
  const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = (n) => n.toLocaleString("es-CO");
  if (reducido) { el.textContent = fmt(hasta); return; }
  const inicio = performance.now();
  const paso = (t) => {
    const p = Math.min((t - inicio) / ms, 1);
    const suave = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(Math.round(hasta * suave));
    if (p < 1) requestAnimationFrame(paso);
  };
  requestAnimationFrame(paso);
}

const io = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    contar(el, Number(el.dataset.hasta));
    io.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll(".contador__valor").forEach((el) => io.observe(el));
```
> Los 152 días son datos de ejemplo. En producción el valor sale del dato real y se documenta cómo se calcula.

## 5. Anillo SVG que se dibuja (p. ej. ciclo PHVA)
```html
<svg viewBox="0 0 100 100" role="img" aria-label="Ciclo PHVA: planear, hacer, verificar, actuar">
  <circle class="anillo" cx="50" cy="50" r="44" pathLength="1" fill="none" stroke="currentColor" stroke-width="3"/>
</svg>
```
```css
.anillo { stroke-dasharray: 1; stroke-dashoffset: 1; }
.anillo.es-visible {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1.2s var(--ease-salida, cubic-bezier(.2,.7,.2,1));
}
@media (prefers-reduced-motion: reduce) {
  .anillo { stroke-dashoffset: 0; transition: none; }
}
```
Agrega `es-visible` con IntersectionObserver cuando el anillo entre en pantalla.

## 6. View Transitions con alternativa
```js
function navegar(actualizarDOM) {
  const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reducido) return actualizarDOM();
  document.startViewTransition(actualizarDOM);
}
```
Para continuidad de un elemento entre lista y detalle, asigna el mismo `view-transition-name` único a ambos (uno por elemento, nunca repetido en la misma vista).

## 7. Entrada progresiva sin ocultar contenido
```html
<html lang="es-CO">
```
```css
/* Solo se oculta cuando JS ya confirmó que va a animar */
.js-anim .revelar { opacity: 0; transform: translateY(16px); }
.js-anim .revelar.es-visible {
  opacity: 1; transform: none;
  transition: opacity var(--mov-estado, 280ms), transform var(--mov-estado, 280ms) var(--ease-salida, ease-out);
}
@media (prefers-reduced-motion: reduce) {
  .js-anim .revelar { opacity: 1; transform: none; transition: none; }
}
```
```js
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("js-anim");
}
```
