import React from 'react';
import { Row, Col, Table, Form, FormControl, Button } from 'react-bootstrap';
import Link from 'next/link';

import { CircularProgressbar } from 'react-circular-progressbar';
// import { api } from '../lib/api';

class Profile extends React.Component{

	render(){
		let p = this.props.pacient;

		let content;
		if(p){

			let scores = {
				"M": [0],
				"L": [0],
				"P": [0],
				"C": [0],
				"O": [0]
			};

			for (var i = 0; i < p.scores.length; i++) {
				if(p.scores[i].gameType in scores){
					scores[p.scores[i].gameType].push(p.scores[i].score);
				}
			}

			for(const key in scores){
				let l = scores[key].length - 1;
				
				if(l == 0){
					scores[key] = 0;
				}else{
					let sum = scores[key].reduce(function(a,b){
						return a+b;
					}, 0);

					scores[key] = Math.trunc(sum/l);
				}

			}

			let _scores = (
			<div>
				<Row className="bg-white my-4 p-4 border rounded">
					<Col sm="12" md={{span: 2, offset: 1}} className="text-center">
						<CircularProgressbar value={scores["M"]} text={`${scores["M"]}%`} />
			    		<h5>Memoria</h5>
					</Col>
					<Col sm="12" md="2" className="text-center">
						<CircularProgressbar value={scores["L"]} text={`${scores["L"]}%`} />
			    		<h5>Lenguaje</h5>
					</Col>
					<Col sm="12" md="2" className="text-center">
						<CircularProgressbar value={scores["P"]} text={`${scores["P"]}%`} />
			    		<h5>Praxias</h5>
					</Col>
					<Col sm="12" md="2" className="text-center">
						<CircularProgressbar value={scores["C"]} text={`${scores["C"]}%`} />
			    		<h5>Cálculo</h5>
					</Col>
					<Col sm="12" md="2" className="text-center">
						<CircularProgressbar value={scores["O"]} text={`${scores["O"]}%`} />
			    		<h5>Orientación</h5>
					</Col>
		    	</Row>
		    </div>
			);

			content = (
			<div className="border p-4 rounded bg-principal">
				<Row className="my-4">
					<Col sm="12">
			    		<p className="h1">{p.name + " " + p.firstLastName + " " + p.secondLastName}</p>
					</Col>
		    	</Row>

				<Row className="my-4 border p-4 rounded bg-white">
					<Col sm={{span:4, offset: 2}}>
						<Row>
							<Col sm="12" className="text-center">
					    		<p className="h4">{p.noExp}</p>
							</Col>
						</Row>
						<Row>
							<Col sm="12" className="text-center">
					    		<p className="muted">No. Expediente</p>
					    	</Col>
						</Row>
					</Col>

					<Col sm="4">
						<Row>
							<Col sm="12" className="text-center">
				    			<p className="h4">{new Date(Date.now()- (new Date(p.birthday))).getFullYear() - 1970} Años</p>
					    	</Col>
						</Row>
						<Row>
							<Col sm="12" className="text-center">
								<p className="muted">Edad</p>
					    	</Col>
						</Row>
					</Col>
		    	</Row>
		    	<Row className="my-4 px-4">
		    		<p className="h3">Puntajes</p>
		    	</Row>
		    	{_scores}
		    	<Row className="my-4">
			    	<Col sm="12" className='justify-content-center text-center'>
			    		<Link href="/juegos"><a className="btn btn-lg btn-principal w-50">Jugar</a></Link>
			    	</Col>
			    </Row>
		    </div>
		    );
		}else{
			// this.getPacientData();

			content = (
				<Row className="my-4">
		    	No has seleccionado un paciente.
		    	</Row>);
		}

		return(
		<div>
			<Row className="my-4 text-center">
		    	<Col sm="12">
				    	<h1>Perfil</h1>
		    	</Col>
		    </Row>
		    {content}
		</div>
		);
	}
}

export default Profile;