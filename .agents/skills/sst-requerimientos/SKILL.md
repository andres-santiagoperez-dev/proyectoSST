---
name: sst-requerimientos
description: "Levanta, redacta y mantiene los requerimientos del aplicativo de Seguridad y Salud en el Trabajo (SST, SG-SST): entrevistas de descubrimiento, visión del producto, actores y permisos, épicas por ciclo PHVA, historias de usuario, criterios de aceptación (Dado/Cuando/Entonces), requisitos no funcionales, matriz de trazabilidad contra la norma, preguntas abiertas, backlog priorizado y MVP. Úsala siempre que el usuario hable de requerimientos, alcance, historias de usuario, PRD, SRS, backlog, MVP, funcionalidades, módulos, 'qué debe hacer el sistema' o quiera planear antes de construir, aunque no use la palabra requerimiento."
---

# Requerimientos del aplicativo SST

Un buen requerimiento de SST responde cuatro cosas: **para quién**, **qué debe poder hacer**, **cómo sabremos que está bien** y **qué norma o riesgo lo justifica**. Este skill convierte una idea difusa en documentos que el equipo (y los agentes) pueden construir y probar sin adivinar.

Trabaja siempre con `sst-dominio-sg-sst`: las referencias legales se verifican, no se inventan.

## Flujo de trabajo

### 1. Descubrimiento
- Revisa primero lo que ya se sabe (conversación, archivos del repo, `docs/`). No vuelvas a preguntar lo ya respondido.
- Pregunta en **rondas de máximo 5 preguntas**, de lo más estructurante a lo más fino. Banco de preguntas: `references/banco-preguntas.md`.
- Las cuatro decisiones que más condicionan todo lo demás: **país y normativa**, **quién usa el aplicativo** (la empresa, una IPS, una asesora de SST con varios clientes), **qué datos de salud se guardan** y **dónde se usa** (oficina o campo, con o sin conexión).
- Si el usuario no sabe, propón una opción razonable marcada como `[SUPUESTO]` y sigue; no te quedes bloqueado.

### 2. Visión del producto (una página)
Problema, usuarios, resultado esperado, no-objetivos y métricas de éxito. Plantilla: `assets/plantilla-vision.md`. Guarda en `docs/requerimientos/00-vision.md`.

### 3. Actores y permisos
Lista de roles y una matriz rol × acción (ver, crear, editar, aprobar, exportar, borrar) por módulo. Marca los datos sensibles. Guarda en `docs/requerimientos/01-actores-roles.md`.

### 4. Épicas y MVP
Agrupa por módulos del PHVA (candidatos en `sst-dominio-sg-sst/references/modulos-por-phva.md`). Para elegir el MVP usa: riesgo legal sin el módulo → frecuencia de uso → dependencias → valor visible. Presenta **2 o 3 recortes posibles de MVP** con sus compromisos y recomienda uno. Guarda en `docs/requerimientos/02-epicas.md`.

### 5. Historias de usuario
Una historia por archivo en `docs/requerimientos/historias/HU-###-titulo-corto.md`, con la plantilla `assets/plantilla-historia.md`. Cada historia incluye:
- **ID estable** (`HU-012`) que no se reutiliza ni cambia.
- «Como *rol*, quiero *acción*, para *resultado*».
- **Criterios de aceptación** en formato Dado / Cuando / Entonces, incluyendo al menos un caso de error y uno de permisos.
- **Norma o fuente** (`norma_ref`) o «sin requisito legal».
- **Prioridad** MoSCoW (Debe / Debería / Podría / No por ahora).
- **Datos sensibles**: sí/no y cuáles.
- **Estados de interfaz** a diseñar: vacío, cargando, error, sin conexión, sin permiso, datos largos.
- **Dependencias** y preguntas abiertas.

### 6. Requisitos no funcionales (RNF)
Registra en `docs/requerimientos/03-rnf.md`, cada uno con una meta **medible**. Categorías mínimas: seguridad y control de acceso · privacidad y datos de salud · auditoría y trazabilidad · retención y respaldo · disponibilidad · rendimiento · uso sin conexión · accesibilidad · compatibilidad de dispositivos · exportación e interoperabilidad · idioma (es-CO). No inventes cifras: propón una meta como `[PROPUESTO]` y pide validarla.

### 7. Trazabilidad
Mantén `docs/requerimientos/04-trazabilidad.md` (plantilla: `assets/plantilla-trazabilidad.md`): **norma o estándar → requerimiento → historia → prueba**. Sirve para demostrar a una auditoría que cada obligación aplicable tiene una función que la cubre, y para detectar huecos.

### 8. Calidad del requerimiento
Revisa cada historia contra esta lista antes de darla por lista:
- Es **verificable**: otra persona puede decir «cumple» o «no cumple».
- No usa palabras vagas («rápido», «fácil», «intuitivo») sin una medida.
- Describe **qué**, no **cómo** (no dicta tecnología salvo restricción real).
- Es **atómica**: se puede construir y probar sola, en un tiempo razonable.
- Usa los términos del glosario.
- Tiene dueño de negocio que pueda aprobarla.

### 9. Preguntas abiertas, supuestos y riesgos
Mantén `docs/requerimientos/05-preguntas-abiertas.md` con: pregunta · quién decide · impacto si no se resuelve · fecha límite. Los supuestos van marcados `[SUPUESTO]` y se revisan en cada ronda.

### 10. Entrega hacia diseño y desarrollo
- Para cada historia con interfaz, deja la lista de **pantallas y estados** y pasa a `sst-direccion-creativa` y `sst-ui-accesibilidad-campo`.
- Para cada historia con datos, pasa a `sst-arquitectura-app`.
- Antes de construir, genera un resumen de **«qué entra en el primer sprint»** con las historias, sus criterios y los riesgos.

## Cómo comunicarte con el usuario
- Español claro, sin jerga de ingeniería de requisitos si no la usa el usuario (explica «criterio de aceptación» en una frase la primera vez).
- Muestra siempre un **borrador** concreto en cuanto tengas información suficiente; corregir un borrador es más fácil que responder un cuestionario largo.
- Resume cada ronda en: *lo que entendí · lo que asumí · lo que necesito decidir*.

## Mantenimiento
Los requerimientos cambian. Registra los cambios con versión y fecha al final de cada documento (`## Historial`). Nunca borres un ID; márcalo `[RETIRADA]` con el motivo.
