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
		        <div>
		            <button onClick={this.seleccionar} className="btn" style={{ height: "75px", width: "75px" ,color: "#F0b894"}}><h1>{this.props.texto}</h1></button>
		        </div>
	        );
	    }else{
	    	return(
		        <div>
		            <button onClick={this.seleccionar} className="btn" style={{ height: "75px", width: "75px" ,color: "#009432"}}><h1>{this.props.texto}</h1></button>
		        </div>
	        );
	    }
	}
}