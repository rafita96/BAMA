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
        <button className="border border-success" onClick={() => this.seleccionar(this.props.id)}>
          <h1 class="text-capitalize" onClick={() => this.seleccionar(this.props.id)}>{this.props.url} </h1>
        </button>

  		);
  	}

  	return (
      <button onClick={() => this.seleccionar(this.props.id)}>
        <h1 class="text-capitalize">{this.props.url} </h1>
      </button>

  	);
  }
}
