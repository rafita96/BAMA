import React from 'react';

import Box from '../puntosVista/components/Box';
import Cone from '../puntosVista/components/Cone';
import Sphere from '../puntosVista/components/Sphere';
import Cylinder from '../puntosVista/components/Cylinder';

import Plane from '../puntosVista/components/Plane';
import Camera from '../puntosVista/components/Camera';
import Scene from '../puntosVista/components/Scene';

// import OpcionVista from '../../puntosVista/components/OpcionVista';
import VistaCamara from './components/VistaCamara';
import OpcionEscena from './components/OpcionEscena';

import { Canvas } from 'react-three-fiber'
import { Row, Col, Button } from 'react-bootstrap';
import { degreesToRadians, shuffle, choice } from '../../../lib/helpers';

import styles from '../puntosVista/styles.module.css';

var colors = ['aqua', 'crimson', 'hotpink', 'limegreen', 'royalblue', 'seagreen', 'darkviolet']

var angulos = {
  0: degreesToRadians(180),
  7: degreesToRadians(45),
  2: degreesToRadians(90),
  5: degreesToRadians(135),
  4: degreesToRadians(225),
  3: degreesToRadians(270),
  6: degreesToRadians(315),
  1: degreesToRadians(0)
}

var positions = {
  0: 'tc',
  7: 'bl',
  2: 'l',
  5: 'tl',
  4: 'tr',
  3: 'r',
  6: 'br',
  1: 'bc'
}

class Main extends React.Component {
	
  constructor(props){
    super(props);
    
    this.state = {
      index: null,
      aciertos: 0,
      pregunta: 0
    }

    this.problemas = this.generarEjercicios(props.nivel);

    this.seleccionar = this.seleccionar.bind(this);
    this.siguiente = this.siguiente.bind(this);
    this.generarOpciones = this.generarOpciones.bind(this);

  }

  siguiente(){
    if(this.state.index == null){
      this.props.addToast("¡Usted no ha seleccionado una respuesta!");
    }else{

      let aciertos = this.state.aciertos;
      if(this.state.index == this.problemas[this.state.pregunta].respuesta){
        aciertos += 1;
      }

      this.setState({
        aciertos: aciertos,
        pregunta: this.state.pregunta+1,
        index: null
      });
    }
  }

  generarOpciones(nivel, objetos){

    let opciones = [];

    for(let i = 0; i < Math.pow(2, nivel); i++){
      opciones.push(
        <OpcionEscena 
          objetos={objetos}
          id={i}
          key={i}
          angulo={angulos[i]}
          seleccionar={this.seleccionar}
          seleccionado={this.state.index}
        />
      );
    }

    return opciones;
  }


  generarEjercicios(nivel){

    var posiciones = [
      [0,0,0],
      [2,0,0],
      [0,0,2],
      [-2,0,0],
      [0,0,-2],
      [-2,0,-2],
      [2,0,2],
      [-2,0,2],
      [2,0,-2]
    ];

    let escenas = [];
    for(let j = 0; j < nivel+2; j++){
      let objetos = [];
      let _posiciones = shuffle(posiciones);
      let _colors = shuffle(colors);
      let _indices = shuffle([0,1,2,3]);

      for(let i = 0; i < 3; i++){
        let objeto;
        let pos = _posiciones[i].slice();

        switch(_indices[i]){
          case 0:
            pos[1] = 0;
            objeto = <Box key={i} position={pos} color={_colors[i]} />;
            break;

          case 1:
            pos[1] = 0.5;
            objeto = <Cylinder key={i} color={_colors[i]} position={pos} />;
            break;

          case 2:
            pos[1] = 0.5;
            objeto = <Cone key={i} color={_colors[i]} position={pos} />;
            break;

          default:
            pos[1] = 0.5;
            objeto = <Sphere key={i} color={_colors[i]} position={pos} />;
            break;
        }

        objetos.push(objeto);
      }

      let respuesta, orden;
      switch(nivel){
        case 1:
          respuesta = choice([0,1]);
          orden = shuffle([0,1]);
          break;

        case 2:
          respuesta = choice([0,1,2,3]);
          orden = shuffle([0,1,2,3]);
          break;

        default:
          respuesta = choice([0,1,2,3,4,5,6,7]);
          orden = shuffle([0,1,2,3,4,5,6,7]);
          break;
      }

      let problema = {
        objetos,
        respuesta,
        orden
      }
      escenas.push(problema);
    }

    return escenas;
  }

  seleccionar(id){
    this.setState({
      index: id
    })
  }

  render(){

    if(this.state.pregunta >= this.problemas.length){
      this.props.terminar((this.state.aciertos/(this.props.nivel+2))*100);
      return(<div>Cargando...</div>);
    }

    let problema = this.problemas[this.state.pregunta];
    let opciones = this.generarOpciones(this.props.nivel, problema.objetos);

    return(
      <div>
      <Row className='border' style={{paddingTop: '55px', paddingBottom: '55px'}}>

        <Col sm={{span:6, offset:3}}>
          <Canvas className={styles.canvas} style={{height: 350}} invalidateFrameloop shadowMap>
            
            <Camera perps={true} position={[0,10,0]} rotation={[degreesToRadians(-90),0,0]} />
            
            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            <Scene rotation={[0,0,0]}>
              {problema.objetos.map(obj=>obj)}

              <Plane position={[0,0,0]} />
            </Scene>

          </Canvas>

          <VistaCamara position={positions[problema.respuesta]} />
          
        </Col>
      </Row>
      <Row>
        {problema.orden.map(i => <Col sm="3" className="py-4">{opciones[i]}</Col>)}
      </Row>
        <Row>
            <Col sm={{span: 2, offset: 10}}>
              <Button onClick={this.siguiente}>Siguiente</Button>
            </Col>
        </Row>
      </div>
    );
  }
}

export default Main;