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
			toastr("No has seleccionado una opción");
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
							<button className="btn btn-principal" onClick={this.siguiente}>Siguiente</button>
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
		      pregunta: "belleza",
		      respuesta: "Belleza de cantina",
					opciones : ["Ni dada la quiero", "Mi complice", "La puerta negra"]
		    },
				{
		      pregunta: "amor eterno",
		      respuesta: "Amor eterno",
					opciones : ["La incondicional", "Eres", "Amor inolvidable"]
		    },
				{
		      pregunta: "carnaval",
		      respuesta: "La vida es un carnaval",
					opciones : ["Azul", "Tiene espinas el rosal", "Salsa"]
		    },
				{
		      pregunta: "celos",
		      respuesta: "Estos celos",
					opciones : ["La vaca", "El rey", "México"]
		    },
				{
		      pregunta: "compre una cantina",
		      respuesta: "Compré una cantina",
					opciones : ["Tragos de amargo licor", "Culpable o no", "Mi complice"]
		    },
				{
		      pregunta: "el rey",
		      respuesta: "El rey",
					opciones : ["Sigo siendo el rey", "Llorar y llorar", "Nadie que me comprenda"]
		    },
				{
		      pregunta: "mi complice",
		      respuesta: "Mi complice",
					opciones : ["Inolvidable", "En la cantina", "Belleza de cantina"]
		    },
				{
		      pregunta: "para que regreses",
		      respuesta: "Para que regreses",
					opciones : ["La papa", "Para que vuelvas", "La número 20"]
		    },
				{
		      pregunta: "rata de dos patas",
		      respuesta: "Rata de dos patas",
					opciones : ["Eres", "Te odio", "Tres veces te engañé"]
		    },
				{
		      pregunta: "rayando el sol",
		      respuesta: "Rayando el sol",
					opciones : ["La puerta negra", "Puerto de san blas", "Me vale"]
		    },
				{
		      pregunta: "si nos dejan",
		      respuesta: "Si nos dejan",
					opciones : ["La chica del uno", "La incondicional", "Inolvidable"]
		    },
				{
		      pregunta: "te quiero asi",
		      respuesta: "Te quiero así",
					opciones : ["Para que continuar", "A mis enemigos", "Vete ya"]
		    },
				{
		      pregunta: "y como es el",
		      respuesta: "Y cómo es él",
					opciones : ["No tengas miedo", "Tienes algo nuevo", "Amiga mía"]
		    },
				{
		      pregunta: "yo no fui",
		      respuesta: "Yo no fuí",
					opciones : ["Eslabṕn por eslabón", "Soy quien soy", "El venado"]
		    },
				{
		      pregunta: "yo soy el aventurero",
		      respuesta: "Yo soy el aventurero",
					opciones : ["Me gustan", "El mundo me importa poco", "Cumbia río"]
		    }
			],
		  2 : [
				{
		      pregunta: "belleza",
		      respuesta: "Belleza de cantina",
					opciones : ["Ni dada la quiero", "Mi complice", "La puerta negra"]
		    },
				{
		      pregunta: "amor eterno",
		      respuesta: "Amor eterno",
					opciones : ["La incondicional", "Eres", "Amor inolvidable"]
		    },
				{
		      pregunta: "carnaval",
		      respuesta: "La vida es un carnaval",
					opciones : ["Azul", "Tiene espinas el rosal", "Salsa"]
		    },
				{
		      pregunta: "celos",
		      respuesta: "Estos celos",
					opciones : ["La vaca", "El rey", "México"]
		    },
				{
		      pregunta: "compre una cantina",
		      respuesta: "Compré una cantina",
					opciones : ["Tragos de amargo licor", "Culpable o no", "Mi complice"]
		    },
				{
		      pregunta: "el rey",
		      respuesta: "El rey",
					opciones : ["Sigo siendo el rey", "Llorar y llorar", "Nadie que me comprenda"]
		    },
				{
		      pregunta: "mi complice",
		      respuesta: "Mi complice",
					opciones : ["Inolvidable", "En la cantina", "Belleza de cantina"]
		    },
				{
		      pregunta: "para que regreses",
		      respuesta: "Para que regreses",
					opciones : ["La papa", "Para que vuelvas", "La número 20"]
		    },
				{
		      pregunta: "rata de dos patas",
		      respuesta: "Rata de dos patas",
					opciones : ["Eres", "Te odio", "Tres veces te engañé"]
		    },
				{
		      pregunta: "rayando el sol",
		      respuesta: "Rayando el sol",
					opciones : ["La puerta negra", "Puerto de san blas", "Me vale"]
		    },
				{
		      pregunta: "si nos dejan",
		      respuesta: "Si nos dejan",
					opciones : ["La chica del uno", "La incondicional", "Inolvidable"]
		    },
				{
		      pregunta: "te quiero asi",
		      respuesta: "Te quiero así",
					opciones : ["Para que continuar", "A mis enemigos", "Vete ya"]
		    },
				{
		      pregunta: "y como es el",
		      respuesta: "Y cómo es él",
					opciones : ["No tengas miedo", "Tienes algo nuevo", "Amiga mía"]
		    },
				{
		      pregunta: "yo no fui",
		      respuesta: "Yo no fuí",
					opciones : ["Eslabṕn por eslabón", "Soy quien soy", "El venado"]
		    },
				{
		      pregunta: "yo soy el aventurero",
		      respuesta: "Yo soy el aventurero",
					opciones : ["Me gustan", "El mundo me importa poco", "Cumbia río"]
		    }
		  ],
			3 : [
				{
		      pregunta: "belleza",
		      respuesta: "Belleza de cantina",
					opciones : ["Ni dada la quiero", "Mi complice", "La puerta negra"]
		    },
				{
		      pregunta: "amor eterno",
		      respuesta: "Amor eterno",
					opciones : ["La incondicional", "Eres", "Amor inolvidable"]
		    },
				{
		      pregunta: "carnaval",
		      respuesta: "La vida es un carnaval",
					opciones : ["Azul", "Tiene espinas el rosal", "Salsa"]
		    },
				{
		      pregunta: "celos",
		      respuesta: "Estos celos",
					opciones : ["La vaca", "El rey", "México"]
		    },
				{
		      pregunta: "compre una cantina",
		      respuesta: "Compré una cantina",
					opciones : ["Tragos de amargo licor", "Culpable o no", "Mi complice"]
		    },
				{
		      pregunta: "el rey",
		      respuesta: "El rey",
					opciones : ["Sigo siendo el rey", "Llorar y llorar", "Nadie que me comprenda"]
		    },
				{
		      pregunta: "mi complice",
		      respuesta: "Mi complice",
					opciones : ["Inolvidable", "En la cantina", "Belleza de cantina"]
		    },
				{
		      pregunta: "para que regreses",
		      respuesta: "Para que regreses",
					opciones : ["La papa", "Para que vuelvas", "La número 20"]
		    },
				{
		      pregunta: "rata de dos patas",
		      respuesta: "Rata de dos patas",
					opciones : ["Eres", "Te odio", "Tres veces te engañé"]
		    },
				{
		      pregunta: "rayando el sol",
		      respuesta: "Rayando el sol",
					opciones : ["La puerta negra", "Puerto de san blas", "Me vale"]
		    },
				{
		      pregunta: "si nos dejan",
		      respuesta: "Si nos dejan",
					opciones : ["La chica del uno", "La incondicional", "Inolvidable"]
		    },
				{
		      pregunta: "te quiero asi",
		      respuesta: "Te quiero así",
					opciones : ["Para que continuar", "A mis enemigos", "Vete ya"]
		    },
				{
		      pregunta: "y como es el",
		      respuesta: "Y cómo es él",
					opciones : ["No tengas miedo", "Tienes algo nuevo", "Amiga mía"]
		    },
				{
		      pregunta: "yo no fui",
		      respuesta: "Yo no fuí",
					opciones : ["Eslabṕn por eslabón", "Soy quien soy", "El venado"]
		    },
				{
		      pregunta: "yo soy el aventurero",
		      respuesta: "Yo soy el aventurero",
					opciones : ["Me gustan", "El mundo me importa poco", "Cumbia río"]
		    }
			]
		}
		return config
	}
}
