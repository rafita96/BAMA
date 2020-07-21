class Img extends React.Component{

	constructor(props) {
		super(props);
    this.seleccionar = this.seleccionar.bind(this);
  }

  componentDidMount(){
    const img = this.refs.image;
  }

  seleccionar(id) {
    this.props.seleccionar(id);
  }

  render(){
  	if (this.props.id == null) {
  	} else if (this.props.id == this.props.seleccionado) {
  		return (
  			<img className="seleccionado" ref="image" src={this.props.url} onClick={() => this.seleccionar(this.props.id)} />
  		);
  	}

  	return (
			<img className="no-seleccionado" ref="image" src={this.props.url} onClick={() => this.seleccionar(this.props.id)} />
  	);
  }
}
