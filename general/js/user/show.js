$(document).ready(function() {
    getPacienteActual(function(data){
        if(data != null){
            mostrarPerfil(data);

            var fechaNacimiento = data["fechaNacimiento"].split("/");
            var fecha = new Date(fechaNacimiento[2], fechaNacimiento[1], fechaNacimiento[0]);
            var edad = _calculateAge(fecha);
            $("#edad").text(edad);
        }else{
            $("#paciente_actual").text("No hay un paciente seleccionado.");
        }
    });
});

function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}