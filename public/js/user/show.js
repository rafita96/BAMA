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

    Consulta.get('/paciente/record/', function(record){
        var margin = { top: 50, right: 80, bottom: 50, left: 80 },
            width = Math.min(700, window.innerWidth / 4) - margin.left - margin.right,
            height = Math.min(width, window.innerHeight - margin.top - margin.bottom);

        var data = [
            { name: 'Habilidades',
                axes: [
                    {axis: 'Orientación', value: record["O"]},
                    {axis: 'Lenguaje', value: record["L"]},
                    {axis: 'Praxias', value: record["P"]},
                    {axis: 'Memoria', value: record["M"]},
                    {axis: 'Cálculo', value: record["C"]}
                ]
            }
        ];

            
        var radarChartOptions = {
          w: 360,
          h: 360,
          margin: margin,
          maxValue: 100,
          levels: 5,
          roundStrokes: true,
            format: '.0f'
        };

            
        RadarChart(".radarChart", data, radarChartOptions);
    });

    dibujarNotas();
});

function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}