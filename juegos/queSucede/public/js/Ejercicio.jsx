class Ejercicio extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pregunta: 0,
			aciertos: 0,
			index: null
		}
		this.numeroPreguntas = 7;
		this.siguiente = this.siguiente.bind(this);
		this.seleccionar = this.seleccionar.bind(this);
	}

	seleccionar(index) {
		this.setState({
			index: index
		});
	}

	generarEjercicios() {
		this.ejercicios = [];
		var indices = [];

		for (var i = 0; i < this.numeroPreguntas; i++) {
			var index = Math.floor(Math.random() * this.numeroPreguntas);
		}
	}

	siguiente() {
		if (this.state.index == null) {
			toastr("No has seleccionado una opción");
		} else {
			if (this.state.index == 'r') {
				this.setState({
					aciertos: this.state.aciertos + 1,
					pregunta: this.state.pregunta + 1,
					index: null
				});
			} else {
				this.setState({
					pregunta: this.state.pregunta + 1,
					index: null
				});
			}
		}
	}

	render() {
		if (this.state.pregunta > this.numeroPreguntas) {
			var porcentaje = this.state.aciertos / this.numeroPreguntas * 100
			this.props.terminar(porcentaje);
			return(<div></div>);
		} else {
			var carpeta = this.state.pregunta;
			return (
				<div>
					<div className="offset-12 text-center">
						<Img
							url={"./img/" + carpeta + "/escena.png"}
							/>
					</div>

					<div className="row mt-3">
						<div className="col-2 offset-10">
							<button className="btn btn-principal" onClick={this.siguiente}>Siguiente</button>
						</div>
					</div>
				</div>
			);
		}
	}
}