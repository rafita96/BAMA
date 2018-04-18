class Opcion extends React.Component {
	constructor(props){
	    super(props);

	    this.texto = this.props.texto;
	}

	render(){
        return(
	        <div>
	            <button className="btn" style={{ height: "75px", width: "75px" ,color: "#009432"}}><h1>{this.props.texto}</h1></button>
	        </div>
        );

	}
}

class Opciones extends React.Component {
	constructor(props){
		super(props);

	}

	render() {
		return(
			<div>
				<div class="row text-center" style={{ "padding-bottom":"20px"}}>
					<div class="col col-md-2"/>
					<div class="col col-md-2" ><Opcion index={0} texto={this.props.opciones[0]}/></div>
					<div class="col col-md-2" ><Opcion index={1} texto={this.props.opciones[1]}/></div>
					<div class="col col-md-2" ><Opcion index={2} texto={this.props.opciones[2]}/></div>
					<div class="col col-md-2" ><Opcion index={3} texto={this.props.opciones[3]}/></div>
				</div> 
				<div class="row text-center" style={{ "padding-top":"20px"}}>
					<div class="col col-md-2"/>
					<div class="col col-md-2" ><Opcion index={4} texto={this.props.opciones[4]}/></div>
					<div class="col col-md-2" ><Opcion index={5} texto={this.props.opciones[5]}/></div>
					<div class="col col-md-2" ><Opcion index={6} texto={this.props.opciones[6]}/></div>
					<div class="col col-md-2" ><Opcion index={7} texto={this.props.opciones[7]}/></div>
				</div>
			</div>	
		);
	}
}

class Ejercicio extends React.Component {
	constructor(props){
		super(props);

		this.state = {
            pregunta: 0,
            aciertos: 0,
            indices: []
        }
        this.seleccionarEjercicios();
        for (var i in this.ejercicios){
        	for (var j in this.ejercicios[i].respuesta) {
        		var idx = Math.floor(Math.random()*this.ejercicios[i].opciones.length);
        		this.ejercicios[i].opciones.splice(idx, 0, this.ejercicios[i].respuesta[j]);
        	}
        }

	}

    siguiente(){
        if(this.state.indices == []){
            toastr("No has seleccionado una opción");
        }else{
            var respuesta = this.ejercicios[this.state.pregunta][1]/45;
            if(this.state.indices == respuesta){
                this.setState({
                    aciertos: this.state.aciertos+1,
                    pregunta: this.state.pregunta + 1,
                    indices: []
                });
            }else{
                this.setState({
                    pregunta: this.state.pregunta + 1,
                    indices: []
                });
            }
        }
    }

	seleccionarEjercicios(){
		this.ejercicios = [];
		this.indices = [];
        // 6 ejercicios
        for (var i = 0; i < 6; i++) {
            var index = Math.floor(Math.random() * 10);
            while(this.indices.indexOf(index) != -1){
                index = Math.floor(Math.random() * 10);
            }
            this.indices.push(index);
            this.ejercicios.push(this.props.datos[index])
        }
	}

	render(){
		return(
			<div>
				<div class="row" style={{ color:"#009432", "padding-bottom":"25px"}}>
					<div class="col text-center">
						<h1> {this.ejercicios[this.state.pregunta].pregunta}</h1>
					</div>
				</div>
				<div>
					<Opciones opciones={this.ejercicios[this.state.pregunta].opciones}/>
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
	constructor(props){
        super(props);
        // El inicio debe estar en false para mostrar las instrucciones
        this.state = {
            inicio: true,
        }

        this.iniciar = this.iniciar.bind(this);
    }

    iniciar(){
        this.setState({
            inicio: true
        });
    }

	render() {
		if(this.state.inicio){
	    	return(
	        	<Bloque nombre={this.props.nombre}>
	            	<Ejercicio datos={this.props.datos} />
	            </Bloque>
	        );
		}else{
	    	return(
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
    d3.json("./data/config.json", function(error, datos){
        d3.json("./data/info.json", function(error, instrucciones){
        	d3.json("./meta.json", function(error, nombre){
            	callback(nombre["nombre"], instrucciones["instrucciones"], datos["niveles"][0]);
        	});
        });
    });
}

$(document).ready(function(){
    getInfo(function(nombre, instrucciones, datos){

        ReactDOM.render(<Game 
            nombre={nombre} instrucciones={instrucciones} datos={datos}/>, document.getElementById('main'));
    })
}); 