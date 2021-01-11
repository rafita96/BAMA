import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import ReactAudioPlayer from 'react-audio-player';

class Inicio extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			dificultad: 0
		}

		this.siguiente = this.siguiente.bind(this);
		this.select = this.select.bind(this);
	}

	select(val){
		this.setState({
			dificultad: val
		})
	}

	siguiente(){
		this.props.siguiente(this.state.dificultad);
	}


	render(){

		let style = [];
		for (var i = 0; i < 3; i++) {
			if(this.state.dificultad == i){
				style.push("bg-success text-white p-3 border");
			}else{
				style.push("bg-light text-dark p-3 border");
			}
		}

		return(
			<Col md={{span: 10, offset: 1}}>
				<Row>
					<Col md="8">
						<p className="h3">Instrucciones</p>
					</Col>
					<Col md="2">
						<ReactAudioPlayer
						  src={`/juegos/${this.props.metadata.filename}/data/audio.mp3`}
						  controls
						/>
					</Col>
				</Row>
				<Row className="my-3 border rounded p-4 bg-white">
					<p>{this.props.metadata.instrucciones}</p>
				</Row>
				<Row>
					<p className="h3">Seleccione el nivel de dificultad</p>
				</Row>
				<Row className="my-3 text-center">
					<Col className={style[0]} onClick={()=>{this.select(0)}}>Fácil</Col>				
					<Col className={style[1]} onClick={()=>{this.select(1)}}>Normal</Col>				
					<Col className={style[2]} onClick={()=>{this.select(2)}}>Difícil</Col>			
				</Row>
				<Row className="my-4">
					<Button variant="principal" onClick={()=>{this.siguiente()}}>Siguiente</Button>
				</Row>
			</Col>
		);
	}
}

export default Inicio;