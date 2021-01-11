import React from 'react';
import Img from '../../../components/games/Img'
import styles from './styles.module.css';
import Opcion from '../../../components/games/Opcion';


class Main extends React.Component {
  

	constructor(props) {

		super(props);
		this.state = {
			pregunta: 0,
			aciertos: 0,
			index: null,
      cancion_index : null
		}
    switch (this.props.nivel) {
      case 1:this.total_preguntas = 4; break;
      case 2:this.total_preguntas = 6; break;
      case 3:this.total_preguntas = 7; break;
    }
		this.siguiente = this.siguiente.bind(this);
		this.seleccionar = this.seleccionar.bind(this);
	}

	seleccionar(index) {
		this.setState({
			index: index
		});
	}

	siguiente() {
		if (this.state.index == null) {
			this.props.addToast("¡Usted no ha seleccionado una respuesta!");
		} else {
            var aciertos = this.state.aciertos + this.state.index;
            console.log(aciertos);
            this.setState({
                aciertos: aciertos,
                pregunta: this.state.pregunta + 1,
                index: null,
                cancion_index : null
            });
		}
	}

	render() {
		if (this.state.pregunta >= this.total_preguntas) {
            var total_aciertos = this.total_preguntas * 4;
            var porcentaje = Math.round(this.state.aciertos / total_aciertos * 100);
			      this.props.terminar(porcentaje);
            return(<div></div>);
		} else {

      var canciones;
      switch (this.props.nivel) {
        case 1: canciones = ['día', 'noche', 'corazón', 'mujer', 'sol', 'mar', 'azul', 'ojos', 'labios', 'canta', 'llorar', 'mexico', 'rancho', 'caballo', 'rogar', 'cielito', 'tequila', 'paloma', 'morena', 'vida', 'rey', 'negrita', 'volver', 'querer', 'adelita'];
        break;
        case 2: canciones = ['flor', 'zapatos', 'puerta', 'árbol', 'niña', 'soldado', 'beso', 'baila', 'cama', 'copa', 'mano', 'tristeza', 'sombra', 'luz', 'soledad', 'casa', 'mariachis', 'dinero', 'trono', 'reina', 'camino', 'volando', 'rebozo', 'loco', 'tiempo'];
        break;
        case 3: canciones = ['acariciar', 'pasaje', 'rincón', 'drama', 'alma', 'blanco', 'negro', 'quedar', 'ley', 'piedra', 'papel', 'penando', 'seda', 'pelusa', 'delante', 'detrás', 'perder', 'brazos', 'valiente', 'sargento', 'tumba', 'venas', 'soñé', 'distancia', 'sol'];
        break;
      }
      if(this.state.cancion_index == null) {
        this.state.cancion_index = Math.floor((Math.random() * (canciones.length-1)))
      }

      var text = (this.props.nivel == 3) ? '' : canciones[this.state.cancion_index];


			return (
				<div>
					<div className="offset-2 col-8">
            <font color="red">
  						<Img style="color:red"
  							url={'/juegos/'+this.props.filename+'/data/img/' + canciones[this.state.cancion_index] + '.png'}
                text={text}
                seleccionar={()=>{}}
  							/>
            </font>
					</div>
              <div className='row'>
                <p className="h2 px-4">Puntaje</p>
              </div>

              <div className="row text-center">
                <div className="col">
                    <Opcion
                      id={0}
                      seleccionado={this.state.index}
                      seleccionar={this.seleccionar}>
                      1
                      </Opcion>
                </div>
                <div className="col">
                    <Opcion
                      id={1}
                      seleccionado={this.state.index}
                      seleccionar={this.seleccionar}>
                      2
                      </Opcion>
                </div>
                <div className="col">
                    <Opcion
                      id={2}
                      seleccionado={this.state.index}
                      seleccionar={this.seleccionar}>
                      3
                      </Opcion>
                </div>
                <div className="col">
                    <Opcion
                      id={3}
                      seleccionado={this.state.index}
                      seleccionar={this.seleccionar}>
                      4
                      </Opcion>
                </div>
                <div className="col">
                    <Opcion
                      id={4}
                      seleccionado={this.state.index}
                      seleccionar={this.seleccionar}>
                      5
                      </Opcion>
                </div>
              </div>

                    <div className="row mt-3">
                        <div className="col-2 offset-10">
                            <button className="btn btn-principal" onClick={this.siguiente}>Siguiente</button>
                        </div>
                    </div>
				</div>
			);
		}
	}
}

export default Main;