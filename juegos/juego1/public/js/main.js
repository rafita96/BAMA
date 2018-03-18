class Comentario extends React.Component{

	render() {
		return <h1>{this.props.children}</h1>;
	}

}

d3.json("./data/texto.json", function(error, data){
	post('/database/insertar/', { collection: 'juego1', data: {
		nombre: 'sinuhe',
		edad: 3
	} });


	ReactDOM.render(<Comentario>{data["texto"]}</Comentario>, document.getElementById('main'));
});