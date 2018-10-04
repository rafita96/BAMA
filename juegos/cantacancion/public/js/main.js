class Fin extends React.Component{

    constructor(props){
        super(props);

        Consulta.post('/paciente/registrar/avance/', {
                juego: 'cantacancion',
                paciente: this.props.paciente,
                porcentaje: this.props.porcentaje,
                nivel: this.props.nivel,
                fechaInicio: this.props.fechaInicio,
                fechaFin: new Date()
            },
            function(error){
                console.log(error);
            }
        );
    }

    render(){
        var clase = "";
        if(this.props.porcentaje >= 80){
            clase = "bg-success";
        }else if(this.props.porcentaje >= 25){
            clase = "bg-warning";
        }else{
            clase = "bg-danger";
        }

        return(
            <div>
                <div className={"row border rounded " + clase}>
                    <div className="col-6 offset-3 text-center text-white">
                        <h1 className="display-1">{this.props.porcentaje}%</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4">
                        <a href="/juegos/" className="btn btn-principal">Lista de juegos</a>
                    </div>
                    <div className="col-4 text-center">
                        <button onClick={this.props.reiniciar} className="btn btn-principal">Volver a jugar</button>
                    </div>
                </div>
            </div>
        );
    }
}
class Nivel extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            index: 0
        }

        this.seleccionar = this.seleccionar.bind(this);
    }

    seleccionar() {
        if (this.state.index == 0) {
            toastr("No has seleccionado un nivel.");
        } else {
            this.props.seleccionar(this.state.index);
        }
    }

    render() {
        var niveles = [];
        for(var i = 0; i < 3; i++){
            if(this.state.index == i+1) {
                niveles.push("col-4 bg-verde border text-white py-3");
            } else {
                niveles.push("col-4 bg-light border py-3")
            }
        }

        return(
            <div>
                <div className="row">
                    <div className="col-6 offset-3 text-center">
                        <h3>Selecciona el nivel de dificultad</h3>
                    </div>
                </div>

                <div className="row text-center">
                    <div className={niveles[0]} onClick={()=>{this.setState({ index: 1 })}}>Fácil</div>

                    <div className={niveles[1]} onClick={()=>{this.setState({ index: 2 })}}>Medio</div>

                    <div className={niveles[2]} onClick={()=>{this.setState({ index: 3 })}}>Difícil</div>
                </div>

                <div className="row">
                    <div className="col-4 text-center mt-3">
                        <a
                            className="btn btn-principal btn-lg"
                            href="/juegos/">
                            Lista de juegos
                        </a>
                    </div>

                    <div className="col-4 offset-4 text-center mt-3">
                        <button onClick={this.seleccionar} className="btn btn-principal">Continuar</button>
                    </div>

                </div>
            </div>
        );
    }
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
  	} else if (this.props.index == this.props.seleccionado) {
  		return (
  			<img className="border border-success" ref="image" src={this.props.url} />
  		);
  	}

  	return (
      <div class="text-center">
        <img ref="image" height="50%" src={this.props.url}/>
        <h1 class="text-capitalize">{this.props.text} </h1>
      </div>
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

    this.total_preguntas = 1 + this.props.nivel;
		this.siguiente = this.siguiente.bind(this);
		this.seleccionar = this.seleccionar.bind(this);
	}

	seleccionar(index) {
        console.log(index);
		this.setState({
			index: index
		});
	}

	siguiente() {
		if (this.state.index == null) {
			toastr("No has seleccionado una opción");
		} else {
            var aciertos = this.state.aciertos + this.state.index;
            console.log(aciertos);
            this.setState({
                aciertos: aciertos,
                pregunta: this.state.pregunta + 1,
                index: null
            });
		}
	}

	render() {
		if (this.state.pregunta >= this.total_preguntas) {
            var total_aciertos = this.total_preguntas * 4;
            var porcentaje = Math.round(this.state.aciertos / total_aciertos * 100);
            console.log(total_aciertos);
			this.props.terminar(porcentaje);
            return(<div></div>);
		} else {
			var carpeta = this.state.pregunta;
      var canciones;
      switch (this.props.nivel) {
        case 1: canciones = ['rosa', 'arbol', 'zapatos', 'dulce'];
        case 2: canciones = ['rosa', 'arbol', 'zapatos', 'dulce'];
        case 3: canciones = ['rosa', 'arbol', 'zapatos', 'dulce'];
      }

			return (
				<div>
					<div className="offset-2 col-8">
						<Img
							url={'./img/' + canciones[carpeta] + '.jpg'}
              text={canciones[carpeta]}
							/>
					</div>

                    <div className="alert alert-success row mt-3">
                        <div className="offset-1 col-2">
                            <button onClick={() => {this.seleccionar(0)}} className="btn btn-danger">Muy mal</button>
                        </div>

                        <div className="col-2">
                            <button onClick={() => {this.seleccionar(1)}} className="btn btn-warning">Mal</button>
                        </div>

                        <div className="col-2">
                            <button onClick={() => {this.seleccionar(2)}} className="btn btn-info">Regular</button>
                        </div>

                        <div className="col-2">
                            <button onClick={() => {this.seleccionar(3)}} className="btn btn-primary">Bien</button>
                        </div>

                        <div className="col-2">
                            <button onClick={() => {this.seleccionar(4)}} className="btn btn-success">Muy bien</button>
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
			fin: false,
			seleccionNivel: true,
			porcentaje: null,
		}

		this.iniciar = this.iniciar.bind(this);
		this.seleccionarNivel = this.seleccionarNivel.bind(this);
		this.terminar = this.terminar.bind(this);
		this.reiniciar = this.reiniciar.bind(this);
	}

	iniciar() {
		this.setState({
			seleccionNivel: false,
			inicio: true,
		});
		this.fechaInicio = new Date();
	}

	reiniciar(){
        this.setState({
            inicio: false,
            fin: false,
            seleccionNivel: true,
            porcentaje: null
        });
    }

	terminar(porcentaje) {
        this.setState({
            fin: true,
            porcentaje: porcentaje
        });
    }

	seleccionarNivel(nivel) {
		this.nivel = nivel;
		this.setState({
			seleccionNivel: false
		});
	}

	render() {
		if (this.state.seleccionNivel) {
			return (
				<Bloque nombre={this.props.nombre}>
					<Nivel seleccionar={this.seleccionarNivel} />
                </Bloque>
			);
		} else if (this.state.fin) {
			return(
                <Bloque nombre={this.props.nombre}>
                    <Fin
                        fechaInicio={this.fechaInicio}
                        nivel={this.nivel}
                        paciente={this.props.paciente}
                        reiniciar={this.reiniciar}
                        porcentaje={this.state.porcentaje} />
                </Bloque>
            );
		} else if (this.state.inicio) {
			return (
				<Bloque nombre={this.props.nombre}>
					<Ejercicio terminar={this.terminar} nivel={this.nivel}/>
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
    d3.json("./data/info.json", function(error, instrucciones) {
        d3.json("./meta.json", function(error, nombre) {
        	Consulta.get('/paciente/actual/', function(data) {
        		if (data["id"] != null) {
        			mostrarPerfil(data);
        			callback(data["id"], nombre["nombre"], instrucciones["instrucciones"]);
        		} else {
        			toastr("No has seleccionado un paciente");
        		}

        	});
        });
    });
}

$(document).ready(() => {
	getInfo((paciente, nombre, instrucciones) => {
		ReactDOM.render(<Game
			nombre={nombre}
			paciente={paciente}
			instrucciones={instrucciones}/>, document.getElementById('main'));
	})
});
