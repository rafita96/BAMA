import React from 'react';

class Sphere extends React.Component {
	
  constructor(props){
    super(props);
  }

  render(){
    return(
      <mesh {...this.props} >
        <sphereGeometry attach='geometry' args={[1, 16, 16]} />
        <meshPhongMaterial color={this.props.color} />
      </mesh>
    );
  }
}

export default Sphere;