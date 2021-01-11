import React from 'react';
import Opcion from './Opcion';

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
				<div className="row text-center" style={{ "paddingBottom":"20px" }}>
					<div className="col col-md-2"/>
					<div className="col col-md-8"><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={0} texto={this.props.opciones[0]}/></div>
					<div className="col col-md-2"/>
				</div>
				<div className="row text-center" style={{ "paddingBottom":"20px"}}>
					<div className="col col-md-2"/>
					<div className="col col-md-8"><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={1} texto={this.props.opciones[1]}/></div>
					<div className="col col-md-2"/>
				</div>
				<div className="row text-center" style={{ "paddingBottom":"20px"}}>
					<div className="col col-md-2"/>
					<div className="col col-md-8"><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={2} texto={this.props.opciones[2]}/></div>
					<div className="col col-md-2"/>
				</div>
				<div className="row text-center" style={{ "paddingBottom":"20px"}}>
					<div className="col col-md-2"/>
					<div className="col col-md-8"><Opcion seleccionados={this.props.indices} seleccionar={this.seleccionar} indice={3} texto={this.props.opciones[3]}/></div>
					<div className="col col-md-2"/>
				</div>
			</div>
		);
	}
}

export default Opciones;