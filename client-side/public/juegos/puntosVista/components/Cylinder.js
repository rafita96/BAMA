import React from 'react';

class Cylinder extends React.Component {
	
  constructor(props){
    super(props);
  }

  render(){
    return(
      <mesh {...this.props} >
        <cylinderBufferGeometry args={[0.5, 0.5, 2]} />
        <meshPhongMaterial color={this.props.color} />
      </mesh>
    );
  }
}

export default Cylinder;