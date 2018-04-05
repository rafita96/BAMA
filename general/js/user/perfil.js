// Agrega la funcion de poner en mayusculas las primeras letras a todas las
// cadenas de caracteres
String.prototype.capitalize = function() {

    return this.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');;
} 

// Muestra el nombre del paciente actual
function mostrarPerfil(usuario){
    $("#paciente_actual").text(usuario["nombre"].capitalize()+" "+
                                usuario["aPaterno"].capitalize()+" "+
                                usuario["aMaterno"].capitalize());
}