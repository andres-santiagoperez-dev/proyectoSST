# HU-004 — Tablero Gerencial SG-SST y Semáforo de Estándares Mínimos (Res. 0312)

**Épica:** Épica 3 — Verificar / Indicadores · **Prioridad:** Debe · **Estado:** lista  
**Norma o fuente (`norma_ref`):** Resolución 0312 de 2019 (Estándares Mínimos del SG-SST) y Decreto 1072 de 2015, Art. 2.2.4.6.19 a 2.2.4.6.22 (Indicadores del SG-SST) `[VERIFICAR]` · **Datos sensibles:** No (Estadísticas consolidadas anonimizadas)

---

## Historia
Como **Responsable del SG-SST o miembro de la Alta Dirección**, quiero **monitorear en tiempo real el porcentaje de cumplimiento de los estándares mínimos y los indicadores de siniestralidad y bienestar en un tablero interactivo con gráficas dinámicas**, para **tomar decisiones preventivas informadas y anticipar auditorías o visitas del Ministerio del Trabajo**.

---

## Criterios de Aceptación

1. **Criterio 1: Despliegue de métricas clave y semáforo legal (Camino feliz)**
   - **Dado** que el Responsable SST o Gerente ingresa al Tablero de Control
   - **Cuando** se carga la vista del dashboard
   - **Entonces** se muestran tarjetas interactivas con:
     1. Semáforo de Autoevaluación Res. 0312 (con porcentaje ponderado y clasificación normativa: Crítico <60 %, Moderadamente aceptable 60-85 %, Aceptable >85 %).
     2. Indicadores de accidentalidad: Índice de Frecuencia (IF), Índice de Severidad (IS) e incidentes abiertos vs cerrados.
     3. Tasa de adherencia diaria al programa de Pausas Activas.

2. **Criterio 2: Interacción con la autoevaluación de estándares mínimos**
   - **Dado** que el Responsable del SG-SST califica un estándar específico (Cumple totalmente / No cumple / No aplica debidamente justificado)
   - **Cuando** modifica la calificación de un ítem
   - **Entonces** el puntaje total acumulado y el color del semáforo se recalculan instantáneamente con una animación fluida de barra de progreso y se registra en la auditoría del sistema.

3. **Criterio 3: Control de acceso al tablero (Permisos)**
   - **Dado** un colaborador con rol estándar o un visitante no autenticado
   - **Cuando** intenta acceder a la URL del tablero gerencial (`/dashboard` o `/indicadores`)
   - **Entonces** el sistema deniega el acceso y lo redirige a la pantalla pública o de su portal de usuario con el mensaje "Acceso restringido a roles administrativos".

4. **Criterio 4: Exportación ejecutiva de indicadores**
   - **Dado** que la Gerencia requiere presentar el estado ante el comité o junta
   - **Cuando** presiona «Exportar informe ejecutivo»
   - **Entonces** se descarga un resumen estructurado (imprimible o PDF limpio) en menos de 3 segundos sin desconfigurar las gráficas.

---

## Estados de Interfaz a Diseñar
* **Cargando:** Skeleton loaders para cada tarjeta KPI y gráficos.
* **Sin datos (Estado inicial):** Mensaje orientativo: "Aún no se han registrado incidentes ni evaluaciones en este periodo. Comience calificando sus estándares mínimos".
* **Filtros por periodo:** Selector de mes / trimestre / año con actualización sin recarga de pantalla.
* **Tooltip accesible:** Explicación emergente de la fórmula de cada indicador (ej. "IF = (No. de accidentes / Horas hombre trabajadas) * 240.000").

---

## Dependencias y Pruebas
* **Depende de:** Motor de fórmulas de `sst-dominio-sg-sst` y componentes de gráficos/cards.
* **Pruebas:**
  - [ ] Prueba matemática de cálculo de ponderaciones según Res. 0312 de 2019.
  - [ ] Prueba de restricción RBAC para usuarios sin perfil administrativo.
  - [ ] Prueba de contraste y visualización de gráficos sin depender exclusivamente del color (uso de texturas, etiquetas y porcentajes explícitos).

---

## Historial
| Versión | Fecha | Cambio |
|---|---|---|
| 1.0 | 2026-11-17 | Creación inicial de la historia de usuario para el MVP. |
