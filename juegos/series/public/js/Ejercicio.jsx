class Ejercicio extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pregunta: 0,
			aciertos: 0,
			seleccionado: null
		}

		this.numeroPreguntas = 4; // Del 0 al 4 son 5 ejercicios
		this.generarEjercicios();
		this.siguiente = this.siguiente.bind(this);
		this.seleccionar = this.seleccionar.bind(this);
	}

	generarCadena(figura, color) {
		var cadena = figura + "_" + color;
		return cadena
	}

	generarEjercicios() {
		this.ejercicios = [];
		//config tiene la estructura config[nivel][indice].{tira,respuesta}
		var config = this.recuperarConfig()
		for (var i = 0; i < this.numeroPreguntas; i++) {

			var ejercicio = new Object();
			// En esta parte se selecciona la pregunta

			var pregunta = config[this.props.nivel].splice(Math.floor(Math.random() * config[this.props.nivel].length), 1)[0]

			// Creamos la pregunta que será mostrada al usuario.
			ejercicio.pregunta = pregunta.pregunta

			ejercicio.respuesta = pregunta.respuesta
			var opciones = pregunta.opciones
			opciones.push(ejercicio.respuesta)

			opciones = shuffle(opciones)
			ejercicio.opciones = opciones
			this.ejercicios.push(ejercicio)
		}
	}

	seleccionar(seleccionado) {
		this.setState({
			seleccionado: seleccionado
		});
	}

	siguiente() {
		if (this.state.seleccionado == null) {
			toastr("¡Usted no ha seleccionado una respuesta!");
		} else {
			if (this.state.seleccionado == this.ejercicios[this.state.pregunta].respuesta) {
				this.setState({
					aciertos: this.state.aciertos + 1,
					pregunta: this.state.pregunta + 1,
					seleccionado: null
				});
			} else {
				this.setState({
					pregunta: this.state.pregunta + 1,
					seleccionado: null
				});
			}
		}
	}

	render() {
		if (this.state.pregunta >= this.ejercicios.length) {
			var porcentaje = this.state.aciertos / this.ejercicios.length * 100;
			this.props.terminar(porcentaje);
			return (<div></div>);
		} else {
			return (
				<div>
					<div className="col-6 offset-3 text-center">
						<audio id="player" controls>
							<source src={'./data/audio.mp3'} type="audio/mpeg">
							</source>
								Your browser does not support the audio element.
						</audio>
					</div>
					<div className="row text-center">
						<div className="col-12">
							<CoverImg url={"./img/"+this.ejercicios[this.state.pregunta].pregunta + ".png"} />
						</div>
					</div>
					<div className="col-12"><hr/></div>
					<div className="row text-center">
						<div className="col">
						    <Img
						    	url={"./img/"+this.ejercicios[this.state.pregunta].opciones[0]+".png"}
						    	id={this.ejercicios[this.state.pregunta].opciones[0]}
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
						</div>

						<div className="col">
						    <Img
						    	url={"./img/"+this.ejercicios[this.state.pregunta].opciones[1]+".png"}
						    	id={this.ejercicios[this.state.pregunta].opciones[1]}
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
						</div>

						<div className="col">
						    <Img
						    	url={"./img/"+this.ejercicios[this.state.pregunta].opciones[2]+".png"}
						    	id={this.ejercicios[this.state.pregunta].opciones[2]}
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
						</div>

						<div className="col">
						    <Img
						    	url={"./img/"+this.ejercicios[this.state.pregunta].opciones[3]+".png"}
						    	id={this.ejercicios[this.state.pregunta].opciones[3]}
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
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

	recuperarConfig() {
		var config = {
			1 : [
				{
		      pregunta: "1-1",
		      respuesta: "1",
					opciones : ["3", "2", "4"]
		    },
				{
		      pregunta: "1-2",
		      respuesta: "1",
					opciones : ["8", "3", "5"]
		    },
				{
		      pregunta: "1-3",
		      respuesta: "3",
					opciones : ["5", "6", "7"]
		    },
				{
		      pregunta: "1-4",
		      respuesta: "14",
					opciones : ["16", "15", "13"]
		    },
		    {
		      pregunta: "1-5",
		      respuesta: "15",
					opciones : ["12", "13", "14"]
		    },
				{
		      pregunta: "1-6",
		      respuesta: "13",
					opciones : ["16", "14", "15"]
		    },
		    {
		      pregunta: "1-7",
		      respuesta: "14",
					opciones : ["15", "13", "16"]
		    },
				{
		      pregunta: "1-8",
		      respuesta: "14",
					opciones : ["16", "13", "15"]
		    },
		    {
		      pregunta: "1-9",
		      respuesta: "15",
					opciones : ["16", "13", "14"]
		    }
			],
		  2 : [
		    {
		      pregunta: "2-1",
		      respuesta: "9",
					opciones : ["8", "10", "11"]
		    },
		    {
		      pregunta: "2-2",
		      respuesta: "12",
					opciones : ["9", "10", "11"]
		    },
		    {
		      pregunta: "2-3",
		      respuesta: "9",
					opciones : ["12", "10", "11"]
		    },
		    {
		      pregunta: "2-4",
		      respuesta: "11",
					opciones : ["9", "10", "12"]
		    },
		    {
		      pregunta: "2-5",
		      respuesta: "10",
					opciones : ["9", "12", "11"]
		    },
		    {
		      pregunta: "2-6",
		      respuesta: "12",
					opciones : ["9", "10", "11"]
		    }
		  ],
			3 : [
				{
		      pregunta: "3-1",
		      respuesta: "8",
					opciones : ["1", "4", "5"]
		    },
		    {
		      pregunta: "3-2",
		      respuesta: "7",
					opciones : ["6", "5", "4"]
		    },
				{
		      pregunta: "3-3",
		      respuesta: "3",
					opciones : ["6", "2", "4"]
		    },
		    {
		      pregunta: "3-4",
		      respuesta: "7",
					opciones : ["6", "1", "8"]
		    },
				{
		      pregunta: "3-5",
		      respuesta: "5",
					opciones : ["7", "6", "2"]
		    },
		    {
		      pregunta: "3-6",
		      respuesta: "4",
					opciones : ["2", "3", "6"]
		    }
			]
		}
		return config
	}
}
