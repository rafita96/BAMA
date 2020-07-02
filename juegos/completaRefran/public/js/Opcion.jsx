class Opcion extends React.Component {

	constructor(props){
	    super(props);

	    this.texto = this.props.texto;
	    this.seleccionar = this.seleccionar.bind(this);
	}

	seleccionar(){
        this.props.seleccionar(this.props.indice);
    }

	render(){

		if(this.props.seleccionados.indexOf(this.props.indice) != -1){
	        return(
		        <div class="center">
		            <button onClick={this.seleccionar} className="btn" style={{ height: "75px", width: "100%" ,color: "#F0b894", border: "#ff1414"}}><h1>{this.props.texto}</h1></button>
		        </div>
	        );
	    }else{
	    	return(
		        <div class="center">
		            <button onClick={this.seleccionar} className="btn" style={{ height: "75px", width: "100%" ,color: "#009432"}}><h1>{this.props.texto}</h1></button>
		        </div>
	        );
	    }
	}
}
