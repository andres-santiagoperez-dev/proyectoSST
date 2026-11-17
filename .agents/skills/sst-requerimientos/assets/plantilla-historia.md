# HU-### — [Título corto]

**Épica:** [módulo] · **Prioridad:** [Debe / Debería / Podría / No por ahora] · **Estado:** [borrador / lista / en construcción / hecha / RETIRADA]
**Norma o fuente (`norma_ref`):** [norma y artículo, o «sin requisito legal»] · **Verificado en:** [fecha] · **Fuente:** [URL]
**Datos sensibles:** [no / sí: cuáles]

## Historia
Como **[rol]**, quiero **[acción]**, para **[resultado]**.

## Criterios de aceptación
1. **[Camino feliz]**
   - Dado [contexto]
   - Cuando [acción]
   - Entonces [resultado observable]
2. **[Caso de error]**
   - Dado …
   - Cuando …
   - Entonces …
3. **[Permisos]**
   - Dado un usuario con rol [X]
   - Cuando intenta [acción]
   - Entonces [se permite / se niega con el mensaje …]

## Estados de interfaz a diseñar
Vacío · Cargando · Error · Sin conexión · Sin permiso · Datos largos (nombres con tildes, listas de 500 ítems)

## Dependencias y preguntas abiertas
- Depende de: HU-###
- Pregunta abierta: …

## Pruebas
- [ ] Prueba de aceptación 1
- [ ] Prueba de permisos
- [ ] Prueba de accesibilidad (teclado, contraste)

## Historial
| Versión | Fecha | Cambio |
|---|---|---|

---

## Ejemplo resuelto (bórralo al usar la plantilla)

# HU-007 — Reportar un incidente desde el celular
**Épica:** Verificar / Eventos · **Prioridad:** Debe · **Estado:** lista
**Norma o fuente:** Resolución 1401 de 2007 (investigación de incidentes y accidentes) `[VERIFICAR artículo y plazos]` · **Datos sensibles:** sí (nombre del afectado, descripción de lesión)

Como **trabajador**, quiero **reportar un incidente en menos de un minuto desde mi celular, incluso sin señal**, para que el responsable del SG-SST lo conozca de inmediato y se inicie la investigación.

1. **Reporte exitoso con conexión**
   - Dado que inicié sesión y estoy en «Reportar incidente»
   - Cuando indico qué pasó, dónde y adjunto una foto opcional, y toco «Reportar incidente»
   - Entonces veo «Reportado» con un número de seguimiento y el responsable del SG-SST recibe una notificación.
2. **Reporte sin conexión**
   - Dado que no tengo conexión
   - Cuando toco «Reportar incidente»
   - Entonces el reporte se guarda en mi dispositivo con el estado «Pendiente de sincronizar» y se envía solo al volver la señal, sin perder ningún dato.
3. **Campo opcional vacío**
   - Dado que dejé en blanco un campo opcional
   - Cuando envío el reporte
   - Entonces el reporte se envía igual; un reporte incompleto es mejor que ninguno.
4. **Permisos**
   - Dado un usuario sin sesión
   - Cuando intenta abrir el formulario
   - Entonces se le pide iniciar sesión sin perder lo que había escrito.
