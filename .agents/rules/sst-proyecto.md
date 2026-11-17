# Reglas del proyecto SST (siempre activas)

Este repositorio es un aplicativo web de Seguridad y Salud en el Trabajo (SST / SG-SST / STT) con un frontend distintivo, animado y accesible.

## Idioma y tono
- Responde en español de Colombia. Código, nombres técnicos y mensajes de commit pueden ir en inglés si el repo ya lo hace; textos de interfaz y documentación, en español.
- Sé directo y concreto. Si falta información que cambia el resultado, pregunta antes de construir; si no, avanza y marca los supuestos como `[SUPUESTO]`.

## Verdad normativa
- No afirmes contenido legal (artículos, plazos, porcentajes, fórmulas) de memoria. Cítalo con fuente verificada en esta sesión o márcalo `[VERIFICAR]`.
- La interfaz nunca dice «cumple con la ley». Describe qué verificó el sistema y cuándo.
- El contenido normativo lo valida un profesional SST con licencia o un abogado laboralista antes de producción.

## Datos y privacidad
- Nunca uses datos reales de personas en ejemplos, pruebas, capturas ni commits. Los datos de ejemplo se marcan como tales.
- Los datos de salud son sensibles: no los registres en logs, URLs ni mensajes de error.

## Diseño
- Nada de estética genérica de plantilla. Antes de maquetar una pantalla nueva, define la dirección con `sst-direccion-creativa`.
- Los colores de señal de seguridad solo significan; nunca decoran.
- Todo movimiento respeta `prefers-reduced-motion` y no oculta contenido.

## Qué skill usar
| Si la tarea es… | Usa |
|---|---|
| Levantar o cambiar requerimientos, historias, MVP | `sst-requerimientos` |
| Términos, normas, cálculos, módulos de SST | `sst-dominio-sg-sst` |
| Stack, base de datos, permisos, privacidad | `sst-arquitectura-app` |
| Look and feel, identidad visual, layout | `sst-direccion-creativa` |
| Animaciones, scroll, transiciones | `sst-motion-design` |
| Formularios, móvil, offline, accesibilidad, tableros | `sst-ui-accesibilidad-campo` |
| Cerrar o revisar una tarea de interfaz | `sst-verificacion-entrega` |

## Dónde se guarda cada cosa
`docs/requerimientos/` · `docs/diseno/` (dirección, tokens, movimiento) · `docs/adr/` (decisiones de arquitectura).

## Cierre de tarea
Toda tarea de interfaz termina con el informe de `sst-verificacion-entrega`: qué se hizo, decisiones, qué se verificó, pendientes y supuestos.
