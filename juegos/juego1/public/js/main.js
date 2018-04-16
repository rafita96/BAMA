class Image extends React.Component {
	render() {
		return (
			<div className="col-lg-3 col-md-4 col-xs-6">
				<a href="#" className="d-block mb-4 h-100">
					<img className="rounded img-fluid img-thumbnail" src={this.props.value} alt={this.props.value} />
				</a>
			</div>
		);
	}
}

class Canvas extends React.Component {
	renderImage(i) {
		return <Image value={i} />;
	}

	render() {
		const points = "Puntos acumulados: 0";
		const title = "¿En qué planeta estamos?"

		return (
			<div>
				<div className="title">{title}</div>
				<div className="points">{points}</div>
				<div className="row text-center text-lg-left">
					{this.renderImage("./data/img/mercury.png")}
					{this.renderImage("./data/img/venus.png")}
					{this.renderImage("./data/img/earth.png")}
					{this.renderImage("./data/img/mars.png")}
					{this.renderImage("./data/img/jupiter.png")}
					{this.renderImage("./data/img/saturn.png")}
					{this.renderImage("./data/img/uranus.png")}
				</div>
			</div>
		);
	}

}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-canvas">
					<Canvas />
				</div>

				<div className="game-info">
					<div>{ /* puntaje */}</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Game />, document.getElementById('main'));