# Requisitos No Funcionales (RNF) — SafePulse SST

Versión: 1.0 · Fecha: 2026-11-17

Todas las metas numéricas se presentan como `[PROPUESTO]` para validación con el cliente y el equipo técnico.

---

## 1. Seguridad y Control de Acceso
* **RNF-001 (Autenticación y Sesiones):** El sistema debe autenticar usuarios mediante contraseñas seguras con hash robusto (Argon2id o bcrypt con costo >= 12) y emitir tokens JWT firmados con expiración máxima de `[PROPUESTO: 8 horas]` de inactividad.
* **RNF-002 (Control de Acceso Basado en Roles):** Cada petición a la API o ruta protegida debe validar los permisos en el servidor mediante middleware RBAC antes de entregar datos.

## 2. Privacidad y Confidencialidad de Datos de Salud
* **RNF-003 (Aislamiento de Datos de Salud):** Los conceptos de aptitud médica laboral se almacenarán en tablas dedicadas, sin campos para historia clínica ni diagnósticos CIE-10 (cumplimiento Resolución 2346 de 2007).
* **RNF-004 (Cero Datos Sensibles en Logs y URLs):** Ningún log del sistema, parámetro URL o mensaje de error en frontend debe contener nombres de personas asociados a descripciones de incidentes o aptitudes de salud.

## 3. Auditoría y Trazabilidad Inmutable
* **RNF-005 (Registro de Auditoría):** Toda creación, modificación, cambio de estado de incidentes, conceptos de aptitud o calificación de estándares debe generar un registro inmutable en una bitácora de auditoría que incluya: `usuario_id`, `fecha_hora_utc`, `accion`, `entidad`, `datos_anteriores`, `datos_nuevos` y `direccion_ip`.
* **RNF-006 (Imposibilidad de Borrado Directo):** Ningún usuario ni rol administrativo tendrá acceso a eliminar registros del log de auditoría desde la aplicación.

## 4. Retención y Respaldo de la Información
* **RNF-007 (Periodo de Retención Normativo):** De acuerdo con el Decreto 1072 de 2015 (Art. 2.2.4.6.13), los registros de investigaciones de incidentes, evaluaciones ocupacionales y capacitaciones deben conservarse por un mínimo de `[PROPUESTO: 20 años]` a partir de que cese la relación laboral del trabajador.
* **RNF-008 (Exportabilidad):** Los reportes y matrices deben poder exportarse a formatos abiertos (JSON, CSV, PDF imprimible) en menos de `[PROPUESTO: 3 segundos]`.

## 5. Rendimiento y Velocidad de Carga
* **RNF-009 (Tiempo de Carga Inicial):** La página de inicio y el portal corporativo deben alcanzar un First Contentful Paint (FCP) de `[PROPUESTO: < 1.2 segundos]` y Largest Contentful Paint (LCP) de `[PROPUESTO: < 2.0 segundos]` en conexiones estándar (4G/banda ancha).
* **RNF-010 (Envío de Reportes):** El formulario de reporte de incidentes debe procesar y confirmar el envío en menos de `[PROPUESTO: 500 ms]` en red local o emitir confirmación inmediata en almacenamiento local si está desconectado.

## 6. Uso Sin Conexión (Offline-First en Reportes)
* **RNF-011 (Persistencia Local de Incidentes):** Si el trabajador pierde la conectividad a internet en planta o campo, el formulario debe almacenar el reporte localmente (IndexedDB / localStorage) con estado "Pendiente de sincronización" y sincronizarse automáticamente al recuperar la señal sin intervención manual ni pérdida de datos.

## 7. Accesibilidad y Ergonomía Visual
* **RNF-012 (Conformidad WCAG):** La interfaz completa debe cumplir el nivel `[PROPUESTO: WCAG 2.2 AA]`, con relación de contraste mínima de 4.5:1 para texto normal y 3:1 para elementos gráficos y componentes interactivos.
* **RNF-013 (Navegación por Teclado y Foco Visible):** Todos los botones, campos de formulario, temporizadores de pausas y menús deben ser 100 % operables mediante teclado, con un indicador de foco evidente (mínimo 2px con contraste >= 3:1).
* **RNF-014 (Respeto a Movimiento Reducido):** Las animaciones del portal y del módulo de pausas activas deben respetar la preferencia del usuario `prefers-reduced-motion: reduce`, ofreciendo alternativas visuales estáticas o de desvanecimiento suave sin pérdida de funcionalidad ni información.

## 8. Compatibilidad y Responsividad
* **RNF-015 (Diseño Adaptable Multidispositivo):** La interfaz debe probarse y verse perfectamente adaptada sin desbordamientos horizontales en 4 anchos de pantalla de referencia:
  * Móvil estrecho: **375 px**
  * Tablet: **768 px**
  * Portátil / Escritorio: **1280 px**
  * Pantalla ancha / TV de planta: **1920 px**

## 9. Idioma y Localización
* **RNF-016 (Español de Colombia):** Todos los textos de interfaz, etiquetas de estado, mensajes de error y formatos de fecha deben estar adaptados al español de Colombia (`es-CO`), con formato de fecha `DD/MM/AAAA` y moneda colombiana `$ COP` si se registran costos o presupuestos.
