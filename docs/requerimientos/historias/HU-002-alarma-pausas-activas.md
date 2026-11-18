# HU-002 — Sistema Inteligente de Alarmas y Guía Animada de Pausas Activas ("Pausa Vital")

**Épica:** Épica 2 — Hacer / Salud en el Trabajo · **Prioridad:** Debe (Requerimiento estrella del cliente) · **Estado:** lista  
**Norma o fuente (`norma_ref`):** Ley 1355 de 2009, Art. 5 (Promoción de actividad física y pausas activas en el ámbito laboral) y Decreto 1072 de 2015, Art. 2.2.4.6.12 (Medicina preventiva y del trabajo) `[VERIFICAR]` · **Datos sensibles:** No

---

## Historia
Como **colaborador en jornada laboral**, quiero **recibir alarmas programadas en mi pantalla para realizar pausas activas con ejercicios ergonómicos guiados y animados**, para **prevenir la fatiga física y visual, reducir el riesgo osteomuscular y registrar mi participación en el SG-SST**.

---

## Criterios de Aceptación

1. **Criterio 1: Activación y disparo de la alarma de pausa activa (Camino feliz)**
   - **Dado** que el usuario tiene activo el temporizador de pausas (ej. configurado a 60 minutos)
   - **Cuando** el contador llega a cero
   - **Entonces** se despliega una alerta visual interactiva no obstructiva acompañada de una notificación web y una campanada suave opcional, invitando al colaborador a iniciar la «Pausa Vital».

2. **Criterio 2: Guía interactiva y animada de ejercicios ergonómicos**
   - **Dado** que el colaborador acepta la alarma e inicia la rutina
   - **Cuando** avanza por la sesión de 3 a 5 minutos
   - **Entonces** la interfaz muestra ilustraciones animadas paso a paso con cuenta regresiva para cada ejercicio (descanso ocular 20-20-20, estiramiento cervical, movilidad de muñecas/túnel carpiano y estiramiento lumbar).

3. **Criterio 3: Registro de participación en métricas de bienestar**
   - **Dado** que el colaborador finaliza la rutina
   - **Cuando** pulsa «Completar pausa activa»
   - **Entonces** se incrementa el contador personal de pausas del día, se emite una animación de felicitación y el sistema registra el evento para el indicador de participación global del SG-SST.

4. **Criterio 4: Opción de posponer (Caso de flexibilidad operativa)**
   - **Dado** que la alarma se dispara en medio de una tarea urgente o llamada
   - **Cuando** el usuario pulsa «Posponer 5 minutos»
   - **Entonces** la alerta se minimiza y vuelve a sonar exactamente 5 minutos después sin cancelar la rutina diaria.

5. **Criterio 5: Operación con sonido deshabilitado o movimiento reducido**
   - **Dado** que el usuario se encuentra en una sala de silencio o con preferencia `prefers-reduced-motion`
   - **Cuando** se dispara o ejecuta la pausa
   - **Entonces** la alarma opera en modo 100% visual y las guías de ejercicios se exhiben mediante secuencias de pasos estáticas claras sin animaciones oscilantes.

---

## Estados de Interfaz a Diseñar
* **Temporizador activo:** Barra de progreso minimalista visible en la cabecera o esquina inferior.
* **Alarma en pantalla:** Modal de alerta con llamado a la acción prioritario ("Comenzar Pausa" / "Posponer").
* **Rutina en progreso:** Pantalla completa o tarjeta expandida con animación del ejercicio, tiempo restante y botón siguiente/finalizar.
* **Completado:** Estado de éxito con tarjeta de resumen ("¡Gran trabajo! Llevas 2 de 2 pausas hoy").
* **Silenciado:** Indicador claro de audio desactivado.

---

## Dependencias y Pruebas
* **Depende de:** Motor de animaciones (GSAP / CSS animado) y Web Notifications API.
* **Pruebas:**
  - [ ] Prueba de precisión del temporizador en segundo plano.
  - [ ] Prueba de control de audio (activar / silenciar sonido de campana).
  - [ ] Control por teclado (tecla Escape para posponer, Enter para iniciar).

---

## Historial
| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 2026-11-17 | Creación inicial atendiendo requerimiento específico del cliente. |
