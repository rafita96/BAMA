class Ejercicio extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pregunta: 0,
			aciertos: 0,
			dificultad: "",
			limite: 0,
			temporal: 0,
			index: null
		}

		this.numeroPreguntas = 5;
		this.cargarNiveles();
		this.generarEjercicios();
		this.siguiente = this.siguiente.bind(this);
		this.seleccionar = this.seleccionar.bind(this);
	}

	seleccionar(index) {
		this.setState({
			index: index
		});
	}

	cargarNiveles(){
		if (this.props.nivel == 1) {this.state.dificultad = "Facil"; this.state.temporal = 0;}
		else if (this.props.nivel == 2) {this.state.dificultad = "Mediano"; this.state.temporal = 1;}
		else if (this.props.nivel == 3) {this.state.dificultad = "Dificil"; this.state.temporal = 2;}
	}

    
    
	generarEjercicios() {
		var indices = [];
		this.ejercicios = [];
		for (var i = 0; i < this.numeroPreguntas; i++) {
			var index = Math.floor(Math.random() * 16);
			while(indices.indexOf(index) != -1) { index = Math.floor(Math.random() * 16); }
			indices.push(index);
			if (this.state.dificultad == "Facil" ) this.ejercicios.push(this.props.datos["niveles"][0][index]);
			else if (this.state.dificultad == "Mediano") this.ejercicios.push(this.props.datos["niveles"][1][index]);
			else this.ejercicios.push(this.props.datos["niveles"][2][index]);
		}
	}

	siguiente() {
		if (this.state.index == null) toastr("¡Usted no ha seleccionado una respuesta!");
		else {
			this.setState({
				pregunta: this.state.pregunta + 1,
				limite: this.state.limite + 1,
				index: null
			});
			if (Responder(this.state.temporal, this.ejercicios[this.state.pregunta].carpeta, this.state.index))
				this.setState({aciertos: this.state.aciertos + 1});
		}
	}

	render() {
		if (this.state.limite >= this.numeroPreguntas) {
			var porcentaje = this.state.aciertos / this.numeroPreguntas * 100
			this.props.terminar(porcentaje);
			return(<div></div>);
		}
		else {
			var carpeta = this.ejercicios[this.state.pregunta].carpeta;
			this.respuestas = this.ejercicios[this.state.pregunta].opciones;
			return (
				<div>
					<div className="col-6 offset-3 text-center">
						<audio id="player" controls>
							<source src={'./data/audio.mp3'} type="audio/mpeg">
							</source>
								Your browser does not support the audio element.
						</audio>
					</div>
					<div className="offset-12 text-center">
						<Img
							url={"./img/" + this.state.dificultad + "/" + carpeta + "/escena.png"}
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
							<button className="btn btn-principal btn-lg" onClick={this.siguiente}>Siguiente</button>
						</div>
					</div>
				</div>
			);
		}
	}
}