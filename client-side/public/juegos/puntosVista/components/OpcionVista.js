import React, { useRef, useEffect } from 'react';
import { useThree, useFrame, useLoader } from 'react-three-fiber';

import { default as Picture } from '../data/img/picture.svg'
import styles from '../styles.module.css';
// import flatten from 'lodash-es/flatten'
// // import { loadSVG } from '../../../../lib/three_helpers';
// import { SVGLoader as loader } from 'three/examples/jsm/loaders/SVGLoader'

// import Shape from '../../../../components/games/Shape';

var positions = {
  bc: {
    'left': '45%'
  },
  tc: {
    'left': '45%',
    'bottom': '100%',
    'transform': 'rotate(180deg)'
  },
  l: {
    'bottom': '45%',
    'left': '10%',
    'transform': 'rotate(90deg)' 
  },
  r: {
    'bottom': '45%',
    'left': '80%',
    'transform': 'rotate(270deg)' 
  },
  tl:{
    'bottom': '95%',
    'left': '10%',
    'transform': 'rotate(125deg)'
  },
  tr:{
    'bottom': '95%',
    'left': '80%',
    'transform': 'rotate(-125deg)'
  },
  bl:{
    'transform': 'rotate(45deg)',
    'left': '10%'
  },
  br:{
    'transform': 'rotate(-45deg)',
    'left': '80%'
  }
}

function OpcionVista(props) {

  let style = positions[props.position]; 

  let sel = styles.no_seleccionado;
  if(props.seleccionado == props.id){
    sel = styles.seleccionado;
  }

  return (
    <div className={`${styles.opcion} ${sel}`} style={style} onClick={()=>{props.seleccionar(props.id)}}>
      <Picture />
    </div>
  );

}

export default OpcionVista;