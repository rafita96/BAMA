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
  			<img width="100px" height="100px" className="border border-success" ref="image" src={this.props.url} onClick={() => this.seleccionar(this.props.id)} />
  		);
  	}

  	return (
  		<img width="100px" height="100px" ref="image" src={this.props.url} onClick={() => this.seleccionar(this.props.id)} />
  	);
  }
}
