class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inicio: false,
			fin: false,
			seleccionNivel: true,
			porcentaje: null,
		}

		this.iniciar = this.iniciar.bind(this);
		this.terminar = this.terminar.bind(this);
		this.reiniciar = this.reiniciar.bind(this);
		this.seleccionarNivel = this.seleccionarNivel.bind(this);
	}

	iniciar() {
		this.setState({
			seleccionNivel: false,
			inicio: true,
		});
		this.fechaInicio = new Date();
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
		this.fechaInicio = new Date();
	}

    render() {
    	if (this.state.seleccionNivel){
    		return (
				<Bloque nombre={this.props.nombre}>
					<Nivel seleccionar={this.seleccionarNivel} />
                </Bloque>
			);
    	}
    	else if (this.state.fin) {
			return(
                <Bloque nombre={this.props.nombre}>
                    <Fin 
                        fechaInicio={this.fechaInicio} 
                        nivel={this.nivel} 
                        paciente={this.props.paciente} 
                        reiniciar={this.reiniciar} 
                        porcentaje={this.state.porcentaje} />
                </Bloque>
            );
		}
		else if (this.state.inicio) {
			return (
				<Bloque nombre={this.props.nombre}>
					<Ejercicio nivel={this.nivel} terminar={this.terminar} datos={this.props.config} />
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