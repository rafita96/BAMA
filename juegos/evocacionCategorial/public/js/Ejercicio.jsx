class Ejercicio extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pregunta: 0,
			aciertos: 0,
			index: null
		}
		//this.generarEjercicios();
		this.plusCarpetas=4;
		this.preg=0
		this.cargarNiveles();
		this.siguiente = this.siguiente.bind(this);
		this.seleccionar = this.seleccionar.bind(this);
	}

	cargarNiveles(){
		if (this.props.nivel == 1){
			this.state.pregunta = 0;
			//toastr("Hola");
		}
		else if (this.props.nivel == 2) {
			this.state.pregunta = 4;
			this.plusCarpetas = this.state.pregunta + 4;
			//toastr("Hola");
		}
		else if (this.props.nivel == 3){
			this.state.pregunta = 11;
			this.plusCarpetas = this.state.pregunta + 4;
			//toastr("Hola");
		}
	}

	seleccionar(index) {
		this.setState({
			index: index
		});
	}

	siguiente() {
		if (this.state.index == null) {
			toastr("¡Usted no ha seleccionado una respuesta!");
		} else {
			if (this.state.index == 'r') {
				this.setState({
					aciertos: this.state.aciertos + 1,
					pregunta: this.state.pregunta + 1,
					index: null
				});
			} else {
				this.setState({
					pregunta: this.state.pregunta + 1,
					index: null
				});
			}
		}
	}

	render() {
		if (this.state.pregunta == this.plusCarpetas) {
			this.state.pregunta = 4;
			var porcentaje = this.state.aciertos / this.state.pregunta * 100;
			this.props.terminar(porcentaje);
            return(<div></div>);
		} else {

			var carpeta = this.state.pregunta;

			return (
				<div>
					<div className="offset-2 col-8">
						<Img
							url={"./img/" + carpeta + "/escena.jpg"}
							/>
					</div>

					<div className="row mt-3">
						<div onClick={() => {this.seleccionar(0)}} className="offset-1 col-2">
							<Img
								seleccionado={this.state.index}
								index={0}
								url={"./img/" + carpeta + "/0.png"} />
						</div>

						<div onClick={() => {this.seleccionar(1)}} className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={1}
								url={"./img/" + carpeta + "/1.png"} />
						</div>

						<div onClick={() => {this.seleccionar(2)}} className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={2}
								url={"./img/" + carpeta + "/2.png"} />
						</div>

						<div onClick={() => {this.seleccionar('r')}}className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={'r'}
								url={"./img/" + carpeta + "/r.png"} />
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
