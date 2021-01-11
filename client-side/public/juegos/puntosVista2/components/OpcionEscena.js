import React from 'react';

import styles from '../../puntosVista/styles.module.css';
import { Canvas } from 'react-three-fiber';
import Camera from '../../puntosVista/components/Camera';
import Plane from '../../puntosVista/components/Plane';
import Scene from '../../puntosVista/components/Scene';

class OpcionEscena extends React.Component{

	render(){
		let sel = styles.no_seleccionado;
		if(this.props.id == this.props.seleccionado){
			sel = styles.seleccionado;
		}

		return(
			<Canvas 
				onClick={()=>{this.props.seleccionar(this.props.id)}} 
				className={`${styles.canvas} ${sel}`} 
				style={{height: 180, width: 200}} 
				invalidateFrameloop shadowMap>

	            <Camera perps={true} position={[0,1,10]} />
	            
	            <ambientLight />
	            <pointLight position={[10, 10, 10]} castShadow />

	            <Scene rotation={[0,this.props.angulo,0]}>
	              {this.props.objetos.map(obj=>obj)}
	              <Plane position={[0,-0.5,0]} />
	            </Scene>

	          </Canvas>
		);
	}
}

export default OpcionEscena;