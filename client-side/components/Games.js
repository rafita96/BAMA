import React from 'react';
import { Row, Col, Table, Form, FormControl, Button } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image'

class Games extends React.Component{
	constructor(props){
		super(props);

		this.games = {
			"M": [],
			"L": [],
			"P": [],
			"C": [],
			"O": []
		};

		for (var i = 0; i < props.games.length; i++) {
			this.games[props.games[i].categoria].push(props.games[i]);
		}

		this.generarCategorias = this.generarCategorias.bind(this);
	}

	generarCategorias(categoria){
		return (
			<Col sm="12" className="bg-white p-4 rounded text-center">
    			<Row>
				{this.games[categoria].map(g => (
					<Col key={g.filename} sm="4" className="my-2">
						<Row>
							<Col sm="12">
							<Link as={"/juegos/"+g.filename} href={"/juegos/[juego]"}>
							<a>
								<Image
									src={"/juegos/"+g.filename+"/"+g.img}
									width="100%"
									height="100%"
									alt={g.filename}
								 />
							</a>
							</Link>
							</Col>
						</Row>
						<Row>
							<Col sm="12" className="text-center">
							<p className="h3">{g.nombre}</p>
							</Col>
						</Row>
					</Col>
				))}
			</Row>
		</Col>
		)
	}

	render(){



		let content = (
			<Row className="text-center">
				{this.props.games.map(g => (
				<Col key={g.filename} md="3" className="my-4">
					<Row>
						<Col sm="12">
						<Link as={"/juegos/"+g.filename} href={"/juegos/[juego]"}>
						<a>
							<Image
								src={"/juegos/"+g.filename+"/"+g.img}
								width="100%"
								height="100%"
								alt={g.filename}
							 />
						</a>
						 </Link>
						 </Col>
					</Row>
					<Row>
						<p className="h3">{g.nombre}</p>
					</Row>
				</Col>
				))}
			</Row>
		);

		return(
		<div>
			<Row className="my-4">
		    	<Col sm="12" className="text-center">
				    	<h1>Juegos</h1>
		    	</Col>
		    </Row>

		    <Row className="my-4">
		    	<Col sm="12" className="border rounded bg-principal p-4">
		    		<Row className="my-2">
			    		<Col sm="12">
			    			<p className="h2">Orientación</p>
			    		</Col>
		    		</Row>

			    	<Row>
			    		{this.generarCategorias("O")}	
			    	</Row>
		    	</Col>
		    </Row>

		    <Row className="my-4">
		    	<Col sm="12" className="border rounded bg-principal p-4">
		    		<Row className="my-2">
			    		<Col sm="12">
			    			<p className="h2">Lenguaje</p>
			    		</Col>
		    		</Row>

			    	<Row>
			    		{this.generarCategorias("L")}	
			    	</Row>
		    	</Col>
		    </Row>

			<Row className="my-4">
		    	<Col sm="12" className="border rounded bg-principal p-4">
		    		<Row className="my-2">
			    		<Col sm="12">
			    			<p className="h2">Praxias</p>
			    		</Col>
		    		</Row>

			    	<Row>
			    		{this.generarCategorias("P")}	
			    	</Row>
		    	</Col>
		    </Row>

		    <Row className="my-4">
		    	<Col sm="12" className="border rounded bg-principal p-4">
		    		<Row className="my-2">
			    		<Col sm="12">
			    			<p className="h2">Memoria</p>
			    		</Col>
		    		</Row>

			    	<Row>
			    		{this.generarCategorias("M")}	
			    	</Row>
		    	</Col>
		    </Row>

		    <Row className="my-4">
		    	<Col sm="12" className="border rounded bg-principal p-4">
		    		<Row className="my-2">
			    		<Col sm="12">
			    			<p className="h2">Cálculo</p>
			    		</Col>
		    		</Row>

			    	<Row>
			    		{this.generarCategorias("C")}	
			    	</Row>
		    	</Col>
		    </Row>


		</div>
		);
	}
}

export default Games;