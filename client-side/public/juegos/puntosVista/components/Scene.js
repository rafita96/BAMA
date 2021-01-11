import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from 'react-three-fiber';

function Scene(props) {
  const group = useRef();
  
  return(
    <group ref={group} rotation={props.rotation}>
      {props.children}
    </group>
  );

}

export default Scene;