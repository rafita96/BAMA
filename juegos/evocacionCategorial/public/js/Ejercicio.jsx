class Ejercicio extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pregunta: Math.floor(Math.random() * 35) + 1,
			aciertos: 0,
			limite: 0,
			alfa: Math.floor(Math.random() * 4) + 1,
			dificultad: "",
			usados: [0,0,0,0,0],
			index: null
		}
		this.cargarNiveles();
		this.siguiente = this.siguiente.bind(this);
		this.seleccionar = this.seleccionar.bind(this);
	}

	cargarNiveles(){
		if (this.props.nivel == 1) this.state.dificultad = "Facil";
		else if (this.props.nivel == 2) this.state.dificultad = "Mediano";
		else if (this.props.nivel == 3) this.state.dificultad = "Dificil";
	}

	seleccionar(index) {this.setState({ index: index });}

	siguiente() {
		if (this.state.index == null) {
			toastr("¡Usted no ha seleccionado una respuesta!");
		} else {
			var usak = this.state.usados;
			usak[this.state.limite]=this.state.pregunta;
			this.setState({usados: usak});
			var x=0;
			while (x==0) {
				var y=0;
				var tempo = Math.floor(Math.random() * 35) + 1;
				for (var i=0; i<5; i++) if (tempo==this.state.usados[i]) y=1;
				if (y==0) x=1;
			}
			this.setState({
				pregunta: this.state.pregunta = tempo,
				limite: this.state.limite + 1,
				alfa: this.state.alfa = Math.floor(Math.random() * 4) + 1,
				index: null
			});
			if (this.state.index == 'r') this.setState({aciertos: this.state.aciertos + 1});
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
					<div className="col-6 offset-3 text-center">
						<audio id="player" controls>
							<source src={'./data/audio.mp3'} type="audio/mpeg">
							</source>
								Your browser does not support the audio element.
						</audio>
					</div>
					<div className="offset-2 col-8">
						<Img
							url={"./img/" + this.state.dificultad + "/" + carpeta + "/scene.jpg"}
							/>
					</div>
					<div className="row mt-3">
						<div onClick={() => {this.seleccionar(1)}} className="offset-1 col-2">
							<Img
								seleccionado={this.state.index}
								index={1}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/1.jpg"} />
						</div>
						<div onClick={() => {this.seleccionar(2)}} className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={2}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/2.jpg"} />
						</div>
						<div onClick={() => {this.seleccionar(3)}} className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={3}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/3.jpg"} />
						</div>
						<div onClick={() => {this.seleccionar('r')}}className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={'r'}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/r.jpg"} />
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
					<div className="col-6 offset-3 text-center">
							<audio id="player" controls>
								<source src={'./data/audio.mp3'} type="audio/mpeg">
								</source>
									Your browser does not support the audio element.
							</audio>
						</div>
					<div className="offset-2 col-8">
						<Img
							url={"./img/" + this.state.dificultad + "/" + carpeta + "/scene.jpg"}
							/>
					</div>
					<div className="row mt-3">
						<div onClick={() => {this.seleccionar(1)}} className="offset-1 col-2">
							<Img
								seleccionado={this.state.index}
								index={1}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/1.jpg"} />
						</div>
						<div onClick={() => {this.seleccionar(2)}} className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={2}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/2.jpg"} />
						</div>
						<div onClick={() => {this.seleccionar('r')}} className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={'r'}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/r.jpg"} />
						</div>
						<div onClick={() => {this.seleccionar(3)}}className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={3}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/3.jpg"} />
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
					<div className="col-6 offset-3 text-center">
							<audio id="player" controls>
								<source src={'./data/audio.mp3'} type="audio/mpeg">
								</source>
									Your browser does not support the audio element.
							</audio>
						</div>
					<div className="offset-2 col-8">
						<Img
							url={"./img/" + this.state.dificultad + "/" + carpeta + "/scene.jpg"}
							/>
					</div>
					<div className="row mt-3">
						<div onClick={() => {this.seleccionar(1)}} className="offset-1 col-2">
							<Img
								seleccionado={this.state.index}
								index={1}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/1.jpg"} />
						</div>
						<div onClick={() => {this.seleccionar('r')}} className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={'r'}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/r.jpg"} />
						</div>
						<div onClick={() => {this.seleccionar(3)}} className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={3}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/3.jpg"} />
						</div>
						<div onClick={() => {this.seleccionar(2)}}className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={2}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/2.jpg"} />
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
					<div className="col-6 offset-3 text-center">
							<audio id="player" controls>
								<source src={'./data/audio.mp3'} type="audio/mpeg">
								</source>
									Your browser does not support the audio element.
							</audio>
						</div>
					<div className="offset-2 col-8">
						<Img
							url={"./img/" + this.state.dificultad + "/" + carpeta + "/scene.jpg"}
							/>
					</div>
					<div className="row mt-3">
						<div onClick={() => {this.seleccionar('r')}} className="offset-1 col-2">
							<Img
								seleccionado={this.state.index}
								index={'r'}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/r.jpg"} />
						</div>
						<div onClick={() => {this.seleccionar(2)}} className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={2}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/2.jpg"} />
						</div>
						<div onClick={() => {this.seleccionar(3)}} className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={3}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/3.jpg"} />
						</div>
						<div onClick={() => {this.seleccionar(1)}}className="offset-1 col">
							<Img
								seleccionado={this.state.index}
								index={1}
								url={"./img/" + this.state.dificultad + "/" + carpeta + "/1.jpg"} />
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