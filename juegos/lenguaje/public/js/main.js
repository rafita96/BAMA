var imgStyle = {
	backgroundcolor: 'transparent'
}
class Img extends React.Component{

	constructor(props) {
		super(props);
	}

  componentDidMount(){
    const img = this.refs.image;
  }

  render(){
  	if (this.props.index == null || this.props.seleccionado == null) {
  		console.log(this.props.index);
  		console.log(this.props.seleccionado);
  	} else if (this.props.index == this.props.seleccionado) {
  		return (
  			<img className="border border-success" ref="image" src={this.props.url} />
  		);
  	}

  	return (
  		<img ref="image" src={this.props.url} />
  	);
  }
}

class Ejercicio extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pregunta: 0,
			aciertos: 0,
			index: null
		}
		//this.generarEjercicios();
		this.siguiente = this.siguiente.bind(this);
		this.seleccionar = this.seleccionar.bind(this);
	}

	seleccionar(index) {
		this.setState({
			index: index
		});
	}

	siguiente() {
		if (this.state.index == null) {
			toastr("No has seleccionado una opción");
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
				})
			}
		}
	}

	render() {
		if (this.state.pregunta == 2) {
			var porcentaje = this.state.aciertos / this.state.pregunta * 100;
			var clase = "";
            if (porcentaje >= 80) {
                clase = "bg-success";
            } else if (porcentaje >= 25) {
                clase = "bg-warning";
            } else {
                clase = "bg-danger";
            }

			return (
				<div>
					 <div className={"row border rounded " + clase}>
                        <div className="col-6 offset-3 text-center text-white">
                            <h1 className="display-1">{porcentaje}%</h1>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 text-center">
                            <button className="btn btn-principal">Volver a jugar</button>
                        </div>
                    </div>
                </div>
			);
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
							<button className="btn btn-principal" onClick={this.siguiente}>Siguiente</button>
						</div>
					</div>
				</div>
			);
		}
	}	
}
class Instrucciones extends React.Component {
	render() {
		return (
			<div>
				<div className="row border rounder my-3">
					<div className="col-12 text-justify bg-white">
						<p>{this.props.instrucciones}</p>
					</div>
				</div>

				<div className="row">
					<div className="col-12 text-center">
						<button 
							className="btn btn-principal btn-lg"
							onClick={this.props.iniciar}>
							Iniciar Juego
						</button>
					</div>
				</div>
			</div>
		);
	}
}

class Bloque extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="row mt-3 border rounded p-3 bg-principal">
                <div className="col-6 offset-3 text-center">
                    <h1>{this.props.nombre}</h1>
                </div>
                <div className="col-12">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inicio: false,
		}

		this.iniciar = this.iniciar.bind(this);
	}
	iniciar() {
		this.setState({
			inicio: true
		});
	}

	render() {
		if (this.state.inicio) {
			return (
				<Bloque nombre={this.props.nombre}>
					<Ejercicio />
				</Bloque>
			);
		} else {
			return (
				<Bloque nombre={this.props.nombre}>
					<Instrucciones
						iniciar={this.iniciar}
						instrucciones={this.props.instrucciones} />
				</Bloque>
			);
		}
	}
}

function getInfo(callback){
    d3.json("./data/info.json", function(error, instrucciones){
        d3.json("./meta.json", function(error, nombre){
            callback(nombre["nombre"], instrucciones["instrucciones"]);
        });
    });
}

$(document).ready(() => {
	getInfo((nombre, instrucciones) => {
		ReactDOM.render(<Game
			nombre={nombre}
			instrucciones={instrucciones}/>, document.getElementById('main'));
	})
});