class Comentario extends React.Component{

	render() {
		return <h1>{this.props.children}</h1>;
	}

}

d3.json("./data/texto.json", function(error, data){
	post('/database/crear/', { collection: 'juego1' });


	ReactDOM.render(<Comentario>{data["texto"]}</Comentario>, document.getElementById('main'));
});