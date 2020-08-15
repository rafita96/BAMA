class Instrucciones extends React.Component {
	render() {
		var regresar;
        if(typeof this.props.regresar === 'undefined'){
            regresar = (
                <div className="col-4">
                    <a
                        className="btn btn-principal btn-lg" 
                        href="/juegos/">
                        Lista de juegos
                    </a>
                </div>
            );
        }else{
            regresar = (
                <div className="col-4"></div>
            );
        }
        var audio = $("#player")
			if(audio[0] != undefined){
				audio[0].pause()
				audio[0].load()
			}
		return (
			<div>
				<div className="row border rounder my-3">
					<div className="col-12 text-center bg-white">
						<p>{this.props.instrucciones}</p>
					</div>
				</div>

				<div className="row">
					<div className="col-13">
						<audio id="player" controls>
							<source src={'./data/fugaLetras.mp3'} type="audio/mpeg">
							</source>
								Your browser does not support the audio element.
						</audio>
					</div>
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
