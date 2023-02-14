# MundoEstudio-Ferrari

Proyecto del curso de JavaScript en CoderHouse.

```
Link al proyecto:

https://ciroferrari.github.io/MundoEstudio-Ferrari/
```


## En qué consiste el proyecto:

- Para todos los interesados en estudiar en algún país extranjero, se ofrece la posibilidad de calcular cuánto dinero le exigirán para poder solicitar la visa de estudio. Esto varía respecto a cada país y a la cantidad de meses que se desea vivir allí.

## Cómo usar la aplicación:

- Ingresar el país que se desea consultar.
- Ingresar la cantidad de meses que se desea estudiar allí.
- Presionar en "Calcular Resultado" para obtener la información en la moneda del país solicitado.
- Presionar en "Convertir a USD" para tener una referencia en moneda dólar estadounidense.
- Presionar en "Agregar a Favoritos" para guardar la información y tenerla disponible más adelante.
- Presionar en "Borrar Favoritos" para eliminar los favoritos agregados hasta ese momento.

### Aclaración sobre monedas:
- Los valores se expresan en la moneda local de cada país, ya que es lo que exige cada país. Convertirlo a USD es sólo a modo de referencia.
- La conversión a USD se realiza mediante el consumo de una API externa que provee los ratios de conversión en tiempo real, y puede variar a cada momento.

### Aclaración sobre persistencia de la información:
- La persistencia de la información se logra mediante el uso de Local Storage.
- Al  presionar en "Borrar Favoritos" se limpia el Local Storage.

<hr>

## Librerías utilizadas:
- SweetAlert: para manejo de alertas
- Toastify: para manejo de notificaciones
- Luxon: para manejo de fechas

## API utilizadas:
- freecurrencyapi.com: Para obtener el ratio de conversión de USD a varias monedas en tiempo real.

<hr>

## Autor del proyecto:

- Franco Ciro Ferrari
