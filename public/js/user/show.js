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

        var configBien = {
            circleColor: "#4caf50",
            textColor: "#43a047",
            waveTextColor: "#a5d6a7",
            waveColor: "#4caf50",
            waveAnimateTime: 2000,
            fillWithGradient: true,
            gradientPoints: [0.2, 0, 0.9, 1],
            gradientFromColor: "#43a047",
            gradientToColor: "#66bb6a"
        }
        var configMedio = {
            circleColor: "#facf09",
            textColor: "#ffc300",
            waveTextColor: "#fff300",
            waveColor: "#facf09",
            waveAnimateTime: 2000,
            fillWithGradient: true,
            gradientPoints: [0.2, 0, 0.9, 1],
            gradientFromColor: "#ffc300",
            gradientToColor: "#ff8633"
        }
        var configMal = {
            circleColor: "#f44336",
            textColor: "#e53935",
            waveTextColor: "#ef9a9a",
            waveColor: "#f44336",
            waveAnimateTime: 2000,
            fillWithGradient: true,
            gradientPoints: [0.2, 0, 0.9, 1],
            gradientFromColor: "#e53935",
            gradientToColor: "#ef5350"
        }

        function findConfig(record){
            if(record > 50){
                return configBien;
            }else if(record > 25){
                return configMedio;
            }
            return configMal;
        }
        d3.select("#orientacion").call(d3.liquidfillgauge, record["O"], findConfig(record["O"]));
        d3.select("#lenguaje").call(d3.liquidfillgauge, record["L"], findConfig(record["L"]));
        d3.select("#praxias").call(d3.liquidfillgauge, record["P"], findConfig(record["P"]));
        d3.select("#memoria").call(d3.liquidfillgauge, record["M"], findConfig(record["M"]));
        d3.select("#calculo").call(d3.liquidfillgauge, record["C"], findConfig(record["C"]));
    });

    // dibujarNotas();
});

function _calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}