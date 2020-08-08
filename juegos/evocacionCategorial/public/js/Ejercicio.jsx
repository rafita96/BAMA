class Ejercicio extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pregunta: 0,
			aciertos: 0,
			index: null,
		  limite: 0,
			alfa: Math.floor(Math.random() * 4) + 1
		}

		this.inicio = Math.floor(Math.random() * 6) + 1;
		this.cargarNiveles();
		this.siguiente    = this.siguiente.bind(this);
		this.seleccionar  = this.seleccionar.bind(this);
	}

	cargarNiveles(){
		if      (this.props.nivel == 1) { this.state.pregunta = this.inicio; }
		else if (this.props.nivel == 2) { this.state.pregunta = this.inicio + 10; }
		else if (this.props.nivel == 3) { this.state.pregunta = this.inicio + 20; }
	}

	seleccionar(index) {
		this.setState({ index: index });
	}

	siguiente() {
		if (this.state.index == null) {
			toastr("¡Usted no ha seleccionado una respuesta!");
		} else {
			if (this.state.index == 'r') {
				this.setState({
					aciertos: this.state.aciertos + 1,
					limite: this.state.limite + 1,
					pregunta: this.state.pregunta + 1,
					index: null,
					alfa: this.state.alfa = Math.floor(Math.random() * 4) + 1
				});
			} else {
				this.setState({
					limite: this.state.limite + 1,
					pregunta: this.state.pregunta + 1,
					index: null,
					alfa: this.state.alfa = Math.floor(Math.random() * 4) + 1
				});
			}
		}
	}

	render() {
		if (this.state.limite == 5) {
			this.state.pregunta = 5;
			var porcentaje = this.state.aciertos / this.state.pregunta * 100;
			this.props.terminar(porcentaje);
            return(<div></div>);
		}
		else {
      var carpeta = this.state.pregunta;

      if (this.state.alfa==1) {
			return (
				<div>

					<div className="offset-2 col-8">
						<Img
							url={"./img/" + carpeta + "/scene.jpg"}
							/>
					</div>

					<div className="row mt-3">

						<div onClick={() => {this.seleccionar(1)}} className="offset-1 col-2">
							<Img
								seleccionado={this.state.index}
								index={1}
								url={"./img/" + carpeta + "/1.jpg"} />
						</div>

						<div onClick={() => {this.seleccionar(2)}} className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={2}
								url={"./img/" + carpeta + "/2.jpg"} />
						</div>

						<div onClick={() => {this.seleccionar(3)}} className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={3}
								url={"./img/" + carpeta + "/3.jpg"} />
						</div>

						<div onClick={() => {this.seleccionar('r')}}className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={'r'}
								url={"./img/" + carpeta + "/r.jpg"} />
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
		if (this.state.alfa==2) {
		return (
			<div>

				<div className="offset-2 col-8">
					<Img
						url={"./img/" + carpeta + "/scene.jpg"}
						/>
				</div>

				<div className="row mt-3">

					<div onClick={() => {this.seleccionar(1)}} className="offset-1 col-2">
						<Img
							seleccionado={this.state.index}
							index={1}
							url={"./img/" + carpeta + "/1.jpg"} />
					</div>

					<div onClick={() => {this.seleccionar(2)}} className="offset-1 col">
						<Img
							seleccionado={this.state.index}
							index={2}
							url={"./img/" + carpeta + "/2.jpg"} />
					</div>

					<div onClick={() => {this.seleccionar('r')}} className="offset-1 col">
						<Img
							seleccionado={this.state.index}
							index={'r'}
							url={"./img/" + carpeta + "/r.jpg"} />
					</div>

					<div onClick={() => {this.seleccionar(3)}}className="offset-1 col">
						<Img
							seleccionado={this.state.index}
							index={3}
							url={"./img/" + carpeta + "/3.jpg"} />
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
		if (this.state.alfa==3) {
		return (
			<div>

				<div className="offset-2 col-8">
					<Img
						url={"./img/" + carpeta + "/scene.jpg"}
						/>
				</div>

				<div className="row mt-3">

					<div onClick={() => {this.seleccionar(1)}} className="offset-1 col-2">
						<Img
							seleccionado={this.state.index}
							index={1}
							url={"./img/" + carpeta + "/1.jpg"} />
					</div>

					<div onClick={() => {this.seleccionar('r')}} className="offset-1 col">
						<Img
							seleccionado={this.state.index}
							index={'r'}
							url={"./img/" + carpeta + "/r.jpg"} />
					</div>

					<div onClick={() => {this.seleccionar(3)}} className="offset-1 col">
						<Img
							seleccionado={this.state.index}
							index={3}
							url={"./img/" + carpeta + "/3.jpg"} />
					</div>

					<div onClick={() => {this.seleccionar(2)}}className="offset-1 col">
						<Img
							seleccionado={this.state.index}
							index={2}
							url={"./img/" + carpeta + "/2.jpg"} />
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
		if (this.state.alfa==4) {
		return (
			<div>

				<div className="offset-2 col-8">
					<Img
						url={"./img/" + carpeta + "/scene.jpg"}
						/>
				</div>

				<div className="row mt-3">

					<div onClick={() => {this.seleccionar('r')}} className="offset-1 col-2">
						<Img
							seleccionado={this.state.index}
							index={'r'}
							url={"./img/" + carpeta + "/r.jpg"} />
					</div>

					<div onClick={() => {this.seleccionar(2)}} className="offset-1 col">
						<Img
							seleccionado={this.state.index}
							index={2}
							url={"./img/" + carpeta + "/2.jpg"} />
					</div>

					<div onClick={() => {this.seleccionar(3)}} className="offset-1 col">
						<Img
							seleccionado={this.state.index}
							index={3}
							url={"./img/" + carpeta + "/3.jpg"} />
					</div>

					<div onClick={() => {this.seleccionar(1)}}className="offset-1 col">
						<Img
							seleccionado={this.state.index}
							index={1}
							url={"./img/" + carpeta + "/1.jpg"} />
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
}
