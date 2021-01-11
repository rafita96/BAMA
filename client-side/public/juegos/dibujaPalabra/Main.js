import React from 'react';
import Opcion from '../../../components/games/Opcion';

class Main extends React.Component {
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
			this.props.addToast("¡Usted no ha seleccionado una respuesta!");
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
					<div className="offset-2 col-8 text-center text-bold">
                        <h3>{text}</h3> <br />
                        <canvas className="border rounded" id="canvas" width={300} height={300} style={{ background: 'white' }} onMouseDown={this.dibujar} onMouseMove={this.continuarDibujo} onMouseUp={this.clear} onMouseLeave={this.clear} />
					</div>

                    <div className="row mt-3">
                        <div className="col">
                        <Opcion
                            id={0}
                            seleccionado={this.state.index}
                            seleccionar={this.seleccionar}
                        >
                        1
                        </Opcion>
                        </div>

                        <div className="col">
                        <Opcion
                            id={1}
                            seleccionado={this.state.index}
                            seleccionar={this.seleccionar}
                        >
                        2
                        </Opcion>
                        </div>

                        <div className="col">
                        <Opcion
                            id={2}
                            seleccionado={this.state.index}
                            seleccionar={this.seleccionar}
                        >
                        3
                        </Opcion>
                        </div>

                        <div className="col">
                        <Opcion
                            id={3}
                            seleccionado={this.state.index}
                            seleccionar={this.seleccionar}
                        >
                        4
                        </Opcion>
                        </div>

                        <div className="col">
                        <Opcion
                            id={4}
                            seleccionado={this.state.index}
                            seleccionar={this.seleccionar}
                        >
                        5
                        </Opcion>
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

export default Main;