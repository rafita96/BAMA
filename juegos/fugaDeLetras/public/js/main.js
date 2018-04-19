
class Main extends React.Component {
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

        ReactDOM.render(<Main 
            nombre={nombre} instrucciones={instrucciones} datos={datos}/>, document.getElementById('main'));
    })
}); 