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

	generarAleatorio(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	randomBool(){
		return Math.random() >= 0.5
	}

	generarOpcion (min, max, operador_escondido) {
		if(this.props.nivel == 1) {
			if(!operador_escondido) {
				return this.generarAleatorio(min, max)
			}else {
				return (this.randomBool()) ? '+' : '-'
			}
		} else {
			if(!operador_escondido) {
				return this.generarAleatorio(min, max)
			}else {
				var operadores = ['+', '-', 'x', '➗']
				return operadores[this.generarAleatorio(0,3)]
			}
		}
	}

	generarOperador() {
		var operadores = ['+', '-', 'x','➗']
		return operadores[this.generarAleatorio(0,3)]
	}

	generarOpcionDificil(num){
		var min = num - 10
		var max = num + 10
		return this.generarAleatorio(min, max)
	}

	generarOpciones(operador_escondido, respuesta) {
		let opciones = []
		if(operador_escondido){
			opciones = ['+', '-', 'x','➗']
		} else {
			var j
			for(j=0;j < 3; j++) {
				let opcion = this.generarAleatorio(0,10)
				while(opciones.includes(opcion) || respuesta == opcion){
					opcion = this.generarAleatorio(0,10)
				}
				opciones.push(opcion)
			}
			opciones.push(respuesta)
		}

		return opciones
	}

	generarEjercicios() {
		this.ejercicios = [];
		//config tiene la estructura config[nivel][indice].{tira,respuesta}
		// En esta parte se selecciona la pregunta
		for (var i = 0; i < this.numeroPreguntas; i++) {

			var ejercicio = new Object();
			switch (this.props.nivel) {
				//Se generan ejercicios dependiento del nivel de dificultad
				//En el nivel más fácil son solamente sumas y restas
				case 1:
					var operando1 =  this.generarAleatorio(0,10)// numeros de un dígito
					var operando2 = this.generarAleatorio(0,10)
					var operador = this.randomBool() ? '+' : '-'
					var resultado = (operador=='+') ? operando1 + operando2 : operando1 - operando2
					//Generar escondido
					var operador_escondido = false
					switch (this.generarAleatorio(0,3)) {
						case 0:
							ejercicio.respuesta = operando1
							operando1 = ' __ '
							break;
						case 1:
						operador_escondido = true
						ejercicio.respuesta = operador
						operador = ' __ '
							break;
						case 2:
						ejercicio.respuesta = operando2
						operando2 = ' __ '
							break;
						case 3:
						ejercicio.respuesta = resultado
						resultado = ' __ '
							break;
					}
					ejercicio.pregunta = operando1 + ' '  +  operador + ' '  +  operando2 + ' '  +  ' = '  +  resultado
					//generar opciones
					var opciones = this.generarOpciones(operador_escondido, ejercicio.respuesta)

					break;
					//En el nivel medio se realizan multiplicaciones y divisiones
				case 2:
				var operando1 =  this.generarAleatorio(0,10)// numeros de un dígito
				var operando2 = this.generarAleatorio(0,10)
				var operador = this.generarOperador()
				var resultado
				switch (operador) {
					case '+':
						resultado = operando1 + operando2
						break;
					case '-':
					resultado = operando1 - operando2
					break;
					case 'x':
					resultado = operando1 * operando2
					break;
					case '➗':
					while(operando2 == 0 ) {
						operando2 = this.generarAleatorio(0,10)
					}
					resultado = operando1 * operando2
					var temp = operando1
					operando1 = resultado
					resultado = temp
					break;
				}

				//Generar escondido
				var operador_escondido = false
				switch (this.generarAleatorio(0,3)) {
					case 0:
						ejercicio.respuesta = operando1
						operando1 = ' __ '
						break;
					case 1:
					operador_escondido = true
					ejercicio.respuesta = operador
					operador = ' __ '
						break;
					case 2:
					ejercicio.respuesta = operando2
					operando2 = ' __ '
						break;
					case 3:
					ejercicio.respuesta = resultado
					resultado = ' __ '
						break;
				}


				ejercicio.pregunta = operando1 + ' ' + operador + ' ' + operando2 + ' = ' + resultado

				//generar opciones
				var opciones = this.generarOpciones(operador_escondido, ejercicio.respuesta)
					break;
					//En el nivel difícil se crean problemas escritos utilizando sumas y restas
				case 3:
				var operando1 =  this.generarAleatorio(1,10)// numeros de un dígito
				var operando2 = this.generarAleatorio(1,10)
				var operador = this.generarOperador()
				var resultado
				var enunciado
				var objetos = ['banana', 'galleta', 'pieza', 'pluma', 'chocolate', 'dulce', 'zapato']
				var objeto1 = objetos[this.generarAleatorio(0, objetos.length-1)]
				var objeto2 = (operando2 == 1) ? objeto1 : objeto1+'s'
				objeto1 = (operando1 == 1) ? objeto1 : objeto1+'s'
				switch (operador) {
					case '+':
						resultado = operando1 + operando2
						enunciado = 'Si tengo ' + operando1 + ' ' + objeto1 + ' y compro ' +operando2 + ' '+objeto2+' más. ¿Cuántas tengo?'
						break;
					case '-':
					if(operando1 < operando2)operando1=operando1+operando2
					var limite = operando1 - operando2
					if(limite < 0) {
						limite = limite*(-1)
						operando1 += (limite + this.generarAleatorio(0, 10))
						operando2 += (limite + this.generarAleatorio(0, 10))
					}
					resultado = operando1 - operando2
					enunciado = 'Si tengo ' + operando1 + ' ' + objeto1 + ' y regalo ' +operando2 + ' '+objeto2+'. ¿Cuántas tengo?'
					break;
					case 'x': //problemas de
					resultado = operando1 * operando2
					objeto2 = (operando2 == 1) ? 'canasta' : 'canastas'
					enunciado = 'Si tengo ' + operando2 + ' ' + objeto2 + ' con ' +operando1 + ' '+objeto1+' cada una. ¿Cuántas '+objeto1+' tengo en total?'
					break;
					case '➗':// PRoblemas de reparticion
					while(operando2 == 0) {
						operando2 = this.generarAleatorio(0,10)
					}
					resultado = operando1 * operando2
					var temp = operando1
					operando1 = resultado
					resultado = temp
					objeto2 = (operando2 == 1) ? 'canasta' : 'canastas'
					enunciado = 'Si tengo ' + operando1 + ' ' + objeto1 + ' y las coloco en ' +operando2 + ' '+objeto2+'. ¿Cuántas hay en cada una?'
					break;
				}
				ejercicio.pregunta = enunciado
				ejercicio.respuesta = resultado
				var opciones = []
				var j;
				for(j=0;j < 3; j++) {
					let opcion = this.generarOpcionDificil(ejercicio.respuesta)
					if(opciones.includes(opcion) || ejercicio.respuesta == opcion){
						opcion = this.generarOpcionDificil(ejercicio.respuesta)
					}
					opciones.push(opcion)
				}
				opciones.push(ejercicio.respuesta)
					break;
			}

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
