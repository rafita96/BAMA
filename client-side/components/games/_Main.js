import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Inicio from './Inicio';
import Fin from './Fin';

import { api } from '../../lib/api'
import { ToastContext } from '../toastr/ToastProvider';

const INICIO = 0
const JUEGO = 1
const FIN = 2

class _Main extends React.Component{

	static contextType = ToastContext;

	constructor(props){
		super(props);
		
		let estadoInicial = INICIO;
		// if(props.dev){
		// 	estadoInicial = JUEGO;
		// }
		this.state = {
			estado: estadoInicial,
			nivel: 0,
			score: 0,
			fechaInicio: null
		}


		this.jugar = this.jugar.bind(this);
		this.terminar = this.terminar.bind(this);
		this.reiniciar = this.reiniciar.bind(this);

	}

	jugar(nivel){

		let terminar = this.terminar;

		const childrenWithProps = React.Children.map(this.props.children, child => {

            const props = { 
            	terminar, 
            	nivel: nivel+1, 
            	addToast: this.context.addToast, 
            	config: this.props.metadata.config,
            	filename: this.props.metadata.filename
            };
            if (React.isValidElement(child)) {
                return React.cloneElement(child, props);
            }
            return child;
        });

        this.children = childrenWithProps;

		this.setState({
			nivel: nivel,
			estado: JUEGO,
			fechaInicio: new Date()
		});
	}

	terminar(score){

		const fechaFin = new Date();
		const payload = {
				_id: this.props.pacient,
				score: {
					score: score,
					gameType: this.props.metadata.categoria,
					initTime: this.state.fechaInicio,
					finishTime: fechaFin,
					game: this.props.metadata.nombre
				}
			}

		const that = this;
		api.addScore(payload, this.props.user.token,() => {
			that.setState({
				estado: FIN,
				score: score
			});
		});

	}

	reiniciar(){
		this.setState({
			estado: INICIO,
			nivel: 0,
			score: 0,
			fechaInicio: null,
			fechaFin: null
		});
	}

	render(){

		let content;

		switch(this.state.estado){
			case INICIO:
				content = (<Inicio siguiente={this.jugar} metadata={this.props.metadata}/>);
				break;
			case JUEGO:
				content = this.children;
				break;
			case FIN:
				content = (<Fin reiniciar={this.reiniciar} score={this.state.score} metadata={this.props.metadata} />);
				break;
		}

		return(
			<Col md="12" className="border rounded p-3 bg-principal">
				{content}
			</Col>
		);
	}
}

export default _Main;