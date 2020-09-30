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
                        <a href="/juegos/" className="btn btn-principal btn-lg">Regresar</a>
                    </div>
                    <div className="col-4 text-center">
                        <button onClick={this.props.reiniciar} className="btn btn-principal btn-lg">Volver a jugar</button>
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
            toastr("¡Usted no ha seleccionado un nivel de dificultad!");
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
        var audio = $("#player")
            if(audio[0] != undefined){
                audio[0].pause()
                audio[0].load()
            }
        return(
            <div>
            <div className="col-6 offset-3 text-center">
                <audio id="player" controls>
                    <source src={'./data/cantaCancion.mp3'} type="audio/mpeg">
                    </source>
                        Your browser does not support the audio element.
                </audio>
            </div>
                <div className="row">
                    <div className="col-6 offset-3 text-center">
                        <h3>Seleccione el nivel de dificultad</h3>
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
                            Regresar
                        </a>
                    </div>

                    <div className="col-4 offset-4 text-center mt-3">
                        <button onClick={this.seleccionar} className="btn btn-principal btn-lg">Continuar</button>
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
			index: null,
      cancion_index : null
		}
    switch (this.props.nivel) {
      case 1:this.total_preguntas = 4; break;
      case 2:this.total_preguntas = 6; break;
      case 3:this.total_preguntas = 7; break;
    }
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
			toastr("¡Usted no ha seleccionado una respuesta!");
		} else {
            var aciertos = this.state.aciertos + this.state.index;
            console.log(aciertos);
            this.setState({
                aciertos: aciertos,
                pregunta: this.state.pregunta + 1,
                index: null,
                cancion_index : null
            });
		}
	}

	render() {
		if (this.state.pregunta >= this.total_preguntas) {
            var total_aciertos = this.total_preguntas * 4;
            var porcentaje = Math.round(this.state.aciertos / total_aciertos * 100);
			      this.props.terminar(porcentaje);
            return(<div></div>);
		} else {

      var canciones;
      switch (this.props.nivel) {
        case 1: canciones = ['día', 'noche', 'corazón', 'mujer', 'sol', 'mar', 'azul', 'ojos', 'labios', 'canta', 'llores', 'mexico', 'rancho', 'caballo', 'rogarle', 'cielito', 'tequila', 'paloma', 'morena', 'vida', 'rey', 'negrita', 'volver', 'querer', 'adelita'];
        break;
        case 2: canciones = ['flor', 'zapatos', 'puerta', 'árbol', 'niña', 'camino', 'beso', 'baila', 'cama', 'copa', 'mano', 'tristeza', 'sombras', 'luz', 'soledad', 'casa', 'mariachis', 'dinero', 'trono', 'reina', 'camino', 'volando', 'rebozo', 'loco', 'tiempo'];
        break;
        case 3: canciones = ['acariciar', 'pasaje', 'rincón', 'drama', 'alma', 'blanco', 'negro', 'quedar', 'ley', 'piedra', 'papel', 'penando', 'seda', 'pelusa', 'delante', 'detrás', 'perder', 'brazos', 'valiente', 'sargento', 'tumba', 'venas', 'soñé', 'distancia', 'sol'];
        break;
      }
      if(this.state.cancion_index == null) {
        this.state.cancion_index = Math.floor((Math.random() * (canciones.length-1)))
      }

      var text = (this.props.nivel == 3) ? '' : canciones[this.state.cancion_index];


			return (
				<div>
        <div className="col-6 offset-3 text-center">
            <audio id="player" controls>
                <source src={'./data/cantaCancion.mp3'} type="audio/mpeg">
                </source>
                    Your browser does not support the audio element.
            </audio>
        </div>
					<div className="offset-2 col-8">
            <font color="red">
  						<Img style="color:red"
  							url={'./img/' + canciones[this.state.cancion_index] + '.png'}
                text={text}
  							/>
            </font>
					</div>

                  <div className="alert alert-success row mt-3">
                      <div class="ec-stars-wrapper">
                        <a  type="star" title="Calificar con 1 estrella" onClick={() => {this.seleccionar(0)}}>&#9733;</a>
                        <a  type="star" title="Calificar con 2 estrellas" onClick={() => {this.seleccionar(1)}}>&#9733;</a>
                        <a  type="star" title="Calificar con 3 estrellas" onClick={() => {this.seleccionar(2)}}>&#9733;</a>
                        <a  type="star" title="Calificar con 4 estrellas" onClick={() => {this.seleccionar(3)}}>&#9733;</a>
                        <a  type="star" title="Calificar con 5 estrellas" onClick={() => {this.seleccionar(4)}}>&#9733;</a>
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
        var audio = $("#player")
            if(audio[0] != undefined){
                audio[0].pause()
                audio[0].load()
            }
		return (
			<div>
      <div className="col-6 offset-3 text-center">
          <audio id="player" controls>
              <source src={'./data/cantaCancion.mp3'} type="audio/mpeg">
              </source>
                  Your browser does not support the audio element.
          </audio>
      </div>
				<div className="row border rounder my-3">
					<div className="col-12 text-center bg-white">
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
