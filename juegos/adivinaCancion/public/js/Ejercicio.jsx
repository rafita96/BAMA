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
			return (
				<div>
					<div className="row text-center">
						<div className="col-12">
							<audio controls>
								<source src={'./songs/'+this.ejercicios[this.state.pregunta].pregunta+'.mp3'} type="audio/mpeg">
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
		      pregunta: "belleza",
		      respuesta: "3",
					opciones : ["1", "2", "4"]
		    },
				{
		      pregunta: "belleza",
		      respuesta: "3",
					opciones : ["1", "2", "4"]
		    },
				{
		      pregunta: "belleza",
		      respuesta: "3",
					opciones : ["1", "2", "4"]
		    },
				{
		      pregunta: "belleza",
		      respuesta: "3",
					opciones : ["1", "2", "4"]
		    },
				{
		      pregunta: "belleza",
		      respuesta: "3",
					opciones : ["1", "2", "4"]
		    },
				{
		      pregunta: "belleza",
		      respuesta: "3",
					opciones : ["1", "2", "4"]
		    },
				{
		      pregunta: "belleza",
		      respuesta: "3",
					opciones : ["1", "2", "4"]
		    },
				{
		      pregunta: "belleza",
		      respuesta: "3",
					opciones : ["1", "2", "4"]
		    }
			],
		  2 : [
		    {
		      pregunta: "3 x 5 = ",
		      respuesta: "15",
					opciones : ["8", "21", "11"]
		    },
		    {
		      pregunta: "7 x 7 = ",
		      respuesta: "49",
					opciones : ["14", "0", "59"]
		    },
		    {
		      pregunta: "60 / 5 = ",
		      respuesta: "12",
					opciones : ["3", "10", "30"]
		    },
		    {
		      pregunta: "6 x 5 = ",
		      respuesta: "30",
					opciones : ["11", "50", "60"]
		    },
		    {
		      pregunta: "108 / 12 = ",
		      respuesta: "9",
					opciones : ["7", "12", "11"]
		    },
		    {
		      pregunta: "36 / 2 = ",
		      respuesta: "18",
					opciones : ["38", "75", "11"]
		    }
		  ],
			3 : [
				{
		      pregunta: "Tenemos 182 bombones y tenemos que repartirlos entre 26 personas ¿Cuántos bombones le tocan a cada persona?",
		      respuesta: "7",
					opciones : ["6", "8", "5"]
		    },
		    {
		      pregunta: "360 / 120 =",
		      respuesta: "3",
					opciones : ["2", "120", "1"]
		    },
				{
		      pregunta: "495 / 5 = ",
		      respuesta: "99",
					opciones : ["6", "2", "4"]
		    },
		    {
		      pregunta: "11 x 12 = ",
		      respuesta: "132",
					opciones : ["112", "114", "120"]
		    },
				{
		      pregunta: "Si una docena de huevos vale 200 pesos. ¿Cuánto valen 5 docenas?",
		      respuesta: "1000",
					opciones : ["205", "12", "1200"]
		    },
		    {
		      pregunta: "Si vamos a comprar el mandado y el costo total es de 357, si pagamos con un billete de 500 ¿Cuánto nos sobrará?",
		      respuesta: "143",
					opciones : ["153", "413", "103"]
		    }
			]
		}
		return config
	}
}
