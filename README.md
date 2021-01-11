# BAMA

El sistema se divide en 2 partes independientes:
- El back-end en la carpeta [api-server/](api-server/).
- El front-end en la carpeta [client-side/](client-side/).

## Prerrequisitos

- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

## Configuración para el back-end

### Archivo .env para el back-end

Dentro de la carpeta [api-server/](api-server/), usted debe crear un archivo .env con las siguientes variables:
```
DB_HOST= 
DB=
PORT=
API_KEY=
```

### Base de datos

El back-end requiere de un servicio de base de datos basado en [MongoDB](https://docs.mongodb.com/manual/installation/).
Una vez que el servicio de mongodb se encuentre encendido, defina la variable DB_HOST en el archivo .env con la dirección del servicio de mongodb. Por ejemplo:
```
DB_HOST=mongodb://localhost:27017/
```

Ahora defina el nombre de la base de datos en el mismo archivo .env. Por ejemplo:
```
DB=bama
```

### Inicialización

Desde una terminal (BASH, powerShell, cmd, etc) entre a la carpeta [api-server/](api-server/), y ejecute el comando: 
```
npm install
```
Para descargar he instalar las librerías requeridas.

Ahora defina la variable PORT en el archivo .env para definir el puerto sobre el que se ejecutará el servicio del back-end. Por ejemplo:
```
PORT=5850
```

Este sistema es una REST API que no guarda el estado de la sesión. Por esta razón se necesita una contraseña para los tokens de acceso. Usted debe definir la variable API_KEY en el archivo .env para cifrar el token. Por ejemplo:
```
API_KEY=unacontraseñacomplicadadelongitud32
```

### Creación de un administrador

El sistema necesita un administrador para que pueda ser utilizado. Para crear el administrador usted debe ejecutar el siguiente comando en una terminal dentro de la carpeta [api-server/](api-server/):
```
node init.js
```
Posteriormente se le pedirán los datos del administrador, un usuario y una contraseña.

Este paso solamente se ejecuta cuando la base de datos es nueva y aún no existe un administrador. Después ya no es necesario ejecutarlo.

### Ejecución

Para iniciar el servicio usted debe ejecutar en una terminal, dentro de la carpeta [api-server/](api-server/), el siguiente comando:
```
node server.js
```

## Configuración para el front-end

Para que este sistema funcione se necesita que el sistema del back-end se encuentre en servicio. Este sistema fue desarrollado con el framework [NextJS](https://nextjs.org/).

### Archivo .env para el front-end

Dentro de la carpeta [client-side/](client-side/), usted debe crear un archivo .env con las siguientes variables:
```
NEXTAUTH_URL=
SERVER_URL=
APPLICATION_SECRET=
NODE_ENV=
SITE=
```

### Inicialización

Desde una terminal (BASH, powerShell, cmd, etc) entre a la carpeta [client-side/](client-side/), y ejecute el comando: 
```
npm install
```
Para descargar he instalar las librerías requeridas.

Ahora defina la variable NEXTAUTH_URL en el archiv .env. Esta variable define la dirección IP y el puerto de este sistema. Por ejemplo:
```
NEXTAUTH_URL=localhost:3000
```

A continuación defina la variable SERVER_URL que corresponde a la dirección completa donde se encuentra el servicio del back-end. Por ejemplo:
```
SERVER_URL=http://localhost:5850
```

Durante el desarrollo, la variable NODE_ENV será:
```
NODE_ENV=dev
```

En el caso de SITE, puede ser:
```
SITE=bama
```
Como este sistema guarda el token de manera local, entonces se debe cifrar por seguridad. Para esto se requiere una contraseña de cifrado. Defina la variable APPLICATION_SECRET para proteger esta información. Por ejemplo:
```
APPLICATION_SECRET=otracontraseñadificilydiferentede32
```

Por último para desarrollar y utilizar el sistema, usted debe ejecutar el siguiente comando en una terminal dentro la carpeta correspondiente:
```
npm run dev
```

### Deploy
Si usted ha terminado de desarrollar, lea la documentación de [NextJS](https://nextjs.org/) para terminar con el trabajo.

# API Endpoints

## Get /

Determina si hay comunicación con el servidor.

### Request body
```
{

}
```

### Response body 
```
{
    status: 200,
    message: "Servidor listo."
}
```

## Post /login

Determina si un usuario es válido y regresa un token de acceso.

### Request body
```
{
    username: {String},
    password: {String}
}
```

### Response body  
```
{
    status: 200,
    token: {String},
    role: {String}
}
```

El role puede ser: ROLE_ADMIN para administrador y ROLE_USER para un usuario.
Para hacer logout, usted debe eliminar el token o esperar a que caduque.

## Get /pacients/

Obtiene todos los pacientes registrados en la base de datos.

### Headers
| Variable | Valor |Descripción|
|----------|-------|-----------|
|access-token|{String}|Token de acceso obtenido en el login.|

### Request body
```
{

}
```

### Response body  
```
{
    status: {Integer},
    pacients: {Object_Array}
}
```

## Get /pacients/profile/{id}

Obtiene el perfil de un paciente. El id es el identificador el paciente en la base de datos.

### Headers
| Variable | Valor |Descripción|
|----------|-------|-----------|
|access-token|{String}|Token de acceso obtenido en el login.|

### Request body
```
{

}
```

### Response body  
```
{
    status: {Integer},
    pacient: {Object}
}
```

## Post /pacients/

Crea un nuevo paciente.

### Headers
| Variable | Valor |Descripción|
|----------|-------|-----------|
|access-token|{String}|Token de acceso obtenido en el login.|

### Request body
```
{
    name: {String},
    firstLastName: {String},
    secondLastName: {String},
    noExp: {String},
    birthday: {Date}
}
```

### Response body  
```
{
    status: {Integer},
    pacient: {String}
}
```

En pacient se encuentra el id del paciente.

## Put /pacients/

Actualiza un paciente existente.

### Headers
| Variable | Valor |Descripción|
|----------|-------|-----------|
|access-token|{String}|Token de acceso obtenido en el login.|

### Request body
```
{
    _id: {String},
    name: {String},
    firstLastName: {String},
    secondLastName: {String},
    birthday: {Date}
}
```
El _id es el identificador del paciente en la base de datos.

### Response body  
```
{
    status: {Integer},
    message: {String}
}
```

## Delete /pacients/

Elimina un paciente de la base de datos.

### Headers
| Variable | Valor |Descripción|
|----------|-------|-----------|
|access-token|{String}|Token de acceso obtenido en el login.|

### Request body
```
{
    _id: {String}
}
```
El _id es el identificador del paciente en la base de datos.

### Response body  
```
{
    status: {Integer},
    message: {String}
}
```

## Post /pacients/score

Agrega un puntaje a un paciente.

### Headers
| Variable | Valor |Descripción|
|----------|-------|-----------|
|access-token|{String}|Token de acceso obtenido en el login.|

### Request body
```
{
    _id: {String},
    score: {
        initTime: {Date},
        finishTime: {Date},
        score: {Integer (0, 100)},
        game: {String},
        gameType: {String}
    }
}
```
El _id es el identificador del paciente en la base de datos.
El score es el puntaje del paciente en el juego. El puntaje debe estar entre 0 y 100.
game es el nombre del juego, y gameType el tipo de juego. Los tipos de juego son: "M" (Memoria), "L" (Lenguaje), "O" (Orientación), "C" (Cálculo) y "P" (Praxias).

### Response body  
```
{
    status: {Integer},
    saved: {Boolean}
}
```