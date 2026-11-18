# Matriz de Trazabilidad Normativa — SafePulse SST

**Versión:** 1.0  
**Fecha de verificación normativa:** 2026-11-18  
**Verificado por:** Equipo de Desarrollo SG-SST (Búsqueda en fuentes oficiales: Gestor Normativo Función Pública, SUIN-Juriscol, MinTrabajo)  
**Validación formal requerida:** Profesional en Seguridad y Salud en el Trabajo con Licencia vigente / Abogado laboralista previo a despliegue en producción.

---

## 1. Verificaciones Normativas Resueltas para el MVP

A continuación se registran los hallazgos normativos oficiales que resuelven los puntos marcados como `[VERIFICAR]` que afectan los módulos del MVP:

### A. Evaluaciones Médicas y Confidencialidad de Salud
* **Norma vigente verificada:** **Resolución 1843 de 2025** del Ministerio del Trabajo (expedida el 25 de abril de 2025).
* **Hallazgo clave:** Derogó y reemplazó de forma definitiva la histórica **Resolución 2346 de 2007**.
* **Impacto en el MVP:**
  1. Define siete (7) tipos de evaluaciones médicas ocupacionales: Preingreso, Periódica, Egreso/Retiro, Cambio de ocupación, Post-incapacidad, Retorno laboral y Seguimiento/Control.
  2. Mantiene la estricta **reserva legal de la historia clínica ocupacional**: el empleador solo recibe el **Certificado de Aptitud Laboral** (Apto, Apto con restricciones, No apto) con sus recomendaciones/restricciones.
  3. Queda terminantemente prohibido almacenar diagnósticos médicos CIE-10 o antecedentes clínicos personales en el aplicativo del empleador.
  4. Obliga a implementar las restricciones laborales en un plazo no mayor a 20 días calendario.
* **Fuente oficial:** [Gestor Normativo / MinTrabajo - Resolución 1843 de 2025](https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=169004) · Verificado: 2026-11-18.

### B. Reporte e Investigación de Incidentes y Accidentes de Trabajo
* **Normas vigentes verificadas:**
  * **Resolución 1401 de 2007** (Artículos 4, 7 y 14).
  * **Decreto 1072 de 2015** (Art. 2.2.4.6.32) y **Decreto 1295 de 1994** (Art. 62).
* **Plazos oficiales confirmados:**
  1. **Reporte inicial a ARL y EPS:** Plazo de **dos (2) días hábiles** siguientes a la ocurrencia del accidente.
  2. **Investigación interna del evento:** Plazo de **quince (15) días calendario** siguientes a la ocurrencia para realizar la investigación mediante el equipo investigador (Jefe inmediato, representante del COPASST y Responsable SG-SST).
  3. **Remisión a la ARL (accidentes graves/mortales):** Plazo de **quince (15) días calendario** siguientes a la ocurrencia.
