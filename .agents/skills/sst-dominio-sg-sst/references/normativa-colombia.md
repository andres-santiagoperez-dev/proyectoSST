# Matriz normativa SG-SST (Colombia) — punto de partida

Contenido: Cómo usar esta matriz · Normas base · Normas por tema · Normas recientes a revisar · Normas técnicas · Cómo modelarla en el aplicativo

## Cómo usar esta matriz
- Es un **índice de rutas de búsqueda**, no una fuente legal. Antes de convertir cualquier fila en requisito, regla de negocio o texto de interfaz, **busca el texto vigente** en fuentes oficiales y registra `verificado_en` y `fuente_url`.
- Columna «Estado»: **Confirmada** = la norma aparece citada como vigente en documentos institucionales consultados en 2026; **Revisar** = proviene de conocimiento general y debe verificarse (existencia, número, vigencia, contenido).
- Las normas se modifican. Revisa también si hubo derogatorias o reformas posteriores a la fecha de este kit.
- El aplicativo no sustituye la asesoría de un profesional SST con licencia ni de un abogado laboralista.

## Normas base
| Norma | Tema | Impacto en el aplicativo | Estado |
|---|---|---|---|
| Ley 1562 de 2012 | Modifica el Sistema de Riesgos Laborales; define accidente de trabajo y enfermedad laboral; adopta el término «Seguridad y Salud en el Trabajo» | Definiciones, clasificación de eventos, afiliaciones | Confirmada |
| Decreto 1072 de 2015 (Libro 2, Parte 2, Título 4, Capítulo 6) | Decreto Único Reglamentario del Sector Trabajo; obligación de implementar el SG-SST | Estructura del sistema (política, planificación, aplicación, verificación, mejora), responsabilidades, documentación y conservación | Confirmada |
| Resolución 0312 de 2019 | Estándares mínimos del SG-SST | Módulo de autoevaluación, plan de mejoramiento, indicadores mínimos | Confirmada |
| Decreto 1295 de 1994 | Organización y administración del Sistema General de Riesgos Profesionales | Reporte de accidentes de trabajo, afiliación | Confirmada (plazos: Revisar) |

## Normas por tema
| Norma | Tema | Impacto en el aplicativo | Estado |
|---|---|---|---|
| Resolución 1401 de 2007 | Investigación de incidentes y accidentes de trabajo | Módulo de investigación, equipo investigador, plazos | Confirmada (plazos: Revisar) |
| Resolución 2346 de 2007 | Evaluaciones médicas ocupacionales e historias clínicas ocupacionales | Tipos de examen, qué recibe el empleador, confidencialidad, custodia | Confirmada (contenido: Revisar; ver también modificaciones) |
| Resolución 2646 de 2008 | Factores de riesgo psicosocial en el trabajo | Batería de riesgo psicosocial, vigilancia | Confirmada |
| Resolución 652 de 2012 (modificada por la 1356 de 2012) | Comité de Convivencia Laboral | Conformación, reuniones, quejas con reserva | Confirmada la 652; la modificación: Revisar |
| Ley 1010 de 2006 | Acoso laboral | Canal de quejas y confidencialidad | Revisar |
| Decreto 1477 de 2014 | Tabla de enfermedades laborales | Catálogo para clasificar enfermedades laborales | Confirmada |
| Resolución 4272 de 2021 | Trabajo seguro en alturas | Permisos de trabajo, certificaciones, vigencias | Revisar (vigencia frente a la Resolución 1409 de 2012) |
| Resolución 40595 de 2022 (Min. Transporte) | Plan Estratégico de Seguridad Vial (PESV) | Módulo opcional si el cliente tiene flota | Revisar |
| Ley 1581 de 2012 y reglamentarios | Protección de datos personales (habeas data) | Datos de salud como datos sensibles, consentimiento, finalidad, derechos del titular | Revisar |

## Normas recientes a revisar
Se detectaron en documentos de 2026 y **no se verificó su contenido**:
- **Decreto 0728 de 2025**: adiciona un capítulo al Título 4 de la Parte 2 del Libro 2 del Decreto 1072 de 2015. Revisa qué regula.
- **Ley 2466 de 2025** (reforma laboral): revisa si afecta afiliaciones, contratistas o el SG-SST.

Búsqueda sugerida: `[nombre de la norma] texto completo Gestor Normativo Función Pública` y `SUIN-Juriscol`.

## Normas técnicas (referencia, normalmente de pago)
- **GTC 45** — Guía para la identificación de peligros y valoración de riesgos `[VERIFICAR versión vigente]`.
- **NTC 1461** — Colores y señales de seguridad `[VERIFICAR vigencia]`.
- **ISO 45001:2018** — Sistemas de gestión de SST (voluntaria; útil si el cliente busca certificación).
- **ISO 3864 / ISO 7010** — Colores y símbolos gráficos de seguridad.

## Cómo modelarla en el aplicativo
Si el producto incluye una **matriz legal**, cada fila es una entidad `requisito_legal` con: `norma`, `articulo`, `resumen_propio` (no copiar texto protegido ni inventar), `aplica` (sí/no/parcial + justificación), `responsable`, `estado_cumplimiento`, `evidencia`, `verificado_en`, `fuente_url`, `proxima_revision`. La revisión periódica genera tareas. Para el trabajo de **desarrollo**, mantén esta misma tabla en `docs/requerimientos/matriz-legal-proyecto.md` y enlázala desde cada historia con `norma_ref`.
