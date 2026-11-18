# Especificación de Movimiento e Interacción — SafePulse SST

**Documento:** `docs/diseno/movimiento.md`  
**Versión:** 1.0  
**Fecha:** 2026-11-18  
**Basado en:** [sst-motion-design/SKILL.md](file:///c:/Users/ANDRES/Desktop/proyectoSST/.agents/skills/sst-motion-design/SKILL.md)  
**Herramientas aprobadas:** GSAP 3 (ScrollTrigger, Flip), Motion for React, CSS Transforms.

---

## 1. Principios de Movimiento y Presupuesto por Ámbito

El movimiento en SafePulse SST está coreografiado con propósito biomecánico y funcional; **nunca es mero adorno cosmético**.

1. **Presupuesto estricto por pantalla:**
   * **Portal Público (Blueprint):** Un momento memorable de entrada (despliegue de plano isométrico) y scroll con encendido sutil de capas operativas.
   * **Módulo de Pausas Activas (Ergonomía):** Respiración rítmica relajante (inhalar/exhalar) y cuenta regresiva fluida de descansos sin sobresaltos.
   * **Portal del Administrador (Industrial):** Entrada sobria tipo tablero Andon (conteo de días seguros) y respuesta inmediata a clicks/filtros (< 150 ms).
2. **Propiedades animadas:** Estrictamente restringido a `transform` (`translate`, `scale`, `rotate`) y `opacity`. Cero animación de dimensiones (`width`/`height`) para garantizar 60 fps constantes.
3. **Regla de oro de accesibilidad:** Toda animación respeta `prefers-reduced-motion: reduce`, eliminando desplazamientos y mostrando el estado final de inmediato o mediante un desvanecimiento suave de 100 ms.
4. **Sin destellos (WCAG 2.3.1):** Ningún elemento parpadea a más de 1 Hz. Las alertas de emergencia o peligro usan color fijo + icono + texto, sin parpadeos estroboscópicos.

---

## 2. Los Tres Momentos Memorables

### Momento 1: El Despliegue Cartográfico del Plano Isométrico (Portal Público)
* **Disparador:** Carga inicial del portal o scroll hacia la sección de infraestructura de la empresa.
* **Coreografía:**
  1. La retícula milimétrica blueprint se revela con un desvanecimiento suave (300 ms).
  2. Las líneas maestras vectoriales de las instalaciones se dibujan con `stroke-dashoffset` en 600 ms.
  3. Los selectores de capas ("Rutas de Evacuación", "Zonas de Pausa Activa", "Puntos de Emergencia") iluminan sus respectivos trazados con un resplandor sutil (250 ms).
* **Alternativa reducida:** El plano aparece completamente dibujado con sus capas activas de forma estática instantánea.

### Momento 2: El Orbe Biomecánico de Pausa Vital (Módulo de Pausas Activas)
* **Disparador:** Apertura de la alarma de pausa activa en pantalla.
* **Coreografía:**
  1. El orbe central se expande suavemente en 4 segundos (*Inhala*), mantiene durante 4 segundos (*Sostén*), y se contrae a su escala base en 4 segundos (*Exhala*).
  2. Un aro perimetral SVG traza el progreso total de la rutina de 3 a 5 minutos.
  3. Al cambiar de ejercicio (de descanso ocular 20-20-20 a cuello o muñecas), la ilustración del ejercicio realiza una transición horizontal con resorte amortiguado (`ease-out-suave`).
* **Alternativa reducida:** El orbe permanece estático con texto explicativo del ejercicio actual y contador numérico accesible sin pulsaciones continuas.

### Momento 3: El Encendido del Tablero Andon y Métricas 0312 (Portal Administrador)
* **Disparador:** Ingreso al panel administrativo del Responsable SG-SST.
* **Coreografía:**
  1. El indicador "DÍAS SEGUROS" realiza una rotación de dígitos numéricos en cascada (400 ms) hasta fijarse en la cifra real (ej. `342`).
  2. La barra de progreso de la Resolución 0312 de 2019 se llena con aceleración suave hasta el porcentaje ponderado exacto y toma el color correspondiente (Verde >85 %, Amarillo 60-85 %, Rojo <60 %).
* **Alternativa reducida:** Las cifras y barras aparecen en su valor final exacto sin conteo progresivo.

---

## 3. Matriz de Especificación de Movimiento

| Componente | Disparador | Propiedad que cambia | Duración / Easing | Modo con Reduced Motion | Herramienta |
|---|---|---|---|---|---|
| **Plano Isométrico** | Carga de sección en viewport | `stroke-dashoffset`, `opacity` | 650 ms / `ease-out-suave` | Renderizado estático inmediato | GSAP (SVG) |
| **Capas del Plano** | Clic en selector de capa | `opacity`, `transform: scale` | 220 ms / `ease-in-out` | Cambio instantáneo de visibilidad | CSS Transitions |
| **Orbe de Pausa Activa** | Activo durante la sesión | `transform: scale(1.0 -> 1.15)` | Ciclo 4s / 4s / 4s continuo | Escala fija (1.0), sin animación | CSS `@keyframes` / GSAP |
| **Tarjeta de Ejercicio** | Clic en "Siguiente postura" | `transform: translateX`, `opacity` | 260 ms / `ease-out-suave` | Reemplazo directo sin desplazamiento | Motion for React |
| **Alarma Modal Emergente** | Temporizador a cero | `opacity`, `transform: translateY(12px -> 0)` | 200 ms / `ease-resorte` | Aparición directa centrada | Motion for React |
| **Contador Andon** | Carga del Dashboard | Texto numérico interpolado | 500 ms / `ease-out-suave` | Valor final inmediato en el DOM | GSAP Counter |
| **Barra Estándares 0312** | Calificación de estándar | `transform: scaleX(0 -> porcentaje)` | 350 ms / `ease-out-suave` | Anchura estática inmediata | CSS Transition |
| **Botón de Reporte en Campo**| Toque o clic (`:active`) | `transform: scale(0.97)` | 100 ms / `ease-in-out` | Cambio sutil de color de fondo | CSS `:active` |

---

## 4. Fragmento de Implementación Base (GSAP + Reduced Motion)

```typescript
import gsap from 'gsap';

// Función utilitaria para registrar animaciones seguras
export function ejecutarAnimacionSegura(elemento: HTMLElement, callbackAnimacion: () => gsap.core.Timeline) {
  const prefiereMovimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefiereMovimientoReducido) {
    // Establecer estado final directo sin animación
    gsap.set(elemento, { opacity: 1, scale: 1, x: 0, y: 0 });
    return null;
  }
  
  return callbackAnimacion();
}
```
