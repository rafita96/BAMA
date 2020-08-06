class Fin extends React.Component{
    constructor(props){
        super(props);

        Consulta.post('/paciente/registrar/avance/', {
                juego: 'rompecabezas',
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
                        <a href="/juegos/" className="btn btn-principal">Regresar</a>
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

        return(
            <div>
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
    this.seleccionar = this.seleccionar.bind(this);
	}

  componentDidMount(){
    const img = this.refs.image;
  }

  seleccionar(id) {
    this.props.seleccionar(id);
  }

  render(){
  	if (this.props.id == null) {
  	} else if (this.props.id == this.props.seleccionado) {
  		return (
  			<img className="seleccionado" ref="image" src={this.props.url} onClick={() => this.seleccionar(this.props.id)} />
  		);
  	}

  	return (
  		<img className="no-seleccionado" ref="image" src={this.props.url} onClick={() => this.seleccionar(this.props.id)} />
  	);
  }
}

class Ejercicio extends React.Component {
	constructor(props) {
        super(props);
        this.generarPiezas = this.generarPiezas.bind(this);
        this.colocarPieza = this.colocarPieza.bind(this);
        this.n = 4;
        this.total = this.n * this.n;
        this.rompecabezas = 'frutas';
        var piezas = this.generarPiezas();
        this.state = {
            selected: {
                x: -1,
                y: -1
            },
            done: [
                [ false, false, false, false ],
                [ false, false, false, false ],
                [ false, false, false, false ],
                [ false, false, false, false ]
            ],
            puzzle: [
                [ false, false, false, false ],
                [ false, false, false, false ],
                [ false, false, false, false ],
                [ false, false, false, false ]
            ],
            movimientos: 0,
            piezas: piezas
        }
    }

    generarPiezas () {
        // https://pinetools.com/es/partir-imagenes
        var piezas = [];
        for (var i = 0; i < this.n; i++) {
            var row = [];
            for (var j = 0; j < this.n; j++) {
                var n = Math.floor(Math.random() * this.n);
                while (row.indexOf(n) >= 0) {
                    n = Math.floor(Math.random() * this.n);
                }
                row.push(n);
            }
            piezas.push(row);
        }
        return piezas;
    }

    colocarPieza (i, j) {
        var done = this.state.done.map(x => x.map(y => y));
        var puzzle = this.state.puzzle.map(x => x.map(y => y));
        done[i][j] = this.state.selected.x >= 0 && this.state.selected.y == i && this.state.piezas[i][this.state.selected.x] == j;
        switch (this.props.nivel) {
            case 1:
                puzzle[i][j] = done[i][j];
                break;
            case 2:
                puzzle[i][j] = done[i][j] || !puzzle[i][j];
                break;
            case 3:
                puzzle[i][j] = !puzzle[i][j];
                break;
        }
        this.setState({
            done: done,
            movimientos: this.state.movimientos + 1,
            selected: {
                x: -1,
                y: -1
            }
        }, () => {
            if (this.state.done.every(x => x.every(y => y))) {
                var puntaje = 100 - (this.state.movimientos - this.total - this.n) * 3;
                puntaje = Math.max(0, puntaje);
                puntaje = Math.min(100, puntaje);
                this.props.terminar(puntaje);
            }
        });
    }

	render() {
        let puzzle = [];
        for (let i = 0; i < this.n; i++) {
            let row = [];
            for (let j = 0; j < this.n; j++) {
                let content = this.state.done[i][j]
                    ? <img src={"./img/" + this.rompecabezas + "/fila-" + (i + 1) + "-col-" + (j + 1) + ".png"} style={{ maxWidth: '100%', minWidth: '100%', maxHeight: '100%', minHeight: '100%' }} />
                    : '';
                row.push(
                  <div style={{ background: '#fffdd0', border: 'solid black 2px', float: 'left', height: '80px', width: '25%' }} onClick={() => {
                     this.colocarPieza(i, j);
                    }}>
                        {content}
                    </div>
                );
            }
            puzzle.push(<div style={{ borderCollapse: 'collapse' }}>{row}</div>);
        }
        var piezas = this.state.piezas.map((row, i) => {
            var grid = row.map((pieza, j) => {
                var active = this.state.selected.x == j && this.state.selected.y == i;
                var content = this.state.done[i][pieza] ? '' : <img src={"./img/" + this.rompecabezas + "/fila-" + (i + 1) + "-col-" + (pieza + 1) + ".png"} style={{ maxWidth: '100%', minWidth: '100%', maxHeight: '100%', minHeight: '100%' }} onClick={() => {
                    this.setState({
                        selected: {
                            x: j,
                            y: i
                        }
                    });
                }} />;
                return (
                    <div style={{ background: '#fffdd0', border: 'solid ' + (active ? 'red' : 'black') + ' 2px', float: 'left', height: '80px', width: '25%' }}>
                        {content}
                    </div>
                );
            });
            return (
                <div style={{ borderCollapse: 'collapse' }}>{grid}</div>
            );
        });
        return (
            <div className="row">
                <div className="col-sm-4">
                    {piezas}
                </div>
                <div className="col-sm-4">
                    {puzzle}
                </div>
                <div className="col-sm-4 text-center">
                    <h3>Resultado</h3>
                    <img src={"./img/" + this.rompecabezas + ".png"} style={{ maxWidth: '100%', minWidth: '100%' }} />
                </div>
            </div>
        );
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
				<div className="row border rounder my-3">
					<div className="col-12 text-center bg-white">
						<p>{this.props.instrucciones}</p>
					</div>
				</div>

				<div className="row">
                    <div className="col-13">
                        <audio id="player" controls>
                            <source src={'./data/rompecabezas.mp3'} type="audio/mpeg">
                            </source>
                                Your browser does not support the audio element.
                        </audio>
                    </div>
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

    this.juego = "rompecabezas"; // Nombre de la carpeta.
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
    this.fechaInicio = new Date();
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
          <Ejercicio nivel={this.nivel} terminar={this.terminar}/>
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
                    callback(data["id"],nombre["nombre"], instrucciones["instrucciones"]);
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
