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

## Diseño y Paleta Oficial Obligatoria (14 Tokens)
- Nada de estética genérica de plantilla. Antes de maquetar una pantalla nueva, define la dirección con `sst-direccion-creativa`.
- Los colores de señal de seguridad solo significan; nunca decoran.
- Todo movimiento respeta `prefers-reduced-motion` y no oculta contenido.
- **TODA la suite y cualquiera de sus aplicativos DEBE utilizar estricta y exclusivamente los siguientes 14 colores oficiales:**

### 1. Colores de Identidad y Navegación (Primarios)
- **Azul Marino Oscuro (`#0E1B2F`)**: Sidebar de navegación, encabezados y textos de alta jerarquía. Transmite seriedad y estructura.
- **Azul Corporativo (`#1A56DB`)**: Color de acción principal para botones destacados e hipervínculos (`brand-blue`).
- **Agua Marina Oscuro (`#0B7A87`)**: Tono complementario para botones secundarios y alertas con visibilidad armónica (`brand-tealDark`).

### 2. Colores de Enfoque y Énfasis (Agua Marina y Celestes)
- **Turquesa / Agua Marina (`#14B8A6`)**: Controles, interruptores, toggles de configuración y acentos dinámicos (`accent-turquoise`).
- **Turquesa Claro (`#2DD4BF`)**: Relieves, ilustraciones, líneas técnicas y gráficos circulares que necesiten resaltar (`accent-turquoiseLight`).

### 3. Colores de Bienestar (Verdes)
- **Verde Esmeralda (`#10B981`)**: Representa salud, éxito y la actividad de la "Pausa" (`vital-emerald`).
- **Verde Menta (`#34D399`)**: Para elementos de logro, sliders y switches "on/off" de bienestar (`vital-mint`).
- **Verde Bosque (`#047857`)**: Verde maduro ideal para la visualización de datos positivos y estadísticas (`vital-forest`).

### 4. Estados de Trabajadores (Monitoreo de PCs)
- **Azul Enérgico (`#2563EB`)**: "Estado: Activo" (en su PC trabajando).
- **Verde Esmeralda (`#10B981`)**: "Estado: En Pausa" (cumpliendo con la pausa activa).
- **Agua Marina (`#06B6D4`)**: "Estado: Próxima Pausa" (aviso cercano de pausa programada).
- **Azul Grisáceo Oscuro (`#1E293B`)**: "Estado: Omitida" (tono neutro que comunica omisión sin ser punitivo ni agresivo).

### 5. Neutros y Fondos
- **Blanco Puro (`#FFFFFF`)**: Para tarjetas, contenedores de paneles, diálogos y popups de alerta (`surface-white`).
- **Azul Grisáceo Claro (`#F8FAFC`)**: Fondo general de toda la aplicación, diseñado para reducir la fatiga visual prolongada (`surface-bg`).
- **Gris Azulado (`#64748B`)**: Para bordes de componentes, líneas divisorias y textos secundarios de menor importancia (`surface-border`).

> **REGLA DE ORO DE PALETA:** Queda estrictamente prohibido introducir paletas genéricas (ámbar, terracota antigua, morados, fucsias, grises fríos arbitrarios o fondos negros `#000000`). Toda nueva vista o componente debe consumir estos tokens.

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
