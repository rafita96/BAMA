class Fin extends React.Component{

    constructor(props){
        super(props);

        Consulta.post('/paciente/registrar/avance/', {
                juego: 'memorama',
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
                        <h1 className="display-1">{this.props.porcentaje.toFixed(2)}%</h1>
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
        var audio = $("#player")
        if(audio[0] != undefined){
        audio[0].pause()
        audio[0].load()
        }
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
        if (this.props.nivel == 1) {
          this.n = 3;
        }
        if (this.props.nivel == 2) {
          this.n = 4;
        }
        if (this.props.nivel == 3) {
          this.n = 5;
        }
        this.m = 4;
        this.generarCartas = this.generarCartas.bind(this);
        this.generarCarta = this.generarCarta.bind(this);
        this.revisar = this.revisar.bind(this);
        var cartas = this.generarCartas();
        var activo = [];
        for (var i = 0; i < this.n * this.m; i++) {
            activo.push(false);
        }
        this.state = {
            cartas: cartas,
            activo: activo,
            selected: -1,
            done: [],
            movimientos: 0,
            locked: false
        }
        var audio = $("#player")
    }

    generarCartas() {
        var cartas = [];
        if (this.props.nivel == 1) {
          var disponibles = ['abrikos', 'cherno', 'dunia', 'fresa', 'kiwi', 'manzana'];
        }
        if (this.props.nivel == 2) {
          var disponibles = ['abrikos', 'cherno', 'dunia', 'fresa', 'kiwi', 'manzana', 'naranja', 'pera'];
        }
        if (this.props.nivel == 3) {
          var disponibles = ['abrikos', 'cherno', 'dunia', 'fresa', 'kiwi', 'manzana', 'naranja', 'pera', 'platano', 'sandia'];
        }
        var self = this;

        disponibles.forEach(function(disponible) {
            for (var i = 0; i < 2; i++) {
                var carta = self.generarCarta(cartas);
                cartas[carta] = disponible;
            }
        });
        return cartas;
    }

    generarCarta(cartas) {
        var carta = Math.floor(Math.random() * this.n * this.m);
        while (cartas[carta]) {
            var carta = Math.floor(Math.random() * this.n * this.m);
        }
        return carta;
    }

    revisar (i) {
        if (this.state.selected == i) {
            var activo = this.state.activo.map(x => x);
            activo[i] = false;
            this.setState({
              movimientos: this.state.movimientos + 1,
              selected: -1,
              activo: activo
            });
            return;
        }
        if (this.state.cartas[this.state.selected] == this.state.cartas[i]) {
            var done = this.state.done.concat(i).concat(this.state.selected);
            this.setState({
              movimientos: this.state.movimientos + 1,
              done: done,
              selected: -1
            });
            if (done.length == this.n * this.m) {
              var puntopunto = 100 + (this.props.nivel * 4 + 7) * 5 - this.state.movimientos * 5;
                puntopunto = Math.max(0, puntopunto);
                puntopunto = Math.min(100, puntopunto);
                this.props.terminar(puntopunto);
            }
        } else {
            this.setState({
                locked: true
            });
            setTimeout(() => {
                var activo = this.state.activo.map(x => x);
                activo[i] = false;
                activo[this.state.selected] = false;
                this.setState({
                  movimientos: this.state.movimientos + 1,
                  activo: activo,
                  selected: -1,
                  locked: false
                });
            }, 1000 * (4 - this.props.nivel));
        }
    }

	render() {
    if (this.props.nivel < 3) {
      var cartas = this.state.cartas.map((carta, i) =>   
      <div style={{ float: 'left', padding: '5px', width: '25%' }}>
          <img style={{ border: this.state.done.indexOf(i) >= 0 ? 'solid 5px green' : '', cursor: 'pointer', height: '280px', objectFit: 'cover', minHeight: '280px', maxWidth: '80%', width: '80%' }} src={'./img/' + (this.state.activo[i] ? carta : 'tarjeta') + '.png'} class="rounded mx-auto d-block" onClick={() => {
                  if (this.state.locked || this.state.done.indexOf(i) >= 0) return;
                  var activo = this.state.activo.map(x => x);
                  activo[i] = true;
                  if (this.state.selected == -1) {
                      this.setState({
                          activo: activo,
                          selected: i
                      });
                  } else {
                      this.setState({
                          activo: activo
                      });
                      this.revisar(i);
                  }
              }} />
          </div>
      );
    }
    if (this.props.nivel == 3) {
        var cartas = this.state.cartas.map((carta, i) =>
            <div style={{ float: 'left', padding: '5px', width: '20%' }}>
                <img style={{ border: this.state.done.indexOf(i) >= 0 ? 'solid 5px green' : '', cursor: 'pointer', height: '280px', objectFit: 'cover', minHeight: '280px', maxWidth: '100%', width: '100%' }} src={'./img/' + (this.state.activo[i] ? carta : 'tarjeta') + '.png'} class="rounded mx-auto d-block" onClick={() => {
                    if (this.state.locked || this.state.done.indexOf(i) >= 0) return;
                    var activo = this.state.activo.map(x => x);
                    activo[i] = true;
                    if (this.state.selected == -1) {
                        this.setState({
                            activo: activo,
                            selected: i
                        });
                    } else {
                        this.setState({
                            activo: activo
                        });
                        this.revisar(i);
                    }
                }} />
            </div>
        );
    }
    return (
        <div>
        <div className="col-6 offset-3 text-center">
			<audio id="player" controls>
				<source src={'./data/memorama.mp3'} type="audio/mpeg">
				</source>
					Your browser does not support the audio element.
			</audio>
		</div>
        <div style={{ padding: '5px' }}>
            {cartas}
        </div>
        </div>
    );
    }
}

class Instrucciones extends React.Component { render() {
	var audio = $("#player")
		if(audio[0] != undefined){
			audio[0].pause()
			audio[0].load()
		}
	return (
			<div>
        
				<div className="col-6 offset-3 text-center">
					<audio id="player" controls>
						<source src={'./data/memorama.mp3'} type="audio/mpeg">
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
		);}}

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

    this.juego = "memorama"; // Nombre de la carpeta.
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
                        juego={this.juego}
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

function getInfo(callback) {
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
