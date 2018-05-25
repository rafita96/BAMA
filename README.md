# Volver a empezar

Sistema de administración de pacientes con un conjunto de ejercicios y juegos para la rehabilitación cognitiva en las áreas de orientación, lenguaje, praxias, memoria y cálculo.

## Getting Started

Estas instrucciones te mostrarán como tener una copia del proyecto funcionando en tu máquina local.

### Pre-requisitos

Instalar NodeJS, npm y MongoDB correspondiente al sistema operativo.
Ojo: npm ya viene cuando se instala NodeJS

```
[NodeJS](https://nodejs.org/en/)
[MongoDB](https://www.mongodb.com/)
```

Asegurarse que el comando mongod, node y npm se puedan ejecutar en cualquier ruta desde la línea de comandos. De no ser así, por comodidad, se recomienda agregar estos comandos a las variables de entorno, sino, es necesario ejecutarlos con la ruta completa de cada comando.

### Instalación

Descargar este proyecto en una carpeta reconocible, por ejemplo, "Documentos/PIPOV2".
Existen 2 formas de descargarlo:

- El botón de download de github, o
- con git

#### El botón de download de github

Presionar el botón y esperar a que termine la descarga. Después se debe descomprimir el archivo.

#### Descarga con git

Recuerde posicionarse en la carpeta mencionada anteriormente. Ejecutar el comando en la línea de comandos

```
git clone https://github.com/rafita96/VolverAEmpezar
```

## Inicialización
Esta es la inicialización del proyecto, solamente se tiene que hacer cuando se descarga por primera vez. 
Para que estos comandos funcionen es necesario estar dentro de la carpeta VolverAEmpezar correspondiente al proyecto.

Primero hay que instalar las dependencias del sistema con el siguiente comando
```
npm install
```

En el archivo [conf.js](/src/conf.js) se encuentran los parámetros para la base de datos y las credenciales de la cuenta de administrador.

Para crear la cuenta de administrador se debe ejecutar el siguiente comando.

```
node init.js
```

### Recibir conexiones externas
Configurar el firewall en la computadora cliente para aceptar el puerto 8080.

## Ejecución del sistema

Ejecutar el comando
```
node server.js
```

Después entrar al navegador y poner la url localhost:8080.
Si se desea entrar en alguna otra computadora cliente se necesita cambiar la palabra localhost por la ip correspondiente a la computadora en la que se encuentra el servicio. No olvidar agregar el puerto 8080.