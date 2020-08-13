class Instrucciones extends React.Component {

	constructor(props) {
		super(props);

		this.audio = new Howl({
		  src: ['./data/audio.mp3']
		});
		this.audio.play();
	}

	render() {
		return (
			<div>
				<div className="row border rounder my-3">
					<div className="col-12 text-center bg-white">
						<p>{this.props.instrucciones}</p>
					</div>
				</div>

				<div className="row">
					<div className="col-12 text-center">
						<button
							className="btn btn-principal btn-lg"
							onClick={this.props.iniciar}>
							Iniciar Juego
						</button>
					</div>
				</div>
			</div>
		);
	}
}
