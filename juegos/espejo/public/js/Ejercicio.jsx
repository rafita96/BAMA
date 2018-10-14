class Ejercicio extends React.Component {
	constructor(props) {
		super(props);

		this.colores = shuffle(["#C0392B", "#27AE60", "#8E44AD", "#F1C40F", "#1ABC9C", "#E84393", "#6D214F"]);
		this.numeroPreguntas = this.props.nivel+2;
		this.n = this.props.nivel+1;
		this.cuadricula_vacia = Array(this.n).fill(0).map(valor => Array(this.n).fill(0).map(valor => 0));

		this.state = {
			pregunta: 0,
			aciertos: 0,
			hool :3;
			respuesta: Array(this.n).fill(0).map(valor => Array(this.n).fill(0).map(valor => 0)),
		}


		this.generarEjercicios();
		this.siguiente = this.siguiente.bind(this);
		this.seleccionar = this.seleccionar.bind(this);
	}

	generarEjercicios() {
		this.ejercicios = [];
		for (var i = 0; i < this.numeroPreguntas; i++) {
			var ejercicio = Object();
			ejercicio.dibujo = this.generarDibujo();
			ejercicio.color = this.colores.splice(Math.floor(Math.random() * this.colores.length),1)[0];
			ejercicio.respuesta = this.state.respuesta;
			this.ejercicios.push(ejercicio);
		}
	}

	generarDibujo(){
		let dibujo = Array(this.n).fill(0).map(valor => Array(this.n).fill(0).map(valor => 0)); //Crea la matriz de ceros
		let cantidad = Math.floor(Math.random() * (this.n**2-(this.n) - this.props.nivel + 1) + this.props.nivel);
		let ren_col = [];
		for (let i=0; i < cantidad; i++){
			var ren = Math.floor(Math.random() * this.n),
				col = Math.floor(Math.random() * this.n);
			while (ren_col.indexOf(ren+""+col) != -1){
				ren = Math.floor(Math.random() * this.n);
				col = Math.floor(Math.random() * this.n);
			}
			dibujo[ren][col] = 1;
			ren_col.push(ren+""+col);
		}
		return dibujo;
	}

	validarRespuesta(){
		var respuesta = this.state.respuesta;
		for (var i=0; i < respuesta.length; i++ ){
			respuesta[i] = respuesta[i].reverse();
		}
		return JSON.stringify(respuesta) == JSON.stringify(this.ejercicios[this.state.pregunta].dibujo)
	}

	seleccionar(respuesta) {
		this.setState({
			respuesta: respuesta
		});

	}

	siguiente() {
		if (JSON.stringify(this.state.respuesta) == JSON.stringify(this.cuadricula_vacia)) {
			toastr("No has seleccionado una opción");
		} else {
			if (this.validarRespuesta()) {
				this.setState({
					aciertos: this.state.aciertos + 1,
					pregunta: this.state.pregunta + 1,
					respuesta: Array(this.n).fill(0).map(valor => Array(this.n).fill(0).map(valor => 0)),
				});
			} else {
				this.setState({
					pregunta: this.state.pregunta + 1,
					respuesta: Array(this.n).fill(0).map(valor => Array(this.n).fill(0).map(valor => 0)),
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
			var dibujo = [];
			for (var i=0; i < this.n; i++){
				var renglon = [];
				var botones = [];
				for (var j=0; j < this.n; j++){
					let boton = (<Boton
						tipo={1}
						seleccionar={this.seleccionar}
                    	ren={i} col={j}
                    	color={this.ejercicios[this.state.pregunta].color}
                    	respuesta={this.ejercicios[this.state.pregunta].dibujo}
                    />);
					botones.push(boton);
				}
				renglon.push(<div className="row">{botones}</div>);
				dibujo.push(renglon);
			}

			var cuadricula = [];
			for (i=0; i < this.n; i++){
				renglon = [];
				botones = [];
				for (j=0; j < this.n; j++){
					let boton = (<Boton
						tipo={0}
                    	seleccionar={this.seleccionar}
                    	ren={i} col={j}
                    	color={this.ejercicios[this.state.pregunta].color}
                    	respuesta={this.state.respuesta}
                    />);
					botones.push(boton);
				}
				renglon.push(<div className="row">{botones}</div>);
				cuadricula.push(renglon);
			}
			return (
				<div>
					<div className="row">
						<div className="col">
							{dibujo}
						</div>
						<div className={"divisor"}></div>
						<div className="col">
							{cuadricula}
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
