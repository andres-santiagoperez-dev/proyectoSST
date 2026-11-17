# Módulos candidatos del aplicativo SST por fase del PHVA

Contenido: Planear · Hacer · Verificar · Actuar · Transversales · Cómo priorizar un MVP

Son **candidatos**: no todos entran en la primera versión. Úsalos para descubrir el alcance con `sst-requerimientos`. Los usuarios y datos son los típicos; confírmalos con el cliente.

## Planear

| Módulo | Usuarios principales | Datos clave | Salidas |
|---|---|---|---|
| Política y objetivos | Alta dirección, responsable SG-SST | Texto versionado, fecha, firma, divulgación | Política vigente, evidencia de divulgación |
| Matriz de peligros (identificación y valoración de riesgos) | Responsable SG-SST, COPASST/Vigía, líderes de área | Proceso, actividad, peligro (clasificación), controles existentes, valoración, medidas de intervención | Matriz exportable, mapa de riesgos, priorización |
| Matriz legal | Responsable SG-SST, asesor jurídico | Norma, artículo, aplicabilidad, evaluación de cumplimiento, evidencia, fecha de verificación | Matriz legal vigente, alertas de revisión |
| Plan anual de trabajo y cronograma | Responsable SG-SST, alta dirección | Actividades, responsables, fechas, recursos, estado | Plan, avance, alertas de vencimiento |
| Autoevaluación de estándares mínimos | Responsable SG-SST | Estándar, ítem, peso, estado, evidencia, observaciones | Puntaje, valoración, plan de mejoramiento |
| Recursos y presupuesto | Alta dirección | Rubros, ejecución | Reporte de ejecución |

## Hacer

| Módulo | Usuarios principales | Datos clave | Salidas |
|---|---|---|---|
| Capacitación y formación | Responsable SG-SST, trabajadores | Programa, sesiones, asistentes, evaluación, vigencia | Registros de asistencia, certificados, alertas |
| Inspecciones (planeadas, de áreas, de equipos, de EPP) | Líderes de área, COPASST, brigada | Plantilla, ítems, hallazgos, fotos, ubicación | Informe, hallazgos que alimentan acciones |
| Gestión de la salud (exámenes ocupacionales, vigilancia epidemiológica, ausentismo) | Médico/IPS, responsable SG-SST | Tipo de examen, concepto de aptitud, recomendaciones, restricciones, vencimientos | Calendario de exámenes, seguimiento de recomendaciones (**sin diagnósticos para el empleador**) |
| Emergencias (plan, brigada, simulacros) | Brigada, responsable SG-SST | Escenarios, recursos, integrantes, simulacros, tiempos | Plan vigente, actas y evaluación de simulacros |
| Permisos de trabajo de alto riesgo (alturas, espacios confinados, trabajo en caliente, LOTO) | Supervisores, ejecutores | Permiso, peligros, controles, firmas, vigencia | Permiso digital, cierre, trazabilidad |
| Contratistas y proveedores | Responsable SG-SST, compras | Documentos de afiliación y aptitud, evaluación, vigencia | Estado de cumplimiento por contratista, alertas |
| Gestión del cambio | Responsable SG-SST, ingeniería | Cambio, evaluación de riesgos, aprobación | Registro de cambios evaluados |
| Entrega de EPP | Almacén, líderes | Elemento, trabajador, fecha, reposición | Registro de entrega, alertas de reposición |
| Comités (COPASST/Vigía, Convivencia) | Integrantes de comités | Conformación, elecciones, reuniones, actas, compromisos | Actas con compromisos seguibles |

## Verificar

| Módulo | Usuarios principales | Datos clave | Salidas |
|---|---|---|---|
| Reporte e investigación de eventos (incidentes, ATEL) | Trabajadores, jefes, equipo investigador | Evento, lesionados, testigos, causas, evidencias, plazos legales | Informe, acciones, alertas de plazo `[VERIFICAR plazos]` |
| Indicadores | Responsable SG-SST, alta dirección | Definición versionada, numerador, denominador, periodo | Tablero, histórico |
| Auditoría interna | Auditor | Plan, hallazgos, evidencias | Informe y hallazgos hacia acciones |
| Revisión por la alta dirección | Alta dirección | Entradas (indicadores, hallazgos), decisiones | Acta de revisión |

## Actuar

| Módulo | Usuarios principales | Datos clave | Salidas |
|---|---|---|---|
| Acciones preventivas, correctivas y de mejora | Todos los roles | Origen (hallazgo, evento, auditoría), causa, responsable, fecha, verificación de eficacia | Tablero de acciones, cierre verificado |

## Transversales (casi siempre necesarios)
Autenticación y roles · registro de auditoría · gestión documental con versiones y retención · notificaciones y vencimientos · calendario de festivos configurable · carga de evidencias · exportación a PDF y Excel · multiempresa y multisede (si el producto atiende a varias empresas) · modo sin conexión para campo.

## Cómo priorizar un MVP
Criterios (en este orden): 1) **riesgo legal** que el cliente corre sin el módulo, 2) **frecuencia de uso** (lo cotidiano crea hábito), 3) **dependencias** (la matriz de peligros y el reporte de eventos alimentan acciones e indicadores), 4) **valor visible** para quien paga.
Combinaciones típicas de MVP (confirma con el cliente, no las asumas): *autoevaluación + plan anual + acciones*; o *reporte de incidentes + inspecciones + acciones*; o *matriz de peligros + capacitaciones + indicadores*.
