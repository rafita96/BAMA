class Ejercicio extends React.Component {
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
		var cadena = figura+"_"+color;
		if (figura != "cuadrado")
			cadena += "_"+lado; 
		return cadena
	}

	generarEjercicios(){
		this.ejercicios = [];
		for (var i=0;i<5;i++){
			var colores = ["rojo","azul","verde","naranja","amarillo"];
			var figuras = ["circulo","triangulo","cuadrado","pentagono","estrella"];
			var lados = ["der","izq"];
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
				if (this.props.nivel == 1){
					var fig = figuras[Math.floor(Math.random()*figuras.length)];
				} else if (this.props.nivel == 2){
					var fig = figuras.splice(Math.floor(Math.random()*figuras.length),1)[0];
					var color = colores[Math.floor(Math.random()*colores.length)];
				} else{
					var fig = figuras.splice(Math.floor(Math.random()*figuras.length),1)[0];
					var color = colores.splice(Math.floor(Math.random()*colores.length),1)[0];
				}
				var lado = lados[Math.round(Math.random())];
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
			toastr("No has seleccionado una opción");
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
					        <Img url={"./img/"+this.ejercicios[this.state.pregunta].pregunta+".png"} />
					    </div>    
					</div>
					<div className="col-12"><hr/></div>
					<div className="row text-center">
						<div className="col-2"></div> 
						<div className="col-2 mx-2 p-2 rounded bg-verde">
						    <Img 
						    	url={"./img/"+this.ejercicios[this.state.pregunta].opciones[0]+".png"} 
						    	id={this.ejercicios[this.state.pregunta].opciones[0]} 
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
						</div>
						<div className="col-2 mx-2 p-2 rounded bg-verde">
						    <Img 
						    	url={"./img/"+this.ejercicios[this.state.pregunta].opciones[1]+".png"} 
						    	id={this.ejercicios[this.state.pregunta].opciones[1]} 
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
						</div>
						<div className="col-2 mx-2 p-2 rounded bg-verde">
						    <Img 
						    	url={"./img/"+this.ejercicios[this.state.pregunta].opciones[2]+".png"} 
						    	id={this.ejercicios[this.state.pregunta].opciones[2]} 
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
						</div>
						<div className="col-2 mx-2 p-2 rounded bg-verde">
						    <Img 
						    	url={"./img/"+this.ejercicios[this.state.pregunta].opciones[3]+".png"} 
						    	id={this.ejercicios[this.state.pregunta].opciones[3]} 
						    	seleccionado={this.state.seleccionado}
						    	seleccionar={this.seleccionar} />
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