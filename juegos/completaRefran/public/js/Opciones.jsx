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
				<div class="row text-center" style={{ "padding-bottom":"20px" }}>
					<div class="col col-md-2"/>
					<div class="col col-md-8"><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={0} texto={this.props.opciones[0]}/></div>
					<div class="col col-md-2"/>
				</div>
				<div class="row text-center" style={{ "padding-bottom":"20px"}}>
					<div class="col col-md-2"/>
					<div class="col col-md-8"><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={1} texto={this.props.opciones[1]}/></div>
					<div class="col col-md-2"/>
				</div>
				<div class="row text-center" style={{ "padding-bottom":"20px"}}>
					<div class="col col-md-2"/>
					<div class="col col-md-8"><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={2} texto={this.props.opciones[2]}/></div>
					<div class="col col-md-2"/>
				</div>
				<div class="row text-center" style={{ "padding-bottom":"20px"}}>
					<div class="col col-md-2"/>
					<div class="col col-md-8"><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={3} texto={this.props.opciones[3]}/></div>
					<div class="col col-md-2"/>
				</div>
			</div>
		);
	}
}
