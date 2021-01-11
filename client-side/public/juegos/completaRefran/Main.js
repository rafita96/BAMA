import React from 'react';
import { Responder } from '../../../lib/helpers';
import Opciones from './components/Opciones';
// import Opcion from '../../../../components/games/Opcion';

class Main extends React.Component {

	constructor(props){
		super(props);
		this.losIndices = {};

		this.datos_nivel = this.props.config['niveles'][this.props.nivel-1]
		this.state = {
			pregunta: 0,
			aciertos: 0,
			indices: [],
			shuffled : false
		}

		this.seleccionarEjercicios = this.seleccionarEjercicios.bind(this);
		this.seleccionarEjercicios();
		for (var i in this.ejercicios){
			for (var j in this.ejercicios[i].respuesta) {
				var idx = Math.floor(Math.random()*this.ejercicios[i].opciones.length);
				this.ejercicios[i].opciones.splice(idx, 0, this.ejercicios[i].respuesta[j]);
			}
		}

		this.numeroPreguntas = 8;
		this.siguiente = this.siguiente.bind(this);
		this.seleccionar = this.seleccionar.bind(this);
	}

	seleccionarEjercicios(){
		this.ejercicios = [];
		var indices = [];
		var answers_size = this.datos_nivel.length
		var num_ejercicios = 6
		// 6 ejercicios
		for (var i = 0; i < num_ejercicios; i++) {
			var index = Math.floor(Math.random() * answers_size)
			while(indices.indexOf(index) != -1){
				index = Math.floor(Math.random() * answers_size)
			}
			this.losIndices[i] = index;
			indices.push(index);
			this.ejercicios.push(this.datos_nivel[index])
		}
	}

	seleccionar(indice){
		var nuevoArreglo = this.state.indices;
		var idx = nuevoArreglo.indexOf(indice);
		if (idx != -1) {
			nuevoArreglo.splice(idx,1);
		} else{
			nuevoArreglo.push(indice);
		}
		this.setState({ indices: nuevoArreglo })
	}

	siguiente(){
		if(this.state.indices.length <= 0){
			this.props.addToast("¡Usted no ha seleccionado una respuesta!");
		}else{
			var nuevoArreglo = [];
			for (var indice in this.state.indices){
				nuevoArreglo.push(this.ejercicios[this.state.pregunta].opciones[this.state.indices[indice]]);
			}
			if(Responder(this.props.config['niveles'], this.props.nivel-1,this.losIndices[this.state.pregunta],nuevoArreglo)){
				this.setState({
					aciertos: this.state.aciertos+1,
					pregunta: this.state.pregunta+1,
					indices: []
				});
			}else{
				this.setState({
					pregunta: this.state.pregunta+1,
					indices: []
				});
			}
			this.state.shuffled = false
		}
	}

	shuffle(arra1) {
		var ctr = arra1.length, temp, index;
		while (ctr > 0 && !this.state.shuffled) {
			index = Math.floor(Math.random() * ctr);
			ctr--;
			temp = arra1[ctr];
			arra1[ctr] = arra1[index];
			arra1[index] = temp;
		}
		this.state.shuffled = true
		return arra1;
	}

	render(){
		if(this.state.pregunta < this.ejercicios.length){
			return(
				<div>
					<div className="row" style={{ color:"#009432", "paddingBottom":"25px"}}>
						<div className="col text-center">
							<h1> {this.ejercicios[this.state.pregunta].pregunta}</h1>
						</div>
					</div>
					<div>
						<Opciones opciones={this.shuffle(this.ejercicios[this.state.pregunta].opciones)} indices={this.state.indices} seleccionar={this.seleccionar}/>
					</div>

					<button className="btn btn-principal float-right btn-lg" onClick={this.siguiente}>Siguiente</button>
				</div>
			);
		}else{
			var porcentaje = Math.round(this.state.aciertos/this.ejercicios.length * 100);
			this.props.terminar(porcentaje);
			return(<div></div>);;
		}

	}
}

export default Main;