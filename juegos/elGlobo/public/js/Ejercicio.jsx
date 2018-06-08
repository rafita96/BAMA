class Ejercicio extends React.Component {
	
	constructor(props){
		super(props);

		this.width = 940;
		this.height = 380;

		this.momentum = 2;
		this.state = {
			height: this.height/2
		}

		navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

		this.onMediaSuccess = this.onMediaSuccess.bind(this);
		this.subir = this.subir.bind(this);
		this.bajar = this.bajar.bind(this);
		navigator.getUserMedia({ audio : true}, this.onMediaSuccess, function(){});
	}

	onMediaSuccess(stream){
		var options = {};
	    var speechEvents = hark(stream, options);

	    speechEvents.on('speaking', this.subir);
	    speechEvents.on('stopped_speaking', this.bajar);
	    this.intervalo = setInterval((function(){
	    	let copia = this.state.height + this.momentum;
	    	this.setState({
	    		height: copia
	    	});
	    }).bind(this),100)
	}

	componentWillUnmount(){
        clearInterval(this.intervalo);
    }

	subir(){
		this.momentum = -10;
	}

	bajar(){
		this.momentum = 4;
	}

	render() {
		return(<div className="text-center"><SVG width={this.width} height={this.height}>
			<Hilo cx={this.width/2} cy={this.state.height} />
			<Globo cx={this.width/2} cy={this.state.height} r={20}/>
		</SVG></div>);
	}
}