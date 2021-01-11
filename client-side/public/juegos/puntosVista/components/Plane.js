import React, { useRef } from 'react';

class Plane extends React.Component {
	
  constructor(props){
    super(props);
  }

  render(){
    return(
      <mesh {...this.props} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[8, 8]} />
        <meshStandardMaterial color="#7575FF" />
      </mesh>
    );
  }
}

export default Plane;