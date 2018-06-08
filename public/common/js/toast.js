/**
* @author   Rafael Peralta Blanco <rafael.peralta.blanco@gmail.com>
*/

/**
*   Muestra un mensaje durante un tiempo determinado
*   
*   @param  {string}    texto   - Mensaje que se va a mostrar en el toast
*   @param  {int}       tiempo  - Tiempo en milisegundos que se va a mostrar el toast
*/
function toastr(texto, tiempo = 3000) {
    // Construye un div en el cual se va a mostrar el mensaje
    var x = document.createElement('div');
    x.innerHTML = texto;
    x.setAttribute("class","toast show");
    document.body.appendChild(x);

    // Después de que se cumple el tiempo de muestra se elimina el div.
    setTimeout(function(){ document.body.removeChild(x); }, tiempo);
} 