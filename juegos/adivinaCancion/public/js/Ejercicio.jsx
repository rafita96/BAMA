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
		      pregunta: "Guadalajara",
		      respuesta: "Guadalajara",
					opciones : ["A lo loco", "Ay que me vuelvo loca", "Cerezo"]
		    },
				{
		      pregunta: "Allá en el rancho grande",
		      respuesta: "Allá en el rancho grande",
					opciones : ["Alma, corazón y vida", "Ay que me vuelvo loca", "Cerezo"]
		    },
				{
		      pregunta: "Ella",
		      respuesta: "Ella",
					opciones : ["Desde Santurce a bilbao", "Cerezo", "Jambalaya"]
		    },
				{
		      pregunta: "Sombras nada más",
		      respuesta: "Sombras nada más",
					opciones : ["Eso es amor", "Alma, corazón y vida", "Jambalaya"]
		    },
				{
		      pregunta: "Cucurrucucú Paloma",
		      respuesta: "Cucurrucucú Paloma",
					opciones : ["Jambalaya", "Eso es amor", "Jambalaya"]
		    },
				{
		      pregunta: "Ay Jalisco no te rajes",
		      respuesta: "Ay Jalisco no te rajes",
					opciones : ["Jambalaya", "Eso es amor", "Madrecita"]
		    },
				{
		      pregunta: "El rey",
		      respuesta: "El rey",
					opciones : ["Madrecita", "Amor", "Belleza de cantina"]
		    },
				{
		      pregunta: "Si nos dejan",
		      respuesta: "Si nos dejan",
					opciones : ["Jambalaya", "Cereza", "La número 20"]
		    },
				{
		      pregunta: "El mariachi loco",
		      respuesta: "El mariachi loco",
					opciones : ["Eres", "Te odio", "Menudo"]
		    },
				{
		      pregunta: "Volver volver",
		      respuesta: "Volver volver",
					opciones : ["La puerta negra", "Puerto de san blas", "Madrecita"]
		    },
				{
		      pregunta: "La adelita",
		      respuesta: "La adelita",
					opciones : ["Si nos dejan", "La incondicional", "Inolvidable"]
		    },
				{
		      pregunta: "Las mañanitas",
		      respuesta: "Las mañanitas",
					opciones : ["Menudo menú", "Inolvidable", "Esto es amor"]
		    },
				{
		      pregunta: "Por tu maldito amor",
		      respuesta: "Por tu maldito amor",
					opciones : ["No tengas miedo", "Madrecita", "Amiga mía"]
		    },
				{
		      pregunta: "Cielito lindo",
		      respuesta: "Cielito lindo",
					opciones : ["Esto es amor", "Soy quien soy", "El venado"]
		    },
				{
		      pregunta: "México lindo y querido",
		      respuesta: "México lindo y querido",
					opciones : ["Me gustan", "Solamente una vez", "Santander"]
		    },
				{
		      pregunta: "El son de la negra",
		      respuesta: "El son de la negra",
					opciones : ["Tiro liro", "A lo loco", "Santander"]
		    },
		    	{
		      pregunta: "Viva México",
		      respuesta: "Viva México",
					opciones : ["El son de la negra", "La Bikina", "Cielito lindo"]
			},
				{
		      pregunta: "La Bikina",
		      respuesta: "La Bikina",
					opciones : ["La malagueña", "Viva México", "La adelita"]
			},
				{
		      pregunta: "La malagueña",
		      respuesta: "La malagueña",
					opciones : ["Pa todo el año", "Volver volver", "Si nos dejan"]
			},
				{
		      pregunta: "Pa todo el año",
		      respuesta: "Pa todo el año",
					opciones : ["Amor con amor se paga", "Rogaciano", "Ella"]
			},
				{
		      pregunta: "Amor con amor se paga",
		      respuesta: "Amor con amor se paga",
					opciones : ["La media vuelta", "Guadalajara", "El rey"]
			},
				{
		      pregunta: "No volveré",
		      respuesta: "No volveré",
					opciones : ["Allá en el rancho grande", "Te solté la rienda", "México lindo y querido"]
			},
				{
		      pregunta: "Te solté la rienda",
		      respuesta: "Te solté la rienda",
					opciones : ["Esta tristeza es mia", "El mariachi loco", "Vieja carta"]
			},
				{
		      pregunta: "La media vuelta",
		      respuesta: "La media vuelta",
					opciones : ["La mano de Dios", "Que te vaya Bonito", "Fallaste corazon"]
			},
				{
		      pregunta: "Rogaciano",
		      respuesta: "Rogaciano",
					opciones : ["La Bikina", "La Adelita", "Bala perdida"]
			},
				{
		      pregunta: "Viejos amigos",
		      respuesta: "Viejos amigos",
					opciones : ["Que padre es la vida", "Yo el aventurero", "Estos celos"]
			},
				{
		      pregunta: "Esta tristeza es mia",
		      respuesta: "Esta tristeza es mia",
					opciones : ["Sombras nada más", "Cucurrucucú Paloma", "Ay Jalisco no te rajes"]
			},
				{
		      pregunta: "Vieja carta",
		      respuesta: "Vieja carta",
					opciones : ["Si nos dejan", "No me amenaces", "Tequila con limón"]
			},
				{
		      pregunta: "Paloma querida",
		      respuesta: "Paloma querida",
					opciones : ["Vieja carta", "Tu camino y el mio", "Las rejas no matan"]
			},
				{
		      pregunta: "Tu camino y el mio",
		      respuesta: "Tu camino y el mio",
					opciones : ["Gorrioncito pecho amarillo", "Fallaste corazón", "La media vuelta"]
			},
				{
		      pregunta: "La mano de Dios",
		      respuesta: "La mano de Dios",
					opciones : ["Pobre corazón", "Que de raro tiene", "Mujeres divinas"]
			},
				{
		      pregunta: "Que te vaya bonito",
		      respuesta: "Que te vaya bonito",
					opciones : ["Le pese a quien le pese", "Sublime mujer", "Para siempre"]
			},
				{
		      pregunta: "Gorrioncito pecho amarillo",
		      respuesta: "Gorrioncito pecho amarillo",
					opciones : ["La derrota", "Mujeres divinas", "Hermoso cariño"]
			},
				{
		      pregunta: "Fallaste corazón",
		      respuesta: "Falaste corazón",
					opciones : ["Paloma querida", "Viejos amigos", "Rogaciano"]
			},
				{
		      pregunta: "Las rejas no matan",
		      respuesta: "Las rejas no matan",
					opciones : ["La malagueña", "El son de la negra", "Que te vaya bonito"]
			},
				{
		      pregunta: "Pobre corazón",
		      respuesta: "Pobre corazón",
					opciones : ["Tequila con limon", "Yo el aventurero", "Acá entre nos"]
			},
				{
		      pregunta: "Tequila con limón",
		      respuesta: "Tequila con limón",
					opciones : ["Allá en el rancho grande", "Viva México", "Gorrioncito pecho amarillo"]
			},
				{
		      pregunta: "No me amenaces",
		      respuesta: "No me amenaces",
					opciones : ["Tu camino y el mio", "Le pese a quien le pese", "Bala perdida"]
			},
				{
		      pregunta: "Yo el aventurero",
		      respuesta: "Yo el aventurero",
					opciones : ["Para siemrpe", "La derrota", "Viejos amigos"]
			},
				{
		      pregunta: "Que padre es la vida",
		      respuesta: "Que padre es la vida",
					opciones : ["Bala perdida", "La Bikina", "México lindo y querido"]
			},
				{
		      pregunta: "Bala perdida",
		      respuesta: "Bala perdida",
					opciones : ["La mano de Dios", "Tu camino y el mio", "Volver volver"]
			},
				{
		      pregunta: "Acá entre nos",
		      respuesta: "Acá entre nos",
					opciones : ["Cielito lindo", "Las mañanitas", "Si nos dejan"]
			},
				{
		      pregunta: "Estos celos",
		      respuesta: "Estos celos",
					opciones : ["El rey", "El mariachi loco", "Guadalajara"]
			},
				{
		      pregunta: "Que de raro tiene",
		      respuesta: "Que de raro tiene",
					opciones : ["Ella", "Tequila con limon", "Bala perdida"]
			},
				{
		      pregunta: "Le pese a quien le pese",
		      respuesta: "Le pese a quien le pese",
					opciones : ["Sublime mujer", "Pobre corazón", "Paloma querida"]
			},
				{
		      pregunta: "Sublime mujer",
		      respuesta: "Sublime mujer",
					opciones : ["Para siempre", "Hermoso cariño", "Mujeres divinas"]
			},
				{
		      pregunta: "Para siempre",
		      respuesta: "Para siempre",
					opciones : ["Esta tristeza es mia", "El rey", "Te solté la reinda"]
			},
				{
		      pregunta: "La derrota",
		      respuesta: "La derrota",
					opciones : ["La mano de Dios", "La Adelita", "Por tu maldito amor"]
			},
				{
		      pregunta: "Mujeres divinas",
		      respuesta: "Mujeres divinas",
					opciones : ["Rogaciano", "Cielito lindo", "Las mañanitas"]
			},
				{
		      pregunta: "Hermoso cariño",
		      respuesta: "Hermoso cariño",
					opciones : ["Ella", "Mujeres divinas", "Para siempre"]
			}
			],
		  2 : [
						{
		      pregunta: "Guadalajara",
		      respuesta: "Guadalajara",
					opciones : ["A lo loco", "Ay que me vuelvo loca", "Cerezo"]
		    },
				{
		      pregunta: "Allá en el rancho grande",
		      respuesta: "Allá en el rancho grande",
					opciones : ["Alma, corazón y vida", "Ay que me vuelvo loca", "Cerezo"]
		    },
				{
		      pregunta: "Ella",
		      respuesta: "Ella",
					opciones : ["Desde Santurce a bilbao", "Cerezo", "Jambalaya"]
		    },
				{
		      pregunta: "Sombras nada más",
		      respuesta: "Sombras nada más",
					opciones : ["Eso es amor", "Alma, corazón y vida", "Jambalaya"]
		    },
				{
		      pregunta: "Cucurrucucú Paloma",
		      respuesta: "Cucurrucucú Paloma",
					opciones : ["Jambalaya", "Eso es amor", "Jambalaya"]
		    },
				{
		      pregunta: "Ay Jalisco no te rajes",
		      respuesta: "Ay Jalisco no te rajes",
					opciones : ["Jambalaya", "Eso es amor", "Madrecita"]
		    },
				{
		      pregunta: "El rey",
		      respuesta: "El rey",
					opciones : ["Madrecita", "Amor", "Belleza de cantina"]
		    },
				{
		      pregunta: "Si nos dejan",
		      respuesta: "Si nos dejan",
					opciones : ["Jambalaya", "Cereza", "La número 20"]
		    },
				{
		      pregunta: "El mariachi loco",
		      respuesta: "El mariachi loco",
					opciones : ["Eres", "Te odio", "Menudo"]
		    },
				{
		      pregunta: "Volver volver",
		      respuesta: "Volver volver",
					opciones : ["La puerta negra", "Puerto de san blas", "Madrecita"]
		    },
				{
		      pregunta: "La adelita",
		      respuesta: "La adelita",
					opciones : ["Si nos dejan", "La incondicional", "Inolvidable"]
		    },
				{
		      pregunta: "Las mañanitas",
		      respuesta: "Las mañanitas",
					opciones : ["Menudo menú", "Inolvidable", "Esto es amor"]
		    },
				{
		      pregunta: "Por tu maldito amor",
		      respuesta: "Por tu maldito amor",
					opciones : ["No tengas miedo", "Madrecita", "Amiga mía"]
		    },
				{
		      pregunta: "Cielito lindo",
		      respuesta: "Cielito lindo",
					opciones : ["Esto es amor", "Soy quien soy", "El venado"]
		    },
				{
		      pregunta: "México lindo y querido",
		      respuesta: "México lindo y querido",
					opciones : ["Me gustan", "Solamente una vez", "Santander"]
		    },
				{
		      pregunta: "El son de la negra",
		      respuesta: "El son de la negra",
					opciones : ["Tiro liro", "A lo loco", "Santander"]
		    },
		    	{
		      pregunta: "Viva México",
		      respuesta: "Viva México",
					opciones : ["El son de la negra", "La Bikina", "Cielito lindo"]
			},
				{
		      pregunta: "La Bikina",
		      respuesta: "La Bikina",
					opciones : ["La malagueña", "Viva México", "La adelita"]
			},
				{
		      pregunta: "La malagueña",
		      respuesta: "La malagueña",
					opciones : ["Pa todo el año", "Volver volver", "Si nos dejan"]
			},
				{
		      pregunta: "Pa todo el año",
		      respuesta: "Pa todo el año",
					opciones : ["Amor con amor se paga", "Rogaciano", "Ella"]
			},
				{
		      pregunta: "Amor con amor se paga",
		      respuesta: "Amor con amor se paga",
					opciones : ["La media vuelta", "Guadalajara", "El rey"]
			},
				{
		      pregunta: "No volveré",
		      respuesta: "No volveré",
					opciones : ["Allá en el rancho grande", "Te solté la rienda", "México lindo y querido"]
			},
				{
		      pregunta: "Te solté la rienda",
		      respuesta: "Te solté la rienda",
					opciones : ["Esta tristeza es mia", "El mariachi loco", "Vieja carta"]
			},
				{
		      pregunta: "La media vuelta",
		      respuesta: "La media vuelta",
					opciones : ["La mano de Dios", "Que te vaya Bonito", "Fallaste corazon"]
			},
				{
		      pregunta: "Rogaciano",
		      respuesta: "Rogaciano",
					opciones : ["La Bikina", "La Adelita", "Bala Perdida"]
			},
				{
		      pregunta: "Viejos amigos",
		      respuesta: "Viejos amigos",
					opciones : ["Que padre es la vida", "Yo el aventurero", "Estos celos"]
			},
				{
		      pregunta: "Esta tristeza es mia",
		      respuesta: "Esta tristeza es mia",
					opciones : ["Sombras nada más", "Cucurrucucú Paloma", "Ay Jalisco no te rajes"]
			},
				{
		      pregunta: "Vieja carta",
		      respuesta: "Vieja carta",
					opciones : ["Si nos dejan", "No me amenaces", "Tequila con limón"]
			},
				{
		      pregunta: "Paloma querida",
		      respuesta: "Paloma querida",
					opciones : ["Vieja carta", "Tu camino y el mio", "Las rejas no matan"]
			},
				{
		      pregunta: "Tu camino y el mio",
		      respuesta: "Tu camino y el mio",
					opciones : ["Gorrioncito pecho amarillo", "Fallaste corazón", "La media vuelta"]
			},
				{
		      pregunta: "La mano de Dios",
		      respuesta: "La mano de Dios",
					opciones : ["Pobre corazón", "Que de raro tiene", "Mujeres divinas"]
			},
				{
		      pregunta: "Que te vaya bonito",
		      respuesta: "Que te vaya bonito",
					opciones : ["Le pese a quien le pese", "Sublime mujer", "Para siempre"]
			},
				{
		      pregunta: "Gorrioncito pecho amarillo",
		      respuesta: "Gorrioncito pecho amarillo",
					opciones : ["La derrota", "Mujeres divinas", "Hermoso cariño"]
			},
				{
		      pregunta: "Fallaste corazón",
		      respuesta: "Falaste corazón",
					opciones : ["Paloma querida", "Viejos amigos", "Rogaciano"]
			},
				{
		      pregunta: "Las rejas no matan",
		      respuesta: "Las rejas no matan",
					opciones : ["La malagueña", "El son de la negra", "Que te vaya bonito"]
			},
				{
		      pregunta: "Pobre corazón",
		      respuesta: "Pobre corazón",
					opciones : ["Tequila con limon", "Yo el aventurero", "Acá entre nos"]
			},
				{
		      pregunta: "Tequila con limón",
		      respuesta: "Tequila con limón",
					opciones : ["Allá en el rancho grande", "Viva México", "Gorrioncito pecho amarillo"]
			},
				{
		      pregunta: "No me amenaces",
		      respuesta: "No me amenaces",
					opciones : ["Tu camino y el mio", "Le pese a quien le pese", "Bala perdida"]
			},
				{
		      pregunta: "Yo el aventurero",
		      respuesta: "Yo el aventurero",
					opciones : ["Para siemrpe", "La derrota", "Viejos amigos"]
			},
				{
		      pregunta: "Que padre es la vida",
		      respuesta: "Que padre es la vida",
					opciones : ["Bala perdida", "La Bikina", "México lindo y querido"]
			},
				{
		      pregunta: "Bala perdida",
		      respuesta: "Bala perdida",
					opciones : ["La mano de Dios", "Tu camino y el mio", "Volver volver"]
			},
				{
		      pregunta: "Acá entre nos",
		      respuesta: "Acá entre nos",
					opciones : ["Cielito lindo", "Las mañanitas", "Si nos dejan"]
			},
				{
		      pregunta: "Estos celos",
		      respuesta: "Estos celos",
					opciones : ["El rey", "El mariachi loco", "Guadalajara"]
			},
				{
		      pregunta: "Que de raro tiene",
		      respuesta: "Que de raro tiene",
					opciones : ["Ella", "Tequila con limon", "Bala perdida"]
			},
				{
		      pregunta: "Le pese a quien le pese",
		      respuesta: "Le pese a quien le pese",
					opciones : ["Sublime mujer", "Pobre corazón", "Paloma querida"]
			},
				{
		      pregunta: "Sublime mujer",
		      respuesta: "Sublime mujer",
					opciones : ["Para siempre", "Hermoso cariño", "Mujeres divinas"]
			},
				{
		      pregunta: "Para siempre",
		      respuesta: "Para siempre",
					opciones : ["Esta tristeza es mia", "El rey", "Te solté la reinda"]
			},
				{
		      pregunta: "La derrota",
		      respuesta: "La derrota",
					opciones : ["La mano de Dios", "La Adelita", "Por tu maldito amor"]
			},
				{
		      pregunta: "Mujeres divinas",
		      respuesta: "Mujeres divinas",
					opciones : ["Rogaciano", "Cielito lindo", "Las mañanitas"]
			},
				{
		      pregunta: "Hermoso cariño",
		      respuesta: "Hermoso cariño",
					opciones : ["Ella", "Mujeres divinas", "Para siempre"]
			}
			],
			3 : [
						{
		      pregunta: "Guadalajara",
		      respuesta: "Guadalajara",
					opciones : ["A lo loco", "Ay que me vuelvo loca", "Cerezo"]
		    },
				{
		      pregunta: "Allá en el rancho grande",
		      respuesta: "Allá en el rancho grande",
					opciones : ["Alma, corazón y vida", "Ay que me vuelvo loca", "Cerezo"]
		    },
				{
		      pregunta: "Ella",
		      respuesta: "Ella",
					opciones : ["Desde Santurce a bilbao", "Cerezo", "Jambalaya"]
		    },
				{
		      pregunta: "Sombras nada más",
		      respuesta: "Sombras nada más",
					opciones : ["Eso es amor", "Alma, corazón y vida", "Jambalaya"]
		    },
				{
		      pregunta: "Cucurrucucú Paloma",
		      respuesta: "Cucurrucucú Paloma",
					opciones : ["Jambalaya", "Eso es amor", "Jambalaya"]
		    },
				{
		      pregunta: "Ay Jalisco no te rajes",
		      respuesta: "Ay Jalisco no te rajes",
					opciones : ["Jambalaya", "Eso es amor", "Madrecita"]
		    },
				{
		      pregunta: "El rey",
		      respuesta: "El rey",
					opciones : ["Madrecita", "Amor", "Belleza de cantina"]
		    },
				{
		      pregunta: "Si nos dejan",
		      respuesta: "Si nos dejan",
					opciones : ["Jambalaya", "Cereza", "La número 20"]
		    },
				{
		      pregunta: "El mariachi loco",
		      respuesta: "El mariachi loco",
					opciones : ["Eres", "Te odio", "Menudo"]
		    },
				{
		      pregunta: "Volver volver",
		      respuesta: "Volver volver",
					opciones : ["La puerta negra", "Puerto de san blas", "Madrecita"]
		    },
				{
		      pregunta: "La adelita",
		      respuesta: "La adelita",
					opciones : ["Si nos dejan", "La incondicional", "Inolvidable"]
		    },
				{
		      pregunta: "Las mañanitas",
		      respuesta: "Las mañanitas",
					opciones : ["Menudo menú", "Inolvidable", "Esto es amor"]
		    },
				{
		      pregunta: "Por tu maldito amor",
		      respuesta: "Por tu maldito amor",
					opciones : ["No tengas miedo", "Madrecita", "Amiga mía"]
		    },
				{
		      pregunta: "Cielito lindo",
		      respuesta: "Cielito lindo",
					opciones : ["Esto es amor", "Soy quien soy", "El venado"]
		    },
				{
		      pregunta: "México lindo y querido",
		      respuesta: "México lindo y querido",
					opciones : ["Me gustan", "Solamente una vez", "Santander"]
		    },
				{
		      pregunta: "El son de la negra",
		      respuesta: "El son de la negra",
					opciones : ["Tiro liro", "A lo loco", "Santander"]
		    },
		    	{
		      pregunta: "Viva México",
		      respuesta: "Viva México",
					opciones : ["El son de la negra", "La Bikina", "Cielito lindo"]
			},
				{
		      pregunta: "La Bikina",
		      respuesta: "La Bikina",
					opciones : ["La malagueña", "Viva México", "La adelita"]
			},
				{
		      pregunta: "La malagueña",
		      respuesta: "La malagueña",
					opciones : ["Pa todo el año", "Volver volver", "Si nos dejan"]
			},
				{
		      pregunta: "Pa todo el año",
		      respuesta: "Pa todo el año",
					opciones : ["Amor con amor se paga", "Rogaciano", "Ella"]
			},
				{
		      pregunta: "Amor con amor se paga",
		      respuesta: "Amor con amor se paga",
					opciones : ["La media vuelta", "Guadalajara", "El rey"]
			},
				{
		      pregunta: "No volveré",
		      respuesta: "No volveré",
					opciones : ["Allá en el rancho grande", "Te solté la rienda", "México lindo y querido"]
			},
				{
		      pregunta: "Te solté la rienda",
		      respuesta: "Te solté la rienda",
					opciones : ["Esta tristeza es mia", "El mariachi loco", "Vieja carta"]
			},
				{
		      pregunta: "La media vuelta",
		      respuesta: "La media vuelta",
					opciones : ["La mano de Dios", "Que te vaya Bonito", "Fallaste corazon"]
			},
				{
		      pregunta: "Rogaciano",
		      respuesta: "Rogaciano",
					opciones : ["La Bikina", "La Adelita", "Bala Perdida"]
			},
				{
		      pregunta: "Viejos amigos",
		      respuesta: "Viejos amigos",
					opciones : ["Que padre es la vida", "Yo el aventurero", "Estos celos"]
			},
				{
		      pregunta: "Esta tristeza es mia",
		      respuesta: "Esta tristeza es mia",
					opciones : ["Sombras nada más", "Cucurrucucú Paloma", "Ay Jalisco no te rajes"]
			},
				{
		      pregunta: "Vieja carta",
		      respuesta: "Vieja carta",
					opciones : ["Si nos dejan", "No me amenaces", "Tequila con limón"]
			},
				{
		      pregunta: "Paloma querida",
		      respuesta: "Paloma querida",
					opciones : ["Vieja carta", "Tu camino y el mio", "Las rejas no matan"]
			},
				{
		      pregunta: "Tu camino y el mio",
		      respuesta: "Tu camino y el mio",
					opciones : ["Gorrioncito pecho amarillo", "Fallaste corazón", "La media vuelta"]
			},
				{
		      pregunta: "La mano de Dios",
		      respuesta: "La mano de Dios",
					opciones : ["Pobre corazón", "Que de raro tiene", "Mujeres divinas"]
			},
				{
		      pregunta: "Que te vaya bonito",
		      respuesta: "Que te vaya bonito",
					opciones : ["Le pese a quien le pese", "Sublime mujer", "Para siempre"]
			},
				{
		      pregunta: "Gorrioncito pecho amarillo",
		      respuesta: "Gorrioncito pecho amarillo",
					opciones : ["La derrota", "Mujeres divinas", "Hermoso cariño"]
			},
				{
		      pregunta: "Fallaste corazón",
		      respuesta: "Falaste corazón",
					opciones : ["Paloma querida", "Viejos amigos", "Rogaciano"]
			},
				{
		      pregunta: "Las rejas no matan",
		      respuesta: "Las rejas no matan",
					opciones : ["La malagueña", "El son de la negra", "Que te vaya bonito"]
			},
				{
		      pregunta: "Pobre corazón",
		      respuesta: "Pobre corazón",
					opciones : ["Tequila con limon", "Yo el aventurero", "Acá entre nos"]
			},
				{
		      pregunta: "Tequila con limón",
		      respuesta: "Tequila con limón",
					opciones : ["Allá en el rancho grande", "Viva México", "Gorrioncito pecho amarillo"]
			},
				{
		      pregunta: "No me amenaces",
		      respuesta: "No me amenaces",
					opciones : ["Tu camino y el mio", "Le pese a quien le pese", "Bala perdida"]
			},
				{
		      pregunta: "Yo el aventurero",
		      respuesta: "Yo el aventurero",
					opciones : ["Para siemrpe", "La derrota", "Viejos amigos"]
			},
				{
		      pregunta: "Que padre es la vida",
		      respuesta: "Que padre es la vida",
					opciones : ["Bala perdida", "La Bikina", "México lindo y querido"]
			},
				{
		      pregunta: "Bala perdida",
		      respuesta: "Bala perdida",
					opciones : ["La mano de Dios", "Tu camino y el mio", "Volver volver"]
			},
				{
		      pregunta: "Acá entre nos",
		      respuesta: "Acá entre nos",
					opciones : ["Cielito lindo", "Las mañanitas", "Si nos dejan"]
			},
				{
		      pregunta: "Estos celos",
		      respuesta: "Estos celos",
					opciones : ["El rey", "El mariachi loco", "Guadalajara"]
			},
				{
		      pregunta: "Que de raro tiene",
		      respuesta: "Que de raro tiene",
					opciones : ["Ella", "Tequila con limon", "Bala perdida"]
			},
				{
		      pregunta: "Le pese a quien le pese",
		      respuesta: "Le pese a quien le pese",
					opciones : ["Sublime mujer", "Pobre corazón", "Paloma querida"]
			},
				{
		      pregunta: "Sublime mujer",
		      respuesta: "Sublime mujer",
					opciones : ["Para siempre", "Hermoso cariño", "Mujeres divinas"]
			},
				{
		      pregunta: "Para siempre",
		      respuesta: "Para siempre",
					opciones : ["Esta tristeza es mia", "El rey", "Te solté la reinda"]
			},
				{
		      pregunta: "La derrota",
		      respuesta: "La derrota",
					opciones : ["La mano de Dios", "La Adelita", "Por tu maldito amor"]
			},
				{
		      pregunta: "Mujeres divinas",
		      respuesta: "Mujeres divinas",
					opciones : ["Rogaciano", "Cielito lindo", "Las mañanitas"]
			},
				{
		      pregunta: "Hermoso cariño",
		      respuesta: "Hermoso cariño",
					opciones : ["Ella", "Mujeres divinas", "Para siempre"]
			}
			]
		}
		return config
	}
}
