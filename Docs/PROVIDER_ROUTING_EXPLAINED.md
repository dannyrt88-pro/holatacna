# Provider Routing Explained

## Como funciona el routing paso a paso

Este documento explica el routing de providers en lenguaje simple y secuencial.

## 1. Captura del lead

Todo empieza cuando una persona completa un formulario en una landing o pagina del sistema.

El lead puede traer datos como:

- servicio
- ciudad de interes
- telefono
- mensaje
- tracking comercial

`create-lead` normaliza esos datos y prepara el lead para el routing.

## 2. Filtrado de providers

El sistema revisa la lista de providers y elimina los que no corresponden.

Solo siguen los providers que:

- estan activos
- atienden el servicio correcto
- pueden cubrir la ciudad solicitada

Despues de eso, identifica cuales ademas tienen:

- `auto_assign = true`

## 3. Calculo de senales observadas

El motor mira como se comporto el sistema recientemente.

No usa todo el historico indefinidamente.
Usa una ventana de 90 dias y calcula:

- cuantas veces un provider quedo asignado
- cuantas veces fue sugerido
- cuanto funciona bien en autoasignacion
- cuanto termina en override manual

Si por alguna razon esa parte falla, el sistema no se cae.
Simplemente sigue con valores neutrales.

## 4. Calculo del ranking hibrido

El orden final mezcla dos cosas:

### Base manual

El negocio sigue controlando:

- `priority`
- `score`

### Ajuste observado

El sistema suma o resta un pequeno ajuste segun:

- conversion de sugerido a asignado
- peso de autoasignacion
- peso de override manual

Ese ajuste no manda siempre.
Si hay poco volumen historico, pesa poco.
Si hay suficiente volumen, influye mas.

## 5. Decision final

Con el ranking final, el motor decide uno de estos caminos:

### Caso A. Hay autoasignable

- selecciona el mejor provider elegible y autoasignable
- persiste la asignacion final

### Caso B. Hay elegibles pero no autoasignables

- no autoasigna
- deja el lead en `pending_review`
- guarda sugerencia y top providers

### Caso C. No hay providers elegibles

- deja el lead pendiente
- registra razon de no elegibilidad

## 6. Que se guarda

El sistema no solo guarda el provider final.
Tambien guarda la trazabilidad minima:

- provider final
- provider sugerido
- top sugeridos
- modo de asignacion
- razon de asignacion
- si fue autoasignado o no

## 7. Que pasa si el admin corrige la asignacion

Desde dashboard, el admin puede reasignar manualmente un lead.

Cuando eso ocurre:

- cambia la asignacion final
- queda marcado como override manual
- la sugerencia original del motor se conserva

Eso permite distinguir claramente entre:

- lo que recomendo el sistema
- lo que decidio finalmente el equipo comercial

## Resumen corto

El routing hace cinco cosas:

1. recibe el lead
2. filtra providers compatibles
3. calcula senales observadas recientes
4. ordena con ranking hibrido
5. autoasigna o deja pendiente con trazabilidad
