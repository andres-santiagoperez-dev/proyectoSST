---
name: sst-verificacion-entrega
description: "Lista de verificación previa a entregar cualquier pantalla, componente, página o módulo del proyecto SST: renderizado real en el navegador, responsive, teclado, accesibilidad, movimiento reducido, rendimiento, contenido normativo y privacidad de datos, más un informe de entrega en español. Úsala siempre antes de dar por terminada una tarea de frontend del proyecto SST y cuando el usuario pida revisar, auditar, pulir, probar o 'dejar listo' una interfaz, aunque no mencione calidad."
---

# Verificación antes de entregar

Una pantalla no está terminada cuando el código compila, sino cuando se vio funcionar, se probó con teclado, se comprobó con movimiento reducido y se revisó que no afirma nada legal sin respaldo. Este skill cierra cada tarea de interfaz.

## Procedimiento

### 1. Construcción
Ejecuta las comprobaciones del proyecto: instalación, compilación, lint y tipos. Corrige los errores; no los silencies. Si el proyecto aún no tiene esos comandos, dilo en el informe.

### 2. Verlo de verdad
Abre la página en el navegador integrado (en Antigravity, con el subagente de navegador) o con una herramienta de capturas, y revisa estos anchos: **375, 768, 1280 y 1920 px**. Busca: desbordes horizontales, texto cortado, imágenes deformadas, elementos fijos que tapan contenido, saltos de diseño al cargar. Adjunta o describe las capturas en el informe.

### 3. Teclado y foco
Recorre todo con Tab y Shift+Tab: orden lógico, foco siempre visible, Escape cierra diálogos, sin trampas de foco, elementos interactivos alcanzables. Los controles son `button` o `a` reales, no `div` con clic.

### 4. Movimiento
Emula `prefers-reduced-motion: reduce` y confirma que el contenido sigue visible y completo. Comprueba que nada parpadea más de 3 veces por segundo y que los movimientos continuos se pueden pausar. Mide con CPU limitada (4×). Ver `sst-motion-design`.

### 5. Accesibilidad automatizada y manual
Ejecuta axe o Lighthouse y atiende los hallazgos de impacto serio o crítico. Referencia, no dogma: accesibilidad ≥ 95 en Lighthouse. Verifica a mano: contraste de los colores de señal, no depender solo del color, zoom al 200 %, ancho de 320 px, nombres accesibles en iconos y botones, `lang="es-CO"`. Detalle en `sst-ui-accesibilidad-campo`.

### 6. Estados
Cada vista se revisa en: vacío · cargando · error · sin conexión (si aplica) · sin permiso · datos largos (nombres con tildes y ñ, textos extensos, 500 filas) · primer uso.

### 7. Contenido
- Todo en español de Colombia, sin lorem ipsum ni texto en inglés residual.
- **Ninguna afirmación normativa sin respaldo**: cada cita legal tiene `norma_ref` y fecha de verificación, o está marcada `[VERIFICAR]`. La interfaz no dice «cumple con la ley».
- Las cifras y personas de ejemplo están marcadas como *datos de ejemplo*; no hay datos reales de trabajadores en fixtures, capturas ni commits.
- Términos del glosario (`sst-dominio-sg-sst`) usados de forma consistente; tono sin culpar al trabajador.

### 8. Privacidad
Sin datos de salud en URLs, logs, mensajes de error ni analítica. Datos personales enmascarados por defecto en tablas. Los permisos de cada vista coinciden con la matriz de roles.

### 9. Prueba de originalidad
Pasa la lista «Señales de que la página salió genérica» de `sst-direccion-creativa`. Quita un elemento decorativo («un accesorio antes de salir de casa»). Confirma que hay **un** elemento memorable y que se puede nombrar.

## Informe de entrega (en español)
Entrega siempre este resumen breve:

```
## Qué se hizo
[Pantallas o componentes, en una frase cada uno]

## Decisiones de diseño
[Dirección elegida, tipografías, color, movimiento; lo que se descartó y por qué]

## Qué se verificó
[Anchos probados · teclado · reduced-motion · axe/Lighthouse con puntajes · estados revisados]

## Pendientes y riesgos
[Lo que no se pudo verificar, [VERIFICAR] abiertos, limitaciones]

## Supuestos
[Lista de [SUPUESTO] que el usuario debe confirmar]
```

Si algo no se pudo comprobar (por ejemplo, no hay navegador disponible), dilo explícitamente en lugar de dar a entender que se verificó.
