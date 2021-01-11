import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';

import { CircularProgressbar } from 'react-circular-progressbar';

class Fin extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let clase;
		if(this.props.score < 25){
			clase = "#e74c3c";
		}else if(this.props.score < 75){
			clase = "#f7dc6f";
		}else{
			clase = "#58d68d";
		}

		return(
			<Col md={{span: 10, offset: 1}}>
				<Row>
					<Col className="text-center">
						<p className="h1">Puntaje</p>
					</Col>
				</Row>
				<Row className="my-3 border rounded bg-white p-4">
					<Col sm="12" className="text-center">
						<CircularProgressbar 
							styles={{
								root: {
									height: "300px"
								},
								path:{
									stroke: clase
								},
								text: {
									fill: clase
								}
							}}
							value={Math.trunc(this.props.score)} text={`${Math.trunc(this.props.score)}%`} />
					</Col>
				</Row>
				<Row className="my-4">
					<Col md={{span: 4, offset: 4}} className="text-center">
						<Button size='lg' variant='principal' onClick={()=>{this.props.reiniciar()}}>Volver a jugar</Button>
					</Col>
					<Col md={{span: 2, offset: 2}} className="text-center">
						<Link href="/juegos"><Button size='lg' variant='principal'>Salir</Button></Link>
					</Col>
				</Row>
			</Col>
		);
	}
}

export default Fin;