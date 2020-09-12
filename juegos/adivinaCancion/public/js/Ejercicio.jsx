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
		// En esta parte se selecciona la pregunta
		var config = this.recuperarConfig()
		for (var i = 0; i < this.numeroPreguntas; i++) {

			var ejercicio = new Object();

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
			var audio = $("#player")
			if(audio[0] != undefined){
				audio[0].pause()
				audio[0].load()
			}
			return (
				<div>
					<div className="row text-center">
						<div className="col-12">
							<audio id="player" controls>
								<source src={'./songs/'+this.ejercicios[this.state.pregunta].pregunta+this.props.nivel+'.mp3'} type="audio/mpeg">
								</source>
									Your browser does not support the audio element.
							</audio>
						</div>
					</div>
					<div className="col-12"><hr/></div>
					<div className="row text-center">
						<div className="col">
						    <Img
						    	url={this.ejercicios[this.state.pregunta].opciones[0]}
						    	id={this.ejercicios[this.state.pregunta].opciones[0]}
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
						</div>

						<div className="col">
						    <Img
						    	url={this.ejercicios[this.state.pregunta].opciones[1]}
						    	id={this.ejercicios[this.state.pregunta].opciones[1]}
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
						</div>

						<div className="col">
						    <Img
						    	url={this.ejercicios[this.state.pregunta].opciones[2]}
						    	id={this.ejercicios[this.state.pregunta].opciones[2]}
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
						</div>

						<div className="col">
						    <Img
						    	url={this.ejercicios[this.state.pregunta].opciones[3]}
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
		      pregunta: "alma corazon y vida",
		      respuesta: "Alma, corazón y vida",
					opciones : ["A lo loco", "Ay que me vuelvo loca", "Cerezo"]
		    },
				{
		      pregunta: "a lo loco",
		      respuesta: "A lo loco",
					opciones : ["Alma, corazón y vida", "Ay que me vuelvo loca", "Cerezo"]
		    },
				{
		      pregunta: "ay que me vuelvo loca",
		      respuesta: "Ay que me vuelvo loca",
					opciones : ["Desde Santurce a bilbao", "Cerezo", "Jambalaya"]
		    },
				{
		      pregunta: "cerezo",
		      respuesta: "Cerezo",
					opciones : ["Eso es amor", "Alma, corazón y vida", "Jambalaya"]
		    },
				{
		      pregunta: "desde santurce a bilbao",
		      respuesta: "Desde santurce a bilbao",
					opciones : ["Jambalaya", "Eso es amor", "Jambalaya"]
		    },
				{
		      pregunta: "eso es amor",
		      respuesta: "Eso es amor",
					opciones : ["Jambalaya", "Eso es amor", "Madrecita"]
		    },
				{
		      pregunta: "jambalaya",
		      respuesta: "Jambalaya",
					opciones : ["Madrecita", "Amor", "Belleza de cantina"]
		    },
				{
		      pregunta: "madrecita",
		      respuesta: "Madrecita",
					opciones : ["Jambalaya", "Cereza", "La número 20"]
		    },
				{
		      pregunta: "menudo menu",
		      respuesta: "Menudo menú",
					opciones : ["Eres", "Te odio", "Menudo"]
		    },
				{
		      pregunta: "mi ovejita lucera",
		      respuesta: "Mi ovejita lucera",
					opciones : ["La puerta negra", "Puerto de san blas", "Madrecita"]
		    },
				{
		      pregunta: "piel canela",
		      respuesta: "Piel canela",
					opciones : ["Si nos dejan", "La incondicional", "Inolvidable"]
		    },
				{
		      pregunta: "que bonita es barcelona",
		      respuesta: "Que bonita es barcelona",
					opciones : ["Menudo menú", "Inolvidable", "Esto es amor"]
		    },
				{
		      pregunta: "santander",
		      respuesta: "Santander",
					opciones : ["No tengas miedo", "Madrecita", "Amiga mía"]
		    },
				{
		      pregunta: "solamente una vez",
		      respuesta: "Solamente una vez",
					opciones : ["Esto es amor", "Soy quien soy", "El venado"]
		    },
				{
		      pregunta: "tiro liro",
		      respuesta: "Tiro liro",
					opciones : ["Me gustan", "Solamente una vez", "Santander"]
		    },
				{
		      pregunta: "yo te dire",
		      respuesta: "Yo te diré",
					opciones : ["Tiro liro", "A lo loco", "Santander"]
		    }
			],
		  2 : [
				{
		      pregunta: "alma corazon y vida",
		      respuesta: "Alma, corazón y vida",
					opciones : ["A lo loco", "Ay que me vuelvo loca", "Cerezo"]
		    },
				{
		      pregunta: "a lo loco",
		      respuesta: "A lo loco",
					opciones : ["Alma, corazón y vida", "Ay que me vuelvo loca", "Cerezo"]
		    },
				{
		      pregunta: "ay que me vuelvo loca",
		      respuesta: "Ay que me vuelvo loca",
					opciones : ["Desde Santurce a bilbao", "Cerezo", "Jambalaya"]
		    },
				{
		      pregunta: "cerezo",
		      respuesta: "Cerezo",
					opciones : ["Eso es amor", "Alma, corazón y vida", "Jambalaya"]
		    },
				{
		      pregunta: "desde santurce a bilbao",
		      respuesta: "Desde santurce a bilbao",
					opciones : ["Jambalaya", "Eso es amor", "Jambalaya"]
		    },
				{
		      pregunta: "eso es amor",
		      respuesta: "Eso es amor",
					opciones : ["Jambalaya", "Eso es amor", "Madrecita"]
		    },
				{
		      pregunta: "jambalaya",
		      respuesta: "Jambalaya",
					opciones : ["Madrecita", "Amor", "Belleza de cantina"]
		    },
				{
		      pregunta: "madrecita",
		      respuesta: "Madrecita",
					opciones : ["Jambalaya", "Cereza", "La número 20"]
		    },
				{
		      pregunta: "menudo menu",
		      respuesta: "Menudo menú",
					opciones : ["Eres", "Te odio", "Menudo"]
		    },
				{
		      pregunta: "mi ovejita lucera",
		      respuesta: "Mi ovejita lucera",
					opciones : ["La puerta negra", "Puerto de san blas", "Madrecita"]
		    },
				{
		      pregunta: "piel canela",
		      respuesta: "Piel canela",
					opciones : ["Si nos dejan", "La incondicional", "Inolvidable"]
		    },
				{
		      pregunta: "que bonita es barcelona",
		      respuesta: "Que bonita es barcelona",
					opciones : ["Menudo menú", "Inolvidable", "Esto es amor"]
		    },
				{
		      pregunta: "santander",
		      respuesta: "Santander",
					opciones : ["No tengas miedo", "Madrecita", "Amiga mía"]
		    },
				{
		      pregunta: "solamente una vez",
		      respuesta: "Solamente una vez",
					opciones : ["Esto es amor", "Soy quien soy", "El venado"]
		    },
				{
		      pregunta: "tiro liro",
		      respuesta: "Tiro liro",
					opciones : ["Me gustan", "Solamente una vez", "Santander"]
		    },
				{
		      pregunta: "yo te dire",
		      respuesta: "Yo te diré",
					opciones : ["Tiro liro", "A lo loco", "Santander"]
		    }
			],
			3 : [
				{
		      pregunta: "alma corazon y vida",
		      respuesta: "Alma, corazón y vida",
					opciones : ["A lo loco", "Ay que me vuelvo loca", "Cerezo"]
		    },
				{
		      pregunta: "a lo loco",
		      respuesta: "A lo loco",
					opciones : ["Alma, corazón y vida", "Ay que me vuelvo loca", "Cerezo"]
		    },
				{
		      pregunta: "ay que me vuelvo loca",
		      respuesta: "Ay que me vuelvo loca",
					opciones : ["Desde Santurce a bilbao", "Cerezo", "Jambalaya"]
		    },
				{
		      pregunta: "cerezo",
		      respuesta: "Cerezo",
					opciones : ["Eso es amor", "Alma, corazón y vida", "Jambalaya"]
		    },
				{
		      pregunta: "desde santurce a bilbao",
		      respuesta: "Desde santurce a bilbao",
					opciones : ["Jambalaya", "Eso es amor", "Jambalaya"]
		    },
				{
		      pregunta: "eso es amor",
		      respuesta: "Eso es amor",
					opciones : ["Jambalaya", "Eso es amor", "Madrecita"]
		    },
				{
		      pregunta: "jambalaya",
		      respuesta: "Jambalaya",
					opciones : ["Madrecita", "Amor", "Belleza de cantina"]
		    },
				{
		      pregunta: "madrecita",
		      respuesta: "Madrecita",
					opciones : ["Jambalaya", "Cereza", "La número 20"]
		    },
				{
		      pregunta: "menudo menu",
		      respuesta: "Menudo menú",
					opciones : ["Eres", "Te odio", "Menudo"]
		    },
				{
		      pregunta: "mi ovejita lucera",
		      respuesta: "Mi ovejita lucera",
					opciones : ["La puerta negra", "Puerto de san blas", "Madrecita"]
		    },
				{
		      pregunta: "piel canela",
		      respuesta: "Piel canela",
					opciones : ["Si nos dejan", "La incondicional", "Inolvidable"]
		    },
				{
		      pregunta: "que bonita es barcelona",
		      respuesta: "Que bonita es barcelona",
					opciones : ["Menudo menú", "Inolvidable", "Esto es amor"]
		    },
				{
		      pregunta: "santander",
		      respuesta: "Santander",
					opciones : ["No tengas miedo", "Madrecita", "Amiga mía"]
		    },
				{
		      pregunta: "solamente una vez",
		      respuesta: "Solamente una vez",
					opciones : ["Esto es amor", "Soy quien soy", "El venado"]
		    },
				{
		      pregunta: "tiro liro",
		      respuesta: "Tiro liro",
					opciones : ["Me gustan", "Solamente una vez", "Santander"]
		    },
				{
		      pregunta: "yo te dire",
		      respuesta: "Yo te diré",
					opciones : ["Tiro liro", "A lo loco", "Santander"]
		    }
			]
		}
		return config
	}
}
