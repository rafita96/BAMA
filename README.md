# VolverAEmpezar
Rehabilitación cognitiva

/common
En esa caarpeta deben de ir las librerías que se utilizan comunmente en los diferentes juegos, por ejemplo react.js, bootstrap.
Se creó esta carpeta para no tener archivos repetidos, de igual forma pueden tener sus librerías de forma local en cada carpeta.

/juegos
Aquí se guardarán todos los juegos que se pretendan utilizar en la plataforma, y la forma de acceder a ellos es mediante la URI
localhost:8080/juegos/{nombre del juego}/
  
  /juegos/{nombre del juego}/
  Los juegos tendrán recursos locales, y para acceder a ellos de forma local se necesita poner un "." al inicio de la ruta, por
  ejemplo: ./public/js/main.js para un archivo en la carpeta public que se encuentra en la carpeta del juego 
  (/juegos/{nombre del juego}/public/), si se desea acceder a los archivos de la raíz no es necesario el ".", por ejemplo,
  /common/js/react.js

server.js
Servidor en Nodejs, se quiere mantener este programa tan general como sea posible, de forma que se puedan agregar juegos extras
sin problema, por lo tanto, se necesita tener un patron de diseño de cada juego que se quiera agregar.
