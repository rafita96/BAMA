class Comentario extends React.Component{

	render() {
		return <h1>{this.props.children}</h1>;
	}

}

d3.json("./data/texto.json", function(error, data){
	// Consulta.post('/database/insertar/', { collection: 'rafael', data: {
	// 	nombre: 'carlos',
	// 	edad: 7
	// } }, function(error){
 //        if(error){
 //            console.log("Error");
 //        }
 //    });

    // Consulta.put('/database/actualizar/', {collection: 'rafael', query: {nombre: 'satan'}, data: {edad: 5}} ,function(error){
    //     if(error){
    //         console.log("Error");
    //     }
    // });


	ReactDOM.render(<Comentario>{data["texto"]}</Comentario>, document.getElementById('main'));
});