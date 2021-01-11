import React from 'react';

class Cone extends React.Component {
	
  constructor(props){
    super(props);
  }

  render(){
    return(
      <mesh {...this.props} >
        <coneBufferGeometry args={[1,2]} />
        <meshPhongMaterial color={this.props.color} />
      </mesh>
    );
  }
}

export default Cone;