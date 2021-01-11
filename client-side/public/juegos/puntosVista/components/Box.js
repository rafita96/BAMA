import React, { useRef } from 'react';

class Box extends React.Component {
	
  constructor(props){
    super(props);
  }

  render(){
    return(
      <mesh {...this.props} >
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshPhongMaterial color={this.props.color} />
      </mesh>
    );
  }
}

export default Box;