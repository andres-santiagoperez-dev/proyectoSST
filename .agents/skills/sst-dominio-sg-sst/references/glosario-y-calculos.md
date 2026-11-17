# Glosario y cálculos del dominio SST

Contenido: 1. Glosario · 2. Matriz de peligros (GTC 45) · 3. Autoevaluación de estándares mínimos · 4. Indicadores · 5. Reglas para implementar cálculos

> Todo lo marcado `[VERIFICAR]` se recuerda de conocimiento general y debe confirmarse en el texto vigente antes de implementarlo. Los cálculos normativos se implementan con pruebas automáticas (ver `sst-arquitectura-app`).

## 1. Glosario (uso consistente en código, UI y documentos)

| Término | Significado práctico |
|---|---|
| **SST / SG-SST / STT** | Seguridad y Salud en el Trabajo / Sistema de Gestión de la SST. «STT» se acepta como sinónimo informal. |
| **Peligro** | Fuente, situación o acto con potencial de causar daño. |
| **Riesgo** | Combinación de la probabilidad de que ocurra un evento peligroso y la severidad de sus consecuencias. |
| **Incidente** | Evento relacionado con el trabajo que no causó lesión o daño, pero tuvo el potencial de causarlo («casi accidente»). |
| **Accidente de trabajo (AT)** | Suceso repentino por causa o con ocasión del trabajo que produce lesión, perturbación, invalidez o muerte. Definición legal en la Ley 1562 de 2012 `[VERIFICAR artículo y texto]`. |
| **Enfermedad laboral (EL)** | Contraída por la exposición a factores de riesgo inherentes a la actividad laboral o al medio en que se trabaja. Ley 1562 de 2012 y tabla del Decreto 1477 de 2014 `[VERIFICAR]`. |
| **ATEL** | Accidentes de trabajo y enfermedades laborales, en conjunto. |
| **Condición insegura / acto inseguro** | Términos tradicionales. Úsalos con cuidado: tienden a culpar a la persona. Prefiere describir la **condición** y la **causa**. |
| **Control** | Medida para eliminar o reducir un riesgo (ver jerarquía de controles). |
| **EPP** | Elementos de protección personal; última barrera en la jerarquía de controles. |
| **Hallazgo** | Desviación o condición detectada en una inspección o auditoría. |
| **Acción correctiva / preventiva / de mejora** | Respuestas a hallazgos o eventos, con responsable, fecha y verificación de eficacia. |
| **Examen médico ocupacional** | Evaluación médica ligada al trabajo (ingreso, periódico, egreso, y otros por cambio de ocupación o reintegro) `[VERIFICAR tipos en Res. 2346 de 2007]`. |
| **Concepto de aptitud** | Resultado que recibe el empleador (apto, apto con restricciones, no apto…) sin el diagnóstico `[VERIFICAR]`. |
| **PVE** | Programa de vigilancia epidemiológica (p. ej. ruido, riesgo osteomuscular, psicosocial). |
| **COPASST / Vigía SST** | Instancia de participación de los trabajadores; Vigía en empresas pequeñas `[VERIFICAR umbral]`. |
| **Brigada de emergencias** | Grupo entrenado para responder a emergencias. |
| **LOTO** | Bloqueo y etiquetado de energías peligrosas durante mantenimiento. |
| **Permiso de trabajo** | Autorización formal para tareas de alto riesgo (alturas, espacios confinados, trabajo en caliente). |
| **Ausentismo** | Ausencia al trabajo por incapacidad médica u otras causas, medida en días. |
| **ARL / EPS / IPS** | Administradora de Riesgos Laborales / Entidad Promotora de Salud / Institución Prestadora de Servicios de Salud. |

## 2. Matriz de peligros — GTC 45 `[VERIFICAR contra la norma vigente]`

**Clasificación de peligros:** biológico · físico · químico · psicosocial · biomecánico · condiciones de seguridad · fenómenos naturales.

