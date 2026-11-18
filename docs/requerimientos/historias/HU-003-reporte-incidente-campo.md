# HU-003 — Reporte Ágil de Incidentes y Condiciones Inseguras en Campo/Oficina

**Épica:** Épica 3 — Verificar / Eventos · **Prioridad:** Debe · **Estado:** lista  
**Norma o fuente (`norma_ref`):** Resolución 1401 de 2007 (Investigación de incidentes y accidentes de trabajo) y Decreto 1072 de 2015, Art. 2.2.4.6.32 `[VERIFICAR]` · **Datos sensibles:** Sí (nombre del informante/afectado, detalle del suceso)

---

## Historia
Como **colaborador en campo, planta u oficina**, quiero **reportar un incidente o una condición insegura en menos de 60 segundos desde mi celular o computador, incluso sin señal de internet**, para **alertar de inmediato al Responsable del SG-SST y prevenir accidentes graves**.

---

## Criterios de Aceptación

1. **Criterio 1: Envío de reporte en línea con confirmación inmediata (Camino feliz)**
   - **Dado** que un colaborador ingresa al formulario de reporte
   - **Cuando** selecciona la clasificación (Incidente / Condición Insegura), elige la sede/área, describe brevemente lo sucedido, adjunta una foto (opcional) y presiona «Enviar reporte»
   - **Entonces** el reporte se envía exitosamente en menos de 500 ms, recibe un número de radicado visible (ej. `REP-2026-0042`) y el estado pasa a "Reportado".

2. **Criterio 2: Operación sin conexión a internet (Offline-first)**
   - **Dado** que el usuario se encuentra en un sótano, bodega o área remota sin señal móvil
   - **Cuando** completa el formulario y presiona «Enviar reporte»
   - **Entonces** el sistema guarda el reporte en el almacenamiento local del dispositivo con el estado "Pendiente de sincronizar", le notifica al usuario que su reporte quedó a salvo y se sincroniza automáticamente apenas regrese la conexión.

3. **Criterio 3: Validación de campos obligatorios (Caso de error)**
   - **Dado** que el usuario intenta enviar el formulario sin seleccionar el tipo de evento ni el área
   - **Cuando** presiona «Enviar reporte»
   - **Entonces** los campos incompletos se resaltan en color de alerta con texto explicativo accesible y el foco salta automáticamente al primer campo requerido sin recargar la página.

4. **Criterio 4: Protección de confidencialidad en el relato**
   - **Dado** que se redacta el relato de un incidente
   - **Cuando** se almacena en el sistema
   - **Entonces** los datos de identificación personal solo son accesibles para el Responsable del SG-SST y el equipo investigador asignado (COPASST), quedando vedados para otros trabajadores o visitantes.

---

## Estados de Interfaz a Diseñar
* **Formulario listo:** Controles táctiles grandes (mínimo 44x44 px) aptos para dedos o uso con guantes.
* **Adjuntando foto:** Vista previa inmediata con botón para retirar o sustituir imagen.
* **Sin conexión:** Banner informativo superior: "Trabajando sin conexión — Tu reporte se guardará en tu teléfono".
* **Enviando:** Indicador de carga con bloqueo de doble clic.
* **Éxito:** Tarjeta verde con número de radicado y botón rápido para "Hacer otro reporte" o "Volver al inicio".

---

## Dependencias y Pruebas
* **Depende de:** Servicio de almacenamiento local (IndexedDB o localStorage) y detector de conectividad `navigator.onLine`.
* **Pruebas:**
  - [ ] Prueba de corte intencional de red (desconectar WiFi/red y verificar almacenamiento local).
  - [ ] Prueba de reconexión y sincronización automática.
  - [ ] Prueba con lector de pantalla en los mensajes de validación.

---

## Historial
| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 2026-11-17 | Creación inicial de la historia de usuario para el MVP. |
