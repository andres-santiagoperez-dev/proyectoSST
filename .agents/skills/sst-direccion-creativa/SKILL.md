---
name: sst-direccion-creativa
description: "Define la dirección visual de interfaces web para proyectos de Seguridad y Salud en el Trabajo (SST, SG-SST, STT): paleta, tipografía, layout, composición y tono, evitando la estética genérica de plantilla corporativa. Úsala siempre que el usuario pida diseñar, rediseñar o maquetar una página, landing, portal, dashboard o componente visual del proyecto SST, aunque solo diga 'hazlo bonito', 'que se vea único' o 'dame el look'. Úsala ANTES de escribir CSS o JSX de una pantalla nueva."
---

# Dirección creativa para SST

Los productos de SST tienden a parecerse: azul corporativo, escudo, casco de stock, tarjetas idénticas con íconos de línea. Eso comunica «cumplimiento de papel», no cuidado por las personas. Este skill empuja hacia una identidad con punto de vista propio, sacada del mundo real de la seguridad en el trabajo.

## Cuándo usarlo
- Pantalla, página o componente nuevo, o rediseño de uno existente.
- No lo uses para lógica sin interfaz (ver `sst-arquitectura-app`) ni para retoques de texto.

## Paso 0 — Brief mínimo
Antes de diseñar, deja por escrito (propón tú una versión y pide confirmación si falta algo):
1. **Quién usa la pantalla**: trabajador de campo, responsable del SG-SST, gerencia, COPASST/Vigía, auditor o ARL.
2. **Trabajo principal** de esa pantalla (una frase).
3. **Dónde y cómo se usa**: oficina con monitor, celular en planta bajo el sol, tablet con guantes, proyector en capacitación, papel impreso.
4. **Sector del cliente**: construcción, manufactura, salud, agro, minería, oficinas, logística…
5. **Restricciones de marca** existentes (logo, colores, tipografía obligatoria).

El contexto de uso cambia el diseño tanto como el sector. Una pantalla para el sol y los guantes no se diseña como una landing.

## Paso 1 — Vocabulario visual del dominio
La identidad única sale del material real del oficio. Elige **una** idea dominante y deja que las demás apoyen o se descarten:

- **Señalización**: colores de seguridad (prohibición/emergencia, advertencia, obligación, seguridad/evacuación), formas con significado (círculo, triángulo, cuadrado), pictogramas. Referencias: ISO 3864 / ISO 7010; en Colombia, NTC 1461 `[VERIFICAR vigencia]`.
- **Demarcación**: cintas, rayados diagonales de piso, zonificación de planta.
- **Papelería de seguridad**: permisos de trabajo, tarjetas de bloqueo (LOTO), etiquetas, sellos, folios, firmas, casillas de chequeo.
- **Planos**: rutas de evacuación, mapas de riesgos, puntos de encuentro, isométricos con leyenda.
- **Tableros de planta**: «días sin accidentes», semáforos, andon.
- **Materiales del EPP**: reflectivo, lona, acero, caucho → como textura o patrón, no como ilustración literal.

Regla: los colores de señal **solo significan**. Nunca los uses como decoración ni como color de marca; si el rojo aparece, algo está prohibido o es una emergencia.

## Paso 2 — Tres direcciones, elegir una
Propón tres direcciones que difieran en **concepto y estructura**, no solo en paleta. Para cada una: una frase de idea, 4–6 colores con nombre y hex, pareja tipográfica con roles, y un boceto ASCII del layout. Recomienda una y di por qué. Ejemplos para calibrar (no para copiar):

- **Planta**: industrial-editorial. Tipografía condensada grande, franjas de demarcación como estructura, fondo de concreto claro, amarillo de advertencia reservado a advertencias.
- **Plano**: técnica y cartográfica. Retícula de plano, líneas de cota, leyendas, isométricos; monocromo con un solo color de señal.
- **Bitácora**: cálida y humana. Papel, sellos, fotografía documental real de las personas del cliente; el foco es el cuidado, no la norma.

Antes de construir, compara la dirección elegida con lo que producirías para *cualquier* página de SST. Si coincide, cámbiala y dime qué cambiaste.

## Paso 3 — Tokens
Crea los tokens a partir de `references/plantilla-tokens.css`: marca (4–6 colores con nombre), **señales de seguridad separadas de la marca**, escala tipográfica, espaciado, radios jerárquicos (no un solo radio para todo), elevación y tiempos de movimiento (ver `sst-motion-design`).

## Paso 4 — Reglas de composición
- **Hero**: abre con lo más característico del mundo del cliente (un plano, una señal, un contador real, una fotografía documental), no con «número grande + gradiente».
- **Un solo elemento memorable**; el resto, sobrio. Quita una cosa antes de entregar.
- **Tipografía = personalidad**. Una o dos familias elegidas a propósito, no las de siempre (Inter, Poppins, Roboto). Verifica soporte completo de español: á é í ó ú ü ñ ¿ ¡ y comillas « ».
- **Estructura = información**. Numeración solo si el contenido es una secuencia real (fases del PHVA, pasos de un procedimiento). Etiquetas y «eyebrows» solo si aportan.
- Líneas de texto de menos de ~75 caracteres.
- **Datos plausibles del dominio**, nunca lorem ipsum: «Inspección de arnés — Torre B, nivel 7». Si inventas cifras de siniestralidad o cumplimiento, márcalas visiblemente como *datos de ejemplo*.

### Señales de que la página salió genérica
Tarjetas idénticas con la misma sombra · gradientes decorativos · glassmorphism por defecto · escudo/casco/check como único recurso gráfico · foto de stock de casco amarillo sobre blanco · etiquetas en MAYÚSCULAS con tracking en cada título · «→» en cada botón · fade-in-up en cada sección.

## Paso 5 — Dos modos
- **Portal o marketing** (landing, institucional, capacitación): más libertad expresiva, narrativa y scroll.
- **App operativa** (inspecciones, reportes, tableros): primero legibilidad y velocidad. La expresividad vive en el sistema de color y tipografía y en uno o dos momentos (estado vacío, confirmación, resumen). Ver `sst-ui-accesibilidad-campo`.

## Paso 6 — Microcopy en español de Colombia
- Elige una vez entre «usted» y «tú» y mantenlo. Botones en infinitivo: «Guardar inspección», «Reportar incidente».
- Un botón conserva su nombre en todo el flujo: si dice «Reportar», el aviso dice «Reportado».
- Los errores dicen qué pasó y cómo corregirlo; no se disculpan ni culpan al trabajador.
- Evita lenguaje de miedo o de culpa («error humano», «negligencia»). Prefiere «evento», «condición», «causa».

## Entrega
Antes de dar por terminada la pantalla, pasa por `sst-verificacion-entrega`. Guarda las decisiones (dirección elegida, tokens, qué descartaste) en `docs/diseno/direccion.md` para que la siguiente pantalla no vuelva a empezar de cero.
