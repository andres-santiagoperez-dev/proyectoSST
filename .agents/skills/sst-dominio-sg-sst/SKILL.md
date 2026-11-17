---
name: sst-dominio-sg-sst
description: "Conocimiento de dominio de Seguridad y Salud en el Trabajo (SST, SG-SST, STT) para nombrar, modelar y redactar correctamente las funciones del aplicativo: ciclo PHVA, matriz de peligros (GTC 45), plan anual de trabajo, capacitaciones, inspecciones, accidentes e incidentes (ATEL), medicina del trabajo, emergencias, COPASST o Vigía, contratistas, indicadores y autoevaluación de estándares mínimos (Resolución 0312 de 2019). Úsala siempre que el proyecto toque estos temas, cuando haya que redactar texto normativo o de interfaz sobre SST, o validar que una función corresponda a un requisito legal."
---

# Dominio SG-SST

Este skill existe para que el aplicativo hable el idioma de la SST sin inventar. Un sistema de gestión de seguridad con una norma mal citada o un cálculo mal hecho es peor que no tenerlo.

## Supuesto de país
Por defecto se asume **Colombia** (Sistema de Gestión de Seguridad y Salud en el Trabajo, SG-SST). **Confirma el país con el usuario** antes de fijar requisitos legales. Si es otro país, sustituye `references/normativa-colombia.md` por la matriz legal de ese país y conserva el resto de la estructura.

## Regla de oro: no afirmar norma sin fuente
Los artículos, plazos, porcentajes, periodos de retención y fórmulas de este skill están marcados según su certeza:
- Sin marca: estructura general bien establecida.
- `[VERIFICAR]`: cifra, plazo o umbral que debes confirmar en el texto vigente **antes** de usarlo en código, pantallas o documentos.

Cómo verificar: busca el texto vigente en fuentes oficiales (Ministerio del Trabajo, Función Pública/Gestor Normativo, SUIN-Juriscol) con la herramienta de búsqueda. Las normas cambian (por ejemplo, hubo reformas laborales en 2025), así que registra la fecha de verificación.

Cada requisito legal que se convierta en historia de usuario, regla de negocio o texto de interfaz lleva:
`norma_ref` (norma y artículo) · `verificado_en` (fecha) · `fuente_url`.

Si no pudiste verificar algo, dilo en la respuesta y deja el `[VERIFICAR]` visible. No rellenes huecos de memoria. Y recuerda al usuario que el contenido normativo debe validarlo un **profesional SST con licencia** o un abogado laboralista.

## Mapa del SG-SST (ciclo PHVA)
El detalle de módulos candidatos del aplicativo está en `references/modulos-por-phva.md`. Resumen:

| Fase | Qué cubre | Ejemplos de funciones del aplicativo |
|---|---|---|
| **Planear** | Política, objetivos, identificación de peligros y evaluación de riesgos, requisitos legales, plan anual de trabajo, recursos | Matriz de peligros, matriz legal, plan anual, presupuesto |
| **Hacer** | Gestión de la salud, de peligros y riesgos, de amenazas (emergencias), capacitación, contratistas, gestión del cambio | Inspecciones, exámenes médicos, simulacros, capacitaciones, permisos de trabajo |
| **Verificar** | Indicadores, investigación de eventos, auditoría, revisión por la alta dirección | Reporte e investigación de ATEL, tablero de indicadores, auditorías |
| **Actuar** | Acciones preventivas y correctivas, mejora continua | Gestor de hallazgos y acciones con responsable y fecha |

## Actores habituales
Empleador y alta dirección · responsable del SG-SST (profesional con licencia en SST) · COPASST o Vigía SST según tamaño `[VERIFICAR umbral]` · Comité de Convivencia Laboral · brigada de emergencias · trabajadores (dependientes, contratistas, independientes) · médico con licencia en SST / IPS · ARL · EPS · auditor.

Los permisos del aplicativo se derivan de estos roles; el detalle está en `sst-arquitectura-app`.

## Piezas del dominio que condicionan el diseño del producto
1. **Autoevaluación de estándares mínimos.** Hay tres niveles de cumplimiento según el número de trabajadores y la clase de riesgo, con un número de estándares distinto en cada uno, agrupados por fases del PHVA, con ponderaciones y una valoración final (crítico, moderadamente aceptable, aceptable). Estructura y pesos: `references/glosario-y-calculos.md` (confírmalos en la Resolución 0312 vigente antes de implementar). El aplicativo debe soportar evidencia por estándar y plan de mejoramiento.
2. **Plazos legales.** El reporte y la investigación de un accidente de trabajo tienen plazos legales `[VERIFICAR]`. Los plazos en «días hábiles» exigen un **calendario de festivos configurable**; no lo codifiques a mano.
3. **Datos de salud = datos sensibles.** Quién puede ver qué es un requisito de producto de primer nivel. El empleador, por lo general, recibe el **concepto de aptitud y las recomendaciones**, no el diagnóstico ni la historia clínica `[VERIFICAR Resolución 2346 de 2007]`. Confirma si el aplicativo lo usa la empresa o una IPS: cambia por completo lo que se puede almacenar.
4. **Conservación de registros.** Algunos registros (por ejemplo, de exámenes médicos ocupacionales) tienen periodos de conservación largos `[VERIFICAR Decreto 1072 de 2015, art. 2.2.4.6.13]`. El modelo debe permitir retención configurable y bloqueo de borrado.
5. **Trazabilidad.** Auditorías e inspecciones piden saber quién cambió qué y cuándo. Registro de auditoría inmutable desde el día uno.
6. **Contratistas y proveedores.** Son parte del alcance del SG-SST; el aplicativo debe gestionar sus documentos y su vigencia.

## Cómo redactar contenido SST
- Usa los términos del glosario (`references/glosario-y-calculos.md`). Distingue **incidente** de **accidente**, y **accidente de trabajo** de **enfermedad laboral**.
- No pongas cifras de siniestralidad reales sin fuente. En ejemplos, márcalas como *datos de ejemplo*.
- No prometas cumplimiento legal desde la interfaz («Cumple con la ley»). Di qué verificó el sistema («Autoevaluación al 87 % de los estándares aplicables»), con fecha.
- «STT» y «SST» se usan como sinónimos en este proyecto; en textos formales usa **SST** o **SG-SST**, y respeta la forma que prefiera el cliente.

## Archivos de referencia
- `references/modulos-por-phva.md` — módulos candidatos del aplicativo por fase, con usuarios y entradas/salidas.
- `references/normativa-colombia.md` — matriz de normas con estado de verificación.
- `references/glosario-y-calculos.md` — glosario, escalas de la matriz de peligros, estructura de la autoevaluación e indicadores.
