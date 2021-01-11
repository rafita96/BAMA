import React from 'react';

import Box from './components/Box';
import Cone from './components/Cone';
import Sphere from './components/Sphere';
import Cylinder from './components/Cylinder';

import Plane from './components/Plane';
import Camera from './components/Camera';
import Scene from './components/Scene';

import OpcionVista from './components/OpcionVista';

import { Canvas } from 'react-three-fiber'
import { Row, Col, Button } from 'react-bootstrap';
import { degreesToRadians, shuffle, choice } from '../../../lib/helpers';

import styles from './styles.module.css';

var colors = ['aqua', 'crimson', 'hotpink', 'limegreen', 'royalblue', 'seagreen', 'darkviolet']

var angulos = {
  0: 180,
  7: 45,
  2: 90,
  5: 135,
  4: 225,
  3: 270,
  6: 315,
  1: 0
}

class Main extends React.Component {
	
  constructor(props){
    super(props);
    
    this.state = {
      index: null,
      aciertos: 0,
      pregunta: 0
    }

    this.seleccionar = this.seleccionar.bind(this);
    this.siguiente = this.siguiente.bind(this);
    this.generarOpciones = this.generarOpciones.bind(this);
    this.problemas = this.generarEjercicios(props.nivel);
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

  generarOpciones(nivel){

    let opciones = [
          <OpcionVista 
            key={1}
            position='bc' 
            seleccionar={this.seleccionar} 
            seleccionado={this.state.index} 
            id={1}/>,

          <OpcionVista 
            key={0}
            position='tc' 
            seleccionar={this.seleccionar} 
            seleccionado={this.state.index} 
            id={0}/>
            ];

    if(nivel >= 2){
      opciones.push(
        <OpcionVista 
            key={2}
            position='l' 
            seleccionar={this.seleccionar} 
            seleccionado={this.state.index} 
            id={2}/>
          )

      opciones.push(
        <OpcionVista 
            key={3}
            position='r' 
            seleccionar={this.seleccionar} 
            seleccionado={this.state.index} 
            id={3}/>
          )
    }

    if(nivel == 3){
      opciones.push(
        <OpcionVista 
            key={4}
            position='tr' 
            seleccionar={this.seleccionar} 
            seleccionado={this.state.index} 
            id={4}/>
      );

      opciones.push(
        <OpcionVista 
            key={5}
            position='tl' 
            seleccionar={this.seleccionar} 
            seleccionado={this.state.index} 
            id={5}/>
      );

      opciones.push(
        <OpcionVista 
            key={6}
            position='br' 
            seleccionar={this.seleccionar} 
            seleccionado={this.state.index} 
            id={6}/>
      );

      opciones.push(
        <OpcionVista 
            key={7}
            position='bl' 
            seleccionar={this.seleccionar} 
            seleccionado={this.state.index} 
            id={7}/>
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

      let respuesta;
      switch(nivel){
        case 1:
          respuesta = choice([0,1]);
          break;

        case 2:
          respuesta = choice([0,1,2,3]);
          break;

        default:
          respuesta = choice([0,1,2,3,4,5,6,7]);
          break;
      }

      let problema = {
        objetos,
        respuesta
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

    let opciones = this.generarOpciones(this.props.nivel);
    let problema = this.problemas[this.state.pregunta];

    return(
      <div>
      <Row style={{paddingTop: '55px', paddingBottom: '55px'}}>

        <Col sm="6">
          <Canvas className={styles.canvas} style={{height: 350}} invalidateFrameloop shadowMap>

            <Camera perps={true} position={[0,1,10]} />
            
            <ambientLight />
            <pointLight position={[10, 10, 10]} castShadow />

            <Scene rotation={[0,degreesToRadians(angulos[problema.respuesta]),0]}>
              {problema.objetos.map(obj=>obj)}
              <Plane position={[0,-0.5,0]} />
            </Scene>

          </Canvas>
        </Col>

        <Col sm="6">

          <Canvas className={styles.canvas} style={{height: 350}} invalidateFrameloop shadowMap>
            
            <Camera perps={true} position={[0,10,0]} rotation={[degreesToRadians(-90),0,0]} />
            
            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            <Scene rotation={[0,0,0]}>
              {problema.objetos.map(obj=>obj)}

              <Plane position={[0,0,0]} />
            </Scene>

          </Canvas>

          {opciones.map(op => op)}

        </Col>

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