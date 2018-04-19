class Img extends React.Component{

    componentDidMount(){
        const img = this.refs.image
    }


  render(){
    return(
      <img ref="image" src={this.props.url} />
    )
  }
}

export default Img;
