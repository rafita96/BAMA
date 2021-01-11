import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from 'react-three-fiber';

function Camera(props) {
  const ref = useRef();
  const { setDefaultCamera } = useThree();
  
  // setDefaultCamera(ref.current)
  // ref.current.updateMatrixWorld()
  // Make the camera known to the system
  useEffect(() => setDefaultCamera(ref.current), []);
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld());

  if(props.perps){
	  return <perspectiveCamera ref={ref} {...props} />
  }else{
  	return <orthographicCamera ref={ref} {...props} />
  }

}

export default Camera;