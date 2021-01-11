import React from 'react';
import { Row, Col, Table, Form, FormControl, Button } from 'react-bootstrap';
import Link from 'next/link';

class Pacients extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			query: "",
			pacients: this.props.pacients
		}

		this.updateData = this.updateData.bind(this);
		this.selectPacient = this.selectPacient.bind(this);
	}

	selectPacient(_id){
		this.props.selectPacient(_id);
	}

	updateData(e){
		let query = e.target.value.trim().toLowerCase();
		if(query === ""){
			this.setState({
				pacients: this.props.pacients
			});
		}else{
			let newPacients = [];
			for(const key in this.props.pacients){
				let p = this.props.pacients[key];
				let string = p.name.toLowerCase() + " " + p.firstLastName.toLowerCase() + " " + p.secondLastName.toLowerCase() + " " + p.noExp.toLowerCase();

				if(string.includes(query)){
					newPacients.push(p);
				}
			}

			this.setState({
				pacients: newPacients
			})
		}
	}

	render(){
		let pacients = this.state.pacients;

		let content = <div></div>;
		if(this.props.pacient){
			let p = this.props.pacients[this.props.pacient];
			content = (
				<Row className="my-4">
					<Col xs="12">
						<p className="h3"><span className="font-weight-bold">Paciente actual:</span> {p.name + " " + p.firstLastName + " " + p.secondLastName}</p>
					</Col>
				</Row>
			);
		}
		return(
		<div className="border rounded p-4 bg-principal">
			{content}
			<Row className="my-4">
				<Col sm="10">
			      <FormControl type="text" placeholder="Buscar paciente" onKeyUp={this.updateData}/>
				</Col>
				<Col>
					<Link href="/paciente/agregar"><a className="btn btn-principal">Agregar paciente</a></Link>
				</Col>
			</Row>
			<Row className="my-4">
		    	<Table responsive className="text-center">
					<thead className="font-weight-bold">
						<tr>
							<th>No. Expediente</th>
							<th>Nombre</th>
							<th>Apellido Paterno</th>
							<th>Apellido Materno</th>
							<th>Acción</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(pacients).map((key) => (
							<tr key={key}>
								<td>{pacients[key].noExp}</td>
								<td>{pacients[key].name}</td>
								<td>{pacients[key].firstLastName}</td>
								<td>{pacients[key].secondLastName}</td>
								<td>
									<Button variant='principal' onClick={()=>{this.selectPacient(key)}}>
										Seleccionar
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Row>
		</div>
		);
	}
}

export default Pacients;