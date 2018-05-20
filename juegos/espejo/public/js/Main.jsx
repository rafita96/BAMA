class Main extends React.Component {
	constructor(props) {
		super(props);
		this.juego = "espejo";

		this.state = {
			inicio: false,
			fin: false,
			seleccionNivel: true,
			porcentaje: null,
		}

		this.iniciar = this.iniciar.bind(this);
		this.seleccionarNivel = this.seleccionarNivel.bind(this);
		this.terminar = this.terminar.bind(this);
		this.reiniciar = this.reiniciar.bind(this);
	}

	iniciar() {
		this.setState({
			seleccionNivel: false,
			inicio: true,
		});
	}

	reiniciar(){
        this.setState({
            inicio: false,
            fin: false,
            seleccionNivel: true,
            porcentaje: null
        });
    }

	terminar(porcentaje) {
        this.setState({
            fin: true,
            porcentaje: porcentaje
        });
    }

	seleccionarNivel(nivel) {
		this.nivel = nivel;
		this.setState({
			seleccionNivel: false
		});
	}

	render() {
		if (this.state.seleccionNivel) {
			return (
				<Bloque nombre={this.props.nombre}>
					<Nivel seleccionar={this.seleccionarNivel} />
                </Bloque>
			);
		} else if (this.state.fin) {
			return(
                <Bloque nombre={this.props.nombre}>
                    <Fin 
                    	juego={this.juego}
                        fechaInicio={this.fechaInicio} 
                        nivel={this.nivel} 
                        paciente={this.props.paciente} 
                        reiniciar={this.reiniciar} 
                        porcentaje={this.state.porcentaje} />
                </Bloque>
            );
		} else if (this.state.inicio) {
			return (
				<Bloque nombre={this.props.nombre}>
					<Ejercicio nivel={this.nivel} terminar={this.terminar}/>
				</Bloque>
			);
		} else {
			return (
				<Bloque nombre={this.props.nombre}>
					<Instrucciones
						iniciar={this.iniciar}
						instrucciones={this.props.instrucciones} />
				</Bloque>
			);
		}
	}
}

function getInfo(callback) {
    d3.json("./data/info.json", function(error, instrucciones) {
        d3.json("./meta.json", function(error, nombre) {
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
    getInfo(function(paciente, nombre, instrucciones, datos) {
        ReactDOM.render(<Main 
            paciente={paciente}
            nombre={nombre} 
            instrucciones={instrucciones}/>, document.getElementById('main'));
    })
});