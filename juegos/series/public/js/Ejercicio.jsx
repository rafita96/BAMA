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
		for (var i = 0; i < this.numeroPreguntas; i++) {

			var ejercicio = new Object();
			// En esta parte se selecciona la pregunta
			var config = this.recuperarConfig()
			var pregunta = config[this.props.nivel].splice(Math.floor(Math.random() * config[this.props.nivel].length), 1)[0];

			// Creamos la pregunta que será mostrada al usuario.
			ejercicio.pregunta = pregunta.pregunta;

			// El primer nivel será la respuesta del mismo color
			// y las opciones de un solo color diferente.
			if (this.props.nivel == 1) {
				var lim_inf = 9;
				var opciones = [];
				for (var j = 0; j < 4; j++) {
					var opcion = lim_inf+j;
					opciones.push(opcion);
				}
			} else if (this.props.nivel == 2) {
				// El segundo nivel se mostrará la respuesta del mismo color
				// y las opciones de varios colores diferentes.
				ejercicio.respuesta = pregunta.respuesta;
				var opciones = [];
				for (var j = 0; j < 3; j++) {
					var opcion = Math.floor(Math.random() * (config[this.props.nivel].length-1))+1;
					while(opciones.includes(opcion) || opcion == ejercicio.respuesta){
						opcion = Math.floor(Math.random() * (config[this.props.nivel].length-1))+1;
					}
					opciones.push(opcion);
				}
				opciones.push(ejercicio.respuesta);
			} else if (this.props.nivel == 3) {
				// El tercer nivel son todos los colores aleatorios
				var color_respuesta = colores.splice(Math.floor(Math.random() * colores.length), 1)[0];
				var respuesta = this.generarCadena(figura_pregunta, color_respuesta);
				ejercicio.respuesta = respuesta;
				var opciones = [];
				for (var j = 0; j < 3; j++) {
					var figura = figuras.splice(Math.floor(Math.random() * figuras.length), 1)[0];
					var color = colores.splice(Math.floor(Math.random() * colores.length), 1)[0];
					var opcion = this.generarCadena(figura, color);
					opciones.push(opcion);
				}
				opciones.push(ejercicio.respuesta);
			}
			opciones = shuffle(opciones);
			ejercicio.opciones = opciones;
			this.ejercicios.push(ejercicio);
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
							<Img url={"./img/"+this.ejercicios[this.state.pregunta].pregunta + ".png"} />
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
		      pregunta: "tira7",
		      respuesta: "9"
		    },
				{
		      pregunta: "tira8",
		      respuesta: "9"
		    },
				{
		      pregunta: "tira9",
		      respuesta: "9"
		    },
				{
		      pregunta: "tira10",
		      respuesta: "11"
		    },
				{
		      pregunta: "tira11",
		      respuesta: "10"
		    },
				{
		      pregunta: "tira12",
		      respuesta: "12"
		    },
			],
		  2 : [
		    {
		      pregunta: "tira1",
		      respuesta: "1"
		    },
		    {
		      pregunta: "tira2",
		      respuesta: "1"
		    },
		    {
		      pregunta: "tira3",
		      respuesta: "5"
		    },
		    {
		      pregunta: "tira4",
		      respuesta: "3"
		    },
		    {
		      pregunta: "tira5",
		      respuesta: "3"
		    },
		    {
		      pregunta: "tira6",
		      respuesta: "8"
		    }
		  ]
		}
		return config
	}
}
