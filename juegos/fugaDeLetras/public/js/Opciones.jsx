class Opciones extends React.Component {

	constructor(props){
        super(props);

        this.seleccionar = this.seleccionar.bind(this);
    }

    seleccionar(indice){
        this.props.seleccionar(indice);
    }

	render() {
		return(
			<div>
				<div class="row text-center" style={{ "padding-bottom":"20px"}}>
					<div class="col col-md-2"/>
					<div class="col col-md-2" ><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={0} texto={this.props.opciones[0]}/></div>
					<div class="col col-md-2" ><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={1} texto={this.props.opciones[1]}/></div>
					<div class="col col-md-2" ><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={2} texto={this.props.opciones[2]}/></div>
					<div class="col col-md-2" ><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={3} texto={this.props.opciones[3]}/></div>
				</div> 
				<div class="row text-center" style={{ "padding-top":"20px"}}>
					<div class="col col-md-2"/>
					<div class="col col-md-2" ><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={4} texto={this.props.opciones[4]}/></div>
					<div class="col col-md-2" ><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={5} texto={this.props.opciones[5]}/></div>
					<div class="col col-md-2" ><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={6} texto={this.props.opciones[6]}/></div>
					<div class="col col-md-2" ><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={7} texto={this.props.opciones[7]}/></div>
				</div>
			</div>	
		);
	}
}