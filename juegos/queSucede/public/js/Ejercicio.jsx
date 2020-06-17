class Ejercicio extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pregunta: 0,
			aciertos: 0,
			index: null
		}
		this.numeroPreguntas = 8;
		this.generarEjercicios();
		this.siguiente = this.siguiente.bind(this);
		this.seleccionar = this.seleccionar.bind(this);
	}

	seleccionar(index) {
		this.setState({
			index: index
		});
	}

	generarEjercicios() {
		var indices = [];
		this.ejercicios = [];
		var n = this.props.datos["niveles"][this.props.nivel-1].length;
		for (var i = 0; i < this.numeroPreguntas; i++) {
			var index = Math.floor(Math.random() * n);
			while(indices.indexOf(index) != -1) {
                index = Math.floor(Math.random() * n);
            }
            indices.push(index);
			this.ejercicios.push(this.props.datos["niveles"][this.props.nivel-1][index]);
		}
	}

	siguiente() {
		if (this.state.index == null) {
			toastr("No has seleccionado una opción");
		} else {
			if (Responder(0, this.ejercicios[this.state.pregunta].carpeta, this.state.index)) {
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
		if (this.state.pregunta >= this.numeroPreguntas) {
			var porcentaje = this.state.aciertos / this.numeroPreguntas * 100
			this.props.terminar(porcentaje);
			return(<div></div>);
		} else {
			var carpeta = (this.props.nivel-1) + "/" + this.ejercicios[this.state.pregunta].carpeta;
			this.respuestas = this.ejercicios[this.state.pregunta].opciones;
			return (
				<div>
					<div className="offset-12 text-center">
						<Img
							url={"./img/" + carpeta + "/escena.png"}
							/>
					</div>
					<div className="col">
						<hr></hr>
					</div>
					<div className="row">
						<div className="offset-1 col ">
							<button onClick={() => this.seleccionar([this.respuestas[0]])} className="btn btn-success">
								{this.respuestas[0]}
							</button>
						</div>
						<div className="col ">
							<button onClick={() => this.seleccionar([this.respuestas[1]])} className="btn btn-success">
								{this.respuestas[1]}
							</button>
						</div>
						<div className="col ">
							<button onClick={() => this.seleccionar([this.respuestas[2]])} className="btn btn-success">
								{this.respuestas[2]}
							</button>
						</div>
						<div className="col ">
							<button onClick={() => this.seleccionar([this.respuestas[3]])} className="btn btn-success">
								{this.respuestas[3]}
							</button>
						</div>
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