class Img extends React.Component{

	constructor(props) {
		super(props);
	}

  componentDidMount(){
    const img = this.refs.image;
  }

  render(){
  	if (this.props.index == null || this.props.seleccionado == null) {
  	} else if (this.props.index == this.props.seleccionado) {
  		return (
  			<img className="border border-success" ref="image" src={this.props.url} />
  		);
  	}

  	return (
  		<img ref="image" src={this.props.url} />
  	);
  }
}