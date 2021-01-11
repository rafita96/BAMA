import React from 'react';
import Img from '../../../components/games/Img';
import { shuffle } from '../../../lib/helpers';

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pregunta: 0,
			aciertos: 0,
			seleccionado: null
		}

		this.generarEjercicios();
		this.siguiente = this.siguiente.bind(this);
		this.seleccionar = this.seleccionar.bind(this);
	}

	seleccionar(seleccionado) {
		this.setState({
			seleccionado: seleccionado
		});
	}

	generarCadena(figura,color,lado){
		var cadena = figura+"-"+color+"-"+lado;
		return cadena
	}

	generarEjercicios(){
		this.ejercicios = [];

		for (var i=0;i<5;i++){
			var figuras = ["Circulo","Triangulo","Cuadrado","Rectangulo","Rombo","Pentagono","Estrella","Hexagono","Octagono"];
			var colores = ["Rojo","Azul","Verde","Naranja","Amarillo","Añil","Violeta"];
			var lados = ["Der","Izq"];
			var ejercicio = new Object();

			var color_c = colores.splice(Math.floor(Math.random()*colores.length),1)[0];
			var figura_o = figuras.splice(Math.floor(Math.random()*figuras.length),1)[0];
			var rand = Math.round(Math.random());
			var lado_ob = lados[rand];
			var lado_op = lados[1-rand];

			ejercicio.pregunta = this.generarCadena(figura_o,color_c,lado_ob);
			if (this.props.nivel != 3)
				ejercicio.respuesta = this.generarCadena(figura_o,color_c,lado_op);
			else {
				color_c = colores.splice(Math.floor(Math.random()*colores.length),1)[0];
				ejercicio.respuesta = this.generarCadena(figura_o,color_c,lado_op);
			}

			if (this.props.nivel == 1)
			var color = colores.splice(Math.floor(Math.random()*colores.length),1)[0];
			var opciones = [ejercicio.respuesta];

			for (var j=1; j<=3; j++){
				if (this.props.nivel == 1) var fig = figuras.splice(Math.floor(Math.random()*figuras.length),1)[0];
				else if (this.props.nivel == 2) {
					var fig = figuras.splice(Math.floor(Math.random()*figuras.length),1)[0];
					var color = colores[Math.floor(Math.random()*colores.length)];
				}
				else{
					var fig = figuras.splice(Math.floor(Math.random()*figuras.length),1)[0];
					var color = colores.splice(Math.floor(Math.random()*colores.length),1)[0];
				}
				var lado = lado_op;
				opciones.push(this.generarCadena(fig,color,lado));
			}

			opciones = shuffle(opciones);
			ejercicio.opciones = opciones;
			this.ejercicios.push(ejercicio);
		}

		console.log(this.ejercicios);
	}

	siguiente() {
		if (this.state.seleccionado == null) {
			this.props.addToast("¡Usted no ha seleccionado una respuesta!");
		} else {
			if (this.state.seleccionado == this.ejercicios[this.state.pregunta].respuesta) {
				this.setState({
					aciertos: this.state.aciertos + 1,
					pregunta: this.state.pregunta + 1,
					seleccionado: null
				});
			} else {
				this.setState({
					pregunta: this.state.pregunta + 1,
					seleccionado: null
				});
			}
		}
	}

	render() {
		if (this.state.pregunta >= this.ejercicios.length) {
			var porcentaje = this.state.aciertos / this.state.pregunta * 100;
			this.props.terminar(porcentaje);
            return(<div></div>);
		} else {
			var carpeta = this.state.pregunta;
			return (
				<div>
					<div className="row text-center">
					    <div className="col-12">
					        <Img url={'/juegos/'+this.props.filename+'/data/img/'+this.ejercicios[this.state.pregunta].pregunta+".jpg"} />
					    </div>
					</div>
					<div className="col-12"><hr/></div>
					<div className="row text-center">
						<div className="col">
						    <Img
						    	url={'/juegos/'+this.props.filename+'/data/img/'+this.ejercicios[this.state.pregunta].opciones[0]+".jpg"}
						    	id={this.ejercicios[this.state.pregunta].opciones[0]}
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
						</div>
						<div className="col ">
						    <Img
						    	url={'/juegos/'+this.props.filename+'/data/img/'+this.ejercicios[this.state.pregunta].opciones[1]+".jpg"}
						    	id={this.ejercicios[this.state.pregunta].opciones[1]}
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
						</div>
						<div className="col">
						    <Img
						    	url={'/juegos/'+this.props.filename+'/data/img/'+this.ejercicios[this.state.pregunta].opciones[2]+".jpg"}
						    	id={this.ejercicios[this.state.pregunta].opciones[2]}
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
						</div>
						<div className="col">
						    <Img
						    	url={'/juegos/'+this.props.filename+'/data/img/'+this.ejercicios[this.state.pregunta].opciones[3]+".jpg"}
						    	id={this.ejercicios[this.state.pregunta].opciones[3]}
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
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