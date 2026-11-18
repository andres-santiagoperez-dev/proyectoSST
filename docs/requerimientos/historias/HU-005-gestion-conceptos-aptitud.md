# HU-005 — Control Seguro de Conceptos de Aptitud Médica Laboral (Privacidad Res. 2346)

**Épica:** Épica 2 — Hacer / Salud en el Trabajo · **Prioridad:** Debería · **Estado:** lista  
**Norma o fuente (`norma_ref`):** Resolución 2346 de 2007 (Evaluaciones médicas ocupacionales y reserva de historia clínica) `[VERIFICAR]` · **Datos sensibles:** Sí (Concepto laboral y restricciones operativas; estrictamente sin diagnóstico clínico)

---

## Historia
Como **Responsable del SG-SST**, quiero **registrar los conceptos de aptitud médica emitidos por la IPS ocupacional (Apto, Apto con restricciones, No apto) y monitorear sus fechas de vencimiento sin almacenar diagnósticos clínicos ni historias médicas reservadas**, para **garantizar las reubicaciones o recomendaciones ergonómicas oportunas y cumplir la estricta reserva de datos de salud**.

---

## Criterios de Aceptación

1. **Criterio 1: Registro seguro de certificado de aptitud ocupacional (Camino feliz)**
   - **Dado** que el Responsable del SG-SST recibe el certificado emitido por la IPS
   - **Cuando** registra en el aplicativo el nombre del colaborador, tipo de examen (ingreso, periódico, egreso, posincapacidad), fecha de expedición, fecha de vencimiento y concepto (*Apto*, *Apto con recomendaciones*, *Apto con restricciones* o *No apto temporal/definitivo*), e ingresa las recomendaciones laborales (ej. "pausa activa cada 45 min", "descansapiés")
   - **Entonces** el registro se guarda de forma segura, el sistema calcula los días para el próximo examen periódico y el colaborador puede consultar sus recomendaciones ergonómicas.

2. **Criterio 2: Blindaje de privacidad médica (Prohibición de diagnósticos)**
   - **Dado** cualquier formulario o endpoint del módulo de salud
   - **Cuando** se inspecciona la estructura de datos o los campos de captura
   - **Entonces** no existe ningún campo para código de diagnóstico CIE-10, anamnesis, historia clínica ni tratamiento farmacológico; el sistema rechaza y no almacena dicha información sensible.

3. **Criterio 3: Privacidad y aislamiento entre trabajadores (Permisos)**
   - **Dado** un trabajador autenticado en su perfil
   - **Cuando** ingresa a su sección de salud laboral
   - **Entonces** visualiza exclusivamente su propio concepto de aptitud y recomendaciones; no tiene acceso alguno a los datos de otros compañeros.

4. **Criterio 4: Alerta visual de exámenes periódicos próximos a vencer**
   - **Dado** que un examen periódico ocupacional tiene menos de 30 días para su vencimiento anual
   - **Cuando** el Responsable SST consulta la lista de salud
   - **Entonces** el registro se resalta con una etiqueta amarilla de advertencia "Próximo a vencer (en X días)" para gestionar la cita con la IPS.

---

## Estados de Interfaz a Diseñar
* **Lista de aptitudes:** Tabla clara con badges de estado (Verde = Apto, Azul = Con recomendaciones, Naranja = Con restricciones, Rojo = No apto).
* **Filtros rápidos:** Filtrar por "Vencidos", "Por vencer en 30 días" y "Con restricciones activas".
* **Detalle de recomendaciones:** Panel lateral deslizante accesible con las pautas ergonómicas del trabajador.

---

## Dependencias y Pruebas
* **Depende de:** Matriz de roles RBAC y módulo de autenticación.
* **Pruebas:**
  - [ ] Prueba de seguridad: verificar que un colaborador no pueda consultar IDs de otros trabajadores cambiando parámetros en la petición.
  - [ ] Verificación de auditoría: cada alta o edición de concepto genera log inmutable.

---

## Historial
| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 2026-11-17 | Creación inicial de la historia de usuario para el MVP. |
