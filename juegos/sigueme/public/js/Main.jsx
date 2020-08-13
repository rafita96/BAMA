class Main extends React.Component{
    constructor(props){
        super(props);

        this.constantes = {
            "instrucciones":0,
            "niveles": 1,
            "ejercicio": 2,
            "fin": 3,
            "pausar": 4
        }

        this.state = {
            estado: this.constantes["niveles"],
            // estado: this.constantes["ejercicio"],
            porcentaje: null
        }

        this.verNiveles = this.verNiveles.bind(this);
        this.comenzar = this.comenzar.bind(this);
        this.seleccionarNivel = this.seleccionarNivel.bind(this);
        this.finalizar = this.finalizar.bind(this);
        this.reiniciar = this.reiniciar.bind(this);
        this.pausar = this.pausar.bind(this);
    }

    verNiveles(){
        this.setState({
            estado: this.constantes["niveles"]
        });
    }

    comenzar(){
        this.setState({
            estado: this.constantes["ejercicio"]
        });
    }

    seleccionarNivel(nivel){
        this.nivel = nivel;
        this.setState({
            estado: this.constantes["instrucciones"]
        });
        this.fechaInicio = new Date();
    }

    finalizar(porcentaje){
        this.porcentaje = porcentaje;
        this.setState({
            estado: this.constantes["fin"]
        });
    }

    reiniciar(){
        this.setState({
            estado: this.constantes["instrucciones"]
        })
    }

    pausar(instrucciones){
        this.instrucciones = instrucciones;
        this.setState({
            estado: this.constantes["pausar"]
        });
    }

    continuar(){
        this.setState({
            estado: this.constantes["ejercicio"]
        });
    }

    render(){

        switch(this.state.estado){

          case this.constantes["niveles"]:
              return(
                  <Bloque nombre={this.props.nombre}>
                      <Nivel
                          seleccionar={this.seleccionarNivel}
                      />
                  </Bloque>
                  );
              break;

            case this.constantes["instrucciones"]:
                return(
                    <Bloque nombre={this.props.nombre}>
                        <Instrucciones
                        instrucciones={this.props.instrucciones}
                        iniciar={this.comenzar}
                        />
                    </Bloque>
                    );
                break;

            case this.constantes["ejercicio"]:
                return(
                    <Bloque nombre={this.props.nombre}>
                        <Ejercicio
                            nivel={this.nivel}
                            fin={this.finalizar}
                            pausar={this.pausar} />
                    </Bloque>
                    );
                break;

            case this.constantes["fin"]:
                return(
                    <Bloque nombre={this.props.nombre}>
                        <Fin
                            juego="sigueme"
                            fechaInicio={this.fechaInicio}
                            nivel={this.nivel}
                            paciente={this.props.paciente}
                            reiniciar={this.reiniciar}
                            porcentaje={this.porcentaje} />
                    </Bloque>
                    );
                break;

            case this.constantes["pausar"]:
                return(
                    <Bloque nombre={this.props.nombre}>
                        <Pausa
                            instrucciones={this.instrucciones}
                            continuar={this.continuar} />
                    </Bloque>
                    );
                break;
        }
    }
}



function getInfo(callback){
    d3.json("./data/info.json", function(error, instrucciones){
        d3.json("./meta.json", function(error, nombre){
            Consulta.get('/paciente/actual/', function(data) {
                if (data["id"] != null) {
                    mostrarPerfil(data);
                    callback(data["id"],nombre["nombre"], instrucciones["instrucciones"]);
                } else {
                    toastr("No has seleccionado un paciente");
                }
            });
        });
    });
}

$(document).ready(function(){
    getInfo(function(paciente,nombre,instrucciones,datos){

        ReactDOM.render(<Main
            paciente={paciente}
            nombre={nombre}
            instrucciones={instrucciones}/>, document.getElementById('main'));
    })
});