**Valoración (esquema conocido):**
- Nivel de deficiencia (ND): muy alto 10 · alto 6 · medio 2 · bajo (sin valor asignado).
- Nivel de exposición (NE): continua 4 · frecuente 3 · ocasional 2 · esporádica 1.
- Nivel de probabilidad: **NP = ND × NE**.
- Nivel de consecuencia (NC): mortal o catastrófico 100 · muy grave 60 · grave 25 · leve 10.
- Nivel de riesgo: **NR = NP × NC**.
- Aceptabilidad: I (NR 4000–600) no aceptable · II (500–150) no aceptable o aceptable con control específico · III (120–40) mejorable · IV (≤ 20) aceptable.

**Jerarquía de controles** (de más a menos eficaz): eliminación · sustitución · controles de ingeniería · controles administrativos (incluye señalización y advertencias) · equipos y elementos de protección personal.

Implicación de producto: guardar la **versión de la escala** usada en cada valoración y permitir recalcular.

## 3. Autoevaluación de estándares mínimos (Res. 0312 de 2019) `[VERIFICAR todo este apartado]`

Estructura conocida:
- **Tres niveles** según trabajadores y clase de riesgo: hasta 10 trabajadores con riesgo I, II o III → **7** estándares; de 11 a 50 trabajadores con riesgo I, II o III → **21** estándares; más de 50 trabajadores, o riesgo IV o V → **60** estándares.
- Los estándares se agrupan por fase del ciclo (Planear, Hacer, Verificar, Actuar), con **ponderaciones por fase** (recuerdo 25 / 60 / 5 / 10 %).
- **Valoración final:** crítico (< 60 %), moderadamente aceptable (60–85 %), aceptable (> 85 %). Cada valoración trae consecuencias (plan de mejoramiento, reporte a la ARL, posibles visitas del Ministerio del Trabajo).
- Cada ítem se marca cumple / no cumple / **no aplica** (este último exige justificación).

Qué debe guardar el aplicativo: nivel aplicable y por qué · lista de estándares con peso · estado por ítem · evidencia adjunta · justificación de «no aplica» · puntaje por fase y total · valoración · plan de mejoramiento derivado · versión de la resolución usada · fecha y responsable.

## 4. Indicadores `[VERIFICAR fórmulas y constantes en la Res. 0312 vigente]`

El Decreto 1072 de 2015 pide indicadores de **estructura, proceso y resultado**; la Resolución 0312 lista indicadores mínimos. Fórmulas conceptuales conocidas:

| Indicador | Fórmula conceptual |
|---|---|
| Frecuencia de accidentalidad | (N.º de AT del periodo ÷ N.º de trabajadores del periodo) × 100 |
| Severidad de accidentalidad | ((Días de incapacidad por AT + días cargados) ÷ N.º de trabajadores) × 100 |
| Mortalidad por AT | (AT mortales del año ÷ total de AT del año) × 100 |
| Prevalencia de enfermedad laboral | (Casos nuevos y antiguos de EL ÷ promedio de trabajadores) × 100 000 |
| Incidencia de enfermedad laboral | (Casos nuevos de EL ÷ promedio de trabajadores) × 100 000 |
| Ausentismo por causa médica | (Días de ausencia por incapacidad ÷ días de trabajo programados) × 100 |

## 5. Reglas para implementar cálculos normativos
1. **Definición versionada**: guarda fórmula, constante y versión de la norma con cada medición; si la norma cambia, no se reescribe el histórico.
2. **Pruebas con casos dorados**: al menos tres casos calculados a mano por un profesional SST para cada indicador y para la autoevaluación.
3. **Redondeo y periodos** documentados (mes, año, acumulado). Define qué pasa con denominador cero.
4. **Plazos en días hábiles**: usa un calendario de festivos configurable, no una lista fija en el código.
5. **Muestra siempre la definición** del indicador junto a su valor (ver `sst-ui-accesibilidad-campo`).
