class Main extends React.Component {
	constructor(props){
        super(props);
        // El inicio debe estar en false para mostrar las instrucciones
        this.state = {
            seleccionNivel: true,
            inicio: false,
            fin: false,
            porcentaje: null            
        }
        this.datos_nivel = null;
        this.iniciar = this.iniciar.bind(this);
        this.terminar = this.terminar.bind(this);
        this.reiniciar = this.reiniciar.bind(this);
        this.seleccionarNivel = this.seleccionarNivel.bind(this);
    }

    reiniciar(){
        this.setState({
            inicio: false,
            fin: false,
            seleccionNivel: true,
            porcentaje: null
        });
    }

    iniciar(){
        this.setState({
            inicio: true
        });
        this.fechaInicio = new Date();
    }


    terminar(porcentaje){
        this.setState({
            fin: true,
            porcentaje: porcentaje
        });
    }

    seleccionarNivel(nivel){
        this.datos_nivel = this.props.datos[nivel-1];
        this.nivel = nivel;
        this.setState({
            seleccionNivel: false
        });
    }

	render() {
        if(this.state.seleccionNivel){
            return(
                <Bloque nombre={this.props.nombre}>
                    <Nivel seleccionar={this.seleccionarNivel} />
                </Bloque>
            );
        }else if(this.state.fin){
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
        }else if(this.state.inicio){
            return(
                <Bloque nombre={this.props.nombre}>
                    <Ejercicio nivel={this.nivel} datos_nivel={this.datos_nivel} terminar={this.terminar}/>
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


function getDatos(nivel,callback){
    d3.json("./data/config.json", function(error,datos){
        callback(datos["niveles"][nivel]);
    });
}
function getInfo(callback){
    d3.json("./data/config.json", function(error, datos){
        d3.json("./data/info.json", function(error, instrucciones){
        	d3.json("./meta.json", function(error, nombre){
            	callback(nombre["nombre"], instrucciones["instrucciones"],datos["niveles"]);
        	});
        });
    });
}

$(document).ready(function(){
    getInfo(function(nombre, instrucciones,datos){

        ReactDOM.render(<Main 
            nombre={nombre} instrucciones={instrucciones} datos={datos}/>, document.getElementById('main'));
    })
}); 