
# Pulso Abierto — Consulta de criptomonedas

## Descripción
Aplicación web que permite consultar los precios de Bitcoin, Ethereum y Solana en dólares estadounidenses.

## API utilizada
- Nombre: CoinGecko
- Método: GET
- Endpoint: https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd

## Parámetros
- ids: bitcoin, ethereum, solana. Indica las criptomonedas que queremos consultar.
- vs_currencies: usd. Indica que los precios se expresan en dólares.

## Respuesta JSON
La API devuelve los nombres de las criptomonedas y sus precios.

La propiedad `usd` contiene el precio en dólares de cada criptomoneda.


## Instalación

Para instalar las dependencias del proyecto, ejecutar:

npm install

## Ejecución

Para iniciar la aplicación:

npm run dev

Luego abrir en el navegador:

http://localhost:5173/

## Verificación

Para comprobar el funcionamiento del proyecto:

npm run typecheck
npm run lint
npm run build

## Estados de la aplicación

La aplicación contempla cinco estados:

- Inicial: antes de realizar una consulta.
- Carga: mientras se obtienen los precios.
- Resultado: muestra los precios de las criptomonedas.
- Vacío: cuando no se encuentran resultados.
- Error: cuando falla la consulta y permite volver a intentar.

## Tecnologías utilizadas

- HTML5
- CSS3
- TypeScript
- Vite
- Fetch API

## Capturas

Las capturas de funcionamiento se encuentran en la carpeta capturas.
