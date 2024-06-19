# Aplicacion de gestion para Bibliotecas para Practicas Profesionalizantes

Esta aplicacion cuenta con un monorepo con dos paquetes (cliente y servidor)
Esto significa que se pueden instalar las dependencias y correr el servidor todo desde la raiz.

### Tecnologias necesarias:

- NodeJS y MongoDB, links de descarga: [Descarga NodeJS](https://nodejs.org/en) | [Descarga MongoDB](https://www.mongodb.com/try/download/community)

### Guia de instalacion y uso:

- En la carpeta raiz ejecuta el comando `npm i`

- Crea un archivo .env en la carpeta Raiz y completa las siguientes variables de entorno: `PORT` , `PORT_SERVER` y `MONGO_URL_CONNECTION` ejemplos para estas variables pueden ser: `PORT=3000` , `PORT_SERVER=3000` y `MONGO_URL_CONNECTION="mongodb://127.0.0.1:27017/biblioteca"`

- Una vez instalados los paquetes y declaradas las variables de entorno en la carpeta raiz del proyecto ejecuta el comando `npm run dev`
