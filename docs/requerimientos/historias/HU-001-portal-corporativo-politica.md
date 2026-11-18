# HU-001 — Portal Corporativo Interactivo y Manifiesto de Seguridad y Salud

**Épica:** Épica 0 — Portal e Identidad Transversal · **Prioridad:** Debe · **Estado:** lista  
**Norma o fuente (`norma_ref`):** Decreto 1072 de 2015, Art. 2.2.4.6.5 (Política de SST y divulgación a todos los niveles de la organización) `[VERIFICAR]` · **Datos sensibles:** No

---

## Historia
Como **colaborador o visitante del portal**, quiero **explorar la información institucional de la empresa, su política de SST firmada, objetivos preventivos y compromisos de bienestar mediante una interfaz visualmente impactante y animada**, para **comprender la cultura preventiva de la organización y acceder fácilmente a las herramientas de seguridad**.

---

## Criterios de Aceptación

1. **Criterio 1: Carga y experiencia visual del portal (Camino feliz)**
   - **Dado** que un usuario ingresa a la raíz del aplicativo web
   - **Cuando** la página inicial se carga en el navegador
   - **Entonces** se despliega el portal corporativo con navegación fluida, presentación de la empresa, la declaración de la Política de SST con fecha de vigencia y firma de la alta dirección, y accesos directos destacados para «Iniciar Pausa Activa» y «Reportar Incidente».

2. **Criterio 2: Respeto a accesibilidad de movimiento (`prefers-reduced-motion`)**
   - **Dado** que el usuario tiene activada la preferencia del sistema de movimiento reducido
   - **Cuando** navega por el portal
   - **Entonces** las transiciones complejas y efectos de scroll se sustituyen por desvanecimientos suaves o estados estáticos directos sin saltos abruptos ni pérdida de legibilidad.

3. **Criterio 3: Falla de carga de recursos o red lenta (Caso de error)**
   - **Dado** que los recursos multimedia pesados o fuentes fallan en responder
   - **Cuando** el usuario ingresa al portal
   - **Entonces** el contenido textual, la política de SST y los botones de acción se renderizan de forma inmediata con fuentes del sistema y estructura legible sin bloquear la navegación.

4. **Criterio 4: Acceso público sin requerir credenciales (Permisos)**
   - **Dado** un visitante no autenticado
   - **Cuando** visita el portal público
   - **Entonces** puede leer la información corporativa y la política de SST sin que se le exija iniciar sesión obligatoriamente.

---

## Estados de Interfaz a Diseñar
* **Vacío:** Estado con placeholders ilustrados si la empresa no ha cargado fotos corporativas.
* **Cargando:** Esqueleto (skeleton) animado de alto contraste.
* **Error:** Mensaje amigable con botón de reintento.
* **Sin conexión:** Notificación sutil "Modo sin conexión: visualizando contenido guardado en caché".
* **Sin permiso:** N/A (el portal es de acceso público).
* **Datos largos:** Soporte para textos de política extensos con colapso visual y lectura completa accesible.

---

## Dependencias y Pruebas
* **Depende de:** Estructura de diseño, tokens de diseño y componentes base.
* **Pruebas:**
  - [ ] Renderizado en 375 px, 768 px, 1280 px y 1920 px.
  - [ ] Prueba de lectura completa por lector de pantalla (etiquetas semánticas H1-H4, landmarks `header`, `main`, `footer`).
  - [ ] Verificación de contraste mínimo 4.5:1 en textos sobre fondos de seguridad.

---

## Historial
| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 2026-11-17 | Creación inicial de la historia de usuario para el MVP. |
