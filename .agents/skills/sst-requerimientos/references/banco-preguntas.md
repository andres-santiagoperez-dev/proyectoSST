# Banco de preguntas de descubrimiento

Contenido: Ronda 1 (marco) · Ronda 2 (usuarios y uso) · Ronda 3 (datos y privacidad) · Ronda 4 (alcance funcional) · Ronda 5 (técnica y operación) · Ronda 6 (diseño y marca)

Reglas: máximo 5 preguntas por ronda; salta las ya respondidas; ofrece una opción recomendada cuando puedas.

## Ronda 1 — Marco
1. ¿En qué país opera el aplicativo y qué normativa de SST aplica? (Por defecto: Colombia, SG-SST.)
2. ¿Quién es el cliente o dueño del producto y quién paga por él?
3. ¿Es un producto para **una sola empresa**, para **varias empresas** (multiempresa) o para una **asesora/consultora** que atiende a clientes?
4. ¿Cuál es el problema principal hoy? (hojas de Excel, papel, auditoría que se acerca, accidentes mal reportados…)
5. ¿Hay una fecha o evento que condicione el proyecto (auditoría, visita, lanzamiento)?

## Ronda 2 — Usuarios y uso
1. ¿Quiénes usarán el aplicativo? (trabajadores, jefes, responsable del SG-SST, COPASST/Vigía, médico/IPS, gerencia, auditor, contratistas)
2. ¿Dónde se usa: oficina, planta, obra, vehículo, campo abierto?
3. ¿Con qué dispositivos: celular, tablet, computador, pantalla de planta?
4. ¿Habrá conexión a internet estable en los lugares de uso? ¿Se necesita trabajar sin conexión?
5. ¿Cuántos usuarios y cuántas sedes o centros de trabajo se esperan?

## Ronda 3 — Datos y privacidad
1. ¿Se guardarán datos de salud de los trabajadores? ¿Cuáles exactamente? (concepto de aptitud, restricciones, diagnósticos, incapacidades)
2. ¿El aplicativo lo opera la empresa o una IPS/médico ocupacional? (cambia qué se puede almacenar)
3. ¿Qué datos personales se necesitan como mínimo de cada trabajador?
4. ¿Hay políticas de privacidad, tratamiento de datos o consentimientos ya definidos?
5. ¿Cuánto tiempo deben conservarse los registros y quién puede pedir su eliminación o exportación?

## Ronda 4 — Alcance funcional
1. ¿Qué módulos son indispensables en la primera versión? (ver `sst-dominio-sg-sst/references/modulos-por-phva.md`)
2. ¿Qué formatos o informes debe poder generar? (actas, informes de investigación, matriz de peligros, autoevaluación, certificados)
3. ¿Qué debe notificarse y a quién? (vencimientos, plazos legales, hallazgos sin cerrar)
4. ¿Con qué sistemas debe integrarse o de cuáles debe importar datos? (nómina, recursos humanos, ARL, ERP, control de acceso)
5. ¿Hay formatos o plantillas actuales de la empresa que deban respetarse?

## Ronda 5 — Técnica y operación
1. ¿Hay una tecnología obligada o preferida para frontend, backend, base de datos y nube?
2. ¿Dónde debe alojarse (nube del cliente, nube propia, local)?
3. ¿Quién operará y dará soporte al sistema después de entregarlo?
4. ¿Qué métodos de ingreso se esperan? (correo y contraseña, SSO corporativo, doble factor)
5. ¿Hay presupuesto o plazos que limiten el alcance?

## Ronda 6 — Diseño y marca
1. ¿Existe identidad de marca (logo, colores, tipografías) que deba respetarse?
2. ¿Qué sensación debe transmitir? (confianza, cercanía, rigor técnico, energía) ¿Hay referentes que les gusten o que quieran evitar?
3. ¿Qué pantalla tendrá más impacto en una primera impresión? (la landing, el tablero, el reporte de incidentes)
4. ¿Se mostrará en pantallas de planta o proyectores en capacitaciones?
5. ¿Qué tono de lenguaje prefieren: «usted» o «tú»?

## Cierre de cada ronda
Resume en tres bloques: **Lo que entendí · Lo que asumí `[SUPUESTO]` · Lo que necesito decidir**. Guarda el resumen en `docs/requerimientos/05-preguntas-abiertas.md`.
