---
name: sst-arquitectura-app
description: "Guía las decisiones técnicas y el modelo de datos del aplicativo SST: elección de stack, entidades del dominio, roles y permisos (RBAC), multiempresa, registro de auditoría, protección de datos de salud (habeas data), evidencias, notificaciones y vencimientos, trabajo sin conexión, reportes y pruebas de cálculos normativos. Úsala siempre que se defina la arquitectura, la base de datos, la API, la autenticación, la seguridad, la privacidad o la estructura del repositorio del proyecto SST, y antes de generar código de backend o esquemas, aunque el usuario solo diga 'monta el backend' o 'crea la base de datos'."
---

# Arquitectura y datos del aplicativo SST

Un aplicativo de SST guarda registros que pueden terminar en una auditoría, una investigación o un proceso legal, y datos de salud de personas. La arquitectura se decide **después** de tener los requerimientos mínimos (`sst-requerimientos`) y las reglas del dominio (`sst-dominio-sg-sst`), no antes.

## 0. No empieces a codificar sin estas respuestas
1. ¿Una empresa, varias empresas o una consultora con varios clientes? (multi-tenencia)
2. ¿Qué datos de salud se guardan y quién los opera: la empresa o una IPS? Decide el modelo de privacidad.
3. ¿Hay stack obligado o preferido, y dónde se aloja?
4. ¿Se necesita trabajo sin conexión?

Si falta alguna, pregúntala; si el usuario no sabe, propón una opción `[SUPUESTO]` y registra la decisión.

## 1. Decisión de stack (sin imponer)
Presenta 2 o 3 opciones con compromisos y recomienda una según las respuestas. Criterios:

| Criterio | Qué mirar |
|---|---|
| Interfaz vistosa y animada | Ecosistema de componentes y animación (React + Motion/GSAP, o frameworks de contenido para páginas públicas) |
| Portal público + app autenticada | Un solo framework con renderizado híbrido, o dos aplicaciones separadas |
| Trabajo sin conexión | Soporte de service worker, almacenamiento local y sincronización |
| Datos relacionales con integridad | Base de datos relacional |
| Equipo y operación | Lo que el equipo ya domina y puede mantener |
| Residencia y cumplimiento | Dónde se almacenan los datos y quién tiene acceso |

Registra la decisión en un ADR corto: `docs/adr/0001-stack.md` (contexto · decisión · alternativas · consecuencias).

## 2. Modelo de dominio inicial
Punto de partida para discutir, no una verdad. Adáptalo a los módulos del MVP.

- **Organización**: `empresa`, `sede`, `centro_trabajo`, `area_proceso`, `cargo`.
- **Personas y acceso**: `persona` (datos mínimos), `usuario`, `rol`, `permiso`, `asignacion_rol` (por empresa/sede).
- **Planear**: `peligro` (catálogo), `valoracion_riesgo` (con versión de escala), `control`, `requisito_legal`, `plan_anual`, `actividad_plan`, `autoevaluacion`, `estandar`, `item_estandar`, `evidencia_estandar`.
- **Hacer**: `capacitacion`, `sesion_capacitacion`, `asistencia`, `plantilla_inspeccion`, `inspeccion`, `hallazgo`, `simulacro`, `brigadista`, `permiso_trabajo`, `contratista`, `documento_contratista`, `entrega_epp`.
- **Salud (acceso restringido)**: `examen_ocupacional` (tipo, fecha, **concepto de aptitud y recomendaciones**), `restriccion_laboral`, `ausentismo`. Diagnósticos y historias clínicas **no entran** si el operador es la empresa `[VERIFICAR]`.
- **Verificar**: `evento` (incidente / AT / EL), `investigacion`, `causa`, `participante_evento`, `indicador_definicion` (versionada), `indicador_medicion`, `auditoria`.
- **Actuar**: `accion` (origen, causa, responsable, vence, verificación de eficacia).
- **Comités**: `comite`, `integrante`, `reunion`, `compromiso`.
- **Transversales**: `documento` (versionado, retención), `adjunto`, `notificacion`, `festivo` (calendario configurable), `registro_auditoria`, `consentimiento`.

