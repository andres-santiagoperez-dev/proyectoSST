# Visión del Producto — SafePulse SST (Sistema Integrado de Seguridad, Salud y Bienestar en el Trabajo)

Versión: 1.0 · Fecha: 2026-11-17 · Responsable de negocio: Equipo SST / Cliente Empresarial

---

## 1. Problema
Hoy en día, la gestión del SG-SST en muchas empresas colombianas se encuentra atrapada en planillas de Excel dispersas, carpetas físicas que no garantizan la inmutabilidad de los registros ante visitas del Ministerio del Trabajo o la ARL, y una desconexión general de los colaboradores que ven la SST como un trámite engorroso. Además, las jornadas sedentarias u operativas transcurren sin recordatorios ergonómicos estructurados, aumentando el riesgo de trastornos musculoesqueléticos (DME) y fatiga laboral.

---

## 2. Usuarios y Contexto de Uso

| Rol | Qué necesita lograr | Dónde y con qué lo usa |
|---|---|---|
| **Colaborador / Trabajador (Oficina / Planta)** | Realizar pausas activas guiadas al recibir alarmas, reportar incidentes o condiciones inseguras en segundos desde su celular o puesto de trabajo. | Celular, tablet o computador de escritorio. Uso en oficina o planta física. |
| **Responsable del SG-SST (Líder SST con Licencia)** | Monitorear el estado integral del SG-SST, recibir y gestionar reportes de incidentes, parametrizar frecuencias de pausas activas, controlar conceptos de aptitud médica laboral y evaluar estándares mínimos (Res. 0312). | Computador de escritorio o portátil en oficina técnica. |
| **Alta Dirección / Gerencia** | Visualizar el avance del sistema, semáforo de cumplimiento legal (Res. 0312), tasa de accidentalidad y participación en prevención para toma de decisiones y asignación de recursos. | Pantalla de escritorio, tablet o dashboard en reuniones ejecutivas. |
| **COPASST / Vigía de SST** | Conocer los incidentes reportados para apoyar investigaciones y verificar que las medidas preventivas se implementen. | Tablet o computador de escritorio. |
| **Visitante / Público General** | Conocer el compromiso de la empresa, su Política de SST, objetivos preventivos y cultura de bienestar en el portal web corporativo interactivo. | Navegador web de escritorio o móvil (sin autenticación). |

---

## 3. Resultado Esperado
Unificar la cultura preventiva y el cumplimiento legal en una plataforma web viva, atractiva y de alta interacción. El trabajador se siente cuidado y acompañado mediante pausas activas dinámicas y herramientas ágiles de reporte; el Responsable SST ahorra horas de reportería manual y cuenta con trazabilidad fidedigna; la Gerencia cuenta con un tablero en tiempo real para anticipar riesgos y auditorías.

---

## 4. Alcance de la Primera Versión (MVP)
1. **Portal Corporativo SST Interactivo (Landing Pública):** Espacio corporativo con presentación institucional, política SST, compromisos, filosofía preventiva y acceso con animaciones distintivas.
2. **Módulo de Pausas Activas Interactivas ("Pausa Vital"):** Temporizador inteligente con alarmas programables en pantalla, rutinas animadas de estiramiento y relajación visual, y registro de participación.
3. **Reporte Ágil de Incidentes y Condiciones Inseguras:** Formulario ultrarrápido (menos de 60 segundos), captura de evidencia fotográfica (simulada o archivo), geolocalización/ubicación, y soporte offline básico.
4. **Tablero Gerencial de Indicadores SG-SST y Estándares Mínimos:** Semaforización de estándares (Resolución 0312 de 2019), indicadores de accidentalidad (Frecuencia, Severidad) y tasas de cumplimiento.
5. **Control de Conceptos de Aptitud Médica Laboral (Privacidad Res. 2346/2007):** Registro estricto de conceptos (Apto, Apto con restricciones, No apto) y vencimientos, sin diagnóstico médico.
6. **Gestor de Hallazgos y Plan de Acción:** Trazabilidad de acciones preventivas/correctivas con responsable, fecha límite y estado de cierre.

---

## 5. No-Objetivos (Fuera de Alcance del MVP)
* No almacenará historias clínicas ni diagnósticos CIE-10 (reserva legal médica exclusiva de IPS).
* No reemplaza el software médico de las IPS ni realiza prescripciones médicas.
* No incluye firma electrónica biométrica avanzada con validez criptográfica PKI (se manejará aceptación digital simple y registro de auditoría en el MVP).
* No contempla integración automática directa con ARL (Furat API) en esta fase inicial.

---

## 6. Marco Normativo
* **País:** Colombia.
* **Normativa principal aplicable:**
  * Decreto 1072 de 2015 (Libro 2, Parte 2, Título 4, Capítulo 6 — SG-SST).
  * Resolución 0312 de 2019 (Estándares Mínimos del SG-SST).
  * Resolución 1401 de 2007 (Investigación de incidentes y accidentes de trabajo).
  * Resolución 2346 de 2007 (Regulación de evaluaciones médicas ocupacionales y reserva de historia clínica).
  * Ley 1355 de 2009 (Promoción de hábitos saludables y pausas activas laborales).
* **Verificación legal:** Requiere validación por profesional SST con licencia vigente o asesor jurídico laboral antes del paso a producción definitiva.

---

## 7. Métricas de Éxito
| Métrica | Valor actual (Línea base) | Meta MVP `[PROPUESTO]` | Cómo se mide |
|---|---|---|---|
| **Tiempo promedio para reportar un incidente/condición** | 20 - 45 minutos (en formato físico o correo) | **< 60 segundos** en interfaz optimizada | Medición de tiempo entre carga del formulario y confirmación de envío. |
| **Participación en pausas activas diarias** | Desconocida / < 15 % | **> 65 %** de los trabajadores en puestos de pantalla | Registros interactivos de "Pausa completada" tras la alarma. |
| **Visibilidad de cumplimiento legal Res. 0312** | Cálculo manual anual | **100 % en tiempo real** | Tablero con actualización inmediata de porcentajes de avance. |
| **Puntaje de Accesibilidad y Rendimiento Frontend** | N/A | **Lighthouse > 90 / WCAG 2.2 AA** | Auditoría con herramientas automáticas y pruebas de teclado. |

---

## 8. Supuestos y Riesgos
* `[SUPUESTO-001]`: El cliente cuenta con un modelo de operación empresarial (sede única o múltiples sedes) y opera con personal de oficina y campo.
* `[SUPUESTO-002]`: Las notificaciones de pausas activas en el MVP funcionarán vía Web Notifications API en el navegador del usuario y alertas modales en pantalla.
* **Riesgo:** Bloqueo de notificaciones en el navegador por políticas corporativas.  
  * *Mitigación:* Alarma visual persistente integrada en la interfaz y temporizador visual visible en barra de estado.
* **Riesgo:** Confusión sobre privacidad médica.  
  * *Mitigación:* Validación estricta en el modelo de datos que impide campos de texto libre para diagnósticos de salud reservados.

---

## 9. Historial
| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 2026-11-17 | Creación inicial de la visión tras la Ronda 1 de descubrimiento. |
