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

	generarAleatorio (min, max) { return Math.floor(Math.random() * (max - min + 1) + min) }

	randomBool () { return Math.random() >= 0.5	}

	generarOpcion (min, max) {
		var operadores = ['+', '-', 'x', '➗']
		if (this.props.nivel == 1) return (this.randomBool()) ? '+' : '-'
		else if (this.props.nivel == 2) return (this.randomBool()) ? 'x' : '➗'
		else if (this.props.nivel == 3) return operadores[this.generarAleatorio(0,3)]
	}

	generarOpciones (respuesta) {
		let opciones = []
			for(var j=0; j<3; j++) {
				let opcion = this.generarAleatorio(1,10)
				var propiedad = this.randomBool() ? '+' : '-'
				opcion = (propiedad == '+') ? respuesta + opcion : respuesta - opcion
				opciones.push(opcion)
			}
			opciones.push(respuesta)
		return opciones
	}

	generarEjercicios () {
		this.ejercicios = [];
		// Config tiene la estructura config [nivel] [indice]. { tira, respuesta }
		// En esta parte se selecciona la pregunta
		for (var i=0; i<this.numeroPreguntas; i++) {
			var ejercicio = new Object();
			switch (this.props.nivel) {
				//Se generan ejercicios dependiento del nivel de dificultad
				//En el nivel más fácil son solamente sumas y restas
				case 1:
					var operando1 = this.generarAleatorio(1,50)
					var operando2 = this.generarAleatorio(1,50)
					var operador = this.randomBool() ? '+' : '-'
					var resultado = (operador == '+') ? operando1 + operando2 : operando1 - operando2
					//Generar escondido
					switch (this.generarAleatorio(0,2)) {
						case 0:
							ejercicio.respuesta = operando1
							operando1 = ' __ '
						break;
						case 1:
						  ejercicio.respuesta = operando2
						  operando2 = ' __ '
						break;
						case 2:
						  ejercicio.respuesta = resultado
						  resultado = ' __ '
						break;
					}
					ejercicio.pregunta = operando1 + ' '  +  operador + ' '  +  operando2 + ' '  +  ' = '  +  resultado
					//generar opciones
					var opciones = this.generarOpciones(ejercicio.respuesta)
				break;
				//En el nivel medio se realizan multiplicaciones y divisiones
				case 2:
				var operando1 = this.generarAleatorio(1,10)
				var operando2 = this.generarAleatorio(1,10)
				var operador = this.randomBool() ? 'x' : '➗'
				if (operador == "x") var resultado = operando1 * operando2;
				else {
					var resultado = operando1 * operando2;
					var temp = operando1;
					operando1 = resultado;
					resultado = temp;
				}
				//Generar escondido
				switch (this.generarAleatorio(0,2)) {
					case 0:
						ejercicio.respuesta = operando1
						operando1 = ' __ '
					break;
					case 1:
					  ejercicio.respuesta = operando2
					  operando2 = ' __ '
					break;
					case 2:
					  ejercicio.respuesta = resultado
					  resultado = ' __ '
					break;
				}
				ejercicio.pregunta = operando1 + ' '  +  operador + ' '  +  operando2 + ' '  +  ' = '  +  resultado
				var opciones = this.generarOpciones(ejercicio.respuesta)
				break;
				//En el nivel difícil se crean problemas escritos utilizando sumas y restas
				case 3:
				var operador = this.generarOpcion()
				var resultado
				var enunciado
				var objetos = ['banana', 'galleta', 'pieza', 'pluma', 'chocolate', 'dulce', 'zapato', 'manzana', 'cuaderno', 'juguete']
				var objeto1 = objetos[this.generarAleatorio(0, objetos.length-1)]
				var objeto2 = objeto1 + 's'
				objeto1 = objeto1 + 's'
				switch (operador) {

					case '+':
					  var operando1 = this.generarAleatorio(1,50)
					  var operando2 = this.generarAleatorio(1,50)
						resultado = operando1 + operando2
						enunciado = 'Si tengo ' + operando1 + ' ' + objeto1 + ' y compro ' + operando2 + ' ' + objeto2 + ' más. ¿Cuántos objetos tengo?'
				  break;

					case '-':
					  var operando1 =  this.generarAleatorio(1,50)
					  var operando2 = this.generarAleatorio(1,50)
					  if (operando1 < operando2) operando1 = operando1 + operando2
					  var limite = operando1 - operando2
					  if (limite < 0) {
						   limite = limite*(-1)
						   operando1 += (limite + this.generarAleatorio(1,50))
						   operando2 += (limite + this.generarAleatorio(1,50))
					  }
					  resultado = operando1 - operando2
					  enunciado = 'Si tengo ' + operando1 + ' ' + objeto1 + ' y regalo ' + operando2 + ' ' + objeto2 + '. ¿Con cuántos objetos me quedo?'
					break;

					case 'x':
					  var operando1 =  this.generarAleatorio(1,10)
					  var operando2 = this.generarAleatorio(1,10)
					  resultado = operando1 * operando2
					  objeto2 = (operando2 == 1) ? 'canasta' : 'canastas'
					  enunciado = 'Si tengo ' + operando2 + ' ' + objeto2 + ' con ' + operando1 + ' ' + objeto1 + ' cada una. ¿Cuántos objetos tengo en total?'
					break;

					case '➗':
					  var operando1 =  this.generarAleatorio(1,10)
					  var operando2 = this.generarAleatorio(1,10)
					  resultado = operando1 * operando2
					  var temp = operando1
					  operando1 = resultado
					  resultado = temp
					  objeto2 = (operando2 == 1) ? 'canasta' : 'canastas'
					  enunciado = 'Si tengo ' + operando1 + ' ' + objeto1 + ' y las coloco en ' + operando2 + ' ' + objeto2 + '. ¿Cuántos objetos tengo en cada canasta?'
					break;

				}
				ejercicio.pregunta = enunciado
				ejercicio.respuesta = resultado
				var opciones = this.generarOpciones(ejercicio.respuesta)
			}
			opciones = shuffle(opciones)
			ejercicio.opciones = opciones
			this.ejercicios.push(ejercicio)
		}
	}

	seleccionar (seleccionado) { this.setState ( {seleccionado: seleccionado} ); }

	siguiente() {
		if (this.state.seleccionado == null) toastr("¡Usted no ha seleccionado una respuesta!");
		else {
			if (this.state.seleccionado == this.ejercicios[this.state.pregunta].respuesta) {
				this.setState({
					aciertos: this.state.aciertos + 1,
					pregunta: this.state.pregunta + 1,
					seleccionado: null
				});
			}
			else {
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
							<h1>{ this.ejercicios[this.state.pregunta].pregunta }</h1>
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
}