* **Fuente oficial:** [SUIN-Juriscol / MinProtección Social - Res. 1401 de 2007](http://www.suin-juriscol.gov.co/viewDocument.asp?id=4026365) · Verificado: 2026-11-18.

### C. Autoevaluación y Calificación de Estándares Mínimos
* **Norma vigente verificada:** **Resolución 0312 de 2019** (Artículos 27 y 28).
* **Ponderaciones PHVA confirmadas:**
  * **Planear (25%):** Recursos (10%) + Gestión Integral del SG-SST (15%).
  * **Hacer (60%):** Gestión de la Salud (20%) + Gestión de Peligros y Riesgos (30%) + Gestión de Amenazas (10%).
  * **Verificar (5%):** Verificación del SG-SST (5%).
  * **Actuar (10%):** Mejoramiento (10%).
  * **Total:** 100%.
* **Escala de valoración oficial:**
  * **< 60% — CRÍTICO:** Plan de Mejoramiento inmediato y envío a ARL en máximo 3 meses; seguimiento prioritario de MinTrabajo.
  * **60% a 85% — MODERADAMENTE ACEPTABLE:** Plan de Mejoramiento y reporte de avance a ARL en máximo 6 meses.
  * **> 85% — ACEPTABLE:** Mantener calificación y conservar evidencias en el Plan Anual de Trabajo.
* **Fuente oficial:** [Gestor Normativo Función Pública - Res. 0312 de 2019](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=90924) · Verificado: 2026-11-18.

### D. Pausas Activas y Promoción de Hábitos Saludables
* **Norma vigente verificada:** **Ley 1355 de 2009** (Artículo 5) y **Decreto 1072 de 2015** (Art. 2.2.4.6.12).
* **Obligación legal:** Implementar mecanismos para promover la actividad física y el desarrollo de pausas activas durante la jornada laboral en los programas de medicina preventiva y del trabajo.
* **Fuente oficial:** [SUIN-Juriscol - Ley 1355 de 2009](http://www.suin-juriscol.gov.co/viewDocument.asp?id=1672322) · Verificado: 2026-11-18.

---

## 2. Matriz de Trazabilidad: Norma → Requerimiento → Historia → Prueba

| Norma / Estándar | Artículo / Ítem | Obligación Legal Resumida | Aplica | Requerimiento Funcional | Historia de Usuario | Prueba Asociada | Estado de Cobertura |
|---|---|---|:---:|---|---|---|:---:|
| **Dec. 1072/2015** | Art. 2.2.4.6.5 | Definir, firmar y divulgar la Política de SST a todos los trabajadores | Sí | RF-001 (Publicación y difusión de política SST) | [HU-001](file:///c:/Users/ANDRES/Desktop/proyectoSST/docs/requerimientos/historias/HU-001-portal-corporativo-politica.md) | PT-001 (Renderizado de política, firma y accesibilidad) | **Cubierta** |
| **Ley 1355/2009 & Dec. 1072/2015** | Art. 5 Ley 1355 / Art. 2.2.4.6.12 Dec. 1072 | Promover pausas activas y descansos ergonómicos en la jornada laboral | Sí | RF-002 (Sistema de alertas periódicas y rutinas guiadas de pausas activas) | [HU-002](file:///c:/Users/ANDRES/Desktop/proyectoSST/docs/requerimientos/historias/HU-002-alarma-pausas-activas.md) | PT-002 (Temporizador, alerta Web Notifications y registro de completitud) | **Cubierta** |
| **Res. 1401/2007 & Dec. 1072/2015** | Art. 4 Res. 1401 / Art. 2.2.4.6.32 Dec. 1072 | Reporte oportuno e investigación de incidentes y accidentes en máx. 15 días calendario | Sí | RF-003 (Reporte ágil móvil/offline de incidentes con radicado y georreferenciación) | [HU-003](file:///c:/Users/ANDRES/Desktop/proyectoSST/docs/requerimientos/historias/HU-003-reporte-incidente-campo.md) | PT-003 (Envío online, persistencia offline y sincronización idempotente) | **Cubierta** |
| **Res. 0312/2019** | Art. 27 y 28 (Tabla de valores) | Autoevaluación anual con ponderación PHVA (Planear 25%, Hacer 60%, Verificar 5%, Actuar 10%) | Sí | RF-004 (Tablero semaforizado de estándares mínimos Res. 0312) | [HU-004](file:///c:/Users/ANDRES/Desktop/proyectoSST/docs/requerimientos/historias/HU-004-tablero-gerencial-indicadores.md) | PT-004 (Cálculo exacto de puntajes, clasificación crítico/medio/aceptable) | **Cubierta** |
| **Dec. 1072/2015** | Art. 2.2.4.6.19 a 2.2.4.6.22 | Medición periódica de indicadores de estructura, proceso y resultado (frecuencia, severidad) | Sí | RF-005 (Métricas de siniestralidad IF, IS e índice de resolución) | [HU-004](file:///c:/Users/ANDRES/Desktop/proyectoSST/docs/requerimientos/historias/HU-004-tablero-gerencial-indicadores.md) | PT-005 (Verificación de fórmulas de frecuencia y severidad) | **Cubierta** |
| **Res. 1843/2025** *(reemplaza Res. 2346/2007)* | Art. 4, 16 y 17 | Custodia de conceptos de aptitud laboral (7 tipos) y confidencialidad absoluta de historia clínica | Sí | RF-006 (Gestión segura de conceptos de aptitud, alertas de vencimiento, bloqueo de diagnósticos) | [HU-005](file:///c:/Users/ANDRES/Desktop/proyectoSST/docs/requerimientos/historias/HU-005-gestion-conceptos-aptitud.md) | PT-006 (Aislamiento RBAC, validación de esquema sin campos CIE-10) | **Cubierta** |
| **Dec. 1072/2015** | Art. 2.2.4.6.33 y 2.2.4.6.34 | Definir y ejecutar acciones preventivas y correctivas basadas en incidentes y autoevaluaciones | Sí | RF-007 (Gestión de hallazgos, fechas de vencimiento y verificación de eficacia) | [HU-006](file:///c:/Users/ANDRES/Desktop/proyectoSST/docs/requerimientos/historias/HU-006-plan-accion-hallazgos.md) | PT-007 (Flujo de vida del hallazgo, cálculo de días de mora y cierre restringido) | **Cubierta** |
| **Dec. 1072/2015** | Art. 2.2.4.6.13 | Conservación de registros del SG-SST durante mínimo 20 años a partir del cese de la relación laboral | Sí | RNF-007 (Políticas de archivo inmutable y retención a largo plazo) | Todas | PT-008 (Auditoría inmutable y protección contra borrado físico) | **Cubierta** |

---

## 3. Huecos Detectados y Decisiones de Alcance

| Obligación Normativa | Justificación y Decisión | Módulo / Fase Futura |
|---|---|---|
| **Transmisión de Furat en línea a ARL** (Dec. 1295/1994) | Requiere consumo de Web Services propietarios de cada ARL (Sura, Positiva, Colmena, Bolívar, AXA). **Decisión:** En el MVP se genera el radicado interno y formato imprimible para reporte manual a ARL. | Fase 2 (Post-MVP) |
| **Batería de Riesgo Psicosocial** (Res. 2646/2008 & Res. 2764/2022) | Exige aplicación exclusiva por psicólogo especialista en SST y manejo de baremos psicométricos licenciados. **Decisión:** Fuera de alcance del MVP inicial. | Fase 3 |
| **Plan Estratégico de Seguridad Vial (PESV)** (Res. 40595/2022) | Solo aplica a empresas con flota superior a 10 vehículos o que contraten conductores. **Decisión:** Módulo opcional configurable diferido. | Post-MVP |

---

## 4. Elementos sin Verificar para Validación con Profesional SST con Licencia

Los siguientes aspectos deben ser validados formalmente por el profesional SST de la empresa antes de la salida a producción:
1. **Ponderación particular de estándares según tamaño:** Validar si la empresa califica en el rango de 7, 21 o 60 estándares mínimos de acuerdo con su número de trabajadores y clasificación de riesgo en ARL (Res. 0312).
2. **Periodicidad médica específica según profesiograma:** Confirmar si algún cargo específico de la empresa expuesto a riesgo químico, ruido o alturas requiere evaluaciones periódicas anuales o semestrales según su Programa de Vigilancia Epidemiológica (PVE).
3. **Firmas y comités:** Confirmar los nombres de los miembros designados para el COPASST / Vigía de SST que firmarán digitalmente las investigaciones de incidentes.