Convenciones: identificadores no secuenciales (UUID o equivalente), `creado_en`, `actualizado_en`, `creado_por`, borrado lógico para lo que tenga retención, zona horaria explícita (los plazos legales se cuentan en la zona del cliente).

## 3. Roles y permisos (RBAC)
- Parte de los actores de `sst-requerimientos` y de la matriz rol × acción. **Mínimo privilegio**: nadie ve más de lo necesario.
- Permisos por **empresa y sede**, no solo globales. El responsable del SG-SST de la sede A no ve la sede B.
- Separa claramente el acceso a datos de salud del resto. El acceso a estos datos queda siempre en el registro de auditoría.
- Autenticación: contraseña robusta o inicio de sesión corporativo; doble factor para roles con datos sensibles o administración.

## 4. Seguridad y privacidad
- **Datos de salud = datos sensibles** (habeas data, Ley 1581 de 2012 `[VERIFICAR]`): finalidad declarada, consentimiento registrado, minimización, derecho de acceso y rectificación, y proceso para solicitudes del titular. Pide revisión legal.
- Cifrado en tránsito y en reposo; cifrado adicional por campo para lo más sensible.
- Sin datos sensibles en logs, URLs, mensajes de error ni analítica.
- Evidencias (fotos, PDFs): almacenamiento de objetos con acceso por URL firmada y caducidad, límite de tamaño, tipos permitidos, análisis de malware y opción de **eliminar metadatos EXIF** (ubicación) cuando no sean necesarios.
- Protección contra los riesgos habituales de aplicaciones web (referencia: OWASP ASVS y Top 10): validación en servidor, control de acceso en cada endpoint, protección CSRF, límites de tasa, cabeceras de seguridad.
- Secretos fuera del repositorio. Copias de seguridad probadas, con restauración ensayada.
- Datos de ejemplo y de prueba **sin información real de personas**.

## 5. Registro de auditoría
Tabla de solo agregar (no se edita ni se borra): quién, qué entidad, qué acción, cuándo, desde dónde, valores antes/después (sin datos sensibles en claro). Obligatorio para: cambios en eventos e investigaciones, documentos del SG-SST, accesos a datos de salud, cambios de permisos y cambios de definiciones de indicadores.

## 6. Vencimientos y notificaciones
Motor único para todo lo que vence: exámenes, capacitaciones, extintores, documentos de contratistas, plazos legales de reporte e investigación `[VERIFICAR]`, acciones sin cerrar. Soporta recordatorios escalonados, escalamiento a un superior, calendario de festivos configurable y estados (pendiente, vencido, cumplido, justificado).

## 7. Sin conexión y sincronización
Solo para lo que lo necesita (inspecciones, reporte de incidentes, asistencia). Define: qué se guarda local, cuánto tiempo, cifrado local si hay datos sensibles, cola de cambios, resolución de conflictos, idempotencia de envíos (un reporte no se duplica al reintentar). Experiencia de usuario: `sst-ui-accesibilidad-campo`.

## 8. Indicadores y reportes
Definiciones versionadas (`sst-dominio-sg-sst/references/glosario-y-calculos.md`). Se calculan en servidor, se guardan con la versión de la fórmula y se pueden recalcular. Exportación a PDF y Excel con encabezado, fecha, periodo y responsable.

## 9. Pruebas que no se negocian
- **Casos dorados** para cada cálculo normativo (autoevaluación, indicadores, valoración de riesgo, plazos con días hábiles), validados por un profesional SST.
- Pruebas de **permisos**: cada rol intenta lo que no debe poder hacer.
- Pruebas de **auditoría**: cada acción sensible deja rastro.
- Pruebas de sincronización: reintentos, duplicados y conflictos.

## 10. Estructura sugerida del repositorio
```
docs/
  requerimientos/     (ver sst-requerimientos)
  diseno/             (dirección, tokens, movimiento)
  adr/                (decisiones de arquitectura)
src/ …                (según el stack elegido)
.agents/
  rules/ skills/
```

## Salida esperada de este skill
1. ADR de stack. 2. Diagrama o lista de entidades del MVP con campos clave. 3. Matriz de permisos. 4. Lista de datos sensibles con su tratamiento. 5. Plan de pruebas de cálculos y permisos. Solo después, el código.
