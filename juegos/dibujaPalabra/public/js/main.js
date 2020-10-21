class Fin extends React.Component{

    constructor(props){
        super(props);

        Consulta.post('/paciente/registrar/avance/', {
                juego: 'dibujaPalabra',
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
                <source src={'./data/instruccion.mp3'} type="audio/mpeg">
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

class Ejercicio extends React.Component {
	constructor(props) {

		super(props);
		this.state = {
			pregunta: 0,
			aciertos: 0,
			index: null,
            palabra_index : null,
            used : [],
            paint: false,
            path: []
		}
        this.total_preguntas = 5;
		this.siguiente = this.siguiente.bind(this);
        this.seleccionar = this.seleccionar.bind(this);
        this.dibujar = this.dibujar.bind(this);
        this.addClick = this.addClick.bind(this);
        this.clear = this.clear.bind(this);
        this.redraw = this.redraw.bind(this);
        this.continuarDibujo = this.continuarDibujo.bind(this);
        this.clean = this.clean.bind(this);
	}

	seleccionar(index) {
		this.setState({
			index: index
		});
    }

    addClick(x, y, drag) {
        console.log(x, y, drag);
        this.setState({
            path: this.state.path.concat({
                x: x,
                y: y,
                drag: drag
            })
        });
    }

    dibujar(event) {
        var rect = event.target.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        this.setState({
            paint: true
        });
        this.addClick(x, y);
        this.redraw();
    }

    clean () {
        var canvas = document.querySelector('#canvas');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        this.setState({
            path: []
        });
    }

    redraw() {
        var canvas = document.querySelector('#canvas');
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

        context.strokeStyle = "#df4b26";
        context.lineJoin = "round";
        context.lineWidth = 5;

        for(var i=0; i < this.state.path.length; i++) {
            context.beginPath();
            if (this.state.path[i].drag && i) {
                context.moveTo(this.state.path[i-1].x, this.state.path[i-1].y);
            } else {
                context.moveTo(this.state.path[i].x - 1, this.state.path[i].y);
            }
            context.lineTo(this.state.path[i].x, this.state.path[i].y);
            context.closePath();
            context.stroke();
        }
      }

    continuarDibujo(event) {
        if (!this.state.paint) return;
        var rect = event.target.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        this.addClick(x, y, true);
        this.redraw();
    }

    clear() {
        this.setState({
            paint: false
        });
    }

	siguiente() {
		if (this.state.index == null) {
			toastr("¡Usted no ha seleccionado una respuesta!");
		} else {
            var aciertos = this.state.aciertos + this.state.index;
            console.log(aciertos);
            var used = this.state.used.map(x => x)
            used.push(this.state.palabra_index);
            this.clean();
            this.setState({
                aciertos: aciertos,
                pregunta: this.state.pregunta + 1,
                index: null,
                palabra_index : null,
                used: used
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
            var palabras;
            switch (this.props.nivel) {
                case 1: palabras = ['Pelota', 'Manzana', 'Corazón', 'Sol', 'Luna', 'Nube', 'Bota', 'Pez'];
                break;
                case 2: palabras = ['Flor', 'Palmera', 'Árbol', 'Estrella', 'Automóvil', 'Silla', 'Sombrilla'];
                break;
                case 3: palabras = ['Playa', 'Ciudad', 'Atardecer', 'Amanecer', 'Deporte', 'Casa', 'Película', 'Granja'];
                break;
            }
            if(this.state.palabra_index == null) {
              var p = Math.floor((Math.random() * (palabras.length-1)))
              while (this.state.used.indexOf(p) >= 0) {
                  p = Math.floor((Math.random() * (palabras.length-1)))
              }
              this.state.palabra_index = p
            }

            var text = palabras[this.state.palabra_index];
			return (
				<div>
                    <div className="col-6 offset-3 text-center">
                        <audio id="player" controls>
                            <source src={'./data/dibujaPalabra.mp3'} type="audio/mpeg">
                            </source>
                                Your browser does not support the audio element.
                        </audio>
                    </div>
					<div className="offset-2 col-8 text-center text-bold">
                        <h3>{text}</h3> <br />
                        <canvas id="canvas" width={300} height={300} style={{ background: 'white' }} onMouseDown={this.dibujar} onMouseMove={this.continuarDibujo} onMouseUp={this.clear} onMouseLeave={this.clear} />
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
                            <button className="btn btn-principal btn-lg" onClick={this.siguiente}>Siguiente</button>
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
            <source src={'./data/dibujaPalabra.mp3'} type="audio/mpeg">
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
